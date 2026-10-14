package com.example.student_management_system.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalStudents;

    private long totalTeachers;

    private long totalCourses;

    private long totalEnrollments;
}