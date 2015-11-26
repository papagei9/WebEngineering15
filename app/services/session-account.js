import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  account: Ember.computed('session.user', function() {
    //const account = this.get('session.user');
    const account = Ember.$.cookie('user_id');
    if (!Ember.isEmpty(account)) {
      return DS.PromiseObject.create({
        promise: this.get('store').findRecord('user', account)
      });
    }
  })
});
