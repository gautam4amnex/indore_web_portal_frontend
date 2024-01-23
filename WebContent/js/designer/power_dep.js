var electricPole_data = "Electric pole";
var streetLight_data = "Street light";
var transformers_data = "Transformers";
var current_tab = electricPole_data;
var table;

function getElectricPoleData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_electricPole_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: electricPole_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_electricPole_table');
	setTimeout(function(){ 
		$('.dataTables_wrapper').resize();
	}, 500);
}

function getStreetLightData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_streetLight_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: streetLight_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_streetLight_table');
	setTimeout(function(){ 
		$('.dataTables_wrapper').resize();
	}, 500);
}

function getTransformersData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_transformers_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: transformers_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_transformers_table');
	setTimeout(function(){ 
		$('.dataTables_wrapper').resize();
	}, 500);
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
	if(current_tab === electricPole_data){
		dataTable_id = 'dep_electricPole_table';
	}else if(current_tab === streetLight_data){
		dataTable_id = 'dep_streetLight_table';
	}else{
		dataTable_id = 'dep_transformers_table';
	}
	if(table != undefined){
		table.destroy();
	}
	$('#'+dataTable_id).empty();
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result, dataTable_id);
	
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
		if(current_tab === electricPole_data){
			getElectricPoleData();
		}else if(current_tab === streetLight_data){
			getStreetLightData();
		}else{
			getTransformersData();
		}
 	}else{
 		 return false;
 	}
}

function updateElectricPole(event){
	let row = $(event.currentTarget).data('row');
	
	$('#electricPoleUp_electricPoleId').val(row.id);
		
	$('#electricPoleUp_ward').val(row.data.ward_no);
	$('#electricPoleUp_paintCode').val(row.data.paint_code);
	$('#electricPoleUp_heightInMeters').val(row.data.height_in_meters);
	$('#electricPoleUp_type').val(row.data.electric_pole_type);
	$('#electricPoleUp_LastMaintenance').val(row.data.last_maintenance);
	$('#electricPoleUp_inProgress').val(row.data.in_progress);
	$('#electricPoleUp_latitude').val(row.data.latitude);
	$('#electricPoleUp_longitude').val(row.data.longitude);
	
	$('#electricPoleUp_subLayerId').val(row.sub_layer_id);
	
}

function updateStreetLight(event){
	let row = $(event.currentTarget).data('row');
	
	 $('#streetLightUp_streetLightId').val(row.id);
		
	 $('#streetLightUp_ward').val(row.data.ward_no);
	 $('#streetLightUp_stid').val(row.data.street_light_id);
	 $('#streetLightUp_heightInMeters').val(row.data.height_in_meters);
	 $('#streetLightUp_type').val(row.data.street_light_type);
	 $('#streetLightUp_category').val(row.data.category);
	 $('#streetLightUp_watts').val(row.data.watt_s);
	 $('#streetLightUp_lastMaintenance').val(row.data.last_maintenance);
	 $('#streetLightUp_automaticOnOff').val(row.data.automatic_on_off);
	 $('#streetLightUp_latitude').val(row.data.latitude);
	 $('#streetLightUp_longitude').val(row.data.longitude);
	
	 $('#streetLightUp_subLayerId').val(row.sub_layer_id);
}

function updateTransformers(event){
	let row = $(event.currentTarget).data('row');
	
	$('#transformerUp_transformerId').val(row.id);
	
	$('#transformerUp_ward').val(row.data.ward_no);
	$('#transformerUp_tid').val(row.data.transformer_id);
	$('#transformerUp_watts').val(row.data.volts_in_watt_s);
	$('#transformerUp_type').val(row.data.transformer_type);
	$('#transformerUp_lastMaintenance').val(row.data.last_maintenance);
	$('#transformerUp_subStationName').val(row.data.sub_station_name);
	$('#transformerUp_subEngineer').val(row.data.sub_engineer_electrical_);
	$('#transformerUp_lineOperatorName').val(row.data.line_operators_name);
	$('#transformerUp_phoneNo').val(row.data.phone_no);
	$('#transformerUp_latitude').val(row.data.latitude);
	$('#transformerUp_longitude').val(row.data.longitude);
	
	$('#transformerUp_subLayerId').val(row.sub_layer_id);
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
							(current_tab === electricPole_data ?
									" data-toggle='modal' data-target='#dep_updateelectricpole_modal' " +
									" onclick='updateElectricPole(event)'> " 
							: current_tab === streetLight_data ? 
									" data-toggle='modal' data-target='#dep_updatestreetlight_modal' " +
									" onclick='updateStreetLight(event)'> " 
							: 	" data-toggle='modal' data-target='#dep_updatetransformer_modal' " +
								" onclick='updateTransformers(event)'> " )+
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
	
	window.depUtlityController.getWardList('electricPole_ward');
	window.depUtlityController.getWardList('electricPoleUp_ward');
	
	window.depUtlityController.getWardList('streetLight_ward');
	window.depUtlityController.getWardList('streetLightUp_ward');
	
	window.depUtlityController.getWardList('transformer_ward');
	window.depUtlityController.getWardList('transformerUp_ward');
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_electricPole_table');
	
	
	$('form[id="form_addElectricPole"]')
	.validate(
			{
				rules : {
					
					electricPole_latitude : "required",
					electricPole_longitude : "required",
					
				},
				 messages : {
					 electricPole_latitude : {
							required : "Please Enter Latitude"
						},
						electricPole_longitude : {
							required : "Please Enter Longitude"
						},
						
					},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#electricPole_ward').val();
						let paint_code = $('#electricPole_paintCode').val();
						let height_in_meters = $('#electricPole_heightInMeters').val();
						let electric_pole_type = $('#electricPole_type').val();
						let last_maintenance = $('#electricPole_LastMaintenance').val();
						let in_progress = $('#electricPole_inProgress').val();
						let latitude = $('#electricPole_latitude').val();
						let longitude = $('#electricPole_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === electricPole_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,paint_code:paint_code
								,height_in_meters:height_in_meters
								,electric_pole_type:electric_pole_type
								,last_maintenance:last_maintenance
								,in_progress:in_progress
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
						var validator = $("#form_addElectricPole").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.electricPole_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.electricPole_longitude = "Please enter Longitude";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						getElectricPoleData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	

	$('form[id="form_updateElectricPole"]')
	.validate(
			{
					rules : {
					
					electricPoleUp_latitude : "required",
					electricPoleUp_longitude : "required",
					
				},
				 messages : {
					    electricPoleUp_latitude : {
							required : "Please Enter Latitude"
						},
						electricPoleUp_longitude : {
							required : "Please Enter Longitude"
						},
						
					},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#electricPoleUp_electricPoleId').val();
						
						let ward_no = $('#electricPoleUp_ward').val();
						let paint_code = $('#electricPoleUp_paintCode').val();
						let height_in_meters = $('#electricPoleUp_heightInMeters').val();
						let electric_pole_type = $('#electricPoleUp_type').val();
						let last_maintenance = $('#electricPoleUp_LastMaintenance').val();
						let in_progress = $('#electricPoleUp_inProgress').val();
						let latitude = $('#electricPoleUp_latitude').val();
						let longitude = $('#electricPoleUp_longitude').val();
						
						let sub_layer_id = $('#electricPoleUp_subLayerId').val();
						
						let data = {ward_no:ward_no,paint_code:paint_code
								,height_in_meters:height_in_meters
								,electric_pole_type:electric_pole_type
								,last_maintenance:last_maintenance
								,in_progress:in_progress
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id: layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_updateElectricPole").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.electricPoleUp_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.electricPoleUp_longitude = "Please enter Longitude";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						getElectricPoleData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
	$('form[id="form_addStreetLight"]')
	.validate(
			{
				rules : {
					streetLight_latitude : "required",
					streetLight_longitude : "required",
					
				},
				messages : {
					streetLight_latitude : {
						required : "Please Enter Latitude"
					},
					streetLight_longitude : {
						required : "Please Enter Longitude"
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#streetLight_ward').val();
						let street_light_id = $('#streetLight_stid').val();
						let height_in_meters = $('#streetLight_heightInMeters').val();
						let street_light_type = $('#streetLight_type').val();
						let category = $('#streetLight_category').val();
						let watt_s = $('#streetLight_watts').val();
						let last_maintenance = $('#streetLight_lastMaintenance').val();
						let automatic_on_off = $('#streetLight_automaticOnOff').val();
						let latitude = $('#streetLight_latitude').val();
						let longitude = $('#streetLight_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === streetLight_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,street_light_id:street_light_id
								,height_in_meters:height_in_meters
								,street_light_type:street_light_type
								,category:category,watt_s:watt_s
								,last_maintenance:last_maintenance
								,automatic_on_off:automatic_on_off
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
						
						var validator = $("#form_addStreetLight").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.streetLight_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.streetLight_longitude = "Please enter Longitude";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						getStreetLightData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateStreetLight"]')
	.validate(
			{
				rules : {

					streetLightUp_latitude : "required",
					streetLightUp_longitude : "required",
					
				},
				messages : {
					streetLightUp_latitude : {
						required : "Please Enter Latitude"
					},
					streetLightUp_longitude : {
						required : "Please Enter Longitude"
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let layer_id = $('#streetLightUp_streetLightId').val();
						
						let ward_no = $('#streetLightUp_ward').val();
						let street_light_id = $('#streetLightUp_stid').val();
						let height_in_meters = $('#streetLightUp_heightInMeters').val();
						let street_light_type = $('#streetLightUp_type').val();
						let category = $('#streetLightUp_category').val();
						let watt_s = $('#streetLightUp_watts').val();
						let last_maintenance = $('#streetLightUp_lastMaintenance').val();
						let automatic_on_off = $('#streetLightUp_automaticOnOff').val();
						let latitude = $('#streetLightUp_latitude').val();
						let longitude = $('#streetLightUp_longitude').val();
						
						let sub_layer_id = $('#streetLightUp_subLayerId').val();
						
						let data = {ward_no:ward_no,street_light_id:street_light_id
								,height_in_meters:height_in_meters
								,street_light_type:street_light_type
								,category:category,watt_s:watt_s
								,last_maintenance:last_maintenance
								,automatic_on_off:automatic_on_off
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
						var validator = $("#form_updateStreetLight").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.streetLightUp_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.streetLightUp_longitude = "Please enter Longitude";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj);
						getStreetLightData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
	$('form[id="form_addTransformers"]')
	.validate(
			{
				rules : {
					transformer_latitude : "required",
					transformer_longitude : "required",
					
				}, messages : {
					transformer_latitude : {
						required : "Please Enter Latitude"
					},
					transformer_longitude : {
						required : "Please Enter Longitude"
					},
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_no = $('#transformer_ward').val();
						let transformer_id = $('#transformer_tid').val();
						let volts_in_watt_s = $('#transformer_watts').val();
						let transformer_type = $('#transformer_type').val();
						let last_maintenance = $('#transformer_lastMaintenance').val();
						let sub_station_name = $('#transformer_subStationName').val();
						let sub_engineer_electrical_ = $('#transformer_subEngineer').val();
						let line_operators_name = $('#transformer_lineOperatorName').val();
						let phone_no = $('#transformer_phoneNo').val();
						let latitude = $('#transformer_latitude').val();
						let longitude = $('#transformer_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === transformers_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,transformer_id:transformer_id
								,volts_in_watt_s:volts_in_watt_s,transformer_type:transformer_type
								,last_maintenance:last_maintenance
								,sub_station_name:sub_station_name
								,sub_engineer_electrical_:sub_engineer_electrical_
								,line_operators_name:line_operators_name
								,phone_no:phone_no,latitude:latitude,longitude:longitude};
						
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
						var validator = $("#form_addTransformers").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.transformer_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.transformer_longitude = "Please enter Longitude";
						}
						
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						getTransformersData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateTransformers"]')
	.validate(
			{
				rules : {
					transformerUp_latitude : "required",
					transformerUp_longitude : "required",
					
				}, messages : {
					transformerUp_latitude : {
						required : "Please Enter Latitude"
					},
					transformerUp_longitude : {
						required : "Please Enter Longitude"
					},
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#transformerUp_transformerId').val();
						
						let ward_no = $('#transformerUp_ward').val();
						let transformer_id = $('#transformerUp_tid').val();
						let volts_in_watt_s = $('#transformerUp_watts').val();
						let transformer_type = $('#transformerUp_type').val();
						let last_maintenance = $('#transformerUp_lastMaintenance').val();
						let sub_station_name = $('#transformerUp_subStationName').val();
						let sub_engineer_electrical_ = $('#transformerUp_subEngineer').val();
						let line_operators_name = $('#transformerUp_lineOperatorName').val();
						let phone_no = $('#transformerUp_phoneNo').val();
						let latitude = $('#transformerUp_latitude').val();
						let longitude = $('#transformerUp_longitude').val();
						
						let sub_layer_id = $('#transformerUp_subLayerId').val();
						
						let data = {ward_no:ward_no,transformer_id:transformer_id
								,volts_in_watt_s:volts_in_watt_s,transformer_type:transformer_type
								,last_maintenance:last_maintenance
								,sub_station_name:sub_station_name
								,sub_engineer_electrical_:sub_engineer_electrical_
								,line_operators_name:line_operators_name
								,phone_no:phone_no,latitude:latitude,longitude:longitude};
						
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
						var validator = $("#form_updateTransformers").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.transformerUp_latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.transformerUp_longitude = "Please enter Longitude";
						}
						
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj);
						getTransformersData();
						
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