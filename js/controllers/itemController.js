angular.module('appControllers')
    .controller('itemController', ['$scope', '$routeParams', '$location', 'itemStorage', 'itemUsage', function($scope, $routeParams, $location, $itemStorage, $itemUsage){
        $scope.item = {};
        $scope.usages = [];

        $itemStorage.get({ id: $routeParams.itemId }).success(function(item) {
            $scope.item = item;
            console.log(item);
        });

        $itemUsage.get($routeParams.itemId).success(function(usages){
            $scope.usages = usages;
            console.log(usages);
        });

        $scope.delete = function(item){
            $itemStorage.delete(item).success(function(){
                $location.path('#');
            });
        }

        $scope.createUsage = function(date, amount){
            var itemId = $scope.item._id;
            var usage = {
                date: (new Date(date)).getTime(),
                amount: amount
            }

            $itemUsage.create(itemId, usage).success(function(usage){
                console.log(usage);
                $scope.usages.push(usage);
            });
        }
    }])
