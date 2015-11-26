// app/components/login-form.js
import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
    session: service('session'),
    authenticator: 'authenticator:custom',
    actions: {
        authenticate: function() {
            var credentials = this.getProperties('identification', 'password');
            this.get('session').authenticate('authenticator:custom', credentials).catch((message) => {
                this.set('errorMessage', message);
            });
        }
    }
});