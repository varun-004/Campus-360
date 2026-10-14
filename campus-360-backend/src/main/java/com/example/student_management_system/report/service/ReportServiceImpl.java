package com.example.student_management_system.report.service;

import com.example.student_management_system.attendance.repository.AttendanceRepository;
import com.example.student_management_system.marks.dto.MarksResponse;
import com.example.student_management_system.marks.entity.Marks;
import com.example.student_management_system.marks.repository.MarksRepository;
import com.example.student_management_system.report.dto.StudentReportResponse;
import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl
        implements ReportService {

    private final StudentRepository studentRepository;

    private final MarksRepository marksRepository;

    private final AttendanceRepository attendanceRepository;

    @Override
    public StudentReportResponse
    generateStudentReport(
            Long studentId
    ) {

        Student student =
                studentRepository
                        .findById(studentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found"
                                ));

        List<Marks> marks =
                marksRepository.findByStudentId(
                        studentId
                );

        List<MarksResponse> marksResponses =
                marks.stream()

                        .map(this::mapMarks)

                        .toList();

        Double averageMarks =
                marksRepository
                        .getAverageMarksByStudent(
                                studentId
                        );

        if (averageMarks == null || marks.isEmpty()) {
            averageMarks = 0.0;
        }

        Long totalAttendance =
                attendanceRepository.getTotalAttendance(studentId);

        Long presentAttendance =
                attendanceRepository.getPresentAttendance(studentId);

        double attendancePercentage = 0.0;
        if (totalAttendance != null && totalAttendance > 0 && presentAttendance != null) {
            attendancePercentage = (presentAttendance * 100.0) / totalAttendance;
        }

        Double gpa = marks.isEmpty() ? 0.0 : calculateGpa(averageMarks);

        return StudentReportResponse
                .builder()

                .studentId(
                        student.getId()
                )

                .studentName(
                        student.getName()
                )

                .email(
                        student.getEmail()
                )

                .attendancePercentage(
                        attendancePercentage
                )

                .averageMarks(
                        averageMarks
                )

                .gpa(
                        gpa
                )

                .marks(
                        marksResponses
                )

                .build();
    }

    private MarksResponse mapMarks(
            Marks marks
    ) {

        return MarksResponse
                .builder()

                .id(
                        marks.getId()
                )

                .subject(
                        marks.getSubject()
                )

                .score(
                        marks.getScore()
                )

                .grade(
                        marks.getGrade()
                )

                .studentId(
                        marks.getStudent().getId()
                )

                .studentName(
                        marks.getStudent().getName()
                )

                .courseId(
                        marks.getCourse().getId()
                )

                .courseName(
                        marks.getCourse().getCourseName()
                )

                .build();
    }

    private Double calculateGpa(
            Double average
    ) {

        if (average >= 90) return 4.0;

        if (average >= 80) return 3.5;

        if (average >= 70) return 3.0;

        if (average >= 60) return 2.5;

        return 2.0;
    }

}