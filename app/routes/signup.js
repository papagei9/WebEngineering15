import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        goToLogin: function() {
            this.transitionToRoute('login');
        }
    }
});
