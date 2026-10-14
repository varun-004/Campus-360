        package com.example.student_management_system.student.entity;

import com.example.student_management_system.course.entity.Course;

import jakarta.persistence.*;

import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import com.example.student_management_system.enrollment.entity.Enrollment;

@Entity

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

@Builder
public class Student {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private String name;

    private String email;

    /*
    |--------------------------------------------------------------------------
    | COURSES
    |--------------------------------------------------------------------------
    */

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Enrollment> enrollments = new HashSet<>();

    public Set<Course> getCourses() {
        return enrollments.stream()
                .map(Enrollment::getCourse)
                .collect(Collectors.toSet());
    }

}
