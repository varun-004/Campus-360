package com.example.student_management_system.analytics.service;

import com.example.student_management_system.analytics.dto.DashboardResponseDTO;
import com.example.student_management_system.analytics.dto.StudentRiskDTO;

import java.util.List;

public interface AnalyticsService {

    DashboardResponseDTO getDashboardAnalytics();

    List<StudentRiskDTO> getStudentRisks();
}