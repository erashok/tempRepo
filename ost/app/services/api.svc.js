(function() {
  'use strict';
})();

angular.module('autositeApp')
  .service('API', ['$http', '$log', 'ConstantsSvc', 'StorageSvc', 'CollectionAdaptor',
    function ($http, $log, ConstantsSvc, StorageSvc, CollectionAdaptor) {

    this.call = function(entity, params) {
      var url = ConstantsSvc.REST_SERVICE_URL[entity];
      
      // Session Id
      var sessionId = (StorageSvc.getSessionId() !== null) ? StorageSvc.getSessionId() : '';
      url = url.replace(':sessionId', sessionId);

      // Check for Url Params
      if (url.indexOf(':', 6) != -1) {
        _.forOwn(params, function(value, name) {
          url = url.replace(':' + name, value);
        });

        var position = url.indexOf(":", 6);
        if (position != -1) {
          url = url.substring(0, position);
        }
      }

      return new RestCall({url: url});
    };

    function RestCall(args) {
      var url = args.url;

      function getHttp(method, data) {
        $log.info(method + " - " + url);

        var config = {
          method: method,
          url: url,
          data: data,
          transformResponse: function(response) {
            return CollectionAdaptor.transform(angular.fromJson(response));
          }
        };
        return $http(config);
      }

      this.getUrl = function() {
        return url;
      };

      this.get = function(data) {
        return getHttp('GET', data);
      };

      this.put = function(data) {
        return getHttp('PUT', data);
      };

      this.post = function(data) {
        return getHttp('POST', data);
      };

      this.delete = function(data) {
        return getHttp('DELETE', data);
      };
    }

  }]);
