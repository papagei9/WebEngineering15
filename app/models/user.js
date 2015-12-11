import DS from 'ember-data';

var User = DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    pasword: DS.attr('string')
});

export default User;
