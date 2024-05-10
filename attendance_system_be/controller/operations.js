const router = require("express").Router();
const SubjectClass = require("../models/SubjectClass");

router.post("/markattendance", (req, res) => {
  console.log(req.body);
  const _id = req.body.class_code;
  const roll_no = req.body.roll_no;
  SubjectClass.updateOne(
    { _id, present_students: { $ne: roll_no } },
    { $push: { present_students: roll_no } }
  )
    .then((result) => {
      console.log(result);
      return res.json("Success");
    })
    .catch((err) => {
      console.log(err);
      return res.send("Not able to mark attendance");
    });
});

module.exports = router;
