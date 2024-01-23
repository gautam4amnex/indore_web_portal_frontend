(function(global, $) {
	"use stricts;"
	
	global.CRIME_DATA = "Crime";
	global.ACCIDENT_DATA = "Accidents";
	global.HIGH_RISE_BUILDINGS_DENSITY = "High Rise Buildings Density";
	global.VEHICLE_THEFT_DATA ="Vehicle Theft";
	
	global.heatmap_department_ids = {
			"Atal Indore City Transport Service Limited" : "46",
			//"Director of Planning Economics and Statistics Department" : "49",
			//"District Registrar Department":"50",
			//"District Urban Development Authority":"4",
			//"Diversion Section":"55",
			"Education Department":"5",
			"GIS Cell (Super Admin)":"1",
			"Health Department":"6",
			"Indore Development Authority":"8",
			"Indore Municipal Corporation":"9",
			"Land Record Department":"65",
			"Industrial (MPIDA) Department":"10",
			//"Madhya Pradesh Housing Board Department" : "7",
			"Electrical Department" : "64",
			"Madhya Pradesh Pollution Control Board" : "53",
			//"Nazul Section" : "54",
			"Police Department" : "16",
			"Public Health Engineer Department":"18",
			"Public Works Department":"19",
			//"Regional Transport Officer":"21",
			"Indore Smart City Department":"70",
			"Town and Country Planning Department" : "45",
			"Women &amp; Child Development Department" : "52",
	}

	var heatmap = {
			setCriteriaAccordingToHeatMapLayer : function(heatmap_layer_id){
				let content = "";
				let name = "healtmap_criteria_name";
				switch (heatmap_layer_id) {
				case global.heatmap_department_ids["Police Department"]:
					content += '<label for="select_criteria" data-translate = "_heat_map_scriteria">Select Criteria</label><span class="mandatory">*</span><br>' +
					'<input type="radio" name='+name+' value="'+global.ACCIDENT_DATA+'" checked>' +
					'<label for="'+global.ACCIDENT_DATA+'">'+global.ACCIDENT_DATA+'</label><br>' +
					'<input type="radio" name='+name+' value="'+global.VEHICLE_THEFT_DATA+'">' +
					'<label for="'+global.VEHICLE_THEFT_DATA+'">'+global.VEHICLE_THEFT_DATA+'</label><br>';
					break;
				case global.heatmap_department_ids["Indore Municipal Corporation"]:
					content += '<label for="select_criteria" data-translate = "_heat_map_scriteria">Select Criteria</label><span class="mandatory">*</span><br>' +
					'<input type="radio" name="'+name+'" value="'+global.HIGH_RISE_BUILDINGS_DENSITY+'" checked>' + 
						'<label for="'+global.HIGH_RISE_BUILDINGS_DENSITY+'">'+global.HIGH_RISE_BUILDINGS_DENSITY+'</label><br>';
					break;
				default:
					content = "";
					break;
				}
				$("#heat_map_criteria").html(content);
			},
			getHeatMapLayerByCriteria : function(criteria_value){
				let layer_url = "";
				
				switch (criteria_value) {
				case global.ACCIDENT_DATA:
					layer_url = window.ACCIDENT_URL;
					break;
				case global.HIGH_RISE_BUILDINGS_DENSITY:
					layer_url = window.BUILDING_FOOTPRINT_2020_URL;
					break;
				case global.VEHICLE_THEFT_DATA:
					layer_url = window.VEHILCE_THEFT_URL;
					break;
				default:
					layer_url = "";
					break;
				}
				return layer_url;
			},
			getInfoTemplateByCriteria : function(criteria_value){
				
				let info_template;
				let template_content = "";
				
				let table_content = '<table class="table table-bordered w-100 map-detail-custom"><tbody>';
				
				switch (criteria_value) {
				case global.ACCIDENT_DATA:
					table_content += 
					'<tr><td><b>Police Station</b></td><td>${police_station}</td></tr>' + 
					'<tr><td><b>Crime Series</b></td><td>${crime_series}</td></tr>' + 
					'<tr><td><b>Section IPC</b></td><td>${section_ipc}</td></tr>' +
					'<tr><td><b>Incident Date</b></td><td>${incident_date}</td></tr>' + 
					'<tr><td><b>Incident Time</b></td><td>${incident_time}</td></tr>' +
					'<tr><td><b>Accident Site</b></td><td>${accident_site}</td></tr>' + 
					'<tr><td><b>Cause Of Accident</b></td><td>${cause_of_accident}</td></tr>';
					
					template_content += table_content + '</tbody></table>';
					info_template = new esri.InfoTemplate(criteria_value,template_content);
					break;
				case global.HIGH_RISE_BUILDINGS_DENSITY :
					table_content += 
						'<tr><td><b>Ward Name</b></td><td>${ward_name}</td></tr>' + 
						'<tr><td><b>Zone Name</b></td><td>${zone_name}</td></tr>' + 
						'<tr><td><b>Building Height</b></td><td>${building_heights}</td></tr>' +
						'<tr><td><b>Number Of Floor</b></td><td>${number_of_floor}</td></tr>' + 
						'<tr><td><b>Landmark</b><td>${landmark}</td></tr>' +
						'<tr><td><b>Locality</b></td><td>${locality}</td></tr>';
					
						template_content += table_content + '</tbody></table>';
						info_template = new esri.InfoTemplate(criteria_value,template_content);
						break;
				case global.VEHICLE_THEFT_DATA :
					table_content += 
						'<tr><td><b>Police Station</b></td><td>${police_station}</td></tr>' + 
						'<tr><td><b>Crime Number</b></td><td>${crime_number}</td></tr>' + 
						'<tr><td><b>Registration Number</b></td><td>${registration_number}</td></tr>' +
						'<tr><td><b>Vehicle Type</b></td><td>${vehicle_type}</td></tr>' +
						'<tr><td><b>Registration Date</b></td><td>${registration_date}</td></tr>' +
						'<tr><td><b>Model Number</b></td><td>${model_number}</td></tr>' +
						'<tr><td><b>Longitude (X)</b><td>${longitude}</td></tr>' +
						'<tr><td><b>Latitude (Y)</b></td><td>${latitude}</td></tr>';
					
						template_content += table_content + '</tbody></table>';
						info_template = new esri.InfoTemplate(criteria_value,template_content);
						break;
						
				default:
					info_template = null;
					break;
				}
				return info_template;
			},
			
	}

	/**
	 * add public functions to base
	 */

	global.depHeatMapAnalysisController = heatmap;

})(window, jQuery)