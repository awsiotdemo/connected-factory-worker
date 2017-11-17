'use strict'

let Client = require('node-rest-client').Client;
let client = new Client();

function dashboard(config, app) {

    app.get('/api/getAllData/:name', function(req, res, next) {
        var name = req.params.name;
        client.get("https://t9tt01rp4l.execute-api.us-east-1.amazonaws.com/production/"+name, function (data, response) {
            if(data){
                res.send({'success': 200,'data':data});
            }else {
                res.send(data.status);
            }
        });
    });
}

module.exports = dashboard