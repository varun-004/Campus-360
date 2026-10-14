        package com.example.student_management_system.attendance.service;

        import com.example.student_management_system.attendance.dto.AttendanceResponse;
        import com.example.student_management_system.attendance.dto.CourseAttendanceResponse;
        import com.example.student_management_system.attendance.dto.MarkAttendanceRequest;

        import java.time.LocalDate;
        import java.util.List;

        public interface AttendanceService {


    public AttendanceResponse markAttendance(
            MarkAttendanceRequest request);

    List<AttendanceResponse> markAttendanceBulk(
            List<MarkAttendanceRequest> requests);

    List<AttendanceResponse>
    getAttendanceByCourse(
            Long courseId
    );

    List<AttendanceResponse>
    getAttendanceByStudent(
            Long studentId
    );

    double getAttendancePercentage(
            Long studentId
    );
    List<AttendanceResponse>
    getAttendanceByTeacher(
            Long teacherId
    );

    List<CourseAttendanceResponse>
    getCourseWiseAttendance(
            Long studentId
    );

    List<AttendanceResponse>
    getAttendanceByDate(
            LocalDate attendanceDate
    );



}

