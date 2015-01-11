'use strict';

/**
 * @ngdoc function
 * @name autositeApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the autositeApp
 */
angular.module('autositeApp')
  .controller('IndexCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
