'use strict';

/**
 * @ngdoc function
 * @name autositeApp.controller:RentersCtrl
 * @description
 * # RentersCtrl
 * Controller of the autositeApp
 */
angular.module('autositeApp')
  .controller('RentersCtrl', ['$scope', 'DriverSvc', 'VehicleSvc', 'ConstantsSvc', '$rootScope', '$location', 'MessagingSvc', function ($scope, DriverSvc, VehicleSvc, ConstantsSvc, $rootScope, $location, MessagingSvc) {

    $scope.rentersFormData = {};

    // conditional claim flags
    $scope.claimform = {};
    $scope.listClaims = false;
    $scope.addNewClaim = true;
    $scope.editModeLabel = 'Edit';
    $scope.showDeleteButton = false;
    $scope.addBtnLabel = "add";
    var selectedClaimIndex = null;

    // reference to the incident form
    $scope.claim_collection = [];
    $scope.claim_form = {};

    // variables
    $scope.price = '140';

    $scope.loadContent = function(value){
      $scope.price = value;
      return $scope.price;
    }

    $scope.$parent.renters = true;
    console.log('I am secure =>', $scope.secure, $location);

    if($location.$$path == "/renters" || $location.$$path == "/renters/quote" ||$location.$$path == "/renters/selection"){
      DriverSvc.initDrivers();
      $scope.drivers = [];

      VehicleSvc.getVehicles();
      $scope.vehicles = [];
    }

    var initClaimForm = function() {

      // grab a copied reference to the incident form from the constants
      var copy = _.find(ConstantsSvc.FORM_DEFINITIONS, {name: 'new_incident'});

      // copy it.
      angular.copy(copy, $scope.claim_form);
    };

    $scope.addNewIncident = function() {


      if( $scope.claim_form.form.category == undefined || $scope.claim_form.form.type == undefined || $scope.claim_form.form.date == undefined){
        return false;
      }else{
        console.log($scope.claim_form.form.category, $scope.claim_form.form.type, $scope.claim_form.form.date);
      }

      // push the current incident into the collection
      $scope.claim_collection.push($scope.claim_form.form);

      // make sure we don't have dupes upon update
      $scope.claim_collection = _.uniq($scope.claim_collection);

      // update the view flags
      $scope.listClaims = true;
      $scope.addNewClaim = false;
      $scope.addlAccidentButton = true;

      // reset the form for a new entry
      initClaimForm();
    };

    $scope.addAddlIncident = function() {

      // update view flags
      $scope.addlAccidentButton = false;
      $scope.addNewClaim = true;
      $scope.addBtnLabel = 'add';

    };

    $scope.editIncident = function($index) {

      // set the incident form to the selected
      // form using the repeater index variable
      $scope.claim_form.form = $scope.claim_collection[$index];

      // set the view flags
      $scope.addlAccidentButton = false;
      $scope.addNewClaim = true;
      $scope.showDeleteButton = true;
      $scope.addBtnLabel = 'update';

      // store a public reference to the current index from the repeater
      selectedClaimIndex = $index;
    };

    $scope.deleteIncident = function(selectedClaimIndex) {

      // set the view flags
      $scope.claim_collection.splice(selectedClaimIndex, 1);
      $scope.showDeleteButton = false;
    };

    // POC only. This is to POC the inner page messaging.
    // I can be deployed any way you like.
    // Here we do it according to the location

    switch($location.path()){
      case '/purchase/adjustments':
      case '/purchase/overview':

        // set the inner page message to true
        $scope.$parent.innerPageMessage = true;

        MessagingSvc.newMessage({
          text: 'Before your policy can start, <strong>you\'ll need to complete the following</strong>',
          type: 'warning'
        }, false);

        break;
      default:
        break;
    }

    // Events
    $rootScope.$on(ConstantsSvc.EVENTS.DRIVERS_LOADED, function(){
      $scope.drivers = DriverSvc.drivers;
      $scope.driver = $scope.drivers[0];
    });
    $rootScope.$on(ConstantsSvc.EVENTS.VEHICLES_LOADED, function(){
      $scope.vehicles = VehicleSvc.vehicles;
    });

    //Toggle Methods for Plan Selection
    $scope.toggleSelection = function(el){
      var $_btn = $(el.target);
      //$_btn.parent('.option').toggleClass('faded');

      if($_btn.html() == 'Remove'){
        $_btn.html("Add Back");
        $_btn.parent('.option').addClass('faded');
      }else{
        $_btn.html("Remove");
        $_btn.parent('.option').removeClass('faded');
      };

    }



  }]);