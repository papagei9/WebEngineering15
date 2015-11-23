import DS from "ember-data";

var ApplicationAdapter = DS.FixtureAdapter.extend({});
export default ApplicationAdapter;

/*var ApplicationAdapter = DS.RESTAdapter.extend({  
    host: 'https://group-collab-api.herokuapp.com',
    namespace: 'api'
});

export default ApplicationAdapter;  */