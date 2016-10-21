'use strict';

(function () {

  function AirportsResource($resource) {
    return $resource('assets/dummy-data/airports.json');
  }

  angular.module('thoughtworksTestApp').factory('Airports', AirportsResource);
})();
//# sourceMappingURL=airports.service.js.map
