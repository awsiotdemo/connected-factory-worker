/**
* @author Sonam Dwivedi
*
* @email sonam.dwivedi59@yahoo.com
*
* @description "Configuration of the console app"
*
*/

'use strict'

let config = module.exports
let currentENV = process.env.NODE_ENV || 'development'
let PRODUCTION = process.env.NODE_ENV === 'production'

config.express = {
    port: process.env.PORT || 3000,
    ip: process.env.VCAP_APP_HOST || '127.0.0.1',
    session_secret: process.env.SESSION_SECRET || 'my-secret-session-secret',
    session_timeOut: 1800000,
    session_timeOut_in_seconds: 86400
}

let appRoute
if (process.env.VCAP_APPLICATION) {
    let VCAP_APPLICATION = JSON.parse(process.env.VCAP_APPLICATION)
    appRoute = VCAP_APPLICATION && VCAP_APPLICATION.application_uris[0]
}

if (config.ignoreCertificates && PRODUCTION) {
    console.log('-------------------------WARNING--------------------------')
    console.log('You are running in PRODUCTION mode and TRUSTING INSECURE  ')
    console.log('CERTIFICATES. That is wrong. Be aware of that.            ')
    console.log('----------------------------------------------------------')
}

config.aws = {
    app_url: 'http://' + (appRoute || 'localhost:' + config.express.port),
    client_ws_endpoint: 'ws://' + (appRoute || 'localhost:' + config.express.port),
    language_name: process.env.LANGUAGE_NAME,
    userIdealMinTime: 1770000, // 29 minutes 30 seconds
    userIdealMaxTime: 1795000, // 29 minutes 55 seconds
    userDeadLineTime: 1798000 // 29 minutes 58 seconds
}

if (PRODUCTION) {
    config.express.ip = process.env.VCAP_APP_HOST || '0.0.0.0'
    config.express.port = process.env.PORT || 80
    config.cf.client_ws_endpoint = 'wss://' + appRoute
}

config.currentENV = currentENV