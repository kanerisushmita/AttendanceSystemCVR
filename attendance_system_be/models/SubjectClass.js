const mongoose = require('mongoose')

const SubjectClassSchema = new mongoose.Schema({
    prof_code: String,
    subject: String,
    class_code: String,
    present_students: [String],
    students_count: Number,
    latitude: Number,
    longitude: Number,
    createdAt: { type: Date, default: Date.now },
    count:Number
})

const SubjectClassModel = mongoose.model("subjectclasses", SubjectClassSchema)
module.exports = SubjectClassModel