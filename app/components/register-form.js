import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
    session: service('session'),
    actions: {
        register: function() {
            var credentials = this.getProperties('identification', 'password','repeat_password');
            /*this.get('session').authenticate('authenticator:custom', credentials).catch((message) => {
                //this.set('errorMessage', message);
            });*/
            console.log(credentials);
            this.set('successMessage', 'Test');
            
            if(credentials.identification.length === 0 || !credentials.identification || credentials.password.length === 0 || !credentials.password || credentials.repeat_password.length === 0 || !credentials.repeat_password) {
                this.set('errorMessage', 'Fill in all fields!');
            } else
            if(credentials.password !== credentials.repeat_password) {
                this.set('errorMessage','Passwords are not equal');
            } else {
                          
                var data = {username: credentials.identification, password: credentials.password};
                data = Ember.$(data).serialize();
                Ember.$.ajax({
                    context: this,
                    url: 'http://group-collab-api.herokuapp.com/api/users',
                    type: 'POST',
                    /*headers: {
                        'Authorization':'Basic ' + auth
                    },*/
                    //data: data,
                    data: JSON.stringify({ user: {
                        username: credentials.identification,
                        password: credentials.password }
                    }),
                    contentType: 'application/json',
                    dataType: 'json'
                }).then(function(response) {
                    /*Ember.run(function() {
                        resolve({
                            token: response
                        });*/
                    console.log(response);
                    this.set('successMessage', 'YEAAAAH registered');
                    //Ember.$.cookie('user_id', response.user._id);
    
                }, function(xhr, status, error) {
                    var response = xhr.responseText;
                    /*Ember.run(function() {
                        reject(response);
                    });*/
                    this.set('errorMessage', response);
                    console.log(status);
                    console.log(error);
                });
            }
        }
    }
});