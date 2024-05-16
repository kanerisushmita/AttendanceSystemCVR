const SubjectClassModel = require("../models/SubjectClass"); 
const router = require("express").Router();

router.get("/getProfessorClassCount", async (req, res) => {
  const classcode = req.query.class_code;
  const subject = req.query.subject;
  const startDate = req.query.startDate; 
  const endDate = req.query.endDate;  

  try {
    
    const count = SubjectClassModel.countDocuments({
      class_code: classcode,
      subject: subject,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
      console.log("Response Sending: ") 
    count.then((count) => res.json(count));
  } catch (error) {
    console.error("Error fetching class count:", error);
    res.status(500).json({ message: "Error fetching class count" });
  }
});

 

router.get("/getStudentCount", async (req, res) => {
  const rollNumber = req.query.rollNumber;
  const classcode = req.query.class_code;
  const subject = req.query.subject;
  const startDate = req.query.startDate;  
  const endDate = req.query.endDate;  

  try { 

    const count = SubjectClassModel.countDocuments({
      present_students: rollNumber,
      class_code: classcode,
      subject: subject,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    count.then((count) => res.json( count ));
  } catch (error) {
    console.error("Error fetching class count:", error);
    res.status(500).json({ message: "Error fetching class count" });
  }
});

module.exports = router;
