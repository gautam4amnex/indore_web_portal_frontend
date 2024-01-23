(function(global, $) {
	"use stricts;"

	var base = {

			getWardList : function getWardList(){
				let result;
				
				$('#ward_select').empty().append(
				'<option value="">Select Ward</option>');
				
				$.ajax({
					method : 'GET',
					url : window.iscdl.appData.baseURL + "citizen/ward/getWardList",
					async : false,
					success : function(result) {
						if (!$.isEmptyObject(result) && result != null) {
							try {
								result = JSON.parse(result);
								let str = "";
								if (result.responseCode == '200') {
									let response = result.data;
									let length = response.length;
									
									if(length > 0){
										for (let i in response){
												let name = response[i].ward_name;
												let id = response[i].ward_no;
												//str += "<option value='" + id + "'>" + name + "</option>";
												str += "<option value='" + id + "'>" + name + "-"  + id +"</option>";
										}
										$('#ward_select').append(str);
									}
								} else {
									$u.notify('error', 'Error',
											result.responseMessage, '');
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							$u.notify('error', 'Notification',
									'Ward data not available', '');
						}
					},
					error : function(e) {
						console.log(e);
					}
				});
			
			},
			getWardInfo : function getWardInfo(ward_no){
				let result;
				
				let wardInfoObj = {
						"ward_no" : ward_no,
				};
				
				let postData = JSON.stringify(wardInfoObj)
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "citizen/ward/getWardById",
					data : postData,
					contentType : 'application/json',
					async : false,
					success : function(result) {
						if (!$.isEmptyObject(result) && result != null) {
							try {
								result = JSON.parse(result);
								
								if(result.responseCode == "200"){
									if(result.data.length > 0){
										let data = result.data[0];
										window.wardInfoController.setWardInfoData(data);
									}else{
										$u.notify('info', 'Notification',
												'No Data available', '');
									}
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							$u.notify('error', 'Notification',
									'data not available', '');
						}
					},
					error : function(e) {
						console.log(e);
					}
				});
			},
			setWardInfoData : function setWardInfoData(data){
				
				let officers = data.Officers;
				let populations= data.Population;
				let corpoDetails = data.CorporatorDetails;
				let educationDetails = data.EducationalInstitutions;
				let enter_hotel = data.EntertainmentAndHotel;
				let health_facilities = data.HealthFacilities;
				let ward_info = data.WardDetails;
				let zon_info =  data.ZoneDetails;

				//$('#officers_details_c > div.card-body > div.query-result-main > div.result-task').find('p').text();
				//let html = "<div class='card-body'><div class='query-result-main ward-list'><div class='result-task'><label>Health officers: </label><p id='health_of'>" +officers.health_officer+ "</p></div><div class='result-task'><label>Inspector: </label><p>"+officers.inspector+"</p></div></div></div>";
				//$('#officers_details_c').append(html);
				
				$('#lbl_health_ofc').text(officers.health_officer);
				$('#lbl_health_ofc_no').text(officers.health_officer_no);
				//$('#lbl_inspector').text(officers.inspector);
				$('#lbl_zonal_ofc').text(officers.zonal_officer);
				$('#lbl_zonal_ofc_no').text(officers.zonal_officer_no);
				$('#lbl_sanitary_ofc').text(officers.sanitary_officer);
				$('#lbl_sanitary_ofc_no').text(officers.sanitary_officer_no);
				
				$('#lbl_population').text(populations.total_population);
				$('#lbl_gender').text(populations.gender);
				$('#lbl_gender_ratio').text(populations.gender_ratio);
				
				$('#lbl_corpo_contact').text(corpoDetails.corporator_contact_no);
				$('#lbl_corpo_name').text(corpoDetails.corporator_name);
				
				let str = "";
				educationDetails.primary_schools.forEach(function(school) {
					str += "<li><a style='cursor: pointer;'>"+school+"</a></li>"
				});
				$('#lbl_prisch_name').append(str);
				
				str = "";
				educationDetails.secondary_schools.forEach(function(school) {
					str += "<li><a style='cursor: pointer;'>"+school+"</a></li>"
				});
				$('#lbl_secsch_name').append(str);
				
				str = "";
				educationDetails.colleges.forEach(function(school) {
					str += "<li><a style='cursor: pointer;'>"+school+"</a></li>"
				});
				$('#lbl_clg_name').append(str);
				
//				$('#lbl_prisch_name').text(educationDetails.primary_schools);
//				$('#lbl_secsch_name').text(educationDetails.secondary_schools);
//				$('#lbl_clg_name').text(educationDetails.colleges);
//				$('#lbl_institute_name').text(educationDetails.institutes);
//				$('#lbl_sch_name').text(educationDetails.schools);
				
				$('#lbl_hotel_name').text(enter_hotel.hotels);
				$('#lbl_rest_name').text(enter_hotel.restaurants);
				
				$('#lbl_clinic_name').text(health_facilities.clinics);
				$('#lbl_dispensary_name').text(health_facilities.dispensary);
//				$('#lbl_hospital_name').text(health_facilities.hospitals);
//				$('#lbl_pharmacy_name').text(health_facilities.pharmacies);
				
				str = "";
				health_facilities.hospitals.forEach(function(hospital) {
					str += "<li><a style='cursor: pointer;'>"+hospital+"</a></li>"
				});
				$('#lbl_hospital_name').append(str);
				
				str = "";
				health_facilities.pharmacies.forEach(function(pharmacy) {
					str += "<li><a style='cursor: pointer;'>"+pharmacy+"</a></li>"
				});
				$('#lbl_pharmacy_name').append(str);
				
				$('#lbl_ward_name').text(ward_info.ward_name);
				$('#lbl_ward_no').text(ward_info.ward_no);
				$('#lbl_ward_area').text(ward_info.ward_area);
				
				$('#lbl_zone_name').text(zon_info.zone_name);
				$('#lbl_zone_no').text(zon_info.zone_no);
				
			}
		}

	/**
	 * add public functions to base
	 */

	global.wardInfoController = base;

})(window, jQuery)