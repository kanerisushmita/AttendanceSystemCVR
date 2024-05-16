import React,{useState,useEffect} from "react";
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import './classDetails.css'
import { IoIosArrowDown } from "react-icons/io";
import StudentWise from "./StudentWise";
function ClasswiseDetails(){
    var[show,setShow] = useState(false);
   var[students,setStudents] = useState([]);
    var[classTotalCount,setClassTotalCount] = useState(64);
    var[absent,setAbsent] = useState(0);
    var[percentage,setPercentage] = useState([]);
    var navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:3001/api/classWiseInfo/classWise').then(students=>setStudents(students.data)).catch(err=>console.log(err));
    })

    return(
     <div>
     <div style={{width:"100vh"}}>
        <table>
        <thead>
            <tr>
               <th>  </th>
                <th style={{marginLeft:"100px"}}>
             classCode
                </th>
                <th style={{marginLeft:"20px"}}>
               students count
                </th>
                <th>
                percentage
                </th>
                <th>
                createdAt
                </th>
            </tr>
        </thead>
        <tbody>
          {
            students.map(students=>{                
                return <tr>
                    <td onClick={()=>setShow(!show)}><IoIosArrowDown /></td>
                    <td>{students.class_code}</td>
                    <td>{students.students_count}</td>
                    <td>{(students.students_count/classTotalCount)*100}%</td>
                    <td>{students.createdAt}</td>
                </tr>

        
            })
          }
       
        </tbody>

     </table>
     <div>
        {show ? <StudentWise /> : <></>}
        </div>
     </div>
     </div>
    )
}
export default ClasswiseDetails;