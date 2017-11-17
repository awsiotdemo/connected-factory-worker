/**
* @author Sonam Dwivedi
*
* @email sonam.dwivedi59@yahoo.com
*
* @description "Node server"
*
*/

'use strict'

let server = require('./index')
let config = require('./config/config')
let bole = require('bole')
let log = bole('server')

bole.output({
    level: 'debug',
    stream: process.stdout
})
log.info({
    env: process.env.NODE_ENV
}, 'Server process starting')

server.listen(config.express.port, config.express.ip, function(err) {
    if (err) {
        log.error('Unable to listen for connections', err)
        process.exit(10)
    }

    log.info('Server is listening on http://' +
        config.express.ip + ':' + config.express.port)
})