/*
 * @author Sonam Dwivedi
 *
 * @email sonam.dwivedi59@yahoo.com
 *
 * @description "This file is used for creating controller for partial functionalities."
 *
 */
angular.module('iot.partials.controllers').controller('HeaderController', ['$scope', '$state', 'flash', 'commonApi', function($scope, $state, flash, commonApi) {
	$scope.year = new Date().getFullYear();
	$scope.flash = flash;
	$scope.flashTimeOut = commonApi.getFlashTimeOut();
	
	if(localStorage.getItem('_isLoggedIn')){
		$scope.username = localStorage.getItem('userFirstName');

		$scope.logout = function() {
		localStorage.setItem('_isLoggedIn', false);
		localStorage.setItem('username', '');
		localStorage.setItem('_lastRequested', '');
		localStorage.setItem('userRole','');
		localStorage.setItem('userAge','');
		localStorage.setItem('userGender','');
		localStorage.setItem('userFirstName','');
		$state.go('login');
	}
	}else{
		localStorage.setItem('_isLoggedIn', false);
		localStorage.setItem('username', '');
		localStorage.setItem('_lastRequested', '');
		localStorage.setItem('userRole','');
		localStorage.setItem('userAge','');
		localStorage.setItem('userGender','');
		localStorage.setItem('userFirstName','');
		$state.go('login');
	}
	
}]);