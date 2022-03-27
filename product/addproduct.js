var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var connection = require('../connect');
const SendData = require('../SendData');
var jsonParser = bodyParser.json();
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./assets/product");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
})

var middleware = [upload.array("image", 10), jsonParser];
router.post('/', middleware, async (req, res) => {
    const files = req.files;
    console.log("req.file", req.files)
    if (!files) {
        SendData(res, { success: false, msg: 'please upload image' })
    }
    else {
        var multipleImage = files.map((item) => {
            return item.filename;
        })
        var imagepath = multipleImage.toString();
        var name = req.body.name;
        var price = req.body.price;
        var description = req.body.description;
        var owner_id = req.body.owner_id;
        var insert = `INSERT INTO product(owner_id,name,image,price,description) 
                      VALUES ('${owner_id}','${name}','${imagepath}','${price}','${description}')`;
        return connection.query(insert, (error, results, fields) => {
            if (error) throw error;
            var returndata = {
                id: results.insertId,
                name: name,
                image: multipleImage
            }
            SendData(res, { success: true, msg: 'product add succesfully', data: returndata })
        })
    }
})

module.exports = router;