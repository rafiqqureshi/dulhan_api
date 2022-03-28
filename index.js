var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())  
app.use('/assets',express.static(__dirname + '/assets'));

// banner 
var getSlider = require('./Slider/getSlider');
var addSlider = require('./Slider/addSlider');
var EditSlider = require('./Slider/editSlider');
var deleteSlider = require('./Slider/deleteSlider');
app.use('/getSlider', getSlider)
app.use('/addSlider', addSlider)
app.use('/EditSlider', EditSlider)
app.use('/deleteSlider', deleteSlider)
// end

// category
var getCategory = require('./category/getCategory');
var addcategory = require('./category/addcategory');
var Editcategory = require('./category/Editcategory');
var deleteCategory = require('./category/deleteCategory');
app.use('/addcategory', addcategory)
app.use('/getCategory', getCategory)
app.use('/Editcategory', Editcategory)
app.use('/deleteCategory', deleteCategory)
// end

// Subcategory
var getSubCategory = require('./SubCategory/getSubCategory');
var addSubCategory = require('./SubCategory/addSubCategory');
var Editsubcategory = require('./SubCategory/Editsubcategory');
var deletesubCategory = require('./SubCategory/deletesubCategory');
var getAllSubCategory = require('./SubCategory/getAllSubCategory');
app.use('/getSubCategory', getSubCategory);
app.use('/addSubCategory', addSubCategory);
app.use('/Editsubcategory', Editsubcategory);
app.use('/deletesubCategory', deletesubCategory);
app.use('/getAllSubCategory', getAllSubCategory)

// end

// product
var getproduct = require('./product/getproduct');
var addproduct = require('./product/addproduct');
var deleteProduct = require('./product/deleteProduct');
var Editproduct = require('./product/Editproduct');
var getproductById = require('./product/getproductById');
var getSingleProduct = require('./product/getSingleProduct')
app.use('/getproduct', getproduct) 
app.use('/addproduct', addproduct)
app.use('/deleteProduct', deleteProduct)
app.use('/Editproduct', Editproduct)
app.use('/getproductById', getproductById)
app.use('/getSingleProduct', getSingleProduct)
// getSingleProduct
// end

// auth
var SignIn = require('./Auth/SignIn');
app.use('/SignIn', SignIn)

var liveRate = require('./liveRate');
app.use('/liveRate', liveRate)

var port = process.env.PORT || 80;
app.listen(port);
// dulhanjewellers
// DJ#(&*$SKQq