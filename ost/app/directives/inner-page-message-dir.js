'use strict';

/**
 * @ngdoc directive
 * @name autositeApp.directive:innerPageMessage
 * @description
 * # innerPageMessage
 */
angular.module('autositeApp')
  .directive('innerPageMessage', ['$rootScope', 'MessagingSvc','ConstantsSvc', function ($rootScope, MessagingSvc, ConstantsSvc) {
    return {
      template: '<div class="inner-page-message"></div>',
      restrict: 'E',
      link: function postLink(scope, element) {

        var wrapper = element.find('div.inner-page-message');

        $rootScope.$on(ConstantsSvc.EVENTS.DEPLOY_NEW_INNER_MESSAGE, function() {
          wrapper.css({display:'block'});
          wrapper.addClass(MessagingSvc.message.type);
          wrapper.html(MessagingSvc.message.text);
        });

        $rootScope.$on(ConstantsSvc.EVENTS.CLEAR_INNER_MESSAGE, function() {
          wrapper.html('');
          wrapper.css({display:'none'});
        });

      }
    };
  }]);
