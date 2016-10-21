'use strict';

describe('search', function() {


  // load the controller's module
  beforeEach(module('thoughtworksTestApp'));

  beforeEach(module('components/search/search.html'));   // HERE. load module prepared by ng-html2js

  var scope;
  var searchComponent;
  var state;
  var element;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($http, $componentController, $rootScope, $state, $window, $compile, $templateCache, _$httpBackend_) {
    scope = $rootScope.$new();
    state = $state;
    $httpBackend = _$httpBackend_;
    element = angular.element('<search></search>');
    $compile(element)(scope);
    scope = element.scope();

    $httpBackend.when('GET', 'assets/dummy-data/airports.json').respond([
      {
          'display': 'Singapore (SIN)',
          'value': 'SIN'
      },
      {
          'display': 'Hong Kong (HKG)',
          'value': 'HKG'
      }
    ]);
    return scope.$apply();
  }));

  it('should have a working Airports service', inject(function(Airports) {
      expect(Airports).to.exist;
  }));

  //to do test for search panel interaction
});
