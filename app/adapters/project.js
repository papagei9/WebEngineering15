import DS from "ember-data";

var ProjectAdapter = DS.RESTAdapter.extend({
    host: 'https://group-collab-api.herokuapp.com',
    namespace: 'api',
  defaultSerializer: 'project',
    headers: Ember.computed(function() {
        return {
          "Authorization": "Basic " + Ember.get(document.cookie.match(/authToken\=([^;]*)/), "1")
        };
    }).volatile()
});

ProjectAdapter.reopen({
  headers: {
    "Authorization": "Basic " + Ember.$.cookie('authToken')
  }
});

export default ProjectAdapter;
