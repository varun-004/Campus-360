        package com.example.student_management_system.attendance.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AttendanceResponse {

    private Long id;

    private Long studentId;

    private String studentName;

    private Long courseId;

    private String courseName;

    private LocalDate attendanceDate;

    private Boolean present;

    private double percentage;

}
