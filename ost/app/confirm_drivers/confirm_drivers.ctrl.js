'use strict';

angular.module('autositeApp')
  .controller('ConfirmDriversCtrl', ['$scope', '$location', '$q', 'API', 'ConstantsSvc', 'MessagingSvc', 'Drivers',
    function($scope, $location, $q, API, ConstantsSvc, MessagingSvc, Drivers) {

      $scope.drivers = Drivers.data.items;

      _($scope.drivers).forEach(function(driver) {
        driver.data.fullName = driver.data.firstName + " " + driver.data.lastName;
      });

      $scope.continueClick = function() {
        var requests = [];
        _($scope.drivers).forEach(function(driver) {
          var request = {
            licenseState: driver.data.licenseState,
            licenseNumber: driver.data.licenseNumber
          };
          requests.push(API.call('driver', {id: driver.data.driverId}).put(request));
        });

        $q.all(requests).then(function() {
          $location.path('purchase/adjustments');
        });
      };

  }]);
