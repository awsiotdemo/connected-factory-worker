/*
 * @author Sonam Dwivedi
 *
 * @email sonam.dwivedi59@yahoo.com
 *
 * @description "This file is used for routes."
 *
 */
angular.module('iot.router', ['ui.router']);
angular.module('iot.router').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$injector', function($stateProvider, $urlRouterProvider, $locationProvider, $injector) {
	$urlRouterProvider.otherwise(function($injector, $location) {
		var state = $injector.get('$state');
		if($location.absUrl().endsWith('.com/') && (localStorage.getItem('username') && localStorage.getItem('_isLoggedIn'))) {
			state.go('dashboard')
		} else if($location.absUrl().endsWith('.com/') && !(localStorage.getItem('username') && localStorage.getItem('_isLoggedIn'))) {
			state.go('login')
		} else {
			state.go('404');
		}
		return $location.path();
	});
	$stateProvider.state('login', {
		url: '/',
		views: {
			'login-content': {
				templateUrl: 'javascripts/login/views/login.html',
				controller: 'LoginController'
			},
			'header-content': {
				templateUrl: '',
				controller: ''
			},
			'footer-content': {
				templateUrl: '',
				controller: ''
			},
			'content': {
				templateUrl: '',
				controller: ''
			}
		}
	}).state('simulate', {
		url: '/simulate',
		views: {
			'content': {
				templateUrl: 'javascripts/simulate/views/simulate.html',
				controller: 'SimulateController'
			},
			'header-content': {
				templateUrl: 'javascripts/partials/views/header.html',
				controller: 'HeaderController'
			},
			'footer-content': {
				templateUrl: 'javascripts/partials/views/footer.html',
				controller: 'HeaderController'
			}
		}
	}).state('404', {
		url: '/404',
		views: {
			'content': {
				templateUrl: 'javascripts/partials/views/404.html',
				controller: 'HeaderController'
			},
			'header-content': {
				templateUrl: 'javascripts/partials/views/header.html',
				controller: 'HeaderController'
			},
			'footer-content': {
				templateUrl: 'javascripts/partials/views/footer.html',
				controller: 'HeaderController'
			}
		}
	}).state('dashboard', {
		url: '/dashboard',
		views: {
			'content': {
				templateUrl: 'javascripts/dashboard/views/dashboard.html',
				controller: 'DashboardController'
			},
			'header-content': {
				templateUrl: 'javascripts/partials/views/header.html',
				controller: 'HeaderController'
			},
			'footer-content': {
				templateUrl: 'javascripts/partials/views/footer.html',
				controller: 'HeaderController'
			}
		}
	})
}]);