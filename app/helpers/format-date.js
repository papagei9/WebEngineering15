import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let value = params[0],
    format = params[1];

  return moment(value).format(format);
});
