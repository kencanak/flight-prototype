'use strict';

describe('results', function() {


  // load the controller's module
  beforeEach(module('thoughtworksTestApp'));

  beforeEach(module('components/results/results.html'));   // HERE. load module prepared by ng-html2js

  var scope;
  var state;
  var element;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($http, $componentController, $rootScope, $state, $window, $compile, $templateCache, _$httpBackend_) {
    scope = $rootScope.$new();
    state = $state;
    $httpBackend = _$httpBackend_;
    element = angular.element('<results></results>');
    $compile(element)(scope);
    scope = element.scope();

    var mockData = [
      {
          "airport_details": {
              "from": "SIN",
              "to": "HKG"
          },
          "flight_details": {
              "code": "RF-301",
              "image": "/assets/images/yeoman.png"
          },
          "price": "20",
          "timings": {
              "arrive_time": "12:00 PM",
              "day": "2016-06-22",
              "depart_time": "10:00 AM"
          },
          "trip_id": "trip_1"
      },
      {
          "airport_details": {
              "from": "SIN",
              "to": "HKG"
          },
          "flight_details": {
              "code": "RF-301",
              "image": "/assets/images/yeoman.png"
          },
          "price": "20",
          "timings": {
              "arrive_time": "02:00 PM",
              "day": "2016-06-22",
              "depart_time": "12:00 PM"
          },
          "trip_id": "trip_2"
      }
    ];

    $httpBackend.when('GET', 'assets/dummy-data/trips.json').respond(mockData);
    scope.$apply();
    scope.$digest();
  }));

  it('should have a working Trips service', inject(function(Trips) {
      expect(Trips).to.exist;
  }));

  //todo
  //test make sure result row is correct
});
