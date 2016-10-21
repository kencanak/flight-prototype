'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResultsController = function () {
  function ResultsController($state, $scope, Trips) {
    _classCallCheck(this, ResultsController);

    this.errors = {};
    this.$state = $state;
    this.$scope = $scope;
    this.results = [];
    this.minDate = new Date();
    this.Trips = Trips;
    this.allTrips = [];
    this.tripDetails = {
      from: '',
      fromCode: '',
      to: '',
      toCode: '',
      return: true,
      departDate: this.minDate,
      returnDate: moment(this.minDate).add(5, 'days').toDate(),
      passengers: 1,
      priceMax: 200
    };
  }

  _createClass(ResultsController, [{
    key: '$onInit',
    value: function $onInit() {
      var self = this;

      //let's grab all the trips data on load and cache it, by right shouldn't need this, if we have rest api
      self.Trips.get().$promise.then(function (response) {
        self.allTrips = response.data;
      });

      //receiving new search query event
      self.$scope.$on('new-search', function (event, data) {
        if (data) {
          if (!data.fromCode && !data.toCode && !data.departDate) {
            return false;
          }
          self.results = [];
          angular.copy(data, self.tripDetails);
          self.queryTrips();
        }
      });
    }
  }, {
    key: 'queryTrips',
    value: function queryTrips() {
      var self = this;

      //get possible trips with depart criteria
      var departTrips = self.allTrips.filter(self.searchFilter(self.tripDetails.departDate, self.tripDetails.fromCode, self.tripDetails.toCode));

      var returnTrips = [];

      //if it's a return trip, let's grab the possible trips with return criteria
      if (self.tripDetails.return) {
        returnTrips = self.allTrips.filter(self.searchFilter(self.tripDetails.returnDate, self.tripDetails.toCode, self.tripDetails.fromCode));
      }

      //massaging the result data, to standardize the schema, and to permutate the possibility of timeslots and re calc the price limit if it's a return trip
      //if it's a return trip, but there is no possible trip for depart trip, we will skip the following process
      if (departTrips.length > 0) {
        for (var i = 0; i < departTrips.length; i++) {
          var tmp = {};

          tmp.depart = departTrips[i];
          var tmpPrice = parseInt(tmp.depart.price);

          //if it's a return trip, but there is no possible trip for return trip, we will break the loop
          if (self.tripDetails.return && returnTrips.length === 0) {
            break;
          }

          for (var j = 0; j < returnTrips.length; j++) {
            tmp.return = returnTrips[j];
            tmpPrice += parseInt(tmp.return.price);
          }

          tmp.price = tmpPrice;

          //only need to re-calc if it's return
          if (self.tripDetails.return && tmpPrice <= self.tripDetails.priceMax || !self.tripDetails.return) {
            self.results.push(tmp);
          }
        }
      }
    }

    /* this is for filtering trip with trip query conditions*/

  }, {
    key: 'searchFilter',
    value: function searchFilter(travelDate, from, to) {
      var self = this;

      return function filterFn(trip) {
        var validTrip = self.compareDate(trip.timings.day, travelDate) && trip.airport_details.from === from && trip.airport_details.to === to && parseInt(trip.price) <= self.tripDetails.priceMax;

        return validTrip;
      };
    }

    //to compare the equal date, ignoring time

  }, {
    key: 'compareDate',
    value: function compareDate(from, to) {
      from = moment(from).toDate().setHours(0, 0, 0, 0);
      to = moment(to).toDate().setHours(0, 0, 0, 0);
      return from === to;
    }
  }, {
    key: 'newSearch',
    value: function newSearch() {
      this.$scope.$emit('new-search', null);
    }
  }, {
    key: 'formatDate',
    value: function formatDate(date) {
      return moment(date).format('DD MMM YYYY');
    }
  }]);

  return ResultsController;
}();

angular.module('thoughtworksTestApp').controller('ResultsController', ResultsController);
//# sourceMappingURL=results.controller.js.map
