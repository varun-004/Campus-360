
        package com.example.student_management_system.marks.repository;

import com.example.student_management_system.marks.entity.Marks;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MarksRepository
        extends JpaRepository<Marks, Long> {

    // Existing analytics method
    @Query("""
        SELECT AVG(m.score)
        FROM Marks m
    """)
    Double getAverageMarks();

    // Existing analytics method
    @Query("""
        SELECT AVG(m.score)
        FROM Marks m
        WHERE m.student.id = :studentId
    """)
    Double getAverageMarksByStudent(Long studentId);

    @Query("""
        SELECT m.student.id, AVG(m.score)
        FROM Marks m
        GROUP BY m.student.id
    """)
    List<Object[]> getAverageMarksAllStudents();

    // REQUIRED FOR MarksServiceImpl
    List<Marks> findByStudentId(Long studentId);

    List<Marks>
    findByCourseId(Long courseId);

    void deleteByStudentIdAndCourseId(
            Long studentId,
            Long courseId
    );

    void deleteByStudent_IdAndCourse_Id(
            Long studentId,
            Long courseId
    );

    Optional<Marks>
    findByStudent_IdAndCourse_IdAndSubject(
            Long studentId,
            Long courseId,
            String subject
    );





}
