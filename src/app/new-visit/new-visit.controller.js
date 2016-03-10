'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('NewVisit', NewVisit);
    
/** @ngInject */    

function NewVisit (clients, $stateParams) {
    var vm = this;
    vm.food = false;
    vm.water= false;
    vm.yesTreat = false;
    console.log($stateParams);
    
    clients.getClient($stateParams.userId, $stateParams.clientId)
        .$loaded()
            .then(function (data) {
                console.log(data);
                vm.clientData = data; 
        }); 
}    


})();