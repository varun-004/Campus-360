package com.example.student_management_system.analytics.service;

import com.example.student_management_system.analytics.dto.CourseStatsDTO;
import com.example.student_management_system.analytics.dto.DashboardResponseDTO;
import com.example.student_management_system.analytics.dto.StudentRiskDTO;
import com.example.student_management_system.analytics.util.RiskAnalysisUtil;
import com.example.student_management_system.attendance.repository.AttendanceRepository;
import com.example.student_management_system.course.repository.CourseRepository;
import com.example.student_management_system.enrollment.repository.EnrollmentRepository;
import com.example.student_management_system.marks.repository.MarksRepository;
import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.student.repository.StudentRepository;
import com.example.student_management_system.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final StudentRepository studentRepository;

    private final AttendanceRepository attendanceRepository;

    private final MarksRepository marksRepository;

    private final EnrollmentRepository enrollmentRepository;

    private final TeacherRepository teacherRepository;

    private final CourseRepository courseRepository;

    @Override
    public DashboardResponseDTO getDashboardAnalytics() {

        long totalStudents =
                studentRepository.getTotalStudents();

        long totalTeachers =
                teacherRepository.count();

        long totalCourses =
                courseRepository.count();

        // FIX: Use real attendance data instead of hardcoded 0.0
        Double averageAttendance =
                attendanceRepository.getAverageAttendance();

        Double averageMarks =
                marksRepository.getAverageMarks();

        List<CourseStatsDTO> topCourses =
                enrollmentRepository
                        .getTopCourses(PageRequest.of(0, 5))
                        .stream()
                        .map(obj -> new CourseStatsDTO(
                                (String) obj[0],
                                (Long) obj[1]
                        ))
                        .toList();

        return new DashboardResponseDTO(
                totalStudents,
                totalTeachers,
                totalCourses,
                averageAttendance != null
                        ? averageAttendance
                        : 0,

                averageMarks != null
                        ? averageMarks
                        : 0,

                topCourses
        );
    }

    @Override
    public List<StudentRiskDTO> getStudentRisks() {

        List<Student> students = studentRepository.findAll();

        Map<Long, Double> attendanceMap = attendanceRepository.getAverageAttendanceAllStudents()
                .stream()
                .filter(row -> row != null && row.length >= 2 && row[0] != null)
                .collect(Collectors.toMap(
                        row -> ((Number) row[0]).longValue(),
                        row -> row[1] != null ? ((Number) row[1]).doubleValue() : 0.0,
                        (existing, replacement) -> existing
                ));

        Map<Long, Double> marksMap = marksRepository.getAverageMarksAllStudents()
                .stream()
                .filter(row -> row != null && row.length >= 2 && row[0] != null)
                .collect(Collectors.toMap(
                        row -> ((Number) row[0]).longValue(),
                        row -> row[1] != null ? ((Number) row[1]).doubleValue() : 0.0,
                        (existing, replacement) -> existing
                ));

        return students.stream()
                .map(student -> {
                    double attendanceValue = attendanceMap.getOrDefault(student.getId(), 0.0);
                    double marksValue = marksMap.getOrDefault(student.getId(), 0.0);

                    return new StudentRiskDTO(
                            student.getId(),
                            student.getName(),
                            attendanceValue,
                            marksValue,
                            RiskAnalysisUtil.calculateRisk(
                                    attendanceValue,
                                    marksValue
                            )
                    );
                })
                .toList();
    }
}
