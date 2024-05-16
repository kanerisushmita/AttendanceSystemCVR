import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function StudentAttendance() {
    const [attendanceCount, setAttendanceCount] = useState(0);
    const [formData, setFormData] = useState({
        subject: '',
        startDate: '',
        endDate: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [professorClassCount, setProfessorClassCount] = useState(0);
    const [studentDetails, setStudentDetails] = useState({});

    useEffect(() => {
        
        const studentData = sessionStorage.getItem("user");
        if (studentData) {
            const parsedStudentData = JSON.parse(studentData);
            setStudentDetails(parsedStudentData);
            console.log("Retrieved student details:", parsedStudentData);
        } else {
            console.error("No student data found in sessionStorage");
        }
    }, []);

    const fetchAttendanceData = useCallback(async () => {
        if (!studentDetails.roll_no || !studentDetails.class_code) {
            console.error('Missing student details.');
            return;
        }
        try {
            const attendanceUrl = `http://localhost:3001/api/attendanceController/getStudentCount?rollNumber=${studentDetails.roll_no}&class_code=${studentDetails.class_code}&subject=${formData.subject}&startDate=${formData.startDate}&endDate=${formData.endDate}`;
            const classCountUrl = `http://localhost:3001/api/attendanceController/getProfessorClassCount?class_code=${studentDetails.class_code}&subject=${formData.subject}&startDate=${formData.startDate}&endDate=${formData.endDate}`;

            console.log("Fetching attendance data from:", attendanceUrl);
            console.log("Fetching class count data from:", classCountUrl);

            const studentAttendanceResponse = await axios.get(attendanceUrl);
            const professorClassCountResponse = await axios.get(classCountUrl);

            console.log("Attendance response:", studentAttendanceResponse.data);
            console.log("Class count response:", professorClassCountResponse.data);

           
            if (typeof studentAttendanceResponse.data === 'number') {
                setAttendanceCount(studentAttendanceResponse.data);
            } else {
                console.error('Unexpected response format for student attendance:', studentAttendanceResponse.data);
            }

            setProfessorClassCount(professorClassCountResponse.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    }, [studentDetails, formData]);

    useEffect(() => {
        if (submitted) {
            fetchAttendanceData();
        }
    }, [submitted, fetchAttendanceData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const convertDate = (date, isEndDate = false) => {
            const [year, month, day] = date.split('-');
            return isEndDate ? `${year}-${month}-${day}T23:59:59.999Z` : `${year}-${month}-${day}T00:00:00.000Z`;
        };

        const formattedData = {
            ...formData,
            startDate: convertDate(formData.startDate),
            endDate: convertDate(formData.endDate, true)
        };

        console.log("Formatted form data:", formattedData);

        setFormData(formattedData);
        setSubmitted(true);
    };

    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "40px", marginBottom: "25px" }}>Student Attendance</h2>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="bg-white p-5 rounded" style={{ width: '50%', marginTop: '-30vh' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Subject:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Start Date (YYYY-MM-DD):</label>
                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                placeholder="YYYY-MM-DD"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">End Date (YYYY-MM-DD):</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                placeholder="YYYY-MM-DD"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            {submitted && (
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Roll Number</th>
                                <th style={tableHeaderStyle}>Subject</th>
                                <th style={tableHeaderStyle}>Attended Classes</th>
                                <th style={tableHeaderStyle}>Total Classes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={tableCellStyle}>{studentDetails.roll_no}</td>
                                <td style={tableCellStyle}>{formData.subject}</td>
                                <td style={tableCellStyle}>{attendanceCount}</td>
                                <td style={tableCellStyle}>{professorClassCount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {!submitted && <p>Please submit the form to view attendance data.</p>}
        </div>
    );
}
 
const tableHeaderStyle = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

export default StudentAttendance;
