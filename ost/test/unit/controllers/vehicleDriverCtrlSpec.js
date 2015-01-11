(function() {
  'use strict';
})();

describe('Controller: VehiclesDriversCtrl', function() {

  var scope;
  var api;
  var ctrl;
  var httpBackend;

  beforeEach(module('autositeApp'));

  beforeEach(inject(function($rootScope, $controller, $q, $httpBackend, API, ConstantsSvc, MessagingSvc, StorageSvc) {

    StorageSvc.setSessionId('e30f');

    httpBackend = $httpBackend;
    httpBackend.expectGET('http://127.0.0.1/api/dropdown/vehicle_year')
      .respond(["2000", "2001", "2002", "2003"]);

    scope = $rootScope.$new();
    ctrl = $controller('VehiclesDriversCtrl',
    {
      $scope: scope,
      $location: {},
      ConstantsSvc: ConstantsSvc,
      API: API,
      MessagingSvc: MessagingSvc,
      Vehicles: {
        data: {
          items: [
          {
            data: {
              vehicleId: 1,
              year: '2014',
              make: 'JEEP',
              model: 'Wrangler',
              trim: 'Unlimited Sport'
            }
          },
          {
            data: {
              vehicleId: 2,
              year: '2004',
              make: 'Dodge',
              model: 'Neon',
              trim: 'SRT-4'
            }
          }],
          template: {}
        }
      },
      Drivers: {
        data: {
          items: [
          {
            data: {
              driverId: 1,
              firstName: 'Fred',
              lastName: 'Tester',
              birthDate: 1418227137610
            }
          }],
          template: {}
        }
      }
    });

  }));

  it('should set image and active attribute for each vehicle', function() {
    httpBackend.flush();
    expect(scope.vehicles.length).toEqual(2);
    expect(scope.vehicles[0].data.vehicleId).toEqual(1);
    expect(scope.vehicles[1].data.vehicleId).toEqual(2);
    _(scope.vehicles).forEach(function(vehicle) {
      expect(vehicle.data.active).toBe(true);
      expect(vehicle.data.image).not.toBe(null);
    });
  });

  it('should fill the years dropdown', function() {
    httpBackend.flush();
    expect(scope.years.length).toEqual(4);
    expect(scope.years).toContain('2000');
    expect(scope.years).toContain('2001');
    expect(scope.years).toContain('2002');
  });

  it('should fill the makes dropdown', function() {
    httpBackend.expectGET('http://127.0.0.1/api/dropdown/vehicle_make?year=2002')
      .respond(["Ferrari", "JEEP"]);

    scope.getMakes('2002');
    httpBackend.flush();

    expect(scope.makes.length).toEqual(2);
    expect(scope.makes).toContain('Ferrari');
    expect(scope.makes).toContain('JEEP');
  });

  it('should clear out make model and trim when you select a year', function() {
    scope.vehicle.make = 'Toyota';
    scope.vehicle.model = 'RAV4';
    scope.vehicle.trim = 'SUV';

    expect(scope.vehicle.make).toEqual('Toyota');
    expect(scope.vehicle.model).toEqual('RAV4');
    expect(scope.vehicle.trim).toEqual('SUV');

    httpBackend.expectGET('http://127.0.0.1/api/dropdown/vehicle_make?year=2002')
      .respond(["Ferrari", "JEEP"]);

    scope.getMakes('2002');
    httpBackend.flush();

    expect(scope.models.length).toBe(0);
    expect(scope.trims.length).toBe(0);
    expect(scope.vehicle.make).toBeUndefined();
    expect(scope.vehicle.model).toBeUndefined();
    expect(scope.vehicle.trim).toBeUndefined();
  });

  it('should fill the model dropdown', function() {
    httpBackend.expectGET('http://127.0.0.1/api/dropdown/vehicle_model?year=2002&make=Ferrari')
      .respond(["Enzo", "355 Spyder", "360 Modena"]);

    scope.getModels('2002', 'Ferrari');
    httpBackend.flush();

    expect(scope.models.length).toEqual(3);
    expect(scope.models).toContain('Enzo');
    expect(scope.models).toContain('355 Spyder');
    expect(scope.models).toContain('360 Modena');
  });

  it('should clear out model and trim when you select a make', function() {
    scope.vehicle.model = 'RAV4';
    scope.vehicle.trim = 'SUV';

    expect(scope.vehicle.model).toEqual('RAV4');
    expect(scope.vehicle.trim).toEqual('SUV');

    httpBackend.expectGET('http://127.0.0.1/api/dropdown/vehicle_model?year=2002&make=Ferrari')
      .respond(["Enzo", "355 Spyder", "360 Modena"]);

    scope.getModels('2002', 'Ferrari');
    httpBackend.flush();

    expect(scope.models.length).not.toBe(0);
    expect(scope.trims.length).toBe(0);
    expect(scope.vehicle.model).toBeUndefined();
    expect(scope.vehicle.trim).toBeUndefined();
  });

  it('should fill the trim dropdown', function() {
    httpBackend.expectGET('http://127.0.0.1/api/dropdown/vehicle_trim?year=2002&make=Ferrari&model=Enzo')
      .respond(["Coupe"]);

    scope.getTrims('2002', 'Ferrari', 'Enzo');
    httpBackend.flush();

    expect(scope.trims.length).toEqual(1);
    expect(scope.trims).toContain('Coupe');
  });

  it('should clear out trim when you select a model', function() {
    scope.vehicle.trim = 'SUV';

    expect(scope.vehicle.trim).toEqual('SUV');

    httpBackend.expectGET('http://127.0.0.1/api/dropdown/vehicle_trim?year=2002&make=Ferrari&model=Enzo')
      .respond(["Coupe"]);

    scope.getTrims('2002', 'Ferrari', 'Enzo');
    httpBackend.flush();

    expect(scope.trims.length).not.toBe(0);
    expect(scope.vehicle.trim).toBeUndefined();
  });

  it('can add a driver', function() {
    httpBackend.expectPOST('http://127.0.0.1/api/session/e30f/auto/driver/', {firstName: 'Dan', lastName: 'Pentka', birthDate: 1418227137610})
      .respond({
        items: [{
          data: {
            driverId: 1,
            firstName: 'Fred',
            lastName: 'Tester',
            birthDate: 1418227137610
          }
        },
        {
          data: {
            driverId: 2,
            firstName: 'Dan',
            lastName: 'Pentka',
            birthDate: 1418227137610
          }
        }]
      });

    scope.addDriver({firstName: 'Dan', lastName: 'Pentka', birthDate: 1418227137610});
    httpBackend.flush();

    expect(scope.drivers.length).toEqual(2);
    expect(scope.drivers[1].data.firstName).toEqual('Dan');
    expect(scope.drivers[1].data.lastName).toEqual('Pentka');
    expect(scope.drivers[1].data.birthDate).toEqual(1418227137610);
  });

  it('can add a vehicle', function() {
    httpBackend.expectPOST('http://127.0.0.1/api/session/e30f/auto/vehicle/', {year: '2000', make: 'Honda', model: 'Civic', trim: 'EX-L'})
      .respond({
        items: [
        {
          data: {
            vehicleId: 1,
            year: '2014',
            make: 'JEEP',
            model: 'Wrangler',
            trim: 'Unlimited Sport'
          }
        },
        {
          data: {
            vehicleId: 2,
            year: '2004',
            make: 'Dodge',
            model: 'Neon',
            trim: 'SRT-4'
          }
        },
        {
          data: {
            vehicleId: 3,
            year: '2000',
            make: 'Honda',
            model: 'Civic',
            trim: 'EX-L'
          }
        }]
      });

    scope.addVehicle({year: '2000', make: 'Honda', model: 'Civic', trim: 'EX-L'});
    httpBackend.flush();

    expect(scope.vehicles.length).toEqual(3);
    expect(scope.vehicles[2].data.vehicleId).toEqual(3);
    expect(scope.vehicles[2].data.year).toEqual('2000');
    expect(scope.vehicles[2].data.make).toEqual('Honda');
    expect(scope.vehicles[2].data.model).toEqual('Civic');
    expect(scope.vehicles[2].data.trim).toEqual('EX-L');
  });

  it('can add a vehicle using a VIN', function() {
    httpBackend.expectGET('https://qa.choices.metlife.com/public/qq/service/vehicleInfo?vin=12345678901234567&year=2010&state=PA&effDate=12252014')
      .respond({vehicleList: [{year: '2010', make: 'Dodge', model: 'Viper GTS', bodyTypeCode: 'Coupe', vin: '12345678901234567'}]});

    httpBackend.expectPOST('http://127.0.0.1/api/session/e30f/auto/vehicle/', {year: '2010', make: 'Dodge', model: 'Viper GTS', trim: 'Coupe', vin: '12345678901234567'})
      .respond({
        items: [
        {
          data: {
            vehicleId: 1,
            year: '2014',
            make: 'JEEP',
            model: 'Wrangler',
            trim: 'Unlimited Sport'
          }
        },
        {
          data: {
            vehicleId: 2,
            year: '2004',
            make: 'Dodge',
            model: 'Neon',
            trim: 'SRT-4'
          }
        },
        {
          data: {
            vehicleId: 3,
            year: '2010',
            make: 'Dodge',
            model: 'Viper GTS',
            trim: 'Coupe'
          }
        }]
      });

    scope.vinLookup('12345678901234567', '2010');
    httpBackend.flush();

    expect(scope.vehicles[2].data.vehicleId).toEqual(3);
    expect(scope.vehicles[2].data.year).toEqual('2010');
    expect(scope.vehicles[2].data.make).toEqual('Dodge');
    expect(scope.vehicles[2].data.model).toEqual('Viper GTS');
    expect(scope.vehicles[2].data.trim).toEqual('Coupe');
    expect(scope.vehicles[2].data.image).not.toBe('');
    expect(scope.vehicles[2].data.image).not.toBe(null);
  });

  it('can toggle the vin menu', function() {
    expect(scope.vinExpand).toBe(false);
    scope.toggleVinExpand();
    expect(scope.vinExpand).toBe(true);
    scope.toggleVinExpand();
    expect(scope.vinExpand).toBe(false);
  });

});
