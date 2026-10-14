package com.example.student_management_system.course.dto;
import com.example.student_management_system.student.dto.StudentResponse;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CourseResponse {

    private Long id;

    private String courseCode;

    private String courseName;

    private String description;

    private Integer credits;

    /*
    |--------------------------------------------------------------------------
    | STUDENTS
    |--------------------------------------------------------------------------
    */

    private List<StudentResponse> students;
    private Long teacherId;
    private String teacherName;
}

