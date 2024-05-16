import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfessorTable = () => {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/attendence/professors")
      .then((response) => {
        setProfessors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching professors:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Professor Attendance</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Professor Name</th>
            <th>Professor Code</th>
            <th>Class Count</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((professor) => (
            <tr key={professor.prof_code}>
              <td>{professor.prof_name}</td>
              <td>{professor.prof_code}</td>
              <td>{professor.class_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessorTable;
