(function(global, $) {
	"use stricts;"
	
	var map,mapClickEvtHandler;
	var _current_lat = "";
	var _current_long = "";
	var initialExtent ;
	 var intersectFeatures = [];
	 var map_selection,map_hover;
	 var dirLatLong;
	 var map_info_tool = true;
	 var swipe_layer_tool = true;
	 var map_pan_tool = true;
	 var zoom_box_tool,zoom_out_box_tool = false;
	 var dashboardLayer = null;
	 var opacity_layer;	
	 var map_layers = [];
	 var direction_arr = [];
	 
	let base = {
		getMap : function getMap(){
			return map;
		}, 
		
	}
	
	require(
			[ "esri/map",  "esri/dijit/HomeButton", "esri/dijit/LocateButton","esri/layers/ArcGISDynamicMapServiceLayer",
				"esri/tasks/QueryTask","esri/tasks/query",
				"esri/dijit/Search", "esri/dijit/BasemapGallery","esri/arcgis/utils", "dojo/parser", "dijit/registry",
				"dojo/dom", "esri/Color", "esri/symbols/TextSymbol","esri/symbols/Font", "dojo/keys",
				"esri/config", "esri/sniff", "esri/SnappingManager","esri/dijit/Bookmarks", "esri/geometry/Extent",
				"esri/geometry/webMercatorUtils","esri/dijit/Print", "esri/tasks/PrintTemplate", "esri/request",
				"dojo/_base/array","esri/layers/LayerInfo","esri/tasks/locator","esri/tasks/RouteTask", "esri/tasks/RouteParameters",
			      "esri/tasks/FeatureSet", "esri/units",  "esri/lang","esri/symbols/PictureMarkerSymbol", 
			      "dojo/promise/all","dojo/dom", "dojo/dom-construct", "dojo/on", "dojo/number",
			      "dgrid/Grid","esri/InfoTemplate","esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer",
				"esri/dijit/LayerList","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol", "esri/geometry/Point",
				"esri/geometry/coordinateFormatter","esri/tasks/GeometryService", "esri/tasks/ProjectParameters","esri/SpatialReference",
				"esri/toolbars/draw", "esri/symbols/SimpleMarkerSymbol","esri/symbols/PictureFillSymbol",
				"esri/symbols/CartographicLineSymbol", "esri/graphic","esri/Color","esri/dijit/Measurement", "esri/urlUtils",
				"esri/dijit/Directions","esri/tasks/PrintParameters" ,"esri/tasks/PrintTask","esri/layers/GraphicsLayer","esri/tasks/IdentifyTask",
				"esri/tasks/IdentifyParameters","esri/geometry/geometryEngine",
				"esri/dijit/Scalebar","esri/dijit/LayerSwipe","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/KMLLayer",
				"esri/dijit/BasemapLayer","esri/dijit/Basemap","esri/geometry/projection",
				"esri/geometry/scaleUtils", "dojo/_base/lang", "dojo/json","esri/dijit/OpacitySlider",
				"esri/dijit/Legend","esri/renderers/HeatmapRenderer",
				"dijit/layout/BorderContainer","dijit/layout/ContentPane",
				"dijit/TitlePane", "dijit/form/CheckBox", "dijit/form/Button","dojo/domReady!" ],
			function(Map, Home, Locate,ArcGISDynamicMapServiceLayer,QueryTask, Query,Search, BasemapGallery, arcgisUtils,parser, registry, dom, Color, TextSymbol, Font, keys,
					esriConfig, has, SnappingManager, Bookmarks, Extent,webMercatorUtils, Print, PrintTemplate, esriRequest,
					arrayUtils, LayerInfo,Locator,RouteTask, RouteParameters,FeatureSet, esriUnits, esriLang,PictureMarkerSymbol,
				      all,dom, domConstruct, on, number,Grid,InfoTemplate,FeatureLayer, SimpleRenderer, LayerList,SimpleLineSymbol, SimpleFillSymbol, 
				      Point, coordinateFormatter,GeometryService, ProjectParameters, SpatialReference, Draw,
					SimpleMarkerSymbol, PictureFillSymbol, CartographicLineSymbol,Graphic, Color, Measurement, urlUtils, Directions,
					PrintParameters,PrintTask,GraphicsLayer,IdentifyTask,IdentifyParameters,geometryEngine,Scalebar,LayerSwipe,ArcGISTiledMapServiceLayer,KMLLayer,
					BasemapLayer,Basemap,projection,
					scaleUtils,lang,JSON,OpacitySlider,Legend,HeatmapRenderer) 
					
		{
				parser.parse();

				initialExtent = new Extent(75.54699290771396,
						22.63628705473749, 76.16840709228345, 22.80286225175135,
						new SpatialReference({
							wkid : 4326
				}));

				var app = {};
				var layerSwipe;
				var onFlylayers = [];
				var ontheFlyLayer = false;
				var kmlLayers = [];
				var lastState = null;
				var legendLayers = [];
				
				var KML_BASE_URL = "https://indoresmartmap.org/kml_files/"
						
				var resultedFeaturesLayer = new GraphicsLayer();
				var gLayer = new esri.layers.GraphicsLayer({ "id": "Direction" });
				var dirgsLayer = new esri.layers.GraphicsLayer();
				var dirgdLayer = new esri.layers.GraphicsLayer();
				var swipe_layer_obj,heatmapFeatureLayer;
				var markerSymbol = new SimpleMarkerSymbol();
		        markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016," +
		        		"5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701," +
		        		"14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772," +
		        		"18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
		        markerSymbol.setColor(new Color("#00FFFF"));
		        
		        let pointStyleSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
		 	              new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
		 	              new Color([255,0,0]), 2),new Color([255,255,0,0.25])
		 	     );
		        
		        
		        var dash_point_symbol = new PictureMarkerSymbol({
	                  'angle': 0,
	                  'xoffset': 0,
	                  'yoffset': 0,
	                  'type': 'esriPMS',
	                  'url': 'https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png',
	                  'contentType': 'image/png',
	                  'width': 20,
	                  'height': 20
	                });
				
				var appConfig = {
					mapView : null,
					sceneView : null,
					activeView : null,
					container : "map"
				};

//				map = new Map("map", {
//					center : window.MAP_CENTER_POINT,
//					zoom : window.MAP_INITIAL_ZOOM,
//					minZoom: window.MAP_MIN_ZOOM,
//			        maxZoom:window.MAP_MAX_ZOOM,
//					container : appConfig.container,
//					ui : {
//						components : [ "attribution" ]
//					},
//					basemap : "streets"
//				});
				
				symbology_layers = new ArcGISDynamicMapServiceLayer(window.INDORE_LAYERS_SYMBOLOGY);
				
				/**
				 * Click Information start
				 */	
				var identifyTask, identifyParams;
				
				/**
				 * MAP ON LOAD
				 */
				
//				map.on("load", initFunc);
//				map.on("load",function(){
//					$("#toggle_map_info").trigger('click');				
//				});
//				map.on("load", function() {
//			          map.on("mouse-move", showCoordinates);
//			          map.on("mouse-drag", showCoordinates);
//			    });
//				map.on("load", createToolbar);
//				
//				map.on('load', function () {
//					legendLayers.push({ layer: symbology_layers, title: "Indore GIS Layers" });
//					
//					var legend = new Legend({
//			            map: map,
//			            layerInfos: legendLayers
//			          }, "legendDiv");
//			          legend.startup();
//			    });
//				
//				map.on("load",function(){
//					let u_id = localStorage.getItem('user_data');
//					if(u_id == undefined || u_id == null || u_id == ""){
//						$u.notify("warning", "Warning","User information not found !");
//						return;
//					}
//					window.department2dMap.getDrawGraphicsByUserId(u_id);
//				});
				
				//restrict user to pan outside indore boundary
				/*map.on('pan-end', function(evt) {
		            if ( !initialExtent.contains(evt.extent) ) {
		                map.setExtent(initialExtent);
		            }
		        });*/
				
				/*
				OPEN LAYER MAP START
				*/
				$("#search_layer").empty().append(
				'<option value="">Select Layer</option>');
				
				$.ajax({
					method : 'GET',
					url : window.iscdl.appData.baseURL + "citizen/layer/getLayerCategoryList",
					contentType : 'application/json',
					async : false,				
					success : function(result) {
						if (!$.isEmptyObject(result) && result != null) {
							try {
								result = JSON.parse(result);
								let str = "";
								if (result.responseCode == '200') {
									let response = result.data;
									if(global.layers == undefined){
										global.layers = response;	
									}
									
									let length = response.length;
									if(length > 0){
										for (let i in response){
											let name = response[i].layer_name;
											let id = response[i].layer_id;
											let swipe_layer = response[i].swipe_layer;
											
											
												str += "<option value='" + id + "'>" + name + "</option>";
											
										}
										$("#search_layer").append(str);
									}
								} else {
									$u.notify('error', 'Notification',
											result.responseMessage, '');
								}
							
							} catch (err) {
								console.log(err);
							}
						} else {
							$u.notify('info', 'Notification',
											'No Data Found', '');
						}
					},
					error : function(e) {
						console.log(e);
					}
				});
				
				
				
				$("#search_layer").change(function(){
					
					$("#layer_value").empty().append(
					'<option value="">Select Value</option>');
					
					var form_data = {
							tableName: $("#search_layer").val()
					}
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/query/getvaluebylayer",
						contentType : 'application/json',
						data: JSON.stringify(form_data),
						async : false,					
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						success : function(result) {
							if (!$.isEmptyObject(result) && result != null) {
								try {
									//result = JSON.parse(result);
									let str = "";
									if (result.responseCode == '200') {
										let response = result.data;
										if(global.layers == undefined){
											global.layers = response;	
										}
										
										let length = response.length;
										if(length > 0){
											for (let i in response){
												let name = response[i].name;												
												let id = response[i].gid;
						
													str += "<option value='" + id + "'>" + name + "</option>";

											}
											$("#layer_value").append(str);
										}
									} else {
										$u.notify('error', 'Notification',
												result.responseMessage, '');
									}
								
								} catch (err) {
									console.log(err);
								}
							} else {
								$u.notify('info', 'Notification',
												'No Data Found', '');
							}
						},
						error : function(e) {
							console.log(e);
						}
					});
					
					
					
					
				});
				
				
				$("#layer_value").change(function(){			
				
					map.removeLayer(vectorLayer);
					var form_data = {
							tableName: $("#search_layer").val(),
							gid: $("#layer_value").val()
					}
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/query/getsearchdata",
						contentType : 'application/json',
						data: JSON.stringify(form_data),
						async : false,					
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						success : function(result) {
							if (!$.isEmptyObject(result) && result != null) {
								try {
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

			                            //map.getView().fit(extent);
			                            map.getView().fit(extent, {"maxZoom":20} );
			                            //map.getView().setZoom(map.getView().getZoom()+1);   

			                            map.addLayer(vectorLayer);
			                            
			                            

			                            console.log(result);
			                        	}
			                        	else{
			                        		$u.notify("error", "Error",
					                        "No Data Found for selected fields");
			                        	}
								
								} catch (err) {
									console.log(err);
								}
							} else {
								$u.notify('info', 'Notification',
												'No Data Found', '');
							}
						},
						error : function(e) {
							console.log(e);
						}
					});
					
					
					
					
				});
				
				
				
				let start_latlong;
				let end_latlong;
				let know_your_coordinate;

				
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
				    view: view
				});
				
				map_layers['OSM'] = osm;
				//console.log(ol.Map.getView().calculateExtent(map.getSize()));
				
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
				
				
				
			    const geolocation = new ol.Geolocation({
			        trackingOptions: {
			          enableHighAccuracy: true,
			        },
			        projection: view.getProjection(),
			      });
			    const accuracyFeature = new ol.Feature();



			      const positionFeature = new ol.Feature();
			positionFeature.setStyle(
			  new ol.style.Style({
			    image: new ol.style.Circle({
			      radius: 6,
			      fill: new ol.style.Fill({
			        color: '#3399CC',
			      }),
			      stroke: new ol.style.Stroke({
			        color: '#fff',
			        width: 2,
			      }),
			    }),
			  })
			);

		      $("#dir_current_latitude").click(function(){
			        geolocation.setTracking(true);
			        
			        
			        get_current_lat_long("source_location");
			        
			      });
			      
			$("#dir_current_longitude").click(function(){
				
				 	geolocation.setTracking(true);
			        
			        
			        get_current_lat_long("destination_location");
				
			});
			
			function get_current_lat_long(selected){
				
				geolocation.on('change:accuracyGeometry', function () {
					  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
					});


					geolocation.on('change:position', function () {
						//start_latlong = geolocation.getPosition();
						//start_latlong = new ol.proj.transform([coordinates[0], coordinates[1]], 'EPSG:4326', 'EPSG:3857');
						
						if(selected == "source_location"){										
							start_latlong = geolocation.getPosition();
							$("#from_loc").val(start_latlong);
						}
						else if(selected == "destination_location"){
							end_latlong = geolocation.getPosition();
							$("#to_loc").val(end_latlong);
						}
						else{
							know_your_coordinate = geolocation.getPosition();
							$("#xy_latitude").val(know_your_coordinate[1]);
							$("#xy_longitude").val(know_your_coordinate[0]);
						}
						
						
					  });
				
			}
//			geolocation.on('change:accuracyGeometry', function () {
//			  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
//			});
//
//
//			geolocation.on('change:position', function () {
//				start_latlong = geolocation.getPosition();
//				//start_latlong = new ol.proj.transform([coordinates[0], coordinates[1]], 'EPSG:4326', 'EPSG:3857');
//			    $("#from_loc").val(start_latlong);
//				
//			  });
				
			var clicked = 0;
//			function get_lat_long_onClick(where){
//				    
//				    if(where == "from"){
//				    	map.on('click', function(evt){
//				    	console.info(evt.pixel);
//					    console.info(map.getPixelFromCoordinate(evt.coordinate));
//					    console.info(ol.proj.toLonLat(evt.coordinate));
//					    start_latlong = ol.proj.toLonLat(evt.coordinate);					    
//					    
//				    	$("#from_loc").val(start_latlong);
//				    	map.un('click');
//				    	});
//				    }
//				    if(where == "to"){
//				    	map.on('click', function(evt){
//				    	console.info(evt.pixel);
//					    console.info(map.getPixelFromCoordinate(evt.coordinate));
//					    console.info(ol.proj.toLonLat(evt.coordinate));
//					    end_latlong = ol.proj.toLonLat(evt.coordinate);
//					    
//					        	
//				    	$("#to_loc").val(end_latlong);
//				    	});
//				    }
//				
//			}
			
			function get_lat_long_onClick(where) {
			    var clickHandler;

			    if (where == "from") {
			        clickHandler = function (evt) {
			            console.info(evt.pixel);
			            console.info(map.getPixelFromCoordinate(evt.coordinate));
			            console.info(ol.proj.toLonLat(evt.coordinate));		           

			            
			            start_latlong = ol.proj.transform(evt.coordinate, 'EPSG:4326', 'EPSG:3857');
			            start_latlong = new ol.proj.transform([start_latlong[0], start_latlong[1]], 'EPSG:3857', 'EPSG:4326');
			            
			            
			            $("#from_loc").val(start_latlong);
			            map.un('click', clickHandler);
			        };
			    }

			    if (where == "to") {
			    	clickHandler = function (evt) {
			    	 console.info(evt.pixel);
			            console.info(map.getPixelFromCoordinate(evt.coordinate));
			            console.info(ol.proj.toLonLat(evt.coordinate));		            

						end_latlong = ol.proj.transform(evt.coordinate, 'EPSG:4326', 'EPSG:3857');
						end_latlong = new ol.proj.transform([end_latlong[0], end_latlong[1]], 'EPSG:3857', 'EPSG:4326');		
			            
						$("#to_loc").val(end_latlong);
			            map.un('click', clickHandler);
			    	}
			    }
			    
			    if(where == "goto_direction"){
			    	clickHandler = function (evt) {
				    	 console.info(evt.pixel);
				            console.info(map.getPixelFromCoordinate(evt.coordinate));
				            console.info(ol.proj.toLonLat(evt.coordinate));		            

				            know_your_coordinate = ol.proj.transform(evt.coordinate, 'EPSG:4326', 'EPSG:3857');
				            know_your_coordinate = new ol.proj.transform([know_your_coordinate[0], know_your_coordinate[1]], 'EPSG:3857', 'EPSG:4326');		
				            
							$("#xy_longitude").val(know_your_coordinate[0]);
							$("#xy_latitude").val(know_your_coordinate[1]);
				            map.un('click', clickHandler);
				    	}
			    }

			    map.once('click', clickHandler);
			}
			
				
				$("#dir_selected_latitude").click(function(){
					
					get_lat_long_onClick("from");
					
				});
				
				$("#dir_selected_long").click(function(){
					
					get_lat_long_onClick("to");
					
				});
				
				
				
				$("#locationApply").click(function(){
					
					console.log(start_latlong);
					console.log(end_latlong);
					
					
				    $.ajax({
				        method: 'GET',
				        url: 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624837d0d92fba7048cd85a8893a7148bfdb&start=' + start_latlong + '&end=' + end_latlong,
				        contentType: 'application/json',
				        async: false,
				        // beforeSend: function (xhr) {
				        //     xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
				        // },
				        success: function (response) {

				            const route = response.features[0];
				            const routeCoordinates = route.geometry.coordinates;
				    
				            const routeFeature = new ol.Feature({
				                type: 'route',
				                geometry: new ol.geom.LineString(routeCoordinates),
				            });
				    
				            const routeLayer = new ol.layer.Vector({
				                source: new ol.source.Vector({
				                	featureProjection: 'EPSG:4326',
				                    features: [routeFeature],
				                }),
				                style: new ol.style.Style({
				                    stroke: new ol.style.Stroke({
				                        width: 6,
				                        color: [40, 40, 40, 0.8],
				                    }),
				                }),
				            });
				    
				            
				            map.addLayer(routeLayer);
				            direction_arr.push(routeLayer);
				    
				            // Fit the map view to the route
				            const extent = routeFeature.getGeometry().getExtent();
				            map.getView().fit(extent, map.getSize());
				           

				        },

				        error: function (e) {
				            console.log(e);
				        }

				    });
					
				});
				
				$("#xy_current_lat").click(function(){
					
					geolocation.setTracking(true);
			        
			        
			        get_current_lat_long("know_your_location");
					
					
				});
				
				$("#xy_selected_lat").click(function(){
					
					get_lat_long_onClick("goto_direction");
					
				});
				
				
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
							
							  const iconFeature = new ol.Feature({
								  geometry: new ol.geom.Point(know_your_coordinate)								  
								});


								const vectorSource = new ol.source.Vector({
								  features: [iconFeature],
								});

								const vectorLayer = new ol.layer.Vector({
								  source: vectorSource,
								  style: location_mark,
								});

							map.addLayer(vectorLayer);
							
							
							map.setView(
							        new ol.View({
							        projection: 'EPSG:4326',									  
							        center: know_your_coordinate,
							        zoom: 18
							    }));
							
						} catch (e) {
							$u.notify("error", "Error",
									"Something went Wrong");
						}
					}
		});
				
				
				/*
				OPEN LAYER MAP END
				*/
				
				
				/**
				 * Click Information start
				 */
				
				function mapReady () {
					  map_selection =  map.on("click", executeIdentifyTask);
					  /*map_hover = map.on("mouse-move", function(evt) {
						  if(map.infoWindow.isShowing == true){
								return;
							}else{
								setTimeout(function() {
							          if (lastState == evt.mapPoint) {
							        	  mouseHoverFeature(evt.mapPoint);
							          }
							        }, 4000);
							        lastState = evt.mapPoint;
							}
						});*/ 
  		        }
				
				function infoToolSetup(){
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
							//map_hover.remove();
						}
					}
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
					mouseHoverFeature(event.mapPoint);
		        }
				
				/**
				 * Click Information end
				 */
				
				function mouseHoverFeature(mapPoint){
					
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
							
							let administrative = window.DEPARTMENT_ADMINISTRATIVE_BOUNDARY;
							let environment = window.DEPARTMENT_ENVIRONMENT_BOUNDARY;
							let city_amenties = window.DEPARTMENT_CITY_AMENITIES_BOUNDARY;
							let town_country = window.DEPARTMENT_TOWN_COUNTRY_BOUNDARY;
							
							let removeItems = [administrative,environment,city_amenties,town_country];
							
							visible_layers = $.grep(visible_layers, function(value) {
								  return value != removeItems[0] && value != removeItems[1] && value != removeItems[2] && value != removeItems[3] ;
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
							
							let attribute_editing_content = '<table class="table table-bordered w-100 map-detail-custom">' +
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
								
								if(key == "objectid" || key == "objectid_1" || key == "OBJECTID" || key == "OBJECTID_1"){
									continue;
								}
								
								let columnName = window.department2dMap.getFeatureColumnName(key);
								
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
									attribute_editing_content += '<tr><td><b>'+columnName+'</b></td><td><input type="text" value='+content+'/></td></tr>';
								}else{
									table_content += '<tr><td><b>'+columnName+'</b></td><td>'+attr+'</td></tr>';
									attribute_editing_content += '<tr><td><b>'+columnName+'</b></td><td><input type="text" value='+attr+'/></td></tr>';
								}
							}
							
							template_content += table_content + '</tbody></table>';
							
							
//							var editAttribute = '<a href="#" id="attributeEditingModal" data-toggle="modal" style="float: right; font-size:14px; font-weight: bold; " data-target="#exampleModal">Edit</a>';
//							template_content += editAttribute; 
							
							
							var featureTemplate = new InfoTemplate(layerName,template_content);
			                  feature.setInfoTemplate(featureTemplate);
			                  return feature;
			              });
			            });
			          map.infoWindow.setFeatures([deferred]);
			          map.infoWindow.show(mapPoint);
				}
				
				
				
				/**
				 * WIDGET START
				 */
				
				//map.addLayer(symbology_layers);
				
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
		          
		        //2017
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
		      	  
		          
		          var customBasemap = new Basemap({  
		            layers: [

		            	Pocket_1_Ortho_Part_25_layers,
		            	Pocket_1_Ortho_Part_6_layers,Pocket_1_Ortho_Part_4_2_layers,
		            	Pocket_1_Ortho_Part_26_layers,
		            	Pocket_1_Ortho_Part_24_layers,Pocket_1_Ortho_Part_23_layers,
		            	Pocket_1_Ortho_Part_22_layers,Pocket_1_Ortho_Part_21_layers,
		            	Pocket_1_Ortho_Part_20_layers,Pocket_1_Ortho_Part_19_layers,
		            	Pocket_1_Ortho_Part_18_layers,Pocket_1_Ortho_Part_17_layers,
		            	Pocket_1_Ortho_Part_5_layers,Pocket_1_Ortho_Part_16_layers,
		            	Pocket_1_Ortho_Part_14_layers,Pocket_1_Ortho_Part_12_layers,
		            	Pocket_1_Ortho_Part_10_layers,Pocket_1_Ortho_Part_9_layers,
		            	Pocket_1_Ortho_Part_8_layers,Pocket_1_Ortho_Part_7_layers,
		            	Pocket_1_Ortho_Part_11_layers,Pocket_1_Ortho_Part_15_layers,
		            	Pocket_1_Ortho_Part_27_layers,Pocket_1_Ortho_Part_28_layers,
		            	Pocket_1_Ortho_Part_32_layers,Pocket_1_Ortho_Part_4_1_layers,
		            	Pocket_1_Ortho_Part_3_layers,Pocket_1_Ortho_Part_2_layers,
		            	Pocket_1_Ortho_Part_1_layers,Pocket_1_Ortho_Part_31_layers,
						],  
		            title: "ISCDL Drone Image 2020",  
		            thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/thumbnail1591224931210.jpeg"  
		          });
		          
		          var image2015Basemap = new Basemap({
		        	  layers: [tiled_image_2015],  
			            title: "ISCDL Satellite Image 2015",  
			            //thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite-Image-10.svg"
			            thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite_Image_2.png"
		          });
		          
		          var image2017Basemap = new Basemap({
		        	  layers: [iscdl_sat_image_2017_1,iscdl_sat_image_2017_2,iscdl_sat_image_2017_3,
		        		  iscdl_sat_image_2017_4,iscdl_sat_image_2017_5,iscdl_sat_image_2017_6,
		        		  iscdl_sat_image_2017_7,iscdl_sat_image_2017_8,iscdl_sat_image_2017_9,
		        		  iscdl_sat_image_2017_10,iscdl_sat_image_2017_11,iscdl_sat_image_2017_12],  
			            title: "ISCDL Satellite Image 2017",  
			            thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/Satellite_Image_2.png"
		          });
		          
		          
		          basemaps.push(customBasemap); 
		          basemaps.push(image2015Basemap);
		          basemaps.push(image2017Basemap);
		          //basemaps.push(abdAreaOrthoBasemap); 
		          
		          var noBasemap = new Basemap({
		        	    layers: [noBasemapLayer],
		        	    title: "No Basemap",
		        	    thumbnailUrl: window.iscdl.appData.webURLPrefix + "images/No_Basemap_1.png"
		        	    
		          });
		          
		          var hybridBasemap = new Basemap({
		        	    layers: [hybridLayer],
		        	    title: "Hybrid",
		        	    thumbnailUrl:"https://www.arcgis.com/sharing/rest/content/items/2660b09ebb9f4b24b0c61cf2383d64f9/info/thumbnail/imagery_hybrid_in.jpg"
		          });
		          
		          var streetLayerBasemap = new Basemap({
		        	    layers: [streetLayer],
		        	    title: "Street",
		        	    thumbnailUrl:"https://www.arcgis.com/sharing/rest/content/items/8d937fe6577d410a888df4fd50b45042/info/thumbnail/streets_in.jpg"
		          });
		          
		          	          
		          basemaps.push(hybridBasemap);
		          //basemaps.push(darkGrayBasemap);
		          //basemaps.push(grayLayerBasemap);
		         // basemaps.push(oceanLayerBasemap);
		          basemaps.push(streetLayerBasemap);
		          //basemaps.push(terrainLayerBasemap);
		         // basemaps.push(topoLayerBasemap);
		          basemaps.push(noBasemap);
				*/
		          
				
				// basemap gallery widget
//				var basemapGallery = new BasemapGallery({
//					showArcGISBasemaps : false,
//					basemaps: basemaps,
//					map : map,
//
//				}, "basemapGalleryDiv");
//				basemapGallery.startup();
//
//				basemapGallery.on("error", function(msg) {
//					console.log("basemap gallery error:  ", msg);
//				});
				
				// swipe layer
				layerSwipe = new LayerSwipe({
				    type: "vertical",
				    top: 250,
				    map: map,
				    layers: []
				  }, "swipeDiv");
				
				
				// search widget
				var search = new Search({
					map : map,
					//sources: [],
					//enableSearchingAll : false
				}, "searchDiv");
				
				
				/* for layer wise advanced search */
				var sources = search.get("sources");
				
				if(sources.length > 0){
					//sources[0].useMapExtent = true;
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
				
				//modifiedSources.push(firstSource);
				search.set("sources", modifiedSources);
				//search.set("sources", sources);
				
				search.startup();
				
				// measurement
				var pms = new esri.symbol.PictureMarkerSymbol("",
						24, 24);
				pms.setOffset(9, 11);
				var sls = new esri.symbol.SimpleLineSymbol(
						esri.symbol.SimpleLineSymbol.STYLE_DOT, new dojo.Color([
								255, 0, 0, 0.55 ]), 4);
//				var measurement = new Measurement({
//					map : map,
////					lineSymbol : sls,
////					pointSymbol : pms
//				}, dojo.byId('measurementDiv'));
//				measurement.startup();
				
				let areaUnitStrings = ["Acres", "Sq Miles", "Sq Kilometers", "Hectares", "Sq Yards", "Sq Feet", "Sq Meters"];
				let _areaUnitStringsLong = ["esriAcres", "esriSquareMiles", "esriSquareKilometers", 
					"esriHectares", "esriSquareYards", "esriSquareFeet","esriSquareMeters"];
				
				let distanceUnitStrings= ["Miles", "Kilometers", "Feet","Meters", "Yards"];
				let distanceUnitStringsLong= ["esriMiles", "esriKilometers", "esriFeet","esriMeters", "esriYards"];
				
//				measurement._areaUnitStrings = areaUnitStrings;
//				measurement._areaUnitStringsLong = _areaUnitStringsLong;
//				
//				measurement._distanceUnitStrings = distanceUnitStrings;
//				measurement._distanceUnitStringsLong = distanceUnitStringsLong;
//				
//				measurement.on("measure-start", function(evt){
//					map.setMapCursor("crosshair");
//				});
//				
//				measurement.on("tool-change", function(evt){
//					map.setMapCursor("crosshair");
//				});
				
				
				/**
				 * scalebar widget
				 */
				
//				var scalebar = new Scalebar({
//			        map: map,
//			        scalebarUnit: "dual",
//			        attachTo: "bottom-right"
//			    });
				
				
				/**
				 * WIDGET END
				 */
				
				
				/**
				 * BOTTOM ITEMS CLICK EVENT START
				 */

				 // home button click event
				$('#myHomeDiv').click(function() {
					if (map != null || map != undefined) {
						map.setExtent(initialExtent);
					}
				});
				
				// Find my location
				$('#locateDiv').click(function() {
							window.department2dMap.checkForLocate(_current_long,_current_lat);
				});
				
				/**
				 * BOTTOM ITEMS CLICK EVENT END
				 */
				
				// share click event
				$('#map_share').click(function() {

							$('#sharelinktxt').val("");

							let current_extent = map.getView().calculateExtent(map.getSize());

							let xmin = current_extent[0];
							let ymin = current_extent[1];
							let xmax = current_extent[2];
							let ymax = current_extent[3];
							
							
							let pmin = new Point([ current_extent[0],current_extent[1]]);
							let pmax = new Point([ current_extent[2],current_extent[3]]);

							/*
							let mpmin = webMercatorUtils.webMercatorToGeographic(pmin);
							let mpmax = webMercatorUtils.webMercatorToGeographic(pmax);

							localStorage.setItem("xmin", mpmin.x);
							localStorage.setItem("ymin", mpmin.y);
							localStorage.setItem("xmax", mpmax.x);
							localStorage.setItem("ymax", mpmax.y);
							localStorage.setItem("spatialReference",mpmin.spatialReference.wkid);
							*/
							
							let browserUrl = document.location.href;
							/*
							let xmin = current_extent.xmin;
							let ymin = current_extent.ymin;
							let xmax = current_extent.xmax;
							let ymax = current_extent.ymax;
							*/
							
							let finalurl = browserUrl
							$('#sharelinktxt').val(finalurl);
						});
				
				
				/**
				 * BOTTOM ITEMS CLICK EVENT END
				 */
				
				
				
				/**
				 * LEFT ITEMS CLICK EVENT START
				 */
				
			$("#dep_query_popup").click(function(){
				
				$('#form_basic_query').trigger('reset');
				window.depUtlityController.removeError('form_basic_query');
				
				$('#form_advanced_query').trigger('reset');
				window.depUtlityController.removeError('form_advanced_query');
				
				$('#form_spatial_query').trigger('reset');
				window.depUtlityController.removeError('form_spatial_query');
				$("#department_queries_rslt").html("");
			});
			
			$("#basic_query_tab").click(function(){
				$('#bas_field').empty().append('<option value="">Select Field</option>');
				$('#bas_value').empty().append('<option value="">Select Value</option>');
				
				$('#form_basic_query').trigger('reset');
				window.depUtlityController.removeError('form_basic_query');
				$("#department_queries_rslt").html("");
			});
			
			$("#advanced_query_tab").click(function(){
				window.department2dMap.resetQueryFilter();
				$('#form_advanced_query').trigger('reset');
				window.depUtlityController.removeError('form_advanced_query');
				$("#department_queries_rslt").html("");
			});

			$("#spatial_query_tab").click(function(){
				$('#form_spatial_query').trigger('reset');
				window.depUtlityController.removeError('form_spatial_query');
				$("#department_queries_rslt").html("");
			});
			
			// advanced query plus button click event
			$(".add_field_button").click(function(){
				let l_id = $('#advanced_layer').val();
				if(l_id && l_id != ""){
					let layer_url = window.layerDataController.getLayerById(l_id);	
					getAdvancedQueryLayerAttributes(layer_url);
				}
			});
			
			// advanced query minus button click event
			$('.remove_field').click(function(){
				let div = $(this).parent('div');
				$(div).empty();
			});
			
				
				/**
				 * draw tool start
				 */
				var t_name;
				let draw = null;
				var vector_arr = [];
				var draw_rectangle_layer;
				
//				var style = new ol.style.Style({
//				    stroke: new Stroke({
//				        color: 'blue',
//				        width: $("#c_b_width").val(),
//				      }),
//				});
				
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
			            //style: styles,
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
			            //style: styles,
			        });

			        vector_arr.push(vector);
			        //vector_arr.push(vector);
			        if (value !== 'None') {
			        	draw = new ol.interaction.Draw({
			                source: source,
			                type: /** @type {ol.geom.GeometryType} */ (selecte_type)
			            });
			            map.addInteraction(draw);
			            //var feature;
			            draw.on("drawend", function (e) {
			                var writer = new ol.format.GeoJSON();
			               
			            });
			            map.addLayer(vector);
			           
			        }
			    }
				
				//clear draw graphics
				
				$("#clear_draw_graphics").click(function(){
//					map.graphics.clear();
//					
//					// for draw deactive
//					if(toolbar){
//						toolbar.deactivate();
//					}
//					
//					$("#tool_text").val("");
//					$('.draw-tools-select li a').removeClass('active');
//					$("#lblDrawTxt").text("");
					
					map.removeInteraction(draw);
			        map.removeInteraction(draw_rectangle_layer);
			        for (var i = 0; i < vector_arr.length; i++) {
			            map.removeLayer(vector_arr[i]);
			        }
			        draw_ploygons("None");
				});

				
				const typeSelect = document.getElementById('type');
				const showSegments = document.getElementById('segments');
				const clearPrevious = document.getElementById('clear');
				
				const style = new ol.style.Style({
					  fill: new ol.style.Fill({
					    color: 'rgba(255, 255, 255, 0.2)',
					  }),
					  stroke: new ol.style.Stroke({
						    color: 'rgba(255,0,0,3)',
						    lineDash: [10, 10],
						    width: 2,
						  }),
					});

					const labelStyle = new ol.style.Style({
					  text: new ol.style.Text({
					    font: '14px Calibri,sans-serif',
					    fill: new ol.style.Fill({
					      color: 'rgba(255, 255, 255, 1)',
					    }),
					    backgroundFill: new ol.style.Fill({
					      color: 'rgba(0, 0, 0, 0.7)',
					    }),
					    padding: [3, 3, 3, 3],
					    textBaseline: 'bottom',
					    offsetY: -15,
					  }),
					  image: new ol.style.RegularShape({
					    radius: 8,
					    points: 3,
					    angle: Math.PI,
					    displacement: [0, 10],
					    fill: new ol.style.Fill({
					      color: 'rgba(0, 0, 0, 0.7)',
					    }),
					  }),
					});

					const tipStyle = new ol.style.Style({
					  text: new ol.style.Text({
					    font: '12px Calibri,sans-serif',
					    fill: new ol.style.Fill({
					      color: 'rgba(255, 255, 255, 1)',
					    }),
					    backgroundFill: new ol.style.Fill({
					      color: 'rgba(0, 0, 0, 0.4)',
					    }),
					    padding: [2, 2, 2, 2],
					    textAlign: 'left',
					    offsetX: 15,
					  }),
					});

					const modifyStyle = new ol.style.Style({
					  text: new ol.style.Text({
					    text: 'Drag to modify',
					    font: '12px Calibri,sans-serif',
					    fill: new ol.style.Fill({
					      color: 'rgba(255, 255, 255, 1)',
					    }),
					    backgroundFill: new ol.style.Fill({
					      color: 'rgba(0, 0, 0, 0.7)',
					    }),
					    padding: [2, 2, 2, 2],
					    textAlign: 'left',
					    offsetX: 15,
					  }),
					});

					const segmentStyle = new ol.style.Style({
					  text: new ol.style.Text({
					    font: '12px Calibri,sans-serif',
					    fill: new ol.style.Fill({
					      color: 'rgba(255, 255, 255, 1)',
					    }),
					    backgroundFill: new ol.style.Fill({
					      color: 'rgba(0, 0, 0, 0.4)',
					    }),
					    padding: [2, 2, 2, 2],
					    textBaseline: 'bottom',
					    offsetY: -12,
					  }),
					  image: new ol.style.RegularShape({
					    radius: 6,
					    points: 3,
					    angle: Math.PI,
					    displacement: [0, 8],
					    fill: new ol.style.Fill({
					      color: 'rgba(0, 0, 0, 0.4)',
					    }),
					  }),
					});

					const segmentStyles = [segmentStyle];

					const formatLength = function (line) {
					  const length = ol.sphere.getLength(line);
					  let output;
					  if (length > 100) {
					    output = Math.round((length / 1000) * 100) / 100 + ' km';
					  } else {
					    output = Math.round(length * 100) / 100 + ' m';
					  }
					  return output;
					};

					const formatArea = function (polygon) {
					  const area = ol.sphere.getArea(polygon);
					  let output;
					  if (area > 10000) {
					    output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
					  } else {
					    output = Math.round(area * 100) / 100 + ' m\xB2';
					  }
					  return output;
					};

					const raster = new ol.layer.Tile({
					  source: new ol.source.OSM(),
					});

					const source = new ol.source.Vector();

					const modify = new ol.interaction.Modify({source: source, style: modifyStyle});

					let tipPoint;

					function styleFunction(feature, segments, drawType, tip) {
					  const styles = [];
					  const geometry = feature.getGeometry();
					  const type = geometry.getType();
					  let point, label, line;
					  if (!drawType || drawType === type || type === 'Point') {
					    styles.push(style);
					    if (type === 'Polygon') {
					      point = geometry.getInteriorPoint();
					      label = formatArea(geometry);
					      line = new ol.geom.LineString(geometry.getCoordinates()[0]);
					    } else if (type === 'LineString') {
					      point = new ol.geom.Point(geometry.getLastCoordinate());
					      label = formatLength(geometry);
					      line = geometry;
					    }
					  }
					  if (segments && line) {
					    let count = 0;
					    line.forEachSegment(function (a, b) {
					      const segment = new ol.geom.LineString([a, b]);
					      const label = formatLength(segment);
					      if (segmentStyles.length - 1 < count) {
					        segmentStyles.push(segmentStyle.clone());
					      }
					      const segmentPoint = new ol.geom.Point(segment.getCoordinateAt(0.5));
					      segmentStyles[count].setGeometry(segmentPoint);
					      segmentStyles[count].getText().setText(label);
					      styles.push(segmentStyles[count]);
					      count++;
					    });
					  }
					  if (label) {
					    labelStyle.setGeometry(point);
					    labelStyle.getText().setText(label);
					    styles.push(labelStyle);
					  }
					  if (
					    tip &&
					    type === 'Point' &&
					    !modify.getOverlay().getSource().getFeatures().length
					  ) {
					    tipPoint = geometry;
					    tipStyle.getText().setText(tip);
					    styles.push(tipStyle);
					  }
					  return styles;
					}

					const vector = new ol.layer.Vector({
					  source: source,
					  style: function (feature) {
					    return styleFunction(feature, showSegments.checked);
					  },
					});

					map.addLayer(vector);
					map.addInteraction(modify);					

					function addInteraction() {
					  const drawType = typeSelect.value;;
					  const activeTip =
					    'Click to continue drawing the ' +
					    (drawType === 'Polygon' ? 'polygon' : 'line');
					  const idleTip = 'Click to start measuring';
					  let tip = idleTip;
					  draw = new ol.interaction.Draw({
					    source: source,
					    type: drawType,
					    style: function (feature) {
					      return styleFunction(feature, showSegments.checked, drawType, tip);
					    },
					  });
					  draw.on('drawstart', function () {
					    if (clearPrevious.checked) {
					      source.clear();
					    }
					    modify.setActive(false);
					    tip = activeTip;
					  });
					  draw.on('drawend', function () {
					    modifyStyle.setGeometry(tipPoint);
					    modify.setActive(true);
					    map.once('pointermove', function () {
					      modifyStyle.setGeometry();
					    });
					    tip = idleTip;
					  });
					  modify.setActive(true);
					  map.addInteraction(draw);
					}


					typeSelect.onchange = function () {
					    map.removeInteraction(draw);
					    addInteraction();
					  };
					  
					  //addInteraction();
					  
					  showSegments.onchange = function () {
					    vector.changed();
					    draw.getOverlay().changed();
					  };

				
				function createToolbar(themap) {
					toolbar = new Draw(map);
					toolbar.on("draw-end", addToMap);
				}

				function addToMap(evt) {
					if(map_selection){
						map_selection.remove();	
						//map_hover.remove();
					}
					
					var symbol;
					let stroke_color;
					let fill_color;
					let border_width;
					
					toolbar.deactivate();
					map.showZoomSlider();

					// check for zoom in or zoom out tool active if active then return
					if(zoom_out_box_tool || zoom_box_tool){
						return;
					}
					
					switch (evt.geometry.type) {
					case "point":
					case "multipoint":
						symbol = new SimpleMarkerSymbol();
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
						
						if(t_name == undefined){
							symbol = new SimpleFillSymbol();
						}else{
							symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
									new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
											new Color(stroke_color), border_width),
									new Color(fill_color));
						}
						
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
					/*if(map_info_tool){
						mapReady();	
					}*/
					map_info_tool = false;
					infoToolSetup();
				}
				
			
				/**
				 * draw tool end
				 */
				
				/**
				 * form validation start
				 */
				
				// numeric value validator
				$.validator.addMethod('numericVal', function(value, element) {
					return /^[0-9]*\.?[0-9]*$/.test(value);
				}, "Please enter numeric value");
				
				
				$("#xy_selected_longitude").click(
						function() {
							map.setMapCursor("crosshair");
							if(map_selection){
								map_selection.remove();	
								//map_hover.remove();
							}
							mapClickEvtHandler = map.on("click", function(evt) {
								let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
								window.department2dMap.checkSelectedlocationWithinBoundry(mp.x,mp.y,
										'xy_latitude','xy_latitude-error',
										'xy_longitude','xy_longitude-error');
							});
				});
//				$("#xy_selected_lat").click(function() {
//							map.setMapCursor("crosshair");
//							if(map_selection){
//								map_selection.remove();	
//								//map_hover.remove();
//							}
//							mapClickEvtHandler = map.on("click", function(evt) {
//								let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
//								window.department2dMap.checkSelectedlocationWithinBoundry(mp.x,mp.y,
//										'xy_latitude','xy_latitude-error',
//										'xy_longitude','xy_longitude-error');
//							});
//				});

//				$('#xy_current_lat').click(function() {
//							window.department2dMap.checkCurrentlocationWithinBoundry(_current_long,_current_lat,
//									'xy_latitude','xy_latitude-error',
//									'xy_longitude','xy_longitude-error');
//				});
//
//				$('#xy_current_longitude').click(function() {
//							window.department2dMap.checkCurrentlocationWithinBoundry(_current_long,_current_lat,
//									'xy_latitude','xy_latitude-error',
//									'xy_longitude','xy_longitude-error');
//				});
				
				//form swipe layer
//				$('form[id="form_swipe_layer"]')
//				.validate(
//						{
//							rules : {
//								swipe_layer_select : {
//									required : true,
//								}
//							},
//							messages : {
//								swipe_layer_select : {
//									required : "Please Select Layer",
//								}
//							},
//							submitHandler : function(form, e) {
//								e.preventDefault();
//								try {
//									
//									removeSwipeLayer();
//									let layer_id = $("#swipe_layer_select").val();
//									if(layer_id){
//										$(".loader").fadeIn();
//										let url = window.layerDataController.getLayerById(layer_id);
//										swipe_layer_obj = new FeatureLayer(url);
//										layerSwipe.layers = [swipe_layer_obj];
//										map.addLayer(swipe_layer_obj);
//										layerSwipe.startup();
//										layerSwipe.enable();
//										
//										layerSwipe.on("load",function(){
//											$(".loader").fadeOut();	
//											window.depUtlityController.minimizePopup();
//										});
//									}
//								} catch (e) {
//									console.log(e);
//									$(".loader").fadeOut();
//									$u.notify("error", "Error","Something Happend Wrong");
//								}
//							}
//				});
				
				let swipe_layer = null;
				const swipe = document.getElementById('swipe');
				
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
									$("#swipeDiv").css("display", "block");
									const swipe = document.getElementById('swipe');
									swipe.addEventListener('input', function () {
										  map.render();
										});
									map.removeLayer(swipe_layer);
									swipe_layer = new ol.layer.Tile({					 
									      source: new ol.source.TileWMS({
									    	  opacity: 0.5,
							                 url: "https://apagri.infinium.management/geoserver/iscdl/wms?",
							                 params: { 'LAYERS': $("#swipe_layer_select").val(), 'TILED': true},
							                 serverType: 'geoserver',		                 
							                 transition: 0,
							                 style: styles,
							              })
									  });
																		
									map.addLayer(swipe_layer);								
									
									

									swipe_layer.on('prerender', function (event) {
										 const ctx = event.context;
							                const mapSize = map.getSize();
							                const width = mapSize[0] * (swipe.value / 100);
							                ctx.save();
							                ctx.beginPath();
							                ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
							                ctx.clip();
									});

									swipe_layer.on('postrender', function (event) {
									  const ctx = event.context;
									  ctx.restore();
									});


									
									
									}
								
							catch (e) {
									console.log(e);
									$(".loader").fadeOut();
									$u.notify("error", "Error","Something Happend Wrong");
								}
							}
				});

				
				$("#clear_swipe_layer").click(function(){
					//removeSwipeLayer();
					map.removeLayer(swipe_layer);
				});
				
				/**
				 * Form heat map analysis
				 */
				
				$('form[id="form_heat_map_analysis"]')
				.validate(
						{
							rules : {
								heat_map_category : "required",
								
							},
							messages : {
								heat_map_category : {
									required : "Please Select Category Name"
								}
							},
							submitHandler : function(form, e) {
								e.preventDefault();
								try {
									window.department2dMap.removeHeatmapLayer();
									let category_id = $("#heat_map_category").val();
									let criteria_value = $('input[name="healtmap_criteria_name"]:checked').val();
									
									if(criteria_value == undefined || criteria_value == null || criteria_value == ""){
										$u.notify("warning", "Warning","Criteria not found for selected category");
										return;
									}
									window.department2dMap.generateHeatMap(category_id,criteria_value);
								} catch (e) {
									$u.notify("error", "Error",
											"Something went wrong");
								}
							}
						});
				
				/**
				 * clear heat map
				 */
				
				$("#heat_map_data_clear").click(function(){
					$('#form_heat_map_analysis').trigger('reset');
					$("#heat_map_criteria").html("");
					$("#heatmap_legend").hide();
					window.depUtlityController.removeError('form_heat_map_analysis');
					window.department2dMap.removeHeatmapLayer();
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
									}
								} catch (e) {
									 $u.notify("error", "Error","Something Happend Wrong");
								}
							}
				});
				
				$("#custom_scale_reset").click(function(){
					window.depUtlityController.removeError('form_custom_scale');
					map.setExtent(initialExtent);
				});
				
				
				
				// go to X-Y coordinates
//				$('form[id="frm_to_location"]').validate({
//							rules : {
//								xy_latitude : {
//									required : true,
//									numericVal : true,
//								},
//								xy_longitude :{ 
//								required : true,
//								numericVal : true,
//								},
//							},
//							messages : {
//								xy_latitude : {
//									required : "Please Enter Latitude",
//									numericVal : "Please Enter Numeric Value",
//								},
//								xy_longitude : {
//									required : "Please Enter Longitude",
//									numericVal : "Please Enter Numeric Value",
//								},
//							},
//							submitHandler : function(form, e) {
//								e.preventDefault();
//								try {
//									let latitude = $('#xy_latitude').val();
//									let longitude = $('#xy_longitude').val();
//									let pt = new Point(longitude,latitude);
//									let pictureMarkerSymbol = new PictureMarkerSymbol('images/pin.png', 25, 25);
//									let graphic = new Graphic(pt, pictureMarkerSymbol);
//									map.graphics.add(graphic);
//									
//									let template_content = "";					
//									let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
//									  '<tbody>';
//									table_content += '<tr><td><b>Latitude</b></td><td>'+latitude+'</td></tr>' + 
//									'<tr><td><b>Longitude</b></td><td>'+longitude+'</td></tr>';
//									template_content += table_content + '</tbody></table>';
//									
//									let xy_infoTemplate = new InfoTemplate("Know Your Coordinates",template_content);
//									graphic.setGeometry(pt);
//									graphic.setInfoTemplate(xy_infoTemplate);
//									map.centerAndZoom(pt, 18);
//									removeCursor();
//									window.depUtlityController.minimizePopup();
//								} catch (e) {
//									$u.notify("error", "Error",
//											"Something went Wrong");
//								}
//							}
//				});
				
				// clear xy location event with default extent
				$('#xyLocationClr').click(function(){
//					map.graphics.clear();
//					map.setExtent(initialExtent);
//					
//					if (mapClickEvtHandler != undefined) {
//						mapClickEvtHandler.remove();
//						map.setMapCursor("default");
//					}
//					//mapReady();
//					map_info_tool = false;
//					infoToolSetup();
				});

				//clear incident issues
				$('#clr_incident_issues').click(function(){
					$("#incident_rslt").html("");
					map.removeLayer(resultedFeaturesLayer);
					$('#form_incident_issues').trigger('reset');
					window.depUtlityController.removeError('form_incident_issues');
					
					map.graphics.clear();
					map.setExtent(initialExtent);
				});
				
				// form indore 311

				$('form[id="form_imc_indore311"]')
				.validate(
						{
							rules : {
								indore_311_from_date : {
									required : true,
								},
								indore_311_to_date : {
									required : true,
								},
								imc_indore311_ward : {
									required  : true,
									dropDownValidation : true
								}
							},
							messages : {
								indore_311_from_date : {
									required : "Please Select From Date",
								},
								indore_311_to_date : {
									required : "Please Select To Date",
								},
								imc_indore311_ward : {
									required  : "Please Select Ward",
									dropDownValidation : "Please Select Ward"
								}
							},
							submitHandler : function(form, e) {
								e.preventDefault();
									try {
										$("#imc_indore311_rslt").html("");
										map.graphics.clear();
										
										let from_date = $("#indore_311_from_date").val();
										let to_date = $("#indore_311_to_date").val();
										let ward_id = $("#imc_indore311_ward").val();
										
										if(from_date> to_date)
									    {
											$u.notify('info', 'Notification',
													'Please ensure that the End Date is greater than or equal to the Start Date', '');
									    	return false;
									    }
										
										$(".loader").fadeIn();
										
										$.ajax({
											method : 'GET',
											url : "https://capi.everythingcivic.com//api/v1/issues/get_transactional_data?app_id=56ffa1d228ebee7744041534" +
													"&api_key=g9d54312a5c53ce30738dcd8838c5128&start_date="+from_date+"&end_date="+to_date+"&page=1",
											success : function(result) {
												if (!$.isEmptyObject(result) && result != null) {
													try {
														if(result.success){
															let result_record = [];
															var ward_wise_issue = $.grep(result.issues, function(v) {
																if(v.ward_name != null){
																	if(v.ward_name.split("-").length == 2){
																		return v.ward_name.split("-")[1] == ward_id;	
																	}
																}
															});
															
															if(ward_wise_issue.length != 0){
																result_record.push(ward_wise_issue);	
															}
															
															let total_pages = result.total_pages;
															for(let i = 2 ;i<=total_pages;i++){
																let result_by_day = window.department2dMap.getIndore311Result(from_date,to_date,i);
																let data = JSON.parse(result_by_day.responseText);
																let ward_day_wise_issue;
																if(data.success){
																	ward_day_wise_issue = $.grep(data.issues, function(v) {
																		if(v.ward_name != null){
																			if(v.ward_name.split("-").length == 2){
																				return v.ward_name.split("-")[1] == ward_id;	
																			}
																		}
																	});
																	if(ward_day_wise_issue.length != 0){
																		result_record.push(ward_day_wise_issue);	
																	}
																}
															}
															
															if(result_record.length == 0){
																$(".loader").fadeOut();
																$u.notify('info', 'Notification',
																		'Data not available', '');
															}else{
																window.department2dMap.bindIndore311Result(result_record);
																$(".loader").fadeOut();
															}
														}
													} catch (err) {
														console.log(err);
														$(".loader").fadeOut();
													}
												} else {
													$u.notify('info', 'Notification',
															'Data not available', '');
													$(".loader").fadeOut();
												}
											},
											error : function(e) {
												console.log(e);
												$(".loader").fadeOut();
											}
										});
									} catch (e) {
										 $(".loader").fadeOut();
										 $u.notify("error", "Error","Something Happend Wrong");
									}
								
							}
						});
				
				$('#clear_indore_311_event').click(function(){
					$("#imc_indore311_rslt").html("");
					map.graphics.clear();
					map.setExtent(initialExtent);
				});
			
				// change password -> new password validator
				$.validator.addMethod('pwdVal', function(value, element) {
					return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
				}, "Password must contain one number, one Uppercase letter, one Lowercase letter and at least 8 characters");
				
				// change password -> current and new password validator
				$.validator.addMethod('diffVal', function(value, element) {
					return $("#chng_password").val() !== $("#new_password").val();
				}, "New password should not be same as Current password");
				
				/**
				 * change password form
				 */
				$('form[id="form_changePassword"]')
						.validate(
								{
									rules : {
										chng_password : {
											required: true,
											diffVal: true
										},
										new_password : {
											required: true,
											diffVal: true,
											pwdVal: true
										},
										confirm_password : {
											required: true,
											equalTo: "#new_password"
										}
									},
									messages : {
										chng_password : {
											required : "Please Enter Password",
											diffVal: "New Password Should Not Be Same As Current Password"
										},
										new_password : {
											required : "Please Enter New Password",
											pwdVal: "Password Must Contain One Number, One Uppercase Letter, One Lowercase Letter and At Least 8 Characters",
											diffVal: "New Password Should Not Be Same As Current Password"
										},
										confirm_password : {
											required : "Please Confirm New Password",
											equalTo: "New Password and Confirm Password Should Be Same"
										}
									},
									submitHandler : function(form, e) {
										e.preventDefault();
										try {
											let password = $('#chng_password').val();
											let new_password = $('#new_password').val();
											let user_id = localStorage.getItem("user_data");
			    							if(!user_id || user_id === null){
			    								$u.notify("warning", "Warning","User information not found !");
												return false;
			    							}
			    							let obj = {password: password, newPassword: new_password, userId : user_id};

			    							window.depUtlityController.changePassword(obj);
										
// $('#form_changePassword').trigger('reset');
											window.depUtlityController.removeError('form_changePassword');
										
										} catch (e) {
											$u.notify("error", "Error",
													"Something went wrong");
										}
									}
								});
				
				
				
				// From To Location form
				$('form[id="form_direction"]')
				.validate(
						{
							rules : {
								from_loc : {
									required : true,
									// numericVal : true
								},
								to_loc : {
									required : true,
									// numericVal : true
								}, 
							},
							messages : {
								from_loc : {
									required : "Please Select Source Location",
									// numericVal : "Please enter numeric value"
								},
								to_loc : {
									required : "Please Select Destination Location",
									// numericVal : "Please enter numeric value"
								}
							},
							submitHandler : function(form, e) {
								e.preventDefault();
								try {
									$("#total_distance").text("");
									window.department2dMap.removeDirectionGraphics();
									
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
									window.department2dMap.getDirection(source_p,dest_p);
								} catch (e) {
									 $(".loader").fadeOut();
									 $("#total_distance").text("");
									 window.department2dMap.removeDirectionGraphics();
									 $u.notify("error", "Error","Something Happend Wrong");
								}
							}
						});
				
				/**
				 * clear direction
				 */
				$('#locationClr').click(function(){
//					if(gLayer){
//						map.removeLayer(gLayer);
//						map.graphics.clear();
//						map.setExtent(initialExtent);
//						window.department2dMap.removeDirectionGraphics();
//						if (mapClickEvtHandler != undefined) {
//							mapClickEvtHandler.remove();
//							map.setMapCursor("default");
//						}
//						//mapReady();
//						map_info_tool = false;
//						infoToolSetup();
//						
//						$('#from_loc').val("");
//						$('#to_loc').val("");
//					}
//					
//					if(dirgdLayer){
//						map.removeLayer(dirgdLayer);
//						let graphics = dirgdLayer.graphics;
//						for(let i in graphics){
//							let g = graphics[i];
//							dirgdLayer.graphics.pop();
//						}
//					}
//					
//					if(dirgsLayer){
//						map.removeLayer(dirgsLayer);
//						let graphics = dirgsLayer.graphics;
//						for(let i in graphics){
//							let g = graphics[i];
//							dirgsLayer.graphics.pop();
//						}
//					}
					
					for(var i=0; i<direction_arr.length; i++){
						map.removeLayer(direction_arr[i]);
					}
					
				});

				
				
				/**
				 * form validation end
				 */
				
				
				/**
				 * 
				 * ----------- Preview Start -------
				 * 
				 */

				// Line preview
				$("#line_width").change(function() {
					changePreview("lineSvg", "stroke-width", $(this).val());
				});

				$("#line_color").change(function() {
					changePreview("lineSvg", "stroke", $(this).val());
				});

				// Multi line
				$("#multi_line_width").change(function() {
					changePreview("polyLineSvg", "stroke-width", $(this).val());
				});

				$("#multi_line_color").change(function() {
					changePreview("polyLineSvg", "stroke", $(this).val());
				});

				// Triangle
				$("#t_s_color").change(function() {
					changePreview("triangleSvg", "stroke", $(this).val());
				});

				$("#t_b_width").change(function() {
					changePreview("triangleSvg", "stroke-width", $(this).val());
				});

				$("#t_f_color").change(function() {
					changePreview("triangleSvg", "fill", $(this).val());
				});

				// Rectangle
				$("#s_s_color").change(function() {
					changePreview("recatangleSvg", "stroke", $(this).val());
				});

				$("#s_b_width").change(function() {
					changePreview("recatangleSvg", "stroke-width", $(this).val());
				});

				$("#s_f_color").change(function() {
					changePreview("recatangleSvg", "fill", $(this).val());
				});

				// Circle
				$("#c_s_color").change(function() {
					changePreview("circleSvg", "stroke", $(this).val());
				});

				$("#c_b_width").change(function() {
					changePreview("circleSvg", "stroke-width", $(this).val());
				});

				$("#c_f_color").change(function() {
					changePreview("circleSvg", "fill", $(this).val());
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

				// Text
				$('#tool_text').keyup(function() {
					let preview_txt = $("#lblDrawTxt").text("");
					$("#lblDrawTxt").text($(this).val());
				});

				$("#tool_fontcolor").change(function() {
					$('#lblDrawTxt').css('color', $(this).val());
					$('#lblDrawTxt').css('font-size', $(this).val());
				});

				$("#tool_fontsize").change(function() {
					let f_size = $(this).val();
					$('#lblDrawTxt').css('font-size', $(this).val() + "px");
				});
				

				/**
				 * 
				 * ---------- Preview End --------
				 * 
				 */
				
				/**
				 * change event start
				 */
				

//				$("#bas_layer").change(function(){
//					$('#bas_value').empty().append(
//					'<option value="">Select Value</option>');
//					
//					let l_id = $(this).val();
//					let layer_url = window.layerDataController.getLayerById(l_id);
//					let attributes = getBasicQueryLayerAttributes(layer_url);
//				});
				
				$("#bas_layer").change(function(){
					$('#bas_field').empty().append(
							'<option value="">Select Value</option>');
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/query/fieldtypes/" + $("#bas_layer").val(),						
						contentType : 'application/json',
						async : false,
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						
						//<option value="address" data-data_type="character varying">Address</option>						
						success : function(result) {
							var content ="";
							if (result.length >0) {
								for(var i=0; i<result.length; i++){
									content += "<option value='" + result[i].column_name + "' data-data_type='" + result[i].datatype + "'>"+ result[i].column_name.replaceAll("_" , " ").toUpperCase() + "</option>";
								}
								$("#bas_field").append(content);
							}
							
						},
						error : function(e) {
							$(".loader").fadeOut();
							console.log(e);
						}
					});
					
					
				});
				
//				$("#advanced_layer").change(function(){
//					window.department2dMap.resetQueryFilter();
//					let l_id = $(this).val();
//					let layer_url = window.layerDataController.getLayerById(l_id);
//					getAdvancedQueryLayerAttributes(layer_url);
//				});
				
//				$("#bas_field").change(function(){
//					
//					$('#bas_value').empty().append(
//					'<option value="">Select Value</option>');
//					
//					let field_value = $(this).val();
//					let layer_name = $("#bas_layer").val();
//					let query = window.department2dMap.getAttributeValueByAttributeField(field_value,layer_name);
//					
//					 $(".loader").fadeIn();
//			         queryTask.execute(query,function(result){
//			        	 $(".loader").fadeOut();
//			        	 map.graphics.clear();
//			        	 let f_value = field_value;
//			        	 if(result.features.length == 0 ){
//			        		 $u.notify("info", "Notification","No Values Found");
//				        	 return;
//			        	 }
//			        	 
//			        	 let features = result.features;
//			        	 let value_html = "";
//			        	 var fieldValueArray = [];
//			        	 for(let i in features){
//			        		 let fie_value = features[i].attributes[f_value];
//			        		 if(!fieldValueArray.includes(fie_value)){
//			        			 fieldValueArray.push(fie_value);
//			        			 value_html += "<option value='"+fie_value+"'>"+fie_value+"</option>";
//			        		 }
//			        	 }
//			        	 $('#bas_value').append(value_html);
//			         },function(error){
//			        	    console.log(error);
//			        	    $(".loader").fadeOut();
//			         });
//				});
				
				
				$("#advanced_layer").change(function(){
					$('#advanced_field').empty().append(
							'<option value="">Select Field</option>');
					$('#aqF1type_1').empty().append(
					'<option value="">Select Field</option>');
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/query/fieldtypes/" + $("#advanced_layer").val(),						
						contentType : 'application/json',
						async : false,
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						
						//<option value="address" data-data_type="character varying">Address</option>						
						success : function(result) {
							var content ="";
							if (result.length >0) {
								for(var i=0; i<result.length; i++){
									content += "<option value='" + result[i].column_name + "' data-data_type='" + result[i].datatype + "'>"+ result[i].column_name.replaceAll("_" , " ").toUpperCase() + "</option>";
								}
								$("#advanced_field").append(content);
								
							}
							
						},
						error : function(e) {
							$(".loader").fadeOut();
							console.log(e);
						}
					});
					
					
				});
				
				
				$("#bas_field").change(function(){
					
					$('#bas_value').empty().append(
					'<option value="">Select Value</option>');
					
					
					var layer_name = $("#bas_layer").val();
					var column_name = $("#bas_field").val();
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/query/getinfobytblcolumn/" + layer_name + "/" + column_name,						
						contentType : 'application/json',
						async : false,
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						
						//<option value="address" data-data_type="character varying">Address</option>						
						success : function(result) {
							var content ="";
							if (result.length >0) {
								for(var i=0; i<result.length; i++){
									content += "<option value='" + result[i].columnname + "'>"+ result[i].columnname + "</option>";
								}
								$("#bas_value").append(content);
							}
							
						},
						error : function(e) {
							$(".loader").fadeOut();
							console.log(e);
						}
					});
					
					
				});
				
				$("#advanced_field").on("change", function(){

				    let dataType = $(this).children("option:selected").data('data_type');
				    let content = "<option value='-1'  disabled='disabled' selected='selected'>Select Logical Operator</option>";
				    if(dataType == "character varying" || dataType == "character" || dataType == "text") {
						content += "<option value='=' selected='selected'>Equal to (=)</option>";
						content += "<option value='!='>Not equal to (!=)</option>";
						content += "<option value='like'>Like</option>";
						content += "<option value='not like'>Not like</option>";
						
					} else if (dataType == "integer" || dataType == "numeric" || dataType == "bigint" || dataType == "double precision"){
						
						content += "<option value='=' >Equal to (=)</option>";
						content += "<option value='!=' >Not equal to (!=)</option>";
						content += "<option value='>'>Greate than (>)</option>";
						content += "<option value='>=' >Greate than & equal to (>=)</option>";
						content += "<option value='<'>Less than (<)</option>";
						content += "<option value='<=' >Less than & equal to (<=)</option>";
						
					} else if(dataType == "date"){
						content += "<option value='=' >Equal to (=)</option>";
						content += "<option value='!=' >Not equal to (!=)</option>";
						content += "<option value='>'>Greate than (>)</option>";
						content += "<option value='>=' >Greate than & equal to (>=)</option>";
						content += "<option value='<'>Less than (<)</option>";
						content += "<option value='<=' >Less than & equal to (<=)</option>";
						
					}
				    $("#advanced_operator").html(content);

				            
				});
				
				$("#aqF1type_2").on("change", function(){

				    let dataType = $(this).children("option:selected").data('data_type');
				    let content = "<option value='-1'  disabled='disabled' selected='selected'>Select Logical Operator</option>";
				    if(dataType == "character varying" || dataType == "character" || dataType == "text") {
						content += "<option value='=' selected='selected'>Equal to (=)</option>";
						content += "<option value='!='>Not equal to (!=)</option>";
						content += "<option value='like'>Like</option>";
						content += "<option value='not like'>Not like</option>";
						
					} else if (dataType == "integer" || dataType == "numeric" || dataType == "bigint" || dataType == "double precision"){
						
						content += "<option value='=' >Equal to (=)</option>";
						content += "<option value='!=' >Not equal to (!=)</option>";
						content += "<option value='>'>Greate than (>)</option>";
						content += "<option value='>=' >Greate than & equal to (>=)</option>";
						content += "<option value='<'>Less than (<)</option>";
						content += "<option value='<=' >Less than & equal to (<=)</option>";
						
					} else if(dataType == "date"){
						content += "<option value='=' >Equal to (=)</option>";
						content += "<option value='!=' >Not equal to (!=)</option>";
						content += "<option value='>'>Greate than (>)</option>";
						content += "<option value='>=' >Greate than & equal to (>=)</option>";
						content += "<option value='<'>Less than (<)</option>";
						content += "<option value='<=' >Less than & equal to (<=)</option>";
						
					}
				    $("#aqlogop_2").html(content);

				            
				});
				
				
				
//				$("#advanced_field").change(function(){
//					let l_id = $("#advanced_layer").val();
//					let field_name = $(this).val();
//					window.department2dMap.getFirstAttributeValueByFieldName(l_id,field_name);
//					//window.department2dMap.getAdvancedQueryFieldByFieldName("advanced_value",field_name,layer_name);
//				});
				
				$("#advanced_field").change(function(){
					
					$('#advanced_value').empty().append(
					'<option value="">Select Value</option>');
					
					
					var layer_name = $("#advanced_layer").val();
					var column_name = $("#advanced_field").val();
					var ward_no = $("#advanced_ward").val();
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/query/getinfobytblcolumn/" + layer_name + "/" + column_name + "/" + ward_no,						
						contentType : 'application/json',
						async : false,
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},						
									
						success : function(result) {
							var content ="";
							if (result.length >0) {
								for(var i=0; i<result.length; i++){
									content += "<option value='" + result[i].columnname + "'>"+ result[i].columnname + "</option>";
								}
								$("#advanced_value").append(content);
							}
							else{
								$u.notify("error", "Error",
			                        "No Value Data Found for selected fields");
							}
							
						},
						error : function(e) {
							$(".loader").fadeOut();
							console.log(e);
						}
					});
					
					
				});
				
				/**
				 * change event end
				 */
				
				/**
				 * click event start
				 */
				
				/**
				 * basic-query clear event
				 */
				let basic_query_layer_arr = [];
				$('#reset_basic_query').click(function(){
					$("#department_queries_rslt").html("");
					
					$('#bas_field').empty().append(
					'<option value="">Select Field</option>');
					
					for(var i=0; i<basic_query_layer_arr.length; i++){
						map.removeLayer(basic_query_layer_arr[i]);
					}
					
					map.graphics.clear();
					map.setExtent(initialExtent);
				});
				
				/**
				 * advanced-query clear event
				 */
				$('#reset_advanced_query').click(function(){
					$("#department_queries_rslt").html("");
					window.department2dMap.resetQueryFilter();
					map.graphics.clear();
					map.setExtent(initialExtent);
				});
				
				/**
				 * spatial-query clear event
				 */
				$("#reset_spatial_query").click(function(){
					$("#department_queries_rslt").html("");
					map.graphics.clear();
					map.setExtent(initialExtent);
				})
				
				/**
				 * click event end
				 */
				
				/**
				 * function start
				 */
				
				 function getMapLayers() {
						var mapLayers = map._layers.layer1.layerInfos;
						return mapLayers;
				 }
					
				function fillLayerDropdownList(mapLayers,dropdown_id){
						
					$('#' + dropdown_id).empty().append(
					'<option value="">Select Layer</option>');
					
						let str = "";
						
						for (let i=0; i < mapLayers.length; i++) {
							let layer_id = mapLayers[i].id;
							let full_layer_name = mapLayers[i].name;
							
							var lyrarr = full_layer_name.split(".");
							var layer_name = lyrarr.pop(); 
							
							str += "<option value='" + layer_id
							+ "'>" + layer_name
							+ "</option>";
				    	  }
						$('#' + dropdown_id).append(str);
				}
				
				function getBasicQueryLayerAttributes(url){
					
					var requestHandle = esriRequest({
			            "url": url,
			            "content": {
			              "f": "json"
			            },
			            "callbackParamName": "callback"
			          });
			          requestHandle.then(requestSucceeded, requestFailed);
				}
				
				function getAdvancedQueryLayerAttributes(url){
					
					var requestHandle = esriRequest({
			            "url": url,
			            "content": {
			              "f": "json"
			            },
			            "callbackParamName": "callback"
			          });
			          requestHandle.then(requestAdvancedSucceeded, requestFailed);
				}
				
				var fieldInfo = [];
				
				function requestSucceeded(response, io){
			          let str = "";
			          
			          fieldInfo = [];

			          $('#bas_field').empty().append(
						'<option value="">Select Field</option>');
			          
			          if (response.hasOwnProperty("fields")) {
			            
			        	let field_list = response.fields;
			            
			            for(let i=0 ; i < field_list.length ; i++){
			            	let field_value = field_list[i].name;
			            	let field_type = field_list[i].type;
			            	
			            	if(field_value == "objectid" || field_value == "objectid_1"  
			            		|| field_value == "OBJECTID" || field_value == "OBJECTID_1"){
								continue;
							}
			            	
			            	if(field_value == "ward_name" || field_value == "ward_no" || field_type == "esriFieldTypeGeometry"){
			            		continue;
			            	}
			            	
			            	fieldInfo.push({"Type" : field_type,"Value" : field_value});
			            	
			            	let columnName = window.department2dMap.getFeatureColumnName(field_value);
			            	
			            	str += "<option value='" + field_value
							+ "'>" + columnName
							+ "</option>";
			            }
			            
			            $('#bas_field').append(str);
			          } else {
			           console.log("No field info found.");
			          }
			        }
			        function requestFailed(error, io){
			          console.log("Error > " +error)
			        }
			        
			        function requestAdvancedSucceeded(response, io){
				          fieldInfo = [];
				          
				          let str = "<option value=''>Select Field</option>";
				          
				          var first_field_name = $('#advanced_field').val();
				          var second_field_name = $('#aqF1type_1').val();
				          var third_field_name = $('#aqF1type_2').val();
				          
				          if(first_field_name == "" || first_field_name == undefined){
				        	  $("#advanced_field").html(str);
						  }
				          if(second_field_name == "" || second_field_name == undefined){
								$("#aqF1type_1").html(str);
						  }
				          if(third_field_name == "" || third_field_name == undefined){
								$("#aqF1type_2").html(str);
						  }
				         
				          if (response.hasOwnProperty("fields")) {
				        	let field_list = response.fields;
				            
				            for(let i=0 ; i < field_list.length ; i++){
				            	let field_value = field_list[i].name;
				            	let field_type = field_list[i].type;
				            	if(field_value == "ward_name" || field_value == "ward_no" || field_type == "esriFieldTypeGeometry"){
				            		continue;
				            	}
				            	fieldInfo.push({"Type" : field_type,"Value" : field_value});
				            	let columnName = window.department2dMap.getFeatureColumnName(field_value);
				            	str += "<option value='" + field_value + "'>" + columnName + "</option>";
				            }
				            if(first_field_name == "" || first_field_name == undefined){
				            	$("#advanced_field").html(str);
				            }
				            if(second_field_name == "" || second_field_name == undefined){
				            	$("#aqF1type_1").html(str);
				            }if(third_field_name == "" || third_field_name == undefined){
								$("#aqF1type_2").html(str);
				            }
				          } else {
				           console.log("No field info found.");
				          }
				        }
				       
				
				function changePreview(svgId, key, value) {
					$('#' + svgId).attr(key, value);
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

					var pt = new Point(location.coords.longitude,
							location.coords.latitude);
					
					_current_long = location.coords.longitude;
					_current_lat = location.coords.latitude;
					
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
				
				function createPrintTask(printTitle) {
	                var template = new PrintTemplate();
	                template.layout = document.getElementById("print_layout_id").value; // Assigns
																						// the
																						// layout
	                template.format = document.getElementById("print_format_id").value; // Assigns
																						// the
																						// format
																						// to
																						// printout
																						// to
	                template.layoutOptions = {
	                    //legendLayers: [], // empty array means no legend
	                    scalebarUnit: "Kilometers",
	                    titleText: printTitle // title to display
	                };

	                var params = new PrintParameters();
	                params.map = map;
	                params.template = template;

	                var printTask = new PrintTask(window.prefix_layer_url + "Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
	                var printObj = {
	                    printTask: printTask,
	                    params: params
	                }
	                return printObj;
	            }
				
				function removeSwipeLayer(){
					if(layerSwipe){
						layerSwipe.disable();
						if(swipe_layer_obj){
							map.removeLayer(swipe_layer_obj);
						}
					}
				}
				
				
				/**
				 * function end
				 */
				
				
				/**
				 * click events
				 */
				$('#pop_view_announcement').click(function(){
					$('#viewAnnouncement').html("");
					window.department2dMap.getAnnouncementList();
				});
				
				$('#pop_announcement').click(function(){
					$("#announce_latitude").prop("readonly", true);
					$("#announce_longitude").prop("readonly", true);
					
					$('#form_add_announcement').trigger('reset');
					window.depUtlityController.removeError('form_add_announcement');
					
					window.depUtlityController.getDepartmentList('to_annc');
				});
				
				/**
				 * Reported Issue popup click event
				 */
				/*$('#reported_issues_popup').click(function(){
					$("#incident_rslt").html("");
					$('#form_incident_issues').trigger('reset');
					window.depUtlityController.removeError('form_incident_issues');
					window.depUtlityController.getDepartmentList('incident_department');
				});*/
				
				$("#xycoordinate_popup").click(function(){
					$('#frm_to_location').trigger('reset');
					window.depUtlityController.removeError('frm_to_location');
				});
				
				/*
				 * $("#buffer_popup").click(function(){
				 * $('#form_direction').trigger('reset');
				 * window.depUtlityController.removeError('form_direction'); });
				 */

				
				$("#direction_popup").click(function(){
					$('#form_direction').trigger('reset');
					window.depUtlityController.removeError('form_direction');
				});
				
				
				$("#print_popup").click(function(){
					// $('#form_print').trigger('reset');
					window.depUtlityController.removeError('form_print');
				});
				
				//remove shape-file-layer
				function removeOnFlyLayer(){
					ontheFlyLayer =false;
					if(onFlylayers.length > 0){
						for(let a in onFlylayers){
							map.removeLayer(onFlylayers[a]);
						}
					}
				}
				
				//remove kml layer
				function removeKMLLayer(){
					 if(kmlLayers.length > 0){
					    	for(let i in kmlLayers){
					    		let kmlLayer = kmlLayers[i];
					    		map.removeLayer(kmlLayer);
					    	}
					 }
				}
				
				// clear all graphic on map
				$("#clearMap").click(function() {
					map.graphics.clear();
					
					$("#heatmap_legend").hide();
					
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
					
					if(opacity_layer){
						map.removeLayer(opacity_layer);	
					}
					
					removeOnFlyLayer();
					removeKMLLayer();
					removeSwipeLayer();
					window.department2dMap.removeHeatmapLayer();
					removeMeasurementGraphics();
				});
				
				/**
				 * clear add layer click event
				 */
				$("#clear_add_layer").click(function(){
						removeOnFlyLayer();	
						removeKMLLayer();
						map.setExtent(initialExtent);
				});
				
				/**
				 * swipe-layer click event
				 */
				
				/*$("#swipeLayer").click(function(){
					
					if(ward_swipe_layer){
						map.removeLayer(ward_swipe_layer);
					}
					
					map.addLayer(ward_swipe_layer);
					 layerSwipe.startup();
					 layerSwipe.enable();
				});*/
				
				/**
				 * buffer polygon area start
				 */
				
				/*
				 * $("#buffer").click(function(){
				 * window.depUtlityController.getLayerList("polygon_buffer_layer");
				 * });
				 */
				
				$("#proximity_anylysis_popup").click(function(){
					$('#polygon_buffer_rslt').html("");
					//window.depUtlityController.getLayerList("polygon_buffer_layer");
				});
				
				
				$('#draw_polygon').click(function(){
					
					if(map_selection){
						map_selection.remove();	
						//map_hover.remove();
					}
					
					$('#polygon_buffer_rslt').html("");
					
					let selected_layer = $("#polygon_buffer_layer").val();
					
					if(selected_layer == ""){
						$u.notify("info", "Notification","Please select layer");
						return;
					}
					
					
					let tool_name = this.title.toUpperCase().replace(/ /g, "_");
					
					if(tool_name == "POLYGON"){
						if(map_selection){
							map_selection.remove();
							//map_hover.remove();
						}
						toolbar.activate(Draw[tool_name]);
						toolbar.on("draw-end", polygonBufferResult);
						map.hideZoomSlider();
					}
				});
				
				$('#clear_polygon').click(function(){
					map.graphics.clear();
					toolbar.deactivate();
					map.showZoomSlider();
					$("#polygon_buffer_layer option:first").attr('selected','selected');
					$('#polygon_buffer_rslt').html("");
					map.setExtent(initialExtent);
				})
				
				function polygonBufferResult(evt) {
					// mapReady();
					let selected_layer = $("#polygon_buffer_layer").val();
					let layer_url = window.layerDataController.getLayerById(selected_layer);;
					let geom = evt.geometry;
					queryTask = new QueryTask(layer_url);
					let query = new Query();
				    query.returnGeometry = true;
				    query.geometry = geom;
				    query.outFields = ["*"];
				        
				    $(".loader").fadeIn();
				        queryTask.execute(query,function(result){
				        	map.graphics.clear();
				        	 if(result.features.length == 0 ){
				        		 $u.notify("info", "Notification","No result found");
				        		 $(".loader").fadeOut();
				        		 $('#polygon_buffer_rslt').html("");
					        	 return;
				        	 }
				        	 window.department2dMap.bindFeatureOfPolygonBuffer(result);
				        	 $(".loader").fadeOut();
				        	 //var extGraphics = esri.graphicsExtent(resultedFeaturesLayer.graphics);
				        	 //map.setExtent(extGraphics);
				        	 //mapReady();
				        	 map_info_tool = false;
							 infoToolSetup();
				        },function(error){
				        	   console.log(error);
				        	   $(".loader").fadeOut();
				         });
				}
				
				
				/**
				 * form validations
				 */
				
				$.validator.addMethod("dropDownValidation",
						function(value, element, params) {
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
				
				/**
				 * add announcement form
				 */
				$('form[id="form_add_announcement"]')
				.validate(
						{
							rules : {
								
								to_annc : {
									dropDownValidation : true
								},
								announce_title : "required",
								ann_desc : "required",
								announce_latitude : "required",
								announce_longitude : "required",
								date_Announcement : {
								    dateFormat: true
								}
							},
							messages : {
								to_annc : {
									dropDownValidation : "Please Select a Department",
								},
								announce_title : {
									required : "Please Enter a Title",
								},
								ann_desc : {
									required : "Please Enter Description",
								},
								announce_latitude : {
									required : "Please Enter Latitude",
								},
								announce_longitude : {
									required : "Please Enter Longitude",
								},
								date_Announcement : {
									dateFormat : "Please Select Date & Time",
								}
							},
							submitHandler : function(form, e) {
								e.preventDefault();
								try {
									let announce_title = $('#announce_title').val();
									let announce_category = $('#to_annc').val();
									let announce_desc = $('#ann_desc').val();
									let announce_latitude = $('#announce_latitude').val();
									let announce_longitude = $('#announce_longitude').val();
									let announce_date = $('#date_Announcement').val();
									
									let user_id = localStorage.getItem("user_data");
	    							if(!user_id || user_id === null){
	    								user_id = 0;
	    							}
	    							
	    							window.depAnnouncementController.addAnnouncement(announce_category,announce_title
	    									,announce_desc,announce_latitude,announce_longitude,announce_date,user_id);
	    							
	    							$('#form_add_announcement').trigger('reset');
	    							
	    							map.graphics.clear();
	    							removeCursor();
								
								} catch (e) {
									$u.notify("error", "Error",
											"Something went Wrong");
								}
							}
						});
				
				/*
				 * Incident issues form
				 */
				
				/*$('form[id="form_incident_issues"]')
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
									dropDownValidation : "Please select a type",
									required : "Please select a type",
								},
								incident_department : {
									dropDownValidation : "Please select a department",
									required : "Please select a department",
								},
								
							},
							submitHandler : function(form, e) {
								e.preventDefault();
								try {
									map.graphics.clear();
									map.removeLayer(resultedFeaturesLayer);
									
									$("#incident_rslt").html("");
									
									let incident_type = $('#incident_type').val();
									let incident_department = $('#incident_department').val();
	    							let result = window.depIncidentController.getIncidentIssueList(incident_department,incident_type);
	    							let response = JSON.parse(result.responseText);
	    							if(response.responseCode == "200"){
	    								if(response.data.length > 0){
	    									window.department2dMap.bindIncidentResult(response.data);
	    									$(".loader").fadeOut();
	    									var extGraphics = esri.graphicsExtent(resultedFeaturesLayer.graphics);
								        	//map.setExtent(extGraphics);
	    								}else{
	    									$u.notify('info', 'Notification',
	    											'data not available', '');
	    								}
	    							}else{
	    								$u.notify('info', 'Notification',
	    										'data not available', '');	
	    							}
	    							//$('#form_incident_issues').trigger('reset');
	    							//map.graphics.clear();
								} catch (e) {
									$u.notify("error", "Error",
											"Something went Wrong");
								}
							}
						});
				*/
				
				
				
				
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
						                var printObj = createPrintTask(document.getElementById("title_name").value); // Gets
						                var printTask = printObj.printTask;
						                printTask.execute(printObj.params, function (evt) {
						                    document.getElementById("print_submit").style.display = 'none';
						                    document.getElementById("printResult").href = evt.url;
						                    document.getElementById("printResult").style.display = 'block';
						                    on(dom.byId("printResult"), "click", function () {
						                        document.getElementById("print_submit").innerHTML = "Print";
						                        document.getElementById("print_submit").style.display = 'block';
						                        document.getElementById("print_submit").disabled = false; // Button
																											// enabled
																											// to
																											// produce
																											// map
																											// print
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
					                 console.log("Error While Printing : " +e.message);
									 $u.notify("error", "Error","Something Happend Wrong");
								}
							}
						});
				
				
				//add layer form
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
											window.department2dMap.addKMLFileOnMap();
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
							                window.department2dMap.addShapefileToMap(response.featureCollection);
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
				
				
				// basic query form
//				$('form[id="form_basic_query"]')
//				.validate(
//						{
//							rules : {
//								bas_layer : {
//									dropDownValidation : true
//								},
//							},
//							messages : {
//								bas_layer : {
//									dropDownValidation : "Please Select a Layer",
//								},
//							},
//							submitHandler : function(form, e) {
//								e.preventDefault();
//								try {
//									$("#department_queries_rslt").html("");
//									let department_value = $('#bas_department').val();
//									let ward_value = $('#bas_ward').val();
//									let layer_value = $('#bas_layer').val();
//									let field_name = $('#bas_field').val();
//									let field_value = $('#bas_value').val();
//									
//									if((field_name != "") && (field_value == "")){
//										$u.notify("info", "Notification","Please select value");
//										return;
//									}
//									
//									let layer_url = window.layerDataController.getLayerById(layer_value);
//									let basic_query = window.department2dMap.createBasicQuery(ward_value,layer_url,field_name,field_value); 
//									
//									$(".loader").fadeIn();
//							         queryTask.execute(basic_query,function(result){
//							        	 map.graphics.clear();
//
//							        	 if(result.features.length == 0 ){
//							        		 $u.notify("info", "Notification","No result found");
//							        		 $(".loader").fadeOut();
//								        	 return;
//							        	 }
//							        	 $('#query_result_tab a[href="#dep_query_result"]').tab('show');
//							        	 window.department2dMap.bindQueryFeatures(result);
//							        	 $(".loader").fadeOut();
//							        	 //var extGraphics = esri.graphicsExtent(resultedFeaturesLayer.graphics);
//							        	 //map.setExtent(extGraphics);
//							         },function(error){
//							        	 $(".loader").fadeOut();
//							        	   console.log(error);
//							         });
//								} catch (e) {
//									$(".loader").fadeOut();
//									$u.notify("error", "Error",
//											"Something went Wrong");
//								}
//							}
//						});
				
				let vectorLayer = "";
				let add_field_button = false;
				let location_mark = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: 'images/icons/svgviewer-output.svg',
                    })
                });
				
				$(".add_field_button").click(function(){
					add_field_button = true;						
				});
				
				$('form[id="form_basic_query"]')
			    .validate(
			        {
			            rules: {
			                bas_layer: {
			                    dropDownValidation: true
			                },
			            },
			            messages: {
			                bas_layer: {
			                    dropDownValidation: "Please Select a Layer",
			                },
			            },
			            submitHandler: function (form, e) {
			                e.preventDefault();
			                if(vectorLayer != ""){
			                	map.removeLayer(vectorLayer);
			                }
			          
			                
			                try {
			                    let layer_value = $('#bas_layer').val();
			                    let field_name = $('#bas_field').val();
			                    let field_value = $('#bas_value').val();
			                    let ward_no = $("#bas_ward").val();

			                    if ((field_name != "") && (field_value == "")) {
			                        $u.notify("info", "Notification", "Please select value");
			                        return;
			                    }

			                    var form_data = {
			                        tableName: layer_value,
			                        column: field_name,
			                        textData: field_value,
			                        wardId: ward_no
			                    };

			                    $.ajax({
			                        method: 'POST',
			                        url: window.iscdl.appData.baseURL + "citizen/query/getbasicquerydata",
			                        data: JSON.stringify(form_data),
			                        contentType: 'application/json',
			                        async: false,
			                        beforeSend: function (request) {
			                            request.setRequestHeader('Authorization', 'Bearer '
			                                + localStorage.getItem('token'));
			                        },

			                        success: function (result) {

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
			                    $u.notify("error", "Error",
			                        "Something went Wrong");
			                }
			            }
			        });
				
				
				
				// advanced query form
				$('form[id="form_advanced_query"]')
				.validate(
						{
							rules : {
								
								/*advanced_department : {
									dropDownValidation : true
								},
								advanced_ward : {
									dropDownValidation : true
								},*/
								advanced_layer : {
									dropDownValidation : true
								},
								/*advanced_field : {
									dropDownValidation : true
								},
								advanced_value : "required",*/
							},
							messages : {
								/*advanced_department : {
									dropDownValidation : "Please select a department",
								},
								advanced_ward : {
									dropDownValidation : "Please select a ward",
								},*/
								advanced_layer : {
									dropDownValidation : "Please Select a Layer",
								},
								/*advanced_field : {
									dropDownValidation : "Please select a field",
								},
								advanced_value : {
									required : "Please enter a value",
								},*/
								
							},
							submitHandler : function(form, e) {
								e.preventDefault();
								try {
									var child = [];
				                    let tblName= $("#advanced_layer").val();
                                    
				                    let column= $("#advanced_field").val();
				                    let operator= $("#advanced_operator").val();
				                    
				                    let txtData= $("#advanced_value").val();
				                    //	$('#advance-query-form').find("select.aqVal").children("option:selected").val();
				                
				                    
				                    
				                    child.push({
				                        
				                        "column": column,
				                        "operator": operator,
				                        "textData" : txtData,
				                        "logicalOp": null,
				                        "dataType": $('#form_advanced_query').find("select#advanced_field").children("option:selected").data("data_type")
				                        
				                        });
				                    
				                    child.push({
										
										"column": $("#aqF1type_1").val(),
										"operator":$("#aqlogop_1").val(),
					    				"textData" :$("#aqValue_1").val(),
					    				"logicalOp":$("#slope_1").val(),
					    				"dataType":$('#form_advanced_query').find("select#aqF1type_1").children("option:selected").data("data_type")
					    				
					       		 	});
									
									child.push({
										
										"column":$("#aqF1type_2").val(),
										"operator":$("#aqlogop_2").val(),
					    				"textData" :$("#aqValue_2").val(),
					    				"logicalOp":$("#slope_2").val(),
					    				"dataType":$('#form_advanced_query').find("select#aqF1type_2").children("option:selected").data("data_type")

					       		 	});									
									
				                    
				                    
				                    
				                    let wardId= $("#advanced_ward").val();
				                    
				                    if(wardId=="-1" || wardId==" "){
				                        wardId=null;
				                    }

				                    var form_data ={
				                            "tableName":tblName,			                 
				                            "wardId":wardId,
				                            "tblData":child
				                    };
				                    
				                    
				                    
				                    $.ajax({
										method : 'POST',
										url : window.iscdl.appData.baseURL + "citizen/query/getadvancedquerydata",
										data: JSON.stringify(form_data),
										contentType : 'application/json',
										async : false,
										beforeSend : function(request) {
											request.setRequestHeader('Authorization', 'Bearer '
													+ localStorage.getItem('token'));
										},										
										
										success : function(result) {
											
											if(result.features.length > 0 ){
							                     
					                        	
					                            const geoJSONFormat = new ol.format.GeoJSON();
					                            var vectorSource = new ol.source.Vector({
					                                features: geoJSONFormat.readFeatures(result, {
					                                    featureProjection: 'EPSG:4326',
					                                }),
					                                format: geoJSONFormat,
					                            });


					                            const vectorLayer = new ol.layer.Vector({
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


					                            console.log(result);
					                        	}
					                        	else{
					                        		$u.notify("error", "Error",
							                        "No Data Found for selected fields");
					                        	}
											
										},
										error : function(e) {
											$(".loader").fadeOut();
											console.log(e);
										}
									});
				                    
				                    
				                        $(".btn_search").prop('disabled', false);
				                        $(".btn_save").prop('disabled', false);
							        
									
								} catch (e) {
									$(".loader").fadeOut();
									$u.notify("error", "Error",
											"Something went Wrong");
								}
							}
						});
				
				// spatial query
				
				
				$('form[id="form_spatial_query"]')
				.validate(
						{
							rules : {
								sp_ward : {
									dropDownValidation : true
								},
								sp_source_layer : {
									dropDownValidation : true
								},
								sp_mask_layer : {
									dropDownValidation : true
								},
								sp_type : {
									dropDownValidation : true
								},
							},
							messages : {
								sp_ward : {
									dropDownValidation : "Please Select a Ward",
								},
								sp_source_layer : {
									dropDownValidation : "Please Select a Source Layer",
								},
								sp_mask_layer : {
									dropDownValidation : "Please Select a Mask Layer",
								},
								sp_type : {
									dropDownValidation : "Please Select a Query Type",
								},
							},
							submitHandler : function(form, e) {
								e.preventDefault();
								try {
									
									let wardId = $("#sp_ward").val();
									let sourceLayer = $("#sp_source_layer").val();
									let queryType = $("#sp_type").val();
									let maskType = $("#sp_mask_layer").val();
									
									
									var form_data = {
											wardid: wardId, 
											sourcelayer: sourceLayer, 
											querytype: queryType, 
											masklayer: maskType
									}
									
									
									$.ajax({
										method : 'POST',
										url : window.iscdl.appData.baseURL + "citizen/query/getspatialquerydata",
										data: JSON.stringify(form_data),
										contentType : 'application/json',
										async : false,
										beforeSend : function(request) {
											request.setRequestHeader('Authorization', 'Bearer '
													+ localStorage.getItem('token'));
										},										
										
										success : function(result) {
											
											if(result.features.length > 0 ){
							                     
					                        	
					                            const geoJSONFormat = new ol.format.GeoJSON();
					                            var vectorSource = new ol.source.Vector({
					                                features: geoJSONFormat.readFeatures(result, {
					                                    featureProjection: 'EPSG:4326',
					                                }),
					                                format: geoJSONFormat,
					                            });


					                            const vectorLayer = new ol.layer.Vector({
					                                source: vectorSource,

					                            });

					                            vectorLayer.getSource().on('addfeature', function () {
					                                map.setExtent(vectorLayer.getSource().getExtent());
					                            });


					                            const extent = vectorSource.getExtent();

					                            map.getView().fit(extent);

					                            //map1_layer.addLayer(layer_test1);
					                            map.addLayer(vectorLayer);


					                            console.log(result);
					                        	}
					                        	else{
					                        		$u.notify("error", "Error",
							                        "No Data Found for selected fields");
					                        	}
											
										},
										error : function(e) {
											$(".loader").fadeOut();
											console.log(e);
										}
									});
									
									
									
								} catch (e) {
									$u.notify("error", "Error",
											"Something went Wrong");
								}
							}
						});
				
				// close popup event
				$(".layer-close").click(function() {
					removeAll();
					//removeMeasurementGraphics();
					
					// for draw deactive
					if(toolbar){
						//toolbar.deactivate();
					}
					
					//removeOnFlyLayer();
					//removeKMLLayer();

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
				 * checking for module permission
				 */
				$("ul[id*=leftPanel] li").click(function () {
					let val = $(this).attr('title');
					if(val == "Layers"){
						return;
					}
					
					removeAll();
					// for draw deactive
					if(toolbar){
						//toolbar.deactivate();
					}
					
					$("#heatmap_legend").hide();
					
					//removeMeasurementGraphics();
					//removeSwipeLayer();
					
					
					removeOnFlyLayer();
					removeKMLLayer();
					window.depUtlityController.setPageAccessAccordingToModule(val);
				});
				
				
				function removeAll(){
					removeCursor();
					
					$("#form_add_announcement").trigger("reset");
					localStorage.removeItem('xmin');
					localStorage.removeItem('ymin');
					localStorage.removeItem('xmax');
					localStorage.removeItem('ymax');
					localStorage.removeItem('spatialReference');
				}
				
				
				function removeMeasurementGraphics(){
						measurement.setTool("location", false);
				        measurement.setTool("area", false);
				        measurement.setTool("distance", false);
				        map.setMapCursor("default");
				        map.graphics.clear();
				}
				
				// remove measurement tool while other tab click
				$("ul[id*=bottomPanel] li").click(function () {
					let val = $(this).attr('title');
					
					if(val == "Home" || val == "Find My Location" || val == "Enable Pan" 
						|| val == "Disable Pan" || val == "Enable Map Info" || val == "Disable Map Info"){
						return;
					}
					
					/*if(val != "Swipe Layer"){
						removeSwipeLayer();
					}*/
					
					if(val != "Measurement"){
						//removeMeasurementGraphics();
					}
					
					if(val != "Share"){
						removeAll();
					}
					
					/*if(toolbar){
						toolbar.deactivate();
					}*/
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
				
				
				/**
				 * latitude-longitude events
				 */
		        
				//ANNOUNCEMENT SELECTED AND CURRENT LOCATION EVENT
				$("#announce_selected_longitude").click(function() {
					fillAnnouncementSelectedLatLong();
				});

				$("#announce_selected_lat").click(function() {
					fillAnnouncementSelectedLatLong();
				});
				
				$('#announce_current_lat').click(function() {
					fillAnnouncementCurrentLatLong();
				});

				$('#announce_current_longitude').click(function() {
					fillAnnouncementCurrentLatLong();
				});
				
				function fillAnnouncementSelectedLatLong(){
					map.setMapCursor("crosshair");
					if(map_selection){
						map_selection.remove();	
						//map_hover.remove();
					}
					mapClickEvtHandler = map.on("click", function(evt) {
						let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
						window.department2dMap.checkSelectedlocationWithinBoundry(mp.x,mp.y,
								'announce_latitude','announce_latitude-error',
								'announce_longitude','announce_longitude-error');
					});
				}

				function fillAnnouncementCurrentLatLong(){
					window.department2dMap.checkCurrentlocationWithinBoundry(_current_long,_current_lat,
							'announce_latitude','announce_latitude-error',
							'announce_longitude','announce_longitude-error');
				}
				// change event of date
				
				$('#date_Announcement').change(function(){
					let value = $(this).val();
					if(value != ""){
						$('#date_Announcement').removeClass('error');
						$('#date_Announcement-error').remove();
					}
				});
				
				//ADD DATA SELECTED AND CURRENT LATLONG EVENT
				$("#add_data_selected_longitude").click(function() {
                        	fillAddDataSelectedLatLong();
                });

                $("#add_data_selected_lat").click(function() {
                        	fillAddDataSelectedLatLong();
                });
                
                $('#add_data_current_lat').click(function() {
                	fillAddDataCurrentlatLong();
                });
        
		        $('#add_data_current_longitude').click(function() {
		                	fillAddDataCurrentlatLong();
		        });
                
                function fillAddDataSelectedLatLong(){
                	 map.setMapCursor("crosshair");
                     if(map_selection){
							map_selection.remove();
							//map_hover.remove();
						}
                     mapClickEvtHandler = map.on("click", function(evt) {
                     	let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
							window.department2dMap.checkSelectedlocationWithinBoundry(mp.x,mp.y,
									'add_data_latitude','add_data_latitude-error',
									'add_data_longitude','add_data_longitude-error');
                     });
                }
                
                function fillAddDataCurrentlatLong(){
                	window.department2dMap.checkCurrentlocationWithinBoundry(_current_long,_current_lat,
							'add_data_latitude','add_data_latitude-error',
							'add_data_longitude','add_data_longitude-error');
                }
                
                $('#add_data_submit').click(function(){
                    map.graphics.clear();
                    let category_name = $('#add_data_category option:selected').text();
                    let category_id = $('#add_data_category').val();
                    if(category_id === "0"){
                    	$u.notify('warning', 'Warning', 'Please select category !', '');
                    	return false;
                    }
                    let latitude = $('#add_data_latitude').val();
                    let longitude = $('#add_data_longitude').val();
                    if(latitude === null || !latitude || longitude === null || !longitude){
                    	$u.notify('warning', 'Warning', 'Please select Latitude and Longitude !', '');
                    	return false;
                    }
                    window.depUtlityController.checkDeptCategory(category_name);
                    window.depUtlityController.prepareAddDataInfo(category_id, latitude, longitude, window.depUtlityController.deptAddDataModal.prefix);
                    window.depUtlityController.getWardList(window.depUtlityController.deptAddDataModal.prefix+'_ward');
                    $('#'+window.depUtlityController.deptAddDataModal.modal_id).on('show.bs.modal',function(){
                        $('#'+window.depUtlityController.deptAddDataModal.prefix+'_latitude').val(window.depUtlityController.addDataInfo.latitude);
                        $('#'+window.depUtlityController.deptAddDataModal.prefix+'_longitude').val(window.depUtlityController.addDataInfo.longitude);
                        $('#'+window.depUtlityController.deptAddDataModal.prefix+'_subLayerId').val(category_id);
                        
                        $('#'+window.depUtlityController.deptAddDataModal.prefix+'_latitude').attr("readonly", true); 
               		 	$('#'+window.depUtlityController.deptAddDataModal.prefix+'_longitude').attr("readonly", true);
                    });
                    $('#'+window.depUtlityController.deptAddDataModal.modal_id).modal();
                });
                
                $('#add_data_clear').click(function(){
                	window.department2dMap.removeCursors();
                	map.graphics.clear();
                });
                
                
                $('#layer_data_master').click(function(){
                    let dept_id = localStorage.getItem('department_id');
                    if(dept_id != window.departmentData._department_id){
                    	let jsp_page = '';
                    	let layerData = window.depUtlityController.deptLayerData.filter(function(e){
                    		if(dept_id == e.department_id){
                    			return e;
                    		}
                    	});
                    	if(layerData.length > 0){
                    		let layer = layerData[0];
                    		if(layer.layer_name === 'Hospital' || layer.layer_name === 'UPHC'){
                                jsp_page = 'health_dep.jsp';
                            }else if(layer.layer_name === 'Primary school' || layer.layer_name === 'Secondary school' 
                                    || layer.layer_name === 'Colleges and Universities'){
                                jsp_page = 'education_dep.jsp';
                            } else if(layer.layer_name === 'Police chowki'){
                                jsp_page = 'police_dep.jsp';
                            } else if(layer.layer_name === 'Electric pole' || layer.layer_name === 'Street light' 
                                || layer.layer_name === 'Transformers'){
                                jsp_page = 'power_dep.jsp';
                            } else if (layer.layer_name === 'Bus stops' || layer.layer_name === 'Bus terminals' 
                                || layer.layer_name === 'Bus routes'){
                                jsp_page = 'aictsl_dep.jsp';
                            } else if(layer.layer_name === 'Library'){
                                jsp_page = 'library_dep.jsp';
                            } else if(layer.layer_name === 'Flyover'){
                                jsp_page = 'pwd_dep.jsp';
                            }else if(layer.layer_name === 'Police Posts'){
                                jsp_page = 'policepost_dep.jsp';
                            } else if(layer.layer_name === 'Restaurants'){
                                jsp_page = 'restaurant_dep.jsp';
                            }else if(layer.layer_name === 'Water ATM'){
                                jsp_page = 'water_atm_dep.jsp';
                            }else if(layer.layer_name === 'VCBs/VMSs'){
                                jsp_page = 'vcb_vms_dep.jsp';
                            }else if(layer.layer_name === 'Pharmacies'){
                                jsp_page = 'pharmacies_dep.jsp';
                            }else if(layer.layer_name === 'Religious Facility'){
                                jsp_page = 'religion_facility_dep.jsp';
                            }else if(layer.layer_name === 'RTO'){
                                jsp_page = 'rto_dep.jsp';
                            }else if(layer.layer_name === 'ATM' || layer.layer_name === 'Banks'
                                || layer.layer_name === 'Monuments' || layer.layer_name === 'Museum'
                                    || layer.layer_name === 'Park and ground'|| layer.layer_name === 'Manhole'){
                                jsp_page = 'national_ic.jsp';
                            }else if(layer.layer_name === 'Shopping Malls'){
                                jsp_page = 'shopping_mall_dep.jsp';
                            }else if(layer.layer_name === 'Bartan/Utencile Bank'){
                                jsp_page = 'utencileBankdata.jsp';
                            }else if(layer.layer_name === 'Blood Banks'){
                                jsp_page = 'blood_bank_dep.jsp';
                            }else if(layer.layer_name === 'Car & Scooter Rentals'){
                                jsp_page = 'carScooter_dep.jsp';
                            }else if(layer.layer_name === 'CCTV Locations'){
                                jsp_page = 'cctv_locations.jsp';
                            }else if(layer.layer_name === 'Cinema Hall'){
                                jsp_page = 'cinema_hall_dep.jsp';
                            }else if(layer.layer_name === 'Cultural Facility'){
                                jsp_page = 'culturalFacility_dep.jsp';
                            }else if(layer.layer_name === 'Dustbin Locations'){
                                jsp_page = 'dustbinLocations_dep.jsp';
                            }else if(layer.layer_name === 'Electric Charging Station'){
                                jsp_page = 'electricChargingStation_dep.jsp';
                            }else if(layer.layer_name === 'Entertainment Facility'){
                                jsp_page = 'entertainmentFacility_dep.jsp';
                            }else if(layer.layer_name === 'Eye Donation Center'){
                                jsp_page = 'eyeDonation_dep.jsp';
                            }else if(layer.layer_name === 'Fire Station'){
                                jsp_page = 'fire_station_dep.jsp';
                            }else if(layer.layer_name === 'Food zones'){
                                jsp_page = 'foodZones_dep.jsp';
                            }else if(layer.layer_name === 'Free WIFI Locations'){
                                jsp_page = 'free_wifi_dep.jsp';
                            }else if(layer.layer_name === 'Government Office'){
                                jsp_page = 'govt_offices_dep.jsp';
                            }else if(layer.layer_name === 'Heritage & Tourism Sites'){
                                jsp_page = 'heritage_tourismSites_dep.jsp';
                            }else if(layer.layer_name === 'Hostels'){
                                jsp_page = 'hostel_dep.jsp';
                            }else if(layer.layer_name === 'Hotel'){
                                jsp_page = 'hotel_dep.jsp';
                            }else if(layer.layer_name === 'Oldage Homes'){
                                jsp_page = 'oldageHomes_dep.jsp';
                            }else if(layer.layer_name === 'Orphanage Homes'){
                                jsp_page = 'orphanage_dep.jsp';
                            }else if(layer.layer_name === 'Petrol Pump'){
                                jsp_page = 'petrol_pump_dep.jsp';
                            }else if(layer.layer_name === 'Play ground'){
                                jsp_page = 'play_ground.jsp';
                            }else if(layer.layer_name === 'Post Offices'){
                                jsp_page = 'postOffice.jsp';
                            }else if(layer.layer_name === 'Public Distribution System Centers'){
                                jsp_page = 'public_dis_system_cen.jsp';
                            }else if(layer.layer_name === 'Public Toilets'){
                                jsp_page = 'public_toilet_dep.jsp';
                            }else if(layer.layer_name === 'Markets'){
                                jsp_page = 'market_dep.jsp';
                            }else if(layer.layer_name === 'Milk Booths'){
                                jsp_page = 'milkBooths_dep.jsp';
                            }else if(layer.layer_name === 'Smart pole'){
                                jsp_page = 'smart_pole_dep.jsp';
                            }else if(layer.layer_name === 'Sports Facility'){
                                jsp_page = 'sport_facility_dep.jsp';
                            }else if(layer.layer_name === 'Traffic Squares'){
                                jsp_page = 'traffic_square_dep.jsp';
                            }else if(layer.layer_name === 'Smart pole'){
                                jsp_page = 'smart_pole_dep.jsp';
                            }
                    	}
                    	if(jsp_page !== ''){
                    		window.location = window.location.origin
                            + window.iscdl.appData.webURLPrefix +jsp_page;
                    	}else{
                    		$u.notify('info', 'Notification',
									'No Data available', '');
							return;
                    	}
                    	 
                    }else{
                    	window.depUtlityController.getLayers('master_data_category');
                    	$('#layer_data_master').attr("data-attr","#dep_master_data")
                    }
                    
                    
                });
                
                $('#master_data_submit').click(function(){
                	let jsp_page = "";
                		
                        let layer = $('#master_data_category option:selected').text();
                        
                        if(layer === 'Hospital' || layer === 'UPHC'){
                            jsp_page = 'health_dep.jsp';
                        }else if(layer === 'Primary school' || layer === 'Secondary school' 
                                || layer === 'Colleges and Universities'){
                            jsp_page = 'education_dep.jsp';
                        } else if(layer === 'Police chowki'){
                            jsp_page = 'police_dep.jsp';
                        } else if(layer === 'Electric pole' || layer === 'Street light' 
                            || layer === 'Transformers'){
                            jsp_page = 'power_dep.jsp';
                        } else if (layer === 'Bus stops' || layer === 'Bus terminals' 
                            || layer === 'Bus routes'){
                            jsp_page = 'aictsl_dep.jsp';
                        } else if(layer === 'Library'){
                            jsp_page = 'library_dep.jsp';
                        } else if(layer === 'Flyover'){
                            jsp_page = 'pwd_dep.jsp';
                        }else if(layer === 'Police Posts'){
                            jsp_page = 'policepost_dep.jsp';
                        } else if(layer === 'Restaurants'){
                            jsp_page = 'restaurant_dep.jsp';
                        }else if(layer === 'Water ATM'){
                            jsp_page = 'water_atm_dep.jsp';
                        }else if(layer === 'VCBs/VMSs'){
                            jsp_page = 'vcb_vms_dep.jsp';
                        }else if(layer === 'Pharmacies'){
                            jsp_page = 'pharmacies_dep.jsp';
                        }else if(layer === 'Religious Facility'){
                            jsp_page = 'religion_facility_dep.jsp';
                        }else if(layer === 'RTO'){
                            jsp_page = 'rto_dep.jsp';
                        }else if(layer === 'ATM' || layer === 'Banks'
                            || layer === 'Monuments' || layer === 'Museum'
                                || layer === 'Park and ground'|| layer === 'Manhole'){
                            jsp_page = 'national_ic.jsp';
                        }else if(layer === 'Shopping Malls'){
                            jsp_page = 'shopping_mall_dep.jsp';
                        }else if(layer === 'Bartan/Utencile Bank'){
                            jsp_page = 'utencileBankdata.jsp';
                        }else if(layer === 'Blood Banks'){
                            jsp_page = 'blood_bank_dep.jsp';
                        }else if(layer === 'Car & Scooter Rentals'){
                            jsp_page = 'carScooter_dep.jsp';
                        }else if(layer === 'CCTV Locations'){
                            jsp_page = 'cctv_locations.jsp';
                        }else if(layer === 'Cinema Hall'){
                            jsp_page = 'cinema_hall_dep.jsp';
                        }else if(layer === 'Cultural Facility'){
                            jsp_page = 'culturalFacility_dep.jsp';
                        }else if(layer === 'Dustbin Locations'){
                            jsp_page = 'dustbinLocations_dep.jsp';
                        }else if(layer === 'Electric Charging Station'){
                            jsp_page = 'electricChargingStation_dep.jsp';
                        }else if(layer === 'Entertainment Facility'){
                            jsp_page = 'entertainmentFacility_dep.jsp';
                        }else if(layer === 'Eye Donation Center'){
                            jsp_page = 'eyeDonation_dep.jsp';
                        }else if(layer === 'Fire Station'){
                            jsp_page = 'fire_station_dep.jsp';
                        }else if(layer === 'Food zones'){
                            jsp_page = 'foodZones_dep.jsp';
                        }else if(layer === 'Free WIFI Locations'){
                            jsp_page = 'free_wifi_dep.jsp';
                        }else if(layer === 'Government Office'){
                            jsp_page = 'govt_offices_dep.jsp';
                        }else if(layer === 'Heritage & Tourism Sites'){
                            jsp_page = 'heritage_tourismSites_dep.jsp';
                        }else if(layer === 'Hostels'){
                            jsp_page = 'hostel_dep.jsp';
                        }else if(layer === 'Hotel'){
                            jsp_page = 'hotel_dep.jsp';
                        }else if(layer === 'Oldage Homes'){
                            jsp_page = 'oldageHomes_dep.jsp';
                        }else if(layer === 'Orphanage Homes'){
                            jsp_page = 'orphanage_dep.jsp';
                        }else if(layer === 'Petrol Pump'){
                            jsp_page = 'petrol_pump_dep.jsp';
                        }else if(layer === 'Play ground'){
                            jsp_page = 'play_ground.jsp';
                        }else if(layer === 'Post Offices'){
                            jsp_page = 'postOffice.jsp';
                        }else if(layer === 'Public Distribution System Centers'){
                            jsp_page = 'public_dis_system_cen.jsp';
                        }else if(layer === 'Public Toilets'){
                            jsp_page = 'public_toilet_dep.jsp';
                        }else if(layer === 'Markets'){
                            jsp_page = 'market_dep.jsp';
                        }else if(layer === 'Milk Booths'){
                            jsp_page = 'milkBooths_dep.jsp';
                        }else if(layer === 'Smart pole'){
                            jsp_page = 'smart_pole_dep.jsp';
                        }else if(layer === 'Sports Facility'){
                            jsp_page = 'sport_facility_dep.jsp';
                        }else if(layer === 'Traffic Squares'){
                            jsp_page = 'traffic_square_dep.jsp';
                        }else if(layer === 'Smart pole'){
                            jsp_page = 'smart_pole_dep.jsp';
                        }
                        
                        if(jsp_page !== ''){
                        	window.location = window.location.origin
                            + window.iscdl.appData.webURLPrefix +jsp_page;
                    	}else{
                    		$u.notify('info', 'Notification',
									'No Data available', '');
							return;
                    	}
                    
                });
                

				$('#manage_project').click(function(){
					window.location = window.location.origin
					+ window.iscdl.appData.webURLPrefix + "project_monitoring.jsp"; 
				});
				
				$('#project_report').click(function(){
					window.location = window.location.origin
					+ window.iscdl.appData.webURLPrefix + "project_reports.jsp"; 
				});
				
				$('#project_alerts_option').click(function(){
					$('#project_alerts_tab').html("");
					window.department2dMap.getProjectAlerts();
				});

				function showAnnounceDataLocation(location) {
					// zoom to the users location and add a graphic
					var pt = new Point(location.coords.longitude,
							location.coords.latitude);
					$('#announce_latitude').val(pt.y.toFixed(6));
					$('#announce_longitude').val(pt.x.toFixed(6));
				}
				
				
				
				function removeCursor() {
					if (mapClickEvtHandler != undefined) {
						mapClickEvtHandler.remove();
						map.setMapCursor("default");
					}
				}
				
				
				function removeLatLongError(ipId,lblId){
					$('#'+ipId).removeClass('error');
					$('#'+lblId).remove();
				}
				
				function initFunc(map) {
			          if( navigator.geolocation ) {  
			            navigator.geolocation.getCurrentPosition(zoomToGeoLocation, locationError);
			          } else {
			            alert("Browser doesn't support Geolocation.");
			          }
			    }
				
				function dynamicLayerList(){
						window.layerDataController.createDynamicLayerList();
//						$(".list-item").change(function(){
//							if(opacity_layer){
//								map.removeLayer(opacity_layer);	
//							}
//							var visible = [];
//							$('#accordionExample .layers-toggle-body input:checked').each(function() {
//							   let visible_id = $(this).data('layerid');
//								if(visible_id){
//									visible.push(visible_id);	
//							    }
//							});
//							
//							 if (visible.length === 0) {
//						            visible.push(-1);
//						     }
//							 symbology_layers.setVisibleLayers(visible);
//						});
						
						
						$("input[type='checkbox'][class='list-item']").on("change", function () {
							
							var checkbox = $(this);
					        var checkboxValue = checkbox.val();
					        var table_name = $(this).attr("data-layerid");
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
						
						$(".multiselectde").click(function () {
							if(opacity_layer){
								map.removeLayer(opacity_layer);	
							}
							
							let current_id = $(this).attr('id');
							let a ="#cor_d_c"+current_id + " .layers-toggle-body";
							let checked_prop = $(this).prop('checked');
							$(a).find("input").each(function(){
								let child_id  = $(this).attr('id');
								$("#"+child_id).prop('checked', checked_prop);
							});
							
							var visible = [];
							
							$('#accordionExample .layers-toggle-body input:checked').each(function() {
								let visible_id = $(this).data('layerid');
								let department_id = $(this).data('departmentid');
								
								if(visible_id){
									visible.push(visible_id);	
							    }
							});
							
							 if (visible.length === 0) {
						            visible.push(-1);
						     }
							 symbology_layers.setVisibleLayers(visible);
					    });
						
						$('.zoom-to-layer').click(function(){
							let layer_id = $(this).attr('id');
							let department_id = $(this).attr('depart-id');
							
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
					
					//bind HTML content
					let search_layer_content = '<div class="checkbox"><label><input type="checkbox" title="On/Off Layer"></label></div>' +
					'<select class="selectpicker" id="search_layers" data-live-search="true">';
					
					let layer_html = "<option value='-1' selected='selected' disabled='disabled'>Select Layer</option>";
					
					//get all layer name with layer id and visibility
					$('#accordionExample .layers-toggle-body input').each(function() {
						let layer_id = $(this).data('layerid');
						let layer_name = $(this).val();
						let visibility = $(this).prop('checked');
						let select_html = "<option data-visibility='"+visibility+"' value='"+layer_id+"'>" + layer_name+ "</option>";
						search_layer_content += select_html;
					});
					//append all HTML in search layer div
					let search_layer_data_content = layer_html + search_layer_content + '</select></div>';
			        $("#search_layers").html(search_layer_data_content).selectpicker('refresh');
					
			        //search layer dropdown change event
					$("#search_layers").change(function(){
						$('#visibility_layer').prop('disabled',false);
						let layer_id = $(this).val();
						let layer_name = $("#search_layers option:selected").text();
						let visibility = $(this).find(':selected').data('visibility');
						$("#visibility_layer").prop('checked',visibility);
					});
					
					//visibility layer checkbox change event
					$("#visibility_layer").change(function(){
						if(opacity_layer){
							map.removeLayer(opacity_layer);	
						}
						let current_layer_id = $("#search_layers option:selected").val();
						
						if(current_layer_id == -1){
							$('#visibility_layer').prop('disabled',true);
							$("#visibility_layer").prop("checked",false);
							return;
						}
						
						
						let current_visible_status = $("#visibility_layer").prop('checked');
						
						//update checkbox status in layer panel
						$('#accordionExample .layers-toggle-body input').each(function() {
							let layer_id = $(this).data('layerid');
							let child_id  = $(this).attr('id');
							if(current_layer_id == layer_id){
								$("#"+child_id).prop('checked', current_visible_status);
							}
						});
						//visible layer display on map after updating checkbox
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
				
				function showCoordinates(evt) {
			          var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
			          $("#coordinateDiv").text("Latitude : " + mp.y.toFixed(4) + " " +"Longitude : " +  mp.x.toFixed(4));
			    }
				
				function mapExtentChange(){
					$('#accordionExample .layers-toggle-body input:checked').each(function() {
						   let visible_id = $(this).attr('id');
						   let scale = $(this).data('scale');
							if(map.getScale() < scale || scale == 0){
								$("#"+visible_id).attr("disabled", false);
							}else{
								$("#"+visible_id).attr("disabled", true);
							}
						});
				}
				
				function zoomToGeoLocation(location) {
					_current_long = location.coords.longitude;
					_current_lat = location.coords.latitude;
					
					localStorage.setItem("c_lat",_current_lat.toFixed(6));
					localStorage.setItem("c_long",_current_long.toFixed(6));
				}
				
				var bookmarkList = [];
				
				/**
				 * COMMON FUNCTIONS
				 */
					let base = {

							getAnnouncementList : function getAnnouncementList(){
								
								let token_val = localStorage.getItem('token');
								
								if(token_val == "" || token_val == undefined || token_val == null){
									$u.notify('info', 'Notification',
											'You are not authorized user', '');
									return;
								}
								
								let result;
								
								let announcementInfoObj;
								
								let did = window.depUtlityController.getDepartmentId();
								
								if(did != window.departmentData._department_id){
									announcementInfoObj = {
											department_id : did
									}					
								}else{
									announcementInfoObj = {};
								}
								
								let postData = JSON.stringify(announcementInfoObj);
								
								$.ajax({
									method : 'POST',
									url : window.iscdl.appData.baseURL + "api/announcement/getAnnouncementList",
									data : postData,
									contentType : 'application/json',
									async : false,
									beforeSend : function(request) {
										request.setRequestHeader('Authorization', 'Bearer '
												+ localStorage.getItem('token'));
									},
									success : function(result) {
										if (!$.isEmptyObject(result) && result != null) {
											try {
												result = JSON.parse(result);
												let str = "";
												if (result.responseCode == '200') {
													let response = result.data;
													let length = result.data.length;
													if(length > 0){
														for (let i in result.data){
															let api_data = result.data[i];
															
															let html = "<div class='aut-content'>"
//																+ (api_data.is_new && api_data.is_new === true ? 
//																	"<button class='btn-indore new-announcement'>New!</button>" : " ")	
																+ "<h6>"
																+ api_data.announcement_title
																+ "</h6>"
																+ "<span>" + api_data.announcement_datetime
																+ "</span><p>"	+ api_data.announcement_description + 
																		"<a data-latitude='"+api_data.latitude+"' data-longitude='"+api_data.longitude+"' " +
																		"data-title = '"+api_data.announcement_title+"' data-description = '"+api_data.announcement_description+"'" +
																		"class='announce_desc' onclick='window.department2dMap.zoomToAnnouncement(this)'>" +
																		"<i class='fa fa-search announcement-zoom' aria-hidden='true' " +
																		"title='Zoom To Announcement'></i></a></p></div>";
															
															/*
															 * let html = "<div
															 * class='aut-content'><h6>"+
															 * result.data[i].announcement_title +"</h6><p>" +
															 * result.data[i].announcement_description +"</p></div>";
															 */
															str += html;
														}
													}else{
														let html = "<div class='aut-content'><h6>No Announcements.</h6></div>";
														str += html;
													}
													$('#viewAnnouncement').append(str);
												} else {
													$u.notify('error', 'Notification',
															'Something went wrong while fetching announcement list', '');
												}
											} catch (err) {
												console.log(err);
											}
										} else {
											$u.notify('error', 'Notification',
													'Announcement data not available', '');
										}
									},
									error : function(e) {
										console.log(e);
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
								
								map.graphics.clear();
								let graphic = new Graphic(announcement_point, markerSymbol)
								map.graphics.add(graphic);
								// addGraphic(announcement_point);
								
								let template_content = "";					
								let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
								  '<tbody>';
								table_content += '<tr><td><b>Title</b></td><td>'+title+'</td></tr>' + 
								'<tr><td><b>Description</b></td><td>'+description+'</td></tr>' + 
								'<tr><td><b>Latitude</b></td><td>'+latitude+'</td></tr>' + 
								'<tr><td><b>Longitude</b></td><td>'+longitude+'</td></tr>';
								template_content += table_content + '</tbody></table>';
								let announcement_infoTemplate = new InfoTemplate("Announcement",template_content);
								graphic.setGeometry(announcement_point);
								graphic.setInfoTemplate(announcement_infoTemplate);
								map.centerAndZoom(announcement_point,18); 
								map.infoWindow.setTitle(graphic.getTitle());
								map.infoWindow.setContent(graphic.getContent());
								map.infoWindow.show(announcement_point);
								window.depUtlityController.minimizePopup();
							},
							setBookmarkInfo : function setBookmarkInfo(){
								
								let user_id = localStorage.getItem('user_data');
								let bookmark_name = $("#bookmark_name").val().trim();
								
								if(bookmark_name == undefined || bookmark_name == null || bookmark_name == ""){
									$u.notify('info', 'Notification',
											'Please enter bookmark title', '');
									return;
								}
								
								/*
								let current_extent = map._getAvailExtent();
								let xmin = current_extent.xmin;
								let ymin = current_extent.ymin;
								let xmax = current_extent.xmax;
								let ymax = current_extent.ymax;
								let srs = current_extent.spatialReference.wkid;
								*/
								
								let current_extent = map.getView().calculateExtent(map.getSize());
							
								let xmin = current_extent[0];
								let ymin = current_extent[1];
								let xmax = current_extent[2];
								let ymax = current_extent[3];
								let srs = 3857;
								
								if(user_id != undefined && user_id != null && user_id != ""){
									window.department2dMap.addBookmark(bookmark_name,user_id,xmin,ymin,xmax,ymax,srs);	
								}else{
									
									if(bookmarkList.includes(bookmark_name.trim())){
										$u.notify('info', 'Notification',
												'Bookmark with title '+ bookmark_name.trim() +' already exists.', '');
										return;
									}else{
										window.department2dMap.prepareBookmarkListForCitizenUser(bookmark_name,xmax,xmin,ymax,ymin,srs);
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
													
													window.department2dMap.prepareBookmarkListForLoginUser("",bookmark_name,xmax,xmin,ymax,ymin,srs);
													
													let user_id = localStorage.getItem('user_data');
													
													if(user_id != undefined && user_id != null && user_id != ""){
														window.department2dMap.getBookMarkList(user_id);	
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
							prepareBookmarkListForLoginUser : function prepareBookmarkListForLoginUser(bookmark_id,bookmark_name,xmax,xmin,ymax,ymin,srs){
								
								$('#bookmark-data').append("<div class='main-book-val' id="+bookmark_id+"><input type='checkbox' data-bookmark = "+bookmark_id+" value ="+bookmark_name+" name='bookmarkNames' " +
										"class='form-control main-book-in'>" +
										"<img src='images/icons/Bookmark-72.svg' class='main-book-img' data-xmax='"+xmax+"' data-xmin='"+xmin+"' data-ymax='"+ymax+"' " +
												"data-ymin='"+ymin+"' data-srs='"+srs+"' onclick='window.department2dMap.zoomToBookmark(this)'>" +
										"<div class='bookmark-val' id='mine' title="+bookmark_name+">"+bookmark_name+"</div></div>");
							},
							prepareBookmarkListForCitizenUser : function prepareBookmarkListForCitizenUser(bookmark_name,xmax,xmin,ymax,ymin,srs){
								$('#bookmark-data').append("<div class='main-book-val' id="+bookmark_name+"><input type='checkbox' value ="+bookmark_name+" name='citiBookmarkNames' " +
										"class='form-control main-book-in'>" +
										"<img src='images/icons/Bookmark-72.svg' class='main-book-img' data-xmax='"+xmax+"' data-xmin='"+xmin+"' data-ymax='"+ymax+"' " +
												"data-ymin='"+ymin+"' data-srs='"+srs+"' onclick='window.department2dMap.zoomToBookmark(this)'>" +
										"<div class='bookmark-val' id='mine' title="+bookmark_name+">"+bookmark_name+"</div></div>");
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
														
														window.department2dMap.prepareBookmarkListForLoginUser(id,title,xmax,xmin,ymax,ymin,wkid);
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
														window.department2dMap.getBookMarkList(user_id);	
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
							zoomToBookmark : function zoomToBookmark(data){
								let xmin = $(data).data("xmin");
								let xmax = $(data).data("xmax");
								let ymin = $(data).data("ymin");
								let ymax = $(data).data("ymax");
								let wkid = $(data).data("srs");
								
								/*
								let bookmarkExtent = new Extent(xmin, ymin, xmax, ymax,
										new SpatialReference({
											wkid : wkid
								}));
								map.setExtent(bookmarkExtent);*/
								
								var myExtent = [xmin,ymin,xmax,ymax];
								map.getView().fit(myExtent , map.getSize());
							},
							createBasicQuery : function createBasicQuery(ward_id,layer_url,field_name,field_value){
								queryTask = new QueryTask(layer_url);
								
								let field_type = "";
								
								for(let i=0 ; i < fieldInfo.length ; i++){
									let fieldInfo_value = fieldInfo[i].Value;
									
									if(field_name == fieldInfo_value){
										field_type = fieldInfo[i].Type;
										break;
									}
								}
								
								let query = new Query();
						        query.returnGeometry = true;
						        query.outFields = ["*"];
						        query.where = "";
						        
						        
						       if((layer_url != "" || layer_url != null) && (ward_id == null || ward_id == "") && 
						    		   (field_name == null || field_name == "") &&  (field_value == null || field_value == "")){
						    	   query.where = "1=1";
						       }else{
						    	   if(ward_id != ""){
							        	if(query.where != ""){
							        		query.where += " AND ";
							        	}
							        	query.where += "ward_no = " + ward_id + " ";
							        }
							        
							        if(field_type == "esriFieldTypeOID" || field_type == "esriFieldTypeSmallInteger" 
										|| field_type == "esriFieldTypeInteger" || field_type == "esriFieldTypeDouble"){
							        	
							        	if(query.where != ""){
							        		query.where += " AND ";
							        	}
							        	
							        	query.where += " "+field_name+" = " + field_value + " ";
									
							        }else if(field_type == "esriFieldTypeString" || field_type == "esriFieldTypeDate"){
							        	if(query.where != ""){
							        		query.where += " AND ";
							        	}
							        	query.where += " "+field_name+" = '" + field_value + "'";
									}
						       }
						       return query;
							},
							createAdvancedQuery : function createAdvancedQuery(ward_id,layer_url,field_value,logical_operator,logical_value,
									f_operator,f_field_name,f_logical_operator,f_value,
									s_operator,s_field_name,s_logical_operator,s_value){
								
								queryTask = new QueryTask(layer_url);
						         
								let field_type = "";
								let f_field_type = "";
								let s_field_type = "";
								
								for(let i=0 ; i < fieldInfo.length ; i++){
									let fieldInfo_value = fieldInfo[i].Value;
									
									if(field_value == fieldInfo_value){
										field_type = fieldInfo[i].Type;
										continue;
									}
									
									if(f_field_name != undefined){
										if(f_field_name == fieldInfo_value){
											f_field_type = fieldInfo[i].Type;
											continue;
										}
									}
									
									if(s_field_name != undefined){
										if(s_field_name == fieldInfo_value){
											s_field_type = fieldInfo[i].Type;
											continue;
										}
									}
								}
								
								let query = new Query();
						        query.returnGeometry = true;
						        query.outFields = ["*"];
						        query.where = "";
						        
						        if(ward_id != ""){
						        	if(query.where != ""){
						        		query.where += " AND ";
						        	}
						        	query.where += "ward_no = " + ward_id + " ";
						        }
						        
						        if(field_type == "esriFieldTypeOID" || field_type == "esriFieldTypeSmallInteger" 
									|| field_type == "esriFieldTypeInteger" || field_type == "esriFieldTypeDouble"){
						        	
						        	if(query.where != ""){
						        		query.where += " AND ";
						        	}
						        	
						        	query.where += " "+field_value+" "+logical_operator+" " + logical_value + " ";
								
						        }else if(field_type == "esriFieldTypeString" || field_type == "esriFieldTypeDate"){
						        
						        	if(query.where != ""){
						        		query.where += " AND ";
						        	}
						        	
						        	query.where += " "+field_value+" "+logical_operator+" '" + logical_value + "'";
								}
						        
						        if(f_operator != undefined || f_field_name != undefined || f_logical_operator != undefined || f_value != undefined){
									
						        	if(f_field_type == "esriFieldTypeOID" || f_field_type == "esriFieldTypeSmallInteger" 
										|| f_field_type == "esriFieldTypeInteger" || f_field_type == "esriFieldTypeDouble"){
							        	
							        	if(query.where != ""){
							        		query.where += " "+f_operator+" ";
							        	}
							        	
							        	query.where += " "+f_field_name+" "+f_logical_operator+" " + f_value + " ";
									
							        }else if(f_field_type == "esriFieldTypeString" || f_field_type == "esriFieldTypeDate"){
							        
							        	if(query.where != ""){
							        		query.where += " "+f_operator+" ";
							        	}
							        	
							        	query.where += " "+f_field_name+" "+f_logical_operator+" '" + f_value + "'";
									}
						        }
						        
						        /**
								 * second query filter
								 */
						        
						        if(s_operator != undefined || s_field_name != undefined || s_logical_operator != undefined || s_value != undefined){
									
						        	if(s_field_type == "esriFieldTypeOID" || s_field_type == "esriFieldTypeSmallInteger" 
										|| s_field_type == "esriFieldTypeInteger" || s_field_type == "esriFieldTypeDouble"){
							        	
							        	if(query.where != ""){
							        		query.where += " "+s_operator+" ";
							        	}
							        	
							        	query.where += " "+s_field_name+" "+s_logical_operator+" " + s_value + " ";
									
							        }else if(field_type == "esriFieldTypeString" || field_type == "esriFieldTypeDate"){
							        
							        	if(query.where != ""){
							        		query.where += " "+s_operator+" ";
							        	}
							        	query.where += " "+s_field_name+" "+s_logical_operator+" " + s_value + " ";
									}
						        }
						        
						        return query;
							},
							bindQueryFeatures : function bindQueryFeatures(result){
								let total_feature = result.features.length;
								
								$("#department_queries_rslt").append("<h3 id='total_features_length'>Number of features found : " 
										+ 1 + "/" +total_feature+ "</h3>" +	
										"<div class='np-main w-100 p-0'>" +
										"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
										"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
								"</div>");
								
								let styleColor = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
						 	              new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
						 	              new Color([255,0,0]), 2),new Color([255,255,0,0.25])
						 	    );
								
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
					 				 let  info_template_content = "";
					 				
					 				let first = "<div class='query-result-main kyp-list query-resultDiv-seperator depart-basic-query'>";
					 				
					 				query__html_content += first;
					 				 
					 				let latitude = "";
					 				let longitude = "";
					 				
					 				let second = "";
					 				 
					 				 for(let a=0;a<length;a++){
					 					
					 					let key  = Object.keys(columns)[a];
					 					
					 					if(key == "objectid" || key == "objectid_1"  || key == "OBJECTID" || key == "OBJECTID_1"){
											continue;
										}
					 					
					 					let attr = feature.attributes[key];
					 					
					 					if(attr == null || attr == "" || attr == "null"){
					 						attr = "";
					 					}
					 					let columnName = window.department2dMap.getFeatureColumnName(key);
					 					second = "<div class='result-task'><label>"+columnName+":</label><p>" +attr+ "</p></div>";
					 					
					 					query__html_content += second;
					 					info_template_content += "<b>" +columnName + ":" + "</b>" +attr+ "<br/>";
					 				}
					 				 
					 				let zoomFeature = "<div class='result-task'><i id= basic_query_data_"+i+" class='fa fa-search query-zoom-feature' " +
					 						"aria-hidden='true' title='Zoom To Feature' data-longitude="+x+" data-latitude="+y+" " +
					 						"data-longitude="+x+" data-latitude="+y+" " +
					 						"onclick='window.department2dMap.zoomToQueryFeatures(this)'></i></div>";
					 				 
					 				query__html_content += zoomFeature;
					 			
					 				let third = "</div>";
					 				query__html_content += third;
				 					
					 				let queryTemplate = new InfoTemplate("Feature Information",info_template_content);
				 	                feature.setInfoTemplate(queryTemplate);
					 				
				 	                $("#department_queries_rslt").append(query__html_content);
						 	         graphic.setSymbol(styleColor);
						 	         graphic.setInfoTemplate(queryTemplate);
						 	         map.graphics.add(graphic);
						 	         resultedFeaturesLayer.add(graphic);
								 }	
								 
								 if(total_feature == 1){
										$(".query-result-main").addClass("single-record");
									}else{
										$(".query-result-main").removeClass("single-record");
									}
								 
								 window.department2dMap.previousNextFeature(total_feature,'.query-result .depart-basic-query','basic_query_data_');
							},
							bindAdvancedQueryFeatures : function bindAdvancedQueryFeatures(result){
								
								let total_feature = result.features.length;
								
								$("#department_queries_rslt").append("<h3 id='total_features_length'>Number of features found : " 
										+ 1 + "/" +total_feature+ "</h3>" +	
										"<div class='np-main w-100 p-0'>" +
										"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
										"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
								"</div>");
								
								let styleColor = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
						 	              new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
						 	              new Color([255,0,0]), 2),new Color([255,255,0,0.25])
						 	    );
								
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
					 				 let  info_template_content = "";
					 				
					 				let first = "<div class='query-result-main kyp-list depart-advanced-query'>";
					 				
					 				query__html_content += first;
					 				 
					 				let latitude = "";
					 				let longitude = "";
					 				
					 				let second = "";
					 				 
					 				 for(let a=0;a<length;a++){
					 					
					 					let key  = Object.keys(columns)[a];
					 					
					 					if(key == "objectid" || key == "objectid_1"  || key == "OBJECTID" || key == "OBJECTID_1"){
											continue;
										}
					 					
					 					let attr = feature.attributes[key];
					 					
					 					if(attr == null || attr == "" || attr == "null"){
					 						attr = "";
					 					}
					 					
					 					let columnName = window.department2dMap.getFeatureColumnName(key);
					 					second = "<div class='result-task'><label>"+columnName+":</label><p>" +attr+ "</p></div>";
					 					
					 					query__html_content += second;
					 					info_template_content += "<b>" +columnName + ":" + "</b>" +attr+ "<br/>";
					 				}
					 				 
					 				let zoomFeature = "<div class='result-task'><i id= advanced_query_data_"+i+" class='fa fa-search query-zoom-feature' " +
			 							"aria-hidden='true' title='Zoom To Feature' data-longitude="+x+" data-latitude="+y+" " +
			 							"data-longitude="+x+" data-latitude="+y+" " +
				 						"onclick='window.department2dMap.zoomToAdvancedQueryFeatures(this)'></i></div>";
			 				 
					 				query__html_content += zoomFeature;
					 			
					 				let third = "</div>";
					 				query__html_content += third;
				 					
					 				let queryTemplate = new InfoTemplate("Feature Information",info_template_content);
				 	                feature.setInfoTemplate(queryTemplate);
					 				
				 	                $("#department_queries_rslt").append(query__html_content);
						 	         graphic.setSymbol(styleColor);
						 	         graphic.setInfoTemplate(queryTemplate);
						 	         map.graphics.add(graphic);
						 	         resultedFeaturesLayer.add(graphic);
								 }
								 
								 if(total_feature == 1){
										$(".query-result-main").addClass("single-record");
									}else{
										$(".query-result-main").removeClass("single-record");
									}
								 
								 window.department2dMap.previousNextFeature(total_feature,'.query-result .depart-advanced-query','advanced_query_data_');
							},
							zoomToQueryFeatures : function zoomToQueryFeatures(data){
								let latitude = $(data).data("latitude");
								let longitude = $(data).data("longitude");
								
								let geometryService = new esri.tasks.GeometryService(window.prefix_layer_url + "Utilities/Geometry/GeometryServer");
				 	        	let PrjParamsmin = window.department2dMap.convertCoordinateMeterToDegree(longitude,latitude);
				 	        	
				 	        	let layerName = $( "#bas_layer option:selected" ).text();
								let pictureSymbol = window.department2dMap.getIconByLayerName(layerName);
								
								if(pictureSymbol == ""){
									pictureSymbol = markerSymbol;
								}
				 	        	
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
							},
							zoomToAdvancedQueryFeatures : function zoomToAdvancedQueryFeatures(data){
								let latitude = $(data).data("latitude");
								let longitude = $(data).data("longitude");
								
				 	        	let layerName = $( "#advanced_layer option:selected" ).text();
								let pictureSymbol = window.department2dMap.getIconByLayerName(layerName);
								
								if(pictureSymbol == ""){
									pictureSymbol = markerSymbol;
								}
								
								let geometryService = new esri.tasks.GeometryService(window.prefix_layer_url  + "Utilities/Geometry/GeometryServer");
				 	        	let PrjParamsmin = window.department2dMap.convertCoordinateMeterToDegree(longitude,latitude);
				 	        	
				 	        	 geometryService.project(PrjParamsmin, function (outputpoint) {
				 	        		let olatitude = outputpoint[0].y;
						            let olongitude = outputpoint[0].x;
									let query_point = new Point(olongitude,olatitude);
									
									//let basic_query_infoTemplate = new InfoTemplate("Feature Information", "<b>latitude :</b>"+olatitude.toFixed(6)+"<br><b>Longitude :</b>"+olongitude.toFixed(6)+"<br>");
									map.graphics.clear();
									let graphic = new Graphic(query_point, pictureSymbol);
									map.graphics.add(graphic);
									//graphic.setInfoTemplate(basic_query_infoTemplate);
									graphic.setGeometry(query_point);
									map.centerAndZoom(query_point,18);
									window.depUtlityController.minimizePopup();
				 	        	 });
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
							bindFeatureOfPolygonBuffer : function bindFeatureOfPolygonBuffer(result){
								
								$('#polygon_buffer_rslt').html("");
								
								let styleColor = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
						 	              new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
						 	              new Color([255,0,0]), 2),new Color([255,255,0,0.25])
						 	    );
								
								let total_features = result.features.length;
								
								$("#polygon_buffer_rslt").append("<h3 id='total_features_length'>Number of features found : "+ 1 + "/" +total_features+"</h3>" + 
										"<div class='np-main w-100 p-0'>" +
										"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
										"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
										"</div>");
								
								 for (var i = 0; i < total_features; i++) {
									 let feature = result.features[i];
									 let graphic = feature; 
									 let geometry = feature.geometry;
									 
									 let x  = geometry.x;
					        		 let y = geometry.y;
					        		 let srs = geometry.spatialReference.wkid;
					        		 
					        		 var columns = feature.attributes;
					 				 let length = Object.keys(columns).length;
					 				 
					 				 let query__html_content = "";
					 				 let  info_template_content = "";
					 				
					 				let first = "<div class='query-result-main kyp-list query-resultDiv-seperator depart-polygon-draw-buffer-result'>";
					 				
					 				query__html_content += first;
					 				 
					 				let latitude = "";
					 				let longitude = "";
					 				
					 				let second = "";
					 				 
					 				 for(let a=0;a<length;a++){
					 					
					 					let key  = Object.keys(columns)[a];
					 					
					 					if(key == "objectid" || key == "objectid_1"  || key == "OBJECTID" || key == "OBJECTID_1"){
											continue;
										}
					 					
					 					let attr = feature.attributes[key];
					 					
					 					if(attr == null || attr == "" || attr == "null"){
					 						attr = "";
					 					}
					 					let columnName = window.department2dMap.getFeatureColumnName(key);
					 					second = "<div class='result-task'><label>"+columnName+":</label><p>" +attr+ "</p></div>";
					 					
					 					query__html_content += second;
					 					info_template_content += "<b>" +columnName + ":" + "</b>" +attr+ "<br/>";
					 				}
					 				 
					 				let zoomFeature = "<div class='result-task'><i id= polygon_buffer_"+i+" class='fa fa-search query-zoom-feature' " +
			 						"aria-hidden='true' title='Zoom To Feature' data-longitude="+x+" data-latitude="+y+" " +
					 						"onclick='window.department2dMap.zoomToPolygonBufferFeatures(this)'></i></div>";
				 				
					 				query__html_content += zoomFeature;
					 			
					 				let third = "</div>";
					 				query__html_content += third;
				 					
					 				let queryTemplate = new InfoTemplate("Feature Information",info_template_content);
				 	                feature.setInfoTemplate(queryTemplate);
				 	                $("#polygon_buffer_rslt").append(query__html_content);
						 	         graphic.setSymbol(styleColor);
						 	         graphic.setInfoTemplate(queryTemplate);
						 	         map.graphics.add(graphic);
						 	        resultedFeaturesLayer.add(graphic);
							}
								 
								 if(total_features == 1){
										$(".query-result-main").addClass("single-record");
									}else{
										$(".query-result-main").removeClass("single-record");
									}
								 
								window.department2dMap.previousNextFeature(total_features,'.query-result .depart-polygon-draw-buffer-result','polygon_buffer_');	 
						},
						zoomToPolygonBufferFeatures : function zoomToPolygonBufferFeatures(data){
							
							let latitude = $(data).data("latitude");
							let longitude = $(data).data("longitude");
							
							let point = new Point(longitude,latitude);
							
							let selected_query_layer = $("#polygon_buffer_layer option:selected").text();
							
							let pictureSymbol = window.department2dMap.getIconByLayerName(selected_query_layer);
							
							if(pictureSymbol == ""){
								pictureSymbol = markerSymbol;
							}

							let converted_point = webMercatorUtils.webMercatorToGeographic(point);
							
							let olatitude = converted_point.y;
				            let olongitude = converted_point.x;
							let query_point = new Point(olongitude,olatitude);
							
							//let basic_query_infoTemplate = new InfoTemplate("Feature Information", "<b>latitude :</b>"+olatitude.toFixed(6)+"<br><b>Longitude :</b>"+olongitude.toFixed(6)+"<br>");
							map.graphics.clear();
							let graphic = new Graphic(query_point, pictureSymbol);
							map.graphics.add(graphic);
							//graphic.setInfoTemplate(basic_query_infoTemplate);
							graphic.setGeometry(query_point);
							map.centerAndZoom(query_point,18);
							window.depUtlityController.minimizePopup();
						},
						performSpatialQuery : function performSpatialQuery(ward_id,source_layer,mask_layer,query_type){
							var n = 0;
							let source_layer_url = window.layerDataController.getLayerById(source_layer);
							let mask_layer_url = window.layerDataController.getLayerById(mask_layer);
							
							queryTask = new QueryTask(mask_layer_url);
							let maskQuery = new Query();
							maskQuery.returnGeometry = true;
							maskQuery.outFields = ["*"];
							maskQuery.where = "1=1";
							
							 $(".loader").fadeIn();
						    queryTask.execute(maskQuery,function(result){
					        	map.graphics.clear();
					        	
					        	for(let a in result.features){
					        		var mask_feature = result.features[a];
									var mask_geom = mask_feature.geometry;
									queryTask = new QueryTask(source_layer_url);
							        
									let sourceQuery = new Query();
							         sourceQuery.returnGeometry = true;
							         sourceQuery.outFields = ["*"];
							         sourceQuery.geometry = mask_geom;
							         
							         if(query_type == "Intersect"){
							        	 srType = Query.SPATIAL_REL_INTERSECTS;
							         }else if(query_type == "Contains"){
							        	 srType = Query.SPATIAL_REL_CONTAINS;
							         }else if(query_type == "Within"){
							        	 srType = Query.SPATIAL_REL_WITHIN;
							         }
							         
							         sourceQuery.spatialRelationship = srType;
							         $(".loader").fadeIn();
							         queryTask.execute(sourceQuery,function(result){
							        	 
							        	 $('#query_result_tab a[href="#dep_query_result"]').tab('show');
							        	 map.graphics.clear();
							        	 map.removeLayer(resultedFeaturesLayer);
							        	 n = 0;
							        	 
							        	 for(let a in result.features){
								        		var resultfeature = result.features[a];
								        		if(resultfeature.attributes.ward_no == ward_id){
								        			n++;
								        		}
							        	 }
							        	 
							        	 if(n != 0){
							        		 $("#department_queries_rslt").append("<h3 id='total_features_length'>Number of features found : " 
														+ 1 + "/" +n+ "</h3>" +	
														"<div class='np-main w-100 p-0'>" +
														"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
														"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
												"</div>");
							        	 }
							        	 
							        	 for(let a in result.features){
								        		var resultfeature = result.features[a];
								        		if(resultfeature.attributes.ward_no == ward_id){
								        			window.department2dMap.bindSpatialQueryFeatures(resultfeature,a);
								        		}
							        	 }
							        	 
							        	 if(n != 0){
							        		 if(n == 1){
													$(".query-result-main").addClass("single-record");
												}else{
													$(".query-result-main").removeClass("single-record");
												}
											 window.department2dMap.previousNextFeature(n,'.query-result .dept-spatial-query-result','spatial_query_data_');
							        	 }
							         },function(error){
							        	   console.log(error);
							        	   $(".loader").fadeOut();
							         });
					        	}
						    },function(error){
					        	   console.log(error);
					        	   $(".loader").fadeOut();
					         });
						    
						    setTimeout(() => {
						    	var spatial_query_rslt_content = $("#department_queries_rslt").html();
						    	if(spatial_query_rslt_content == ""){
						    		$(".loader").fadeOut();
						    		$u.notify("info","Notification","No result found");
						    		return;
						    	}
					        	 $(".loader").fadeOut();	
							}, 3000);
						},
						bindSpatialQueryFeatures : function bindSpatialQueryFeatures(feature,i){

							let styleColor = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					 	              new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
					 	              new Color([255,0,0]), 2),new Color([255,255,0,0.25])
					 	    );
							
							 let graphic = feature; 
							 let geometry = feature.geometry;
							 
							 let x  = geometry.x;
			        		 let y = geometry.y;
			        		 let srs = geometry.spatialReference.wkid;
			        		 
			        		 var columns = feature.attributes;
			 				 let length = Object.keys(columns).length;
			 				 
			 				 let query__html_content = "";
			 				 let  info_template_content = "";
			 				
			 				let first = "<div class='query-result-main kyp-list query-resultDiv-seperator dept-spatial-query-result'>";
			 				
			 				query__html_content += first;
			 				 
			 				let latitude = "";
			 				let longitude = "";
			 				
			 				let second = "";
			 				 
			 				 for(let a=0;a<length;a++){
			 					let key  = Object.keys(columns)[a];
			 					
			 					if(key == "objectid" || key == "objectid_1"  || key == "OBJECTID" || key == "OBJECTID_1"){
									continue;
								}
			 					
			 					let attr = feature.attributes[key];
			 					if(attr == null || attr == "" || attr == "null"){
			 						attr = "";
			 					}
			 					let columnName = window.department2dMap.getFeatureColumnName(key);
			 					second = "<div class='result-task'><label>"+columnName+":</label><p>" +attr+ "</p></div>";
			 					query__html_content += second;
			 					info_template_content += "<b>" +columnName + ":" + "</b>" +attr+ "<br/>";
			 				}
			 				 

			 				 let zoomFeature = "<div class='result-task'><i id= spatial_query_data_"+i+" class='fa fa-search query-zoom-feature' " +
		 						"aria-hidden='true' title='Zoom To Feature' data-longitude="+x+" data-latitude="+y+" " +
		 						"data-longitude="+x+" data-latitude="+y+" " +
			 						"onclick='window.department2dMap.zoomToSpatialQueryFeatures(this)'></i></div>";
			 				
			 				 query__html_content += zoomFeature;
			 				 
			 				let third = "</div>";
			 				query__html_content += third;
		 					
			 				let queryTemplate = new InfoTemplate("Feature Information",info_template_content);
		 	                feature.setInfoTemplate(queryTemplate);
			 				
		 	                $("#department_queries_rslt").append(query__html_content);
				 	         graphic.setSymbol(styleColor);
				 	         graphic.setInfoTemplate(queryTemplate);
				 	         map.graphics.add(graphic);
				 	         resultedFeaturesLayer.add(graphic);
						},
						zoomToSpatialQueryFeatures : function zoomToSpatialQueryFeatures(data){
							
							let latitude = $(data).data("latitude");
							let longitude = $(data).data("longitude");
							
							let geometryService = new esri.tasks.GeometryService(window.prefix_layer_url + "Utilities/Geometry/GeometryServer");
			 	        	let PrjParamsmin = window.department2dMap.convertCoordinateMeterToDegree(longitude,latitude);
			 	        	
			 	        	let layerName = $( "#sp_source_layer option:selected" ).text();
							let pictureSymbol = window.department2dMap.getIconByLayerName(layerName);
							
							if(pictureSymbol == ""){
								pictureSymbol = markerSymbol;
							}
			 	        	
			 	        	 geometryService.project(PrjParamsmin, function (outputpoint) {
			 	        		let olatitude = outputpoint[0].y;
					            let olongitude = outputpoint[0].x;
								let query_point = new Point(olongitude,olatitude);
								let spatial_query_infoTemplate = new InfoTemplate("Feature Information", "<b>latitude :</b>"+olatitude.toFixed(6)+"<br><b>Longitude :</b>"+olongitude.toFixed(6)+"<br>");
								map.graphics.clear();
								let graphic = new Graphic(query_point, pictureSymbol);
								map.graphics.add(graphic);
								graphic.setInfoTemplate(spatial_query_infoTemplate);
								graphic.setGeometry(query_point);
								map.centerAndZoom(query_point,18);
								window.depUtlityController.minimizePopup();
			 	        	 });
						},
						getProjectAlerts : function getProjectAlerts(){
								
								let token_val = localStorage.getItem('token');
								
								if(token_val == "" || token_val == undefined || token_val == null){
									$u.notify('info', 'Notification',
											'You are not authorized user', '');
									return;
								}
								
								let result,alertObj;
								
								let did = window.depUtlityController.getDepartmentId();
								
								if(did != window.departmentData._department_id){
									alertObj = {
											department_id : did
									}					
								}else{
									alertObj = {};
								}
								
								let postData = JSON.stringify(alertObj);
								
								$.ajax({
									method : 'POST',
									url : window.iscdl.appData.baseURL + "api/project/getProjectAlerts",
									data : postData,
									contentType : 'application/json',
									async : false,
									beforeSend : function(request) {
										request.setRequestHeader('Authorization', 'Bearer '
												+ localStorage.getItem('token'));
									},
									success : function(result) {
										if (!$.isEmptyObject(result) && result != null) {
											try {
												
												let str = "";
												if (result.responseCode == 200) {
													let response = result.data;
													let length = result.data.length;
													if(length > 0){
														for (let i in result.data){
															let api_data = result.data[i];
															let html = "<div class='aut-content'>" +
																"<p class='announce_desc'>"+ api_data.text+ "</p></div>";
															str += html;
														}
													}else{
														let html = "<div class='aut-content'><h6>No Project Alerts.</h6></div>";
														str += html;
													}
													$('#project_alerts_tab').append(str);
												} else {
													$u.notify('warning', '', result.responseMessage ? result.responseMessage : 'Something went wrong' , '');
												}
											} catch (err) {
												console.log(err);
											}
										} else {
											$u.notify('info', '', 'Project alerts data not available', '');
										}
									},
									error : function(e) {
										console.log(e);
										if(e.status === 403) {
											$u.notify('warning', 'Access denied !', result.responseJSON.responseMessage , '');
										} else {
											$u.notify('error', '', 'Something went wrong' , '');
										}
									}
								});
							},
							fillSelectedDirectionLatitude : function(type){
//								map.setMapCursor("crosshair");
//								if(map_selection){
//									map_selection.remove();
//									//map_hover.remove();
//								}
//								
//								dirLatLong = map.on("click", function(evt) {
//									if(type == "Source"){
//										let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
//										window.department2dMap.checkSelectedDirectionLocationWithinBoundry(mp.x,mp.y,'from_loc','from_loc-error',type);
//									}else if(type == "Destination"){
//										let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
//										window.department2dMap.checkSelectedDirectionLocationWithinBoundry(mp.x,mp.y,'to_loc','to_loc-error',type);
//									}
//								});
								
								map.on('singleclick', function(evt)
										{
									tip = 'hello';

										});
								

							},
							fillCurrentDirectionLatLong : function(type){
								window.department2dMap.checkCurrentDirectionLocationWithinBoundry(_current_long,_current_lat,type);
							},
							removeCursors : function removeCursors() {
								if (mapClickEvtHandler != undefined) {
									mapClickEvtHandler.remove();
									map.setMapCursor("default");
								}
							},
							removeLatLongErrors : function removeLatLongErrors(ipId,lblId){
								$('#'+ipId).removeClass('error');
								$('#'+lblId).remove();
							},
							getDirection : function getDirection(source_array,destination_array){
								let result;
								var directionObj
								
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
												let total_distance = (line_length * 111).toFixed(3); // distance in kms
												$("#total_distance").text("Total Distance : " + total_distance + " kms");
												var line = new esri.geometry.Polyline();
												line.addPath(coordinates);
										         var graphic = new esri.Graphic(line, sym);
										        gLayer.add(graphic);
										        map.addLayer(gLayer);
										        window.depUtlityController.minimizePopup();
										        //var extGraphics = esri.graphicsExtent(gLayer.graphics);
										       // map.setExtent(extGraphics);
											}
										} else {
											$(".loader").fadeOut();
											map.removeLayer(gLayer);
											$("#total_distance").text("");
											window.department2dMap.removeDirectionGraphics();
											$u.notify('info', 'Notification',
													'No Route Found', '');
											return;
										}
									},
									error : function(e) {
										$(".loader").fadeOut();
										$("#total_distance").text("");
										map.removeLayer(gLayer);
										window.department2dMap.removeDirectionGraphics();
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
							getAttributeValueByAttributeField : function(field_value,layer_name){
								let layer_url = window.layerDataController.getLayerById(layer_name);
								queryTask = new QueryTask(layer_url);
								let field_type = "";
								for(let i=0 ; i < fieldInfo.length ; i++){
									let fieldInfo_value = fieldInfo[i].Value;
									if(field_value == fieldInfo_value){
										field_type = fieldInfo[i].Type;
										break;
									}
								}
								
								let query = new Query();
						        query.outFields = [""+field_value+""];
						        if(field_type == "esriFieldTypeOID" || field_type == "esriFieldTypeSmallInteger" 
									|| field_type == "esriFieldTypeInteger" || field_type == "esriFieldTypeDouble"){
						        	query.where += " "+field_value+" <> 0 ";
						        }else if(field_type == "esriFieldTypeString" || field_type == "esriFieldTypeDate"){
						        	query.where += " "+field_value+" <> '' ";
						        }
						        return query;
							},
							getAdvancedQueryFieldByFieldName : function(select_id,field_name,layer_name){
								$('#'+select_id).empty().append(
								'<option value="">Select Value</option>');
								
								let query = window.department2dMap.getAttributeValueByAttributeField(field_name,layer_name);
								
								 $(".loader").fadeIn();
						         queryTask.execute(query,function(result){
						        	 $(".loader").fadeOut();
						        	 map.graphics.clear();
						        	 let f_value = field_name;
						        	 if(result.features.length == 0 ){
						        		 $u.notify("info", "Notification","No Values Found");
							        	 return;
						        	 }
						        	 
						        	 let features = result.features;
						        	 let value_html = "";
						        	 var fieldValueArray = [];
						        	 for(let i in features){
						        		 let fie_value = features[i].attributes[f_value];
						        		 if(!fieldValueArray.includes(fie_value)){
						        			 fieldValueArray.push(fie_value);
						        			 value_html += "<option value='"+fie_value+"'>"+fie_value+"</option>";
						        		 }
						        	 }
						        	 $('#'+select_id).append(value_html);
						         },function(error){
						        	    console.log(error);
						        	    $(".loader").fadeOut();
						         });
							},
							getAdvancedQueryObject : function(ward_id,layer_url,field_name,logical_operator,field_value,
									f_operator,f_field_name,f_logical_operator,f_value,
									s_operator,s_field_name,s_logical_operator,s_value){

								queryTask = new QueryTask(layer_url);
								
								let field_type = "";
								let f_field_type = "";
								let s_field_type = "";
								
								for(let i=0 ; i < fieldInfo.length ; i++){
									let fieldInfo_value = fieldInfo[i].Value;
									
									if(field_name == fieldInfo_value){
										field_type = fieldInfo[i].Type;
										break;
									}
								}
								
								let query = new Query();
						        query.returnGeometry = true;
						        query.outFields = ["*"];
						        query.where = "";
						        
						        
						       if((layer_url != "" || layer_url != null) && (ward_id == null || ward_id == "") && 
						    		   (field_name == null || field_name == "") &&  (field_value == null || field_value == "")){
						    	   query.where = "1=1";
						       }else{
						    	   if(ward_id != ""){
							        	if(query.where != ""){
							        		query.where += " AND ";
							        	}
							        	query.where += "ward_no = " + ward_id + " ";
							        }
							        
						    	   	//for first query filter
							        if(field_type == "esriFieldTypeOID" || field_type == "esriFieldTypeSmallInteger" 
										|| field_type == "esriFieldTypeInteger" || field_type == "esriFieldTypeDouble"){
							        	
							        	if(query.where != ""){
							        		query.where += " AND ";
							        	}
							        	
							        	query.where += " "+field_name + logical_operator + field_value + " ";
									
							        }else if(field_type == "esriFieldTypeString" || field_type == "esriFieldTypeDate"){
							        	if(query.where != ""){
							        		query.where += " AND ";
							        	}
							        	query.where += " "+field_name+" "+logical_operator+" '" + field_value + "' ";
									}
							        
							        //for second query filter
							        if(f_operator != "" && f_field_name != "" && f_logical_operator != "" && f_value != ""){
							        	for(let i=0 ; i < fieldInfo.length ; i++){
											let fieldInfo_value = fieldInfo[i].Value;
											
											if(f_field_name == fieldInfo_value){
												f_field_type = fieldInfo[i].Type;
												break;
											}
										}
							        	if(query.where != ""){
							        		query.where += " "+f_operator+" ";
							        	}
								        if(f_field_type == "esriFieldTypeOID" || f_field_type == "esriFieldTypeSmallInteger" 
											|| f_field_type == "esriFieldTypeInteger" || f_field_type == "esriFieldTypeDouble"){
								        	query.where += " "+f_field_name + f_logical_operator + f_value + " ";
								        }else if(f_field_type == "esriFieldTypeString" || f_field_type == "esriFieldTypeDate"){
								        	query.where += " "+f_field_name+" "+f_logical_operator+" '" + f_value + "' ";
										}
							        }
							        
							        //for third query filter
							        if(s_operator != "" && s_field_name != "" && s_logical_operator != "" && s_value != ""){
							        	for(let i=0 ; i < fieldInfo.length ; i++){
											let fieldInfo_value = fieldInfo[i].Value;
											
											if(s_field_name == fieldInfo_value){
												s_field_type = fieldInfo[i].Type;
												break;
											}
										}
							        	if(query.where != ""){
							        		query.where += " "+s_operator+" ";
							        	}
								        if(s_field_type == "esriFieldTypeOID" || s_field_type == "esriFieldTypeSmallInteger" 
											|| s_field_type == "esriFieldTypeInteger" || s_field_type == "esriFieldTypeDouble"){
								        	query.where += " "+s_field_name + s_logical_operator + s_value + " ";
								        }else if(s_field_type == "esriFieldTypeString" || s_field_type == "esriFieldTypeDate"){
								        	query.where += " "+s_field_name+" "+s_logical_operator+" '" + s_value + "' ";
										}
							        }
						       }
						       return query;
							},
							addKMLFileOnMap : function(){
								let ad_upfile = $('#inFile')[0].files;
								
								let token_val = localStorage.getItem('token');
								
								if(token_val == "" || token_val == undefined || token_val == null){
									$u.notify('info', 'Notification',
											'You are not authorized user', '');
									return;
								}
								
								if(ad_upfile.length > 0){
									let fileSize = ad_upfile[0].size/1024/1024;
									if(fileSize > 10){
										$u.notify('warning', 'Warning', 'File size exceeds 10 MB', '');
										return;
									}
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
										$(".loader").fadeOut();
										
										if (!$.isEmptyObject(result) && result != null) {
											try {
												let op =JSON.parse(result);
												if(op.responseCode == "200"){
													
													window.depUtlityController.minimizePopup();
													
													let kmlUrl = KML_BASE_URL + op.fileName;
													//let kmlUrl = KML_BASE_URL + "bridge_qgis.kml";
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
												    	let layer_extent = kml.getLayers()[0].fullExtent;
									    				if(layer_extent != undefined){
									    					var extent = new Extent(layer_extent);
									    					map.setExtent(layer_extent);
									    				}
												    });
												}else{
													$u.notify('warning', '', 'Failed to upload KML', '');
												}
											} catch (err) {
												$(".loader").fadeOut();
												console.log(err);
											}
										} else {
											$(".loader").fadeOut();
											$u.notify('warning', '', 'Data not available', '');
										}
									},
									error : function(e) {
										$(".loader").fadeOut();
										console.log(e);
									}
								});
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
					              window.department2dMap.changeRenderer(featureLayer);
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
					          getIconByLayerName: function (layer_name){
						        	var pictureMarkerSymbol = "";
						        	
						        	switch (layer_name) {
									case "Public Toilet":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Public_Toilets.png', 25, 25);
										break;
									case "Litter Bin":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Dustbin_Location.png', 25, 25);
										break;
									case "Resturants":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Restaurants.png', 25, 25);
										break;
									case "ATM" :
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/ATM.png', 25, 25);
										break;
									case "VCB":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/VCB.png', 25, 25);
										break;
									case "Bank":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Bank.png', 25, 25);
										break;	
									case "Cultural Facility":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Cultural_Facility.png', 25, 25);
										break;
									case "CCTV Location":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/CCTV_Location.png', 25, 25);
										break;		
									case "Entertainment Facility":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Entertainment_Facility.png', 25, 25);
										break;	
									case "Government Office":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Government_Offices.png', 25, 25);
										break;
									case "Lodging Facility":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Lodging_Facility.png', 25, 25);
										break;	
									case "MP Online Center":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/MP_Online_Center.png', 25, 25);
										break;
									case "Market":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Market.png', 25, 25);
										break;
									case "Milk Booth":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Milk_Booth.png', 25, 25);
										break;			
									case "Petrol Pump":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Petrol_Pump.png', 25, 25);
										break;	
									case "Pharmacy":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Pharmacies.png', 25, 25);
										break;			
									case "Post Office":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Post_Office.png', 25, 25);
										break;		
									case "Religious Facility":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Religious_Facility.png', 25, 25);
										break;		
									case "Sports Facility":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Sports_Facility.png', 25, 25);
										break;		
									case "Street Food Zone":
											pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Street_Food_Zone.png', 25, 25);
											break;	
									case "Traffic Square":
											pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Traffic_Square.png', 25, 25);
											break;
									case "Colleges Universities":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/College_University.png', 25, 25);
										break;
									case "Police Police Chowki":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Police Stations.png', 25, 25);
										break;
									case "Secondary School": case "Primary School":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/School.png', 25, 25);
										break;
									case "Electric Pole":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/electric_pole.png', 25, 25);
										break;
									case "Over Head Tank":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/over_head_tank.png', 25, 25);
										break;
									case "Hospital":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/Hospital.png', 25, 25);
										break;
									case "Traffic Signals":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/traffic_signal.png', 25, 25);
										break;
									case "Transformers":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/power_transformer.png', 25, 25);
										break;
									case "Trees":
										pictureMarkerSymbol = new PictureMarkerSymbol('images/layer_icons/tree.png', 25, 25);
										break;
									case "Accident" : 
										pictureMarkerSymbol = new PictureMarkerSymbol('images/incident_icons/Accident_issue.png', 25, 25);
										break;
									default:
										pictureMarkerSymbol = "";
										break;
									}
						        	return pictureMarkerSymbol;
						          },
						          bindIncidentResult : function (result){
						        	  var html = "";
						        	  
						        	  let pictureSymbol = window.department2dMap.getIconByLayerName("Accident");
										
										if(pictureSymbol == ""){
											pictureSymbol = markerSymbol;
										}
						        	  
						        	  $("#incident_rslt").append("<h3>Number of Records found: "+result.length+"</h3>");
						        	  
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
						        		   map.graphics.add(graphic);
										   graphic.setGeometry(query_point);
										   resultedFeaturesLayer.add(graphic);
						        		  
						        		  html += "<div class='query-result-main kyp-list query-resultDiv-seperator'>" +
						        		  		"<a data-longitude="+longitude+" data-latitude="+latitude+" " +
						        		  		"data-accident_type='"+accident_type+"' data-images = '"+images+"' data-address="+address+" " +
						        		  		"data-description='"+description+"' data-vehicle_number='"+vehicle_number+"' data-vehicle_type='"+vehicle_type+"' " +
					 						"onclick='window.department2dMap.zoomToIncidentIssues(this)'>" + 
						        		    "<div class='result-task'><label>Accident Type : </label><p>"+accident_type+"</p></div>" +
					  			 	        "<div class='result-task'><label>Address : </label><p>"+address+"</p></div>" +
					  			 	        "<div class='result-task'><label>Description : </label><p>"+description+"</p></div>" +
					  			 	        "<div class='result-task'><label>Vehicle Number : </label><p>"+vehicle_number+"</p></div>" +
					  			 	        "<div class='result-task'><label>Vehicle Type : </label><p>"+vehicle_type+"</p></div>" +
					  			 	        "<div class='result-task'><label> Latitude : </label><p>"+latitude+"</p></div>" +
					  						"<div class='result-task'><label> Longitude : </label><p> "+longitude+"</p></div></div></a>";
						        	  }
						        	  $("#incident_rslt").append(html);
						          },
						          zoomToIncidentIssues : function zoomToIncidentIssues(data){

						        	  	let latitude = $(data).data("latitude");
										let longitude = $(data).data("longitude");
										
										let query_point = new Point(longitude,latitude);
										
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
										
										
										let incident_infoTemplate = new InfoTemplate
										("Incident Issue", "<b>Accident Type :</b>"+accident_type+"<br>" +
											"<b>Address :</b>"+address+"<br><b>Description :</b>"+description+"<br>" +
											"<b>Vehicle Number :</b>"+vehicle_number+"<br><b>Vehicle Type :</b>"+vehicle_type+"<br>" +
											"<b>Longitude :</b>"+longitude+"<br><b>Latitude :</b>"+latitude+"<br><b>Image :</b>"+content+"<br>");
										
										let graphic = new Graphic(query_point);
										graphic.setGeometry(query_point);
										graphic.setInfoTemplate(incident_infoTemplate);
										map.centerAndZoom(query_point,18);
										map.infoWindow.setTitle(graphic.getTitle());
										map.infoWindow.setContent(graphic.getContent());
										map.infoWindow.show(query_point);
						        	  
						          },
						          displayDashboardChartDataOnMap : function(chartJsonObj){
						        	  map.graphics.clear();
						        	  if(map.infoWindow.isShowing){
				        				  map.infoWindow.hide();  
				        			  }
						        	  
						        	  if(chartJsonObj.hasOwnProperty('indore_311')){
						        		  map.graphics.clear();
						        		  let indore_311 = chartJsonObj.indore_311;
						        		  $(".loader").fadeIn();
						        		  try{
						        			  window.department2dMap.displayIndore311DashboardChartData(indore_311);  
						        		  }catch(e){
						        			  console.log(e);
						        			  $(".loader").faeOut();
						        		  }
						        		  return;
						        	  }
						        	  
						        	  let layer_name = chartJsonObj.layer_name;
						        	  let column_name = chartJsonObj.column_name;
						        	  let ward_id = chartJsonObj.ward_no;
						        	  let column_value = chartJsonObj.value;
						        	  let column_type = chartJsonObj.column_type;
						        	  let logical_operator = chartJsonObj.logical_operator;
						        	  let column_name_1 = chartJsonObj.column_name_1;
						        	  let column_type_1 = chartJsonObj.column_type_1;
						        	  let value_1 = chartJsonObj.value_1;
						        	  let color = chartJsonObj.color;
						        	  
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
						        	  }else if(column_value == undefined){
						        		  $u.notify("info", "Notification","Column value was null");
						        		  $(".loader").fadeOut();
						        		  return;
						        	  }else if(column_type == undefined || column_type == ""){
						        		  $u.notify("info", "Notification","Column type was null");
						        		  $(".loader").fadeOut();
						        		  return;
						        	  }else if(logical_operator == undefined || logical_operator == ""){
						        		  $u.notify("info", "Notification","Logical Operator was null");
						        		  $(".loader").fadeOut();
						        		  return;
						        	  }
						        	  
						        	  //highlight ward
						        	  if(ward_id != "0"){
						        		  window.department2dMap.highlightWard(ward_id);  
						        	  }
						        	  
						        	  let dashboardQuery = window.department2dMap.
						        	  craeteQueryForDashboardChart(layer_name,column_name,ward_id,column_value,column_type,
						        			  column_name_1,column_type_1,value_1,logical_operator);
						        	    
						        	  if(dashboardQuery != undefined){
						        		  $(".loader").fadeIn();
									        queryTask.execute(dashboardQuery,function(result){
									        	map.removeLayer(resultedFeaturesLayer);
									        	window.department2dMap.removeGraphicLayerGraphics(resultedFeaturesLayer);
									        	 if(result.features.length == 0 ){
									        		 $u.notify("info", "Notification","No result found");
									        		 $(".loader").fadeOut();
										        	 return;
									        	 }
									        	 window.department2dMap.prepareDashboardQueryResult(result,layer_name,color); 
									        	 $(".loader").fadeOut();
									        	 //window.department2dMap.setGraphicLayerExtent(resultedFeaturesLayer);
									         },function(error){
									        	   console.log(error);
									        	   $u.notify("error", "Error",error);
									        	   $(".loader").fadeOut();
									         });  
						        	  }
						          },
						          displayIndore311DashboardChartData : function(data){
						        	  let pictureSymbol = window.department2dMap.getDashboardIconByLayerName("Indore_311");
						        	  
						        	  for(let i in data){
						        		  let latitude = data[i][0].latitude;
						        		  let longitude = data[i][0].longitude;
						        		  let infoArr =data[i][0].info;
						        		  let info = infoArr[0];
						        		  let length = Object.keys(info).length;
							 			  let template_content = "";
							 			  let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
											  '<tbody>';
							 				
							 				 for(let a=0;a<length;a++){
							 					let key  = Object.keys(info)[a];
							 					
							 					if(key == "objectid" || key == "objectid_1"  || key == "OBJECTID" || key == "OBJECTID_1"){
													continue;
												}
							 					
							 					let attr = info[key];
							 					
							 					if(attr == null || attr == "" || attr == "null"){
							 						attr = "";
							 					}
							 					let columnName = window.department2dMap.getFeatureColumnName(key);	
							 					table_content += '<tr><td><b>'+columnName+'</b></td><td>'+attr+'</td></tr>';
							 				} 
							 				template_content += table_content + '</tbody></table>';
						        		  
						        		  let indore_311_point = new Point(longitude,latitude);
						        		  let graphic = new Graphic(indore_311_point,pictureSymbol);
						        		  var pointinfoTemplate = new InfoTemplate("Indore 311",template_content);
										  graphic.setInfoTemplate(pointinfoTemplate);
										  graphic.setGeometry(indore_311_point);
										  map.graphics.add(graphic);
						        	  }
						        	  $(".loader").fadeOut();
						          },
						          craeteQueryForDashboardChart : function(layer_name,column_name,ward_id,column_value,column_type,
						        		  column_name_1,column_type_1,value_1,logical_operator){
						        	  	
						        	  	let layer_id,layer_url;
						        	  	layer_id =  window.layerDataController.getDashboardLayerByLayerName(layer_name);
							        	if(layer_id == null || layer_id == undefined || layer_id == "" ){
							        		$u.notify("info", "Notification","Layer id not found");
							        		$(".loader").fadeOut();
							        		return;
							        	}
							        	
							        	layer_url = window.INDORE_LAYERS_SYMBOLOGY + "/" + layer_id;
							        	
							        	  queryTask = new QueryTask(layer_url);
											let query = new Query();
									        query.returnGeometry = true;
									        query.outFields = ["*"];
									        query.where = "";
									        
									        if(ward_id != "0"){
									        	if(query.where != ""){
									        		query.where += " AND ";
									        	}
									        	try{
									        		ward_id = parseInt(ward_id);	
									        	}catch(e){}
									        	query.where += "ward_no = " + ward_id + " ";
									        }
									        
									        if(query.where != ""){
								        		query.where += " AND ";
								        	}
									        
									        /**
									         * First Column Query
									         */
									        
									        let content = window.department2dMap.
									        getQueryAccordingToFieldType(column_type,column_name,column_value,logical_operator);
									        query.where += content;	
								        	
								        	 /**
								        	  * Socond Column Query 
								        	  */
								        	 
								        	 if((column_type_1 != undefined || column_type_1 != "") && 
								        			 (column_name_1 != undefined && column_name_1 != "") &&
								        			 (value_1 != undefined && value_1 != "") 
								        	 ){
									        	 
								        		 if(query.where != ""){
										        		query.where += " AND ";
										         }
								        		 
								        		 let content_1 = window.department2dMap.
								        		 getQueryAccordingToFieldType(column_type_1,column_name_1,value_1,logical_operator);
											     query.where += content_1;	 
								        	 }
									        return query;
						          },
						          getQueryAccordingToFieldType : function(column_type,column_name,column_value,logical_operator){
						        	  let content = "";
						        	  if(column_type == "string"){
						        		  content = " "+column_name+" "+logical_operator+" '" + column_value + "'";	
								        }else if(column_type == "number"){
								        	content = " "+column_name+" "+logical_operator+" " + column_value + " ";	
								        }
						        	  return content;
						          },
						          prepareDashboardQueryResult : function(result,layer_name,color_code){
						        		
						        	  let geometryType = result.geometryType;
						        		
						        		if(geometryType == "esriGeometryPoint"){
						        			
						        			/*let styleColor = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
									 	              new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
									 	              new Color([255,0,0]), 2),new Color([255,255,0,0.25])
									 	    );*/
						        			let pictureSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_TRIANGLE, 15,
						        				    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
						        				    	    new Color([0,0,0]), 1),
						        				    	    new Color(color_code));
						        			
						        			
						        			for (var i = 0; i < result.features.length; i++) {
								        		let feature = result.features[i];
								        		let geometry = feature.geometry;
								 	        	let latitude = geometry.y;
								 	        	let longitude = geometry.x;
												let query_point = new Point(longitude,latitude);
												
												/*let pictureSymbol = window.department2dMap.getDashboardIconByLayerName(layer_name);
												if(pictureSymbol == ""){
													pictureSymbol = markerSymbol;
												}*/
												
												let geometryService = new esri.tasks.GeometryService
												(window.prefix_layer_url + "Utilities/Geometry/GeometryServer");
								 	        	let PrjParamsmin = window.department2dMap.
								 	        	convertCoordinateMeterToDegree(longitude,latitude);
								 	        	
								 	        	let info_template_content = window.department2dMap.getInfoTemplateContent(feature);
												
												geometryService.project(PrjParamsmin, function (outputpoint) {
								 	        		let olatitude = outputpoint[0].y;
										            let olongitude = outputpoint[0].x;
													let c_query_point = new Point(olongitude,olatitude);
													let graphic = new Graphic(c_query_point, pictureSymbol);
													var pointinfoTemplate = new InfoTemplate("Feature Information",info_template_content);
													graphic.setInfoTemplate(pointinfoTemplate);
													graphic.setGeometry(c_query_point);
													map.graphics.add(graphic);
													resultedFeaturesLayer.add(graphic);	
								 	        	 });
									 	     }
						        			
						        			map.setExtent(initialExtent);
						        			
						        		}else if(geometryType == "esriGeometryPolygon"){
						        			for (var i = 0; i < result.features.length; i++) {
								        		let feature = result.features[i];
								        		let geometry = feature.geometry;
								 	        	var outSpatialReference = new SpatialReference({
								 	        		 wkid: 4326
								 	        	});
								 	        	 
								 	        	let info_template_content = window.department2dMap.getInfoTemplateContent(feature);
								 	        	
								 	        	projection.load().then(function() {
									 	        	let cgeometry = projection.project(geometry, outSpatialReference);
									 	        	var polygon = {"geometry":cgeometry,"symbol":
									 	        	{"color":[0,0,0,64],"outline":{"color":[0,0,0,255],
									 	        	    "width":1,"type":"esriSLS","style":"esriSLSSolid"},
									 	        	    "type":"esriSFS","style":"esriSFSSolid"}};
									 	        	let polygonGraphic = new esri.Graphic(polygon);
									 	        	var pinfoTemplate = new InfoTemplate("Feature Information",info_template_content);
									 	        	polygonGraphic.setInfoTemplate(pinfoTemplate);
									 	        	map.graphics.add(polygonGraphic);
									 	        	resultedFeaturesLayer.add(polygonGraphic);
								 	        	});
									 	     }
						        		}else if(geometryType == "esriGeometryPolyline"){
						        			for (var i = 0; i < result.features.length; i++) {
								        		let feature = result.features[i];
								        		let geometry = feature.geometry;
								 	        	var outSpatialReference = new SpatialReference({
								 	        		 wkid: 4326
								 	        	});
								 	        	
								 	        	let info_template_content = window.department2dMap.getInfoTemplateContent(feature);
								 	        	 
								 	        	projection.load().then(function() {
									 	        	let cgeometry = projection.project(geometry, outSpatialReference);
									 	        	var line = {"geometry":cgeometry,"symbol":
									 	        	{"color":[218,165,32,255],"width":1,"type":"esriSLS","style":"esriSLSSolid"}};
									 	        	let lineGraphic = new esri.Graphic(line);
									 	        	var linfoTemplate = new InfoTemplate("Feature Information",info_template_content);
									 	        	lineGraphic.setInfoTemplate(linfoTemplate);
									 	        	map.graphics.add(lineGraphic);
									 	        	resultedFeaturesLayer.add(lineGraphic);
								 	        	});
									 	     }
						        		}
						          },
						          getInfoTemplateContent : function(feature){
						        	  	 var columns = feature.attributes;
						 				 let length = Object.keys(columns).length;
						 				let template_content = "";
						 				 let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
										  '<tbody>';
						 				
						 				 for(let a=0;a<length;a++){
						 					
						 					let key  = Object.keys(columns)[a];
						 					
						 					if(key == "objectid" || key == "objectid_1"  || key == "OBJECTID" || key == "OBJECTID_1"){
												continue;
											}
						 					
						 					let attr = feature.attributes[key];
						 					
						 					if(attr == null || attr == "" || attr == "null"){
						 						attr = "";
						 					}
						 					let columnName = window.department2dMap.getFeatureColumnName(key);	
						 					table_content += '<tr><td><b>'+columnName+'</b></td><td>'+attr+'</td></tr>';
						 				} 
						 				template_content += table_content + '</tbody></table>';
						 				 return template_content;
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
						          setGraphicLayerExtent : function(graphic_layer){
						        	  let graphics = graphic_layer.graphics;
						        	  if(graphics.length > 0){
						        		  var extGraphics = esri.graphicsExtent(graphic_layer.graphics);
								          map.setExtent(extGraphics);  
						        	  }
						          },
						          getDashboardIconByLayerName : function(layer_name){
								        	var pictureMarkerSymbol = "";
								        	
								        	switch (layer_name) {
											
								        	case "Hospital":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Hospitals.png', 25, 25);
												break;
												
											case "Pharmacy":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Pharmacies.png', 25, 25);
												break;
												
											case "Colleges Universities":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Secondary-School.png', 25, 25);
												break;
											case "Primary School":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Primary-Schools.png', 25, 25);
												break;
											case "Secondary School":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Secondary-School.png', 25, 25);
												break;
												
											case "Anganwadi":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Anganwadi.png', 25, 25);
												break;
												
											case "Police Station":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Police-Stations.png', 25, 25);
												break;
												
											case "Electric Pole":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Electric-Pole.png', 25, 25);
												break;
												
											case "Street Light":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Street-Light.png', 25, 25);
												break;
												
											case "Bus Stops": case "Bus Routes":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Bus-Stops.png', 25, 25);
												break;
												
											case "Water Valve":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Water-Valve.png', 25, 25);
												break;
												
											case "Litter Bin":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Dustbin-Location.png', 25, 25);
												break;
												
											case "Industrial Training Center":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Industrial-Training-Center.png', 25, 25);
												break;
												
											case "Smart Street Light":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Smart-LED.png', 25, 25);
												break;
												
											case "Transformers":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Transformers.png', 25, 25);
												break;
												
											case "Smart City Project":
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Smart-City-Project.png', 25, 25);
												break;
												
											case "Public Toilet" :
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Public-Toilets.png', 25, 25);
												break;
											case "UPHC" :
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-UPHC.png', 25, 25);
												break;
											case "Indore_311" :
												pictureMarkerSymbol = new 
												PictureMarkerSymbol('images/layer_icons/D-Indore_311.png', 25, 25);
												break;
											default:
												pictureMarkerSymbol = new PictureMarkerSymbol(dash_point_symbol, 25, 25);
												break;
											}
								        	return pictureMarkerSymbol;
						          },
						          getIndore311Result : function(from_date,to_date,day){
						        	  return $.ajax({
											method : 'GET',
											async : false,
											url : "https://capi.everythingcivic.com//api/v1/issues/get_transactional_data?app_id=56ffa1d228ebee7744041534" +
													"&api_key=g9d54312a5c53ce30738dcd8838c5128&start_date="+from_date+"&end_date="+to_date+"&page="+day,
											success : function(result) {
												if (!$.isEmptyObject(result) && result != null) {
													try {
														if(result.success){
														}
													} catch (err) {
														console.log(err);
													}
												} else {
												}
											},
											error : function(e) {
												console.log(e);
											}
										});  
						          },
						          bindIndore311Result : function(result){
						        	  let html = "";
						        	  let total_features = 0;
						        	  if(result.length > 0){
						        		  for(let i in result){
						        			  total_features += result[i].length;
						        		  }
						        		  
						        		  $("#imc_indore311_rslt").append("<h3 id='total_features_length'>Number of features found : "+ 1 + "/" +total_features+"</h3>" + 
													"<div class='np-main w-100 p-0'>" +
													"<a id='next' class=' with-np-link next'> Next <i class='fa fa-angle-double-right'></i></a>" +
													"<a id='prev' class=' with-np-link prev'><i class='fa fa-angle-double-left'></i> Previous </a>" +
													"</div>");
						        		  
						        		  for(let i in result){
						        			  let day_issues = result[i];
						        			  for(let a in day_issues){
						        				  let issue = day_issues[a];
						        				  let latitude = issue.latitude;
						        				  let longitude = issue.longitude;
						        				  let address = issue.address;
						        				  let ward_name = issue.ward_name;
						        				  let zone_name = issue.zone_name;
						        				  let description = issue.description;
						        				  let date = issue.created_at;
						        				  let category_name = issue.category_info.category_name;
						        				  let department_name = issue.department_info.department_name;
						        				  
						        				  html += "<div class='query-result-main query-resultDiv-seperator indore-311-query-result'>" +
						  			 	        "<div class='result-task'><label>Ward Name : </label><p>"+ward_name+"</p></div>" +
						  			 	        "<div class='result-task'><label>Zone Name: </label><p>"+zone_name+"</p></div>" +
						  			 	        "<div class='result-task'><label>Address: </label><p>"+address+"</p></div>" +
						  			 	        "<div class='result-task'><label>Description : </label><p>"+description+"</p></div>" +
						  			 	        "<div class='result-task'><label>Category : </label><p>"+category_name+"</p></div>" +
						  			 	        "<div class='result-task'><label>Department : </label><p>"+department_name+"</p></div>" +
						  			 	        "<div class='result-task'><label>Date : </label><p>"+date+"</p></div>" +
						  						"<div class='result-task'><label> Latitude : </label><p>"+latitude+"</p></div>" +
						  						"<div class='result-task'><label> Longitude : </label><p> "+longitude+"</p></div>" +
						  						"<div class='result-task'>" +
												"<i id= indore_311_feature_"+i+" class='fa fa-search query-zoom-feature' aria-hidden='true' title='Zoom To Feature' " +
													"data-longitude='"+longitude+"' data-latitude='"+latitude+"' " +
						        				  	"data-address='"+address+"' data-description='"+description+"' " +
						        				  	"data-date = '"+date+"' data-ward = '"+ward_name+"' " +
						        				  	"data-zone = '"+zone_name+"' data-categotry = '"+category_name+"' " +
						        				  	"data-department = '"+department_name+"' " +
						        				  	"onclick='window.department2dMap.zoomToIndore311Feature(this)'></i></div>" +		
						  						"</div>";
						        			  }
						        		  }
						        	  }
						        	  $("#imc_indore311_rslt").append(html);
						        	  
						        	  if(total_features == 1){
											$(".query-result-main").addClass("single-record");
										}else{
											$(".query-result-main").removeClass("single-record");
										}
										
										window.department2dMap.previousNextFeature(total_features,'.query-result .indore-311-query-result','indore_311_feature_');
						          },
						          zoomToIndore311Feature : function(data){
						        	  	let latitude = $(data).data("latitude");
										let longitude = $(data).data("longitude");
										
										let query_point = new Point(longitude,latitude);
										
										let description = $(data).data("description");
										let zone = $(data).data("zone");
										let ward = $(data).data("ward");
										let address = $(data).data("address");
										let date = $(data).data("date");
										
										let categoty = $(data).data("categotry");
										let department = $(data).data("department");
										
										let template_content = "";					
										let table_content = '<table class="table table-bordered w-100 map-detail-custom">' +
										  '<tbody>';
										table_content += '<tr><td><b>Ward</b></td><td>'+ward+'</td></tr>' + 
										'<tr><td><b>Zone</b></td><td>'+zone+'</td></tr>' + 
										'<tr><td><b>Address</b></td><td>'+address+'</td></tr>' + 
										'<tr><td><b>Description</b></td><td>'+description+'</td></tr>' +
										'<tr><td><b>Department Name</b></td><td>'+department+'</td></tr>' +
										'<tr><td><b>Category Name</b></td><td>'+categoty+'</td></tr>' +
										'<tr><td><b>Date</b></td><td>'+date+'</td></tr>' +
										'<tr><td><b>Longitude</b></td><td>'+longitude+'</td></tr>' +
										'<tr><td><b>Latitude</b></td><td>'+latitude+'</td></tr>';
										
										template_content += table_content + '</tbody></table>';
										let indore311_infoTemplate = new InfoTemplate("Indore 311",template_content);
										map.graphics.clear();
										let graphic = new Graphic(query_point, markerSymbol);
										graphic.setGeometry(query_point);
										graphic.setInfoTemplate(indore311_infoTemplate);
										map.graphics.add(graphic);
										map.centerAndZoom(query_point,18);
										map.infoWindow.setTitle(graphic.getTitle());
										map.infoWindow.setContent(graphic.getContent());
										map.infoWindow.show(query_point);
										window.depUtlityController.minimizePopup();
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
						        	 previousNextFeature : function(total_feature,className,id_value){
							        	  
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
							        	        	if(id_value){
							        	        		/*if(total_feature > 1){
							        	        			$("#"+id_value+now).trigger("click");
							        	        		}*/
							        	        		$("#"+id_value+now).trigger("click");	
							        	        	}
							        	        }
							        	        divs.eq(now).show(); // show next
							        	    });
							        	    $(".prev").click(function (e) {
							        	        divs.eq(now).hide();
							        	        now = (now > 0) ? now - 1 : divs.length - 1;
							        	        if(total_feature){
							        	        	$("#total_features_length").text("Number of features found : " + (now + 1) + "/" + total_feature);
							        	        	if(id_value){
							        	        		/*if(total_feature > 1){
							        	        			$("#"+id_value+now).trigger("click");
							        	        		}*/
							        	        		$("#"+id_value+now).trigger("click");	
							        	        	}
							        	        }
							        	        divs.eq(now).show(); // or .css('display','block');
							        	    });
							          },
							          zoomToRectangleBox : function zoomToRectangleBox(evt){
							        	  if(zoom_box_tool){
							        		  //map.graphics.clear();
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
						           				//map.graphics.clear();
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
						           		getDrawGraphicsByUserId : function(u_id){
						           			let drawDepartmentGraphic = {
													'user_id' : u_id
											}
											
											$.ajax({
												method : 'POST',
												url : window.iscdl.appData.baseURL + "citizen/map_data/getDrawGraphics",
												data : JSON.stringify(drawDepartmentGraphic),
												contentType : 'application/json',
												async : false,
												success : function(result) {
													
													if (!$.isEmptyObject(result) && result != null) {
														try {
															result = JSON.parse(result);
															if(result.responseCode == 200){
																let data = result.data;
																if(data.length > 0){
																	window.department2dMap.displayGraphicsOnMap(data);
																}
															}
														} catch (err) {
															console.log(err);
														}
													} else {
														/*$u.notify('error', 'Error',
																'data not available', '');*/
													}
												},
												error : function(e) {
													$u.notify("info", "Notification",JSON.parse(e.responseText).responseMessage);
													console.log(e);
												}
											});
						           		},
						           		saveGraphicsByUserId : function(u_id,graphics){
											let geometries = [];
											let json;
											
											var _value = confirm("If you save some graphics earlier then it will be replaced. " +
													"Are you sure you want to save ?");
											
											if(_value == true){
												for(let i in graphics){
													let graphic = graphics[i];
													let geom = graphic.geometry;
													let symbol = graphic.symbol;
													json = {
														'geometry' : geom,
														'symbol' : symbol
													};
													geometries.push(json);
												}
												let drawDepartmentGraphic = {
														'user_id' : u_id,
														'geometry' : geometries
												}
												
												$(".loader").fadeIn();
												
												$.ajax({
													method : 'POST',
													url : window.iscdl.appData.baseURL + "citizen/map_data/addDrawGraphics",
													data : JSON.stringify(drawDepartmentGraphic),
													contentType : 'application/json',
													async : false,
													success : function(result) {
														
														$(".loader").fadeOut();
														
														if (!$.isEmptyObject(result) && result != null) {
															try {
																result = JSON.parse(result);
																let responseCode = result.responseCode;
																if(responseCode == 200){
																	$u.notify("info", "Notification",result.responseMessage);
																}
															} catch (err) {
																$(".loader").fadeOut();
																console.log(err);
															}
														} else {
															$(".loader").fadeOut();
															$u.notify('error', 'Error',
																	'data not available', '');
														}
													},
													error : function(e) {
														$(".loader").fadeOut();
														$u.notify("info", "Notification",JSON.parse(e.responseText).responseMessage);
														console.log(e);
													}
												});
											}else if(_value == false){
												return;
											}else{
												return;
											}
						           		},
						           		displayGraphicsOnMap : function(data){
						           			var outSpatialReference = new SpatialReference({
							 	        		 wkid: 4326
							 	        	});
						           			
						           			for(let i in data){
												let d = data[i];
												let geometries = d.geometries;
												let jsonGeoms = JSON.parse(geometries);
												if(jsonGeoms.length > 0){
													for(let j in jsonGeoms){
														let geom = jsonGeoms[j];
														projection.load().then(function() {
											 	        	let cgeometry = projection.project(geom.geometry, 
											 	        			outSpatialReference);
											 	        	
											 	        	var gtype,graphic;
											 	        	
											 	        	if (cgeometry.hasOwnProperty('paths')) {
											 	        		geom.symbol.style = "esriSLSSolid";
												 	        	geom.symbol.type = "esriSLS";
												 	        	geom.symbol.color[3] = 64;
												 	        	
												 	        	gtype = {"geometry":cgeometry,"symbol":geom.symbol};
												 	        	graphic = new esri.Graphic(gtype);
												 	        	map.graphics.add(graphic);
											 	        	
											 	        	}else if(cgeometry.hasOwnProperty('rings')){
											 	        		geom.symbol.style = "esriSFSSolid";
												 	        	geom.symbol.type = "esriSFS";
												 	        	geom.symbol.outline.style = "esriSLSSolid";
												 	        	geom.symbol.color[3] = 64;
												 	        
												 	        	gtype = {"geometry":cgeometry,"symbol":geom.symbol};
												 	        	graphic = new esri.Graphic(gtype);
												 	        	map.graphics.add(graphic);
											 	        	}else{
											 	        		let x = cgeometry.x;
											 	        		let y = cgeometry.y;
											 	        		if(x != 0 && y != 0){
											 	        			var pt = new Point(x,y,4326);
											 	        			
											 	        			if(geom.symbol.type == 'textsymbol'){
														 	        	geom.symbol.type = "esriTS";
														 	        	gtype = {"geometry":cgeometry,"symbol":geom.symbol};
														 	        	graphic = new esri.Graphic(gtype);
														 	        	map.graphics.add(graphic);
											 	        			}else{
											 	        				geom.symbol.style = "esriSMSCircle";
														 	        	geom.symbol.type = "esriSMS";
														 	        	geom.symbol.outline.style = "esriSLSSolid";
														 	        	gtype = {"geometry":cgeometry,"symbol":geom.symbol};
												 	        			graphic = new esri.Graphic(gtype);
												 	        			map.graphics.add(graphic);
											 	        			}
											 	        		}
											 	        	}
										 	        	});
													}
												}
											}	
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
										         queryTask.execute(q,function(result){
										        	 let length = result.features.length;
										        	 if(length == 0){
										        		 $u.notify('info', 'Notification',
																	'Current location is outside Indore boundary', '');							
															return;
										        	 }else{
										        		 	$('#'+latitude_id).val((latitude).toFixed(6));
															$('#'+longitude_id).val((longitude).toFixed(6));
															removeLatLongError(latitude_id,latitude_error);
															removeLatLongError(longitude_id,longitude_error);
															removeCursor();
										        	 }
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
										         queryTask.execute(q,function(result){
										        	 let length = result.features.length;
										        	 if(length == 0){
										        		 $('#'+latitude_id).val("");
														 $('#'+longitude_id).val("");
										        		 $u.notify('info', 'Notification',
																	'Selected location is outside Indore boundary', '');	
										        		 removeCursor();
														 return;
										        	 }else{
															if(map_selection){
																map_selection.remove();	
																//map_hover.remove();
															}
															$('#'+latitude_id).val((latitude).toFixed(6).toString());
															$('#'+longitude_id).val((longitude).toFixed(6).toString());
															let point = new Point( {"x": longitude, "y": latitude, 
																"spatialReference": {"wkid": 4326 } });
															map.graphics.add(new Graphic(point));
															removeLatLongError(latitude_id,latitude_error);
															removeLatLongError(longitude_id,longitude_error);
															removeCursor();
															map_info_tool = false;
															infoToolSetup();
										        	 }
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
										         queryTask.execute(q,function(result){
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
										         });
								          },
								          checkCurrentDirectionLocationWithinBoundry : function(_current_long,_current_lat,type){
								        	  var current_point = new Point(_current_long,_current_lat,new SpatialReference({ wkid: 4326 }));
								        	  let queryTask = new QueryTask(window.IMC_BOUNDARY);
										      let q = new Query();
										      q.returnGeometry = true;
										      q.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
										      q.outFields = ["*"];
										      q.geometry = current_point;
										      queryTask.execute(q,function(result){
										        	 let length = result.features.length;
										        	 if(length == 0){
										        		 if(type == "Source"){
										        			 $('#from_loc').val("");
										        		 }else if(type == "Destination"){
										        			 $('#to_loc').val("");
										        		 }
										        		 $u.notify('info', 'Notification',
																	'Current location is outside Indore boundary', '');	
										        		 window.department2dMap.removeCursors();
														 return;
										        	 }else{
										        		 let current_point = _current_lat.toFixed(6)+","+_current_long.toFixed(6);
															if(type == "Source"){
																$('#from_loc').val(current_point);
																window.department2dMap.removeLatLongErrors('from_loc','from_loc-error');
															}else if(type == "Destination"){
																$('#to_loc').val(current_point);
																window.department2dMap.removeLatLongErrors('to_loc','to_loc-error');
															}
															window.department2dMap.removeCursors();
										        	 }
										         });
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
										         queryTask.execute(q,function(result){
										        	 let length = result.features.length;
										        	 if(length == 0){
										        		 $('#'+location_id).val("");
										        		 $u.notify('info', 'Notification',
																	'Selected location is outside Indore boundary', '');	
										        		 window.department2dMap.removeCursors();
										        		 map.setMapCursor("default");
														 dirLatLong.remove();
														 return;
										        	 }else{
										        		 let pictureMarkerSymbol = new PictureMarkerSymbol('images/pin.png', 25, 25);
															if(type == "Source"){
																if(map_selection){
																	map_selection.remove();
																	//map_hover.remove();
																}
																let sel_point = latitude.toFixed(6).toString() + "," 
																+ longitude.toFixed(6).toString();
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
																window.department2dMap.removeLatLongErrors(location_id,location_error);
																map_info_tool = false;
																infoToolSetup();
															}else if(type == "Destination"){
																if(map_selection){
																	map_selection.remove();
																	//map_hover.remove();
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
																
																window.department2dMap.removeLatLongErrors(location_id,location_error);
																map_info_tool = false;
																infoToolSetup();
															}
															map.setMapCursor("default");
															dirLatLong.remove();
										        	 }
										         });
								          },
								          generateHeatMap : function(category_id,criteria_value){
								        	  
								        	  try{
								        		  $(".loader").fadeIn();
								        		  window.depUtlityController.minimizePopup();
								        		  let heatmap_layer_url = window.depHeatMapAnalysisController.
			        	  						  getHeatMapLayerByCriteria(criteria_value);
			        	  
									        	  if(heatmap_layer_url == "" || heatmap_layer_url == undefined){
									        		  $u.notify('info', 'Notification',
																'No data available', '');
									        		  $(".loader").fadeOut();
									        		  return;
									        	  }
									        	  let info_template = window.depHeatMapAnalysisController.
									        	  					  getInfoTemplateByCriteria(criteria_value);
									        	  
							        	  		var heatmapFeatureLayerOptions = {
							        	          mode: FeatureLayer.MODE_SNAPSHOT,
							        	          outFields: ["*"],
							        	          infoTemplate : info_template
							        	        };
							        	  		
							        	        heatmapFeatureLayer = new FeatureLayer(heatmap_layer_url, heatmapFeatureLayerOptions);
							        	        
							        	        var heatmapRenderer =  window.department2dMap.getHeatMapRenderByCriteriaValue(criteria_value);
							        	        
							        	        if(heatmapRenderer && heatmapRenderer != null && heatmapRenderer != undefined){
							        	        	heatmapFeatureLayer.setRenderer(heatmapRenderer);	
							        	        }
							        	        map.addLayer(heatmapFeatureLayer);
							        	        try{
							        	        	heatmapFeatureLayer.on("query-features-complete",function(event){
							        	        		$(".loader").fadeOut();
							        	        		$("#heatmap_legend").show();
							        	        		//window.depUtlityController.minimizePopup();
							        	        	});
							        	        }catch(e){
							        	        	console.log(e);
							        	        	$(".loader").fadeOut();
							        	        }
								        	  }catch(e){
								        		  console.log(e);
								        		  $(".loader").fadeOut();
								        	  }
								          },
								          getHeatMapRenderByCriteriaValue : function(criteria_value){
												var heatmapRenderer = null;
												switch (criteria_value) {
												case global.HIGH_RISE_BUILDINGS_DENSITY:
													heatmapRenderer = new HeatmapRenderer({
								        	        	colors: ["rgba(255, 255, 255,0)",//white
								        	        		"rgb(0, 255, 0)",//green
								        	        		"rgb(255,165,0)",//orange
								        	        		"rgb(255, 255, 0)",//yellow
								        	        		"rgb(255, 0, 0)"],//red
								        	        	field: "building_h",
								        	        	blurRadius: 7,
								        	            maxPixelIntensity: 200,
								        	            minPixelIntensity: 0
								        	          });
													break;
												case global.ACCIDENT_DATA: case global.VEHICLE_THEFT_DATA :
													heatmapRenderer = new HeatmapRenderer({
								        	        	colors: ["rgba(255, 255, 255,0)",//white
								        	        		"rgb(0, 255, 0)",//green
								        	        		"rgb(255,165,0)",//orange
								        	        		"rgb(255, 255, 0)",//yellow
								        	        		"rgb(255, 0, 0)"],//red
								        	        	blurRadius: 10,
								        	            maxPixelIntensity: 7,
								        	            minPixelIntensity: 0
								        	          });
													break;
												default:
													heatmapRenderer = null;
													break;
												}
												return heatmapRenderer;
											},
								          removeHeatmapLayer : function(){
								        	  if(heatmapFeatureLayer){
								        		 map.removeLayer(heatmapFeatureLayer); 
								        	  }
								          },
								          getFirstAttributeValueByFieldName : function(layer_id,field_name){
										    	window.department2dMap.setAttributeQueryCriteria('advanced_operator','advanced_value',layer_id,field_name);
										  },
								          getSecondAttributeValueByFieldName : function(layer_id,field_name){
										    	window.department2dMap.setAttributeQueryCriteria('aqlogop_1','aqValue_1',layer_id,field_name);
										  },
										  getThirdAttributeValueByFieldName : function(layer_id,field_name){
										    	window.department2dMap.setAttributeQueryCriteria('aqlogop_2','aqValue_2',layer_id,field_name);
										  },
										  setAttributeQueryCriteria : function(logical_operator,field_value,layer_id,field_name){
										    	let str = "<option value=''>Select Value</option>";
										    	let logical_content = "<option value= ''>Select Logical Operator</option>";
										    	
										    	var logical_op_val = $('#'+logical_operator).val();
										    	var field_val = $('#'+field_value).val();
										    	
										    	$("#"+logical_operator).html(logical_content);
										    	$("#"+field_value).html(str);
										    	
										    	let layer_url = window.layerDataController.getLayerById(layer_id);
												queryTask = new QueryTask(layer_url);
												let field_type = "";
												for(let i=0 ; i < fieldInfo.length ; i++){
													let fieldInfo_value = fieldInfo[i].Value;
													if(field_name == fieldInfo_value){
														field_type = fieldInfo[i].Type;
														break;
													}
												}
												
												let query = new Query();
										        query.outFields = [""+field_name+""];
										        
												if(field_type == "esriFieldTypeOID" || field_type == "esriFieldTypeSmallInteger" 
													|| field_type == "esriFieldTypeInteger" || field_type == "esriFieldTypeDouble"){
										        	
										        	logical_content = '<option value="=" selected>=</option><option value="<>"><></option>' +
										        	'<option value=">">></option><option value=">=">>=</option>' +
										        	'<option value="<"><</option><option value="<="><=</option>';
										        	
										        	query.where += " "+field_name+" <> 0 ";
										        	
										        }else if(field_type == "esriFieldTypeString" || field_type == "esriFieldTypeDate"){
										        	logical_content = '<option value="=" selected>=</option>';
										        	query.where += " "+field_name+" <> '' ";
										        }
										    	
												$("#"+logical_operator).html(logical_content);
										        
										        $(".loader").fadeIn();
										         queryTask.execute(query,function(result){
										        	 $(".loader").fadeOut();
										        	 map.graphics.clear();
										        	 if(result.features.length == 0 ){
										        		 $u.notify("info", "Notification","No Values Found");
											        	 return;
										        	 }
										        	 
										        	 let features = result.features;
										        	 let value_html = "";
										        	 var fieldValueArray = [];
										        	 for(let i in features){
										        		 let fie_value = features[i].attributes[field_name];
										        		 if(fie_value == " "){
										        			 fie_value = "";
										        		 }
										        		 if(!fieldValueArray.includes(fie_value)){
										        			 fieldValueArray.push(fie_value);
									        				 value_html += "<option value='"+fie_value+"'>"+fie_value+"</option>";
										        		 }
										        	 }
												    $("#"+field_value).html(value_html);
										         },function(error){
										        	    console.log(error);
										        	    $(".loader").fadeOut();
										         });
										    },
										    resetQueryFilter : function resetQueryFilter(){
							           			let str = "<option value=''>Select Field</option>";
							    				let logical_content = "<option>Select Logical Operator</option>";
							    				let value_content = "<option>Select Value</option>";
							    				
							    				$("#advanced_field").html(str);
							    				$("#aqF1type_1").html(str);
							    				$("#aqF1type_2").html(str);
							    				
							    				$("#advanced_operator").html(logical_content);
							    				$("#aqlogop_1").html(logical_content);
							    				$("#aqlogop_2").html(logical_content);
							    				
							    				$("#advanced_value").html(value_content);
							    				$("#aqValue_1").html(value_content);
							    				$("#aqValue_2").html(value_content);
							    				
											},
											highlightWard : function highlightWard(ward_id){
							           			map.graphics.clear();
									        	map.removeLayer(resultedFeaturesLayer);
									        	
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
									        		ward_id = parseInt(ward_no);	
									        	}catch(e){}
									        	query.where += "ward_no = " + ward_id + " ";

									        	$(".loader").fadeIn();

									        	try{
									        		 queryTask.execute(query,function(result){
												        	map.graphics.clear();
												        	map.removeLayer(resultedFeaturesLayer);
												        	window.department2dMap.removeGraphicLayerGraphics(resultedFeaturesLayer);
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
														 	        	 
														 	        	let info_template_content = window.department2dMap.getInfoTemplateContent(feature);
														 	        	
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
							           		setIndividualLayerOpacity : function(s_layer_id,opacity_value){
							           			//update checkbox status in layer panel
												$('#accordionExample .layers-toggle-body input').each(function() {
													let layer_id = $(this).data('layerid');
													let child_id  = $(this).attr('id');
													if(s_layer_id == layer_id){
														$("#"+child_id).prop('checked', false);
													}
												});
												
												//enable layer query wise
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
							           			
							           			//add feature layer on map
							           			
												 let layerUrl = window.INDORE_LAYERS_SYMBOLOGY + "/" +s_layer_id;
												 opacity_layer = new FeatureLayer(layerUrl, {
													    showAttribution :false,
													    opacity : opacity_value
												});
												map.addLayer(opacity_layer);
							           		},
							           		
					}
					window.department2dMap = base;
				
				$(document).ready(
						function() {
							let token = localStorage.getItem("token");
							if(token !== undefined && token !== null){
								$(".logout-link").css('display', 'flex');
								$(".drop-down-main").css('display', 'flex');
								$(".user-info").text(JSON.parse(localStorage.getItem("user")).userName);
							}
							$(".user-manual-ctbtn").css('display','none');
							$(".user-manual-dpbtn").css('display','flex');
							
							$("#citizen-logout-btn").click(function(){
								window.depUtlityController.userLogout();
							});
							
							/**
							 * get book-mark list
							 */
							
							let user_id = localStorage.getItem('user_data');
							
							if(user_id != undefined && user_id != null && user_id != ""){
								window.department2dMap.getBookMarkList(user_id);	
							}
							
							/**
							 * add book-mark click event
							 * 
							 */
							$("#add-bookmark").click(function(){
								window.department2dMap.setBookmarkInfo();
							});
							
							/**
							 * delete bookmark click event
							 */
							$("#delete-bookmark").click(function(){
								
								let user_id = localStorage.getItem('user_data');
								
								if(user_id != undefined && user_id != null && user_id != ""){
									let bookmarkIds = window.department2dMap.getSelectedBookmarkIds();
									if(bookmarkIds != undefined && bookmarkIds != null && bookmarkIds != ""){
										window.department2dMap.deleteLoginUserBookmarks(bookmarkIds);	
									}
								}else{
									window.department2dMap.deleteCitizenBookmarks();
								}
							});
							

//							CHECK IF ZOOM LEVEL IS AVAILABLE OR NOT FROM SHARE URL 
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
//							UPDATE WINDOW URL IF PAGE OPENED FROM SHARE URL
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
							window.depUtlityController.getLayers('add_data_category');
							window.depUtlityController.getVisitorCounter();
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
							//map_hover.remove();
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
							//map_hover.remove();
						}
						let title = "Rectangle";
						let tool_name = title.toUpperCase().replace(/ /g, "_");
						if(tool_name == "RECTANGLE"){
							toolbar.activate(Draw[tool_name]);
							toolbar.on("draw-end", window.department2dMap.zoomToRectangleBox);
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
							//map_hover.remove();
						}
						let title = "Rectangle";
						let tool_name = title.toUpperCase().replace(/ /g, "_");
						if(tool_name == "RECTANGLE"){
							toolbar.activate(Draw[tool_name]);
							toolbar.on("draw-end", window.department2dMap.zoomOutToRectangleBox);
							map.hideZoomSlider();
						}
					}
				});
				
				$("#draw_save_btn").click(function(){
					let mapGraphics = map.graphics;
					let graphics = mapGraphics.graphics;
					
					let u_id = localStorage.getItem('user_data');
					
					if(u_id == undefined || u_id == null || u_id == ""){
						$u.notify("warning", "Warning","User information not found !");
						return;
					}
					
					window.department2dMap.saveGraphicsByUserId(u_id,graphics);
					
				});
				$('.side-layer-resize').on('click', function() {
					$('.layer-popup').toggleClass('resize-layer');
				});
				
				$(document).on('input', '#layer_slider', function() {
				    let slider_value = $(this).val();
				    if(slider_value){
				    	symbology_layers.setOpacity(slider_value);	
				    }
				});
				
				$(document).on('input', '#indinidual_layer_slider', function() {
					if(opacity_layer){
						map.removeLayer(opacity_layer);	
					}
					let selected_opacity_layer = $("#opacity_selected_layer").val();
				    if(selected_opacity_layer == ""){
				    	//$u.notify("warning", "Warning","Please select layer");				    	
				    	return;
				    }
					let slider_value = $(this).val();
				    if(slider_value){
				    	window.department2dMap.setIndividualLayerOpacity(selected_opacity_layer,slider_value);
				    }
				});
				
				
				$('.action-ul-top li a').on('click', function() {
					var ia = $(this).attr('data-attr');
					$('.action-layer').hide();
					$(ia).show();

					$('.action-layer-close-top-main').on('click', function() {
						$('.action-layer-top').css('display', 'none');
					});

				});
				$('.maptools-ul li a').on('click', function() {
					var i = $(this).attr('data-attr');
					var title = $(this).attr('id');

					if(title == "xy-coordinate" || title == "swipeLayer"){
						$('.layer-popup').css('right','-300px');
						$(i).css('right','0px');
					}
				});

				$("#search_layer_link").click(function(){
					updateSearchLayers();
					$('#visibility_layer').prop('disabled',true);
					$("#visibility_layer").prop("checked",false);
				});
				
				$('.ol-gallery-thumbnail').on("click", function (){
					$('.ol-gallery-thumbnail').removeClass('img-height-full');
					$(this).addClass('img-height-full');
					let layerType = $(this).data("value");
					
					if(layerType == "satellite"){
						map.getLayers().item(0).setSource(new ol.source.XYZ({
				            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
				        }));
					}
					
					if(layerType == "blank"){
						map.getLayers().item(0).setSource(new ol.source.OSM);
					}
					
				})
				
				
				/**
				 * LOAD FUNCTION
				 */
				
				$(window).on("load", function(){
					$("#heatmap_legend").hide();
					window.depUtlityController.getWardList('bas_ward');
					window.depUtlityController.getLayerList("bas_layer");
					
					window.depUtlityController.getWardList('advanced_ward');
					window.depUtlityController.getLayerList("advanced_layer");
					
					window.depUtlityController.getWardList('sp_ward');
					window.depUtlityController.getQueryLayerByDepartmentId("Source Layer","sp_source_layer");
					window.depUtlityController.getQueryLayerByDepartmentId("Mask Layer","sp_mask_layer");
					
					window.depUtlityController.getLayerList("polygon_buffer_layer");
					window.depUtlityController.getDepartmentSwipeLayers('swipe_layer_select');
					dynamicLayerList();
					window.depUtlityController.getOpacityLayers("opacity_selected_layer");
				});
		});
	

	global.depMapController = base;


})(window, jQuery)
