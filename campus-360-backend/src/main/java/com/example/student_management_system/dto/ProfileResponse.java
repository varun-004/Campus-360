package com.example.student_management_system.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {

    private Long id;
    private String name;
    private String email;
    private String role;
    private String profileImage;

}