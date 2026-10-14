import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| DOWNLOAD STUDENT REPORT CARD (PDF)
|--------------------------------------------------------------------------
| Returns a Blob. The caller must wrap it with new Blob([data], { type: "application/pdf" })
| before calling URL.createObjectURL().
|--------------------------------------------------------------------------
*/

export const downloadStudentReport = async (studentId) => {

    const response = await api.get(

        `/api/report/student/${studentId}`,

        {
            responseType: "arraybuffer",
            headers: {
                Accept: "application/pdf",
            },
        }

    );

    return response.data;
};
