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
                var data = usage.sort(function(a,b){
                        return new Date(a.date) - new Date(b.date);
                    })
                    .map(function(use){
                        var d = new Date(use.date);
                        var day = d.getDate();
                        var month = d.getMonth();
                        var year = d.getFullYear();

                        return {
                            date: month+1 + '/' + day + '/' + year,
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
                var width = $('#' + elementId).parent().innerWidth();

                MG.data_graphic({
                    title: item.title + ' Use',
                    description: "This graphic shows a time-series of " + item.title + " used.",
                    data: data,
                    width: width,
                    height: width * 0.4,
                    interpolate: 'linear',
                    chart_type: 'bar',
                    bar_orientation: 'vertical',
                    target: '#' + elementId,
                    x_accessor: 'date',
                    y_accessor: 'amount',
                });
            }

        };
    });
