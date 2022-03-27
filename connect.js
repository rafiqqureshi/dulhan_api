var mysql      = require('mysql'); 
// var connection = mysql.createConnection({
//   host     : '103.97.88.4',
//   user     : 'thegloba_jwlr',
//   password : '?rbjie~t{ce)',
//   database : 'thegloba_dulhanjawellar',
//   port: 3306,
//   debug:true
// });
var connection = mysql.createConnection({
  host     : 'ftp.jjz.gtx.mybluehost.me',
  user     : 'jjzgtxmy_dulhan',
  password : 'jjzgtxmy_dulhan@9',
  database : 'jjzgtxmy_dulhan',
  port: 3306,
  debug:true
});
 
// connection.connect();
// console.log("connect")
connection.connect(function(err) {
  if (err) console.error('error connecting: ' + err.stack)
  else
  console.log("Connected!");
});
module.exports = connection;