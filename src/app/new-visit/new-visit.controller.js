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
              //vm.imgSrc = imageData;
            }, function(err) {
                error = err;
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
            var visitData = {
                to: vm.clientData.email,
                time: time,
                food: vm.food ? "Yes": "No",
                water: vm.water ? "Yes": "No",
                play: vm.play ? this.play: "N/A",    
                treats: vm.treats ? "Yes": "No",
                meds: vm.meds ? this.meds: "N/A",
                mess: vm.mess ? "Yes": "N/A",
                mail: vm.mail ? "Yes": "No",
                packages: vm.packages ? "/Yes": " ", 
                plants: vm.plants ? "Yes": "No",
                other: vm.other ? "See Message": "No",
                message: vm.message ? this.message: "Your Pet misses you!",
                image: vm.imgSrc,                       
                 //image:"http://res.cloudinary.com/whatspup/image/upload/v1467427025/kdvohnlyigs7gpo1dkfg.jpg"
            }
            $http({
                method: "POST",
                url: "https://polar-scrubland-63183.herokuapp.com/api/email",
                data: visitData        
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
                    $cordovaDialogs.alert(vm.imgSrc ,'Oooops!', 'Ok')
                })
                });
        }
    }


})();