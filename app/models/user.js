import DS from 'ember-data';

var User = DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    pasword: DS.attr('string')
});

User.reopenClass({
  FIXTURES: [
    {
        id: 1,
        username: "Andi",
        email: "andi@webeng",
        firstName: "Andi",
        lastName: "Hohler"
    },
    {
        id: 2,
        username: "Karan",
        email: "karan@webeng",
        firstName: "Karan",
        lastName: "Sethi"
    }
  ]
});

export default User;