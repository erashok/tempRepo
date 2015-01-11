(function() {
  'use strict';
})();

angular.module('autositeApp')
  .controller('YourInfoCtrl', ['$scope', '$q', '$location', 'API', 'AutoProduct', 'Address',
    function($scope, $q, $location, API, AutoProduct, Address) {

      $scope.AutoProduct_Template = AutoProduct.data.template;
      $scope.Address_Template = Address.data.template;

      $scope.AutoProduct_Data = AutoProduct.data.items[0].data;
      $scope.Address_Data = Address.data.items[0].data;

      // Convert EPOCH Time to Date Object for Input
      if ($scope.AutoProduct_Data.birthDate) {
        $scope.AutoProduct_Data.birthDate = new Date($scope.AutoProduct_Data.birthDate);
      }

      var isNewCustomer = ($scope.AutoProduct_Data.firstName) ? false : true;

      $scope.continueClick = function() {
        if ($scope.yourInfoForm.$invalid) {
          return;
        }

        var requests = [];

        // Auto Product
        var customer = {
          firstName: $scope.AutoProduct_Data.firstName,
          lastName: $scope.AutoProduct_Data.lastName,
          birthDate: $scope.AutoProduct_Data.birthDate
        };
        requests.push(API.call('auto').put(customer));

        // Driver
        if (isNewCustomer) {
          requests.push(API.call('driver').post(customer));
        }

        // Residence Address
        var address = {
          street: $scope.Address_Data.street,
          city: $scope.Address_Data.city,
          state: $scope.Address_Data.state,
          zip: $scope.Address_Data.zip
        };
        requests.push(API.call('residence').put(address));

        // Group Info
        if ($scope.AutoProduct_Data.group) {
          var group = {
            gpc: $scope.AutoProduct_Data.group.gpc,
            name: $scope.AutoProduct_Data.group.name
          };
          requests.push(API.call('group').put(group));
        }

        $q.all(requests).then(function(data) {
          $location.path('/vehicles_and_drivers');
        });
      };

      $scope.getEmployers = function(value) {
        return API.call('dropdown_group_account', {name: value, limit: 6}).get()
          .then(function(response) {
            return response.data;
          });
      };

  }]);
