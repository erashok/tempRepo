(function() {
  'use strict';
})();

describe('QuoteSvc', function() {

  var quoteSvc;
  var api;
  var storageSvc;
  var httpBackend;

  beforeEach(module('autositeApp'));

  beforeEach(inject(function(QuoteSvc, API, StorageSvc, $httpBackend) {
    quoteSvc = QuoteSvc;
    api = API;
    storageSvc = StorageSvc;
    httpBackend = $httpBackend;
  }));

  it('should start a quote using a zip code', function() {
    httpBackend.expectPOST('http://127.0.0.1/api/session/')
    .respond(
      {
        items: [{
          data: {
            sessionId: 'b3w2',
            privateKey: '384734343'
          }
        }]
      }
    );

    httpBackend.expectPOST('http://127.0.0.1/api/session/b3w2/auto', {distribution: 'RETAIL'})
    .respond(
      {
        items: [{
          data: {
            distrubution: 'RETAIL'
          }
        }]
      }
    );

    httpBackend.expectPOST('http://127.0.0.1/api/session/b3w2/auto/residence', {zip: '18411'})
    .respond(
      {
        items: [{
          data: {
            city: 'Clarks Summit',
            state: 'PA',
            zip: '18411'
          }
        }]
      }
    );

    quoteSvc.startQuote('18411');

    httpBackend.flush();

    expect(storageSvc.getSessionId()).toEqual('b3w2');
    expect(storageSvc.getPrivateKey()).toEqual('384734343');
  });

  it('should clear the current session storage before creating a quote', function() {

    storageSvc.setSessionId('a35d');
    storageSvc.setPrivateKey('23232343');

    httpBackend.expectPOST('http://127.0.0.1/api/session/')
    .respond(
      {
        items: [{
          data: {
            sessionId: 'a4e2',
            privateKey: '384734343'
          }
        }]
      }
    );

    httpBackend.expectPOST('http://127.0.0.1/api/session/a4e2/auto', {distribution: 'RETAIL'})
    .respond(
      {
        items: [{
          data: {
            distrubution: 'RETAIL'
          }
        }]
      }
    );

    httpBackend.expectPOST('http://127.0.0.1/api/session/a4e2/auto/residence', {zip: '90210'})
    .respond(
      {
        items: [{
          data: {
            city: 'Beverly Hills',
            state: 'CA',
            zip: '90210'
          }
        }]
      }
    );

    quoteSvc.startQuote('90210');

    httpBackend.flush();

    expect(storageSvc.getSessionId()).toEqual('a4e2');
    expect(storageSvc.getPrivateKey()).toEqual('384734343');
  });

});
