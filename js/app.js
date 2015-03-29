var app = angular.module('consumeMeter', [
    'ngRoute',
    'appControllers',
    'appServices',
    'appDirectives'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/items.html',
                controller: 'itemsController'
            }).
            when('/items/:itemId', {
                templateUrl: 'partials/item.html',
                controller: 'itemController'
            }).
            otherwise({
                redirectTo: '/'
            });
}]);

angular.module('appControllers', []);
angular.module('appServices', []);
angular.module('appDirectives', []);
