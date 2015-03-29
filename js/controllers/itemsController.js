angular.module('appControllers')
    .controller('itemsController', ['$scope', '$location', 'itemStorage', function($scope, $location, $itemStorage){
        $scope.items = {};
        
        $itemStorage.get().success(function(data) {
            $scope.items = data;
        });

        $scope.addItem = function(itemTitle){
            $itemStorage.post({title: itemTitle}).success(function(item){
                $location.path('/items/' + item._id);
            })
        }

    }]);
