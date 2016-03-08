angular.module('whatsPupIonic')

.factory('auth', function ($firebaseObject, $state, CONST, Auth) {
    var auth = new Firebase(CONST.baseUrl);
    var currentUser = {};

    return {
        onAuth: onAuth,
        sitterlogin: sitterlogin,
        logout: logout,
        loggedIn: loggedIn,
        getUser: getUser,
        updateUser:updateUser
    }
        
        function sitterlogin () {
            Auth.$authWithOAuthRedirect("facebook").then(function (authData) {
                $state.go('clients');
            }).catch(function (error) {
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    auth.$authWithOAuthPopup("facebook").then(function (authData) {
                        $state.go('login');
                    });
                } else {
                    // Another error occurred
                    $state.go('newVisit');
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