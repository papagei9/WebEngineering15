import Ember from 'ember';

var UserCheckboxComponent = Ember.Component.extend({
  tagName: '',
  checked: function(){
    var member = this.get('member.username');
    var projectMembers = this.get('project.members').mapBy('username');

    return projectMembers.contains(member);
  }.property('project.members'),

  save: function(){
    var memberChecked = this.get('checked');
    var project = this.get('project');
    var member = this.get('member');
    var members = project.get('members');

    if(memberChecked){
      if(this.get('updateAction')) {
        this.sendAction('updateAction', member, 'add');
      } else {
        project.get('members').addObject(member);
      }
      //member.save();
      //project.save();
    }
    else {
      if(this.get('updateAction')) {
        this.sendAction('updateAction', member, 'remove');
      } else {
        project.get('members').removeObject(member);
      }
      //project.save();
    }
  }.observes('checked')
});

export default UserCheckboxComponent;
