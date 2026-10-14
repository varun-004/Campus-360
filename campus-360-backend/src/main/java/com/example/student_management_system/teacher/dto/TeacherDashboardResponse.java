package com.example.student_management_system.teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDashboardResponse {

    private long totalCourses;

    private long totalStudents;

    private long totalAttendanceRecords;

    private long totalMarksRecords;
}