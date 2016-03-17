'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('Clients', Clients);

/** @ngInject */
    
function Clients ($scope, auth, clients, $firebaseArray, Auth, $ionicSideMenuDelegate) {
     var vm = this;
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
    }); 
    auth.onAuth(function (user) {
        vm.user = user;
        if (user === null) {
            console.log('null')
        } else {
            console.log(user.$id)
            return user.$id;
        }
    });
    
    vm.listCanSwipe = true;
    vm.logout = auth.logout;
    vm.clientInitials = clientInitials; 
    vm.clients =clients.getClients(vm.user.$id);
 
    function clientInitials (name) {
        var name = name.split(' ');
        if (name.length > 1){
            return (name[0][0] + name[1][0]);
        } else {
            return (name[0][0]);
        }
    }
}
//    
//     vm.openMenu = function () {
//    $ionicSideMenuDelegate.toggleLeft();
//  };

})();