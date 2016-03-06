'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('ClientDetails', ClientDetails);

function ClientDetails () {
    var vm = this;
    vm.hello = 'hi';
    
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