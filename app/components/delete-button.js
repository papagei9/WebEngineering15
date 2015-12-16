import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    'delete': function () {
      Ember.$('#delete_modal').modal('toggle');
      return this.sendAction('deleteAction', this.get('model'));
    }
  }
});
