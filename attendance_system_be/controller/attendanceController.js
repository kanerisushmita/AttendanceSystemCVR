const express = require("express");
const router = express.Router();

const SubjectClassModel = require("../models/SubjectClass");


router.get('/getSubject',(req,res)=>
{
    const subject = req.query.subject;
    SubjectClassModel.find({subject:subject},(err,subjectClass)=>
      {
        if(err)
          {
            console.log("err:",err);
            res.json({success:false,msg:"Error in getting subject class"});
            }
            else
            {
              res.json({success:true,msg:"Subject class found",subjectClass:subjectClass});
              }
              });


});



module.exports = router;