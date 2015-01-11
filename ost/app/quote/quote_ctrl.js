'use strict';

/**
 * @ngdoc function
 * @name autositeApp.controller:QuoteCtrl
 * @description
 * # QuoteCtrl
 * Controller of the autositeApp
 */
angular.module('autositeApp')
  .controller('QuoteCtrl', ['$scope', '$location', 'API','ConstantsSvc', 'Vehicles', 'Drivers',
    function QuoteCtrl($scope, $location, API, ConstantsSvc, Vehicles, Drivers) {

  //TODO: this should not be here. Move to a directive.

  if(document.getElementById('auto_quote')){
	document.body.id = 'page_auto_quote';
  } else if(document.getElementById('quote_coverage')){
	document.body.id = 'page_quote_coverage';
  } else {
	document.body.id = '';
  };

  $scope.plans = [
    {id: 0, name: 'State Minimum', price: '140'},
    {id: 1, name: 'Standard Protection', price: '160'},
    {id: 2, name: 'Total Protection', price: '200'}
  ];

  $scope.selectedItem = $scope.plans[0];

  $scope.updateTab = function(idx) {
    $scope.plans[idx].active = true;
    console.log('$scope.plans[id].active =>', $scope.plans[idx]);
  };

  $scope.$parent.secure = false;
  $scope.$parent.showMobileSnoopy = true;

  $scope.vehicles = Vehicles.data.items;
  $scope.drivers = Drivers.data.items;

  $scope.loadContent = function(value){
    $scope.price = value;
    return $scope.price;
  }

  $scope.continueClick = function() {
    $location.path('/purchase');
  }

}]);
