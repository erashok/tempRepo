(function() {
  'use strict';
})();

angular.module('autositeApp')
  .service('QuoteSvc', ['$location', 'StorageSvc', 'API', function QuoteSvc($location, StorageSvc, API) {

    this.startQuote = function(zip) {
          // Remove All Previously Stored Values
          StorageSvc.clearStorage();

          // Create Session
          API.call('session').post().then(function(session) {
            StorageSvc.setSessionId(session.data.items[0].data.sessionId);
            StorageSvc.setPrivateKey(session.data.items[0].data.privateKey);

            API.call('auto').post({distribution: 'RETAIL'}).then(function(auto) {
              API.call('residence').post({zip: zip}).then(function(residence) {
                $location.path('/your_info');
              });
            });
          });
      };

  }]);
