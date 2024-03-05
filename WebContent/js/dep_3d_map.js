var map;

var layerInformation = [];
var fieldsInfo = [];
var highlightSelect = null;
var highlights = [];
var layerViews = [];
var map_info_tool = true;
var zoom_box_tool,zoom_out_box_tool = false;
var viewPointMoveEvent, viewPointClickEvent,textClickEvent;

require(
		[ "esri/Map", "esri/views/SceneView", "esri/layers/SceneLayer",
				"esri/widgets/BasemapGallery", "esri/widgets/Home",
				"esri/widgets/Locate", "esri/geometry/Extent",
				"esri/views/MapView", "esri/widgets/Expand",
				"esri/geometry/SpatialReference", "esri/widgets/Measurement",
				"esri/widgets/DirectLineMeasurement3D", "esri/widgets/Locate",
				"esri/views/draw/PointDrawAction", "esri/views/draw/Draw",
				"esri/geometry/geometryEngine", "esri/Graphic",
				"esri/geometry/Polygon", "esri/views/draw/SegmentDrawAction",
				"esri/views/draw/PolygonDrawAction", "esri/geometry/Circle",
				"esri/widgets/Sketch/SketchViewModel",
				"esri/widgets/Directions", "esri/widgets/AreaMeasurement3D",
				"esri/widgets/Search", "esri/geometry/Point",
				"esri/symbols/SimpleMarkerSymbol", "esri/layers/ImageryLayer",
				"esri/layers/GraphicsLayer", "esri/layers/ElevationLayer","esri/layers/FeatureLayer","esri/layers/TileLayer",
				"esri/Basemap","esri/widgets/BasemapGallery/support/LocalBasemapsSource",
				"esri/widgets/LayerList","esri/symbols/PictureMarkerSymbol","esri/tasks/support/Query",
				"esri/tasks/QueryTask","esri/geometry/support/webMercatorUtils","esri/tasks/Locator",
				"esri/tasks/PrintTask",
				"esri/tasks/support/PrintTemplate","esri/tasks/support/PrintParameters",
				"esri/layers/MapImageLayer","esri/layers/GroupLayer"],
		function(

		Map, SceneView, SceneLayer, BasemapGallery, Home, Locate, Extent,
				MapView, Expand, SpatialReference, Measurement,
				DirectLineMeasurement3D, Locate, PointDrawAction, Draw,
				geometryEngine, Graphic, Polygon, SegmentDrawAction,
				PolygonDrawAction, Circle, SketchViewModel, Directions,
				AreaMeasurement3D, Search, Point, SimpleMarkerSymbol,
				ImageryLayer, GraphicsLayer, ElevationLayer,FeatureLayer, TileLayer,
				Basemap,LocalBasemapsSource,LayerList,PictureMarkerSymbol,Query,
				QueryTask,webMercatorUtils,Locator,
				PrintTask,PrintTemplate,PrintParameters,MapImageLayer,GroupLayer) {

			var mapClickEvtHandler;
			var highlight;
			var resultsLayer = new GraphicsLayer();
			var rectangleGraphicsLayer,rectangleSketchViewModel;
	
				/**
				 * Scene Layers
				 */
			    
				
			const building_wsl1_slayer = new SceneLayer({
				url : window.BUILDING_SCENE_LAYER,
				title : "Building",
				outFields : ["*"]
			});

			const electric_pole_slayer = new SceneLayer({
				url : window.ELECTRICAL_POLE_SCENE_LAYER,
				visible : false,
				title : "Electric Pole",
				outFields : ["*"]
			});
			
			const traffic_signal_slayer = new SceneLayer({
		        url: window.TRAFFIC_SIGNAL_SCENE_LAYER,
				visible: false,
				title : "Traffic Signal",
				outFields : ["*"]
			 });

			const street_light_slayer = new SceneLayer({
				url : window.STREET_LIGHT_SCENE_LAYER,
				title : "Street Light",
				visible : false,
				outFields : ["*"]
			});

			const tree_slayer = new SceneLayer({
				url : window.TREE_SCENE_LAYER,
				title : "Tree",
				visible : false,
				outFields : ["*"]
			});
			
			const overhead_slayer = new SceneLayer({
				url : window.OVERHEAD_TANK_SCENE_LAYER,
				visible : false,
				title : "OverHead Tank",
				outFields : ["*"]
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
			
			const road_scene_slayer = new SceneLayer({
				url : window.ROAD_SCENE_LAYER,
				title : "Roads",
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
			
			const pocket_12_river_dem = new ElevationLayer({
				url : window.ISCDL_RIVER_DEM_IMAGE_LAYER,
				visible : true,
				title : "River DEM"
			});
			
			const pocket_12_abd_dem = new ElevationLayer({
				url : window.ISCDL_RIVER_DEM_TIFF,
				visible : true,
				title : "ABD DEM"
			});
			
			const pocket_12_srtm_dem = new ElevationLayer({
				url : window.ISCDL_SRTM_IMAGE_LAYER,
				visible : true,
				title : "STRM DEM"
			});
			
			const iscdl_dem_srtm = new TileLayer({
				  url: window.DEM_SRTM,
				  visible : false,
				  title:"ISCDL SRTM DEM"
			});
			
			const iscdl_river_dem = new TileLayer({
				  url: window.RIVER_DEM,
				  visible : false,
				  title:"ISCDL RIVER DEM"
			});
			
			
			
			
			/**
			 * Feature Layer
			 */
			
			
			
			const devider_slayer = new FeatureLayer({
				  url: window.DIVIDER_FEATURE_LAYER,
				  visible: false ,
			      title : "Divider",
			      outFields : ["*"],
		          popupTemplate: {
		        	  title : "Divider",
		              content: "<b>Object ID </b>: {objectid} <br> " +
		              		"<b>Id </b>: {id} <br> " +
		              		"<b>Type </b>: {type} <br>" +
		              		"<b>Material </b>: {material} <br>" +
		              		"<b>Road Name </b>: {road_name} <br>" +
		              		//"<b>Remarks </b>: {remarks} <br>" +
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
				  url: window.FOOTPATH_FEATURE_LAYER,
				  visible: false ,
			        title : "Footpath",
			        outFields : ["*"],
			          popupTemplate: {
			        	  title : "Footpath Information",
			              content: "<b>Object ID </b>: {objectid} <br> " +
			              		"<b>Id </b>: {id} <br> " +
			              		//"<b>Type of footpath </b>: {type_of_fo } <br>" +
			              		//"<b>Footpath_m </b>: {footpath_m } <br>" +
			              		//"<b>Remarks </b>: {remarks } <br>" +
			              		"<b>Footpath width </b>: {footpath_width} <br>" +
			              		"<b>Width </b>: {ward_no} <br>" +
			              		"<b>Ward Name </b>: {ward_name} <br>" +
			              		"<b>Zone No </b>: {zone_no} <br>" +
			              		"<b>Zone Name </b>: {zone_name} <br>" +
			              		"<b>Road Id </b>: {road_id} <br>" +
			              		"<b>Shape Length </b>: {shape_leng} <br>"
			              		
			            }
			});
			
			const road_slayer = new FeatureLayer({
		        url: window.ROAD_FEATURE_LAYER,
				visible: false,
				title : "Road",
				outFields : ["*"],
				popupTemplate: {
		        	  title : "Road Information",
		              content: "<b>Object ID </b>: {objectid} <br> " +
		              		"<b>Road Name </b>: {road_name} <br> " +
		              		"<b>Ward Name </b>: {ward_name} <br>" +
		              		"<b>Ward No </b>: {ward_no} <br>" +
		              		"<b>Zone Name </b>: {zone_name} <br>" +
		              		"<b>Zone No </b>: {zone_no} <br>"		              		
		              		
		            }
			 });
			
			if(road_slayer){
				road_slayer.listMode = 'hide';
			}
			
			const building_flayer = new FeatureLayer({
		        url: window.BUILDING_FEATURE_SERVER_LAYER,
				visible: false,
				title : "Building Feature Layer",
				outFields : ["*"],
				popupTemplate: {
		        	  title : "Building Information",
		              content: "<b>Object ID </b>: {OBJECTID} <br> " +
		              		"<b>Building Name </b>: {Building_Name} <br> " +
		              		"<b>Building Heights </b>: {Height_Meter} <br>" +
		              		"<b>Ward Name </b>: {Ward_Name} <br>" +
		              		"<b>Ward No </b>: {Ward_No} <br>" +
		              		"<b>Zone Name </b>: {Zone_Name} <br>" +
		              		"<b>Zone No </b>: {Zone_No} <br>"
		            }
			 });
			
			if(building_flayer){
				building_flayer.listMode = 'hide';
			}
			
			const imc_slayer = new FeatureLayer(
					{
						url : window.IMC_BOUNDARY,
						visible : true,
						title : "IMC Boundary",
						outFields : [ "*" ],
					});
			
			const ward_slayer = new FeatureLayer(
					{
						url : window.WARD_BOUNDARY,
						visible : true,
						title : "Ward Boundary",
						outFields : [ "*" ],
						
					});
			
			const zone_slayer = new FeatureLayer(
					{
						url : window.ZONE_BOUNDARY,
						visible : true,
						title : "Zone Boundary",
						outFields : [ "*" ],
						
					});
			
			const river_contour = new FeatureLayer({
				  url: window.ISCDL_RIVER_CONTOUR,
				  visible : false,
				  title:"River Contour",
				  outFields : [ "*" ],
			});
			
			
			
			/**
			 * Tile Layer
			 */
			
			const tiled_image_2015 = new TileLayer({
				url : window.TILED_IMAGE_2015,
				visible : true
			});
			
			//2017
	          var iscdl_sat_image_2017_1 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_1
		          }); 
	          
	          var iscdl_sat_image_2017_2 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_2
		          }); 
	          
	          var iscdl_sat_image_2017_3 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_3
		          }); 
	          
	          var iscdl_sat_image_2017_4 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_4
		          }); 
	          
	          var iscdl_sat_image_2017_5 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_5
		          }); 
	          
	          var iscdl_sat_image_2017_6 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_6
		          }); 
	          
	          var iscdl_sat_image_2017_7 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_7
		          }); 
	          
	          var iscdl_sat_image_2017_8 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_8
		          }); 
	          
	          var iscdl_sat_image_2017_9 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_9
		          }); 
	          
	          var iscdl_sat_image_2017_10 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_10
		          }); 
	          
	          var iscdl_sat_image_2017_11 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_11
		          }); 
	          
	          var iscdl_sat_image_2017_12 = new TileLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_12
		          }); 
	          
			
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
			
						
			const iscdl_r1 = new TileLayer({
				  url: window.ISCDL_R1_TIFF,
				  visible : true,
				  title:"ISCDL R1"
			});
			
			 var riverGroupLayer = new GroupLayer({
		          title: "River Ortho Image",
		          visible: false,
		          //visibilityMode: "exclusive",
		          layers: [iscdl_r1],
		        });

			map = new Map({
				basemap : "streets-navigation-vector",
				//ground : "world-elevation",
				layers : [ 
					zone_slayer, water_bodies_slayer,ward_slayer,tree_slayer,
					traffic_signal_slayer,street_light_slayer,road_slayer,road_scene_slayer,river_contour,
					overhead_slayer,manhole_slayer,iscdl_river_dem,iscdl_dem_srtm,
					riverGroupLayer,
					imc_slayer,footpath_slayer,electric_pole_slayer,
					devider_slayer,building_wsl1_slayer,building_flayer
					]
			});
			
			map.ground.layers.add(pocket_12_terrian_dem);
			map.ground.layers.add(pocket_12_river_dem);
			//map.ground.layers.add(pocket_12_abd_dem);
			map.ground.layers.add(pocket_12_srtm_dem);
			
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

			/**
			 * -------- widget start -------
			 */
			// search
			var search = new Search({
				view : view,
				includeDefaultSources: false,
				locationEnabled : false,
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
			
			/**
			 * Create custom basemaps
			 */
			
			 var orthoBasemap = new Basemap({
				  baseLayers: [
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
						ortho_31
						],
				  title: "ISCDL Drone Image 2020",
				  id: "Ortho Mosaic Basemap",
				  thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/thumbnail1591224931210.jpeg"
			});
			
			 var image2015Basemap = new Basemap(
						{
							baseLayers : [ tiled_image_2015 ],
							title : "ISCDL Satellite Image 2015",
							id : "ISCDL Satellite Image 2015",
							thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite_Image_2.png"
						});
			 
			 var image2017Basemap = new Basemap(
						{
							baseLayers : [ iscdl_sat_image_2017_1,iscdl_sat_image_2017_2,iscdl_sat_image_2017_3,
				        		  iscdl_sat_image_2017_4,iscdl_sat_image_2017_5,iscdl_sat_image_2017_6,
				        		  iscdl_sat_image_2017_7,iscdl_sat_image_2017_8,iscdl_sat_image_2017_9,
				        		  iscdl_sat_image_2017_10,iscdl_sat_image_2017_11,iscdl_sat_image_2017_12],
							title : "ISCDL Satellite Image 2017",
							id : "ISCDL Satellite Image 2017",
							thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite_Image_2.png"
						});
			 
			 var nightBasemap = Basemap.fromId("streets-night-vector");
			 var streetvectorBasemap = Basemap.fromId("streets-vector");
			// var grayVectorBasemap = Basemap.fromId("gray-vector");
			 var streetsnavigationBasemap = Basemap.fromId("streets-navigation-vector");
			// var topovectorBasemap = Basemap.fromId("topo-vector");
			 //var terrainBasemap = Basemap.fromId("terrain");
			 //var darkgrayBasemap = Basemap.fromId("dark-gray-vector");
			 var geographicBasemap = Basemap.fromId("national-geographic");
			 //var grayBasemap = Basemap.fromId("gray");
			 var hybridBasemap = Basemap.fromId("hybrid");
			 
			 var localSource = new LocalBasemapsSource({
			       basemaps : [orthoBasemap,image2015Basemap,image2017Basemap,nightBasemap,streetvectorBasemap,
			    	   streetsnavigationBasemap,geographicBasemap,hybridBasemap]
			 });

			// basemap gallery
			const basemapGallery = new BasemapGallery({
				view : view,
				container : basemapGalleryDiv,
				source: localSource
			});

			// layer list

			var layerList = new LayerList({
				view : view,
				container : layersDiv
			});

			// locate

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

							if (!initialExtent.contains(point)) {
								$u
										.notify(
												'info',
												'Notification',
												'Current location is not within Indore boundary',
												'');
								return;
							}

							return view.goTo(options.target);
						}
					});

			view.ui.add(locate, "top-left");
			
			var lastX,lastY;
			function viewFeatureInformation() {

				/*viewPointMoveEvent = view.on("pointer-move", function(event) {
					event.preventDefault();

					let ispopupEnabled = view.popup.visible;
					if (ispopupEnabled == true) {
						return;
					}
					setTimeout(function() {
						if (lastX == event.x && lastY == event.y) {
							window.depMap3dController.getFeatureInfo(event);
						}
					}, 4000);
					lastX = event.x;
					lastY = event.y;
				});*/
				viewPointClickEvent = view.on("click", function(event) {
					window.depMap3dController.getFeatureInfo(event);
				});
			}

			view.when(function() {
				view.popup.autoOpenEnabled = false;
			});
			
			view.when(function() {
				$("#toggle_map_info").trigger('click');
			});
			
			view.on("click", function(event) {
				$("#coordinateDiv").show();
				showElevationValue(event);
			});
			
			view.watch("updating", function (value) {
				let zoom = view.zoom;
				if(zoom < 11){
					view.zoom = 11;
				}else if(zoom > 18){
					view.zoom = 18;
				}
			 });
			
			function showElevationValue(evt) {
				let mapPoint = evt.mapPoint;
				let x = mapPoint.longitude.toFixed(6);
				let y = mapPoint.latitude.toFixed(6);
				let z = mapPoint.z.toFixed(1);
				$("#coordinateDiv").text("Lat: "+y+" "+"Long: "+x+" "+"Elevation: "+z + " m");
		    }
			
			
			view.when(function() {
				if(layerInformation){
					layerInformation = [];
				}
				
				let entries = view.layerViewManager._layerLayerViewInfoMap.entries();
				
				let layerManager = view.layerViewManager._layerLayerViewInfoMap;
				
				let i = 0;
				
				while(entries){
					let title = entries.next().value[1].layer.title;
					
					if(title == "Road" || title == "Building"){
						layerInformation.push(title);
					}
				}
			});

			/**
			 * -------- widget end -------
			 */

			// measurement
			var activeWidget = null;
			const clearButton = document.getElementById("clear");

			// draw

			// create a new instance of draw
			var draw = new Draw({
				view : view
			});
			
			
			/**
			 * Form Start
			 */
			
			
			/*
			 * Incident issues form
			 */
			
			$('form[id="form_incident_issues"]')
			.validate(
					{
						rules : {
							
							incident_type : {
								dropDownValidation : true,
								required : true
							},
							incident_department : {
								dropDownValidation : true,
								required : true
							},
							
							
						},
						messages : {
							incident_type : {
								dropDownValidation : "Please Select a Type",
								required : "Please Select a Type",
							},
							incident_department : {
								dropDownValidation : "Please Select a Department",
								required : "Please Select a Department",
							},
							
						},
						submitHandler : function(form, e) {
							e.preventDefault();
							try {
								
								if(resultsLayer){
									let graphics = resultsLayer.graphics;
									let items = resultsLayer.graphics.items;
									if(items.length > 0){
										for(let i = 0 ; i<items.length;i++){
											items.pop();
										}
									}
								}
								
								map.layers.remove(resultsLayer);
								$("#incident_rslt").html("");
								view.graphics.removeAll();
								
								let incident_type = $('#incident_type').val();
								let incident_department = $('#incident_department').val();
    							let result = window.depIncidentController.getIncidentIssueList(incident_department,incident_type);
    							let response = JSON.parse(result.responseText);
    							if(response.responseCode == "200"){
    								if(response.data.length > 0){
    									window.depMap3dController.bindIncidentResult(response.data);
    									$(".loader").fadeOut();
    								}else{
    									$u.notify('info', 'Notification',
    											'data not available', '');
    									$(".loader").fadeOut();
    								}
    							}else{
    								$u.notify('info', 'Notification',
    										'data not available', '');	
    								$(".loader").fadeOut();
    							}
							} catch (e) {
								$u.notify("error", "Error",
										"Something went Wrong");
								$(".loader").fadeOut();
							}
						}
					});
			
			/**
			 * Form End
			 */

			/**
			 * ----- function start ----
			 * 
			 */

			// Clear all measurements
			function clearMeasurements() {
				setActiveWidget(null);
				setActiveButton(null);
			}
			// measurement
			function setActiveWidget(type) {
				switch (type) {
				case "distance":
					activeWidget = new DirectLineMeasurement3D({
						view : view
					});

					// skip the initial 'new measurement' button
					activeWidget.viewModel.newMeasurement();

					activeWidget.unitOptions = ["metric", "imperial", "inches", "feet", 
						"yards", "miles", "meters", "kilometers"];
					activeWidget.viewModel.unitOptions = ["metric", "imperial", "inches", 
						"feet", "yards", "miles", "meters", "kilometers"];
					
					view.ui.add(activeWidget, "top-right");
					setActiveButton(document.getElementById("distanceButton"));
					break;
				case "area":
					activeWidget = new AreaMeasurement3D({
						view : view
					});

					// skip the initial 'new measurement' button
					activeWidget.viewModel.newMeasurement();
					
					activeWidget.unitOptions = ["metric", "imperial", "square-inches", 
						"square-feet", "square-yards", "square-miles", 
						"square-meters", "square-kilometers", 
						"acres", "ares", "hectares"];
					activeWidget.viewModel.unitOptions = ["metric", "imperial", "square-inches", 
						"square-feet", "square-yards", "square-miles", 
						"square-meters", "square-kilometers", 
						"acres", "ares", "hectares"];

					view.ui.add(activeWidget, "top-right");
					setActiveButton(document.getElementById("areaButton"));
					break;
				case null:
					if (activeWidget) {
						view.ui.remove(activeWidget);
						activeWidget.destroy();
						activeWidget = null;
					}
					break;
				}
			}

			function setActiveButton(selectedButton) {
				// focus the view to activate keyboard shortcuts for sketching
				view.focus();
				var elements = document.getElementsByClassName("active");
				for (var i = 0; i < elements.length; i++) {
					elements[i].classList.remove("active");
				}
				if (selectedButton) {
					selectedButton.classList.add("active");
				}
			}

			/**
			 * create circle
			 */

			function enableCreateCircle() {
				view.graphics.removeAll();
				const action = draw.create("circle");
				view.focus();
				action.on([ "vertex-add", "vertex-remove", "cursor-update",
						"redo", "undo", "draw-complete" ], createCircleGraphic);

			}

			function createCircleGraphic(event) {

				let vertices = event.vertices;
				view.graphics.removeAll();

				const circle = new Circle({
					spatialReference : view.spatialReference,
					center : vertices[0],
					radius : 100,
				});

				let graphic = new Graphic({
					geometry : circle,
				});
				view.graphics.add(graphic);
			}

			/**
			 * create polygons
			 * 
			 * @returns
			 */
			function enableCreatePolygon() {
				view.graphics.removeAll();
				const action = draw.create("polygon");
				view.focus();
				action.on([ "vertex-add", "vertex-remove", "cursor-update",
						"redo", "undo", "draw-complete" ], createGraphic);
			}

			function createGraphic(event) {

				let vertices = event.vertices;
				view.graphics.removeAll();
				let stroke_color = $('#p_s_color').val();
				let fill_color = $("#p_f_color").val();
				let border_width = $("#p_b_width").val();

				const graphic = new Graphic({
					geometry : {
						type : "polygon",
						rings : vertices,
						spatialReference : view.spatialReference
					},
					symbol : {
						type : "simple-fill",
						color : fill_color,
						style : "solid",
						outline : {
							color : stroke_color,
							width : border_width
						}
					}
				});
				
				 graphic.symbol = {
	        			  type: "simple-fill",
			              color: fill_color,
			              size: border_width,
			              outline: {
			                  color: stroke_color,
			                  width: border_width
			              }
				 }
		        let r = graphic.symbol.color.r;
				let g = graphic.symbol.color.g;
				let b = graphic.symbol.color.b;
				graphic.symbol.color = [r,g,b,0.3]
				view.graphics.add(graphic);
			}

			/**
			 * create point
			 * 
			 * @returns
			 */
			function enableCreatePoint() {
				var action = draw.create("point");

				action.on([ "vertex-add", "vertex-remove", "cursor-update",
						"redo", "undo", "draw-complete" ], createPointGraphic);
			}

			function createPointGraphic(evt) {

				let coordinates = evt.coordinates;
				view.graphics.removeAll();
				var point = {
					type : "point",
					x : coordinates[0],
					y : coordinates[1],
					spatialReference : view.spatialReference
				};

				var graphic = new Graphic({
					geometry : point,
					symbol : {
						type : "simple-marker",
						style : "circle",
						color : "red",
						size : "8px",
						outline : {
							color : [ 255, 255, 0 ],
							width : 1
						}
					}
				});
				view.graphics.add(graphic);

			}

			/**
			 * craete polyline
			 * 
			 * @returns
			 */

			function enableCreatePolyline() {
				var action = draw.create("polyline");

				action.on([ "vertex-add", "vertex-remove", "cursor-update",
						"redo", "undo", "draw-complete" ],
						createPolylineGraphic);
			}

			function createPolylineGraphic(evt) {

				let vertices = evt.vertices;
				view.graphics.removeAll();
				var polyline = {
					type : "polyline",
					paths : vertices,
					spatialReference : view.spatialReference
				};

				let linecolor = $('#multi_line_color').val();
				let line_width = $('#multi_line_width').val();

				var graphic = new Graphic({
					geometry : polyline,
					symbol : {
						type : "simple-line",
						color : linecolor,
						width : line_width,
						cap : "round",
						join : "round"
					}
				});
				view.graphics.add(graphic);
			}

			/**
			 * create rectangle
			 */

		function enableCreateRectangle(){
				let type = "rectangle";
				drawRectCirGraphics(type);
		}
			
		function enableCreateCircle(){
			let type = "circle";
			drawRectCirGraphics(type);
		}
		
		 function drawRectCirGraphics(type){
				view.graphics.removeAll();
				let drawGraphicsLayer = new GraphicsLayer();
				let rectangleSketch = new SketchViewModel({
	              view: view,
	              layer: drawGraphicsLayer
	            });
        
	            rectangleSketch.create(type);
	            rectangleSketch.on("create", function (event) {
		          if (event.state === "complete") {
		        	  view.graphics.removeAll();
		        	  let graphic = event.graphic;

		        	  let outline_color = "";
					  let fill_color = "";
					  let border_width = "";
		        	  
		        	  if(type == 'rectangle'){
		        		  outline_color = $('#s_s_color').val();
						  fill_color = $("#s_f_color").val();
						  border_width = $("#s_b_width").val() + "px";
		        	  }else if(type == 'circle'){
		        		  outline_color = $('#c_s_color').val();
						  fill_color = $("#c_f_color").val();
						  border_width = $("#c_b_width").val() + "px";
		        	  }
		        	  graphic.symbol = {
	        			  type: "simple-fill",
			              color: fill_color,
			              size: border_width,
			              outline: {
			                  color: outline_color,
			                  width: border_width
			              }
					  }
		        	  
		        	  
		        	let r = graphic.symbol.color.r;
					let g = graphic.symbol.color.g;
					let b = graphic.symbol.color.b;
					graphic.symbol.color = [r,g,b,0.3]
		        	view.graphics.add(graphic);
					$('.draw-tools-select li a').removeClass('active');
		          }
		    });
		}

			/**
			 * create texts
			 * 
			 * @returns
			 */

		 function createTextGraphic(evt) {
				let graphicSymbol;
				 view.graphics.removeAll();

				window.textClickEvent = view.on("click", function(event) {
					
					let txt_value = $("#tool_text").val();
					
					if(txt_value == ""){
						$u.notify('warning', 'Warning',
								'Please enter the text value', '');
						return;
					}
					
					let p = {
							type : 'point',
							x:event.mapPoint.longitude,
							y: event.mapPoint.latitude
					};
					
					var textSymbol = {
							type : "text",
							color : "black",
							text : "",
							xoffset : 3,
							yoffset : 3,
							font : { 
								size : 12,
								family : "Josefin Slab",
								weight : "bold"
							}
						};
					
					
					let font_color = $("#tool_fontcolor").val();
					let font_size  =  $("#tool_fontsize").val();

					graphicSymbol = textSymbol;
					graphicSymbol.text = txt_value;
					graphicSymbol.color = font_color;
					graphicSymbol.font.size = font_size;

					let g = new Graphic({
						geometry : p,
						symbol : graphicSymbol
					});
					view.graphics.add(g);
					$("#tool_text").val("");
					$('.draw-tools-select li a').removeClass('active');
					$("#lblDrawTxt").text("");
					if(window.textClickEvent){
						window.textClickEvent.remove();	
					}
				});
			}

			function changePreview(svgId, key, value) {
				$('#' + svgId).attr(key, value);
			}

			function removeExtent() {
				localStorage.removeItem("xmin");
				localStorage.removeItem("ymin");
				localStorage.removeItem("xmax");
				localStorage.removeItem("ymax");
				localStorage.removeItem("spatialReference");
			}

			/**
			 * ----- function end ----
			 * 
			 */

			/**
			 * ------ click events start -----
			 */

			  $("#attr_query_popup").click(function(){
	        	  
	        	  $("#form_attr_query_data").trigger("reset");
	        	  $("#attr_query_result").html("");
	        	  
	        	  window.depUtlityController.removeError('form_attr_query_data');
	        	  $('#attr_field').empty().append('<option value="">Select Field</option>');
	        	  
	        	  $('#attr_query_value').empty().append(
					'<option value="">Select Value</option>');
	        	  
	        	  var str = "";
	        	  $('#attr_data_category').empty().append(
	  			'<option value="">Select Layer</option>');
	        	  
	        	  	for (let i in layerInformation){
						let name = layerInformation[i];
						str += "<option value='" + name + "'>" + name + "</option>";
					}
					$('#attr_data_category').append(str);
			  });
	          
	          $("#attr_task_tab").click(function(){
	        	  $("#form_attr_query_data").trigger("reset");
	        	  $("#attr_query_result").html("");
	        	  window.depMap3dController.removeHighlightFeatures();
	        	  window.depUtlityController.removeError('form_attr_query_data');
	        	  $('#attr_field').empty().append('<option value="">Select Field</option>');
	        	  $('#attr_query_value').empty().append(
					'<option value="">Select Value</option>');
	          });
	          
	          $("#attr_data_category").change(function(){
	        	  let current_layer = $(this).val();
	        	  let fields = window.depMap3dController.getFieldsFromLayerName(current_layer);
	        	  
	        	  var str = "";
	        	  
	        	  $('#attr_field').empty().append(
	    			'<option value="">Select Field</option>');
	        	  
	        	  $('#attr_query_value').empty().append(
					'<option value="">Select Value</option>');
	        	  
	        	  if(fields.length > 0){
	        		  for(let i in fields){
	        			  let name = fields[i].Name;
	        			  let uppercase_name = window.depMap3dController.getFeatureColumnName(name);
	        			  str += "<option value='" + name + "'>" + uppercase_name + "</option>";
	        		  }
	        		  $("#attr_field").append(str);
	        	  }else{
	        		  $u.notify("info", "Notification","No fields available for " +current_layer);
	        	  }
	          });
	          
	          $("#attr_field").change(function(){
	        	  $('#attr_query_value').empty().append(
					'<option value="">Select Value</option>');
	        	  
	        	  let layer_name = $("#attr_data_category").val();
	        	  let field_name = $(this).val();
	        	  
	        	  var layerobj = window.depMap3dController.getLayerObjFromLayerName(layer_name);
	        	  	
	        	  	if(layerobj == ""){
						return;
					}
	        	  	
						var attr_query = layerobj.createQuery();
						attr_query.outFields = [field_name];
			            $(".loader").fadeIn();
			            layerobj.queryFeatures(attr_query).then(function(results) {
			            	 let resultedFeatures = results.features.length;
			            		 $(".loader").fadeOut();
			            		 let html = "";
			            		 var fieldValueArray = [];
			            		if(resultedFeatures > 0){
					  				let features = results.features;
					  				for(let i in features){
					  					let fie_value = features[i].attributes[field_name];
					  					
					  					//CHANGE FIELD VALUE TO INTEGER AS PER MAIL ON 29-09-21
					  					
					  					fie_value = Math.ceil(fie_value - .24);
					  					
					  					 if(!fieldValueArray.includes(fie_value) && fie_value != "" && fie_value != " "){
					  						fieldValueArray.push(fie_value);
					  						html += "<option value='"+fie_value+"'>"+fie_value+"</option>";
					  					}
					  				}
					  				$('#attr_query_value').append(html);
					  				
					  				if($('#attr_query_value > option').length == 1){
					  					$u.notify("info", "Notification","No Value found");
					  					return;
					  				}
			            		}else{
			            			$u.notify("info", "Notification","No Value found");
			            			return;
			            		}
						 },function(error){
				        	   $(".loader").fadeOut();
				        	   $u.notify("info", "Notification",error.message);
				        	   return;
				         });
	        	  	
					/*view.whenLayerView(layerobj).then(function(layerView) {
						var attr_query = layerobj.createQuery();
						attr_query.outFields = [field_name];
			            $(".loader").fadeIn();
			            layerobj.queryFeatures(attr_query).then(function(results) {
			            	 let resultedFeatures = results.features.length;
			            		 $(".loader").fadeOut();
			            		 let html = "";
			            		 var fieldValueArray = [];
			            		if(resultedFeatures > 0){
					  				let features = results.features;
					  				for(let i in features){
					  					let fie_value = features[i].attributes[field_name];
					  					 if(!fieldValueArray.includes(fie_value) && fie_value != "" && fie_value != " "){
					  						fieldValueArray.push(fie_value);
					  						html += "<option value='"+fie_value+"'>"+fie_value+"</option>";
					  					}
					  				}
					  				$('#attr_query_value').append(html);
					  				
					  				if($('#attr_query_value > option').length == 1){
					  					$u.notify("info", "Notification","No Value found");
					  					return;
					  				}
			            		}else{
			            			$u.notify("info", "Notification","No Value found");
			            			return;
			            		}
						 },function(error){
				        	   $(".loader").fadeOut();
				        	   $u.notify("info", "Notification",error.message);
				        	   return;
				         });
					});*/
	          });
	         
	  		$("#attr_data_clear").click(function(){
	  			 window.depMap3dController.removeHighlightFeatures();
	  			 $("#form_attr_query_data").trigger("reset");
	         	  	window.depUtlityController.removeError('form_attr_query_data');
	         	  	$('#attr_field').empty().append('<option value="">Select Field</option>');
	  			
	  			if (map != null || map != undefined) {
	  				view.goTo(initialExtent);
	  			}
	  			$("#attr_query_result").html("");
	  		});
	  		
	  		/*-------- Proximity Analysis ----------- */
	  		
	  		$("#proximity_anylysis_popup").click(function(){

	  			let str = "";
	  			
	  			$('#polygon_buffer_layer').empty().append(
	  			'<option value="">Select Layer</option>');
	        	  
	        	  	for (let i in layerInformation){
						let name = layerInformation[i];
						str += "<option value='" + name + "'>" + name + "</option>";
					}
					$('#polygon_buffer_layer').append(str);
	  		});
	  		
	  		
	         var polygonGraphicsLayer,sketchViewModel;
	         
	         $('#clear_polygon').click(function(){
					$('#polygon_buffer_rslt').html("");
					$("#polygon_buffer_layer option:first").attr('selected','selected');
					view.goTo(initialExtent);
					$("#clearMap").trigger('click');
				})
	  		
	  		$("#draw_polygon").click(function(){
				$('#polygon_buffer_rslt').html("");
				let selected_layer = $("#polygon_buffer_layer").val();
				 let layerobj = window.depMap3dController.getLayerObjFromLayerName(selected_layer);
				if(selected_layer == ""){
					$u.notify("info", "Notification","Please select layer");
					return;
				}
				
				/*if(layerobj.visible == false){
      				layerobj.visible = true;
      			}*/
				
				polygonGraphicsLayer = new GraphicsLayer();
	            map.add(polygonGraphicsLayer);
	            window.depMap3dController.clearUpSelection();
	            view.popup.close();
	            setUpSketchViewModel();
	  		});
	         
	         function setUpSketchViewModel(){
	        	  
		            sketchViewModel = new SketchViewModel({
		              view: view,
		              layer: polygonGraphicsLayer,
		              pointSymbol: {
		                type: "simple-marker",
		                color: [255, 255, 255, 0.5],
		                size: "1px",
		                outline: {
		                  color: "gray",
		                  width: 0
		                }
		              }
		            });
		            
		        sketchViewModel.create("polygon");
				sketchViewModel.on("create", function (event) {
			          if (event.state === "complete") {
			            polygonGraphicsLayer.remove(event.graphic);
			            window.depMap3dController.selectFeatures(event.graphic.geometry);
			          }
			    });
	         }
			
			// clear all graphic on map
			$("#clearMap").click(function() {
				// map.graphics.clear();
				view.graphics.removeAll();
				
				clearMeasurements();
				
				if (highlight) {
			        highlight.remove();
			        highlight = null;
				}
				
				if(resultsLayer){
					map.layers.remove(resultsLayer);
					let graphics = resultsLayer.graphics;
					let items = resultsLayer.graphics.items;
					if(items.length > 0){
						for(let i = 0 ; i<items.length;i++){
							items.pop();
						}
					}
				}
				
				view.popup.visible = false;
				map.layers.remove(resultsLayer);
				window.depMap3dController.removeHighlightFeatures();
				
				
				
			});
			
			
			$(".layer-close").click(function() {
				document.getElementById("print_submit").innerHTML = "Print";
                document.getElementById("print_submit").style.display = 'block';
                document.getElementById("print_submit").disabled = false; 
                document.getElementById("printResult").style.display = 'none';
                
                $('#form_print').trigger('reset');
				
				/**
				 * hide printout option after again open
				 */
				let length = $( "#print_button div.esriPrint a").length;
				if(length > 0){
					$('.esriPrint a').remove(); 
				}
			});

			// default extent
//			$('#myHomeDiv').click(function() {
//				if (map != null || map != undefined) {
//					view.goTo(initialExtent);
//				}
//			});

			$('#areaButton').click(function() {
				setActiveWidget(null);
				if (!this.classList.contains("active")) {
					setActiveWidget("area");
				} else {
					setActiveButton(null);
				}
			});

			$('#distanceButton').click(function() {
				setActiveWidget(null);
				if (!this.classList.contains("active")) {
					setActiveWidget("distance");
				} else {
					setActiveButton(null);
				}
			});

			/**
			 * click events
			 */

			$('#clear').click(function() {
				clearMeasurements();
			});

			$('.draw-tools-select li a').on('click', function() {

				if(viewPointClickEvent){
					viewPointClickEvent.remove();
					//viewPointMoveEvent.remove();
				}
				
				if(window.textClickEvent){
					window.textClickEvent.remove();
				}
				
				let tool_name = this.title.toUpperCase();

				switch (tool_name) {
				case "POLYGON":
					enableCreatePolygon();
					break;
				case "POINT":
					enableCreatePoint();
					break;
				case "POLYLINE":
					enableCreatePolyline();
					break;
				case "RECTANGLE" : 
					enableCreateRectangle();
					break;
				case "CIRCLE" : 
					enableCreateCircle();
					break;
				case "TEXT" :
					createTextGraphic();
					break;
				default:
					break;
				}
				
				map_info_tool = false;
				$("#toggle_map_info").trigger("click");
				
			});

			/**
			 * share click event
			 */

			$('#map_share').click(
					function() {

						$('#sharelinktxt').val("");

						localStorage.setItem("xmin", view.extent.xmin);
						localStorage.setItem("ymin", view.extent.ymin);
						localStorage.setItem("xmax", view.extent.xmax);
						localStorage.setItem("ymax", view.extent.ymax);
						localStorage.setItem("spatialReference",
								view.extent.spatialReference.wkid);

						let browserUrl = document.location.href;

						let finalurl = browserUrl
						$('#sharelinktxt').val(finalurl);

					});

			function removeLatLongError(ipId, lblId) {
				$('#' + ipId).removeClass('error');
				$('#' + lblId).remove();
			}

			function removeCursor() {
				if (mapClickEvtHandler != undefined) {
					mapClickEvtHandler.remove();
					view.cursor = "default";
				}
			}

			function showCoordinates(pt, lat_id, long_id) {
				$('#' + lat_id).val(pt.latitude.toFixed(6));
				$('#' + long_id).val(pt.longitude.toFixed(6));
				view.graphics.add(graphic);
			}

			/**
			 * ------ click events end -----
			 */

			/**
			 * ------ change events start ------
			 */

			// Multi-line
			$("#multi_line_width").change(function() {
				changePreview("polyLineSvg", "stroke-width", $(this).val());
			});

			$("#multi_line_color").change(function() {
				changePreview("polyLineSvg", "stroke", $(this).val());
			});

			// polygon
			$("#p_s_color").change(function() {
				changePreview("polygonSvg", "stroke", $(this).val());
			});

			$("#p_b_width").change(function() {
				changePreview("polygonSvg", "stroke-width", $(this).val());
			});

			$("#p_f_color").change(function() {
				changePreview("polygonSvg", "fill", $(this).val());
			});
			
			
			// rectangle
			$("#s_s_color").change(function() {
				changePreview("recatangleSvg", "stroke", $(this).val());
			});

			$("#s_b_width").change(function() {
				changePreview("recatangleSvg", "stroke-width", $(this).val());
			});

			$("#s_f_color").change(function() {
				changePreview("recatangleSvg", "fill", $(this).val());
			});
			
			//circle
			$("#c_s_color").change(function() {
				changePreview("circleSvg", "stroke", $(this).val());
			});

			$("#c_b_width").change(function() {
				changePreview("circleSvg", "stroke-width", $(this).val());
			});

			$("#c_f_color").change(function() {
				changePreview("circleSvg", "fill", $(this).val());
			});

			/**
			 * ------ change events end ------
			 */

			/**
			 * ------------ fom validation starts -------------------------
			 */

			// change password -> new password validator
			$.validator
					.addMethod(
							'pwdVal',
							function(value, element) {
								return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
										.test(value);
							},
							"Password must contain one number, one Uppercase letter, one Lowercase letter and at least 8 characters");

			// change password -> current and new password validator
			$.validator.addMethod('diffVal', function(value, element) {
				return $("#chng_password").val() !== $("#new_password").val();
			}, "New password should not be same as Current password");

			$.validator.addMethod("dropDownValidation", function(value,
					element, params) {
				try {
					return value == "" ? false : true;
				} catch (e) {
					return false
				}
			}, 'Please select a type');

			$.validator.addMethod("dateFormat",
					function(value, element, params) {
						try {
							return value == "" ? false : true;
						} catch (e) {
							return false
						}
					}, 'Please select Date & Time ');
			

			// attribute query
			$('form[id="form_attr_query_data"]')
			.validate(
					{
						rules : {
							attr_data_category : {
								required : true,
								dropDownValidation : true
							},
							attr_field : {
								required : true,
								dropDownValidation : true
							},
							attr_query_value : {
								required : true
							}
						},
						messages : {
							attr_data_category : {
								required : "Please Select Layer",
								dropDownValidation : "Please Select Layer",
							},
							attr_field : {
								required : "Please Select Field",
								dropDownValidation : "Please Select Field",
							},
							attr_query_value : {
								required : "Please Enter Value"
							}
						},
						submitHandler : function(form, e) {
							e.preventDefault();
							
							$("#attr_query_result").html("");
							
							let layer_name = $("#attr_data_category").val();
							let field_name = $("#attr_field").val();
							let operator = $("#attr_operator").val();
							let attr_value = $("#attr_query_value").val();
							var fieldType = "";
							
							for(let i in fieldsInfo){
								if(fieldsInfo[i].Name == field_name){
									fieldType = fieldsInfo[i].Type ;  
									break;
								}
							}
							
							var layerobj = window.depMap3dController.getLayerObjFromLayerName(layer_name);
							
							if(layerobj == ""){
								return;
							}
							
							//view.whenLayerView(layerobj).then(function(layerView) {
								
								layerViews = [];
								
								var query = layerobj.createQuery();
								
								if(fieldType == "string"){
								
									query.where = " "+field_name+" "+operator+" '"+attr_value+"' ";
								
								}else if(fieldType == "double" || fieldType == "oid" 
									|| fieldType == "small-integer" || fieldType == "integer" 
										|| fieldType == "db_ezc5d.hsu_oskxt.ShapesWater_tank_ProcedurallyGeneratedMultipatches.area"){
									
									query.where = " "+field_name+" "+operator+" "+attr_value+" ";
								}
								
								query.returnGeometry = true;
					            query.outFields = ["*"];
					            
					            window.depMap3dController.removeHighlightFeatures();
					            $(".loader").fadeIn();
					            layerobj.queryFeatures(query).then(function(results) {
					            	 let resultedFeatures = results.features.length;
					            		 
					            		if(resultedFeatures > 0){
					            			// $u.notify("info",
											// "Features","Total " +
											// resultedFeatures +" Records
											// Found");
					            			$('#query_result_tab a[href="#attr_query_result"]').tab('show');
					            			
					            			if(layerobj.visible == false){
					            				layerobj.visible = true;
					            			}
					            			
					            			//layerViews.push(layerView);
					            			let propertyName = window.depMap3dController.highlightLayerByFeatureProperty(layerobj);
					            			
					            			window.depMap3dController.bindListOfAttributeFeatures(results,propertyName);
					            			$(".loader").fadeOut();
					            			
					            		}else{
					            			window.depMap3dController.removeHighlightFeatures();
					            			$u.notify("info", "Notification","No Result found");
					            			return;
					            		}
					            		
					            		/**
										 * zoom to layer extent
										 */
					            		window.depMap3dController.zoomToLayer(layerobj);
								 },function(error){
						        	   console.log(error);
						        	   $(".loader").fadeOut();
						        	   layerViews = [];
						        	   $u.notify("info", error.name,error.message);
						        	   return;
						         });
							//});
						}
			});
			

			/**
			 * change password form
			 */
			$('form[id="form_changePassword"]')
					.validate(
							{
								rules : {
									chng_password : {
										required : true,
										diffVal : true
									},
									new_password : {
										required : true,
										diffVal : true,
										pwdVal : true
									},
									confirm_password : {
										required : true,
										equalTo : "#new_password"
									}
								},
								messages : {
									chng_password : {
										required : "Please Enter Password",
										diffVal : "New Password Should Not Be Same As Current Password"
									},
									new_password : {
										required : "Please Enter New Password",
										pwdVal : "Password Must Contain One Number, One Uppercase Letter, One Lowercase Letter and At Least 8 Characters",
										diffVal : "New Password Should Not Be Same As Current Password"
									},
									confirm_password : {
										required : "Please Confirm New Password",
										equalTo : "New Password and Confirm Password Should Be Same"
									}
								},
								submitHandler : function(form, e) {
									e.preventDefault();
									try {
										let password = $('#chng_password')
												.val();
										let new_password = $('#new_password')
												.val();
										let user_id = localStorage
												.getItem("user_data");
										if (!user_id || user_id === null) {
											$u
													.notify("warning",
															"Warning",
															"User information not found !");
											return false;
										}
										let obj = {
											password : password,
											newPassword : new_password,
											userId : user_id
										};

										window.depUtlityController
												.changePassword(obj);

										// $('#form_changePassword').trigger('reset');
										window.depUtlityController
												.removeError('form_changePassword');

									} catch (e) {
										$u.notify("error", "Error",
												"Something went wrong");
									}
								}
							});
			
			// custom scale-bar form
			$('form[id="form_custom_scale"]')
			.validate(
					{
						rules : {
							scale_value : {
								required : true,
								numericVal : true,
								min : 100,
								max : 100000
							}
						},
						messages : {
							scale_value : {
								required : "Please Select Scale Value",
								numericVal : "Please Enter Numeric Value"
							}
						},
						submitHandler : function(form, e) {
							e.preventDefault();
							try {
								let scale_value = $("#scale_value").val();
								if(scale_value){
									view.scale = scale_value;
								}
							} catch (e) {
								 $u.notify("error", "Error","Something Happend Wrong");
							}
						}
			});
			
			$("#custom_scale_reset").click(function(){
				window.depUtlityController.removeError('form_custom_scale');
				view.goTo(initialExtent);
			});
			
			// print form
			$('form[id="form_print"]')
			.validate(
					{
						rules : {
							title_name : {
								required : true,
							},
						},
						messages : {
							title_name : {
								required : "Please Enter Title Name",
							},
						},
						submitHandler : function(form, e) {
							e.preventDefault();
							
							try {
								$(".loader").fadeIn();
								document.getElementById("print_submit").innerHTML = "Printing..."
					            document.getElementById("print_submit").disabled = true;
								
								var printTask = new PrintTask({
									   url: window.prefix_layer_url + "Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
								});
								
								let _layout =     $("#print_layout_id").val();
								let _format =     $("#print_format_id").val();
								let _printTitle = $("#title_name").val();
								
								var template = new PrintTemplate({
								 format: _format,
								 exportOptions: {
								   dpi: 300
								 },
								 layout: _layout,
								 layoutOptions: {
								   titleText: _printTitle,
								 }
								});
	
								var params = new PrintParameters({
								 view: view,
								 template: template
								});
	
								printTask.execute(params).then(printResult, printError);
							} catch (e) {
								 $(".loader").fadeOut();
								 document.getElementById("print_submit").disabled = false;
				                 document.getElementById("print_submit").innerHTML = "Print";
								 $u.notify("error", "Error","Something Happend Wrong");
							}
						}
					});
			
			
			
			function printResult(evt){
				$(".loader").fadeOut();
				$('#form_print').trigger('reset');
				 document.getElementById("print_submit").style.display = 'none';
                 document.getElementById("printResult").href = evt.url;
                 document.getElementById("printResult").style.display = 'block';
                 on(dom.byId("printResult"), "click", function () {
                     document.getElementById("print_submit").innerHTML = "Print";
                     document.getElementById("print_submit").style.display = 'block';
                     document.getElementById("print_submit").disabled = false; 
                     document.getElementById("printResult").style.display = 'none';
                     $('#form_print').trigger('reset');
                 });
				
			}
			
			function printError(e){
				$(".loader").fadeOut();
				document.getElementById("print_submit").disabled = false;
                document.getElementById("print_submit").innerHTML = "Print";
				$u.notify("info", "Notification",e.message);
			}
			
			$("#print_popup").click(function(){
				window.depUtlityController.removeError('form_print');
			});
			

			/**
			 * -------------- form validation ends ---------------------------
			 */

			var bookmarkList = [];

			/**
			 * COMMON FUNCTIONS
			 */

			let base = {
				getBookMarkList : function getBookMarkList(user_id) {

					let view_type = window.depUtlityController.getViewType();

					let bookmarkObj = {
						"user_id" : user_id,
						"type" : view_type
					}

					let postData = JSON.stringify(bookmarkObj);

					let token_val = localStorage.getItem('token');

					if (token_val == "" || token_val == undefined
							|| token_val == null) {
						$u.notify('info', 'Notification',
								'You are not authorized user', '');
						return;
					}

					$.ajax({
								method : 'POST',
								url : window.iscdl.appData.baseURL
										+ "api/bookmark/getBookmarkList",
								async : false,
								data : postData,
								contentType : 'application/json',
								beforeSend : function(request) {
									request.setRequestHeader('Authorization',
											'Bearer '
													+ localStorage
															.getItem('token'));
								},
								success : function(result) {

									if (!$.isEmptyObject(result)
											&& result != null) {
										try {
											result = JSON.parse(result);

											if (result.responseCode == '200') {
												let bookamarks = result.data;
												$('#bookmark-data').html("");

												for ( let i in bookamarks) {
													let id = bookamarks[i].id;
													let title = bookamarks[i].title;
													let xmax = bookamarks[i].xmax;
													let xmin = bookamarks[i].xmin;
													let ymax = bookamarks[i].ymax;
													let ymin = bookamarks[i].ymin;
													let wkid = bookamarks[i].wkid;

													window.depMap3dController
															.prepareBookmarkListForLoginUser(
																	id, title,
																	xmax, xmin,
																	ymax, ymin,
																	wkid);
												}
											} else {
												$u.notify('error',
														'Notification',
														result.responseMessage,
														'');
											}
										} catch (err) {
											console.log(err);
										}
									} else {
										$u.notify('error', 'Notification',
												'Something happens wrong', '');
									}
								},
								error : function(e) {
									console.log(e);
								}
							});
				},
				setBookmarkInfo : function setBookmarkInfo() {
					let user_id = localStorage.getItem('user_data');
					let bookmark_name = $("#bookmark_name").val().trim();
					if (bookmark_name == undefined || bookmark_name == null
							|| bookmark_name == "") {
						$u.notify('info', 'Notification',
								'Please enter bookmark title', '');
						return;
					}

					let xmin = view.extent.xmin;
					let ymin = view.extent.ymin;
					let xmax = view.extent.xmax;
					let ymax = view.extent.ymax;
					let srs = view.extent.spatialReference.wkid;

					if (user_id != undefined && user_id != null
							&& user_id != "") {
						window.depMap3dController.addBookmark(bookmark_name,
								user_id, xmin, ymin, xmax, ymax, srs);
					} else {

						if (bookmarkList.includes(bookmark_name.trim())) {
							$u.notify('info', 'Notification',
									'Bookmark with title '
											+ bookmark_name.trim()
											+ ' already exists.', '');
							return;
						} else {
							window.depMap3dController
									.prepareBookmarkListForCitizenUser(
											bookmark_name, xmax, xmin, ymax,
											ymin, srs);
							bookmarkList.push(bookmark_name.trim());
						}
					}
					$("#bookmark_name").val("");
				},
				addBookmark : function addBookmark(bookmark_name, user_id,
						xmin, ymin, xmax, ymax, srs) {
					let result;

					let view_type = window.depUtlityController.getViewType();

					let bookmarkObj = {

						"title" : bookmark_name,
						"user_id" : user_id,
						"xmax" : xmax,
						"xmin" : xmin,
						"ymax" : ymax,
						"ymin" : ymin,
						"wkid" : srs,
						"type" : view_type
					}

					let postData = JSON.stringify(bookmarkObj);

					let token_val = localStorage.getItem('token');

					if (token_val == "" || token_val == undefined
							|| token_val == null) {
						$u.notify('info', 'Notification',
								'You are not authorized user', '');
						return;
					}
					$(".loader").fadeIn();

					$.ajax({
								method : 'POST',
								url : window.iscdl.appData.baseURL
										+ "api/bookmark/addOrUpdateBookmark",
								async : false,
								data : postData,
								contentType : 'application/json',
								beforeSend : function(request) {
									request.setRequestHeader('Authorization',
											'Bearer '
													+ localStorage
															.getItem('token'));
								},
								success : function(result) {

									$(".loader").fadeOut();

									if (!$.isEmptyObject(result)
											&& result != null) {
										try {
											result = JSON.parse(result);
											if (result.responseCode == '200') {

												$u.notify('success', 'Success',
														result.responseMessage,
														'');

												window.depMap3dController
														.prepareBookmarkListForLoginUser(
																"",
																bookmark_name,
																xmax, xmin,
																ymax, ymin, srs);

												let user_id = localStorage
														.getItem('user_data');

												if (user_id != undefined
														&& user_id != null
														&& user_id != "") {
													window.depMap3dController
															.getBookMarkList(user_id);
												}
											} else {
												$u.notify('error',
														'Notification',
														result.responseMessage,
														'');
											}
										} catch (err) {
											$(".loader").fadeOut();
											console.log(err);
										}
									} else {
										$(".loader").fadeOut();
										$u.notify('error', 'Notification',
												'Error while adding bookmark',
												'');
									}
								},
								error : function(e) {
									$(".loader").fadeOut();
									console.log(e);
									let response = JSON.parse(e.responseText);
									if(response.responseCode == 403) {
										$u.notify("info", "Notification", response.responseMessage);
									} else if(response.responseCode == 401) {
										$u.notify("info", "Notification", response.responseMessage);
									}
								}
							});

				},
				deleteLoginUserBookmarks : function deleteLoginUserBookmarks(
						bookmarkIds) {

					let bookmarkObj = {
						"delete_id" : bookmarkIds,
					}

					let postData = JSON.stringify(bookmarkObj);

					let token_val = localStorage.getItem('token');

					if (token_val == "" || token_val == undefined
							|| token_val == null) {
						$u.notify('info', 'Notification',
								'You are not authorized user', '');
						return;
					}

					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL
								+ "api/bookmark/deleteBookmark",
						async : false,
						data : postData,
						contentType : 'application/json',
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						success : function(result) {

							if (!$.isEmptyObject(result) && result != null) {
								try {
									result = JSON.parse(result);

									if (result.responseCode == '200') {

										$u.notify('success', 'Success',
												result.responseMessage, '');

										let user_id = localStorage
												.getItem('user_data');

										if (user_id != undefined
												&& user_id != null
												&& user_id != "") {
											window.depMap3dController
													.getBookMarkList(user_id);
										}
									} else {
										$u.notify('error', 'Notification',
												result.responseMessage, '');
									}
								} catch (err) {
									console.log(err);
								}
							} else {
								$u.notify('error', 'Notification',
										'Something happens wrong', '');
							}
						},
						error : function(e) {
							console.log(e);
						}
					});

				},
				deleteCitizenBookmarks : function deleteCitizenBookmarks() {

					let idx = 0;
					let bookmarkIds = "";
					let length = $('input[name="citiBookmarkNames"]:checked').length;

					if (length == 0) {
						$u.notify('info', 'Notification',
								'Please select any bookmark', '');
						return;
					}

					$('input[name="citiBookmarkNames"]:checked').each(
							function() {
								if (idx == (length - 1)) {
									bookmarkIds += this.value;
								} else {
									bookmarkIds += this.value + ",";
								}
								idx++;
							});

					let strarray = bookmarkIds.split(',');

					for ( let a in strarray) {
						let id = strarray[a];
						$("#" + id).remove();
						bookmarkList.pop(id.trim());
					}
					$("#bookmark_name").val("");

				},
				prepareBookmarkListForLoginUser : function prepareBookmarkListForLoginUser(
						bookmark_id, bookmark_name, xmax, xmin, ymax, ymin, srs) {

					$('#bookmark-data')
							.append(
									"<div class='main-book-val' id="
											+ bookmark_id
											+ "><input type='checkbox' data-bookmark = "
											+ bookmark_id
											+ " value ="
											+ bookmark_name
											+ " "
											+ "name='bookmarkNames' "
											+ "class='form-control main-book-in'>"
											+ "<img src='images/icons/Bookmark-72.svg' class='main-book-img' data-xmax='"
											+ xmax
											+ "' data-xmin='"
											+ xmin
											+ "' data-ymax='"
											+ ymax
											+ "' "
											+ "data-ymin='"
											+ ymin
											+ "' data-srs='"
											+ srs
											+ "' onclick='window.depMap3dController.zoomToBookmark(this)'>"
											+ "<div class='bookmark-val' id='mine' title="
											+ bookmark_name + ">"
											+ bookmark_name + "</div></div>");
				},
				prepareBookmarkListForCitizenUser : function prepareBookmarkListForCitizenUser(
						bookmark_name, xmax, xmin, ymax, ymin, srs) {
					$('#bookmark-data')
							.append(
									"<div class='main-book-val' id="
											+ bookmark_name
											+ "><input type='checkbox' value ="
											+ bookmark_name
											+ " name='citiBookmarkNames' "
											+ "class='form-control main-book-in'>"
											+ "<img src='images/icons/Bookmark-72.svg' class='main-book-img' data-xmax='"
											+ xmax
											+ "' data-xmin='"
											+ xmin
											+ "' data-ymax='"
											+ ymax
											+ "' "
											+ "data-ymin='"
											+ ymin
											+ "' data-srs='"
											+ srs
											+ "' onclick='window.depMap3dController.zoomToBookmark(this)'>"
											+ "<div class='bookmark-val' id='mine' title="
											+ bookmark_name + ">"
											+ bookmark_name + "</div></div>");
				},
				getSelectedBookmarkIds : function getSelectedBookmarkIds() {

					let bookmarkIds = "";
					let idx = 0;

					let length = $('input[name="bookmarkNames"]:checked').length;

					if (length == 0) {
						$u.notify('error', 'Notification',
								'Please select any bookmark', '');
						return;
					}

					$('input[name="bookmarkNames"]:checked').each(function() {

						let bookmark_id = $(this).data("bookmark");

						if (idx == (length - 1)) {
							bookmarkIds += bookmark_id;
						} else {
							bookmarkIds += bookmark_id + ",";
						}
						idx++;
					});

					return bookmarkIds;

				},
				zoomToBookmark : function zoomToBookmark(data) {
					let xmin = $(data).data("xmin");
					let xmax = $(data).data("xmax");
					let ymin = $(data).data("ymin");
					let ymax = $(data).data("ymax");
					let wkid = $(data).data("srs");
					let bookmarkExtent = new Extent(xmin, ymin, xmax, ymax,
							new SpatialReference({
								wkid : wkid
							}));
					view.goTo(bookmarkExtent);
				},
				bindIncidentResult : function (result){
					$("#incident_rslt").append('');
		        	  var html = "";
		        	  let total_feature = result.length;
		        	  
		        	  let pictureSymbol = new PictureMarkerSymbol('images/incident_icons/Accident_issue.png', 25, 25);
		        	  
		        	  $("#incident_rslt").append("<h3 id='total_features_length'>Number of features found : " + 1 + "/" + total_feature+"</h3>" + 
		        			  "<div class='np-main w-100 p-0'>" +
								"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
								"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
								"</div>");
		        	  let incident_type = $("#incident_type").val();
		        	  if(incident_type === "1"){
		        		  for(let i in result){
			        		  let latitude = result[i].latitude;
			        		  let longitude = result[i].longitude;
			        		  let accident_type = result[i].accident_type;
			        		  let address = result[i].address;
			        		  let description = result[i].description;
			        		  let vehicle_number = result[i].vehicle_number;
			        		  let vehicle_type = result[i].vehicle_type;
			        		  let images = result[i].images;
			        		  let query_point = new Point(longitude,latitude);
			        		  let graphic = new Graphic(query_point,pictureSymbol);
			        		  view.graphics.add(graphic);
			        		  resultsLayer.add(graphic);
			        		  
			        		  html += "<div class='query-result-main kyp-list query-resultDiv-seperator incident-issue-result'>" +
			        		  		
			        		    "<div class='result-task'><label>Accident Type : </label><p>"+accident_type+"</p></div>" +
		  			 	        "<div class='result-task'><label>Address : </label><p>"+address+"</p></div>" +
		  			 	        "<div class='result-task'><label>Description : </label><p>"+description+"</p></div>" +
		  			 	        "<div class='result-task'><label>Vehicle Number : </label><p>"+vehicle_number+"</p></div>" +
		  			 	        "<div class='result-task'><label>Vehicle Type : </label><p>"+vehicle_type+"</p></div>" +
		  			 	        "<div class='result-task'><label> Latitude : </label><p>"+latitude+"</p></div>" +
		  						"<div class='result-task'><label> Longitude : </label><p> "+longitude+"</p></div>" +
		  						"<div class='result-task'><i class='fa fa-search query-zoom-feature' aria-hidden='true' title='Zoom To Feature' " +
	 	           				"data-longitude="+longitude+" data-latitude="+latitude+" " +
		        		  		"data-accident_type='"+accident_type+"' data-images = '"+images+"' data-address='"+address+"' " +
		        		  		"data-description='"+description+"' data-vehicle_number='"+vehicle_number+"' data-vehicle_type='"+vehicle_type+"' " +
		        		  		"onclick='window.depMap3dController.zoomToIncidentIssues(this)'></i></div>" +
		  						"</div>";
			        	  }
		        		  $("#incident_rslt").append(html);
		        	  }else{
		        		  for(let i in result){
			        		  let latitude = result[i].latitude;
			        		  let longitude = result[i].longitude;
			        		  let address = result[i].address;
			        		  let description = result[i].description;
			        		  let images = result[i].images;
			        		  let query_point = new Point(longitude,latitude);
			        		  let graphic = new Graphic(query_point,pictureSymbol);
			        		  view.graphics.add(graphic);
			        		  resultsLayer.add(graphic);
			        		  
			        		  html += "<div class='query-result-main kyp-list query-resultDiv-seperator incident-issue-result'>" +
		        		  		
			        		    "<div class='result-task'><label>Address : </label><p>"+address+"</p></div>" +
		  			 	        "<div class='result-task'><label>Description : </label><p>"+description+"</p></div>" +
		  			 	        "<div class='result-task'><label> Latitude : </label><p>"+latitude+"</p></div>" +
		  						"<div class='result-task'><label> Longitude : </label><p> "+longitude+"</p></div>" +
		  						"<div class='result-task'>" +
			  						"<i class='fa fa-search query-zoom-feature' aria-hidden='true' title='Zoom To Feature' " +
		 	           					"data-longitude="+longitude+" data-latitude="+latitude+" " +
		 	           					"data-images = '"+images+"' data-address='"+address+"' data-description='"+description+ "' " +
		 	           					"onclick='window.depMap3dController.zoomToIncidentIssues(this)'>" +
		 	           				"</i>" +
		 	           			"</div>" +
		  						"</div>";
		        		  }
		        		  $("#incident_rslt").append(html);
		        	  }
		        	  
		        	  if(total_feature == 1){
							$(".query-result-main").addClass("single-record");
						}else{
							$(".query-result-main").removeClass("single-record");
						}	
					 
					 window.depMap3dController.previousNextFeature(total_feature,'.query-result .incident-issue-result');
		        	  
		          },
		          zoomToIncidentIssues : function zoomToIncidentIssues(data){

		        	  window.depUtlityController.minimizePopup();
		        	  
		        	  let template = "", query_point = null;
		        	  
		        	  let incident_type = $("#incident_type").val();
		        	  if(incident_type === "1"){
		        		  
		        		  let latitude = $(data).data("latitude");
			        	  let longitude = $(data).data("longitude");
							
			        	  query_point = new Point(longitude,latitude);
			        	  let description = $(data).data("description");
			        	  let accident_type = $(data).data("accident_type");
			        	  let address = $(data).data("address");
			        	  let vehicle_number = $(data).data("vehicle_number");
			        	  let vehicle_type = $(data).data("vehicle_type");
							
			        	  let images = $(data).data("images");
			        	  let imgArray = images.split(",");
							
			        	  let content = "";
			        	  
			        	  for(let a in imgArray){
							let img = imgArray[a];
							let img_url = window.iscdl.appData.baseURL + 'api-docs/getImage/incident/' + img;
							if(a == imgArray.length-1){
								content += "<a target='_blank' href='"+img_url+"'>View Image</a>";
							}else{
								content += "<a target='_blank' href='"+img_url+"'>View Image</a>"  + " , ";	
							}
			        	  }
			        	  
			        	  template += '<table style="width: 100%!important;border: 1px solid #dee2e6;">' +
							'<tbody><tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Accident Type</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+accident_type+'</td></tr>' + 
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Description</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+description+'</td></tr>' + 
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Address</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+address+'</td></tr>' + 
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Vehicle Type</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+vehicle_type+'</td></tr>' + 
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Longitude</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+longitude+'</td></tr>' +
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Latitude</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+latitude+'</td></tr>' + 
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Image</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+content+'</td></tr>';
		        	  }else {
		        		  
		        		  let latitude = $(data).data("latitude");
			        	  let longitude = $(data).data("longitude");
							
			        	  query_point = new Point(longitude,latitude);
			        	  let description = $(data).data("description");
			        	  let address = $(data).data("address");
							
			        	  let images = $(data).data("images");
			        	  let imgArray = images.split(",");
							
			        	  let content = "";
			        	  
			        	  for(let a in imgArray){
							let img = imgArray[a];
							let img_url = window.iscdl.appData.baseURL + 'api-docs/getImage/incident/' + img;
							if(a == imgArray.length-1){
								content += "<a target='_blank' href='"+img_url+"'>View Image</a>";
							}else{
								content += "<a target='_blank' href='"+img_url+"'>View Image</a>"  + " , ";	
							}
			        	  }
		        		  
			        	  template += '<table style="width: 100%!important;border: 1px solid #dee2e6;">' +
							'<tbody><tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Description</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+description+'</td></tr>' + 
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Address</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+address+'</td></tr>' + 
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Longitude</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+longitude+'</td></tr>' +
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Latitude</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+latitude+'</td></tr>' + 
							'<tr>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">' +
							'<b>Image</b></td>' +
							'<td style="border: 1px solid #dee2e6;padding: 8px;">'+content+'</td></tr>';
		        	  }
		        	  
						let info_template_content = template + '</tbody></table>';
						
						view.goTo({
							  target: query_point,
							  zoom: 18
						});
						
						view.popup.location = query_point;
						view.popup.visible = true;
						
						view.popup.open({
							title: "Incident Issue", 
							content: info_template_content
						});
		          },
		          getFieldsFromLayerName :  function getFieldsFromLayerName(layername){
			        	
		        	  var fields = [];
		        	  fieldsInfo = [];
		        	  
		        	  if(layername == ""){
		        		  fields = [];
		        		  fieldsInfo = fields;
		        		  return;
		        	  }
		        	  
		        	  var layer = "";
		        	  
		        	switch (layername) {
					
					case "Building":
						layer = building_flayer;
						for(let i in layer.fields){
							if(layer.fields[i].name == "ward_no" || layer.fields[i].name == "zone_no" 
								|| layer.fields[i].name == "building_heights"){
								fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
							}
						}
						break;
					case "Devider":
						layer = devider_slayer;
						for(let i in layer.fields){
							if(layer.fields[i].name != "globalid"){
							fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
						}}
						break;
					case "Electric Pole":
						layer = electric_pole_slayer;
						for(let i in layer.fields){
							if(layer.fields[i].name != "globalid"){
							fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
						}}
						break;
					case "Footpath":
						layer = footpath_slayer;
						for(let i in layer.fields){
							if(layer.fields[i].name != "globalid"){
							fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
						}}
						break;
					case "Manhole":
						layer = manhole_slayer;
						for(let i in layer.fields){
							if(layer.fields[i].name != "globalid"){
							fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
						}}
						break;
					case "Road":
						layer = road_slayer;
						for(let i in layer.fields){
							/*
							 * if(layer.fields[i].name != "globalid"){
							 * fields.push({"Name" : layer.fields[i].name,"Type" :
							 * layer.fields[i].type}); }
							 */
							if(layer.fields[i].name == "ward_no" || layer.fields[i].name == "zone_no"){
								fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
							}
						}
						break;
					case "Street Light":
						layer = street_light_slayer;
						for(let i in layer.fields){
							if(layer.fields[i].name != "globalid"){
							fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
						}}
						break;
					case "Tree":
						layer = tree_slayer;
						for(let i in layer.fields){
							if(layer.fields[i].name != "globalid"){
							fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
						}}
						break;
					case "Water Tank":
						layer = water_tank_slayer;
						for(let i in layer.fields){
							if(layer.fields[i].name != "globalid"){
							fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
						}}
						break;
					case "Water Bodies":
						layer = water_bodies_slayer;
						for(let i in layer.fields){
							if(layer.fields[i].name != "globalid"){
							fields.push({"Name" : layer.fields[i].name,"Type" : layer.fields[i].type});
							}}
						break;
					default:
						fields = [];
						break;
					}
		        	fieldsInfo = fields;
		        	return fields; 
		          },
		          getLayerObjFromLayerName : function getLayerObjFromLayerName(layername){

		        	  var layerobj = "";
		        	  
		        	  if(layername == ""){
		        		  return layerobj;
		        	  }
		        	  
		        	  switch (layername) {
					case "Building":
//						layerobj = building_wsl1_slayer;
						layerobj = building_flayer;
						break;
					case "Devider":
						layerobj =devider_slayer ;			
						break;
					case "Electric Pole":
						layerobj = electric_pole_slayer;
						break;
					case "Footpath":
						layerobj = footpath_slayer;
						break;
					case "Manhole":
						layerobj = manhole_slayer;
						break;
					case "Road":
						layerobj = road_slayer;
						break;
					case "Street Light":
						layerobj =street_light_slayer ;
						break;
					case "Tree":
						layerobj = tree_slayer;
						break;
					case "Water Tank":
						layerobj = water_tank_slayer;
						break;
					case "Water Bodies":
						layerobj = water_bodies_slayer;
						break;
					default:
						layerobj = "";
						break;
					}
		        	  
		        	  return layerobj;
		          },
		          removeHighlightFeatures : function removeHighlightFeatures(){
		  			
		  			if (highlights) {
		      			if (highlights.length > 0) {
		      	              highlights.forEach(function(highlight) {
		      	                highlight.remove();
		      	              });
		      	              highlights = [];
		      	            }
		  	            }

		  			view.graphics.removeAll();
		  			
		  		},
		  		zoomToLayer : function zoomToLayer(layer) {
		              return layer.queryExtent().then(function (response) {
		                view.goTo(response.extent).catch(function (error) {
		                  if (error.name != "AbortError") {
		                    console.error(error);
		                  }
		                });
		              });
		        },
		        highlightLayerByFeatureProperty : function highlightLayerByFeatureProperty(layerObj){
		        	
		        	var propertyName = "";
		        	let title = layerObj.title;
		        	
		        	switch (title) {
		        	case "Devider" :  case "Electric Pole": 
		        		case "Footpath": case "Manhole": case "Road": case "Street Light":
		        		case "Water Tank": case "Water Bodies": case "Roof Procedural": case "Building Feature Layer" :
		        		propertyName = "objectid";
						break;
					case "Tree":
						propertyName = "objectid_1";
						break;
					case "Building" :
						propertyName = "OBJECTID";
						break;
					default:
						propertyName = "";
						break;
					}
		        	return propertyName;
		        },
		        bindListOfAttributeFeatures : function(results,propertyName){
		        	let features = results.features;
		        	let length = features.length;
		        	
		        	$("#attr_query_result").append("<h3 id='total_features_length'>Number of features found : " + 1 + "/" + length+"</h3>" + 
		        			"<div class='np-main w-100 p-0'>" +
							"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
							"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
							"</div>");
		        	
	  				for (var i = 0; i < length; i++) {
						 let feature = features[i];
						 var columns = feature.attributes;
		 				 let length = Object.keys(columns).length;
		 				 
		 				 let query_html_content = "";
		 				 let first = "<div class='query-result-main kyp-list query-resultDiv-seperator 3d-attribute-query'>";
		 				 query_html_content += first;
		 				 
		 				 let second = "";
		 				 
		 				 for(let a=0;a<length;a++){
		 					
		 					let key  = Object.keys(columns)[a];
		 					
		 					if(key == "objectid" || key == "objectid_1"){
								continue;
							}
		 					
		 					let attr = feature.attributes[key];
		 					
		 					if(attr == null || attr == "" || attr == "null"){
		 						attr = "";
		 					}
		 					let columnName = window.depMap3dController.getFeatureColumnName(key);
		 					second = "<div class='result-task'><label>"+columnName+":</label><p>" +attr+ "</p></div>";
		 					query_html_content += second;
		 				}
		 				 
		 				let third = "<div class='result-task'><i class='fa fa-search query-zoom-feature' aria-hidden='true' title='Zoom To Feature' " +
						 "<a data-objectid="+columns[propertyName]+" " +
						 "onclick='window.depMap3dController.zoomToAttributeQueryFeatures(this)'></i></div></div>";
		 				 
		 				query_html_content += third;
		                $("#attr_query_result").append(query_html_content);
					 }
	  				
	  				if(length == 1){
						$(".query-result-main").addClass("single-record");
					}else{
						$(".query-result-main").removeClass("single-record");
					}	
				 
	  				window.depMap3dController.previousNextFeature(length,'.query-result .3d-attribute-query');
		        },
		        zoomToAttributeQueryFeatures : function(data){
		        	let object_id = $(data).data("objectid");
		        	let layer = $("#attr_data_category option:selected").val();
		        	let flayer;
		        	if(layer == "Road"){
		        		flayer = road_slayer; 
		        	}else if(layer == "Building"){
		        		flayer = building_flayer;
		        	}else if(layer == "Building Feature Layer"){
		        		flayer = building_flayer;
		        	}
		        	
		        	 /*var queryExtent = new Query({
	                     objectIds: [object_id],
	                   });*/
		        	 
		        	 //window.depMap3dController.removeHighlightFeatures();
		        	view.graphics.removeAll();
		        	
		        	 window.depUtlityController.minimizePopup();
		        	 
		        	 const query = flayer.createQuery();
		        	 query.objectIds = object_id;
		        	 query.outSpatialReference = 4326;
		        	 query.returnGeometry = true;
		        	 
		        	 var graphic,highlight;
		        	 
		        	 flayer.queryFeatures(query).then((results) => {

		        		 view.goTo(results.features).catch((error) => {
		        		    	if (error.name != "AbortError"){
		        		        console.error(error);
		        		      }
		        		 });
		        		 
		        		 let feature = results.features[0];
		        		 
		        		 const polygonGraphic = new Graphic({
		        	          geometry: feature.geometry,
		        	     });
		        		 
		        		 polygonGraphic.symbol = {
						            type: "simple-fill",
						            style: "none",
						            outline: {
						              color: [0,255,255],
						              width: 7
						            }
						   }
		        		 view.graphics.add(polygonGraphic); 
		        	});
		        	 
		        	 
		        	 
		        	 
		        	 /*if(layerViews.length > 0){
		        		 let layerView = layerViews[0];
		        		 highlightSelect = layerView.highlight([object_id]);	
		                 highlights.push(highlightSelect);
		        		 layerView
	                     .queryExtent(queryExtent)
	                     .then(function (result) {
	                    	 
	                    	 if (result.extent) {
	                             view
	                               .goTo(result.extent.expand(7), {
	                                 speedFactor: 0.5
	                               })
	                               .catch(function (error) {
	                                 if (error.name != "AbortError") {
	                                   console.error(error);
	                                   $u.notify('info', error.name,
	                      						error.message, '');
	                               	   return;
	                                 }
	                               });
	                           }else{
	                        	   $u.notify('info', 'Notification',
	               						'Extent not found for current layer view,please zoom out map for getting feature extent', '');
	                        	   return; 
	                           }
	                     });
		        	 }*/
		        },
		        bindProximityResult : function(results,propertyName){
		        	
		        	let features = results.features;
		        	let length = features.length;
		        	
		        	$("#polygon_buffer_rslt").append("<h3 id='total_features_length'>Number of features found: " + 1 + "/" + length+"</h3>" + 
		        			  "<div class='np-main w-100 p-0'>" +
								"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
								"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
								"</div>");
		        	
		        	for (var i = 0; i < length; i++) {
						 let feature = features[i];
						 var columns = feature.attributes;
		 				 let length = Object.keys(columns).length;
		 				 
		 				 let query_html_content = "";
		 				 let first = "<div class='query-result-main kyp-list query-resultDiv-seperator proximity-analysis-rslt'>";
		 				 query_html_content += first;
		 				 
		 				 let second = "";
		 				 
		 				 for(let a=0;a<length;a++){
		 					
		 					let key  = Object.keys(columns)[a];
		 					
		 					if(key == "objectid" || key == "objectid_1"){
								continue;
							}
		 					
		 					let attr = feature.attributes[key];
		 					
		 					/*if(key == 'db_ezc5d.hsu_oskxt.Building_P1_P2.fid'){
		 						key = 'FID';
		 					}
		 					*/
		 					if(attr == null || attr == "" || attr == "null"){
		 						attr = "";
		 					}
		 					
		 					let columnName = window.depMap3dController.getFeatureColumnName(key);
		 					second = "<div class='result-task'><label>"+columnName+":</label><p>" +attr+ "</p></div>";
		 					query_html_content += second;
		 				}
		 				let third = "<div class='result-task'><i class='fa fa-search query-zoom-feature' aria-hidden='true' title='Zoom To Feature' " +
		 							 "<a data-objectid="+columns[propertyName]+" " +
		 							 "onclick='window.depMap3dController.zoomToProximityAnalysisFeature(this)'></i></div></div>";
		 				query_html_content += third;
		                $("#polygon_buffer_rslt").append(query_html_content);
					 }
		        	
		        	if(length == 1){
						$(".query-result-main").addClass("single-record");
					}else{
						$(".query-result-main").removeClass("single-record");
					}	
		        	
		        	window.depMap3dController.previousNextFeature(length,'.query-result .proximity-analysis-rslt');
		        },
		        zoomToProximityAnalysisFeature : function(data){

		        	let object_id = $(data).data("objectid");
		        	let layer = $("#polygon_buffer_layer option:selected").val();
		        	
		        	let flayer;
		        	if(layer == "Road"){
		        		flayer = road_slayer; 
		        	}else if(layer == "Building"){
		        		flayer = building_flayer;
		        	}else if(layer == "Building Feature Layer"){
		        		flayer = building_flayer;
		        	}
		        	
		        	 /*var queryExtent = new Query({
	                     objectIds: [object_id],
	                   });*/
		        	 
		        	//window.depMap3dController.removeHighlightFeatures();
		        	view.graphics.removeAll();
		        	window.depUtlityController.minimizePopup();

		        	const query = flayer.createQuery();
		        	query.objectIds = object_id;
		        	query.outSpatialReference = 4326;
		        	query.returnGeometry = true;
		        	 
		        	 var graphic,highlight;
		        	 
		        	 flayer.queryFeatures(query).then((results) => {

		        		 view.goTo(results.features).catch((error) => {
		        		    	if (error.name != "AbortError"){
		        		        console.error(error);
		        		      }
		        		 });
		        		 
		        		 let feature = results.features[0];
		        		 
		        		 const polygonGraphic = new Graphic({
		        	          geometry: feature.geometry,
		        	     });
		        		 
		        		 polygonGraphic.symbol = {
						            type: "simple-fill",
						            style: "none",
						            outline: {
						              color: [0,255,255],
						              width: 7
						            }
						   }
		        		 view.graphics.add(polygonGraphic); 
		        	});
		        	 
		        	 /*if(layerViews.length > 0){
		        		 let layerView = layerViews[0];
		        		 highlightSelect = layerView.highlight(object_id);	
		                 highlights.push(highlightSelect);
		        		 layerView
	                     .queryExtent(queryExtent)
	                     .then(function (result) {
	                    	 
	                    	 if (result.extent) {
	                             view
	                               .goTo(result.extent.expand(7), {
	                                 speedFactor: 0.5
	                               })
	                               .catch(function (error) {
	                                 if (error.name != "AbortError") {
	                                   console.error(error);
	                                   $u.notify('info', error.name,
	                      						error.message, '');
	                               	   return;
	                                 }
	                               });
	                           }else{
	                        	   $u.notify('info', 'Notification',
	               						'Extent not found for current layer view,please zoom out map for getting feature extent', '');
	                        	   return; 
	                           }
	                     });
		        	 }*/
		        
		        },
		        getOutFieldsByLayerName : function(layer_name){
		        	let outfields = null;
		        	switch (layer_name) {
					case "Road":
						outfields = ["road_name","objectid",
							"ward_name","ward_no","zone_name","zone_no"];
						break;

					/*case "Building":
						outfields = ["b_id","objectid","locality","building_height_meters",
							"landmark","ward_name","ward_no","zone_name","zone_no"];*/
						
					case "Building":
						outfields = ["Building_ID","OBJECTID","Locality","Height_Meter",
							"Landmark","Ward_Name","Ward_No","Zone_Name","Zone_No"];
						break;
					default:
						outfields = ["*"];
						break;
					}
		        	return outfields;
		        },
		        clearUpSelection : function clearUpSelection() {
		            view.graphics.removeAll();
		        },
		        selectFeatures : function selectFeatures(geometry) {
		            view.graphics.removeAll();
		            layerViews = [];
		            
		            if (view) {
		              let layer_name = $("#polygon_buffer_layer").val();
					  let layerobj = window.depMap3dController.getLayerObjFromLayerName(layer_name);
					  let outFields = window.depMap3dController.getOutFieldsByLayerName(layer_name);
					  
		              //view.whenLayerView(layerobj).then(function(layerView) {
		            	  layerViews = [];
		            	  
		            	  var query = layerobj.createQuery();
						  query.geometry = geometry;
						  query.outFields = outFields;
						  
						  
						  $(".loader").fadeIn();
						  layerobj
			                .queryFeatures(query)
			                .then(function (results) {
			                  const graphics = results.features;
			                  	if(graphics.length == 0){
			                  		$(".loader").fadeOut();
			                  		$u.notify("info", "Notification","No Result found");
			                  		window.depMap3dController.removeHighlightFeatures();
			                  		return;
			                  	}else{
			                        view.goTo(geometry.extent.expand(2)).catch(function (error) {
			                          if (error.name != "AbortError") {
			                            console.error(error);
			                          }
			                        });
			                  	}
			                  	//layerViews.push(layerView);
			                  	let propertyName = window.depMap3dController.highlightLayerByFeatureProperty(layerobj);
			                  	
			                  	window.depMap3dController.bindProximityResult(results,propertyName);
			                  	$(".loader").fadeOut();
			                })
			                .catch(window.depMap3dController.errorCallback);
		             // });
		            }
		          },
		  		  errorCallback : function errorCallback(error) {
		            console.log("error:", error);
		            	$(".loader").fadeOut();
		        	   layerViews = [];
		        	   $u.notify("info", error.name,error.message);
		        	   return;
		  		  },
		  		previousNextFeature : function(total_feature,className){
		        	  
		        	  var divs = $(className);
		        	    var now = 0; // currently shown div
		        	    divs.hide().first().show();
		        	    
		        	    if(total_feature == 1){
							$(".with-np-link").addClass("disable-np-link");
						}else{
							$(".with-np-link").removeClass("disable-np-link");
						}
		        	    
		        	    $(".next").click(function (e) {
		        	        divs.eq(now).hide();
		        	        now = (now + 1 < divs.length) ? now + 1 : 0;
		        	        if(total_feature){
		        	        	$("#total_features_length").text("Number of features found : " + (now + 1) + "/" + total_feature);
		        	        }
		        	        divs.eq(now).show(); // show next
		        	    });
		        	    $(".prev").click(function (e) {
		        	        divs.eq(now).hide();
		        	        now = (now > 0) ? now - 1 : divs.length - 1;
		        	        if(total_feature){
		        	        	$("#total_features_length").text("Number of features found : " + (now + 1) + "/" + total_feature);
		        	        }
		        	        divs.eq(now).show(); // or .css('display','block');
		        	    });
		          },
		          getFeatureInfo : function getFeatureInfo(event) {
		        	  view.graphics.removeAll();
		        	  
		        	  view.hitTest(event)
								.then(function(response) {
											let result = response.results;
											if (result.length > 0) {
												let content = '<table style="width: 100%!important;border: 1px solid #dee2e6;">' +
												'<tbody>';
													let graphic = result[0].graphic;
														
													if (highlight) {
													        highlight.remove();
													        highlight = null;
													}
													view.whenLayerView(graphic.layer).then((layerView) => {
													        highlight = layerView.highlight(graphic);
													});
													let mapPoint = result[0].mapPoint;
													let attributes = graphic.attributes;
													let length = Object
															.keys(attributes).length;
													let table_content = "";
													for (let a = 0; a < length; a++) {
														let key = Object
																.keys(attributes)[a];
														let attr = graphic.attributes[key];
														
														if (attr == null
																|| attr == ""
																|| attr == "null") {
															attr = "";
														}
														
														if(key == "objectid" || key == "objectid_1"){
															continue;
														}
														
														if(key == "st_area(shape)"){
															key = "area[m.sq]";
														}
														
														if(key == "st_length(shape)"){
															key = "length[m]";
														}
														
														
														let columnName = window.depMap3dController.getFeatureColumnName(key);

														if(columnName == 'Globalid'){
															continue;
														}
														
														if(columnName == 'Building_Heights'){
															columnName = 'Building Height [ Meter ]';
														}
														
														if(columnName == 'Height Meter'){
															columnName = 'Height [ Meter ]';
															attr = Math.ceil(attr - .24);
														}
														
														if (attr == null
																|| attr == ""
																|| attr == "null") {
															attr = "";
														}
														content += '<tr><td style="border: 1px solid #dee2e6;padding: 8px;">' +
															'<b>'+columnName+'</b></td>' +
															'<td style="border: 1px solid #dee2e6;padding: 8px;">'+attr+'</td></tr>';
													}
													let info_template_content = content + '</tbody></table>';
													
													let layer_name = graphic.layer.title;
													
													graphic.symbol = {
												            type: "simple-fill",
												            style: "none",
												            outline: {
												              color: [0,255,255],
												              width: 2
												            }
												   }
													
													view.graphics.add(graphic);
													
													let x = mapPoint.x;
													let y = mapPoint.y;
													var point = {
														type : "point",
														x : x,
														y : y
													};
													
													let mp = webMercatorUtils.webMercatorToGeographic(point);
													view.popup.open({});
													view.popup.title = layer_name;
													view.popup.content = info_template_content;
													view.popup.location = {
														latitude : mp.y,
														longitude : mp.x
													};
											} else {
												view.popup.title = "";
												view.popup.content = "";
												view.popup.close();
											}
										});
					},
					getFeatureColumnName : function getFeatureColumnName(str) {
			        	  var i, columnName = str.split('_');
			        	  for (i=0; i<columnName.length; i++) {
			        		  columnName[i] = columnName[i].charAt(0).toUpperCase() + columnName[i].slice(1);
			        	  }
			        	  return columnName.join(' ');
			        	},
			        	zoomToRectangleBox : function(){
			        		rectangleGraphicsLayer = new GraphicsLayer();
				            map.add(rectangleGraphicsLayer);
				            
					            let rectangleSketchViewModel = new SketchViewModel({
					              view: view,
					              layer: rectangleGraphicsLayer,
					              pointSymbol: {
					                type: "simple-marker",
					                color: [255, 255, 255, 0.5],
					                size: "1px",
					                outline: {
					                  color: "gray",
					                  width: 0
					                }
					              }
					            });
				            
					            rectangleSketchViewModel.create("rectangle");
					            rectangleSketchViewModel.on("create", function (event) {
						          if (event.state === "complete") {
						        	  rectangleGraphicsLayer.remove(event.graphic);
						        	  map.remove(rectangleGraphicsLayer);
						        	  
						        	  let graphic = event.graphic;
						        	  let geom = graphic.geometry;
						        	  let extent = geom.extent;
						        	  let xmax = extent.xmax;
						        	  let ymax = extent.ymax;
						        	  let xmin = extent.xmin;
						        	  let ymin = extent.ymin;
						        	  let srs = extent.spatialReference.wkid;
						        	  
						        	  if((xmin != "NaN" && xmin != null && xmin != undefined) && 
				           				(ymin != "NaN" && ymin != null && ymin != undefined) &&
				           				(xmax != "NaN" && xmax != null && xmax != undefined) && 
				           				(ymax != "NaN" && ymax != null && ymax != undefined)){
						        		  
						        		  let maxp = {type : "point",x : xmax,y : ymax};
							        	  let minp = {type : "point",x : xmin,y : ymin};
							        	  let minmp = webMercatorUtils.webMercatorToGeographic(minp);
							        	  let maxmp = webMercatorUtils.webMercatorToGeographic(maxp);
							        	  
							        	  let boxZoomExtent = new Extent(minmp.x,minmp.y, maxmp.x, maxmp.y,new SpatialReference({
							  						wkid : 4326
							  			  }));
							        	  
							        	  if(boxZoomExtent != undefined || boxZoomExtent != null){
							        		  view.goTo(boxZoomExtent);
							        		  $('#zoomBoxMap'). prop('title', 'Enable Box Zoom');
				           					  $('#zoomBoxMap'). css('opacity', '0.5');
				           					  zoom_box_tool = false;
							        	  }
						        	  }
						          }
						    });
			        	},
			        	zoomOutToRectangleBox : function(){

			        		rectangleGraphicsLayer = new GraphicsLayer();
				            map.add(rectangleGraphicsLayer);
				            
					            let rectangleSketchViewModel1 = new SketchViewModel({
					              view: view,
					              layer: rectangleGraphicsLayer,
					              pointSymbol: {
					                type: "simple-marker",
					                color: [255, 255, 255, 0.5],
					                size: "1px",
					                outline: {
					                  color: "gray",
					                  width: 0
					                }
					              }
					            });
				            
					            rectangleSketchViewModel1.create("rectangle");
					            rectangleSketchViewModel1.on("create", function (event) {
						          if (event.state === "complete") {
						        	  rectangleGraphicsLayer.remove(event.graphic);
						        	  map.remove(rectangleGraphicsLayer);
						        	  
						        	  let graphic = event.graphic;
						        	  let geom = graphic.geometry;
						        	  let extent = geom.extent;
						        	  let xmax = extent.xmax;
						        	  let ymax = extent.ymax;
						        	  let xmin = extent.xmin;
						        	  let ymin = extent.ymin;
						        	  let srs = extent.spatialReference.wkid;
						        	  
						        	  if((xmin != "NaN" && xmin != null && xmin != undefined) && 
				           				(ymin != "NaN" && ymin != null && ymin != undefined) &&
				           				(xmax != "NaN" && xmax != null && xmax != undefined) && 
				           				(ymax != "NaN" && ymax != null && ymax != undefined)){
						        		  
						        		  let maxp = {type : "point",x : xmax,y : ymax};
							        	  let minp = {type : "point",x : xmin,y : ymin};
							        	  let minmp = webMercatorUtils.webMercatorToGeographic(minp);
							        	  let maxmp = webMercatorUtils.webMercatorToGeographic(maxp);
							        	  
							        	  let drawminx = minmp.x;
				           				  let drawminy = minmp.y;
				           				  let drawmaxx = maxmp.x;
				           			      let drawmaxy = maxmp.y;
							        	  
							        	  let current_minx = view.extent.xmin;
				           				  let current_miny = view.extent.ymin;
				           				  let current_maxx = view.extent.xmax;
				           				  let current_maxy = view.extent.ymax;
				           				  
				           				  
				           				  let cmaxp = {type : "point",x : current_maxx,y : current_maxy};
							        	  let cminp = {type : "point",x : current_minx,y : current_miny};
							        	  let cminmp = webMercatorUtils.webMercatorToGeographic(cminp);
							        	  let cmaxmp = webMercatorUtils.webMercatorToGeographic(cmaxp);
				           				  
							        	  
				           				  let diff_minx = cminmp.x - drawminx;
				           				  let diff_miny = cminmp.y - drawminy;
				           				  let diff_maxx = cmaxmp.x - drawmaxx;
				           				  let diff_maxy = cmaxmp.y - drawmaxy;
			           					
				           				  let zoomout_minx = cminmp.x + diff_minx;
				           				  let zoomout_miny = cminmp.y + diff_miny;
				           				  let zoomout_maxx = cmaxmp.x + diff_maxx;
				           				  let zoomout_maxy = cmaxmp.y + diff_maxy;
							        	  
							        	  let boxZoomExtent = new Extent(zoomout_minx,zoomout_miny, zoomout_maxx, zoomout_maxy,
							        			  new SpatialReference({wkid : 4326
							        	  }));
							        	  
							        	  if(boxZoomExtent != undefined || boxZoomExtent != null){
							        		  view.goTo(boxZoomExtent);
							        		  $('#zoomOutBoxMap'). prop('title', 'Enable Box Zoom Out');
				           					  $('#zoomOutBoxMap'). css('opacity', '0.5');
				           					  zoom_out_box_tool = false;
							        	  }
						        	  }
						          }
						    });
			        	},
			}

			window.depMap3dController = base;

			
			/**
			 * checking for module permission
			 */
			$("ul[id*=leftPanel] li").click(function () {
				let val = $(this).attr('title');
				window.depUtlityController.setPageAccessAccordingToModule(val);
			});
			
			$("ul[id*=downPanel] li").click(function () {
				
				let val = $(this).attr('title');
				/**
				 * for hiding old content of print
				 */
				if(val != "Print"){
					document.getElementById("print_submit").innerHTML = "Print";
	                document.getElementById("print_submit").style.display = 'block';
	                document.getElementById("print_submit").disabled = false; 
	                document.getElementById("printResult").style.display = 'none';
				
	                $('#form_print').trigger('reset');
	                
	                /**
					 * hide printout option after again open
					 */
					let length = $( "#print_button div.esriPrint a").length;
					if(length > 0){
						$('.esriPrint a').remove(); 
					}
				}
            });
			
			/**
			 * Reported Issue popup click event
			 */
			$('#reported_issues_popup').click(function(){
				$("#incident_rslt").html("");
				view.graphics.removeAll();
				if(resultsLayer){
					let graphics = resultsLayer.graphics;
					let items = resultsLayer.graphics.items;
					if(items.length > 0){
						for(let i = 0 ; i<items.length;i++){
							items.pop();
						}
					}
				}
				
				map.layers.remove(resultsLayer);
				$('#form_incident_issues').trigger('reset');
				window.depUtlityController.removeError('form_incident_issues');
				window.depUtlityController.getDepartmentList('incident_department');
			});
			
			// clear incident issues
			$('#clr_incident_issues').click(function(){
				$("#incident_rslt").html("");
				view.graphics.removeAll();
				if(resultsLayer){
					let graphics = resultsLayer.graphics;
					let items = resultsLayer.graphics.items;
					if(items.length > 0){
						for(let i = 0 ; i<items.length;i++){
							items.pop();
						}
					}
				}
				
				map.layers.remove(resultsLayer);
				view.popup.visible = false;
				$('#form_incident_issues').trigger('reset');
				window.depUtlityController.removeError('form_incident_issues');
				view.goTo(initialExtent);				
			});
			
			
			/**
			 * Map Info Click event
			 */
			$("#toggle_map_info").click(function() {
				
				if (map_info_tool) {
					
					if(window.textClickEvent){
						window.textClickEvent.remove();
						$('.draw-tools-select li a').removeClass('active');
					}
					
					map_info_tool = false;
					$('#mapInfoTool').prop('title', 'Disable Map Info');
					$('#mapInfoTool').css('opacity', '1.0');
					viewFeatureInformation();
					
				} else {
					map_info_tool = true;
					$('#mapInfoTool').prop('title', 'Enable Map Info');
					$('#mapInfoTool').css('opacity', '0.5');
					if (viewPointClickEvent) {
						//viewPointMoveEvent.remove();
						viewPointClickEvent.remove();
					}
					view.popup.title = "";
					view.popup.content = "";
					view.popup.close();
				}
			});
			
			
			$("#box_zoom_map").click(function(){
				
				if(zoom_box_tool){
					zoom_box_tool = false;
					$('#zoomBoxMap'). prop('title', 'Enable Box Zoom');
					$('#zoomBoxMap'). css('opacity', '0.5');
					
				}else{
					zoom_box_tool = true;
					$('#zoomBoxMap'). prop('title', 'Disable Box Zoom');
					$('#zoomBoxMap'). css('opacity', '1.0');
					
					if (viewPointClickEvent) {
						//viewPointMoveEvent.remove();
						viewPointClickEvent.remove();
					}
		            window.depMap3dController.zoomToRectangleBox();
				}
			});
			
			$("#box_zoom_out_map").click(function(){
				
				if(zoom_out_box_tool){
					zoom_out_box_tool = false;
					$('#zoomOutBoxMap'). prop('title', 'Enable Box Zoom Out');
					$('#zoomOutBoxMap'). css('opacity', '0.5');
					
				}else{
					zoom_out_box_tool = true;
					$('#zoomOutBoxMap'). prop('title', 'Disable Box Zoom Out');
					$('#zoomOutBoxMap'). css('opacity', '1.0');
					
					if (viewPointClickEvent) {
						//viewPointMoveEvent.remove();
						viewPointClickEvent.remove();
					}
		            window.depMap3dController.zoomOutToRectangleBox();
				}
			});
			
			$("#incident_department").change(function(){
				let incident_type = document.getElementById("incident_type");
				$('#incident_type').empty().append('');
				let dept_id = $("#incident_department").val();
				let optionArr = ['Accident', 'Chain Snatching', 'Eve Teasing'];
				let option = document.createElement('option');
				option.value = "";
				option.innerHTML = "Select Incident Type";
				incident_type.appendChild(option);
				option = document.createElement('option');
				option.value = "1";
				option.innerHTML = optionArr[0];
				incident_type.appendChild(option);
				if(dept_id === "16"){ // CHECKING STATIC ID FOR POLICE DEPT
					for(var i=1;i<3;i++){
						let option1 = document.createElement('option');
						option1.value = i+1;
						option1.innerHTML = optionArr[i];
						incident_type.appendChild(option1);
					}
				}
				
			});
			
			
			/*
			 * ------------Ready function -----------------
			 * 
			 */

			$(document)
					.ready(
							function() {
								$(".loader").fadeOut();
								let token = localStorage.getItem("token");
								if (token !== undefined && token !== null) {
									$(".logout-link").css('display', 'flex');
									$(".drop-down-main").css('display', 'flex');
									$(".user-info").text(JSON.parse(localStorage.getItem("user")).userName);
								}
								$(".user-manual-ctbtn").css('display','none');
								$(".user-manual-dpbtn").css('display','flex');
								
								$("#citizen-logout-btn")
										.click(
												function() {
													window.depUtlityController.userLogout();
												});

								/**
								 * get book-mark list
								 */

								let user_id = localStorage.getItem('user_data');

								if (user_id != undefined && user_id != null
										&& user_id != "") {

									window.depMap3dController
											.getBookMarkList(user_id);
								}

								/**
								 * add book-mark click event
								 * 
								 */

								$("#add-bookmark").click(
										function() {
											window.depMap3dController
													.setBookmarkInfo();
										});

								/**
								 * delete bookmark click event
								 */
								$("#delete-bookmark")
										.click(
												function() {

													let user_id = localStorage
															.getItem('user_data');

													if (user_id != undefined
															&& user_id != null
															&& user_id != "") {

														let bookmarkIds = window.depMap3dController
																.getSelectedBookmarkIds();

														if (bookmarkIds != undefined
																&& bookmarkIds != null
																&& bookmarkIds != "") {
															window.depMap3dController
																	.deleteLoginUserBookmarks(bookmarkIds);
														}
													} else {
														window.depMap3dController
																.deleteCitizenBookmarks();
													}
												});

								

//								CHECK IF ZOOM LEVEL IS AVAILABLE OR NOT FROM SHARE URL 
								let shareParams = new URLSearchParams(window.location.search);
								let shareFlag = false;
								if(shareParams.has('xmin')){
									localStorage.setItem("xmin",shareParams.get('xmin'));
									shareFlag = true;
								}
								if(shareParams.has('ymin')){
									localStorage.setItem("ymin",shareParams.get('ymin'));
									shareFlag = true;
								}
								if(shareParams.has('xmax')){
									localStorage.setItem("xmax",shareParams.get('xmax'));
									shareFlag = true;
								}
								if(shareParams.has('ymax')){
									localStorage.setItem("ymax",shareParams.get('ymax'));
									shareFlag = true;
								}
								if(shareParams.has('wkid')){
									localStorage.setItem("spatialReference",shareParams.get('wkid'));
									shareFlag = true;
								}
//								UPDATE WINDOW URL IF PAGE OPENED FROM SHARE URL
								if(shareFlag){
									window.location.replace(window.location.origin + window.location.pathname);
								}
								
								let xmin = localStorage.getItem("xmin");
								let ymin = localStorage.getItem("ymin");
								let xmax = localStorage.getItem("xmax");
								let ymax = localStorage.getItem("ymax");
								let srs = localStorage
										.getItem("spatialReference");

								if ((xmin != null && xmin != undefined)
										&& (ymin != null && ymin != undefined)
										&& (xmax != null && xmax != undefined)
										&& (ymax != null && ymax != undefined)
										&& (srs != null && srs != undefined)) {
									var startExtent = new Extent(xmin, ymin,
											xmax, ymax, new SpatialReference({
												wkid : srs
											}));
									view.goTo(startExtent);
								}

//								removeExtent();

							});
			
			/**
			 * LOAD FUNCTION
			 */

			$(window).on("load", function() {
				$("#coordinateDiv").hide();
			});

		});