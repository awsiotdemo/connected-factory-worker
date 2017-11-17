/**
* @author Sonam Dwivedi
*
* @email sonam.dwivedi59@yahoo.com
*
* @description "Handle authentication routes"
*
*/

'use strict'

let CryptoJS = require("crypto-js");
let fs = require("fs");
var jsonQuery = require('json-query');
var obj;
fs.readFile('src/server/lib/helpers/user.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

function routes(app) {
    app.post('/api/login', function(req, res, next) {
        let decodeusername = req.body.username.toString();
        let decodepassword = req.body.password.toString();

        var result = jsonQuery('Users[* password=' +decodepassword+ ' & userId=' + decodeusername+ ']', {data: obj}).value;

        if(decodeusername == result["0"].userId && decodepassword == result["0"].password){
           res.send({'success': 200,'data':result});
        }else {
            res.send({'statusCode':400});
        }
    });
}

module.exports = routes