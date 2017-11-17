/*
 * @author Sonam Dwivedi
 *
 * @email sonam.dwivedi59@yahoo.com
 *
 * @description "This file is used for creating app modules."
 *
 */
angular.module('iot.controller', ['ngSanitize']);
angular.module('iot.model', []);
angular.module('iot.directive', []);
angular.module('iot', [
	// Load modules
	'iot.router', 'iot.controller', 'iot.model', 'iot.directive', 'ui.bootstrap', 'iot.factory', 'iot.login', 'iot.partials', 'iot.dashboard', 'iot.simulate'
]);