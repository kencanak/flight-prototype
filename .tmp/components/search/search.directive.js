'use strict';

angular.module('thoughtworksTestApp').directive('search', function () {
  return {
    templateUrl: 'components/search/search.html',
    restrict: 'E',
    controller: 'SearchController',
    controllerAs: 'searchController'
  };
});
//# sourceMappingURL=search.directive.js.map
