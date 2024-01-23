require(
		[ "esri/Map", "esri/views/MapView", "esri/views/SceneView",
				"esri/widgets/BasemapGallery", "esri/widgets/Home",
				"esri/widgets/Locate", "esri/widgets/Print",
				"esri/widgets/Search", "esri/widgets/Measurement" ],
		function(Map, MapView, SceneView, BasemapGallery, Home, Locate, Print,
				Search, Measurement) {

			var homeBtn, locate, print, measurementArea, measurementDistance, basemapGallery, search, measurement;

			var appConfig = {
				mapView : null,
				sceneView : null,
				activeView : null,
				container : "map"
			};

			var map2D = new Map({
				basemap : "hybrid"
			});

			var map3D = new Map({
				basemap : "hybrid",
				ground : "world-elevation"
			});

			var initialViewParams = {
				zoom : 12,
				center : [ 75.8577, 22.7196 ],
				container : appConfig.container,
				ui : {
					components : [ "attribution" ]
				}
			};

			// var view = new MapView({
			// container : "map",
			// map : map,
			// center : [ 75.8577, 22.7196 ],
			// zoom : 13,
			// ui : {
			// components : [ "attribution" ]
			// }
			// });

			function createView(params, type) {
				var view;
				var is2D = type === "2d";
				if (is2D) {
					view = new MapView(params);
				} else {
					view = new SceneView(params);
				}
				return view;
			}

			appConfig.mapView = createView(initialViewParams, "2d");
			appConfig.mapView.map = map2D;
			appConfig.activeView = appConfig.mapView;
			measurement = new Measurement();
			measurement.view = appConfig.activeView;

			// initialViewParams.container = null;
			// initialViewParams.map = map3D;
			// appConfig.sceneView = createView(initialViewParams, "3d");

			// Switch to 2D Map View
			var map2DButton = document.getElementById("2d-map-btn");
			map2DButton.addEventListener("click", function() {
				switchView("2d");
			});
			$("#2d-map-btn").attr("disabled", true);

			// Switch to 3D Map View
			var map3DButton = document.getElementById("3d-map-btn");
			map3DButton.addEventListener("click", function() {
				switchView("3d");
			});

			function switchView(type) {
				var is3D = type === "3d";
				appConfig.activeView.container = null;
				if (is3D) {
					$("#2d-map-btn").attr("disabled", false);
					$("#3d-map-btn").attr("disabled", true);
					initialViewParams.map = map3D;
					appConfig.sceneView = createView(initialViewParams, "3d");
					appConfig.sceneView.container = appConfig.container;
					appConfig.activeView = appConfig.sceneView;
					set3DConfig();
				} else {
					$("#2d-map-btn").attr("disabled", true);
					$("#3d-map-btn").attr("disabled", false);
					initialViewParams.map = map2D;
					appConfig.mapView = createView(initialViewParams, "2d");
					appConfig.mapView.container = appConfig.container;
					appConfig.activeView = appConfig.mapView;
					set2DConfig();
				}

			}
			
			function areaMeasurement(measurement) {
				measurement.activeTool = "area";
			}

			set2DConfig();

			function set2DConfig() {
				homeBtn = new Home({
					view : appConfig.mapView,
					container : myHomeDiv
				});

				locate = new Locate({
					view : appConfig.mapView,
					useHeadingEnabled : false,
					goToOverride : function(view, options) {
						options.target.scale = 1500;
						return view.goTo(options.target);
					},
					container : locateDiv
				});

				print = new Print(
						{
							view : appConfig.mapView,
							container : printDiv,
							printServiceUrl : "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
							templateOptions : {
								format : "jpg",
								legendEnabled : true
							}
						});

				measurement.clear();
				measurement.view = appConfig.activeView;

				var distanceButton = document.getElementById("distance");
				var areaButton = document.getElementById("area");

				distanceButton.addEventListener("click", function() {
					distanceMeasurement();
				});
				areaButton.addEventListener("click", function() {
					areaMeasurement(measurement);
				});

				function distanceMeasurement() {
					measurement.activeTool = "distance";
				}

				// measurementArea = new AreaMeasurement2D({
				// view : appConfig.mapView,
				// container : measureArea
				// });
				//
				// measurementDistance = new DistanceMeasurement2D({
				// view : appConfig.mapView,
				// container : measureDistance
				// });

				function showCoordinates(pt) {
					var coords = "Lattitude: " + pt.latitude.toFixed(3)
							+ " Longitude: " + pt.longitude.toFixed(3)
							+ " Zoom: " + appConfig.mapView.zoom;
					var coordsWidget = document.getElementById("latLongDiv");
					coordsWidget.className = "esri-widget esri-component";
					coordsWidget.style.padding = "7px 15px 5px";
					coordsWidget.innerHTML = coords;
				}

				appConfig.mapView.on([ "pointer-down" ], function(evt) {
					showCoordinates(appConfig.mapView.toMap({
						x : evt.x,
						y : evt.y
					}));
				});

				basemapGallery = new BasemapGallery({
					view : appConfig.mapView,
					container : basemapGalleryDiv
				});

				search = new Search({
					view : appConfig.mapView
				});
				appConfig.mapView.ui.add(search, "top-left");
			}

			$("#zoomInDiv").on("click", function() {
				if (appConfig.activeView.type === "3d") {
					appConfig.sceneView.zoom += 1;
				} else {
					appConfig.mapView.zoom += 1;
				}

			});

			$("#zoomOutDiv").on("click", function() {
				if (appConfig.activeView.type === "3d") {
					if (appConfig.sceneView.zoom - 1 > 0) {
						appConfig.sceneView.zoom -= 1;
					}
				} else {
					if (appConfig.mapView.zoom - 1 > 0) {
						appConfig.mapView.zoom -= 1;
					}
				}

			});

			function set3DConfig() {
				homeBtn = new Home({
					view : appConfig.sceneView,
					container : myHomeDiv
				});

				locate = new Locate({
					view : appConfig.sceneView,
					useHeadingEnabled : false,
					goToOverride : function(view, options) {
						options.target.scale = 1500;
						return view.goTo(options.target);
					},
					container : locateDiv
				});

				measurement.clear();
				measurement.view = appConfig.activeView;

				var distanceButton = document.getElementById("distance");
				var areaButton = document.getElementById("area");

				distanceButton.addEventListener("click", function() {
					distanceMeasurement();
				});
				areaButton.addEventListener("click", function() {
					areaMeasurement(measurement);
				});

				function distanceMeasurement() {
					measurement.activeTool = "direct-line";
				}

				

				// measurementArea = new AreaMeasurement3D({
				// view : appConfig.sceneView,
				// container : measureArea
				// });
				//
				// measurementDistance = new DirectLineMeasurement3D({
				// view : appConfig.sceneView,
				// container : measureDistance
				// });

				function showCoordinates(pt) {
					var coords = "Lattitude: " + pt.latitude.toFixed(3)
							+ " Longitude: " + pt.longitude.toFixed(3)
							+ " Zoom: " + appConfig.sceneView.zoom;
					var coordsWidget = document.getElementById("latLongDiv");
					coordsWidget.className = "esri-widget esri-component";
					coordsWidget.style.padding = "7px 15px 5px";
					coordsWidget.innerHTML = coords;
				}

				appConfig.sceneView.on([ "pointer-down" ], function(evt) {
					showCoordinates(appConfig.sceneView.toMap({
						x : evt.x,
						y : evt.y
					}));
				});

				basemapGallery = new BasemapGallery({
					view : appConfig.sceneView,
					container : basemapGalleryDiv
				});

				search = new Search({
					view : appConfig.sceneView
				});
				appConfig.sceneView.ui.add(search, "top-left");
			}

		});