angular.module('appDirectives')
    .directive('chart', function () {
        'use strict';

        return function (scope, elem, attrs) {
            var item, usage;

            scope.$on('item', function(event, _item){
                item = _item;
                drawChart();
            });

            scope.$on('usage', function(event, _usage){
                usage = _usage;
                drawChart();
            });

            function formatData(){
                var data = usage.map(function(use){
                    return {
                        date: new Date(use.date),
                        amount: use.amount
                    }
                });

                return data;
            }

            function drawChart(){
                if(!item || !usage){
                    return;
                }

                var elementId = 'chart_' + item._id;
                elem.attr('id', elementId);

                var data = formatData();

                MG.data_graphic({
                    title: item.title + ' Use',
                    description: "This graphic shows a time-series of " + item.title + " used.",
                    data: data,
                    width: window.innerWidth * 0.9,
                    height: window.innerWidth * 0.4,
                    target: '#' + elementId,
                    x_accessor: 'date',
                    y_accessor: 'amount',
                });
            }

        };
    });
