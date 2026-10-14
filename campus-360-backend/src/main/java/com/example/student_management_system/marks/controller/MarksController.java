package com.example.student_management_system.marks.controller;

import com.example.student_management_system.marks.dto.AddMarksRequest;
import com.example.student_management_system.marks.dto.MarksResponse;
import com.example.student_management_system.marks.dto.TopPerformerResponse;
import com.example.student_management_system.marks.dto.UpdateMarksRequest;
import com.example.student_management_system.marks.service.MarksService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@RequiredArgsConstructor
public class MarksController {

    private final MarksService marksService;

    // GET STUDENT MARKS

    @GetMapping("/student/{studentId}")
    public List<MarksResponse> getStudentMarks(
            @PathVariable Long studentId
    ) {

        return marksService.getStudentMarks(studentId);
    }

    // GET STUDENT AVERAGE

    @GetMapping("/average/{studentId}")
    public double getAverage(
            @PathVariable Long studentId
    ) {

        return marksService
                .calculateStudentAverage(studentId);
    }

    // GET GPA

    @GetMapping("/gpa/{studentId}")
    public double getGPA(
            @PathVariable Long studentId
    ) {

        return marksService.calculateGPA(studentId);
    }

    @GetMapping("/top-performers")
    public List<TopPerformerResponse> getTopPerformers() {

        return marksService.getTopPerformers();
    }

    @PostMapping
    public MarksResponse addMarks(
            @RequestBody
            AddMarksRequest request
    ) {

        return marksService
                .addMarks(request);
    }

    @PostMapping("/bulk")
    public List<MarksResponse> addMarksBulk(
            @RequestBody
            List<AddMarksRequest> requests
    ) {

        return marksService
                .addMarksBulk(requests);
    }

    @GetMapping("/course/{courseId}")
    public List<MarksResponse>
    getMarksByCourse(
            @PathVariable Long courseId
    ) {

        return marksService
                .getMarksByCourse(
                        courseId
                );
    }

    @PutMapping("/{marksId}")
    public MarksResponse updateMarks(
            @PathVariable Long marksId,
            @RequestBody UpdateMarksRequest request
    ) {

        return marksService.updateMarks(
                marksId,
                request
        );
    }

    @DeleteMapping("/{marksId}")
    public void deleteMarks(
            @PathVariable Long marksId
    ) {
        marksService.deleteMarks(marksId);
    }


}