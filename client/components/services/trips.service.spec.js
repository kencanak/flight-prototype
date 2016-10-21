'use strict';

describe('Trips', function() {


  // load the controller's module
  beforeEach(module('thoughtworksTestApp'));

  var scope;
  var mainComponent;
  var state;
  var mockTrips;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_Trips_, $http, $componentController, $rootScope, $state, $window) {
    mockTrips = _Trips_;
    scope = $rootScope.$new();
    state = $state;


  }));

  it('should return a list of trips', inject(function() {
    mockTrips.get().$promise.then(response => {
      assert.equal(response.data.length, 0);
    });

  }));
});
