import api from "../api/axios";

const BASE_URL = "/api/courses";

export const getAllCourses = async () => {


  const response =
    await api.get(BASE_URL);


  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(
    `${BASE_URL}/${id}`
  );

  return response.data;
};

export const createCourse = async (
  courseData
) => {
  const response = await api.post(
    BASE_URL,
    courseData
  );

  return response.data;
};

export const updateCourse = async (
  id,
  courseData
) => {
  const response = await api.put(
    `${BASE_URL}/${id}`,
    courseData
  );

  return response.data;
};

export const deleteCourse = async (
  id
) => {
  const response = await api.delete(
    `${BASE_URL}/${id}`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| ASSIGN STUDENT
|--------------------------------------------------------------------------
*/

export const assignStudentToCourse =
  async (
    courseId,
    studentId
  ) => {

    const response = await api.post(
      `/api/courses/${courseId}/students/${studentId}`
    );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| REMOVE STUDENT
|--------------------------------------------------------------------------
*/

export const removeStudentFromCourse =
  async (
    courseId,
    studentId
  ) => {

    const response = await api.delete(
      `/api/courses/${courseId}/students/${studentId}`
    );

    return response.data;
  };