'use strict';

describe('Component: mainComponent', function() {

  // load the controller's module
  beforeEach(module('thoughtworksTestApp'));

  var scope;
  var mainComponent;
  var state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($http, $componentController, $rootScope, $state, $window) {

    scope = $rootScope.$new();
    state = $state;
    mainComponent = $componentController('main', {
      $http: $http,
      $scope: scope,
      $window: $window
    });

  }));

  it('set window innerwidth < 960, smallScreen should be true', function() {
    mainComponent.$onInit();
    window.resizeTo(600,600) ;
    $(window).trigger('resize');
    scope.$digest();

    expect(mainComponent.screenStatus.smallScreen)
      .to.equal(true);
  });

  it('set window innerwidth > 960, smallScreen should be true', function() {
    mainComponent.$onInit();

    window.resizeTo(970,600) ;
    $(window).trigger('resize');
    scope.$digest();

    setTimeout(function(){
      expect(mainComponent.screenStatus.smallScreen)
        .to.equal(false);
    },100)

  });

  it('should listen to new-search emitted message with null message and set hasResult to false', function() {
    mainComponent.$onInit();
    scope.$emit("new-search", null);

    expect(mainComponent.screenStatus.hasResult)
      .to.equal(false);
  });

  it('should listen to new-search emitted message with object message and set hasResult to false', function() {
    mainComponent.$onInit();
    scope.$emit("new-search", {"data": "test"});

    expect(mainComponent.screenStatus.hasResult)
      .to.equal(true);
  });
});
