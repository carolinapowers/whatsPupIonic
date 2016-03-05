'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider, $urlRouterProvider){
         $stateProvider
          .state('login', {
             url: '',
             templateUrl: 'app/login/login.html',
             controller: 'LoginCtrl',
             controllerAs: 'vm'
         })
          $urlRouterProvider.otherwise('/clients');
    })
})();

