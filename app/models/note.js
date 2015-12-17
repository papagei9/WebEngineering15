import DS from 'ember-data';

var Note = DS.Model.extend({
  text: DS.attr('string'),
  date: DS.attr('string'),
  owner: DS.belongsTo('user', {async:true}),
  project: DS.belongsTo('project', {async:true}),
  color: DS.attr('string', {defaultValue:'#ffffff'}),

  colorRGBA: function() {
    var RGB = this.get('color');
    if(RGB === '') return '';
    var A = '0.6';
    var RGBA='('+parseInt(RGB.substring(1,3),16)+','+parseInt(RGB.substring(3,5),16)+','+parseInt(RGB.substring(5,7),16)+','+A+')';
    return RGBA;
  }.property('color')
});

export default Note;
