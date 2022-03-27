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
    var param1 = "";
    var param2 = "";
    var name = req.body.name;
    var id = req.query.id;
    var files = null;
    if (!file) {
        param1 = `name='${name}'`;
    }
    else {
        files = file.filename
        param1 = `name='${name}'`;
        param2 = `,image='${files}'`

        var selectimage = `select * from category WHERE id=${id}`
        connection.query(selectimage, (error, results, fields) => {
            var filename = results[0].image;
            var filePath = './assets/category/' + filename;
            fs.unlink(filePath, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            })
        })
    }

    var updateq = `UPDATE category SET ${param1}${param2} WHERE id=${id}`;
    return connection.query(updateq, (error, results, fields) => {
        if (error) throw error;
        var returndata = {
            id: id,
            name: name,
            image: files
        }
        SendData(res, { success: true, msg: 'category update succesfully', data: returndata })
    })

})

module.exports = router;