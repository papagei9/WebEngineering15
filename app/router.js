import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('projects');

  this.route('projects.new', { path: '/projects/new' } );
  this.route('project', { path: '/projects/:project_id' }, function() {
  });

  this.route('tasks');
  this.route('users');

  this.route('login');

  this.route('account');
  this.route('signup');
  this.route('myprojects');
});

export default Router;
