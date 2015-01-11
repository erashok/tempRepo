'use strict';

/**
 * @ngdoc function
 * @name autositeApp.controller:InsuranceCtrl
 * @description
 * # InsuranceCtrl
 * Controller of the autositeApp
 */
angular.module('autositeApp')
  .controller('InsuranceCtrl', function ($scope) {

    var insuranceForm = {
      currentInsurance: 'Geico',
      deductible: "500",
      startDate: null
    };

    $scope.currentInsuranceForm = {};

    $scope.currentInsuranceForm.policy = insuranceForm;

});
