'use strict';

/**
 * @ngdoc directive
 * @name autositeApp.directive:inputValidationMessage
 * @description
 * # inputValidationMessage
 */
angular.module('autositeApp')
  .directive('inputValidationMessage', function () {
    return {
      templateUrl: '/directives/input-validation-message/input-validation-message-template.html',
      restrict: 'E',
      scope: {
        expression: '=',
        message: '='
      },
      link: function postLink(scope, element, attrs) {

          //console.log('Imma expression', scope.expression);
          //console.log('Imma message', scope.message);

          scope.$watch('expression', function(val) {
            //console.log('value =>', val);

            scope.expression = val;
          })
      }
    };
  });
