angular.module("whatsPupIonic").run(["$templateCache", function($templateCache) {$templateCache.put("app/client-details/client-details.html","<ion-view view-title=\"Edit Client\" has-header=\"true\">\n   <ion-nav-buttons side=\"right\">\n        <button class=\"button\"  ng-click=\"vm.show()\"><i class=\"ion-android-more-vertical more-icon\"></i>\n        </button>\n    </ion-nav-buttons>\n   <ion-content>\n        <client-info class=\"highlight\" client-data=\"vm.clientData\" input-title=\"vm.inputDisplayTitle\"></client-info>\n    </ion-content>\n</ion-view>");
$templateCache.put("app/clients/clients.html","<ion-view view-title=\"Clients\" class=\"clients\">\n    <ion-nav-buttons side=\"right\">\n        <button ui-sref=\"newClient\" class=\"button\"><i class=\"icon ion-plus\"></i>\n        </button>\n    </ion-nav-buttons>\n    <ion-content>\n       \n        <label class=\"item item-input\">\n            <i class=\"icon ion-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Search\" ng-model=\"search.name\">\n        </label>\n        <ion-list can-swipe=\"vm.listCanSwipe\" >\n            <ion-item class=\"list-item\" ng-repeat=\"client in vm.clients | orderBy: \'name\' | filter:search.name \">\n                <div class=\"row item-icon-right\">\n                    <div class=\"col-25 avatar-div\">\n                        <div class=\"avatar\">\n                        <span ng-if=\"client.name\">{{vm.clientInitials(client.name) | uppercase}}</span>                      \n                         <span ng-if=\"!client.name\">{{client.firstName | limitTo:1 | uppercase}}{{client.lastName | limitTo:1 | uppercase}}</span>\n                        \n                        </div>\n                    </div>\n                    <div class=\"col-50 client-info\" ui-sref=\"clientDetails({userId: vm.user.$id, clientId: client.$id }) \">\n                        <h5>{{client.name}}{{client.firstName}} {{client.lastName}}</h5>\n                        <p>{{client.pet}}</p>\n                    </div>\n                    <div class=\"col-35 list-buttons icon\">\n                    <a href=\"http://maps.google.com/?q={{ client.street }} {{client.city }} {{client.state}} {{client.zip }}\"><span class=\" ion-ios-navigate-outline\"></span></a> &nbsp;\n                    <a  href=\"tel: {{client.phone }}\"><span class=\" ion-ios-telephone-outline\"></span></a>\n                    </div>\n                    <ion-option-button class=\"button button-main-color\" ui-sref=\"newVisit({userId: vm.user.$id, clientId: client.$id }) \">\n                        Add Visit\n                    </ion-option-button>\n                </div>\n            </ion-item>\n        </ion-list>       \n    </ion-content>\n\n  \n</ion-view>\n\n");
$templateCache.put("app/info/info.html","<ion-view view-title=\"Info\" class=\"info\">\n    <ion-content class=\"padding\" scroll=\"false\">\n        <ion-slides options=\"options\" slider=\"data.slider\">\n            <ion-slide-page>\n                <ion-content>\n                    <p>Have your client details at your fingertips!</p>\n                    <img src=\"img/1.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n                <ion-content>\n                    <p>Find your client quickly by using the search bar.</p>\n                    <img src=\"img/2.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n\n                <ion-content>\n                    <p>Click on the <i class=\" ion-ios-navigate-outline\"></i> and navigate to your client\'s home.</p>\n                    <img src=\"img/3.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n\n                <ion-content>\n                    <p>Click on the <i class=\" ion-ios-telephone-outline\"></i> and call your client.</p>\n                    <img src=\"img/4.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n                <ion-content>\n                    <p>Swipe left and click the Add Visit button to log in visit details.</p>\n                    <img src=\"img/5.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n                <ion-content>\n                    <p>Log in your visit time. Log your visit details.</p>\n                    <img src=\"img/6.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n                <ion-content>\n                    <p>Take a picture and send e-mail with visit details.</p>\n                    <img src=\"img/7.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n                <ion-content>\n                    <p>Add a new client. </p>\n                    <img src=\"img/9.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n                <ion-content>\n                    <p>Edit client details. Save changes. Delete client. Add a visit.</p>\n                    <img src=\"img/10.jpg\">\n                </ion-content>\n            </ion-slide-page>\n            <ion-slide-page>\n                <ion-content>\n                    <p>See your profile. Check your number of clients. Logout.</p>\n                    <img src=\"img/8.jpg\">\n                </ion-content>\n            </ion-slide-page>\n        </ion-slides>\n    </ion-content>\n</ion-view>");
$templateCache.put("app/login/login.html","<ion-view view-title=\"Login\" hide-nav-bar=\"true\" class=\"login-wrapper\">\n    <ion-content class=\"login-content\">\n        <div class=\"row\">\n            <div class=\"col-80 col-offset-10 logo-div\">\n                <h1 class=\"ion-ios-paw\"> whatsPup</h1>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-80 col-offset-10 app-description\">\n                <h3>An application for Pet Sitters to provide real-time updates to their clients.</h3>\n                <h3>Become a member with Facebook.</h3>\n            </div>\n        </div>\n          <div class=\"row\">\n            <div class=\"col-80 col-offset-10 facebook-login\">\n                <a ng-click=\"vm.sitterlogin(facebook)\">\n                    <div class=\"sitterbtn\">\n                    <div class=\"flogin-icon\"><i class=\"ion-social-facebook\"></i></div>\n                    <div class=\"flogin-text\">Login</div>\n                    </div>\n                </a>\n           </div>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("app/new-client/new-client.html","<ion-view view-title=\"New Client\">\n  <ion-nav-buttons side=\"right\">\n        <button class=\"button\" ng-click=\"vm.addClient(vm.clients, vm.clientData)\" ui-sref=\"clients\">Save</i>\n        </button>\n    </ion-nav-buttons>\n   <ion-content>\n  <client-info input-title=\"vm.inputTitle\" client-data=\"vm.clientData\"></client-info>\n    </ion-content>\n</ion-view>");
$templateCache.put("app/new-visit/new-visit.html","<ion-view view-title=\"New Visit\" class=\"new-visit\">\n    <ion-nav-buttons side=\"right\">\n        <button class=\"button\" ng-click=\"vm.sendEmail()\">Send</i>\n        </button>\n    </ion-nav-buttons>\n    <ion-content>\n        <div class=\"row\">\n            <div class=\"col-80 col-offset-10 client-pet-name\">\n                <h4>{{vm.clientData.name}}{{vm.clientData.firstName}}</h4>\n                <p>{{vm.clientData.pet}}</p>\n                <p id=\"checkIn\" ng-if=\"vm.checkinTime\">Checked In</p> \n                <span>{{vm.checkinTime}}</span>\n            </div>\n            <div class=\"col-10 avatar-div\">\n                <div class=\"avatar\"> \n                <span ng-if=\"vm.clientData.$id && vm.clientData.name\">{{vm.clientInitials(vm.clientData.name)}}</span>\n               <span>{{vm.clientData.firstName | limitTo: 1 | uppercase}}{{vm.clientData.lastName | limitTo: 1 | uppercase}}</span> </div>\n            </div>\n        </div>\n        <div class=\"list visit-list\">\n            <label class=\"item item-input\">\n                <span class=\"input-title\">Email</span>\n                <input type=\"text\" ng-model=\"vm.clientData.email\">\n            </label><!--email-->\n            <li class=\"item item-toggle\">\n                <div class=\"first-toggle-item\" style=\"padding-top: 0.5em;\">\n                    <p class=\"input-title\">Fresh Food and Water</p>\n                    <span class=\"input-label\">Food</span>\n                    <label class=\"toggle toggle-energized food-toggle\">\n                        <input type=\"checkbox\" ng-model=\"vm.food\">\n                        <div class=\"track\">\n                            <div class=\"handle\"></div>\n                        </div>\n                    </label><!--food-->\n                </div>\n                <span class=\"input-label toggle-label\">Water</span>\n                <label class=\"toggle toggle-energized toggle-food\">\n                    <input type=\"checkbox\" ng-model=\"vm.water\">\n                    <div class=\"track\">\n                        <div class=\"handle\"></div>\n                    </div>\n                </label><!--water-->\n            </li><!--item-toggle-->\n            <label class=\"item item-input item-select\">\n                <span class=\"input-title\">Play Time or Walk Duration</span>\n                <select ng-model=\"vm.play\">\n                    <option value=\"N/A\">N/A</option>\n                    <option value=\"5 Minutes\">5 Minutes</option>\n                    <option value=\"10 Minutes\">10 Minutes</option>\n                    <option value=\"15 Minutes\">15 Minutes</option>\n                    <option value=\"20 Minutes\">20 Minutes</option>\n                    <option value=\"25 Minutes\">25 Minutes</option>\n                    <option value=\"30 Minutes\">30 Minutes</option>\n                </select>\n            </label><!--play time or walk Duration-->\n            <li class=\"item item-toggle\">\n                <div class=\"first-toggle-item\" style=\"padding-top: 0.5em;\">\n                    <p class=\"input-title\">Treats</p>\n                    <span class=\"input-label\" ng-if=\"vm.treats\">Yes</span>\n                    <span class=\"input-label\" ng-if=\"vm.treats === false\">No</span>\n                    <label class=\"toggle toggle-energized food-toggle\">\n                        <input type=\"checkbox\" ng-model=\"vm.treats\">\n                        <div class=\"track\">\n                            <div class=\"handle\"></div>\n                        </div>\n                    </label>\n                </div><!--treats-->\n            </li><!--item-toggle-->\n            <label class=\"item item-input item-select\">\n                <span class=\"input-title\">Medications</span>\n                <select ng-model=\"vm.meds\">\n                    <option value=\"N/A\">N/A</option>\n                    <option value=\"Yes\">Yes</option>\n                </select>\n            </label><!--medications-->\n            <li class=\"item item-toggle\">\n                <div class=\"first-toggle-item\" style=\"padding-top: 0.5em;\">\n                    <p class=\"input-title\">Miscelaneous Tasks</p>\n                    <span class=\"input-label\">Cleaned Up Pet Mess</span>\n                    <label class=\"toggle toggle-energized food-pet-mess\">\n                        <input type=\"checkbox\" ng-model=\"vm.mess\">\n                        <div class=\"track\">\n                            <div class=\"handle\"></div>\n                        </div>\n                    </label><!--pet mess-->\n                </div>\n                <div>\n                    <span class=\"input-label toggle-label\">Packages/Mail Moved Inside</span>\n                    <label class=\"toggle toggle-energized toggle-food\">\n                        <input type=\"checkbox\" ng-model=\"vm.mail\">\n                        <div class=\"track\">\n                            <div class=\"handle\"></div>\n                        </div>\n                    </label><!--packages/mail-->\n                </div>\n                <div>\n                    <span class=\"input-label toggle-label\">Watered Plants</span>\n                    <label class=\"toggle toggle-energized toggle-plants\">\n                        <input type=\"checkbox\" ng-model=\"vm.plants\">\n                        <div class=\"track\">\n                            <div class=\"handle\"></div>\n                        </div>\n                    </label><!--plants-->\n                </div>\n                <div>\n                    <span class=\"input-label toggle-label\">Other(See Message)</span>\n                    <label class=\"toggle toggle-energized toggle-other\">\n                        <input type=\"checkbox\" ng-model=\"vm.other\">\n                        <div class=\"track\">\n                            <div class=\"handle\"></div>\n                        </div>\n                    </label><!--other-->\n                </div>\n            </li><!--item-toggle-->   \n            <label class=\"item item-input\">\n                <span class=\"input-title\">Message</span>\n                <textarea maxlength=\"280\" rows=\"5\" ng-model=\"vm.message\"></textarea> \n            </label>\n        </div><!--list-->\n        \n        <div class=\"card\" ng-if=\"vm.imgSrc\">\n           <div class=\"item item-image\">\n               <img ng-src=\"{{vm.imgSrc}}\"/>\n           </div>  \n        </div>\n    </ion-content>\n    <ion-footer-bar class=\"bar-stable footer-bar new-visit-footer\">\n        <div class=\"col-50\" ng-click=\"vm.checkIn()\">\n            <i class=\"ion-ios-location-outline location-icon\"></i>\n            <p>Check In</p>\n        </div>\n        <div class=\"col-50\" ng-click=\"vm.takePicture()\">\n            <i class=\"ion-ios-camera-outline camera-icon\" ></i>\n            <p>Camera</p>\n        </div>\n    </ion-footer-bar>\n</ion-view>");
$templateCache.put("app/profile/profile.html","<ion-view view-title=\"Profile\" class=\"profile\">\n    <ion-content>\n       <header>   \n       </header> \n        <div class=\"img-div\">\n            <img ng-src=\"{{vm.authData.avatarUrl}}\">\n        </div>\n        <h2>{{vm.authData.fullName}}</h2>\n        <p>You have a total of {{vm.numberOfClients}} clients.</p>\n        <button class=\"logout-button\">\n            <a ng-click=\"vm.logout()\">Logout</a>\n        </button>\n    </ion-content>  \n</ion-view>");
$templateCache.put("app/components/client-field/client-field.directive.html","\n<div class=\"client-field\">\n    <label class=\"item item-input\" id=\"client-input\">\n        <span id=\"client-title\">{{fieldTitle}}</span>\n        <input type=\"text\" value={{fieldValue}} ng-model=\"fieldValue\">\n    </label>\n</div>\n\n\n\n         ");
$templateCache.put("app/components/client-info/client-info.directive.html","<div class=\"client-info\">\n    <div class=\"row\">\n        <div class=\"col-80 col-offset-10 client-pet-name\">\n            <h4>{{clientData.firstName }} {{clientData.lastName}}{{clientData.name}}</h4>\n            <p>{{clientData.pet}}</p>\n        </div>\n        <div class=\"col-10 avatar-div\">\n            <div class=\"avatar\">\n               <span ng-if=\"!clientData.name && !clientData.$id && !clientData.firstName\">?</span>\n               <span ng-if=\"clientData.$id && clientData.name\">{{clientInitials(clientData.name)}}</span>\n               <span>{{clientData.firstName | limitTo: 1 | uppercase}}{{clientData.lastName | limitTo: 1 | uppercase}}</span> \n\n            </div>\n        </div>\n    </div>\n     <client-field ng-if=\"!clientData.$id\" field-value=\"clientData.firstName\" field-title=\"inputTitle.firstName\"></client-field>\n    <client-field ng-if=\"!clientData.$id\" field-value=\"clientData.lastName\" field-title=\"inputTitle.lastName\"></client-field>\n    <client-field field-value=\"clientData.pet\" field-title=\"inputTitle.pet\"></client-field>\n    <client-field field-value=\"clientData.email\" field-title=\"inputTitle.email\"></client-field>\n    <client-field field-value=\"clientData.phone\" field-title=\"inputTitle.phone\"></client-field>\n    <client-field field-value=\"clientData.street\" field-title=\"inputTitle.address\"></client-field>\n    <client-field field-value=\"clientData.city\" field-title=\"inputTitle.city\"></client-field>\n    <client-field field-value=\"clientData.state\" field-title=\"inputTitle.state\"></client-field>\n    <client-field field-value=\"clientData.zip\" field-title=\"inputTitle.zipCode\"></client-field>\n    <client-field field-value=\"clientData.message\" field-title=\"inputTitle.message\"></client-field>\n</div>");}]);