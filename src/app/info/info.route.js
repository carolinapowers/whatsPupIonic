'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('info', {
             url: '/info',
             templateUrl: 'app/info/info.html',
             controller: 'Info',
             controllerAs: 'vm'
         })
    })
})();