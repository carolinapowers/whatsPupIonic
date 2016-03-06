'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .directive('clientInfo', clientInfo);

    function clientInfo() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/client-info/client-info.directive.html',
            scope: {
                clientData: '=',
                inputTitle: '=',
            },
            link: link
        };

        function link() {}
    }

})();