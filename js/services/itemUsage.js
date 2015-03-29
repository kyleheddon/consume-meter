angular.module('appServices')
.service('itemUsage', ['$http', function ($http) {
    'use strict';

    function itemPath(itemId){
        return '/api/items/' + itemId + '/usage';
    }

    return {
        get: function(itemId) {
            return $http.get(itemPath(itemId));
        },

        delete: function(itemId) {
            return $http.delete(itemPath(itemId));
        },

        create: function(itemId, usage) {
            return $http.post(itemPath(itemId), usage);
        },

        put: function(itemId, usage) {
            return $http.put(itemPath(itemId), usage);
        }
    };
}]);
