const router = require("express").Router();
const ProfessorModel = require("../models/Professor");
const SubjectClassModel = require('../models/SubjectClass');

router.get('/viewSubjectClasses', (req, res) => {
    ProfessorModel.findOne(req.query)
        .then(professor => {
            responseObject = {
                subjects: [],
                isClass
            }
        })
        .catch(err => {

        })
})

router.get('/viewAttendance', (req, res) => {
    const code = req.query.class_code

    SubjectClassModel.findOne({ class_code: code })
        .then(result => {
            if (result) {
                console.log(result.present_students)
                return res.json(result)
            }
            else
                return res.json("No Match Found")
        })
        .catch(err => {
            return res.json("Error")
        })
})

module.exports = router;