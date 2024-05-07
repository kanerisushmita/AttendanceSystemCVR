import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


function Login() {
  const [prof_code, setProfCode] = useState()
  const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get('http://localhost:3001/api/login/professorlogin', {params: {prof_code, password}})
        .then(res => {
            
            if(res.data.Status === "Success") {
              sessionStorage.setItem('user',JSON.stringify(res.data.user))
                if(res.data.user.role === "professor") {
                    navigate('/professordashboard')
                } else {
                    navigate('/login')
                }
            }
            else{
              alert(res.data);
            }
        }).catch(err => console.log("error...",err))
    }

    return(
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="prof_code">
              <strong>Professor Code</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Professor Code"
              autoComplete="off"
              name="prof_code"
              className="form-control rounded-0"
              onChange={(e) => setProfCode(e.target.value)}
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
            Login
          </button>
          </form>
          <p>Already Have an Account</p>
          <Link to="/professorregistration" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Sign Up
          </Link>
        
      </div>
    </div>
    )
}

export default Login;