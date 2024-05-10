import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function SubjectClass() {
    const [subject, setSubject] = useState('');
    const [class_code, setClassCode] = useState()
    const [students_count, setStudentsCount] = useState()
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate()
    const professorDetails = JSON.parse(sessionStorage.getItem("user"));
    const handleSubmit = (e) => {
      console.log("..inside submit")
        e.preventDefault()
        axios.post('http://localhost:3001/api/register/subjectclass',  {prof_code:professorDetails.prof_code, subject, class_code, students_count, latitude, longitude})
        .then(res => {
          console.log(res.data.subject_class_code)
            alert("Subject Class created with code: "+res.data.subject_class_code)
            navigate('/professordashboard')            
        }).catch(err => console.log(err))
    }
    const handleSubjectChange = (e) => {
      setSubject(e.target.value);
    };
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
      }
    };

  useEffect(()=>{
    getLocation();
  })

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Create Subject Class</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="subject">
              <strong>Subject</strong>
            </label>
            <select className="form-select" onChange={handleSubjectChange}>
            <option value="">Select Subject</option>
            {/* Map through options array to create dropdown options */}
            {professorDetails.subjects.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          {/* Display the selected value */}
          <p>Selected value: {subject}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
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
            <label htmlFor="students_count">
              <strong>Students Count</strong>
            </label>
            <input
              type="text"
              placeholder="Enter number of Students"
              name="students_count"
              className="form-control rounded-0"
              onChange={(e) => setStudentsCount(e.target.value)}
            />
          </div>
          {error && <p>Error: {error}</p>}
          {latitude && <p>Latitude: {latitude}</p>}
          {longitude && <p>Longitude: {longitude}</p>}
          <br/>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          </form>
      </div>
    </div>
  );
}

export default SubjectClass;
