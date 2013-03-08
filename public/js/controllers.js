var app = angular.module('app', []);

function AttributeCtrl($scope, $http) {
	$http.get('json/attributes.json').success(function (data) {
		$scope.data = data;
	});

	$scope.updateAttributes = function(pickedObject) {
		$scope.pickedObject = pickedObject;
	}
}