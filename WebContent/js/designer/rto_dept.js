var rto_data = "RTO";
var current_tab = rto_data;
var table;

function getRtoData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_rto_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: rto_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_rto_table');
	setTimeout(function(){ 
		$('.dataTables_wrapper').resize();
	}, 500);
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
	
	
	/*Multi step end*/
	
});
$(window).on("load", function(){
	$(".loader").fadeOut(1000);
	window.depUtlityController.headerDrop();
	
	window.depUtlityController.getLayers('add_data_category');
	window.depUtlityController.getWardList('rto_ward');
	window.depUtlityController.getWardList('rtoUp_ward');
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_rto_table');
	
	$('form[id="form_addRto"]')
	.validate(
			{
				rules : {
					rto_latitude : "required",
					rto_longitude : "required",
					rto_address : "required",
					rto_geoTaggedPhoto : "required"
				
				},
				messages : {

					rto_latitude : {
						required : "Please Enter Latitude"
					},
					rto_longitude : {
						required : "Please Enter Longitude"
					},
					
					rto_address : {
						required : "Please Enter RTO Address"
					},
					rto_geoTaggedPhoto  : {
						required : "Please Choose File"
					}
					
				},
				
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_no = $('#rto_ward').val(); 
						//let zone_id = $('#rto_zone').val();
						let latitude = $('#rto_latitude').val();
						let longitude = $('#rto_longitude').val();
						let regional_transportation_office = $('#rto_regionalTransportOffice').val();
						let regional_transportation_officer_s_no = $('#rto_regionalTransportOfficersNo').val();
						let no_of_officers = $('#rto_noOfOfficers').val();
						let no_of_pending_cases = $('#rto_noOfPendingCases').val();
						let address =  $('#rto_address').val();
						let regional_transportation_officer_s_name =  $('#rto_regionalTransportOfficersName').val();
						let sector_no = $('#rto_sectorNo').val();
						let permits_for_taxies = $('#rto_permitsForTaxis').val();
						let phone_number = $('#rto_phoneNo').val();
						let survey_no = $('#rto_surveyNo').val();
						let built_up_area = $('#rto_builtUpArea').val();
						//let no_of_pending_cases = $('#rto_noOfFloors').val();
						//let rto_typeOfConstruction = $('#rto_typeOfConstruction').val();
						let building_condition = $('#rto_buildingCondition').val();
						let issues_registration_certificate = $("input[name='rto_issuesRegistrationCertificate']:checked").val();
						let conduct_driving_test = $("input[name='rto_conductDrivingTest']:checked").val();
						let certificate_of_fitness_to_commercial_vehicles = $("input[name='rto_certificateOfFitnessToCommercialVehicles']:checked").val();
						let road_safety_measures = $('#rto_roadSafetyMeasures').val();
						let issues_learner_s_license = $("input[name='rto_issuesLearnersLicense']:checked").val();
						let issue_badges_to_public_transport_drivers = $("input[name='rto_issueBadgesToPublicTransportDrivers']:checked").val();
						let issue_new_duplicate_or_updated_registration_copy = $("input[name='rto_issueNewDuplicateUpdatedRegistrationCopy']:checked").val();
						let pollution_control_measures =  $('#rto_pollutionControlMeasures').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === 'RTO'){
								return e;
							}
						});
						
						let data = {
								ward_no : ward_no ,														
								latitude :latitude , 	                                                     
								longitude :longitude,                                                     
								regional_transportation_office  : regional_transportation_office,                                 
								regional_transportation_officer_s_no :regional_transportation_officer_s_no,                            
								no_of_officers  :no_of_officers,                                                
								no_of_pending_cases :no_of_pending_cases,                                             
								address :address,                                                         
								regional_transportation_officer_s_name :regional_transportation_officer_s_name,			                 
								sector_no :sector_no,										                 
								permits_for_taxies :permits_for_taxies,								                 
								phone_number :phone_number,								                 
								survey_no :survey_no,										                 
								built_up_area :built_up_area,									                 
								//no_of_pending_cases :no_of_pending_cases,							                 
								building_condition 	:building_condition,							                 
								issues_registration_certificate	:issues_registration_certificate,			 	                 
								conduct_driving_test :conduct_driving_test,							                 
								certificate_of_fitness_to_commercial_vehicles :certificate_of_fitness_to_commercial_vehicles,	                 
								road_safety_measures :road_safety_measures,							                 
								issues_learner_s_license:issues_learner_s_license,					                 
								issue_badges_to_public_transport_drivers:issue_badges_to_public_transport_drivers,
								pollution_control_measures:pollution_control_measures
								 };
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#rto_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#rto_geoTaggedPhoto')[0].files,1);
						if(inValidFile){
							$('#rto_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_updateLibrary").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.rto_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.rto_longitude = "Please enter Longitude";
						}
						
						if(!address || address === null || address === ""){
							errorObj1.rto_address = "Please enter Library Address";
						}
						if(!files){
							errorObj1.rto_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getRtoData();
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});

	/*For Update Model*/
	
	$('form[id="form_updateRto"]')
	.validate(
			{ 
				rules : {
					rtoUp_latitude : "required",
					rtoUp_longitude : "required",
					rtoUp_address : "required",
					rtoUp_geoTaggedPhoto : "required"
			
			},
			messages : {

				rtoUp_latitude : {
					required : "Please Enter Latitude"
				},
				rtoUp_longitude : {
					required : "Please Enter Longitude"
				},
				
				rtoUp_address : {
					required : "Please Enter RTO Address"
				},
				rtoUp_geoTaggedPhoto  : {
					required : "Please Choose File"
				}
				
			},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#rtoUp_rtoId').val();
						let ward_no = $('#rtoUp_ward').val();
						let	latitude =$('#rtoUp_latitude').val();
						let	longitude=$('#rtoUp_longitude').val();
						let	built_up_area =	$('#rtoUp_builtUpArea').val();
						let	address	=$('#rtoUp_address').val();
						let	survey_no =$('#rtoUp_surveyNo').val();
						let	regional_transportation_office =$('#rtoUp_regionalTransportOffice').val();
						let	sector_no =	$('#rtoUp_sectorNo').val();
						let	regional_transportation_officer_s_name =$('#rtoUp_regionalTransportOfficersName').val();
						let	regional_transportation_officer_s_no=$('#rtoUp_regionalTransportOfficersNo').val();
						let	no_of_officers	=$('#rtoUp_noOfOfficers').val();
						let	no_of_pending_cases	=$('#rtoUp_noOfPendingCases').val();
						let	issues_registration_certificate=$("input[name='rtoUp_issuesRegistrationCertificate']:checked").val();
						let	issues_learner_s_license=$("input[name='rtoUp_issuesLearnersLicense']:checked").val();
						let	conduct_driving_test=$("input[name='rtoUp_conductDrivingTest']:checked").val();
						let	issue_badges_to_public_transport_drivers=$("input[name='rtoUp_issueBadgesToPublicTransportDrivers']:checked").val();
						let	permits_for_taxies=	$('#rtoUp_permitsForTaxis').val();
						let	certificate_of_fitness_to_commercial_vehicles=$("input[name='rtoUp_certificateOfFitnessToCommercialVehicles']:checked").val();
						let	issue_new__duplicate_or_updated_registration_copy=$("input[name='rtoUp_issueNewDuplicateUpdatedRegistrationCopy']:checked").val();
						let	road_safety_measures=$('#rtoUp_roadSafetyMeasures').val();
						let pollution_control_measures=$('#rtoUp_pollutionControlMeasures').val();
						let	phone_number=$('#rtoUp_phoneNo').val();
						let	building_condition=$('#rtoUp_buildingCondition').val();

						let sub_layer_id = $('#rtoUp_subLayerId').val();
						let data = {ward_no : ward_no ,														
								latitude :latitude , 	                                                     
								longitude :longitude,                                                     
								regional_transportation_office  : regional_transportation_office,                                 
								regional_transportation_officer_s_no :regional_transportation_officer_s_no,                            
								no_of_officers  :no_of_officers,                                                
								no_of_pending_cases :no_of_pending_cases,                                             
								address :address,                                                         
								regional_transportation_officer_s_name :regional_transportation_officer_s_name,			                 
								sector_no :sector_no,										                 
								permits_for_taxies :permits_for_taxies,								                 
								phone_number :phone_number,								                 
								survey_no :survey_no,										                 
								built_up_area :built_up_area,									                 
								//no_of_pending_cases :no_of_pending_cases,							                 
								building_condition 	:building_condition,							                 
								issues_registration_certificate	:issues_registration_certificate,			 	                 
								conduct_driving_test :conduct_driving_test,							                 
								certificate_of_fitness_to_commercial_vehicles :certificate_of_fitness_to_commercial_vehicles,	                 
								road_safety_measures :road_safety_measures,							                 
								issues_learner_s_license:issues_learner_s_license,					                 
								issue_badges_to_public_transport_drivers:issue_badges_to_public_transport_drivers,
								pollution_control_measures:pollution_control_measures };
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#rtoUp_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#rtoUp_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#rtoUp_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_updateLibrary").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.rtoUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.rtoUp_longitude = "Please enter Longitude";
						}
						
						if(!address || address === null || address === ""){
							errorObj1.rtoUp_address = "Please enter Library Address";
						}
						if(!files){
							errorObj1.rtoUp_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files,'geo_tagged_photo');
						getRtoData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
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
		getRtoData();
		
 	}else{
 		 return false;
 	}
}
function updateRto(event){
	let row = $(event.currentTarget).data('row');
	
	$('#rtoUp_rtoId').val(row.id);
	
	$('#rtoUp_ward').val(row.data.ward_no);
	$('#rtoUp_latitude').val(row.data.latitude);
	$('#rtoUp_longitude').val(row.data.longitude);
	$('#rtoUp_builtUpArea').val(row.data.built_up_area);
	$('#rtoUp_address').val(row.data.address);
	$('#rtoUp_surveyNo').val(row.data.survey_no);
	$('#rtoUp_regionalTransportOffice').val(row.data.regional_transportation_office);
	$('#rtoUp_sectorNo').val(row.data.sector_no);
	$('#rtoUp_regionalTransportOfficersName').val(row.data.regional_transportation_officer_s_name);
	$('#rtoUp_regionalTransportOfficersNo').val(row.data.regional_transportation_officer_s_no);
	$('#rtoUp_noOfOfficers').val(row.data.no_of_officers);
	$('#rtoUp_noOfPendingCases').val(row.data.no_of_pending_cases);
	//$('rtoUp_issuesRegistrationCertificate').val(row.data.issues_registration_certificate);
	//$("input[name='rtoUp_issuesRegistrationCertificate']:checked").val(row.data.issues_registration_certificate);
	
	if(row.data.issues_registration_certificate ==true)
	{
	$('input:radio[name="rtoUp_issuesRegistrationCertificate"][value=true]').prop('checked', true);
	}
	else
	{
	$('input:radio[name="rtoUp_issuesRegistrationCertificate"][value=false]').prop('checked', true);
	}
	//$('#rtoUp_issuesLearnersLicense').val(row.data.issues_learner_s_license);
	
	if(row.data.issues_learner_s_license ==true)
		{
	$('input:radio[name="rtoUp_issuesLearnersLicense"][value=true]').prop('checked', true);
		}
	else
		{
	$('input:radio[name="rtoUp_issuesLearnersLicense"][value=false]').prop('checked', true);
		}
	if(row.data.conduct_driving_test ==true)
		{
		$('input:radio[name="rtoUp_conductDrivingTest"][value=true]').prop('checked', true);
		}
	else
		{
		$('input:radio[name="rtoUp_conductDrivingTest"][value=false]').prop('checked', true);
		}
	// $("form input:[name=gender]").filter('[value=Male]').attr('checked', true);
	//$('#rtoUp_issueBadgesToPublicTransportDrivers').val(row.data.issue_badges_to_public_transport_drivers);
	
	
	if(row.data.issue_badges_to_public_transport_drivers ==true)
	{
	$('input:radio[name="rtoUp_issueBadgesToPublicTransportDrivers"][value=true]').prop('checked', true);
	}
	else
	{
	$('input:radio[name="rtoUp_issueBadgesToPublicTransportDrivers"][value=false]').prop('checked', true);
	}
	$('#rtoUp_permitsForTaxis').val(row.data.permits_for_taxies);
	//$('#rtoUp_certificateOfFitnessToCommercialVehicles').val(row.data.certificate_of_fitness_to_commercial_vehicles);
	
	if(row.data.certificate_of_fitness_to_commercial_vehicles == true)
	{
	$('input:radio[name="rtoUp_certificateOfFitnessToCommercialVehicles"][value=true]').prop('checked', true);
	}
	else
	{
	$('input:radio[name="rtoUp_certificateOfFitnessToCommercialVehicles"][value=false]').prop('checked', true);
	}
	//$('#rtoUp_issueNewDuplicateUpdatedRegistrationCopy').val(row.data.issue_new__duplicate_or_updated_registration_copy);
	
	
	if(row.data.issue_new__duplicate_or_updated_registration_copy ==true)
	{
	$('input:radio[name="rtoUp_issueNewDuplicateUpdatedRegistrationCopy"][value=true]').prop('checked', true);
	}
	else
	{
	$('input:radio[name="rtoUp_issueNewDuplicateUpdatedRegistrationCopy"][value=false]').prop('checked', true);
	}
	$('#rtoUp_roadSafetyMeasures').val(row.data.road_safety_measures);
	$('#rtoUp_pollutionControlMeasures').val(row.data.pollution_control_measures);
	$('#rtoUp_phoneNo').val(row.data.phone_number);
	$('#rtoUp_buildingCondition').val(row.data.building_condition);

	$('#rtoUp_subLayerId').val(row.sub_layer_id);
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
							(current_tab ===rto_data ?
							" data-toggle='modal' data-target='#dep_updateRTO_modal' " +
							" onclick='updateRto(event)'> " 
							:" data-toggle='modal' data-target='#' " +
							" onclick='#'> " )+
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
	dataTable_id = 'dep_rto_table';
	
	if(table != undefined){
		table.destroy();
	}
	$('#'+dataTable_id).empty();
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result, dataTable_id);
	
});
function resetForm(formId){
	$('#'+formId).trigger('reset');
	window.depUtlityController.removeError(formId);
}
$(window).on('load resize', function () {
});	