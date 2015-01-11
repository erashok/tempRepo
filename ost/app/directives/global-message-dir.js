'use strict';

/**
 * @ngdoc directive
 * @name autositeApp.directive:globalMessageDir
 * @description
 * # globalMessageDir
 */
angular.module('autositeApp')
  .directive('globalMessages', ['$timeout', 'MessagingSvc','$rootScope','ConstantsSvc', function ($timeout, MessagingSvc, $rootScope, ConstantsSvc) {
    return {
      template: '<div><div class="message-wrapper"></div></div>',
      restrict: 'E',
      scope: {},
      link: function postLink(scope, element) {

        var wrapper = element.find('div.message-wrapper'),

          closeErrorMessage = function() {
            $timeout(function() {

              // reset alert
              element.addClass('closed');
              element.removeClass('success').removeClass('error').removeClass('warning');

              // reset message (wrapper) inside of alert
              wrapper.html('');
              wrapper.removeClass('slideUpFadeIn');
              wrapper.addClass('slideDownFadeOut');

            },4000)
          },

          resetTemplate = function() {
            closeErrorMessage();
            element.removeClass('closed');
            wrapper.removeClass('slideDownFadeOut');
          };

        // listen for the message deploy notification.
        $rootScope.$on(ConstantsSvc.EVENTS.DEPLOY_NEW_MESSAGE, function() {

          wrapper.html('');

          // get the message that's sitting on the messaging service and load it into the view
          wrapper.append("<strong class='message'>" + MessagingSvc.message.text + "</strong>");

          // show the alert
          element.css("display","block");

          // add the alert type to the view
          element.addClass(MessagingSvc.message.type).addClass('slideDown');

          // slide up the message
          wrapper.addClass('slideUpFadeIn');

          // reset the template when done
          resetTemplate();

        })

      }
    };
  }]);
