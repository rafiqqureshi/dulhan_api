var express = require('express');
var router = express.Router();
var connection = require('../connect');
var bodyParser = require('body-parser');
const SendData = require('../SendData');
var jsonParser = bodyParser.json();
router.get('/', jsonParser , async (req, res) =>{
  var cat_id = req.query.id;
        var select = `SELECT * FROM subcategory`;
      return connection.query(select,  (error, results, fields) =>{
          if (error) throw error;
          console.log("results",results)
          SendData(res,{success: true ,data: results})
        })
  })
  
module.exports = router;