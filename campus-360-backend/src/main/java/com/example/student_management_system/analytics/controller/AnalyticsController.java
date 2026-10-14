        package com.example.student_management_system.analytics.controller;

        import com.example.student_management_system.analytics.dto.DashboardResponseDTO;
        import com.example.student_management_system.analytics.dto.StudentRiskDTO;
        import com.example.student_management_system.analytics.service.AnalyticsService;
        import lombok.RequiredArgsConstructor;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RestController;

        import java.util.List;

        @RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/dashboard")
    public DashboardResponseDTO getDashboardAnalytics() {

        return analyticsService.getDashboardAnalytics();
    }

    @GetMapping("/students-risk")
    public List<StudentRiskDTO> getStudentRisks() {

        return analyticsService.getStudentRisks();
    }
}
