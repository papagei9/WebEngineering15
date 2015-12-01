import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
    session: service('session'),
    actions: {
        register: function() {
            const flashMessages = Ember.get(this, 'flashMessages');
            var credentials = this.getProperties('identification', 'password','repeat_password','email', 'firstName', 'lastName');
            /*this.get('session').authenticate('authenticator:custom', credentials).catch((message) => {
                //this.set('errorMessage', message);
            });*/
            console.log(credentials);
            //this.set('successMessage', 'Test');
            
            if(!(credentials.identification && 0 !== credentials.identification.length && credentials.password && 0 !== credentials.password.length && credentials.repeat_password && 0 !== credentials.repeat_password.length)) {
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
                        password: credentials.password,
                        email: credentials.email,
                        firstName: credentials.firstName,
                        lastName: credentials.lastName }
                    }),
                    contentType: 'application/json',
                    dataType: 'json'
                }).then(function(response) {
                    /*Ember.run(function() {
                        resolve({
                            token: response
                        });*/
                    console.log(response);
                    flashMessages.success('Sign up successful. Please log in now.',{timeout:5000});
                    this.get('router').transitionTo('login');
                    //this.set('successMessage', 'YEAAAAH registered');
                    //this.transitionTo('login');
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