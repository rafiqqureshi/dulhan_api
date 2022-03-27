var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var connection = require('../connect');
const SendData = require('../SendData');
var jsonParser = bodyParser.json();

router.post('/', jsonParser, async (req, res) => {
    var insertdata = [];
    var productlist = req.body.productlist;
    var owner_id = req.body.owner_id; 
    productlist.map((item)=>{
        var name = item.name;
        var fullurl = item.image;
        var price = item.price;
        var description = item.description;
        insertdata.push(`(${owner_id},'${name}','${fullurl}','${price}','${description}')`)
    }) 
console.log("insertdata.toString()",insertdata.toString())
    var insert = `INSERT INTO product(owner_id,name,image,price,description) 
                  VALUES ${insertdata.toString()}`;
      return connection.query(insert,  (error, results, fields) =>{
          if (error) throw error;
          SendData(res,{success: true})
        })
})

module.exports = router;