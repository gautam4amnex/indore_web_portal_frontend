//var _status_name = "Approved";
//var mapClickEvtHandler;
//var _current_lat = "";
//var _current_long = "";
//var map, view;
//var map_info_tool = true;
//var zoom_box_tool,zoom_out_box_tool = false;
//var viewPointMoveEvent, viewPointClickEvent,textClickEvent;
//
//require(
//		[ "esri/Map", "esri/views/SceneView", "esri/layers/SceneLayer",
//				"esri/widgets/BasemapGallery", "esri/widgets/Home",
//				"esri/widgets/Locate", "esri/geometry/Extent",
//				"esri/views/MapView", "esri/widgets/Expand",
//				"esri/geometry/SpatialReference", "esri/widgets/Measurement",
//				"esri/widgets/DirectLineMeasurement3D", "esri/widgets/Locate",
//				"esri/views/draw/PointDrawAction", "esri/views/draw/Draw",
//				"esri/geometry/geometryEngine", "esri/Graphic",
//				"esri/geometry/Polygon", "esri/views/draw/SegmentDrawAction",
//				"esri/views/draw/PolygonDrawAction", "esri/geometry/Circle",
//				"esri/widgets/Sketch/SketchViewModel",
//				"esri/widgets/Directions", "esri/widgets/AreaMeasurement3D",
//				"esri/widgets/Search", "esri/layers/GraphicsLayer",
//				"esri/tasks/QueryTask", "esri/tasks/support/Query",
//				"esri/geometry/Point",
//				"esri/geometry/support/webMercatorUtils",
//				"esri/tasks/IdentifyTask",
//				"esri/tasks/support/IdentifyParameters",
//				"esri/layers/ImageryLayer", "esri/layers/ElevationLayer",
//				"esri/widgets/LayerList", "esri/widgets/ScaleBar",
//				"esri/layers/support/fieldUtils", "esri/core/watchUtils",
//				"esri/PopupTemplate", "esri/layers/FeatureLayer",
//				"esri/layers/TileLayer", "esri/Basemap",
//				"esri/widgets/BasemapGallery/support/LocalBasemapsSource",
//				"esri/tasks/Locator", "esri/geometry/projection",
//				"esri/layers/PointCloudLayer","esri/tasks/PrintTask",
//				"esri/tasks/support/PrintTemplate","esri/tasks/support/PrintParameters","esri/layers/MapImageLayer","esri/layers/GroupLayer" ,"esri/layers/IntegratedMeshLayer"],
//		function(Map, SceneView, SceneLayer, BasemapGallery, Home, Locate,
//				Extent, MapView, Expand, SpatialReference, Measurement,
//				DirectLineMeasurement3D, Locate, PointDrawAction, Draw,
//				geometryEngine, Graphic, Polygon, SegmentDrawAction,
//				PolygonDrawAction, Circle, SketchViewModel, Directions,
//				AreaMeasurement3D, Search, GraphicsLayer, QueryTask, Query,
//				Point, webMercatorUtils, IdentifyTask, IdentifyParameters,
//				ImageryLayer, ElevationLayer, LayerList, ScaleBar, fieldUtils,
//				watchUtils, PopupTemplate, FeatureLayer, TileLayer, Basemap,
//				LocalBasemapsSource, Locator, projection,PointCloudLayer,
//				PrintTask,PrintTemplate,PrintParameters,MapImageLayer,GroupLayer,IntegratedMeshLayer) {
//
//			var resultsLayer = new GraphicsLayer();
//			var highlight;
//			var rectangleGraphicsLayer,rectangleSketchViewModel;
//			const locatorTask = new Locator({
//						url : "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
//			});
//
//			/**
//
//			 * LOD3 Layers
//			 */
//
//			const gandhi_hall_layer = new SceneLayer({
//				url : "https://tiles.arcgis.com/tiles/KumVK6Ygvn6NkEO7/arcgis/rest/services/Gandhi_hall/SceneServer",
//				title : "Gandhi Hall",
//				outFields : [ "*" ]
//			});
//
//			const collector_office_layer = new SceneLayer({
//				url : "https://tiles.arcgis.com/tiles/KumVK6Ygvn6NkEO7/arcgis/rest/services/Collector_Office/SceneServer",
//				visible : false,
//				title : "Collector Office",
//				outFields : [ "*" ]
//			});
//			
//			const lod3Models = new GroupLayer({
//	          title: "LOD3 Models",
//	          //visible: true,
//	          //visibilityMode: "exclusive",
//	          listMode : "show",
//	          layers: [gandhi_hall_layer,collector_office_layer]
//	        });
//		 	lod3Models.visible = false;
//			
//			/*
//			** LOD1 Layers
//			*/
//			const electric_pole_layer = new SceneLayer({
//				url : "https://tiles.arcgis.com/tiles/KumVK6Ygvn6NkEO7/arcgis/rest/services/Electric_Pole/SceneServer",
//				visible : true,
//				//spatialReference : 32643,
//				title : "Electric Pole",
//				outFields : [ "*" ]
//			});
//			
//			const footpath_layer = new SceneLayer({
//				url : "https://tiles.arcgis.com/tiles/KumVK6Ygvn6NkEO7/arcgis/rest/services/Footpath/SceneServer",
//				visible : true,
//				title : "Footpaths",
//				outFields : [ "*" ]
//			});
//			
//			const divider_layer = new SceneLayer({
//				url : "https://tiles.arcgis.com/tiles/KumVK6Ygvn6NkEO7/arcgis/rest/services/Divider/SceneServer",
//				visible : true,
//				title : "Dividers",
//				outFields : [ "*" ]
//			});
//			
//			const road_layer = new SceneLayer({
//				url : "https://tiles.arcgis.com/tiles/KumVK6Ygvn6NkEO7/arcgis/rest/services/Road/SceneServer",
//				visible : true,
//				title : "Roads",
//				outFields : [ "*" ]
//			});
//			
//			const building_layer = new SceneLayer({
//				url : "https://tiles.arcgis.com/tiles/KumVK6Ygvn6NkEO7/arcgis/rest/services/building/SceneServer",
//				visible : true,
//				title : "Buildings",
//				outFields : [ "*" ]
//			});
//			
//			const lod1Models = new GroupLayer({
//	          title: "LOD1 Models",
//	          //visible: true,
//	          //visibilityMode: "exclusive",
//	          listMode : "show",
//	          layers: [electric_pole_layer,footpath_layer,divider_layer,road_layer,building_layer]
//	          //layers : [Baba_Garibnath_Temple,Commissioner_Office,Imli_Chatti_Bus_Station,ITI_College,Khudiram_Smarak,Lichvi_Vihar,LS_College]
//	        });
//		 	
//
//			/*const traffic_signal_slayer = new SceneLayer({
//				url : window.TRAFFIC_SIGNAL_SCENE_LAYER,
//				visible : false,
//				title : "Traffic Signal",
//				outFields : [ "*" ]
//			});
//
//			const street_light_slayer = new SceneLayer({
//				url : window.STREET_LIGHT_SCENE_LAYER,
//				title : "Street Light",
//				visible : false,
//				outFields : [ "*" ]
//			});
//
//			const tree_slayer = new SceneLayer({
//				url : window.TREE_SCENE_LAYER,
//				title : "Tree",
//				outFields : [ "*" ],
//				visible : false
//			});
//			
//			const overhead_slayer = new SceneLayer({
//				url : window.OVERHEAD_TANK_SCENE_LAYER,
//				visible : false,
//				outFields : [ "*" ],
//				title : "OverHead Tank"
//			});
//			
//			const water_bodies_slayer = new FeatureLayer({
//				url : window.WATER_BODIES_FEATURE_LAYER,
//				visible : false,
//				outFields : [ "*" ],
//				title : "Water Bodies"
//			});
//			
//			const manhole_slayer = new FeatureLayer(
//					{
//						url : window.MANHOLE_FEATURE_LAYER,
//						visible : false,
//						title : "Manhole",
//						outFields : [ "*" ]
//			});
//			
//			const road_scene_slayer = new SceneLayer({
//				url : window.ROAD_SCENE_LAYER,
//				title : "Roads",
//				outFields : [ "*" ]
//			});*/
//
//			/**
//			 * Image Layer
//			 */
//
//			const pocket_12_terrian_dem = new ElevationLayer({
//				//url : window.DEM_P1_P2_IMAGE_LAYER,
//				url : "https://map.muzaffarpursmartcity.org/arcgis/rest/services/test/Terrain_ABD/ImageServer",
//				visible : true,
//				title : "ISCDL DEM"
//			});
//			
//			const pocket_12_river_dem = new ElevationLayer({
//				//url : window.ISCDL_RIVER_DEM_IMAGE_LAYER,
//				url : "https://map.muzaffarpursmartcity.org/arcgis/rest/services/test/River_DEM/ImageServer",
//				visible : true,
//				title : "River DEM"
//			});
//			
//			/*const pocket_12_abd_dem = new ElevationLayer({
//				url : window.ISCDL_RIVER_DEM_TIFF,
//				visible : true,
//				title : "ABD DEM"
//			});
//			
//			const pocket_12_srtm_dem = new ElevationLayer({
//				url : window.ISCDL_SRTM_IMAGE_LAYER,
//				visible : true,
//				title : "STRM DEM"
//			});*/
//
//			/**
//			 * Feature Layer
//			 */	
//
//			/*const devider_slayer = new FeatureLayer({
//				url : window.DIVIDER_FEATURE_LAYER,
//				visible : false,
//				title : "Divider",
//				outFields : [ "*" ],
//				popupTemplate : {
//					title : "Divider",
//					content : "<b>Object ID </b>: {objectid} <br> "
//							+ "<b>Id </b>: {id} <br> "
//							+ "<b>Type </b>: {type} <br>"
//							+ "<b>Material </b>: {material} <br>"
//							+ "<b>Road Name </b>: {road_name} <br>"
//							//+ "<b>Remarks </b>: {remarks} <br>"
//							+ "<b>Width </b>: {width} <br>"
//							+ "<b>Ward No </b>: {ward_no} <br>"
//							+ "<b>Ward Name </b>: {ward_name} <br>"
//							+ "<b>Zone No </b>: {zone_no} <br>"
//							+ "<b>Zone Name </b>: {zone_name} <br>"
//							+ "<b>Road Id </b>: {road_id} <br>"
//							+ "<b>Shape Length </b>: {shape_leng} <br>"
//
//				}
//			});
//
//			const footpath_slayer = new FeatureLayer({
//				url : window.FOOTPATH_FEATURE_LAYER,
//				visible : false,
//				title : "Footpath",
//				outFields : [ "*" ],
//				popupTemplate : {
//					title : "Footpath",
//					content : "<b>Object ID </b>: {objectid} <br> "
//							+ "<b>Id </b>: {id } <br> "
//							//+ "<b>Type of footpath </b>: {type_of_fo } <br>"
//							//+ "<b>Footpath_m </b>: {footpath_m } <br>"
//							//+ "<b>Remarks </b>: {remarks } <br>"
//							+ "<b>Footpath width </b>: {footpath_width} <br>"
//							+ "<b>Ward No </b>: {ward_no} <br>"
//							+ "<b>Ward Name </b>: {ward_name} <br>"
//							+ "<b>Zone No </b>: {zone_no } <br>"
//							+ "<b>Zone Name </b>: {zone_name } <br>"
//							+ "<b>Road Id </b>: {road_id } <br>"
//							//+ "<b>Shape Length </b>: {shape_leng } <br>"
//
//				}
//			});
//
//			const road_slayer = new FeatureLayer({
//				url : window.ROAD_FEATURE_LAYER,
//				visible : false,
//				title : "Road",
//				outFields : [ "*" ],
//				
//				popupTemplate : {
//					title : "Road",
//					content : "<b>Object ID </b>: {objectid} <br> "
//							+ "<b>Road Name </b>: {road_name} <br> "
//							+ "<b>Road Type </b>: {road_type} <br>"
//							+ "<b>Ward Name </b>: {ward_name} <br>"
//							+ "<b>Ward No </b>: {ward_no} <br>"
//							+ "<b>Zone Name </b>: {zone_name} <br>"
//							+ "<b>Zone No </b>: {zone_no} <br>"
//							+ "<b>Lane No </b>: {lane_no} <br>"
//							+ "<b>Lane Source </b>: {lane_sourc} <br>"
//							+ "<b>Lane Destination </b>: {lane_desti} <br>"
//							+ "<b>Footpath </b>: {footpath} <br>"
//							+ "<b>Divider </b>: {divider} <br>"
//							+ "<b>Culvert </b>: {culvert} <br>"
//							+ "<b>Road Length </b>: {road_lengt} <br>"
//							+ "<b>Lane Width </b>: {lane_width} <br>"
//							+ "<b>Divider Width </b>: {divider_wi} <br>"
//							+ "<b>Culvert Width </b>: {culvert_wi} <br>"
//							+ "<b>Footpath Width </b>: {footpath_w} <br>"
//							+ "<b>Road Width </b>: {road_width} <br>"
//							+ "<b>Cycle_trac </b>: {cycle_trac} <br>"
//							+ "<b>Type_of_su </b>: {type_of_su} <br>"
//							+ "<b>Year of construction </b>: {year_of_co} <br>"
//							+ "<b>No_of_spee </b>: {no_of_spee} <br>"
//							+ "<b>Traffic_si </b>: {traffic_si} <br>"
//							+ "<b>Railway_cr </b>: {railway_cr} <br>"
//							+ "<b>Railway_1 </b>: {railway__1} <br>"
//							+ "<b>Shape Length </b>: {shape_leng} <br>"
//							+ "<b>Shape_le_1 </b>: {shape_le_1} <br>"
//				}
//			});*/
//
//			
//			
//			/*const imc_slayer = new FeatureLayer(
//					{
//						url : window.IMC_BOUNDARY,
//						visible : true,
//						title : "IMC Boundary",
//						outFields : ["*"],
//					});
//			
//			const ward_slayer = new FeatureLayer(
//					{
//						url : window.WARD_BOUNDARY,
//						visible : true,
//						title : "Ward Boundary",
//						outFields : [ "*" ],
//						
//					});
//			
//			const zone_slayer = new FeatureLayer(
//					{
//						url : window.ZONE_BOUNDARY,
//						visible : true,
//						title : "Zone Boundary",
//						outFields : [ "*" ],
//						
//					});*/
//
//			/**
//			 * Tile Layers
//			 */
//			
//			const tiled_image_2015 = new TileLayer({
//				url : window.TILED_IMAGE_2015,
//				visible : true
//			});
//			
//			//2017
//	          var iscdl_sat_image_2017_1 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_1
//		          }); 
//	          
//	          var iscdl_sat_image_2017_2 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_2
//		          }); 
//	          
//	          var iscdl_sat_image_2017_3 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_3
//		          }); 
//	          
//	          var iscdl_sat_image_2017_4 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_4
//		          }); 
//	          
//	          var iscdl_sat_image_2017_5 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_5
//		          }); 
//	          
//	          var iscdl_sat_image_2017_6 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_6
//		          }); 
//	          
//	          var iscdl_sat_image_2017_7 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_7
//		          }); 
//	          
//	          var iscdl_sat_image_2017_8 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_8
//		          }); 
//	          
//	          var iscdl_sat_image_2017_9 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_9
//		          }); 
//	          
//	          var iscdl_sat_image_2017_10 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_10
//		          }); 
//	          
//	          var iscdl_sat_image_2017_11 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_11
//		          }); 
//	          
//	          var iscdl_sat_image_2017_12 = new TileLayer({  
//		            url:    window.ISCDL_SAT_IMAGE_2017_12
//		          }); 
//	          
//	         
//
//			const ortho_1 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_1,
//				visible : true
//			});
//
//			const ortho_2 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_2,
//				visible : true
//			});
//
//			const ortho_3 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_3,
//				visible : true
//			});
//
//			const ortho_4_1 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_4_1,
//				visible : true
//			});
//			
//			const ortho_4_2 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_4_2,
//				visible : true
//			});
//
//			
//			const ortho_5 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_5,
//				visible : true
//			});
//
//			const ortho_6 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_6,
//				visible : true
//			});
//
//			const ortho_7 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_7,
//				visible : true
//			});
//
//			const ortho_8 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_8,
//				visible : true
//			});
//
//			const ortho_9 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_9,
//				visible : true
//			});
//
//			const ortho_10 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_10,
//				visible : true
//			});
//
//			const ortho_11 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_11,
//				visible : true
//			});
//			const ortho_12 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_12,
//				visible : true
//			});
//
//			const ortho_13 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_13,
//				visible : true
//			});
//			
//			const ortho_14 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_14,
//				visible : true
//			});
//
//			const ortho_15 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_15,
//				visible : true
//			});
//			
//			const ortho_16 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_16,
//				visible : true
//			});
//			
//			const ortho_17 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_17,
//				visible : true
//			});
//			
//			const ortho_18 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_18,
//				visible : true
//			});
//			
//			const ortho_19 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_19,
//				visible : true
//			});
//			
//			const ortho_20 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_20,
//				visible : true
//			});
//			
//			const ortho_21 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_21,
//				visible : true
//			});
//			
//			const ortho_22 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_22,
//				visible : true
//			});
//			
//			const ortho_23 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_23,
//				visible : true
//			});
//			
//			const ortho_24 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_24,
//				visible : true
//			});
//			
//			const ortho_25 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_25,
//				visible : true
//			});
//			
//			const ortho_26 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_26,
//				visible : true
//			});
//			
//			const ortho_27 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_27,
//				visible : true
//			});
//			
//			const ortho_28 = new TileLayer({
//				url : window.POCKET_1_ORTHO_PART_28,
//				visible : true
//			});
//			
//			 var ortho_31 = new TileLayer({  
//		            url: window.POCKET_1_ORTHO_PART_31 
//		          });
//	          
//	          var ortho_32 = new TileLayer({  
//		            url: window.POCKET_1_ORTHO_PART_32  
//		          });
//		
//
//			const iscdl_r1 = new TileLayer({
//				  url: window.ISCDL_R1_TIFF,
//				  visible : true,
//				  title:"ISCDL R1"
//			});
//			
//			const iscdl_dem_srtm = new TileLayer({
//				  url: window.DEM_SRTM,
//				  visible : false,
//				  title:"ISCDL SRTM DEM"
//			});
//			
//			const iscdl_river_dem = new TileLayer({
//				  url: window.RIVER_DEM,
//				  visible : false,
//				  title:"ISCDL RIVER DEM"
//			});
//			
//			 var riverGroupLayer = new GroupLayer({
//		          title: "River Ortho Image",
//		          visible: false,
//		          //visibilityMode: "exclusive",
//		          layers: [iscdl_r1],
//		        });
//			
//			const river_contour = new FeatureLayer({
//				  url: window.ISCDL_RIVER_CONTOUR,
//				  visible : false,
//				  title:"River Contour",
//				  outFields : [ "*" ],
//			});
//			
//		
//
//			map = new Map({
//				basemap : "streets-navigation-vector",
//				//ground : "world-elevation",
//				
//				layers : [ lod3Models,lod1Models ]
//			});
//			map.ground.layers.add(pocket_12_terrian_dem);
//			//map.ground.layers.add(pocket_12_river_dem);
//			//map.ground.layers.add(pocket_12_abd_dem);
//			//map.ground.layers.add(pocket_12_srtm_dem);
//			
//
//			// initial extent
//			var initialExtent = new Extent(75.54699290771396,
//					22.63628705473749, 76.16840709228345, 22.80286225175135,
//					new SpatialReference({
//						wkid : 4326
//					}));
//
//			view = new SceneView({
//				container : "map",
//				map : map,
//				zoom : window.MAP_INITIAL_ZOOM,
//				constraints : {
//					minZoom: window.MAP_MIN_ZOOM,
//		        	maxZoom:window.MAP_MAX_ZOOM,
//				},
//				center : window.MAP_CENTER_POINT
//			});
//			
//			/**
//			 * -------- widget start -------
//			 */
//			// search
//			var search = new Search({
//				view : view,
//				includeDefaultSources: false,
//				locationEnabled : false,
//				   sources: [
//				     {
//				       locator: new Locator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
//				       singleLineFieldName: "SingleLine",
//				       outFields: ["Addr_type", "Match_addr", "StAddr", "City"],
//				       name: "ArcGIS World Geocoding Service",
//				       placeholder: 'Find address or place',
//				       resultSymbol: {
//				          type: "picture-marker", 
//				          url: this.basePath + "/images/search/search-symbol-32.png",
//				          size: 24,
//				          width: 24,
//				          height: 24,
//				          xoffset: 0,
//				          yoffset: 0
//				      },
//				       filter: {
//				    	   geometry : initialExtent
//				       }
//				     }
//				   ]
//			});
//
//			view.ui.add(search, "top-left");
//
//			/**
//			 * Create custom basemaps
//			 */
//			var orthoBasemap = new Basemap(
//					{
//						baseLayers : [ 
//							ortho_25,ortho_6,ortho_4_2,
//							ortho_26,ortho_24,
//							ortho_23,ortho_22,ortho_21,
//							ortho_20,ortho_19,ortho_18,ortho_17,
//							ortho_5,ortho_16,
//							ortho_14,ortho_12,
//							ortho_10,ortho_9,
//							ortho_8,ortho_7,
//							ortho_11,ortho_15,
//							ortho_27,ortho_28,
//							ortho_32,ortho_4_1,
//							ortho_3,ortho_2,ortho_1,
//							ortho_31
//							],
//						title : "ISCDL Drone Image 2020",
//						id : "Ortho Mosaic Basemap",
//						thumbnailUrl : "https://www.arcgis.com/sharing/rest/content/items/"
//								+ "86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/thumbnail1591224931210.jpeg"
//					});
//			
//			var image2015Basemap = new Basemap(
//					{
//						baseLayers : [ tiled_image_2015 ],
//						title : "ISCDL Satellite Image 2015",
//						id : "ISCDL Satellite Image 2015",
//						thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite_Image_2.png"
//					});
//			
//			var image2017Basemap = new Basemap(
//					{
//						baseLayers : [ iscdl_sat_image_2017_1,iscdl_sat_image_2017_2,iscdl_sat_image_2017_3,
//			        		  iscdl_sat_image_2017_4,iscdl_sat_image_2017_5,iscdl_sat_image_2017_6,
//			        		  iscdl_sat_image_2017_7,iscdl_sat_image_2017_8,iscdl_sat_image_2017_9,
//			        		  iscdl_sat_image_2017_10,iscdl_sat_image_2017_11,iscdl_sat_image_2017_12],
//						title : "ISCDL Satellite Image 2017",
//						id : "ISCDL Satellite Image 2017",
//						thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite_Image_2.png"
//					});
//			
//			
//			
//
//			var nightBasemap = Basemap.fromId("streets-night-vector");
//			var streetvectorBasemap = Basemap.fromId("streets-vector");
//			//var grayVectorBasemap = Basemap.fromId("gray-vector");
//			var streetsnavigationBasemap = Basemap
//					.fromId("streets-navigation-vector");
//			//var topovectorBasemap = Basemap.fromId("topo-vector");
//			//var terrainBasemap = Basemap.fromId("terrain");
//			//var darkgrayBasemap = Basemap.fromId("dark-gray-vector");
//			var geographicBasemap = Basemap.fromId("national-geographic");
//			//var grayBasemap = Basemap.fromId("gray");
//			var hybridBasemap = Basemap.fromId("hybrid");
//
//			var localSource = new LocalBasemapsSource({
//				//basemaps : [ orthoBasemap,image2015Basemap, image2017Basemap,nightBasemap, streetvectorBasemap,streetsnavigationBasemap,geographicBasemap,hybridBasemap ]
//				basemaps : [ streetvectorBasemap,streetsnavigationBasemap,hybridBasemap ]
//			});
//
//			// basemap gallery
//			const basemapGallery = new BasemapGallery({
//				view : view,
//				container : basemapGalleryDiv,
//				source : localSource
//			});
//
//			// layer list
//
//			var layerList = new LayerList({
//				view : view,
//				container : layersDiv
//			});
//
//			// locate
//
//			var locate = new Locate(
//					{
//						view : view,
//
//						useHeadingEnabled : false,
//						// container: "locateDiv",
//						goToOverride : function(view, options) {
//							options.target.scale = 1500; // Override the
//							// default map scale
//
//							let point = {
//								type : "point",
//								x : options.target.target.x,
//								y : options.target.target.y,
//								z : options.target.target.z
//							};
//
//							let mp = webMercatorUtils
//									.webMercatorToGeographic(point);
//
//							if (!initialExtent.contains(mp)) {
//								$u.notify('info','Notification',
//										'Current location is not within Indore boundary','');
//								return;
//							}
//
//							return view.goTo(options.target);
//						}
//					});
//
//			view.ui.add(locate, "top-left");
//
//			var lastX,lastY;
//			function viewFeatureInformation() {
//
//				/*viewPointMoveEvent = view.on("pointer-move", function(event) {
//					event.preventDefault();
//					
//					let ispopupEnabled = view.popup.visible;
//					if (ispopupEnabled == true) {
//						return;
//					}
//					setTimeout(function() {
//						if (lastX == event.x && lastY == event.y) {
//							window.map3dController.getFeatureInfo(event);
//						}
//					}, 4000);
//					lastX = event.x;
//					lastY = event.y;
//				});*/
//				viewPointClickEvent = view.on("click", function(event) {
//					window.map3dController.getFeatureInfo(event);
//				});
//			}
//
//			view.when(function() {
//				view.popup.autoOpenEnabled = false;
//			});
//			
//			view.when(function() {
//				$("#toggle_map_info").trigger('click');
//			});
//			
//			view.on("click", function(event) {
//				$("#coordinateDiv").show();
//				showElevationValue(event);
//			});
//			
//			 view.watch("updating", function (value) {
//				let zoom = view.zoom;
//				if(zoom < 11){
//					view.zoom = 11;
//				}else if(zoom > 18){
//					view.zoom = 18;
//				}
//			 });
//			
//
//			/**
//			 * -------- widget end -------
//			 */
//
//			// measurement
//			var activeWidget = null;
//
//			// draw
//
//			// create a new instance of draw
//			var draw = new Draw({
//				view : view
//			});
//
//			/**
//			 * ------ click events start -----
//			 */
//
//			// clear all graphic on map
//			$("#clearMap").click(function() {
//				view.graphics.removeAll();
//				if (highlight) {
//			        highlight.remove();
//			        highlight = null;
//				}
//				window.map3dController.clearMeasurements();
//				$('.esri-icon-measure-area').removeClass('active');
//				$('.esri-icon-measure-line').removeClass('active');
//			});
//
//			// default extent
//			$('#myHomeDiv').click(function() {
//				if (map != null || map != undefined) {
//					view.goTo(initialExtent);
//				}
//			});
//
//			$('.draw-tools-select li a').on('click', function() {
//
//				if(viewPointClickEvent){
//					viewPointClickEvent.remove();
//					//viewPointMoveEvent.remove();
//				}
//				
//				if(window.textClickEvent){
//					window.textClickEvent.remove();
//				}
//				
//				let tool_name = this.title.toUpperCase();
//
//				switch (tool_name) {
//				case "POLYGON":
//					window.map3dController.enableCreatePolygon();
//					break;
//				case "POINT":
//					window.map3dController.enableCreatePoint();
//					break;
//				case "POLYLINE":
//					window.map3dController.enableCreatePolyline();
//					break;
//				case "RECTANGLE" : 
//					window.map3dController.enableCreateRectangle();
//					break;
//				case "CIRCLE" : 
//					window.map3dController.enableCreateCircle();
//					break;
//				case "TEXT" :
//					window.map3dController.createTextGraphic();
//					break;
//				default:
//					break;
//				}
//				map_info_tool = false;
//				$("#toggle_map_info").trigger("click");
//				
//			});
//
//			// left panel click event
//
//			$('#leftPanel').click(function() {
//				
//				window.map3dController.removeCursor();
//				$("#form_feedback").trigger("reset");
//				$("#form_addData").trigger("reset");
//				$("#form_events").trigger("reset");
//			});
//			
//			$("ul[id*=downPanel] li").click(function () {
//				
//				let val = $(this).attr('title');
//				/**
//				 * for hiding old content of print
//				 */
//				if(val != "Print"){
//					document.getElementById("print_submit").innerHTML = "Print";
//	                document.getElementById("print_submit").style.display = 'block';
//	                document.getElementById("print_submit").disabled = false; 
//	                document.getElementById("printResult").style.display = 'none';
//				
//	                $('#form_print').trigger('reset');
//	                
//	                /**
//					 * hide printout option after again open
//					 */
//					let length = $( "#print_button div.esriPrint a").length;
//					if(length > 0){
//						$('.esriPrint a').remove(); 
//					}
//				}
//            });
//
//			/**
//			 * share click event
//			 */
//
//			$('#map_share').click(function() {
//				let did = localStorage.getItem('department_id');
//				if (did == null || did == "" || did == undefined) {
//					$("#map_share").attr("data-attr", "");
//					
//					$("#user_notification_content").find('p:first').remove();
//					$("#user_notification_content").find('p:first').remove();
//					$("#user_notification_content").prepend('<p data-translate="_unauthorized_user_text_popup">You are not an Authorized User !</p><p data-translate="_unauthorized_user_tool_popup"> In order to use this tool , Please register to our portal by clicking below</p>');
//				
//					if(localStorage.getItem('current_language') === "hindi"){
//						$("#pills-hindi-tab").trigger('click');
//					}
//					$("#user_notification").modal();
//					
//				} else{
//					window.map3dController.prepareShareLink();
//				}
//				
//			});
//
//			$("#kyp_clear").click(function() {
//				$('#kyp_result').html("");
//				view.graphics.removeAll();
//				view.goTo(initialExtent);
//			});
//
//			/**
//			 * FORM
//			 */
//
//			// custom scale-bar form
//			$('form[id="form_custom_scale"]').validate({
//				rules : {
//					scale_value : {
//						required : true,
//						numericVal : true,
//						min : 100,
//						max : 100000
//					}
//				},
//				messages : {
//					scale_value : {
//						required : "Please Select Scale Value",
//						numericVal : "Please Enter Numeric Value"
//					}
//				},
//				submitHandler : function(form, e) {
//					e.preventDefault();
//					try {
//						let scale_value = $("#scale_value").val();
//						if (scale_value) {
//							view.scale = scale_value;
//						}
//					} catch (e) {
//						$u.notify("error", "Error", "Something Happend Wrong");
//					}
//				}
//			});
//
//			$("#custom_scale_reset").click(function() {
//				window.depUtlityController.removeError('form_custom_scale');
//				view.goTo(initialExtent);
//			});
//			
//			
//			
//			// print form
//			$('form[id="form_print"]')
//			.validate(
//					{
//						rules : {
//							title_name : {
//								required : true,
//							},
//						},
//						messages : {
//							title_name : {
//								required : "Please Enter Title Name",
//							},
//						},
//						submitHandler : function(form, e) {
//							e.preventDefault();
//							
//							try {
//								$(".loader").fadeIn();
//								document.getElementById("print_submit").innerHTML = "Printing..."
//					            document.getElementById("print_submit").disabled = true;
//								
//								var printTask = new PrintTask({
//									   url: window.prefix_layer_url + "Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
//								});
//								
//								let _layout =     $("#print_layout_id").val();
//								let _format =     $("#print_format_id").val();
//								let _printTitle = $("#title_name").val();
//								
//								var template = new PrintTemplate({
//								 format: _format,
//								 exportOptions: {
//								   dpi: 300
//								 },
//								 layout: _layout,
//								 layoutOptions: {
//								   titleText: _printTitle,
//								 }
//								});
//	
//								var params = new PrintParameters({
//								 view: view,
//								 template: template
//								});
//	
//								printTask.execute(params).then(printResult, printError);
//							} catch (e) {
//								 $(".loader").fadeOut();
//								 document.getElementById("print_submit").disabled = false;
//				                 document.getElementById("print_submit").innerHTML = "Print";
//								 $u.notify("error", "Error","Something Happend Wrong");
//							}
//						}
//					});
//			
//			
//			
//			function printResult(evt){
//				$(".loader").fadeOut();
//				$('#form_print').trigger('reset');
//				 document.getElementById("print_submit").style.display = 'none';
//                 document.getElementById("printResult").href = evt.url;
//                 document.getElementById("printResult").style.display = 'block';
//                 on(dom.byId("printResult"), "click", function () {
//                     document.getElementById("print_submit").innerHTML = "Print";
//                     document.getElementById("print_submit").style.display = 'block';
//                     document.getElementById("print_submit").disabled = false; 
//                     document.getElementById("printResult").style.display = 'none';
//                     $('#form_print').trigger('reset');
//                 });
//				
//			}
//			
//			function printError(e){
//				$(".loader").fadeOut();
//				document.getElementById("print_submit").disabled = false;
//                document.getElementById("print_submit").innerHTML = "Print";
//				$u.notify("info", "Notification",e.message);
//			}
//			
//			$("#print_popup").click(function(){
//				window.depUtlityController.removeError('form_print');
//			});
//			
//
//			// query-form
//
//			$.validator.addMethod("dropDownValidation", function(value,
//					element, params) {
//				try {
//					return value == "" ? false : true;
//				} catch (e) {
//					return false
//				}
//			}, 'Please select ward');
//			
//			function showElevationValue(evt) {
//				let mapPoint = evt.mapPoint;
//				let x = mapPoint.longitude.toFixed(6);
//				let y = mapPoint.latitude.toFixed(6);
//				let z = mapPoint.z.toFixed(1);
//		        $("#coordinateDiv").text("Lat: "+y+" "+"Long: "+x+" "+"Elevation: "+z+ " m");
//		    }
//
//			var bookmarkList = [];
//
//			/**
//			 * COMMON FUNCTIONS
//			 */
//
//			let base = {
//
//				drawPreviewChange : function() {
//					// Multi-line
//					$("#multi_line_width").change(function() {
//						window.map3dController.changePreview("polyLineSvg", "stroke-width", $(this).val());
//					});
//
//					$("#multi_line_color").change(function() {
//						window.map3dController.changePreview("polyLineSvg", "stroke",$(this).val());
//					});
//
//					// polygon
//					$("#p_s_color").change(function() {
//						window.map3dController.changePreview("polygonSvg", "stroke", $(this).val());
//					});
//
//					$("#p_b_width").change(function() {
//						window.map3dController.changePreview("polygonSvg", "stroke-width", $(this).val());
//					});
//
//					$("#p_f_color").change(function() {
//						window.map3dController.changePreview("polygonSvg", "fill", $(this).val());
//					});
//					
//					// rectangle
//					$("#s_s_color").change(function() {
//						window.map3dController.changePreview("recatangleSvg", "stroke", $(this).val());
//					});
//
//					$("#s_b_width").change(function() {
//						window.map3dController.changePreview("recatangleSvg", "stroke-width", $(this).val());
//					});
//
//					$("#s_f_color").change(function() {
//						window.map3dController.changePreview("recatangleSvg", "fill", $(this).val());
//					});
//					
//					//circle
//					$("#c_s_color").change(function() {
//						window.map3dController.changePreview("circleSvg", "stroke", $(this).val());
//					});
//
//					$("#c_b_width").change(function() {
//						window.map3dController.changePreview("circleSvg", "stroke-width", $(this).val());
//					});
//
//					$("#c_f_color").change(function() {
//						window.map3dController.changePreview("circleSvg", "fill", $(this).val());
//					});
//				},
//				changePreview : function(svgId, key, value) {
//					$('#' + svgId).attr(key, value);
//				},
//				removeImageError : function(ipId, lblId) {
//					if ($('#' + ipId).val() != "") {
//						$('#' + ipId).removeClass('error');
//						$('#' + lblId).remove();
//						return;
//					}
//				},
//				removeCursor : function() {
//					if (mapClickEvtHandler != undefined) {
//						mapClickEvtHandler.remove();
//						view.cursor = "default";
//					}
//				},
//				showCoordinates : function(pt, lat_id, long_id) {
//					$('#' + lat_id).val(pt.latitude.toFixed(6));
//					$('#' + long_id).val(pt.longitude.toFixed(6));
//				},
//				removeLatLongError : function(ipId, lblId) {
//					$('#' + ipId).removeClass('error');
//					$('#' + lblId).remove();
//				},
//				clearCursor : function() {
//					// clear feedback cursor
//					$('#clear_feedback').click(function() {
//						window.map3dController.removeCursor();
//					});
//
//					// clear event cursor
//					$('#clear_event').click(function() {
//						window.map3dController.removeCursor();
//					});
//
//					// clear add-data cursor
//					$('#clear_add_data').click(function() {
//						window.map3dController.removeCursor();
//					});
//				},
//				onPopupClose : function() {
//					// close popup event
//					$(".layer-close").click(function() {
//						window.map3dController.removeCursor();
//						//window.map3dController.clearMeasurements();
//						
//						$('.esri-icon-measure-area').removeClass('active');
//						$('.esri-icon-measure-line').removeClass('active');
//						
//						document.getElementById("print_submit").innerHTML = "Print";
//		                document.getElementById("print_submit").style.display = 'block';
//		                document.getElementById("print_submit").disabled = false; 
//		                document.getElementById("printResult").style.display = 'none';
//		                
//		                $('#form_print').trigger('reset');
//						
//						/**
//						 * hide printout option after again open
//						 */
//						let length = $( "#print_button div.esriPrint a").length;
//						if(length > 0){
//							$('.esriPrint a').remove(); 
//						}
//					});
//				},
//				measurementEvents : function() {
//
//					$('#areaButton').click(function() {
//						map_info_tool = false;
//						$("#toggle_map_info").trigger("click");
//						
//						window.map3dController.setActiveWidget(null);
//
//						$('.esri-icon-measure-line').removeClass('active');
//						if (!this.classList.contains("active")) {
//							window.map3dController.setActiveWidget("area");
//						} else {
//							window.map3dController.setActiveButton(null);
//						}
//					});
//
//					$('#distanceButton').click(function() {
//						
//						map_info_tool = false;
//						$("#toggle_map_info").trigger("click");
//						
//						window.map3dController.setActiveWidget(null);
//						$('.esri-icon-measure-area').removeClass('active');
//						if (!this.classList.contains("active")) {
//							window.map3dController.setActiveWidget("distance");
//						} else {
//							window.map3dController.setActiveButton(null);
//						}
//					});
//
//					$('#clear').click(function() {
//						
//						map_info_tool = false;
//						$("#toggle_map_info").trigger("click");
//						
//						$('.esri-icon-measure-area').removeClass('active');
//						$('.esri-icon-measure-line').removeClass('active');
//						window.map3dController.clearMeasurements();
//					});
//				},
//				// measurement
//				setActiveWidget : function(type) {
//					switch (type) {
//					case "distance":
//						activeWidget = new DirectLineMeasurement3D({
//							view : view
//						});
//
//						// skip the initial 'new measurement' button
//						activeWidget.viewModel.newMeasurement();
//						
//						activeWidget.unitOptions = ["metric", "imperial", "inches", "feet", 
//							"yards", "miles", "meters", "kilometers"];
//						activeWidget.viewModel.unitOptions = ["metric", "imperial", "inches", 
//							"feet", "yards", "miles", "meters", "kilometers"];
//
//						view.ui.add(activeWidget, "top-right");
//						window.map3dController.setActiveButton(document
//								.getElementById("distanceButton"));
//						break;
//					case "area":
//						activeWidget = new AreaMeasurement3D({
//							view : view
//						});
//
//						// skip the initial 'new measurement' button
//						activeWidget.viewModel.newMeasurement();
//						
//						activeWidget.unitOptions = ["metric", "imperial", "square-inches", 
//							"square-feet", "square-yards", "square-miles", 
//							"square-meters", "square-kilometers", 
//							"acres", "ares", "hectares"];
//						activeWidget.viewModel.unitOptions = ["metric", "imperial", "square-inches", 
//							"square-feet", "square-yards", "square-miles", 
//							"square-meters", "square-kilometers", 
//							"acres", "ares", "hectares"];
//
//						view.ui.add(activeWidget, "top-right");
//						window.map3dController.setActiveButton(document
//								.getElementById("areaButton"));
//						break;
//					case null:
//						if (activeWidget) {
//							view.ui.remove(activeWidget);
//							activeWidget.destroy();
//							activeWidget = null;
//						}
//						window.map3dController.setActiveButton(null);
//						break;
//					}
//				},
//				setActiveButton : function(selectedButton) {
//					view.focus();
//					// var elements = document.getElementsByClassName("active");
//					/*
//					 * for (var i = 0; i < elements.length; i++) {
//					 * elements[i].classList.remove("active"); }
//					 */
//
//					if (selectedButton) {
//						selectedButton.classList.add("active");
//					}
//				},
//				clearMeasurements : function() {
//					window.map3dController.setActiveWidget(null);
//					window.map3dController.setActiveButton(null);
//				},
//				removeExtent : function() {
//					localStorage.removeItem("xmin");
//					localStorage.removeItem("ymin");
//					localStorage.removeItem("xmax");
//					localStorage.removeItem("ymax");
//					localStorage.removeItem("spatialReference");
//				},
//				enableCreatePolygon : function() {
//					view.graphics.removeAll();
//					const action = draw.create("polygon");
//					view.focus();
//					action.on([ "vertex-add", "vertex-remove", "cursor-update",
//							"redo", "undo", "draw-complete" ],
//							window.map3dController.createGraphic);
//				},
//				createGraphic : function(event) {
//
//					let vertices = event.vertices;
//					view.graphics.removeAll();
//					let stroke_color = $('#p_s_color').val();
//					let fill_color = $("#p_f_color").val();
//					let border_width = $("#p_b_width").val();
//
//					const graphic = new Graphic({
//						geometry : {
//							type : "polygon",
//							rings : vertices,
//							spatialReference : view.spatialReference
//						},
//						symbol : {
//							type : "simple-fill",
//							color : fill_color,
//							style : "solid",
//							outline : {
//								color : stroke_color,
//								width : border_width
//							}
//						}
//					});
//					
//					let r = graphic.symbol.color.r;
//					let g = graphic.symbol.color.g;
//					let b = graphic.symbol.color.b;
//					
//					graphic.symbol.color = [r,g,b,0.3]
//					view.graphics.add(graphic);
//					$('.draw-tools-select li a').removeClass('active');
//
//				},
//				enableCreatePoint : function() {
//					var action = draw.create("point");
//
//					action.on([ "vertex-add", "vertex-remove", "cursor-update",
//							"redo", "undo", "draw-complete" ],
//							window.map3dController.createPointGraphic);
//				},
//				createPointGraphic : function(evt) {
//
//					let coordinates = evt.coordinates;
//					view.graphics.removeAll();
//					var point = {
//						type : "point",
//						x : coordinates[0],
//						y : coordinates[1],
//						spatialReference : view.spatialReference
//					};
//
//					var graphic = new Graphic({
//						geometry : point,
//						symbol : {
//							type : "simple-marker",
//							style : "circle",
//							color : "red",
//							size : "8px",
//							outline : {
//								color : [ 255, 255, 0 ],
//								width : 1
//							}
//						}
//					});
//					view.graphics.add(graphic);
//					$('.draw-tools-select li a').removeClass('active');
//				},
//				enableCreatePolyline : function() {
//					var action = draw.create("polyline");
//
//					action.on([ "vertex-add", "vertex-remove", "cursor-update",
//							"redo", "undo", "draw-complete" ],
//							window.map3dController.createPolylineGraphic);
//				},
//				createPolylineGraphic : function(evt) {
//
//					let vertices = evt.vertices;
//					view.graphics.removeAll();
//					var polyline = {
//						type : "polyline",
//						paths : vertices,
//						spatialReference : view.spatialReference
//					};
//
//					let linecolor = $('#multi_line_color').val();
//					let line_width = $('#multi_line_width').val();
//
//					var graphic = new Graphic({
//						geometry : polyline,
//						symbol : {
//							type : "simple-line",
//							color : linecolor,
//							width : line_width,
//							cap : "round",
//							join : "round"
//						}
//					});
//					view.graphics.add(graphic);
//					$('.draw-tools-select li a').removeClass('active');
//				},
//				enableCreateRectangle : function(){
//						let type = "rectangle";
//						window.map3dController.drawRectCirGraphics(type);
//				},
//				enableCreateCircle : function(){
//					let type = "circle";
//					window.map3dController.drawRectCirGraphics(type);
//				},
//				drawRectCirGraphics : function(type){
//						view.graphics.removeAll();
//						let drawGraphicsLayer = new GraphicsLayer();
//						let rectangleSketch = new SketchViewModel({
//			              view: view,
//			              layer: drawGraphicsLayer
//			            });
//	            
//			            rectangleSketch.create(type);
//			            rectangleSketch.on("create", function (event) {
//				          if (event.state === "complete") {
//				        	  view.graphics.removeAll();
//				        	  let graphic = event.graphic;
//	
//				        	  let outline_color = "";
//							  let fill_color = "";
//							  let border_width = "";
//				        	  
//				        	  if(type == 'rectangle'){
//				        		  outline_color = $('#s_s_color').val();
//								  fill_color = $("#s_f_color").val();
//								  border_width = $("#s_b_width").val() + "px";
//				        	  }else if(type == 'circle'){
//				        		  outline_color = $('#c_s_color').val();
//								  fill_color = $("#c_f_color").val();
//								  border_width = $("#c_b_width").val() + "px";
//				        	  }
//				        	  graphic.symbol = {
//			        			  type: "simple-fill",
//					              color: fill_color,
//					              size: border_width,
//					              outline: {
//					                  color: outline_color,
//					                  width: border_width
//					              }
//							  }
//				        	  
//				        	  
//				        	let r = graphic.symbol.color.r;
//							let g = graphic.symbol.color.g;
//							let b = graphic.symbol.color.b;
//							graphic.symbol.color = [r,g,b,0.3]
//				        	view.graphics.add(graphic);
//							$('.draw-tools-select li a').removeClass('active');
//				          }
//				    });
//				},
//				createTextGraphic : function createTextGraphic(evt) {
//					let graphicSymbol;
//					view.graphics.removeAll();
//
//					window.textClickEvent = view.on("click", function(event) {
//						
//						let txt_value = $("#tool_text").val();
//						
//						if(txt_value == ""){
//							$u.notify('warning', 'Warning',
//									'Please enter the text value', '');
//							return;
//						}
//						
//						let p = {
//								type : 'point',
//								x:event.mapPoint.longitude,
//								y: event.mapPoint.latitude
//						};
//						
//						var textSymbol = {
//								type : "text",
//								color : "black",
//								text : "",
//								xoffset : 3,
//								yoffset : 3,
//								font : { 
//									size : 12,
//									family : "Josefin Slab",
//									weight : "bold"
//								}
//							};
//						
//						
//						let font_color = $("#tool_fontcolor").val();
//						let font_size  =  $("#tool_fontsize").val();
//
//						graphicSymbol = textSymbol;
//						graphicSymbol.text = txt_value;
//						graphicSymbol.color = font_color;
//						graphicSymbol.font.size = font_size;
//
//						let g = new Graphic({
//							geometry : p,
//							symbol : graphicSymbol
//						});
//						view.graphics.add(g);
//						$("#tool_text").val("");
//						$('.draw-tools-select li a').removeClass('active');
//						$("#lblDrawTxt").text("");
//						if(window.textClickEvent){
//							window.textClickEvent.remove();	
//						}
//					});
//				},
//				prepareShareLink : function() {
//					$('#sharelinktxt').val("");
//					localStorage.setItem("xmin", view.extent.xmin);
//					localStorage.setItem("ymin", view.extent.ymin);
//					localStorage.setItem("xmax", view.extent.xmax);
//					localStorage.setItem("ymax", view.extent.ymax);
//					localStorage.setItem("spatialReference",
//							view.extent.spatialReference.wkid);
//					let browserUrl = document.location.href;
//					let finalurl = browserUrl
//					$('#sharelinktxt').val(finalurl);
//				},
//				getBookMarkList : function getBookMarkList(user_id) {
//
//					let view_type = window.depUtlityController.getViewType();
//
//					let bookmarkObj = {
//						"user_id" : user_id,
//						"type" : view_type
//					}
//
//					let postData = JSON.stringify(bookmarkObj);
//
//					let token_val = localStorage.getItem('token');
//
//					if (token_val == "" || token_val == undefined
//							|| token_val == null) {
//						$u.notify('info', 'Notification',
//								'You are not authorized user', '');
//						return;
//					}
//
//					$.ajax({
//								method : 'POST',
//								url : window.iscdl.appData.baseURL
//										+ "api/bookmark/getBookmarkList",
//								async : false,
//								data : postData,
//								contentType : 'application/json',
//								beforeSend : function(request) {
//									request.setRequestHeader('Authorization',
//											'Bearer '
//													+ localStorage
//															.getItem('token'));
//								},
//								success : function(result) {
//
//									if (!$.isEmptyObject(result)
//											&& result != null) {
//										try {
//											result = JSON.parse(result);
//
//											if (result.responseCode == '200') {
//												let bookamarks = result.data;
//												$('#bookmark-data').html("");
//
//												for ( let i in bookamarks) {
//													let id = bookamarks[i].id;
//													let title = bookamarks[i].title;
//													let xmax = bookamarks[i].xmax;
//													let xmin = bookamarks[i].xmin;
//													let ymax = bookamarks[i].ymax;
//													let ymin = bookamarks[i].ymin;
//													let wkid = bookamarks[i].wkid;
//
//													window.map3dController
//															.prepareBookmarkListForLoginUser(
//																	id, title,
//																	xmax, xmin,
//																	ymax, ymin,
//																	wkid);
//												}
//											} else {
//												$u.notify('error',
//														'Notification',
//														result.responseMessage,
//														'');
//											}
//										} catch (err) {
//											console.log(err);
//										}
//									} else {
//										$u.notify('error', 'Notification',
//												'Something happens wrong', '');
//									}
//								},
//								error : function(e) {
//									console.log(e);
//								}
//							});
//				},
//				setBookmarkInfo : function setBookmarkInfo() {
//					let user_id = localStorage.getItem('user_data');
//					let bookmark_name = $("#bookmark_name").val().trim();
//					if (bookmark_name == undefined || bookmark_name == null
//							|| bookmark_name == "") {
//						$u.notify('info', 'Notification',
//								'Please enter bookmark title', '');
//						return;
//					}
//
//					let xmin = view.extent.xmin;
//					let ymin = view.extent.ymin;
//					let xmax = view.extent.xmax;
//					let ymax = view.extent.ymax;
//					let srs = view.extent.spatialReference.wkid;
//
//					if (user_id != undefined && user_id != null
//							&& user_id != "") {
//						window.map3dController.addBookmark(bookmark_name,
//								user_id, xmin, ymin, xmax, ymax, srs);
//					} else {
//
//						if (bookmarkList.includes(bookmark_name.trim())) {
//							$u.notify('info', 'Notification',
//									'Bookmark with title '
//											+ bookmark_name.trim()
//											+ ' already exists.', '');
//							return;
//						} else {
//							window.map3dController
//									.prepareBookmarkListForCitizenUser(
//											bookmark_name, xmax, xmin, ymax,
//											ymin, srs);
//							bookmarkList.push(bookmark_name.trim());
//						}
//					}
//					$("#bookmark_name").val("");
//				},
//				addBookmark : function addBookmark(bookmark_name, user_id,
//						xmin, ymin, xmax, ymax, srs) {
//					let result;
//
//					let view_type = window.depUtlityController.getViewType();
//
//					let bookmarkObj = {
//
//						"title" : bookmark_name,
//						"user_id" : user_id,
//						"xmax" : xmax,
//						"xmin" : xmin,
//						"ymax" : ymax,
//						"ymin" : ymin,
//						"wkid" : srs,
//						"type" : view_type
//					}
//
//					let postData = JSON.stringify(bookmarkObj);
//
//					let token_val = localStorage.getItem('token');
//
//					if (token_val == "" || token_val == undefined
//							|| token_val == null) {
//						$u.notify('info', 'Notification',
//								'You are not authorized user', '');
//						return;
//					}
//					$(".loader").fadeIn();
//
//					$.ajax({
//								method : 'POST',
//								url : window.iscdl.appData.baseURL
//										+ "api/bookmark/addOrUpdateBookmark",
//								async : false,
//								data : postData,
//								contentType : 'application/json',
//								beforeSend : function(request) {
//									request.setRequestHeader('Authorization',
//											'Bearer '
//													+ localStorage
//															.getItem('token'));
//								},
//								success : function(result) {
//
//									$(".loader").fadeOut();
//
//									if (!$.isEmptyObject(result)
//											&& result != null) {
//										try {
//											result = JSON.parse(result);
//											if (result.responseCode == '200') {
//
//												$u.notify('success', 'Success',
//														result.responseMessage,
//														'');
//
//												window.map3dController
//														.prepareBookmarkListForLoginUser(
//																"",
//																bookmark_name,
//																xmax, xmin,
//																ymax, ymin, srs);
//
//												let user_id = localStorage
//														.getItem('user_data');
//
//												if (user_id != undefined
//														&& user_id != null
//														&& user_id != "") {
//													window.map3dController
//															.getBookMarkList(user_id);
//												}
//											} else {
//												$u.notify('error',
//														'Notification',
//														result.responseMessage,
//														'');
//											}
//										} catch (err) {
//											$(".loader").fadeOut();
//											console.log(err);
//										}
//									} else {
//										$(".loader").fadeOut();
//										$u.notify('error', 'Notification',
//												'Error while adding bookmark',
//												'');
//									}
//								},
//								error : function(e) {
//									$(".loader").fadeOut();
//									console.log(e);
//									let response = JSON.parse(e.responseText);
//									if (response.responseCode == 403) {
//										$u.notify("info", "Notification",
//												response.responseMessage);
//									} else if (response.responseCode == 401) {
//										$u.notify("info", "Notification",
//												response.responseMessage);
//									}
//								}
//							});
//
//				},
//				deleteLoginUserBookmarks : function deleteLoginUserBookmarks(
//						bookmarkIds) {
//
//					let bookmarkObj = {
//						"delete_id" : bookmarkIds,
//					}
//
//					let postData = JSON.stringify(bookmarkObj);
//
//					let token_val = localStorage.getItem('token');
//
//					if (token_val == "" || token_val == undefined
//							|| token_val == null) {
//						$u.notify('info', 'Notification',
//								'You are not authorized user', '');
//						return;
//					}
//
//					$.ajax({
//						method : 'POST',
//						url : window.iscdl.appData.baseURL
//								+ "api/bookmark/deleteBookmark",
//						async : false,
//						data : postData,
//						contentType : 'application/json',
//						beforeSend : function(request) {
//							request.setRequestHeader('Authorization', 'Bearer '
//									+ localStorage.getItem('token'));
//						},
//						success : function(result) {
//
//							if (!$.isEmptyObject(result) && result != null) {
//								try {
//									result = JSON.parse(result);
//
//									if (result.responseCode == '200') {
//
//										$u.notify('success', 'Success',
//												result.responseMessage, '');
//
//										let user_id = localStorage
//												.getItem('user_data');
//
//										if (user_id != undefined
//												&& user_id != null
//												&& user_id != "") {
//											window.map3dController
//													.getBookMarkList(user_id);
//										}
//									} else {
//										$u.notify('error', 'Notification',
//												result.responseMessage, '');
//									}
//								} catch (err) {
//									console.log(err);
//								}
//							} else {
//								$u.notify('error', 'Notification',
//										'Something happens wrong', '');
//							}
//						},
//						error : function(e) {
//							console.log(e);
//						}
//					});
//
//				},
//				deleteCitizenBookmarks : function deleteCitizenBookmarks() {
//
//					let idx = 0;
//					let bookmarkIds = "";
//					let length = $('input[name="citiBookmarkNames"]:checked').length;
//
//					if (length == 0) {
//						$u.notify('info', 'Notification',
//								'Please select any bookmark', '');
//						return;
//					}
//
//					$('input[name="citiBookmarkNames"]:checked').each(
//							function() {
//								if (idx == (length - 1)) {
//									bookmarkIds += this.value;
//								} else {
//									bookmarkIds += this.value + ",";
//								}
//								idx++;
//							});
//
//					let strarray = bookmarkIds.split(',');
//
//					for ( let a in strarray) {
//						let id = strarray[a];
//						$("#" + id).remove();
//						bookmarkList.pop(id.trim());
//					}
//					$("#bookmark_name").val("");
//
//				},
//				prepareBookmarkListForLoginUser : function prepareBookmarkListForLoginUser(
//						bookmark_id, bookmark_name, xmax, xmin, ymax, ymin, srs) {
//
//					$('#bookmark-data')
//							.append(
//									"<div class='main-book-val' id="
//											+ bookmark_id
//											+ "><input type='checkbox' data-bookmark = "
//											+ bookmark_id
//											+ " value ="
//											+ bookmark_name
//											+ " "
//											+ "name='bookmarkNames' "
//											+ "class='form-control main-book-in'>"
//											+ "<img src='images/icons/Bookmark-72.svg' class='main-book-img' data-xmax='"
//											+ xmax
//											+ "' data-xmin='"
//											+ xmin
//											+ "' data-ymax='"
//											+ ymax
//											+ "' "
//											+ "data-ymin='"
//											+ ymin
//											+ "' data-srs='"
//											+ srs
//											+ "' onclick='window.map3dController.zoomToBookmark(this)'>"
//											+ "<div class='bookmark-val' id='mine' title="
//											+ bookmark_name + ">"
//											+ bookmark_name + "</div></div>");
//				},
//				prepareBookmarkListForCitizenUser : function prepareBookmarkListForCitizenUser(
//						bookmark_name, xmax, xmin, ymax, ymin, srs) {
//					$('#bookmark-data')
//							.append(
//									"<div class='main-book-val' id="
//											+ bookmark_name
//											+ "><input type='checkbox' value ="
//											+ bookmark_name
//											+ " name='citiBookmarkNames' "
//											+ "class='form-control main-book-in'>"
//											+ "<img src='images/icons/Bookmark-72.svg' class='main-book-img' data-xmax='"
//											+ xmax
//											+ "' data-xmin='"
//											+ xmin
//											+ "' data-ymax='"
//											+ ymax
//											+ "' "
//											+ "data-ymin='"
//											+ ymin
//											+ "' data-srs='"
//											+ srs
//											+ "' onclick='window.map3dController.zoomToBookmark(this)'>"
//											+ "<div class='bookmark-val' id='mine' title="
//											+ bookmark_name + ">"
//											+ bookmark_name + "</div></div>");
//				},
//				getSelectedBookmarkIds : function getSelectedBookmarkIds() {
//
//					let bookmarkIds = "";
//					let idx = 0;
//
//					let length = $('input[name="bookmarkNames"]:checked').length;
//
//					if (length == 0) {
//						$u.notify('info', 'Notification',
//								'Please select any bookmark', '');
//						return;
//					}
//
//					$('input[name="bookmarkNames"]:checked').each(function() {
//
//						let bookmark_id = $(this).data("bookmark");
//
//						if (idx == (length - 1)) {
//							bookmarkIds += bookmark_id;
//						} else {
//							bookmarkIds += bookmark_id + ",";
//						}
//						idx++;
//					});
//
//					return bookmarkIds;
//
//				},
//				zoomToBookmark : function zoomToBookmark(data) {
//					let xmin = $(data).data("xmin");
//					let xmax = $(data).data("xmax");
//					let ymin = $(data).data("ymin");
//					let ymax = $(data).data("ymax");
//					let wkid = $(data).data("srs");
//					let bookmarkExtent = new Extent(xmin, ymin, xmax, ymax,
//							new SpatialReference({
//								wkid : wkid
//							}));
//					view.goTo(bookmarkExtent);
//				},
//				getFeatureInfo : function getFeatureInfo(event) {
//					view.graphics.removeAll();
//					
//					view.hitTest(event)
//							.then(function(response) {
//										let result = response.results;
//										if (result.length > 0) {
//											let content = '<table style="width: 100%!important;border: 1px solid #dee2e6;">' +
//											'<tbody>';
//												let graphic = result[0].graphic;
//												 if (highlight) {
//												        highlight.remove();
//												        highlight = null;
//												 }
//											     view.whenLayerView(graphic.layer).then((layerView) => {
//											        highlight = layerView.highlight(graphic);
//											     });
//												let mapPoint = result[0].mapPoint;
//												let attributes = graphic.attributes;
//												let length = Object.keys(attributes).length;
//												let table_content = "";
//												for (let a = 0; a < length; a++) {
//													let key = Object
//															.keys(attributes)[a];
//													let attr = graphic.attributes[key];
//
//													if (attr == null
//															|| attr == ""
//															|| attr == "null") {
//														attr = "";
//													}
//													
//													
//													if(key == "objectid" || key == "objectid_1"){
//														continue;
//													}
//													
//													if(key == "st_area(shape)"){
//														key = "area[m.sq]";
//													}
//													
//													if(key == "st_length(shape)"){
//														key = "length[m]";
//													}
//													
//													let columnName = window.map3dController.getFeatureColumnName(key);
//													
//													if(columnName == 'Globalid'){
//														continue;
//													}
//													
//													if(columnName == 'Building Height Meters'){
//														columnName = 'Building Height [ Meter ]';
//													}
//													
//													if(columnName == 'Height In Meter'){
//														columnName = 'Height [ Meter ]';
//													}
//													
//													content += '<tr><td style="border: 1px solid #dee2e6;padding: 8px;">' +
//														'<b>'+columnName+'</b></td>' +
//														'<td style="border: 1px solid #dee2e6;padding: 8px;">'+attr+'</td></tr>';
//												}
//												let info_template_content = content + '</tbody></table>';
//												
//												let layer_name = graphic.layer.title;
//												graphic.symbol = {
//											            type: "simple-fill",
//											            style: "none",
//											            outline: {
//											              color: [0,255,255],
//											              width: 2
//											            }
//											   }
//												
//												view.graphics.add(graphic);
//												
//												let x = mapPoint.x;
//												let y = mapPoint.y;
//												var point = {
//													type : "point",
//													x : x,
//													y : y
//												};
//												
//												let mp = webMercatorUtils.webMercatorToGeographic(point);
//												view.popup.open({});
//												view.popup.title = layer_name;
//												view.popup.content = info_template_content;
//												view.popup.location = {
//													latitude : mp.y,
//													longitude : mp.x
//												};
//										} else {
//											view.popup.title = "";
//											view.popup.content = "";
//											view.popup.close();
//										}
//									});
//				},
//				getFeatureColumnName : function getFeatureColumnName(str) {
//		        	  var i, columnName = str.split('_');
//		        	  for (i=0; i<columnName.length; i++) {
//		        		  columnName[i] = columnName[i].charAt(0).toUpperCase() + columnName[i].slice(1);
//		        	  }
//		        	  return columnName.join(' ');
//		        	},
//		        	zoomToRectangleBox : function(){
//		        		rectangleGraphicsLayer = new GraphicsLayer();
//			            map.add(rectangleGraphicsLayer);
//			            
//				            let rectangleSketchViewModel = new SketchViewModel({
//				              view: view,
//				              layer: rectangleGraphicsLayer,
//				              pointSymbol: {
//				                type: "simple-marker",
//				                color: [255, 255, 255, 0.5],
//				                size: "1px",
//				                outline: {
//				                  color: "gray",
//				                  width: 0
//				                }
//				              }
//				            });
//			            
//				            rectangleSketchViewModel.create("rectangle");
//				            rectangleSketchViewModel.on("create", function (event) {
//					          if (event.state === "complete") {
//					        	  rectangleGraphicsLayer.remove(event.graphic);
//					        	  map.remove(rectangleGraphicsLayer);
//					        	  
//					        	  let graphic = event.graphic;
//					        	  let geom = graphic.geometry;
//					        	  let extent = geom.extent;
//					        	  let xmax = extent.xmax;
//					        	  let ymax = extent.ymax;
//					        	  let xmin = extent.xmin;
//					        	  let ymin = extent.ymin;
//					        	  let srs = extent.spatialReference.wkid;
//					        	  
//					        	  if((xmin != "NaN" && xmin != null && xmin != undefined) && 
//			           				(ymin != "NaN" && ymin != null && ymin != undefined) &&
//			           				(xmax != "NaN" && xmax != null && xmax != undefined) && 
//			           				(ymax != "NaN" && ymax != null && ymax != undefined)){
//					        		  
//					        		  let maxp = {type : "point",x : xmax,y : ymax};
//						        	  let minp = {type : "point",x : xmin,y : ymin};
//						        	  let minmp = webMercatorUtils.webMercatorToGeographic(minp);
//						        	  let maxmp = webMercatorUtils.webMercatorToGeographic(maxp);
//						        	  
//						        	  let boxZoomExtent = new Extent(minmp.x,minmp.y, maxmp.x, maxmp.y,new SpatialReference({
//						  						wkid : 4326
//						  			  }));
//						        	  
//						        	  if(boxZoomExtent != undefined || boxZoomExtent != null){
//						        		  view.goTo(boxZoomExtent);
//						        		  $('#zoomBoxMap'). prop('title', 'Enable Box Zoom');
//			           					  $('#zoomBoxMap'). css('opacity', '0.5');
//			           					  zoom_box_tool = false;
//						        	  }
//					        	  }
//					          }
//					    });
//		        	},
//		        	zoomOutToRectangleBox : function(){
//
//		        		rectangleGraphicsLayer = new GraphicsLayer();
//			            map.add(rectangleGraphicsLayer);
//			            
//				            let rectangleSketchViewModel1 = new SketchViewModel({
//				              view: view,
//				              layer: rectangleGraphicsLayer,
//				              pointSymbol: {
//				                type: "simple-marker",
//				                color: [255, 255, 255, 0.5],
//				                size: "1px",
//				                outline: {
//				                  color: "gray",
//				                  width: 0
//				                }
//				              }
//				            });
//			            
//				            rectangleSketchViewModel1.create("rectangle");
//				            rectangleSketchViewModel1.on("create", function (event) {
//					          if (event.state === "complete") {
//					        	  rectangleGraphicsLayer.remove(event.graphic);
//					        	  map.remove(rectangleGraphicsLayer);
//					        	  
//					        	  let graphic = event.graphic;
//					        	  let geom = graphic.geometry;
//					        	  let extent = geom.extent;
//					        	  let xmax = extent.xmax;
//					        	  let ymax = extent.ymax;
//					        	  let xmin = extent.xmin;
//					        	  let ymin = extent.ymin;
//					        	  let srs = extent.spatialReference.wkid;
//					        	  
//					        	  if((xmin != "NaN" && xmin != null && xmin != undefined) && 
//			           				(ymin != "NaN" && ymin != null && ymin != undefined) &&
//			           				(xmax != "NaN" && xmax != null && xmax != undefined) && 
//			           				(ymax != "NaN" && ymax != null && ymax != undefined)){
//					        		  
//					        		  let maxp = {type : "point",x : xmax,y : ymax};
//						        	  let minp = {type : "point",x : xmin,y : ymin};
//						        	  let minmp = webMercatorUtils.webMercatorToGeographic(minp);
//						        	  let maxmp = webMercatorUtils.webMercatorToGeographic(maxp);
//						        	  
//						        	  let drawminx = minmp.x;
//			           				  let drawminy = minmp.y;
//			           				  let drawmaxx = maxmp.x;
//			           			      let drawmaxy = maxmp.y;
//						        	  
//						        	  let current_minx = view.extent.xmin;
//			           				  let current_miny = view.extent.ymin;
//			           				  let current_maxx = view.extent.xmax;
//			           				  let current_maxy = view.extent.ymax;
//			           				  
//			           				  
//			           				  let cmaxp = {type : "point",x : current_maxx,y : current_maxy};
//						        	  let cminp = {type : "point",x : current_minx,y : current_miny};
//						        	  let cminmp = webMercatorUtils.webMercatorToGeographic(cminp);
//						        	  let cmaxmp = webMercatorUtils.webMercatorToGeographic(cmaxp);
//			           				  
//						        	  
//			           				  let diff_minx = cminmp.x - drawminx;
//			           				  let diff_miny = cminmp.y - drawminy;
//			           				  let diff_maxx = cmaxmp.x - drawmaxx;
//			           				  let diff_maxy = cmaxmp.y - drawmaxy;
//		           					
//			           				  let zoomout_minx = cminmp.x + diff_minx;
//			           				  let zoomout_miny = cminmp.y + diff_miny;
//			           				  let zoomout_maxx = cmaxmp.x + diff_maxx;
//			           				  let zoomout_maxy = cmaxmp.y + diff_maxy;
//						        	  
//						        	  let boxZoomExtent = new Extent(zoomout_minx,zoomout_miny, zoomout_maxx, zoomout_maxy,
//						        			  new SpatialReference({wkid : 4326
//						        	  }));
//						        	  
//						        	  if(boxZoomExtent != undefined || boxZoomExtent != null){
//						        		  view.goTo(boxZoomExtent);
//						        		  $('#zoomOutBoxMap'). prop('title', 'Enable Box Zoom Out');
//			           					  $('#zoomOutBoxMap'). css('opacity', '0.5');
//			           					  zoom_out_box_tool = false;
//						        	  }
//					        	  }
//					          }
//					    });
//		        	
//		        	}
//			}
//
//			window.map3dController = base;
//
//			/**
//			 * READY FUNCTION
//			 */
//
//			$(document)
//					.ready(
//							function() {
//								$(".loader").fadeOut();
//
//								let token = localStorage.getItem("token");
//								if (token !== undefined && token !== null) {
//									$(".logout-link").css('display', 'flex');
//									$(".drop-down-main").css('display', 'flex');
//									$(".user-info").text(
//											JSON.parse(localStorage
//													.getItem("user")).userName);
//								}else{
//									$(".user-info").text("Guest");
//									$("#city_logo").attr("href", window.location.origin + window.iscdl.appData.webURLPrefix + "login.jsp");
//								}
//								$(".user-manual-ctbtn").css('display','flex');
//								$(".user-manual-dpbtn").css('display','none');
//								
//								$("#citizen-logout-btn").click(function() {
//									window.depUtlityController.userLogout();
//								});
//
//								/**
//								 * get book-mark list
//								 */
//
//								let user_id = localStorage.getItem('user_data');
//
//								if (user_id != undefined && user_id != null
//										&& user_id != "") {
//
//									window.map3dController
//											.getBookMarkList(user_id);
//								}
//
//								/**
//								 * add book-mark click event
//								 * 
//								 */
//
//								$("#add-bookmark").click(function() {
//									window.map3dController.setBookmarkInfo();
//								});
//
//								/**
//								 * delete bookmark click event
//								 */
//								$("#delete-bookmark")
//										.click(
//												function() {
//
//													let user_id = localStorage
//															.getItem('user_data');
//
//													if (user_id != undefined
//															&& user_id != null
//															&& user_id != "") {
//
//														let bookmarkIds = window.map3dController
//																.getSelectedBookmarkIds();
//
//														if (bookmarkIds != undefined
//																&& bookmarkIds != null
//																&& bookmarkIds != "") {
//															window.map3dController
//																	.deleteLoginUserBookmarks(bookmarkIds);
//														}
//													} else {
//														window.map3dController
//																.deleteCitizenBookmarks();
//													}
//												});
//
//								// CHECK IF ZOOM LEVEL IS AVAILABLE OR NOT FROM
//								// SHARE URL
//								let shareParams = new URLSearchParams(
//										window.location.search);
//								let shareFlag = false;
//								if (shareParams.has('xmin')) {
//									localStorage.setItem("xmin", shareParams
//											.get('xmin'));
//									shareFlag = true;
//								}
//								if (shareParams.has('ymin')) {
//									localStorage.setItem("ymin", shareParams
//											.get('ymin'));
//									shareFlag = true;
//								}
//								if (shareParams.has('xmax')) {
//									localStorage.setItem("xmax", shareParams
//											.get('xmax'));
//									shareFlag = true;
//								}
//								if (shareParams.has('ymax')) {
//									localStorage.setItem("ymax", shareParams
//											.get('ymax'));
//									shareFlag = true;
//								}
//								if (shareParams.has('wkid')) {
//									localStorage.setItem("spatialReference",
//											shareParams.get('wkid'));
//									shareFlag = true;
//								}
//
//								// UPDATE WINDOW URL IF PAGE OPENED FROM SHARE
//								// URL
//								if (shareFlag) {
//									window.location
//											.replace(window.location.origin
//													+ window.location.pathname);
//								}
//
//								let xmin = localStorage.getItem("xmin");
//								let ymin = localStorage.getItem("ymin");
//								let xmax = localStorage.getItem("xmax");
//								let ymax = localStorage.getItem("ymax");
//								let srs = localStorage
//										.getItem("spatialReference");
//
//								if ((xmin != null && xmin != undefined)
//										&& (ymin != null && ymin != undefined)
//										&& (xmax != null && xmax != undefined)
//										&& (ymax != null && ymax != undefined)
//										&& (srs != null && srs != undefined)) {
//									var startExtent = new Extent(xmin, ymin,
//											xmax, ymax, new SpatialReference({
//												wkid : srs
//											}));
//									view.goTo(startExtent);
//								}
//
//								// window.map3dController.removeExtent();
//							});
//
//			/**
//			 * Map Info Click event
//			 */
//			$("#toggle_map_info").click(function() {
//				
//				if (map_info_tool) {
//					
//					if(window.textClickEvent){
//						window.textClickEvent.remove();
//						$('.draw-tools-select li a').removeClass('active');
//					}
//					
//					map_info_tool = false;
//					$('#mapInfoTool').prop('title', 'Disable Map Info');
//					$('#mapInfoTool').css('opacity', '1.0');
//					viewFeatureInformation();
//					
//				} else {
//					map_info_tool = true;
//					$('#mapInfoTool').prop('title', 'Enable Map Info');
//					$('#mapInfoTool').css('opacity', '0.5');
//					if (viewPointClickEvent) {
//						//viewPointMoveEvent.remove();
//						viewPointClickEvent.remove();
//					}
//					view.popup.title = "";
//					view.popup.content = "";
//					view.popup.close();
//				}
//			});
//			
//			$("#box_zoom_map").click(function(){
//				
//				
//				if(zoom_box_tool){
//					zoom_box_tool = false;
//					$('#zoomBoxMap'). prop('title', 'Enable Box Zoom In');
//					$('#zoomBoxMap'). css('opacity', '0.5');
//					
//				}else{
//					zoom_box_tool = true;
//					$('#zoomBoxMap'). prop('title', 'Disable Box Zoom In');
//					$('#zoomBoxMap'). css('opacity', '1.0');
//					
//					if (viewPointClickEvent) {
//						//viewPointMoveEvent.remove();
//						viewPointClickEvent.remove();
//					}
//		            window.map3dController.zoomToRectangleBox();
//				}
//			});
//			
//			$("#box_zoom_out_map").click(function(){
//				
//				if(zoom_out_box_tool){
//					zoom_out_box_tool = false;
//					$('#zoomOutBoxMap'). prop('title', 'Enable Box Zoom Out');
//					$('#zoomOutBoxMap'). css('opacity', '0.5');
//					
//				}else{
//					zoom_out_box_tool = true;
//					$('#zoomOutBoxMap'). prop('title', 'Disable Box Zoom Out');
//					$('#zoomOutBoxMap'). css('opacity', '1.0');
//					
//					if (viewPointClickEvent) {
//						//viewPointMoveEvent.remove();
//						viewPointClickEvent.remove();
//					}
//		            window.map3dController.zoomOutToRectangleBox();
//				}
//			});
//		
//
//			$("#map_measurement").click(function(){
//				let did = localStorage.getItem('department_id');
//				if (did == null || did == "" || did == undefined) {
//					$("#map_measurement").attr("data-attr", "");
//					
//					$("#user_notification_content").find('p:first').remove();
//					$("#user_notification_content").find('p:first').remove();
//					$("#user_notification_content").prepend('<p data-translate="_unauthorized_user_text_popup">You are not an Authorized User !</p><p data-translate="_unauthorized_user_tool_popup"> In order to use this tool , Please register to our portal by clicking below</p>');
//				
//					if(localStorage.getItem('current_language') === "hindi"){
//						$("#pills-hindi-tab").trigger('click');
//					}
//					$("#user_notification").modal();
//					
//				}else{
//					$("#map_measurement").attr("data-attr", "#mesurment");
//				}
//			});
//			
//			/**
//			 * LOAD FUNCTION
//			 */
//
//			
//		});

$(window).on("load", function() {
//	window.map3dController.clearCursor();
//	window.map3dController.drawPreviewChange();
//	window.map3dController.onPopupClose();
//	window.map3dController.measurementEvents();
//	$("#coordinateDiv").hide();
	$(".loader").fadeOut();
});
	



// CESIUM START


Cesium.Ion.defaultAccessToken = window.iscdl.appData.defaultAccessToken;
// const viewer = new Cesium.Viewer("cesiumContainer");


var defaultBasemap = new Cesium.OpenStreetMapImageryProvider({
    // url : 'https://a.tile.openstreetmap.org/'
    url: 'https://tile.openstreetmap.org/'
});


var viewer = new Cesium.Viewer('cesiumContainer', {
    fullscreenButton: false,
    selectionIndicator: false,
    infoBox: true,
    animation: false,
    timeline: false,
    shadows: false,
    skyAtmosphere: false,
    baseLayerPicker: true,
    geocoder: false,
    imageryProvider: defaultBasemap,
    // terrainProvider: ascdl_terrian,
    // terrainProvider : Cesium.createWorldTerrain(),
});


viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(75.808571 , 22.577571, 10000),
    orientation: {
    	heading: Cesium.Math.toRadians(20.0),
	    pitch: Cesium.Math.toRadians(-35.0),
        roll: 0.0,
    },
});

let newBuildingTileset;

var ward_boundary = new Cesium.WebMapServiceImageryProvider({
	  url: 'https://apagri.infinium.management/geoserver/iscdl/wms',
	  layers: 'iscdl:shp_ward_boundary', 
	  parameters: {
		  format: 'image/png',
		  transparent: true
	  }
});
//viewer.
viewer.imageryLayers.addImageryProvider(ward_boundary);

//async function loadBuildings() {
//async function loadBuildings() {
//
//	var newBuildingTileset =  await Cesium.Cesium3DTileset.fromIonAssetId(1626701);
//	viewer.scene.primitives.add(newBuildingTileset);
//
//	viewer.flyTo(newBuildingTileset);
//	
//}


//loadBuildings();
// CESIUM ENDS