package com.example.student_management_system.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseStatsDTO {

    private String courseName;

    private long totalStudents;
}   