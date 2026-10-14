package com.example.student_management_system.teacher.service;

import com.example.student_management_system.teacher.dto.*;

import java.util.List;

public interface TeacherService {

    TeacherResponse createTeacher(CreateTeacherRequest request);

    List<TeacherResponse> getAllTeachers();

    TeacherResponse getTeacherById(Long id);

    TeacherResponse updateTeacher(Long id,
                                  UpdateTeacherRequest request);

    void deleteTeacher(Long id);

    CourseAnalyticsResponse
    getCourseAnalytics(Long courseId);

    TeacherResponse getTeacherByEmail(
            String email
    );

    boolean ownsCourse(
            Long teacherId,
            Long courseId
    );

    TeacherDashboardResponse getDashboardStats(
            Long teacherId
    );

}