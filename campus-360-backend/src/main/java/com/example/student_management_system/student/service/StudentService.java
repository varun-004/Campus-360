package com.example.student_management_system.student.service;

import com.example.student_management_system.student.dto.StudentDTO;
import com.example.student_management_system.student.dto.StudentResponse;
import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.student.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StudentService {

    private final StudentRepository repo;



    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public List<StudentResponse> getAllStudents() {
        return repo.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public StudentResponse saveStudent(StudentDTO dto) {

        Student student = new Student();
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());

        Student saved = repo.save(student);
        return convertToDTO(saved);
    }

    public void deleteStudent(Long id) {
        Student existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        repo.delete(existing);
    }

    public StudentResponse getStudentById(Long id) {

        Student student = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return convertToDTO(student);
    }

    public StudentResponse updateStudent(Long id, StudentDTO dto) {

        Student existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existing.setName(dto.getName());
        existing.setEmail(dto.getEmail());

        Student updated = repo.save(existing);
        return convertToDTO(updated);
    }


    public StudentResponse convertToDTO(Student student) {
        return StudentResponse.builder()
                .id(student.getId())
                .name(student.getName())
                .email(student.getEmail())
                .build();
    }

    public Page<StudentResponse> getStudents(Pageable pageable) {

        return repo.findAll(pageable)
                .map(this::convertToDTO);
    }

    public List<StudentResponse> searchByName(String name) {
        return repo.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Page<StudentResponse> searchStudents(String name, Pageable pageable) {

        return repo.findByNameContainingIgnoreCase(name, pageable)
                .map(this::convertToDTO);
    }


    public StudentResponse getStudentByEmail(
            String email
    ) {

        Student student =
                repo.findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Student not found"
                                )
                        );

        return convertToDTO(student);
    }

}