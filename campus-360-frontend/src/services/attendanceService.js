import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| MARK ATTENDANCE
|--------------------------------------------------------------------------
*/

export const markAttendance =
  async (attendanceData) => {

    const response =
      await api.post(
        "/api/attendance",
        attendanceData
      );

    return response.data;
  };

export const markAttendanceBulk =
  async (attendanceList) => {

    const response =
      await api.post(
        "/api/attendance/bulk",
        attendanceList
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| GET COURSE ATTENDANCE
|--------------------------------------------------------------------------
*/

export const getAttendanceByCourse =
  async (courseId) => {

    const response =
      await api.get(
        `/api/attendance/course/${courseId}`
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| GET STUDENT ATTENDANCE
|--------------------------------------------------------------------------
*/

export const getAttendanceByStudent =
  async (studentId) => {

    const response =
      await api.get(
        `/api/attendance/student/${studentId}`
      );

    return response.data;
  };

export const getAttendancePercentage =
  async (studentId) => {

    const response =
      await api.get(
        `/api/attendance/percentage/${studentId}`
      );

    return response.data;
  };

  export const getCourseWiseAttendance =
  async (studentId) => {

    const response =
      await api.get(
        `/api/attendance/student/${studentId}/course-wise`
      );

    return response.data;
};


/*
|--------------------------------------------------------------------------
| EXPORT ATTENDANCE CSV
|--------------------------------------------------------------------------
*/

export const exportAttendanceCsv =
  async (courseId) => {

    const response =
      await api.get(

        `/api/attendance/course/${courseId}/export`,

        {
          responseType: "blob"
        }

      );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| EXPORT STUDENT ATTENDANCE CSV
|--------------------------------------------------------------------------
*/

export const exportStudentAttendanceCsv =
  async (studentId) => {

    const response =
      await api.get(

        `/api/attendance/student/${studentId}/export`,

        {
          responseType: "blob"
        }

      );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| GET ATTENDANCE BY DATE
|--------------------------------------------------------------------------
*/

export const getAttendanceByDate = async (date) => {

  const response = await api.get(
    `/api/attendance/date/${date}`
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE ATTENDANCE
|--------------------------------------------------------------------------
*/

export const updateAttendance = async (attendanceData) => {

  const response = await api.post(
    "/api/attendance",
    attendanceData
  );

  return response.data;
};