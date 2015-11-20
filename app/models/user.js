import DS from 'ember-data';

var User = DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string')
});

User.reopenClass({
  FIXTURES: [
    {
        id: 1,
        username: "Andi",
        email: "andi@webeng",
        firstname: "Andi",
        lastname: "Hohler"
    },
    {
        id: 2,
        username: "Karan",
        email: "karan@webeng",
        firstname: "Karan",
        lastname: "Sethi"
    }
  ]
});

export default User;