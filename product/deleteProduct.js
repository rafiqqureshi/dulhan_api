var express = require('express');
var router = express.Router();
var connection = require('../connect');
const SendData = require('../SendData');

router.get('/', async (req, res) =>{
    var id = req.query.id;
        var deleteq = ` DELETE FROM product WHERE id = ${id}`;
      return connection.query(deleteq,  (error, results, fields) =>{
          if (error) throw error;
          SendData(res,{success: true, msg: "product delete successfully"})
        })
  })
  
module.exports = router;