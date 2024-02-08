(function(global, $) {
	"use stricts;"

	var map;
	var myFeatureTable;
	var myFeatureLayer;
	var reportCount = [];
	var reportLayerWithId = [];
	var report_dep_id;
	
	let base = {
		getMap : function getMap() {
			return map;
		},
		loadFeatureTableByCategory : function loadFeatureTableByCategory(
				category_name) {
			global.clickChart(category_name);
		},
		filterWiseTable : function filterWiseTable(report_array) {
			global.filterwiseData(report_array);
		},
		resetFilterEvent : function resetFilterEvent(){
			global.filterFeatureTable();
			window.reportController.clearMapGraphics();
		},
		getChartDataByDepartment : function getChartDataByDepartment(department_id){
			reportCount = [];
			global.chartDataByDepartment(department_id);
		},
		getChartArrayData : function(){
			return reportCount;
		}
	}

	require(
			[ "esri/layers/FeatureLayer", "esri/dijit/FeatureTable","esri/dijit/HomeButton",
					"esri/tasks/query", "esri/geometry/Extent",
					"esri/symbols/SimpleFillSymbol",
					"esri/symbols/SimpleLineSymbol", "esri/Color", "esri/map", 
					"esri/dijit/Popup", "esri/dijit/PopupTemplate",
					"dojo/dom-construct", "dojo/dom", "dojo/number",
					"dojo/parser", "dojo/ready", "dojo/on", "dojo/_base/lang",
					"dijit/registry", "dijit/form/Button",
					"dijit/layout/ContentPane", "dijit/layout/BorderContainer",
					"dijit/form/TextBox", "esri/request","esri/tasks/QueryTask",
					"esri/geometry/webMercatorUtils","esri/SpatialReference",
					"esri/symbols/PictureMarkerSymbol","esri/tasks/ProjectParameters",
					"esri/graphic","esri/geometry/projection","esri/geometry/Polygon","esri/geometry/Polyline",
					"esri/symbols/SimpleMarkerSymbol",
					"dojo/domReady!" ],
			function(FeatureLayer, FeatureTable,HomeButton, Query, Extent,
					SimpleFillSymbol, SimpleLineSymbol, Color, Map, Popup,
					PopupTemplate, domConstruct, dom, dojoNum, parser, ready,
					on, lang, registry, Button, ContentPane, BorderContainer,
					TextBox, esriRequest,QueryTask,webMercatorUtils,SpatialReference
					,PictureMarkerSymbol,ProjectParameters,Graphic,projection,Polygon,Polyline,
					SimpleMarkerSymbol) {

				parser.parse();

				var app = {};
				var report_csv_name = "";
				var appConfig = {
					mapView : null,
					sceneView : null,
					activeView : null,
					container : "map"
				};

//				map = new Map("map", {
//					zoom : window.MAP_INITIAL_ZOOM,
//					center : window.MAP_CENTER_POINT,
//					minZoom: window.MAP_MIN_ZOOM,
//			        maxZoom:window.MAP_MAX_ZOOM,
//					container : appConfig.container,
//					ui : {
//						components : [ "attribution" ]
//					},
//					basemap : "streets-navigation-vector"
//				});
				
//				 var home = new HomeButton({
//				        map: map
//				      }, "HomeButton");
//				      home.startup();
				
				
				// OPEN LAYER START
				
				const osm = new ol.layer.Tile({
				    source: new ol.source.OSM
				});
				
				const view = new ol.View({
					projection: 'EPSG:4326',
				    center: [75.8577, 22.7196],
				    zoom: 11.5,
				});
				
				const map = new ol.Map({
				    layers: [osm],
				    target: 'map',
				    view: view
				});
				
				$(".ol-attribution").remove();
				
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
				
				let location_mark = new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: 'images/icons/svgviewer-output.svg',
                    })
                });
				
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
				
				
				
				
				
				$('form[id="form_report_data"]')
				.validate(
						{
							rules : {
								
							},
							messages : {
								
							},
							submitHandler : function(form, e) {
								e.preventDefault();
								try {
									
									var form_data = {
											tableName: $("#report_data_category").val()
									}
									
									$.ajax({
				                        method: 'POST',
				                        url: window.iscdl.appData.baseURL + "citizen/query/getreportdata",
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
							}
						});
				
				
				
				
				// OPEN LAYER END
				/**
				 * global functions start
				 */

				global.filterFeatureTable = function filterFeatureTable(){
					
					if(myFeatureLayer){
						//map.removeLayer(myFeatureLayer);
					}
					
					if (myFeatureTable) {
						myFeatureTable.destroy();
						$("#feature_table").append('<div class="tbl_dep hospitolR-h100" id="myTableNode"></div>');
					}
				}
				
				global.chartDataByDepartment = function chartDataByDepartment(department_id){
					let token_val = localStorage.getItem('token');
					
					if(token_val == "" || token_val == undefined || token_val == null){
						$u.notify('info', 'Notification',
								'You are not authorized user', '');
						return;
					}
					
					let LayerInfoObj;
				
					LayerInfoObj = {
							department_id : department_id
					}					
					
					let postData = JSON.stringify(LayerInfoObj);
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "api/report/getLayerByDepartmentId",
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
									if (result.responseCode == '200') {
										let response = result.data;
										let length = response.length;
										if(length > 0){
											reportLayerWithId = [];
											window.reportController.getReportDataByDepartment(response);
										}
									} else {
										$u.notify('error', 'Notification',
												'Data not found', '');
									}
								} catch (err) {
									console.log(err);
								}
							} else {
								$u.notify('info', 'Notification',
										'data not available', '');
							}
						},
						error : function(e) {
							$(".loader").fadeOut();
							console.log(e);
						}
					});
				}
				
				var featureAttributes = [];
				var selected_layer = "";

				global.clickChart = function clickChart(category_name) {
					$(".loader").fadeIn();
					let layer_url = window.reportController
							.getLayerByCategotyName(category_name);
					selected_layer = layer_url;
					getLayerAttributes(layer_url);
					//map.graphics.clear();
					window.reportController.loadTable(layer_url,"");
				}

				global.filterwiseData = function filterwiseData(report_array) {

					let query = "";
					let a = 0;

					for ( let i in report_array) {
						let key = report_array[i].key.trim();
						let value = report_array[i].value.trim();
						let attr_type = "";

						for (let i = 0; i < featureAttributes.length; i++) {
							let field_name = featureAttributes[i].Value.trim();
							let field_type = featureAttributes[i].Type.trim();
							if (key == field_name) {
								attr_type = field_type;
								break;
							}
						}

						if (a == 0) {
							if (query == "") {
								if (attr_type == "esriFieldTypeOID"
										|| attr_type == "esriFieldTypeSmallInteger"
										|| attr_type == "esriFieldTypeInteger"
										|| attr_type == "esriFieldTypeDouble") {
									query += " " + key + " = " + value + " ";
								} else if (attr_type == "esriFieldTypeString"
										|| attr_type == "esriFieldTypeDate") {
									query += " " + key + " = '" + value + "' ";
								}
							}
						} else {
							if (query != "") {

								query += " OR ";

								if (attr_type == "esriFieldTypeOID"
										|| attr_type == "esriFieldTypeSmallInteger"
										|| attr_type == "esriFieldTypeInteger"
										|| attr_type == "esriFieldTypeDouble") {
									query += " " + key + " = " + value + " ";
								} else if (attr_type == "esriFieldTypeString"
										|| attr_type == "esriFieldTypeDate") {
									query += " " + key + " = '" + value + "' ";
								}
							}
						}
						a++;
					}
					window.reportController.loadTable(selected_layer,query);
				}
				
				/*$("#reset_hospital").click(function(){
					if (myFeatureTable) {
						myFeatureTable.destroy();
						$("#feature_table").append('<div class="tbl_dep hospitolR-h100" id="myTableNode"></div>');
					}
				});*/
				
				/**
				 * global functions end 
				 */
				
				/**
				 * function starts
				 */
				
				function getLayerAttributes(url) {

					var requestHandle = esriRequest({
						"url" : url,
						"content" : {
							"f" : "json"
						},
						"callbackParamName" : "callback"
					});

					requestHandle.then(requestSucceeded, requestFailed);
				}

				function requestSucceeded(response, io) {
					let str = "";

					featureAttributes = [];

					if (response.hasOwnProperty("fields")) {

						let field_list = response.fields;

						for (let i = 0; i < field_list.length; i++) {
							let field_value = field_list[i].name;
							let field_type = field_list[i].type;
							if (field_type == "esriFieldTypeGeometry") {
								continue;
							}
							featureAttributes.push({
								"Type" : field_type,
								"Value" : field_value
							});
						}
					} else {
						console.log("No field info found.");
					}
				}

				function requestFailed(error, io) {
					$(".loader").fadeOut();
					console.log("Error while getting field> " + error)
				}

				
				/**
				 * COMMON FUNCTIONS
				 */
				let report = {
						
					getReportDataByDepartment : function getReportDataByDepartment(response){
						let total_count = 0;
						try{
							for (let i = 0;i< response.length ; i++){
								let name = response[i].layer_name;
								let id = response[i].layer_id;
								
								if(i == 0){
									report_dep_id = id;
								}
								reportLayerWithId.push({"layer_name" : name,"layer_id": id});
								
								queryTask = new QueryTask(window.INDORE_LAYERS_SYMBOLOGY + "/" + id);
								
								let query = new Query();
								query.returnGeometry = true;
								query.outFields = ["*"];
								query.where = "1=1";
							    queryTask.execute(query,function(result){
							    	let feature_count = result.features.length;
							    	total_count += feature_count;
							    	if(feature_count == 0){
							    		feature_count = null;
							    	}
							    	reportCount.push({"name" : name,"value": feature_count});
							    });
							}
						}catch(e){
							console.log(e);
						}
					},	
					loadTable : function loadTable(layer_url, filter_query) {

						if(myFeatureLayer){
							//map.removeLayer(myFeatureLayer);
						}
						
						if (myFeatureTable) {
								myFeatureTable.destroy();	
							$("#feature_table").append('<div class="tbl_dep hospitolR-h100" id="myTableNode"></div>');
						}

						myFeatureLayer = new FeatureLayer(layer_url, {
							mode : FeatureLayer.MODE_ONDEMAND,
							outFields : [ "*" ],
							visible : true,
						});
						

						myFeatureLayer.on("click",function(evt) {
											//map.graphics.clear();
											var idProperty = myFeatureLayer.objectIdField, feature, featureId, query;

											if (evt.graphic
													&& evt.graphic.attributes
													&& evt.graphic.attributes[idProperty]) {
														feature = evt.graphic,
														featureId = feature.attributes[idProperty];
												query = new Query();
												query.returnGeometry = false;
												query.objectIds = [ featureId ];
												query.where = "1=1";
												myFeatureLayer.selectFeatures(query,FeatureLayer.SELECTION_NEW);
											}
						});
						
						myFeatureLayer.on("load", function(){
							  var query = new Query();
							  query.where = "1=1";
							  query.outSpatialReference = new SpatialReference(4326);
							  myFeatureLayer.queryExtent(query, zoomToExtent);
						});
							    
						function zoomToExtent(response){
							if(response.count > 0){
								if(response.extent.xmin != "NaN" &&
								   response.extent.xmax != "NaN" &&
								   response.extent.ymax != "NaN" &&
								   response.extent.ymin != "NaN")
								{
									var extent = response.extent;
									//map.setExtent(extent, true);
								}
							}
						}
						
						//map.addLayer(myFeatureLayer);

						if(filter_query != ""){
							myFeatureLayer.setDefinitionExpression(filter_query);
						}
						
						myFeatureTable = new FeatureTable(
								{
									featureLayer : myFeatureLayer,
									map : map,
									editable : false,
									syncSelection : true,
									zoomToSelection : true,
									batchCount : 10000,
									dateOptions : {
										datePattern : 'M/d/y',
										timeEnabled : true,
										timePattern : 'H:mm',
									},
									fieldInfos : [],
									menuFunctions: [
										{ label: "Clear Map Graphics", callback: window.reportController.clearMapGraphics },
										{ label: "Export to CSV", callback: window.reportController.customExportCSV } 
							          ]
								}, 'myTableNode');
						myFeatureTable.startup();
						myFeatureTable.on("refresh", function(evt) {
							$(".loader").fadeOut();
						});
						myFeatureTable.on("error", function(evt) {
							$(".loader").fadeOut();
						});
						myFeatureTable.on("row-select", function(evt){
							//map.graphics.clear();
							
							let selectedRowLength = evt.rows.length;
							
							let obId = "";
							
							for(let a = 0;a < selectedRowLength ; a++){
								if(a == selectedRowLength -1){
									obId += evt.rows[a].id;
								}else{
									obId += evt.rows[a].id + ",";
								}
							}
							
							queryTask = new QueryTask(layer_url);
					         let query = new Query();
					         query.returnGeometry = true;
					         query.outFields = ["*"];
					         query.objectIds = [ obId ];
					         try{
					        	 $(".loader").fadeIn();
					        	 queryTask.execute(query,function(result){
					        		 $(".loader").fadeOut();
					        		 	if(result){
							        		let geomType = result.geometryType;
								        	if(geomType == "esriGeometryPoint"){
								        		for(let i = 0;i<result.features.length;i++){
								        			let feature = result.features[i];
									        		let geometry = feature.geometry;
									        		let latitude = geometry.y;
									 	        	let longitude = geometry.x;
													let query_point = new esri.geometry.Point(longitude,latitude);
													let geometryService = new esri.tasks.GeometryService
													(window.prefix_layer_url + "Utilities/Geometry/GeometryServer");
									 	        	let PrjParamsmin = window.reportController.
									 	        	convertCoordinateMeterToDegree(longitude,latitude);
													
													geometryService.project(PrjParamsmin, function (outputpoint) {
									 	        		let olatitude = outputpoint[0].y;
											            let olongitude = outputpoint[0].x;
											            if(olatitude && olongitude){
											            	let c_query_point = new esri.geometry.Point(olongitude,olatitude);
											            	var sms = new SimpleMarkerSymbol().setStyle(
											            		    SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
											            		    new Color([3, 28, 252,0.5]));
											            	var pointGraphic = new esri.Graphic(c_query_point,sms);
											            	//map.graphics.add(pointGraphic);
											            }
									 	        	 });
								        		}
								        	}else if(geomType == "esriGeometryPolygon"){
								        		for(let i = 0;i<result.features.length;i++){
								        			let feature = result.features[i];
									        		let geometry = feature.geometry;
									        		
									        		var outSpatialReference = new SpatialReference({
									 	        		 wkid: 4326
									 	        	});
									 	        	
									 	        	projection.load().then(function() {
										 	        	let cgeometry = projection.project(geometry, outSpatialReference);
										 	        	var polygon = {"geometry":cgeometry,"symbol":
										 	        	{"color":[0,0,0,64],"outline":{"color":[0,0,0,255],
										 	        	    "width":1,"type":"esriSLS","style":"esriSLSSolid"},
										 	        	    "type":"esriSFS","style":"esriSFSSolid"}};
										 	        	
										 	        	let polygonGraphic = new esri.Graphic(polygon);
										 	        	//map.graphics.add(polygonGraphic);
									 	        	});
								        		}
								        		
								        	}else if(geomType == "esriGeometryPolyline"){
								        		
								        		for(let i = 0;i<result.features.length;i++){
								        			let feature = result.features[i];
									        		let geometry = feature.geometry;
									        		
									        		var outSpatialReference = new SpatialReference({
									 	        		 wkid: 4326
									 	        	});
									 	        	
									 	        	projection.load().then(function() {
										 	        	let cgeometry = projection.project(geometry, outSpatialReference);
										 	        	var line = {"geometry":cgeometry,"symbol":
										 	        	{"color":[0,0,0,255],"width":1,"type":"esriSLS","style":"esriSLSSolid"}};
										 	        	let lineGraphic = new esri.Graphic(line);
										 	        	//map.graphics.add(lineGraphic);
									 	        	});
								        		}
								        	}
							        	}
							         },function(error){
							        	 $(".loader").fadeOut();
							        	   console.log(error);
							        	   //map.graphics.clear();
							         });
					         }catch(e){
					        	 $(".loader").fadeOut();
					        	 console.log(e);
					        	 //map.graphics.clear();
					         }
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
					getLayerByCategotyName : function getLayerByCategotyName(cat_name) {
						let layer_url = "";
						let layer_id = "";
						
						for(let i in reportLayerWithId){
							let layer_name = reportLayerWithId[i].layer_name;
							if(layer_name == cat_name){
								layer_id = reportLayerWithId[i].layer_id;
								break;
							}
						}
						layer_url = window.INDORE_LAYERS_SYMBOLOGY + "/" + layer_id;
						return layer_url;
					},
					clearMapGraphics : function clearMapGraphics(){
//						if(map.graphics){
//							map.graphics.clear();
//						}
//						if(myFeatureTable){
//							myFeatureTable.clearSelection();
//						}
					},
					customExportCSV : function customExportCSV(evt){
					          var data = myFeatureTable.dataStore.data;
					          
					          if(data.length == 0){
					        	  $u.notify('info', 'Notification','No Data Available', '');
					        	  return;
					          }
					          
					          var csv = window.reportController.convertArrayOfObjectsToCSV({
					             data: data 
					          });
					            
					          if (!csv.match(/^data:text\/csv/i)) {
					              csv = 'data:text/csv;charset=utf-8,' + csv;
					          }
					          
					          let report_name = window.reportController.getReportName();
					          
					          if(report_name == "" || report_name == undefined){
					        	  report_name = "ReportData";
					          }
				          	
				            var encodedUri = encodeURI(csv);
				            var link = document.createElement('a');
				            link.setAttribute('href', encodedUri);
				            link.setAttribute('download',report_name + ".csv");
				            link.click();

				     },
				     convertArrayOfObjectsToCSV : function convertArrayOfObjectsToCSV(value){
				            return window.reportController.getColumnWiseAttributeData(value);
				        },
				        getColumnWiseAttributeData(value){
				        	
				        	var result, ctr, keys, columnDelimiter, lineDelimiter, data;
				        	
				        	data = value.data || null;
				            if (data == null || !data.length) {
				                return null;
				            }
				        	
				        	columnDelimiter = value.columnDelimiter || ',';
				            lineDelimiter = value.lineDelimiter || '\n';
				            
				            result = '';
				            	
				            	for(let i in data){
				            		let item = data[i];
				            		keys = Object.keys(data[i]);
				            		 keys.forEach(function(key) {
					                    	if(key == "attributes"){
					                    		let columns = Object.keys(item[key]);
					                    		for(let c in columns){
					                    			let column = columns[c];
					                    			if(c == columns.length-1){
					                    				result += column;
					                    			}else{
					                    				result += column + columnDelimiter;	
					                    			}
					                    		}
					                    	}else if(key == "_layer"){
					                    		let reportName = JSON.parse(data[i]._layer._json).name;
					                    		report_csv_name = "";
					                    		window.reportController.setReportName(reportName);
					                    	}
					                });
					                result += lineDelimiter;
					                break;
				            	}
				            	
				            	
				            	for(let i in data){
				            		let item = data[i];
				            		 keys.forEach(function(key) {
					                    	if(key == "attributes"){
					                    		let columns = Object.keys(item[key]);
						                    	columns.forEach(function(column) {
						                    		let value = item[key][column];
						                    		if(value != null){
						                    			let values = value.toString().split(",");
							                    		if(values.length > 1){
							                    			let imgs = "";
							                    			for(let v in values){
							                    				if(v == values[v].length -1){
							                    					imgs += values[v];
							                    				}else{
							                    					imgs +=values[v] + ";";
							                    				}
							                    			}
							                    			value = imgs;
							                    		}else{
							                    			value = values[0];
							                    		}
						                    		}
						                    		result += value + columnDelimiter;
						                    	});
					                    	}
					                });
					                result += lineDelimiter;
				            	}
				            	
				            	return result;
				        },
				        setReportName : function(reportName){
				        	report_csv_name = reportName;
				        },
				        getReportName : function(){
				        	return report_csv_name;
				        }
				}
				window.reportController = report;

				/**
				 * Function end
				 */

				$(window).on("load", function() {
					window.reportController.loadTable(window.INDORE_LAYERS_SYMBOLOGY + "/" + report_dep_id ,"");
				});
				
				$(document).ready();
			});
	global.commonReportController = base;
})(window, jQuery)