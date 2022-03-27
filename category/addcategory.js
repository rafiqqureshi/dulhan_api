var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var connection = require('../connect');
const SendData = require('../SendData');
var jsonParser = bodyParser.json();
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./assets/category");
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
    if (!file) {
        SendData(res,{ success: false, msg: 'please upload image' })
    }
    else {
        var filename = file.filename
        var name = req.body.name;
        var insert = `INSERT INTO category(name,image) 
                      VALUES ('${name}','${filename}')`;
        return connection.query(insert, (error, results, fields) => {
            if (error) throw error;
            var returndata = {
                id: results.insertId,
                name: name,
                image: filename
            }
            SendData(res,{ success: true, msg: 'category add succesfully', data: returndata })
        })
    }
})

module.exports = router;