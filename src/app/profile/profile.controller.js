'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .controller('Profile', Profile);

    /** @ngInject */

    function Profile($scope, auth, clients) {
        var vm = this;
        auth.onAuth(function (authData) {
            vm.authData = authData;
        });
        vm.logout = auth.logout;
        vm.clients = clients.getClients(vm.authData.$id);
        console.log(vm.clients);

        vm.clients.$loaded().then(function (response) {
            vm.numberOfClients = response.length;
        });

    }

})();