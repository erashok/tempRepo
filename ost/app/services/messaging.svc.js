'use strict';

/**
 * @ngdoc service
 * @name autositeApp.MessagingSvcJs
 * @description
 * # MessagingSvcJs
 * Service in the autositeApp.
 */
angular.module('autositeApp')
  .service('MessagingSvc', ['$rootScope', 'ConstantsSvc', function MessagingSvc($rootScope, ConstantsSvc) {

    return {

      message: {
        text: '',
        type: ''
      },

      newMessage: function(obj, inner) {

        // set the properties on the message object so we
        // can use it as a single instance later
        this.message.text = obj.text;
        this.message.type = obj.type;

        //console.log('inner is =>', inner)

        if (!inner) {

          // broadcast the event (global messaging)
          $rootScope.$broadcast(ConstantsSvc.EVENTS.DEPLOY_NEW_MESSAGE);

        } else {

          // broadcast the event (inner page messaging)
          $rootScope.$broadcast(ConstantsSvc.EVENTS.DEPLOY_NEW_INNER_MESSAGE);

        }

      }

    }

  }]);
