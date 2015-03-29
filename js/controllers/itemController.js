angular.module('appControllers')
    .controller('itemController', ['$scope', '$routeParams', '$location', 'itemStorage', 'itemUsage', function($scope, $routeParams, $location, $itemStorage, $itemUsage){
        $scope.item = {};
        $scope.usages = [];

        $itemStorage.get({ id: $routeParams.itemId }).success(function(item) {
            $scope.item = item;
            $scope.$emit('item', item);
        });

        $itemUsage.get($routeParams.itemId).success(function(usage){
            $scope.usages = usage;
            $scope.$emit('usage', usage);
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
                $scope.usages.push(usage);
                $scope.$emit('usage', $scope.usages);
            });
        }

        $scope.deleteUsage = function(use){
            $itemUsage.delete(use).success(function(usage){
                $scope.usages = usage;
                $scope.$emit('usage', usage);
            });
        }

    }])
