var mapClickEvtHandler;
var _current_lat = "";
var _current_long = "";
var map;

require(
		[ "esri/Map", "esri/views/SceneView", "esri/layers/SceneLayer",
				"esri/widgets/Home", "esri/geometry/Extent",
				"esri/widgets/LayerList", "esri/views/MapView",
				"esri/widgets/Expand", "esri/geometry/SpatialReference",
				"esri/widgets/Locate", "esri/widgets/Search",
				"esri/geometry/Point",
				"esri/geometry/support/webMercatorUtils",
				"esri/layers/ImageryLayer", "esri/layers/ElevationLayer",
				"esri/layers/FeatureLayer", "esri/layers/TileLayer",
				"esri/tasks/support/ProjectParameters", "esri/tasks/GeometryService","esri/tasks/Locator" ],
		function(Map, SceneView, SceneLayer, Home, Extent, LayerList, MapView,
				Expand, SpatialReference, Locate, Search, Point,
				webMercatorUtils, ImageryLayer, ElevationLayer, FeatureLayer,
				TileLayer,ProjectParameters,GeometryService,Locator) {

			const building_wsl1_slayer = new SceneLayer({
				url : window.BUILDING_SCENE_LAYER,
				title : "Building"
			});

			const electric_pole_slayer = new SceneLayer({
				url : window.ELECTRICAL_POLE_SCENE_LAYER,
				visible : false,
				title : "Electric Pole"
			});

			const traffic_signal_slayer = new SceneLayer({
				url : window.TRAFFIC_SIGNAL_SCENE_LAYER,
				visible : false,
				title : "Traffic Signal"
			});

			const street_light_slayer = new SceneLayer({
				url : window.STREET_LIGHT_SCENE_LAYER,
				visible : false,
				title : "Street Light"
			});

			const tree_slayer = new SceneLayer({
				url : window.TREE_SCENE_LAYER,
				visible : false,
				title : "Tree"
			});
			
			const overhead_slayer = new SceneLayer({
				url : window.OVERHEAD_TANK_SCENE_LAYER,
				visible : false,
				title : "OverHead Tank"
			});

			const gandhi_hall_slayer = new SceneLayer({
				url : window.HERITAGE_GANDHI_HALL,
				visible : false,
				title : "Gandhi Hall"
			});

			const white_church_slayer = new SceneLayer({
				url : window.HERITAGE_WHITE_CHURCHE,
				visible : false,
				title : "White Church"
			});

			const naxtra_wedding_hall_slayer = new SceneLayer({
				url : window.HERITAGE_NAXTRA_WEDDING_HALL,
				visible : false,
				title : "Naxtra Wedding Hall"
			});

			const nehru_stadium_slayer = new SceneLayer({
				url : window.HERITAGE_NEHRU_STADIUM,
				visible : false,
				title : "Nehru Stadium"
			});

			const lalbhag_slayer = new SceneLayer({
				url : window.HERITAGE_LALBHAG,
				visible : false,
				title : "Lalbhag"
			});
			
			const holkar_stadium_slayer = new SceneLayer({
		        url: window.HERITAGE_HOLKAR_STADIUM,
		        visible: false,
		        title : "Holkar Stadium"
		    });

			const rajawada_slayer = new SceneLayer({
				url : window.HERITAGE_RAJAWADA,
				visible : false,
				title : "Rajawada"
			});

			const khajrana_temple_slayer = new SceneLayer({
				url : window.HERITAGE_KHAJRANA_TEMPLE,
				visible : false,
				title : "Khajrana Temple"
			});

			const collector_ofc_slayer = new SceneLayer({
				url : window.HERITAGE_COLLECTOR_OFFICE,
				visible : false,
				title : "Collector Office"
			});
			
			
			const water_bodies_slayer = new FeatureLayer({
				url : window.WATER_BODIES_FEATURE_LAYER,
				visible : false,
				outFields : [ "*" ],
				title : "Water Bodies"
			});
			
			const manhole_slayer = new FeatureLayer(
					{
						url : window.MANHOLE_FEATURE_LAYER,
						visible : false,
						title : "Manhole",
						outFields : [ "*" ]
			});

			/**
			 * Image Layer
			 */

			const pocket_12_terrian_dem = new ElevationLayer({
				url : window.DEM_P1_P2_IMAGE_LAYER,
				visible : true,
				title : "ISCDL DEM"
			});

			/**
			 * Feature Layer
			 */
			
			

			const devider_slayer = new FeatureLayer({
				url : window.DIVIDER_FEATURE_LAYER,
				visible : false,
				title : "Divider",
				fields : [ "*" ],
				popupTemplate : {
					title : "Divider",
					content: "<b>Object ID </b>: {objectid} <br> " +
              		"<b>Id </b>: {id} <br> " +
              		"<b>Type </b>: {type} <br>" +
              		"<b>Material </b>: {material} <br>" +
              		"<b>Road Name </b>: {road_name} <br>" +
              		"<b>Width </b>: {width} <br>" +
              		"<b>Ward No </b>: {ward_no} <br>" +
              		"<b>Ward Name </b>: {ward_name} <br>" +
              		"<b>Zone No </b>: {zone_no} <br>" +
              		"<b>Zone Name </b>: {zone_name} <br>" +
              		"<b>Road Id </b>: {road_id} <br>" +
              		"<b>Shape Length </b>: {shape_leng} <br>"

				}
			});

			const footpath_slayer = new FeatureLayer({
				url : window.FOOTPATH_FEATURE_LAYER,
				visible : false,
				title : "Footpath",
				fields : [ "*" ],
				popupTemplate : {
					title : "Footpath",
					content: "<b>Object ID </b>: {objectid} <br> " +
              		"<b>Id </b>: {id} <br> " +
              		"<b>Footpath width </b>: {footpath_width} <br>" +
              		"<b>Width </b>: {ward_no} <br>" +
              		"<b>Ward Name </b>: {ward_name} <br>" +
              		"<b>Zone No </b>: {zone_no} <br>" +
              		"<b>Zone Name </b>: {zone_name} <br>" +
              		"<b>Road Id </b>: {road_id} <br>" +
              		"<b>Shape Length </b>: {shape_leng} <br>"

				}
			});

			const road_slayer = new SceneLayer({
				url : window.ROAD_SCENE_LAYER,
				visible : false,
				title : "Roads",
				outFields : [ "*" ]
			});


			/**
			 * Tile Layer
			 */

			const ortho_1 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_1,
				visible : true
			});

			const ortho_2 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_2,
				visible : true
			});

			const ortho_3 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_3,
				visible : true
			});

			const ortho_4_1 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_4_1,
				visible : true
			});

			const ortho_4_2 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_4_2,
				visible : true
			});

			const ortho_5 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_5,
				visible : true
			});

			const ortho_6 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_6,
				visible : true
			});

			const ortho_7 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_7,
				visible : true
			});

			const ortho_8 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_8,
				visible : true
			});

			const ortho_9 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_9,
				visible : true
			});

			const ortho_10 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_10,
				visible : true
			});

			const ortho_11 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_11,
				visible : true
			});

			const ortho_12 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_12,
				visible : true
			});

			const ortho_14 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_14,
				visible : true
			});

			const ortho_15 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_15,
				visible : true
			});
			const ortho_16 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_16,
				visible : true
			});
			
			const ortho_17 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_17,
				visible : true
			});
			
			const ortho_18 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_18,
				visible : true
			});
			
			const ortho_19 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_19,
				visible : true
			});
			
			const ortho_20 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_20,
				visible : true
			});
			
			const ortho_21 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_21,
				visible : true
			});
			
			const ortho_22 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_22,
				visible : true
			});
			
			const ortho_23 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_23,
				visible : true
			});
			
			const ortho_24 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_24,
				visible : true
			});
			
			const ortho_25 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_25,
				visible : true
			});
			
			const ortho_26 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_26,
				visible : true
			});
			
			const ortho_27 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_27,
				visible : true
			});
			
			const ortho_28 = new TileLayer({
				url : window.POCKET_1_ORTHO_PART_28,
				visible : true
			});
			
			 var ortho_31 = new TileLayer({  
		            url: window.POCKET_1_ORTHO_PART_31 
		          });
	          
	          var ortho_32 = new TileLayer({  
		            url: window.POCKET_1_ORTHO_PART_32  
		          });

			map = new Map({
				basemap : "streets-navigation-vector",
				//ground : "world-elevation",
				layers : [ white_church_slayer,water_bodies_slayer,tree_slayer,
					traffic_signal_slayer,street_light_slayer,road_slayer,
					rajawada_slayer,overhead_slayer,
					 nehru_stadium_slayer,
					 naxtra_wedding_hall_slayer,
					 manhole_slayer,
					 lalbhag_slayer,
					 khajrana_temple_slayer,
					 ortho_25,ortho_6,ortho_4_2,
						ortho_26,ortho_24,
						ortho_23,ortho_22,ortho_21,
						ortho_20,ortho_19,ortho_18,ortho_17,
						ortho_5,ortho_16,
						ortho_14,ortho_12,
						ortho_10,ortho_9,
						ortho_8,ortho_7,
						ortho_11,ortho_15,
						ortho_27,ortho_28,
						ortho_32,ortho_4_1,
						ortho_3,ortho_2,ortho_1,
						ortho_31,
						 holkar_stadium_slayer,
					 gandhi_hall_slayer,footpath_slayer,electric_pole_slayer,devider_slayer,collector_ofc_slayer,building_wsl1_slayer ]
			});

			map.ground.layers.add(pocket_12_terrian_dem);
			
			// initial extent
			var initialExtent = new Extent(75.54699290771396,
					22.63628705473749, 76.16840709228345, 22.80286225175135,
					new SpatialReference({
						wkid : 4326
					}));

			var view = new SceneView({
				container : "map",
				map : map,
				zoom : window.MAP_INITIAL_ZOOM,
				center : window.MAP_CENTER_POINT
			});

			view.when(function() {
				var layerList = new LayerList({
					view : view,
					listItemCreatedFunction: function(event) {
			             var item = event.item;
			             item.actionsSections = [
			               [{
			                 title: "Zoom to layer",
			                 className: "esri-icon-zoom-out-fixed",
			                 id: "full-extent"
			               }]
			             ];
			           }
				});

				// Add widget to the top right corner of the view
				view.ui.add(layerList, "top-right");
				
		         //zoom to layer 
		         layerList.on("trigger-action", function(event) {
		 	        var id = event.action.id;
		 	        if (id === "full-extent") {
		 	          if(event.item.layer.fullExtent.spatialReference !== view.spatialReference){
		 	            var geomSer = new GeometryService({url: window.prefix_layer_url + "Utilities/Geometry/GeometryServer"});
		 	            var params = new ProjectParameters({
		 	              geometries: [event.item.layer.fullExtent],
		 	              outSpatialReference: view.spatialReference
		 	            });
		 	            geomSer.project(params).then(function(results){
		 	              view.goTo(results[0]);
		 	            });
		 	          }else{
		 	            view.goTo(event.item.layer.fullExtent);
		 	          }
		 	        }
		 	      });
				
			});

			/**
			 * -------- widget start -------
			 */

			var homeBtn = new Home({
				view : view
			});

			// Add the home button to the top left corner of the view
			view.ui.add(homeBtn, "top-left");

			// search
			var search = new Search({
				view : view,
				includeDefaultSources: false,
				   sources: [
				     {
				       locator: new Locator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
				       singleLineFieldName: "SingleLine",
				       outFields: ["Addr_type", "Match_addr", "StAddr", "City"],
				       name: "ArcGIS World Geocoding Service",
				       placeholder: 'Find address or place',
				       resultSymbol: {
				          type: "picture-marker", 
				          url: this.basePath + "/images/search/search-symbol-32.png",
				          size: 24,
				          width: 24,
				          height: 24,
				          xoffset: 0,
				          yoffset: 0
				      },
				       filter: {
				    	   geometry : initialExtent
				       }
				     }
				   ]
			});

			view.ui.add(search, "top-left");

			var locate = new Locate(
					{
						view : view,

						useHeadingEnabled : false,
						// container: "locateDiv",
						goToOverride : function(view, options) {
							options.target.scale = 1500; // Override the
							// default map scale

							let point = {
								type : "point",
								x : options.target.target.x,
								y : options.target.target.y,
								z : options.target.target.z
							};

							let mp = webMercatorUtils
									.webMercatorToGeographic(point);

							if (!initialExtent.contains(mp)) {
								$u
										.notify(
												'info',
												'Notification',
												'Current location is not within Indore boundry',
												'');
								return;
							}

							return view.goTo(options.target);
						}
					});

			view.ui.add(locate, "top-left");

			$(document).ready(function() {
				$(".loader").fadeOut();
			});

			$(".layer_action").click(
					function() {
						$(".esri-layer-list").toggle();
						let display_property = $(".esri-layer-list").css(
								"display");
						if (display_property == "none") {
							$('#layer_toggle_title').prop('title',
									'Enable Layer List');
						} else if (display_property == "block") {
							$('#layer_toggle_title').prop('title',
									'Disable Layer List');
						}
					});
			
		
			/**
			 * LOAD FUNCTION
			 */

			$(window).on("load", function() {
			});

		});