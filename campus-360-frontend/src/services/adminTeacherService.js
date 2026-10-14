import api from "../api/axios";

export const getAllTeachers =
  async () => {

    const response =
      await api.get("/api/teachers");

    return response.data;
};

export const deleteTeacher =
  async (id) => {

    await api.delete(
      `/api/teachers/${id}`
    );
};

export const createTeacher =
  async (teacherData) => {

    const response =
      await api.post(
        "/api/teachers",
        teacherData
      );

    return response.data;
};

export const getTeacherById =
  async (id) => {

    const response =
      await api.get(
        `/api/teachers/${id}`
      );

    return response.data;
};

export const updateTeacher =
  async (
    id,
    teacherData
  ) => {

    const response =
      await api.put(
        `/api/teachers/${id}`,
        teacherData
      );

    return response.data;
};