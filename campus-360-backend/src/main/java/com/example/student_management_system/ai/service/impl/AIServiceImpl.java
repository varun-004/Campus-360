package com.example.student_management_system.ai.service.impl;

import com.example.student_management_system.ai.dto.AIPredictionResponse;
import com.example.student_management_system.ai.dto.MLPredictionRequest;
import com.example.student_management_system.ai.service.AIService;
import com.example.student_management_system.attendance.repository.AttendanceRepository;
import com.example.student_management_system.course.repository.CourseRepository;
import com.example.student_management_system.marks.entity.Marks;
import com.example.student_management_system.marks.repository.MarksRepository;
import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    private static final Logger logger = LoggerFactory.getLogger(AIServiceImpl.class);

    private final StudentRepository studentRepository;
    private final MarksRepository marksRepository;
    private final AttendanceRepository attendanceRepository;
    
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ai.ml.service.url:http://localhost:8000}")
    private String mlServiceUrl;

    @Override
    public AIPredictionResponse getStudentAcademicIntelligence(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found for AI analysis"));

        // 1. Gather Contextual Data
        List<Marks> allMarks = marksRepository.findByStudentId(studentId);
        Long totalAttendance = attendanceRepository.getTotalAttendance(studentId);
        Long presentAttendance = attendanceRepository.getPresentAttendance(studentId);

        // 2. Compute ML Features
        double attendanceRate = 0.0;
        if (totalAttendance != null && totalAttendance > 0) {
            attendanceRate = ((double) presentAttendance / totalAttendance) * 100;
        } else {
            // Default to neutral/slightly positive if no data
            attendanceRate = 60.0;
        }

        double avgScore = 0.0;
        double minScore = 0.0;
        double maxScore = 0.0;
        double scoreStd = 0.0;
        double scoreTrend = 0.0; // Simulated trend
        
        int totalAssessments = allMarks.size();
        int totalCourses = student.getCourses().size();

        if (totalAssessments > 0) {
            DoubleSummaryStatistics stats = allMarks.stream()
                    .mapToDouble(Marks::getScore)
                    .summaryStatistics();
            
            avgScore = stats.getAverage();
            minScore = stats.getMin();
            maxScore = stats.getMax();
            
            // Calculate Std Dev
            final double finalAvg = avgScore;
            double variance = allMarks.stream()
                    .mapToDouble(m -> Math.pow(m.getScore() - finalAvg, 2))
                    .sum() / totalAssessments;
            scoreStd = Math.sqrt(variance);
            
            // Simple trend (last vs first, sorted by id as a proxy for time)
            if (totalAssessments > 1) {
                allMarks.sort(Comparator.comparing(Marks::getId));
                double firstHalfAvg = allMarks.subList(0, totalAssessments/2).stream().mapToDouble(Marks::getScore).average().orElse(finalAvg);
                double secondHalfAvg = allMarks.subList(totalAssessments/2, totalAssessments).stream().mapToDouble(Marks::getScore).average().orElse(finalAvg);
                scoreTrend = secondHalfAvg - firstHalfAvg;
            }
        } else {
            // Default values if no marks
            avgScore = 50.0;
            minScore = 50.0;
            maxScore = 50.0;
        }

        MLPredictionRequest requestPayload = MLPredictionRequest.builder()
                .student_id(studentId)
                .attendance_rate(attendanceRate)
                .average_score(avgScore)
                .score_std(scoreStd)
                .total_courses(totalCourses)
                .total_assessments(totalAssessments)
                .min_score(minScore)
                .max_score(maxScore)
                .score_trend(scoreTrend)
                .build();

        // 3. Call ML Microservice
        AIPredictionResponse response;
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<MLPredictionRequest> request = new HttpEntity<>(requestPayload, headers);
            
            response = restTemplate.postForObject(
                    mlServiceUrl + "/api/v1/predict", 
                    request, 
                    AIPredictionResponse.class
            );
            
            if (response == null) {
                throw new RuntimeException("Empty response from ML service");
            }
        } catch (Exception e) {
            logger.error("Failed to connect to ML service: {}", e.getMessage());
            // Fallback strategy if ML service is down
            response = createFallbackPrediction(studentId, avgScore, attendanceRate);
        }

        // 4. Generate Explainable Insights (Strengths, Weaknesses, Action Plan)
        enrichWithContextualInsights(response, allMarks, attendanceRate, avgScore);
        
        return response;
    }
    
    private void enrichWithContextualInsights(AIPredictionResponse response, List<Marks> marks, double attendance, double avg) {
        List<String> strengths = new ArrayList<>();
        List<String> weaknesses = new ArrayList<>();
        List<String> recommendations = new ArrayList<>();
        List<String> actionPlan = new ArrayList<>();
        
        if (attendance >= 85) {
            strengths.add("Excellent attendance record consistency.");
        } else if (attendance < 60) {
            weaknesses.add("Critically low attendance rate.");
            recommendations.add("Mandatory attendance review meeting.");
            actionPlan.add("Attend all classes for the next 2 weeks to stabilize risk score.");
        }
        
        // Find best and worst subjects
        if (!marks.isEmpty()) {
            Map<String, Double> subjectAvgs = marks.stream()
                .collect(Collectors.groupingBy(Marks::getSubject, Collectors.averagingDouble(Marks::getScore)));
                
            String bestSubject = Collections.max(subjectAvgs.entrySet(), Map.Entry.comparingByValue()).getKey();
            String worstSubject = Collections.min(subjectAvgs.entrySet(), Map.Entry.comparingByValue()).getKey();
            
            if (subjectAvgs.get(bestSubject) > 75) {
                strengths.add("Strong performance in " + bestSubject + ".");
            }
            if (subjectAvgs.get(worstSubject) < 50) {
                weaknesses.add("Struggling with " + worstSubject + " concepts.");
                recommendations.add("Consider peer tutoring or TA sessions for " + worstSubject + ".");
                actionPlan.add("Schedule 2 hours of dedicated review for " + worstSubject + " this week.");
            }
        }
        
        // General recommendations based on risk
        if ("CRITICAL_RISK".equals(response.getRiskCategory()) || "HIGH_RISK".equals(response.getRiskCategory())) {
            recommendations.add("Academic intervention required immediately.");
            actionPlan.add("Schedule meeting with academic advisor.");
        } else if ("LOW_RISK".equals(response.getRiskCategory())) {
            recommendations.add("Maintain current study habits.");
            actionPlan.add("Consider advanced projects or peer-mentoring others.");
            if (strengths.isEmpty()) strengths.add("Solid overall academic standing.");
        }
        
        if (weaknesses.isEmpty()) weaknesses.add("No major weaknesses identified.");
        if (strengths.isEmpty()) strengths.add("Satisfactory academic progress.");

        response.setStrengths(strengths);
        response.setWeaknesses(weaknesses);
        response.setRecommendations(recommendations);
        response.setActionPlan(actionPlan);
        
        // Key factor summary
        String topFactor = "unknown";
        if (response.getFeatureImportance() != null && !response.getFeatureImportance().isEmpty()) {
            topFactor = response.getFeatureImportance().keySet().iterator().next().replace("_", " ");
        }
        response.setKeyFactorSummary("The primary driver for this prediction is the student's " + topFactor + ".");
    }
    
    private AIPredictionResponse createFallbackPrediction(Long studentId, double avgScore, double attendanceRate) {
        AIPredictionResponse fallback = new AIPredictionResponse();
        fallback.setStudentId(studentId);
        fallback.setModelVersion("fallback-heuristics-1.0");
        
        fallback.setPredictedPerformance(avgScore);
        
        // Simple heuristic fallback
        if (avgScore > 75 && attendanceRate > 75) {
            fallback.setRiskCategory("LOW_RISK");
            fallback.setRiskProbability(0.15);
        } else if (avgScore < 50 || attendanceRate < 50) {
            fallback.setRiskCategory("CRITICAL_RISK");
            fallback.setRiskProbability(0.85);
        } else {
            fallback.setRiskCategory("MODERATE_RISK");
            fallback.setRiskProbability(0.45);
        }
        
        fallback.setClassProbabilities(Map.of(
            "LOW_RISK", 0.33,
            "MODERATE_RISK", 0.33,
            "CRITICAL_RISK", 0.33
        ));
        
        fallback.setFeatureImportance(Map.of("fallback_mode", 1.0));
        return fallback;
    }
}
