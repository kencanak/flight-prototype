'use strict';

angular.module('thoughtworksTestApp', ['thoughtworksTestApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ngMaterial', 'ngAnimate']).config(function ($urlRouterProvider, $locationProvider, $mdDateLocaleProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    //setting date format
    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD MMM YYYY');
    };

    $mdDateLocaleProvider.parseDate = function (dateString) {
        var m = moment(dateString, 'DD MMM YYYY', true);
        return m.isValid() ? m.toDate() : new Date();
    };
});
//# sourceMappingURL=app.js.map
