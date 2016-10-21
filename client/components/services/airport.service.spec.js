'use strict';

describe('Service: Airports', function() {

  // load the controller's module
  beforeEach(module('thoughtworksTestApp'));

  var scope;
  var mainComponent;
  var state;
  var test;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($http, $componentController, $rootScope, $state, $window, $injector) {
    scope = $rootScope.$new();
    state = $state;
  }));

  it('should have a working Airports service', inject(function(Airports) {
      expect(Airports).to.exist;
  }));
});
