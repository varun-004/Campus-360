package com.example.student_management_system.marks.service;

import com.example.student_management_system.marks.dto.AddMarksRequest;
import com.example.student_management_system.marks.dto.MarksResponse;
import com.example.student_management_system.marks.dto.TopPerformerResponse;
import com.example.student_management_system.marks.dto.UpdateMarksRequest;

import java.util.List;

public interface MarksService {

    MarksResponse addMarks(
            AddMarksRequest request
    );

    List<MarksResponse> addMarksBulk(
            List<AddMarksRequest> requests
    );

    List<MarksResponse> getStudentMarks(
            Long studentId
    );

    double calculateStudentAverage(
            Long studentId
    );

    double calculateGPA(
            Long studentId
    );

    List<TopPerformerResponse> getTopPerformers();


    List<MarksResponse>
    getMarksByCourse(Long courseId);

    MarksResponse updateMarks(
            Long marksId,
            UpdateMarksRequest request
    );
    void deleteMarks(Long marksId);


}