const router = require("express").Router();
const ProfessorModel = require("../models/Professor");

router.get('/viewSubjectClasses',(req, res) => {
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

module.exports = router;