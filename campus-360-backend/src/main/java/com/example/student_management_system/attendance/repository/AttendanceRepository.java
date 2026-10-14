        package com.example.student_management_system.attendance.repository;

import com.example.student_management_system.attendance.entity.Attendance;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


        public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    @Query("""
        SELECT COUNT(a)
        FROM Attendance a
        WHERE a.student.id = :studentId
    """)
    Long getTotalAttendance(
            @Param("studentId")
            Long studentId
    );

    @Query("""
        SELECT COUNT(a)
        FROM Attendance a
        WHERE a.student.id = :studentId
        AND a.present = true
    """)
    Long getPresentAttendance(
            @Param("studentId")
            Long studentId
    );

    @Query("""
        SELECT AVG(
            CASE
                WHEN a.present = true THEN 100
                ELSE 0
            END
        )
        FROM Attendance a
    """)
    Double getAverageAttendance();

    @Query("""
        SELECT AVG(
            CASE
                WHEN a.present = true THEN 100
                ELSE 0
            END
        )
        FROM Attendance a
        WHERE a.student.id = :studentId
    """)
    Double getAverageAttendanceByStudent(
            @Param("studentId")
            Long studentId
    );

    @Query("""
        SELECT a.student.id,
               AVG(
                   CASE
                       WHEN a.present = true THEN 100
                       ELSE 0
                   END
               )
        FROM Attendance a
        GROUP BY a.student.id
    """)
    List<Object[]> getAverageAttendanceAllStudents();

    List<Attendance> findByCourseId(Long courseId);

    List<Attendance> findByStudentId(Long studentId);

    List<Attendance> findByStudentIdAndCourseId(Long studentId, Long courseId);

            void deleteByStudentIdAndCourseId(
                    Long studentId,
                    Long courseId
            );

            @Modifying
            @Transactional
            @Query("""
DELETE FROM Attendance a
WHERE a.student.id = :studentId
AND a.course.id = :courseId
""")
            void deleteAttendanceByStudentAndCourse(
                    @Param("studentId") Long studentId,
                    @Param("courseId") Long courseId
            );

            void deleteByStudent_IdAndCourse_Id(
                    Long studentId,
                    Long courseId
            );

            Optional<Attendance>
            findByStudent_IdAndCourse_IdAndAttendanceDate(
                    Long studentId,
                    Long courseId,
                    LocalDate attendanceDate
            );

            @Query("""
SELECT a
FROM Attendance a
WHERE a.course.teacher.id = :teacherId
""")
            List<Attendance> findByTeacherId(
                    @Param("teacherId")
                    Long teacherId
            );

            List<Attendance> findByAttendanceDate(
                    LocalDate attendanceDate
            );

            /**
             * Returns one row per course with aggregate totals computed at DB level.
             * Each element is Object[]: [courseId(Long), courseName(String), total(Long), present(Long)]
             */
            @Query("""
SELECT a.course.id,
       a.course.courseName,
       COUNT(a),
       SUM(CASE WHEN a.present = true THEN 1 ELSE 0 END)
FROM Attendance a
WHERE a.student.id = :studentId
GROUP BY a.course.id, a.course.courseName
""")
            List<Object[]> findCourseWiseAttendanceSummaryByStudent(
                    @Param("studentId") Long studentId
            );



}

