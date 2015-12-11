import DS from 'ember-data';

var Note = DS.Model.extend({
  text: DS.attr('string'),
  date: DS.attr('string'),
  owner: DS.belongsTo('user', {async:true}),
  project: DS.belongsTo('project', {async:true}),
  color: DS.attr('string')
});

export default Note;
