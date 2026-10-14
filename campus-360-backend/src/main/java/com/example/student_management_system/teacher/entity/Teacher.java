package com.example.student_management_system.teacher.entity;

import com.example.student_management_system.entity.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "teachers")
@Data
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeId;
    private String firstName;
    private String lastName;
    private String department;
    private String designation;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
