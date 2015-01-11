'use strict';

angular.module('autositeApp').
  service('StorageSvc', ['localStorageService', function StorageSvc(localStorageService) {

    var SESSION_ID = "SESSION_ID";
    var PRIVATE_KEY = "PRIVATE_KEY";

    this.setSessionId = function(sessionId) {
      set(SESSION_ID, sessionId);
    }

    this.getSessionId = function() {
      return get(SESSION_ID);
    }

    this.setPrivateKey = function(key) {
      set(PRIVATE_KEY, key);
    }

    this.getPrivateKey = function() {
      return get(PRIVATE_KEY);
    }

    this.clearStorage = function() {
      localStorageService.clearAll();
    }

    function get(id) {
      //console.log("calling get for " + id + " " + localStorageService.get(id));
      return localStorageService.get(id);
    }

    function set(id, value) {
      //console.log("calling set for " + id + " " + value);
      localStorageService.set(id, value);
    }

  }]);