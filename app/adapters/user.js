import DS from "ember-data";

var UserAdapter = DS.RESTAdapter.extend({  
    host: 'https://group-collab-api.herokuapp.com',
    namespace: 'api'
});

export default UserAdapter;