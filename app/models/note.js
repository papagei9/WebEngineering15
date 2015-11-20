import DS from 'ember-data';

var Note = DS.Model.extend({
  text: DS.attr('string'),
  date: DS.attr('string'),
  owner: DS.belongsTo('user', {async:true}),
  project: DS.belongsTo('project', {async:true}),
  color: DS.attr('string')
});

Note.reopenClass({
  FIXTURES: [
    {
        id: 1,
        text: "test note 1",
        date: "1.1.1",
        owner: 1,
        project: 1,
        color: "blue"
    },
    {
        id: 2,
        text: "test note 2",
        date: "2.2.2",
        owner: 2,
        project: 1,
        color: "orange"
    },
    {
        id: 3,
        text: "test note 3",
        date: "2.2.2",
        owner: 1,
        project: 2,
        color: "orange"
    }
  ]
});

export default Note;