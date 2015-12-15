import Ember from 'ember';

var UserCheckboxTaskComponent = Ember.Component.extend({
  tagName: '',
  checked: function(){
    var member = this.get('member.username');
    var taskMembers = this.get('task.assignedUsers').mapBy('username');

    return taskMembers.contains(member);
  }.property('task.assignedUsers'),

  save: function(){
    var memberChecked = this.get('checked');
    var task = this.get('task');
    var member = this.get('member');
    var members = task.get('assignedusers');

    if(memberChecked){
      if(this.get('updateAction')) {
        this.sendAction('updateAction', member,'add');
      } else {
        task.get('assignedUsers').addObject(member);
      }
      //member.save();
      //project.save();
    }
    else {
      if(this.get('updateAction')) {
        this.sendAction('updateAction', member,'remove');
      } else {
        task.get('assignedUsers').removeObject(member);
      }
      //project.save();
    }
  }.observes('checked')
});

export default UserCheckboxTaskComponent;
