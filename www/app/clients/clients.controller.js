'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('Clients', Clients);

function Clients ($scope, auth) {
    var vm = this;
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
}); 
    vm.listCanSwipe = true;
    vm.toggle = true;
    vm.logout = auth.logout;
    
}

})();