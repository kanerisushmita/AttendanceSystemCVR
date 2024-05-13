const router = require("express").Router();
const SubjectClass = require("../models/SubjectClass");

router.post("/markattendance", (req, res) => {
  console.log("Request Body:", req.body);
  const _id = req.body.class_code;
  const roll_no = req.body.roll_no;
  SubjectClass.updateOne(
    { _id, present_students: { $ne: roll_no } },
    { $push: { present_students: roll_no } }
  )
    .then((result) => {
      console.log("Update Result:", result);
      if (result.nModified > 0) { // Check if any document was modified
        return res.json({ status: "success", message: "Attendance marked successfully" });
      } else {
        return res.json({ status: "error", message: "Attendance already marked or class not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send("Not able to mark attendance");
    });
});

module.exports = router;
