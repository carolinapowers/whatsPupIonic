angular.module('whatsPupIonic')

.factory('clients', function ($firebaseArray, $state, CONST, Auth) {
   
    return {
        
        addClient : addClient,
        deleteClient: deleteClient,
        getClients: getClients
    }
    
    var self = this;
    var userUid = Auth.onAuth(function (user) {
            self.user = user;
            if (user === null) {
                console.log('null')
            } else {
                console.log(user.$id)
                return user.$id;
            }
        });
    var sitterInfo = new Firebase('https://whatspup.firebaseio.com/Clients/' + this.user.$id);
    var delClient = new Firebase('https://whatspup.firebaseio.com/Clients/' + this.user.$id + '/' + newClient.$id);
    //var clients = $firebaseArray(sitterInfo);
    
        function getClients() {
            return  $firebaseArray(sitterInfo);
        }
       function addClient (newClient) {
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
})