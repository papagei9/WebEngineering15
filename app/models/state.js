import DS from 'ember-data';

var State = DS.Model.extend({
  name: DS.attr('string')
  //project: DS.belongsTo('project',{async:true})
});

State.reopenClass({
  FIXTURES: [
    {
        id: 1,
        name: "ongoing"
    },
    {
        id: 2,
        name: "finished"
    },
    {
        id: 3,
        name: "waiting"
    }
  ]
});

export default State;