'use strict';

(function () {

  function TripsResource($resource) {
    return $resource('assets/dummy-data/trips.json');
  }

  angular.module('thoughtworksTestApp').factory('Trips', TripsResource);
})();
//# sourceMappingURL=trips.service.js.map
