(function() {
  'use strict';
})();

angular
  .module('autositeApp', [
    'ngRoute',
    'angular-lodash',
    'ui.bootstrap',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        title: 'Get a car insurance quote as fast as you can fill your tank.'
      })
      .when('/your_info', {
        templateUrl: 'your_info/your_info.html',
        controller: 'YourInfoCtrl',
        title: 'Tell us about yourself',
        snoopy: 'hug',
        resolve: {
          AutoProduct: ['API', function(API) {
            return API.call('auto').get();
          }],
          Address: ['API', function(API) {
            return API.call('residence').get();
          }]
        }
      })
      .when('/vehicles_and_drivers', {
        templateUrl: 'vehicles_drivers/vehicles.html',
        controller: 'VehiclesDriversCtrl',
        title: 'We found your info',
        snoopy: 'snap',
        resolve: {
          Vehicles: ['API', function(API) {
            return API.call('vehicle').get();
          }],
          Drivers: ['API', function(API) {
            return API.call('driver').get();
          }]
        }
      })
      .when('/vehicle/:id', {
        templateUrl: 'vehicle/vehicle.html',
        controller: 'VehicleCtrl',
        title: 'Vehicle Details',
        snoopy: 'hug',
        resolve: {
          Vehicle: ['$route', 'API', function($route, API) {
            return API.call('vehicle', {id: $route.current.params.id}).get();
          }],
          Drivers: ['API', function(API) {
            return API.call('driver').get();
          }]
        }
      })
      .when('/driver/:id', {
        templateUrl: 'driver/driver.html',
        controller: 'DriverCtrl',
        title: 'Driver Details',
        snoopy: 'hug',
        resolve: {
          Driver: ['$route', 'API', function($route, API) {
            return API.call('driver', {id: $route.current.params.id}).get();
          }]
        }
      })
      .when('/verify_current_insurance', {
        templateUrl: 'insurance/verify_current_insurance.html',
        controller: 'InsuranceCtrl',
        title: 'Verify your insurance',
        snoopy: 'house'
      })
      .when('/quote', {
        templateUrl: 'quote/quote.html',
        controller: 'QuoteCtrl',
        title: 'Your auto insurance quote',
        snoopy: 'quote',
        resolve: {
          Vehicles: ['API', function(API) {
            return API.call('vehicle').get();
          }],
          Drivers: ['API', function(API) {
            return API.call('driver').get();
          }]
        }
      })
      .when('/purchase', {
        templateUrl: 'purchase/purchase.html',
        controller: 'PurchaseCtrl',
        title: 'Purchase your new policy',
        snoopy: 'pointer'
      })
      .when('/purchase/vehicles', {
        templateUrl: 'confirm_vehicles/confirm_vehicles.html',
        controller: 'ConfirmVehiclesCtrl',
        title: 'Vehicles on your policy',
        snoopy: 'quote',
        resolve: {
          Vehicles: ['API', function(API) {
            return API.call('vehicle').get();
          }]
        }
      })
      .when('/purchase/drivers', {
        templateUrl: 'confirm_drivers/confirm_drivers.html',
        controller: 'ConfirmDriversCtrl',
        title: 'Drivers on your policy',
        snoopy: 'quote',
        resolve: {
          Drivers: ['API', function(API) {
            return API.call('driver').get();
          }]
        }
      })
      .when('/purchase/adjustments', {
        templateUrl: 'adjustments/adjustments.html',
        controller: 'AdjustmentsCtrl',
        title: 'Adjustments for your policy',
        snoopy: 'register',
        resolve: {
          Drivers: ['API', function(API) {
            return API.call('driver').get();
          }]
        }
      })
      .when('/purchase/pay', {
        templateUrl: 'purchase/purchase_pay.html',
        controller: 'PurchaseCtrl',
        title: 'Pay for your new policy',
        snoopy: 'discount'
      })
      .when('/purchase/overview', {
        templateUrl: 'purchase/purchase_overview.html',
        controller: 'PurchaseCtrl'
      })
      .when('/purchase/complete', {
        templateUrl: 'purchase/purchase_esig.html',
        controller: 'PurchaseCtrl'
      })
      .when('/purchase/final', {
        templateUrl: 'purchase/purchase_final.html',
        controller: 'PurchaseCtrl'
      })
      .when('/purchase/verify', {
        templateUrl: 'purchase/purchase_verify.html',
        controller: 'PurchaseCtrl'
      })
      .when('/renters', {
        templateUrl: 'renters/renters_property.html',
        controller: 'RentersCtrl'
      })
      .when('/renters/coverages', {
        templateUrl: 'renters/renters_coverages.html',
        controller: 'RentersCtrl'
      })
      .when('/renters/quote', {
        templateUrl: 'renters/renters_quote.html',
        controller: 'RentersCtrl'
      })
      .when('/renters/selection', {
        templateUrl: 'renters/renters_selection.html',
        controller: 'RentersCtrl'
      })
      .when('/quote_coverage', {
        templateUrl: 'quote/quote_coverage.html',
        controller: 'QuoteCtrl'
      })
      .when('/components', {
        templateUrl: 'components/components.html',
        controller: 'ComponentsCtrl'
      })
      .when('/vehicles', {
        templateUrl: 'vehicles_drivers/vehicle_single.html',
        controller: 'VehiclesDriversCtrl'
      })
      .when('/discounts', {
        templateUrl: 'discounts/discounts.html',
        controller: 'DiscountsCtrl'
      })
      .when('/index', {
        templateUrl: 'index/index.html',
        controller: 'IndexCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      localStorageServiceProvider.setPrefix('autositeApp');
      localStorageServiceProvider.setStorageType('localStorage');
  })
  .run(['$rootScope', 'LayoutSvc', function($rootScope, LayoutSvc) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        $rootScope.snoopy = LayoutSvc.getSnoopyImage(current.$$route.snoopy);
    });
  }]);
