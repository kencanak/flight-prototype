'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchController = function () {
  function SearchController($state, $scope, Airports) {
    _classCallCheck(this, SearchController);

    this.errors = {};
    this.$state = $state;
    this.$scope = $scope;
    this.airportsData = [];
    this.Airports = Airports;
    this.minDate = new Date();
    this.maxPassengers = new Array(8);

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

    this.sliderValue = this.tripDetails.priceMax;
  }

  _createClass(SearchController, [{
    key: '$onInit',
    value: function $onInit() {
      var self = this;

      //let's get all airports list
      self.Airports.get().$promise.then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          self.airportsData.push({
            'value': response.data[i].code,
            'display': response.data[i].city + ' (' + response.data[i].code + ')'
          });
        }
      });

      //let's watch the price range slider value, on change, reload the search results
      self.$scope.$watch(function () {
        return self.sliderValue;
      }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
          self.tripDetails.priceMax = self.sliderValue;
          self.beginSearch();
        }
      });
    }
  }, {
    key: 'selectAirport',
    value: function selectAirport(item, source) {
      var self = this;
      var tmpval = '';

      if (item) {
        tmpval = item.value;
      }

      //on select, grab airport code value, our trip search query is based on airport code
      self.tripDetails[source + 'Code'] = tmpval;
    }
  }, {
    key: 'queryAirports',
    value: function queryAirports(keywords, type) {
      var self = this;
      return self.airportsData.filter(self.searchFilter(keywords, type));
    }

    //this is for case-insensitivity handler and for excluding the list from the origin/destination vice versa

  }, {
    key: 'searchFilter',
    value: function searchFilter(query, type) {
      var self = this;
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(airport) {
        var tmp = angular.lowercase(airport.display);

        return tmp.indexOf(lowercaseQuery) === 0 && tmp !== angular.lowercase(self.tripDetails[type]);
      };
    }
  }, {
    key: 'toggleTrip',
    value: function toggleTrip() {
      //toggle return / oneway trip
      this.tripDetails.return = !this.tripDetails.return;
    }
  }, {
    key: 'beginSearch',
    value: function beginSearch() {
      //broadcast search event
      this.$scope.$emit('new-search', this.tripDetails);
    }
  }]);

  return SearchController;
}();

angular.module('thoughtworksTestApp').controller('SearchController', SearchController);
//# sourceMappingURL=search.controller.js.map
