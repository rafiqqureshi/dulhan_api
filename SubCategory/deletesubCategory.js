var express = require('express');
var router = express.Router();
var connection = require('../connect');
const SendData = require('../SendData');
var fs = require('fs')
router.get('/', async (req, res) => {
  var id = req.query.id;
  var selectimage = `select * from subcategory WHERE id=${id}`
  connection.query(selectimage, (error, results, fields) => {
    var filename = results[0].image;
    var filePath = './assets/subcategory/' + filename;
    fs.unlink(filePath, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
      var deleteq = ` DELETE FROM subcategory WHERE id = ${id}`;
      connection.query(deleteq, (error, results2, fields) => {
        if (error) throw error;
        SendData(res, { success: true })
      })
    })
  })
})

module.exports = router;