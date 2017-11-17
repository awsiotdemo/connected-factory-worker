/*
 * @author Sonam Dwivedi
 *
 * @email sonam.dwivedi59@yahoo.com
 *
 * @description "This file is used for creating controller login."
 *
 */
angular.module('iot.login.controllers').controller('LoginController', ['$scope', '$location', 'serverApi', 'flash', 'commonApi', '$state', function($scope, $location, serverApi, flash, commonApi, $state) {
	$scope.flash = flash;
	$scope.flashTimeOut = commonApi.getFlashTimeOut();
	$scope.submitted = {
		login: false
	};

	$scope.year = new Date().getFullYear();
	var init = function() {
		if(localStorage.getItem('_isLoggedIn') && localStorage.getItem('username')) {
			$location.path("/");
		} else if($location.path() === '/login') {} else {
			$state.go('login');
		}
	};
	init();
	$scope.login = function() {
		$scope.submitted.login = true;
		serverApi.login($scope.loginData).then(function(response) {
			if(response.data.hasOwnProperty('success') && response.data.success == 200){
				 $location.path('/dashboard');
					localStorage.setItem('username', response.data.data["0"].userId);
					localStorage.setItem('_isLoggedIn', true);
					localStorage.setItem('_lastRequested', Date.now);
					localStorage.setItem('userRole',response.data.data["0"].role);
					localStorage.setItem('userAge',response.data.data["0"].age);
					localStorage.setItem('userGender',response.data.data["0"].gender);
					localStorage.setItem('userFirstName',response.data.data["0"].firstName);
			}else if(response.data.statusCode == 400){
				$scope.flash.pushMessage({
					type: 'denger',
					message: 'Unable to perform action due to bad request while login.'
				});
			}else if(response.data.statusCode == 401){
				$scope.flash.pushMessage({
					type: 'danger',
					message: "Invalid credentials. Please try again!"
				});				
			}else {
					$scope.flash.pushMessage({
					type: 'danger',
					message: "Something went wrong. Please try again to login."
				});
			}
		}, function(err) {
			$scope.flash.pushMessage({
				type: 'warning',
				message: "Something went wrong. Please try again after sometime to login."
			});
		}).finally(function() {
			$scope.loginData = {};
			$scope.submitted.login = false;
		})
	};
}]);