'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('ClientDetails', ClientDetails);
    
ClientDetails.$inject=['CONST', '$stateParams','clients', '$firebaseObject', '$ionicActionSheet', '$timeout'];
 
/** @ngInject */
    
function ClientDetails (CONST, $stateParams, clients, $firebaseObject, $ionicActionSheet, $timeout) {
    var vm = this;
    vm.inputDisplayTitle = CONST.inputDisplayTitle;
   
    clients.getClient($stateParams.userId, $stateParams.clientId)
        .$loaded()
            .then(function (data) {
                console.log(data);
                vm.clientData = data; 
        });
    
    vm.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Add New Visit' },
       { text: 'Edit' }
     ],
     destructiveText: 'Delete',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

  

 };
}

})();