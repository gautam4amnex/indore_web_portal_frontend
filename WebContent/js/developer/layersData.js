(function(global, $) {
	"use stricts;"

	//var department_portal_layer_base_url = window.prefix_layer_url + "iscdl_basemap_v6_10122021/MapServer/";
	//var citizen_portal_layer_base_url    = window.prefix_layer_url + "iscdl_basemap_v6_10122021/MapServer/";
	
	var department_portal_layer_base_url = window.prefix_layer_url + "2d/indore_map_layers/MapServer/";
	var citizen_portal_layer_base_url    = window.prefix_layer_url + "2d/indore_map_layers/MapServer/";
	
	global.department_layer_ids = undefined;
	
	var base = {

		getLayerById : function getLayerById(layer_id) {
			
			let feature_layer_url = "";
			
			feature_layer_url = department_portal_layer_base_url + layer_id;
			
			return feature_layer_url;
		},
		getCitizenPortalLayerById : function(layer_id) {
			
			let feature_layer_url = "";
			
			feature_layer_url = citizen_portal_layer_base_url + layer_id;
			
			return feature_layer_url;
		},
		getDashboardLayerByLayerName : function(layer_name){
			
			let layer_id = undefined;
			
			let layers = window.layers;
			let layer_obj = $.grep(layers, function(l) {
				if(l.layer_name != null){
					if(l.layer_name == layer_name){
						return l.layer_id;	
					}
				}
			});
			
			if(layer_obj.length > 0){
				layer_id = layer_obj[0].layer_id;	
			}
			return layer_id;
		},
		createDynamicLayerList : function(){
			
			$("#accordionExample").html("");
			global.department_layer_ids = [];
			
			let layers = window.layers;
			let html = "";
			if(layers){
				var flags = [], output = [], l = layers.length, i;
				for( i=0; i<l; i++) {
				    //if(layers[i].department_id == 500 || layers[i].department_id == 501 || layers[i].department_id == 1) continue
					if( flags[layers[i].department_id]) continue;
				    flags[layers[i].department_id] = true;
				    global.department_layer_ids.push(layers[i].department_id);	
				    output.push({'department_id':layers[i].department_id,'department_name':layers[i].department_name,
				    	'minimum_scale':layers[i].minScale,'visibility':layers[i].visibility});
				}
				
				output.sort((a, b) => (a.department_name > b.department_name) ? 1 : -1);
				
				window.layerDataController.swap(output, 0, 1);
				
				let name = "";
				
				for(let p = 0 ;p<output.length;p++){
					let element = output[p].department_id;
					let dep_visibility = output[p].visibility;
					
					var found_names = $.grep(layers, function(v) {
					    return v.department_id == element;
					});
					
					if(found_names.length > 0){
						name = found_names[0].department_name;
					}
					
					let icon_url = window.layerDataController.getCitizenPortalDepartmentWiseIcons(name);
					
					let checked = '';
					if(dep_visibility){
						checked = 'checked';
					}else{
						checked = '';
					}
					
				html += "<div class='card full-accordion layers-toggle'>" +
						"<div class='card-header' id='cor_d_t1"+element+"'>" +
						  "<h5 class='mb-0'>" +
							"<button class='btn btn-link accordion-btn' data-toggle='collapse' data-target='#cor_d_c"+element+"' " +
									"aria-expanded='true' aria-controls='cor_d_c"+element+"'>" +
									"<img src='"+icon_url+"' class='depImage' data-placement='right'/>" +
								  "<span title='"+name+"'>"+name+"</span>" +
								  "<i class='fa fa-angle-down float-right'></i>" +
							"</button>" +
						  "</h5>" +
						"</div>" +
						"<div id='cor_d_c"+element+"' class='collapse' aria-labelledby='cor_d_t1"+element+"' data-parent='#accordionExample'>" +
						"<div class='multiselectmain'> <input id="+element+" " +
							"type='checkbox' class='multiselectde'/> Select/Unselect</div>" +
						 "<div class='card-body layers-toggle-body'>";
								  
						let len = found_names.length;
						
						for(let a = 0 ; a < len ; a++){
							let parent_id= found_names[a].department_id;
							let minScale= found_names[a].minScale;
							let name= found_names[a].layer_name;
							let id= found_names[a].layer_id;
							let visibility= found_names[a].visibility;
							
							let checked = '';
							if(visibility){
								checked = 'checked';
							}else{
								checked = '';
							}
							
							let combination = parent_id + "-" + id;
							
							html += "<label class='checkbox-inline' data-placement='right' title='"+name+"'>" +
							  "<input id="+combination+" data-layerid="+id+" data-departmentid="+parent_id+" type='checkbox' class='list-item' value='"+name+"' "+checked+">"+name+" " +
							"</label>" +
							"<i class='fa fa-arrows-alt zoom-to-layer' aria-hidden='true' title='Zoom To Layer' " +
							"depart-id="+parent_id+" id="+id+"></i>";
						}
						html += "</div></div>";
				}
				html += "</div>";
			}
			$("#accordionExample").append(html);
		
		},
		createCitizenPortalDynamicLayerList : function(){
			
			$("#accordionExample").html("");
			global.department_layer_ids = [];
			
			let layers = window.citizenPortalLayers;
			let html = "";
			if(layers){
				var flags = [], output = [], l = layers.length, i;
				for( i=0; i<l; i++) {
					if( flags[layers[i].department_id]) continue;
				    flags[layers[i].department_id] = true;
				    global.department_layer_ids.push(layers[i].department_id);	
				    output.push({'department_id':layers[i].department_id,
				    			 'department_name':layers[i].department_name,
				    			 'visibility':layers[i].visibility});
				    }
				
				output.sort((a, b) => (a.department_name > b.department_name) ? 1 : -1);
				
				window.layerDataController.swap(output, 0, 1);
				
				let name = "";
				
				for(let p = 0 ;p<output.length;p++){
					let element = output[p].department_id;
					let dep_visibility = output[p].visibility;
					
					var found_names = $.grep(layers, function(v) {
					    return v.department_id == element;
					});
					
					if(found_names.length > 0){
						name = found_names[0].department_name;
					}
					
					let icon_url = window.layerDataController.getCitizenPortalDepartmentWiseIcons(name);
					
					let checked = '';
					if(dep_visibility){
						checked = 'checked';
					}else{
						checked = '';
					}
					
				html += "<div class='card full-accordion layers-toggle'>" +
						"<div class='card-header' id='cor_d_t1"+element+"'>" +
						  "<h5 class='mb-0'>" +
							"<button class='btn btn-link accordion-btn' data-toggle='collapse' data-target='#cor_d_c"+element+"' " +
									"aria-expanded='true' aria-controls='cor_d_c"+element+"'>" +
									"<img src='"+icon_url+"' class='depImage' data-placement='right'/>" +
								  "<span title='"+name+"'>"+name+"</span>" +
								  "<i class='fa fa-angle-down float-right'></i>" +
							"</button>" +
						  "</h5>" +
						"</div>" +
						"<div id='cor_d_c"+element+"' class='collapse' aria-labelledby='cor_d_t1"+element+"' data-parent='#accordionExample'>" +
						"<div class='multiselectmain'> <input id="+element+" " +
							"type='checkbox' class='multiselectde'/> Select/Unselect</div>" +
						 "<div class='card-body layers-toggle-body'>";
								  
						let len = found_names.length;
						
						for(let a = 0 ; a < len ; a++){
							let parent_id= found_names[a].department_id;
							let minScale= found_names[a].minScale;
							let name= found_names[a].layer_name;
							let id= found_names[a].layer_id;
							let visibility= found_names[a].visibility;
							
							let checked = '';
							if(visibility){
								checked = 'checked';
							}else{
								checked = '';
							}
							
							let combination = parent_id + "-" + id;
							
							html += "<label class='checkbox-inline' data-placement='right' title='"+name+"'>" +
							  "<input id="+combination+" data-layerid="+id+" data-departmentid="+parent_id+" type='checkbox' class='list-item' value='"+name+"' "+checked+">"+name+" " +
							"</label>" +
							"<i class='fa fa-arrows-alt zoom-to-layer' aria-hidden='true' title='Zoom To Layer' " +
							"depart-id="+parent_id+" id="+id+"></i>";
						}
						html += "</div></div>";
				}
				html += "</div>";
			} 
			$("#accordionExample").append(html);
		
		},
		resetSearchLayersContent : function(){
			let layer_html = "<option value='-1' selected='selected' disabled='disabled'>Select Layer</option>";
			$("#search_layers").html(layer_html).selectpicker('refresh');
		},
		getCitizenPortalDepartmentWiseIcons : function(department_name){
			let icon_base_url = window.iscdl.appData.webURLPrefix + "images/icons/";
			
			switch (department_name) {
			
			case "Indore Municipal Corporation": 
				icon = icon_base_url + "IMC-38.svg";
				break;
			case "City Amenities": 
				icon = icon_base_url + "City_Amenities.svg";
				break;
			case "Town & Country Planning Department": 
				icon = icon_base_url + "Land Record Department-40.svg";
				break;
			case "Environmental": 
				icon = icon_base_url + "Water Supply - Sewerage-08.svg";
				break;
			case "Health Facilities": 
				icon = icon_base_url + "Health-23.svg";
				break;
			case "Industrial Department": 
				icon = icon_base_url + "Industries-24.svg";
				break;
			case "Smart City Project": 
				icon = icon_base_url + "Smar_ City_Project-04.svg";
				break;
			case "AICTSL Department":
				icon = icon_base_url + "AICTSL-35.svg";
				break;
			case "Utilities":
				icon = icon_base_url + "Indore Development Authority-39.svg";
				break;
			case "MP Pollution Control Board":
				icon = icon_base_url + "MPPCB-25.svg";
				break;
			case "Education Department":
				icon = icon_base_url + "Education-22.svg";
				break;
			case "Health Department":
				icon = icon_base_url + "Health-23.svg";
				break;
			case "Indore Development Authority":
				icon = icon_base_url + "Indore Development Authority-39.svg";
				break;
			case "Land Record Department":
				icon = icon_base_url + "Land Record Department-40.svg";
				break;
			case "MP Electricity Department":
				icon = icon_base_url + "Electricity-02.svg";
				break;
			case "PHE Urban":
				icon = icon_base_url + "Public Health Engineering-29.svg";
				break;
			case "Police Department":
				icon = icon_base_url + "Police Department-28.svg";
				break;
			case "Smart City Ground Control Point":
				icon = icon_base_url + "Smart_City_Ground_Control_Point-03.svg";
				break;
			case "Women & Child Welfare Development":
				icon = icon_base_url + "Women & Child Welfare Development Department-33.svg";
				break;
			case "MRTS":
				icon = icon_base_url + "National Highway-21.svg";
				break;
			case "Market":
				icon = icon_base_url + "Market_34.svg";
				break;
			case "Water Bodies":
				icon = icon_base_url + "Water_Bodies_33.svg";
				break;
			default:
				icon = icon_base_url + "MPPCB-25.svg";
				break;
			}
			return icon;
		},
		getDepartmentWiseIcons : function(department_name){
			
			let icon_base_url = window.iscdl.appData.webURLPrefix + "images/icons/";
			
			switch (department_name) {
			case "MP Pollution Control Board":
				icon = icon_base_url + "MPPCB-25.svg";
				break;
			case "Housing Board Department":
				icon = icon_base_url + "Housing Board Department-16.svg";
				break;
			case "Women & Child Welfare Development":
				icon = icon_base_url + "Women & Child Welfare Development Department-33.svg";
				break;
			case "Indore Municipal Corporation":
				icon = icon_base_url + "IMC-38.svg";
				break;
			case "AICTSL Department":
				icon = icon_base_url + "AICTSL-35.svg";
				break;
			case "Public Work Department":
				icon = icon_base_url + "PWD-43.svg";
				break;
			case "Education Department":
				icon = icon_base_url + "Education-22.svg";
				break;
			case "Health Department":
				icon = icon_base_url + "Health-23.svg";
				break;
			case "MP Electricity Department":
				icon = icon_base_url + "Electricity-02.svg";
				break;
			case "NIC Department":
				icon = icon_base_url + "NIC-27.svg";
				break;
			case "PHE Urban":
				icon = icon_base_url + "Public Health Engineering-29.svg";
				break;
			case "Indore Development Authority":
				icon = icon_base_url + "Indore Development Authority-39.svg";
				break;
			case "Industrial Department":
				icon = icon_base_url + "Industries-24.svg";
				break;
			case "Land Record Department":
				icon = icon_base_url + "Land Record Department-40.svg";
				break;
			case "Police Department":
				icon = icon_base_url + "Police Department-28.svg";
				break;
			case "Environment":
				icon = icon_base_url + "Water Supply - Sewerage-08.svg";
				break;
			case "City Amenities":
				icon = icon_base_url + "City_Amenities.svg";
				break;
			case "Town & Country Planning Department":
				icon = icon_base_url + "T & C Planning Department-32.svg";
				break;
			case "Indore Smart City Department":
				icon = icon_base_url + "Smar_ City_Project-04.svg";
				break;
			case "Smart City Ground Control Point":
				icon = icon_base_url + "Smart_City_Ground_Control_Point-03.svg";
				break;
			case "ABD Area Basemap Layers" :
				icon = icon_base_url + "abd_area_basemap_layers.svg";
				break;
			case "Utilities" :
				icon = icon_base_url + "abd_area_utility.svg";
				break;
			case "MRTS": 
				icon = icon_base_url + "National Highway-21.svg";
				break;
			case "Smart City Project": 
				icon = icon_base_url + "Smar_ City_Project-04.svg";
				break;
			default:
				icon = icon_base_url + "MPPCB-25.svg";
				break;
			}
			return icon;
		},
		swap : function swap(input, index_A, index_B) {
		    let temp = input[index_A];

		    input[index_A] = input[index_B];
		    input[index_B] = temp;
		}
	}

	/**
	 * add public functions to base
	 */

	global.layerDataController = base;

})(window, jQuery)