'use strict';

(function () {

    angular
        .module('whatsPupIonic')
        .controller('NewVisit', NewVisit);

    /** @ngInject */

    function NewVisit(clients, $stateParams, $http, $ionicPopup, $state) {
        var vm = this;
        vm.treats = false;
        console.log($stateParams);

        clients.getClient($stateParams.userId, $stateParams.clientId)
            .$loaded()
            .then(function (data) {
                console.log(data);
                vm.clientData = data;
            });

        var currentdate = new Date();

        var time = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " at " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds(); //get time

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
                                    "content": time
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
                                    "content": vm.image
                        }
                    ]
                        }
                    }
                })
                .success(function (response) {
                    $ionicPopup.alert({
                        title: 'Success',
                        content: 'Email sent! Thanks for using whatsPup!'
                    }).then(function (response) {
                        $state.go('clients');
                    })
                })
                .error(function (response) {
                    alert('There was a problem sending the visit.');
                });
        }
    }


})();