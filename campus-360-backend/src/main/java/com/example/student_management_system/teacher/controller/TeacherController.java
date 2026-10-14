package com.example.student_management_system.teacher.controller;

import com.example.student_management_system.teacher.dto.*;
import com.example.student_management_system.teacher.service.TeacherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(
            TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping
    public TeacherResponse createTeacher(
            @RequestBody CreateTeacherRequest request) {

        return teacherService.createTeacher(request);
    }

    @GetMapping
    public List<TeacherResponse> getAllTeachers() {

        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public TeacherResponse getTeacherById(
            @PathVariable Long id) {

        return teacherService.getTeacherById(id);
    }

    @PutMapping("/{id}")
    public TeacherResponse updateTeacher(
            @PathVariable Long id,
            @RequestBody UpdateTeacherRequest request) {

        return teacherService.updateTeacher(
                id,
                request);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(
            @PathVariable Long id) {

        teacherService.deleteTeacher(id);
    }

    @GetMapping("/course/{courseId}/analytics")
    public CourseAnalyticsResponse getAnalytics(
            @PathVariable Long courseId
    ) {
        return teacherService
                .getCourseAnalytics(courseId);
    }

    @GetMapping("/email/{email}")
    public TeacherResponse getTeacherByEmail(
            @PathVariable String email
    ) {

        return teacherService
                .getTeacherByEmail(email);
    }

    @GetMapping(
            "/{teacherId}/course/{courseId}/access"
    )
    public boolean checkAccess(
            @PathVariable Long teacherId,
            @PathVariable Long courseId
    ) {

        return teacherService
                .ownsCourse(
                        teacherId,
                        courseId
                );
    }

    @GetMapping("/{teacherId}/dashboard")
    public TeacherDashboardResponse
    getDashboard(
            @PathVariable Long teacherId
    ) {

        return teacherService.getDashboardStats(
                teacherId
        );
    }



}
