package com.example.student_management_system.enrollment.repository;

import com.example.student_management_system.enrollment.entity.Enrollment;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Long> {

    @Query("""
        SELECT e.course.courseName,
               COUNT(e.student.id)
        FROM Enrollment e
        GROUP BY e.course.courseName
        ORDER BY COUNT(e.student.id) DESC
    """)
    List<Object[]> getTopCourses(Pageable pageable);

    void deleteByStudentIdAndCourseId(
            Long studentId,
            Long courseId
    );



        long count();




}