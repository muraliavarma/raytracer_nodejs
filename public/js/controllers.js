var app = angular.module('app', []);

function AttributeCtrl($scope, $http) {
	$http.get('json/attributes.json').success(function (data) {
		$scope.data = data;
	});

	$scope.updateAttributes = function(pickedObject) {
		$scope.pickedObject = pickedObject;
		var attrs = [];
		if (!pickedObject) {
			$scope.attributes = [];
		}
		else if (pickedObject.name.indexOf('Plane') != -1) {
			attrs = $scope.data.picked.plane;
		}
		else if (pickedObject.name.indexOf('Sphere') != -1) {
			attrs = $scope.data.picked.sphere;
		}

		$scope.attributes = [];
		for (var i = 0; i < attrs.length; i++) {
			var attr = attrs[i];
			$scope.attributes.push($scope.data.attributes[attr]);
		}
	}

	$scope.update = function() {
		console.log("ASD");
	}
}