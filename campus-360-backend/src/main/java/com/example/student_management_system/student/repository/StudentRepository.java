        package com.example.student_management_system.student.repository;

import com.example.student_management_system.student.entity.Student;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

        public interface StudentRepository
        extends JpaRepository<Student, Long> {

    @Query("""
        SELECT COUNT(s)
        FROM Student s
    """)
    long getTotalStudents();

    // REQUIRED FOR StudentService
    List<Student> findByNameContainingIgnoreCase(
            String name
    );

    // REQUIRED FOR StudentService pagination
    Page<Student> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );

            Optional<Student> findByEmail(String email);
            boolean existsByEmail(String email);
}
