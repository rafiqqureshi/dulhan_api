var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var connection = require('../connect');
const SendData = require('../SendData');
var jsonParser = bodyParser.json()
router.post('/', jsonParser ,function (req, res) {
      var email = req.body.email,
       password = req.body.password;
       var select =  `SELECT * FROM signup WHERE email='${email}' and password='${password}'`;
    connection.query(select, function (error, results, fields) {
      if (error) throw error;
      if(results.length > 0)
      {  
        results[0].password = null;
        SendData(res,{success: true, msg: 'login successfully' , data: results})
      }
      else 
      {
        SendData(res,{success: false, msg: 'invalid username & password'})
      }
    });
  })
  
module.exports = router;