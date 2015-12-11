import DS from 'ember-data';

var Project = DS.Model.extend({
  name: DS.attr('string'),
  owner: DS.belongsTo('user',{}),
  isPublic: DS.attr('boolean'),
  members: DS.hasMany('user',{})
});

export default Project;
