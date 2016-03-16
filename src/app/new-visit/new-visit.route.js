'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('newVisit', {
             url: '/new-visit/:userId/:clientId',
             templateUrl: 'app/new-visit/new-visit.html',
             controller: 'NewVisit',
             controllerAs: 'vm'
         })
    })
})();