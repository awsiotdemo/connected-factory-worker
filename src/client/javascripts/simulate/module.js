angular.module('iot.flashmessages', ['angular-flash.service', 'angular-flash.flash-alert-directive']);
angular.module('iot.simulate.router', ['iot.router']);
angular.module('iot.simulate.controllers', ['iot.flashmessages'])
angular.module('iot.simulate', ['iot.simulate.router', 'iot.simulate.controllers']);