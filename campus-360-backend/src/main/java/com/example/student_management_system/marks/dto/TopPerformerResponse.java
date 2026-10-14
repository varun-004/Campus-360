package com.example.student_management_system.marks.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopPerformerResponse {

    private Long studentId;

    private String studentName;

    private Double averageMarks;
}