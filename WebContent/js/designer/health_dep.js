var hospital_data = "Hospital";
var upchc_data = "UPHC";
var current_tab = hospital_data;
var table;

function getHospitalData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_hospital_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: hospital_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_hospital_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getUphcData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_uphc_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: upchc_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_uphc_table');
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
	if(current_tab === 'Hospital'){
		dataTable_id = 'dep_hospital_table';
	}else{
		dataTable_id = 'dep_uphc_table';
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
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
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
		if(current_tab === hospital_data){
			getHospitalData();
		}else{
			getUphcData();
		}
 	}else{
 		 return false;
 	}
}

function updateHospital(event){
	let row = $(event.currentTarget).data('row');
	
	$('#hospitalUp_hospitalId').val(row.id);
	
	$('#hospitalUp_ward').val(row.data.ward_no);
	$('#hospitalUp_name').val(row.data.hospital_name);
	$('#hospitalUp_address').val(row.data.address);
	$('#hospitalUp_type').val(row.data.type_of_hospital);
	$('#hospitalUp_category').val(row.data.hospital_category);
	$('#hospitalUp_ownershipType').val(row.data.ownership_type);
	$('#hospitalUp_emergencyService').val(row.data.emergency_service_24_hours_open_108_facility);
	$('#hospitalUp_emergencyContactno').val(row.data.emergency_service_contact_number);
	$('#hospitalUp_noOfIcu').val(row.data.no_of_icu);
	$('#hospitalUp_builtUpArea').val(row.data.built_up_area);
	$('#hospitalUp_wardInfo').val(row.data.hospital_blocks_or_wards);
	$('#hospitalUp_hodName').val(row.data.hod_name);
	$('#hospitalUp_bedCount').val(row.data.bed_count);
	$('#hospitalUp_area').val(row.data.hospital_area);
	$('#hospitalUp_bloodBankFacility').val(row.data.blood_bank_facility);
	$('#hospitalUp_mortuary').val(row.data.mortuary);
	$('#hospitalUp_recognizedBy').val(row.data.recognized_by);
	$('#hospitalUp_remarks').val(row.data.remarks);
	$('#hospitalUp_roadConnectivity').val(row.data.condition_of_road_connectivity_to_hospital);
	$('#hospitalUp_policeStationNo').val(row.data.police_station_number);
	$('#hospitalUp_latitude').val(row.data.latitude);
	$('#hospitalUp_longitude').val(row.data.longitude);

	$('#hospitalUp_subLayerId').val(row.sub_layer_id);
}


function updateUphc(event){
	let row = $(event.currentTarget).data('row');
	$('#uphcUp_uphcId').val(row.id);
	
	$('#uphcUp_ward').val(row.data.ward_no);
	$('#uphcUp_name').val(row.data.uphc_name);
	$('#uphcUp_address').val(row.data.address);
	$('#uphcUp_supervisorName').val(row.data.supervisor_name);
	$('#uphcUp_medicalOfficer').val(row.data.medical_officer);
	$('#uphcUp_medicalOfficerNo').val(row.data.medical_officer_no);
	$('#uphcUp_slumPopulation').val(row.data.slum_population);
	$('#uphcUp_wardWisePopulation').val(row.data.ward_wise_population);
	$('#uphcUp_totalPopulation').val(row.data.total_population);
	$('#uphcUp_supervisorNo').val(row.data.supervisor_no);
	$('#uphcUp_latitude').val(row.data.latitude);
	$('#uphcUp_longitude').val(row.data.longitude);
	
	$('#uphcUp_subLayerId').val(row.sub_layer_id);
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
							(current_tab ===hospital_data ?
							" data-toggle='modal' data-target='#dep_updatehospital_modal' " +
							" onclick='updateHospital(event)'> " 
							:" data-toggle='modal' data-target='#dep_updateuphcUp_modal' " +
							" onclick='updateUphc(event)'> " )+
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
	window.depUtlityController.getWardList('hospital_ward');
	window.depUtlityController.getWardList('hospitalUp_ward');
	window.depUtlityController.getWardList('uphc_ward');
	window.depUtlityController.getWardList('uphcUp_ward');
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_hospital_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
	
	$('form[id="form_depAddHospital"]')
	.validate(
			{
				rules : {
					hospital_name : "required",
					hospital_latitude : "required",
					hospital_longitude : "required",
					hospital_address : "required",
					hospital_roadConnectivity : "required",
					hospital_geoTaggedPhoto : "required"
				},
				messages : {
					hospital_name : {
						required : "Please Enter Hospital Name"
					},
					hospital_latitude : {
						required : "Please Enter Latitude"
					},
					hospital_longitude : {
						required : "Please enter Longitude"
					},
					hospital_address : {
						required : "Please Enter Hospital Address"
					},
					hospital_roadConnectivity : {
						required : "Please Enter Hospital Road Connectivity"
					},
					hospital_geoTaggedPhoto : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#hospital_ward').val();
						let hospital_name = $('#hospital_name').val();
						let address = $('#hospital_address').val();
						let type_of_hospital = $('#hospital_type').val();
						let hospital_category = $('#hospital_category').val();
						let ownership_type = $('#hospital_ownershipType').val();
						let emergency_service_24_hours_open_108_facility = $('#hospital_emergencyService').val();
						let emergency_service_contact_number = $('#hospital_emergencyContactno').val();
						let no_of_icu = $('#hospital_noOfIcu').val();
						let built_up_area = $('#hospital_builtUpArea').val();
						let hospital_blocks_or_wards = $('#hospital_wardInfo').val();
						let hod_name = $('#hospital_hodName').val();
						let bed_count = $('#hospital_bedCount').val();
						let hospital_area = $('#hospital_area').val();
						let blood_bank_facility = $('#hospital_bloodBankFacility').val();
						let mortuary = $('#hospital_mortuary').val();
						let recognized_by = $('#hospital_recognizedBy').val();
						let remarks = $('#hospital_remarks').val();
						let condition_of_road_connectivity_to_hospital = $('#hospital_roadConnectivity').val();
						let police_station_number = $('#hospital_policeStationNo').val();
						let latitude = $('#hospital_latitude').val();
						let longitude = $('#hospital_longitude').val();

						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === 'Hospital'){
								return e;
							}
						});
						let data = {ward_no:ward_no,hospital_name:hospital_name
								,address:address,type_of_hospital:type_of_hospital,hospital_category:hospital_category
								,ownership_type:ownership_type
								,emergency_service_24_hours_open_108_facility:emergency_service_24_hours_open_108_facility
								,emergency_service_contact_number:emergency_service_contact_number
								,no_of_icu:no_of_icu,built_up_area:built_up_area,
								hospital_blocks_or_wards:hospital_blocks_or_wards
								,hod_name:hod_name,bed_count:bed_count,hospital_area:hospital_area
								,blood_bank_facility:blood_bank_facility,mortuary:mortuary,recognized_by:recognized_by
								,remarks:remarks,condition_of_road_connectivity_to_hospital:condition_of_road_connectivity_to_hospital
								,police_station_number:police_station_number,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#hospital_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#hospital_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#hospital_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_depAddHospital").validate();
						let errorObj = {};
						if(!hospital_name || hospital_name === null || hospital_name === ""){
							errorObj.hospital_name = "Please enter Hospital Name";
						}
						if(!latitude || latitude === null){
							errorObj.hospital_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.hospital_longitude = "Please enter Longitude";
						}
						if(!address || address === null || address === ""){
							errorObj.hospital_address = "Please enter Hospital Address";
						}
						if(!condition_of_road_connectivity_to_hospital || condition_of_road_connectivity_to_hospital === null || condition_of_road_connectivity_to_hospital === ""){
							errorObj.hospital_roadConnectivity =  "Please enter Hospital Road Connectivity";
						}
						if(!files){
							errorObj.hospital_geoTaggedPhoto = "Please choose file";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getHospitalData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
	$('form[id="form_depUpdateHospital"]')
	.validate(
			{
				rules : {
					hospitalUp_name : "required",
					hospitalUp_latitude : "required",
					hospitalUp_longitude : "required",
					hospitalUp_address : "required",
					hospitalUp_roadConnectivity : "required",
					hospitalUp_geoTaggedPhoto : "required"
				},
				messages : {
					hospitalUp_name : {
						required : "Please Enter Hospital Name"
					},
					hospitalUp_latitude : {
						required : "Please Enter Latitude"
					},
					hospitalUp_longitude : {
						required : "Please Enter Longitude"
					},
					hospitalUp_address : {
						required : "Please Enter Hospital Address"
					},
					hospitalUp_roadConnectivity : {
						required : "Please Enter Hospital Road Connectivity"
					},
					hospitalUp_geoTaggedPhoto : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#hospitalUp_hospitalId').val();
						let ward_no = $('#hospitalUp_ward').val();
						let hospital_name = $('#hospitalUp_name').val();
						let address = $('#hospitalUp_address').val();
						let type_of_hospital = $('#hospitalUp_type').val();
						let hospital_category = $('#hospitalUp_category').val();
						let ownership_type = $('#hospitalUp_ownershipType').val();
						let emergency_service_24_hours_open_108_facility = $('#hospitalUp_emergencyService').val();
						let emergency_service_contact_number = $('#hospitalUp_emergencyContactno').val();
						let no_of_icu = $('#hospitalUp_noOfIcu').val();
						let built_up_area = $('#hospitalUp_builtUpArea').val();
						let hospital_blocks_or_wards = $('#hospitalUp_wardInfo').val();
						let hod_name = $('#hospitalUp_hodName').val();
						let bed_count = $('#hospitalUp_bedCount').val();
						let hospital_area = $('#hospitalUp_area').val();
						let blood_bank_facility = $('#hospitalUp_bloodBankFacility').val();
						let mortuary = $('#hospitalUp_mortuary').val();
						let recognized_by = $('#hospitalUp_recognizedBy').val();
						let remarks = $('#hospitalUp_remarks').val();
						let condition_of_road_connectivity_to_hospital = $('#hospitalUp_roadConnectivity').val();
						let police_station_number = $('#hospitalUp_policeStationNo').val();
						let latitude = $('#hospitalUp_latitude').val();
						let longitude = $('#hospitalUp_longitude').val();

						let sub_layer_id = $('#hospitalUp_subLayerId').val();
						let data = {ward_no:ward_no,hospital_name:hospital_name
								,address:address,type_of_hospital:type_of_hospital,hospital_category:hospital_category
								,ownership_type:ownership_type
								,emergency_service_24_hours_open_108_facility:emergency_service_24_hours_open_108_facility
								,emergency_service_contact_number:emergency_service_contact_number
								,no_of_icu:no_of_icu,built_up_area:built_up_area,
								hospital_blocks_or_wards:hospital_blocks_or_wards
								,hod_name:hod_name,bed_count:bed_count,hospital_area:hospital_area
								,blood_bank_facility:blood_bank_facility,mortuary:mortuary,recognized_by:recognized_by
								,remarks:remarks,condition_of_road_connectivity_to_hospital:condition_of_road_connectivity_to_hospital
								,police_station_number:police_station_number,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#hospitalUp_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#hospitalUp_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#hospitalUp_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						
						var validator = $("#form_depUpdateHospital").validate();
						let errorObj = {};
						if(!hospital_name || hospital_name === null || hospital_name === ""){
							errorObj.hospitalUp_name = "Please enter Hospital Name";
						}
						if(!latitude || latitude === null){
							errorObj.hospitalUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.hospitalUp_longitude = "Please enter Longitude";
						}
						if(!address || address === null || address === ""){
							errorObj.hospitalUp_address = "Please enter Hospital Address";
						}
						if(!condition_of_road_connectivity_to_hospital || condition_of_road_connectivity_to_hospital === null || condition_of_road_connectivity_to_hospital === ""){
							errorObj.hospitalUp_roadConnectivity =  "Please enter Hospital Road Connectivity";
						}
						if(!files){
							errorObj.hospitalUp_geoTaggedPhoto = "Please choose file";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getHospitalData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
	$('form[id="form_depAddUphc"]')
	.validate(
			{
				rules : {
					uphc_name : "required",
					uphc_latitude : "required",
					uphc_longitude : "required",
					uphc_address : "required"
						
				},
				messages : {
					uphc_name : {
						required : "Please Enter UPHC Name"
					},
					uphc_latitude : {
						required : "Please Enter Latitude"
					},
					uphc_longitude : {
						required : "Please Enter Longitude"
					},
					uphc_address : {
						required : "Please Enter UPHC Address"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#uphc_ward').val();
						let uphc_name = $('#uphc_name').val();
						let address = $('#uphc_address').val();
						let supervisor_name = $('#uphc_supervisorName').val();
						let medical_officer = $('#uphc_medicalOfficer').val();
						let medical_officer_no = $('#uphc_medicalOfficerNo').val();
						let slum_population = $('#uphc_slumPopulation').val();
						let ward_wise_population = $('#uphc_wardWisePopulation').val();
						let total_population = $('#uphc_totalPopulation').val();
						let supervisor_no = $('#uphc_supervisorNo').val();
						let latitude = $('#uphc_latitude').val();
						let longitude = $('#uphc_longitude').val();
						
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === 'UPHC'){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,uphc_name:uphc_name,address:address
								,supervisor_name:supervisor_name,medical_officer:medical_officer
								,medical_officer_no:medical_officer_no,slum_population:slum_population
								,ward_wise_population:ward_wise_population,total_population:total_population
								,supervisor_no:supervisor_no,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

//						let files = $('#uphc_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#uphc_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#uphc_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						
						var validator = $("#form_depAddUphc").validate();
						let errorObj = {};
						if(!uphc_name || uphc_name === null || uphc_name === ""){
							errorObj.uphc_name = "Please enter UPHC Name"
						}
						
						if(!latitude || latitude === null){
							errorObj.uphc_latitude = "Please enter Latitude";
						}
						
						if(!longitude || longitude === null){
							errorObj.uphc_longitude = "Please enter Longitude";
						}
						
						if(!address || address === null || address === ""){
							errorObj.uphc_address = "Please enter UPHC Address"
						}
						
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj);
						getUphcData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	$('form[id="form_depUpdateUphc"]')
	.validate(
			{
				rules : {
					uphcUp_name : "required",
					uphcUp_latitude : "required",
					uphcUp_longitude : "required",
					uphcUp_address : "required"
						
				},
				messages : {
					uphcUp_name : {
						required : "Please Enter UPHC Name"
					},
					uphcUp_latitude : {
						required : "Please Enter Latitude"
					},
					uphcUp_longitude : {
						required : "Please Enter Longitude"
					},
					uphcUp_address : {
						required : "Please Enter UPHC Address"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#uphcUp_uphcId').val();
						let ward_no = $('#uphcUp_ward').val();
						let uphc_name = $('#uphcUp_name').val();
						let address = $('#uphcUp_address').val();
						let supervisor_name = $('#uphcUp_supervisorName').val();
						let medical_officer = $('#uphcUp_medicalOfficer').val();
						let medical_officer_no = $('#uphcUp_medicalOfficerNo').val();
						let slum_population = $('#uphcUp_slumPopulation').val();
						let ward_wise_population = $('#uphcUp_wardWisePopulation').val();
						let total_population = $('#uphcUp_totalPopulation').val();
						let supervisor_no = $('#uphcUp_supervisorNo').val();
						let latitude = $('#uphcUp_latitude').val();
						let longitude = $('#uphcUp_longitude').val();
						
						let sub_layer_id = $('#uphcUp_subLayerId').val();
						let data = {ward_no:ward_no,uphc_name:uphc_name,address:address
								,supervisor_name:supervisor_name,medical_officer:medical_officer
								,medical_officer_no:medical_officer_no,slum_population:slum_population
								,ward_wise_population:ward_wise_population,total_population:total_population
								,supervisor_no:supervisor_no,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id: layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#uphc_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#uphc_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#uphc_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						
						var validator = $("#form_depUpdateUphc").validate();
						let errorObj = {};
						if(!uphc_name || uphc_name === null || uphc_name === ""){
							errorObj.uphcUp_name = "Please enter UPHC Name"
						}
						
						if(!latitude || latitude === null){
							errorObj.uphcUp_latitude = "Please enter Latitude";
						}
						
						if(!longitude || longitude === null){
							errorObj.uphcUp_longitude = "Please enter Longitude";
						}
						
						if(!address || address === null || address === ""){
							errorObj.uphcUp_address = "Please enter UPHC Address"
						}
						
														
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj);
						getUphcData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
});

$("#addHospital_close").click(function(){
	$('#form_depAddHospital').trigger('reset');
	window.depUtlityController.removeError('form_depAddHospital');
});

$("#updateHospital_close").click(function(){
	$('#form_depAddHospital').trigger('reset');
	window.depUtlityController.removeError('form_depUpdateHospital');
});

$("#addUphc_close").click(function(){
	$('#form_depAddUphc').trigger('reset');
	window.depUtlityController.removeError('form_depAddUphc');
});

$("#updateUphc_close").click(function(){
	$('#form_depUpdateUphc').trigger('reset');
	window.depUtlityController.removeError('form_depUpdateUphc');
});


/**
 * checking for module permission
 */
$("ul[id*=leftPanel] li").click(function () {
	let val = $(this).attr('title');
	window.depUtlityController.setPageAccessAccordingToModule(val);
});

$(window).on('load resize', function () {
});	