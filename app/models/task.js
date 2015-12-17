import DS from 'ember-data';

var Task = DS.Model.extend({
  title: DS.attr('string'),
  text: DS.attr('string'),
  owner: DS.belongsTo('user',{async:true}),
  project: DS.belongsTo('project', {async:true}),
  date: DS.attr('string'),
  deadline: DS.attr('string'),
  color: DS.attr('string', {defaultValue:''}),
  priority: DS.attr('string'),
  isDone: DS.attr('boolean'),
  assignedUsers: DS.hasMany('user',{async:true}),

  colorRGBA: function() {
    var RGB = this.get('color');
    if(RGB === '') return '';
    var A = '0.6';
    var RGBA='('+parseInt(RGB.substring(1,3),16)+','+parseInt(RGB.substring(3,5),16)+','+parseInt(RGB.substring(5,7),16)+','+A+')';
    return RGBA;
  }.property('color')
});


export default Task;
