package com.example.student_management_system.teacher.service;

import com.example.student_management_system.attendance.entity.Attendance;
import com.example.student_management_system.attendance.repository.AttendanceRepository;
import com.example.student_management_system.course.entity.Course;
import com.example.student_management_system.course.repository.CourseRepository;
import com.example.student_management_system.entity.Role;
import com.example.student_management_system.entity.User;
import com.example.student_management_system.marks.entity.Marks;
import com.example.student_management_system.marks.repository.MarksRepository;
import com.example.student_management_system.repository.UserRepository;
import com.example.student_management_system.teacher.dto.*;
import com.example.student_management_system.teacher.entity.Teacher;
import com.example.student_management_system.teacher.repository.TeacherRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final CourseRepository courseRepository;

    private final MarksRepository marksRepository;

    private final AttendanceRepository attendanceRepository;

    public TeacherServiceImpl(
            TeacherRepository teacherRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            CourseRepository courseRepository,
            MarksRepository marksRepository,
            AttendanceRepository attendanceRepository) {

        this.teacherRepository = teacherRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

        this.courseRepository = courseRepository;
        this.marksRepository = marksRepository;
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public TeacherResponse createTeacher(CreateTeacherRequest request) {

        User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.TEACHER);

        User savedUser = userRepository.save(user);

        Teacher teacher = new Teacher();

        teacher.setEmployeeId(request.getEmployeeId());
        teacher.setFirstName(request.getFirstName());
        teacher.setLastName(request.getLastName());
        teacher.setDepartment(request.getDepartment());
        teacher.setDesignation(request.getDesignation());
        teacher.setUser(savedUser);

        Teacher savedTeacher =
                teacherRepository.save(teacher);

        return mapToResponse(savedTeacher);
    }

    @Override
    public List<TeacherResponse> getAllTeachers() {

        return teacherRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TeacherResponse getTeacherById(Long id) {

        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found"));

        return mapToResponse(teacher);
    }

    @Override
    public TeacherResponse updateTeacher(
            Long id,
            UpdateTeacherRequest request) {

        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found"));

        teacher.setFirstName(request.getFirstName());
        teacher.setLastName(request.getLastName());
        teacher.setDepartment(request.getDepartment());
        teacher.setDesignation(request.getDesignation());

        Teacher updated =
                teacherRepository.save(teacher);

        return mapToResponse(updated);
    }

    @Override
    public void deleteTeacher(Long id) {

        List<Course> courses =
                courseRepository.findByTeacherId(id);

        if (!courses.isEmpty()) {

            throw new RuntimeException(
                    "Teacher is assigned to courses. Remove course assignments before deleting."
            );
        }

        teacherRepository.deleteById(id);
    }
    private TeacherResponse mapToResponse(
            Teacher teacher) {

        TeacherResponse response =
                new TeacherResponse();

        response.setId(teacher.getId());
        response.setEmployeeId(
                teacher.getEmployeeId());
        response.setFirstName(
                teacher.getFirstName());
        response.setLastName(
                teacher.getLastName());
        response.setDepartment(
                teacher.getDepartment());
        response.setDesignation(
                teacher.getDesignation());

        if (teacher.getUser() != null) {
            response.setEmail(
                    teacher.getUser().getEmail());
        }

        return response;
    }

    @Override
    public CourseAnalyticsResponse getCourseAnalytics(
            Long courseId
    ) {

        Course course =
                courseRepository.findById(courseId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Course not found"
                                )
                        );

        long studentCount =
                course.getStudents().size();

        double averageMarks =
                marksRepository
                        .findByCourseId(courseId)
                        .stream()
                        .mapToDouble(Marks::getScore)
                        .average()
                        .orElse(0);

        List<Attendance> attendanceList =
                attendanceRepository
                        .findByCourseId(courseId);

        long presentCount =
                attendanceList.stream()
                        .filter(
                                Attendance::getPresent
                        )
                        .count();

        double attendancePercentage =
                attendanceList.isEmpty()
                        ? 0
                        : (presentCount * 100.0)
                          / attendanceList.size();

        return CourseAnalyticsResponse
                .builder()
                .studentCount(studentCount)
                .averageMarks(averageMarks)
                .attendancePercentage(
                        attendancePercentage
                )
                .build();
    }

    @Override
    public TeacherResponse getTeacherByEmail(
            String email
    ) {

        Teacher teacher =
                teacherRepository
                        .findByUserEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Teacher not found"
                                )
                        );

        return mapToResponse(
                teacher
        );
    }

    @Override
    public boolean ownsCourse(
            Long teacherId,
            Long courseId
    ) {

        Course course =
                courseRepository.findById(
                                courseId
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Course not found"
                                )
                        );

        return course.getTeacher() != null
                &&
                course.getTeacher()
                        .getId()
                        .equals(
                                teacherId
                        );
    }

    @Override
    public TeacherDashboardResponse
    getDashboardStats(
            Long teacherId
    ) {

        List<Course> courses =
                courseRepository.findByTeacherId(
                        teacherId
                );

        long totalCourses =
                courses.size();

        long totalStudents =
                courses.stream()
                        .flatMap(course ->
                                course.getStudents().stream())
                        .distinct()
                        .count();

        long totalAttendanceRecords =
                courses.stream()
                        .mapToLong(course ->
                                attendanceRepository
                                        .findByCourseId(course.getId())
                                        .size())
                        .sum();

        long totalMarksRecords =
                courses.stream()
                        .mapToLong(course ->
                                marksRepository
                                        .findByCourseId(course.getId())
                                        .size())
                        .sum();

        return TeacherDashboardResponse
                .builder()
                .totalCourses(totalCourses)
                .totalStudents(totalStudents)
                .totalAttendanceRecords(totalAttendanceRecords)
                .totalMarksRecords(totalMarksRecords)
                .build();
    }

}