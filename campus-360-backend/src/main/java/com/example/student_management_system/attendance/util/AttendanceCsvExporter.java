package com.example.student_management_system.attendance.util;

import com.example.student_management_system.attendance.dto.AttendanceResponse;

import java.util.List;

public class AttendanceCsvExporter {

    public static String export(
            List<AttendanceResponse> attendance
    ) {

        StringBuilder csv =
                new StringBuilder();

        csv.append(
                "Student,Course,Date,Status\n"
        );

        for (AttendanceResponse record : attendance) {

            csv.append(record.getStudentName())
                    .append(",")

                    .append(record.getCourseName())
                    .append(",")

                    .append(record.getAttendanceDate())
                    .append(",")

                    .append(
                            record.getPresent()
                                    ? "Present"
                                    : "Absent"
                    )

                    .append("\n");
        }

        return csv.toString();
    }
}