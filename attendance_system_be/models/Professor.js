const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const ProfessorSchema = new mongoose.Schema({
    hod: String,
    prof_name: String,
    password: {
        type: String,
        default: "$2b$10$OgEJAJ533LJ0l1h6SLb6M.hzNXwTe3JHNILcxuACxGhuGNfVIS2Q."
    },
    role: {
        type: String,
        default: "professor"
    },
    prof_code: String,
    subjects: [String],
    isClass_teacher: Boolean,
    isHOD: Boolean,
    class_code_class_teacher: String 
})

const ProfessorModel = mongoose.model("professors", ProfessorSchema)
module.exports = ProfessorModel