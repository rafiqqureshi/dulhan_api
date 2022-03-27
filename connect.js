var mysql      = require('mysql'); 

var connection = mysql.createConnection({
  host     : 'ftp.jjz.gtx.mybluehost.me',
  user     : 'jjzgtxmy_dulhan',
  password : 'jjzgtxmy_dulhan@9',
  database : 'jjzgtxmy_dulhan',
  port: 3306
});
 
connection.connect(function(err) {
  if (err) console.error('error connecting: ' + err.stack)
  else
  console.log("Connected!");
});
module.exports = connection;
