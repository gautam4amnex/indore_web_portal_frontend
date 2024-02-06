var mapClickEvtHandler;
var nearmeEvtHandler;
var map,initialExtent;
var _status_name = "Approved";
var _current_lat = "";
var _current_long = "";
var map_selection,map_hover ;
var dirLatLong;
var map_info_tool = true;
var map_pan_tool = true;
var swipe_layer_tool = false;
var zoom_box_tool,zoom_out_box_tool = false;
var source_latlong_by_name ="",destination_latlong_by_name = "",thana_locality_name = "";
var sourceGeocoder,destGeocoder,localityThana,ward_opacity;
let map_point_click = [];
var vectorSource = null;
var layer_names = [];
var map_layers = [];
var initial_visible_layers = [1, 34, 66, 67, 68, 69, 84, 85];// NEED TO
																// CHANGE WHERE
																// LAYER
																// PUBLISHED
																// AGAIN OR
																// LAYER ID
																// CHANGE


require(
		[   "esri/map", "esri/dijit/HomeButton", "esri/dijit/LocateButton","esri/dijit/Search", "esri/dijit/BasemapGallery",
			"esri/arcgis/utils", "dojo/parser", 
			"dijit/registry","dojo/dom", "esri/Color", "esri/symbols/TextSymbol","esri/symbols/Font", "dojo/keys",
			"esri/config", "esri/sniff", "esri/SnappingManager",
			"esri/dijit/Bookmarks", "esri/geometry/Extent","esri/geometry/webMercatorUtils","esri/dijit/Print", 
			"esri/tasks/PrintTemplate", "esri/request",
			"dojo/_base/array","esri/tasks/locator","esri/tasks/RouteTask", "esri/tasks/RouteParameters","esri/tasks/FeatureSet", 
			"esri/units",  "esri/lang",
			"esri/symbols/PictureMarkerSymbol","dojo/promise/all","dojo/dom", "dojo/dom-construct", "dojo/on", "dojo/number","dgrid/Grid",
			"esri/InfoTemplate","esri/tasks/QueryTask",
			"esri/tasks/query","esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer","esri/dijit/LayerList",
			"esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol", 
			"esri/geometry/Point","esri/geometry/coordinateFormatter","esri/tasks/GeometryService", 
			"esri/tasks/ProjectParameters","esri/SpatialReference",
			"esri/layers/ArcGISDynamicMapServiceLayer","esri/tasks/IdentifyTask","esri/tasks/IdentifyParameters",
			"esri/toolbars/draw", "esri/symbols/SimpleMarkerSymbol","esri/symbols/PictureFillSymbol","esri/symbols/CartographicLineSymbol", 
			"esri/graphic","esri/Color",
			"esri/dijit/Measurement", "esri/urlUtils","esri/dijit/Directions","esri/layers/GraphicsLayer", "esri/geometry/Circle",
			"esri/tasks/PrintParameters","esri/tasks/PrintTask","esri/dijit/Legend","esri/dijit/FeatureTable",
			"esri/dijit/Scalebar","esri/dijit/LayerSwipe","esri/geometry/scaleUtils", "dojo/_base/lang", "dojo/json",
			"esri/layers/ArcGISTiledMapServiceLayer","esri/layers/KMLLayer","esri/dijit/BasemapLayer","esri/dijit/Basemap",
			"esri/dijit/Geocoder","esri/dijit/OpacitySlider","esri/dijit/Legend","esri/geometry/projection",
			"dijit/layout/BorderContainer", "dijit/layout/ContentPane","dijit/TitlePane",
			"dijit/form/CheckBox", "dijit/form/Button","dojo/domReady!" 
		],
		function(
					Map, Home, Locate, Search, BasemapGallery, arcgisUtils,parser, registry, dom, Color, TextSymbol, Font, keys,
					esriConfig, has, SnappingManager, Bookmarks, Extent,webMercatorUtils, Print, PrintTemplate, esriRequest,
					arrayUtils,Locator,RouteTask, RouteParameters,FeatureSet, esriUnits, esriLang,PictureMarkerSymbol,
					all, dom, domConstruct, on, number,Grid,InfoTemplate,QueryTask,Query,FeatureLayer, SimpleRenderer, LayerList,
					SimpleLineSymbol, SimpleFillSymbol, Point, coordinateFormatter,GeometryService, ProjectParameters, 
					SpatialReference, ArcGISDynamicMapServiceLayer,IdentifyTask,IdentifyParameters,Draw,
					SimpleMarkerSymbol, PictureFillSymbol, CartographicLineSymbol,Graphic, Color, Measurement, urlUtils,
					Directions,GraphicsLayer,Circle,PrintParameters,PrintTask,Legend,FeatureTable,Scalebar,LayerSwipe,scaleUtils,lang,JSON,
					ArcGISTiledMapServiceLayer,KMLLayer,BasemapLayer,Basemap,Geocoder,OpacitySlider,Legend,projection
					
				) 
		{

			parser.parse();

			initialExtent = new Extent(75.54699290771396,
					22.63628705473749, 76.16840709228345, 22.80286225175135,
					new SpatialReference({
						wkid : 4326
			}));
			
			urlUtils.addProxyRule({
				urlPrefix : "route.arcgis.com",
				proxyUrl : "/sproxy/"
			});
			urlUtils.addProxyRule({
				urlPrefix : "traffic.arcgis.com",
				proxyUrl : "/sproxy/"
			});

			var  toolbar, symbol, geomTask,measurement;
			var share_extent;
			var app = {};
			var layerSwipe,nearme_featureLayer,usa_circle;
			var indore_map_layers;  
			var onFlylayers = [];
			var legendLayers = [];
			var ontheFlyLayer = false;
			var kmlLayers = [];
			var kypResultArray = [];
			var lastState = null;
			var swipe_layer_obj;
			var navigationNearmeRsltArr,navigationNoRouteRsltArr,ascFeatureArr = [];
			var geoTagFeatureLayer;
			var gLayer = new esri.layers.GraphicsLayer({ "id": "Direction" });
			var dirgsLayer = new esri.layers.GraphicsLayer();
			var dirgdLayer = new esri.layers.GraphicsLayer();
			
			var locator = new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");			
			var KML_BASE_URL = "https://indoresmartmap.org/kml_files/"
				
			app.printUrl = window.prefix_layer_url + "Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";
			
			var markerSymbol = new SimpleMarkerSymbol();
	        markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981," +
	        		"0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387," +
	        		"2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772," +
	        		"18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
	        markerSymbol.setColor(new Color("#00FFFF"));
	        
	        var m1 = new SimpleMarkerSymbol();
	        m1.setPath("M76.401,48.587l-4.972-3.249c-0.58-0.378-1.247-0.57-1.915-0.57c-0.571,0-1.145,0.14-1.666,0.422   c-1.129,0.611-1.834,1.793-1.834,3.078v1.499h-11.57V38.196h1.498c1.285,0,2.467-0.704,3.078-1.834s0.555-2.504-0.148-3.58   l-3.247-4.972c-0.646-0.989-1.748-1.586-2.931-1.586c-1.182,0-2.283,0.597-2.93,1.586l-3.248,4.972   c-0.701,1.076-0.758,2.45-0.146,3.58s1.793,1.834,3.078,1.834h1.496v11.571H39.376v-1.499c0-1.285-0.705-2.467-1.834-3.078   c-0.521-0.282-1.095-0.422-1.666-0.422c-0.668,0-1.335,0.191-1.914,0.57l-4.973,3.249c-0.99,0.646-1.586,1.749-1.586,2.931   s0.596,2.284,1.586,2.93l4.973,3.247c0.58,0.378,1.246,0.569,1.914,0.569c0.572,0,1.145-0.14,1.666-0.422   c1.129-0.612,1.834-1.793,1.834-3.078v-1.497h11.568v11.568h-1.496c-1.285,0-2.467,0.704-3.078,1.834   c-0.611,1.129-0.555,2.504,0.146,3.58l3.248,4.973c0.646,0.99,1.748,1.586,2.93,1.586c1.183,0,2.285-0.597,2.931-1.586l3.248-4.973   c0.702-1.076,0.759-2.45,0.147-3.58s-1.793-1.834-3.078-1.834h-1.498V53.267h11.57v1.497c0,1.285,0.705,2.466,1.834,3.078   c0.521,0.282,1.095,0.422,1.666,0.422c0.668,0,1.334-0.191,1.914-0.569l4.973-3.247c0.989-0.646,1.586-1.749,1.586-2.93   S77.392,49.233,76.401,48.587z M52.694,29.724l3.248,4.972h-6.494L52.694,29.724z M35.876,54.764l-4.973-3.247l4.973-3.249V54.764z    M52.694,73.308l-3.246-4.973h6.494L52.694,73.308z M69.515,54.764v-6.495l4.973,3.249L69.515,54.764z");
	        m1.setColor(new Color("#855439"));
						
			var appConfig = {
				mapView : null,
				sceneView : null,
				activeView : null,
				container : "map"
			};
 
// map = new Map("map", {
// center : window.MAP_CENTER_POINT,
// zoom : window.MAP_INITIAL_ZOOM,
// minZoom: window.MAP_MIN_ZOOM,
// maxZoom:window.MAP_MAX_ZOOM,
// container : appConfig.container,
// ui : {
// components : [ "attribution" ]
// },
// basemap : "streets",
//				
// });
			
		// create layers and add into map-service-layer
		symbology_layers = new ArcGISDynamicMapServiceLayer(window.INDORE_LAYERS_SYMBOLOGY);
		
		/**
		 * Click Information start
		 */	
		
		
		function mapReady () {
			
			map_selection =  map.on("click", executeIdentifyTask);	
			/*
			 * map_hover = map.on("mouse-move", function(evt) {
			 * if(map.infoWindow.isShowing == true){ return; }else{
			 * setTimeout(function() { if (lastState == evt.mapPoint) {
			 * mouseHoverFeatureSymbology(evt.mapPoint); } }, 4000); lastState =
			 * evt.mapPoint; } });
			 */
		}
		
		function executeIdentifyTask (event) {
			// for removing click info while measurement tool active
			if(measurement){
				if(measurement.activeTool != "" && measurement.activeTool != null){
					return;
				}
			}
			
			if(ontheFlyLayer){
				return;
			}
			
			if(kmlLayers.length > 0){
				return;
			}
			mouseHoverFeatureSymbology(event.mapPoint);
        }
		
		/**
		 * Click Information end
		 */

		var vector_arr = [];
		var draw;
		var draw_rectangle_layer;
		$('.draw-tools-select li a').on('click',function() {
			var tool = this.title;
			
			if(tool == "Rectangle"){
				draw_rectangle();
			}else{
				draw_ploygons(tool);
			}
											

			 
			
		});
				
	    function draw_rectangle() {


	        const rectangle_source = new ol.source.Vector({ wrapX: false });

	        const rectangle_vector = new ol.layer.Vector({
	            source: rectangle_source,
	            // style: styles,
	        });

	        vector_arr.push(rectangle_vector);
	        var geometryFunction = ol.interaction.Draw.createBox();


	        draw_rectangle_layer = new ol.interaction.Draw({
	            source: rectangle_source,
	            type: "Circle",
	            geometryFunction: geometryFunction,
	        });
	        map.addInteraction(draw_rectangle_layer);
	        draw_rectangle_layer.on("drawend", function (e) {
	            var rectangle_writer = new ol.format.GeoJSON();

	            var rectangle_geojsonStr = rectangle_writer.writeFeatures([e.feature]);
	            
	        });

	        map.addLayer(rectangle_vector);			        
	    }
		
	    function draw_ploygons(selecte_type) {
	        var value = selecte_type;
	        var source = new ol.source.Vector({ wrapX: false });

	        var vector = new ol.layer.Vector({
	            source: source,
	            // style: styles,
	        });

	        vector_arr.push(vector);
	        // vector_arr.push(vector);
	        if (value !== 'None') {
	        	draw = new ol.interaction.Draw({
	                source: source,
	                type: /** @type {ol.geom.GeometryType} */ (selecte_type)
	            });
	            map.addInteraction(draw);
	            // var feature;
	            draw.on("drawend", function (e) {
	                var writer = new ol.format.GeoJSON();
	               
	            });
	            map.addLayer(vector);
	           
	        }
	    }
			function mouseHoverFeatureSymbology(mapPoint){
			
					if(map_info_tool == true){
						return;
					}
					
					var visibleLayersArray = map.getLayersVisibleAtScale();
					var index_layer = undefined;
					for(let v in visibleLayersArray){
						let vLayer = visibleLayersArray[v];
						let vLayerURL = vLayer.url;
						if(vLayerURL == window.INDORE_LAYERS_SYMBOLOGY){
							index_layer = v;
						}
					}
					
					if(index_layer == undefined){
						index_layer = 1;
					}
			
            		var visible_layers = map.getLayersVisibleAtScale()[index_layer].visibleLayers;
            		
					let administrative = window.CITIZEN_ADMINISTRATIVE_BOUNDARY;
					let environment = window.CITIZEN_ENVIORNMENTAL;
					let transportation = window.CITIZEN_TRANSPORTATION;

					let removeItems = [administrative,environment,transportation];
					
					visible_layers = $.grep(visible_layers, function(value) {
					  return value != removeItems[0] && value != removeItems[1] && value != removeItems[2];
					});
				
				  identifyTask = new IdentifyTask(window.INDORE_LAYERS_SYMBOLOGY);
				  identifyParams = new IdentifyParameters();
				  identifyParams.tolerance = 6;
				  identifyParams.returnGeometry = true;
				  identifyParams.layerIds = visible_layers;
				  identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_VISIBLE;
				  identifyParams.width = map.width;
				  identifyParams.height = map.height;
				  identifyParams.geometry = mapPoint;
				  identifyParams.mapExtent = map.extent;

	          var deferred = identifyTask.execute(identifyParams).addCallback(function (response) {
	        	  let length = response.length;
	        	  
	        	  let sufflelayers = response;
	        	  
	        	  for(let i in response){
	        		  let r = response[i];
	        		  let lname = r.layerName;
	        		  
	        		  if(lname == "IMC Boundary"){
	        			  index = sufflelayers.findIndex(x => x.layerName == lname);
	        			  window.layerDataController.swap(sufflelayers,index,length-1);
	            	  }else if(lname == "Zone Boundary"){
	        			  index = sufflelayers.findIndex(x => x.layerName == lname);
	        			  window.layerDataController.swap(sufflelayers,index,length-2);
	            	  }else if(lname == "Ward Boundary"){
	        			  index = sufflelayers.findIndex(x => x.layerName == lname);
	        			  window.layerDataController.swap(sufflelayers,index,length-3);
	            	  }
	        	  }
	        	  
	              return arrayUtils.map(response, function (result) {
	              
	            	var feature = result.feature;
	                var layerName = result.layerName;
	                
					let template_content = "";
					var columns = feature.attributes;
					let length = Object.keys(columns).length;
					
					let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
					  '<tbody>';
					
					for(let a=0;a<length;a++){
						let key  = Object.keys(columns)[a];
						let attr = feature.attributes[key];
						
						if(key == "st_area(shape)"){
							key = "area[m.sq]";
						}
						
						if(key == "st_length(shape)"){
							key = "length[m]";
						}
						
						if(key == "objectid" || key == "objectid_1"  || key == "OBJECTID" || key == "OBJECTID_1"){
							continue;
						}
						
						let columnName = window.base.getFeatureColumnName(key);
						
						if(key.toLowerCase() == "geotagged_photo" || key.toLowerCase() == "geotagged_photos" 
							|| key.toLowerCase() == "geo_tag_photographs" || key.toLowerCase() == "Geotagged_Photos"){
							let images = attr;
							let imgArray = images.split(",");
							let content = "";
							
							for(let a in imgArray){
								let img = imgArray[a];
								if(img == "" || img == " "){
									content += "<a>No Image Found</a>";
								}else{
									let img_url = window.iscdl.appData.baseURL + 'api-docs/getImage/poi/' + img;
									if(a == imgArray.length-1){
										content += "<a target='_blank' href='"+img_url+"'>View Image</a>";
									}else{
										content += "<a target='_blank' href='"+img_url+"'>View Image</a>"  + " , ";
									}
								}
							}
							table_content += '<tr><td><b>'+columnName+'</b></td><td>'+content+'</td></tr>';
						}else{
							table_content += '<tr><td><b>'+columnName+'</b></td><td>'+attr+'</td></tr>';
						}
					}
						template_content += table_content + '</tbody></table>';
					
						var featureTemplate = new InfoTemplate(layerName,template_content);
		                  feature.setInfoTemplate(featureTemplate);
		                  return feature;
		              });
	            });
			          map.infoWindow.setFeatures([deferred]);
			          map.infoWindow.show(mapPoint);
			
		}
		
			/*
			 * map.addLayer(symbology_layers);
			 * 
			 * map.on("load", initFunc); map.on("load",function(){
			 * $("#toggle_map_info").trigger('click'); // CHANGE MADE ON
			 * 24-12-2021 FOR REMOVE PLANNING BOUNDARY // VISIBLE LAYER FROM MAP
			 * symbology_layers.setVisibleLayers(initial_visible_layers);
			 * 
			 * }); map.on("load", function() { //let announcement_point = new
			 * Point(76.2161,22.8639); //let graphic = new
			 * Graphic(announcement_point, m1); //map.graphics.add(graphic);
			 * 
			 * map.on("mouse-move", showCoordinates); map.on("mouse-drag",
			 * showCoordinates); }); map.on('load', function () {
			 * legendLayers.push({ layer: symbology_layers, title: "Indore GIS
			 * Layers" });
			 * 
			 * var legend = new Legend({ map: map, layerInfos: legendLayers },
			 * "legendDiv"); legend.startup(); });
			 */
			
			
			
			/*
			 * OPEN LAYER MAP START
			 */
			
			const container = document.getElementById('popup');
			
			const overlay = new ol.Overlay({
			    element: container,
			    autoPan: {
			        animation: {
			            duration: 250,
			        },
			    },
			});
			
			const osm = new ol.layer.Tile({
			    source: new ol.source.OSM
			});			
			
			const view = new ol.View({
				projection: 'EPSG:4326',
			    center: [75.8577, 22.7196],
			    zoom: 12,
			});
			
			const map = new ol.Map({
			    layers: [osm],
			    target: 'map',
			    overlays: [overlay],
			    view: view
			});
			
			const styles = {
			        'Polygon': new ol.style.Style({
			            stroke: new ol.style.Stroke({
			                color: 'rgba(0, 0, 0, 0.0)',
			                width: 3,
			            }),
			            fill: new ol.style.Fill({
			                color: 'rgba(255, 255, 255, 0.0)',
			                opacity: -5

			            }),
			        }),
			    }
			
			var ward_boundary = new ol.layer.Tile({					 
			      source: new ol.source.TileWMS({
			    	  opacity: 0.5,
	                 url: "https://apagri.infinium.management/geoserver/iscdl/wms?",
	                 params: { 'LAYERS': 'iscdl:shp_ward_boundary', 'TILED': true},
	                 serverType: 'geoserver',		                 
	                 transition: 0,
	                 style: styles,
	              })
			  });
			
			map.addLayer(ward_boundary);
			
//			map.on('click', function(evt){
//			    console.info(evt.pixel);
//			    console.info(map.getPixelFromCoordinate(evt.coordinate));
//			    console.info(ol.proj.toLonLat(evt.coordinate));
//			    var coords = ol.proj.toLonLat(evt.coordinate);
//			    var lat = coords[1];
//			    var lon = coords[0];
//			    var locTxt = "Latitude: " + lat + " Longitude: " + lon;
//			    // coords is a div in HTML below the map to display
//			    document.getElementById('coords').innerHTML = locTxt;
//			});
			const info = document.getElementById('info');


			$(document).keyup(function(e) {
				/*======================================== Handle escape key press event =======================================*/
				if (e.key === "Escape" || e.keyCode == 27) { 
					
					evt.dragging = true;
				}
				/*======================================== Handle escape key press event =======================================*/
			});
			
			let currentFeature;
			const displayFeatureInfo = function (pixel, target) {
			  const feature = target.closest('.ol-control')
			    ? undefined
			    : map.forEachFeatureAtPixel(pixel, function (feature) {
			        return feature;
			      });

			    info.style.left = pixel[0]+80 + 'px';
			    info.style.top = pixel[1]+20 + 'px';
			    info.style.visibility = 'visible';
			    info.innerText = 'Please Click On Map';

			};

//			map.on('pointermove', function (evt) {
//			  if (evt.dragging) {
//			    info.style.visibility = 'hidden';
//			    currentFeature = undefined;
//			    return;
//			  }
//			  const pixel = map.getEventPixel(evt.originalEvent);
//			  displayFeatureInfo(pixel, evt.originalEvent.target);
//			});
			
//			var dataObject = {
//					flag : false,
//					distance : (parseInt($("#nearMeRange").val()) * 1000),
//					message : global.contents.click
//				};
			var lat;
		    var lon;
		    var vectorLayer;
			$("#around_layer").change(function(){				
				
				map.on('pointermove', function (evt) {
					  if (evt.dragging) {
					    info.style.visibility = 'hidden';
					    currentFeature = undefined;
					    return;
					  }
					  const pixel = map.getEventPixel(evt.originalEvent);
					  displayFeatureInfo(pixel, evt.originalEvent.target);
					});			
				
				$(document).keyup(function(e) {
					if (e.key === "Escape" || e.keyCode == 27) { 
						
						e.dragging = true;
					}
					
				});
				
				
				map.on('click', function(evt){
				map.removeLayer(vectorLayer);
			    var coords = evt.coordinate;
			    lat = coords[1];
			    lon = coords[0];		
			    
			    createBufferForAroundMe(lat , lon);			    
			   
			    
				});

			});
			
			$("#kyp_submit").click(function(){
				
				
				
			});
			
			
			$("#clear_aroundme_rslt").click(function(){
				info.style.visibility = 'hidden';
			});
			
			
			function createBufferForAroundMe(lat , lon){
				var centerCoordinates = [lon , lat];  
			      var radius = $("#area_range").text().split(" ")[0] / 100; 	    
			  
			    
			      
			      var circle = new ol.Feature(new ol.geom.Circle(
			       centerCoordinates,
			        radius
			      ));
			    
			      
			      circle.setStyle(new ol.style.Style({
			        fill: new ol.style.Fill({
			          color: 'rgba(255, 0, 0, 0.2)'
			        }),
			        stroke: new ol.style.Stroke({
			          color: 'red',
			          width: 2
			        })
			      }));
			    
			      
			      var vectorSource = new ol.source.Vector({
			    	//featureProjection: 'EPSG:4326',
			        features: [circle]
			      });
			    
			      vectorLayer = new ol.layer.Vector({
			        source: vectorSource
			      });
			    
			      
			      map.addLayer(vectorLayer);
			}
			

			$("#near_area").change(function(){
				
				map.removeLayer(vectorLayer);
				createBufferForAroundMe(lat , lon);
			});
			
			
			/*
			 * OPEN LAYER MAP END
			 */
			
			
			
			
			
			// restrict user to pan outside indore boundary
			/*
			 * map.on('pan-end', function(evt) { if (
			 * !initialExtent.contains(evt.extent) ) {
			 * map.setExtent(initialExtent); } });
			 */
			
			// createWidgets();
			var selected_print_opt;
			
			/**
			 * draw tool bar
			 */

			map.on("load", createToolbar);
			
			
			var t_name;
			
			
			/**
			 * CLICK EVENTS
			 */
			
			$('.draw-tools-select li a').on('click',function() {
				
				if(map_selection){
					map_selection.remove();
					// map_hover.remove();
				}
				
				var tool = this.title.toUpperCase().replace(/ /g, "_");
				t_name = tool;
				if (tool != "TEXT") {
					toolbar.activate(Draw[tool]);
					map.hideZoomSlider();
				}
				map.on("click",function(evt) {
					if (t_name == "TEXT") {
							let txtValue = $("#tool_text").val();
							let fnt_color = $("#tool_fontcolor").val();
							var text = new TextSymbol(txtValue).setColor(new Color(fnt_color))
									.setAlign(Font.ALIGN_START)
									.setAngle(360)
									.setFont(new Font("12pt").setWeight(Font.WEIGHT_BOLD));
									text.font.setSize("20pt");
							let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
							let point = new Point(mp.x, mp.y);
							map.graphics.add(new Graphic(point,text));
							$("#tool_text").val("");
							$('.draw-tools-select li a').removeClass('active');
							$("#lblDrawTxt").text("");
					}
				});
			});
			
			// clear draw graphics
			
			$("#clear_draw_graphics").click(function(){
			// map.graphics.clear();
			//				
			// // for draw deactive
			// if(toolbar){
			// toolbar.deactivate();
			// }
			//				
			// $("#tool_text").val("");
			// $('.draw-tools-select li a').removeClass('active');
			// $("#lblDrawTxt").text("");
				
				for(var i=0; i<vector_arr.length; i++){
					map.removeLayer(vector_arr[i]);
				}
				draw_ploygons('None');
			});
			
			// close pop-up event
			$(".layer-close").click(function() {
				window.base.removeCursor();
				if (nearmeEvtHandler != undefined) {
					nearmeEvtHandler.remove();
				}
				
				// for draw deactive
				if(toolbar){
					toolbar.deactivate();
				}
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
					if(app){
						app.printer.startup();	
					}
				}
			});
			
			/**
			 * share click event
			 */

			$('#map_share').click(function() {
				let did = localStorage.getItem('department_id');
				if (did == null || did == "" || did == undefined) {
					$("#map_share").attr("data-attr", "");
					
					$("#user_notification_content").find('p:first').remove();
					$("#user_notification_content").find('p:first').remove();
					$("#user_notification_content").prepend('<p data-translate="_unauthorized_user_text_popup">You are not an Authorized User !</p><p data-translate="_unauthorized_user_tool_popup"> In order to use this tool , Please register to our portal by clicking below</p>');
				
					if(localStorage.getItem('current_language') === "hindi"){
						$("#pills-hindi-tab").trigger('click');
					}
					$("#user_notification").modal();
					
				}else{
					$("#map_share").attr("data-attr", "#share");
					window.base.sharePortalLink();
				}
				
			});

			/**
			 * home button click event
			 */

			$('#myHomeDiv').click(function() {
				if (map != null || map != undefined) {
					map.setExtent(initialExtent);
				}
			});

			/**
			 * Find my location
			 */

			$('#locateDiv').click(function() {
						window.base.checkForLocate(_current_long,_current_lat);
			});
			
			// left panel click event

			$('#leftPanel').click(function() {
				window.base.removeCursor();
				removeMeasurementGraphics();
				// removeSwipeLayer();
				// for draw deactive
				if(toolbar){
					toolbar.deactivate();
				}
				
				// removeOnFlyLayer();
				// removeKMLLayer();
				
				$("#form_feedback").trigger("reset");
				$("#form_addData").trigger("reset");
				$("#form_events").trigger("reset");
			});
			
			// clear all graphic on map
			$("#clearMap").click(function() {
				map.graphics.clear();
				// for draw deactive
				if(toolbar){
					toolbar.deactivate();
				}
				
				if(gLayer){
					map.removeLayer(gLayer);
				}
				
				if(dirgsLayer){
					map.removeLayer(dirgsLayer);
				}
				
				if(dirgdLayer){
					map.removeLayer(dirgdLayer);
				}
				
				if(resultedFeaturesLayer){
					map.removeLayer(resultedFeaturesLayer);	
				}
				
				if(nearmeEvtHandler){
					nearmeEvtHandler.remove();
				}
				
				removeMeasurementGraphics();
				
				removeOnFlyLayer();
				removeKMLLayer();
				removeSwipeLayer();
			});
			
			$("#kyp_clear").click(function(){
				$('#know_your_property_rslt').html("");
				map.graphics.clear();
				map.setExtent(initialExtent);
			});
			
			
			let basic_query_layer_arr = [];
			
			
			$("#clear_predefineQuery").click(function(){
				$("#form_query").trigger("reset");
				$("#attribute_query_rslt").html("");
//				map.graphics.clear();
//				map.setExtent(initialExtent);
				
				for(var i=0; i<basic_query_layer_arr.length; i++){
					map.removeLayer(basic_query_layer_arr[i]);
				}
				
			});
			
			$("#clear_swipe_layer").click(function(){
				removeSwipeLayer();
			});
			
			/**
			 * FUNCTIONS
			 */
			
			// remove shape-file-layer
			function removeOnFlyLayer(){
				ontheFlyLayer =false;
				if(onFlylayers.length > 0){
					for(let a in onFlylayers){
						map.removeLayer(onFlylayers[a]);
					}
				}
			}
			// remove KML layer
			function removeKMLLayer(){
				 if(kmlLayers.length > 0){
				    	for(let i in kmlLayers){
				    		let kmlLayer = kmlLayers[i];
				    		map.removeLayer(kmlLayer);
				    	}
				 }
			}
			
			function createPrintTask(printTitle) {
                var template = new PrintTemplate();
                template.layout = document.getElementById("print_layout_id").value;
                template.format = document.getElementById("print_format_id").value; 
                template.preserveScale = false;
                template.layoutOptions = {
                    // legendLayers: [],
                    scalebarUnit: "Kilometers",
                    titleText: printTitle,
                    // showAttribution : false
                };

                var params = new PrintParameters();
                params.map = map;
                params.template = template;

                var printTask = new PrintTask(app.printUrl);
                var printObj = {
                    printTask: printTask,
                    params: params
                }
                return printObj;
            }

			function createToolbar(themap) {
				localStorage.removeItem("xmin");
				localStorage.removeItem("ymin");
				localStorage.removeItem("xmax");
				localStorage.removeItem("ymax");
				localStorage.removeItem("spatialReference");

				toolbar = new Draw(map);
				toolbar.on("draw-end", addToMap);
			}

			function addToMap(evt) {

				var symbol;
				toolbar.deactivate();
				map.showZoomSlider();
				
				// check for zoom in or zoom out tool active if active then
				// return
				if(zoom_out_box_tool || zoom_box_tool){
					return;
				}
				
				let stroke_color;
				let fill_color;
				let border_width;

				switch (evt.geometry.type) {
				case "point":
				case "multipoint":
					symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
						    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
						    	    new Color([255,0,0]), 3),
						    	    new Color([0,255,0,0.25]));
					break;
				case "polyline":

					let linecolor;
					let line_width;

					if (t_name == "LINE") {
						linecolor = $('#line_color').val();
						line_width = $('#line_width').val();

					} else if (t_name == "POLYLINE") {
						linecolor = $('#multi_line_color').val();
						line_width = $('#multi_line_width').val();
					}

					symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
							new Color(linecolor), line_width);
					break;

				case "polygon":

					if (t_name == "TRIANGLE") {
						stroke_color = $('#t_s_color').val();
						fill_color = $("#t_f_color").val();
						border_width = $("#t_b_width").val();

					} else if (t_name == "RECTANGLE") {
						stroke_color = $('#s_s_color').val();
						fill_color = $("#s_f_color").val();
						border_width = $("#s_b_width").val();

					} else if (t_name == "CIRCLE") {
						stroke_color = $('#c_s_color').val();
						fill_color = $("#c_f_color").val();
						border_width = $("#c_b_width").val();

					} else if (t_name == "POLYGON") {

						stroke_color = $('#p_s_color').val();
						fill_color = $("#p_f_color").val();
						border_width = $("#p_b_width").val();
					}

					symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
							new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
									new Color(stroke_color), border_width),
							new Color(fill_color));
					
					let r = symbol.color.r;
					let g = symbol.color.g;
					let b = symbol.color.b;
					symbol.setColor([r,g,b,0.3]);

				default:
					break;
				}
				
				var graphic = new Graphic(evt.geometry, symbol);
				map.graphics.add(graphic);

				// remove active class
				$('.draw-tools-select li a').removeClass('active');
				$("#lblDrawTxt").text("");
				// mapReady();
				map_info_tool = false;
				$("#toggle_map_info").trigger("click");
			}
			
			function locationError(error) {
				// error occurred so stop watchPosition
				if (navigator.geolocation) {
					navigator.geolocation.clearWatch(watchId);
				}
				switch (error.code) {
				case error.PERMISSION_DENIED:
					alert("Location not provided");
					break;

				case error.POSITION_UNAVAILABLE:
					alert("Current location not available");
					break;

				case error.TIMEOUT:
					alert("Timeout");
					break;

				default:
					alert("unknown error");
					break;
				}
			}

			function zoomToLocation(location) {
				var pt = new Point(_current_long,
						_current_lat);
				addGraphic(pt);
				map.centerAndZoom(pt, 12);
			}

			function showLocation(location) {
				
				// zoom to the users location and add a graphic
				var pt = new Point(location.coords.longitude,
						location.coords.latitude);
				if (!graphic) {
					addGraphic(pt);
				} else { // move the graphic if it already exists
					graphic.setGeometry(pt);
				}
				map.centerAt(pt);
			}

			function addGraphic(pt) {
				var symbol = new SimpleMarkerSymbol(
						SimpleMarkerSymbol.STYLE_CIRCLE, 12,
						new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
								new Color([ 0, 0, 255, 1.0 ]), 8), new Color([
								0, 0, 255, 1.0 ]));
				graphic = new Graphic(pt, symbol);
				map.graphics.add(graphic);
			}


			function removeMeasurementGraphics(){
				if(map && measurement){
					measurement.setTool("location", false);
			        measurement.setTool("area", false);
			        measurement.setTool("distance", false);
			        map.setMapCursor("default");
			        // map.graphics.clear();
				}
			}
			
			
			// remove measurement tool while other tab click
			$("ul[id*=downPanel] li").click(function () {
				let val = $(this).attr('title');
				// for draw deactive
				if(toolbar){
					toolbar.deactivate();
				}
				
				if(val != "Measurement"){
					removeMeasurementGraphics();
				}
				
				removeOnFlyLayer();
				removeKMLLayer();
				
				
				/**
				 * for hiding old content of print
				 */
				if(val != "Print"){
					document.getElementById("print_submit").innerHTML = "Print";
	                document.getElementById("print_submit").style.display = 'block';
	                document.getElementById("print_submit").disabled = false; 
	                document.getElementById("printResult").style.display = 'none';
	                $('#form_print').trigger('reset');	
				}
            });
			
			function removeSwipeLayer(){
				if(layerSwipe){
					layerSwipe.disable();
					if(swipe_layer_obj){
						map.removeLayer(swipe_layer_obj);
					}
				}
			}

			function locationError(error) {
				// error occurred so stop watchPosition
				if (navigator.geolocation) {
					navigator.geolocation.clearWatch(watchId);
				}
				switch (error.code) {
				case error.PERMISSION_DENIED:
					alert("Location not provided");
					break;

				case error.POSITION_UNAVAILABLE:
					alert("Current location not available");
					break;

				case error.TIMEOUT:
					alert("Timeout");
					break;

				default:
					alert("unknown error");
					break;
				// locationError
			}
		}
		
		function initFunc(map) {
	          if( navigator.geolocation ) {  
	            navigator.geolocation.getCurrentPosition(zoomToGeoLocation, locationError);
	          } else {
	            alert("Browser doesn't support Geolocation.");
	          }
	          window.cityMapController.setMap(map);
	          window.cityMapController.drawPreviewEvents();
	    }
		
		function dynamicLayerList(){
				window.layerDataController.createCitizenPortalDynamicLayerList();
				
				
				$("input[type='checkbox'][class='list-item']").on("change", function () {
					var checkbox = $(this);
			        var checkboxValue = checkbox.val();
			        var table_name = $(this).attr("data-tablename");
			        var gis_id = $(this).attr("data-gisid");
			        var wms_service_url = $(this).attr("data-wmsurl");
			        
			        if (checkbox.is(":checked")) {
			        	let current_layer = new ol.layer.Tile({
	                        source: new ol.source.TileWMS({
	                            url: wms_service_url,
	                            params: { 'LAYERS': gis_id, 'CRS': 'EPSG:4326' },
	                            transition: 0,
	                            crossOrigin: 'anonymous'
	                        })
	                    });

	                    map.addLayer(current_layer);
	                    map_layers.push(current_layer);
	                    map_layers[table_name] = current_layer;
			        	
			        }else{
			        	map.removeLayer(map_layers[table_name]);
			        }
			        	
					
				});
				
				
				/*
				 * $(".list-item").change(function(){ var visible = [];
				 * 
				 * $('#accordionExample .layers-toggle-body
				 * input:checked').each(function() { let visible_id =
				 * $(this).data('layerid'); if(visible_id){
				 * visible.push(visible_id); } });
				 * 
				 * if (visible.length === 0) { visible.push(-1); }
				 * symbology_layers.setVisibleLayers(visible); });
				 */
				
				
				$(".multiselectde").click(function () {
					
					let current_id = $(this).attr('id');
					
					let a ="#cor_d_c"+current_id + " .layers-toggle-body";
					let checked_prop = $(this).prop('checked');
					
					$(a).find("input").each(function(){
						let child_id  = $(this).attr('id');
						$("#"+child_id).prop('checked', checked_prop);
					});
					
					var visible = [];
					
					/*
					 * $('#accordionExample .layers-toggle-body
					 * input:checked').each(function() { let visible_id =
					 * $(this).data('layerid'); if(visible_id){
					 * visible.push(visible_id); } });
					 * 
					 * if (visible.length === 0) { visible.push(-1); }
					 * symbology_layers.setVisibleLayers(visible);
					 */
					
					$('#accordionExample .layers-toggle-body input:checked').each(function() {
						var checkbox = $(this);
				        var checkboxValue = checkbox.val();
				        var table_name = $(this).attr("data-tablename");
				        var gis_id = $(this).attr("data-gisid");
				        var wms_service_url = $(this).attr("data-wmsurl");
				        
				        if (checkbox.is(":checked")) {
				        	let current_layer = new ol.layer.Tile({
		                        source: new ol.source.TileWMS({
		                            url: wms_service_url,
		                            params: { 'LAYERS': gis_id, 'CRS': 'EPSG:4326' },
		                            transition: 0,
		                            crossOrigin: 'anonymous'
		                        })
		                    });

		                    map.addLayer(current_layer);
		                    map_layers.push(current_layer);
		                    map_layers[table_name] = current_layer;
				        	
				        }else{
				        	map.removeLayer(map_layers[table_name]);
				        }
					});
					
					
					 
				});
				
				$('.zoom-to-layer').click(function(){
					let layer_id = $(this).attr('id');
					let feature_layer_url = window.INDORE_LAYERS_SYMBOLOGY + "/" + layer_id;	
					let myFeatureLayer = new FeatureLayer(feature_layer_url);
					myFeatureLayer.on("load", function(){
						  var query = new Query();
						  query.where = "1=1";
						  query.outSpatialReference = new SpatialReference(4326);
						  myFeatureLayer.queryExtent(query, zoomToExtent);
					});
				});
		}
		
		function updateSearchLayers(){
			
			// bind HTML content
			let search_layer_content = '<div class="checkbox"><label><input type="checkbox" title="On/Off Layer"></label></div>' +
			'<select class="selectpicker" id="search_layers" data-live-search="true">';
			
			let layer_html = "<option value='-1' selected='selected' disabled='disabled'>Select Layer</option>";
			
			// get all layer name with layer id and visibility
			$('#accordionExample .layers-toggle-body input').each(function() {
				let layer_id = $(this).data('layerid');
				let layer_name = $(this).val();
				let visibility = $(this).prop('checked');
				let select_html = "<option data-visibility='"+visibility+"' value='"+layer_id+"'>" + layer_name+ "</option>";
				search_layer_content += select_html;
			});
			// append all HTML in search layer div
			let search_layer_data_content = layer_html + search_layer_content + '</select></div>';
	        $("#search_layers").html(search_layer_data_content).selectpicker('refresh');
			
	        // search layer dropdown change event
			$("#search_layers").change(function(){
				$('#visibility_layer').prop('disabled',false);
				let layer_id = $(this).val();
				let layer_name = $("#search_layers option:selected").text();
				let visibility = $(this).find(':selected').data('visibility');
				$("#visibility_layer").prop('checked',visibility);
			});
			
			// visibility layer checkbox change event
			$("#visibility_layer").change(function(){
				let current_layer_id = $("#search_layers option:selected").val();
				if(current_layer_id == -1){
					$('#visibility_layer').prop('disabled',true);
					$("#visibility_layer").prop("checked",false);
					return;
				}
				
				let current_visible_status = $("#visibility_layer").prop('checked');
				
				// update checkbox status in layer panel
				$('#accordionExample .layers-toggle-body input').each(function() {
					let layer_id = $(this).data('layerid');
					let child_id  = $(this).attr('id');
					if(current_layer_id == layer_id){
						$("#"+child_id).prop('checked', current_visible_status);
					}
				});
				// visible layer display on map after updating checkbox
				var visible = [];
				$('#accordionExample .layers-toggle-body input:checked').each(function() {
					let visible_id = $(this).data('layerid');
					if(visible_id){
						visible.push(visible_id);	
				    }
				});
				
				 if (visible.length === 0) {
			            visible.push(-1);
			     }
				 symbology_layers.setVisibleLayers(visible);
			});
		}
		
		function zoomToExtent(response){
			if(response.count > 0){
				if(response.extent.xmin != "NaN" &&
				   response.extent.xmax != "NaN" &&
				   response.extent.ymax != "NaN" &&
				   response.extent.ymin != "NaN")
				{
					var extent = response.extent;
					map.setExtent(extent, true);
				}
			}
		}
		
		function mapExtentChange(){
			$('#accordionExample .multiselectmain input:checked').each(function() {
				let visible_id = $(this).attr('id');
				let scale = $(this).data('scale');
					if(map.getScale() < scale || scale == 0){
						$("#"+visible_id).attr("disabled", false);
					}else{
						$("#"+visible_id).attr("disabled", true);
					}
				});
		}
		
		function showCoordinates(evt) {
	          var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
	          $("#coordinateDiv").text("Latitude : " + mp.y.toFixed(4) + " " +"Longitude : " +  mp.x.toFixed(4));
	        }
		
		function zoomToGeoLocation(location) {
			_current_long = location.coords.longitude;
			_current_lat = location.coords.latitude;
			localStorage.setItem("c_lat",_current_lat.toFixed(6));
			localStorage.setItem("c_long",_current_long.toFixed(6));
		}
		
		function createWidgets(){
			/**
			 * home widget
			 */
			var home = new Home({
				map : map
			}, "HomeButton");
			home.startup();

			/**
			 * search widget
			 */
			var search = new Search({
				map : map,
				// sources: [],
				// enableSearchingAll : false
			}, "search");
			
			/**
			 * scalbar widget
			 */
			var scalebar = new Scalebar({
		        map: map,
		        scalebarUnit: "dual",
		        attachTo: "bottom-right"
		    });
			
			// swipe layer
			
			layerSwipe = new LayerSwipe({
			    type: "vertical",
			    top: 250,
			    map: map,
			    layers: []
			  }, "swipeDiv");
			
			sourceGeocoder = new Geocoder({
				  autoComplete: true,
				  autoNavigate : false,
				  arcgisGeocoder: {
					    placeholder: "Find Source Location",
					    searchExtent : initialExtent
				  },
				  map: map
			}, dom.byId("from_loc_name"));
			
			destGeocoder = new Geocoder({
				  autoComplete: true,
				  autoNavigate : false,
				  arcgisGeocoder: {
					    placeholder: "Find Destination Location",
					    searchExtent : initialExtent
				  },
				  map: map
			}, dom.byId("to_loc_name"));
			
			
			localityThana = new Geocoder({
				  autoComplete: true,
				  autoNavigate : false,
				  arcgisGeocoder: {
					    placeholder: "Enter Area Name",
					    searchExtent : initialExtent
				  },
				  map: map
			}, dom.byId("thana_licality_name"));
			
			
			/* for layer wise advanced search */
			var sources = search.get("sources");
			
			if(sources.length > 0){
				sources[0].searchExtent = initialExtent;
			}
			
			let firstSource = sources[0];
			
			sources.push(
			{
		        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Airport),
		        searchFields: ["airport_name","type_of_airport"],
		        displayField: "airport_name",
		        exactMatch: false,
		        outFields: ["*"],
		        name: "Airport",
		        placeholder: "Devi Ahilya Holkar",
		        maxResults: 10,
		        maxSuggestions: 10,
		        infoTemplate: new InfoTemplate("Airport",
		         "<table class='table table-bordered w-100 map-detail-custom'>" +
		         	"<tbody>" +
		         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
		         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
		         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
		         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
		         		"<tr><td><b>Airport Name</b></td><td> ${airport_name}</td></tr>" +
		         		"<tr><td><b>Airport Type</b></td><td>${type_of_airport}</td></tr>" +
		         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
		         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
		         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
		         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
		         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
		         	"</tbody>" +
		         "</table>"
		        ),
		        enableSuggestions: true,
		        minCharacters: 0
		      },	
			{
		        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Atm),
		        searchFields: ["atm_name","atm_type"],
		        displayField: "address",
		        exactMatch: false,
		        outFields: ["*"],
		        name: "ATM",
		        placeholder: "ICIC",
		        maxResults: 10,
		        maxSuggestions: 10,
		        infoTemplate: new InfoTemplate("ATM",
		         "<table class='table table-bordered w-100 map-detail-custom'>" +
		         	"<tbody>" +
		         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
		         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
		         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
		         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
		         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
		         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
		         		"<tr><td><b>ATM Name</b></td><td> ${atm_name}</td></tr>" +
		         		"<tr><td><b>ATM Type</b></td><td>${atm_type}</td></tr>" +
		         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
		         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
		         	"</tbody>" +
		         "</table>"
		        ),
		        enableSuggestions: true,
		        minCharacters: 0
		      },		      {
		    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Bank),
			        searchFields: ["bank_name","address"],
			        displayField: "address",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Bank",
			        placeholder: "HDFC Bank",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Bank",
			           "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Bank Name</b></td><td> ${bank_name}</td></tr>" +
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
		      },
		      {
			        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Bartan_Bank),
			        searchFields: ["name","address"],
			        displayField: "name",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Bartan Bank",
			        placeholder: "Data Not Available",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Bartan Bank",
			         "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
			      },
			      {
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Blood_Bank),
				        searchFields: ["name","address"],
				        displayField: "name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Blood Bank",
				        placeholder: "Bansal Diagnostic Centre And Blood Bank",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Blood Bank",
				         "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
				         		"<tr><td><b>Type Of Blood Bank</b></td><td> ${type_of_blood_bank}</td></tr>" +
				         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
				         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
				         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
				         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
				      },
				      
		      {
		    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Bus_Stops),
			        searchFields: ["bus_stops","ward_no"],
			        displayField: "bus_stops",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Bus Stops",
			        placeholder: "City Bus Stops",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Bus Stop",
		        		"<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Bus Stop</b></td><td>${bus_stops}</td></tr>" +
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
		      },
		      {
			        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.CCTV_Location),
			        searchFields: ["area_name","address"],
			        displayField: "area_name",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "CCTV Location",
			        placeholder: "Gangwala Marg",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("CCTV Location",
			         "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td> ${area_name}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
			      },
		      {
			        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.College_University),
			        searchFields: ["university_name","college_category"],
			        displayField: "university_name",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "College & University",
			        placeholder: "Astral Institute",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("College & University",
			          "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
		         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
		         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
		         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>University Name</b></td><td> ${university_name}</td></tr>" +
			         		"<tr><td><b>University Type</b></td><td> ${university_type}</td></tr>" +
			         		"<tr><td><b>University Address</b></td><td> ${university_address}</td></tr>" +
			         		"<tr><td><b>College Category</b></td><td>${college_category}</td></tr>" +
			         		"<tr><td><b>Medium Instruction</b></td><td>${medium_of_instruction}</td></tr>" +
			         		
			         		"<tr><td><b>Number Of Smart Class Rooms</b></td><td> ${number_of_smart_class_rooms}</td></tr>" +
			         		"<tr><td><b>Library</b></td><td> ${library}</td></tr>" +
			         		"<tr><td><b>Play Ground</b></td><td> ${play_ground}</td></tr>" +
			         		"<tr><td><b>Principal Name</b></td><td> ${principal_name}</td></tr>" +
			         		"<tr><td><b>Male Hostel</b></td><td> ${male_hostel}</td></tr>" +
			         		"<tr><td><b>Female Hostel</b></td><td> ${female_hostel}</td></tr>" +
			         		"<tr><td><b>Male Toilet</b></td><td> ${male_toilet}</td></tr>" +
			         		"<tr><td><b>Female Toilet</b></td><td> ${female_toilet}</td></tr>" +
			         		"<tr><td><b>Number Of Students</b></td><td> ${number_of_students}</td></tr>" +
			         		"<tr><td><b>Teaching Staff</b></td><td> ${teaching_staff}</td></tr>" +
			         		"<tr><td><b>Non Teaching Staff</b></td><td> ${non_teaching_staff}</td></tr>" +
			         		"<tr><td><b>Staff Vacancy</b></td><td> ${staff_vacancy}</td></tr>" +
			         		"<tr><td><b>No Of Floors</b></td><td> ${no_of_floors}</td></tr>" +
			         		"<tr><td><b>Phone Number Instruction</b></td><td>${phone_number}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
		      },
		      {
		    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Cultural_Facility),
			        searchFields: ["name","type","address"],
			        displayField: "name",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Cultural Facility",
			        placeholder: "Sindhi Dharamshala",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Cultural Facility",
			           "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
		         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
		         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
		         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
		         		"<tr><td><b>Name</b></td><td>${name}</td></tr>" +
		         		"<tr><td><b>Type</b></td><td>${type}</td></tr>" +
		         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
		         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
		         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
		         		"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
		         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
		      },
		      {
			        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Digital_Signboard),
			        searchFields: ["name","address"],
			        displayField: "address",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Digital Signboard",
			        placeholder: "Rajmohlla Square Indore 452002",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Digital Signboard",
			         "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
		  },
		  {
	    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Entertainment_Facility),
		        searchFields: ["name","type","address"],
		        displayField: "name",
		        exactMatch: false,
		        outFields: ["*"],
		        name: "Entertainment Facility",
		        placeholder: "Mayank Blue Water Mark",
		        maxResults: 10,
		        maxSuggestions: 10,
		        infoTemplate: new InfoTemplate("Entertainment Facility",
		        		"<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
		         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
		         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
		         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
		         		"<tr><td><b>Name</b></td><td>${name}</td></tr>" +
		         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
		         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         	"<tr><td><b>Type</b></td><td>${type}</td></tr>" +
			         	"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         	"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
			         	"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"	
		        ),
		        enableSuggestions: true,
		        minCharacters: 0
	      },
	      {
		        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Fire_Station),
		        searchFields: ["name","address"],
		        displayField: "name",
		        exactMatch: false,
		        outFields: ["*"],
		        name: "Fire Station",
		        placeholder: "Gandhi Hall Fire Station",
		        maxResults: 10,
		        maxSuggestions: 10,
		        infoTemplate: new InfoTemplate("Fire Station",
		         "<table class='table table-bordered w-100 map-detail-custom'>" +
		         	"<tbody>" +
		         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
		         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
		         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
		         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
		         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
		         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
		         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
		         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
		         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
		         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
		         	"</tbody>" +
		         "</table>"
		        ),
		        enableSuggestions: true,
		        minCharacters: 0
		      },
		      {
			        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Food_ATM),
			        searchFields: ["name","address"],
			        displayField: "name",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Food ATM",
			        placeholder: "Ashtha Roti Bank",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Food ATM",
			         "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
			         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
			      },
			      {
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Ghats),
				        searchFields: ["name","address"],
				        displayField: "name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Ghats",
				        placeholder: "Harirao Holkar Chatri Ghat",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Ghats",
				         "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
				         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
				         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
				      },
				      {
				    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Government_Office),
					        searchFields: ["name","address","department"],
					        displayField: "name",
					        exactMatch: false,
					        outFields: ["*"],
					        name: "Government Office",
					        placeholder: "R.T.O Office",
					        maxResults: 10,
					        maxSuggestions: 10,
					        infoTemplate: new InfoTemplate("Government Office",
					          "<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
					         		"<tr><td><b>Name</b></td><td>${name}</td></tr>" +
					         		"<tr><td><b>Department</b></td><td>${department}</td></tr>" +
					         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
					         		"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
					         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					         	"</tbody>" +
					         "</table>"	
					        ),
					        enableSuggestions: true,
					        minCharacters: 0
				      },
				      {
					        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Graveyard),
					        searchFields: ["name","address"],
					        displayField: "name",
					        exactMatch: false,
					        outFields: ["*"],
					        name: "Graveyard",
					        placeholder: "Catholic Cemetery",
					        maxResults: 10,
					        maxSuggestions: 10,
					        infoTemplate: new InfoTemplate("Graveyard",
					         "<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
					         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
					         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
					         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
					         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
					         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
					         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
					         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
					         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
					         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
					         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					         	"</tbody>" +
					         "</table>"
					        ),
					        enableSuggestions: true,
					        minCharacters: 0
					      },
		      {
			        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Heritage_Tourism_Site),
			        searchFields: ["name","address"],
			        displayField: "name",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Heritage Tourism Site",
			        placeholder: "Holker Chatri",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Heritage Tourism Site",
			         "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
			         		"<tr><td><b>Type</b></td><td> ${type_of_tourism}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
			      },
			      {
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.High_Mast_Light),
				        searchFields: ["name","address"],
				        displayField: "address",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "High Mast Light",
				        placeholder: "Bada Ganpati 452001",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("High Mast Light",
				         "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
				         		
				         		"<tr><td><b>CCTV Camera</b></td><td> ${cctv_camer}</td></tr>" +
				         		"<tr><td><b>WiFi Router</b></td><td> ${wi_fi_rout}</td></tr>" +
				         		"<tr><td><b>Billboards</b></td><td> ${billboards}</td></tr>" +
				         		"<tr><td><b>Environment</b></td><td> ${environmen}</td></tr>" +
				         		"<tr><td><b>Ownership</b></td><td> ${ownership}</td></tr>" +
				         		
				         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
				         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
				         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
				         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
				      },
				      {
				    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Hospital),
					        searchFields: ["hospital_name","ward_no"],
					        displayField: "hospital_name",
					        exactMatch: false,
					        outFields: ["*"],
					        name: "Hospital",
					        placeholder: "Aakash Hospital",
					        maxResults: 10,
					        maxSuggestions: 10,
					        infoTemplate: new InfoTemplate("Hospital",
				        		"<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Hospital Name</b></td><td>${hospital_name}</td></tr>" +
				         		
				         		"<tr><td><b>Ownership Type</b></td><td>${ownership_type}</td></tr>" +
				         		"<tr><td><b>No Of ICU</b></td><td>${no_of_icu}</td></tr>" +
				         		"<tr><td><b>Blood Bank Facility</b></td><td>${blood_bank_facility}</td></tr>" +
				         		"<tr><td><b>Mortuart</b></td><td>${mortuary}</td></tr>" +
				         		"<tr><td><b>Recognized By</b></td><td>${recognized_by}</td></tr>" +
				         		"<tr><td><b>Emergency Service 24 Hours Open</b></td><td>${emergency_service_24_hours_open}</td></tr>" +
				         		"<tr><td><b>Emergency Service Contact Number</b></td><td>${emergency_service_contact_numbe}</td></tr>" +
				         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					         	"</tbody>" +
					         "</table>"		
					        ),
					        enableSuggestions: true,
					        minCharacters: 0
				      },
				      {
					        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Hostel),
					        searchFields: ["name","address"],
					        displayField: "name",
					        exactMatch: false,
					        outFields: ["*"],
					        name: "Hostel",
					        placeholder: "Aadinath Girls Hostel",
					        maxResults: 10,
					        maxSuggestions: 10,
					        infoTemplate: new InfoTemplate("Hostel",
					         "<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
					         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
					         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
					         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
					         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
					         		"<tr><td><b>Bathrooms</b></td><td> ${bathrooms}</td></tr>" +
					         		"<tr><td><b>Hostel Category</b></td><td> ${hostel_catagory}</td></tr>" +
					         		"<tr><td><b>No of Floor</b></td><td> ${no_of_floor}</td></tr>" +
					         		"<tr><td><b>Number of Boys</b></td><td> ${number_of_boys}</td></tr>" +
					         		"<tr><td><b>Number of Girls</b></td><td> ${number_of_girls}</td></tr>" +
					         		"<tr><td><b>Type of Occupancy</b></td><td> ${type_of_occupancy}</td></tr>" +
					         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
					         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
					         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
					         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
					         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					         	"</tbody>" +
					         "</table>"
					        ),
					        enableSuggestions: true,
					        minCharacters: 0
					      },
					      
		      {
			        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Library_Facility),
			        searchFields: ["name","address"],
			        displayField: "name",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Library Facility",
			        placeholder: "Ishwar Library and Self Study Centre II",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Library Facility",
			         "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
			         		"<tr><td><b>Type</b></td><td> ${type_of_library}</td></tr>" +
			         		"<tr><td><b>Facilities</b></td><td> ${facilities}</td></tr>" +
			         		"<tr><td><b>Book Rental</b></td><td> ${book_rental}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
			      },
			      {
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Litter_Bin),
				        searchFields: ["location"],
				        displayField: "location",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Litter Bin",
				        placeholder: "Bijasan Mandir Indore",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Litter Bin",
			        		"<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
				         	"<tr><td><b>Address</b></td><td>${location}</td></tr>" +
				         	"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },
			      {
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Market),
				        searchFields: ["name","type","address"],
				        displayField: "address",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Market",
				        placeholder: "Fruit Market",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Market",
			        		"<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Parking</b></td><td>${parking}</td></tr>" +
			         		"<tr><td><b>Type</b></td><td>${type}</td></tr>" +
			         		"<tr><td><b>Opening Time</b></td><td>${opening_time}</td></tr>" +
			         		"<tr><td><b>Closing Time</b></td><td>${closing_time}</td></tr>" +
			         		"<tr><td><b>Operational Days</b></td><td>${oprational_day}</td></tr>" +
			         		"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
				         	"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         	"<tr><td><b>Oprational</b></td><td>${oprational}</td></tr>" +
				         	"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },{
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Milk_Booth),
				        searchFields: ["name","address"],
				        displayField: "address",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Milk Booth",
				        placeholder: "Malharganj 452002",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Milk Booth",
				        		"<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td>${name}</td></tr>" +
				         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
				         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
					         	"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
					         	"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
					         	"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					         	"</tbody>" +
					         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },
			      {
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.MP_Online_Center),
				        searchFields: ["address"],
				        displayField: "address",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "MP Online Center",
				        placeholder: "Rai MP online",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("MP Online Center",
			        		"<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
				         	"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         	"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
				         	"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },
			      {
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Museum),
				        searchFields: ["museum_name","address"],
				        displayField: "museum_name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Museum",
				        placeholder: "Jai Malahar",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Museum",
				         "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td> ${museum_name}</td></tr>" +
				         		"<tr><td><b>Type</b></td><td> ${museum_type}</td></tr>" +
				         		"<tr><td><b>Phone Number</b></td><td> ${phone_number}</td></tr>" +
				         		"<tr><td><b>Sector Number</b></td><td> ${sector_no}</td></tr>" +
				         		"<tr><td><b>Village</b></td><td> ${village}</td></tr>" +
				         		"<tr><td><b>Timings</b></td><td> ${timings}</td></tr>" +
				         		"<tr><td><b>Ticket Availability</b></td><td> ${ticket_availability}</td></tr>" +
				         		"<tr><td><b>Tourist Guides Availability</b></td><td> ${tourist_guides_availability}</td></tr>" +
				         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
				         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
				         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
				      },
				      {
					        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Neki_Ki_Diwar),
					        searchFields: ["name","address"],
					        displayField: "name",
					        exactMatch: false,
					        outFields: ["*"],
					        name: "Neki Ki Diwar",
					        placeholder: "Anandam Kendra (Neki Ki Deewar) Indore",
					        maxResults: 10,
					        maxSuggestions: 10,
					        infoTemplate: new InfoTemplate("Neki Ki Diwar",
					         "<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
					         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
					         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
					         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
					         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
					         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
					         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
					         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
					         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
					         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					         	"</tbody>" +
					         "</table>"
					        ),
					        enableSuggestions: true,
					        minCharacters: 0
					      },
					      {
						        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Oldage_Home),
						        searchFields: ["oldage_home","address"],
						        displayField: "oldage_home",
						        exactMatch: false,
						        outFields: ["*"],
						        name: "Oldage Home",
						        placeholder: "Malharganj",
						        maxResults: 10,
						        maxSuggestions: 10,
						        infoTemplate: new InfoTemplate("Oldage Home",
						         "<table class='table table-bordered w-100 map-detail-custom'>" +
						         	"<tbody>" +
						         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
						         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
						         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
						         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
						         		"<tr><td><b>Name</b></td><td> ${oldage_home}</td></tr>" +
						         		
						         		"<tr><td><b>Maintained</b></td><td> ${maintained}</td></tr>" +
						         		"<tr><td><b>Medical Facility</b></td><td> ${medical_facility}</td></tr>" +
						         		
						         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
						         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
						         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
						         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
						         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
						         	"</tbody>" +
						         "</table>"
						        ),
						        enableSuggestions: true,
						        minCharacters: 0
						      },
						      {
							        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Orphanange),
							        searchFields: ["orphanage_name","address"],
							        displayField: "orphanage_name",
							        exactMatch: false,
							        outFields: ["*"],
							        name: "Orphanange",
							        placeholder: "Animals And Birds Welfare Society",
							        maxResults: 10,
							        maxSuggestions: 10,
							        infoTemplate: new InfoTemplate("Orphanange",
							         "<table class='table table-bordered w-100 map-detail-custom'>" +
							         	"<tbody>" +
							         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
							         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
							         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
							         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
							         		"<tr><td><b>Name</b></td><td> ${orphanage_name}</td></tr>" +
							         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
							         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
							         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
							         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
							         	"</tbody>" +
							         "</table>"
							        ),
							        enableSuggestions: true,
							        minCharacters: 0
							      },
							      {
								        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Parking),
								        searchFields: ["name","address"],
								        displayField: "name",
								        exactMatch: false,
								        outFields: ["*"],
								        name: "Parking",
								        placeholder: "Sanjay Setu",
								        maxResults: 10,
								        maxSuggestions: 10,
								        infoTemplate: new InfoTemplate("Parking",
								         "<table class='table table-bordered w-100 map-detail-custom'>" +
								         	"<tbody>" +
								         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
								         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
								         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
								         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
								         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
								         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
								         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
								         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
								         	"</tbody>" +
								         "</table>"
								        ),
								        enableSuggestions: true,
								        minCharacters: 0
								      },
								      {
									        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Park_Garden),
									        searchFields: ["park_garden_name","address"],
									        displayField: "park_garden_name",
									        exactMatch: false,
									        outFields: ["*"],
									        name: "Park & Garden",
									        placeholder: "Greater Vaishali Big Garden",
									        maxResults: 10,
									        maxSuggestions: 10,
									        infoTemplate: new InfoTemplate("Park & Garden",
									         "<table class='table table-bordered w-100 map-detail-custom'>" +
									         	"<tbody>" +
									         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
									         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
									         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
									         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
									         		"<tr><td><b>Name</b></td><td> ${park_garden_name}</td></tr>" +
									         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
									         		"<tr><td><b>Garden Area</b></td><td> ${garden_area}</td></tr>" +
									         		"<tr><td><b>Toilets</b></td><td> ${toilets}</td></tr>" +
									         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
									         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
									         	"</tbody>" +
									         "</table>"
									        ),
									        enableSuggestions: true,
									        minCharacters: 0
									      },
			      {
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Petrol_Pump),
				        searchFields: ["name","type"],
				        displayField: "address",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Petrol Pump",
				        placeholder: "Indian Oil",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Petrol Pump",
				           "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td>${name}</td></tr>" +
			         		"<tr><td><b>Type</b></td><td>${type}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
				         	"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
					        "<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
					        "<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },
			      {
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Playground),
				        searchFields: ["name","address"],
				        displayField: "name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Playground",
				        placeholder: "IPS Playground",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Playground",
				         "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
				         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
				         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
				      },
				      {
					        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Police_Post),
					        searchFields: ["name","address"],
					        displayField: "name",
					        exactMatch: false,
					        outFields: ["*"],
					        name: "Police Post",
					        placeholder: "Guljar Colony Police Chowki",
					        maxResults: 10,
					        maxSuggestions: 10,
					        infoTemplate: new InfoTemplate("Police Post",
					         "<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
					         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
					         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
					         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
					         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
					         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
					         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
					         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
					         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					         	"</tbody>" +
					         "</table>"
					        ),
					        enableSuggestions: true,
					        minCharacters: 0
					      },
					      {
						        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Post_Office),
						        searchFields: ["name","address"],
						        displayField: "name",
						        exactMatch: false,
						        outFields: ["*"],
						        name: "Post Office",
						        placeholder: "Bhawarkua Post Office",
						        maxResults: 10,
						        maxSuggestions: 10,
						        infoTemplate: new InfoTemplate("Post Office",
						         "<table class='table table-bordered w-100 map-detail-custom'>" +
						         	"<tbody>" +
						         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
						         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
						         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
						         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
						         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
						         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
						         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
						         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
						         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
						         		"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
						         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
						         	"</tbody>" +
						         "</table>"
						        ),
						        enableSuggestions: true,
						        minCharacters: 0
						      },
			     {
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Primary_School),
				        searchFields: ["school_name","school_type"],
				        displayField: "school_name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Primary School",
				        placeholder: "Sharda Girls School",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Primary School",
				        		 "<table class='table table-bordered w-100 map-detail-custom'>" +
						         	"<tbody>" +
						         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
					         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
					         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
					         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
						         		"<tr><td><b>Name</b></td><td>${school_name}</td></tr>" +
						         		"<tr><td><b>Type</b></td><td>${school_type}</td></tr>" +
						         		"<tr><td><b>Address</b></td><td>${school_address}</td></tr>" +
						         		"<tr><td><b>Category</b></td><td>${school_category}</td></tr>" +
						         		"<tr><td><b>School Management</b></td><td>${school_management}</td></tr>" +
						         		"<tr><td><b>Medium Of Instruction</b></td><td>${medium_of_instruction}</td></tr>" +
						         		"<tr><td><b>Number Of Smart Class Rooms</b></td><td>${number_of_smart_class_rooms}</td></tr>" +
						         		"<tr><td><b>Library</b></td><td>${library}</td></tr>" +
						         		"<tr><td><b>Year Of Reorganization</b></td><td>${year_of_reorganization}</td></tr>" +
						         		"<tr><td><b>Play Ground</b></td><td>${play_ground}</td></tr>" +
						         		"<tr><td><b>Principal Name</b></td><td>${principal_name}</td></tr>" +
						         		"<tr><td><b>Male Hostel</b></td><td>${male_hostel}</td></tr>" +
						         		"<tr><td><b>Female Hostel</b></td><td>${female_hostel}</td></tr>" +
						         		"<tr><td><b>Male Toilet</b></td><td>${male_toilet}</td></tr>" +
						         		"<tr><td><b>Female Toilet</b></td><td>${female_toilet}</td></tr>" +
						         		"<tr><td><b>Number Of Students</b></td><td>${number_of_students}</td></tr>" +
						         		"<tr><td><b>Teaching Staff</b></td><td>${teaching_staff}</td></tr>" +
						         		"<tr><td><b>Non Teaching Staff</b></td><td>${non_teaching_staff}</td></tr>" +
						         		"<tr><td><b>Staff Vacancy</b></td><td>${staff_vacancy}</td></tr>" +
						         		"<tr><td><b>No Of Floors</b></td><td>${no_of_floors}</td></tr>" +
						         		"<tr><td><b>Phone Number</b></td><td>${phone_number}</td></tr>" +
						         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
						         	"</tbody>" +
						         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },
					{
					  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Public_Distribution),
					searchFields: ["pds_name","address"],
					displayField: "pds_name",
					exactMatch: false,
					outFields: ["*"],
					name: "Public Distribution",
					placeholder: "Chaurasia Brothers",
					maxResults: 10,
					maxSuggestions: 10,
					infoTemplate: new InfoTemplate("Public Distribution",
					"<table class='table table-bordered w-100 map-detail-custom'>" +
					"<tbody>" +
						"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
						"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
						"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
						"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
						"<tr><td><b>Name</b></td><td> ${pds_name}</td></tr>" +
						"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
						"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
						"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
						"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
						"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					"</tbody>" +
					"</table>"
					),
					enableSuggestions: true,
					minCharacters: 0
					},
					{
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Railway),
				    searchFields: ["ward_name"],
				    displayField: "ward_name",
				    exactMatch: false,
				    outFields: ["*"],
				    name: "Railway",
				    placeholder: "Lasudiya Mori",
				    maxResults: 10,
				    maxSuggestions: 10,
				    infoTemplate: new InfoTemplate("Railway",
				     "<table class='table table-bordered w-100 map-detail-custom'>" +
				     	"<tbody>" +
				     		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				     		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				     		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				     		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				     		"<tr><td><b>Width</b></td><td> ${width}</td></tr>" +
				     		
				     	"</tbody>" +
				     "</table>"
				    ),
				    enableSuggestions: true,
				    minCharacters: 0
				  },
				  {
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Railway_Station),
				        searchFields: ["railway_st","address"],
				        displayField: "railway_st",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Railway Station",
				        placeholder: "Indore Junction",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Railway Station",
				         "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td> ${railway_st}</td></tr>" +
				         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
				         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
				         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         		"<tr><td><b>Total Plat</b></td><td>${total_plat}</td></tr>" +
				         		"<tr><td><b>Remark</b></td><td>${remarks}</td></tr>" +
				         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geo_tagged}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
				      },
			      {
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Religious_Facility),
				        searchFields: ["name","type"],
				        displayField: "address",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Religious Facility",
				        placeholder: "Mataji Ka Mandir",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Religious Facility",
				           "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td>${name}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
			         		"<tr><td><b>Type</b></td><td>${type}</td></tr>" +	
			         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
			         		"<tr><td><b>Remarks</b></td><td>${remark}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },
			      
			      {
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Secondary_School),
				        searchFields: ["school_name","school_type"],
				        displayField: "school_name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Secondary School",
				        placeholder: "Bal Shiksha Mandir School",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Secondary School",
			        		 "<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		
					         		"<tr><td><b>Name</b></td><td>${school_name}</td></tr>" +
					         		"<tr><td><b>Type</b></td><td>${school_type}</td></tr>" +
					         		"<tr><td><b>Address</b></td><td>${school_address}</td></tr>" +
					         		"<tr><td><b>Category</b></td><td>${school_category}</td></tr>" +
					         		"<tr><td><b>School Management</b></td><td>${school_management}</td></tr>" +
					         		
					         		"<tr><td><b>Medium Of Instruction</b></td><td>${medium_of_instruction}</td></tr>" +
					         		"<tr><td><b>Library</b></td><td>${library}</td></tr>" +
					         		"<tr><td><b>Year Of Reorganization</b></td><td>${year_of_reorganization}</td></tr>" +
					         		"<tr><td><b>Play Ground</b></td><td>${play_ground}</td></tr>" +
					         		"<tr><td><b>Principal Name</b></td><td>${principal_name}</td></tr>" +
					         		"<tr><td><b>Male Hostel</b></td><td>${male_hostel}</td></tr>" +
					         		"<tr><td><b>Female Hostel</b></td><td>${female_hostel}</td></tr>" +
					         		"<tr><td><b>Male Toilet</b></td><td>${male_toilet}</td></tr>" +
					         		"<tr><td><b>Female Toilet</b></td><td>${female_toilet}</td></tr>" +
					         		"<tr><td><b>Number Of Students</b></td><td>${number_of_students}</td></tr>" +
					         		"<tr><td><b>Teaching Staff</b></td><td>${teaching_staff}</td></tr>" +
					         		"<tr><td><b>Non Teaching Staff</b></td><td>${non_teaching_staff}</td></tr>" +
					         		"<tr><td><b>Staff Vacancy</b></td><td>${staff_vacancy}</td></tr>" +
					         		"<tr><td><b>No Of Floors</b></td><td>${no_of_floors}</td></tr>" +
					         		"<tr><td><b>Phone Number</b></td><td>${phone_number}</td></tr>" +
					         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
					         	"</tbody>" +
					         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },
			      {
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Shopping_Mall),
				        searchFields: ["name","address"],
				        displayField: "name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Shopping Mall",
				        placeholder: "Carbon Basics",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Shopping Mall",
				         "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
				         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
				         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
				         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
				         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         		"<tr><td><b>Parking</b></td><td>${parking}</td></tr>" +
				         		"<tr><td><b>Food Court</b></td><td>${food_court}</td></tr>" +
				         		"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
				         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
				      },
			      {
			    	  featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Sports_Facility),
				        searchFields: ["name","type","address"],
				        displayField: "name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "Sports Facility",
				        placeholder: "Ramesh Bhatiya Cricket Foundation",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("Sports Facility",
			        		"<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         	"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td>${name}</td></tr>" +
			         		"<tr><td><b>Type</b></td><td>${type}</td></tr>" +
			         		"<tr><td><b>Latitude</b></td><td>${latitude}</td></tr>" +
			         		"<tr><td><b>Longitude</b></td><td>${longitude}</td></tr>" +
				         	"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
				         	"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
				         	"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
			      },
	      {
		        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Street_Food_Zone),
		        searchFields: ["name","address"],
		        displayField: "name",
		        exactMatch: false,
		        outFields: ["*"],
		        name: "Street Food Zone",
		        placeholder: "Gokul Corner",
		        maxResults: 10,
		        maxSuggestions: 10,
		        infoTemplate: new InfoTemplate("Street Food Zone",
		         "<table class='table table-bordered w-100 map-detail-custom'>" +
		         	"<tbody>" +
		         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
		         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
		         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
		         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
		         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
		         		"<tr><td><b>Market Name</b></td><td> ${market_name}</td></tr>" +
		         		"<tr><td><b>Delicacies</b></td><td> ${delicacies}</td></tr>" +
		         		"<tr><td><b>Parking</b></td><td> ${parking}</td></tr>" +
		         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
		         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
		         		"<tr><td><b>Address</b></td><td>${address}</td></tr>" +
		         		"<tr><td><b>Remark</b></td><td>${remark}</td></tr>" +
		         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
		         	"</tbody>" +
		         "</table>"
		        ),
		        enableSuggestions: true,
		        minCharacters: 0
		      },
		      {
			        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Swimming_Pool),
			        searchFields: ["name"],
			        displayField: "name",
			        exactMatch: false,
			        outFields: ["*"],
			        name: "Swimming Pool",
			        placeholder: "Shree Lakshaman Singh Chauhan",
			        maxResults: 10,
			        maxSuggestions: 10,
			        infoTemplate: new InfoTemplate("Swimming Pool",
			         "<table class='table table-bordered w-100 map-detail-custom'>" +
			         	"<tbody>" +
			         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
			         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
			         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
			         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
			         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
			         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
			         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
			         	"</tbody>" +
			         "</table>"
			        ),
			        enableSuggestions: true,
			        minCharacters: 0
			      },
			      {
				        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.SWM_C_D_Plants),
				        searchFields: ["name"],
				        displayField: "name",
				        exactMatch: false,
				        outFields: ["*"],
				        name: "SWM C & D Plants",
				        placeholder: "C&D It Park",
				        maxResults: 10,
				        maxSuggestions: 10,
				        infoTemplate: new InfoTemplate("SWM C & D Plants",
				         "<table class='table table-bordered w-100 map-detail-custom'>" +
				         	"<tbody>" +
				         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
				         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
				         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
				         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
				         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
				         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
				         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
				         	"</tbody>" +
				         "</table>"
				        ),
				        enableSuggestions: true,
				        minCharacters: 0
				      },
				      {
					        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.SWM_CNG_Plants),
					        searchFields: ["name"],
					        displayField: "name",
					        exactMatch: false,
					        outFields: ["*"],
					        name: "SWM CNG Plants",
					        placeholder: "Mahindra Bio Gas Plant",
					        maxResults: 10,
					        maxSuggestions: 10,
					        infoTemplate: new InfoTemplate("SWM CNG Plants",
					         "<table class='table table-bordered w-100 map-detail-custom'>" +
					         	"<tbody>" +
					         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
					         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
					         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
					         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
					         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
					         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
					         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
					         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
					         	"</tbody>" +
					         "</table>"
					        ),
					        enableSuggestions: true,
					        minCharacters: 0
					      },
					      {
						        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.SWM_GTS),
						        searchFields: ["name"],
						        displayField: "name",
						        exactMatch: false,
						        outFields: ["*"],
						        name: "SWM GTS",
						        placeholder: "Sirpur",
						        maxResults: 10,
						        maxSuggestions: 10,
						        infoTemplate: new InfoTemplate("SWM GTS",
						         "<table class='table table-bordered w-100 map-detail-custom'>" +
						         	"<tbody>" +
						         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
						         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
						         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
						         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
						         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
						         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
						         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
						         	"</tbody>" +
						         "</table>"
						        ),
						        enableSuggestions: true,
						        minCharacters: 0
						      },
						      {
							        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.SWM_Trenching_Ground),
							        searchFields: ["name"],
							        displayField: "name",
							        exactMatch: false,
							        outFields: ["*"],
							        name: "SWM Trenching Ground",
							        placeholder: "Tranching ground devguradiya",
							        maxResults: 10,
							        maxSuggestions: 10,
							        infoTemplate: new InfoTemplate("SWM Trenching Ground",
							         "<table class='table table-bordered w-100 map-detail-custom'>" +
							         	"<tbody>" +
							         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
							         	"</tbody>" +
							         "</table>"
							        ),
							        enableSuggestions: true,
							        minCharacters: 0
							      },
							     
								      {
									        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Toilet_CT),
									        searchFields: ["name","address"],
									        displayField: "name",
									        exactMatch: false,
									        outFields: ["*"],
									        name: "Toilet CT",
									        placeholder: "Kandilpura",
									        maxResults: 10,
									        maxSuggestions: 10,
									        infoTemplate: new InfoTemplate("Toilet CT",
									         "<table class='table table-bordered w-100 map-detail-custom'>" +
									         	"<tbody>" +
									         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
									         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
									         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
									         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
									         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
									         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
									         		"<tr><td><b>Address</b></td><td> ${address}</td></tr>" +
									         		"<tr><td><b>Male</b></td><td> ${male}</td></tr>" +
									         		"<tr><td><b>Female</b></td><td> ${female}</td></tr>" +
									         		"<tr><td><b>Child</b></td><td> ${child}</td></tr>" +
									         		"<tr><td><b>Maintained</b></td><td> ${maintained}</td></tr>" +
									         		"<tr><td><b>Timing</b></td><td> ${timing}</td></tr>" +
									         		"<tr><td><b>Supervisor</b></td><td> ${supervisor}</td></tr>" +
									         		"<tr><td><b>Toilet Dir</b></td><td> ${toilet_dir}</td></tr>" +
									         		"<tr><td><b>If No Then</b></td><td> ${if_no_then}</td></tr>" +
									         		"<tr><td><b>Toilet ID</b></td><td> ${toilet_id}</td></tr>" +
									         		"<tr><td><b>Mohua GTL</b></td><td> ${mohua_gtl}</td></tr>" +
									         		"<tr><td><b>Disabled</b></td><td> ${disabled}</td></tr>" +
									         		"<tr><td><b>Third Gender</b></td><td> ${third_gender}</td></tr>" +
									         		"<tr><td><b>Supervisor Contact</b></td><td> ${supervisor_contact}</td></tr>" +
									         		"<tr><td><b>Name of Caretaker</b></td><td> ${name_of_caretaker}</td></tr>" +
									         		"<tr><td><b>Caretaker Contact</b></td><td> ${caretaker_contact}</td></tr>" +
									         		"<tr><td><b>Pay And Use</b></td><td> ${pay_and_use}</td></tr>" +
									         		
									         	"</tbody>" +
									         "</table>"
									        ),
									        enableSuggestions: true,
									        minCharacters: 0
									      },
									      {
										        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Toilet_PT),
										        searchFields: ["name","address"],
										        displayField: "name",
										        exactMatch: false,
										        outFields: ["*"],
										        name: "Toilet PT",
										        placeholder: "Mali Mohllla",
										        maxResults: 10,
										        maxSuggestions: 10,
										        infoTemplate: new InfoTemplate("Toilet PT",
										         "<table class='table table-bordered w-100 map-detail-custom'>" +
										         	"<tbody>" +
										         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
										         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
										         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
										         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
										         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
										         		"<tr><td><b>Type</b></td><td> ${type}</td></tr>" +
										         		"<tr><td><b>Address</b></td><td> ${address}</td></tr>" +
										         		"<tr><td><b>Male</b></td><td> ${male}</td></tr>" +
										         		"<tr><td><b>Female</b></td><td> ${female}</td></tr>" +
										         		"<tr><td><b>Child</b></td><td> ${child}</td></tr>" +
										         		"<tr><td><b>Maintained</b></td><td> ${maintained}</td></tr>" +
										         		"<tr><td><b>Timing</b></td><td> ${timing}</td></tr>" +
										         		"<tr><td><b>Supervisor</b></td><td> ${supervisor}</td></tr>" +
										         		"<tr><td><b>Toilet Dir</b></td><td> ${toilet_dir}</td></tr>" +
										         		"<tr><td><b>If No Then</b></td><td> ${if_no_then}</td></tr>" +
										         		"<tr><td><b>Toilet ID</b></td><td> ${toilet_id}</td></tr>" +
										         		"<tr><td><b>Mohua GTL</b></td><td> ${mohua_gtl}</td></tr>" +
										         		"<tr><td><b>Disabled</b></td><td> ${disabled}</td></tr>" +
										         		"<tr><td><b>Third Gender</b></td><td> ${third_gender}</td></tr>" +
										         		"<tr><td><b>Supervisor Contact</b></td><td> ${supervisor_contact}</td></tr>" +
										         		"<tr><td><b>Name of Caretaker</b></td><td> ${name_of_caretaker}</td></tr>" +
										         		"<tr><td><b>Caretaker Contact</b></td><td> ${caretaker_contact}</td></tr>" +
										         		"<tr><td><b>Pay And Use</b></td><td> ${pay_and_use}</td></tr>" +
										         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
										         	"</tbody>" +
										         "</table>"
										        ),
										        enableSuggestions: true,
										        minCharacters: 0
										      },
										      {
											        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Toilet_Urinal),
											        searchFields: ["ward_name"],
											        displayField: "ward_name",
											        exactMatch: false,
											        outFields: ["*"],
											        name: "Toilet Urinal",
											        placeholder: "Chitavad",
											        maxResults: 10,
											        maxSuggestions: 10,
											        infoTemplate: new InfoTemplate("Toilet Urinal",
											         "<table class='table table-bordered w-100 map-detail-custom'>" +
											         	"<tbody>" +
											         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
											         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
											         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
											         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
											         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
											         		"<tr><td><b>Latitude</b></td><td> ${latitude}</td></tr>" +
											         		"<tr><td><b>Longitude</b></td><td> ${longitude}</td></tr>" +
											         	"</tbody>" +
											         "</table>"
											        ),
											        enableSuggestions: true,
											        minCharacters: 0
											      },
										      {
											        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Unipole),
											        searchFields: ["name","address"],
											        displayField: "name",
											        exactMatch: false,
											        outFields: ["*"],
											        name: "Unipole",
											        placeholder: "Advertising Hording",
											        maxResults: 10,
											        maxSuggestions: 10,
											        infoTemplate: new InfoTemplate("Unipole",
											         "<table class='table table-bordered w-100 map-detail-custom'>" +
											         	"<tbody>" +
											         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
											         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
											         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
											         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
											         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
											         		"<tr><td><b>Address</b></td><td> ${address}</td></tr>" +
											         		"<tr><td><b>Latitude </b></td><td> ${latitude}</td></tr>" +
											         		"<tr><td><b>Longitude </b></td><td> ${longitude}</td></tr>" +
											         		"<tr><td><b>Ownership</b></td><td> ${ownership}</td></tr>" +
											         		"<tr><td><b>Remarks</b></td><td> ${remark}</td></tr>" +
											         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
											         	"</tbody>" +
											         "</table>"
											        ),
											        enableSuggestions: true,
											        minCharacters: 0
											      },
											      {
												        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Water_ATM),
												        searchFields: ["address"],
												        displayField: "address",
												        exactMatch: false,
												        outFields: ["*"],
												        name: "Water ATM",
												        placeholder: "Choitram Square 452014 Indore",
												        maxResults: 10,
												        maxSuggestions: 10,
												        infoTemplate: new InfoTemplate("Water ATM",
												         "<table class='table table-bordered w-100 map-detail-custom'>" +
												         	"<tbody>" +
												         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
												         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
												         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
												         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
												         		"<tr><td><b>Name</b></td><td> ${name}</td></tr>" +
												         		"<tr><td><b>Address</b></td><td> ${address}</td></tr>" +
												         		"<tr><td><b>Latitude </b></td><td> ${latitude}</td></tr>" +
												         		"<tr><td><b>Longitude </b></td><td> ${longitude}</td></tr>" +
												         		"<tr><td><b>Remarks</b></td><td> ${remark}</td></tr>" +
												         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
												         		"</tbody>" +
												         "</table>"
												        ),
												        enableSuggestions: true,
												        minCharacters: 0
												      },
												      {
													        featureLayer: new FeatureLayer(window.INDORE_LAYERS_SYMBOLOGY + "/" + window.WiFi_Hotspot),
													        searchFields: ["area_name"],
													        displayField: "area_name",
													        exactMatch: false,
													        outFields: ["*"],
													        name: "WiFi Hotspot",
													        placeholder: "Annpurna Road",
													        maxResults: 10,
													        maxSuggestions: 10,
													        infoTemplate: new InfoTemplate("WiFi Hotspot",
													         "<table class='table table-bordered w-100 map-detail-custom'>" +
													         	"<tbody>" +
													         		"<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>" +
													         		"<tr><td><b>Ward No</b></td><td>${ward_no}</td></tr>" +
													         		"<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>" +
													         		"<tr><td><b>Zone No</b></td><td>${zone_no}</td></tr>" +
													         		"<tr><td><b>Name</b></td><td> ${area_name}</td></tr>" +
													         		"<tr><td><b>Address</b></td><td> ${address}</td></tr>" +
													         		"<tr><td><b>Latitude </b></td><td> ${latitude}</td></tr>" +
													         		"<tr><td><b>Longitude </b></td><td> ${longitude}</td></tr>" +
													         		"<tr><td><b>Remarks</b></td><td> ${remark}</td></tr>" +
													         		"<tr><td><b>Image</b></td><td><a target='_blank' href='"+window.iscdl.appData.baseURL+"api-docs/getImage/poi/${geotagged_photos}'>View Image</a></td></tr>" +
													         	"</tbody>" +
													         "</table>"
													        ),
													        enableSuggestions: true,
													        minCharacters: 0
													      }
		     
		      
		     
		     );
			
			var modifiedSources = $.grep(sources, function(e){ 
			     return e.name != "Esri World Geocoder"; 
			});
			
			// modifiedSources.push(firstSource);
			search.set("sources", modifiedSources);
			
			// search.set("sources", sources);
			
			search.startup();

			/*
	         var basemaps = [];
	         
	          var Pocket_1_Ortho_Part_1_layers = new BasemapLayer({  
	            url: window.POCKET_1_ORTHO_PART_1   
	          });  
	          
	          var Pocket_1_Ortho_Part_2_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_2  
		          });  
	          var Pocket_1_Ortho_Part_3_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_3   
		          });  
	          var Pocket_1_Ortho_Part_4_1_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_4_1   
		          }); 
	          
	          var Pocket_1_Ortho_Part_4_2_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_4_2 
		          });
	          
	          var Pocket_1_Ortho_Part_5_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_5 
		          });  
	          var Pocket_1_Ortho_Part_6_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_6   
		          });  
	          var Pocket_1_Ortho_Part_7_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_7   
		          });  
	          var Pocket_1_Ortho_Part_8_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_8   
		          });  
	          var Pocket_1_Ortho_Part_9_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_9   
		          });  
	          var Pocket_1_Ortho_Part_10_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_10
		          });  
	          var Pocket_1_Ortho_Part_11_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_11  
		          });
	          
	          var Pocket_1_Ortho_Part_12_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_12  
		          });
	          
	          
	          
	          var Pocket_1_Ortho_Part_14_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_14  
		          });
	          
	          var Pocket_1_Ortho_Part_15_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_15  
		          });
	          
	          var Pocket_1_Ortho_Part_16_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_16  
		          });
	          
	          var Pocket_1_Ortho_Part_17_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_17  
		          });
	          
	          var Pocket_1_Ortho_Part_18_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_18  
		          });
	          
	          var Pocket_1_Ortho_Part_19_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_19  
		          });
	          
	          var Pocket_1_Ortho_Part_20_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_20  
		          });
	          
	          var Pocket_1_Ortho_Part_21_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_21  
		          });
	          
	          var Pocket_1_Ortho_Part_22_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_22  
		          });
	          
	          var Pocket_1_Ortho_Part_23_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_23  
		          });
	          
	          var Pocket_1_Ortho_Part_24_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_24  
		          });
	          
	          var Pocket_1_Ortho_Part_25_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_25  
		          });
	          
	          var Pocket_1_Ortho_Part_26_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_26  
		          });
	          
	          var Pocket_1_Ortho_Part_27_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_27  
		          });
	          
	          var Pocket_1_Ortho_Part_28_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_28  
		          });
	          
	          var Pocket_1_Ortho_Part_31_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_31 
		          });
	          
	          var Pocket_1_Ortho_Part_32_layers = new BasemapLayer({  
		            url: window.POCKET_1_ORTHO_PART_32  
		          });
	          
	          
	          
	          
	          var tiled_image_2015 = new BasemapLayer({  
		            url:    window.TILED_IMAGE_2015
		      }); 
	          
	          // 2017
	          var iscdl_sat_image_2017_1 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_1
		          }); 
	          
	          var iscdl_sat_image_2017_2 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_2
		          }); 
	          
	          var iscdl_sat_image_2017_3 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_3
		          }); 
	          
	          var iscdl_sat_image_2017_4 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_4
		          }); 
	          
	          var iscdl_sat_image_2017_5 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_5
		          }); 
	          
	          var iscdl_sat_image_2017_6 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_6
		          }); 
	          
	          var iscdl_sat_image_2017_7 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_7
		          }); 
	          
	          var iscdl_sat_image_2017_8 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_8
		          }); 
	          
	          var iscdl_sat_image_2017_9 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_9
		          }); 
	          
	          var iscdl_sat_image_2017_10 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_10
		          }); 
	          
	          var iscdl_sat_image_2017_11 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_11
		          }); 
	          
	          var iscdl_sat_image_2017_12 = new BasemapLayer({  
		            url:    window.ISCDL_SAT_IMAGE_2017_12
		          }); 
	          
	          var noBasemapLayer = new BasemapLayer({
	      		    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
	      		    opacity : 0.0
		          });
	          
	          var hybridLayer = new BasemapLayer({
      		    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
	          });	 
      	  
		  	
      	  	
	      	  var streetLayer = new BasemapLayer({
	      		    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
	      	  });	 
      	  
	          var image2015Basemap = new Basemap({
	        	  layers: [tiled_image_2015],  
		            title: "ISCDL Satellite Image 2015",  
		            thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite_Image_2.png"
	          });
	          
	          var satellite_image_new = new BasemapLayer({  
		            url: "https://map.muzaffarpursmartcity.org/arcgis/rest/services/Hosted/Ortho_Image_24_03_20231/MapServer"
		      }); 
		      
		      
	          var imageSatelliteImage = new Basemap({
					layers : [satellite_image_new],
					title : "Satellite Imagery",
					thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite_Image_2.png"
			  })
	          
	          
	          // basemaps.push(customBasemap);
	          basemaps.push(imageSatelliteImage);
	          // basemaps.push(image2017Basemap);
	          // basemaps.push(abdAreaOrthoBasemap);
	          
	          var noBasemap = new Basemap({
	        	    layers: [noBasemapLayer],
	        	    title: "No Basemap",
	        	    // thumbnailUrl: window.iscdl.appData.webURLPrefix +
					// "images/No_Basemap.svg"
	        	    thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/No_Basemap_1.png"
	          });
	          
	          var hybridBasemap = new Basemap({
	        	    layers: [hybridLayer],
	        	    title: "Hybrid",
	        	    thumbnailUrl:"https://www.arcgis.com/sharing/rest/content/items/2660b09ebb9f4b24b0c61cf2383d64f9" +
	        	    		"/info/thumbnail/imagery_hybrid_in.jpg"
	          });
	          
	        
	          
	          var streetLayerBasemap = new Basemap({
	        	    layers: [streetLayer],
	        	    title: "Street",
	        	    thumbnailUrl:"https://www.arcgis.com/sharing/rest/content/items/8d937fe6577d410a888df4fd50b45042" +
	        	    		"/info/thumbnail/streets_in.jpg"
	          });
	          
	          
	          	          
	          basemaps.push(hybridBasemap);
	          basemaps.push(streetLayerBasemap);
	          basemaps.push(noBasemap);

			var basemapGallery = new BasemapGallery({
				showArcGISBasemaps : false,
				basemaps: basemaps,  
				map : map,

			}, "basemapGalleryDiv");
			basemapGallery.startup();

			basemapGallery.on("error", function(msg) {
				console.log("basemap gallery error:  ", msg);
			});
			
			*/
			
			/**
			 * measurement
			 */

			var pms = new esri.symbol.PictureMarkerSymbol("",
					24, 24);
			pms.setOffset(9, 11);
			var sls = new esri.symbol.SimpleLineSymbol(
					esri.symbol.SimpleLineSymbol.STYLE_DOT, new dojo.Color([
							255, 0, 0, 0.55 ]), 4);
			measurement = new Measurement({
				map : map,
				// lineSymbol : sls,
				// pointSymbol : pms
			}, dom.byId('measurementDiv'));
			
			measurement.startup();

			let areaUnitStrings = ["Acres", "Sq Miles", "Sq Kilometers", "Hectares", "Sq Yards", 
				"Sq Feet", "Sq Meters"];
			let _areaUnitStringsLong = ["esriAcres", "esriSquareMiles", "esriSquareKilometers", 
				"esriHectares", "esriSquareYards", "esriSquareFeet","esriSquareMeters"];
			
			let distanceUnitStrings= ["Miles", "Kilometers", "Feet","Meters", "Yards"];
			let distanceUnitStringsLong= ["esriMiles", "esriKilometers", "esriFeet","esriMeters", "esriYards"];
			
			measurement._areaUnitStrings = areaUnitStrings;
			measurement._areaUnitStringsLong = _areaUnitStringsLong;
			
			measurement._distanceUnitStrings = distanceUnitStrings;
			measurement._distanceUnitStringsLong = distanceUnitStringsLong;
			
			measurement.on("measure-start", function(evt){
				map.setMapCursor("crosshair");
			});
			
			measurement.on("tool-change", function(evt){
				map.setMapCursor("crosshair");
			});
			
		}
		
		/**
		 * query-selected value click event
		 */
		
		$(".query-task-click").click(function(){
			$("#form_query").trigger("reset");
			$("#attribute_query_rslt").html("");
		});
		
		/**
		 * Around me Service start
		 */
		
		$("#near_area").change(function(){
			let range_value = $("#near_area").val();
			document.getElementById("area_range").innerHTML = range_value + " KM";
		});
		
		$("#clear_aroundme_rslt").click(function(){
			document.getElementById("area_range").innerHTML = 1 + " KM";
			$('#nearme_result').html("");
			window.base.removeLatLongError('arround_me_current_loc','arround_me_current_loc-error');
			window.base.removeLatLongError('around_layer','around_layer-error');
			$("#clearMap").trigger('click');
		});
		
		$("#arround_current_lat").click(function(){
			
			if(map.graphics){
				map.graphics.clear();	
			}
			
			var current_point = new Point(_current_long,_current_lat);
			
			// check for current location within boundary
			if(!initialExtent.contains(current_point)){
				$u.notify('info', 'Notification',
						'Current location is not within Indore boundary', '');
				return;
			}
			
			let c_point =   (_current_long).toFixed(6).toString() + ","  + (_current_lat).toFixed(6).toString();
			$('#arround_me_current_loc').val(c_point);
			map.centerAndZoom(current_point,18);
			
			map.graphics.clear();
			let n_point = new Point(mp.x,mp.y);
			let graphic = new Graphic(n_point, markerSymbol);
			graphic.setGeometry(n_point);
			map.graphics.add(graphic);
		});
		
		$("#arround_selected_lat").click(function(){
			
			if(map.graphics){
				map.graphics.clear();	
			}
			
			map.setMapCursor("crosshair");
			if(map_selection){
				map_selection.remove();
				// map_hover.remove();
			}
			mapClickEvtHandler = map.on("click", function(evt) {
				if(map.graphics){
					map.graphics.clear();	
				}
				
				if(map_selection){
					map_selection.remove();
					// map_hover.remove();
				}
				
				let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
				window.base.checkAroundMeSelectedlocationWithinBoundry(mp.x,mp.y,
						'arround_me_current_loc','arround_me_current_loc-error');
			});
		});

		/**
		 * Around me Service end
		 */
		
		
		/**
		 * FORM START
		 */
		
		var resultedFeaturesLayer = new GraphicsLayer();
		var queryGraphicLayer = new GraphicsLayer();
		
		// form swipe layer
		$('form[id="form_swipe_layer"]')
		.validate(
				{
					rules : {
						swipe_layer_select : {
							required : true,
						}
					},
					messages : {
						swipe_layer_select : {
							required : "Please Select Layer",
						}
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							removeSwipeLayer();
							let layer_id = $("#swipe_layer_select").val();
							if(layer_id){
								$(".loader").fadeIn();
								let url = window.layerDataController.getCitizenPortalLayerById(layer_id);
								swipe_layer_obj = new FeatureLayer(url);
								layerSwipe.layers = [swipe_layer_obj];
								map.addLayer(swipe_layer_obj);
								layerSwipe.startup();
								layerSwipe.enable();
								
								layerSwipe.on("load",function(){
									$(".loader").fadeOut();	
									window.depUtlityController.minimizePopup();
								});
							}
						} catch (e) {
							console.log(e);
							$(".loader").fadeOut();
							$u.notify("error", "Error","Something Happend Wrong");
						}
					}
		});
		
		// Around me form
		
		$('form[id="form_nearme"]')
		.validate(
				{
					rules : {
						around_layer : {
							required : true,
							
						},
						arround_me_current_loc : {
							required : true,
						}
					},
					messages : {
						around_layer : {
							required : "Please Select Layer",
						},
						arround_me_current_loc : {
							required : "Please Select Location",
							
						}
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							navigationNearmeRsltArr = [];
		        			navigationNoRouteRsltArr = [];
							let layer_id = $("#around_layer").val();
							let around_me_location = $("#arround_me_current_loc").val();
							let range_value = $("#near_area").val();
							document.getElementById("area_range").innerHTML = range_value + " KM";
							window.base.getNearmeResult(layer_id,around_me_location,range_value);
						} catch (e) {
							 $u.notify("error", "Error","Something Happend Wrong");
						}
					}
		});
		
		
		// add layer form
		
		$('form[id="form_addLayer"]')
		.validate(
				{
					rules : {
						file : {
							required : true,
						}
					},
					messages : {
						file : {
							required : "Please Select File",
						}
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							
							let fileName = $("#inFile").val();
							var ext = fileName.split('.').pop().toLowerCase();
							
							if(ext == "kml" || ext == "kmz"){
									window.base.addKMLFileOnMap();
							}else if(ext == "zip"){
								
								let ad_upfile = $('#inFile')[0].files;
								
								if(ad_upfile.length > 0){
									let fileSize = ad_upfile[0].size/1024/1024;
									if(fileSize > 30){
										$u.notify('warning', 'Warning', 'File size exceeds 30 MB', '');
										return;
									}
								}
								
								var name = fileName.split(".");
								name = name[0].replace("C:\\fakepath\\", "");
								 
								var params = {
							              'name': name,
							              'targetSR': map.spatialReference,
							              'maxRecordCount': 5000,
							              'enforceInputFileSizeLimit': true,
							              'enforceOutputJsonSizeLimit': true
							   };
								
								var extent = scaleUtils.getExtentForScale(map, 40000);
					            var resolution = extent.getWidth() / map.width;
					            params.generalize = true;
					            params.maxAllowableOffset = resolution;
					            params.reducePrecision = true;
					            params.numberOfDigitsAfterDecimal = 0;

					            var shapefileContent = {
					              'filetype': 'shapefile',
					              'publishParameters': JSON.stringify(params),
					              'f': 'json',
					              'callback.html': 'textarea'
					            };
					        	$(".loader").fadeIn();
					        	
					            esriRequest({
					              url: 'https://www.arcgis.com/sharing/rest/content/features/generate',
					              content: shapefileContent,
					              form: dom.byId('form_addLayer'),
					              handleAs: 'json',
					              load: lang.hitch(this, function (response) {
					            	  $(".loader").fadeOut();
					                if (response.error) {
					                  errorHandler(response.error);
					                  return;
					                }
					                var layerName = response.featureCollection.layers[0].layerDefinition.name;
					                window.base.addShapefileToMap(response.featureCollection);
					              }),
					              error: lang.hitch(this, errorHandler)
					            });
							}else{
									$u.notify("info", "Notification","Please select a valid file");
									return;
							}
						} catch (e) {
							$(".loader").fadeOut();
							 $u.notify("error", "Error","Something Happend Wrong");
						}
					}
		});
		
		function errorHandler (error) {
			$(".loader").fadeOut();
			$u.notify("info", "Notification",error.message);
			ontheFlyLayer = false;
            console.log(error.message)
        }
		
		/**
		 * clear add layer click event
		 */
		$("#clear_add_layer").click(function(){
				removeOnFlyLayer();	
				removeKMLLayer();
				map.setExtent(initialExtent);
		});
		
		// custom scalebar form
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
								map.setScale(scale_value);
								window.depUtlityController.minimizePopup();
							}
						} catch (e) {
							 $u.notify("error", "Error","Something Happend Wrong");
						}
					}
		});
		
		/**
		 * clear custom scalebar click event
		 */
		$("#custom_scale_reset").click(function(){
			window.depUtlityController.removeError('form_custom_scale');
			map.setExtent(initialExtent);
		});
		
		// for selected data fill
		function fillSelectedLatLongData(lat_id,long_id,lat_error_id,long_error_id){
			map.graphics.clear();
			if(map_selection){
				map_selection.remove();	
				// map_hover.remove();
			}
			
			map.setMapCursor("crosshair");
			mapClickEvtHandler = map.on("click", function(evt) {
				map.graphics.clear();
				if(map_selection){
					map_selection.remove();	
					// map_hover.remove();
				}
				let mp = webMercatorUtils
						.webMercatorToGeographic(evt.mapPoint);
				$('#'+lat_id)
						.val(mp.y.toFixed(6).toString());
				$('#'+long_id).val(
						mp.x.toFixed(6).toString());
				let point = new Point( {"x": mp.x, "y": mp.y, "spatialReference": {"wkid": 4326 } });
				let pictureMarkerSymbol = new PictureMarkerSymbol('images/pin.png', 25, 25);
				 map.graphics.add(new Graphic(point, pictureMarkerSymbol));
				 window.base.removeLatLongError(lat_id,lat_error_id);
				 window.base.removeLatLongError(long_id,long_error_id);
				 window.base.removeCursor();
				 map_info_tool = false;
				 $("#toggle_map_info").trigger('click');
			});
		};
		
		// for current location fill
		function fillCurrentLocationData(lat_id,long_id,lat_error_id,long_error_id){
			$('#'+lat_id).val((_current_lat).toFixed(6));
			$('#'+long_id).val((_current_long).toFixed(6));
			window.base.removeLatLongError(lat_id,lat_error_id);
			window.base.removeLatLongError(long_id,long_error_id);
			window.base.removeCursor();
		}
		
		$("#xy_selected_longitude").click(
				function() {
					map.setMapCursor("crosshair");
					if(map_selection){
						map_selection.remove();
						// map_hover.remove();
					}
					mapClickEvtHandler = map.on("click", function(evt) {
						let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
						window.base.checkSelectedlocationWithinBoundry(mp.x,mp.y,'xy_latitude',
								'xy_latitude-error','xy_longitude','xy_longitude-error');
					});
		});

		$("#xy_selected_lat").click(
				function() {
					map.setMapCursor("crosshair");
					if(map_selection){
						map_selection.remove();
						// map_hover.remove();
					}
					mapClickEvtHandler = map.on("click", function(evt) {
						let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
						window.base.checkSelectedlocationWithinBoundry(mp.x,mp.y,'xy_latitude',
								'xy_latitude-error','xy_longitude','xy_longitude-error');
					});
				});

		$('#xy_current_lat').click(
				function() {
					window.base.checkCurrentlocationWithinBoundry(_current_long,_current_lat,'xy_latitude',
							'xy_latitude-error','xy_longitude','xy_longitude-error');
		});

		$('#xy_current_longitude').click(
				function() {
					window.base.checkCurrentlocationWithinBoundry(_current_long,_current_lat,'xy_latitude',
							'xy_latitude-error','xy_longitude','xy_longitude-error');
		});
		
		// numeric value validator
		$.validator.addMethod('numericVal', function(value, element) {
			return /^[0-9]*\.?[0-9]*$/.test(value);
		}, "Please enter numeric value");
		
		// go to X-Y coordinates
		$('form[id="frm_to_location"]').validate({
					rules : {
						xy_latitude : {
							required : true,
							numericVal : true,
						},
						xy_longitude :{ 
						required : true,
						numericVal : true,
						},
					},
					messages : {
						xy_latitude : {
							required : "Please Enter Latitude",
							numericVal : "Please Enter Numeric Value",
						},
						xy_longitude : {
							required : "Please Enter Longitude",
							numericVal : "Please Enter Numeric Value",
						},
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							let latitude = $('#xy_latitude').val();
							let longitude = $('#xy_longitude').val();
							let pt = new Point(longitude,latitude);
							let pictureMarkerSymbol = new PictureMarkerSymbol('images/pin.png', 25, 25);
							let graphic = new Graphic(pt, pictureMarkerSymbol);
							map.graphics.add(graphic);
							
							let template_content = "";					
							let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
							  '<tbody>';
							table_content += '<tr><td><b>Latitude</b></td><td>'+latitude+'</td></tr>' + 
							'<tr><td><b>Longitude</b></td><td>'+longitude+'</td></tr>';
							template_content += table_content + '</tbody></table>';
							
							let xy_infoTemplate = new InfoTemplate("Know Your Coordinates",template_content);
							
							graphic.setGeometry(pt);
							graphic.setInfoTemplate(xy_infoTemplate);
							map.centerAndZoom(pt, 18);
							window.base.removeCursor();
							/**
							 * minimize popup
							 */
							window.depUtlityController.minimizePopup();
						} catch (e) {
							$u.notify("error", "Error",
									"Something went Wrong");
						}
					}
		});
		
		// clear xy location event with default extent
		$('#xyLocationClr').click(function(){
			map.graphics.clear();
			map.setExtent(initialExtent);
			
			if (mapClickEvtHandler != undefined) {
				mapClickEvtHandler.remove();
				map.setMapCursor("default");
			}
			map_info_tool = false;
			$("#toggle_map_info").trigger("click");
		});
		

// From To Location form
		$('form[id="form_direction"]')
		.validate(
				{
					rules : {
						from_loc : {
							required : true,
						},
						to_loc : {
							required : true,
						}, 
					},
					messages : {
						from_loc : {
							required : "Please Select Source Location",
						},
						to_loc : {
							required : "Please Select Destination Location",
						}
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							$("#total_distance").text("");
							window.base.removeDirectionGraphics();
							
							let source_latlong = $("#from_loc").val();
							let destination_latlong = $("#to_loc").val();
							
							if(source_latlong == destination_latlong){
								 $u.notify("info", "Notification","Source location and destination location can not be same");
								return;
							}
							
							let s0 = source_latlong.split(",");
							let s2 = destination_latlong.split(",");
							
							let n_y1 = s0[0];
							let n_x1 = s0[1];
							
							let y = Number(n_y1);
							let x = Number(n_x1);
							
							let n_y2 = s2[0];
							let n_x2 = s2[1];
							
							
							let y1 = Number(n_y2);
							let x1 = Number(n_x2);
							
							let source_p = [x,y];
							let dest_p = [x1,y1];
							window.base.getDirection(source_p,dest_p);
						} catch (e) {
							 $(".loader").fadeOut();
							 window.base.removeDirectionGraphics();
							 $u.notify("error", "Error","Something Happend Wrong");
						}
					}
				});
		
		$('form[id="form_direction_by_name"]')
		.validate(
				{
					rules : {
						from_loc_name : {
							required : true,
						},
						to_loc_name : {
							required : true,
						}, 
					},
					messages : {
						from_loc_name : {
							required : "Please Select Source Location",
						},
						to_loc_name : {
							required : "Please Select Destination Location",
						}
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							$("#total_distance").text("");
							window.base.removeDirectionGraphics();
						
								let source_latlong_name = $("#from_loc_name_input").val();
								let destination_latlong_name = $("#to_loc_name_input").val();
								
								if(source_latlong_name == "" ||  destination_latlong_name == ""){
									$u.notify("info", "Notification","please select source and destination location both");
									return;
								}
								
								if(source_latlong_name == destination_latlong_name){
									$u.notify("info", "Notification","Source location and destination location can not be same");
									return;
								}
								
								if(source_latlong_by_name == "" && destination_latlong_by_name != "") {
									$u.notify("info", "Notification","Coordinate not found for entered source address");
									return;
								}else if(source_latlong_by_name != "" && destination_latlong_by_name == ""){
									$u.notify("info", "Notification","Coordinate not found for entered destination address");
									return;
								}else{
									
									let n_x1 = source_latlong_by_name.x;
									let n_y1 = source_latlong_by_name.y;
									
									let n_x2 = destination_latlong_by_name.x;
									let n_y2 = destination_latlong_by_name.y;
									
									let y = Number(n_y1);
									let x = Number(n_x1);
									
									let y1 = Number(n_y2);
									let x1 = Number(n_x2);
									
									let source_p = [x,y];
									let dest_p = [x1,y1];
									window.base.getDirection(source_p,dest_p);
								}
							
						} catch (e) {
							 $(".loader").fadeOut();
							 $("#total_distance").text("");
							 window.base.removeDirectionGraphics();
							 $u.notify("error", "Error","Something Happend Wrong");
							 
						}
					}
				});
		
// sourceGeocoder.on("select", geocoderFromLocation);
// destGeocoder.on("select", geocoderToLocation);
// localityThana.on("select", geocoderThanaLocation);
		
		function geocoderFromLocation(evt) {
			source_latlong_by_name = "";
			var point = evt.result.feature.geometry;
			let mp = webMercatorUtils.webMercatorToGeographic(point);
			window.base.checkGeocoderIsWithinBoundary(mp,"From");
		};
		
		function geocoderToLocation(evt) {
			destination_latlong_by_name = "";
			var point = evt.result.feature.geometry;
			let mp = webMercatorUtils.webMercatorToGeographic(point);
			window.base.checkGeocoderIsWithinBoundary(mp,"To");
		};
		
		function geocoderThanaLocation(evt){
			thana_locality_name = "";
			var point = evt.result.feature.geometry;
			let mp = webMercatorUtils.webMercatorToGeographic(point);
			window.base.checkGeocoderIsWithinBoundary(mp,"Thana Locality");
		}

		/**
		 * clear direction
		 */
		$('#locationClr').click(function(){
			if(gLayer){
				map.removeLayer(gLayer);
				map.graphics.clear();
				map.setExtent(initialExtent);
				map.setMapCursor("default");
				window.depUtlityController.removeError('form_direction');
				window.base.removeDirectionGraphics();
				if(dirgdLayer){
					map.removeLayer(dirgdLayer);
					let graphics = dirgdLayer.graphics;
					for(let i in graphics){
						let g = graphics[i];
						dirgdLayer.graphics.pop();
					}
				}
				
				if(dirgsLayer){
					map.removeLayer(dirgsLayer);
					let graphics = dirgsLayer.graphics;
					for(let i in graphics){
						let g = graphics[i];
						dirgsLayer.graphics.pop();
					}
				}
			}
		});
		
		$('#locationClrByName').click(function(){
			if(gLayer){
				map.removeLayer(gLayer);
				map.graphics.clear();
				map.setExtent(initialExtent);
				map.setMapCursor("default");
				window.base.removeDirectionGraphics();
				
				if(dirgdLayer){
					map.removeLayer(dirgdLayer);
					let graphics = dirgdLayer.graphics;
					for(let i in graphics){
						let g = graphics[i];
						dirgdLayer.graphics.pop();
					}
				}
				
				if(dirgsLayer){
					map.removeLayer(dirgsLayer);
					let graphics = dirgsLayer.graphics;
					for(let i in graphics){
						let g = graphics[i];
						dirgsLayer.graphics.pop();
					}
				}
				
			}
		});
		 
		// know your property form
//		$('form[id="form_kyp"]')
//		.validate(
//				{
//					rules : {
//						/*
//						 * kyp1_ward : { dropDownValidation : true, required :
//						 * true },
//						 */ 
//					},
//					messages : {
//						/*
//						 * kyp1_ward : { dropDownValidation : "Please Select
//						 * Ward", required : "Please Select Ward" }
//						 */
//					},
//					submitHandler : function(form, e) {
//						e.preventDefault();
//						try {
//							kypResultArray = [];
//							let query = window.base.createQueryByKYP();
//							
//							if(query == undefined){
//								return;
//							}
//							
//					        $(".loader").fadeIn();
//					         queryTask.execute(query,function(result){
//					        	 map.graphics.clear();
//					        	 map.removeLayer(resultedFeaturesLayer);
//
//					        	 if(result.features.length == 0 ){
//					        		 $u.notify("info", "Notification","No result found");
//					        		 $(".loader").fadeOut();
//						        	 return;
//					        	 }
//					        	 $('#kyp_ul_data a[href="#kyp_final_result"]').tab('show');
//					        	 window.base.bindListOfFeatures(result);
//					        	 $(".loader").fadeOut();
//					         },function(error){
//					        	   console.log(error);
//					        	   $(".loader").fadeOut();
//					         });
//					        	
//					        
//						} catch (e) {
//							 $(".loader").fadeOut();
//							 $u.notify("error", "Error","Something Happend Wrong");
//						}
//					}
//				});
		
		
		$('form[id="form_kyp"]')
		.validate(
				{
					rules : {
						/*
						 * kyp1_ward : { dropDownValidation : true, required :
						 * true },
						 */ 
					},
					messages : {
						/*
						 * kyp1_ward : { dropDownValidation : "Please Select
						 * Ward", required : "Please Select Ward" }
						 */
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							let locality_name = $('#kyl_locality').val();
		                    let ward_no1 = $("#kyp1_ward").val();
		                    let plot_no1 = $("#kyl_plot").val();

//		                    if ((locality_name != "") && (ward_no1 == "") && (plot_no1 == "")) {
//		                        $u.notify("info", "Notification", "Please select value");
//		                        return;
//		                    }

		                    var form_data = {
		                    		locality: locality_name
		                    };

		                    $.ajax({
		                        method: 'POST',
		                        url: window.iscdl.appData.baseURL + "citizen/getknowyourpropertydata",
		                        data: JSON.stringify(form_data),
		                        contentType: 'application/json',
		                        async: false,

		                        success: function (response) {

		                        	var result = JSON.parse(response);
		                        	
		                        	if(result.features.length > 0 ){
		                     
		                        	
		                            const geoJSONFormat = new ol.format.GeoJSON();
		                            var vectorSource = new ol.source.Vector({
		                                features: geoJSONFormat.readFeatures(result, {
		                                    featureProjection: 'EPSG:4326',
		                                }),
		                                format: geoJSONFormat,
		                            });


		                            vectorLayer = new ol.layer.Vector({
		                                source: vectorSource
		                               
		                            });

		                            vectorLayer.getSource().on('addfeature', function () {
		                                map.setExtent(vectorLayer.getSource().getExtent());
		                            });


		                            const extent = vectorSource.getExtent();

		                            map.getView().fit(extent);

		                            //map1_layer.addLayer(layer_test1);
		                            map.addLayer(vectorLayer);
		                            basic_query_layer_arr.push(vectorLayer);
		                            //window.depUtlityController.minimizePopup();

		                            console.log(result);
		                        	}
		                        	else{
		                        		$u.notify("error", "Error",
				                        "No Data Found for selected fields");
		                        	}
		                        	
		                        		

		                        },
		                        error: function (e) {
		                            $(".loader").fadeOut();
		                            console.log(e);
		                        }
		                    });



		                } catch (e) {
		                    $(".loader").fadeOut();
		                    $u.notify("error", "Error",
		                        "Something went Wrong");
		                }
		            }
		        }); 
		
		// know your property by ward number
		$('form[id="form1_kyp"]')
		.validate(
				{
					rules : {
						kyp_ward : {
							dropDownValidation : true,
							required : true
						}, 
					},
					messages : {
						kyp_ward : {
							dropDownValidation : "Please Select Ward",
							required : "Please Select Ward"
						}
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							kypResultArray = [];
							let query = window.base.createQueryByWardKYP();
							
							if(query == undefined){
								return;
							}
							
					        $(".loader").fadeIn();
					         queryTask.execute(query,function(result){
					        	 map.graphics.clear();
					        	 map.removeLayer(resultedFeaturesLayer);

					        	 if(result.features.length == 0 ){
					        		 $u.notify("info", "Notification","No result found");
					        		 $(".loader").fadeOut();
						        	 return;
					        	 }

					        	 $('#kyp_ul_data a[href="#kyp_final_result"]').tab('show');
					        	 window.base.bindListOfFeaturesByWard(result);
					        	 $(".loader").fadeOut();
					         },function(error){
					        	   console.log(error);
					        	   $(".loader").fadeOut();
					         });
						} catch (e) {
							 $(".loader").fadeOut();
							 $u.notify("error", "Error","Something Happend Wrong");
						}
					}
				});
		
		
		// print form
		$('form[id="form_print"]')
		.validate(
				{
					rules : {
						title_name : {
							required : true,
						},
						file_name : {
							required : true,
						}
					},
					messages : {
						title_name : {
							required : "Please Enter Title Name",
						},
						file_name : {
							required : "Please Enter File Name",
						}
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						
						try {
							document.getElementById("print_submit").innerHTML = "Printing..."
				                document.getElementById("print_submit").disabled = true; 
								var canvas = document.getElementById("map");
								
								var today = new Date();
								var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
								var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
								var dateTime = date+' '+time;
								
								var exportObject = {
										'id' : 'map',
										'exportType' : $("#print_format_id").val(),
										'title' : $("#title_name").val(),
										'fileName' : $("#file_name").val(),
										'pageSetup' : $("#print_layout_id").val(),
										'canvas' : canvas,
										'orientation' : $("#print_orientation_id").val(),
										'includeLegend' : false,
										'tooltipText' : 'NA',
										'dateTime':dateTime
								};
								
								window.printModule.printMap(exportObject, map,"main",canvas);
								
								document.getElementById("print_submit").style.display = 'none';
			                    document.getElementById("printResult").style.display = 'block';
			                    document.getElementById("print_submit").innerHTML = "Print";
		                        document.getElementById("print_submit").style.display = 'block';
		                        document.getElementById("printResult").style.display = 'none';
		                        document.getElementById("print_submit").disabled = false;
			                    document.getElementById("print_submit").innerHTML = "Print";
			                    $('#form_print').trigger('reset');
			                    
			                    
								/*
				                var printObj = createPrintTask(document.getElementById("title_name").value);
				                var printTask = printObj.printTask;
				                printTask.execute(printObj.params, function (evt) {
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
				                }, function (evt) {
				                    document.getElementById("print_submit").disabled = false;
				                    document.getElementById("print_submit").innerHTML = "Print";
				                });
				                */
				                
				                
				                
						} catch (e) {
							 $(".loader").fadeOut();
							 document.getElementById("print_submit").disabled = false;
			                 document.getElementById("print_submit").innerHTML = "Print";
							 $u.notify("error", "Error","Something Happend Wrong");
						}
					}
				});
		
		// query-form
		
		$.validator.addMethod("dropDownValidation",
				function(value, element, params) {
					try {
						return value == "" ? false : true;
					} catch (e) {
						return false
					}
		}, 'Please select ward');
		
//		$('form[id="form_query"]')
//		.validate(
//				{
//					rules : {
//						poi_layer_select : {
//							required : true,
//							dropDownValidation : true
//						}
//					},
//					messages : {
//						poi_layer_select : {
//							required : "Please Select Layer",
//							dropDownValidation : "Please Select Layer",
//						},
//					},
//					submitHandler : function(form, e) {
//						e.preventDefault();
//						try {
//							/**
//							 * for showing result tab
//							 */
//							$("#attribute_query_rslt").html("");
//							let ward_id = $("#location_select").val();
//							let l_id = $("#poi_layer_select").val();
//							let locality = $("#poi_locality").val();
//							try {
//								
//								
//								// update checkbox status in layer panel
//								$('#accordionExample .layers-toggle-body input').each(function() {
//									let layer_id = $(this).data('layerid');
//									let child_id  = $(this).attr('id');
//									if(l_id == layer_id){
//										$("#"+child_id).prop('checked', true);
//									}
//								});
//								
//								// enable layer query wise
//								var visible = [];
//								$('#accordionExample .layers-toggle-body input:checked').each(function() {
//									let visible_id = $(this).data('layerid');
//									if(visible_id){
//										visible.push(visible_id);	
//								    }
//								});
//								
//								 if (visible.length === 0) {
//							            visible.push(-1);
//							     }
//								 symbology_layers.setVisibleLayers(visible);
//								
//								let queryByAttributeCriteria = window.base.createQueryByAttributeCriteria(l_id,ward_id,locality);
//								
//								if(queryByAttributeCriteria == undefined){
//									return;
//								}
//								
//						        $(".loader").fadeIn();
//						         
//						        queryTask.execute(queryByAttributeCriteria,function(result){
//						        	$(".loader").fadeOut();
//						        	map.graphics.clear();
//						        	map.removeLayer(resultedFeaturesLayer);
//						        	 if(result.features.length == 0 ){
//						        		 $u.notify("info", "Notification","No result found");
//							        	 return;
//						        	 }
//						        	 $('#query_result_tab a[href="#query_result"]').tab('show');
//						        	window.base.prepareAttributeQueryResult(result);
//						         },function(error){
//						        	   console.log(error);
//						        	   $(".loader").fadeOut();
//						         });
//							} catch (e) {
//								 $(".loader").fadeOut();
//								 $u.notify("error", "Error","Something Happend Wrong");
//							}
//							
//						} catch (e) {
//							 $(".loader").fadeOut();
//							 $u.notify("error", "Error","Something Happend Wrong");
//						}
//					}
//				});
		let location_mark = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: 'images/icons/svgviewer-output.svg',
            })
        });
		
		$('form[id="form_query"]')
		.validate(
				{
					rules : {
						poi_layer_select : {
							required : true,
							dropDownValidation : true
						}
					},
					messages : {
						poi_layer_select : {
							required : "Please Select Layer",
							dropDownValidation : "Please Select Layer",
						},
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							/**
							 * for showing result tab
							 */
							$("#attribute_query_rslt").html("");
							let ward_id = $("#location_select").val();
							let l_id = $("#poi_layer_select").val();
							let locality = $("#poi_locality").val();
							try {
								
								var form_data = {
										tableName: l_id,
										wardId: ward_id,
										locality: locality
								}
								
								
								$.ajax({
			                        method: 'POST',
			                        url: window.iscdl.appData.baseURL + "citizen/getformdata",
			                        data: JSON.stringify(form_data),
			                        contentType: 'application/json',
			                        async: false,

			                        success: function (response) {

			                        	var result = JSON.parse(response);
			                        	
			                        	if(result.features.length > 0 ){
			                     
			                        	
			                            const geoJSONFormat = new ol.format.GeoJSON();
			                            var vectorSource = new ol.source.Vector({
			                                features: geoJSONFormat.readFeatures(result, {
			                                    featureProjection: 'EPSG:4326',
			                                }),
			                                format: geoJSONFormat,
			                            });


			                            vectorLayer = new ol.layer.Vector({
			                                source: vectorSource,
			                                style: location_mark,
			                            });

			                            vectorLayer.getSource().on('addfeature', function () {
			                                map.setExtent(vectorLayer.getSource().getExtent());
			                            });


			                            const extent = vectorSource.getExtent();

			                            map.getView().fit(extent);

			                            //map1_layer.addLayer(layer_test1);
			                            map.addLayer(vectorLayer);
			                            basic_query_layer_arr.push(vectorLayer);
			                            //window.depUtlityController.minimizePopup();

			                            console.log(result);
			                        	}
			                        	else{
			                        		$u.notify("error", "Error",
					                        "No Data Found for selected fields");
			                        	}
			                        	
			                        		

			                        },
			                        error: function (e) {
			                            $(".loader").fadeOut();
			                            console.log(e);
			                        }
			                    });
								
								
																
								
							} catch (e) {
								 $(".loader").fadeOut();
								 $u.notify("error", "Error","Something Happend Wrong");
							}
							
						} catch (e) {
							 $(".loader").fadeOut();
							 $u.notify("error", "Error","Something Happend Wrong");
						}
					}
				});
		
		/**
		 * FORM END
		 */
		
		// announcement click event
		$('#announcement_list').click(function() {
			$('#announce_block').html("");
			window.base.getAnnouncementList();
		});
		
		$('#kyp_byward_clear_event').click(function(){
			$("#know_your_property_rslt").html("");
			map.graphics.clear();
			map.setExtent(initialExtent);
		});
		
		var bookmarkList = [];
		
		/**
		 * COMMON FUNCTIONS
		 */
			let base = {
					fillSelectedDirectionLatitude : function(type){
						map.setMapCursor("crosshair");
						if(map_selection){
							map_selection.remove();
							// map_hover.remove();
						}
						
						if(dirLatLong){
							dirLatLong.remove();
						}
						
						dirLatLong = map.on("click", function(evt) {
							if(type == "Source"){
								let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
								window.base.checkSelectedDirectionLocationWithinBoundry(mp.x,mp.y,'from_loc','from_loc-error',type);
								dirLatLong.remove();
							}else if(type == "Destination"){
								let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
								window.base.checkSelectedDirectionLocationWithinBoundry(mp.x,mp.y,'to_loc','to_loc-error',type);
								dirLatLong.remove();
							}
						});
					},
					fillCurrentDirectionLatLong : function(type){
						window.base.checkCurrentDirectionLocationWithinBoundry(_current_long,_current_lat,type);
					},
					fillSelectedFeedBackLatLong : function(){
						// fill feedback selected latlong
							map.setMapCursor("crosshair");
							
							if(map_selection){
								map_selection.remove();
								// map_hover.remove();
							}
							mapClickEvtHandler = map.on("click", function(evt) {
								let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
								window.base.checkSelectedlocationWithinBoundry(mp.x,mp.y,'fs_latitude',
										'fs_latitude-error','fs_longitude','fs_longitude-error');
							});
					},
					// fill feedback current latlong
					fillCurrentFeedbackLatlong : function (){
						window.base.checkCurrentlocationWithinBoundry(_current_long,_current_lat,'fs_latitude',
								'fs_latitude-error','fs_longitude','fs_longitude-error');
					},
					fillAddDataSelectedLatLong : function (){
						map.setMapCursor("crosshair");
						if(map_selection){
							map_selection.remove();
							// map_hover.remove();
						}
						mapClickEvtHandler = map.on("click", function(evt) {
							let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
							window.base.checkSelectedlocationWithinBoundry(mp.x,mp.y,'ad_latitude',
									'ad_latitude-error','ad_longitude','ad_longitude-error');
						});
					},
					fillAddDataCurrentLatLong : function (){
						window.base.checkCurrentlocationWithinBoundry(_current_long,_current_lat,'ad_latitude',
								'ad_latitude-error','ad_longitude','ad_longitude-error');
					},
					fillEventSelectedLatLong : function (){
						map.setMapCursor("crosshair");
						if(map_selection){
							map_selection.remove();
							// map_hover.remove();
						}
						
						mapClickEvtHandler = map.on("click", function(evt) {
							let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
							window.base.checkSelectedlocationWithinBoundry(mp.x,mp.y,'event_latitude',
									'event_latitude-error','event_longitude','event_longitude-error');
						});
					},
					fillEventCurrentLatLong :function (){
						window.base.removeCursor();
						
						window.base.checkCurrentlocationWithinBoundry(_current_long,_current_lat,'event_latitude',
								'event_latitude-error','event_longitude','event_longitude-error');
					},
					fillThanaSelectedLatLong : function (){
						
						map.on('click', (event) => {	
					    	for(var i=0;i<map_point_click.length;i++){
						    	map.removeLayer(map_point_click[i]);
						    }

							const tran_coords = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
		                    var latitude = tran_coords[1];
		                    var longitude = tran_coords[0];
		                    $("#thana_xy_latitude").val(tran_coords[1]);
		                    $("#thana_xy_longitude").val(tran_coords[0]);
		                    
		                    let pinStyle = new ol.style.Style({
	                            image: new ol.style.Icon({
	                                anchor: [0.5, 1],
	                                src: 'https://apagri.infinium.management/temp/point_icon.png',
	                            })
	                        });
		                    
		                    let pointFeatures = [];
		                    let pointSource = new ol.source.Vector({
	                            features: pointFeatures
	                        });
		                    let pointLayer = new ol.layer.Vector({
	                            source: pointSource
	                        });
		                    let newPoint = new ol.Feature({
		                    	geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude]))
		                    });
		                    pointSource.addFeature(newPoint);
		                    map.addLayer(pointLayer);
		                    map_point_click.push(pointLayer);
		                    newPoint.setStyle(pinStyle);
		                    
						})
						
						/*
						map.setMapCursor("crosshair");
						if(map_selection){
							map_selection.remove();
							// map_hover.remove();
						}
						mapClickEvtHandler = map.on("click", function(evt) {
							let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
							window.base.checkSelectedlocationWithinBoundry(mp.x,mp.y,'thana_xy_latitude',
									'thana_xy_latitude-error','thana_xy_longitude','thana_xy_longitude-error');
						});*/
						
					},
					fillThanaCurrentLatLong : function (){
						
						map.on('click', (event) => {
							const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
					            return feature;
					        });
							if (feature) {
								const coordinates = feature.getGeometry().getCoordinates();
								const tran_coords = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
			                    var latitude = tran_coords[1];
			                    var longitude = tran_coords[0];
			                    $("#thana_xy_latitude").val(tran_coords[1]);
			                    $("#thana_xy_longitude").val(tran_coords[0]);
							}
						})
						
						/*
						window.base.removeCursor();
						window.base.checkCurrentlocationWithinBoundry(_current_long,_current_lat,'thana_xy_latitude',
								'thana_xy_latitude-error','thana_xy_longitude','thana_xy_longitude-error');
						*/
					},
					removeLatLongError : function (ipId,lblId){
						$('#'+ipId).removeClass('error');
						$('#'+lblId).remove();
					},
					clearCursor : function(){
						// clear feedback cursor
						$('#clear_feedback').click(function(){
							window.base.removeCursor();
						});
						
						// clear event cursor
						$('#clear_event').click(function(){
							window.base.removeCursor();
						});

						// clear add-data cursor
						$('#clear_add_data').click(function(){
							window.base.removeCursor();
						});	
					},
					removeCursor : function () {
						if (mapClickEvtHandler != undefined) {
							mapClickEvtHandler.remove();
							map.setMapCursor("default");
						}
						
						if(nearmeEvtHandler){
							nearmeEvtHandler.remove();
						}
						
					},
					zoomToFeature : function (data){
						window.depUtlityController.minimizePopup();
						
							let minx = $(data).data("xmin");
							let miny = $(data).data("ymin");
							let maxx = $(data).data("xmax");
							let maxy = $(data).data("ymax");
							let srs = $(data).data("srs");
							let object_id = $(data).data("objectid");
							
							var found_result = $.grep(kypResultArray, function(v) {
							    return v.object_id == object_id;
							});
							
							if(found_result && found_result.length > 0){
								var outSpatialReference = new SpatialReference({
				 	        		 wkid: 4326
				 	        	});
								
								
								let rslt = found_result[0];
								let geometry = rslt.geom;
								let info_template_content = rslt.info_template;
								
								projection.load().then(function() {
									map.graphics.clear();
					 	        	let cgeometry = projection.project(geometry, outSpatialReference);
					 	        	var polygon = {"geometry":cgeometry,"symbol":
					 	        	{"color":[255,255,255,64],"outline":{"color":[0,255,255],
					 	        	    "width":2,"type":"esriSLS","style":"esriSLSSolid"},
					 	        	    "type":"esriSFS","style":"esriSFSSolid"}};
					 	        	
					 	        	let polygonGraphic = new esri.Graphic(polygon);
					 	        	let kyp_infoTemplate = new InfoTemplate("Property Information",info_template_content);
					 	        	polygonGraphic.setInfoTemplate(kyp_infoTemplate);
					 	        	map.graphics.add(polygonGraphic);
					 	        	resultedFeaturesLayer.add(polygonGraphic);
				 	        	});
							}
							
							var geometryService = new esri.tasks.GeometryService(window.prefix_layer_url + "Utilities/Geometry/GeometryServer");
				            
							let PrjParamsmin = window.base.convertCoordinateMeterToDegree(minx,miny);
							let PrjParamsmax = window.base.convertCoordinateMeterToDegree(maxx,maxy);
							
							var minx1, miny1, maxx1, maxy1 = "";
							
				            geometryService.project(PrjParamsmin, function (outputpoint) {
				              miny1 = outputpoint[0].y;
				              minx1 = outputpoint[0].x;
				              
				              if(maxy1 != "" && maxx1 != "" && miny1!= "" && minx1 != "" ){
				            	  let extent = new Extent(minx1, miny1, maxx1, maxy1,
											new SpatialReference({
												wkid : 4326
									}));
									if(extent != undefined || extent != null){
										map.setExtent(extent);
										
										setTimeout(() => {
											map.setZoom(20);
											// window.depUtlityController.minimizePopup();
										},1000);
									}
				              }
				            });
				            
				            geometryService.project(PrjParamsmax, function (outputpoint) {
				            	  maxy1 = outputpoint[0].y;
					              maxx1 = outputpoint[0].x;
					              
					              if(maxy1 != "" && maxx1 != "" && miny1!= "" && minx1 != "" ){
					            	  let extent = new Extent(minx1, miny1, maxx1, maxy1,
												new SpatialReference({
													wkid : 4326
										}));
										if(extent != undefined || extent != null){
											map.setExtent(extent);
											setTimeout(() => {
												map.setZoom(20);
												// window.depUtlityController.minimizePopup();
											}, 1000);
										}
					              }
					        });
					},
					zoomToFeatureByPropertyWard : function (data){
						window.depUtlityController.minimizePopup();
						
						let minx = $(data).data("xmin");
						let miny = $(data).data("ymin");
						let maxx = $(data).data("xmax");
						let maxy = $(data).data("ymax");
						let srs = $(data).data("srs");
						let object_id = $(data).data("objectid");
						
						var found_result = $.grep(kypResultArray, function(v) {
						    return v.object_id == object_id;
						});
						
						if(found_result && found_result.length > 0){
							var outSpatialReference = new SpatialReference({
			 	        		 wkid: 4326
			 	        	});
							
							
							let rslt = found_result[0];
							let geometry = rslt.geom;
							let info_template_content = rslt.info_template;
							
							projection.load().then(function() {
								map.graphics.clear();
				 	        	let cgeometry = projection.project(geometry, outSpatialReference);
				 	        	var polygon = {"geometry":cgeometry,"symbol":
				 	        	{"color":[255,255,255,64],"outline":{"color":[0,255,255],
				 	        	    "width":2,"type":"esriSLS","style":"esriSLSSolid"},
				 	        	    "type":"esriSFS","style":"esriSFSSolid"}};
				 	        	
				 	        	let polygonGraphic = new esri.Graphic(polygon);
				 	        	let kyp_infoTemplate = new InfoTemplate("Property Information",info_template_content);
				 	        	polygonGraphic.setInfoTemplate(kyp_infoTemplate);
				 	        	map.graphics.add(polygonGraphic);
				 	        	resultedFeaturesLayer.add(polygonGraphic);
				 	        	
			 	        	});
						}
						
						var geometryService = new esri.tasks.GeometryService( window.prefix_layer_url + "Utilities/Geometry/GeometryServer");
			            
						let PrjParamsmin = window.base.convertCoordinateMeterToDegree(minx,miny);
						let PrjParamsmax = window.base.convertCoordinateMeterToDegree(maxx,maxy);
						
						var minx1, miny1, maxx1, maxy1 = "";
						
			            geometryService.project(PrjParamsmin, function (outputpoint) {
			              miny1 = outputpoint[0].y;
			              minx1 = outputpoint[0].x;
			              
			              if(maxy1 != "" && maxx1 != "" && miny1!= "" && minx1 != "" ){
			            	  let extent = new Extent(minx1, miny1, maxx1, maxy1,
										new SpatialReference({
											wkid : 4326
								}));
								if(extent != undefined || extent != null){
									map.setExtent(extent);
									setTimeout(() => {
										map.setZoom(20);
										// window.depUtlityController.minimizePopup();
									}, 1000);
								}
			              }
			            });
			            
			            geometryService.project(PrjParamsmax, function (outputpoint) {
			            	  maxy1 = outputpoint[0].y;
				              maxx1 = outputpoint[0].x;
				              
				              if(maxy1 != "" && maxx1 != "" && miny1!= "" && minx1 != "" ){
				            	  let extent = new Extent(minx1, miny1, maxx1, maxy1,
											new SpatialReference({
												wkid : 4326
									}));
									
									
									if(extent != undefined || extent != null){
										map.setExtent(extent);
										// window.depUtlityController.minimizePopup();
										setTimeout(() => {
											map.setZoom(20);
											// window.depUtlityController.minimizePopup();
										}, 1000);
									}
				              }
				        });
				},createQueryByKYP : function createQueryByKYP(){

					$('#know_your_property_rslt').html("");
						
						let ward_id = $('#kyp1_ward').val().toUpperCase();
						
						if(ward_id.length == 1){
							ward_id = "00" + ward_id;
						}else if(ward_id.length == 2){
							ward_id = "0" + ward_id;
						}
						
						let plot_no = $('#kyl_plot').val().toUpperCase();
						let locality_address = $('#kyl_locality').val();
						// let kyl_building_id =
						// $('#kyl_building_id').val().toUpperCase();
						
						if(ward_id == "" && plot_no == "" && locality_address == ""){
							$u.notify("info", "Notification","Please enter details of ward OR plot number OR locality/area name");
							return;
						}
						
						/*
						 * if(ward_id == "" && plot_no == "" && locality_address ==
						 * ""){ $u.notify("info", "Notification","Please enter
						 * value in any of one opration"); return; }
						 */
						queryTask = new QueryTask(window.PROPERTY_TAX_LAYER);
				         let query = new Query();
				         query.returnGeometry = true;
				         query.outFields = ["*"];
				        query.where = "";
				        
				        if(ward_id != ""){
				        	
				        	if(query.where != ""){
				        		query.where += " AND ";
				        	}
				        	
				        	query.where += "ward_no = '" + ward_id + "'";
				        }
				        
				        if(plot_no != ""){
				        	
				        	if(query.where != ""){
				        		query.where += " AND ";
				        	}
				        	query.where += "plot_id = '" + plot_no + "'";
				        }
				        
				        if(locality_address != ""){
				        	if(query.where != ""){
				        		query.where += " AND ";
				        	}
				        	query.where += "locality LIKE '%" + locality_address + "%' ";
				        }
				        return query;
					},																								
					bindListOfFeatures : function(result){
						
						kypResultArray = [];
						
						$("#know_your_property_rslt").append("<h3 id='total_features_length'>Number of property found : " + 1 + "/" 
								+ result.features.length+"</h3>" + 
								"<div class='np-main w-100 p-0'>" +
								"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
								"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
								"</div>");
						
						
		 	        	let total_feature = result.features.length;
						
						 for (var i = 0; i < result.features.length; i++) {
				 	     
							 let feature = result.features[i];
								let geometry = feature.geometry;
				 	        	let graphic = feature;
				 	        	
// let info_template_content = "";
				 	        	let info_template_content = '<table class="table table-bordered w-100 map-detail-custom">' +
								  '<tbody>';
				 	        	
				        	  	var columns = feature.attributes;
				 				let length = Object.keys(columns).length;
				 				 
				 				 for(let a=0;a<length;a++){
				 					let key  = Object.keys(columns)[a];
				 					
				 					if(key == "objectid" || key == "objectid_1"){
										continue;
									}
				 					
				 					let attr = feature.attributes[key];
				 					
				 					if(attr == null || attr == "" || attr == "null"){
				 						attr = "";
				 					}
				 					
				 					let columnName = window.base.getFeatureColumnName(key);				 					
				 					
// info_template_content += "<b>" +columnName + ":" + "</b>" +attr+ "<br/>";
				 					info_template_content += '<tr><td><b>'+columnName+'</b></td><td>'+attr+'</td></tr>';
				 				} 
				 				 
				 				info_template_content += info_template_content + '</tbody></table>';
				 	        	
				 				let object_id = feature.attributes.objectid;
				 	        	let ward_no = feature.attributes.ward_no;
				 	        	let zone_no = feature.attributes.zone_no;
				 	        	let plot_id = feature.attributes.plot_id;
				 	        	let building_id = feature.attributes.build_id;
				 	        	let landmark = feature.attributes.landmark;
				 	        	let locality = feature.attributes.locality;
				 	        	let building_name = feature.attributes.build_name;
				 	        	let pincode = feature.attributes.pin_code;
				 	        	let asset_status = feature.attributes.asses_sts;
				 	        	
				 	        	if(building_name == "" || building_name == "undefined" || building_name == undefined){
				 	        		building_name = "";
				 	        	}
				 	        	
				 	        	if(building_id == "" || building_id == "undefined" || building_id == undefined){
				 	        		building_id = "";
				 	        	}
				 	        	
				 	        	if(pincode == "" || pincode == "undefined" || pincode == undefined){
				 	        		pincode = "";
				 	        	}
				 	        	
				 	        	kypResultArray.push({'object_id' : object_id,'geom' : geometry,'info_template' : info_template_content});
						 
				 	        	let ext = geometry.getExtent();
					 	            
					 	            let minx = ext.xmin;
					 	            let maxx = ext.xmax;
					 	            let miny = ext.ymin;
					 	            let maxy = ext.ymax;
					 	            let srs = ext.spatialReference.wkid;
					 	            	
					 	            let html = "<div class='query-result-main kyp-list query-resultDiv-seperator query-kyp-tab'>" +
					 	           		
					 	           				"<div class='result-task'><label>Plot Id: </label><p>"+plot_id+"</p></div>" +
					 	           				"<div class='result-task'><label>Locality : </label><p>"+locality+"</p></div>" +
					 	           				"<div class='result-task'><label>Landmark : </label><p>"+landmark+"</p></div>" +
					 	           				"<div class='result-task'><label>Ward :</label><p>"+ward_no+"</p></div>" +
				 	           					"<div class='result-task'><label>Zone :</label><p>"+zone_no+"</p></div>" +
					 	           				"<div class='result-task'><label>Asset Status: </label><p>"+asset_status+"</p></div>" +
					 	           				"<div class='result-task'><label>Pay Your Tax : </label><p><a target='_blank' " +
					 	           						"href='https://www.mpenagarpalika.gov.in:8005/sap/bc/webdynpro/sap/zpt_qpay" +
					 	           						"?sap-client=500&sap-language=EN#'>Pay Your Tax</a></p></div>" +
					 	           				"<div class='result-task'><label>Pay Electricity Bill : </label><p><a target='_blank' " +
				 	           						"href='https://mpwzservices.mpwin.co.in/mpeb_english/home'>Pay Electricity Bill</a>" +
				 	           						"</p></div>" +
					 	           				"<div class='result-task'><label>More Details : </label><p><a target='_blank' " +
					 	           				"		href='https://mpbhulekh.gov.in/mpbhulekh.do'>Get More Details</a></p></div>" +
					 	           				
					 	           			"<div class='result-task'><label>Building Permission ABPAS 2: </label><p><a target='_blank' " +
				 	           				"		href='http://164.100.196.30/Content/html/abpas6.4/Homepage.html#/login'>Building Permission</a></p></div>" +
					 	           				
				 	           				"<div class='result-task'><i id='property_"+i+"' class='fa fa-search query-zoom-feature' aria-hidden='true' " +
					 	           				"title='Zoom To Feature' " +
					 	           				"data-xmin='"+minx+"' data-xmax='"+maxx+"' data-ymin='"+miny+"' data-ymax='"+maxy+"' " +
					 	           						"data-objectid = '"+object_id +"' "  +
					 	           						"data-srs='"+srs+"' " +
					 	           						"onclick='window.base.zoomToFeature(this)'></i></div>" + 
					 	           				"</div>";
					 	           $('#know_your_property_rslt').append(html);
						 }
						 	if(total_feature == 1){
								$(".query-result-main").addClass("single-record");
							}else{
								$(".query-result-main").removeClass("single-record");
							}	
						 
						 window.base.previousNextFeature(total_feature,'.query-result .query-kyp-tab','property','property_');
				},
				createQueryByWardKYP : function createQueryByWardKYP(){
					$('#know_your_property_rslt').html("");
					
					let ward_id = $('#kyp_ward').val();
					
					if(ward_id.length == 1){
						ward_id = "00" + ward_id;
					}else if(ward_id.length == 2){
						ward_id = "0" + ward_id;
					}
					
					if(ward_id == "" ){
						$u.notify("info", "Notification","Please select ward");
						return;
					}
					queryTask = new QueryTask(window.PROPERTY_TAX_LAYER);
			         let query = new Query();
			         query.returnGeometry = true;
			         query.outFields = ["*"];
			        query.where = "";
			        
			        if(ward_id != ""){
			        	query.where += "ward_no = '" + ward_id + "'";
			        }
			        return query;
				},
				bindListOfFeaturesByWard : function(result){
					
					kypResultArray = [];
					
					$("#know_your_property_rslt").append("<h3 id='total_features_length'>Number of property found : "
							+ 1 + "/" +result.features.length+"</h3>" + 
							"<div class='np-main w-100 p-0'>" +
							"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
							"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
							"</div>");
	 	        	
	 	        	let total_feature = result.features.length;
					
					 for (var i = 0; i < result.features.length; i++) {
			 	     
						 let feature = result.features[i];
						 
						 // let info_template_content = "";
						 let info_template_content = '<table class="table table-bordered w-100 map-detail-custom">' +
						  '<tbody>';
			        	  	var columns = feature.attributes;
			 				let length = Object.keys(columns).length;
			 				 
			 				 for(let a=0;a<length;a++){
			 					let key  = Object.keys(columns)[a];
			 					
			 					if(key == "objectid" || key == "objectid_1"){
									continue;
								}
			 					
			 					let attr = feature.attributes[key];
			 					
			 					if(attr == null || attr == "" || attr == "null"){
			 						attr = "";
			 					}
			 					let columnName = window.base.getFeatureColumnName(key);	
			 					
			 					// info_template_content += "<b>" + columnName +
								// ":" + "</b>" +attr+ "<br/>";
			 					info_template_content += '<tr><td><b>'+columnName+'</b></td><td>'+attr+'</td></tr>';
			 				} 
			 				info_template_content += info_template_content + '</tbody></table>';
						 
							let geometry = feature.geometry;
			 	        	let graphic = feature;
			 	        	
			 	        	let object_id = feature.attributes.objectid;
			 	        	let ward_no = feature.attributes.ward_no;
			 	        	let zone_no = feature.attributes.zone_no;
			 	        	let plot_id = feature.attributes.plot_id;
			 	        	let building_id = feature.attributes.build_id;
			 	        	let landmark = feature.attributes.landmark;
			 	        	let locality = feature.attributes.locality;
			 	        	let building_name = feature.attributes.build_name;
			 	        	let pincode = feature.attributes.pin_code;
			 	        	let asset_status = feature.attributes.asses_stat;
			 	        	
			 	        	if(building_name == "" || building_name == "undefined" || building_name == undefined){
			 	        		building_name = "";
			 	        	}
			 	        	
			 	        	if(building_id == "" || building_id == "undefined" || building_id == undefined){
			 	        		building_id = "";
			 	        	}
			 	        	
			 	        	if(pincode == "" || pincode == "undefined" || pincode == undefined){
			 	        		pincode = "";
			 	        	}
					 
			 	        	kypResultArray.push({'object_id' : object_id,'geom' : geometry,'info_template' : info_template_content});
			 	        	
			 	        	let ext = geometry.getExtent();
				 	            
				 	            let minx = ext.xmin;
				 	            let maxx = ext.xmax;
				 	            let miny = ext.ymin;
				 	            let maxy = ext.ymax;
				 	            let srs = ext.spatialReference.wkid;
				 	            
 	            let html = "<div class='query-result-main kyp-list query-resultDiv-seperator by-ward-feature'>" +
 	           				"<div class='result-task'><label>Plot Id: </label><p id=''>"+plot_id+"</p></div>" +
 	           				"<div class='result-task'><label>Locality : </label><p id=''>"+locality+"</p></div>" +
 	           				"<div class='result-task'><label>Landmark : </label><p id=''>"+landmark+"</p></div>" +
 	           				"<div class='result-task'><label>Ward :</label><p id=''>"+ward_no+"</p></div>" +
 	           				"<div class='result-task'><label>Zone :</label><p id=''>"+zone_no+"</p></div>" +
 	           				"<div class='result-task'><label>Asset Status: </label><p id=''>"+asset_status+"</p></div>" +
 	           				"<div class='result-task'><label>Pay Your Tax : </label><p ><a target='_blank' " +
 	           							"href='https://www.mpenagarpalika.gov.in:8005/sap/bc/webdynpro/sap/zpt_qpay?" +
 	           							"sap-client=500&sap-language=EN#'>" +
 	           							"Pay Your Tax</a></p></div>" +
 	           				"<div class='result-task'><label>Pay Electricity Bill : </label><p><a target='_blank' " +
 	           						"href='https://mpwzservices.mpwin.co.in/mpeb_english/home'>Pay Electricity Bill</a></p></div>" +
 	           				"<div class='result-task'><label>More Details : </label><p><a target='_blank' " +
 	           				"			href='https://mpbhulekh.gov.in/mpbhulekh.do'>Get More Details</a></p></div>" +
 	           				
 	           			"<div class='result-task'><label>Building Permission ABPAS 2: </label><p><a target='_blank' " +
	           				"		href='http://164.100.196.30/Content/html/abpas6.4/Homepage.html#/login'>Building Permission</a></p></div>" +
 	           				
 	           				"<div class='result-task'><i id='ward_property_"+i+"' class='fa fa-search query-zoom-feature' aria-hidden='true' " +
 	           				"title='Zoom To Feature' " +
 	           				"data-xmin='"+minx+"' data-xmax='"+maxx+"' data-ymin='"+miny+"' data-ymax='"+maxy+"' " +
 	           						"data-objectid = '"+object_id +"' data-srs='"+srs+"' " +
 	           							"onclick='window.base.zoomToFeatureByPropertyWard(this)'></i></div>" +				 	           				
 	           				"</div>";
 	           
 	           $('#know_your_property_rslt').append(html);
				 	          
					 }
					 
					 if(total_feature == 1){
							$(".query-result-main").addClass("single-record");
						}else{
							$(".query-result-main").removeClass("single-record");
						}
					 
					 window.base.previousNextFeature(total_feature,'.query-result .by-ward-feature','property','ward_property_');
			},
				sharePortalLink : function(){
					$('#sharelinktxt').val("");

					let current_extent = map._getAvailExtent();
					let pmin = new Point([ current_extent.xmin,current_extent.ymin]);
					let pmax = new Point([ current_extent.xmax,current_extent.ymax]);
					let mpmin = webMercatorUtils.webMercatorToGeographic(pmin);
					let mpmax = webMercatorUtils.webMercatorToGeographic(pmax);

					localStorage.setItem("xmin", mpmin.x);
					localStorage.setItem("ymin", mpmin.y);
					localStorage.setItem("xmax", mpmax.x);
					localStorage.setItem("ymax", mpmax.y);
					localStorage.setItem("spatialReference",mpmin.spatialReference.wkid);

					let browserUrl = document.location.href;
					let finalurl = browserUrl;
					$('#sharelinktxt').val(finalurl);
				},
				getAnnouncementList : function(){
					let result;
					let announcementInfoObj = {};
					let postData = JSON.stringify(announcementInfoObj);

					$.ajax({
								method : 'POST',
								url : window.iscdl.appData.baseURL
										+ "citizen/announcement/getAnnouncementList",
								async : false,
								data : postData,
								contentType : 'application/json',
								success : function(result) {
									if (!$.isEmptyObject(result) && result != null) {
										try {
											result = JSON.parse(result);
											let str = "";
											if (result.responseCode == '200') {
												let response = result.data;
												let length = result.data.length;
												if (length > 0) {
													for ( let i in result.data) {
														let api_data = result.data[i];
														let html = "<div class='aut-content'><h6>"
																+ api_data.announcement_title
// + (api_data.is_new && api_data.is_new === true ?
// "<button class='btn-indore new-announcement'>New!</button>" : " ")
																+ "</h6>"
																
																+ "<span>" + api_data.announcement_datetime
																+ "</span><p>"	+ api_data.announcement_description + 
																		"<a data-latitude='"+api_data.latitude+"' " +
																				"data-longitude='"+api_data.longitude+"' " +
																		"data-title = '"+api_data.announcement_title+"'" +
																		"data-description = '"+api_data.announcement_description+"'" +
																		"class='announce_desc' " +
																		"onclick='window.base.zoomToAnnouncement(this)'>" +
																		"<i class='fa fa-search announcement-zoom' aria-hidden='true' " +
																		"title='Zoom To Announcement'></i></a>"
																+ "</p>" +
																"</div>";
														str += html;
													}

													$('#announce_block').append(str);
												}
											} else {
												$u.notify('error', 'Notification',
														response.responseMessage, '');
											}
										} catch (err) {
											// console.log(err);
										}
									} else {
										$u.notify('error', 'Notification',
												'Announcement data not available', '');
									}
								},
								error : function(e) {
									// console.log(e);
								}
							});
				},
				zoomToAnnouncement : function(data){
					let latitude = $(data).data("latitude");
					let longitude = $(data).data("longitude");
					
					
					if(latitude == null || longitude == null){
						$u.notify('info', 'Notification',
								'latitude and longitude is not available for selected announcement', '');
						return;
					}
					
					
					let title  = $(data).data("title");
					let description  = $(data).data("description");
					
					let announcement_point = new Point(longitude,latitude);
					
					//map.graphics.clear();
					//let graphic = new Graphic(announcement_point, markerSymbol);
					//map.graphics.add(graphic);
					
					let template_content = "";					
					let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
					  '<tbody>';
					table_content += '<tr><td><b>Title</b></td><td>'+title+'</td></tr>' + 
					'<tr><td><b>Description</b></td><td>'+description+'</td></tr>' + 
					'<tr><td><b>Latitude</b></td><td>'+latitude+'</td></tr>' + 
					'<tr><td><b>Longitude</b></td><td>'+longitude+'</td></tr>';
					
					template_content += table_content + '</tbody></table>';
					let announcement_infoTemplate = new InfoTemplate("Announcement",template_content);
					//graphic.setGeometry(announcement_point);
					//graphic.setInfoTemplate(announcement_infoTemplate);
					//map.centerAndZoom(announcement_point,18); 
					//map.infoWindow.setTitle(graphic.getTitle());
					//map.infoWindow.setContent(graphic.getContent());
					//map.infoWindow.show(announcement_point);
					window.depUtlityController.minimizePopup();
					
					let vectorSource = new ol.source.Vector({
						features: [new ol.Feature({
				            geometry: new ol.geom.Point(ol.proj.transform([parseFloat(longitude), parseFloat(latitude)], 'EPSG:4326', 'EPSG:3857')),
				        })]
				    });
					
					var vectorLayer = new ol.layer.Vector({
					    target: "points",
					    source: vectorSource,
					    style: new ol.style.Style({
					      image: new ol.style.Icon({
					        anchor: [0.5, 0.5],
					        anchorXUnits: "fraction",
					        anchorYUnits: "fraction",
					        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
					      })
					    })
					  });
						
					  map.getView().fit(vectorLayer.getSource().getExtent(), {
						  size: map.getSize(),
						  maxZoom: 15
					  });	
					  map.addLayer(vectorLayer);
					  
				},
				creatBookmarkView : function creatBookmarkView(){
					
						$('.bookmark-content').html("");
						$('.bookmark-content').html("<div class='bookmark-form'>" +
								"<div id='parent-dv'><input type='text' id='bookmark_name' value='' class='bookmarkdata-input' " +
								"placeholder='Add Bookmark'>" +
								"<button type='button' id='add-bookmark' class='inputsubmit-btn bookmark-submit'>" +
								"<img src='images/icons/Add_Image-71.svg'></button>" +
								"<div id='bookmark-data' class='bookmark-data'></div><div class='text-center pt-1'>" +
								"<button type='button' id='delete-bookmark' class='btn btn-indore'>Delete</button></div></div>" +
								"</div>");
				},
				getBookMarkList : function getBookMarkList(user_id){
					
					let view_type = window.depUtlityController.getViewType();
					
					let bookmarkObj = {
							"user_id":user_id,
							"type" : view_type
					}
					
					let postData = JSON.stringify(bookmarkObj);

					let token_val = localStorage.getItem('token');

					if (token_val == "" || token_val == undefined || token_val == null) {
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
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						success : function(result) {

							if (!$.isEmptyObject(result) && result != null) {
								try {
									result = JSON.parse(result);
									
									if (result.responseCode == '200') {
										let bookamarks = result.data;
										$('#bookmark-data').html("");
										
										for(let i in bookamarks){
											let id = bookamarks[i].id;
											let title = bookamarks[i].title;
											let xmax = bookamarks[i].xmax;
											let xmin = bookamarks[i].xmin;
											let ymax = bookamarks[i].ymax;
											let ymin = bookamarks[i].ymin; 
											let	wkid = bookamarks[i].wkid;
											
											window.base.prepareBookmarkListForLoginUser(id,title,xmax,xmin,ymax,ymin,wkid);
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
							// console.log(e);
						}
					});
					
					
				},
				setBookmarkInfo : function setBookmarkInfo(){
					let user_id = localStorage.getItem('user_data');
					let bookmark_name = $("#bookmark_name").val().trim();
					if(bookmark_name == undefined || bookmark_name == null || bookmark_name == ""){
						$u.notify('info', 'Notification',
								'Please enter bookmark title', '');
						return;
					}
					
					let current_extent = map.getView().calculateExtent(map.getSize());
					
					//let current_extent = map._getAvailExtent();
					let xmin = current_extent[0];
					let ymin = current_extent[1];
					let xmax = current_extent[2];
					let ymax = current_extent[3];
					let srs = 'EPSG:3857';
					
					if(user_id != undefined && user_id != null && user_id != ""){
						window.base.addBookmark(bookmark_name,user_id,xmin,ymin,xmax,ymax,srs);	
					}else{
						
						if(bookmarkList.includes(bookmark_name.trim())){
							$u.notify('info', 'Notification',
									'Bookmark with title '+ bookmark_name.trim() +' already exists.', '');
							return;
						}else{
							window.base.prepareBookmarkListForCitizenUser(bookmark_name,xmax,xmin,ymax,ymin,srs);
							bookmarkList.push(bookmark_name.trim());
						}
					}
					$("#bookmark_name").val("");
					
					
				},
				addBookmark : function addBookmark(bookmark_name,user_id,xmin,ymin,xmax,ymax,srs){
					let result;
					
					let view_type = window.depUtlityController.getViewType();
					
					let bookmarkObj = {
							"title":bookmark_name,
							"user_id":user_id,
							"xmax":xmax,
							"xmin":xmin,
							"ymax":ymax,
							"ymin":ymin,
							"wkid":srs,
							"type" : view_type
					}
					
					let postData = JSON.stringify(bookmarkObj);

					let token_val = localStorage.getItem('token');

					if (token_val == "" || token_val == undefined || token_val == null) {
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
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						success : function(result) {

							$(".loader").fadeOut();

							if (!$.isEmptyObject(result) && result != null) {
								try {
									result = JSON.parse(result);
									if (result.responseCode == '200') {
										
										$u.notify('success', 'Success',
												result.responseMessage, '');
										
										window.base.prepareBookmarkListForLoginUser("",bookmark_name,xmax,xmin,ymax,ymin,srs);
										
										let user_id = localStorage.getItem('user_data');
										
										if(user_id != undefined && user_id != null && user_id != ""){
											window.base.getBookMarkList(user_id);	
										}
									} else {
										$u.notify('error', 'Notification',
												result.responseMessage, '');
									}
								} catch (err) {
									$(".loader").fadeOut();
									console.log(err);
								}
							} else {
								$(".loader").fadeOut();
								$u.notify('error', 'Notification',
										'Error while adding bookmark', '');
							}
						},
						error : function(e) {
							$(".loader").fadeOut();
							// console.log(e);
							let response = JSON.parse(e.responseText);
							if(response.responseCode == 403) {
								$u.notify("info", "Notification", response.responseMessage);
							} else if(response.responseCode == 401) {
								$u.notify("info", "Notification", response.responseMessage);
							} 
						}
					});
				
				},
				deleteLoginUserBookmarks : function deleteLoginUserBookmarks(bookmarkIds){
					
					let bookmarkObj = {
							"delete_id" : bookmarkIds,
					}
					
					let postData = JSON.stringify(bookmarkObj);

					let token_val = localStorage.getItem('token');

					if (token_val == "" || token_val == undefined || token_val == null) {
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
										
										let user_id = localStorage.getItem('user_data');
										
										if(user_id != undefined && user_id != null && user_id != ""){
											window.base.getBookMarkList(user_id);	
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
							// console.log(e);
						}
					});
					
				},
				deleteCitizenBookmarks : function deleteCitizenBookmarks(){
					
					let idx = 0;
					let bookmarkIds = "";
					let length = $('input[name="citiBookmarkNames"]:checked').length;
					
					if(length == 0){
						$u.notify('info', 'Notification',
								'Please select any bookmark', '');
						return;
					}
					
					$('input[name="citiBookmarkNames"]:checked').each(function() {
						if (idx == (length - 1)) {
							bookmarkIds += this.value;
						} else {
							bookmarkIds += this.value + ",";
						}
						idx++;
					});
				
					let strarray = bookmarkIds.split(',');
					
					for(let a in strarray){
							let id = strarray[a];
							$("#"+id).remove();
							bookmarkList.pop(id.trim());
					}
					
					$u.notify('success', 'Success',
							"Bookmark deleted successfully", '');
					
					$("#bookmark_name").val("");
				},
				getSelectedBookmarkIds : function getSelectedBookmarkIds(){
					
					let bookmarkIds = "";
					let idx = 0;
					
					let length = $('input[name="bookmarkNames"]:checked').length;
					
					if(length == 0){
						$u.notify('info', 'Notification',
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
				prepareBookmarkListForLoginUser : function prepareBookmarkListForLoginUser(
						bookmark_id,bookmark_name,xmax,xmin,ymax,ymin,srs){
					
					$('#bookmark-data').append("<div class='main-book-val' id="+bookmark_id+">" +
							"<input type='checkbox' data-bookmark = "+bookmark_id+" value ="+bookmark_name+" name='bookmarkNames' " +
							"class='form-control main-book-in'>" +
							"<img src='images/icons/Bookmark-72.svg' class='main-book-img' " +
							"data-xmax='"+xmax+"' data-xmin='"+xmin+"' data-ymax='"+ymax+"' " +
									"data-ymin='"+ymin+"' data-srs='"+srs+"' onclick='window.base.zoomToBookmark(this)'>" +
							"<div class='bookmark-val' id='mine' title="+bookmark_name+">"+bookmark_name+"</div></div>");
				},
				prepareBookmarkListForCitizenUser : function prepareBookmarkListForCitizenUser
				(bookmark_name,xmax,xmin,ymax,ymin,srs){
					$('#bookmark-data').append("<div class='main-book-val' id="+bookmark_name+">" +
							"<input type='checkbox' value ="+bookmark_name+" name='citiBookmarkNames' " +
							"class='form-control main-book-in'>" +
							"<img src='images/icons/Bookmark-72.svg' class='main-book-img' " +
							"data-xmax='"+xmax+"' data-xmin='"+xmin+"' data-ymax='"+ymax+"' " +
									"data-ymin='"+ymin+"' data-srs='"+srs+"' onclick='window.base.zoomToBookmark(this)'>" +
							"<div class='bookmark-val' id='mine' title="+bookmark_name+">"+bookmark_name+"</div></div>");
				},
				zoomToBookmark : function zoomToBookmark(data){
					let xmin = $(data).data("xmin");
					let xmax = $(data).data("xmax");
					let ymin = $(data).data("ymin");
					let ymax = $(data).data("ymax");
					let wkid = $(data).data("srs");
					
					
					var myExtent = [xmin,ymin,xmax,ymax];
					map.getView().fit(myExtent , map.getSize());
					/*
					let bookmarkExtent = new Extent(xmin, ymin, xmax, ymax,
							new SpatialReference({
								wkid : wkid
					}));
					map.setExtent(bookmarkExtent);
					*/
				},
				prepareAttributeQueryResult : function prepareAttributeQueryResult(result){
					
					
					let layer_name = $("#poi_layer_select option:selected").text();
     			   	
      			   if(layer_name == "" || layer_name == undefined){
      				   layer_name = "features";
      			   }
					
					$("#attribute_query_rslt").append("<h3 id='total_features_length'>Number of "+layer_name+" found : " 
							+ 1 + "/" +result.features.length+ "</h3>" +	
					"<div class='np-main w-100 p-0'>" +
					"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
					"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
					"</div>");
					
					let total_feature = result.features.length;
					
					 for (var i = 0; i < result.features.length; i++) {
		        		 
						 let feature = result.features[i];
						 let graphic = feature; 
						 let geometry = feature.geometry;
						 
						 let x  = geometry.x;
		        		 let y = geometry.y;
		        		 let srs = geometry.spatialReference.wkid;
		        		 
		        		 var columns = feature.attributes;
		 				 let length = Object.keys(columns).length;
		 				 
		 				 let query__html_content = "";
		 				 
		 				let first = "<div class='query-result-main kyp-list query-resultDiv-seperator predefine-query'>";
		 				
		 				query__html_content += first;
		 				 
		 				// let latitude = "";
		 				// let longitude = "";
		 				
		 				let second = "";
		 				 
		 				 for(let a=0;a<length;a++){
		 					
		 					let key  = Object.keys(columns)[a];
		 					let attr = feature.attributes[key];
		 					
		 					if(key == "objectid" || key == "objectid_1"){
								continue;
							}
		 					
		 					let columnName = window.base.getFeatureColumnName(key);
		 					
		 					if(attr == null || attr == "" || attr == "null"){
		 						attr = "";
		 					}
		 					second = "<div class='result-task'><label>"+columnName+":</label><p>" +attr+ "</p></div>";
		 					
		 					query__html_content += second;
		 				}
		 				 
		 				let zoomFeature = "<div class='result-task'><i id=predefined_"+i+" class='fa fa-search query-zoom-feature' " +
		 						"aria-hidden='true' title='Zoom To Feature' data-longitude="+x+" data-latitude="+y+" " +
 						"onclick='window.base.zoomToPredefinedQuery(this)'></i></div>";
		 				 
		 				query__html_content += zoomFeature;
		 			
		 				let third = "</div>";
		 				query__html_content += third;
		 				
	 	                $("#attribute_query_rslt").append(query__html_content);

	 	               /*
						 * let pictureSymbol = new SimpleMarkerSymbol({ "color":
						 * [0,255,255], "size": 10, "angle": -30, "xoffset": 0,
						 * "yoffset": 0, "type": "esriSMS", "style":
						 * "esriSMSCircle", "outline": { "color": [0,255,255],
						 * "width": 3, "type": "esriSLS", "style":
						 * "esriSLSSolid" } });
						 * 
						 * let geometryService = new
						 * esri.tasks.GeometryService(window.prefix_layer_url +
						 * "Utilities/Geometry/GeometryServer"); let
						 * PrjParamsmin =
						 * window.base.convertCoordinateMeterToDegree(x,y);
						 * geometryService.project(PrjParamsmin, function
						 * (outputpoint) { let olatitude = outputpoint[0].y; let
						 * olongitude = outputpoint[0].x; let query_point = new
						 * Point(olongitude,olatitude); let graphic = new
						 * Graphic(query_point, pictureSymbol);
						 * map.graphics.add(graphic);
						 * graphic.setGeometry(query_point); });
						 */
		 				/*
						 * let styleColor = new
						 * SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new
						 * SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new
						 * Color([255,0,0]), 2),new Color([255,255,0,0.25]) );
						 * 
						 * graphic.setSymbol(styleColor);
						 * map.graphics.add(graphic);
						 * resultedFeaturesLayer.add(graphic);
						 */
			 	     }
					 if(total_feature == 1){
							$(".query-result-main").addClass("single-record");
						}else{
							$(".query-result-main").removeClass("single-record");
						}
					 
					 window.base.previousNextFeature(total_feature,'.query-result .predefine-query',layer_name,'predefined_');
				},
				createQueryByAttributeCriteria : function createQueryByAttributeCriteria(layer_id,ward_id,locality){
			         queryTask = new QueryTask(window.INDORE_LAYERS_SYMBOLOGY + "/" + layer_id);
			         let query = new Query();
			         query.returnGeometry = true;
			         query.outFields = ["*"];
			         query.where = "";
			        
			         if(ward_id == ""){
			        	 query.where += "1=1";
			         }else{
			        	 if(ward_id != ""){
			        		 	query.where += "ward_no = " + ward_id;
					     }
				        
				        if(locality != null && locality != "" && locality != undefined){
				        	
				        	locality = window.depUtlityController.covertFirstLetterCapital(locality);
				        	
				        	if(query.where != ""){
					        	query.where += " AND ";
					        }
				        	query.where += "address LIKE '%" + locality + "%'";
				        }
			         }
			        return query;
				},
				zoomToPredefinedQuery : function zoomToPredefinedQuery(data){
					map.graphics.clear();
					// map.removeLayer(queryGraphicLayer);
					// window.base.removeGraphicLayerGraphics(queryGraphicLayer);
					let latitude = $(data).data("latitude");
					let longitude = $(data).data("longitude");
					
					// let selected_query_layer = $("#poi_layer_select
					// option:selected").text();
					
					let pictureSymbol = new SimpleMarkerSymbol({
						"color": [0,255,255],
						  "size": 10,
						  "angle": -30,
						  "xoffset": 0,
						  "yoffset": 0,
						  "type": "esriSMS",
						  "style": "esriSMSCircle",
						  "outline": {
						    "color": [0,255,255],
						    "width": 3,
						    "type": "esriSLS",
						    "style": "esriSLSSolid"
						  }
						});
						
					let geometryService = new esri.tasks.GeometryService(window.prefix_layer_url + "Utilities/Geometry/GeometryServer");
	 	        	let PrjParamsmin = window.base.convertCoordinateMeterToDegree(longitude,latitude);
	 	        	
	 	        	 geometryService.project(PrjParamsmin, function (outputpoint) {
	 	        		let olatitude = outputpoint[0].y;
			            let olongitude = outputpoint[0].x;
						let query_point = new Point(olongitude,olatitude);
						let graphic = new Graphic(query_point, pictureSymbol);
						map.graphics.add(graphic);
						// queryGraphicLayer.add(graphic);
						graphic.setGeometry(query_point);
						map.centerAndZoom(query_point,18);
						window.depUtlityController.minimizePopup();
	 	        	 });
				},
				zoomToQuery : function(data){
					let latitude = $(data).data("latitude");
					let longitude = $(data).data("longitude");
					let id  = $(data).data("objectid"); 
					let query_point = new Point(longitude,latitude);
					
					let pictureSymbol = new SimpleMarkerSymbol({
						  "color": [0,255,255],
						  "size": 10,
						  "angle": -30,
						  "xoffset": 0,
						  "yoffset": 0,
						  "type": "esriSMS",
						  "style": "esriSMSCircle",
						  "outline": {
						    "color": [0,255,255],
						    "width": 3,
						    "type": "esriSLS",
						    "style": "esriSLSSolid"
						  }
						});
					
					map.graphics.clear();
					let graphic = new Graphic(query_point, pictureSymbol);
					map.graphics.add(graphic);
					graphic.setGeometry(query_point);
					map.centerAndZoom(query_point,18); 
					window.depUtlityController.minimizePopup();
				},
				convertCoordinateMeterToDegree : function convertCoordinateMeterToDegree(minx,miny){
					
					var inSR = new esri.SpatialReference({
			              wkid: 32643
			            });
					
					var outSR = new esri.SpatialReference({
			              wkid: 4326
			            });
					
					let datumtrans = "32643: WGS 84/UTM zone 43N";
					
		            var inputpoint = new esri.geometry.Point(minx, miny, inSR);
		            var PrjParams = new esri.tasks.ProjectParameters();
		            PrjParams.geometries = [inputpoint];
		            PrjParams.outSR = outSR;
		            PrjParams.transformForward=true;
		            PrjParams.vertical=false;
		            return PrjParams;
				},
				getDirection : function getDirection(source_array,destination_array){
					let result;
					var directionObj;
					
					directionObj = {
							"source" : source_array,
							"destination" : destination_array
					}	
					
					let postData = JSON.stringify(directionObj);
					$(".loader").fadeIn();
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/ward/getdirections",
						data : postData,
						contentType : 'application/json',
						async : false,
						success : function(result) {
							$(".loader").fadeOut();
							if (!$.isEmptyObject(result) && result != null) {
								if(result.code == "400"){
									$u.notify('info', 'Notification',
											'No Route Found', '');
									$("#total_distance").text("");
									 map.removeLayer(gLayer);
									return;
								}else{
									var sym = new CartographicLineSymbol(
									          CartographicLineSymbol.STYLE_SOLID,
									          new Color([0,255,0]), 10, 
									          CartographicLineSymbol.CAP_ROUND,
									          CartographicLineSymbol.JOIN_MITER, 5
									        );
							        map.removeLayer(gLayer);
									let coordinates = result.features[0].geometry.coordinates;
									let line_length = result.features[0].properties.shape_leng;
									let total_distance = (line_length * 111).toFixed(3); // distance
																							// in
																							// kms
									$("#total_distance").text("Total Distance : " + total_distance + " kms");
									var line = new esri.geometry.Polyline();
									line.addPath(coordinates);
							         var graphic = new esri.Graphic(line, sym);
							        gLayer.add(graphic);
							        map.addLayer(gLayer);
							        var extGraphics = esri.graphicsExtent(gLayer.graphics);
							        map.setExtent(extGraphics);
							        window.depUtlityController.minimizePopup();
								}
							} else {
								$(".loader").fadeOut();
								$u.notify('info', 'Notification',
										'No Route Found', '');
								$("#total_distance").text("");
								map.removeLayer(gLayer);
								window.base.removeDirectionGraphics();
								return;
							}
						},
						error : function(e) {
							$(".loader").fadeOut();
							$("#total_distance").text("");
							 map.removeLayer(gLayer);
								window.base.removeDirectionGraphics();
						}
					});
				
				},
				removeDirectionGraphics : function(){
					$("#total_distance").text("");
					if(gLayer){
						map.removeLayer(gLayer);
						map.graphics.clear();
						let graphics = gLayer.graphics;
						for(let i in graphics){
							let g = graphics[i];
							gLayer.graphics.pop();
						}
					}
				},
				getEventList : function getEventList(day_number,_status_name){
					$("#event_query_rslt").html("");
					
					let result;
					let EventInfoObj = {
							days : day_number,
							status_name : _status_name
					};
					
					let postData = JSON.stringify(EventInfoObj)
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/event/getEventList",
						data : postData,
						contentType : 'application/json',
						async : false,
						success : function(result) {
							if (!$.isEmptyObject(result) && result != null) {
								try {
									result = JSON.parse(result);
									
									if(result.responseCode == "200"){
										let data = result.data;
										if(data.length == 0){
											$u.notify('info', 'Notification',
											  		'No Events available', '');
											
											$("#event_query_rslt div").remove(".event-list");
											$("#event_query_rslt").html("");
											return;
										}
										
										$("#event_query_rslt").append("<h3 id='total_features_length'>Number of events found : "
										+ 1 + "/" +result.data.length+"</h3>" + 
										"<div class='np-main w-100 p-0'>" +
										"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
										"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
										"</div>");
										
										
										let content;
										
										let total_event = data.length;
										
										for(let d in data){
											
											let ename = data[d].event_name;
											let esdate = data[d].s_datetime;
											let eedate = data[d].e_datetime;
											let evanue = data[d].venue;
											let eemail = data[d].email;
											let eadress = data[d].web_address;
											let eperson = data[d].contact_person;
											let econtno = data[d].contact_no;
											let efee = data[d].entry_fees;
											let latitude = data[d].latitude;
											let longitude = data[d].longitude;
											let edesc = data[d].description;
											let is_new = data[d].is_new;
											
											let html = 
											"<div class='query-result-main event-list'>" +
// (is_new && is_new === true ? "<button class='btn-indore
// new-announcement'>New!</button>" : "") +
											"<div class='result-task'><label>Event Name: </label><p>"+ename+"</p></div>" +
											"<div class='result-task'><label>Start Date & Time: </label><p>"+esdate+"</p></div>" +
											"<div class='result-task'><label>End Date & Time: </label><p>"+eedate+"</p></div>" +
											"<div class='result-task'><label>Venue: </label><p>"+evanue+"</p></div>" +
											"<div class='result-task'><label>Website: </label><p>"+eadress+"</p></div>" +
											"<div class='result-task'><label> Email: </label><p style='word-break: break-word;'>"
											+eemail+"</p></div>" +
											"<div class='result-task'><label> Contact Person: </label><p>"+eperson+"</p></div>" +
											"<div class='result-task'><label> Contact Number: </label><p>"+econtno+"</p></div>" +
											"<div class='result-task'><label> Entry Fee: </label><p>"+efee+"</p></div>" +
											"<div class='result-task'>" +
											"<a class='text-left' href='https://web.whatsapp.com/send?text=%2AISCDL Event%2A %0AEvent Name: "+ename+" %0AStart Date %26 Time: "+esdate+
											"%0AEnd Date %26 Time: "+eedate+" %0AVenue: "+evanue+" %0ADescription: "+edesc+"'" +
											" target='_blank' data-action='share/whatsapp/share'><img title='Share on WhatsApp' style='height: 28px;width: 28px;' src='"+window.iscdl.appData.webURLPrefix+"images/icons/WhatsApp.png'></a>" +
											"<i id='events_"+d+"' class='fa fa-search query-zoom-feature' aria-hidden='true' title='Zoom To Event' onclick='window.base.zoomToEvent(this)' " +
											"data-ename='"+ename+"' data-evanue='"+evanue+"' data-econtactno='"+econtno+"' " +
											"data-contact_person = '"+eperson+"' data-lat = '"+latitude+"' " +
													"data-long = '"+longitude+"'></i></div>" + 
											"</div>";
														
											if(content == undefined){
												content = html;
											}else{
												content += html;
											}
										}
										$('#event_query_rslt').append(content);
										
										if(total_event == 1){
											$(".query-result-main").addClass("single-record");
										}else{
											$(".query-result-main").removeClass("single-record");
										}
										
										window.base.previousNextFeature(total_event,'.query-result .event-list','events',"events_");
										
									}else if(result.responseCode == "206"){
										$u.notify('info', 'Notification',
												'Please select valid value', '');
									}
								} catch (err) {
									console.log(err);
								}
							} else {
								$u.notify('info', 'Notification',
										'Data not available', '');
							}
						},
						error : function(e) {
							// console.log(e);
						}
					});
					
				},
				zoomToEvent : function  zoomToEvent(data){
					let latitude = $(data).data("lat");
					let longitude = $(data).data("long");
					let ename = $(data).data("ename");
					let evanue = $(data).data("evanue");
					let econtactno = $(data).data("econtactno");
					let contact_person = $(data).data("contact_person");
					
					let template_content = "";
					let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
					  '<tbody>';
					table_content += '<tr><td><b>Name</b></td><td>'+ename+'</td></tr>' +
					'<tr><td><b>Venue</b></td><td>'+evanue+'</td></tr>' +
					'<tr><td><b>Contact Person</b></td><td>'+contact_person+'</td></tr>' +
					'<tr><td><b>Contact No</b></td><td>'+econtactno+'</td></tr>' +
					'<tr><td><b>Latitude</b></td><td>'+latitude+'</td></tr>' + 
					'<tr><td><b>Longitude</b></td><td>'+longitude+'</td></tr>';
					
					template_content += table_content + '</tbody></table>';
					
					let event_infoTemplate = new InfoTemplate("Event",template_content);
					
					let event_point = new Point(longitude,latitude);
					
					map.graphics.clear();
					let graphic = new Graphic(event_point, markerSymbol);
					map.graphics.add(graphic);
					graphic.setInfoTemplate(event_infoTemplate);
					graphic.setGeometry(event_point);
					map.infoWindow.setTitle(graphic.getTitle());
					map.infoWindow.setContent(graphic.getContent());
					map.centerAndZoom(event_point,18); 
					map.infoWindow.show(event_point);
					window.depUtlityController.minimizePopup();
				},
				addShapefileToMap : function addShapefileToMap (featureCollection) {
					var fullExtent;

		            arrayUtils.forEach(featureCollection.layers, function (layer) {
		              var infoTemplate = new InfoTemplate("Details", "${*}");
		              var featureLayer = new FeatureLayer(layer, {
		                infoTemplate: infoTemplate
		              });
		              featureLayer.on('click', function (event) {
		                map.infoWindow.setFeatures([event.graphic]);
		              });
		              window.base.changeRenderer(featureLayer);
		              fullExtent = fullExtent ?
		                fullExtent.union(featureLayer.fullExtent) : featureLayer.fullExtent;
		                onFlylayers.push(featureLayer);
		            });
		            map.addLayers(onFlylayers);
		            map.setExtent(fullExtent.expand(1.25), true);
		            ontheFlyLayer = true;
		            window.depUtlityController.minimizePopup();
		          },
				changeRenderer : function changeRenderer (layer) {
		            var symbol = null;
		            switch (layer.geometryType) {
		              case 'esriGeometryPoint':
		                symbol = new PictureMarkerSymbol({
		                  'angle': 0,
		                  'xoffset': 0,
		                  'yoffset': 0,
		                  'type': 'esriPMS',
		                  'url': 'https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png',
		                  'contentType': 'image/png',
		                  'width': 20,
		                  'height': 20
		                });
		                break;
		              case 'esriGeometryPolygon':
		                symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
		                  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
		                    new Color([112, 112, 112]), 1), new Color([136, 136, 136, 0.25]));
		                break;
		            }
		            if (symbol) {
		              layer.setRenderer(new SimpleRenderer(symbol));
		            }
		          },
		          addKMLFileOnMap : function(){
						let ad_upfile = $('#inFile')[0].files;
						if(ad_upfile.length > 0){
							let fileSize = ad_upfile[0].size/1024/1024;
							if(fileSize > 10){
								$u.notify('warning', 'Warning', 'File size exceeds 10 MB', '');
								return;
							}
						}
						
						let token_val = localStorage.getItem('token');
						
						if(token_val == "" || token_val == undefined || token_val == null){
							$u.notify('info', 'Notification',
									'You are not authorized user', '');
							return;
						}
						
						let result;
						let requestData = new FormData();
						
						for(var i = 0;i<ad_upfile.length;i++){
							requestData.append('files', ad_upfile[i]);
						}
						$(".loader").fadeIn();
						$.ajax({
							method : 'POST',
							url : window.iscdl.appData.baseURL + "api/map_data/addKmlFile",
							async : false,
							enctype : 'multipart/form-data',
							processData : false,
							contentType : false,
							data : requestData,
							beforeSend : function(request) {
								request.setRequestHeader('Authorization', 'Bearer '
										+ localStorage.getItem('token'));
							},
							success : function(result) {
								if (!$.isEmptyObject(result) && result != null) {
									try {
										let op =JSON.parse(result);
										if(op.responseCode == "200"){
											
											window.depUtlityController.minimizePopup();
											
											let kmlUrl = KML_BASE_URL + op.fileName;
										    kml = new KMLLayer(kmlUrl);
										    /**
											 * remove KML Layer
											 */
										    removeKMLLayer();
										    map.addLayer(kml);
										    kmlLayers.push(kml);
										    /**
											 * while load kml file on map
											 */
										    kml.on("load", function() {
										    	$(".loader").fadeOut();
										    	let layer_extent = kml.getLayers()[0].fullExtent;
							    				if(layer_extent != undefined){
							    					var extent = new Extent(layer_extent);
							    					map.setExtent(layer_extent);
							    				}
										    });
										}else{
											$(".loader").fadeOut();
											$u.notify('warning', '', 'Failed to upload KML', '');
										}
									} catch (err) {
										$(".loader").fadeOut();
										console.log(err);
										$u.notify('warning','',op.responseMessage, '');
										
									}
								} else {
									$(".loader").fadeOut();
									$u.notify('warning', '', 'Data not available', '');
								}
							},
							error : function(e) {
								$(".loader").fadeOut();
								// console.log(e);
							}
						});
		          },
			          previousNextFeature : function(total_feature,className,layer_name,id_value){
			        	  
			        	  if(layer_name == "" || layer_name == undefined || layer_name == null){
			        		  layer_name == "features";
			        	  }
			        	  
			        	  var divs = $(className);
			        	    var now = 0; 
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
			        	        	if(className == ".query-result .nearme-result-feature"){
			        	        		$("#total_features_length").text("Number of "+layer_name+" found : " + (now + 1) + "/" + total_feature +" [Nearest To Far]");
			        	        	}else{
			        	        		$("#total_features_length").text("Number of "+layer_name+" found : " + (now + 1) + "/" + total_feature);	
			        	        	}
			        	        	if(id_value){
			        	        		
			        	        		/*
										 * if(total_feature > 1){
										 * $("#"+id_value+now).trigger("click"); }
										 */
			        	        		
			        	        		$("#"+id_value+now).trigger("click");	
			        	        	}
			        	        	
			        	        }
			        	        divs.eq(now).show();
			        	    });
			        	    $(".prev").click(function (e) {
			        	        divs.eq(now).hide();
			        	        now = (now > 0) ? now - 1 : divs.length - 1;
			        	        if(total_feature){
			        	        	if(className == ".query-result .nearme-result-feature"){
			        	        		$("#total_features_length").text("Number of "+layer_name+" found : " + (now + 1) + "/" + total_feature +" [Nearest To Far]");
			        	        	}else{
			        	        		$("#total_features_length").text("Number of "+layer_name+" found : " + (now + 1) + "/" + total_feature);	
			        	        	}
			        	        	if(id_value){
			        	        		
			        	        		/*
										 * if(total_feature > 1){
										 * $("#"+id_value+now).trigger("click"); }
										 */
			        	        		$("#"+id_value+now).trigger("click");	
			        	        	}
			        	        }
			        	        divs.eq(now).show(); 
			        	    });
			          },
			          getAttributeTableContent : function(key,value){
			        	  let content = '<table class="table table-bordered w-100">' +
  						  '<tbody>' +
  						    '<tr>' +
  						      '<td>"'+key+'"</td>' +
  						    '</tr>' +
  						    '<tr>' +
  						      '<td>"'+value+'"</td>' +
  						    '</tr>' +
  						  '</tbody>' +
  						'</table>';
			        	  
			        	  return content;
			          },
			          getFeatureColumnName : function getFeatureColumnName(str) {
			        	  
			        	  var i, columnName = str.split('_');
			        	  for (i=0; i<columnName.length; i++) {
			        		  columnName[i] = columnName[i].charAt(0).toUpperCase() + columnName[i].slice(1);
			        	  }
			        	  
			        	  if(columnName.length>0){
			        		  if(columnName[0] == "Atm"){
			        			  columnName[0] = "ATM";
			        		  }
			        	  }
			        	  return columnName.join(' ');
			        	},
			        	getNearmeResult : function (layer_id,around_me_location,range_value){
			        		let layer_url = window.layerDataController.getCitizenPortalLayerById(layer_id);
			        		
			        		if(nearme_featureLayer){
			        			map.removeLayer(nearme_featureLayer);
			        		}
							
							nearme_featureLayer = new FeatureLayer(layer_url,{
						         outFields: ["*"]
						    });
							
					        var usa_symbol = new SimpleMarkerSymbol(
					          SimpleMarkerSymbol.STYLE_CIRCLE, 
					          12, 
					          new SimpleLineSymbol(
					            SimpleLineSymbol.STYLE_NULL, 
					            new Color([247, 34, 101, 0.9]), 
					            1
					          ),
					          new Color([207, 34, 171, 0.5])
					        );
					        nearme_featureLayer.setSelectionSymbol(usa_symbol);
					        
					        var nullSymbol = new SimpleMarkerSymbol().setSize(0);
					        nearme_featureLayer.setRenderer(new SimpleRenderer(nullSymbol));
					        
					        map.addLayer(nearme_featureLayer);
					        
					        var usa_circleSymb = new SimpleFillSymbol(
					          SimpleFillSymbol.STYLE_NULL,
					          new SimpleLineSymbol(
					            SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
					            new Color([255, 51, 51]),
					            2
					          ), new Color([255, 255, 0, 0.25])
					        );
							
					        let nearme_long,nearme_lat;
					        
					        let points = around_me_location.split(",");
					        
					        if(points && points.length > 0){
					        	nearme_long = points[0];
					        	nearme_lat = points[1];
					        }
					        
					        let nearme_point = new Point(nearme_long,nearme_lat);
					        
							usa_circle = new Circle({
				            center: nearme_point,
				            geodesic: true,
				            radius: range_value,
				            radiusUnit: esriUnits.KILOMETERS
				          });
				          map.graphics.clear();
				          
						  if(!initialExtent.contains(nearme_point)){
								$u.notify('info', 'Notification',
										'Current point not within indore boundary', '');
								return;
						  }
				          
				          var usa_query = new Query();
				          // usa_query.geometry = usa_circle.getExtent();
				          usa_query.geometry = usa_circle;
				          $(".loader").fadeIn();
				          nearme_featureLayer.queryFeatures(usa_query, window.base.selectInQueryBuffer);
			        	},
			        	selectInQueryBuffer : function selectInQueryBuffer(response){
			            	
			                $('#nearme_result').html("");
			                
			        			  let html = "";
			        			  var usa_feature;
			        			  var features = response.features;
			        			  
			        			  if(features.length  == 0){
			        				  $u.notify('info', 'Notification',
			        							'Data not available', '');
			        				  $(".loader").fadeOut();		  	
			        				  	map_info_tool = false;
			        					$("#toggle_map_info").trigger("click");
			        				  return ;
			        			   }
			        			  
			        			  $('#nearme_result_data a[href="#nearme_result_tab"]').tab('show');
			        			   
			        			   let query__html_content = "";
			        			   let  info_template_content = "";
			        			   
			        			   let total_feature = features.length;
			        			  
			        			   // navigation length array and without
									// length array initialization
			        			   navigationNearmeRsltArr = [];
			        			   navigationNoRouteRsltArr = [];
			        			   ascFeatureArr = [];
			        			   
			        			   let layer_name = $("#around_layer option:selected").text();
			        			   	
			        			   if(layer_name == "" || layer_name == undefined){
			        				   layer_name = "features";
			        			   }
			        			   
			        			   try{
			        				   // store length and without length store
										// into array
			        				   window.base.getNavigationBasedResult(features);
			        				   
			        				   // sort array by ascending oeder length
			        				   navigationNearmeRsltArr.sort((a, b) => (a.length > b.length) ? 1 : -1);
				        			   
			        				   // add without length aat last
				        			   for(let n=0;n<navigationNoRouteRsltArr.length;n++){
				        				   let o_id = navigationNoRouteRsltArr[n].obj_id;
				        				   let len = navigationNoRouteRsltArr[n].length;
				        				   navigationNearmeRsltArr.push({'obj_id' : o_id,'length' : len});
				        			   }
				        			   
				        			   $('#nearme_result').append("<h3 id='total_features_length'>Number of "+layer_name+" found : " 
				        					   +  1 + "/" +total_feature+" [Nearest To Far]</h3>" +
				        					   "<div class='np-main w-100 p-0'>" +
				        				"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
				        				"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
				        				"</div>");
				        			   
				        			   // original feature sort by object-id
				        			   ascFeatureArr = [];
				        			   
				        			   for(var i = 0; i < features.length; i++){
				        					 let feature = features[i];
				        					 let object_id = feature.attributes.objectid;
				        					 index = navigationNearmeRsltArr.findIndex(x => x.obj_id == object_id);
					        				 ascFeatureArr.push({'index':index,'feature':feature});
				        			   }
				        			   
				        			   ascFeatureArr.sort((a, b) => (a.index > b.index) ? 1 : -1);
			        				   
				        			   // loop over near me result and display
										// on map and in html content
				        			   for(var i = 0; i < ascFeatureArr.length; i++){
				        				   let feature = ascFeatureArr[i].feature;
				        					 let graphic = feature; 
				        					 let geometry = feature.geometry;
				        					 
				        					 let x  = geometry.x;
				        	        		 let y = geometry.y;
				        	        		 let srs = geometry.spatialReference.wkid;
				        	        		 
				        	        		 var columns = feature.attributes;
				        	        		 let obj_id = feature.attributes.objectid;
				        	        		 let length = Object.keys(columns).length;
				        	 				 
				        	 				 let query__html_content = "";
				        	 				
				        	 				let first = "<div class='query-result-main kyp-list query-resultDiv-seperator " +
				        	 						"nearme-result-feature'>";
				        	 				
				        	 				query__html_content += first;
				        	 				
				        	 				let second = "";
				        	 				 
				        	 				 for(let a=0;a<length;a++){
				        	 					
				        	 					let key  = Object.keys(columns)[a];
				        	 					let attr = feature.attributes[key];
				        	 					
				        	 					if(attr == null || attr == "" || attr == "null"){
				        	 						attr = "";
				        	 					}
				        	 					
				        	 					if(key == "objectid" || key == "objectid_1"){
				        							continue;
				        						}
				        	 					
				        	 					if(key == "latitude" || key == "longitude"){
				        	 						attr = Number(attr).toFixed(6);
				        	 					}
				        	 					
				        	 					let columnName = window.base.getFeatureColumnName(key);
				        	 					
				        	 					second = "<div class='result-task'><label>"+columnName+":</label><p>" +attr+ "</p></div>";
				        	 					query__html_content += second;
				        	 				}
				        	 				 
				        	 				let zoomFeature = "<div class='result-task'><i id=nearme_"+i+" class='fa fa-search query-zoom-feature'" +
				        	 						" aria-hidden='true' " +
				     						"title='Zoom To Feature' data-latitude="+y.toFixed(6)+" " +
				        	 						"data-longitude="+x.toFixed(6)+" data-objectid= "+obj_id+" " +
				        	 						"onclick='window.base.zoomToQuery(this)'></i></div>";
				    		 				 
				    		 				query__html_content += zoomFeature;
				        	 			
				        	 				let third = "</div>";
				        	 				query__html_content += third;
				        	 				
				        	                $("#nearme_result").append(query__html_content);
				        	                
				        	                if (nearmeEvtHandler != undefined) {
				        						nearmeEvtHandler.remove();
				        	                }
				        	                
				        	 				let styleColor = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
				        			 	              new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
				        			 	              new Color([255,0,0]), 2),new Color([255,255,0,0.25])
				        			 	     );
				        	 	        	  
				        		 	          graphic.setSymbol(styleColor);
				        		 	          map.graphics.add(graphic);
				        		 	          resultedFeaturesLayer.add(graphic);
				        			   }
				        			   
			        			   }catch(e){
			        				   console.log(e);
			        				   $(".loader").fadeOut();
			        			   }

			        			   if(total_feature == 1){
										$(".query-result-main").addClass("single-record");
									}else{
										$(".query-result-main").removeClass("single-record");
									}
			        			   
			        			   window.base.previousNextFeature(total_feature,'.query-result .nearme-result-feature',layer_name,'nearme_');
			        			   	map_info_tool = false;
			        				$("#toggle_map_info").trigger("click");
			        			   
			                   },
			                   zoomToRectangleBox : function zoomToRectangleBox(evt){
			           			if(zoom_box_tool){
			           				// map.graphics.clear();
			           				let geometry = evt.geometry;
				           			let cache = geometry.cache;
				           			let extent = cache._extent;
				           			let minx = extent.xmin;
				           			let miny = extent.ymin;
				           			let maxx = extent.xmax;
				           			let maxy = extent.ymax;
				           			let srs = extent.spatialReference.wkid;
				           			
				           			try{
				           				if((minx != "NaN" && minx != null && minx != undefined) && 
				           						(miny != "NaN" && miny != null && miny != undefined) &&
				           						(maxx != "NaN" && maxx != null && maxx != undefined) && 
				           						(maxy != "NaN" && maxy != null && maxy != undefined)){
				           					
				           					let minp = new Point(minx,miny);
				           					let maxp = new Point(maxx,maxy);
				           					let minmp = webMercatorUtils.webMercatorToGeographic(minp);
				           					let maxmp = webMercatorUtils.webMercatorToGeographic(maxp);
				           					let boxZoomExtent = new Extent(minmp.x,
				           							minmp.y, maxmp.x, maxmp.y,
				           							new SpatialReference({
				           								wkid : 4326
				           					}));

				           					if(boxZoomExtent != undefined || boxZoomExtent != null){
				           						map.setExtent(boxZoomExtent);
				           						$('#zoomBoxMap'). prop('title', 'Enable Box Zoom');
				           						$('#zoomBoxMap'). css('opacity', '0.5');
				           						zoom_box_tool = false;
				           					}
				           				}
				           			}catch(e){
				           				$u.notify("info", "Notification",e.message);
				           			}
			           			}
			           		},
			           		zoomOutToRectangleBox : function zoomOutToRectangleBox(evt){
			           			if(zoom_out_box_tool){
			           				// map.graphics.clear();
			           				let geometry = evt.geometry;
				           			let cache = geometry.cache;
				           			let extent = cache._extent;
				           			let minx = extent.xmin;
				           			let miny = extent.ymin;
				           			let maxx = extent.xmax;
				           			let maxy = extent.ymax;
				           			let srs = extent.spatialReference.wkid;
				           			
				           			try{
				           				if((minx != "NaN" && minx != null && minx != undefined) && 
				           						(miny != "NaN" && miny != null && miny != undefined) &&
				           						(maxx != "NaN" && maxx != null && maxx != undefined) && 
				           						(maxy != "NaN" && maxy != null && maxy != undefined)){
				           					
				           					let minp = new Point(minx,miny);
				           					let maxp = new Point(maxx,maxy);
				           					let minmp = webMercatorUtils.webMercatorToGeographic(minp);
				           					let maxmp = webMercatorUtils.webMercatorToGeographic(maxp);
				           					
				           					let drawminx = minmp.x;
				           					let drawminy = minmp.y;
				           					let drawmaxx = maxmp.x;
				           					let drawmaxy = maxmp.y;
				           					
				        					let current_extent = map._getAvailExtent();
				        					let pmin = new Point([ current_extent.xmin,current_extent.ymin]);
				        					let pmax = new Point([ current_extent.xmax,current_extent.ymax]);
				        					let mpmin = webMercatorUtils.webMercatorToGeographic(pmin);
				        					let mpmax = webMercatorUtils.webMercatorToGeographic(pmax);

				        					let current_minx = mpmin.x;
				           					let current_miny = mpmin.y;
				           					let current_maxx = mpmax.x;
				           					let current_maxy = mpmax.y;
				           					
				           					let diff_minx = current_minx - drawminx;
				           					let diff_miny = current_miny - drawminy;
				           					let diff_maxx = current_maxx - drawmaxx;
				           					let diff_maxy = current_maxy - drawmaxy;
				           					
				           					let zoomout_minx = current_minx + diff_minx;
				           					let zoomout_miny = current_miny + diff_miny;
				           					let zoomout_maxx = current_maxx + diff_maxx;
				           					let zoomout_maxy = current_maxy + diff_maxy;
				           					
				           					let boxZoomOutExtent = new Extent(zoomout_minx,
				           							zoomout_miny, zoomout_maxx,zoomout_maxy,
				           							new SpatialReference({
				           								wkid : 4326
				           					}));

				           					if(boxZoomOutExtent != undefined || boxZoomOutExtent != null){
				           						map.setExtent(boxZoomOutExtent);
				           						$('#zoomOutBoxMap'). prop('title', 'Enable Box Zoom');
				           						$('#zoomOutBoxMap'). css('opacity', '0.5');
				           						zoom_out_box_tool = false;
				           						
				           					}
				           				}
				           			}catch(e){
				           				$u.notify("info", "Notification",e.message);
				           			}
			           			}
			           		},
			           		highlightWardInfoData : function(ward_info_obj){
			           			
			           			if(resultedFeaturesLayer){
			           				map.removeLayer(resultedFeaturesLayer);	
			           			}
			           			
			           			let ward_id = ward_info_obj.ward_id;
			           			let layer_name = ward_info_obj.layer_name;
			           			let column_name = ward_info_obj.column_name;
			           			let column_value = ward_info_obj.column_value;
			           			let column_type = ward_info_obj.column_type;
			           			
			           			
				           		 if(layer_name == undefined || layer_name == ""){
					        		  $u.notify("info", "Notification","Layer name was null");
					        		  $(".loader").fadeOut();
					        		  return;
					        	  }else if(column_name == undefined || column_name == ""){
					        		  $u.notify("info", "Notification","Column name was null");
					        		  $(".loader").fadeOut();
					        		  return;
					        	  }else if(ward_id == undefined || ward_id == ""){
					        		  $u.notify("info", "Notification","ward no was null");
					        		  $(".loader").fadeOut();
					        		  return;
					        	  }else if(column_value == undefined || column_value == ""){
					        		  $u.notify("info", "Notification","Column value was null");
					        		  $(".loader").fadeOut();
					        		  return;
					        	  }else if(column_type == undefined || column_type == ""){
					        		  $u.notify("info", "Notification","Column type was null");
					        		  $(".loader").fadeOut();
					        		  return;
					        	  }
			           			
			           			let layer_url = window.base.getWardInfoLayerIdByName(layer_name);
			           			
			           			if(layer_url == "" || layer_url == null || layer_url == undefined){
			           				$u.notify("info", "Notification","Layer id not found");
					        		$(".loader").fadeOut();
			           				return;
			           			}
			           			
			           			/**
								 * Zoom to ward Information data
								 */
			           			
			           			window.base.zoomToWardInfoData(layer_name,layer_url,column_name,
			           					ward_id,column_value,column_type);
			           		},
			           		zoomToWard : function zoomToWard(ward_id){
			           			let form_data = new FormData();
			           			form_data.append("wardNo",ward_id);
			           			$.ajax({
			                        method: 'POST',
			                        url: window.iscdl.appData.baseURL + 'citizen/zoomToWardInfo/'+ward_id,
			                        //data: { wardNo : ward_id },
			                        async: false,
			                        contentType: 'application/json',
//			                        beforeSend: function (xhr) {
//			                            xhr.setRequestHeader('Authorization', 'Bearer '+ localStorage.getItem('token'));
//			                        },
			                        success: function (response) {
			                            
			                            if (response.features.length > 0) {
			                                if (vectorSource != undefined && vectorSource != null) {
			                                    vectorSource.clear();
			                                }
			                                var geoJsonData = response.features[0];
			                                const geoJSONFormat = new ol.format.GeoJSON();
			                                vectorSource = new ol.source.Vector({
			                                    features: geoJSONFormat.readFeatures(geoJsonData),
			                                    featureProjection: 'EPSG:3857',
			                                    format: geoJSONFormat,
			                                });
			                                const vectorLayer = new ol.layer.Vector({
			                                    source: vectorSource,
			                                    style: {
			                                        'stroke-color': 'rgba(0, 153, 0, 0.7)',
			                                        'stroke-width': 5,
			                                      },
			                                });
			                                vectorLayer.getSource().on('addfeature', function () {
			                                    map.setExtent(vectorLayer.getSource().getExtent());
			                                });

			                                const extent = vectorSource.getExtent();

			                                map.getView().fit(extent,{
			            						nearest : true,
			            						duration : 1000,
			            						padding: [170, 150, 130, 150],
			            						maxZoom : 80,
			            					});
			                                map.addLayer(vectorLayer);
			                                
			                                //map1_layer.addLayer(layer_test1);
			                                //map1_layer.addLayer(vectorLayer);
			                                //map2_layer.addLayer(vectorLayer);
			                                //mapLayers2.push(vectorLayer);
			                                //mapLayers1.push(vectorLayer);
			                                //get_difference_data();
			                                
			                                
			                            }

			                            else {
			                                $.notify("Something went wrong", "error");
			                            }
			                        },
			                        error: function (e) {
			                            console.log(e);
			                        }

			                    });
			           		},
			           		highlightWard : function highlightWard(ward_id){
			           			
			           			map.graphics.clear();
					        	map.removeLayer(resultedFeaturesLayer);
					        	map.setExtent(initialExtent);
					        	
					        	if (ward_id == "" || ward_id == null || ward_id == undefined) {
									$u.notify('info', 'Notification', 'No Data available', '');
									return;
								}
					        	
			           			queryTask = new QueryTask(window.WARD_BOUNDARY);
								let query = new Query();
						        query.returnGeometry = true;
						        query.outFields = ["*"];
						        query.where = "";
						        
						        try{
					        		ward_id = parseInt(ward_id);	
					        	}catch(e){}
					        	query.where += "ward_no = " + ward_id + " ";

					        	$(".loader").fadeIn();

					        	try{
					        		 queryTask.execute(query,function(result){
								        	map.graphics.clear();
								        	map.removeLayer(resultedFeaturesLayer);
								        	window.base.removeGraphicLayerGraphics(resultedFeaturesLayer);
								        	 if(result.features.length == 0 ){
								        		 $u.notify("info", "Notification","No result found");
								        		 $(".loader").fadeOut();
									        	 return;
								        	 }
								        	 
								        	 let geometryType = result.geometryType;
								        	 
								        	 if(geometryType == "esriGeometryPolygon"){
								        			for (var i = 0; i < result.features.length; i++) {
										        		let feature = result.features[i];
										        		let geometry = feature.geometry;
										 	        	var outSpatialReference = new SpatialReference({
										 	        		 wkid: 4326
										 	        	});
										 	        	 
										 	        	let info_template_content = window.base.getInfoTemplateContent(feature);
										 	        	
										 	        	projection.load().then(function() {
											 	        	let cgeometry = projection.project(geometry, outSpatialReference);
											 	        	
											 	        	var polygon = {"geometry":cgeometry,"symbol":
											 	        	{"color":[0,0,0,64],"outline":{"color":[0,255,255],
											 	        	    "width":2,"type":"esriSLS","style":"esriSLSSolid"},
											 	        	    "type":"esriSFS","style":"esriSFSSolid"}};
											 	        	
											 	        	let polygonGraphic = new esri.Graphic(polygon);
											 	        	var pinfoTemplate = new InfoTemplate("Ward Information",info_template_content);
											 	        	polygonGraphic.setInfoTemplate(pinfoTemplate);
											 	        	map.graphics.add(polygonGraphic);
											 	        	resultedFeaturesLayer.add(polygonGraphic);
											 	        	$(".loader").fadeOut();
										 	        	});
											 	     }
								        		}
								         },function(error){
								        	   console.log(error);
								        	   $(".loader").fadeOut();
								         }); 
					        	}catch(e){
					        		console.log(e); 
					        		$(".loader").fadeOut();
					        	}
			           		},
			           		zoomToWardInfoData : function(layer_name,layer_url,column_name,ward_id,column_value,column_type){
			           			
			           			let wardInfoQuery = window.base.craeteQueryForwardInfo(layer_url,column_name,
			           					ward_id,column_value,column_type);
			           			
			           			try{
			           				if(wardInfoQuery != undefined){
						        		  $(".loader").fadeIn();
									        queryTask.execute(wardInfoQuery,function(result){
									        	window.base.removeGraphicLayerGraphics(resultedFeaturesLayer);
									        	 if(result.features.length == 0 ){
									        		 $u.notify("info", "Notification","No result found");
									        		 $(".loader").fadeOut();
										        	 return;
									        	 }
									        	 window.base.prepareWardInfoQueryResult(result,layer_name);
									        	 $(".loader").fadeOut();
									         },function(error){
									        	   console.log(error);
									        	   $(".loader").fadeOut();
									         });  
						        	  }
			           			}catch(e){
			           				console.log(e);
			           				$(".loader").fadeOut();
			           			}
			           		},
			           		prepareWardInfoQueryResult : function(result,layer_name){
			           			
			           			let geometryType = result.geometryType;
				        		
			           			let pictureSymbol = new SimpleMarkerSymbol({
									"color": [0,255,255],
									  "size": 10,
									  "angle": -30,
									  "xoffset": 0,
									  "yoffset": 0,
									  "type": "esriSMS",
									  "style": "esriSMSCircle",
									  "outline": {
									    "color": [0,255,255],
									    "width": 3,
									    "type": "esriSLS",
									    "style": "esriSLSSolid"
									  }
									});
			           			
				        		if(geometryType == "esriGeometryPoint"){
				        			
				        			let styleColor = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
							 	              new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
							 	              new Color([255,0,0]), 2),new Color([255,255,0,0.25])
							 	    );
				        			
				        			for (var i = 0; i < result.features.length; i++) {
						        		let feature = result.features[i];
						        		let geometry = feature.geometry;
						 	        	let latitude = geometry.y;
						 	        	let longitude = geometry.x;
										let query_point = new Point(longitude,latitude);
										let geometryService = new esri.tasks.GeometryService
										(window.prefix_layer_url + "Utilities/Geometry/GeometryServer");
						 	        	let PrjParamsmin = window.base.convertCoordinateMeterToDegree(longitude,latitude);
						 	        	
						 	        	let info_template_content = window.base.getInfoTemplateContent(feature);
										
										geometryService.project(PrjParamsmin, function (outputpoint) {
						 	        		let olatitude = outputpoint[0].y;
								            let olongitude = outputpoint[0].x;
											let c_query_point = new Point(olongitude,olatitude);
											let graphic = new Graphic(c_query_point, pictureSymbol);
											var pointinfoTemplate = new InfoTemplate(layer_name,info_template_content);
											graphic.setInfoTemplate(pointinfoTemplate);
											graphic.setGeometry(c_query_point);
											map.centerAndZoom(c_query_point,18);
											// map.graphics.add(graphic);
											resultedFeaturesLayer.add(graphic);	
											map.addLayer(resultedFeaturesLayer);
											window.depUtlityController.minimizePopup();
						 	        	 });
							 	     }
				        		}
			           		},
			           	  getInfoTemplateContent : function(feature){
				        	  	let info_template_content = "";
				        	  	var columns = feature.attributes;
				 				let length = Object.keys(columns).length;
				 				let template_content = "";
								let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
								  '<tbody>';
				 				for(let a=0;a<length;a++){
				 					let key  = Object.keys(columns)[a];
				 					
				 					if(key == "objectid" || key == "objectid_1"){
										continue;
									}
				 					
				 					let attr = feature.attributes[key];
				 					if(attr == null || attr == "" || attr == "null"){
				 						attr = "";
				 					}
				 					let columnName = window.base.getFeatureColumnName(key);	
				 					table_content += '<tr><td><b>'+columnName+'</b></td><td>'+attr+'</td></tr>';
				 				} 
				 				template_content += table_content + '</tbody></table>';
				 				return template_content;
				          },
			           		getWardInfoLayerIdByName : function(layer_name){
			           			let layer_url = "";
			           			switch (layer_name) {
			           				case "Primary School":
			           					layer_url = window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Primary_School;
			           					break;
									case "Secondary School":
										layer_url = window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Secondary_School;
										break;
									case "College":
										layer_url = window.INDORE_LAYERS_SYMBOLOGY + "/" + window.College_University;
										break;
									case "Hospital":
										layer_url = window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Hospital;
										break;
									case "Pharmacy":
										layer_url = window.INDORE_LAYERS_SYMBOLOGY + "/" + window.Pharmacy;
										break;
								default:
									layer_url = "";
									break;
								}
			           			return layer_url;
			           		},
			           		craeteQueryForwardInfo : function(layer_url,column_name,ward_id,column_value,column_type){
			           			
			           			queryTask = new QueryTask(layer_url);
								let query = new Query();
						        query.returnGeometry = true;
						        query.outFields = ["*"];
						        query.where = "";
						        
						        try{
					        		ward_id = parseInt(ward_id);	
					        	}catch(e){}
					        	query.where += "ward_no = " + ward_id + " ";
						        
					        	if(query.where != ""){
					        		query.where += " AND ";
					        	}
					        	
						        let content = window.base.getQueryAccordingToFieldType(column_type,column_name,column_value);
						        query.where += content;	
						        
						        return query;
						        
			           		},
			           		getQueryAccordingToFieldType : function(column_type,column_name,column_value){
					        	  let content = "";
					        	  if(column_type == "string"){
					        		  content = " "+column_name+" = '" + column_value + "'";	
							        }else if(column_type == "number"){
							        	content = " "+column_name+" = " + column_value + " ";	
							        }
					        	  return content;
					          },
					          removeGraphicLayerGraphics : function(graphic_layer){
					        	  if(graphic_layer){
										let graphics = graphic_layer.graphics;
										let glength = graphics.length;
										for(let i = 0;i<glength;i++){
											let g = graphics[i];
											graphic_layer.graphics.pop();
										}
									}  
					          },
					          getNavigationBasedResult : function(features){
					        	  
					        	  navigationNearmeRsltArr = [];
					        	  navigationNoRouteRsltArr = [];
					        	  ascFeatureArr = [];
					        	  
					        	  let first_point = $("#arround_me_current_loc").val();
					        	  
					        	  for(var i = 0; i < features.length; i++){
			        					 let feature = features[i];
			        					 let object_id = feature.attributes.objectid;
			        					 let geometry = feature.geometry;
			        					 let x  = geometry.x;
			        	        		 let y = geometry.y;
			        	        		 
			        	        		 let source_array = [x,y];
			        	        		 
			        	        		 let s0 = first_point.split(",");
										 let y0 = Number(s0[1]);
										 let x0 = Number(s0[0]);
										 let y1 = Number(y0);
										 let x1 = Number(x0);
										 let destination_array = [x1,y1];
										 
										 let result = window.base.getNavigationPointsLength(source_array,destination_array);
										 let responseJSON = result.responseJSON;
										 
										 if (!$.isEmptyObject(responseJSON) && responseJSON != null) {
											 if(responseJSON.features){
												 let length = responseJSON.features.length;
												 if(length > 0){
													 let feature = responseJSON.features[0];
													 let length = feature.properties.shape_leng;
													 navigationNearmeRsltArr.push({'obj_id' : object_id,'length' : length});
												 }
											 }
										 }else{
											 // console.log("No length found
												// for " + object_id);
											 navigationNoRouteRsltArr.push({'obj_id' : object_id,'length' : undefined});
										 }
					        	  }
					        	  
					        	  $(".loader").fadeOut();
					          },
					          getNavigationPointsLength : function(source_array,destination_array){
					        	  let result;
	        						var directionObj;
	        						
	        						directionObj = {
	        								"source" : source_array,
	        								"destination" : destination_array
	        						}	
	        						
	        						let postData = JSON.stringify(directionObj);
	        						return $.ajax({
	        							method : 'POST',
	        							url : window.iscdl.appData.baseURL + "citizen/ward/getdirections",
	        							data : postData,
	        							contentType : 'application/json',
	        							async : false,
	        							success : function(result) {
	        							},
	        							error : function(e) {
	        								console.log(e);
	        							}
	        						});
					          },
					          checkCurrentlocationWithinBoundry : function (longitude,latitude,
					        		  latitude_id,latitude_error,longitude_id,longitude_error){
					        	  
					        	  var current_point = new Point(longitude,latitude,new SpatialReference({ wkid: 4326 }));

					        	  	let queryTask = new QueryTask(window.IMC_BOUNDARY);
							        
									let q = new Query();
							        q.returnGeometry = true;
							        q.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
							        q.outFields = ["*"];
							        q.geometry = current_point;
							        $(".loader").fadeIn();
							         queryTask.execute(q,function(result){
							        	 $(".loader").fadeOut();
							        	 let length = result.features.length;
							        	 if(length == 0){
							        		 $u.notify('info', 'Notification',
														'Current location is outside Indore boundary', '');							
												return;
							        	 }else{
							        		 	$('#'+latitude_id).val((latitude).toFixed(6));
												$('#'+longitude_id).val((longitude).toFixed(6));
												window.base.removeLatLongError(latitude_id,latitude_error);
												window.base.removeLatLongError(longitude_id,longitude_error);
												window.base.removeCursor();
							        	 }
							         },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });
					          },
					          checkSelectedlocationWithinBoundry : function (longitude,latitude,
					        		  latitude_id,latitude_error,longitude_id,longitude_error){
					        	  
					        	  var current_point = new Point(longitude,latitude,new SpatialReference({ wkid: 4326 }));

					        	  	let queryTask = new QueryTask(window.IMC_BOUNDARY);
							        
									let q = new Query();
							        q.returnGeometry = true;
							        q.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
							        q.outFields = ["*"];
							        q.geometry = current_point;
							        $(".loader").fadeIn();
							         queryTask.execute(q,function(result){
							        	 $(".loader").fadeOut();
							        	 let length = result.features.length;
							        	 if(length == 0){
							        		 $('#'+latitude_id).val("");
											 $('#'+longitude_id).val("");
							        		 $u.notify('info', 'Notification',
														'Selected location is outside Indore boundary', '');	
							        		 window.base.removeCursor();
											 return;
							        	 }else{
							        		 if(map_selection){
													map_selection.remove();
													// map_hover.remove();
												}
												$('#'+latitude_id).val(latitude.toFixed(6).toString());
												$('#'+longitude_id).val(longitude.toFixed(6).toString());
												window.base.removeLatLongError(latitude_id,latitude_error);
												window.base.removeLatLongError(longitude_id,longitude_error);
												window.base.removeCursor();
												map_info_tool = false;
												$("#toggle_map_info").trigger("click");
							        	 }
							         },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });
					          },
					          getThanaNameByLatlong : function (longitude,latitude){
					        	  
					        	  
					        	  let thana_point = new Point(longitude,latitude);
					        	  
					        	  /*
					        	  queryTask = new QueryTask(window.POLICE_STATION_BOUNDARY);
							         let query = new Query();
							         query.returnGeometry = true;
							         query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
							         query.geometry = thana_point;
							         query.outFields = ["*"];
							         
							         $(".loader").fadeIn();
							         
							        queryTask.execute(query,function(result){
							        	$(".loader").fadeOut();
							        	 if(result.features.length == 0 ){
							        		 $u.notify("info", "Notification","No result found");
							        		 $(".loader").fadeOut();
								        	 return;
							        	 }

								        let features = result.features;
								        let feature = features[0];
								        let attributes = feature.attributes;
								        let policeStationName = attributes["name"];

								        // HIGHLIGHT AND ZOOM POLICE THANA
								        let thanaName = policeStationName.charAt(0).toUpperCase() + policeStationName.slice(1);
								        policeThanaQueryTask = new QueryTask(window.POLICE_STATION_LOCATION); 
								        let policeThanaQuery = new Query();
								        policeThanaQuery.returnGeometry = true;
								        policeThanaQuery.outFields = ["*"];
								        policeThanaQuery.where = "name = '"+thanaName+"' ";
								        */
								        
								        /*
								        policeThanaQueryTask.execute(policeThanaQuery,function(response){
								        	 if(response.features.length > 0 ){
								        		 let feature = response.features[0];
								        		 let geometry = feature.geometry;
								        		 let latitude = geometry.y;
									 	         let longitude = geometry.x;
												 let pictureSymbol = new SimpleMarkerSymbol({
														  "color": [0,255,255],
														  "size": 10,
														  "angle": -30,
														  "xoffset": 0,
														  "yoffset": 0,
														  "type": "esriSMS",
														  "style": "esriSMSCircle",
														  "outline": {
														    "color": [0,255,255],
														    "width": 3,
														    "type": "esriSLS",
														    "style": "esriSLSSolid"
													  }
												  });
													
												let geometryService = new esri.tasks.GeometryService(window.prefix_layer_url + 
														"Utilities/Geometry/GeometryServer");
									 	        let PrjParamsmin = window.base.convertCoordinateMeterToDegree(longitude,latitude);
									 	        geometryService.project(PrjParamsmin, function (outputpoint) {
									 	        	let olatitude = outputpoint[0].y;
											        let olongitude = outputpoint[0].x;
											        let query_point = new Point(olongitude,olatitude);
													map.graphics.clear();
													let graphic = new Graphic(query_point, pictureSymbol);
													map.graphics.add(graphic);
													graphic.setGeometry(query_point);
													map.centerAndZoom(query_point,18);
													window.depUtlityController.minimizePopup();
									 	        });
								        	 }else{
								        		 console.log(policeStationName + " Not Found");
								        	 }
								        },function(error){
								        	   console.log(error);
								        	   $(".loader").fadeOut();
								         });
								        */
								        
								         
								        let policeStationName = 'Malharganj';
								        let requestData = {name: policeStationName};
								        $.ajax({
											url : window.iscdl.appData.baseURL + "citizen/getPoliceThanaInfo",
											method : 'POST',
											contentType : 'application/json',
											data : JSON.stringify(requestData),
											async : false,
											success : function(result) {
												let response = JSON.parse(result);
												
												$("#thana_query_rslt").html("");
												$('#thana_query_rslt').append("<h3 data-translate='_thana_info_heading'>Police Thana Details:</h3>");
												if(response.data && response.data.length > 0){
													let html = 
														"<div class='query-result-main thana-list'>" +
														"<div class='result-task'><label data-translate='_thana_info_name'>Police Thana Name: </label><p>"+response.data[0].name+"</p></div>" + 
														"<div class='result-task'><label data-translate='_thana_info_address'>Address: </label><p>"+response.data[0].address+"</p></div>" +
														"<div class='result-task'><label data-translate='_thana_info_contact'>Contact Number: </label><p>"+response.data[0].contact_no+"</p></div>" +
														"<div class='result-task'><label data-translate='_thana_info_incharge'>Thana Incharge Name: </label><p>"+response.data[0].thana_incharge_name+"</p></div>" +
														"</div>"
													$('#thana_query_rslt').append(html);
												}else{
													$('#thana_query_rslt').append("<p>No records found.</p>");
												}
												$("#thana_call_text").html("");
												$("#thana_call_text").append("<h3></h3><p data-translate='_thana_call_text'>For any assistance Dial 100</p>");
												
												
											},
											error : function(err) {
												console.log(err);
											}
										});
								        /*
							        },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });*/
					          },
					          checkSelectedDirectionLocationWithinBoundry : function (longitude,latitude,
					        		  location_id,location_error,type){
					        	  let pictureMarkerSymbol = new PictureMarkerSymbol('images/pin.png', 25, 25);
					        	  
					        	  var current_point = new Point(longitude,latitude,new SpatialReference({ wkid: 4326 }));

					        	  	let queryTask = new QueryTask(window.IMC_BOUNDARY);
							        
									let q = new Query();
							        q.returnGeometry = true;
							        q.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
							        q.outFields = ["*"];
							        q.geometry = current_point;
							        $(".loader").fadeIn();
							         queryTask.execute(q,function(result){
							        	 $(".loader").fadeOut();
							        	 let length = result.features.length;
							        	 if(length == 0){
							        		 $('#'+location_id).val("");
							        		 $u.notify('info', 'Notification',
														'Selected location is outside Indore boundary', '');	
							        		 window.base.removeCursor();
							        		 map.setMapCursor("default");
											 dirLatLong.remove();
											 return;
							        	 }else{
							        		 if(type == "Source"){
							        			 if(map_selection){
														map_selection.remove();
														// map_hover.remove();
													}
													let sel_point = latitude.toFixed(6).toString() + "," + 
													longitude.toFixed(6).toString();
													$('#'+location_id).val(sel_point);
													
													if(dirgsLayer){
															map.removeLayer(dirgsLayer);
															let graphics = dirgsLayer.graphics;
															for(let i in graphics){
																let g = graphics[i];
																dirgsLayer.graphics.pop();
															}
													}
													
													let source_point = new Point(longitude,latitude);
													let graphic = new Graphic(source_point, pictureMarkerSymbol);
													dirgsLayer.add(graphic);
											        map.addLayer(dirgsLayer);
													window.base.removeLatLongError(location_id,location_error);
													map_info_tool = false;
													$("#toggle_map_info").trigger("click");
							        		 }else if(type == "Destination"){
							        			 if(map_selection){
														map_selection.remove();
														// map_hover.remove();
													}
													
													let sel_point = latitude.toFixed(6).toString() + "," 
													+ longitude.toFixed(6).toString();
													$('#'+location_id).val(sel_point);
													
													if(dirgdLayer){
														map.removeLayer(dirgdLayer);
														let graphics = dirgdLayer.graphics;
														for(let i in graphics){
															let g = graphics[i];
															dirgdLayer.graphics.pop();
														}
													}
													
													let destination_point = new Point(longitude,latitude);
													let graphic = new Graphic(destination_point, pictureMarkerSymbol);
													dirgdLayer.add(graphic);
											        map.addLayer(dirgdLayer);
													window.base.removeLatLongError(location_id,location_error);
													map_info_tool = false;
													$("#toggle_map_info").trigger("click");
							        		 }
							        		map.setMapCursor("default");
											dirLatLong.remove();
							        	 }
							         },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });
					          },
					          checkCurrentDirectionLocationWithinBoundry : function(_current_long,_current_lat,type){
					        	  var current_point = new Point(_current_long,_current_lat,new SpatialReference({ wkid: 4326 }));

					        	  let c_point = _current_lat.toFixed(6).toString() + "," 
									+ _current_long.toFixed(6).toString();
					        	  
					        	  	let queryTask = new QueryTask(window.IMC_BOUNDARY);
							        
									let q = new Query();
							        q.returnGeometry = true;
							        q.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
							        q.outFields = ["*"];
							        q.geometry = current_point;
							        $(".loader").fadeIn();
							         queryTask.execute(q,function(result){
							        	 $(".loader").fadeOut();
							        	 let length = result.features.length;
							        	 if(length == 0){
							        		 if(type == "Source"){
							        			 $('#from_loc').val("");
							        		 }else if(type == "Destination"){
							        			 $('#to_loc').val("");
							        		 }
							        		 $u.notify('info', 'Notification',
														'Current location is outside Indore boundary', '');	
							        		 window.base.removeCursor();
											 return;
							        	 }else{
							        		 let pictureMarkerSymbol = new PictureMarkerSymbol('images/pin.png', 25, 25);
												if(type == "Source"){
													$('#from_loc').val(c_point);
													if(dirgsLayer){
															map.removeLayer(dirgsLayer);
															let graphics = dirgsLayer.graphics;
															for(let i in graphics){
																let g = graphics[i];
																dirgsLayer.graphics.pop();
															}
													}
													let source_point = new Point(_current_long,_current_lat);
													let graphic = new Graphic(source_point, pictureMarkerSymbol);
													dirgsLayer.add(graphic);
											        map.addLayer(dirgsLayer);
													window.base.removeLatLongError('from_loc','from_loc-error');
												}else if(type == "Destination"){
													$('#to_loc').val(c_point);
													if(dirgdLayer){
														map.removeLayer(dirgdLayer);
														let graphics = dirgdLayer.graphics;
														for(let i in graphics){
															let g = graphics[i];
															dirgdLayer.graphics.pop();
														}
													}
													let destination_point = new Point(_current_long,_current_lat);
													let graphic = new Graphic(destination_point, pictureMarkerSymbol);
													dirgdLayer.add(graphic);
											        map.addLayer(dirgdLayer);
													window.base.removeLatLongError('to_loc','to_loc-error');
												}
												window.base.removeCursor();
							        	 }
							         },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });
					          },
					          checkAroundMeSelectedlocationWithinBoundry : function(x,y,around_me_id,around_me_error){
					        	  	
					        	  var current_point = new Point(x,y,new SpatialReference({ wkid: 4326 }));
					        	  let queryTask = new QueryTask(window.IMC_BOUNDARY);
							        
									let q = new Query();
							        q.returnGeometry = true;
							        q.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
							        q.outFields = ["*"];
							        q.geometry = current_point;
							        $(".loader").fadeIn();
							         queryTask.execute(q,function(result){
							        	 $(".loader").fadeOut();
							        	 let length = result.features.length;
							        	 if(length == 0){
							        		 $('#'+around_me_id).val("");
							        		 $u.notify('info', 'Notification',
														'Selected location is outside Indore boundary', '');	
							        		 window.base.removeCursor();
											 return;
							        	 }else{
							        		 let c_point =   x.toFixed(6).toString() + ","  + y.toFixed(6).toString();
												$('#'+around_me_id).val(c_point);
												let n_point = new Point(x,y);
												let graphic = new Graphic(n_point, markerSymbol);
												graphic.setGeometry(n_point);
												map.graphics.add(graphic);
												window.base.removeLatLongError(around_me_id,around_me_error);
												window.base.removeCursor();
												map_info_tool = false;
												$("#toggle_map_info").trigger("click");
							        	 }
							         },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });
					          },
					          checkForLocate : function(_current_long,_current_lat){
					        	  var pt = new Point(_current_long,_current_lat);
					        	  var current_point = new Point(_current_long,_current_lat,
					        			  new SpatialReference({ wkid: 4326 }));
					        	  
					        	  let queryTask = new QueryTask(window.IMC_BOUNDARY);
									let q = new Query();
							        q.returnGeometry = true;
							        q.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
							        q.outFields = ["*"];
							        q.geometry = current_point;
							        $(".loader").fadeIn();
							         queryTask.execute(q,function(result){
							        	 $(".loader").fadeOut();
							        	 let length = result.features.length;
							        	 if(length == 0){
							        		 $u.notify('info', 'Notification',
														'Current location is outside Indore boundary', '');	
											 return;
							        	 }else{
							        		 let graphic = new Graphic(pt, markerSymbol);
									         map.graphics.add(graphic);
									         
									         let cl_infoTemplate = new InfoTemplate
									         ("Current Location", "<b>Latitude :</b>"+_current_lat.toFixed(6)+"<br>" +
									         		"<b>Longitude :</b>"+_current_long.toFixed(6)+"<br>");
												
											graphic.setGeometry(pt);
											graphic.setInfoTemplate(cl_infoTemplate);
									        graphic.setGeometry(pt);
									        map.centerAndZoom(pt,18);
							        	 }
							         },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });
					          },
					          checkGeocoderIsWithinBoundary : function(mp,type){
					        	  let pictureMarkerSymbol = new PictureMarkerSymbol('images/pin.png', 25, 25);
					        	  
					        	  let longitude = mp.x;
					        	  let latitude = mp.y;
					        	  
					        	  var current_point = new Point(longitude,latitude,
					        			  new SpatialReference({ wkid: 4326 }));
					        	  
					        	  let queryTask = new QueryTask(window.IMC_BOUNDARY);
									let q = new Query();
							        q.returnGeometry = true;
							        q.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
							        q.outFields = ["*"];
							        q.geometry = current_point;
							        $(".loader").fadeIn();
							         queryTask.execute(q,function(result){
							        	 $(".loader").fadeOut();
							        	 let length = result.features.length;
							        	 if(length == 0){
							        		 $u.notify('info', 'Notification',
														'Selected location is outside Indore boundary', '');
							        		 if(type == "From"){
							        			 $("#from_loc_name_input").val("");	 
							        		 }else if(type == "To"){
							        			 $("#to_loc_name_input").val("");	 
							        		 }else if("Thana Locality"){
							        			 $("#thana_licality_name_input").val("");
							        		 }
											 return;
							        	 }else{
							        		 if(type == "From"){
							        			 if(dirgsLayer){
							        					map.removeLayer(dirgsLayer);
							        					let graphics = dirgsLayer.graphics;
							        					for(let i in graphics){
							        						let g = graphics[i];
							        						dirgsLayer.graphics.pop();
							        					}
							        				}
							        				let source_point = new Point(mp.x,mp.y);
							        				let graphic = new Graphic(source_point, pictureMarkerSymbol);
							        				dirgsLayer.add(graphic);
							        		        map.addLayer(dirgsLayer);
							        				source_latlong_by_name = mp;
							        		 }else if(type == "To"){
							        			 if(dirgdLayer){
							        					map.removeLayer(dirgdLayer);
							        					let graphics = dirgdLayer.graphics;
							        					for(let i in graphics){
							        						let g = graphics[i];
							        						dirgdLayer.graphics.pop();
							        					}
							        				}
							        				let destination_point = new Point(mp.x,mp.y);
							        				let graphic = new Graphic(destination_point, pictureMarkerSymbol);
							        				dirgdLayer.add(graphic);
							        		        map.addLayer(dirgdLayer);
							        				destination_latlong_by_name = mp;
							        		 }else if(type == "Thana Locality"){
							        			 thana_locality_name = mp;
							        		 }
							        	 }
							         },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });
					          }
		};
			
		window.base = base;
		/**
		 * READY FUNCTION
		 */

		$(document).ready(
				function() {
										
					$(".loader").fadeOut();
					
					// let map_view =
					// $('ul#pills-map-tab').find('a.active')[0].innerHTML;
					$('.datepicker').daterangepicker({
						 singleDatePicker: true,
						 timePicker: true,
						 locale: {
							format: 'YYYY-MM-DD'
						},
						"drops": "up"
					});
					
					let token = localStorage.getItem("token");
					if(token !== undefined && token !== null){
						$(".logout-link").css('display', 'flex');
						$(".drop-down-main").css('display', 'flex');
						$(".user-info").text(JSON.parse(localStorage.getItem("user")).userName);
					}else{
						$(".user-info").text("Guest");
						$("#city_logo").attr("href", window.location.origin + window.iscdl.appData.webURLPrefix + "login.jsp");
					}
					$(".user-manual-ctbtn").css('display','flex');
					$(".user-manual-dpbtn").css('display','none');
					
					$("#citizen-logout-btn").click(function(){
						window.depUtlityController.userLogout();
					});
					
					/**
					 * create book-mark view
					 */
					// window.base.creatBookmarkView();
					
					/**
					 * get book-mark list
					 */
					
					let user_id = localStorage.getItem('user_data');
					
					if(user_id != undefined && user_id != null && user_id != ""){
						
						window.base.getBookMarkList(user_id);	
					}
					
					/**
					 * add book-mark click event
					 * 
					 */
					
					$("#add-bookmark").click(function(){
						window.base.setBookmarkInfo();
					});
					
					/**
					 * delete bookmark click event
					 */
					$("#delete-bookmark").click(function(){
						
						let user_id = localStorage.getItem('user_data');
						
						if(user_id != undefined && user_id != null && user_id != ""){
							let bookmarkIds = window.base.getSelectedBookmarkIds();
							if(bookmarkIds != undefined && bookmarkIds != null && bookmarkIds != ""){
								window.base.deleteLoginUserBookmarks(bookmarkIds);	
							}
						}else{
							window.base.deleteCitizenBookmarks();
						}
					});
					
// CHECK IF ZOOM LEVEL IS AVAILABLE OR NOT FROM SHARE URL
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
// UPDATE WINDOW URL IF PAGE OPENED FROM SHARE URL
					if(shareFlag){
						window.location.replace(window.location.origin + window.location.pathname);
					}
					
					let xmin = localStorage.getItem("xmin");
					let ymin = localStorage.getItem("ymin");
					let xmax = localStorage.getItem("xmax");
					let ymax = localStorage.getItem("ymax");
					let srs = localStorage.getItem("spatialReference");

					if ((xmin != null && xmin != undefined)
							&& (ymin != null && ymin != undefined)
							&& (xmax != null && xmax != undefined)
							&& (ymax != null && ymax != undefined)
							&& (srs != null && srs != undefined)) {
						var startExtent = new Extent(xmin, ymin, xmax, ymax,
								new SpatialReference({
									wkid : 4326
						}));
						map.setExtent(startExtent);
					}
				});
		
		$("#print_popup").click(function(){
			window.depUtlityController.removeError('form_print');
		});
		
		/**
		 * Map Info Click event
		 */
		$("#toggle_map_info").click(function(){
			
			if(map_info_tool){
				map_info_tool = false;
				$('#mapInfoTool'). prop('title', 'Disable Map Info');
				$('#mapInfoTool'). css('opacity', '1.0');
				mapReady();
			}else{
				map_info_tool = true;
				$('#mapInfoTool'). prop('title', 'Enable Map Info');
				$('#mapInfoTool'). css('opacity', '0.5');
				if(map_selection){
					map_selection.remove();	
					// map_hover.remove();
				}
			}
		});
		
		$("#toggle_map_pan").click(function(){
			if(map_pan_tool){
				map_pan_tool = false;
				$('#panDiv'). prop('title', 'Enable Pan');
				$('#panDiv'). css('opacity', '0.5');
				map.setMapCursor("default");
				map.disablePan();
			}else{
				map_pan_tool = true;
				$('#panDiv'). prop('title', 'Disable Pan');
				$('#panDiv'). css('opacity', '1.0');
				map.setMapCursor("pointer");
				map.enablePan();
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
				
				if(map_selection){
					map_selection.remove();	
					// map_hover.remove();
				}
				let title = "Rectangle";
				let tool_name = title.toUpperCase().replace(/ /g, "_");
				if(tool_name == "RECTANGLE"){
					toolbar.activate(Draw[tool_name]);
					toolbar.on("draw-end", window.base.zoomToRectangleBox);
					map.hideZoomSlider();
				}
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
				
				if(map_selection){
					map_selection.remove();	
					// map_hover.remove();
				}
				let title = "Rectangle";
				let tool_name = title.toUpperCase().replace(/ /g, "_");
				if(tool_name == "RECTANGLE"){
					toolbar.activate(Draw[tool_name]);
					toolbar.on("draw-end", window.base.zoomOutToRectangleBox);
					map.hideZoomSlider();
				}
			}
		});
		
		// Know your ward Education and Helath Details selection
		$("#lbl_prisch_name").on('click','li',function (){
		    let value = $(this).text();
		    let obj = {layer_name: "Primary School", column_name: "school_name", column_type: "string", column_value: value,
			    	ward_id: $("#ward_select option:selected").val()};
		    window.base.highlightWardInfoData(obj);
		});

		$("#lbl_secsch_name").on('click','li',function (){
		    let value = $(this).text();
		    let obj = {layer_name: "Secondary School", column_name: "school_name", column_type: "string", column_value: value,
			    	ward_id: $("#ward_select option:selected").val()};
		    window.base.highlightWardInfoData(obj);
		});
		
		$("#lbl_clg_name").on('click','li',function (){
		    let value = $(this).text();
		    let obj = {layer_name: "College", column_name: "university_name", column_type: "string", column_value: value,
			    	ward_id: $("#ward_select option:selected").val()};
		    window.base.highlightWardInfoData(obj);
		});
		
		$("#lbl_hospital_name").on('click','li',function (){
		    let value = $(this).text();
		    let obj = {layer_name: "Hospital", column_name: "hospital_name", column_type: "string", column_value: value,
			    	ward_id: $("#ward_select option:selected").val()};
		    window.base.highlightWardInfoData(obj);
		});
		
		$("#lbl_pharmacy_name").on('click','li',function (){
		    let value = $(this).text();
		    let obj = {layer_name: "Pharmacy", column_name: "name", column_type: "string", column_value: value,
			    	ward_id: $("#ward_select option:selected").val()};
		    window.base.highlightWardInfoData(obj);
		});
		
		// know your police thana form
		$('form[id="thana_info_form"]').validate({
					rules : {
						thana_xy_latitude : {
							required : true,
							numericVal : true,
						},
						thana_xy_longitude :{ 
							required : true,
							numericVal : true,
						},
					},
					messages : {
						thana_xy_latitude : {
							required : "Please Enter Latitude",
							numericVal : "Please Enter Numeric Value",
						},
						thana_xy_longitude : {
							required : "Please Enter Longitude",
							numericVal : "Please Enter Numeric Value",
						},
					},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							let latitude = $('#thana_xy_latitude').val();
							let longitude = $('#thana_xy_longitude').val();
							window.base.getThanaNameByLatlong(longitude,latitude);
						} catch (e) {
							$u.notify("error", "Error",
									"Something went Wrong");
						}
					}
		});
		
		
		// know your police thana form by locality
		$('form[id="form_kythana_by_name"]').validate({
					rules : {
						},
					messages : {
						},
					submitHandler : function(form, e) {
						e.preventDefault();
						try {
							let locality_name = $("#thana_licality_name_input").val();
							if(locality_name == "" || locality_name == null || locality_name == undefined){
								$u.notify("info", "Notification","Please select a locality");
								$("#thana_licality_name_input").val("");
								return;
							}
							let longitude = (thana_locality_name.x).toFixed(6);
							let latitude = (thana_locality_name.y).toFixed(6);
							window.base.getThanaNameByLatlong(longitude,latitude);
						} catch (e) {
							$u.notify("error", "Error",
									"Something went Wrong");
						}
					}
		});
		
		
		// Thana info clear
		$('#thana_xyLocationClr').click(function(){
			//map.graphics.clear();
			//map.setExtent(initialExtent);
			
			if (mapClickEvtHandler != undefined) {
				mapClickEvtHandler.remove();
				map.setMapCursor("default");
			}
			map_info_tool = false;
			$("#toggle_map_info").trigger("click");
			$("#thana_query_rslt").html("");
			$("#thana_call_text").html("");
		});
		
		$('#thana_locality_Clr').click(function(){
			map.graphics.clear();
			map.setExtent(initialExtent);
			if (mapClickEvtHandler != undefined) {
				mapClickEvtHandler.remove();
				map.setMapCursor("default");
			}
			map_info_tool = false;
			$("#toggle_map_info").trigger("click");
			$("#thana_query_rslt").html("");
			$("#thana_call_text").html("");
		});
		
		
		$("#thana_info_popup").click(function(){
			$("#thana_query_rslt").html("");
			$("#thana_call_text").html("");
			$("#thana_xyLocationClr").click();
		});
		
		$(document).on('input', '#layer_slider', function() {
		    let slider_value = $(this).val();
		    if(slider_value){
		    	symbology_layers.setOpacity(slider_value);
		    }
		});
		
		$("#search_layer_link").click(function(){
			updateSearchLayers();
			$('#visibility_layer').prop('disabled',true);
			$("#visibility_layer").prop("checked",false);
		});
		
		$("#map_measurement").click(function(){
			let did = localStorage.getItem('department_id');
			if (did == null || did == "" || did == undefined) {
				$("#map_measurement").attr("data-attr", "");
				
				$("#user_notification_content").find('p:first').remove();
				$("#user_notification_content").find('p:first').remove();
				$("#user_notification_content").prepend('<p data-translate="_unauthorized_user_text_popup">You are not an Authorized User !</p><p data-translate="_unauthorized_user_tool_popup"> In order to use this tool , Please register to our portal by clicking below</p>');
			
				if(localStorage.getItem('current_language') === "hindi"){
					$("#pills-hindi-tab").trigger('click');
				}
				$("#user_notification").modal();
				
			}else{
				$("#map_measurement").attr("data-attr", "#mesurment");
			}
		});
		
		$('.ol-gallery-thumbnail').on("click", function (){
			$('.ol-gallery-thumbnail').removeClass('img-height-full');
			$(this).addClass('img-height-full');
			let layerType = $(this).data("value");
			
			alert(layerType);
			
			
			
		})
		
		/**
		 * LOAD FUNCTION
		 */
		
		$(window).on("load", function(){
			window.cityMapController.fileChangeEvent();
			window.cityMapController.dropDownChangeEvent();
			window.base.clearCursor();
			dynamicLayerList();
		});
});