package com.example.student_management_system.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MLPredictionRequest {
    private Long student_id;
    private Double attendance_rate;
    private Double average_score;
    private Double score_std;
    private Integer total_courses;
    private Integer total_assessments;
    private Double min_score;
    private Double max_score;
    private Double score_trend;
}
