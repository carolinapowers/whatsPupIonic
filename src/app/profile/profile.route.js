'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('profile', {
             url: '/profile',
             templateUrl: 'app/profile/profile.html',
             controller: 'Profile',
             controllerAs: 'vm'
         })
    })
})();