// import { useState } from "react";
// import StudentForm from "./components/StudentForm";
// import * as XLSX from "xlsx";
// import "./App.css";

// function App() {
//   const [students, setStudents] = useState([]);
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [search, setSearch] = useState("");
//   const [message, setMessage] = useState("");

//   // Add Student
//   const addStudent = (student) => {
//     const newId =
//       students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

//     const newStudent = { ...student, id: newId };
//     setStudents([...students, newStudent]);

//     setMessage("Student added successfully");
//     setTimeout(() => setMessage(""), 2000);
//   };

//   // Delete Student
//   const deleteStudent = (id) => {
//     setStudents(students.filter((s) => s.id !== id));
//   };

//   // Edit Student
//   const editStudent = (student) => {
//     setEditingStudent(student);
//   };

//   // Update Student
//   const updateStudent = (updatedStudent) => {
//     setStudents(
//       students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)),
//     );
//     setEditingStudent(null);
//   };

//   // Filter Students
//   const filteredStudents = students.filter((student) =>
//     student.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   // Excel Export
//   const exportExcel = () => {
//     // Map students to enforce column order
//     const dataForExcel = students.map((s) => ({
//       id: s.id,
//       name: s.name,
//       age: s.age,
//       email: s.email,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataForExcel, {
//       header: ["id", "name", "age", "email"], // enforce column order
//     });

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
//     XLSX.writeFile(workbook, "students.xlsx");
//   };

//   return (
//     <div id="root">
//       <h2>Student Records</h2>

//       <StudentForm
//         addStudent={addStudent}
//         editingStudent={editingStudent}
//         updateStudent={updateStudent}
//       />
//       <div className="container">
//         {message && <p className="success-msg">{message}</p>}

//         {students.length === 0 ? (
//           <p className="empty-msg">No student records found</p>
//         ) : (
//           <>
//           <div className="con">
//             <p className="total-students">Total Students: {students.length}</p>

//             <div className="table-controls sbtn">
//               <input
//                 type="text"
//                 placeholder="Search student..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <button onClick={exportExcel}className="button">Download Excel</button>
//             </div>
//             </div>
//               <table  cellPadding="10" style={{ margin: "0 auto" }} className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Email</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredStudents.map((student) => (
//                     <tr key={student.id}>
//                       <td>{student.name}</td>
//                       <td>{student.age}</td>
//                       <td>{student.email}</td>
//                       <td>
//                         <button onClick={() => editStudent(student)} className="but1">
//                           Edit
//                         </button>
//                         <button onClick={() => deleteStudent(student.id)}className="but1">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
            
//          </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import * as XLSX from "xlsx";
import "./App.css";

function App() {

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Save students to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add Student
  const addStudent = (student) => {
    const newId =
      students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

    const newStudent = { ...student, id: newId };
    setStudents([...students, newStudent]);

    setMessage("Student added successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  // Delete Student
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Edit Student
  const editStudent = (student) => {
    setEditingStudent(student);
  };

  // Update Student
  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    setEditingStudent(null);
  };

  // Filter Students
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  // Excel Export
  const exportExcel = () => {

    const dataForExcel = students.map((s) => ({
      id: s.id,
      name: s.name,
      age: s.age,
      email: s.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, {
      header: ["id", "name", "age", "email"],
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <div id="root">
      <h2 className="heading">Student Registry</h2>

      <StudentForm
        addStudent={addStudent}
        editingStudent={editingStudent}
        updateStudent={updateStudent}
      />

      <div className="container">

        {message && <p className="success-msg">{message}</p>}

        {students.length === 0 ? (
          <p className="empty-msg">No student records found</p>
        ) : (
          <>
            <div className="con">

              <p className="total-students">
                Total Students: {students.length}
              </p>

              <div className="table-controls sbtn">
                <input
                  type="text"
                  placeholder="Search student..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button
                  onClick={exportExcel}
                  className="button"
                >
                  Download Excel
                </button>

              </div>
            </div>

            <table
              cellPadding="10"
              style={{ margin: "0 auto" }}
              className="table"
            >

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.email}</td>
                    <td>
                      <button
                        onClick={() => editStudent(student)}
                        className="but1"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="but1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default App;