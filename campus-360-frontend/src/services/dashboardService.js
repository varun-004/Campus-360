import api from "../api/axios";

// FIX: Use the analytics dashboard endpoint which has real data
// (totalStudents, totalTeachers, totalCourses, averageAttendance, averageMarks, topCourses)
export const getDashboardStats =
  async () => {

    const response =
      await api.get(
        "/api/analytics/dashboard"
      );

    return response.data;
};