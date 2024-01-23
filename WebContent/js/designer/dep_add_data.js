
$(document).ready(function(){	
	
	/* Multi step start */
	var current_fs, next_fs, previous_fs; // fieldsets
	var opacity;

	$(".next").click(function(){

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		// Add Class Active
		$("#progressbar li").eq($("fieldset").index(current_fs)).addClass("active");
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("activemain");

		// show the next fieldset
		next_fs.show();
		// hide the current fieldset with style
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
	
		// Remove class active
		$("#progressbar li").eq($("fieldset").index(previous_fs)).removeClass("active");
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("activemain");
		
		// show the previous fieldset
		previous_fs.show();
	
		// hide the current fieldset with style
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
	
	/*
	 * $("#finalSubmit").click(function(){ let value = $("#EmailIDMain").val();
	 * let value1 = $("#EmailIDMain1").val(); let value2 =
	 * $("#EmailIDMain2").val(); alert("Form Value" + value + '1' + value1 +
	 * 'gdg' + value2); })
	 */
	


	/* Multi step end */
	
});

$(window).on("load", function(){

	try {
		window.waterATMData.setRequiredEvent();
	} catch (e) {}
	
	try {
		window.phramaData.setRequiredEvent();
	} catch (e) {}
	
	try {
		window.religiosData.setRequiredEvent();
	} catch (e) {}
	
	try {
		window.vmc_data.setRequiredEvent();
	} catch (e) {
		console.error(e);
	}
	
	try {
		window.shoppingMallData.setRequiredEvent();
	} catch (e) {
		console.error(e);
	}
	
	try {
		window.sports_facility_data.setRequiredEvent();
	} catch (e) {
		// TODO: handle exception
		console.error(e);
	}
	
	try {
		window.smart_pole_data.setRequiredEvent();
	} catch (e) {
		console.error(e);
	}
	
	try {
		window.cctv_locations_data.setRequiredEvent();
	} catch (e) {
		console.error(e);
	}
	
	try {
		window.cinema_hall_data.setRequiredEvent();
	} catch (e) {
		console.error(e);
	}
	
	try {
		window.fire_station_data.setRequiredEvent();
	} catch (e) {
		console.error(e);
	}
	
	try {
		window.blood_banks_data.setRequiredEvent();
	} catch (e) {
		console.error(e);
	}
	
	try {
        window.carScooterRentalData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.culturalFacilityData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.dustbinLocationsData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.electricChargingStationData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.entertainmentFacilityData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.eyeDonationCenterData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.foodZoneData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.milkBoothsData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.oldageHomeData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.utencileBankData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.marketData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.petrolPumpData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.orphanageData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.hotelData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.hostelData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try {
	        window.heritageTourismSitesData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try{
		window.cctv_locations_data.setRequiredEvent();
	} catch (e) {console.error(e);}
	try{
		window.freewifi.setRequiredEvent();
	} catch (e) {console.error(e);}
	try{
		window.govtOfficesData.setRequiredEvent();
	} catch (e) {console.error(e);}
	try{
		window.publicToilet.setRequiredEvent();
	}catch (e) {console.error(e);}
	try {
        window.trafic_square_data.setRequiredEvent();
	} catch (e) {
		console.error(e);
	}
	
	$('form[id="form_addHospital"]')
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
						required : "Please Enter Longitude"
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

						let sub_layer_id = $('#hospital_subLayerId').val();
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
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#hospital_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#hospital_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#hospital_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_addHospital").validate();
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
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	/*FOR NIC ATM MODEL*/
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
						
						let ward_id = $('#atm_ward').val(); 
						let latitude = $('#atm_latitude').val();
						let longitude = $('#atm_longitude').val();
						let atm_name = $('#atm_name').val();
						let atm_type = $('#atm_type').val();
						let address = $('#atm_address').val();
						let phoneNumber = $('#atm_phonenumber').val();
						let sectorNo =  $('#atm_secNo').val();
						let remark =  $('#atm_remark').val();
					
						let sub_layer_id = $('#atm_subLayerId').val();
						let data = {ward_id:ward_id,
								latitude : latitude,longitude:longitude,atm_name:atm_name
								,atm_type:atm_type,address:address,phone_number:phoneNumber,sector_no:sectorNo
								,remarks:remark};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

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
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	/*	For bank model start*/
	
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
						
						let ward_id = $('#bank_ward').val(); 
						let latitude = $('#bank_latitude').val();
						let longitude = $('#bank_longitude').val();
						let bank_name = $('#bank_name').val();
						let bank_type = $('#bank_Type').val();
						let address = $('#bank_address').val();
						let phone_number = $('#bank_phonenumber').val();
						let sector_no =  $('#bank_secNo').val();
						let remarks =  $('#bank_remark').val();
					
						let sub_layer_id = $('#bank_subLayerId').val();
						let data = {ward_id:ward_id,latitude : latitude,longitude:longitude,bank_name:bank_name
								,bank_type:bank_type,address:address,phone_number:phone_number,sector_no:sector_no
								,remarks:remarks};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#bank_images_add')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#bank_images_add')[0].files,1);
						
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
						
						if(inValidFile){
							$('#bank_images_add')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	/*-----  RTO model start------------*/
	/*$('form[id="form_addRto"]')*/
	
	$('form[id="form_addUphc"]')
	.validate(
			{
				rules : {
					uphc_name : "required",
					uphc_latitude : "required",
					uphc_longitude : "required",
					uphc_address : "required",
					uphc_medicalOfficerNo : "required"
						
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
					},
					uphc_medicalOfficerNo : {
						required : "Please Enter Medical Officer Contact Number"
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
						let supervisor_no = $('#hospital_supervisorNo').val();
						let latitude = $('#uphc_latitude').val();
						let longitude = $('#uphc_longitude').val();
						
						let sub_layer_id = $('#uphc_subLayerId').val();
						let data = {ward_no:ward_no,uphc_name:uphc_name,address:address
								,supervisor_name:supervisor_name,medical_officer:medical_officer
								,medical_officer_no:medical_officer_no,slum_population:slum_population
								,ward_wise_population:ward_wise_population,total_population:total_population
								,supervisor_no:supervisor_no,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#uphc_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#uphc_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#uphc_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						
						var validator = $("#form_addUphc").validate();
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
						
						if(!medical_officer_no || medical_officer_no === null || medical_officer_no === ""){
							errorObj.uphc_medicalOfficerNo = "Please enter officer Contact Number"
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

						let sub_layer_id = $('#primary_subLayerId').val();
											
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
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

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
						location.reload(true);
						
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
						
						let sub_layer_id = $('#secondary_subLayerId').val();
						
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
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

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
						location.reload(true);
						
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
						
						let sub_layer_id = $('#university_subLayerId').val();
						
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
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

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
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	


	$('form[id="form_addPoliceChowki"]')
	.validate(
			{
				rules : {
					policeChowki_latitude : "required",
					policeChowki_longitude : "required",
					policeChowki_name : "required",
					policeChowki_address : "required"
				},
				messages : {

					policeChowki_latitude : {
						required : "Please Enter Latitude"
					},
					policeChowki_longitude : {
						required : "Please Enter Longitude"
					},
					policeChowki_name : {
						required : "Please Enter PoliceChowki Name"
					},
					policeChowki_address : {
						required : "Please Enter PoliceChowki Address"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#policeChowki_ward').val();
						let police_station_name = $('#policeChowki_name').val(); 
						let address = $('#policeChowki_address').val();
						let zonal_wise_ps = $('#policeChowki_zonalWisePs').val();
						let police_station_area = $('#policeChowki_area').val();
						let s_p_area = $('#policeChowki_spArea').val();
						let thana_incharge_name = $('#policeChowki_thanaInchargeName').val();
						let thana_incharge_no = $('#policeChowki_thanaInchargeNo').val();
						let thana_incharge_area = $('#policeChowki_thanaInchargeArea').val();
						let no_of_officers = $('#policeChowki_noOfOfficers').val();
						let no_of_cases = $('#policeChowki_noOfCases').val();
						let cctns = $('#policeChowki_cctns').val();
						let phone_number = $('#policeChowki_phoneNo').val();
						let latitude = $('#policeChowki_latitude').val();
						let longitude = $('#policeChowki_longitude').val();
						
						let sub_layer_id = $('#policeChowki_subLayerId').val();
						let data = {ward_no:ward_no,police_station_name:police_station_name
								,address:address,zonal_wise_ps:zonal_wise_ps
								,police_station_area:police_station_area,s_p_area:s_p_area
								,thana_incharge_name:thana_incharge_name
								,thana_incharge_no:thana_incharge_no
								,thana_incharge_area:thana_incharge_area
								,no_of_officers:no_of_officers
								,no_of_cases:no_of_cases,cctns:cctns
								,phone_number:phone_number
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

						var validator = $("#form_addPoliceChowki").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.policeChowki_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.policeChowki_longitude = "Please enter Longitude";
						}
						if(!police_station_name || police_station_name === null || police_station_name === ""){
							errorObj.policeChowki_name = "Please enter PoliceChowki Name";
						}
						if(!address || address === null || address === ""){
							errorObj.policeChowki_address = "Please enter PoliceChowki Address";
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
	
	
	$('form[id="form_addElectricPole"]')
	.validate(
			{
				rules : {
					
					electricPole_latitude : "required",
					electricPole_longitude : "required",
					
				},
				 messages : {
					 electricPole_latitude : {
							required : "Please enter Latitude"
						},
						electricPole_longitude : {
							required : "Please enter Longitude"
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
						
						let sub_layer_id = $("#electricPole_subLayerId").val();
						
						let data = {ward_no:ward_no,paint_code:paint_code
								,height_in_meters:height_in_meters
								,electric_pole_type:electric_pole_type
								,last_maintenance:last_maintenance
								,in_progress:in_progress
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
						required : "Please enter Latitude"
					},
					streetLight_longitude : {
						required : "Please enter Longitude"
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
						
						let sub_layer_id = $('#streetLight_subLayerId').val();
						
						let data = {ward_no:ward_no,street_light_id:street_light_id
								,height_in_meters:height_in_meters
								,street_light_type:street_light_type
								,category:category,watt_s:watt_s
								,last_maintenance:last_maintenance
								,automatic_on_off:automatic_on_off
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
						location.reload(true);
						
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
						required : "Please enter Latitude"
					},
					transformer_longitude : {
						required : "Please enter Longitude"
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
	
	
	
	/*-----  RTO model start------------*/
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
					required : "Please enter Latitude"
				},
				rto_longitude : {
					required : "Please enter Longitude"
				},
				
				rto_address : {
					required : "Please enter Address"
				},
				rto_geoTaggedPhoto  : {
					required : "Please choose file"
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
						var validator = $("#form_addRto").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.rto_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.rto_longitude = "Please enter Longitude";
						}
						
						if(!address || address === null || address === ""){
							errorObj1.rto_address = "Please enter Address";
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
						location.reload(true);
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});

	

	
	
	$('form[id="form_addBusStops"]')
	.validate(
			{
				rules : {
					
					busStops_latitude : "required",
					busStops_longitude : "required",
						
				},
				messages : {
					busStops_latitude : {
						required : "Please enter Latitude"
					},
					busStops_longitude : {
						required : "Please enter Longitude"
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
						let sub_layer_id = $('#busStops_subLayerId').val();
						
						let data = {ward_no:ward_no,land_use_map:land_use_map
								,bus_stops:bus_stops,bus_timings:bus_timings
								,bus_route_number:bus_route_number
								,smart_top_up_cards:smart_top_up_cards
								,smart_bus_stops_list:smart_bus_stops_list
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
	
	
	$('form[id="form_addBusTerminals"]')
	.validate(
			{
				rules : {
					busTerminals_latitude : "required",
					busTerminals_longitude : "required",
				},
				messages : {
					busTerminals_latitude : {
						required : "Please enter Latitude"
					},
					busTerminals_longitude : {
						required : "Please enter Longitude"
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
						
						let sub_layer_id = $('#busTerminals_subLayerId').val();
						
						let data = {ward_no:ward_no,landuse_map:landuse_map
								,bus_terminals:bus_terminals,bus_timings:bus_timings
								,bus_route_number:bus_route_number
								,smart_top_up_cards:smart_top_up_cards
								,smart_bus_stops_list:smart_bus_stops_list
								,arrival_and_departure_timings:arrival_and_departure_timings
								,traffic_squares:traffic_squares
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
						location.reload(true);
						
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
						required : "Please enter Latitude"
					},
					busRoutes_longitude : {
						required : "Please enter Longitude"
					},
					busRoutes_aictslAddress : {
						required : "Please enter Address"
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
	
	
	$('form[id="form_addLibrary"]')
	.validate(
			{
				rules : {
					library_latitude : "required",
					library_longitude : "required",
					library_name : "required",
					library_address : "required",
					library_geoTaggedPhoto : "required"
				},
				messages : {

					library_latitude : {
						required : "Please enter Latitude"
					},
					library_longitude : {
						required : "Please enter Longitude"
					},
					library_name : {
						required : "Please enter Library Name"
					},

					library_address : {
						required : "Please enter Library Address"
					},
					library_geoTaggedPhoto  : {
						required : "Please choose file"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let latitude = $('#library_latitude').val();
						let longitude = $('#library_longitude').val();
						let ward_id = $('#library_ward').val();
						let library_name = $('#library_name').val();
						let facilities = $('#library_facilities').val();
						let book_rental_facility = $('#library_bookRentalFacility').val();
						let address = $('#library_address').val();
						let type_of_libraries = $('#library_typeOfLibraries').val();
						
						let sub_layer_id = $('#library_subLayerId').val();
						
						let data = {latitude:latitude,longitude:longitude
								,ward_id:ward_id,library_name:library_name
								,facilities:facilities,book_rental_facility:book_rental_facility
								,address:address,type_of_libraries:type_of_libraries};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#library_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#library_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#library_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						
						var validator = $("#form_addLibrary").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.library_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.library_longitude = "Please enter Longitude";
						}
						if(!library_name || library_name === null || library_name === ""){
							errorObj1.library_name = "Please enter Library Name";
						}
						if(!address || address === null || address === ""){
							errorObj1.library_address = "Please enter Library Address";
						}
						if(!files){
							errorObj1.library_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_addFlyover"]')
	.validate(
			{
				rules : {
					flyover_latitude : "required",
					flyover_longitude : "required",
					flyover_flyoverName : "required"
				},
				messages : {

					flyover_latitude : {
						required : "Please enter Latitude"
					},
					flyover_longitude : {
						required : "Please enter Longitude"
					},
					flyover_flyoverName : {
						required : "Please enter Flyover Name"
					}					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						
						let ward_no = $('#flyover_ward').val();
						let flyover_name = $('#flyover_flyoverName').val();
						let flyover_type = $('#flyover_type').val();
						let year_of_construction = $('#flyover_yearOfConstruction').val();
						let width = $('#flyover_width').val();
						let approach_length = $('#flyover_approachLength').val();
						let height_depth = $('#flyover_heightDepth').val();
						let resurface_year = $('#flyover_resurfaceYear').val();
						let maintenance_cycle = $('#flyover_maintenanceCycle').val();
						let lane = $('#flyover_lane').val();
						let existing_gate = $('#flyover_existingGate').val();
						let existing_top_surface_of_bridge = $('#flyover_existingTopSurfaceOfBridge').val();
						let lc_no = $('#flyover_lcNo').val();
						let rd_id = $('#flyover_rdId').val();
						let divider = $('#flyover_divider').val();
						let footpath = $('#flyover_footpath').val();
						let footpath_width_m = $('#flyover_footpathWidth').val();
						let construction_year = $('#flyover_constructionYear').val();
						let maintanence_by = $('#flyover_maintenanceBy').val();
						let parking = $('#flyover_parking').val();
						let span = $('#flyover_span').val();
						let foundation = $('#flyover_foundation').val();
						let latitude = $('#flyover_latitude').val();
						let longitude = $('#flyover_longitude').val();
						
						let sub_layer_id = $('#flyover_subLayerId').val();
						
						let data = {ward_no:ward_no,flyover_name:flyover_name
								,flyover_type:flyover_type,year_of_construction:year_of_construction
								,width:width,approach_length:approach_length
								,height_depth:height_depth,resurface_year:resurface_year
								,maintenance_cycle:maintenance_cycle,lane:lane
								,existing_gate:existing_gate,existing_top_surface_of_bridge:existing_top_surface_of_bridge
								,lc_no:lc_no,rd_id:rd_id,divider:divider,footpath:footpath
								,footpath_width_m:footpath_width_m,construction_year:construction_year
								,maintanence_by:maintanence_by,parking:parking,span:span,foundation:foundation
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#library_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#library_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#library_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						
						

						var validator = $("#form_addFlyover").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.flyover_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.flyover_longitude = "Please enter Longitude";
						}
						if(!flyover_name || flyover_name === null || flyover_name === ""){
							errorObj.flyover_flyoverName = "Please enter flyover Name";
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
	

	
	$('form[id="form_addPolicePost"]')
	.validate(
			{
				rules : {
					policePost_latitude : "required",
					policePost_longitude : "required",
					policePost_name : "required",
					policePost_address : "required",
					policePost_geoTaggedPhoto : "required"
				},
				messages : {

					policePost_latitude : {
						required : "Please enter Latitude"
					},
					policePost_longitude : {
						required : "Please enter Longitude"
					},
					policePost_name : {
						required : "Please enter Police Post Name"
					},
					policePost_address : {
						required : "Please enter Police Post Address"
					},
					policePost_geoTaggedPhoto  : {
						required : "Please choose file"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let police_post_name = $('#policePost_name').val();
						let latitude = $('#policePost_latitude').val();
						let longitude = $('#policePost_longitude').val();
						let address = $('#policePost_address').val();
						let ward_id = $('#policePost_ward').val();
						
						let sub_layer_id = $('#policePost_subLayerId').val();
						
						let data = {police_post_name:police_post_name
								,latitude:latitude,longitude:longitude
								,address:address,ward_id:ward_id};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#policePost_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#policePost_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#policePost_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_addPolicePost").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.policePost_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.policePost_longitude = "Please enter Longitude";
						}
						if(!police_post_name || police_post_name === null || police_post_name === ""){
							errorObj.policePost_name = "Please enter Polic Post Name";
						}
						if(!address || address === null || address === ""){
							errorObj.policePost_address = "Please enter Polic Post Address";
						}
						if(!files){
							errorObj.policePost_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}					
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_addRestaurant"]')
	.validate(
			{
				rules : {
					restaurant_latitude : "required",
					restaurant_longitude : "required",
					restaurant_name : "required",
					restaurant_address : "required",
					restaurant_geoTaggedPhoto : "required"
				},
				messages : {

					restaurant_latitude : {
						required : "Please enter Latitude"
					},
					restaurant_longitude : {
						required : "Please enter Longitude"
					},
					restaurant_name : {
						required : "Please enter Restaurant Name"
					},
					restaurant_address : {
						required : "Please enter Restaurant Address"
					},
					restaurant_geoTaggedPhoto  : {
						required : "Please choose file"
					}

				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#restaurant_ward').val();
						let latitude = $('#restaurant_latitude').val();
						let longitude = $('#restaurant_longitude').val();
						let restaurant_name = $('#restaurant_name').val();
						let facilities = $('#restaurant_facilities').val();
						let type_of_restaurant = $('#restaurant_typeOfRestaurant').val();
						let address = $('#restaurant_address').val();
						
						let sub_layer_id = $('#restaurant_subLayerId').val();
						
						let data = {ward_id:ward_id,latitude:latitude,longitude:longitude
								,restaurant_name:restaurant_name,facilities:facilities
								,type_of_restaurant:type_of_restaurant,address:address};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#restaurant_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#restaurant_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#restaurant_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						

						var validator = $("#form_addRestaurant").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.restaurant_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.restaurant_longitude = "Please enter Longitude";
						}
						if(!restaurant_name || restaurant_name === null || restaurant_name === ""){
							errorObj.restaurant_name = "Please enter restaurant Name";
						}
						if(!address || address === null || address === ""){
							errorObj.restaurant_address = "Please enter restaurant Address";
						}
						if(!files){
							errorObj.restaurant_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getRestaurantData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	$('form[id="form_post_office"]')
	.validate(
			{
				rules : {
					longitude : "required",
					latitude : "required",
					postOf_name : "required",
					postOf_address : "required",
					geo_tagged_photo : "required",
				},
				messages : {
					latitude : {
						required : "Please enter Latitude"
					},
					longitude : {
						required : "Please enter Longitude"
					},
					postOf_name : {
						required : "Please enter Post Office Name"
					},
					postOf_address : {
						required : "Please enter Post Office Address"
					},
					geo_tagged_photo  : {
						required : "Please choose file"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#postOf_ward').val(); 
						let latitude = $('#postOf_latitude').val();
						let longitude = $('#postOf_longitude').val();
						let post_office_name =  $('#postOf_name').val();
						let address =  $('#postOf_address').val();
						let type_of_post_office =  $('#postOf_type').val();
						 
						//let remark =  $('#atm_remark').val();
					
						let sub_layer_id = $('#postOf_subLayerId').val();
						let data = {ward_id:ward_id,
							 	latitude:latitude,
							 	longitude:longitude,
							 	post_office_name:post_office_name,
							 	address:address,
							 	type_of_post_office:type_of_post_office
							 	};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#postOf_geo_tagged_photo')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#postOf_geo_tagged_photo')[0].files,1);
						
						if(inValidFile){
							$('#postOf_geo_tagged_photo')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_post_office").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.longitude = "Please enter Longitude";
						}
						if(!post_office_name || post_office_name === null || post_office_name === ""){
							errorObj.postOf_name = "Please enter Post Office Name";
						}
						if(!address || address === null || address === ""){
							errorObj.postOf_address = "Please enter Post Office Address";
						}
						if(!files){
							errorObj.geo_tagged_photo = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
$('form[id="form_public_sc"]')
	.validate(
			{
				rules : {
					latitude: "required",
					longitude: "required",
					pds_name: "required",
					address: "required",
					geo_tagged_photo: "required"
				},
				messages : {
					latitude : {
						required : "Please enter Latitude"
					},
					longitude : {
						required : "Please enter Longitude"
					},
					pds_name : {
						required : "Please enter Name"
					},
					address : {
						required : "Please enter Address"
					},
					geo_tagged_photo  : {
						required : "Please choose file"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#pdsc_ward').val(); 
						let latitude = $('#pdsc_latitude').val();
						let longitude = $('#pdsc_longitude').val();
						let pds_name =  $('#pdsc_name').val();
						let address =  $('#pdsc_address').val();
						let type_of_services =  $('#pdsc_type').val();
						let type_of_subsidary_items =  $('#pdsc_si_type').val();
						//let remark =  $('#atm_remark').val();
					
						let sub_layer_id = $('#pdsc_subLayerId').val();
						let data = {ward_id:ward_id,
							 	latitude:latitude,
							 	longitude:longitude,
							 	pds_name:pds_name,
							 	address:address,
							 	type_of_services:type_of_services,
							 	type_of_subsidary_items:type_of_subsidary_items
							 	};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#pdsc_geo_tagged_photo')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#pdsc_geo_tagged_photo')[0].files,1);
						
						var validator = $("#form_public_sc").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.longitude = "Please enter Longitude";
						}
						if(!pds_name || pds_name === null || pds_name === ""){
							errorObj.pds_name = "Please enter Name";
						}
						if(!address || address === null || address === ""){
							errorObj.address = "Please enter Address";
						}
						if(!files){
							errorObj.geo_tagged_photo = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						
						
						if(inValidFile){
							$('#pdsc_geo_tagged_photo')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});

$('form[id="form_play_ground"]')
	.validate(
			{
				rules : {
					latitude : "required",
					longitude : "required",
					play_ground_name : "required",
					address : "required",
					geo_tagged_photo : "required"
				},
				messages : {
					latitude : {
						required : "Please enter Latitude"
					},
					longitude : {
						required : "Please enter Longitude"
					},
					play_ground_name : {
						required : "Please enter Play Ground Name"
					},
					address : {
						required : "Please enter address"
					},
					geo_tagged_photo : {
						required : "Please choose file"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#playgr_ward').val(); 
						let latitude = $('#playgr_latitude').val();
						let longitude = $('#playgr_longitude').val();
						let play_ground_name =  $('#playgr_name').val();
						let address =  $('#playgr_address').val();
						let type_of_play_ground =  $('#playgr_type').val();
						
					
						let sub_layer_id = $('#playgr_subLayerId').val();
						let data = {ward_id:ward_id,
							 	latitude:latitude,
							 	longitude:longitude,
							 	play_ground_name:play_ground_name,
							 	address:address,
							 	type_of_play_ground:type_of_play_ground
							 	};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#playgr_geo_tagged_photo')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#playgr_geo_tagged_photo')[0].files,1);
						
						if(inValidFile){
							$('#playgr_geo_tagged_photo')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_play_ground").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.longitude = "Please enter Longitude";
						}
						if(!play_ground_name || play_ground_name === null || play_ground_name === ""){
							errorObj.play_ground_name = "Please enter play ground Name";
						}
												
						if(!address || address === null || address === "" ){
							errorObj.address = "Please enter address";
						}
						
						if(!files){
							errorObj.geo_tagged_photo = "Please choose file";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
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
					required : "Please enter Latitude"
				},
				mon_longitude : {
					required : "Please enter Longitude"
				},
				mon_Name : {
					required : "Please enter  Name"
				},

				mon_address : {
					required : "Please enter  Address"
				},
				mon_nicImages  : {
					required : "Please choose file"
				}
				
			},
			submitHandler : function(form, e) {
				e.preventDefault();
				try {
					
					let ward_id = $('#mon_ward').val(); 
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
						if(e.layer_name === 'Monuments'){
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
						errorObj1.mon_Name = "Please enter  Name";
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
					required : "Please enter Latitude"
				},
				museum_longitude : {
					required : "Please enter Longitude"
				},
				museum_Name : {
					required : "Please enter Name"
				},

				museum_address : {
					required : "Please enter  Address"
				},
				museum_nicImages  : {
					required : "Please choose file"
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
						if(e.layer_name === 'Museum'){
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
					required : "Please enter Latitude"
				},
				park_longitude : {
					required : "Please enter Longitude"
				},
				park_Name : {
					required : "Please enter Park Name"
				},
				park_secNo : {
					required : "Please enter Sector Number"
				},
				park_road : {
					required : "Please enter road Name"
				},
				park_nicImages  : {
					required : "Please choose file"
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
					let last_maintenance_date	=	$('#park_lastmain').val().split(' ')[0];
					let no_of_lights			=	$('#park_NoLights').val();
					let contact_no	=$('#park_contactNo').val();
					let sector_no	=$('#park_secNo').val();
					let latitude	=$('#park_latitude').val();
					let longitude	=$('#park_longitude').val();
				
					let sub_layer_id = $('#park_subLayerId').val();
					
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
					let obj = {data: data, sub_layer_id: sub_layer_id, user_id: user_id};

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
					location.reload(true);
					
				} catch (e) {
					console.log(e);
					$u.notify("error", "Error",
							"Something went wrong");
				}
			}
		});
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
					required : "Please enter Latitude"
				},
				manhole_longitude : {
					required : "Please enter Longitude"
				},
				
				manhole_nicImages  : {
					required : "Please choose file"
				}
				
			},
			submitHandler : function(form, e) {
				e.preventDefault();
				try {
					
					//$('#manhole_manholeId').val(row.id);
					//let	manhole_id =$('#manhole_id').val();
					let	ward_no	  =$('#manhole_ward').val();
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
							ward_no	  			: ward_no,
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

});

function resetForm(formId){
	$('#'+formId).trigger('reset');
	window.depUtlityController.removeError(formId);
}

$(window).on('load resize', function () {
});	