import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    confirm: function () {
      var $btn, $confirm, el, height, offset, width;
      el = this.get('element');
      $btn = Ember.$('.btn-delete', el);
      offset = $btn.offset();
      $confirm = $btn.next();
      height = $confirm.outerHeight();
      width = $confirm.outerWidth();
      $confirm.css('top', offset.top - height - 20);
      $confirm.css('left', offset.left - width / 2 + 20);
      return $confirm.fadeIn();
    },
    cancel: function () {
      var $confirm, el;
      el = this.get('element');
      $confirm = Ember.$('.delete-confirm', el);
      return $confirm.fadeOut();
    },
    'delete': function () {
      var $confirm, el;
      el = this.get('element');
      $confirm = Ember.$('.delete-confirm', el);
      $confirm.fadeOut();
      return this.sendAction('deleteAction');
    }
  }
});
