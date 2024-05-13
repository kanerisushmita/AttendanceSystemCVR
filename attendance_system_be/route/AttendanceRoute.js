const express = require('express');
const app = express();
const port = 3002;

const { getProfessorClassCount, getStudentAttendanceCount } = require("../controller/attendanceController");

 app.use(express.json()); 
// Route for getting professor class count
app.get('/api/professor-class-count/:subject/:startDate/:endDate', async (req, res) => {
    const { subject, startDate, endDate } = req.params;
    const professorCode = req.professorCode;
    try {
        const count = await getProfessorClassCount(professorCode, subject, startDate, endDate);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for getting student attendance count
app.get('/api/student-attendance-count/:rollNumber/:subject/:startDate/:endDate', async (req, res) => {
    const { rollNumber, subject, startDate, endDate } = req.params;
    const professorCode = req.professorCode;
    try {
        const count = await getStudentAttendanceCount(rollNumber, subject, startDate, endDate, professorCode);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
