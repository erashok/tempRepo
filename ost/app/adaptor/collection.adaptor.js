'use strict';

angular.module('autositeApp').
  service('CollectionAdaptor', function () {

    // this.addAuthHeaders = function (verb, data, headers, url) {
    //     var md5 = '';
    //     if (data != undefined) {
    //         md5 = CryptoJS.MD5(data);
    //     }
    //
    //     var date = new Date().getTime();
    //     var auth = buildAuthorization(verb, md5, date, url);
    //
    //     headers['Request-Date'] = date;
    //     headers['Authorization'] = auth;
    //
    //     if (verb != "GET") {
    //         headers['Content-Type'] = 'application/json';
    //         headers['Content-MD5'] = md5;
    //     }
    // }
    //
    // function buildAuthorization(verb, md5, date, url) {
    //     var message = verb + "\n" + md5 + "\n";
    //     if (verb != "GET") {
    //         message += 'application/json';
    //     }
    //     message += "\n" + date + "\n" + url;
    //

    // use StorageSvc.getPrivateKey
    //     var signature = CryptoJS.HmacSHA1(message, Storage.getPrivateKey());
    //     return Storage.getSessionId() + ":" + signature.toString(CryptoJS.enc.Base64);
    // }

    this.transform = function (data) {
      
      if (data.collection == undefined) {
        return data;
      }

      var collection = data.collection;

      // Template
      if (collection.template) {
        var data = collection.template.data;
        for (var i = 0; i < data.length; i++) {
          var element = data[i];
          if (element.regexp) {
            element.regexp = new RegExp(element.regexp);
          }
          collection.template[data[i].name] = element;
        }
        delete collection.template.data;
      }


      // Errors
      if (collection.error && collection.error.messages && collection.error.messages.length == 0) {
        delete collection.error;
      } else {
        var error = collection.error;
        var errors = {};
        errors["page"] = [];

        if (error && collection.error.messages && error.messages.length > 0) {
          for (var i = 0; i < error.messages.length; i++) {
            if (!error.messages[i].name) {
              errors["page"].push(error.messages[i]);
            } else {
              errors[error.messages[i].name] = error.messages[i].message;
            }
          }
          if (errors["page"].length == 0) {
            delete errors["page"];
          }
          collection.error = errors;
        }

      }

      // Links
      if (collection.links) {
        var links = {};
        for (var i = 0; i < collection.links.length; i++) {
          var link = collection.links[i];
          links[link.rel] = link.href;
        }
        collection.links = links;
      }

      return collection;
    }

  });
