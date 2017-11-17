/*
 * @author Sonam Dwivedi
 *
 * @email sonam.dwivedi59@yahoo.com
 *
 * @description "This file is used for creating factories."
 *
 */
angular.module('iot.factory', []);
angular.module('iot.factory').factory('serverApi', ['$http', serverApiFactory]).factory('commonApi', ['$http', '$cacheFactory', commonApiFactory]);

function commonApiFactory($http, $cacheFactory) {
	var themeDatacache = $cacheFactory('getThemeName');
	themeDatacache.removeAll();
	return {
		getFlashTimeOut: function() {
			return localStorage.getItem('flashTimeOut') ? localStorage.getItem('flashTimeOut') : 10000;
		}
	};
}

function serverApiFactory($http) {
	return {
		login: function(data) {
			return $http.post('/api/login', data, {
				headers: {
					'content-type': 'application/json'
				}
			});
		},
		getAllData: function(name) {
			return $http.get('/api/getAllData/'+name);
		},	
		simulate: function(name,data) {
			return $http.post('/api/simulate/'+name, data, {
				headers: {
					'content-type': 'application/json'
				}
			});
		}
	}
}	
