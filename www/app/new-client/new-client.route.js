'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('newClient', {
             url: '/new-client',
             templateUrl: 'app/new-client/new-client.html',
             controller: 'NewClient',
             controllerAs: 'vm'
         })
    })
})();