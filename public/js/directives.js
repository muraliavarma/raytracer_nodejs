app.directive('sceneChain', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var attr = scope.pickedObject;
			for (var i = 0; i < scope.attribute.sceneChain.length; i++) {
				attr = attr[scope.attribute.sceneChain[i]];
			}
			scope.sceneAttribute = attr[scope.item] * (1.0/(scope.attribute.multiplier? parseFloat(scope.attribute.multiplier): 1));

			scope.$watch('sceneAttribute', function() {
				var attr = scope.pickedObject;
				for (var i = 0; i < scope.attribute.sceneChain.length; i++) {
					attr = attr[scope.attribute.sceneChain[i]];
				}
				attr[scope.item] = scope.sceneAttribute * (scope.attribute.multiplier? parseFloat(scope.attribute.multiplier): 1);
				render();
			});

		}
	}
})