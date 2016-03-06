'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('NewVisit', NewVisit);

function NewVisit () {
    var vm = this;
    vm.food = false;
    vm.water= false;
    vm.yesTreat = false;  
}

})();