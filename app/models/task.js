import DS from 'ember-data';

var Task = DS.Model.extend({
  title: DS.attr('string'),
  text: DS.attr('string'),
  owner: DS.belongsTo('user',{async:true}),
  project: DS.belongsTo('project', {async:true}),
  date: DS.attr('string'),
  deadline: DS.attr('string'),
  color: DS.attr('string'),
  priority: DS.attr(),
  state: DS.belongsTo('state',{async:true}),
  comments: DS.hasMany('comment', {async:true}),
  assignedUsers: DS.hasMany('user',{async:true})
});


Task.reopenClass({
  FIXTURES: [
    {
        id: 1,
        title: "task 1",
        text: "really long text bla blah blah blah task and to do etc.",
        owner: 1,
        date: "10.10.10",
        deadline: "11.11.11",
        color: "red",
        priority: 5,
        state: 1,
        project: 1,
        comments: [1],
        assignedUsers: [1,2]
    },
    {  
        id: 2,
        title: "task 2",
        text: "blah text",
        owner: 2,
        date: "8.8.8",
        deadline: "9.9.9",
        color: "green",
        priority: 4,
        state: 2,
        project: 1,
        comments: [2],
        assignedUsers: [1]
    },
    {  
        id: 3,
        title: "task 3",
        text: "blah text",
        owner: 2,
        date: "8.8.8",
        deadline: "9.9.9",
        color: "green",
        priority: 4,
        state: 3,
        project: 2,
        assignedUsers: []
    }
  ]
});
        

export default Task;