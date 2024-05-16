const router = require("express").Router();
const SubjectClass = require("../models/SubjectClass");

router.post("/markattendance", (req, res) => {
  const classCode = req.body.class_code;
  const roll_no = req.body.roll_no;
  if (!classCode || !roll_no) {
    return res
      .status(400)
      .json({ error: "Class code or roll number missing in the request body" });
  }
  SubjectClass.updateOne(
    { class_code: classCode },
    { $addToSet: { present_students: roll_no } }
  )
    .then((result) => {
      if (result.nModified === 0) {
        return res.status(404).json({
          error:
            "Class not found or roll number already exists in present students array",
        });
      }
      res.json("Success");
    })
    .catch((err) => {
      console.error("Error updating attendance:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
