
import com.example.student_management_system.marks.dto.MarksResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentReportResponse {

    private Long studentId;

    private String studentName;

    private String email;

    private Double attendancePercentage;

    private Double averageMarks;

    private Double gpa;

    private List<MarksResponse> marks;
}