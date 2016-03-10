'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('NewClient', NewClient);

/** @ngInject */
    
function NewClient (CONST, clients, auth) {
    var vm = this;
     auth.onAuth(function (user) {
        vm.user = user;
        return user.$id;
    });
    vm.clientData = {};
    vm.inputTitle = CONST.inputDisplayTitle;
    vm.clients = clients.getClients(vm.user.$id);
    vm.addClient= addClient;
    
       function addClient (clientData) {
        vm.clients.$add(clientData);
        return this.newClient = {
            name: '',
            pet: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            sitterUid: ''
        };
    };
    
    
    
    
    
}
    

})();