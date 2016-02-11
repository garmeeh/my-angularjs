'use strict';

var _ = require('lodash');

//Used to give last in watcher a unique value
function initWatchVal(){ }

function Scope() {
  this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn,
    last: initWatchVal
  };
  this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function() {
  var self = this;
  // use to take new value and keep track of what was changed
  var newValue, oldValue;

  _.forEach(this.$$watchers, function(watcher) {
      newValue = watcher.watchFn(self);
      oldValue = watcher.last;
      if(newValue !== oldValue){
        watcher.last = newValue;
        // check if the old value is the intial value and replace it if it is
        watcher.listenerFn(newValue,
          (oldValue === initWatchVal ? newValue : oldValue),
          self);
      }
  });
};

module.exports = Scope;
