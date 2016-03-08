'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('ClientDetails', ClientDetails);

ClientDetails.$inject=['CONST', '$stateParams','clients', '$firebaseObject'];
    
function ClientDetails (CONST, $stateParams, clients, $firebaseObject) {
    var vm = this;
    vm.inputDisplayTitle = CONST.inputDisplayTitle;
   
    clients.getClient($stateParams.userId, $stateParams.clientId)
        .$loaded()
            .then(function (data) {
                console.log(data);
                vm.clientData = data; 
        });
     
//    vm.clientData = {
//        firstName: 'Carolina',
//        lastName: 'Powers',
//        email: 'carolinapoloni@gmail.com',
//        petsNames: 'Missy and Brody',
//        phone: 3218006625,
//        streetAddress: '2812 Harriet Drive',
//        city: 'Orlando',
//        state: 'Florida',
//        zipCode: 32812
//    };
}

})();