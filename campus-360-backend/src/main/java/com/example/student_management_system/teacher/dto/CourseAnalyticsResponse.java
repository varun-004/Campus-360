package com.example.student_management_system.teacher.dto;

import com.example.student_management_system.marks.dto.TopPerformerResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseAnalyticsResponse {

    private Long studentCount;

    private Double averageMarks;

    private Double attendancePercentage;

    private List<TopPerformerResponse>
            topPerformers;
}