package com.example.student_management_system.marks.service.impl;

import com.example.student_management_system.course.entity.Course;
import com.example.student_management_system.course.repository.CourseRepository;
import com.example.student_management_system.marks.dto.AddMarksRequest;
import com.example.student_management_system.marks.dto.MarksResponse;
import com.example.student_management_system.marks.dto.TopPerformerResponse;
import com.example.student_management_system.marks.dto.UpdateMarksRequest;
import com.example.student_management_system.marks.entity.Marks;
import com.example.student_management_system.marks.repository.MarksRepository;
import com.example.student_management_system.marks.service.MarksService;
import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.student.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarksServiceImpl implements MarksService {

    private final MarksRepository marksRepository;

    private final StudentRepository studentRepository;

    private final CourseRepository courseRepository;

    @Override
    public MarksResponse addMarks(
            AddMarksRequest request
    ) {

        Student student =
                studentRepository.findById(
                                request.getStudentId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Student not found"
                                )
                        );

        Course course =
                courseRepository.findById(
                                request.getCourseId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Course not found"
                                )
                        );

        // VALIDATE ENROLLMENT

        if (!student.getCourses().contains(course)) {

            throw new RuntimeException(
                    "Student is not enrolled in this course"
            );
        }

        // PREVENT DUPLICATE MARKS

        marksRepository
                .findByStudent_IdAndCourse_IdAndSubject(
                        request.getStudentId(),
                        request.getCourseId(),
                        request.getSubject()
                )
                .ifPresent(existing -> {

                    throw new RuntimeException(
                            "Marks already entered for this subject"
                    );

                });

        String grade =
                calculateGrade(
                        request.getScore()
                );

        Marks marks =
                Marks.builder()

                        .subject(
                                request.getSubject()
                        )

                        .score(
                                request.getScore()
                        )

                        .grade(
                                grade
                        )

                        .student(
                                student
                        )

                        .course(
                                course
                        )

                        .build();

        marksRepository.save(
                marks
        );

        return mapToResponse(
                marks
        );
    }

    @org.springframework.transaction.annotation.Transactional
    @Override
    public List<MarksResponse> addMarksBulk(List<AddMarksRequest> requests) {
        if (requests == null || requests.isEmpty()) {
            return List.of();
        }

        return requests.stream()
                .filter(r -> r.getScore() != null)
                .map(request -> {
                    Student student = studentRepository.findById(request.getStudentId())
                            .orElseThrow(() -> new RuntimeException("Student not found: " + request.getStudentId()));

                    Course course = courseRepository.findById(request.getCourseId())
                            .orElseThrow(() -> new RuntimeException("Course not found: " + request.getCourseId()));

                    if (!student.getCourses().contains(course)) {
                        throw new RuntimeException("Student is not enrolled in this course");
                    }

                    String grade = calculateGrade(request.getScore());

                    Marks marks = marksRepository
                            .findByStudent_IdAndCourse_IdAndSubject(
                                    request.getStudentId(),
                                    request.getCourseId(),
                                    request.getSubject()
                            )
                            .orElse(
                                    Marks.builder()
                                            .student(student)
                                            .course(course)
                                            .subject(request.getSubject())
                                            .build()
                            );

                    marks.setScore(request.getScore());
                    marks.setGrade(grade);
                    marksRepository.save(marks);

                    return mapToResponse(marks);
                })
                .toList();
    }

    @Override
    public List<MarksResponse> getStudentMarks(
            Long studentId
    ) {

        List<Marks> marks =
                marksRepository.findByStudentId(studentId);

        return marks.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public double calculateStudentAverage(
            Long studentId
    ) {

        List<Marks> marks =
                marksRepository.findByStudentId(studentId);

        return marks.stream()
                .mapToDouble(Marks::getScore)
                .average()
                .orElse(0);
    }

    @Override
    public double calculateGPA(
            Long studentId
    ) {

        List<Marks> marks =
                marksRepository.findByStudentId(studentId);

        if (marks.isEmpty()) {
            return 0.0;
        }

        double totalWeightedPoints = 0.0;
        int totalCredits = 0;

        for (Marks mark : marks) {
            double score = mark.getScore() != null ? mark.getScore() : 0.0;
            double gpaPoints = scoreToGpaPoints(score);

            int credits = (mark.getCourse() != null && mark.getCourse().getCredits() != null && mark.getCourse().getCredits() > 0)
                    ? mark.getCourse().getCredits()
                    : 1;

            totalWeightedPoints += gpaPoints * credits;
            totalCredits += credits;
        }

        if (totalCredits == 0) {
            return 0.0;
        }

        double gpa = totalWeightedPoints / totalCredits;
        return Math.round(gpa * 100.0) / 100.0;
    }

    private double scoreToGpaPoints(double score) {
        if (score >= 90) return 4.0;
        if (score >= 80) return 3.5;
        if (score >= 70) return 3.0;
        if (score >= 60) return 2.0;
        return 0.0; // Failing marks (< 60) receive 0.0 GPA
    }

    private String calculateGrade(Double score) {

        if (score >= 90) return "A";

        if (score >= 80) return "B";

        if (score >= 70) return "C";

        if (score >= 60) return "D";

        return "F";
    }

    private MarksResponse mapToResponse(
            Marks marks
    ) {

        return MarksResponse.builder()
                .id(marks.getId())
                .subject(marks.getSubject())
                .score(marks.getScore())
                .grade(marks.getGrade())
                .studentId(marks.getStudent().getId())
                .studentName(marks.getStudent().getName())
                .courseId(marks.getCourse().getId())
                .courseName(marks.getCourse().getCourseName())
                .build();
    }


    @Override
    public List<TopPerformerResponse> getTopPerformers() {

        List<Student> students =
                studentRepository.findAll();

        return students.stream()

                .map(student -> {

                    double average =
                            calculateStudentAverage(
                                    student.getId()
                            );

                    return new TopPerformerResponse(
                            student.getId(),
                            student.getName(),
                            average
                    );
                })

                .sorted(
                        (s1, s2) -> Double.compare(
                                s2.getAverageMarks(),
                                s1.getAverageMarks()
                        )
                )

                .limit(10)

                .toList();
    }

    @Override
    public List<MarksResponse> getMarksByCourse(
            Long courseId
    ) {

        return marksRepository
                .findByCourseId(courseId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public MarksResponse updateMarks(
            Long marksId,
            UpdateMarksRequest request
    ) {

        Marks marks =
                marksRepository
                        .findById(marksId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Marks not found"
                                )
                        );

        marks.setScore(
                request.getScore()
        );

        marks.setGrade(
                calculateGrade(
                        request.getScore()
                )
        );

        marksRepository.save(
                marks
        );

        return mapToResponse(
                marks
        );
    }

    @Override
    public void deleteMarks(
            Long marksId
    ) {

        Marks marks =
                marksRepository
                        .findById(marksId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Marks not found"
                                )
                        );

        marksRepository.delete(
                marks
        );
    }

}