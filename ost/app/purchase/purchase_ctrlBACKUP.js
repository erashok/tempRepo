'use strict';

/**
 * @ngdoc function
 * @name autositeApp.controller:PurchaseCtrl
 * @description
 * # PurchaseCtrl
 * Controller of the autositeApp
 */
angular.module('autositeApp')
  .controller('PurchaseCtrl', ['$scope', 'VehicleSvc', 'DriverSvc', 'ConstantsSvc', '$rootScope', '$location', 'MessagingSvc', function ($scope, VehicleSvc, DriverSvc, ConstantsSvc, $rootScope, $location, MessagingSvc) {

    $scope.purchaseFormData = {};
    $scope.paymenyForm = {};

    $scope.kba = {};

    $scope.kba.phoneNumbers = "";
    $scope.kba.Address = "";

    $scope.$parent.secure = true;

    if($location.$$path == "/purchase/confirm" || $location.$$path == "/purchase/final"){

      VehicleSvc.getVehicles();
      $scope.vehicles = [];

      console.log('here')

    }else{

      DriverSvc.initDrivers();
      $scope.drivers = [];

    }

    $scope.documents = {

      auto: [{
        name: 'Print Insurance Binder',
        description: 'keep it in your car until we send you a copy',
        print: true
      },
        {
          name: 'Print temporary ID cards',
          description: 'We will put the real ones in the mail',
          print: true
        },
        {
          name: 'Receipt for your down payment',
          description: 'for 8/16/2015 payment of $160.00',
          print: true
        },
        {
          name: 'Sign up for eSERVICE to access your account online',
          description: 'You will have access to all the tools and documents needed to manage your account',
          print: false
        }],

      renters: [{
        name: 'Print Insurance Binder',
        description: 'keep it in your car until we send you a copy',
        print: true
      },
        {
          name: 'Print temporary ID cards',
          description: 'We will put the real ones in the mail',
          print: true
        }]


    };

    // List of payment methods used in purchase/pay
    $scope.currentPaymentMethod = 'payroll';

    $scope.paymentMethods = [
      {value: 'payroll', label: 'Payroll Deduct', description: '<strong>$190/month, save 10%</strong> and no downpayment', info: false, bestValue: true, accordion_url: '/purchase/_partials/accordions/_accordion_payroll.html'},
      {value: 'checking', label: 'Checking Debit', description: '$190/month, <strong>and 0 downpayment</strong>', info: false, bestValue: false, accordion_url: '/purchase/_partials/accordions/_accordion_checking.html'},
      {value: 'credit', label: 'Credit Card', description: '<strong>$210/month</strong> We accept Visa, Master Card, Discover, American Express', info: false, bestValue: false, accordion_url: '/purchase/_partials/accordions/_accordion_credit.html'},
      {value: 'bill', label: 'Bill me at home', description: '<strong>$210/month + $130</strong> downpayment required', info: true, bestValue: false, accordion_url: '/purchase/_partials/accordions/_accordion_billme.html'}
    ];
    
    $scope.monthSelectOptions = [
    { name: 'Month', value: 'Month' },
		{ name: 'January', value: 'January' }, 
		{ name: 'February', value: 'February' }, 
		{ name: 'March', value: 'March' }, 
		{ name: 'April', value: 'April' }, 
		{ name: 'May', value: 'May' }, 
		{ name: 'June', value: 'June' }, 
		{ name: 'July', value: 'July' }, 
		{ name: 'August', value: 'August' }, 
		{ name: 'September', value: 'September' }, 
		{ name: 'October', value: 'October' }, 
		{ name: 'November', value: 'November' }, 
		{ name: 'December', value: 'December' }
    ];
    
    $scope.yearSelectOptions = [
    	{ name: 'Year', value: '0000' }, 
		{ name: '2014', value: '2014' }, 
		{ name: '2013', value: '2013' },
		{ name: '2012', value: '2012' },
		{ name: '2011', value: '2011' },
		{ name: '2010', value: '2010' }
    ];

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
          }, true);

          break;

       case '/purchase/final':

         // set the inner page message to true
         $scope.$parent.innerPageMessage = true;

         MessagingSvc.newMessage({
           text: 'Congratulations! You’re covered by MetLife Auto and Renters insurance effective <strong>8/16/14</strong>',
           type: 'success'
         }, true);

         break;

       default:
         break;
     }

       // Events
       $rootScope.$on(ConstantsSvc.EVENTS.VEHICLES_LOADED, function(){
         $scope.purchaseFormData.vehicles = VehicleSvc.vehicles;
         $scope.vehicles = VehicleSvc.vehicles;
       });

       $rootScope.$on(ConstantsSvc.EVENTS.DRIVERS_LOADED, function(){
         $scope.drivers = DriverSvc.drivers;
       });

  }]);