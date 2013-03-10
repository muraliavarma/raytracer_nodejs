app.directive('sceneChain', function() {
	return {
		restrict: 'A',
		scope: {
			attribute: '=',
			pickedObject: '=',
			item: '='
		},
		link: function(scope, element, attrs) {
			getAttrs();

			scope.$watch('sceneAttribute', function() {
				// console.log(scope.attribute);
				setAttrs();
			});

			scope.$watch('pickedObject', function() {
				getAttrs();
			});

			function getAttrs() {
				var multiplier = (scope.attribute.multiplier? parseFloat(scope.attribute.multiplier): 1);
				var attr = scope.pickedObject;
				for (var i = 0; i < scope.attribute.sceneChain.length; i++) {
					attr = attr[scope.attribute.sceneChain[i]];
				}
				if (scope.item) {
					attr = attr[scope.item];
				}
				scope.sceneAttribute = scope.attribute.type == 'text' ? attr : attr / multiplier;
			}

			function setAttrs() {
				var multiplier = (scope.attribute.multiplier? parseFloat(scope.attribute.multiplier): 1);
				var attr = scope.pickedObject;
				if (!attr) {
					return;
				}
				var chain = scope.attribute.sceneChain;
				for (var i = 0; i < chain.length - 1; i++) {
					attr = attr[chain[i]];
				}
				if (scope.item) {
					attr[chain[chain.length-1]][scope.item] = scope.sceneAttribute * multiplier;
				}
				else if (scope.attribute.type == 'text') {
					attr[chain[chain.length-1]] = scope.sceneAttribute;
				}
				render();
			}
		}
	}
})