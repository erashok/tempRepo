'use strict';

angular.module('autositeApp')
  .controller('PurchaseCtrl', ['$scope', '$location', 'API', 'ConstantsSvc', 'MessagingSvc',
    function PurchaseCtrl($scope, $location, API, ConstantsSvc, MessagingSvc) {

      $scope.continueClick = function() {
        $location.path('/purchase/vehicles');
      };

  }]);
