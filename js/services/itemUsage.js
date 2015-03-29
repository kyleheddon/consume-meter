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

        delete: function(use) {
            return $http.delete(itemPath(use.item_id) + '/' + use._id);
        },

        create: function(itemId, use) {
            return $http.post(itemPath(itemId), use);
        },

        put: function(use) {
            return $http.put(itemPath(use.item_id), use);
        }
    };
}]);
