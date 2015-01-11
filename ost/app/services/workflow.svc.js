'use strict';

/**
 * @ngdoc service
 * @name autositeApp.WorkflowSvc
 * @description
 * # WorkflowSvc
 * Service in the autositeApp.
 */

angular.module('autositeApp')
  .service('WorkflowSvc', function WorkflowSvc() {

    var workflows = ['Your Info', 'Vehicles', 'Drivers', 'Quote', 'Purchase'];

    return {
      getWorkflows: function() {
         return workflows;
      }
    }

  });
