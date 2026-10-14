import { useEffect, useState } from "react";

import { getAllStudents }
from "../../services/studentService";

const EnrollStudentsModal = ({
  isOpen,
  onClose,
  onEnroll,
}) => {

  const [students, setStudents] =
    useState([]);

  const [selectedStudent,
    setSelectedStudent] =
    useState("");

  useEffect(() => {

    if (!isOpen) return;

    const fetchStudents =
      async () => {

        try {

          const data =
            await getAllStudents();

          setStudents(data);

        } catch (error) {

          console.error(error);

        }
      };

    fetchStudents();

  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-xl p-6 w-500px">

        <h2 className="text-2xl font-bold mb-4">
          Enroll Student
        </h2>

        <select
          value={selectedStudent}
          onChange={(e) =>
            setSelectedStudent(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg mb-4"
        >

          <option value="">
            Select Student
          </option>

          {students.map(
            (student) => (

              <option
                key={student.id}
                value={student.id}
              >
                {student.name}
              </option>

            )
          )}

        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={!selectedStudent}
            onClick={() =>
              onEnroll(
                Number(
                  selectedStudent
                )
              )
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Enroll
          </button>

        </div>

      </div>

    </div>
  );
};

export default EnrollStudentsModal;