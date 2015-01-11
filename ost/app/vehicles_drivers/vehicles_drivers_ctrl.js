(function() {
  'use strict';
}());

angular.module('autositeApp')
  .controller('VehiclesDriversCtrl', ['$scope', '$location', 'ConstantsSvc', 'API', 'MessagingSvc', 'Vehicles', 'Drivers',
    function($scope, $location, ConstantsSvc, API, MessagingSvc, Vehicles, Drivers) {

      $scope.prefill = false;
      $scope.vinExpand = false;
      $scope.maxVehicles = ConstantsSvc.RULES.MAX_VEHICLES;

      // Driver Data
      $scope.driver = resetDriver();
      $scope.drivers = Drivers.data.items;

      // Vehicle Data
      $scope.vehicle = resetVehicle();
      $scope.vehicles = (Vehicles.data.items) ? Vehicles.data.items : [];
      _($scope.vehicles).forEach(function(vehicle) {
        vehicle.data.active = true;
        vehicle.data.image = ConstantsSvc.VEHICLE_IMG_URL + '?year=' + vehicle.data.year + '&make=' + vehicle.data.make + '&model=' + vehicle.data.model;
      });

      // Modal Dropdowns
      $scope.years = [];
      $scope.makes = [];
      $scope.models = [];
      $scope.trims = [];

      // Year
      API.call('dropdown_vehicle_year').get()
        .then(function(response) {
          $scope.years = response.data;
        });

      // Make
      $scope.getMakes = function(year) {
        API.call('dropdown_vehicle_make', {year: year}).get()
          .then(function(response) {
            $scope.makes = response.data;
            $scope.models = [];
            $scope.trims = [];

            $scope.vehicle.make = undefined;
            $scope.vehicle.model = undefined;
            $scope.vehicle.trim = undefined;
          });
      };

      // Model
      $scope.getModels = function(year, make) {
        API.call('dropdown_vehicle_model', {year: year, make: make}).get()
          .then(function(response) {
            $scope.models = response.data;
            $scope.trims = [];
            $scope.vehicle.model = undefined;
            $scope.vehicle.trim = undefined;
          });
      };

      // Trim
      $scope.getTrims = function(year, make, model) {
        API.call('dropdown_vehicle_trim', {year: year, make: make, model: model}).get()
          .then(function(response) {
            $scope.trims = response.data;
            $scope.vehicle.trim = undefined;
          });
      };

      // Add Vehicle from Modal
      $scope.addVehicle = function(request) {
        API.call('vehicle').post(request).then(function(response) {
          var vehicle = response.data.items[response.data.items.length - 1];
          vehicle.data.active = true;
          vehicle.data.image = ConstantsSvc.VEHICLE_IMG_URL +'?year=' + vehicle.data.year + '&make=' + vehicle.data.make + '&model=' + vehicle.data.model;
          $scope.vehicles.push(vehicle);
          $scope.vehicle = resetVehicle();

          // Deploy the Success Message
          MessagingSvc.newMessage({
            text: vehicle.data.year + ' ' + vehicle.data.make + ' ' + vehicle.data.model + ' ' + vehicle.data.trim,
            type: "success"
          });
        });
      };

      $scope.vinLookup = function(vin, year) {
        API.call('vin', {vin: vin, year: year}).get()
            .then(function(response) {
              var vehicleData = response.data.vehicleList[0];

              if (vehicleData.make.length !== 0 && vehicleData.model.length !== 0) {
                $scope.addVehicle({
                  'year': vehicleData.year,
                  'make': vehicleData.make,
                  'model': vehicleData.model,
                  'trim': vehicleData.bodyTypeCode,
                  'vin': vehicleData.vin
                });

                $scope.vehicle.vin = '';
                $scope.toggleVinExpand();
              }
            });
      };

      $scope.toggleVinExpand = function(){
        $scope.vinExpand = $scope.vinExpand ? false : true;
      };

      // Add Driver from Modal
      $scope.addDriver = function(request) {
        API.call('driver').post(request).then(function(response) {
          $scope.drivers = response.data.items;
          $scope.driver = resetDriver();

          // Deploy the Success Message
          MessagingSvc.newMessage({
            text: request.firstName + ' ' + request.lastName,
            type: "success"
          });
        });
      };

      // Reset Vehicle
      function resetVehicle() {
        return {
          'year': '',
          'make': '',
          'model': '',
          'trim': '',
          'vin': ''
        };
      }

      // Reset Driver
      function resetDriver() {
        return {
          "firstName": '',
          "lastName": '',
          "birthDate": null
        };
      }

  }]);
