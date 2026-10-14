package com.example.student_management_system.dashboard.service;

import com.example.student_management_system.course.repository.CourseRepository;
import com.example.student_management_system.dashboard.dto.DashboardStatsResponse;
import com.example.student_management_system.enrollment.repository.EnrollmentRepository;
import com.example.student_management_system.student.repository.StudentRepository;
import com.example.student_management_system.teacher.repository.TeacherRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final StudentRepository studentRepository;

    private final TeacherRepository teacherRepository;

    private final CourseRepository courseRepository;

    private final EnrollmentRepository enrollmentRepository;

    @Override
    public DashboardStatsResponse getStats() {

        return DashboardStatsResponse.builder()

                .totalStudents(
                        studentRepository.count()
                )

                .totalTeachers(
                        teacherRepository.count()
                )

                .totalCourses(
                        courseRepository.count()
                )

                .totalEnrollments(
                        enrollmentRepository.count()
                )

                .build();
    }
}