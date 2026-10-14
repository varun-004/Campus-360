package com.example.student_management_system.controller;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DebugController {

    @GetMapping("/debug")
    public String debug(Authentication authentication) {

        return authentication.getAuthorities().toString();
    }
}