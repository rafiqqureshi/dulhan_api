var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const SendData = require('./SendData');
var jsonParser = bodyParser.json();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
    auth: {
      user: 'utsav78198@gmail.com',
      pass: 'Tonys@makvana'
    },
    requireSSL: true
  });
  

router.post('/', jsonParser, async (req, res) => {
   console.log("req",req.body)
   var name = req.body.name
   var mono = req.body.mono;
   var email = req.body.email
   var massage = req.body.massage
    var mailOptions = {
      from: 'utsav78198@gmail.com',
      to: email,
      subject: 'Enquiry Form (DULHAN JAWELLERS)',
      text: `hi i am ${name} and my mobile number is ${mono}.\n
      ${massage}
      `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.send({success: false , error: error })
        console.log(error);
      } else {
        res.send({success: true , massage: info.response })
        console.log('Email sent: ' + info.response);
      }
    });

})

module.exports = router;