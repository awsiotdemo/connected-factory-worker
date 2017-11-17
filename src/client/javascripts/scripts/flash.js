/*
 * @author Sonam Dwivedi
 *
 * @email sonam.dwivedi59@yahoo.com
 *
 * @description "This file is used for flash messages."
 *
 */
angular.module('iot').factory('flash', ['$rootScope', function($rootScope) {
	var queue = [];
	var current = [];
	return {
		pushMessage: function(message) {
			queue.push(message);
		},
		getMessages: function() {
			if(queue.length > 0) {
				current = queue;
				queue = [];
			}
			return current;
		},
		closeMessage: function(index) {
			current.splice(index, 1);
		},
		clearMessages: function() {
			current = [];
		}
	};
}]);