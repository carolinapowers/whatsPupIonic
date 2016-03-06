'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('clientDetails', {
             url: '/client-details',
             templateUrl: 'app/client-details/client-details.html',
             controller: 'ClientDetails',
             controllerAs: 'vm'
         })
    })
})();