(function() {
  'use strict';
})();

angular.module('autositeApp')
  .service('ConstantsSvc', function ConstantsSvc() {

    return {
      REST_SERVICE_URL: {
        session: 'http://127.0.0.1/api/session/:sessionId',
        auto: 'http://127.0.0.1/api/session/:sessionId/auto',
        residence: 'http://127.0.0.1/api/session/:sessionId/auto/residence',
        group: 'http://127.0.0.1/api/session/:sessionId/auto/group',
        vehicle: 'http://127.0.0.1/api/session/:sessionId/auto/vehicle/:id',
        driver: 'http://127.0.0.1/api/session/:sessionId/auto/driver/:id',
        accident: 'http://127.0.0.1/api/session/:sessionId/auto/driver/:driverId/accident/:id',
        claim: 'http://127.0.0.1/api/session/:sessionId/auto/driver/:driverId/claim/:id',
        violation: 'http://127.0.0.1/api/session/:sessionId/auto/driver/:driverId/violation/:id',
        vin: 'https://qa.choices.metlife.com/public/qq/service/vehicleInfo?vin=:vin&year=:year&state=PA&effDate=12252014',
        dropdown_group_account: 'https://qa.choices.metlife.com/public/qq/service/groups?name=:name&limit=:limit',
        dropdown_vehicle_year: 'http://127.0.0.1/api/dropdown/vehicle_year',
        dropdown_vehicle_make: 'http://127.0.0.1/api/dropdown/vehicle_make?year=:year',
        dropdown_vehicle_model: 'http://127.0.0.1/api/dropdown/vehicle_model?year=:year&make=:make',
        dropdown_vehicle_trim: 'http://127.0.0.1/api/dropdown/vehicle_trim?year=:year&make=:make&model=:model'
      },
      VEHICLE_IMG_URL: 'http://10.10.72.92/api/fuel',
      MET_API_URL: 'http://127.0.0.1',
      PACE_MET_API_URL: 'http://10.10.72.36',
      API_URL: 'http://private-d6758-metauto.apiary-mock.com',
      PROPERTIES: {},
      MESSAGING: {
        quote: 'Your auto insurance quote',
        default: 'Default text...',
        error: {
          postfix_message: 'oops'
        },
        success: {
          prefix_message: 'Great',
          postfix_message: 'was added!'
        },
        warning: {
          max_allowed_vehicle_delete: 'Heads up! You need to have at least one vehicle included in this quote',
          max_allowed_driver_delete: 'Heads up! You need to have at least one driver included in this quote'
        }
      },
      ROUTES: [
        {section: 'Auto Quote: Home', path: '#/home', headerTitle: 'Get a car insurance quote as fast as you can fill your tank.', headerImgKey: 'car', navIndex: 0},
        {section: 'Auto Quote: Your Info', path: '#/your_info', headerTitle: 'Tell us about yourself', headerImgKey: 'your-info', navIndex: 0},
        {section: 'Auto Quote: Confirm Drivers & Vehicles', path: '#/vehicles_and_drivers', headerTitle: 'We found your info', headerImgKey: 'confirm-vehicles-drivers', navIndex: 0},
        {section: 'Auto Quote: Vehicle Details', path: '#/vehicle', headerTitle: 'Vehicle Details', headerImgKey: 'vehicle-details', navIndex: 1},
        {section: 'Auto Quote: Vehicle Details - Toyota', path: '#/toyota', headerTitle: 'Vehicle Details', headerImgKey: 'vehicle-details', navIndex: 1},
        {section: 'Auto Quote: Driver Details', path: '#/driver', headerTitle: 'Driver Details', headerImgKey: 'vehicle-details', navIndex: 2},
        {section: 'Auto Quote: Driver Details - Mary Reynolds', path: '#/mary', headerTitle: 'Driver Details', headerImgKey: 'vehicle-details', navIndex: 2},
        {section: 'Auto Quote: Current Insurance', path: '#/verify_current_insurance', headerTitle: 'Verify your insurance', headerImgKey: 'vehicle-details', navIndex: 2},
        {section: 'Auto Quote: Compare Plans', path: '#/quote_coverage', headerTitle: 'Compare plans', headerImgKey: 'quote', navIndex: 2},
        {section: 'Auto Quote: Your Quote', path: '#/quote', headerTitle: 'Your auto quote', headerImgKey: 'quote', navIndex: 3},
        {section: 'Renters: Properties', path: '#/renters', headerTitle: 'Personal & property info', headerImgKey: 'vehicle-details', navIndex: 3},
        {section: 'Renters: Coverages', path: '#/renters/coverages', headerTitle: 'Coverages', headerImgKey: 'vehicle-details', navIndex: 3},
        {section: 'Renters: Quote', path: '#/renters/quote', headerTitle: 'Your auto insurance quote', headerImgKey: 'vehicle-details', navIndex: 3},
        {section: 'Purchase: Start', path: '#/purchase', headerTitle: 'Purchase your new policy', headerImgKey: 'discounts', navIndex: 4},
        {section: 'Purchase: Confirm Vehicles', path: '#/purchase/confirm', headerTitle: 'Vehicles on your policy', headerImgKey: 'vehicle-details', navIndex: 4},
        {section: 'Purchase: Confirm Drivers', path: '#/purchase/drivers', headerTitle: 'Drivers on your policy', headerImgKey: 'vehicle-details', navIndex: 4},
        {section: 'Purchase: Adjustments', path: '#/purchase/adjustments', headerTitle: 'Adjustments for your policy', headerImgKey: 'vehicle-details', navIndex: 4},
        {section: 'Purchase: Done, Almost', path: '#/purchase/overview', headerTitle: 'Your policy is almost done', headerImgKey: 'vehicle-details', navIndex: 4},
        {section: 'Purchase: Payment', path: '#/purchase/complete', headerTitle: 'Pay for your new policy', headerImgKey: 'vehicle-details', navIndex: 4},
        {section: 'Purchase: Final', path: '#/purchase/final', headerTitle: 'Thank you for your purchase', headerImgKey: 'vehicle-details', navIndex: 5},
        {section: 'Purchase: Pay', path: '#/purchase/pay', headerTitle: 'Pay for your new policy', headerImgKey: 'vehicle-details', navIndex: 4},
        {section: 'Purchase: Verify', path: '#/purchase/verify', headerTitle: 'Payment', headerImgKey: 'vehicle-details', navIndex: 4},
        {section: 'Renters/Auto: Selection', path: '#/renters/selection', headerTitle: 'Your insurance quote', headerImgKey: 'vehicle-details', navIndex: 3}
      ],
      EVENTS: {
        VEHICLES_LOADED: "vehicles loaded",
        DRIVERS_LOADED: "drivers loaded",
        DEPLOY_NEW_MESSAGE: "new message",
        DEPLOY_NEW_INNER_MESSAGE: "new inner message",
        CLEAR_INNER_MESSAGE: "clear inner message"
      },
      FORM_DEFINITIONS: [
        {name: 'new_incident', form: {category: '', type: '', date: ''}}
      ],
      RULES: {
        MAX_VEHICLES: 7
      }
    };

  });
