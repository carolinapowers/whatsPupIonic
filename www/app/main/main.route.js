'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('main', {
             url: '/',
             templateUrl: 'app/main/main.html',
             controller: 'Main',
             controllerAs: 'vm'
         })
    })
})();