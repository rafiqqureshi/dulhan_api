var express = require('express');
var router = express.Router();
var connection = require('../connect');
const SendData = require('../SendData');
var fs = require('fs');
router.get('/', async (req, res) => {
  var id = req.query.id;
  var selectimage = `select * from category WHERE id=${id}`
  connection.query(selectimage, (error, results, fields) => {
    var imageurl = results[0].image;
    var filename = imageurl.split('/').pop()
    var filePath = './assets/category/' + filename;
    fs.unlink(filePath, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
      var deleteq = ` DELETE FROM category WHERE id = ${id}`;
      connection.query(deleteq, (error, results2, fields) => {
        if (error) throw error;
        SendData(res, { success: true })
      })
    })
  })
})

module.exports = router;