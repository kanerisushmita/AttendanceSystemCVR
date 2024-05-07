const router = require("express").Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const StudentModel = require("../models/Student");
const ProfessorModel = require("../models/Professor");

router.get('/studentlogin', (req, res) => {
    const {roll_no, password} = req.query;
    StudentModel.findOne({roll_no: roll_no})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    return res.json({Status: "Success", user: user})
                }else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})
router.get('/professorlogin', (req, res) => {
    const {prof_code, password} = req.query;
    ProfessorModel.findOne({prof_code: prof_code})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    return res.json({Status: "Success", user: user})
                }else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})
module.exports = router;