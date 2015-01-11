'use strict';

/**
 * @ngdoc service
 * @name autositeApp.LayoutSvc
 * @description
 * # LayoutSvc
 * Service in the autositeApp.
 */
angular.module('autositeApp')
  .service('LayoutSvc', function LayoutSvc(ConstantsSvc) {

    return {

      // set the header title according to the path
      // @path: string

      setHeaderTitle: function(path) {

        // set the default header title

        var pageTitle = ConstantsSvc.MESSAGING.default;

        // if we find a match of the the current route + path
        // then override the default page title

        _.forEach(ConstantsSvc.ROUTES, function(route) {

          if (route.path === '#' + path) {
            pageTitle = route.headerTitle;
          }

        });

        return pageTitle;

      },

      getSnoopyImage: function(type) {
        var snoopyTypes = {
          hug: 'snoopy_your-info.svg',
          pointer: 'snoopy_vehicle-details.svg',
          quote: 'snoopy_quote.svg',
          house: 'snoopy_house.png',
          discount: 'snoopy_discounts.svg',
          snap: 'snoopy_confirm-vehicles-drivers.svg',
          compare: 'snoopy_compare.svg',
          car: 'snoopy_car.svg',
          register: 'snoopy_purchase.svg'
        }
        return 'assets/images/' + snoopyTypes[type];
      },

      setHeaderImage: function(path) {

        // set the header images according to the path
        // @path: string

        var imagePath = 'assets/images/snoopy_';
        var imageSrc = imagePath+'car.svg';

        _.forEach(ConstantsSvc.ROUTES, function(route) {

          if (route.path === '#' + path){
            imageSrc = imagePath+route.headerImgKey+'.svg';
          }

        });

        return imageSrc;

      },

      getNavIndex: function(path){

        // return the header index of the navigation flow the page is supposed to be under
        var navIndex = 0;

        _.forEach(ConstantsSvc.ROUTES, function(route) {

          if (route.path === '#' + path){
            navIndex = route.navIndex;
          }
        });

        return navIndex;

      }

    }

  });
