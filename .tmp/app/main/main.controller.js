'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    function MainController($http, $window, $scope) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.$window = $window;

      this.screenStatus = {
        smallScreen: $window.innerWidth < 960,
        hasResult: false
      };
      this.$scope = $scope;
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var self = this;

        //on resize, if screen fall below 960, we will add a class, this is to support responsive navigation
        angular.element(self.$window).bind('resize', function () {
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
    }]);

    return MainController;
  }();

  angular.module('thoughtworksTestApp').component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    mainController: 'mainController'
  });
})();
//# sourceMappingURL=main.controller.js.map
