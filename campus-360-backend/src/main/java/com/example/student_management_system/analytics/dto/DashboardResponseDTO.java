package com.example.student_management_system.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponseDTO {

    private long totalStudents;

    // Added for admin dashboard display
    private long totalTeachers;

    // Added for admin dashboard display
    private long totalCourses;

    private double averageAttendance;

    private double averageMarks;

    private List<CourseStatsDTO> topCourses;
}