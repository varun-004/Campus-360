package com.example.student_management_system.dashboard.controller;

import com.example.student_management_system.dashboard.dto.DashboardStatsResponse;
import com.example.student_management_system.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsResponse getStats() {

        return dashboardService.getStats();
    }
}