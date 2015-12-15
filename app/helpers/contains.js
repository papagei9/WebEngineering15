import Ember from 'ember';

const contains = (params) => params[0].getEach('id').contains(params[1].get('id'));
export default Ember.Helper.helper(contains);



/*
return this.get('model.project').get('members').getEach('id').contains(user.get('id'));
}.property('model.project.members.@each'),*/
