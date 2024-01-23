var mapClickEvtHandler;
var _current_lat = "";
var _current_long = "";
var map,view;

require([ 
			"esri/Map", "esri/views/SceneView", 
			"esri/layers/SceneLayer" ,"esri/widgets/Home",
			"esri/geometry/Extent",
			"esri/views/MapView",
			"esri/widgets/Expand","esri/geometry/SpatialReference",
			"esri/widgets/Locate",
			"esri/widgets/Search",
			"esri/geometry/Point",
			"esri/geometry/support/webMercatorUtils",
			"esri/layers/PointCloudLayer",
			 "esri/tasks/GeometryService",
			 "esri/tasks/support/ProjectParameters","esri/tasks/Locator",
			 "esri/widgets/DirectLineMeasurement3D","esri/widgets/AreaMeasurement3D",
			 "esri/widgets/Measurement","esri/layers/ElevationLayer"
		], 
		function(
				Map, SceneView, 
				SceneLayer,Home, 
				Extent,
				MapView,
				Expand,	
				SpatialReference,Locate,
				Search,
				Point,
				webMercatorUtils,PointCloudLayer,
				GeometryService, ProjectParameters,Locator,
				DirectLineMeasurement3D,AreaMeasurement3D,Measurement,ElevationLayer
		) 
	{

	 var pointCloudLayer = new PointCloudLayer({
		  url:  window.LIDAR_POINT_CLOUD_LAYER
		});
	 
	 const abd_dem_0_5_wgs = new ElevationLayer({
	        url:window.ABD_DEM_0_5_WGS,
	        visible : true,
	        title : "ABD DEM"
	      });
	 
	 /*const pocket_12_terrian_dem = new ElevationLayer({
			url : window.DEM_P1_P2_IMAGE_LAYER,
			visible : true,
			title : "ISCDL DEM"
		});*/
		 

	map = new Map({
		basemap : "streets-navigation-vector",
		//ground : "world-elevation",
		layers: [pointCloudLayer]
	});
	
	map.ground.layers.add(abd_dem_0_5_wgs);
	//map.ground.layers.add(pocket_12_terrian_dem);
	
	
	//initial extent
	var initialExtent = new Extent(75.54699290771396,
			22.63628705473749, 76.16840709228345, 22.80286225175135,
			new SpatialReference({
				wkid : 4326
	}));
	
	 view = new SceneView({
         container: "map",
         map: map,
         zoom : 12,
         center: [75.8577, 22.7196]
     });
	 
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
      
      const measurement = new Measurement();
      measurement.view = view;
      
      const distanceButton = document.getElementById("distance");
      const areaButton = document.getElementById("area");
      const clearButton = document.getElementById("clear");
      
      distanceButton.addEventListener("click", function () {
          distanceMeasurement();
        });
        areaButton.addEventListener("click", function () {
          areaMeasurement();
        });
        clearButton.addEventListener("click", function () {
          clearMeasurements();
        });
      
   // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
      function distanceMeasurement() {
        measurement.activeTool = "direct-line";
        distanceButton.classList.add("active");
        areaButton.classList.remove("active");
      }

      // Call the appropriate AreaMeasurement2D or AreaMeasurement3D
      function areaMeasurement() {
        measurement.activeTool = "area";
        distanceButton.classList.remove("active");
        areaButton.classList.add("active");
      }

      // Clears all measurements
      function clearMeasurements() {
        distanceButton.classList.remove("active");
        areaButton.classList.remove("active");
        measurement.clear();
      }
      
      view.ui.add(measurement, "bottom-right");
      
      measurement.watch("viewModel.state", function(state){
    	  if(state == 'measured'){
    		  $(".esri-direct-line-measurement-3d__units-select option[value='nautical-miles']").remove();
              $(".esri-direct-line-measurement-3d__units-select option[value='us-feet']").remove();
              $(".esri-area-measurement-3d__units-select option[value='square-us-feet']").remove();
    	  }
    	});
      
		$(document).ready(
				function() {
					$(".loader").fadeOut();
					
				  let xmin = 8439003.776618494;
				  let xmax = 8449046.352683801;
				  let ymin = 2594604.591193056;
				  let ymax =  2599815.1634033765;
					
				  let cmaxp = {type : "point",x : xmax,y : ymax};
	        	  let cminp = {type : "point",x : xmin,y : ymin};
	        	  let cminmp = webMercatorUtils.webMercatorToGeographic(cminp);
	        	  let cmaxmp = webMercatorUtils.webMercatorToGeographic(cmaxp);
   				  
	        	  let boxZoomExtent = new Extent(cminmp.x,cminmp.y, cmaxmp.x, cmaxmp.y,
	        			  new SpatialReference({wkid : 4326
	        	  }));
	        	  
	        	  if(boxZoomExtent != undefined || boxZoomExtent != null){
	        		  view.goTo(boxZoomExtent);
	        	  }
		});
		
		/**
		 * LOAD FUNCTION
		 */
		
		$(window).on("load", function(){});
		
		$(document).ready(function(){
			$(".loader").fadeOut();
	});
         
});