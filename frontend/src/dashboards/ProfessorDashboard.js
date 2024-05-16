import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import hasloggedin from "../helper/hasloggedin";
import ClasswiseDetails from "../DetailsComponents/ClasswiseDetails";
import { Link } from "react-router-dom";
function Dashboard() {
    const [show,setShow] = useState(false);
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
 
    return ( 
        <>
        <div className="d-flex justify-content-center align-items-center bg-black vh-50">
            <div className="bg-white">
            <div className="p-3 rounded w-15">

                <button type="button" onClick={handleCreateClass} className="btn btn-primary">Create Class</button>
                {
                    professorDetails.isClass_teacher ?            
                    <button type="button" className="btn btn-primary" style={{"marginLeft":"15px"}}>View all subjects attendance</button>
                    :<></>
                }
            </div>
        
            <div className="p-3 rounded w-15">
                <p>Subjects alloted to me:</p>
                {professorDetails.subjects.map((option, index) => (
                <li>{option}</li>
                ))}
                
            </div>
            
            <div>
            {professorDetails.isHOD ? 
            <button type="button" className="btn btn-primary" onClick={()=>setShow(!show)} >Show Class Details</button> : <></>}
            </div>
           
           </div>
        </div>
        <div style={{marginLeft:"500px"}}>{
                show? <ClasswiseDetails /> : <></>
            }</div>
        </>

     );
}

export default Dashboard;