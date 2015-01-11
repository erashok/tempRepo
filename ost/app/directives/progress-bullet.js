'use strict';

/**
 * @ngdoc directive
 * @name autositeApp.directive:progressBullet
 * @description
 * # progressBullet
 */
angular.module('autositeApp')
  .directive('progressBullet', function ($window) {
    return {
      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
//        console.log('I am ' + element.width() + 'wide');
      }
    };
  });
