var mapClickEvtHandler;
var _current_lat = "";
var _current_long = "";
var map;

require([ 
			"esri/Map", "esri/views/SceneView", 
			"esri/layers/SceneLayer" ,"esri/widgets/Home",
			"esri/geometry/Extent",
			 "esri/widgets/LayerList",
			"esri/views/MapView",
			"esri/widgets/Expand","esri/geometry/SpatialReference",
			"esri/widgets/Locate",
			"esri/widgets/Search",
			"esri/geometry/Point",
			"esri/geometry/support/webMercatorUtils",
			"esri/layers/ElevationLayer",
			 "esri/tasks/GeometryService",
			 "esri/tasks/support/ProjectParameters","esri/tasks/Locator",
			 "esri/tasks/PrintTask",
			"esri/tasks/support/PrintTemplate","esri/tasks/support/PrintParameters",
			"esri/layers/TileLayer","esri/Basemap","esri/widgets/BasemapToggle"
		], 
		function(
				Map, SceneView, 
				SceneLayer,Home, 
				Extent,
				LayerList,
				MapView,
				Expand,	
				SpatialReference,Locate,
				Search,
				Point,
				webMercatorUtils,ElevationLayer,
				GeometryService, ProjectParameters,Locator,
				PrintTask,PrintTemplate,PrintParameters,
				TileLayer,Basemap,BasemapToggle
		) 
	{
		 const gandhi_hall_slayer = new SceneLayer({
		        url: window.HERITAGE_GANDHI_HALL,
		        visible: false,
		        title : "Gandhi Hall"
		    });
		 
		 const holkar_stadium_slayer = new SceneLayer({
		        url: window.HERITAGE_HOLKAR_STADIUM,
		        visible: false,
		        title : "Holkar Stadium"
		    });
			
			const white_church_slayer = new SceneLayer({
		        url: window.HERITAGE_WHITE_CHURCHE,
		        visible: false,
		        title : "White Church"
		    });
			
			const naxtra_wedding_hall_slayer = new SceneLayer({
		        url: window.HERITAGE_NAXTRA_WEDDING_HALL,
		        visible: false,
		        title : "Naxtra Wedding Hall"
		    });
			
			const nehru_stadium_slayer = new SceneLayer({
		        url: window.HERITAGE_NEHRU_STADIUM,
		        visible: false,
		        title : "Nehru Stadium"
		    });

			const lalbhag_slayer = new SceneLayer({
		        url: window.HERITAGE_LALBHAG,
		        visible: false,
		        title : "Lalbhag"
		    });
			
			const rajawada_slayer = new SceneLayer({
		        url: window.HERITAGE_RAJAWADA,
		        visible: false,
		        title : "Rajawada"
		    });
			
			const khajrana_temple_slayer = new SceneLayer({
		        url: window.HERITAGE_KHAJRANA_TEMPLE,
		        visible: false,
		        title : "Khajrana Temple"
		    });
			
			const collector_ofc_slayer = new SceneLayer({
		        url: window.HERITAGE_COLLECTOR_OFFICE,
		        visible: true,
		        title : "Collector Office"
		    });

			/**
			 * Tile Layers
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
		ground : "world-elevation",
		layers: [
			white_church_slayer,rajawada_slayer,nehru_stadium_slayer,naxtra_wedding_hall_slayer,
			 lalbhag_slayer,khajrana_temple_slayer,holkar_stadium_slayer,gandhi_hall_slayer,collector_ofc_slayer
			]
	});
	
	//initial extent
	var initialExtent = new Extent(75.54699290771396,
			22.63628705473749, 76.16840709228345, 22.80286225175135,
			new SpatialReference({
				wkid : 4326
	}));
	
	 var view = new SceneView({
         container: "map",
         map: map,
         zoom : window.MAP_INITIAL_ZOOM,
		 center : window.MAP_CENTER_POINT
     });
	 
	 
		var orthoBasemap = new Basemap(
				{
					baseLayers : [ ortho_25,ortho_6,ortho_4_2,
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
					title : "ISCDL Drone Image 2020",
					id : "Ortho Mosaic Basemap",
					thumbnailUrl : "https://www.arcgis.com/sharing/rest/content/items/"
							+ "86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/thumbnail1591224931210.jpeg"
				});
	 
	 
	  var toggle = new BasemapToggle({
		 titleVisible: true,
		 view: view, 
	      nextBasemap: orthoBasemap 
	    });

	 view.ui.add(toggle, "top-right");
	 
	 view.when(function() {
		 
         var layerList = new LayerList({
           view: view,
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

         view.ui.add(layerList, "bottom-right");
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
	 
	 view.on("click", function(event) {
			$("#coordinateDiv").show();
			showElevationValue(event);
		});
		
		function showElevationValue(evt) {
			let mapPoint = evt.mapPoint;
			let x = mapPoint.longitude.toFixed(6);
			let y = mapPoint.latitude.toFixed(6);
			let z = mapPoint.z.toFixed(4);
	        $("#coordinateDiv").text("X: "+x+" "+"Y: "+y+" "+"Z: "+z);
	    }
	 
	 /**
	  *  -------- widget start ------- 
	  */
	 
	 var homeBtn = new Home({
         view: view
       });

       view.ui.add(homeBtn, "top-left");
	 
	 //search
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
	
    var locate = new Locate({
        view: view,
        
        useHeadingEnabled: false,
        //container: "locateDiv",
        goToOverride: function(view, options) {
          options.target.scale = 1500;  // Override the default map scale
                  
          let point = {
                  type: "point",
                  x: options.target.target.x,
                  y: options.target.target.y,
                  z: options.target.target.z
          };
          
          let mp = webMercatorUtils.webMercatorToGeographic(point);
          
          if(!initialExtent.contains(mp)){
        	  $u.notify('info', 'Notification',
						'Current location is not within Indore boundary', '');
        	  return; 
          }
          
          return view.goTo(options.target);
        }
      });

      view.ui.add(locate,"top-left");
		
      
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
			var $alertas = $('#form_print');
		    $alertas.validate().resetForm();
		    $alertas.find('.error').removeClass('error');
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
      
      
		/**
		 * LOAD FUNCTION
		 */
		
		$(window).on("load", function(){
				$("#coordinateDiv").hide();
		});
		
		$(document).ready(function(){
				$(".loader").fadeOut();
			  
				$(".heritage-action ul li a").click(function(){
					$(".action-layer").removeClass("div-hidden").addClass("active") ;
					$(".layer-popup").css("display","block");
				});
				$(".layer-close").click(function(){
				  $(".layer-popup").css("display","none");
				});
		});
});