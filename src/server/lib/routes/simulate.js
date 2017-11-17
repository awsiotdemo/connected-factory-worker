'use strict'

let dateFormat = require('dateformat');

function simulate(app,device) {
    app.post('/api/simulate/:name', function(req, res, next) {
        let breathingrate = 15,temperature = 99,heartratebpm = 80,activity = 1,cadence = 14;

        if(req.body.breathing){
            breathingrate = req.body.breathing;
        }
        if(req.body.temperature){
            temperature = req.body.temperature;
        }
        if(req.body.heartrate){
            heartratebpm = req.body.heartrate;
        }
        if(req.body.activity){
            activity = req.body.activity;
        }
        if(req.body.cadence){
            cadence = req.body.cadence;
        }
        let name = req.params.name

        var datenow= dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

        device.publish('topic/cfwearable/'+name, JSON.stringify({DEVICEID: name,
             wearabletimestamp:datenow, 
             breathingrate: breathingrate, 
             temperature:temperature,
             activity:activity,
             heartratebpm:heartratebpm,
             cadence:cadence}));

        console.log(JSON.stringify({DEVICEID: name,
             wearabletimestamp:datenow, 
             breathingrate: breathingrate, 
             temperature:temperature,
             activity:activity,
             heartratebpm:heartratebpm,
             cadence:cadence}));

    });
}

module.exports = simulate