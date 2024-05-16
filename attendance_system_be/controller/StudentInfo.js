const StudentModel = require('../models/Student')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require("express").Router();
const app = express()
router.get('/StudentWise',(req,res)=>{
    StudentModel.find().then((students)=>res.json(students)).catch(err=>res.json(err));
});
module.exports = router;