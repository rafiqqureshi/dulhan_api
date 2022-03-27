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
    var imageparam = "";
    var id = req.query.id;
    var owner_id = req.body.owner_id;
    var price = req.body.price;
    var description = req.body.description;
    var name = req.body.name;
    var files = null;
    if (!file) {
    }
    else {
         files = file.filename
        imageparam = `,image='${files}'`;
    }
    var updateq = `UPDATE product SET owner_id=${owner_id},name='${name}',price='${price}',
        description='${description}'${imageparam}
        WHERE id=${id}`;
        console.log("__updateq",updateq)
    return connection.query(updateq, (error, results, fields) => {
        if (error) throw error;
        var returndata = {
            id: id,
            name: name,
            image: files,
            owner_id: owner_id,
            price: price,
            description: description
        }
        SendData(res, { success: true, msg: 'product update succesfully', data: returndata })
    })
})

module.exports = router;