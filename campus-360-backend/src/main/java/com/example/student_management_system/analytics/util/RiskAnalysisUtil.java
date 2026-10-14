package com.example.student_management_system.analytics.util;


import com.example.student_management_system.analytics.enums.RiskLevel;

public class RiskAnalysisUtil {

    public static RiskLevel calculateRisk(
            double attendance,
            double marks
    ) {

        if (attendance < 50 || marks < 40) {
            return RiskLevel.CRITICAL;
        }

        if (attendance < 75 || marks < 60) {
            return RiskLevel.WARNING;
        }

        return RiskLevel.SAFE;
    }
}
