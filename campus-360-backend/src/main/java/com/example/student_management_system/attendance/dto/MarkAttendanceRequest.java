        package com.example.student_management_system.attendance.dto;

import lombok.Data;

import java.time.LocalDate;

        @Data
public class MarkAttendanceRequest {

    private Long studentId;

    private Long courseId;

    private Boolean present;

    private LocalDate attendanceDate;



}
