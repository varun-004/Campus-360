package com.example.student_management_system.course.service;

import com.example.student_management_system.course.dto.CourseResponse;
import com.example.student_management_system.course.dto.CreateCourseRequest;
import com.example.student_management_system.student.dto.StudentResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CourseService {

    CourseResponse createCourse(CreateCourseRequest request);

    CourseResponse getCourseById(Long id);

    List<StudentResponse> getStudentsByCourse(Long courseId);

    CourseResponse updateCourse(
            Long courseId,
            CreateCourseRequest request
    );

    void deleteCourse(Long courseId);

    Page<CourseResponse> getAllCourses(
            int page,
            int size,
            String search
    );
    CourseResponse assignStudentToCourse(
            Long studentId,
            Long courseId
    );

    CourseResponse removeStudentFromCourse(
            Long studentId,
            Long courseId
    );

    CourseResponse assignTeacherToCourse(
            Long courseId,
            Long teacherId);

    List<CourseResponse> getCoursesByTeacher(
            Long teacherId);
}
