import { useState } from "react";

export default function ManageStudents() {
  const [students, setStudents] = useState([
    { name: "John Doe", grade: "A" },
    { name: "Jane Smith", grade: "B" },
    { name: "Mary Johnson", grade: "C" },
  ]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("");
  const [error, setError] = useState("");

  const handleAddStudent = () => {
    if (!newStudentName.trim() || !newStudentGrade.trim()) {
      setError("Both name and grade are required.");
      return;
    }

    setStudents((prevStudents) => [
      ...prevStudents,
      { name: newStudentName, grade: newStudentGrade },
    ]);
    setNewStudentName(""); // Clear name input
    setNewStudentGrade(""); // Clear grade input
    setError(""); // Reset error
  };

  return (
    <div className="bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-white mb-6">Manage Students</h2>

      {/* Error message */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {/* Student List */}
      <ul className="space-y-4 mb-6">
        {students.map((student, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
          >
            <div className="text-lg font-medium">{student.name}</div>
            <div className="text-md text-gray-700">{student.grade}</div>
            <button
              onClick={() => {
                setStudents(students.filter((_, i) => i !== index)); // Remove student from list
              }}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Input and Add Button */}
      <div className="flex flex-col space-y-4 mb-6">
        <input
          type="text"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          placeholder="Enter student's name"
          className="w-full px-4 py-2 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newStudentGrade}
          onChange={(e) => setNewStudentGrade(e.target.value)}
          placeholder="Enter student's grade"
          className="w-full px-4 py-2 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddStudent}
          className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
        >
          Add Student
        </button>
      </div>
    </div>
  );
}
