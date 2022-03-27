var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var connection = require('../connect');
const SendData = require('../SendData');
var jsonParser = bodyParser.json();
var fs = require('fs');
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./assets/subcategory");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
})

var middleware = [upload.single("image"), jsonParser];
router.post('/', middleware, async (req, res) => {
    const file = req.file;
    var param1 = "";
    var param2 = "";
    var param3 = "";
    var name = req.body.name;
    var id = req.query.id;
    var name = req.body.name;
    var id = req.query.id;
    var files = null;
    var parent_id = req.body.parent_id;
    if (!file) {
        param1 = `name='${name}'`;
        param2 = `,parent_id='${parent_id}'`
    }
    else {
        files = file.filename
        param1 = `name='${name}'`;
        param2 = `,parent_id='${parent_id}'`
        param3 = `,image='${files}'`;
        var selectimage = `select * from subcategory WHERE id=${id}`
        connection.query(selectimage, (error, results, fields) => {
            var filename = results[0].image;
            var filePath = './assets/subcategory/' + filename;
            fs.unlink(filePath, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            })
        })
    }
    var updateq = `UPDATE subcategory SET ${param1}${param2}${param3} WHERE id=${id}`;
    return connection.query(updateq, (error, results, fields) => {
        if (error) throw error;
        var returndata = {
            id: id,
            name: name,
            image: files,
            parent_id: parent_id
        }
        SendData(res, { success: true, msg: 'sub category update succesfully', data: returndata })
    })
})

module.exports = router;