package com.example.student_management_system.ai.service;

import com.example.student_management_system.ai.dto.AIPredictionResponse;

public interface AIService {
    AIPredictionResponse getStudentAcademicIntelligence(Long studentId);
}
