package com.example.student_management_system.report.service;

import com.example.student_management_system.report.dto.StudentReportResponse;

public interface ReportService {

    StudentReportResponse
    generateStudentReport(
            Long studentId
    );

}