import Ember from 'ember';


export default Ember.Service.extend({
  flashMessages: Ember.inject.service(),
  store: Ember.inject.service(),
  sessionAccount: Ember.inject.service('session-account'),

  joinProject: function(project) {

    const flashMessages = this.get('flashMessages');

    var self = this;
    var cookie = Ember.$.cookie('authToken');
    Ember.$.ajax({
      context: this,
      url: 'http://group-collab-api.herokuapp.com/api/projects/'+project.id+'/join',
      type: 'POST',
      headers: {
        'Authorization':'Basic ' + cookie
      },
      //contentType: 'application/json',
      //dataType: 'json'
    }).then(function() {
      flashMessages.success('Project joined!', {timeout: 5000});
      this.get('sessionAccount').get('account').then(function(account) {
        project.get('members').addObject(account);
      });
      self.get('router').transitionTo('project', project);
    }, function() {
      flashMessages.danger('Could not join project', {timeout:5000});
    });


  },
  leaveProject: function(project) {

    const flashMessages = this.get('flashMessages');

    var self = this;
    var cookie = Ember.$.cookie('authToken');
    Ember.$.ajax({
      context: this,
      url: 'http://group-collab-api.herokuapp.com/api/projects/'+project.id+'/leave',
      type: 'DELETE',
      headers: {
        'Authorization':'Basic ' + cookie
      },
      //contentType: 'application/json',
      //dataType: 'json'
    }).then(function() {
      flashMessages.success('Project left!', {timeout: 5000});
      this.get('sessionAccount').get('account').then(function(account) {
        project.get('members').removeObject(account);
      });
      self.get('router').transitionTo('projects');
    }, function() {
      flashMessages.danger('Could not leave project', {timeout:5000});
    });
  }
});
