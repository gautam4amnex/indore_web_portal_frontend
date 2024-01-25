/**
 * 
 */
(function(global, $) {
	
	var nearme = {
			
			setRequiredEvent : function(){
				
				var slider = document.getElementById("nearMeRange");
				var output = document.getElementById("nearMeRangeValue");
				output.innerHTML = slider.value;
				slider.oninput = function() {
					output.innerHTML = this.value;
				}
				$("#myRadioGroup").selectpicker();
				
				var dataObject = {
					flag : false,
					distance : (parseInt($("#nearMeRange").val()) * 1000),
					message : global.contents.click
				};
				
				$("#myRadioGroup").change(function() {
					$("#nearByData").html("");	
					let nearMeDataObject = global.mapController.getNearMeData();
					if(nearMeDataObject.flag){
						global.nearMeModule.getNearMeDataFromFeature({
							"source" : nearMeDataObject.layerOne, 
							"featureid" : nearMeDataObject.layerValue, 
							"targets" : [$(this).val()], 
							"latLong" : nearMeDataObject.latLong,
							"buffer" : (parseInt($("#nearMeRange").val()) * 1000) 
						});
						global.mapController.setNearMeData({flag : false});
					} else {
						dataObject.flag = true;
						dataObject.distance = (parseInt($("#nearMeRange").val()) * 1000);
						global.mapController.setEnableClick(dataObject);
						global.mapController.removePointLayer();
						global.mapController.clearAttributeLayer();
					}
				});
				
				$("#nearMeRange").on("input", function(){
					
					let value = $(this).val();
					if(value){
						
						value = value * 1000;
						dataObject.distance = value;
						dataObject.flag = true;
						global.mapController.setEnableClick(dataObject);
						
						let layerValue = $("option[name='near']:selected").val();
						if(layerValue && layerValue != ""){
							
							global.mapController.clearLayer(global.mapController.getAttributeLayer());
							let features = global.mapController.plotPoint(global.mapController.lat, global.mapController.long, true);
							let previousFeaure = features["pointFeature"];
							previousFeaure.setGeometry($u.addBuffer(previousFeaure, value));
							let wkt = $u.getWKT(previousFeaure);
							
							let obj = {
							  	"value" : wkt,
							  	"tablename" : layerValue,
							  	"dataType" : "AttributeData",
							  	"layer" : global.mapController.getAttributeLayer(),
							  	"layerName" : "attributeLayer",
							  	"isZoomToExtent" : false,
							  	"bufferObject" : {
									isBuffered : false,
									featureType : "attributeData"
								},
							  	"otherFunction" : function(geoJson){
							  		
							  		let object = {
							        	json : geoJson,
							        	divID : "nearByData",
							        	img : true,
							        	isPopUpOpen : true
							        };
							  		
							        global.mapController.setResultTab(object);
							        global.mapController.zoomToExtent(global.appData.defaultExtent); // zoom to home - added 03/11/2018
							   	} 
							 };
							
							 global.mapController.parseGeoJsonData(obj);
						}
					}
				});
				
			}, aroundMeData : (that)=>{
					
				let plotedPointLayer = window.modules.mapController.checkPointLayer();
				if(plotedPointLayer) {
					window.modules.mapController.removeLayer(plotedPointLayer);
				}
				
				let name = $(that).data("name");
				if(name && name != "" && name != null && name.indexOf("~") > 1){
					name = name.replace("~", "'");
				}
				let layerName = $(that).data("layer");
				let fid = $(that).data("id");
				let lat = $(that).data("lat");
				window.modules.mapController.lat = lat;
				let lon = $(that).data("lon");
				window.modules.mapController.long = lon;
				
				$('.maptool-close-query').hide();
				$('.maptool-close').hide();
				$("#nearByData").html("");	
				$("#myRadioGroup").val("-1").selectpicker("refresh");
				$('.pra-layer').css('right','0px');
				$("#prNearme").data("is_around_me", true);
				$(".proximity-analysis-tab a[href='#prNearme']").tab("show");
				let nearMeObject = {
					flag : true,
					latLong : [lat,lon],
					layerOne : layerName,
					layerValue : fid
				}
				window.modules.mapController.setNearMeData(nearMeObject);
					
			}, getNearMeDataFromFeature : function(nearMeObject){
				
				let that = this;
				
				fetch("../map/getNearMeDataFromFeature", {
					method : "POST",
					headers : {
						"Accept" : "application/json",
						"Content-Type" : "application/json;charset=utf-8"
					},
					body : JSON.stringify(nearMeObject)
				})
				.then((response) => response.json())
				.then((data) => {
					if(data && data != null){
		        		try{
			        		//window.mapData.mapController.setResultTab(object);
			        		global.mapController.plotPoint(nearMeObject.latLong[0], nearMeObject.latLong[1], true);
			        		for(let obj of data){
		        				try {
		        					if(obj.data && obj.data.features && obj.data.features.length > 0){
		        						let geoJsonObject = {
		        							'featureProjection' : global.coordinates.epsg_3857,
		        							'dataProjection' : global.coordinates.epsg_4326,
					        				'tableName' : obj.layer_name,
					        				'IsSingleGeometry' : false,
					        				'geoJson' : obj.data,
					        				'geometryType' : obj.data.features[0].geometry.type
					        			};
						        			
			        					global.mapController.parseGeoJson(geoJsonObject,  global.mapController.getAttributeLayer(), "attributeLayer");
						        			
					        			let object = {
					        				json : obj.data,
					        				divID : "nearByData",
					        				img : true,
					        				isAppend : false,
					        				isPopUpOpen : true
					        			};
					        			global.mapController.setResultTab(object);
		        					}
								} catch (e) {
									console.error(e);
								}
		        			}
						} catch(e){
							console.error(e);
							$u.notify(global.contents.error, global.toasters.error, global.errors.no_data);
						}
					} else {
						$u.notify(global.contents.error, global.toasters.error, global.errors.no_data);
					}
				})
				.catch((e) => {
					console.error(e);
					$u.notify(global.contents.error, global.toasters.error, global.errors.no_data);
				})
				
			}
	}
 
	global.nearMeModule = nearme;

})(modules, jQuery);