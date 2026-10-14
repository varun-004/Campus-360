package com.example.student_management_system.attendance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseAttendanceResponse {

    private Long courseId;

    private String courseName;

    private Long totalClasses;

    private Long present;

    private Long absent;

    private double percentage;
}