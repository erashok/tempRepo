(function() {
  'use strict';
})();

describe('Controller: HomeCtrl', function() {

  var scope;
  var ctrl;

  beforeEach(module('autositeApp'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('HomeCtrl', {$scope: scope});
  }));

  it('should exist', function() {
    expect(ctrl).not.toBe(null);
  });
});
