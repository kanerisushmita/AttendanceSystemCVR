
const SubjectClassModel = require("../models/SubjectClass");
const ProfessorModel = require('../models/Professor');

 

 




const getProfessorClassCount = async (professorCode, subject, startDate, endDate) => {
    try {
        // Aggregate the SubjectClassModel to count distinct dates within the specified date range and for the specified professor code and subject
        const classCount = await SubjectClassModel.aggregate([
            {
                $match: {
                    prof_code: professorCode,
                    subject: subject,
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);

        // Extract the class count from the aggregation result
        const totalClasses = classCount.length > 0 ? classCount[0].count : 0;

        return totalClasses;
    } catch (error) {
        console.error('Error counting classes taken by professor:', error);
        throw new Error('Failed to count classes taken by professor');
    }
};


const getStudentAttendanceCount = async (rollNumber, subject, startDate, endDate, professorCode) => {
    try {
        // Aggregate the AttendanceModel to count distinct class dates attended by the student for a specific subject taught by a specific professor
        const attendanceRecords = await AttendanceModel.aggregate([
            {
                $match: {
                    rollNumber: rollNumber,
                    subject: subject,
                    professorCode: professorCode,  // Ensure records are only counted for this professor
                    date: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);

        // Extract the attendance count from the aggregation results
        const attendanceCount = attendanceRecords.length > 0 ? attendanceRecords[0].count : 0;

        return attendanceCount;
    } catch (error) {
        console.error('Error counting attendance for student:', error);
        throw new Error('Failed to count attendance for student');
    }
};


module.exports = { getProfessorClassCount, getStudentAttendanceCount,getProfessorCodeBySubject };
