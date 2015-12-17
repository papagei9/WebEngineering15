import DS from 'ember-data';

var Task = DS.Model.extend({
  title: DS.attr('string'),
  text: DS.attr('string'),
  owner: DS.belongsTo('user',{async:true}),
  project: DS.belongsTo('project', {async:true}),
  date: DS.attr('string'),
  deadline: DS.attr('string'),
  color: DS.attr('string', {defaultValue:'#ffffff'}),
  priority: DS.attr('string'),
  isDone: DS.attr('boolean'),
  assignedUsers: DS.hasMany('user',{async:true})
});


export default Task;
