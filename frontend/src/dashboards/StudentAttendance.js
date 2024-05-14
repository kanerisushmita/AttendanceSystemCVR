import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentAttendance() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [formData, setFormData] = useState({
        subject: '',
        startDate: '',
        endDate: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [professorClassCount, setProfessorClassCount] = useState(0);
    const studentDetails = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        if (submitted) {
            fetchAttendanceData();
        }
    }, [submitted]);

    const fetchAttendanceData = async () => {
        try {
            const attendanceUrl = `http://localhost:3001/api/student-attendance-count/${studentDetails.rollNumber}/${studentDetails.rollNumber}/${formData.startDate}/${formData.endDate}`;
            const classCountUrl = `http://localhost:3001/api/professor-class-count/${formData.professorCode}/${formData.startDate}/${formData.endDate}`;

            const studentAttendanceResponse = await axios.get(attendanceUrl);
            const professorClassCountResponse = await axios.get(classCountUrl);

            setAttendanceData(studentAttendanceResponse.data);
            setProfessorClassCount(professorClassCountResponse.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert dates from DD-MM-YYYY to YYYY-MM-DD
        const convertDate = (date) => {
            const [day, month, year] = date.split('-');
            return `${year}-${month}-${day}`;
        };

        const formattedData = {
            ...formData,
            startDate: convertDate(formData.startDate),
            endDate: convertDate(formData.endDate)
        };

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
                            <label className="form-label">Start Date (DD-MM-YYYY):</label>
                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                placeholder="DD-MM-YYYY"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">End Date (DD-MM-YYYY):</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                placeholder="DD-MM-YYYY"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            {submitted || attendanceData.length > 0 ? (
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Name</th>
                                <th style={tableHeaderStyle}>Roll Number</th>
                                <th style={tableHeaderStyle}>Subject</th>
                                <th style={tableHeaderStyle}>Attended Classes</th>
                                <th style={tableHeaderStyle}>Total Classes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.length > 0 ? (
                                <tr>
                                    <td style={tableCellStyle}>{studentDetails.name}</td>
                                    <td style={tableCellStyle}>{studentDetails.rollNumber}</td>
                                    <td style={tableCellStyle}>{formData.subject}</td>
                                    <td style={tableCellStyle}>{attendanceData[0].attendance}</td>
                                    <td style={tableCellStyle}>{professorClassCount}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="5" style={tableCellStyle}>No attendance data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Please submit the form to view attendance data.</p>
            )}
        </div>
    );
    
}
// Define table header and cell styles
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