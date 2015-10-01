// route/stereos/stereo.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('stereo', params.id);
  },
  anaglyph: true,
  serialize: function(model){
    return {id: model.id};
  }
});

