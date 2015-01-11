(function() {
  'use strict';
})();

describe('API Service', function(API) {

  var api;
  var storageSvc;
  var httpBackend;

  beforeEach(module('autositeApp'));

  //['$http', '$log', 'ConstantsSvc', 'StorageSvc', 'CollectionAdaptor',
  beforeEach(inject(function($http, $log, $httpBackend, API, StorageSvc, CollectionAdaptor) {
    api = API;
    storageSvc = StorageSvc;
    httpBackend = $httpBackend;

    storageSvc.setSessionId('3e0f');
  }));

  it('should call the base session url without including the SessionId when a sessionId has not be stored', function() {
    storageSvc.clearStorage();
    expect(api.call('session').getUrl()).toEqual('http://127.0.0.1/api/session/');
  });

  it('should include the SessionId in the url when the StorageSvc.getSessionId() returns a value', function() {
    expect(api.call('session').getUrl()).toEqual('http://127.0.0.1/api/session/3e0f');
  });

  it('should call the auto product url', function() {
    expect(api.call('auto').getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto');
  });

  it('should call the auto/residence address url', function() {
    expect(api.call('residence').getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/residence');
  });

  it('should call the auto/vehicle address url', function() {
    expect(api.call('vehicle').getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/vehicle/');
  });

  it('should call the auto/vehicle address url utilizing the vehicle id', function() {
    expect(api.call('vehicle', {id: 2}).getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/vehicle/2');
  });

  it('should call the auto/driver address url', function() {
    expect(api.call('driver').getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/driver/');
  });

  it('should call the auto/driver address url utilizing the driver id', function() {
    expect(api.call('driver', {id: 4}).getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/driver/4');
  });

  it('should call the auto/driver/accident address url', function() {
    expect(api.call('accident', {driverId: 3}).getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/driver/3/accident/');
  });

  it('should call the auto/driver/accident address url utilizing the driver id and accidentId', function() {
    expect(api.call('accident', {driverId: 3, id: 6}).getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/driver/3/accident/6');
  });

  it('should call the auto/driver/claim address url', function() {
    expect(api.call('claim', {driverId: 3}).getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/driver/3/claim/');
  });

  it('should call the auto/driver/claim address url utilizing the driver id and claimId', function() {
    expect(api.call('claim', {driverId: 3, id: 7}).getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/driver/3/claim/7');
  });

  it('should call the auto/driver/violation address url', function() {
    expect(api.call('violation', {driverId: 3}).getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/driver/3/violation/');
  });

  it('should call the auto/driver/violation address url utilizing the driver id and violationId', function() {
    expect(api.call('violation', {driverId: 3, id: 2}).getUrl()).toEqual('http://127.0.0.1/api/session/3e0f/auto/driver/3/violation/2');
  });

});
