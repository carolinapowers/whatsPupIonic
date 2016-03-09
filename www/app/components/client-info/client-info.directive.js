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

        function link(scope) {
            scope.clientInitials = function (name) {
                var name = name.split(' ');
                if (name.length > 1){
                    return (name[0][0] + name[1][0]);
                } else {
                    return (name[0][0]);
                }
            }
        }
    }

})();