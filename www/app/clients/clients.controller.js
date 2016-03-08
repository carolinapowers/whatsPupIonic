'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('Clients', Clients);

function Clients ($scope, auth, clients, $firebaseArray, Auth) {
    var vm = this;
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
}); 
    vm.listCanSwipe = true;
    vm.toggle = true;
    vm.logout = auth.logout;
    vm.clientInitials = clientInitials;
    auth.onAuth(function (user) {
        vm.user = user;
        if (user === null) {
            console.log('null')
        } else {
            console.log(user.$id)
            return user.$id;
        }
    });
    var sitterInfo = new Firebase('https://whatspup.firebaseio.com/Clients/' + vm.user.$id);
    vm.clients = $firebaseArray(sitterInfo);
    
    function clientInitials (name) {
        var name = name.split(' ');
        console.log(name);
        if (name.length > 1){
            return (name[0][0] + name[1][0]);
        } else {
            return (name[0][0]);
        }
    }
}

})();