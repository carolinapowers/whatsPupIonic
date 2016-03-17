'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('ClientDetails', ClientDetails);
    
ClientDetails.$inject=['CONST', '$stateParams','clients', '$firebaseObject', '$ionicActionSheet', '$timeout', '$state', '$ionicPlatform', '$cordovaDialogs'];
 
/** @ngInject */
    
function ClientDetails (CONST, $stateParams, clients, $firebaseObject, $ionicActionSheet, $timeout, $state, $ionicPlatform, $cordovaDialogs) {
    var vm = this;
    var clientUrl = new Firebase(CONST.baseUrl + 'Clients/' + $stateParams.userId + '/' + $stateParams.clientId);
    vm.inputDisplayTitle = CONST.inputDisplayTitle;
    vm.clients = clients.getClients($stateParams.userId);
    
    
   
    clients.getClient($stateParams.userId, $stateParams.clientId)
        .$loaded()
            .then(function (data) {
                console.log(data);
                vm.clientData = data;
        
        });
    
    vm.show = function() {
        var user = $stateParams.userId;
        var client = $stateParams.clientId;
   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
        {text: 'Save Changes'},
        { text: 'Add New Visit'}   
     ],
     destructiveText: 'Delete Client',
       destructiveButtonClicked: function() {
       clientUrl.remove();
       $state.go('clients');
        return true; //Close the model?
    },
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
          if (index === 0) {
             vm.clientData.$save();
              $ionicPlatform.ready(function() {
                    $cordovaDialogs.alert('Your changes were saved!','Success', 'Ok')
                })
             return true;
         }
         if (index === 1) {
            $state.go('newVisit', {userId: user , clientId:client});
            return true;
         }  
     }
   });

  

 };
}

})();