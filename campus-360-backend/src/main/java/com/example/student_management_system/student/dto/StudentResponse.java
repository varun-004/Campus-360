package com.example.student_management_system.student.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponse {

    private Long id;

    private String name;

    private String email;
}

