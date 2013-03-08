app.directive('attribute', function() {
	return {
		restrict: 'E',
		link: function(scope, element, attr) {
			var attrs = [];
			scope.$watch('pickedObject', function(pickedObject) {
				if (!pickedObject) {
					return;
				}
				else if (pickedObject.name.indexOf('Plane') != -1) {
					attrs = scope.data.picked.plane;
				}
				else if (pickedObject.name.indexOf('Sphere') != -1) {
					attrs = scope.data.picked.sphere;
				}

				for (var i = 0; i < attrs.length; i++) {
					var attr = attrs[i];
					element.appendChild(document.createElement('<div>' + attr.title + '</div>'))
					console.log(attr.title);
				}
			})
		}
	};
});
