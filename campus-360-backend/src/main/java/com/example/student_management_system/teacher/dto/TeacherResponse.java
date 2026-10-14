package com.example.student_management_system.teacher.dto;

import lombok.Data;

@Data
public class TeacherResponse {

    private Long id;
    private String employeeId;
    private String firstName;
    private String lastName;
    private String department;
    private String designation;
    private String email;
}