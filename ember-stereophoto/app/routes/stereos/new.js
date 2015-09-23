// route/stereos/new.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // take left and right photo
    return new Ember.RSVP.Promise(function(resolve) {
      navigator.camera.getPicture(function(dataURL) {
        var left = dataURL;
        console.log('DEBUG: left taken', left);
        // XXX For some reason without timeout an error is returned
        Ember.run.later(function(){
          navigator.camera.getPicture(function(dataURL) {
            var right = dataURL;
            console.log('DEBUG: right', right);
            Ember.run.later(resolve, {
              'leftPhoto': left,
              'rightPhoto': right
            }, 1000);
          }, function(err) {
            console.log('DEBUG: right', err);
          }, {destinationType: Camera.DestinationType.FILE_URI});
        }, 1000);
      }, function(err) {
        console.log('DEBUG: left', err);
      }, {destinationType: Camera.DestinationType.FILE_URI});
    });
  },
  setupController(controller, model) {
    // display align page
    console.log('DEBUG', model);
    controller.set('model', model);
  } 
});

