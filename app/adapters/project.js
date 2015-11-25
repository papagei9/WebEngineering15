import DS from "ember-data";

var ProjectAdapter = DS.FixtureAdapter.extend({});

/*var ProjectAdapter = DS.RESTAdapter.extend({  
    host: 'https://group-collab-api.herokuapp.com',
    namespace: 'api',
    headers: Ember.computed(function() {
        return {
          "Authorization": "Basic " + Ember.get(document.cookie.match(/authToken\=([^;]*)/), "1"),
          "ANOTHER_HEADER": "Some header value" 
        };
    }).volatile()
});*/

export default ProjectAdapter;
