'use strict';

angular.module('autositeApp')
  .controller('ConfirmVehiclesCtrl', ['$scope', '$location', '$q', 'API', 'ConstantsSvc', 'MessagingSvc', 'Vehicles',
    function($scope, $location, $q, API, ConstantsSvc, MessagingSvc, Vehicles) {

      $scope.vehicles = Vehicles.data.items;

      // Parse Purchase Dates
      _($scope.vehicles).forEach(function(vehicle) {
          vehicle.data.purchaseDate = new Date(vehicle.data.purchaseDate);
      });

      $scope.continueClick = function() {
        var requests = [];
        _($scope.vehicles).forEach(function(vehicle) {
          var request = {
            vin: vehicle.data.vin,
            newOrUsed: vehicle.data.newOrUsed,
            purchaseDate: vehicle.data.purchaseDate
          }
          requests.push(API.call('vehicle', {id: vehicle.data.vehicleId}).put(request));
        });

        $q.all(requests).then(function() {
          $location.path('/purchase/drivers');
        });
      };

  }]);
