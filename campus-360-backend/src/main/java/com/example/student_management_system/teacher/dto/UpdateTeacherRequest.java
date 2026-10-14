package com.example.student_management_system.teacher.dto;

import lombok.Data;

@Data
public class UpdateTeacherRequest {

    private String firstName;
    private String lastName;
    private String department;
    private String designation;
}