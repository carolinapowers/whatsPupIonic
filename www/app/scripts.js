// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('whatsPupIonic', ['ngCordova', 'ionic', 'firebase', 'ngAnimate' ])

.run(function($ionicPlatform, $rootScope, $state, $stateParams,  $ionicSideMenuDelegate) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  }); 
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https://whatspup.firebaseio.com/");
  return $firebaseAuth(usersRef);
})

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
'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('Clients', Clients);

/** @ngInject */
    
function Clients ($scope, auth, clients, $firebaseArray, Auth, $ionicSideMenuDelegate) {
     var vm = this;
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
    }); 
    auth.onAuth(function (user) {
        vm.user = user;
        if (user === null) {
            console.log('null')
        } else {
            console.log(user.$id)
            return user.$id;
        }
    });
    
    vm.listCanSwipe = true;
    vm.logout = auth.logout;
    vm.clientInitials = clientInitials; 
    vm.clients =clients.getClients(vm.user.$id);
 
    function clientInitials (name) {
        var name = name.split(' ');
        if (name.length > 1){
            return (name[0][0] + name[1][0]);
        } else {
            return (name[0][0]);
        }
    }
}
//    
//     vm.openMenu = function () {
//    $ionicSideMenuDelegate.toggleLeft();
//  };

})();

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
'use strict';

(function () {

angular
    .module('whatsPupIonic')
    .controller('NewClient', NewClient);

/** @ngInject */
    
function NewClient (CONST, clients, auth) {
    var vm = this;
     auth.onAuth(function (user) {
        vm.user = user;
        return user.$id;
    });
    vm.clientData = {};
    vm.inputTitle = CONST.inputDisplayTitle;
    vm.clients = clients.getClients(vm.user.$id);
    //vm.addClient= addClient;
    vm.addClient = clients.addClient;
    
       function addClient (clientData) {
        vm.clients.$add(clientData);
        return this.newClient = {
            name: '',
            pet: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            sitterUid: ''
        };
    };
    
    
    
    
    
}
    

})();
'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .controller('NewVisit', NewVisit);

    /** @ngInject */

    function NewVisit(clients, $stateParams, $http, $ionicPopup, $state, $cordovaCamera, $ionicPlatform, $cordovaDialogs) {
        var vm = this;
        var checkinTime;
        var currentdate = new Date();
        vm.treats = false;
        vm.checkIn = checkIn; 
        vm.clientInitials = clientInitials;
        console.log($stateParams);
        console.log($state.$current.name);

        clients.getClient($stateParams.userId, $stateParams.clientId)
            .$loaded()
            .then(function (data) {
                console.log(data);
                vm.clientData = data;
            });

        var time = (currentdate.getMonth() + 1) + "/" 
        + currentdate.getDate() + "/" + currentdate.getFullYear() 
        + " at " + currentdate.getHours() 
        + ":" + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds(); //get time
    
       $ionicPlatform.ready(function () {
           
           vm.takePicture = function () {

            var options = {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 620,
              targetHeight: 300,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
              vm.imgSrc = "data:image/jpeg;base64," + imageData;
            }, function(err) {
              // error
            });
           };
           });
        
        function checkIn () {
           vm.checkinTime = time;
        }
    
        function clientInitials (name) {
            var name = name.split(' ');
            if (name.length > 1){
                return (name[0][0] + name[1][0]);
            } else {
                return (name[0][0]);
            }
        }

        vm.sendEmail = function () {
            $http({
                    method: "POST",
                    url: "https://mandrillapp.com/api/1.0/messages/send-template.json",
                    data: {
                        'key': 'SjfF7oGr1BHLUnBlnSF20A',
                        "template_name": "whatspup1",
                        "template_content": [
                            {
                                "name": "example name",
                                "content": "example content"
                        }
                    ],
                        'message': {
                            'from_email': 'whatspupupdate@gmail.com',
                            'from_name': 'WhatsPup',
                            'headers': {
                                'Reply-To': 'whatspupupdate@gmail.com'
                            },

                            'subject': 'New Visit Update from WhatsPup',

                            'to': [
                                {
                                    'email': vm.clientData.email,
                                    'name': 'name',
                                    'type': 'to'
                        }],

                            "global_merge_vars": [
                                {
                                    "name": "time",
                                    "content": vm.checkinTime
                        },
                                {
                                    "name": "food",
                                    "content": vm.food
                        },
                                {
                                    "name": "water",
                                    "content": vm.water
                        },
                                {
                                    "name": "play",
                                    "content": vm.play
                        },
                                {
                                    "name": "treats",
                                    "content": vm.treats
                        },
                                {
                                    "name": "meds",
                                    "content": vm.meds
                        },
                                {
                                    "name": "mess",
                                    "content": vm.mess
                        },
                                {
                                    "name": "mail",
                                    "content": vm.mail
                        },
                                {
                                    "name": "plants",
                                    "content": vm.plants
                        },
                                {
                                    "name": "other",
                                    "content": vm.other
                        },
                                {
                                    "name": "message",
                                    "content": vm.message
                        },
                                {
                                    "name": "image",
                                    "content":  vm.imgSrc
                        }
                    ]
                        }
                    }
                })
                .success(function (response) {
                $ionicPlatform.ready(function() {
                    $cordovaDialogs.alert('Email sent! Thanks for using whatsPup!','Success', 'Ok')
                   .then(function (response) {
                        $state.go('clients');
                    })
                })
                })
                .error(function (response) {
                  $ionicPlatform.ready(function() {
                    $cordovaDialogs.alert('There was a problem sending the visit. Try it again! ','Oooops!', 'Ok')
                })
                });
        }
    }


})();
'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('clientDetails', {
             url: '/client-details/:userId/:clientId',
             templateUrl: 'app/client-details/client-details.html',
             controller: 'ClientDetails',
             controllerAs: 'vm'
         })
    })
})();
'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .controller('Profile', Profile);

    /** @ngInject */

    function Profile($scope, auth, clients) {
        var vm = this;
        auth.onAuth(function (authData) {
            vm.authData = authData;
        });
        vm.logout = auth.logout;
        vm.clients = clients.getClients(vm.authData.$id);
        console.log(vm.clients);

        vm.clients.$loaded().then(function (response) {
            vm.numberOfClients = response.length;
        });

    }

})();
'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .controller('Info', Info);

    /** @ngInject */

    function Info($scope, $ionicSlideBoxDelegate ) {
        var vm = this;
        $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
        $ionicSlideBoxDelegate.enableSlide(true);
}
        

    }

})();
'use strict';

(function () {
    
    angular
        .module ('whatsPupIonic')
        .config(function ($stateProvider){
         $stateProvider
          .state('info', {
             url: '/info',
             templateUrl: 'app/info/info.html',
             controller: 'Info',
             controllerAs: 'vm'
         })
    })
})();
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
'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .directive('clientField', clientField);

/** @ngInject */
    
    function clientField() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/client-field/client-field.directive.html',
            scope: {
                fieldTitle: '=',
                fieldValue: '=',
                
            },
            link: link
        };

        function link() {}
    }

})();
'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .directive('clientInfo', clientInfo);

/** @ngInject */
    
    function clientInfo() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/client-info/client-info.directive.html',
            scope: {
                clientData: '=',
                inputTitle: '='
            },
            link: link
        };

        function link(scope) {
            scope.clientInitials = function (name) {
                var name = name.split(' ');
                if (name.length > 1){
                    return (name[0][0] + name[1][0]);
                } else {
                    return (name[0][0]);
                }
            }
        }
    }

})();
(function () {

    angular.module('whatsPupIonic').constant('CONST', {

        baseUrl : 'https://whatspup.firebaseio.com/',

        inputDisplayTitle: {
            'firstName': 'First Name',
            'lastName': 'Last Name',
            'pet': 'Pets Names',
            'email': 'Email',
            'phone': 'Phone Number',
            'address': 'Street Address',
            'city': 'City',
            'state': 'State',
            'zipCode': 'Zip Code',
            'message': 'Message'
        }
    });

})();
angular.module('whatsPupIonic')

/** @ngInject */

.factory('auth', function ($firebaseObject, $state, CONST, Auth) {
    var auth = new Firebase(CONST.baseUrl);
    var currentUser = {};

    return {
        onAuth: onAuth,
        sitterlogin: sitterlogin,
        logout: logout,
        loggedIn: loggedIn,
        getUser: getUser,
        updateUser:updateUser,
    }
        
    function sitterlogin () {
        Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
          // User successfully logged in
        }).catch(function(error) {
          if (error.code === "TRANSPORT_UNAVAILABLE") {
            Auth.$authWithOAuthPopup("facebook").then(function(authData) {
              // User successfully logged in. We can log to the console
              // since we’re using a popup here
              console.log(authData);
            });
          } else {
            // Another error occurred
            console.log(error);
          }
        });
    };


        function logout () {
            auth.unauth();
            $state.go('login');
        };
       
        function loggedIn () {
            if (auth.getAuth()) {
                return true;
            }
        };
    
        function getUser () {
            return currentUser;
        };
    
        function onAuth (creds) {
            auth.onAuth(function (data) {
                creds(updateUser(data));
            });
        };
   
        function updateUser(authdUser) {
            if (authdUser === null) {
                return null;
            }

            var fbUser = auth.child('petsitter').child(authdUser.facebook.id);
            fbUser.update({
                uid: authdUser.facebook.id,
                facebook: authdUser.facebook,
                fullName: authdUser.facebook.displayName,
                firstName: authdUser.facebook.cachedUserProfile.first_name,
                lastName: authdUser.facebook.cachedUserProfile.last_name,
                avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
                gender: authdUser.facebook.cachedUserProfile.gender
            });

            fbUser = $firebaseObject(auth
                    .child('petsitter')
                    .child(authdUser.facebook.id)
                )   
            currentUser = fbUser;
            return fbUser;
        };
})
angular.module('whatsPupIonic')

/** @ngInject */
.factory('clients', function ($firebaseArray, Auth, $firebaseObject) {
    return { 
        addClient : addClient,
        deleteClient: deleteClient,
        getClients: getClients,
        getClient: getClient
    }
         
    function getClients(userId) {
        var sitterInfo = new Firebase('https://whatspup.firebaseio.com/Clients/' + userId);
        return  $firebaseArray(sitterInfo);
    }
    
    function getClient(userId, clientId) {
        var oneClient = new Firebase('https://whatspup.firebaseio.com/Clients/' + userId + '/' + clientId);
        return $firebaseObject(oneClient);
    }
    
    function addClient (clients, newClient) {
        clients.$add(newClient);
        return this.newClient = {
            name: '',
            pet: '',
            email: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            sitterUid: ''
        };
    };
          
        function deleteClient (newClient) {
            delClient.remove();
        };
    
    //    var delClient = new Firebase('https://whatspup.firebaseio.com/Clients/' + this.user.$id + '/' + newClient.$id);
     
})