/*
 * @author Sonam Dwivedi
 *
 * @email sonam.dwivedi59@yahoo.com
 *
 * @description "This file is used for creating modules."
 *
 */
angular.module('iot.flashmessages', ['angular-flash.service', 'angular-flash.flash-alert-directive']);
angular.module('iot.login.router', ['iot.router']);
angular.module('iot.login.controllers', ['iot.flashmessages'])
angular.module('iot.login', ['iot.login.router', 'iot.login.controllers']);