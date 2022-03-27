var express = require('express');
var router = express.Router();
var connection = require('../connect');
const SendData = require('../SendData');

router.get('/', async (req, res) =>{
        var select = `SELECT * FROM sliders`;
      return connection.query(select,  (error, results, fields) =>{
          if (error) throw error; 
          SendData(res,{success: true ,data: results})
        })
  })
  
module.exports = router;  