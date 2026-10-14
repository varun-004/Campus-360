import api from "../api/axios";

export const getDashboardAnalytics =
  async () => {

    const response =
      await api.get(
        "/api/analytics/dashboard"
      );

    return response.data;
  };

export const getStudentRisks =
  async () => {

    const response =
      await api.get(
        "/api/analytics/students-risk"
      );

    return response.data;
  };


export const getTopCourse = async () => {
    const response = await api.get("/analytics/top-course");
    return response.data;
};