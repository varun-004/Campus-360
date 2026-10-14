package com.example.student_management_system.analytics.dto;

import com.example.student_management_system.analytics.enums.RiskLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentRiskDTO {

    private Long studentId;

    private String studentName;

    private double attendance;

    private double marks;

    private RiskLevel riskLevel;
}
