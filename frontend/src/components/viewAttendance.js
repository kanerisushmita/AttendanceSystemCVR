import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import hasloggedin from "../helper/hasloggedin";


function Dashboard() {
    const [class_code, setClassCode] = useState();

    const navigate = useNavigate()
    useEffect(() => {
        if (!hasloggedin) navigate('/professorlogin');
    }, [navigate])

    const handleSubmit = () => {
        axios.get('http://localhost:3001/api/dashboard/viewAttendance', { params: { class_code } })
            .then(res => {
                if (res.data !== "No Match Found" && res.data !== "Error") {
                    console.log(res.data)
                    navigate('/showAttendance')
                    sessionStorage.setItem('attendance', JSON.stringify(res.data))
                }
                else if (res.data === "Error") {
                    console.log("No Match Found")
                }
                else
                    throw Error;
            })
            .catch(err => {
                console.log("Error")
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="d-flex bg-white p-3 rounded w-25" > 
            <input
                type="text"
                placeholder="Enter Class Code"
                autoComplete="on"
                name="class_code"
                className="form-control rounded-0 bg-success"
                onChange={(e) => setClassCode(e.target.value)}
            />
            <button onClick={handleSubmit} style={{background:"#5ba3ff"}}>Submit</button>
        </div>
        </div>
    );
}


export default Dashboard;