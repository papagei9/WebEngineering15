import Ember from 'ember';

export default Ember.Controller.extend({
        actions: {
        create: function() {
            console.log("YEEEE");
            console.log('name: '+this.get('model.project.name'));
            console.log('users: ');
            console.log(this.get('model.project.members'));
        }
    }
});