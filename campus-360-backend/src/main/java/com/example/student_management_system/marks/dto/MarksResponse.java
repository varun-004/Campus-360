package com.example.student_management_system.marks.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MarksResponse {

    private Long id;

    private String subject;

    private Double score;

    private String grade;

    private Long studentId;

    private String studentName;

    private Long courseId;

    private String courseName;
}