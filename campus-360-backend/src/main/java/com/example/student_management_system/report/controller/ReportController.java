package com.example.student_management_system.report.controller;

import com.example.student_management_system.report.dto.StudentReportResponse;
import com.example.student_management_system.report.service.ReportService;
import com.example.student_management_system.report.util.PdfGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<byte[]> downloadStudentReport(
            @PathVariable Long studentId
    ) {

        StudentReportResponse report =
                reportService.generateStudentReport(
                        studentId
                );

        byte[] pdf =
                PdfGenerator.generateStudentReport(
                        report
                );

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=student-report.pdf"
                )

                .contentType(
                        MediaType.APPLICATION_PDF
                )

                .body(pdf);
    }
}