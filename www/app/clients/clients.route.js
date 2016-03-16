'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('clients', {
             url: '/clients',
             templateUrl: 'app/clients/clients.html',
             controller: 'Clients',
             controllerAs: 'vm'
         })
    })
})();