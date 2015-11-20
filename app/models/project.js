import DS from 'ember-data';

var Project = DS.Model.extend({
  name: DS.attr('string'),
  owner: DS.belongsTo('user',{async:true}),
  isPublic: DS.attr('boolean'),
    tasks: DS.hasMany('task',{async:true}),
    notes: DS.hasMany('note',{async:true}),
    members: DS.hasMany('user',{async:true})
});


Project.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: "Testproject",
      owner: 1,
      isPublic: false,
        tasks: [1, 2],
        notes: [1, 2],
        members: [1,2]
    },
    {
      id: 2,
      name: "Testproject 2",
      owner: 2,
      isPublic: true,
        members: [1,2],
        tasks: [3],
        notes: [3]
    }
  ]
});


export default Project;

