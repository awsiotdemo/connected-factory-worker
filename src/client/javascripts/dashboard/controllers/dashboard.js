/*
 * @author Sonam Dwivedi
 *
 * @email sonam.dwivedi59@yahoo.com
 *
 * @description "This file is used for creating controllers for dashboard."
 *
 */
angular.module('iot.dashboard.controllers').controller('DashboardController', ['$scope', '$state', '$window', 'serverApi', 'flash','commonApi','$interval', function($scope, $state, $window, serverApi, flash, commonApi,$interval) {
	$scope.flash = flash;
	$scope.flashTimeOut = commonApi.getFlashTimeOut();
	var username = localStorage.getItem('userFirstName');
	var time = [], temperature = [], activity = [], cadence = [], heartrate = [], breathingrate = [];

	if(localStorage.getItem('_isLoggedIn')){
		var init = function() {
			serverApi.getAllData(username).then(function(response) {
				if(response.data.hasOwnProperty('success') && response.data.success == 200){
					var userData = response.data.data.Items;

					if(time.length > 0 && temperature.length > 0 && activity.length > 0  && cadence.length > 0 && heartrate.length > 0 && breathingrate.length > 0){
						time = [];
						temperature = [];
						activity = [];
						cadence = [];
						heartrate = [];
						breathingrate = [];
						setData(userData);
					}else {
						setData(userData);
					}
	
					var t = setArr(temperature);
					var a = setArr(activity);
					var c = setArr(cadence);
					var h = setArr(heartrate);
					var b = setArr(breathingrate);

					Highcharts.chart('temp', {
							chart:{
								width: 430,
								height: 300
							},credits: {
									enabled: false
							},
							title: {
								text: 'Temperature Data'
							},
							yAxis: {
									title: {
											text: 'Temperature in F'
									},
									labels: {
											formatter: function () {
													return this.value + '°';
											}
									}
							},
							xAxis: {
								categories: time
							},

							series: [{
								name: 'Temperature',
								data: t,
								color: '#f0b904'
							}]
					});

					Highcharts.chart('heart', {
							chart:{
								width: 430,
								height: 300
							},credits: {
									enabled: false
							},
							title: {
								text: 'Heart Rates/minute'
							},
							yAxis: {
									title: {
											text: 'Beats/minute'
									},
							},
							xAxis: {
								categories: time
							},

							series: [{
								name: 'Beat rate',
								data: h,
								color: '#FF0000'
							}]
					});

					Highcharts.chart('Cadence', {
							chart:{
								width: 430,
								height: 300
							},credits: {
									enabled: false
							},
							title: {
								text: 'Cadence'
							},
							xAxis: {
								categories: time
							},

							series: [{
								name: 'Cadence',
								data: c,
								color: 	'#e15112'
							}]
					});
				
					Highcharts.chart('breathing', {
							chart:{
								width: 430,
								height: 300
							},credits: {
									enabled: false
							},
							title: {
								text: 'Breathing Rates/minute'
							},
							yAxis: {
									title: {
											text: 'Rate/minute'
									},
							},
							xAxis: {
								categories: time
							},

							series: [{
								name: 'Breathe rate',
								data: b,
								color:'#0086eb'
							}]
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
				
			})

			function setArr(data) {
					if(data != undefined){
						data = data.sort();
						var mydata = "[";
						for(let i = 0; i< data.length; i++){
							var temp = data[i].replace(/\{/g,'[').replace(/}/g,']');
							mydata = mydata + temp + ',';
						}
						if(data.length > 0) {
							mydata = mydata.substring(0, mydata.length - 1) + "]";
							return JSON.parse(mydata);
						}else {
							mydata = mydata + "]";
							return JSON.parse(mydata);
						}
					}
			}

			function setData(userData){
				for(var i=0; i< userData.length; i++){
					var temp = userData[i].temperature.N;
					var wearabletime = userData[i].wearabletimestamp.S;
					var act = userData[i].activity.N;
					var cad = userData[i].cadence.N;
					var heart = userData[i].heartrate.S;
					var breath = userData[i].breathingrate.N;

					time.push(wearabletime);
					temperature.push(temp);
					activity.push(act);
					cadence.push(cad);
					heartrate.push(heart);
					breathingrate.push(breath);
				}
			}
		}
		init();
		var intervalPromise = $interval(function () {
			console.log(30);
				init();
		}, 30000);
		
		$scope.simulateReadings = function() { 
			$state.go('simulate');
		}

		$scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
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