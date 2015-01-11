'use strict';

/**
 * @ngdoc directive
 * @name autositeApp.directive:vehicleCardDir.js
 * @description
 * # vehicleCardDir.js
 */
angular.module('autositeApp')
  .directive('vehicleCard', ['MessagingSvc', 'ConstantsSvc', function (MessagingSvc, ConstantsSvc) {
    return {
      templateUrl: '/directives/vehicle-card/vehicle-card-template.html',
      restrict: 'E',
      scope: {
        data: '=',
        index: '=',
        vehicles: '=',
        prefill: '='
      },
      link: function postLink(scope) {

        scope.message = (scope.prefill === true) ? "not mine, remove" : "remove";

        scope.toggleVehicle = function($event) {

          console.log('event from directive =>',$event.target);
          console.log('current index =>', scope.index);

          var $_btn = $($event.target),
          index = scope.index;

          if( scope.vehicles[index].active){


            if(_.where(scope.vehicles, {'active': true}).length > 1){

              MessagingSvc.newMessage({
                text: scope.vehicles[index].year + ' ' + scope.vehicles[index].make + ' ' + scope.vehicles[index].model + " has been removed",
                type: null
              }, false);

              $_btn.addClass('remove-simple');
              $_btn.removeClass('remove');
              $_btn.html("Undo");

              scope.vehicles[index].active = false;

            }else{

              MessagingSvc.newMessage({
                text: ConstantsSvc.MESSAGING.warning.max_allowed_vehicle_delete,
                type: null
              }, false);


              return false;
            }

          }else{
            $_btn.addClass('remove');
            $_btn.removeClass('remove-simple');
            $_btn.html("Remove");
            scope.vehicles[index].active = true;
          }

          $_btn.parent('.well').toggleClass('faded');
          $_btn.parent('div').parent('.mobile-card').toggleClass('faded');


        };

      }
    };
  }]);
