package com.example.student_management_system.teacher.repository;

import com.example.student_management_system.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByUserEmail(
            String email
    );

    boolean existsByEmployeeId(String employeeId);
}
