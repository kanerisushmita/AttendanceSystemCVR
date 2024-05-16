import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import hasloggedin from "../helper/hasloggedin";
import ProffAttend from "../helper/ProffAttend";
import StudentAttendence from "../helper/StudentAttendence";

function Dashboard() {
  const navigate = useNavigate();
  const professorDetails = JSON.parse(sessionStorage.getItem("user"));
  axios.defaults.withCredentials = true;
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  useEffect(() => {
    console.log(professorDetails);
    if (!hasloggedin) navigate("/professorlogin");
    axios
      .get("http://localhost:3001/api/dashboard/viewSubjectClasses", {
        params: { prof_code: professorDetails.prof_code },
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  }, [navigate]);
  const handleCreateClass = () => {
    navigate("/createsubjectclass");
  };
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center bg-light">
        <div className="p-3 rounded w-15">
          <button
            type="button"
            onClick={handleCreateClass}
            className="btn btn-primary"
          >
            Create Class
          </button>
          <button
            type="button"
            onClick={() => setToggle2(!toggle2)}
            style={{ marginLeft: "15px" }}
            className="btn btn-primary"
          >
            View Student Attendence
          </button>
          {professorDetails.isClass_teacher ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginLeft: "15px" }}
            >
              View all subjects attendance
            </button>
          ) : (
            <></>
          )}
          {professorDetails.isHOD ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginLeft: "15px" }}
              onClick={() => setToggle1(!toggle1)}
            >
              View Professors attendance
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="p-3 rounded w-15">
          <p>Subjects alloted to me:</p>
          {professorDetails.subjects.map((option, index) => (
            <li key={option}>{option}</li>
          ))}
        </div>
      </div>
      {toggle1 ? <ProffAttend /> : <></>}
      {toggle2 ? (
        <StudentAttendence prof_code={professorDetails.prof_code} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Dashboard;
