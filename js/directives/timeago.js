angular.module('appDirectives')
    .directive('timeago', function () {
        'use strict';

        return function(scope, elem, attrs) {
            var date = attrs.timeago;
            var timeago = jQuery.timeago(new Date(date));
            elem.text(timeago);
        };
    });
