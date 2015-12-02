import Ember from 'ember';

import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
    actions:{
        goToLogin: function() {
            this.transitionToRoute('login');
        },
        goToAccount: function() {
            this.transitionToRoute('account');
        }
    }
});
