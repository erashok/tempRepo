(function() {
  'use strict';
})();

describe('Controller: YourInfoCtrl (First Time Data)', function() {

  var scope;
  var ctrl;
  var httpBackend;

  beforeEach(module('autositeApp'));

  beforeEach(inject(function($rootScope, $controller, $location, $q, API, $httpBackend, StorageSvc) {
    StorageSvc.setSessionId('3e0f');

    httpBackend = $httpBackend;

    scope = $rootScope.$new();
    ctrl = $controller('YourInfoCtrl',
    {
      $scope: scope,
      $q: $q,
      $location: $location,
      API: API,
      AutoProduct: {
        data: {
          items: [
          {
            data: {}
          }],
          template: {}
        }
      },
      Address: {
        data: {
          items: [
          {
            data: {
              city: 'Clarks Summit',
              state: 'PA',
              zip: '18411'
            }
          }],
          template: {}
        }
      }
    });

    scope.yourInfoForm = {};
  }));

  it('does not convert birthDate', function() {
    expect(scope.AutoProduct_Data.birthDate).toBeUndefined();
  });

  it('saves Data to the API - Auto/Residence/Driver', function() {

    var birthDate = new Date();

    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto', {firstName: 'Dan', lastName: 'Pentka', birthDate: birthDate}).respond({});
    httpBackend.expectPOST('http://127.0.0.1/api/session/3e0f/auto/driver/', {firstName: 'Dan', lastName: 'Pentka', birthDate: birthDate}).respond({});
    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto/residence', {street: '1028 Morgan Highway', city: 'Clarks Summit', state: 'PA', zip: '18411'}).respond({});

    scope.AutoProduct_Data.firstName = 'Dan';
    scope.AutoProduct_Data.lastName = 'Pentka';
    scope.AutoProduct_Data.birthDate = birthDate;

    scope.Address_Data.street = '1028 Morgan Highway';
    scope.Address_Data.city = 'Clarks Summit';
    scope.Address_Data.state = 'PA';
    scope.Address_Data.zip = '18411';

    scope.yourInfoForm.$invalid = false;

    scope.continueClick();
    httpBackend.flush();
  });

  it('saves Data to the API - Auto/Residence/Driver/Group', function() {

    var birthDate = new Date();

    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto', {firstName: 'Dan', lastName: 'Pentka', birthDate: birthDate}).respond({});
    httpBackend.expectPOST('http://127.0.0.1/api/session/3e0f/auto/driver/', {firstName: 'Dan', lastName: 'Pentka', birthDate: birthDate}).respond({});
    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto/residence', {street: '1028 Morgan Highway', city: 'Clarks Summit', state: 'PA', zip: '18411'}).respond({});
    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto/group', {gpc: 'BGX', name: 'NASCAR Race Fans'}).respond({});

    scope.AutoProduct_Data.firstName = 'Dan';
    scope.AutoProduct_Data.lastName = 'Pentka';
    scope.AutoProduct_Data.birthDate = birthDate;

    scope.Address_Data.street = '1028 Morgan Highway';
    scope.Address_Data.city = 'Clarks Summit';
    scope.Address_Data.state = 'PA';
    scope.Address_Data.zip = '18411';

    scope.AutoProduct_Data.group = {gpc: 'BGX', name: 'NASCAR Race Fans', id: 0};
    scope.yourInfoForm.$invalid = false;

    scope.continueClick();
    httpBackend.flush();
  });

});

describe('Controller: YourInfoCtrl (Prefilled Data)', function() {

  var scope;
  var ctrl;
  var httpBackend;

  beforeEach(module('autositeApp'));

  beforeEach(inject(function($rootScope, $controller, $location, $q, API, $httpBackend, StorageSvc) {
    StorageSvc.setSessionId('3e0f');

    httpBackend = $httpBackend;

    scope = $rootScope.$new();
    ctrl = $controller('YourInfoCtrl',
    {
      $scope: scope,
      $q: $q,
      $location: $location,
      API: API,
      AutoProduct: {
        data: {
          items: [
          {
            data: {
              firstName: 'Fred',
              lastName: 'Tester',
              birthDate: 1418227137610,
              group: {
                name: 'MetLife',
                gpc: '010'
              }
            }
          }],
          template: {}
        }
      },
      Address: {
        data: {
          items: [
          {
            data: {
              street: '1028 Morgan Highway',
              city: 'Clarks Summit',
              state: 'PA',
              zip: '18411'
            }
          }],
          template: {}
        }
      }
    });

    scope.yourInfoForm = {};
  }));

  it('converts birthDate to a Date', function() {
    expect(scope.AutoProduct_Data.birthDate).toEqual(new Date(1418227137610));
  });

  it('saves Data to the API - Auto/Residence/Group', function() {
    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto').respond({});
    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto/residence').respond({});
    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto/group').respond({});

    scope.yourInfoForm.$invalid = false;

    scope.continueClick();
    httpBackend.flush();
  });

  it('saves Data to the API - Auto/Residence', function() {
    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto').respond({});
    httpBackend.expectPUT('http://127.0.0.1/api/session/3e0f/auto/residence').respond({});

    scope.yourInfoForm.$invalid = false;
    delete scope.AutoProduct_Data.group;

    scope.continueClick();
    httpBackend.flush();
  });

});
