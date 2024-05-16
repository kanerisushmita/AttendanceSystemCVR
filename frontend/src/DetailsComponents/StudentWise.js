import React,{useState,useEffect} from "react";
import axios from 'axios';
import './classDetails.css'
function StudentWise(){
    var[classDetails,setClassDetails] = useState([]);
    var[studentDetails,setStudentDetails] = useState([]);
    var[studentAttendencePercentage,setStudentAttendance] = useState();
    useEffect(()=>{
        axios.get('http://localhost:3001/api/classWiseInfo/classWise').then(students=>setClassDetails(students.data)).catch(err=>console.log(err));
    })
    useEffect(()=>{
        axios.get('http://localhost:3001/api/studentInfo/studentWise').then(students=>setStudentDetails(students.data)).catch(err=>console.log(err));
    })

    return(
        
        <div>
        <div style={{width:"100vh"}}>
           <table>
           <thead>
               <tr>
                   <th>
                ClassCode
                   </th>
                   <th>
              RollNumber
               </th>
                   <th>
                   StudentPercentage
                   </th>

               </tr>
           </thead>
           <tbody>
               {
                studentDetails.map((studentDetails)=>{
                   return <tr>
                      <td>{studentDetails.class_code}</td>
                       <td>{studentDetails.roll_no}<br></br></td>
                      <td> 75% </td>                    
                    </tr>
                })
               }  

           </tbody>
        </table>
        </div>
        </div>
    );
}
export default StudentWise;