'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('ClientDetails', ClientDetails);

ClientDetails.$inject=['CONST'];
    
function ClientDetails (CONST) {
    var vm = this;
    vm.inputDisplayTitle = CONST.inputDisplayTitle;
    
    vm.clientData = {
        firstName: 'Carolina',
        lastName: 'Powers',
        email: 'carolinapoloni@gmail.com',
        phone: 3218006625,
        streetAddress: '2812 Harriet Drive',
        city: 'Orlando',
        state: 'Florida',
        zipCode: 32812
    };
}

})();