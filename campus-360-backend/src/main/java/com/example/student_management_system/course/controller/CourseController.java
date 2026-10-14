package com.example.student_management_system.course.controller;

import com.example.student_management_system.course.dto.CourseResponse;
import com.example.student_management_system.course.dto.CreateCourseRequest;
import com.example.student_management_system.course.service.CourseService;
import com.example.student_management_system.student.dto.StudentResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourseResponse createCourse(
            @Valid @RequestBody CreateCourseRequest request
    ) {
        return courseService.createCourse(request);
    }



    @PutMapping("/{courseId}")
    public CourseResponse updateCourse(
            @PathVariable Long courseId,
            @Valid @RequestBody CreateCourseRequest request
    ) {
        return courseService.updateCourse(courseId, request);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(
            @PathVariable Long courseId
    ) {
        courseService.deleteCourse(courseId);
    }

    @GetMapping
    public Page<CourseResponse> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search
    ) {
        return courseService.getAllCourses(
                page,
                size,
                search
        );
    }

    @GetMapping("/{id}")
    public CourseResponse getCourseById(
            @PathVariable Long id
    ) {

        return courseService.getCourseById(id);
    }


    @PostMapping("/{courseId}/students/{studentId}")
    public CourseResponse assignStudentToCourse(
            @PathVariable Long courseId,
            @PathVariable Long studentId
    ) {
        return courseService.assignStudentToCourse(
                studentId,
                courseId
        );
    }

    @DeleteMapping("/{courseId}/students/{studentId}")
    public CourseResponse removeStudentFromCourse(
            @PathVariable Long courseId,
            @PathVariable Long studentId
    ) {
        return courseService.removeStudentFromCourse(
                studentId,
                courseId
        );
    }

    @PostMapping("/{courseId}/assign-teacher/{teacherId}")
    public CourseResponse assignTeacher(
            @PathVariable Long courseId,
            @PathVariable Long teacherId) {

        return courseService.assignTeacherToCourse(
                courseId,
                teacherId);
    }

    @GetMapping("/teacher/{teacherId}")
    public List<CourseResponse> getTeacherCourses(
            @PathVariable Long teacherId) {

        return courseService.getCoursesByTeacher(
                teacherId);
    }

    @GetMapping("/{courseId}/students")
    public List<StudentResponse> getStudentsByCourse(
            @PathVariable Long courseId) {

        return courseService.getStudentsByCourse(courseId);
    }


}