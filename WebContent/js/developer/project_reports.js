(function(global, $) {
	"use stricts;"

	var map;
	var myFeatureTable;
	var myFeatureLayer;
	let base = {
		getMap : function getMap() {
			return map;
		},
		zoomToLocation :  function zoomToLocation(latitude, longitude){
			global.zoomToLocation(latitude, longitude);
		}
	}

	require(
			[  "esri/geometry/Extent", "esri/graphic",
					"esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol",
					"esri/symbols/SimpleLineSymbol", "esri/Color", "esri/map",
					"esri/dijit/Popup", "esri/dijit/PopupTemplate",
					"esri/geometry/Point", "esri/Color", "esri/symbols/PictureMarkerSymbol",
					"dojo/dom-construct", "dojo/dom", "dojo/number",
					"dojo/parser", "dojo/ready", "dojo/on", "dojo/_base/lang",
					"dijit/registry", "dijit/form/Button",
					"dijit/layout/ContentPane", "dijit/layout/BorderContainer", "dojo/domReady!" ],
			function(Extent, Graphic,
					SimpleFillSymbol, SimpleMarkerSymbol, SimpleLineSymbol, Color, Map, Popup,
					PopupTemplate, Point, Color, PictureMarkerSymbol, domConstruct, dom, dojoNum, parser, ready,
					on, lang, registry, Button, ContentPane, BorderContainer) {

				parser.parse();

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
					basemap : "streets-navigation-vector"
				});

				
				
				var featureAttributes = [];
				var selected_layer = "";

				
				/*$("#reset_hospital").click(function(){
					if (myFeatureTable) {
						myFeatureTable.destroy();
						$("#feature_table").append('<div class="tbl_dep hospitolR-h100" id="myTableNode"></div>');
					}
				});*/
				
							
				global.zoomToLocation = function zoomToLocation(latitude, longitude) {
					map.graphics.clear();
					var pt = new Point(longitude,latitude);
					
					_current_long = longitude;
					_current_lat = latitude;
					
					var url = window.location.origin
					+ window.iscdl.appData.webURLPrefix + "images/icons/Project-89 (1).svg";
					var symbol = new esri.symbol.PictureMarkerSymbol(url,24, 24);
					var graphic = new Graphic(pt, symbol);
					map.graphics.add(graphic);
					
					map.centerAndZoom(pt, 18);
				}
				

				/**
				 * Function end
				 */

				$(document).ready();
			});
	global.projectReportController = base;
})(window, jQuery)