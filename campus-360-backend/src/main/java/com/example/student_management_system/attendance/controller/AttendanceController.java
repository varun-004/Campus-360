        package com.example.student_management_system.attendance.controller;

        import com.example.student_management_system.attendance.dto.AttendanceResponse;
        import com.example.student_management_system.attendance.dto.CourseAttendanceResponse;
        import com.example.student_management_system.attendance.dto.MarkAttendanceRequest;
        import com.example.student_management_system.attendance.service.AttendanceService;
        import com.example.student_management_system.attendance.util.AttendanceCsvExporter;
        import com.example.student_management_system.teacher.service.TeacherService;
        import org.springframework.http.HttpHeaders;
        import org.springframework.http.MediaType;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        import java.time.LocalDate;
        import java.util.List;

        @RestController

@RequestMapping("/api/attendance")

public class AttendanceController {

    private final TeacherService teacherService;

    private final AttendanceService attendanceService;


    public AttendanceController(
            TeacherService teacherService,
            AttendanceService attendanceService
    ) {
        this.teacherService = teacherService;
        this.attendanceService = attendanceService;
    }

    /*
    |--------------------------------------------------------------------------
    | MARK ATTENDANCE
    |--------------------------------------------------------------------------
    */

    @PostMapping
    public AttendanceResponse markAttendance(
            @RequestBody
            MarkAttendanceRequest request
    ) {

        return attendanceService
                .markAttendance(request);
    }

    @PostMapping("/bulk")
    public List<AttendanceResponse> markAttendanceBulk(
            @RequestBody
            List<MarkAttendanceRequest> requests
    ) {

        return attendanceService
                .markAttendanceBulk(requests);
    }

    /*
    |--------------------------------------------------------------------------
    | COURSE ATTENDANCE
    |--------------------------------------------------------------------------
    */

    @GetMapping("/course/{courseId}")
    public List<AttendanceResponse>
    getAttendanceByCourse(
            @PathVariable Long courseId
    ) {

        return attendanceService
                .getAttendanceByCourse(
                        courseId
                );
    }

    /*
    |--------------------------------------------------------------------------
    | STUDENT ATTENDANCE
    |--------------------------------------------------------------------------
    */

    @GetMapping("/student/{studentId}")
    public List<AttendanceResponse>
    getAttendanceByStudent(
            @PathVariable Long studentId
    ) {

        return attendanceService
                .getAttendanceByStudent(
                        studentId
                );
    }

    @GetMapping(
            "/percentage/{studentId}"
    )
    public Double getAttendancePercentage(
            @PathVariable Long studentId
    ) {

        return attendanceService
                .getAttendancePercentage(
                        studentId
                );
    }

    @GetMapping("/teacher/{teacherId}")
    public List<AttendanceResponse>
    getTeacherAttendance(
            @PathVariable Long teacherId
    ) {

        return attendanceService
                .getAttendanceByTeacher(
                        teacherId
                );
    }

    @GetMapping(
            "/student/{studentId}/course-wise"
    )
    public List<CourseAttendanceResponse>
    getCourseWiseAttendance(
            @PathVariable Long studentId
    ) {

        return attendanceService
                .getCourseWiseAttendance(
                        studentId
                );
    }

    @GetMapping("/date/{attendanceDate}")
    public List<AttendanceResponse>
    getAttendanceByDate(
            @PathVariable LocalDate attendanceDate
    ) {

        return attendanceService
                .getAttendanceByDate(
                        attendanceDate
                );
    }

    @GetMapping("/course/{courseId}/export")
    public ResponseEntity<String> exportAttendanceCsv(
            @PathVariable Long courseId
    ) {

        List<AttendanceResponse> attendance =
                attendanceService.getAttendanceByCourse(
                        courseId
                );

        String csv =
                AttendanceCsvExporter.export(
                        attendance
                );

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=attendance.csv"
                )

                .contentType(
                        MediaType.TEXT_PLAIN
                )

                .body(csv);
    }

    @GetMapping("/student/{studentId}/export")
    public ResponseEntity<String> exportStudentAttendanceCsv(
            @PathVariable Long studentId
    ) {

        List<AttendanceResponse> attendance =
                attendanceService.getAttendanceByStudent(
                        studentId
                );

        String csv =
                AttendanceCsvExporter.export(
                        attendance
                );

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=attendance-report.csv"
                )

                .contentType(
                        MediaType.TEXT_PLAIN
                )

                .body(csv);
    }
}
