var express = require('express');
var router = express.Router();
var connection = require('../connect');
var bodyParser = require('body-parser');
const SendData = require('../SendData');
var jsonParser = bodyParser.json();
router.get('/', jsonParser , async (req, res) =>{
  var cat_id = req.query.id;
        var select = `SELECT * FROM subcategory where parent_id=`+cat_id;
      return connection.query(select,  (error, results, fields) =>{
          if (error) throw error;
          SendData(res,{success: true ,data: results})
        })
  })
  
module.exports = router;