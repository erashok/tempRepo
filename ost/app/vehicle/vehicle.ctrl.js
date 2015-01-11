(function() {
  'use strict';
})();

angular.module('autositeApp')
  .controller('VehicleCtrl', ['$scope', '$location', 'API', 'ConstantsSvc', 'MessagingSvc', 'Vehicle', 'Drivers',
    function($scope, $location, API, ConstantsSvc, MessagingSvc, Vehicle, Drivers) {

      $scope.drivers = Drivers.data.items;

      // Vehicle Data
      $scope.vehicle = {
        vehicleId: Vehicle.data.items[0].data.vehicleId,
        year: Vehicle.data.items[0].data.year,
        make: Vehicle.data.items[0].data.make,
        model: Vehicle.data.items[0].data.model,
        trim: Vehicle.data.items[0].data.trim,
        purchaseType: Vehicle.data.items[0].data.purchaseType,
        primaryDriverId: Vehicle.data.items[0].data.primaryDriverId,
        vehicleUse: Vehicle.data.items[0].data.vehicleUse,
        distanceToWork: Vehicle.data.items[0].data.distanceToWork,
        annualMileage: Vehicle.data.items[0].data.annualMileage,
        parkedZipCode: Vehicle.data.items[0].data.parkedZipCode,
        safetyFeatures: Vehicle.data.items[0].data.safetyFeatures,
        additionalFeatures: Vehicle.data.items[0].data.additionalFeatures
      };

      $scope.vehicle.image = ConstantsSvc.VEHICLE_IMG_URL + '?year=' + $scope.vehicle.year + '&make=' + $scope.vehicle.make + '&model=' + $scope.vehicle.model;

      // Show Header
      MessagingSvc.newMessage({
        text: '<div class="details-header clear-before"><div class="avatar hidden-xs"><img class="car" src="' + $scope.vehicle.image + '" style="height: 100px;"></div><div class="name"><div id="driver_count">' +
          '<small class="count">Vehicle ' + $scope.vehicle.vehicleId + '</small></div>' +
          '<h3><strong>' + $scope.vehicle.year + ' ' + $scope.vehicle.make + '</strong> ' + $scope.vehicle.model + ' ' + $scope.vehicle.trim + '</h3></div></div>',
        type: 'normal'
      }, true);

      // Safety Features
      $scope.safetyFeatures = {};
      if ($scope.vehicle.safetyFeatures) {
        _($scope.vehicle.safetyFeatures).forEach(function(feature) {
          $scope.safetyFeatures[feature] = true;
        });
      }

      // Additional Features
      $scope.additionalFeatures = {};
      if ($scope.vehicle.additionalFeatures) {
        _($scope.vehicle.additionalFeatures).forEach(function(feature) {
          $scope.additionalFeatures[feature] = true;
        });
      }

      // Continue Click
      $scope.continueClick = function() {
        var safetyFeatures = [];
        for (var feature in $scope.safetyFeatures) {
          if ($scope.safetyFeatures[feature] === true) {
            safetyFeatures.push(feature);
          }
        }
        $scope.vehicle.safetyFeatures = safetyFeatures;

        var additionalFeatures = [];
        _.forOwn($scope.additionalFeatures, function(num, key) {
          console.log(num + " " + key);
          if ($scope.additionalFeatures[feature] === true) {
            additionalFeatures.push(feature);
          }
        });
        $scope.vehicle.additionalFeatures = additionalFeatures;

        delete $scope.vehicle.image;

        // Call REST Endpoint / Move to Next Page
        API.call('vehicle', {id: $scope.vehicle.vehicleId}).put($scope.vehicle).then(function(vehicle) {
          _(vehicle.data.items).forEach(function(vehicle) {
            if ($scope.vehicle.vehicleId < vehicle.vehicleId) {
              $location.path('/vehicle/' + vehicle.vehicleId);
              return;
            }
          });
          $location.path('/driver/' + $scope.drivers[0].data.driverId);
        });
      };

  }]);
