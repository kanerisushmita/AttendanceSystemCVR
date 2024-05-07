import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Signup() {
  const [student_name, setName] = useState()
  const [roll_no, setRollNo] = useState()
  const [class_code, setClassCode] = useState()
  const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/register/studentregistration', {student_name, roll_no, class_code, password})
        .then(res => {
            navigate('/studentlogin')
        }).catch(err => console.log(err))
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25"> 
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="student_name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              autoComplete="off"
              name="student_name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="class_code">
              <strong>Class Code</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Class Code"
              autoComplete="off"
              name="class_code"
              className="form-control rounded-0"
              onChange={(e) => setClassCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="roll_no">
              <strong>Roll Number</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Roll Number"
              autoComplete="off"
              name="roll_no"
              className="form-control rounded-0"
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          </form>
          <p>Already Have an Account</p>
          <Link to="/studentlogin" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        
      </div>
    </div>
  );
}

export default Signup;
