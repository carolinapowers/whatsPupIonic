'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .directive('clientField', clientField);

    function clientField() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/client-field/client-field.directive.html',
            scope: {
                fieldTitle: '=',
                fieldValue: '=',
                
            },
            link: link
        };

        function link() {}
    }

})();