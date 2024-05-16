const router = require("express").Router();
const SubjectClassModel = require("../models/SubjectClass");
const ProfessorModel = require("../models/Professor");

router.get("/professors", async (req, res) => {
  try {
    const professors = await ProfessorModel.find({});
    const professorAttendence = [];
    for (const proff of professors) {
      if (!proff.isHOD) {
        const classCount = await SubjectClassModel.countDocuments({
          prof_code: proff.prof_code,
        });
        const proffData = {
          prof_name: proff.prof_name,
          prof_code: proff.prof_code,
          class_count: classCount,
        };
        professorAttendence.push(proffData);
      }
    }
    res.json(professorAttendence);
  } catch (err) {
    console.error("Error fetching professors:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const prof_code = req.query.prof_code;
    const subjectClasses = await SubjectClassModel.find({
      prof_code: prof_code,
    });
    const StudentAttendence = subjectClasses.map((subjectClass) => {
      return {
        subject: subjectClass.subject,
        present_students: subjectClass.present_students,
        total_present_students: subjectClass.present_students.length,
      };
    });
    res.json(StudentAttendence);
  } catch (err) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
