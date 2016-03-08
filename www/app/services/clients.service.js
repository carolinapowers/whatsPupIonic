angular.module('whatsPupIonic')

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
    
    //    var delClient = new Firebase('https://whatspup.firebaseio.com/Clients/' + this.user.$id + '/' + newClient.$id);
     
})