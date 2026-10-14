package com.example.student_management_system.service;

import com.example.student_management_system.auth.AuthResponse;
import com.example.student_management_system.auth.LoginRequest;
import com.example.student_management_system.auth.RegisterRequest;
import com.example.student_management_system.entity.User;
import com.example.student_management_system.repository.UserRepository;
import com.example.student_management_system.security.CustomUserDetailsService;
import com.example.student_management_system.security.JwtService;
import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.student.repository.StudentRepository;
import com.example.student_management_system.teacher.entity.Teacher;
import com.example.student_management_system.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService customUserDetailsService;

    private final StudentRepository studentRepository;

    private final TeacherRepository teacherRepository;

    // REGISTER
    public String register(RegisterRequest request) {

        // FIX: Prevent public self-registration as ADMIN
        if (request.getRole() != null &&
                request.getRole().name().equals("ADMIN")) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Admin accounts cannot be created through public registration."
            );
        }

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole(
                request.getRole()
        );

        User savedUser =
                userRepository.save(user);

        if (request.getRole().name()
                .equals("STUDENT")) {

            Student student =
                    Student.builder()
                            .name(
                                    request.getName()
                            )
                            .email(
                                    request.getEmail()
                            )
                            .build();

            studentRepository.save(student);
        }

        // FIX: Create Teacher entity when registering a TEACHER user
        if (request.getRole().name()
                .equals("TEACHER")) {

            // Only create if not already existing for this user
            if (teacherRepository.findByUserEmail(request.getEmail()).isEmpty()) {
                Teacher teacher = new Teacher();
                teacher.setFirstName(request.getName());
                teacher.setLastName("");
                teacher.setUser(savedUser);
                // Generate a simple employee ID from email prefix
                String empId = "EMP-" + request.getEmail()
                        .split("@")[0]
                        .replaceAll("[^a-zA-Z0-9]", "")
                        .toUpperCase();
                // Ensure uniqueness
                if (teacherRepository.existsByEmployeeId(empId)) {
                    empId = empId + "-" + System.currentTimeMillis() % 10000;
                }
                teacher.setEmployeeId(empId);
                teacherRepository.save(teacher);
            }
        }

        return "User Registered Successfully";
    }



    // LOGIN
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        UserDetails userDetails =
                customUserDetailsService
                        .loadUserByUsername(
                                request.getEmail()
                        );

        String token =
                jwtService.generateToken(userDetails);

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getRole().name()
        );
    }

}