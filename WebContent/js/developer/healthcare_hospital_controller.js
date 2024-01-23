var map;

require(
		[ "esri/map", 
				"dojo/domReady!" ],
		function(Map) {

			var app = {};

			var appConfig = {
				mapView : null,
				sceneView : null,
				activeView : null,
				container : "map"
			};

			map = new Map("map", {
				center : [ 75.8577, 22.7196 ],
				zoom : 12,
				container : appConfig.container,
				ui : {
					components : [ "attribution" ]
				},
				basemap : "hybrid"
			});
		$(document).ready();
	});