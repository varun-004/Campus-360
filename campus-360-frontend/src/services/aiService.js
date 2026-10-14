import axios from "../api/axios";

export const getStudentAIPrediction = async (studentId) => {
  const response = await axios.get(`/api/ai/predict/${studentId}`);
  return response.data;
};
