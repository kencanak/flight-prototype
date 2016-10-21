'use strict';

angular.module('thoughtworksTestApp')
  .directive('search', () => ({
    templateUrl: 'components/search/search.html',
    restrict: 'E',
    controller: 'SearchController',
    controllerAs: 'searchController'
  }));
