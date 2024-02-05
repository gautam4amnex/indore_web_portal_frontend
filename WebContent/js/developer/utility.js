(function(global, $) {
	"use stricts;"

	//var _department_id = "1";
	
	
	var c_point = {
			_current_lat : "",
			_current_long : ""
	}
	
	global.departmentData = {
			_department_id : "1"
	};
	global.wardList = undefined;
	global.depLayerList = undefined;
	global.layers = undefined;
	global.citizenPortalLayers = undefined;
	var table;
	
	var base = {

		isValidFiles : function isValidFiles(files, flag) {
			let extensionCheck;
			if (flag == 1) {
				extensionCheck = [ "png", "jpg", "PNG" , "JPG" , "JPEG" , "jpeg" ];
			} else if (flag == 2) {
				extensionCheck = [ "pdf", "doc",  "docx" ,"png", "PNG","jpg","JPG" , "jpeg" , "JPEG" ];
			} else if (flag == 3) {
				extensionCheck = [ "pdf", "doc" , "docx" , "xlsx" ];
			}

			let inValidFile = false;

			for (var i = 0; i < files.length; i++) {
				let file = files[i];
				let extension = file.name
						.substring(file.name.lastIndexOf('.') + 1);

				if (!extensionCheck.includes(extension)) {
					inValidFile = true;
					break;
				}
			}

			return inValidFile;
		},

		convertDate : function convertDate(date) {

			let final_date = null;
			let sdate = date.split("/");

			if (sdate.length > 0) {
				let month = sdate[0]
				let date = sdate[1]
				let year = sdate[2]
				final_date = year + "/" + month + "/" + date;
			}

			return final_date;

		},

		getDepartmentList : function getDepartmentList(id) {
			let result;

			$('#' + id).empty().append(
					'<option value="">Select Department</option>');

			let token_val = localStorage.getItem('token');

			if (token_val == "" || token_val == undefined || token_val == null) {
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			$.ajax({
						method : 'GET',
						url : window.iscdl.appData.baseURL
								+ "api/department/getDepartmentList",
						async : false,
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						success : function(result) {
							if (!$.isEmptyObject(result) && result != null) {
								try {
									result = JSON.parse(result);
									let str = "";
									if (result.responseCode == '200') {
										
										let response = result.data;
										let length = response.length;
										if (length > 0) {
											response.sort((a, b) => (a.department_name > b.department_name) ? 1 : -1);
											for ( let i in response) {
												let name = response[i].department_name;
												let id = response[i].deaprtment_id;
												str += "<option value='" + id
														+ "'>" + name
														+ "</option>";
											}
											$('#' + id).append(str);
											
											let did = window.depUtlityController.getDepartmentId();
											
											if(did != window.departmentData._department_id){
												$('select option[value='+did+']').attr("selected",true);
												$('#'+id).attr("disabled", true); 
											}else{
												$('#'+id).attr("enabled", "enabled"); 
											}
										}
									} else {
										$u.notify('error','Notification','Something went wrong while fetching department list','');
									}
								} catch (err) {
									console.log(err);
								}
							} else {
								$u.notify('error', 'Notification',
										'Announcement data not available', '');
							}
						},
						error : function(e) {
							console.log(e);
						}
					});
		},
		getRoleByDepartmentId : function getRoleByDepartmentId(d_id,id){
			
			$('#' + id).empty().append(
			'<option value="">Select Role</option>');
			
			
			if(d_id == ""){
				return;
			}
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let obj = {
					department_id : d_id
			}
			
			let postData = JSON.stringify(obj);
			
			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/user/getRoleListByDept",
				data : postData,
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							let str = "";
							if(result.responseCode == "200"){
								let response = result.data;
								let length = response.length;
								if (length > 0) {
									response.sort((a, b) => (a.role_name > b.role_name) ? 1 : -1);
									for ( let i in response) {
										let name = response[i].role_name;
										let id = response[i].role_id;
										str += "<option value='" + id
												+ "'>" + name
												+ "</option>";
									}
									$('#' + id).append(str);
								}
							}else{
								$u.notify('error', 'Notification',
										'Something went wrong', '');
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
		
		removeError : function removeError(id){
				var $alertas = $('#'+id);
			    $alertas.validate().resetForm();
			    $alertas.find('.error').removeClass('error');
		},
		
		getStatusList : function getStatusList(){
			
			let data;
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			return $.ajax({
				method : 'GET',
				url : window.iscdl.appData.baseURL + "api/common/getStatusList",
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							let str = "";
							if(result.responseCode == "200"){
								data = result.data;
							}else{
								$u.notify('error', 'Notification',
										'Error while fetching status list', '');
							}
							
						} catch (err) {
							console.log(err);
						}
					} else {
						$u.notify('error', 'Notification',
								'data not available', '');
					}
					
					return data;
				},
				error : function(e) {
					console.log(e);
				}
			});
		},
		getDepartmentId : function getDepartmentId(){
			
			let did = localStorage.getItem('department_id');
			
			if(did == null || did == "" || did == undefined){
				$u.notify('info', 'Notification',
						'Department Id was null', '');
				return;
			}
			
			return did;
			
		},
		prepareDataTable : function prepareDataTable(tblid,columns,coloumDefs,data){
			if(table != undefined){
				table.destroy();
			}
			$('#'+tblid).empty();
			table = createDatatable({
				id : tblid,
				columns : columns,
				data : data,
				columnDefs : coloumDefs
				
			});
		},
		changePassword : function changePassword(obj){
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			let refresh_token = localStorage.getItem('refresh_token');
			obj.refreshToken = refresh_token;
			let postData = JSON.stringify(obj);
			
			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/user/changePassword",
				data : postData,
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							let str = "";
							if(result.responseCode == "200"){
								$u.notify('success', 'Success',
										result.responseMessage, '');
//								global.depUtlityController.refreshToken();
								$("#resetModalClose").trigger('click');
								$('#form_changePassword').trigger('reset');
								$('.drop-container').slideUp();
							}else{
								$u.notify('warning', 'Warning',
										result.responseMessage, '');
							}
						} catch (err) {
							console.log(err);
						}
					} else {
						$u.notify('warning', 'Warning',
								'Something went wrong', '');
					}
				},
				error : function(e) {
					console.log(e);
				}
			});
		},
		headerDrop: function headerDrop(){
			/*$('.drop-down-main').on('click', function(){
				$('.drop-container').slideToggle();
			});*/
			
			$(".drop-down-main").off('click').bind("click",function(ev) {
				$('.drop-container').slideToggle();
			});
			
			$('#resetModal').on('hidden.bs.modal', function (e) {
				$('#form_changePassword').trigger('reset');
				window.depUtlityController.removeError('form_changePassword');
				$('.drop-container').slideUp();
			});
//			$("#chng_password_save_btn").on('click', function(){
//				$('.drop-container').slideUp();
//			});
//			$("#chng_password_close_btn").on('click', function(){
//				window.depUtlityController.removeError('form_changePassword');
//				$('.drop-container').slideUp();
//			});
		},
		getWardList : function getWardList(ward_id){
			let result;
			
			$('#' + ward_id).empty().append(
			'<option value="">Select Ward</option>');
			if(global.wardList  !== undefined){
				let str="", response = global.wardList;
				for (let i in response){
					let name = response[i].ward_name;
					let id = response[i].ward_no;
					/*if(ward_id == "location_select" || ward_id == "kyp_ward"){
						str += "<option value='" + id + "'>" + name + "-"  + id +"</option>";
					}else{
						str += "<option value='" + id + "'>" + name + "</option>";	
					}*/
					str += "<option value='" + id + "'>" + name + "-"  + id +"</option>";
				}
				$('#' + ward_id).append(str);
			}else{
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
										global.wardList = response;
										for (let i in response){
												let name = response[i].ward_name;
												let id = response[i].ward_no;
												/*if(ward_id == "location_select" || ward_id == "kyp_ward"){
													str += "<option value='" + id + "'>" + name + "-"  + id +"</option>";
												}else{
													str += "<option value='" + id + "'>" + name + "</option>";	
												}*/
												str += "<option value='" + id + "'>" + name + "-"  + id +"</option>";
										}
										$('#' + ward_id).append(str);
									}
								} else {
									$u.notify('error', 'Notification',
											'Something went wrong', '');
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
			}
			
		},
		getViewType : function getViewType(){
			
			let type = $('ul#pills-map-tab').find('a.active')[0].innerHTML;
			
			let view_type= "2D";
			
			if(type == "2D" || type == "2 डी"){
				view_type = "2D";
			}
			
			if(type == "3D" || type == "3 डी"){
				view_type = "3D";
			}
			return view_type;
		},
		closePopup : function closePopup(){
			$('.close').trigger("click");
		},
		getLayerList : function getLayerList(layer_id){

			let result;
			
			$('#' + layer_id).empty().append(
			'<option value="">Select Layer</option>');
			
			$.ajax({
				method : 'GET',
				url : window.iscdl.appData.baseURL + "citizen/layer/getLayerCategoryList",
				async : false,
				success : function(result) {
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							let str = "";
							if (result.responseCode == '200') {
								let response = result.data;
								if(global.layers == undefined){
									global.layers = response;	
								}
								
								let length = response.length;
								if(length > 0){
									for (let i in response){
										let name = response[i].layer_name;
										let id = response[i].layer_id;
										let arround_me = response[i].near_me;
										
										if(arround_me == true){
											str += "<option value='" + id + "'>" + name + "</option>";
										}
									}
									$('#' + layer_id).append(str);
								}
							} else {
								$u.notify('error', 'Notification',
										result.responseMessage, '');
							}
						
						} catch (err) {
							console.log(err);
						}
					} else {
						$u.notify('info', 'Notification',
										'No Data Found', '');
					}
				},
				error : function(e) {
					console.log(e);
				}
			});
		
		},
		setProjectMasterDetails : function setProjectMasterDetails(data){
			base.projectMasterDetails = data;
		},
		changeDependentDropdown : function changeDependentDropdown(parent_id, parent_key, child_id, label, value, name, data){
			let str = "";
			$('#' + child_id).empty().append('<option value="0">Select '+label+'</option>');
			for ( let i in data) {
				if(data[i][parent_key] === parent_id){
					str += "<option value='" + data[i][value] + "'>" + data[i][name] + "</option>";
				}
			}
			$('#' + child_id).append(str);
		},
		prepareAddDataInfo : function prepareAddDataInfo(category_id, latitude, longitude, prefix) {
			base.addDataInfo = {
					category_id: category_id,
					latitude: latitude,
					longitude: longitude,
					dataPrefix: prefix
			};
		},
		checkDeptCategory : function checkDeptCategory(category) {
			if(category === 'Hospital') {
				base.deptAddDataModal = {modal_id: 'addHospital_modal', prefix: 'hospital'};
			} else if(category === 'UPHC') {
				base.deptAddDataModal = {modal_id:'addUphc_modal', prefix: 'uphc'};
			} else if(category === 'Primary school') {
				base.deptAddDataModal = {modal_id:'addPrimarySchool_modal', prefix: 'primary'};
			} else if(category === 'Secondary school') {
				base.deptAddDataModal = {modal_id:'addSecondary_modal', prefix: 'secondary'};
			} else if(category === 'Colleges and Universities') {
				base.deptAddDataModal = {modal_id:'addUniversity_modal', prefix: 'university'};
			} else if(category === 'Police chowki'){
				base.deptAddDataModal = {modal_id:'addPoliceChowki_modal', prefix: 'policeChowki'};
			} else if(category === 'Electric pole'){
				base.deptAddDataModal = {modal_id:'dep_addelectricpole_modal', prefix: 'electricPole'};
			} else if(category === 'Street light'){
				base.deptAddDataModal = {modal_id:'dep_addstreetlight_modal', prefix: 'streetLight'};
			} else if(category === 'Transformers'){
				base.deptAddDataModal = {modal_id:'addTransformers_modal', prefix: 'transformer'};
			} else if(category === 'Bus stops'){
				base.deptAddDataModal = {modal_id:'addBusStops_modal', prefix: 'busStops'};
			} else if(category === 'Bus terminals'){
				base.deptAddDataModal = {modal_id:'addBusTerminals_modal', prefix: 'busTerminals'};
			} else if(category === 'Bus routes'){
				base.deptAddDataModal = {modal_id:'addBusRoutes_modal', prefix: 'busRoutes'};
			} else if(category === 'Library'){
				base.deptAddDataModal = {modal_id:'addLibrary_modal', prefix: 'library'};
			} else if(category === 'Flyover'){
				base.deptAddDataModal = {modal_id:'addFlyover_modal', prefix: 'flyover'};
			} else if(category === 'Police Posts'){
				base.deptAddDataModal = {modal_id:'addPolicePost_modal', prefix: 'policePost'};
			} else if(category === 'Restaurants'){
				base.deptAddDataModal = {modal_id:'addRestaurants_modal', prefix: 'restaurant'};
			}else if(category == 'Water ATM'){
				base.deptAddDataModal = {modal_id:'addWaterATM_modal', prefix: 'wateratm'};
			} else if(category == 'VCBs/VMSs'){
				base.deptAddDataModal = {modal_id:'addVCBVMS_modal', prefix: 'vcb_vms'};
			} else if(category == 'Pharmacies'){
				base.deptAddDataModal = {modal_id:'addPharmasies_modal', prefix: 'pharmacies'};
			} else if(category == 'Religious Facility'){
				base.deptAddDataModal = {modal_id:'addReligiosFacility_modal', prefix: 'religios_facility'};
			} else if(category === 'RTO') {
				base.deptAddDataModal = {modal_id:'dep_addRTO_modal', prefix: 'rto'};
			} else if(category === 'ATM') {
				base.deptAddDataModal = {modal_id:'nic_ATMadd_modal', prefix: 'atm'};
			} else if(category === 'Banks') {
				base.deptAddDataModal = {modal_id:'dep_addNicBank_modal', prefix: 'bank'};
			} else if(category === 'Monuments') {
				base.deptAddDataModal = {modal_id:'nic_addMonument_modal', prefix: 'mon'};
			} else if(category === 'Museum') {
				base.deptAddDataModal = {modal_id:'nic_addMuseum_modal', prefix: 'museum'};
			} else if(category === 'Park and ground') {
				base.deptAddDataModal = {modal_id:'nic_addParks_modal', prefix: 'park'};
			} else if(category === 'Manhole') {
				base.deptAddDataModal = {modal_id:'nic_addManhole_modal', prefix: 'manhole'};
			} else if(category === 'Shopping Malls') {
				base.deptAddDataModal = {modal_id:'shopping_mall_modal', prefix: 'shopping'};
			}else if(category === 'Car & Scooter Rentals') {
				base.deptAddDataModal = {modal_id:'car_and_scooter_rentals_modal', prefix: 'car'};
			}else if(category === 'Cultural Facility') {
				base.deptAddDataModal = {modal_id:'cultural_facility_modal', prefix: 'cultural'};
			}else if(category === 'Dustbin Locations') {
				base.deptAddDataModal = {modal_id:'dustbin_locations_modal', prefix: 'dustbin'};
			}else if(category === 'Electric Charging Station') {
				base.deptAddDataModal = {modal_id:'electric_charging_station_modal', prefix: 'ecs'};
			}else if(category === 'Entertainment Facility') {
				base.deptAddDataModal = {modal_id:'entertainment_facility_modal', prefix: 'entertainment_facility'};
			}else if(category === 'Eye Donation Center') {
				base.deptAddDataModal = {modal_id:'eye_donation_center_modal', prefix: 'eyeDonation'};
			}else if(category === 'Oldage Homes') {
				base.deptAddDataModal = {modal_id:'oldage_homes_modal', prefix: 'oldage_homes'};
			}else if(category === 'Bartan/Utencile Bank') { // need to confirm in db for layer_name
				base.deptAddDataModal = {modal_id:'utencile_bank_modal', prefix: 'utencile_bank'};
			}else if(category === 'Food zones') {
				base.deptAddDataModal = {modal_id:'street_food_zones_modal', prefix: 'sfz'};
			}else if(category === 'Milk Booths') {
				base.deptAddDataModal = {modal_id:'milk_booth_modal', prefix: 'milk_booth'};
			}else if(category === 'Markets') {
				base.deptAddDataModal = {modal_id:'market_modal', prefix: 'market'};
			}else if(category === 'Petrol Pump') {
				base.deptAddDataModal = {modal_id:'petrolPump_modal', prefix: 'petrolPump'};
			}else if(category === 'Free WIFI Locations') {
				base.deptAddDataModal = {modal_id:'freeWifi_data_modal', prefix: 'free_wifi'};
			}else if(category === 'Government Office') {
				base.deptAddDataModal = {modal_id:'govtOffices_modal', prefix: 'government_office'};
			}else if(category === 'Hostels') {
				base.deptAddDataModal = {modal_id:'hostels_modal', prefix: 'hostel'};
			}else if(category === 'Heritage & Tourism Sites') {
				base.deptAddDataModal = {modal_id:'heritageTourism_modal', prefix: 'heritage_and_tourist'};
			}else if(category === 'Orphanage Homes') {
				base.deptAddDataModal = {modal_id:'orphanageHome_modal', prefix: 'orphanage_home'};
			}else if(category === 'Hotel') {
				base.deptAddDataModal = {modal_id:'hotel_modal', prefix: 'hotel'};
			}else if(category === 'Traffic Squares') {
				base.deptAddDataModal = {modal_id:'trafficSquares_modal', prefix: 'traffic_square'};
			}else if(category === 'Public Toilets') {
				base.deptAddDataModal = {modal_id:'publicToilet_modal', prefix: 'public_toilet'};
			}else if(category === 'Play ground') {
				base.deptAddDataModal = {modal_id:'play_ground_modal', prefix: 'playgr'};
			}else if(category === 'Post Offices') {
				base.deptAddDataModal = {modal_id:'post_office_modal', prefix: 'postOf'};
			}else if(category === 'Public Distribution System Centers') {
				base.deptAddDataModal = {modal_id:'pdsc_modal', prefix: 'pdsc'};
			}else if(category === 'Blood Banks'){
				base.deptAddDataModal = {modal_id:'addBloodBanks_modal', prefix: 'blood_banks'};
			}else if(category === 'CCTV Locations'){
				base.deptAddDataModal = {modal_id:'cctv_location_modal', prefix: 'cctv_locations'};
			}else if(category === 'Cinema Hall'){
				base.deptAddDataModal = {modal_id:'addCinemaHall_modal', prefix: 'cinema_hall'};
			}else if(category === 'Sports Facility') {
                base.deptAddDataModal = {modal_id:'addSportsFacility_modal', prefix: 'sports_facility'};
            }else if(category === 'Fire Station') {
                base.deptAddDataModal = {modal_id:'addFireStation_modal', prefix: 'fire_station'};
            }else if(category === 'Smart pole') {
                base.deptAddDataModal = {modal_id:'addSmartPole_modal', prefix: 'smart_pole'};
            }
		},
		getLayers : function getLayers(id){
			
			let dept_id = localStorage.getItem('department_id');
			
			let layerObj = {
					"department_id":dept_id
			}
			
			let postData = JSON.stringify(layerObj);

			let token_val = localStorage.getItem('token');

			if (token_val == "" || token_val == undefined || token_val == null) {
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}

			if(global.depLayerList !== undefined){
				
				if(global.depLayerList.length > 0){
					let str = "", response = global.depLayerList;
					base.deptLayerData = global.depLayerList;
					response.sort((a, b) => (a.layer_name > b.layer_name) ? 1 : -1);
					$('#'+id).empty().append(
					'<option value="0">Select Department</option>');
					for ( let i in response) {
						str += "<option value='" + response[i].layer_id
								+ "'>" + response[i].layer_name + "</option>";
					}
					$('#'+id).append(str);
				}else{
					$('#'+id).empty().append('<option value="0">No Department Found</option>');
				}
			}else{
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL
							+ "api/layer/getLayers",
					async : false,
					data : postData,
					contentType : 'application/json',
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {

						if (!$.isEmptyObject(result) && result != null) {
							try {
								result = JSON.parse(result);
								
								if (result.responseCode == '200') {
									let response = result.data;
									base.deptLayerData = response;
									global.depLayerList = response;
									if(global.depLayerList.length > 0){
										response.sort((a, b) => (a.layer_name > b.layer_name) ? 1 : -1);
										$('#'+id).empty().append(
										'<option value="0">Select Category</option>');
										let str = "";
										for ( let i in response) {
											str += "<option value='" + response[i].layer_id
													+ "'>" + response[i].layer_name + "</option>";
										}
										$('#'+id).append(str);	
									}else{
										$('#'+id).empty().append('<option value="0">No Category Found</option>');
									}
								} else {
									$u.notify('warning', '', result.responseMessage, '');
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							$u.notify('info', '', 'Data not available', '');
						}
					},
					error : function(e) {
						console.log(e);
						if(e.status === 403) {
							$u.notify('warning', 'Access denied !', e.responseJSON.responseMessage , '');
						} else {
							$u.notify('error', '', 'Something went wrong' , '');
						}
					}
				});
			}
			
			
		},
		addData: function addData(obj, files, img_key){

			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let requestData = new FormData();
			if(files){
				let images = "";
				for(var i = 0; i < files.length; i++){
					images += files[i].name + (i < (files.length - 1) ? "," : "");
					requestData.append('images', files[i]);
				}
				if(img_key){
					obj.data[img_key] = images;
				}else{
					obj.data.geo_tag_photographs = images;
				}
				
			}
			 
			requestData.append('request_data', JSON.stringify(obj));
			
			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/layer/addOrUpdateLayerData",
				async : false,
				enctype : 'multipart/form-data',
				processData : false,
				contentType : false,
				data : requestData,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					if (!$.isEmptyObject(result) && result != null) {
						try {
							let str = "";
							if (result.responseCode == '200') {
								$u.notify('success', 'Success',
										result.responseMessage, '');
								
							}else if(result.responseCode == '204'){
								$u.notify('info', 'Notification',
										result.responseMessage, '');
							}else {
								$u.notify('error', 'Notification',
										'Something went wrong', '');
							}
							
							/**
							 * close pop-up
							 */
							
							window.depUtlityController.closePopup();
							
						} catch (err) {
							console.log(err);
							if(responseJSON && responseJSON.responseCode === 403){
								$u.notify('warning','', responseJSON.responseMessage,'');
							}else{
								$u.notify('error', '','Something went wrong', '');
							}
							
						}
					} else {
						$u.notify('error', 'Notification',
								'Something went wrong', '');
					}
				},
				error : function(e) {
					console.log(e);
				}
			});
		},
		getLayerData: function getLayerData(obj){

			if(window.location.href.includes("city_department.jsp") || window.location.href.includes("help.jsp")){
				return {responseText: "{data: []}"};
			}
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let postData = JSON.stringify(obj);
			
			return $.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/layer/getLayerData",
				data : postData,
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					if (!$.isEmptyObject(result) && result != null) {
						try {
							
							let str = "";
							if (result.responseCode == 200) {
								
							}else if(result.responseCode == 204){
								$u.notify('info', 'Notification',
										result.responseMessage, '');
							}
							
							
						} catch (err) {
							console.log(err);
							if(err.responseJSON && err.responseJSON.responseCode === 403){
								$u.notify('warning','', err.responseJSON.responseMessage,'');
							}else{
								$u.notify('error', '','Something went wrong', '');
							}
							
						}
					} else {
						$u.notify('error', 'Notification',
								'Something went wrong', '');
					}
				},
				error : function(e) {
					console.log(e);
				}
			});
		},
		approveRejectLayerData: function approveRejectLayerData(obj){
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let postData = JSON.stringify(obj);
			
			return $.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/layer/approveRejectLayerData",
				data : postData,
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					if (!$.isEmptyObject(result) && result != null) {
						try {
							
							let str = "";
							if (result.responseCode == 200) {
								
							}else if(result.responseCode == 204){
								$u.notify('info', 'Notification',
										result.responseMessage, '');
							}
							
							
						} catch (err) {
							console.log(err);
							if(err.responseJSON && err.responseJSON.responseCode === 403){
								$u.notify('warning','', err.responseJSON.responseMessage,'');
							}else{
								$u.notify('error', '','Something went wrong', '');
							}
							
						}
					} else {
						$u.notify('error', 'Notification',
								'Something went wrong', '');
					}
				},
				error : function(e) {
					console.log(e);
				}
			});
		}, getFormObj : function(form){
			const formData = new FormData(form);
			let jsonObject = {};
			
			for (const [key, value]  of formData.entries()) {
				if(!key.startsWith('geo') && key !== 'subLayerId' && value !== 'Submit'){
					jsonObject[key] = value;
				}
			}
			
			return jsonObject;
		},
		getLayerListByDepartmentId : function getLayerListByDepartmentId(layer_id){
			
			let result;
			
			$('#' + layer_id).empty().append(
			'<option value="">Select Layer</option>');
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let LayerInfoObj;
			
			let did = window.depUtlityController.getDepartmentId();
			
			if(did != window.departmentData._department_id){
				LayerInfoObj = {
						department_id : did
				}					
			}else{
				LayerInfoObj = {};
			}
			
			let postData = JSON.stringify(LayerInfoObj);
			
			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/report/getLayerByDepartmentId",
				data : postData,
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
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
										let name = response[i].layer_name;
										let id = response[i].layer_id;
											str += "<option value='" + id + "'>" + name + "</option>";
									}
									$('#' + layer_id).append(str);
								}
							} else {
								$u.notify('error', 'Notification',
										'Data not found', '');
							}
							
						} catch (err) {
							console.log(err);
						}
					} else {
						$u.notify('info', 'Notification',
								'data not available', '');
					}
				},
				error : function(e) {
					$(".loader").fadeOut();
					console.log(e);
				}
			});
		},
		getQueryLayerByDepartmentId : function getQueryLayerByDepartmentId(_type,layer_id){
			
			let result;
			
			$('#' + layer_id).empty().append(
			'<option value="">Select Layer</option>');
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let LayerInfoObj = {
					//department_id : _department_id,
					type : _type
			}					
			
			let postData = JSON.stringify(LayerInfoObj);
			
			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/report/getQueryLayerByDepartmentId",
				data : postData,
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							if (result.responseCode == '200') {
								window.depUtlityController.prepareSpatialQuerLayerList(layer_id,result);
							} else {
								$u.notify('error', 'Notification',
										'Data not found', '');
							}
						} catch (err) {
							console.log(err);
						}
					} else {
						$(".loader").fadeOut();
						$u.notify('info', 'Notification',
								'data not available', '');
					}
				},
				error : function(e) {
					console.log(e);
				}
			});
		},
		prepareSpatialQuerLayerList : function prepareSpatialQuerLayerList(layer_id,result){
			let str = "";
			let response = result.data;
			let length = response.length;
			if(length > 0){
				for (let i in response){
					let name = response[i].layer_name;
					let id = response[i].layer_id;
						str += "<option value='" + id + "'>" + name + "</option>";
				}
				$('#' + layer_id).append(str);
			}
		},
		getLayersByDepartment : function getLayersByDepartment(layer_id,d_id){
			
			let result;
			
			$('#' + layer_id).empty().append(
			'<option value="">Select Layer</option>');
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let LayerInfoObj;
			LayerInfoObj = {
						department_id : d_id
			}					
			
			let postData = JSON.stringify(LayerInfoObj);
			
			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/report/getLayerByDepartmentId",
				data : postData,
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
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
										let name = response[i].layer_name;
										let id = response[i].layer_id;
											str += "<option value='" + id + "'>" + name + "</option>";
									}
									$('#' + layer_id).append(str);
								}
							} else {
								$u.notify('error', 'Notification',
										'Data not found', '');
							}
							
						} catch (err) {
							console.log(err);
						}
					} else {
						$u.notify('info', 'Notification',
								'data not available', '');
					}
				},
				error : function(e) {
					$(".loader").fadeOut();
					console.log(e);
				}
			});
		},
		getReportLayers : function getReportLayers(_type,layer_id){
			
			let result;
			
			$('#' + layer_id).empty().append(
			'<option value="">Select Department</option>');
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let LayerInfoObj = {
					type : _type
			}					
			
			let postData = JSON.stringify(LayerInfoObj);
			
			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL + "api/report/getQueryLayerByDepartmentId",
				data : postData,
				contentType : 'application/json',
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							if (result.responseCode == '200') {
								window.depUtlityController.prepareReportDataCatogory(layer_id,result);
							} else {
								$u.notify('error', 'Notification',
										'Data not found', '');
							}
						} catch (err) {
							console.log(err);
						}
					} else {
						$(".loader").fadeOut();
						$u.notify('info', 'Notification',
								'data not available', '');
					}
				},
				error : function(e) {
					console.log(e);
				}
			});
		},
		prepareReportDataCatogory : function prepareReportDataCatogory(layer_id,result){
			
			let str = "";
			let response = result.data;
			let length = response.length;
			if(length > 0){
				for (let i in response){
					let name = response[i].department_name;
					let id = response[i].department_id;
						str += "<option value='" + id + "'>" + name + "</option>";
				}
				$('#' + layer_id).append(str);
			}
		},
		userLogout: function userLogout(){
			let userObj = {token: localStorage.getItem('token')};
			$.ajax({
				url : window.iscdl.appData.baseURL
						+ "api/logout",
				method : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(userObj),
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					window.localStorage.clear();
					window.location = window.location.origin + window.iscdl.appData.webURLPrefix;
				},
				error : function(err) {
					console.log(err);
				}
			});
		},
		hasAccessModule : function hasAccessModule(leftPanelValue){
			let access = false;
			
			if(leftPanelValue == "Project-Monitoring"){
				leftPanelValue = "Project Monitoring";
			}
			
			if(leftPanelValue == "Announcement" || leftPanelValue == "User Management" || leftPanelValue == "Citizen Master Data" 
				|| leftPanelValue == "Project Alert" || leftPanelValue == "Project Monitoring" || leftPanelValue == "Add Data" 
					|| leftPanelValue == "Event Management" || leftPanelValue == "Feedback & Suggestions"
						|| leftPanelValue == "Report" || leftPanelValue == "Reported Issues" || leftPanelValue == "POI Data"){
				let module_name = window.depUtlityController.getModuleName(leftPanelValue);
				let userInfo = JSON.parse(localStorage.getItem("user"));
				if(userInfo != null || userInfo != undefined){
					let moduleList = userInfo.modules;
					if(moduleList.length > 0){
						for(let m in moduleList){
							let moduleObj = moduleList[m];
							let moduleName = moduleObj.moduleName;
							if(moduleName == module_name){
								access = true;
								break;
							}
						}
					}
					return access;
				}else{
					return false;
				}
			}else{
				return true;
			}
		},
		getModuleName : function getModuleName(panel_value){
			let module_name = "";
			
			switch (panel_value) {
			case "Event Management":
				module_name = "Events";
				break;
			case "Announcement":
				module_name = "City Announcements";
				break;
			case "Feedback & Suggestions":
				module_name = "Feedback,Suggestions and Complaints";
				break;
			case "User Management":
				module_name = "User Management";
				break;
			case "Citizen Master Data":
				module_name = "Citizen Master";
				break;
			case "Project Alert": case "Project Monitoring" :
				module_name = "Project Monitoring";
				break;
			case "Add Data":
				module_name = "Add Data";
				break;	
			case "Report":
				module_name = "Reports";
				break;
			case "Reported Issues":
				module_name = "Incident Issues";
				break;
			case "POI Data":
				module_name = "POI Data";
				break;
			default:
				module_name = "";
				break;
			}
			return module_name;
		},
		setPageAccessAccordingToModule : function setPageAccessAccordingToModule(val){
			if(val != undefined){
				let hasAccess = window.depUtlityController.hasAccessModule(val);
				//console.log("Module Access rights : " +hasAccess);
				if(!hasAccess){
					if(val == "Announcement"){
						$("#announcement_data_attribute").attr("data-attr", "#");
					}else if(val == "Add Data"){
						$("#add_data_attribute").attr("data-attr", "#");
					}
					else if(val == "Project Monitoring"){
						$("#pmonitoring_data_attribute").attr("data-attr", "#");
					}
					else if(val == "Project Alert"){
						$("#project_alerts_option").attr("data-attr", "#");
					}
					else if(val == "Reported Issues"){
						$("#incident_reported_issues").attr("data-attr", "#");
					}
					$u.notify('warning', 'Access Denied !',
							'You do not have permission to access this module', '');
					return;
				}else{
					if(val == "Announcement"){
						window.depUtlityController.accessModule("announcement_data_attribute","aut_announcement");
					}else if(val == "Add Data"){
						window.depUtlityController.accessModule("add_data_attribute","dep_add_data");
					}
					else if(val == "Project Monitoring"){
						window.depUtlityController.accessModule("pmonitoring_data_attribute","project_monitoring_popup");
					}
					else if(val == "Project Alert"){
						window.depUtlityController.accessModule("project_alerts_option","project_alerts");
					}
					else if(val == "Reported Issues"){
						window.depUtlityController.accessModule("incident_reported_issues","reported_issues");
					}
					else if(val == "Feedback & Suggestions"){
						let jsp_page = window.location.origin
				        + window.iscdl.appData.webURLPrefix + "feedback_suggestion.jsp";
						$("#feedback_href").attr("href",jsp_page);
					}
					else if(val == "Event Management"){
						let jsp_page = window.location.origin
				        + window.iscdl.appData.webURLPrefix + "event-management.jsp";
						$("#event_href").attr("href",jsp_page);
					}else if(val == "Citizen Master Data"){
						let jsp_page = window.location.origin
				        + window.iscdl.appData.webURLPrefix + "master_data.jsp";
						$("#cmasterdata_href").attr("href",jsp_page);
					}else if(val == "User Management"){
						let jsp_page = window.location.origin
				        + window.iscdl.appData.webURLPrefix + "user_management.jsp";
						$("#umanagement_href").attr("href",jsp_page);
					}else if(val == "Project-Monitoring"){
						let jsp_page = window.location.origin
				        + window.iscdl.appData.webURLPrefix + "project_monitoring.jsp";
						$("#pmonitoring_href").attr("href",jsp_page);
					}else if(val == "Report"){
						let department_id = localStorage.getItem('department_id');
						if(department_id != "1"){
							let jsp_page = "reports.jsp";
							window.location = window.location.origin
					        + window.iscdl.appData.webURLPrefix +jsp_page;
						}else{
							window.depUtlityController.accessModule("report_data_attribute","dep_report_data");
						}
					}else if(val === "POI Data"){
						let jsp_page = window.location.origin
				        + window.iscdl.appData.webURLPrefix + "poi_data.jsp";
						$("#poi_data_href").attr("href",jsp_page);
					}
				}
			}
		},
		accessModule : function accessModule(data_attr_id,popup_id){
			$("#"+data_attr_id).attr("data-attr","#"+popup_id);
			$('.layer-popup').css('right', '-300px');
			$('#'+popup_id).css('right', '0px');
		},
		
		getVisitorCounter: function getVisitorCounter(){
			$.ajax({
				url : window.iscdl.appData.baseURL + "citizen/getVisitorCounter",
				method : 'GET',
				async : false,
				success : function(result) {
					let response = JSON.parse(result);
					$(".visitor_count").text(response.data.count);
					$(".visitor_updatedDate").text(response.data.updated_date);
					

//					SET EVENT ICON FOR NEW EVENTS
					if(response.data.new_events > 0){
						$("#event_href").empty().append('<svg class="small-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" width="50px" height="50px" enable-background="new 0 0 50 50" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M23.577,26.966c0.112,0.112,0.3,0.225,0.524,0.225c0.187,0,0.375-0.112,0.524-0.225l4.157-4.195c0.3-0.3,0.3-0.749,0-1.049c-0.3-0.3-0.749-0.3-1.049,0l-3.633,3.67l-1.835-1.835c-0.3-0.3-0.787-0.3-1.049,0c-0.3,0.3-0.3,0.749,0,1.049L23.577,26.966z M40.581,2.509h-2.547v-1.76C38.034,0.337,37.697,0,37.285,0c-0.412,0-0.749,0.337-0.749,0.749v1.76H33.39v-1.76C33.39,0.337,33.052,0,32.64,0c-0.412,0-0.749,0.337-0.749,0.749v1.76H18.109v-1.76C18.109,0.337,17.772,0,17.36,0S16.61,0.337,16.61,0.749v1.76h-3.146v-1.76C13.464,0.337,13.127,0,12.715,0c-0.412,0-0.749,0.337-0.749,0.749v1.76H9.419c-1.835,0-3.371,1.498-3.371,3.333v29.588c0,1.835,1.536,3.371,3.371,3.371h31.161c1.835,0,3.371-1.536,3.371-3.371V5.843C43.951,4.007,42.416,2.509,40.581,2.509L40.581,2.509z M42.453,35.431c0,1.049-0.861,1.873-1.873,1.873H9.419c-1.049,0-1.873-0.824-1.873-1.873V11.386h34.906V35.431z M7.547,5.843c0-1.011,0.824-1.873,1.873-1.873h2.547v1.76c0,0.412,0.337,0.749,0.749,0.749c0.412,0,0.749-0.337,0.749-0.749V3.97h3.146v1.76c0,0.412,0.337,0.749,0.749,0.749s0.749-0.337,0.749-0.749V3.97h13.783v1.76c0,0.412,0.337,0.749,0.749,0.749c0.412,0,0.749-0.337,0.749-0.749V3.97h3.146v1.76c0,0.412,0.337,0.749,0.749,0.749c0.412,0,0.749-0.337,0.749-0.749V3.97h2.547c1.011,0,1.873,0.861,1.873,1.873v4.045H7.547V5.843z M25,33.221c4.869,0,8.876-4.007,8.876-8.876c0-4.906-4.007-8.876-8.876-8.876c-4.906,0-8.876,3.97-8.876,8.876C16.124,29.213,20.094,33.221,25,33.221L25,33.221z M25,16.966c4.082,0,7.378,3.296,7.378,7.378S29.082,31.723,25,31.723s-7.378-3.296-7.378-7.378S20.918,16.966,25,16.966L25,16.966z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M2.378,37.303c14.12,0,31.124,0,45.243,0l-4.457,6.33L47.622,50c-14.12,0-31.124,0-45.243,0l4.457-6.367L2.378,37.303z"/><path fill="#FFFFFF" d="M15.674,46.966v-6.742h1.348l2.734,4.494v-4.494h1.273v6.742h-1.348l-2.734-4.419v4.419H15.674z M25.262,45.431l1.311,0.187c-0.187,0.487-0.449,0.861-0.787,1.086c-0.375,0.262-0.787,0.375-1.348,0.375c-0.824,0-1.461-0.262-1.873-0.824c-0.337-0.449-0.487-1.011-0.487-1.685c0-0.824,0.225-1.461,0.637-1.91c0.412-0.449,0.974-0.674,1.61-0.674c0.712,0,1.273,0.225,1.723,0.712c0.412,0.487,0.599,1.198,0.599,2.21h-3.221c0,0.375,0.112,0.674,0.3,0.899c0.187,0.187,0.449,0.3,0.749,0.3c0.187,0,0.375-0.037,0.487-0.15C25.112,45.843,25.225,45.655,25.262,45.431L25.262,45.431z M25.337,44.12c0-0.375-0.075-0.674-0.262-0.861c-0.187-0.187-0.412-0.3-0.674-0.3c-0.3,0-0.524,0.112-0.712,0.3c-0.187,0.225-0.262,0.487-0.262,0.861H25.337z M28.596,46.966l-1.536-4.869h1.236l0.936,3.184l0.824-3.184h1.236l0.824,3.184l0.936-3.184h1.273l-1.573,4.869h-1.236l-0.861-3.146l-0.824,3.146H28.596z"/></g></svg>Events');
					}else{
						$("#event_href").empty().append('<svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <g id="Layer_1"> </g> <g id="Layer_1_1_"> </g> <g id="Layer_1_2_"> </g> <g id="Layer_1_3_"> </g> <g id="Layer_1_4_"> </g> <g id="Layer_1_5_"> <g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M36.791,12.21h-1.938v-1.324c0-0.311-0.253-0.563-0.563-0.563     s-0.563,0.252-0.563,0.563v1.324H31.34v-1.324c0-0.311-0.252-0.563-0.563-0.563c-0.312,0-0.563,0.252-0.563,0.563v1.324H19.786     v-1.324c0-0.311-0.252-0.563-0.563-0.563s-0.563,0.252-0.563,0.563v1.324h-2.387v-1.324c0-0.311-0.252-0.563-0.563-0.563     c-0.311,0-0.563,0.252-0.563,0.563v1.324H13.21c-1.401,0-2.542,1.14-2.542,2.542v22.384c0,1.401,1.141,2.541,2.542,2.541h23.581     c1.401,0,2.541-1.14,2.541-2.541V14.752C39.332,13.351,38.192,12.21,36.791,12.21L36.791,12.21z M38.207,37.136     c0,0.781-0.635,1.416-1.416,1.416H13.21c-0.781,0-1.417-0.635-1.417-1.416V18.929h26.414V37.136L38.207,37.136z M11.793,14.752     c0-0.781,0.636-1.417,1.417-1.417h1.938v1.324c0,0.311,0.252,0.563,0.563,0.563c0.311,0,0.563-0.252,0.563-0.563v-1.324h2.387     v1.324c0,0.311,0.252,0.563,0.563,0.563c0.312,0,0.563-0.252,0.563-0.563v-1.324h10.428v1.324c0,0.311,0.252,0.563,0.563,0.563     c0.311,0,0.563-0.252,0.563-0.563v-1.324h2.387v1.324c0,0.311,0.252,0.563,0.563,0.563c0.312,0,0.563-0.252,0.563-0.563v-1.324     h1.938c0.781,0,1.416,0.636,1.416,1.417v3.052H11.793V14.752z"/> </g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M25,35.449c3.699,0,6.709-3.01,6.709-6.709     S28.7,22.031,25,22.031c-3.699,0-6.709,3.01-6.709,6.709S21.302,35.449,25,35.449L25,35.449z M25,23.157     c3.079,0,5.584,2.504,5.584,5.583S28.079,34.324,25,34.324c-3.078,0-5.583-2.505-5.583-5.584S21.922,23.157,25,23.157z"/> </g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M23.912,30.72c0.105,0.105,0.249,0.164,0.398,0.164     s0.292-0.059,0.397-0.164l3.163-3.162c0.22-0.221,0.22-0.576,0-0.796s-0.576-0.22-0.796,0l-2.765,2.764l-1.385-1.385     c-0.22-0.22-0.576-0.22-0.796,0c-0.22,0.221-0.22,0.576,0,0.796L23.912,30.72z"/> </g> </g> </g> <g id="Layer_1_6_"> </g> <g id="Layer_1_7_"> </g> <g id="Layer_1_8_"> </g> <g id="Layer_1_9_"> </g> <g id="Layer_1_10_"> </g> <g id="Layer_1_11_"> </g> <g id="Layer_1_12_"> </g> <g id="Layer_1_13_"> </g> <g id="Layer_1_14_"> </g> <g id="Layer_1_15_"> </g> <g id="Layer_1_16_"> </g> <g id="Layer_1_17_"> </g> <g id="Layer_1_18_"> </g> <g id="Layer_1_19_"> </g> <g id="Layer_1_20_"> </g> <g id="Layer_1_21_"> </g> <g id="Layer_1_22_"> </g> <g id="Layer_1_23_"> </g> <g id="Layer_1_24_"> </g> <g id="Layer_1_25_"> </g> <g id="Layer_1_26_"> </g> <g id="Layer_1_27_"> </g> <g id="Layer_1_28_"> </g> <g id="Layer_1_29_"> </g> <g id="Layer_1_30_"> </g> </svg>Events');
					}
					
//					SET ANNOUNCEMENT ICON FOR NEW ANNOUNCEMENTS
					if(response.data.new_announcements > 0){
						$("#announcementMenuIcon").empty().append('<svg class="small-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" width="50px" height="50px" enable-background="new 0 0 50 50" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M18.171,11.217c-0.041,0-0.041,0-0.083,0h-0.041h-7.906c-3.849,0-6.954,3.146-6.954,6.954c0,3.601,2.732,6.581,6.291,6.912l0.166,0.041l2.442,10.017c0.29,1.159,1.325,1.987,2.566,1.987h1.656c0.786,0,1.531-0.373,2.07-0.993c0.497-0.621,0.662-1.449,0.455-2.235l-2.111-8.775h1.325h0.041c0,0,0.041,0,0.083,0c2.111-0.124,4.925,0.373,6.954,0.911c4.801,1.366,8.692,4.056,11.217,8.361c0.207,0.373,0.579,0.621,1.035,0.621c0.083,0,0.207,0,0.29-0.041c0.538-0.166,0.911-0.621,0.911-1.159V22.392h0.248c2.028-0.248,3.601-1.987,3.601-4.056v-0.331c0-2.028-1.573-3.767-3.601-4.015l-0.248-0.041V2.566c0-0.579-0.373-1.035-0.911-1.159c-0.083-0.041-0.207-0.041-0.29-0.041h-0.041c-0.414,0-0.786,0.207-0.993,0.579c-2.525,4.305-6.416,6.995-11.217,8.361C23.137,10.886,20.281,11.341,18.171,11.217L18.171,11.217z M8.899,20.654c-0.041-0.041-0.041-0.083-0.041-0.083c-0.041-0.041-0.083-0.083-0.083-0.124c-0.041,0-0.083-0.041-0.083-0.041c-0.041-0.041-0.083-0.041-0.124-0.083c-0.041,0-0.083,0-0.083,0c-0.083-0.041-0.166-0.041-0.248,0c-0.041,0-0.083,0-0.124,0c0,0.041-0.041,0.041-0.083,0.083c-0.041,0-0.083,0.041-0.083,0.041c-0.041,0.041-0.041,0.083-0.083,0.124c0,0-0.041,0.041-0.041,0.083c-0.041,0.041-0.041,0.083-0.041,0.124c0,0.041,0,0.083,0,0.083c0,0.041,0,0.083,0,0.124c0,0.041,0,0.083,0.041,0.124c0,0.041,0.041,0.083,0.041,0.083c0.041,0.041,0.041,0.083,0.083,0.083c0,0.041,0.041,0.083,0.083,0.083c0.041,0.041,0.083,0.041,0.083,0.041c0.041,0.041,0.083,0.041,0.124,0.041c0.041,0,0.083,0.041,0.124,0.041c0.041,0,0.083-0.041,0.124-0.041c0,0,0.041,0,0.083-0.041c0.041,0,0.083,0,0.124-0.041c0,0,0.041-0.041,0.083-0.083c0,0,0.041-0.041,0.083-0.083c0-0.041,0-0.041,0.041-0.083c0-0.041,0-0.083,0.041-0.124c0-0.041,0-0.083,0-0.124c0,0,0-0.041,0-0.083C8.899,20.737,8.899,20.695,8.899,20.654L8.899,20.654z M46.233,17.591h-1.904c-0.331,0-0.579,0.248-0.579,0.579s0.248,0.579,0.579,0.579h1.904c0.331,0,0.579-0.248,0.579-0.579S46.565,17.591,46.233,17.591L46.233,17.591z M45.447,26.945c0.166,0,0.29-0.083,0.414-0.207c0.207-0.248,0.207-0.621-0.041-0.828l-2.483-2.276c-0.248-0.207-0.621-0.166-0.828,0.041c-0.207,0.248-0.207,0.621,0.041,0.828l2.483,2.276C45.157,26.863,45.281,26.945,45.447,26.945L45.447,26.945z M45.82,10.43c0.248-0.207,0.248-0.579,0.041-0.828c-0.207-0.207-0.579-0.248-0.828-0.041l-2.483,2.276c-0.248,0.248-0.248,0.579-0.041,0.828c0.124,0.124,0.29,0.207,0.455,0.207c0.124,0,0.248-0.041,0.373-0.166L45.82,10.43z M17.425,35.43c-0.248,0.331-0.662,0.538-1.118,0.538h-1.656c-0.662,0-1.242-0.455-1.407-1.118l-2.359-9.727h4.636l0.745,3.063H15.48c-0.331,0-0.579,0.248-0.579,0.579c0,0.331,0.248,0.579,0.579,0.579h1.076l0.538,2.318h-0.621c-0.331,0-0.579,0.29-0.579,0.579c0,0.331,0.248,0.621,0.579,0.621h0.911l0.331,1.325C17.798,34.603,17.715,35.058,17.425,35.43L17.425,35.43z M15.977,23.965L15.977,23.965h-5.836h-0.041c-3.187-0.041-5.753-2.608-5.753-5.795s2.608-5.753,5.795-5.753h7.409v7.864h-5.629c-0.331,0-0.579,0.29-0.579,0.579c0,0.331,0.248,0.621,0.579,0.621h5.629v2.483H15.977z M41.225,18.005v0.331c0,1.366-0.952,2.566-2.318,2.856l-0.331,0.041v-6.126l0.331,0.083C40.273,15.439,41.225,16.639,41.225,18.005L41.225,18.005z M18.998,12.417c2.152-0.041,4.346-0.373,6.416-0.952c4.719-1.366,8.816-4.056,11.465-8.195l0.538-0.828v31.457l-0.538-0.786c-2.649-4.18-6.747-6.871-11.465-8.195c-2.07-0.579-4.263-0.911-6.416-0.952h-0.29V12.417H18.998z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M0,35.969c15.604,0,34.396,0,50,0l-4.925,6.995L50,50c-15.604,0-34.396,0-50,0l4.925-7.036L0,35.969z"/><path fill="#FFFFFF" d="M14.694,46.647v-7.45h1.49l3.022,5.008v-5.008h1.407v7.45h-1.49l-3.022-4.884v4.884H14.694z M25.29,44.95l1.449,0.207c-0.207,0.538-0.497,0.952-0.869,1.2c-0.414,0.29-0.869,0.414-1.49,0.414c-0.911,0-1.614-0.29-2.07-0.911c-0.373-0.497-0.538-1.118-0.538-1.863c0-0.911,0.248-1.614,0.704-2.111c0.455-0.497,1.076-0.745,1.78-0.745c0.786,0,1.407,0.248,1.904,0.786c0.455,0.538,0.662,1.325,0.662,2.442h-3.56c0,0.414,0.124,0.745,0.331,0.993c0.207,0.207,0.497,0.331,0.828,0.331c0.207,0,0.414-0.041,0.538-0.166C25.124,45.406,25.248,45.199,25.29,44.95L25.29,44.95z M25.373,43.502c0-0.414-0.083-0.745-0.29-0.952c-0.207-0.207-0.455-0.331-0.745-0.331c-0.331,0-0.579,0.124-0.786,0.331c-0.207,0.248-0.29,0.538-0.29,0.952H25.373z M28.974,46.647l-1.697-5.381h1.366l1.035,3.518l0.911-3.518h1.366l0.911,3.518l1.035-3.518h1.407l-1.738,5.381h-1.366l-0.952-3.477l-0.911,3.477H28.974z"/></g></svg>City Announcements');
					}else{
						$("#announcementMenuIcon").empty().append('<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_"><g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M13.969,25.966c-0.009-0.024-0.021-0.047-0.036-0.068c-0.014-0.021-0.03-0.043-0.049-0.062c-0.019-0.018-0.039-0.034-0.062-0.049c-0.021-0.015-0.045-0.027-0.069-0.037c-0.024-0.011-0.05-0.019-0.075-0.023c-0.052-0.011-0.104-0.01-0.155,0c-0.025,0.005-0.051,0.013-0.075,0.022c-0.024,0.011-0.048,0.023-0.07,0.038c-0.021,0.015-0.042,0.03-0.06,0.049c-0.019,0.019-0.035,0.038-0.05,0.06c-0.014,0.022-0.027,0.046-0.037,0.07s-0.018,0.05-0.022,0.075c-0.006,0.025-0.008,0.052-0.008,0.078c0,0.025,0.002,0.052,0.008,0.078c0.005,0.025,0.013,0.051,0.022,0.075s0.023,0.047,0.037,0.069c0.015,0.021,0.031,0.041,0.05,0.06s0.039,0.036,0.061,0.051c0.021,0.014,0.046,0.026,0.069,0.036c0.024,0.011,0.05,0.018,0.075,0.023c0.025,0.005,0.052,0.007,0.077,0.007c0.026,0,0.053-0.002,0.078-0.007c0.025-0.006,0.051-0.013,0.075-0.023c0.024-0.01,0.047-0.022,0.068-0.036c0.022-0.015,0.043-0.032,0.063-0.051c0.019-0.019,0.035-0.039,0.049-0.061c0.015-0.021,0.027-0.045,0.036-0.068c0.011-0.024,0.019-0.05,0.023-0.075C13.999,26.171,14,26.145,14,26.119c0-0.026-0.002-0.053-0.008-0.078C13.988,26.016,13.98,25.99,13.969,25.966z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.545,23.871h-1.31c-0.221,0-0.4,0.18-0.4,0.4s0.18,0.4,0.4,0.4h1.31c0.221,0,0.399-0.18,0.399-0.4S39.766,23.871,39.545,23.871z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M38.997,30.266c0.113,0,0.22-0.048,0.296-0.131c0.148-0.163,0.137-0.417-0.026-0.565l-1.705-1.553c-0.163-0.148-0.416-0.137-0.565,0.026c-0.148,0.163-0.137,0.417,0.026,0.565l1.706,1.553C38.801,30.229,38.897,30.266,38.997,30.266z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.266,18.974c0.163-0.149,0.175-0.402,0.026-0.565s-0.401-0.175-0.564-0.026l-1.706,1.553c-0.163,0.148-0.175,0.402-0.026,0.565c0.077,0.084,0.183,0.131,0.297,0.131c0.1,0,0.194-0.037,0.269-0.104L39.266,18.974z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M20.325,19.512c-0.021-0.001-0.042,0-0.063,0.002l-0.01,0.001h-5.44c-2.622,0-4.756,2.134-4.756,4.757c0,2.447,1.87,4.504,4.305,4.734l0.135,0.013l1.671,6.868c0.196,0.806,0.911,1.369,1.741,1.369h1.137c0.554,0,1.066-0.25,1.409-0.686c0.341-0.434,0.463-0.994,0.332-1.53l-1.462-6.012h0.928l0.01,0.001c0.021,0.002,0.042,0.003,0.063,0.002c1.458-0.081,3.388,0.236,4.771,0.63c3.269,0.93,5.943,2.769,7.661,5.724c0.149,0.257,0.414,0.414,0.71,0.414c0.075,0,0.149-0.011,0.223-0.03c0.368-0.099,0.613-0.419,0.613-0.8v-7.804l0.168-0.02c1.396-0.168,2.453-1.358,2.453-2.766v-0.217c0-1.407-1.058-2.599-2.453-2.766l-0.168-0.02v-7.804c0-0.381-0.245-0.701-0.613-0.8c-0.072-0.02-0.146-0.03-0.221-0.03h-0.007c-0.295,0-0.557,0.159-0.705,0.414c-1.718,2.955-4.393,4.794-7.661,5.724C23.717,19.273,21.778,19.595,20.325,19.512L20.325,19.512z M19.825,36.076c-0.189,0.24-0.474,0.379-0.78,0.379h-1.137c-0.459,0-0.855-0.312-0.964-0.758l-1.622-6.669H18.5l0.511,2.1h-0.526c-0.221,0-0.399,0.179-0.399,0.399c0,0.222,0.179,0.4,0.399,0.4h0.721l0.386,1.587h-0.429c-0.221,0-0.399,0.179-0.399,0.4c0,0.221,0.179,0.399,0.399,0.399h0.624l0.222,0.914C20.081,35.525,20.013,35.836,19.825,36.076L19.825,36.076z M18.835,28.228c-0.007-0.001-0.015-0.001-0.021-0.001H14.82c-0.008,0-0.017,0.001-0.025,0.001c-2.174-0.01-3.938-1.781-3.938-3.956c0-2.182,1.774-3.956,3.956-3.956h5.09v5.403h-3.865c-0.221,0-0.4,0.179-0.4,0.4c0,0.221,0.18,0.399,0.4,0.399h3.865v1.709H18.835L18.835,28.228z M36.124,24.163v0.217c0,0.943-0.668,1.76-1.592,1.946l-0.229,0.047V22.17l0.229,0.047C35.456,22.402,36.124,23.219,36.124,24.163L36.124,24.163z M20.89,20.317c1.462-0.023,2.98-0.259,4.385-0.654c3.243-0.914,6.042-2.764,7.876-5.614l0.352-0.548v21.541l-0.352-0.548c-1.834-2.851-4.633-4.7-7.876-5.614c-1.404-0.396-2.923-0.631-4.385-0.654l-0.188-0.004V20.32L20.89,20.317z"/></g></g></g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_"></g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g></svg>City Announcements');
					}
				},
				error : function(err) {
					console.log(err);
				}
			});
		},
		getLocationInfoByLatLong: function getLocationInfoByLatLong(data){
			let requestObj = JSON.stringify(data);
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			$.ajax({
				url : window.iscdl.appData.baseURL + "api/getLocationInfoByLatLong",
				method : 'POST',
				contentType : 'application/json',
				data : requestObj,
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					base.locationInfoByLatLong = JSON.parse(result);
				},
				error : function(err) {
					console.log(err);
				}
			});
		},
		getCitizenPortalLayerList : function(layer_id){

			let result;
			
			$('#' + layer_id).empty().append(
			'<option value="">Select Layer</option>');
			
			$.ajax({
				method : 'GET',
				url : window.iscdl.appData.baseURL + "citizen/layer/getCitizenPortalLayerList",
				async : false,
				success : function(result) {
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							let str = "";
							if (result.responseCode == '200') {
								let response = result.data;
								if(global.citizenPortalLayers == undefined){
									global.citizenPortalLayers = response;	
								}
								let length = response.length;
								if(length > 0){
									for (let i in response){
										let name = response[i].layer_name;
										let id = response[i].layer_id;
										let arround_me = response[i].near_me;
										if(arround_me == true){
											str += "<option value='" + id + "'>" + name + "</option>";
										}
									}
									$('#' + layer_id).append(str);
								}
							} else {
								$u.notify('error', 'Notification',
										result.responseMessage, '');
							}
						} catch (err) {
							console.log(err);
						}
					} else {
						$u.notify('info', 'Notification',
										'No Data Found', '');
					}
				},
				error : function(e) {
					console.log(e);
				}
			});
		},
		getSwipeLayers : function(layer_id){
			$('#' + layer_id).empty().append(
			'<option value="">Select Layer</option>');
			let str = "";
			
			let response = global.citizenPortalLayers;
			let length = response.length;
			if(length > 0){
				for (let i in response){
					let name = response[i].layer_name;
					let id = response[i].layer_id;
					let swipe_layer = response[i].swipe_layer;
					if(swipe_layer == true){
						str += "<option value='" + id + "'>" + name + "</option>";
					}
				}
				$('#' + layer_id).append(str);
			}else{
				$u.notify('info', 'Notification',
						'No Data Found', '');
				return;
			}
		},
		getDepartmentSwipeLayers : function(layer_id){
			$('#' + layer_id).empty().append(
			'<option value="">Select Layer</option>');
			let str = "";
			
			let response = global.layers;
			let length = response.length;
			if(length > 0){
				for (let i in response){
					let name = response[i].layer_name;
					let id = response[i].gis_id;
					let swipe_layer = response[i].swipe_layer;
					if(swipe_layer == true){
						str += "<option value='" + id + "'>" + name + "</option>";
					}
				}
				$('#' + layer_id).append(str);
			}else{
				$u.notify('info', 'Notification',
						'No Data Found', '');
				return;
			}
		},
		minimizePopup : function(){
			$('.layer-resize').toggleClass('resize-layer');
		},
		covertFirstLetterCapital : function(str){
			 return str.replace(/\w\S*/g, function(txt){
				 return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			 });
		},
		getOpacityLayers : function(opacity_layer_id){
			
			$('#' + opacity_layer_id).empty().append(
			'<option value="">Select Layer</option>');
			
			let str = "";
			let layers = window.layers;
			for(let i in layers){
				let layer_id = layers[i].layer_id;
				let layer_name = layers[i].layer_name;
				let opacity_layer = layers[i].opacity_layer;
				if(opacity_layer == true){
					str += "<option value='" + layer_id + "'>" + layer_name + "</option>";
				}	
			}
			$('#' + opacity_layer_id).append(str);
		},
		
		addUserToken: function addUserToken(old_token){
			//ADD NEW USER TOKEN TO DATABASE
			let u_id = localStorage.getItem('user_data');
			if(u_id == undefined || u_id == null || u_id == ""){
				u_id = 0;
			}
			var userObj = {
					token : localStorage.getItem('token'),
					userId : u_id
				};
				$.ajax({
					url : window.iscdl.appData.baseURL
							+ "addUserToken",
					method : 'POST',
					contentType : 'application/json',
					data : JSON.stringify(userObj),
					async : false,
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {
						global.depUtlityController.removeUserToken(old_token);
					},
					error : function(err) {
						console.log(err);
					}
				});
		},
		
		removeUserToken: function removeUserToken(old_token){
			let userObj = {token: old_token};
			$.ajax({
				url : window.iscdl.appData.baseURL
						+ "api/logout",
				method : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(userObj),
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ old_token);
				},
				success : function(result) {
					
				},
				error : function(err) {
					console.log(err);
				}
			});
		},
		
		refreshToken: function refreshToken() {
			let refresh_token = localStorage.getItem('refresh_token');
			let old_token = localStorage.getItem('token');
			if(refresh_token && refresh_token != null){
				
				let obj = {
						grant_type : "refresh_token",
						refresh_token : refresh_token
					};
					$.ajax({
						url : window.iscdl.appData.baseURL + "oauth/token",
						method : 'POST',
						contentType : 'application/x-www-form-urlencoded',
						data : obj,
						async : false,
						beforeSend : function(request) {
							request.setRequestHeader('Authorization',
									'Basic ZGV2Z2xhbi1jbGllbnQ6ZGV2Z2xhbi1zZWNyZXQ=');
						},
						success : function(result) {
							localStorage.setItem('token', result.access_token);
							localStorage.setItem('refresh_token', result.refresh_token);
							localStorage.setItem('expireIn', result.expires_in);
							global.depUtlityController.addUserToken(old_token);
						},
						error : function(err) {
							console.log(err);
						}
					});
				
			}
			
		}
	}

	/**
	 * add public functions to base
	 */

	global.depUtlityController = base;

})(window, jQuery)