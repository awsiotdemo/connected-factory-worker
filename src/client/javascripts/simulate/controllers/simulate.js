angular.module('iot.simulate.controllers').controller('SimulateController', ['$scope', '$location','serverApi','commonApi','flash','$state', function($scope, $location, serverApi, commonApi, flash, $state) {
    $scope.flash = flash;
	$scope.flashTimeOut = commonApi.getFlashTimeOut();

    $scope.submitSimulateData = function() {
		var name = localStorage.getItem('userFirstName');
		var data = $scope.user;
		serverApi.simulate(name,data).then(function(response) {
			if(response.data.hasOwnProperty('success') && response.data.success == 200){
				
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
			$scope.user = {};
		})
	}

	$scope.dashboard = function(){
		$state.go('dashboard');
	}

}]);