        package com.example.student_management_system.attendance.entity;

import com.example.student_management_system.course.entity.Course;
import com.example.student_management_system.student.entity.Student;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;

@Entity

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

@Builder
public class Attendance {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    /*
    |--------------------------------------------------------------------------
    | STUDENT
    |--------------------------------------------------------------------------
    */

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    /*
    |--------------------------------------------------------------------------
    | COURSE
    |--------------------------------------------------------------------------
    */

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    /*
    |--------------------------------------------------------------------------
    | DATE
    |--------------------------------------------------------------------------
    */
    @Column(nullable = false)

    private LocalDate attendanceDate;

    /*
    |--------------------------------------------------------------------------
    | STATUS
    |--------------------------------------------------------------------------
    */

    private Boolean present;




}
