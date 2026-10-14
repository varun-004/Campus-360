        package com.example.student_management_system.attendance.service.impl;

import com.example.student_management_system.attendance.dto.AttendanceResponse;
import com.example.student_management_system.attendance.dto.CourseAttendanceResponse;
import com.example.student_management_system.attendance.dto.MarkAttendanceRequest;
import com.example.student_management_system.attendance.entity.Attendance;
import com.example.student_management_system.attendance.repository.AttendanceRepository;

import com.example.student_management_system.attendance.service.AttendanceService;
import com.example.student_management_system.course.entity.Course;
import com.example.student_management_system.course.repository.CourseRepository;

import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.student.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl
        implements AttendanceService {

    private final AttendanceRepository
            attendanceRepository;

    private final StudentRepository
            studentRepository;

    private final CourseRepository
            courseRepository;

    /*
    |--------------------------------------------------------------------------
    | MARK ATTENDANCE
    |--------------------------------------------------------------------------
    */

    @Override
    public AttendanceResponse markAttendance(
            MarkAttendanceRequest request
    ) {

        Student student = studentRepository.findById(
                request.getStudentId()
        ).orElseThrow(() ->
                new RuntimeException("Student not found")
        );

        Course course = courseRepository.findById(
                request.getCourseId()
        ).orElseThrow(() ->
                new RuntimeException("Course not found")
        );

        Attendance attendance = attendanceRepository
                .findByStudent_IdAndCourse_IdAndAttendanceDate(
                        request.getStudentId(),
                        request.getCourseId(),
                        request.getAttendanceDate()
                )
                .orElse(
                        Attendance.builder()
                                .student(student)
                                .course(course)
                                .attendanceDate(request.getAttendanceDate())
                                .build()
                );

        attendance.setPresent(request.getPresent());

        attendanceRepository.save(attendance);

        return mapToResponse(attendance);
    }

    @org.springframework.transaction.annotation.Transactional
    @Override
    public List<AttendanceResponse> markAttendanceBulk(
            List<MarkAttendanceRequest> requests
    ) {
        if (requests == null || requests.isEmpty()) {
            return List.of();
        }

        return requests.stream()
                .map(this::markAttendance)
                .toList();
    }

    /*
    |--------------------------------------------------------------------------
    | GET COURSE ATTENDANCE
    |--------------------------------------------------------------------------
    */

    @Override
    public List<AttendanceResponse>
    getAttendanceByCourse(
            Long courseId
    ) {

        return attendanceRepository.findByCourseId(courseId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /*
    |--------------------------------------------------------------------------
    | GET STUDENT ATTENDANCE
    |--------------------------------------------------------------------------
    */

    @Override
    public List<AttendanceResponse>
    getAttendanceByStudent(
            Long studentId
    ) {

        return attendanceRepository.findByStudentId(studentId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /*
    |--------------------------------------------------------------------------
    | MAP RESPONSE
    |--------------------------------------------------------------------------
    */

    private AttendanceResponse
    mapToResponse(
            Attendance attendance
    ) {

        return AttendanceResponse.builder()

                .id(
                        attendance.getId()
                )

                .studentId(
                        attendance.getStudent()
                                .getId()
                )

                .studentName(
                        attendance.getStudent()
                                .getName()
                )

                .courseId(
                        attendance.getCourse()
                                .getId()
                )

                .courseName(
                        attendance.getCourse()
                                .getCourseName()
                )

                .attendanceDate(
                        attendance.getAttendanceDate()
                )

                .present(
                        attendance.getPresent()
                )

                .build();
    }

    @Override
    public double getAttendancePercentage(
            Long studentId
    ) {

        Long total =
                attendanceRepository
                        .getTotalAttendance(
                                studentId
                        );

        Long present =
                attendanceRepository
                        .getPresentAttendance(
                                studentId
                        );

        if (
                total == null ||
                        total == 0
        ) {
            return 0;
        }

        return (
                present * 100.0
        ) / total;
    }

    @Override
    public List<AttendanceResponse>
    getAttendanceByTeacher(
            Long teacherId
    ) {

        return attendanceRepository
                .findByTeacherId(
                        teacherId
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<CourseAttendanceResponse>
    getCourseWiseAttendance(
            Long studentId
    ) {

        // Single DB query: groups by course, aggregates total and present counts
        List<Object[]> rows =
                attendanceRepository
                        .findCourseWiseAttendanceSummaryByStudent(studentId);

        return rows.stream()
                .map(row -> {
                    Long courseId   = (Long)   row[0];
                    String courseName = (String) row[1];
                    long total      = ((Number) row[2]).longValue();
                    long present    = ((Number) row[3]).longValue();
                    long absent     = total - present;
                    double percentage = total == 0
                            ? 0
                            : (present * 100.0) / total;

                    return CourseAttendanceResponse
                            .builder()
                            .courseId(courseId)
                            .courseName(courseName)
                            .totalClasses(total)
                            .present(present)
                            .absent(absent)
                            .percentage(percentage)
                            .build();
                })
                .toList();
    }

    @Override
    public List<AttendanceResponse>
    getAttendanceByDate(
            LocalDate attendanceDate
    ) {

        return attendanceRepository
                .findByAttendanceDate(
                        attendanceDate
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }



}
