(function(global, $) {
	"use stricts;"

	var map;
	var app = {};
	var appConfig = {
		mapView : null,
		sceneView : null,
		activeView : null,
		container : "projectMonitoringMap"
	};
	
	require([ "esri/map","esri/geometry/webMercatorUtils","dojo/domReady!" ],
			function(Map,webMercatorUtils){
		map = new Map("projectMonitoringMap", {
			center : [ 75.8577, 22.7196  ],
			zoom : 11,
			container : appConfig.container,
			ui : {
				components : [ "attribution" ]
			},
			basemap : "streets-navigation-vector"
		});
		
		
		
		map.on("click", function(evt) {
			let mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
			
			let flag = window.monitoringMapController.modal_flag;
			
			if(flag === "ADD"){
				$('#prj_latitude').val(mp.y.toFixed(6).toString());
				$('#prj_longitude').val(mp.x.toFixed(6).toString());
				
				let requestData = {latitude: $("#prj_latitude").val(), longitude: $("#prj_longitude").val()};
				window.depUtlityController.getLocationInfoByLatLong(requestData);
				let locationData = window.depUtlityController.locationInfoByLatLong;
				if(locationData) {
					if(locationData.responseMessage){
						$u.notify('warning', 'Notification',
								locationData.responseMessage, '');
						return;
					}
					$("#prj_ward_no").val(locationData.data.ward_info.ward_no);
					$("#prj_ward_name").val(locationData.data.ward_info.ward_name);
					$("#prj_zone_no").val(locationData.data.zone_info.zone_no);
					$("#prj_zone_name").val(locationData.data.zone_info.zone_name);
				}
			}else{
				$('#prjUp_latitude').val(mp.y.toFixed(6).toString());
				$('#prjUp_longitude').val(mp.x.toFixed(6).toString());
				
				let requestData = {latitude: $("#prjUp_latitude").val(), longitude: $("#prjUp_longitude").val()};
				window.depUtlityController.getLocationInfoByLatLong(requestData);
				let locationData = window.depUtlityController.locationInfoByLatLong;
				if(locationData) {
					if(locationData.responseMessage){
						$u.notify('warning', 'Notification',
								locationData.responseMessage, '');
						return;
					}
					$("#prjUp_ward_no").val(locationData.data.ward_info.ward_no);
					$("#prjUp_ward_name").val(locationData.data.ward_info.ward_name);
					$("#prjUp_zone_no").val(locationData.data.zone_info.zone_no);
					$("#prjUp_zone_name").val(locationData.data.zone_info.zone_name);
				}
			}
			
			$("#monitoringMapModal .close").click();
			window.monitoringMapController.removeCursor();
			
		});
		
	});
	
	var chooseCoordinate = {
			getProjectMonitorMap : function (){
				map.setMapCursor("crosshair");
				return map;
			},
			removeCursor : function(){
				map.setMapCursor("default");
			},
			modal_flag : "",
	}

	/**
	 * add public functions to base
	 */

	global.monitoringMapController = chooseCoordinate;

})(window, jQuery)