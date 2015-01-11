(function() {
  'use strict';
})();

angular.module('autositeApp')
  .controller('DriverCtrl', ['$scope', '$location', 'API', 'ConstantsSvc', 'MessagingSvc', 'Driver',
    function($scope, $location, API, ConstantsSvc, MessagingSvc, Driver) {

      $scope.incident = resetIncident();

      $scope.driver = {
        driverId: Driver.data.items[0].data.driverId,
        firstName: Driver.data.items[0].data.firstName,
        lastName: Driver.data.items[0].data.lastName,
        gender: Driver.data.items[0].data.gender,
        maritalStatus: Driver.data.items[0].data.maritalStatus,
        email: Driver.data.items[0].data.email,
        ageLicensed: Driver.data.items[0].data.ageLicensed,
        accidents: Driver.data.items[0].data.accidents,
        claims: Driver.data.items[0].data.claims,
        violations: Driver.data.items[0].data.violations
      };

      $scope.incidents = [];

      // Add Accidents to Incidents List
      if ($scope.driver.accidents) {
        _($scope.driver.accidents).forEach(function(accident) {
          accident.category = "ACCIDENT";
          $scope.incidents.push(accident);
        });
      }

      // Add Claims to Incidents List
      if ($scope.driver.claims) {
        _($scope.driver.claims).forEach(function(claim) {
          claim.category = "CLAIM";
          $scope.incidents.push(claim);
        });
      }

      // Add Violations to Incidents List
      if ($scope.driver.violations) {
        _($scope.driver.violations).forEach(function(violation) {
          violation.category = "VIOLATION";
          $scope.incidents.push(violation);
        });
      }

      $scope.hadAccidents = ($scope.incidents.length === 0) ? "false" : "true";

      $scope.accidentTypes = [
        {value: '1', text: 'Other car hit your car'},
        {value: '2', text: 'No fault claim'},
        {value: '3', text: 'Wheelie Crash (Ingulli)'}
      ];

      $scope.claimTypes = [
        {value: '1', text: 'Glass Loss'},
        {value: '2', text: 'Theft Loss'},
        {value: '3', text: 'Hit Animal'},
        {value: '4', text: 'Towing Claim'}
      ];

      $scope.violationTypes = [
        {value: '1', text: 'DUI/DWI'},
        {value: '2', text: 'Driving unsafe vehicle'},
        {value: '3', text: 'Failure to stop at stop sign'},
        {value: '4', text: 'Racing'}
      ];

      // inner page header config
      MessagingSvc.newMessage({
        text: '<div class="details-header driver clear-before"><div class="avatar driver hidden-xs"><img src="/assets/images/header_avatar.svg" height="35" width="35"/></div><div class="name"><div id="driver_name">' +
          '<div><small class="count">Driver ' + $scope.driver.driverId + '</small></div><h3>' + $scope.driver.firstName + ' ' + $scope.driver.lastName + '</h3></div></div>',
        type: 'normal'
      }, true);

      $scope.addNewIncident = function(incident) {
        var request = {
          type: incident.type.value,
          description: incident.type.text,
          date: incident.date
        };

        if (incident.category == "ACCIDENT") {
          API.call('accident', {driverId: $scope.driver.driverId}).post(request).then(function(data) {
            request.category = "ACCIDENT";
            $scope.incidents.push(request);
            $scope.incident = resetIncident();
          });
        }
        else if (incident.category == "CLAIM") {
          API.call('claim', {driverId: $scope.driver.driverId}).post(request).then(function(data) {
            request.category = "CLAIM";
            $scope.incidents.push(request);
            $scope.incident = resetIncident();
          });
        }
        else if (incident.category == "VIOLATION") {
          API.call('violation', {driverId: $scope.driver.driverId}).post(request).then(function(data) {
            request.category = "VIOLATION";
            $scope.incidents.push(request);
            $scope.incident = resetIncident();
          });
        }
      };

      $scope.continueClick = function() {
        var request = {
          gender: $scope.driver.gender,
          maritalStatus: $scope.driver.maritalStatus,
          email: $scope.driver.email,
          ageLicensed: $scope.driver.ageLicensed
        };

        API.call('driver', {id: $scope.driver.driverId}).put(request).then(function(driver) {
          _(driver.data.items).forEach(function(driver) {
            if ($scope.driver.driverId < driver.driverId) {
              $location.path('/driver/' + driver.driverId);
              return;
            }
          });
          $location.path('/verify_current_insurance');
        });
      };

      function resetIncident() {
        return {
          "category": '',
          "type": '',
          "date": null
        };
      }

    }]);
