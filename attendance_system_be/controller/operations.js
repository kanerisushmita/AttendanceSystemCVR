const router = require("express").Router();
const SubjectClass = require('../models/SubjectClass')

router.post('/markattendance', (req, res) => {
    const _id = req.body.class_code;
    const roll_no = req.body.roll_no;
    SubjectClass.updateOne({_id,present_students: { $ne: roll_no }},{$push:{present_students:roll_no}})
    .then(res.send("Success"))
    .catch(err => res.json(err))
  
})

module.exports = router;