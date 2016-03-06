'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('Clients', Clients);

function Clients ($scope) {
    var vm = this;
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
}); 
    
}

})();