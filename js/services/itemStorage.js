angular.module('appServices')
	.service('itemStorage', ['$http', function ($http) {
		'use strict';

		var cache = (function(){
			return {
				invalidate: function(){
					delete localStorage['items'];
				},
				get: function(){
					var items = localStorage['items'];
					if(items){
						return JSON.parse(items);
					}
				},
				set: function(items){
					localStorage['items'] = JSON.stringify(items);
				}
			}
		})();

		function getById(id){
			return $http.get('/api/items/' + id);
		}

		return {
			get: function (options) {
				if(options && options.id){
					return getById(options.id);
				}

				var items = cache.get();
				if(items){
					return {
						success: function(callback){
							callback(items);
						}
					}
				}

				var httpPromise = $http.get('/api/items');

				httpPromise.then(function(result){
					cache.set(result.data);
				});

				return httpPromise;
			},

			delete: function (item) {
				cache.invalidate();
				return $http.delete('/api/items/' + item._id);
			},

			post: function (item) {
				cache.invalidate();
				return $http.post('/api/items', item);
			},

			put: function(item) {
				cache.invalidate();
				return $http.put('/api/items/' +  item._id, item);
			}
		};
	}]);
