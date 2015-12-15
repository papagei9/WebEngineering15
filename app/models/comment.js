import DS from 'ember-data';

var Comment =  DS.Model.extend({
  text: DS.attr('string'),
  title: DS.attr('string'),
  user: DS.belongsTo('user',{async:true}),
  date: DS.attr('string'),
  task: DS.belongsTo('task',{async:true})
});


Comment.reopenClass({
  FIXTURES: [
    {
        id: 1,
        text: "comment 1",
        user: 1,
        task: 1,
        date: "1.1.1"
    },
    {
        id: 2,
        text: "comment 2",
        date: "2.2.2",
        user: 2,
        task: 2
    }
  ]
});

export default Comment;
