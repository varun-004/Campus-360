package com.example.student_management_system.ai.controller;

import com.example.student_management_system.ai.dto.AIPredictionResponse;
import com.example.student_management_system.ai.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @GetMapping("/predict/{studentId}")
    public ResponseEntity<AIPredictionResponse> getStudentPrediction(@PathVariable Long studentId) {
        return ResponseEntity.ok(aiService.getStudentAcademicIntelligence(studentId));
    }
}
