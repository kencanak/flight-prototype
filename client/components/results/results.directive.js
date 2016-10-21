'use strict';

angular.module('thoughtworksTestApp')
  .directive('results', () => ({
    templateUrl: 'components/results/results.html',
    restrict: 'E',
    controller: 'ResultsController',
    controllerAs: 'resultsController'
  }));
