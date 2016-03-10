'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('ClientDetails', ClientDetails);
    
ClientDetails.$inject=['CONST', '$stateParams','clients', '$firebaseObject'];
 
/** @ngInject */
    
function ClientDetails (CONST, $stateParams, clients, $firebaseObject) {
    var vm = this;
    vm.inputDisplayTitle = CONST.inputDisplayTitle;
   
    clients.getClient($stateParams.userId, $stateParams.clientId)
        .$loaded()
            .then(function (data) {
                console.log(data);
                vm.clientData = data; 
        }); 
}

})();