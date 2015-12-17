import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  actions: {

    createComment: function() {
      var project = this.get('model.project');
      var comment = this.get('comment');

      //var task_id = this.getProperties('task_id');
      var task = this.get('task');

      var self = this;

      var cookie = Ember.$.cookie('authToken');
      Ember.$.ajax({
        context: this,
        url: 'http://group-collab-api.herokuapp.com/api/projects/' + project.id + '/tasks/' + task.id + '/comments',
        type: 'POST',
        data: JSON.stringify({
          comment: {
            title: comment.get("text"),
            text: comment.get("text")
          }
        }),
        headers: {
          'Authorization': 'Basic ' + cookie
        },
        contentType: 'application/json',
        dataType: 'json'
      }).then(function (result) {
        Ember.get(self, 'flashMessages').success('Comment added!', {timeout: 5000});
        //self.get('router').transitionTo('project', project);
        self.get('store').findRecord('comment', result.comment._id);
      }, function () {
        alert('Could not save comment!');
      });
    }
  }
});
