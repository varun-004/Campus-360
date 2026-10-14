package com.example.student_management_system.course.service;

import com.example.student_management_system.attendance.repository.AttendanceRepository;
import com.example.student_management_system.course.dto.CourseResponse;
import com.example.student_management_system.course.dto.CreateCourseRequest;
import com.example.student_management_system.course.entity.Course;
import com.example.student_management_system.course.repository.CourseRepository;
import com.example.student_management_system.enrollment.entity.Enrollment;
import com.example.student_management_system.enrollment.repository.EnrollmentRepository;
import com.example.student_management_system.marks.repository.MarksRepository;
import com.example.student_management_system.student.dto.StudentResponse;
import com.example.student_management_system.student.entity.Student;
import com.example.student_management_system.student.repository.StudentRepository;
import com.example.student_management_system.teacher.entity.Teacher;
import com.example.student_management_system.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    private final StudentRepository studentRepository;

    private final EnrollmentRepository enrollmentRepository;

    private final TeacherRepository teacherRepository;

    private final AttendanceRepository attendanceRepository;
    private final MarksRepository marksRepository;



    /*
    |--------------------------------------------------------------------------
    | CREATE COURSE
    |--------------------------------------------------------------------------
    */

    @Override
    public CourseResponse createCourse(
            CreateCourseRequest request
    ) {

        Teacher teacher =
                teacherRepository.findById(
                                request.getTeacherId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Teacher not found"
                                )
                        );

        Course course = Course.builder()

                .courseCode(
                        request.getCourseCode()
                )

                .courseName(
                        request.getCourseName()
                )

                .description(
                        request.getDescription()
                )

                .credits(
                        request.getCredits()
                )

                .teacher(
                        teacher
                )

                .build();

        courseRepository.save(course);

        return mapToResponse(course);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE COURSE
    |--------------------------------------------------------------------------
    */

    @Override
    public CourseResponse updateCourse(
            Long courseId,
            CreateCourseRequest request
    ) {

        Course course = courseRepository.findById(courseId)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Course not found"
                        )
                );

        course.setCourseName(
                request.getCourseName()
        );

        course.setCourseCode(
                request.getCourseCode()
        );

        course.setDescription(
                request.getDescription()
        );

        course.setCredits(
                request.getCredits()
        );

        courseRepository.save(course);

        return mapToResponse(course);
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE COURSE
    |--------------------------------------------------------------------------
    */

    @Override
    public void deleteCourse(
            Long courseId
    ) {

        Course course = courseRepository.findById(courseId)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Course not found"
                        )
                );

        courseRepository.delete(course);
    }

    /*
    |--------------------------------------------------------------------------
    | GET ALL COURSES
    |--------------------------------------------------------------------------
    */

    @Override
    public Page<CourseResponse> getAllCourses(
            int page,
            int size,
            String search
    ) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("courseName").ascending()
        );

        Page<Course> courses;

        if (
                search != null &&
                        !search.isBlank()
        ) {

            courses = courseRepository
                    .findByCourseNameContainingIgnoreCase(
                            search,
                            pageable
                    );

        } else {

            courses = courseRepository
                    .findAll(pageable);
        }

        return courses.map(
                this::mapToResponse
        );
    }

    /*
    |--------------------------------------------------------------------------
    | GET COURSE BY ID
    |--------------------------------------------------------------------------
    */

    @Override
    public CourseResponse getCourseById(
            Long id
    ) {

        Course course = courseRepository

                .findById(id)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Course not found"
                        )
                );

        return mapToResponse(course);
    }

    /*
    |--------------------------------------------------------------------------
    | ASSIGN STUDENT
    |--------------------------------------------------------------------------
    */

    @Override
    public CourseResponse assignStudentToCourse(
            Long studentId,
            Long courseId
    ) {

        Student student = studentRepository
                .findById(studentId)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found"
                        )
                );

        Course course = courseRepository
                .findById(courseId)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Course not found"
                        )
                );

        if (
                student.getCourses()
                        .contains(course)
        ) {

            throw new RuntimeException(
                    "Student already enrolled"
            );
        }

    /*
    |--------------------------------------------------------------------------
    | SAVE ENROLLMENT RECORD
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | SAVE ENROLLMENT RECORD
    |--------------------------------------------------------------------------
    */

        Enrollment enrollment =
                Enrollment.builder()
                        .student(student)
                        .course(course)
                        .build();

        enrollmentRepository.save(enrollment);

        return mapToResponse(course);
    }

    /*
    |--------------------------------------------------------------------------
    | REMOVE STUDENT
    |--------------------------------------------------------------------------
    */


    @Override
    @Transactional
    public CourseResponse removeStudentFromCourse(
            Long studentId,
            Long courseId
    ) {

        Student student = studentRepository
                .findById(studentId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found"
                        )
                );

        Course course = courseRepository
                .findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Course not found"
                        )
                );

        // Delete attendance
        attendanceRepository.deleteByStudent_IdAndCourse_Id(
                studentId,
                courseId
        );

        // Delete marks
        marksRepository.deleteByStudent_IdAndCourse_Id(
                studentId,
                courseId
        );

        // Remove enrollment via repository
        enrollmentRepository.deleteByStudentIdAndCourseId(studentId, courseId);

        return mapToResponse(course);
    }
    /*
    |--------------------------------------------------------------------------
    | MAP RESPONSE
    |--------------------------------------------------------------------------
    */

    private CourseResponse mapToResponse(
            Course course
    ) {

        return CourseResponse.builder()

                .id(course.getId())

                .courseCode(course.getCourseCode())

                .courseName(course.getCourseName())

                .description(course.getDescription())

                .credits(course.getCredits())

                .teacherId(
                        course.getTeacher() != null
                                ? course.getTeacher().getId()
                                : null
                )

                .teacherName(
                        course.getTeacher() != null
                                ? course.getTeacher().getFirstName()
                                : null
                )

                .students(
                        course.getStudents()
                                .stream()
                                .map(student ->
                                        StudentResponse.builder()
                                                .id(student.getId())
                                                .name(student.getName())
                                                .email(student.getEmail())
                                                .build()
                                )
                                .toList()
                )

                .build();
    }

    @Override
    public CourseResponse assignTeacherToCourse(
            Long courseId,
            Long teacherId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found"));

        course.setTeacher(teacher);

        Course savedCourse = courseRepository.save(course);

        return mapToResponse(savedCourse);
    }


    @Override
    public List<CourseResponse> getCoursesByTeacher(
            Long teacherId) {

        return courseRepository.findByTeacherId(teacherId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<StudentResponse> getStudentsByCourse(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new RuntimeException("Course not found"));

        return course.getStudents()
                .stream()
                .map(student ->
                        StudentResponse.builder()
                                .id(student.getId())
                                .name(student.getName())
                                .email(student.getEmail())
                                .build()
                )
                .toList();
    }
}

