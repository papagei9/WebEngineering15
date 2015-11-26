import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const { service } = Ember.inject;

export default Base.extend({
  session: service('session'),
    tokenEndpoint: 'http://group-collab-api.herokuapp.com/api/authenticate',
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },

    authenticate: function(options) {
        var auth = Ember.$.base64.encode(options.identification+':'+options.password);
        Ember.$.cookie('authToken', auth);
        this.set('session.authToken', auth);
        this.set('session.user', options.identification);
        Ember.$.cookie('user', options.identification);

        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                url: this.tokenEndpoint,
                type: 'GET',
                /*beforeSend: function (request)
                {
                    request.setRequestHeader("Authority", authorizationToken);
                },*/
                headers: {
                    'Authorization':'Basic ' + auth
                },
                /*data: JSON.stringify({
                    username: options.identification,
                    password: options.password
                }),*/
                contentType: 'application/json',
                dataType: 'json'
            }).then(function(response) {
                Ember.run(function() {
                    resolve({
                        token: response
                    });
                  Ember.$.cookie('user_id', response.user._id);
                });
            }, function(xhr, status, error) {
                var response = xhr.responseText;
                Ember.run(function() {
                    reject(response);
                });
            });
        });
    },

    invalidate: function() {
        console.log('invalidate...');
        return Ember.RSVP.resolve();
    }
});
