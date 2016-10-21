(function(angular, undefined) {
  angular.module("thoughtworksTestApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})

;
})(angular);