
(function () {

angular
    .module('whatsPupIonic')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject=['auth', 'Auth','$scope','$state'];
    
/** @ngInject */
    
function LoginCtrl (auth, Auth, $scope, $state) {
    var vm = this;
    vm.sitterlogin = auth.sitterlogin;
    vm.logout = auth.logout;
   
    
    auth.onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.$id);
      $state.go('clients');
    }
    // This will display the user's name in our view
    $scope.authData = authData;
  });
    
   
      
}

})();