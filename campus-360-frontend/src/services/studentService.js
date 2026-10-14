import api from "../api/axios";

export const getAllStudents =
  async () => {

    const response =
      await api.get("/students");

    return response.data;
  };



export const getStudentByEmail =
  async (email) => {

    const response =
      await api.get(
        `/students/email/${email}`
      );

    return response.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await api.post("/students", studentData);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`);
};