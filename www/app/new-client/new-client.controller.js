'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('NewClient', NewClient);

function NewClient (CONST) {
    var vm = this;
    vm.clientData = {};
    vm.inputTitle = CONST.inputDisplayTitle;  
}

})();