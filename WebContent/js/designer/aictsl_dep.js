var busRoutes_data = "Bus routes";
var busStops_data = "Bus stops";
var busTerminals_data = "Bus terminals";
var current_tab = busRoutes_data;
var table;

function getBusStopsData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_busStop_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: busStops_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_busStop_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getBusTerminalsData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_busTerminal_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: busTerminals_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_busTerminal_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getBusRoutesData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_busRoute_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: busRoutes_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_busRoute_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
}

$(".tab-data").click(function(){
	
	let text = $(this).html();
	//let text = $('.justify-content-center .nav-item > a.active')[0].innerHTML;
	
	if(text == "" || text == undefined || text == null){
		return;
	}
	current_tab = text;
	let department_id = localStorage.getItem('department_id');
	
	if(department_id == null || department_id == undefined || department_id == ""){
		$u.notify('error', 'Notification','Department Id was null', '');
		return;
	}
	
	let dataTable_id;
	if(current_tab === busRoutes_data){
		dataTable_id = 'dep_busRoute_table';
	}else if(current_tab === busStops_data){
		dataTable_id = 'dep_busStop_table';
	}else{
		dataTable_id = 'dep_busTerminal_table';
	}
	if(table != undefined){
		table.destroy();
	}
	$('#'+dataTable_id).empty();
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result, dataTable_id);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
});

function createDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
        columns: options.columns,
		data : options.data,
		"searching": false,
		"autoWidth" : true,
		dom: 'Blfrtip',
		responsive: true,
		buttons: [
			
			{
				extend: 'csvHtml5',	
				text: 'Export to Excel',
               	className: 'btn-indore-table ete' ,
               	filename: current_tab,
               	exportOptions: {
                    columns: 'th:not(:last-child)'
                }
			},
			
        ],
		scrollY: " calc(100vh - 380px) ",
        scrollX: true,
        //scrollCollapse: true,
		columnDefs: options.columnDefs
    } );
}


function approveRejectData(event, value){
	if (confirm("Are you sure to update the status ?")) {
		let row = $(event.currentTarget).data('row');
		let obj = {id: row.id, is_approved: value};
		window.depUtlityController.approveRejectLayerData(obj);
		if(current_tab === busRoutes_data){
			getBusRoutesData();
		}else if(current_tab === busStops_data){
			getBusStopsData();
		}else{
			getBusTerminalsData();
		}
 	}else{
 		 return false;
 	}
}

function updateBusStops(event){
	let row = $(event.currentTarget).data('row');
	
	$('#busStopsUp_busStopsId').val(row.id);
	
	$('#busStopsUp_ward').val(row.data.ward_no);
	$('#busStopsUp_landuseMap').val(row.data.land_use_map);
	$('#busStopsUp_busStops').val(row.data.bus_stops);
	$('#busStopsUp_busTimings').val(row.data.bus_timings);
	$('#busStopsUp_busRouteNumber').val(row.data.bus_route_number);
	$('#busStopsUp_smartTopupCards').val(row.data.smart_top_up_cards);
	$('#busStopsUp_smartBusStopsList').val(row.data.smart_bus_stops_list);
	$('#busStopsUp_arrivalAndDepartureTimings').val(row.data.arrival_and_departure_timings);
	$('#busStopsUp_latitude').val(row.data.latitude);
	$('#busStopsUp_longitude').val(row.data.longitude);
	
	$('#busStopsUp_subLayerId').val(row.sub_layer_id);
}


function updateBusTerminals(event){
	let row = $(event.currentTarget).data('row');
	
	$('#busTerminalsUp_busTerminalsId').val(row.id);
	
	$('#busTerminalsUp_ward').val(row.data.ward_no);
	$('#busTerminalsUp_landuseMap').val(row.data.landuse_map);
	$('#busTerminalsUp_busTerminals').val(row.data.bus_terminals);
	$('#busTerminalsUp_busTimings').val(row.data.bus_timings);
	$('#busTerminalsUp_busRouteNumber').val(row.data.bus_route_number);
	$('#busTerminalsUp_smartTopupCards').val(row.data.smart_top_up_cards);
	$('#busTerminalsUp_smartBusStopsList').val(row.data.smart_bus_stops_list);
	$('#busTerminalsUp_arrivalAndDepartureTimings').val(row.data.arrival_and_departure_timings);
	$('#busTerminalsUp_trafficSquares').val(row.data.traffic_squares);
	$('#busTerminalsUp_latitude').val(row.data.latitude);
	$('#busTerminalsUp_longitude').val(row.data.longitude);
	
	$('#busTerminalsUp_subLayerId').val(row.sub_layer_id);
}

function updateBusRoutes(event){
	let row = $(event.currentTarget).data('row');
	
	$('#busRoutesUp_busRoutesId').val(row.id);
	
	$('#busRoutesUp_ward').val(row.data.ward_no);
	$('#busRoutesUp_aictslAddress').val(row.data.aictsl_address);
	$('#busRoutesUp_contactNo').val(row.data.contact_no);
	$('#busRoutesUp_busTimings').val(row.data.bus_timings);
	$('#busRoutesUp_busRoutes').val(row.data.bus_routes);
	$('#busRoutesUp_busRouteNumber').val(row.data.bus_route_number);
	$('#busRoutesUp_busCategory').val(row.data.bus_category);
	$('#busRoutesUp_liveLocationWithGPS').val(row.data.live_location_with_gps);
	$('#busRoutesUp_smartTopupCards').val(row.data.smart_top_up_cards);
	$('#busRoutesUp_landuseMap').val(row.data.land_use_map);
	$('#busRoutesUp_brts').val(row.data.brts);
	$('#busRoutesUp_brtsCount').val(row.data.btrs_count);
	$('#busRoutesUp_ibusFeeder').val(row.data.ibus_feeder);
	$('#busRoutesUp_periUrban').val(row.data.peri_urban);
	$('#busRoutesUp_atalCityBus').val(row.data.atal_city_bus);
	$('#busRoutesUp_atalBusCount').val(row.data.atal_bus_count);
	$('#busRoutesUp_busServiceType').val(row.data.bus_service_type);
	$('#busRoutesUp_busType').val(row.data.bus_type);
	$('#busRoutesUp_routePlanning').val(row.data.route_planning);
	$('#busRoutesUp_arrivalAndDepartureTimings').val(row.data.arrival_and_departure_timings);
	$('#busRoutesUp_latitude').val(row.data.latitude);
	$('#busRoutesUp_longitude').val(row.data.longitude);

	$('#busRoutesUp_subLayerId').val(row.sub_layer_id);

}


function LoadCurrentReport(result,id) {
	var arr = [];
	for(var i=0;i<result.data.length;i++){
		arr.push(result.data[i].columns.length);
	}
	var max = Math.max(...arr);
	var index = arr.indexOf(max);
	table = createDatatable({
		id : id,
		columns : result.data[index].columns,
		data : result.data,
		columnDefs : [
				{
					"targets": result.data[index].columns.length,
					"data" : "is_approved",
					"title" : "Status",
					"render" : function(data, type, row,meta) {
						if(data === null){
							return '<a href="#" class="status-pending">Pending</a>';
						}else if(data === true){
							return '<a href="#" class="status-active">Approved</a>';
						}else if(data === false){
							return '<a href="#" class="status-deactive">Rejected</a>';
						}
						
					}
				},
				{
					"targets": result.data[index].columns.length + 1,
					"data" : "id",
					"title" : "Action",
					"render" : function(data, type, row, meta) {
						 
						if(row.is_approved === null) {
							return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"'" +
							(current_tab === busStops_data ?
							" data-toggle='modal' data-target='#dep_updateBusStops_modal' " +
							" onclick='updateBusStops(event)'> " 
							:current_tab === busTerminals_data ? 
									" data-toggle='modal' data-target='#dep_updateBusTerminals_modal' " +
									" onclick='updateBusTerminals(event)'> " 
							:" data-toggle='modal' data-target='#dep_updateBusRoutes_modal' " +
							" onclick='updateBusRoutes(event)'> " )+
							"<span class='fa fa-edit' aria-hidden='true'></span> </button>"+
							" <button name='approve' class='btn action-btn' data-row='"+JSON.stringify(row) + "'" +
							" onclick='approveRejectData(event,true)'>"+
							" <span class='fa fa-check' aria-hidden='true'></span> </button>" +
							" <button name='reject' class='btn action-btn' data-row='"+JSON.stringify(row) + "'" +
							" onclick='approveRejectData(event,false)'>"+
							" <span class='fa fa-remove' aria-hidden='true'></span> </button>";
						}
						else{
							return "NA";
						}
					}
					
				}
			]
			
	})
	

}


$(document).ready(function(){	
	
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
  $(".datepicker-dept").datepicker({ 
        autoclose: true, 
        todayHighlight: true
  }).datepicker('update', new Date());	
  
  
	/*Multi step start*/
	var current_fs, next_fs, previous_fs; //fieldsets
	var opacity;

	$(".next").click(function(){

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		//Add Class Active
		$("#progressbar li").eq($("fieldset").index(current_fs)).addClass("active");
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("activemain");

		//show the next fieldset
		next_fs.show();
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
		step: function(now) {
		// for making fielset appear animation
		opacity = 1 - now;

		current_fs.css({
		'display': 'none',
		'position': 'relative'
		});
		next_fs.css({'opacity': opacity});
		},
		duration: 600
		});
	});

	$(".previous").click(function(){

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//Remove class active
	$("#progressbar li").eq($("fieldset").index(previous_fs)).removeClass("active");
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("activemain");
	
	//show the previous fieldset
	previous_fs.show();

	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
	step: function(now) {
	// for making fielset appear animation
	opacity = 1 - now;

	current_fs.css({
	'display': 'none',
	'position': 'relative'
	});
	previous_fs.css({'opacity': opacity});
	},
	duration: 600
	});
	});

	$('.radio-group .radio').click(function(){
	$(this).parent().find('.radio').removeClass('selected');
	$(this).addClass('selected');
	});

	$(".submit").click(function(){
	return false;
	})
	
	/*$("#finalSubmit").click(function(){
		let value = $("#EmailIDMain").val();
		let value1 = $("#EmailIDMain1").val();
		let value2 = $("#EmailIDMain2").val();
		alert("Form Value" + value + '1' + value1 + 'gdg'  + value2);
	})*/
	


	/*Multi step end*/
	
});
	
$(window).on("load", function(){

	$(".loader").fadeOut(1000);
	window.depUtlityController.headerDrop();
	
	window.depUtlityController.getLayers('add_data_category');
	
	window.depUtlityController.getWardList('busRoutes_ward');
	window.depUtlityController.getWardList('busRoutesUp_ward');
	
	window.depUtlityController.getWardList('busStops_ward');
	window.depUtlityController.getWardList('busStopsUp_ward');
	
	window.depUtlityController.getWardList('busTerminals_ward');
	window.depUtlityController.getWardList('busTerminalsUp_ward');
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_busRoute_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
	
	$('form[id="form_addBusStops"]')
	.validate(
			{
				rules : {
					busStops_latitude : "required",
					busStops_longitude : "required",
				},
				messages : {
					busStops_latitude : {
						required : "Please Enter Latitude"
					},
					busStops_longitude : {
						required : "Please Enter Longitude"
					},
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						

						let ward_no = $('#busStops_ward').val();
						let land_use_map = $('#busStops_landuseMap').val();
						let bus_stops = $('#busStops_busStops').val();
						let bus_timings = $('#busStops_busTimings').val();
						let bus_route_number = $('#busStops_busRouteNumber').val();
						let smart_top_up_cards = $('#busStops_smartTopupCards').val();
						let smart_bus_stops_list = $('#busStops_smartBusStopsList').val();
						let arrival_and_departure_timings = $('#busStops_arrivalAndDepartureTimings').val();
						let latitude = $('#busStops_latitude').val();
						let longitude = $('#busStops_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === busStops_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,land_use_map:land_use_map
								,bus_stops:bus_stops,bus_timings:bus_timings
								,bus_route_number:bus_route_number
								,smart_top_up_cards:smart_top_up_cards
								,smart_bus_stops_list:smart_bus_stops_list
								,arrival_and_departure_timings:arrival_and_departure_timings
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_addBusStops").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.busStops_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.busStops_longitude = "Please enter Longitude";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateBusStops"]')
	.validate(
			{
				rules : {
					busStopsUp_latitude : "required",
					busStopsUp_longitude : "required",
				},
				messages : {
					busStopsUp_latitude : {
						required : "Please Enter Latitude"
					},
					busStopsUp_longitude : {
						required : "Please Enter Longitude"
					},
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = $('#busStopsUp_busStopsId').val();
						
						let ward_no = $('#busStopsUp_ward').val();
						let land_use_map = $('#busStopsUp_landuseMap').val();
						let bus_stops = $('#busStopsUp_busStops').val();
						let bus_timings = $('#busStopsUp_busTimings').val();
						let bus_route_number = $('#busStopsUp_busRouteNumber').val();
						let smart_top_up_cards = $('#busStopsUp_smartTopupCards').val();
						let smart_bus_stops_list = $('#busStopsUp_smartBusStopsList').val();
						let arrival_and_departure_timings = $('#busStopsUp_arrivalAndDepartureTimings').val();
						let latitude = $('#busStopsUp_latitude').val();
						let longitude = $('#busStopsUp_longitude').val();
						
						let sub_layer_id = $('#busStopsUp_subLayerId').val();
						
						let data = {ward_no:ward_no,land_use_map:land_use_map
								,bus_stops:bus_stops,bus_timings:bus_timings
								,bus_route_number:bus_route_number
								,smart_top_up_cards:smart_top_up_cards
								,smart_bus_stops_list:smart_bus_stops_list
								,arrival_and_departure_timings:arrival_and_departure_timings
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_updateBusStops").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.busStopsUp_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.busStopsUp_longitude = "Please enter Longitude";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						getBusStopsData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_addBusTerminals"]')
	.validate(
			{
				rules : {
					busTerminals_latitude : "required",
					busTerminals_longitude : "required",
				},
				messages : {
					busTerminals_latitude : {
						required : "Please Enter Latitude"
					},
					busTerminals_longitude : {
						required : "Please Enter Longitude"
					},	
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_no = $('#busTerminals_ward').val();
						let landuse_map = $('#busTerminals_landuseMap').val();
						let bus_terminals = $('#busTerminals_busTerminals').val();
						let bus_timings = $('#busTerminals_busTimings').val();
						let bus_route_number = $('#busTerminals_busRouteNumber').val();
						let smart_top_up_cards = $('#busTerminals_smartTopupCards').val();
						let smart_bus_stops_list = $('#busTerminals_smartBusStopsList').val();
						let arrival_and_departure_timings = $('#busTerminals_arrivalAndDepartureTimings').val();
						let traffic_squares = $('#busTerminals_trafficSquares').val();
						let latitude = $('#busTerminals_latitude').val();
						let longitude = $('#busTerminals_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === busTerminals_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,landuse_map:landuse_map
								,bus_terminals:bus_terminals,bus_timings:bus_timings
								,bus_route_number:bus_route_number
								,smart_top_up_cards:smart_top_up_cards
								,smart_bus_stops_list:smart_bus_stops_list
								,arrival_and_departure_timings:arrival_and_departure_timings
								,traffic_squares:traffic_squares
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_addBusTerminals").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.busTerminals_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.busTerminals_longitude = "Please enter Longitude";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						getBusTerminalsData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateBusTerminals"]')
	.validate(
			{
				rules : {
					busTerminalsUp_latitude : "required",
					busTerminalsUp_longitude : "required",
				},
				messages : {
					busTerminalsUp_latitude : {
						required : "Please Enter Latitude"
					},
					busTerminalsUp_longitude : {
						required : "Please Enter Longitude"
					},	
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = $('#busTerminalsUp_busTerminalsId').val();
						
						let ward_no = $('#busTerminalsUp_ward').val();
						let landuse_map = $('#busTerminalsUp_landuseMap').val();
						let bus_terminals = $('#busTerminalsUp_busTerminals').val();
						let bus_timings = $('#busTerminalsUp_busTimings').val();
						let bus_route_number = $('#busTerminalsUp_busRouteNumber').val();
						let smart_top_up_cards = $('#busTerminalsUp_smartTopupCards').val();
						let smart_bus_stops_list = $('#busTerminalsUp_smartBusStopsList').val();
						let arrival_and_departure_timings = $('#busTerminalsUp_arrivalAndDepartureTimings').val();
						let traffic_squares = $('#busTerminalsUp_trafficSquares').val();
						let latitude = $('#busTerminalsUp_latitude').val();
						let longitude = $('#busTerminalsUp_longitude').val();
						
						let sub_layer_id = $('#busTerminalsUp_subLayerId').val();
						
						let data = {ward_no:ward_no,landuse_map:landuse_map
								,bus_terminals:bus_terminals,bus_timings:bus_timings
								,bus_route_number:bus_route_number
								,smart_top_up_cards:smart_top_up_cards
								,smart_bus_stops_list:smart_bus_stops_list
								,arrival_and_departure_timings:arrival_and_departure_timings
								,traffic_squares:traffic_squares
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_updateBusTerminals").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.busTerminalsUp_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.busTerminalsUp_longitude = "Please enter Longitude";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						getBusTerminalsData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	

	$('form[id="form_addBusRoutes"]')
	.validate(
			{
				rules : {
					busRoutes_latitude : "required",
					busRoutes_longitude : "required",
					busRoutes_aictslAddress :"required",
				},
				messages : {
					busRoutes_latitude : {
						required : "Please Enter Latitude"
					},
					busRoutes_longitude : {
						required : "Please Enter Longitude"
					},
					busRoutes_aictslAddress : {
						required : "Please Enter Address"
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_no = $('#busRoutes_ward').val();
						let aictsl_address = $('#busRoutes_aictslAddress').val();
						let contact_no = $('#busRoutes_contactNo').val();
						let bus_timings = $('#busRoutes_busTimings').val();
						let bus_routes = $('#busRoutes_busRoutes').val();
						let bus_route_number = $('#busRoutes_busRouteNumber').val();
						let bus_category = $('#busRoutes_busCategory').val();
						let live_location_with_gps = $('#busRoutes_liveLocationWithGPS').val();
						let smart_top_up_cards = $('#busRoutes_smartTopupCards').val();
						let land_use_map = $('#busRoutes_landuseMap').val();
						let brts = $('#busRoutes_brts').val();
						let btrs_count = $('#busRoutes_brtsCount').val();
						let ibus_feeder = $('#busRoutes_ibusFeeder').val();
						let peri_urban = $('#busRoutes_periUrban').val();
						let atal_city_bus = $('#busRoutes_atalCityBus').val();
						let atal_bus_count = $('#busRoutes_atalBusCount').val();
						let bus_service_type = $('#busRoutes_busServiceType').val();
						let bus_type = $('#busRoutes_busType').val();
						let route_planning = $('#busRoutes_routePlanning').val();
						let arrival_and_departure_timings = $('#busRoutes_arrivalAndDepartureTimings').val();
						let latitude = $('#busRoutes_latitude').val();
						let longitude = $('#busRoutes_longitude').val();
						
						let sub_layer_id = $('#busRoutes_subLayerId').val();
						
						let data = {ward_no:ward_no,aictsl_address:aictsl_address
								,contact_no:contact_no,bus_timings:bus_timings
								,bus_routes:bus_routes,bus_route_number:bus_route_number
								,bus_category:bus_category
								,live_location_with_gps:live_location_with_gps
								,smart_top_up_cards:smart_top_up_cards
								,land_use_map:land_use_map
								,brts:brts,btrs_count:btrs_count
								,ibus_feeder:ibus_feeder,peri_urban:peri_urban
								,atal_city_bus:atal_city_bus,atal_bus_count:atal_bus_count
								,bus_service_type:bus_service_type
								,bus_type:bus_type,route_planning:route_planning
								,arrival_and_departure_timings:arrival_and_departure_timings
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_addBusRoutes").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.busRoutes_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.busRoutes_longitude = "Please enter Longitude";
						}
						if(!aictsl_address || aictsl_address === null || aictsl_address === ""){
							errorObj.busRoutes_aictslAddress="Please enter Address";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateBusRoutes"]')
	.validate(
			{
				rules : {
					busRoutesUp_latitude : "required",
					busRoutesUp_longitude : "required",
					busRoutesUp_aictslAddress :"required",
				},
				messages : {
					busRoutesUp_latitude : {
						required : "Please Enter Latitude"
					},
					busRoutesUp_longitude : {
						required : "Please Enter Longitude"
					},
					busRoutesUp_aictslAddress : {
						required : "Please Enter Address"
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#busRoutesUp_busRoutesId').val();
						
						let ward_no = $('#busRoutesUp_ward').val();
						let aictsl_address = $('#busRoutesUp_aictslAddress').val();
						let contact_no = $('#busRoutesUp_contactNo').val();
						let bus_timings = $('#busRoutesUp_busTimings').val();
						let bus_routes = $('#busRoutesUp_busRoutes').val();
						let bus_route_number = $('#busRoutesUp_busRouteNumber').val();
						let bus_category = $('#busRoutesUp_busCategory').val();
						let live_location_with_gps = $('#busRoutesUp_liveLocationWithGPS').val();
						let smart_top_up_cards = $('#busRoutesUp_smartTopupCards').val();
						let land_use_map = $('#busRoutesUp_landuseMap').val();
						let brts = $('#busRoutesUp_brts').val();
						let btrs_count = $('#busRoutesUp_brtsCount').val();
						let ibus_feeder = $('#busRoutesUp_ibusFeeder').val();
						let peri_urban = $('#busRoutesUp_periUrban').val();
						let atal_city_bus = $('#busRoutesUp_atalCityBus').val();
						let atal_bus_count = $('#busRoutesUp_atalBusCount').val();
						let bus_service_type = $('#busRoutesUp_busServiceType').val();
						let bus_type = $('#busRoutesUp_busType').val();
						let route_planning = $('#busRoutesUp_routePlanning').val();
						let arrival_and_departure_timings = $('#busRoutesUp_arrivalAndDepartureTimings').val();
						let latitude = $('#busRoutesUp_latitude').val();
						let longitude = $('#busRoutesUp_longitude').val();
						
						let sub_layer_id = $('#busRoutesUp_subLayerId').val();
						
						let data = {ward_no:ward_no,aictsl_address:aictsl_address
								,contact_no:contact_no,bus_timings:bus_timings
								,bus_routes:bus_routes,bus_route_number:bus_route_number
								,bus_category:bus_category
								,live_location_with_gps:live_location_with_gps
								,smart_top_up_cards:smart_top_up_cards
								,land_use_map:land_use_map
								,brts:brts,btrs_count:btrs_count
								,ibus_feeder:ibus_feeder,peri_urban:peri_urban
								,atal_city_bus:atal_city_bus,atal_bus_count:atal_bus_count
								,bus_service_type:bus_service_type
								,bus_type:bus_type,route_planning:route_planning
								,arrival_and_departure_timings:arrival_and_departure_timings
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_addBusRoutes").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.busRoutesUp_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.busRoutesUp_longitude = "Please enter Longitude";
						}
						if(!aictsl_address || aictsl_address === null || aictsl_address === ""){
							errorObj.busRoutesUp_aictslAddress="Please enter Address";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
});
function resetForm(formId){
	$('#'+formId).trigger('reset');
	window.depUtlityController.removeError(formId);
}


$(window).on('load resize', function () {
});	