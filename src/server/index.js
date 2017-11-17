/**
* @author Sonam Dwivedi
*
* @email sonam.dwivedi59@yahoo.com
*
* @description "Entry point of the app"
*
*/

'use strict'

let express = require('express')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let config = require('./config/config')
let request = require('request')
let path = require('path')
let methodOverride = require('method-override')
let app = express()
let router = express.Router()
let server = require('http').createServer()
let helmet = require('helmet');
let awsIot = require('aws-iot-device-sdk');
var device = awsIot.device({
    keyPath: "src/server/lib/routes/key/privateKey.pem",
    certPath: "src/server/lib/routes/key/cert.pem",
    caPath: "src/server/lib/routes/key/root-CA.crt",
    clientId: "*****",
    host: "*******"
});

device.on('connect', function() {
    console.log('connected');	
    device.subscribe('$aws/things/cf-worker-wearable/shadow/update/delta');
});
device.on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
});
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.xssFilter());

let client_dir = (process.env.NODE_ENV == 'production') ? 'build' : 'client';

app.use(express.static(__dirname + '/../' + client_dir + '/'))
app.use(express.static(__dirname + '/../../bower_components/'))

app.set('trust proxy', 1)

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(methodOverride(function(req, res) {

    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method
        delete req.body._method
        req.method = req.body._method
        return method
    }
}))

global.__base = path.resolve(__dirname, '../')

require('./lib/routes/dashboard')(config, app)
require('./lib/routes/login')(app)
require('./lib/routes/simulate')(app,device)

app.use(router)

app.get('/*', function(req, res) {
    res.set({
        'Content-Type': 'text/html',
        'mimetype': "text/html"
    });
    res.sendFile(path.join(__dirname, '/../' + client_dir, 'index.html'));
});


app.use(function(err, req, res, next) {
    if (Object.keys(err).length === 0 && err.constructor === Object)
        res.send({
            'error': 'Something went wrong.'
        })
    else if (err.status == 404)
        res.send({
            'not_found': 'something went wrong'
        })
    else if (err.status == 401)
        res.status(401).send({
            'auth_error': 'Not Authorised Action'
        })
    else if (err.status >= 500 && err.status <= 599)
        res.status(500).send({
            'error': 'Something went wrong. Please try again'
        })
    else
        res.status(400).send({
            'not_found': 'something went wrong'
        })
})

server.on('request', app)

module.exports = server