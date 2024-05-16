const router = require("express").Router();
const SubjectClassModel = require("../models/SubjectClass");

router.get("/getClass", (req, res) => {
  const class_code = req.query.class_code;
  SubjectClassModel.findOne({ class_code: class_code })
    .then((subjectClasses) => {
      if (subjectClasses) {
        return res.json({ status: "success", subjectClasses: subjectClasses });
      } else {
        return res.json("error");
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
