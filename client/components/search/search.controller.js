'use strict';

class SearchController {
  constructor($state, $scope, Airports) {
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

  $onInit() {
    var self = this;

    //let's get all airports list
    self.Airports.get().$promise.then(response => {
      for (var i = 0; i < response.data.length; i++) {
        self.airportsData.push({
          'value': response.data[i].code,
          'display': response.data[i].city + ' (' + response.data[i].code + ')'
        });
      }
    });

    //let's watch the price range slider value, on change, reload the search results
    self.$scope.$watch(function() {
        return self.sliderValue;
      },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.tripDetails.priceMax = self.sliderValue;
          self.beginSearch();
        }
      }
    );
  }

  selectAirport(item, source) {
    var self = this;
    var tmpval = '';

    if (item) {
      tmpval = item.value;
    }

    //on select, grab airport code value, our trip search query is based on airport code
    self.tripDetails[source + 'Code'] = tmpval;
  }

  queryAirports(keywords, type) {
    var self = this;
    return self.airportsData.filter( self.searchFilter(keywords, type) );
  }

  //this is for case-insensitivity handler and for excluding the list from the origin/destination vice versa
  searchFilter(query, type) {
    var self = this;
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(airport) {
      var tmp = angular.lowercase(airport.display);

      return (tmp.indexOf(lowercaseQuery) === 0 && tmp !== angular.lowercase(self.tripDetails[type]));
    };
  }

  toggleTrip() {
    //toggle return / oneway trip
    this.tripDetails.return = !this.tripDetails.return;
  }

  beginSearch() {
    //broadcast search event
    this.$scope.$emit('new-search', this.tripDetails);
  }
}

angular.module('thoughtworksTestApp')
  .controller('SearchController', SearchController);
