'use strict';

angular.module('autositeApp')
  .controller('AdjustmentsCtrl', ['$scope', '$location', 'API', 'ConstantsSvc', 'MessagingSvc', 'Drivers',
    function($scope, $location, API, ConstantsSvc, MessagingSvc, Drivers) {

      $scope.drivers = Drivers.data.items;

      $scope.continueClick = function() {
        $location.path('purchase/pay');
      };

  }]);
