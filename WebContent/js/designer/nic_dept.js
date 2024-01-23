var atm_data = "ATM";
var bank_data = "Banks";
var monument_data ="Monuments";
var museum_data ="Museum";
var park_data ="Park and ground";
var manhole_data ="Manhole";
var current_tab = atm_data;
var table;

function getAtmData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_atm_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: atm_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_atm_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}
function getBankData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_Bank_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: bank_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_Bank_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getMonumentData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_monument_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: monument_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_monument_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getMuseumData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_museum_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: museum_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_museum_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getParkData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_park_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: park_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_park_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getManholeData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_manhole_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: manhole_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_manhole_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
}

$(document).ready(function(){	
	
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
  
  $('.datepicker').daterangepicker({
		 singleDatePicker: true,
		 timePicker: false,
		 locale: {
			format: 'YYYY-MM-DD'
		}, 
	 });
  
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
	if(current_tab === 'ATM'){
		dataTable_id = 'dep_atm_table';
	}else if(current_tab === 'Banks'){
		dataTable_id = 'dep_Bank_table';
	}else if(current_tab === 'Monuments'){
		dataTable_id = 'dep_monument_table';
	}else if(current_tab === 'Museum'){
		dataTable_id = 'dep_museum_table';
	}else if(current_tab === 'Park and ground'){
		dataTable_id = 'dep_park_table';
	}else if(current_tab === 'Manhole'){
		dataTable_id = 'dep_manhole_table';
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
		if(current_tab === atm_data){
			getAtmData();
		}else if(current_tab === bank_data){
			getBankData();
		}else if(current_tab === monument_data){
			getMonumentData();
		}else if(current_tab === museum_data){
			getMuseumData();
		}else if(current_tab === park_data){
			getParkData();
		}else if(current_tab === manhole_data){
			getManholeData();
 	}
 	}else{
 		 return false;
 	}
}

function updateAtm(event){
	let row = $(event.currentTarget).data('row');
	
	$('#atmUp_atmId').val(row.id);
	
	$('#atmUp_wardno').val(row.data.ward_id);
	$('#atmUp_name').val(row.data.atm_name);
	$('#atmUp_address').val(row.data.address);
	$('#atmUp_type').val(row.data.atm_type);
	$('#atmUp_remark').val(row.data.remarks);
	$('#atmUp_phonenumber').val(row.data.phone_number);
	$('#atmUp_secNo').val(row.data.sector_no);
	$('#atmUp_latitude').val(row.data.latitude);
	$('#atmUp_longitude').val(row.data.longitude);

	$('#atmUp_subLayerId').val(row.sub_layer_id);
}
function updateBank(event){
	let row = $(event.currentTarget).data('row');
	
	$('#bankUp_bankId').val(row.id);
	
	$('#bankUp_wardno').val(row.data.ward_id);
	$('#bankUp_name').val(row.data.bank_name);
	$('#bankUp_address').val(row.data.address);
	$('#bankUp_Type').val(row.data.bank_type);
	$('#bankUp_remark').val(row.data.remarks);
	$('#bankUp_phonenumber').val(row.data.phone_number);
	$('#bankUp_secNo').val(row.data.sector_no);
	$('#bankUp_latitude').val(row.data.latitude);
	$('#bankUp_longitude').val(row.data.longitude);

	$('#bankUp_subLayerId').val(row.sub_layer_id);
	
	
}
function updateMonument(event){
	let row = $(event.currentTarget).data('row');
	
	$('#monUp_monId').val(row.id);
	$('#monUp_ward').val(row.data.ward_id);
	$('#monUp_Name').val(row.data.monument_name);
	$('#monUp_address').val(row.data.address);
	$('#monUp_Type').val(row.data.monument_type);
	$('#monUp_remark').val(row.data.remarks);
	$('#monUp_secNo').val(row.data.sector_no);
	$('#monUp_latitude').val(row.data.latitude);
	$('#monUp_longitude').val(row.data.longitude);
	$('#monUp_timings').val(row.data.timings);
	$('#monUp_ticket').val(row.data.tickets_availability);
	$('#monUp_tourist').val(row.data.tourist_guides_availability);
	$('#monUp_subLayerId').val(row.sub_layer_id);
	
}


function updateMuseum(event){
	let row = $(event.currentTarget).data('row');
	
	$('#museumUp_museumId').val(row.id);
	$('#museumUp_ward').val(row.data.ward_id);
	$('#museumUP_Name').val(row.data.museum_name);
	$('#museumUP_address').val(row.data.address);
	$('#museumUP_Type').val(row.data.museum_type);
	$('#museumUP_remark').val(row.data.remarks);
	$('#museumUP_secNo').val(row.data.sector_no);
	$('#museumUP_latitude').val(row.data.latitude);
	$('#museumUP_longitude').val(row.data.longitude);
	$('#museumUP_timings').val(row.data.timings);
	$('#museumUP_ticket').val(row.data.tickets_availability);
	$('#museumUP_tourist').val(row.data.tourist_guides_availability);
	$('#museumUP_remark').val(row.data.remarks);
	
	$('#museumUp_subLayerId').val(row.sub_layer_id);
	
}


function updateParks(event){
	let row = $(event.currentTarget).data('row');
	
	$('#parkUp_parkId').val(row.id);
	$('#parkUp_ward').val(row.data.ward_id);
	$('#parkUp_Name').val(row.data.park_and_ground_name);
	$('#parkUp_road').val(row.data.road_name);
	$('#parkUp_gardenArea').val(row.data.garden_area);
	$('#parkUp_entries').val(row.data.no_of_entries);
	$('#parkUp_structure').val(row.data.structure);
	$('#parkUp_trees').val(row.data.no_of_trees);
	$('#parkUp_vtree').val(row.data.variety_of_trees);
	$('#parkUp_statues').val(row.data.statues);
	$('#parkUp_parknostatues').val(row.data.no_of_statues);
	$('#parkUp_birdfeeder').val(row.data.bird_feeder);
	$('#parkUp_nobirdfer').val(row.data.no_of_bird_feeder);
	$('#parkUp_instrument').val(row.data.no_of_playing_instruments);
	$('#parkUp_benches').val(row.data.no_of_benches);
	$('#parkUp_toilet').val(row.data.toilets);
	$('#parkUp_drinkingWater').val(row.data.drinking_water);
	$('#parkUp_PhysicalFitness').val(row.data.physical_fitness_facitlity);
	$('#parkUp_Opening').val(row.data.park_opening_time);
	$('#parkUp_Closing').val(row.data.park_closing_time);
	$('#parkUp_EntryTicket').val(row.data.entry_ticket_price);
	$('#parkUp_SeniorCitizen').val(row.data.senior_citizen_spots);
	$('#parkUp_resthut').val(row.data.rest_hut);
	$('#parkUp_Noresthut').val(row.data.no_of_rest_hut);
	$('#parkUp_watercon').val(row.data.water_connection);
	$('#parkUp_sewageconn').val(row.data.sewage_connection);
	$('#parkUp_lastmain').val(row.data.last_maintenance_date);
	$('#parkUp_NoLights').val(row.data.no_of_lights);
	$('#parkUp_contactNo').val(row.data.contact_no);
	$('#parkUp_secNo').val(row.data.sector_no);
	$('#parkUp_latitude').val(row.data.latitude);
	$('#parkUp_longitude').val(row.data.longitude);
	$('#parkUp_subLayerId').val(row.sub_layer_id);
	
}


function updateManhole(event){
	let row = $(event.currentTarget).data('row');
	
	$('#manholeUp_manholeId').val(row.id);
	$('#manholeUp_id').val(row.data.manhole_id);
	$('#manholeUp_Wardno').val(row.data.ward_id);
	$('#manholeUp_latitude').val(row.data.latitude);
	$('#manholeUp_longitude').val(row.data.longitude);
	$('#manholeUp_remark').val(row.data.remarks);
	$('#manholeUp_Lastmain').val(row.data.last_maintenance_date);
	$('#manholeUp_cover').val(row.data.cover_material);
	$('#manholeUp_shape').val(row.data.manhole_shape);
	$('#manholeUp_Wall_con').val(row.data.wall_construction_material);
	$('#manholeUp_Dateinstall').val(row.data.installation_date);
	$('#manholeUp_type').val(row.data.manhole_type);
	
	
	$('#manholeUp_subLayerId').val(row.sub_layer_id);
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
							
							(current_tab ===atm_data ?
							" data-toggle='modal' data-target='#nic_atm_update_modal' " +
							" onclick='updateAtm(event)'> " 
							: current_tab === bank_data ? 
									" data-toggle='modal' data-target='#dep_updateBank_modal' " +
									" onclick='updateBank(event)'> " 
							: current_tab === monument_data ? 
									" data-toggle='modal' data-target='#nic_updateMonument_modal' " +
									" onclick='updateMonument(event)'> "
							: current_tab === museum_data ? 		
									" data-toggle='modal' data-target='#nic_updateMuseumModel' " +
									" onclick='updateMuseum(event)'> "
							:current_tab === park_data ? 	
								" data-toggle='modal' data-target='#update_nic_parksModel' " +
								" onclick='updateParks(event)'> "
							:" data-toggle='modal' data-target='#nic_updateManhole_model' " +
							" onclick='updateManhole(event)'> ")+
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

$(window).on("load", function(){
	$(".loader").fadeOut(1000);
	window.depUtlityController.headerDrop();
	
	window.depUtlityController.getLayers('add_data_category');
	
	window.depUtlityController.getWardList('atm_wardNo');
	window.depUtlityController.getWardList('atmUp_wardno');
	window.depUtlityController.getWardList('bank_wardno');
	window.depUtlityController.getWardList('bankUp_wardno');
	
	window.depUtlityController.getWardList('mon_ward');
	window.depUtlityController.getWardList('monUp_ward');
	
	window.depUtlityController.getWardList('museum_ward');
	window.depUtlityController.getWardList('museumUp_ward');
	
	window.depUtlityController.getWardList('park_ward');
	window.depUtlityController.getWardList('parkUp_ward');
	
	window.depUtlityController.getWardList('manhole_ward_id');
	window.depUtlityController.getWardList('manholeUp_Wardno');
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_atm_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
	
	$(".datepicker-dept").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
        format: 'yyyy-mm-dd'
	}).datepicker('update', new Date());	
	
	$('form[id="form_addNicAtm"]')
	.validate(
			{
				rules : {
					atm_latitude : "required",
					atm_longitude : "required",
					atm_name : "required",
					atm_address : "required",
					atm_images_add : "required"
				},
				messages : {

					atm_latitude : {
						required : "Please Enter Latitude"
					},
					atm_longitude : {
						required : "Please Enter Longitude"
					},
					atm_name : {
						required : "Please Enter ATM Name"
					},
					atm_address : {
						required : "Please Enter ATM Address"
					},
					atm_images_add  : {
						required : "Please Choose File"
					}

				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#atm_wardNo').val();
						let latitude = $('#atm_latitude').val();
						let longitude = $('#atm_longitude').val();
						let atm_name = $('#atm_name').val();
						let atm_type = $('#atm_type').val();
						let address = $('#atm_address').val();
						let phoneNumber = $('#atm_phonenumber').val();
						let sectorNo =  $('#atm_secNo').val();
						let remark =  $('#atm_remark').val();
					
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === 'ATM'){
								return e;
							}
						});
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,atm_name:atm_name
								,atm_type:atm_type,address:address,phone_number:phoneNumber,sector_no:sectorNo
								,remarks:remark};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#atm_images_add')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#atm_images_add')[0].files,1);
						if(inValidFile){
							$('#atm_images_add')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_addNicAtm").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.atm_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.atm_longitude = "Please enter Longitude";
						}
						if(!atm_name || atm_name === null || atm_name === ""){
							errorObj.atm_name = "Please enter ATM Name";
						}
						if(!address || address === null || address === ""){
							errorObj.atm_address = "Please enter ATM Address";
						}
						if(!files){
							errorObj.atm_images_add = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getAtmData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
		/*For ATM Update Model*/ 
	
	$('form[id="form_nicUpdateAtm"]')
	.validate(
			{
				rules : {
					atmUp_latitude : "required",
					atmUp_longitude : "required",
					atmUp_name : "required",
					atmUp_address : "required",
					atmUp_nicImage : "required"
				},
				messages : {

					atmUp_latitude : {
						required : "Please Enter Latitude"
					},
					atmUp_longitude : {
						required : "Please Enter Longitude"
					},
					atmUp_name : {
						required : "Please Enter ATM Name"
					},
					atmUp_address : {
						required : "Please Enter ATM Address"
					},
					atmUp_nicImage  : {
						required : "Please Choose File"
					}

				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#atmUp_atmId').val();
						let ward_id = $('#atmUp_wardno').val(); 
						let latitude = $('#atmUp_latitude').val();
						let longitude = $('#atmUp_longitude').val();
						let atm_name = $('#atmUp_name').val();
						let atm_type = $('#atmUp_type').val();
						let address = $('#atmUp_address').val();
						let phoneNumber = $('#atmUp_phonenumber').val();
						let sectorNo =  $('#atmUp_secNo').val();
						let remark =  $('#atmUp_remark').val();
					
						let sub_layer_id = $('#atmUp_subLayerId').val();
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,atm_name:atm_name
								,atm_type:atm_type,address:address,phone_number:phoneNumber,sector_no:sectorNo
								,remarks:remark};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#atmUp_nicImage')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#atmUp_nicImage')[0].files,1);
						
						if(inValidFile){
							$('#atmUp_nicImage')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_nicUpdateAtm").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.atmUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.atmUp_longitude = "Please enter Longitude";
						}
						if(!atm_name || atm_name === null || atm_name === ""){
							errorObj.atmUp_name = "Please enter ATM Name";
						}
						if(!address || address === null || address === ""){
							errorObj.atmUp_address = "Please enter ATM Address";
						}
						if(!files){
							errorObj.atmUp_nicImage = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getAtmData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	 /*-------------For Bank Model-----------------*/
	
	$('form[id="form_nic_bank"]')
	.validate(
			{
				rules : {
					bank_latitude : "required",
					bank_longitude : "required",
					bank_name : "required",
					bank_address : "required",
					bank_images_add : "required"
				},
				messages : {
					bank_latitude : {
						required : "Please Enter Latitude"
					},
					bank_longitude : {
						required : "Please Enter Longitude"
					},
					bank_name : {
						required : "Please Enter Name"
					},
					bank_address : {
						required : "Please Enter Address"
					},
					bank_images_add  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#bank_wardno').val();
						let latitude = $('#bank_latitude').val();
						let longitude = $('#bank_longitude').val();
						let bank_name = $('#bank_name').val();
						let bank_type = $('#bank_Type').val();
						let address = $('#bank_address').val();
						let phone_number = $('#bank_phonenumber').val();
						let sector_no =  $('#bank_secNo').val();
						let remarks =  $('#bank_remark').val();
					
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === 'Banks'){
								return e;
							}
						});
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,bank_name:bank_name
								,bank_type:bank_type,address:address,phone_number:phone_number,sector_no:sector_no
								,remarks:remarks};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#bank_images_add')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#bank_images_add')[0].files,1);
						
						if(inValidFile){
							$('#bank_images_add')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_nic_bank").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.bank_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.bank_longitude = "Please enter Longitude";
						}
						if(!bank_name || bank_name === null || bank_name === ""){
							errorObj.bank_name = "Please enter Name";
						}
						if(!address || address === null || address === ""){
							errorObj.bank_address = "Please enter Address";
						}
						if(!files){
							errorObj.bank_images_add = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getBankData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	/* For Update of Banks*/
	
	$('form[id="form_nicUpdateBank"]')
	.validate(
			{
				rules : {
					bankUp_latitude : "required",
					bankUp_longitude : "required",
					bankUp_name : "required",
					bankUp_address : "required",
					bankUp_nicImages : "required"
				},
				messages : {
					bankUp_latitude : {
						required : "Please Enter Latitude"
					},
					bankUp_longitude : {
						required : "Please Enter Longitude"
					},
					bankUp_name : {
						required : "Please Enter Name"
					},
					bankUp_address : {
						required : "Please Enter Address"
					},
					bankUp_nicImages  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#bankUp_bankId').val();
						let ward_id = $('#bankUp_wardno').val(); 
						let latitude = $('#bankUp_latitude').val();
						let longitude = $('#bankUp_longitude').val();
						let bank_name = $('#bankUp_name').val();
						let bank_type = $('#bankUp_Type').val();
						let address = $('#bankUp_address').val();
						let phone_number = $('#bankUp_phonenumber').val();
						let sector_no =  $('#bankUp_secNo').val();
						let remarks =  $('#bankUp_remark').val();
					
						let sub_layer_id = $('#bankUp_subLayerId').val();
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,bank_name:bank_name
								,bank_type:bank_type,address:address,phone_number:phone_number,sector_no:sector_no
								,remarks:remarks};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#bankUp_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#bankUp_nicImages')[0].files,1);
						
						if(inValidFile){
							$('#bankUp_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_nicUpdateBank").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.bankUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.bankUp_longitude = "Please enter Longitude";
						}
						if(!bank_name || bank_name === null || bank_name === ""){
							errorObj.bankUp_name = "Please enter Name";
						}
						if(!address || address === null || address === ""){
							errorObj.bankUp_address = "Please enter Address";
						}
						if(!files){
							errorObj.bankUp_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getBankData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	 /*-------------For Bank Model end-----------------*/
	

	 /*-------------For Monument Model Start-----------------*/
	
	$('form[id="form_nic_monument"]')
	.validate(
			{
				rules : {
					mon_latitude : "required",
					mon_longitude : "required",
					mon_Name : "required",
					mon_address : "required",
					mon_nicImages : "required"
				
				},
				messages : {

					mon_latitude : {
						required : "Please Enter Latitude"
					},
					mon_longitude : {
						required : "Please Enter Longitude"
					},
					mon_Name : {
						required : "Please Enter Name"
					},

					mon_address : {
						required : "Please Enter Address"
					},
					mon_nicImages  : {
						required : "Please Choose File"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#mon_wardno').val(); 
						let latitude = $('#mon_latitude').val();
						let longitude = $('#mon_longitude').val();
						let monument_name = $('#mon_Name').val();
						let monument_type = $('#mon_Type').val();
						let address = $('#mon_address').val();
						let sector_no =  $('#mon_secNo').val();
						let timings = $('#mon_timings').val();
						let tickets_availability =  $('#mon_ticket').val();
						let tourist_guides_availability= $('#mon_tourist').val();
						let remarks =  $('#mon_remark').val();
					
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === monument_data){
								return e;
							}
						});
						
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,monument_name:monument_name
								,monument_type:monument_type,address:address,sector_no:sector_no,timings:timings,tickets_availability:tickets_availability
								,tourist_guides_availability:tourist_guides_availability,remarks:remarks};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#mon_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#mon_nicImages')[0].files,1);
						
						if(inValidFile){
							$('#mon_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_nic_monument").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.mon_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.mon_longitude = "Please enter Longitude";
						}
						if(!monument_name || monument_name === null || monument_name === ""){
							errorObj1.mon_Name = "Please enter Name";
						}
						if(!address || address === null || address === ""){
							errorObj1.mon_address = "Please enter  Address";
						}
						if(!files){
							errorObj1.mon_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getMonumentData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
		/*	FOR UPDATE MONUMENT MODEL*/
	
	$('form[id="form_nicUpdateMonument"]')
	.validate(
			{
				rules : {
					monUp_latitude : "required",
					monUp_longitude : "required",
					monUp_Name : "required",
					monUp_address : "required",
					monUp_nicImages : "required"
				
				},
				messages : {

					monUp_latitude : {
						required : "Please Enter Latitude"
					},
					monUp_longitude : {
						required : "Please Enter Longitude"
					},
					monUp_Name : {
						required : "Please Enter Name"
					},

					monUp_address : {
						required : "Please Enter Address"
					},
					monUp_nicImages  : {
						required : "Please Choose File"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#monUp_monId').val();
						let ward_id = $('#monUp_ward').val(); 
						let latitude = $('#monUp_latitude').val();
						let longitude = $('#monUp_longitude').val();
						let monument_name = $('#monUp_Name').val();
						let monument_type = $('#monUp_Type').val();
						let address = $('#monUp_address').val();
						let sector_no =  $('#monUp_secNo').val();
						let timings = $('#monUp_timings').val();
						let tickets_availability =  $('#monUp_ticket').val();
						let tourist_guides_availability= $('#monUp_tourist').val();
						let remarks =  $('#monUp_remark').val();
					
						let sub_layer_id = $('#monUp_subLayerId').val();
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,monument_name:monument_name
								,monument_type:monument_type,address:address,sector_no:sector_no,timings:timings,tickets_availability:tickets_availability
								,tourist_guides_availability:tourist_guides_availability,remarks:remarks};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#monUp_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#monUp_nicImages')[0].files,1);
						
						if(inValidFile){
							$('#monUp_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_nicUpdateMonument").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.monUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.monUp_longitude = "Please enter Longitude";
						}
						if(!monument_name || monument_name === null || monument_name === ""){
							errorObj1.monUp_Name = "Please enter  Name";
						}
						if(!address || address === null || address === ""){
							errorObj1.monUp_address = "Please enter  Address";
						}
						if(!files){
							errorObj1.monUp_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getMonumentData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	 /*-------------For Monument Model end-----------------*/
	

	 /*-------------For Museum Model Start-----------------*/
	
	$('form[id="form_nicMuseum"]')
	.validate(
			{
				rules : {
					museum_latitude : "required",
					museum_longitude : "required",
					museum_Name : "required",
					museum_address : "required",
					museum_nicImages : "required"
				
				},
				messages : {

					museum_latitude : {
						required : "Please Enter Latitude"
					},
					museum_longitude : {
						required : "Please Enter Longitude"
					},
					museum_Name : {
						required : "Please Enter Name"
					},

					museum_address : {
						required : "Please Enter Address"
					},
					museum_nicImages  : {
						required : "Please Choose File"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						

						let ward_id	 	=	$('#museum_ward').val();
						let museum_name	=	$('#museum_Name').val();
						let address		=	$('#museum_address').val();
						let museum_type	=	$('#museum_Type').val();
						let remarks		=	$('#museum_remark').val();
						let sector_no	=	$('#museum_secNo').val();
						let latitude	=	$('#museum_latitude').val();
						let longitude	=	$('#museum_longitude').val();
						let timings		=	$('#museum_timings').val();
						let tickets_availability = $('#museum_ticket').val();
						let tourist_guides_availability	= $('#museum_tourist').val();
						
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === museum_data){
								return e;
							}
						});
						
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,museum_name:museum_name
								,museum_type:museum_type,address:address,sector_no:sector_no,timings:timings,tickets_availability:tickets_availability
								,tourist_guides_availability:tourist_guides_availability,remarks:remarks};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#museum_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#museum_nicImages')[0].files,1);
						
						if(inValidFile){
							$('#museum_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_nicMuseum").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.museum_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.museum_longitude = "Please enter Longitude";
						}
						if(!museum_name || museum_name === null || museum_name === ""){
							errorObj1.museum_Name = "Please enter Name";
						}
						if(!address || address === null || address === ""){
							errorObj1.museum_address = "Please enter  Address";
						}
						if(!files){
							errorObj1.museum_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getMuseumData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	/*For Update Museum Model*/
	
	
	$('form[id="form_nicUpdateMuseum"]')
	.validate(
			{
				rules : {
					museumUP_latitude : "required",
					museumUP_longitude : "required",
					museumUP_Name : "required",
					museumUP_address : "required",
					museumUP_nicImages : "required"
				
				},
				messages : {

					museumUP_latitude : {
						required : "Please Enter Latitude"
					},
					museumUP_longitude : {
						required : "Please Enter Longitude"
					},
					museumUP_Name : {
						required : "Please Enter Name"
					},

					museumUP_address : {
						required : "Please Enter Address"
					},
					museumUP_nicImages  : {
						required : "Please Choose File"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = 		$('#museumUp_museumId').val();
						let ward_id	 	=	$('#museumUp_ward').val();
						let museum_name =	$('#museumUP_Name').val();
						let address		=	$('#museumUP_address').val();
						let museum_type =	$('#museumUP_Type').val();
						let remarks		=	$('#museumUP_remark').val();
						let sector_no	=	$('#museumUP_secNo').val();
						let latitude	=	$('#museumUP_latitude').val();
						let longitude	=	$('#museumUP_longitude').val();
						let timings		=	$('#museumUP_timings').val();
						let tickets_availability = $('#museumUP_ticket').val();
						let tourist_guides_availability	= $('#museumUP_tourist').val();
						
						
						let sub_layer_id = $('#museumUp_subLayerId').val();
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,museum_name:museum_name
								,museum_type:museum_type,address:address,sector_no:sector_no,timings:timings,tickets_availability:tickets_availability
								,tourist_guides_availability:tourist_guides_availability,remarks:remarks};
						
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id :layer_id,data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#museumUP_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#museumUP_nicImages')[0].files,1);
						
						if(inValidFile){
							$('#museumUP_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_nicUpdateMuseum").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.museumUP_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.museumUP_longitude = "Please enter Longitude";
						}
						if(!museum_name || museum_name === null || museum_name === ""){
							errorObj1.museumUP_Name = "Please enter Name";
						}
						if(!address || address === null || address === ""){
							errorObj1.museumUP_address = "Please enter  Address";
						}
						if(!files){
							errorObj1.museumUP_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getMuseumData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	 /*-------------For Museum Model end-----------------*/
	
/*-------------For Parks Model Start-----------------*/
	
	$('form[id="nic_parkForm"]')
	.validate(
			{
				rules : {
					park_latitude : "required",
					park_longitude : "required",
					park_Name : "required",
					park_secNo : "required",
					park_road : "required",
					park_nicImages : "required",
				},
				messages : {

					park_latitude : {
						required : "Please Enter Latitude"
					},
					park_longitude : {
						required : "Please Enter Longitude"
					},
					park_Name : {
						required : "Please Enter Park Name"
					},
					park_secNo : {
						required : "Please Enter Sector Number"
					},
					park_road : {
						required : "Please Enter Road Name"
					},
					park_nicImages  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id 				=	$('#park_ward').val();
						let park_and_ground_name	=	$('#park_Name').val();
						let road_name				=	$('#park_road').val();
						let garden_area				=	$('#park_gardenArea').val();
						let no_of_entries			=	$('#park_entries').val();
						let structure				=	$('#park_structure').val();
						let no_of_trees				=	$('#park_trees').val();
						let variety_of_trees		=	$('#park_vtree').val();
						let statues					=	$('#park_statues').val();
						let no_of_statues			=	$('#park_parknostatues').val();
						let bird_feeder				=	$('#park_birdfeeder').val();
						let no_of_bird_feeder		=	$('#park_nobirdfer').val();
						let no_of_playing_instruments=	$('#park_instrument').val();
						let no_of_benches			=	$('#park_benches').val();
						let toilets					=	$('#park_toilet').val();
						let drinking_water			=	$('#park_drinkingWater').val();
						let physical_fitness_facitlity=	$('#park_PhysicalFitness').val();
						let park_opening_time		=	$('#park_Opening').val();
						let park_closing_time		=	$('#park_Closing').val();
						let entry_ticket_price		=	$('#park_EntryTicket').val();
						let senior_citizen_spots	=	$('#park_SeniorCitizen').val();
						let rest_hut				=	$('#park_resthut').val();
						let no_of_rest_hut			=	$('#park_Noresthut').val();
						let water_connection		=	$('#park_watercon').val();
						let sewage_connection		=	$('#park_sewageconn').val();
						let last_maintenance_date	=	$('#park_lastmain').val();
						let no_of_lights			=	$('#park_NoLights').val();
						let contact_no	=$('#park_contactNo').val();
						let sector_no	=$('#park_secNo').val();
						let latitude	=$('#park_latitude').val();
						let longitude	=$('#park_longitude').val();
					
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === park_data){
								return e;
							}
						});
						
						let data = {ward_id 			: ward_id ,										
								park_and_ground_name	: park_and_ground_name,							
								road_name				: road_name,										
								garden_area				: garden_area,						
								no_of_entries			: no_of_entries	,					
								structure				: structure		,					
								no_of_trees				: no_of_trees	,						
								variety_of_trees		: variety_of_trees,				
								statues					: statues		,						
								no_of_statues			: no_of_statues	,					
								bird_feeder				: bird_feeder	,						
								no_of_bird_feeder		: no_of_bird_feeder,					
								no_of_playing_instruments: no_of_playing_instruments	,					
								no_of_benches			: no_of_benches	,					
								toilets					: toilets,						
								drinking_water			: drinking_water,						
								physical_fitness_facitlity: physical_fitness_facitlity,						
								park_opening_time		: park_opening_time,					
								park_closing_time		: park_closing_time	,					
								entry_ticket_price		: entry_ticket_price,						
								senior_citizen_spots	: senior_citizen_spots,							
								rest_hut				: rest_hut,					
								no_of_rest_hut			: no_of_rest_hut,						
								water_connection		: water_connection,					
								sewage_connection		: sewage_connection,					
								last_maintenance_date	: last_maintenance_date,							
								no_of_lights			: no_of_lights,						
								contact_no				: contact_no,						
								sector_no				: sector_no	,					
								latitude				: latitude	,					
								longitude				: longitude		};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#park_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#park_nicImages')[0].files,1);
						
						if(inValidFile){
							$('#park_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#nic_parkForm").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.park_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.park_longitude = "Please enter Longitude";
						}
						if(!park_and_ground_name || park_and_ground_name === null || park_and_ground_name === ""){
							errorObj.park_Name = "Please enter Park Name";
						}
						if(!sector_no || sector_no === null || sector_no === ""){
							errorObj.park_secNo = "Please enter Sector No";
						}
						if(!road_name || road_name === null || road_name === ""){
							errorObj.park_road = "Please enter road Name";
						}
						if(!files){
							errorObj.park_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getParkData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
		/*For Update park Model*/
	$('form[id="form_nicUpdateParks"]')
	.validate(
			{
				rules : {
					parkUp_latitude : "required",
					parkUp_longitude : "required",
					parkUp_Name : "required",
					parkUp_secNo : "required",
					parkUp_road : "required",
					parkUp_nicImages : "required",
				},
				messages : {

					parkUp_latitude : {
						required : "Please Enter Latitude"
					},
					parkUpUp_longitude : {
						required : "Please Enter Longitude"
					},
					parkUp_Name : {
						required : "Please Enter Park Name"
					},
					parkUp_secNo : {
						required : "Please Enter Sector Number"
					},
					parkUp_road : {
						required : "Please Enter Road Name"
					},
					parkUp_nicImages  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id                = 	$('#parkUp_parkId').val();
						let ward_id 				=	$('#parkUp_ward').val();
						let park_and_ground_name	=	$('#parkUp_Name').val();
						let road_name				=	$('#parkUp_road').val();
						let garden_area				=	$('#parkUp_gardenArea').val();
						let no_of_entries			=	$('#parkUp_entries').val();
						let structure				=	$('#parkUp_structure').val();
						let no_of_trees				=	$('#parkUp_trees').val();
						let variety_of_trees		=	$('#parkUp_vtree').val();
						let statues					=	$('#parkUp_statues').val();
						let no_of_statues			=	$('#parkUp_parknostatues').val();
						let bird_feeder				=	$('#parkUp_birdfeeder').val();
						let no_of_bird_feeder		=	$('#parkUp_nobirdfer').val();
						let no_of_playing_instruments=	$('#parkUp_instrument').val();
						let no_of_benches			=	$('#parkUp_benches').val();
						let toilets					=	$('#parkUp_toilet').val();
						let drinking_water			=	$('#parkUp_drinkingWater').val();
						let physical_fitness_facitlity=	$('#parkUp_PhysicalFitness').val();
						let park_opening_time		=	$('#parkUp_Opening').val();
						let park_closing_time		=	$('#parkUp_Closing').val();
						let entry_ticket_price		=	$('#parkUp_EntryTicket').val();
						let senior_citizen_spots	=	$('#parkUp_SeniorCitizen').val();
						let rest_hut				=	$('#parkUp_resthut').val();
						let no_of_rest_hut			=	$('#parkUp_Noresthut').val();
						let water_connection		=	$('#parkUp_watercon').val();
						let sewage_connection		=	$('#parkUp_sewageconn').val();
						let last_maintenance_date	=	$('#parkUp_lastmain').val();
						let no_of_lights			=	$('#parkUp_NoLights').val();
						let contact_no	=$('#parkUp_contactNo').val();
						let sector_no	=$('#parkUp_secNo').val();
						let latitude	=$('#parkUp_latitude').val();
						let longitude	=$('#parkUp_longitude').val();
					
						let sub_layer_id = $('#parkUp_subLayerId').val();
						let data = {ward_id 			: ward_id ,										
								park_and_ground_name	: park_and_ground_name,							
								road_name				: road_name,										
								garden_area				: garden_area,						
								no_of_entries			: no_of_entries	,					
								structure				: structure		,					
								no_of_trees				: no_of_trees	,						
								variety_of_trees		: variety_of_trees,					
								statues					: statues		,						
								no_of_statues			: no_of_statues	,					
								bird_feeder				: bird_feeder	,						
								no_of_bird_feeder		: no_of_bird_feeder,					
								no_of_playing_instruments: no_of_playing_instruments	,					
								no_of_benches			: no_of_benches	,					
								toilets					: toilets,						
								drinking_water			: drinking_water,						
								physical_fitness_facitlity: physical_fitness_facitlity,						
								park_opening_time		: park_opening_time,					
								park_closing_time		: park_closing_time	,					
								entry_ticket_price		: entry_ticket_price,						
								senior_citizen_spots	: senior_citizen_spots,							
								rest_hut				: rest_hut,					
								no_of_rest_hut			: no_of_rest_hut,						
								water_connection		: water_connection,					
								sewage_connection		: sewage_connection,					
								last_maintenance_date	: last_maintenance_date,							
								no_of_lights			: no_of_lights,						
								contact_no				: contact_no,						
								sector_no				: sector_no	,					
								latitude				: latitude	,					
								longitude				: longitude	};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id : layer_id ,data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#parkUp_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#parkUp_nicImages')[0].files,1);
						
						if(inValidFile){
							$('#parkUp_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_nicUpdateParks").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.parkUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.parkUp_longitude = "Please enter Longitude";
						}
						if(!park_and_ground_name || park_and_ground_name === null || park_and_ground_name === ""){
							errorObj.parkUp_Name = "Please enter Park Name";
						}
						if(!sector_no || sector_no === null || sector_no === ""){
							errorObj.parkUp_secNo = "Please enter Sector No";
						}
						if(!road_name || road_name === null || road_name === ""){
							errorObj.parkUp_road = "Please enter road Name";
						}
						if(!files){
							errorObj.parkUp_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getParkData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	 /*-------------For Parks Model end-----------------*/
	
	/*-------------For Manhole Model Start-----------------*/
	
	$('form[id="nic_formManhole"]')
	.validate(
			{
				rules : {
					manhole_latitude : "required",
					manhole_longitude : "required",
					manhole_nicImages : "required"
				
				},
				messages : {

					manhole_latitude : {
						required : "Please Enter Latitude"
					},
					manhole_longitude : {
						required : "Please Enter Longitude"
					},
					
					manhole_nicImages  : {
						required : "Please Choose File"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						//$('#manhole_manholeId').val(row.id);
						//let	manhole_id =$('#manhole_id').val();
						let	ward_id	  =$('#manhole_ward_id').val();
						let	latitude =$('#manhole_latitude').val();
						let	longitude =$('#manhole_longitude').val();
						let	remarks	=	$('#manhole_remarks').val();
						let	last_maintenance_date	=$('#manhole_Lastmain').val();
						let	cover_material			=$('#manhole_cover').val();
						let	manhole_shape			=$('#manhole_manhole_shape').val();
						let	wall_construction_material = $('#manhole_Wall_con').val();
						let	installation_date	=	$('#manhole_Dateinstall').val();
						let	manhole_type		=	$('#manhole_manhole_type').val();

						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === 'Manhole'){
								return e;
							}
						});
					
						//let sub_layer_id = $('#manhole_subLayerId').val();
						let data = {
								ward_id	  			: ward_id,
								latitude 			: latitude ,
								longitude 			: longitude,
								remarks				: remarks,
								last_maintenance_date: last_maintenance_date,
								cover_material		: cover_material,
								manhole_shape		: manhole_shape,
								wall_construction_material : wall_construction_material , 
								installation_date	: installation_date,
								manhole_type		: manhole_type,

							};
						
						
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#manhole_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#manhole_nicImages')[0].files,1);
						if(inValidFile){
							$('#manhole_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#nic_formManhole").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.manhole_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.manhole_longitude = "Please enter Longitude";
						}
					
						if(!files){
							errorObj1.manhole_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getManholeData();
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	$('form[id="form_nicUpdateManhole"]')
	.validate(
			{
				rules : {
					manholeUp_latitude : "required",
					manholeUp_longitude : "required",
					manholeUp_nicImages : "required"
				
				},
				messages : {

					manholeUp_latitude : {
						required : "Please Enter Latitude"
					},
					manholeUp_longitude : {
						required : "Please Enter Longitude"
					},
					
					manholeUp_nicImages  : {
						required : "Please Choose File"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id  = 	$('#manholeUp_manholeId').val();
						//let	manhole_id =$('#manholeUp_id').val();
						let	ward_id	  =$('#manholeUp_Wardno').val();
						let	latitude =$('#manholeUp_latitude').val();
						let	longitude =$('#manholeUp_longitude').val();
						let	remarks	=$('#manholeUp_remark').val();
						let	last_maintenance_date	=$('#manholeUp_Lastmain').val();
						let	cover_material			=$('#manholeUp_cover').val();
						let	manhole_shape			=$('#manholeUp_shape').val();
						let	wall_construction_material = $('#manholeUp_Wall_con').val();
						let	installation_date	=	$('#manholeUp_Dateinstall').val();
						let	manhole_type		=	$('#manholeUp_type').val();
						let sub_layer_id = $('#manholeUp_subLayerId').val();
						
						let data = {
								ward_id	  			: ward_id,
								latitude 			: latitude ,
								longitude 			: longitude,
								remarks				: remarks,
								last_maintenance_date: last_maintenance_date,
								cover_material		: cover_material,
								manhole_shape		: manhole_shape,
								wall_construction_material : wall_construction_material , 
								installation_date	: installation_date,
								manhole_type		: manhole_type,};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#manholeUp_nicImages')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#manholeUp_nicImages')[0].files,1);
						
						if(inValidFile){
							$('#manholeUp_nicImages')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_nicUpdateManhole").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.manholeUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.manholeUp_longitude = "Please enter Longitude";
						}
					
						if(!files){
							errorObj1.manholeUp_nicImages = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files,'geo_tagged_photo');
						getManholeData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	/*-------------For Manhole Model end-----------------*/
	
});


$("#addAtm_close").click(function(){
	$('#form_addNicAtm').trigger('reset');
	window.depUtlityController.removeError('form_addNicAtm');
});

$("#updateAtm_close").click(function(){
	$('#form_nicUpdateAtm').trigger('reset');
	window.depUtlityController.removeError('form_nicUpdateAtm');
});

$("#addBank_close").click(function(){
	$('#form_nic_bank').trigger('reset');
	window.depUtlityController.removeError('form_nic_bank');
});

$("#updateBank_close").click(function(){
	$('#form_nicUpdateBank').trigger('reset');
	window.depUtlityController.removeError('form_nicUpdateBank');
});


$("#addMonument_close").click(function(){
	$('#form_nic_monument').trigger('reset');
	window.depUtlityController.removeError('form_nic_monument');
});

$("#addPark_close").click(function(){
	$('#nic_parkForm').trigger('reset');
	window.depUtlityController.removeError('nic_parkForm');
});

$("#updatePark_close").click(function(){
	$('#form_nicUpdateParks').trigger('reset');
	window.depUtlityController.removeError('form_nicUpdateParks');
});

function resetForm(formId){
	$('#'+formId).trigger('reset');
	window.depUtlityController.removeError(formId);
}
$(window).on('load resize', function () {
});	