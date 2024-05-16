import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import hasloggedin from "../helper/hasloggedin";


function Dashboard() {
    const navigate = useNavigate()
    const professorDetails = JSON.parse(sessionStorage.getItem("user"));
    axios.defaults.withCredentials = true;
    useEffect(()=> {
        console.log(professorDetails)
        if(!hasloggedin) navigate('/professorlogin');
        axios.get('http://localhost:3001/api/dashboard/viewSubjectClasses', {params:{prof_code: professorDetails.prof_code}})
        .then(res => {
            
        }).catch(err => console.log(err))
    },[navigate])
    const handleCreateClass = ()=>{
        navigate('/createsubjectclass')
    }
    const handleViewAttendance=()=>{
        navigate('/viewAttendance')
    }
    return ( 
        <div className="d-flex justify-content-center align-items-center bg-light vh-100">
            <div className="p-3 rounded w-15">

                <button type="button" onClick={handleCreateClass} className="btn btn-primary">Create Class</button>
                {
                    professorDetails.isClass_teacher ?            
                    <button type="button" onClick={handleViewAttendance} className="btn btn-primary" style={{"marginLeft":"15px"}}>View all subjects attendance</button>
                    :<></>
                }
            </div>
        
            <div className="p-3 rounded w-15">
                <p>Subjects alloted to me:</p>
                {professorDetails.subjects.map((option, index) => (
                <li>{option}</li>
                ))}
                
            </div>

        </div>
        


     );
}

export default Dashboard;