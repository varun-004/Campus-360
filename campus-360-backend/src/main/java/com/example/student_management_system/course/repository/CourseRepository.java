package com.example.student_management_system.course.repository;

import com.example.student_management_system.course.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCourseCode(String courseCode);

    boolean existsByCourseCode(String courseCode);

    Page<Course> findByCourseNameContainingIgnoreCase(
            String courseName,
            Pageable pageable
    );
    List<Course> findByTeacherId(Long teacherId);



}
