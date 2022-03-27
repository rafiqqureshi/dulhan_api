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
        callback(null, "./assets/sliders");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
});

var middleware = [upload.single("image"), jsonParser];
router.post('/', middleware, async (req, res) => {
    const file = req.file;
    if (!file) {
        SendData(res, { success: false, msg: 'please upload image' })
    }
    else {
        var files = file.filename;
        var id = req.query.id;
        var selectimage = `select * from sliders WHERE id=${id}`
        connection.query(selectimage, (error, results, fields) => {
            var filePath = './assets/sliders/' + results[0].image;
            fs.unlink(filePath, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
                var updateq = `UPDATE sliders SET image='${files}' WHERE id=${id}`;
                connection.query(updateq, (error, results2, fields) => {
                    if (error) throw error;
                    var returndata = {
                        id: id,
                        image: files
                    }
                    SendData(res, { success: true, msg: 'Banner update succesfully', data: returndata })
                })
            })
        })
    }
})

module.exports = router;