package com.example.student_management_system.student.controller;

import com.example.student_management_system.student.dto.StudentDTO;
import com.example.student_management_system.student.dto.StudentResponse;
import com.example.student_management_system.student.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // CREATE STUDENT
    @PostMapping
    public StudentResponse create(
            @Valid @RequestBody StudentDTO dto
    ) {
        return service.saveStudent(dto);
    }

    // GET ALL STUDENTS
    @GetMapping
    public List<StudentResponse> getAll() {
        return service.getAllStudents();
    }

    // GET STUDENT BY ID
    @GetMapping("/{id}")
    public StudentResponse getById(
            @PathVariable Long id
    ) {
        return service.getStudentById(id);
    }

    // UPDATE STUDENT
    @PutMapping("/{id}")
    public StudentResponse update(
            @PathVariable Long id,
            @Valid @RequestBody StudentDTO dto
    ) {
        return service.updateStudent(id, dto);
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {
        service.deleteStudent(id);
        return "Deleted successfully";
    }

    // PAGINATION
    @GetMapping("/page")
    public Page<StudentResponse> getStudents(
            Pageable pageable
    ) {
        return service.getStudents(pageable);
    }

    // SEARCH STUDENTS
    @GetMapping("/search")
    public Page<StudentResponse> search(
            @RequestParam String name,
            Pageable pageable
    ) {
        return service.searchStudents(name, pageable);
    }

    // STUDENT DASHBOARD
    @GetMapping("/dashboard")
    public String studentDashboard() {

        return "WELCOME STUDENT";
    }

    @GetMapping("/email/{email}")
    public StudentResponse
    getStudentByEmail(
            @PathVariable String email
    ) {

        return service
                .getStudentByEmail(email);
    }
}