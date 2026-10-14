package com.example.student_management_system.course.entity;
import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.teacher.entity.Teacher;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import com.example.student_management_system.enrollment.entity.Enrollment;

@Entity
@Table(name = "courses")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

@Builder


public class Course {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(
            nullable = false,
            unique = true
    )
    private String courseCode;

    @Column(nullable = false)
    private String courseName;

    private String description;

    @Column(nullable = false)
    private Integer credits;

    /*
    |--------------------------------------------------------------------------
    | STUDENTS
    |--------------------------------------------------------------------------
    */

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Enrollment> enrollments = new HashSet<>();

    public Set<Student> getStudents() {
        return enrollments.stream()
                .map(Enrollment::getStudent)
                .collect(Collectors.toSet());
    }

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

}

