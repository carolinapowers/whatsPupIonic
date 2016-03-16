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