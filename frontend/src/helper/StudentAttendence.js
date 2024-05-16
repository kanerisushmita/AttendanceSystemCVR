import React, { useEffect, useState } from "react";
import axios from "axios";
const StudentAttendence = ({ prof_code }) => {
  const [studentAttendence, setStudentAttendence] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/attendence/students", {
        params: { prof_code: prof_code },
      })
      .then((result) => setStudentAttendence(result.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [prof_code]);
  return (
    <div>
      {studentAttendence.length > 0 ? (
        <div className="container">
          <h2>Student Attendance</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Present Students</th>
                <th>Total Present Students</th>
              </tr>
            </thead>
            <tbody>
              {studentAttendence.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.subject}</td>
                  <td>{entry.present_students.join(", ")}</td>
                  <td>{entry.total_present_students}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No classes to Display</div>
      )}
    </div>
  );
};

export default StudentAttendence;
