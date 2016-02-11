'use strict';

var _ = require('lodash');

function Scope() {
  this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn
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
        watcher.listenerFn(newValue, oldValue, self);
      }
  });
};

module.exports = Scope;
