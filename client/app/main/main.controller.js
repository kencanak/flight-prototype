'use strict';

(function() {

  class MainController {

    constructor($http, $window, $scope) {
      this.$http = $http;
      this.$window = $window;

      this.screenStatus = {
        smallScreen: $window.innerWidth < 960,
        hasResult: false
      };
      this.$scope = $scope;
    }

    $onInit() {
      var self = this;

      //on resize, if screen fall below 960, we will add a class, this is to support responsive navigation
      angular.element(self.$window).bind('resize', function(){
        self.screenStatus.smallScreen = self.$window.innerWidth < 960;
        self.$scope.$digest();
      });

      self.$scope.$on('new-search', function (event, data) {
        if (data) {
          self.screenStatus.hasResult = true;
        } else {
          self.screenStatus.hasResult = false;
        }
      });
    }
  }

  angular.module('thoughtworksTestApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      mainController: 'mainController'
    });
})();
