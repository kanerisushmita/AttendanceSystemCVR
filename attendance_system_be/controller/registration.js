const router = require("express").Router();
const StudentModel = require('../models/Student')
const bcrypt = require('bcrypt')
const multer = require('multer');
const xlsx = require('xlsx');
const ProfessorModel = require('../models/Professor')
const SubjectClassModel = require('../models/SubjectClass')

router.post('/studentregistration', (req, res) => {
    const {name, roll_no, class_code, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        StudentModel.create({name, roll_no, class_code, password: hash})
        .then(student => res.json("Success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/professorregistration', upload.single('file'), (req, res) => {
    try {
      const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
        console.log(data)
        const newData = data.map(row => {
            const professor = row.class_code_class_teacher?{
                hod: row.hod,
                prof_name: row.prof_name,
                prof_code: row.prof_code,
                subjects: row.subjects,
                isClass_teacher: row.isClass_teacher,
                isHOD: row.isHOD,
                class_code_class_teacher: row.class_code_class_teacher
            }:
            {
                hod: row.hod,
                prof_name: row.prof_name,
                prof_code: row.prof_code,
                subjects: row.subjects,
                isClass_teacher: row.isClass_teacher,
                isHOD: row.isHOD,
            }

            ProfessorModel.create(professor)
            .then(professor => console.log("Success"))
            .catch(err => console.log(err))
          });
          console.log(newData)
      res.json({ success: true });
    } catch (error) {
      console.error('Error reading file:', error);
      res.status(500).json({ success: false, error: 'Error reading file' });
    }
});

//Create Subject Class
router.post('/subjectclass',(req,res) => {
  SubjectClassModel.create(req.body)
  .then(result=>{
    console.log(result._id)
    res.send({subject_class_code:result._id})
  })
  .catch(err=>console.log(err))
})

module.exports = router;