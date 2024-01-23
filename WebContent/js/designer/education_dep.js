var primarySchool_data = "Primary school";
var secondarySchool_data = "Secondary school";
var university_data = "Colleges and Universities";
var current_tab = primarySchool_data;
var table;

function getPrimaryData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_primary_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: primarySchool_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_primary_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getSecondaryData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_secondary_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: secondarySchool_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_secondary_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
}

function getUniversityData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_university_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: university_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_university_table');
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
	if(current_tab === 'Primary school'){
		dataTable_id = 'dep_primary_table';
	}else if(current_tab === 'Secondary school'){
		dataTable_id = 'dep_secondary_table';
	}else{
		dataTable_id = 'dep_university_table';
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
		if(current_tab === primarySchool_data) {
			getPrimaryData();
		} else if(current_tab === secondarySchool_data) {
			getSecondaryData();
		} else {
			getUniversityData();
		}
 	}else{
 		 return false;
 	}
}

function updatePrimarySchool(event){
	let row = $(event.currentTarget).data('row');
	
	$('#primaryUp_primarySchoolId').val(row.id);
	
	$('#primaryUp_ward').val(row.data.ward_no);
	$('#primaryUp_schoolName').val(row.data.school_name);
	$('#primaryUp_schoolType').val(row.data.school_type);
	$('#primaryUp_schoolAddress').val(row.data.school_address);
	$('#primaryUp_category').val(row.data.school_category);
	$('#primaryUp_contactNo').val(row.data.phone_no);
	$('#primaryUp_schoolManagement').val(row.data.school_management);
	$('#primaryUp_mediumOfInstruction').val(row.data.medium_of_instruction); 
	$('#primaryUp_noOfSmartClassrooms').val(row.data.number_of_smart_class_rooms);
	$('#primaryUp_library').val(row.data.library);
	$('#primaryUp_YearOfReorganization').val(row.data.year_of_reorganization);
	$('#primaryUp_passingPercentage').val(row.data.passing_percentage);
	$('#primaryUp_playGround').val(row.data.play_ground);
	$('#primaryUp_playGroundAera').val(row.data.play_ground_area);
	$('#primaryUp_principalName').val(row.data.principal_name);
	$('#primaryUp_maleHostel').val(row.data.male_hostel);
	$('#primaryUp_femaleHostel').val(row.data.female_hostel);
	$('#primaryUp_maleToilet').val(row.data.male_toilet);
	$('#primaryUp_femaleToilet').val(row.data.female_toilet);
	$('#primaryUp_noOfStudents').val(row.data.number_of_students);
	$('#primaryUp_categoryWiseStudents').val(row.data.category_wise_students);
	$('#primaryUp_inTakeStudents').val(row.data.in_take_students);
	$('#primaryUp_teachingStaff').val(row.data.teaching_staff);
	$('#primaryUp_nonTeachingStaff').val(row.data.non_teaching_staff);
	$('#primaryUp_staffVacancy').val(row.data.staff_vacancy);
	$('#primaryUp_rteComplaint').val(row.data.rte_complaint);
	$('#primaryUp_rteAct').val(row.data.rti_act);
	$('#primaryUp_rteSdmc').val(row.data.sdmc);
	$('#primaryUp_ger').val(row.data.ger);
	$('#primaryUp_fundingScheme').val(row.data.funding_scheme);
	$('#primaryUp_buildingCondition').val(row.data.condition_of_school);
	$('#primaryUp_typeOfConstruction').val(row.data.type_of_costruction);
	$('#primaryUp_builtUpArea').val(row.data.built_up_area);
	$('#primaryUp_noOfFloors').val(row.data.no_of_floors);
	$('#primaryUp_roadConnectivity').val(row.data.condition_of_road_connectivity_to_school);
	$('#primaryUp_latitude').val(row.data.latitude);
	$('#primaryUp_longitude').val(row.data.longitude);

	$('#primaryUp_subLayerId').val(row.sub_layer_id);
	
	
}


function updateSecondarySchool(event){
	let row = $(event.currentTarget).data('row');

	  $('#secondaryUp_secondarySchoolId').val(row.id);
	  
	  $('#secondaryUp_ward').val(row.data.ward_no);
	  $('#secondaryUp_schoolName').val(row.data.school_name);
	  $('#secondaryUp_schoolType').val(row.data.school_type);
	  $('#secondaryUp_schoolAddress').val(row.data.school_address);
	  $('#secondaryUp_category').val(row.data.school_category);
	  $('#secondaryUp_affiliatedSchools').val(row.data.affiliated_schools);
	  $('#secondaryUp_listOfCourses').val(row.data.list_of_cources);
	  $('#secondaryUp_eligibilityCriteria').val(row.data.eligibility_criteria);
	  $('#secondaryUp_contactNo').val(row.data.phone_no);
	  $('#secondaryUp_schoolManagement').val(row.data.school_management);
	  $('#secondaryUp_mediumOfInstruction').val(row.data.medium_of_instruction);
	  $('#secondaryUp_noOfSmartClassrooms').val(row.data.number_of_smart_class_rooms);
	  $('#secondaryUp_library').val(row.data.library);
	  $('#secondaryUp_YearOfReorganization').val(row.data.year_of_reorganization);
	  $('#secondaryUp_passingPercentage').val(row.data.passing_percentage);
	  $('#secondaryUp_playGround').val(row.data.play_ground);
	  $('#secondaryUp_playGroundAera').val(row.data.play_ground_area);
	  $('#secondaryUp_principalName').val(row.data.principal_name);
	  $('#secondaryUp_maleHostel').val(row.data.male_hostel);
	  $('#secondaryUp_femaleHostel').val(row.data.female_hostel);
	  $('#secondaryUp_maleToilet').val(row.data.male_toilet);
	  $('#secondaryUp_femaleToilet').val(row.data.female_toilet);
	  $('#secondaryUp_noOfStudents').val(row.data.number_of_students);
	  $('#secondaryUp_categoryWiseStudents').val(row.data.category_wise_students);
	  $('#secondaryUp_inTakeStudents').val(row.data.in_take_students);
	  $('#secondaryUp_teachingStaff').val(row.data.teaching_staff);
	  $('#secondaryUp_nonTeachingStaff').val(row.data.non_teaching_staff);
	  $('#secondaryUp_staffVacancy').val(row.data.staff_vacancy);
	  $('#secondaryUp_rteComplaint').val(row.data.rte_complaint);
	  $('#secondaryUp_rteAct').val(row.data.rti_act);
	  $('#secondaryUp_rteSdmc').val(row.data.sdmc);
	  $('#secondaryUp_ger').val(row.data.ger);
	  $('#secondaryUp_fundingScheme').val(row.data.funding_scheme);
	  $('#secondaryUp_buildingCondition').val(row.data.condition_of_school);
	  $('#secondaryUp_typeOfConstruction').val(row.data.type_of_costruction);
	  $('#secondaryUp_builtUpArea').val(row.data.built_up_area);
	  $('#secondaryUp_noOfFloors').val(row.data.no_of_floors);
	  $('#secondaryUp_roadConnectivity').val(row.data.condition_of_road_connectivity_to_school);
	  $('#secondaryUp_latitude').val(row.data.latitude);
	  $('#secondaryUp_longitude').val(row.data.longitude);
	  
	  $('#secondaryUp_subLayerId').val(row.sub_layer_id);
}

function updateUniversity(event){
	let row = $(event.currentTarget).data('row');
	
	  $('#universityUp_universityId').val(row.id);
		
	  $('#universityUp_ward').val(row.data.ward_no);
	  $('#universityUp_name').val(row.data.university_name);
	  $('#universityUp_type').val(row.data.university_type);
	  $('#universityUp_address').val(row.data.university_address);
	  $('#universityUp_category').val(row.data.college_category);
	  $('#universityUp_affiliatedColleges').val(row.data.affiliated_colleges);
	  $('#universityUp_listOfCourses').val(row.data.list_of_cources);
	  $('#universityUp_eligibilityCriteria').val(row.data.eligibility_criteria);
	  $('#universityUp_contactNo').val(row.data.phone_no);
	  $('#universityUp_management').val(row.data.management);
	  $('#universityUp_mediumOfInstruction').val(row.data.medium_of_instruction);
	  $('#universityUp_noOfSmartClassrooms').val(row.data.number_of_smart_class_rooms);
	  $('#universityUp_library').val(row.data.library);
	  $('#universityUp_YearOfReorganization').val(row.data.year_of_reorganization);
	  $('#universityUp_passingPercentage').val(row.data.passing_percentage);
	  $('#universityUp_playGround').val(row.data.play_ground);
	  $('#universityUp_playGroundAera').val(row.data.play_ground_area);
	  $('#universityUp_principalName').val(row.data.principal_name);
	  $('#universityUp_maleHostel').val(row.data.male_hostel);
	  $('#universityUp_femaleHostel').val(row.data.female_hostel);
	  $('#universityUp_maleToilet').val(row.data.male_toilet);
	  $('#universityUp_femaleToilet').val(row.data.female_toilet);
	  $('#universityUp_noOfStudents').val(row.data.number_of_students);
	  $('#universityUp_categoryWiseStudents').val(row.data.category_wise_students);
	  $('#universityUp_inTakeStudents').val(row.data.in_take_students);
	  $('#universityUp_teachingStaff').val(row.data.teaching_staff);
	  $('#universityUp_nonTeachingStaff').val(row.data.non_teaching_staff);
	  $('#universityUp_staffVacancy').val(row.data.staff_vacancy);
	  $('#universityUp_rteComplaint').val(row.data.rte_complaint);
	  $('#universityUp_rteAct').val(row.data.rti_act);
	  $('#universityUp_rteSdmc').val(row.data.sdmc);
	  $('#universityUp_ger').val(row.data.ger);
	  $('#universityUp_fundingScheme').val(row.data.funding_scheme);
	  $('#universityUp_buildingCondition').val(row.data.condition_of_school);
	  $('#universityUp_typeOfConstruction').val(row.data.type_of_costruction);
	  $('#universityUp_builtUpArea').val(row.data.built_up_area);
	  $('#universityUp_noOfFloors').val(row.data.no_of_floors);
	  $('#universityUp_roadConnectivity').val(row.data.condition_of_road_connectivity_to_school);
	  $('#universityUp_latitude').val(row.data.latitude);
	  $('#universityUp_longitude').val(row.data.longitude);
	
	  $('#universityUp_subLayerId').val(row.sub_layer_id);
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
							(current_tab === primarySchool_data ?
							" data-toggle='modal' data-target='#dep_updateprimary_modal' " +
							" onclick='updatePrimarySchool(event)'> " 
							: current_tab === secondarySchool_data ? 
									" data-toggle='modal' data-target='#dep_updatesecondary_modal' " +
									" onclick='updateSecondarySchool(event)'> " 
							:" data-toggle='modal' data-target='#dep_updateuni_modal' " +
								" onclick='updateUniversity(event)'> ")+
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
	
	window.depUtlityController.getWardList('primary_ward');
	window.depUtlityController.getWardList('primaryUp_ward');
	window.depUtlityController.getWardList('secondary_ward');
	window.depUtlityController.getWardList('secondaryUp_ward');
	window.depUtlityController.getWardList('university_ward');
	window.depUtlityController.getWardList('universityUp_ward');
	
	window.depUtlityController.getLayers('add_data_category');
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_primary_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
	
	$('form[id="form_addPrimarySchool"]')
	.validate(
			{
				rules : {
					primary_schoolName : "required",
					primary_latitude : "required",
					primary_longitude : "required",
					primary_YearOfReorganization : "required",
					primary_schoolAddress : "required",
					primary_geoTaggedPhoto : "required"
				},
				messages : {
					primary_schoolName : {
						required : "Please Enter Primary School Name"
					},
					primary_latitude : {
						required : "Please Enter Latitude"
					},
					primary_longitude : {
						required : "Please Enter Longitude"
					},
					primary_YearOfReorganization : {
						required : "Please Enter Year of Reorganization"
					},
					primary_schoolAddress : {
						required : "Please Enter School Address"
					},
					primary_geoTaggedPhoto : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#primary_ward').val();
						let school_name = $('#primary_schoolName').val();
						let school_type = $('#primary_schoolType').val();
						let school_address = $('#primary_schoolAddress').val();
						let school_category = $('#primary_category').val();
						let phone_no = $('#primary_contactNo').val();
						let school_management = $('#primary_schoolManagement').val();
						let medium_of_instruction = $('#primary_mediumOfInstruction').val(); 
						let number_of_smart_class_rooms = $('#primary_noOfSmartClassrooms').val();
						let library = $('#primary_library').val();
						let year_of_reorganization = $('#primary_YearOfReorganization').val();
						let passing_percentage = $('#primary_passingPercentage').val();
						let play_ground = $('#primary_playGround').val();
						let play_ground_area = $('#primary_playGroundAera').val();
						let principal_name = $('#primary_principalName').val();
						let male_hostel = $('#primary_maleHostel').val();
						let female_hostel = $('#primary_femaleHostel').val();
						let male_toilet = $('#primary_maleToilet').val();
						let female_toilet = $('#primary_femaleToilet').val();
						let number_of_students = $('#primary_noOfStudents').val();
						let category_wise_students = $('#primary_categoryWiseStudents').val();
						let in_take_students = $('#primary_inTakeStudents').val();
						let teaching_staff = $('#primary_teachingStaff').val();
						let non_teaching_staff = $('#primary_nonTeachingStaff').val();
						let staff_vacancy = $('#primary_staffVacancy').val();
						let rte_complaint = $('#primary_rteComplaint').val();
						let rti_act = $('#primary_rteAct').val();
						let sdmc = $('#primary_rteSdmc').val();
						let ger = $('#primary_ger').val();
						let funding_scheme = $('#primary_fundingScheme').val();
						let condition_of_school = $('#primary_buildingCondition').val();
						let type_of_costruction = $('#primary_typeOfConstruction').val();
						let built_up_area = $('#primary_builtUpArea').val();
						let no_of_floors = $('#primary_noOfFloors').val();
						let condition_of_road_connectivity_to_school = $('#primary_roadConnectivity').val();
						let latitude = $('#primary_latitude').val();
						let longitude = $('#primary_longitude').val();

						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === primarySchool_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,school_name:school_name,school_type:school_type
								,school_address:school_address,school_category:school_category
								,phone_no:phone_no,school_management:school_management
								,medium_of_instruction:medium_of_instruction
								,number_of_smart_class_rooms:number_of_smart_class_rooms
								,library:library,year_of_reorganization:year_of_reorganization
								,passing_percentage:passing_percentage
								,play_ground:play_ground,play_ground_area:play_ground_area
								,principal_name:principal_name
								,male_hostel:male_hostel,female_hostel:female_hostel
								,male_toilet:male_toilet,female_toilet:female_toilet
								,number_of_students:number_of_students
								,category_wise_students:category_wise_students
								,in_take_students:in_take_students
								,teaching_staff:teaching_staff,non_teaching_staff:non_teaching_staff
								,staff_vacancy:staff_vacancy,rte_complaint:rte_complaint
								,rti_act:rti_act,sdmc:sdmc
								,ger:ger,funding_scheme:funding_scheme
								,condition_of_school:condition_of_school
								,type_of_costruction:type_of_costruction
								,built_up_area:built_up_area,no_of_floors:no_of_floors
								,condition_of_road_connectivity_to_school:condition_of_road_connectivity_to_school
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#primary_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#primary_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#primary_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_addPrimarySchool").validate();
						let errorObj = {};
						if(!school_name || school_name === null || school_name === ""){
							errorObj.primary_schoolName = "Please enter primary School Name"
						}						
						if(!latitude || latitude === null){
							errorObj.primary_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.primary_longitude = "Please enter Longitude";
						}
						
						if(!year_of_reorganization || year_of_reorganization === null || year_of_reorganization === ""){
							errorObj.primary_YearOfReorganization = "Please enter year of Reorganization"
						}
						
						if(!school_address || school_address === null || school_address === ""){
							errorObj.primary_schoolAddress = "Please enter School Address"
						}
						if(!files){
							errorObj.primary_geoTaggedPhoto ="Please choose file"
						}					
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						
						window.depUtlityController.addData(obj, files);
						getPrimaryData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
	$('form[id="form_updatePrimarySchool"]')
	.validate(
			{
				rules : {
					primaryUp_schoolName : "required",
					primaryUp_latitude : "required",
					primaryUp_longitude : "required",
					primaryUp_YearOfReorganization : "required",
					primaryUp_schoolAddress : "required",
					primaryUp_geoTaggedPhoto : "required"
				},
				messages : {
					primaryUp_schoolName : {
						required : "Please Enter Primary School Name"
					},
					primaryUp_latitude : {
						required : "Please Enter Latitude"
					},
					primaryUp_longitude : {
						required : "Please Enter Longitude"
					},
					primaryUp_YearOfReorganization : {
						required : "Please Enter Year of Reorganization"
					},
					primaryUp_schoolAddress : {
						required : "Please Enter School Address"
					},
					primaryUp_geoTaggedPhoto : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let layer_id = $('#primaryUp_primarySchoolId').val();
						let ward_no = $('#primaryUp_ward').val();
						let school_name = $('#primaryUp_schoolName').val();
						let school_type = $('#primaryUp_schoolType').val();
						let school_address = $('#primaryUp_schoolAddress').val();
						let school_category = $('#primaryUp_category').val();
						let phone_no = $('#primaryUp_contactNo').val();
						let school_management = $('#primaryUp_schoolManagement').val();
						let medium_of_instruction = $('#primaryUp_mediumOfInstruction').val(); 
						let number_of_smart_class_rooms = $('#primaryUp_noOfSmartClassrooms').val();
						let library = $('#primaryUp_library').val();
						let year_of_reorganization = $('#primaryUp_YearOfReorganization').val();
						let passing_percentage = $('#primaryUp_passingPercentage').val();
						let play_ground = $('#primaryUp_playGround').val();
						let play_ground_area = $('#primaryUp_playGroundAera').val();
						let principal_name = $('#primaryUp_principalName').val();
						let male_hostel = $('#primaryUp_maleHostel').val();
						let female_hostel = $('#primaryUp_femaleHostel').val();
						let male_toilet = $('#primaryUp_maleToilet').val();
						let female_toilet = $('#primaryUp_femaleToilet').val();
						let number_of_students = $('#primaryUp_noOfStudents').val();
						let category_wise_students = $('#primaryUp_categoryWiseStudents').val();
						let in_take_students = $('#primaryUp_inTakeStudents').val();
						let teaching_staff = $('#primaryUp_teachingStaff').val();
						let non_teaching_staff = $('#primaryUp_nonTeachingStaff').val();
						let staff_vacancy = $('#primaryUp_staffVacancy').val();
						let rte_complaint = $('#primaryUp_rteComplaint').val();
						let rti_act = $('#primaryUp_rteAct').val();
						let sdmc = $('#primaryUp_rteSdmc').val();
						let ger = $('#primaryUp_ger').val();
						let funding_scheme = $('#primaryUp_fundingScheme').val();
						let condition_of_school = $('#primaryUp_buildingCondition').val();
						let type_of_costruction = $('#primaryUp_typeOfConstruction').val();
						let built_up_area = $('#primaryUp_builtUpArea').val();
						let no_of_floors = $('#primaryUp_noOfFloors').val();
						let condition_of_road_connectivity_to_school = $('#primaryUp_roadConnectivity').val();
						let latitude = $('#primaryUp_latitude').val();
						let longitude = $('#primaryUp_longitude').val();

						
						let sub_layer_id = $('#primaryUp_subLayerId').val();
						
						let data = {ward_no:ward_no,school_name:school_name,school_type:school_type
								,school_address:school_address,school_category:school_category
								,phone_no:phone_no,school_management:school_management
								,medium_of_instruction:medium_of_instruction
								,number_of_smart_class_rooms:number_of_smart_class_rooms
								,library:library,year_of_reorganization:year_of_reorganization
								,passing_percentage:passing_percentage
								,play_ground:play_ground,play_ground_area:play_ground_area
								,principal_name:principal_name
								,male_hostel:male_hostel,female_hostel:female_hostel
								,male_toilet:male_toilet,female_toilet:female_toilet
								,number_of_students:number_of_students
								,category_wise_students:category_wise_students
								,in_take_students:in_take_students
								,teaching_staff:teaching_staff,non_teaching_staff:non_teaching_staff
								,staff_vacancy:staff_vacancy,rte_complaint:rte_complaint
								,rti_act:rti_act,sdmc:sdmc
								,ger:ger,funding_scheme:funding_scheme
								,condition_of_school:condition_of_school
								,type_of_costruction:type_of_costruction
								,built_up_area:built_up_area,no_of_floors:no_of_floors
								,condition_of_road_connectivity_to_school:condition_of_road_connectivity_to_school
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id: layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#primaryUp_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#primaryUp_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#primaryUp_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_updatePrimarySchool").validate();
						let errorObj = {};
						if(!school_name || school_name === null || school_name === ""){
							errorObj.primaryUp_schoolName = "Please enter primary School Name"
						}						
						if(!latitude || latitude === null){
							errorObj.primaryUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.primaryUp_longitude = "Please enter Longitude";
						}
						
						if(!year_of_reorganization || year_of_reorganization === null || year_of_reorganization === ""){
							errorObj.primaryUp_YearOfReorganization = "Please enter year of Reorganization"
						}
						
						if(!school_address || school_address === null || school_address === ""){
							errorObj.primaryUp_schoolAddress = "Please enter School Address"
						}
						if(!files){
							errorObj.primaryUp_geoTaggedPhoto ="Please choose file"
						}					
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getPrimaryData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	$('form[id="form_addSecondarySchool"]')
	.validate(
			{
				rules : {
					secondary_schoolName : "required",
					secondary_latitude : "required",
					secondary_longitude : "required",
					secondary_YearOfReorganization : "required",
					secondary_schoolAddress : "required",
					secondary_geoTaggedPhoto : "required"
				},
				messages : {

					secondary_schoolName : {
						required : "Please Enter Secondary School Name"
					},
					secondary_latitude : {
						required : "Please Enter Latitude"
					},
					secondary_longitude : {
						required : "Please Enter Longitude"
					},
					secondary_YearOfReorganization : {
						required : "Please Enter Year of Reorganization"
					},
					secondary_schoolAddress : {
						required : "Please Enter School Address"
					},
					secondary_geoTaggedPhoto : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#secondary_ward').val();
						let school_name = $('#secondary_schoolName').val();
						let school_type = $('#secondary_schoolType').val();
						let school_address = $('#secondary_schoolAddress').val();
						let school_category = $('#secondary_category').val();
						let affiliated_schools = $('#secondary_affiliatedSchools').val();
						let list_of_cources = $('#secondary_listOfCourses').val();
						let eligibility_criteria = $('#secondary_eligibilityCriteria').val();
						let phone_no = $('#secondary_contactNo').val();
						let school_management = $('#secondary_schoolManagement').val();
						let medium_of_instruction = $('#secondary_mediumOfInstruction').val();
						let number_of_smart_class_rooms = $('#secondary_noOfSmartClassrooms').val();
						let library = $('#secondary_library').val();
						let year_of_reorganization = $('#secondary_YearOfReorganization').val();
						let passing_percentage = $('#secondary_passingPercentage').val();
						let play_ground = $('#secondary_playGround').val();
						let play_ground_area = $('#secondary_playGroundAera').val();
						let principal_name = $('#secondary_principalName').val();
						let male_hostel = $('#secondary_maleHostel').val();
						let female_hostel = $('#secondary_femaleHostel').val();
						let male_toilet = $('#secondary_maleToilet').val();
						let female_toilet = $('#secondary_femaleToilet').val();
						let number_of_students = $('#secondary_noOfStudents').val();
						let category_wise_students = $('#secondary_categoryWiseStudents').val();
						let in_take_students = $('#secondary_inTakeStudents').val();
						let teaching_staff = $('#secondary_teachingStaff').val();
						let non_teaching_staff = $('#secondary_nonTeachingStaff').val();
						let staff_vacancy = $('#secondary_staffVacancy').val();
						let rte_complaint = $('#secondary_rteComplaint').val();
						let rti_act = $('#secondary_rteAct').val();
						let sdmc = $('#secondary_rteSdmc').val();
						let ger = $('#secondary_ger').val();
						let funding_scheme = $('#secondary_fundingScheme').val();
						let condition_of_school = $('#secondary_buildingCondition').val();
						let type_of_costruction = $('#secondary_typeOfConstruction').val();
						let built_up_area = $('#secondary_builtUpArea').val();
						let no_of_floors = $('#secondary_noOfFloors').val();
						let condition_of_road_connectivity_to_school = $('#secondary_roadConnectivity').val();
						let latitude = $('#secondary_latitude').val();
						let longitude = $('#secondary_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === secondarySchool_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,school_name:school_name,school_type:school_type
								,school_address:school_address,school_category:school_category
								,affiliated_schools:affiliated_schools,list_of_cources:list_of_cources
								,eligibility_criteria:eligibility_criteria,phone_no:phone_no
								,school_management:school_management,medium_of_instruction:medium_of_instruction
								,number_of_smart_class_rooms:number_of_smart_class_rooms,library:library
								,year_of_reorganization:year_of_reorganization
								,passing_percentage:passing_percentage,play_ground:play_ground
								,play_ground_area:play_ground_area,principal_name:principal_name
								,male_hostel:male_hostel,female_hostel:female_hostel
								,male_toilet:male_toilet,female_toilet:female_toilet
								,number_of_students:number_of_students,category_wise_students:category_wise_students
								,in_take_students:in_take_students,teaching_staff:teaching_staff
								,non_teaching_staff:non_teaching_staff,staff_vacancy:staff_vacancy
								,rte_complaint:rte_complaint,rti_act:rti_act
								,sdmc:sdmc,ger:ger,funding_scheme:funding_scheme
								,condition_of_school:condition_of_school,type_of_costruction:type_of_costruction
								,built_up_area:built_up_area,no_of_floors:no_of_floors
								,condition_of_road_connectivity_to_school:condition_of_road_connectivity_to_school
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#secondary_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#secondary_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#secondary_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_addSecondarySchool").validate();
						let errorObj = {};
						if(!school_name || school_name === null || school_name === ""){
							errorObj.secondary_schoolName = "Please enter Secondary School Name"
						}
						if(!latitude || latitude === null){
							errorObj.secondary_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.secondary_longitude = "Please enter Longitude";
						}
						
						if(!year_of_reorganization || year_of_reorganization === null || year_of_reorganization === ""){
							errorObj.secondary_YearOfReorganization = "Please enter year of Reorganization"
						}
						
						if(!school_address || school_address === null || school_address === ""){
							errorObj.secondary_schoolAddress = "Please enter School Address"
						}
						
						if(!files){
							errorObj.secondary_geoTaggedPhoto = "Please choose file"
						}					
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getSecondaryData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});


	$('form[id="form_updateSecondarySchool"]')
	.validate(
			{
				rules : {
					secondaryUp_schoolName : "required",
					secondaryUp_latitude : "required",
					secondaryUp_longitude : "required",
					secondaryUp_YearOfReorganization : "required",
					secondaryUp_schoolAddress : "required",
					secondaryUp_geoTaggedPhoto : "required"
				},
				messages : {

					secondaryUp_schoolName : {
						required : "Please Enter Secondary School Name"
					},
					secondaryUp_latitude : {
						required : "Please Enter Latitude"
					},
					secondaryUp_longitude : {
						required : "Please Enter Longitude"
					},
					secondaryUp_YearOfReorganization : {
						required : "Please Enter Year of Reorganization"
					},
					secondaryUp_schoolAddress : {
						required : "Please Enter School Address"
					},
					secondaryUp_geoTaggedPhoto : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let layer_id = $('#secondaryUp_secondarySchoolId').val();
						let ward_no = $('#secondaryUp_ward').val();
						let school_name = $('#secondaryUp_schoolName').val();
						let school_type = $('#secondaryUp_schoolType').val();
						let school_address = $('#secondaryUp_schoolAddress').val();
						let school_category = $('#secondaryUp_category').val();
						let affiliated_schools = $('#secondaryUp_affiliatedSchools').val();
						let list_of_cources = $('#secondaryUp_listOfCourses').val();
						let eligibility_criteria = $('#secondaryUp_eligibilityCriteria').val();
						let phone_no = $('#secondaryUp_contactNo').val();
						let school_management = $('#secondaryUp_schoolManagement').val();
						let medium_of_instruction = $('#secondaryUp_mediumOfInstruction').val();
						let number_of_smart_class_rooms = $('#secondaryUp_noOfSmartClassrooms').val();
						let library = $('#secondaryUp_library').val();
						let year_of_reorganization = $('#secondaryUp_YearOfReorganization').val();
						let passing_percentage = $('#secondaryUp_passingPercentage').val();
						let play_ground = $('#secondaryUp_playGround').val();
						let play_ground_area = $('#secondaryUp_playGroundAera').val();
						let principal_name = $('#secondaryUp_principalName').val();
						let male_hostel = $('#secondaryUp_maleHostel').val();
						let female_hostel = $('#secondaryUp_femaleHostel').val();
						let male_toilet = $('#secondaryUp_maleToilet').val();
						let female_toilet = $('#secondaryUp_femaleToilet').val();
						let number_of_students = $('#secondaryUp_noOfStudents').val();
						let category_wise_students = $('#secondaryUp_categoryWiseStudents').val();
						let in_take_students = $('#secondaryUp_inTakeStudents').val();
						let teaching_staff = $('#secondaryUp_teachingStaff').val();
						let non_teaching_staff = $('#secondaryUp_nonTeachingStaff').val();
						let staff_vacancy = $('#secondaryUp_staffVacancy').val();
						let rte_complaint = $('#secondaryUp_rteComplaint').val();
						let rti_act = $('#secondaryUp_rteAct').val();
						let sdmc = $('#secondaryUp_rteSdmc').val();
						let ger = $('#secondaryUp_ger').val();
						let funding_scheme = $('#secondaryUp_fundingScheme').val();
						let condition_of_school = $('#secondaryUp_buildingCondition').val();
						let type_of_costruction = $('#secondaryUp_typeOfConstruction').val();
						let built_up_area = $('#secondaryUp_builtUpArea').val();
						let no_of_floors = $('#secondaryUp_noOfFloors').val();
						let condition_of_road_connectivity_to_school = $('#secondaryUp_roadConnectivity').val();
						let latitude = $('#secondaryUp_latitude').val();
						let longitude = $('#secondaryUp_longitude').val();
						
						let sub_layer_id = $('#secondaryUp_subLayerId').val();
						
						let data = {ward_no:ward_no,school_name:school_name,school_type:school_type
								,school_address:school_address,school_category:school_category
								,affiliated_schools:affiliated_schools,list_of_cources:list_of_cources
								,eligibility_criteria:eligibility_criteria,phone_no:phone_no
								,school_management:school_management,medium_of_instruction:medium_of_instruction
								,number_of_smart_class_rooms:number_of_smart_class_rooms,library:library
								,year_of_reorganization:year_of_reorganization
								,passing_percentage:passing_percentage,play_ground:play_ground
								,play_ground_area:play_ground_area,principal_name:principal_name
								,male_hostel:male_hostel,female_hostel:female_hostel
								,male_toilet:male_toilet,female_toilet:female_toilet
								,number_of_students:number_of_students,category_wise_students:category_wise_students
								,in_take_students:in_take_students,teaching_staff:teaching_staff
								,non_teaching_staff:non_teaching_staff,staff_vacancy:staff_vacancy
								,rte_complaint:rte_complaint,rti_act:rti_act
								,sdmc:sdmc,ger:ger,funding_scheme:funding_scheme
								,condition_of_school:condition_of_school,type_of_costruction:type_of_costruction
								,built_up_area:built_up_area,no_of_floors:no_of_floors
								,condition_of_road_connectivity_to_school:condition_of_road_connectivity_to_school
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#secondaryUp_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#secondaryUp_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#secondaryUp_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_updateSecondarySchool").validate();
						let errorObj = {};
						if(!school_name || school_name === null || school_name === ""){
							errorObj.secondaryUp_schoolName = "Please enter Secondary School Name"
						}
						if(!latitude || latitude === null){
							errorObj.secondaryUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.secondaryUp_longitude = "Please enter Longitude";
						}
						
						if(!year_of_reorganization || year_of_reorganization === null || year_of_reorganization === ""){
							errorObj.secondaryUp_YearOfReorganization = "Please enter year of Reorganization"
						}
						
						if(!school_address || school_address === null || school_address === ""){
							errorObj.secondaryUp_schoolAddress = "Please enter School Address"
						}
						
						if(!files){
							errorObj.secondaryUp_geoTaggedPhoto = "Please choose file"
						}					
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getSecondaryData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});

	
	
	
	$('form[id="form_addUniversity"]')
	.validate(
			{
				rules : {
					university_name : "required",
					university_latitude : "required",
					university_longitude : "required",
					university_YearOfReorganization : "required",
					university_address : "required",
					university_geoTaggedPhoto  : "required"
				},
				messages : {
					university_name : {
						required : "Please Enter University Name"
					},
					university_latitude : {
						required : "Please Enter Latitude"
					},
					university_longitude : {
						required : "Please Enter Longitude"
					},
					university_YearOfReorganization : {
						required : "Please Enter Year of Reorganization"
					},
					university_address : {
						required : "Please Enter University Address"
					},
					university_geoTaggedPhoto  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#university_ward').val();
						let university_name = $('#university_name').val();
						let university_type = $('#university_type').val();
						let university_address = $('#university_address').val();
						let college_category = $('#university_category').val();
						let affiliated_colleges = $('#university_affiliatedColleges').val();
						let list_of_cources = $('#university_listOfCourses').val();
						let eligibility_criteria = $('#university_eligibilityCriteria').val();
						let phone_no = $('#university_contactNo').val();
						let management = $('#university_management').val();
						let medium_of_instruction = $('#university_mediumOfInstruction').val();
						let number_of_smart_class_rooms = $('#university_noOfSmartClassrooms').val();
						let library = $('#university_library').val();
						let year_of_reorganization = $('#university_YearOfReorganization').val();
						let passing_percentage = $('#university_passingPercentage').val();
						let play_ground = $('#university_playGround').val();
						let play_ground_area = $('#university_playGroundAera').val();
						let principal_name = $('#university_principalName').val();
						let male_hostel = $('#university_maleHostel').val();
						let female_hostel = $('#university_femaleHostel').val();
						let male_toilet = $('#university_maleToilet').val();
						let female_toilet = $('#university_femaleToilet').val();
						let number_of_students = $('#university_noOfStudents').val();
						let category_wise_students = $('#university_categoryWiseStudents').val();
						let in_take_students = $('#university_inTakeStudents').val();
						let teaching_staff = $('#university_teachingStaff').val();
						let non_teaching_staff = $('#university_nonTeachingStaff').val();
						let staff_vacancy = $('#university_staffVacancy').val();
						let rte_complaint = $('#university_rteComplaint').val();
						let rti_act = $('#university_rteAct').val();
						let sdmc = $('#university_rteSdmc').val();
						let ger = $('#university_ger').val();
						let funding_scheme = $('#university_fundingScheme').val();
						let condition_of_school = $('#university_buildingCondition').val();
						let type_of_costruction = $('#university_typeOfConstruction').val();
						let built_up_area = $('#university_builtUpArea').val();
						let no_of_floors = $('#university_noOfFloors').val();
						let condition_of_road_connectivity_to_school = $('#university_roadConnectivity').val();
						let latitude = $('#university_latitude').val();
						let longitude = $('#university_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === university_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,university_name:university_name
								,university_type:university_type,university_address:university_address
								,college_category:college_category,affiliated_colleges:affiliated_colleges
								,list_of_cources:list_of_cources,eligibility_criteria:eligibility_criteria
								,phone_no:phone_no,management:management
								,medium_of_instruction:medium_of_instruction
								,number_of_smart_class_rooms:number_of_smart_class_rooms
								,library:library,year_of_reorganization:year_of_reorganization
								,passing_percentage:passing_percentage,play_ground:play_ground
								,play_ground_area:play_ground_area,principal_name:principal_name
								,male_hostel:male_hostel,female_hostel:female_hostel
								,male_toilet:male_toilet,female_toilet:female_toilet
								,number_of_students:number_of_students,category_wise_students:category_wise_students
								,in_take_students:in_take_students,teaching_staff:teaching_staff
								,non_teaching_staff:non_teaching_staff,staff_vacancy:staff_vacancy
								,rte_complaint:rte_complaint,rti_act:rti_act
								,sdmc:sdmc,ger:ger,funding_scheme:funding_scheme
								,condition_of_school:condition_of_school,type_of_costruction:type_of_costruction
								,built_up_area:built_up_area,no_of_floors:no_of_floors
								,condition_of_road_connectivity_to_school:condition_of_road_connectivity_to_school
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#university_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#university_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#university_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_addUniversity").validate();
						let errorObj = {};
						if(!university_name || university_name === null || university_name === ""){
							errorObj.university_name = "Please enter university Name"
						}
						
						if(!latitude || latitude === null){
							errorObj.university_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.university_longitude = "Please enter Longitude";
						}
						
						if(!year_of_reorganization || year_of_reorganization === null || year_of_reorganization === ""){
							errorObj.university_YearOfReorganization = "Please enter year of Reorganization"
						}
						
						if(!university_address || university_address === null || university_address === ""){
							errorObj.university_address = "Please enter university Address"
						}
						
						if(!files){
							errorObj.university_geoTaggedPhoto = "Please choose file"
						}					
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}	
						
						window.depUtlityController.addData(obj, files);
						getUniversityData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateUniversity"]')
	.validate(
			{
				rules : {
					universityUp_name : "required",
					universityUp_latitude : "required",
					universityUp_longitude : "required",
					universityUp_YearOfReorganization : "required",
					universityUp_address : "required",
					universityUp_geoTaggedPhoto  : "required"
				},
				messages : {
					universityUp_name : {
						required : "Please Enter University Name"
					},
					universityUp_latitude : {
						required : "Please Enter Latitude"
					},
					universityUp_longitude : {
						required : "Please Enter Longitude"
					},
					universityUp_YearOfReorganization : {
						required : "Please Enter Year of Reorganization"
					},
					universityUp_address : {
						required : "Please Enter University Address"
					},
					universityUp_geoTaggedPhoto  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = $('#universityUp_universityId').val();
						let ward_no = $('#universityUp_ward').val();
						let university_name = $('#universityUp_name').val();
						let university_type = $('#universityUp_type').val();
						let university_address = $('#universityUp_address').val();
						let college_category = $('#universityUp_category').val();
						let affiliated_colleges = $('#universityUp_affiliatedColleges').val();
						let list_of_cources = $('#universityUp_listOfCourses').val();
						let eligibility_criteria = $('#universityUp_eligibilityCriteria').val();
						let phone_no = $('#universityUp_contactNo').val();
						let management = $('#universityUp_management').val();
						let medium_of_instruction = $('#universityUp_mediumOfInstruction').val();
						let number_of_smart_class_rooms = $('#universityUp_noOfSmartClassrooms').val();
						let library = $('#universityUp_library').val();
						let year_of_reorganization = $('#universityUp_YearOfReorganization').val();
						let passing_percentage = $('#universityUp_passingPercentage').val();
						let play_ground = $('#universityUp_playGround').val();
						let play_ground_area = $('#universityUp_playGroundAera').val();
						let principal_name = $('#universityUp_principalName').val();
						let male_hostel = $('#universityUp_maleHostel').val();
						let female_hostel = $('#universityUp_femaleHostel').val();
						let male_toilet = $('#universityUp_maleToilet').val();
						let female_toilet = $('#universityUp_femaleToilet').val();
						let number_of_students = $('#universityUp_noOfStudents').val();
						let category_wise_students = $('#universityUp_categoryWiseStudents').val();
						let in_take_students = $('#universityUp_inTakeStudents').val();
						let teaching_staff = $('#universityUp_teachingStaff').val();
						let non_teaching_staff = $('#universityUp_nonTeachingStaff').val();
						let staff_vacancy = $('#universityUp_staffVacancy').val();
						let rte_complaint = $('#universityUp_rteComplaint').val();
						let rti_act = $('#universityUp_rteAct').val();
						let sdmc = $('#universityUp_rteSdmc').val();
						let ger = $('#universityUp_ger').val();
						let funding_scheme = $('#universityUp_fundingScheme').val();
						let condition_of_school = $('#universityUp_buildingCondition').val();
						let type_of_costruction = $('#universityUp_typeOfConstruction').val();
						let built_up_area = $('#universityUp_builtUpArea').val();
						let no_of_floors = $('#universityUp_noOfFloors').val();
						let condition_of_road_connectivity_to_school = $('#universityUp_roadConnectivity').val();
						let latitude = $('#universityUp_latitude').val();
						let longitude = $('#universityUp_longitude').val();
						
						let sub_layer_id = $('#universityUp_subLayerId').val();
						
						let data = {ward_no:ward_no,university_name:university_name
								,university_type:university_type,university_address:university_address
								,college_category:college_category,affiliated_colleges:affiliated_colleges
								,list_of_cources:list_of_cources,eligibility_criteria:eligibility_criteria
								,phone_no:phone_no,management:management
								,medium_of_instruction:medium_of_instruction
								,number_of_smart_class_rooms:number_of_smart_class_rooms
								,library:library,year_of_reorganization:year_of_reorganization
								,passing_percentage:passing_percentage,play_ground:play_ground
								,play_ground_area:play_ground_area,principal_name:principal_name
								,male_hostel:male_hostel,female_hostel:female_hostel
								,male_toilet:male_toilet,female_toilet:female_toilet
								,number_of_students:number_of_students,category_wise_students:category_wise_students
								,in_take_students:in_take_students,teaching_staff:teaching_staff
								,non_teaching_staff:non_teaching_staff,staff_vacancy:staff_vacancy
								,rte_complaint:rte_complaint,rti_act:rti_act
								,sdmc:sdmc,ger:ger,funding_scheme:funding_scheme
								,condition_of_school:condition_of_school,type_of_costruction:type_of_costruction
								,built_up_area:built_up_area,no_of_floors:no_of_floors
								,condition_of_road_connectivity_to_school:condition_of_road_connectivity_to_school
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id: layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#universityUp_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#universityUp_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#universityUp_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_updateUniversity").validate();
						let errorObj = {};
						if(!university_name || university_name === null || university_name === ""){
							errorObj.universityUp_name = "Please enter university Name"
						}
						
						if(!latitude || latitude === null){
							errorObj.universityUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.universityUp_longitude = "Please enter Longitude";
						}
						
						if(!year_of_reorganization || year_of_reorganization === null || year_of_reorganization === ""){
							errorObj.universityUp_YearOfReorganization = "Please enter year of Reorganization"
						}
						
						if(!university_address || university_address === null || university_address === ""){
							errorObj.universityUp_address = "Please enter university Address"
						}
						
						if(!files){
							errorObj.universityUp_geoTaggedPhoto = "Please choose file"
						}					
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}	
						
						
						window.depUtlityController.addData(obj, files);
						getUniversityData();
						
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