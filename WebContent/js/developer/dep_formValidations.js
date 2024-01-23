(function(global, $) {
	"use stricts;"

	// date validator
	$.validator.addMethod("dateFormat", function(value, element, params) {
		try {
			return value == "" ? false : true;
		} catch (e) {
			return false
		}
	}, 'Please Select Date & Time ');
	
	// dropdown validator
	$.validator.addMethod("dropDownValidation",
			function(value, element, params) {
				try {
					return value == "" ? false : true;
				} catch (e) {
					return false
				}
			}, 'Please Select Department');
	
	$.validator.addMethod("dropDownValidationMileStone",
			function(value, element, params) {
				try {
					return value == "0" ? false : true;
				} catch (e) {
					return false
				}
			}, 'Please Select Milestone Status');
	
	// contact number validator
	$.validator.addMethod('contactNum', function(value, element) {
		return this.optional(element) || /^\d{10}$/.test(value);
	}, "Please Enter a Valid Phone Number");
	
	
	// numeric value validator
	$.validator.addMethod('numericVal', function(value, element) {
		return /^\d*$/.test(value);
	}, "Please Enter a Numeric Value");

	// change password -> new password validator
	$.validator.addMethod('pwdVal', function(value, element) {
		return /^(?=.*\d)(?=.*[@$!%*#?&])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value);
	}, "Password Must Contain One Number, One Uppercase Letter, One Lowercase Letter ,One Special Character and At Least 8 Characters");
	
	// change password -> current and new password validator
	$.validator.addMethod('diffVal', function(value, element) {
		return $("#chng_password").val() !== $("#new_password").val();
	}, "New Password Should Not Be Same As Current Password");
	
	// email check validator
	$.validator.addMethod('emailCheck', function(value, element) {
		return this.optional(element) || /^\w[\.\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
	}, "Please Enter a Valid Email Id");

	
	//start date and end date checker
	$.validator.addMethod("greaterThan", 
			function(value, element, params) {
			    
			let start_date = $('#event_sdate').val();
			let end_date = $('#event_edate').val();
			return start_date < end_date; 
	},'End Date is Grater Than Start Date.');
	
	/**
	 * add department form
	 */
	$('form[id="form_addDepartment"]').validate({
		rules : {
			dep_name : "required",
			created_by : "required",
			created_date : {
				dateFormat : true
			},
			user_des : "required",
		},
		messages : {
			dep_name : {
				required : "Please Enter a Department Name",
			},
			created_by : {
				required : "Please Enter Name",
			},
			created_date : {
				dateFormat : "Please Select Date & Time",
				required : "Please Enter a Created Date",
			},
			user_des : {
				required : "Please Enter a Description",
			}
		},
		submitHandler : function(form, e) {
			e.preventDefault();
			try {
				let department_name = $('#dep_name').val();
				let user_name = $('#created_by').val();
				let created_date = $('#created_date').val();
				let dep_description = $('#user_des').val();

				let user_id = localStorage.getItem("user_data");

				if (user_id == undefined || user_id === null || user_id == "") {
					return;
				}

				 window.depDepartmentMasterController.addOrUpdateDepartment(null,department_name,user_name,user_id,dep_description);

				$("#form_addDepartment").trigger("reset");
// jQuery.noConflict();
// $("#dep_masetr_modal").modal('toggle');
// $("#dep_masetr_modal").toggle();
// $(".modal-backdrop").remove();

			} catch (e) {
				$u.notify("error", "Error", "Something went Wrong");
			}
		}
	});
	
	/**
	 * add role form
	 */
	
	var ListGroupOld = {};
	var ListGroup = {"id" : [], "dataid" : [], "text" : []};
	var List = [];
	
	$('form[id="form_add_role_master"]').validate({
		rules : {
			dep_select_role : "required",
			name_role : "required",
			dep_select_type : "required"
		},
		messages : {
			dep_select_role : {
				required : "Please Select Department Name",
			},
			name_role : {
				required : "Please Enter Role Name",
			},
			dep_select_type : {
				required: "Please Select Role Type"
			}
		},
		submitHandler : function(form, e) {
			e.preventDefault();
			try {
				let department_id = $("#dep_select_role").val();
				let role_name = $('#name_role').val();
				let role_type = $("#dep_select_type").val();
				
				let webChkLength = $("input[name='webChk']:checked").length;
				let mobileChkLength = $("input[name='mobileChk']:checked").length;
				
				if(webChkLength == 0 && mobileChkLength == 0){
					$u.notify("warning", "Notification", "Please select mobile application Or web application checkbox");
					return;
				}
				
				let web_tree_Agri = window.depRoleMasterController.getWebCheckedTreeNodes();
				let mob_tree_Agri = window.depRoleMasterController.getMobileCheckedTreeNodes();

				
				if(webChkLength > 0){
					if(web_tree_Agri.getCheckedNodes().length == 0){
						$u.notify("info", "Notification", "Please select any module of web applicaton");
						return ;
					}
				}else if(mobileChkLength > 0){
					if(mob_tree_Agri.getCheckedNodes().length == 0){
						$u.notify("info", "Notification", "Please select any module of mobile application");
						return ;
					}	
				}
				
				let roleObj = prepareRoleData(null,department_id,role_name,web_tree_Agri,mob_tree_Agri,webChkLength,mobileChkLength,true,role_type);
				let postData = JSON.stringify(roleObj);
				window.depRoleMasterController.addOrUpdateRole(postData);
	 	 		
			} catch (e) {
				$u.notify("error", "Error", "Something went Wrong");
			}
		}
	});
	
	
	
	/**
	 * add user form
	 */
	
	
	$('form[id="form_addUser"]').validate({
		rules : {
			
			user_name : "required",
			user_email : {
				required: true,
				emailCheck: true
			},
			user_pass : {
				required : true,
				pwdVal: true
			},
			mobile_no :{
				required : true,
				contactNum : true,
			},
			user_dep_type : {
				dropDownValidation : true
			},
			user_role : {
				dropDownValidation : true
			}
		},
		messages : {
			user_name : {
				required : "Please Enter Name",
			},
			user_email : {
				required : "Please Enter User Email",
				emailCheck: "Please Enter a Valid Email Id"
			},
			user_pass : {
				required : "Please Enter a Password",
				pwdVal: "Password Must Contain One Number, One Uppercase Letter, One Lowercase Letter,One Special Character and At Least 8 Characters",
			},
			mobile_no : {
				contactNum : "Please Enter a Valid Mobile Number",
				required : "Please Enter a Mobile Number"
			},
			user_dep_type : {
				dropDownValidation : "Please Enter a Department",
			},
			user_role : {
				dropDownValidation : "Please Select a Role",
			}
		},
		submitHandler : function(form, e) {
			e.preventDefault();
			try {
				
				let name = $('#user_name').val();
				let user_email = $('#user_email').val();
				let user_password = $('#user_pass').val();
				let mobile_number = $('#mobile_no').val();
				let department_type = $('#user_dep_type').val();
				let user_role = $('#user_role').val();
				
				window.depUserMasterController.addOrUpdateUser(null,user_email,user_email,name,user_password,mobile_number,user_role);
				
				$("#form_addUser").trigger("reset");
				
				window.depUtlityController.removeError('form_addUser');
				
			} catch (e) {
				$u.notify("error", "Error", "Something went Wrong");
			}
		}
	});
	
	/**
	 * update user form
	 */
	
	$('form[id="form_updateUser"]').validate({
		rules : {
			
			update_user_name : "required",
			update_mobile_no :{
				contactNum : true,
				required : true,
			},
			update_user_dep_type : {
				dropDownValidation : true
			},
			update_user_role : {
				dropDownValidation : true
			}
		},
		messages : {
			update_user_name : {
				required : "Please Enter a Username",
			},
			update_mobile_no : {
				contactNum : "Please Enter a Valid Mobile Number",
				required : "please Enter a Mobile Number"
			},
			update_user_dep_type : {
				dropDownValidation : "Please Select a Department",
			},
			update_user_role : {
				dropDownValidation : "Please Select a Role",
			}
		},
		submitHandler : function(form, e) {
			e.preventDefault();
			try {
				let user_id = $('#userId').val();
				let name = $('#update_user_name').val();
				let user_email = $('#update_user_email').val();
				let mobile_number = $('#update_mobile_no').val();
				let department_type = $('#update_user_dep_type').val();
				let role_type = $('#update_user_role').val();
				
				window.depUserMasterController.addOrUpdateUser(user_id,user_email,user_email,name,null,mobile_number,role_type);
				
				$("#form_updateUser").trigger("reset");
				
				window.depUtlityController.removeError('form_updateUser');
				
			} catch (e) {
				$u.notify("error", "Error", "Something went Wrong");
			}
		}
	});
	
	
	
	/**
	 * update role form
	 */
	
	
	$('form[id="form_update_role_master"]').validate({
		rules : {
			update_dep_select_department :{
				dropDownValidation : true
			},
			update_name_role : "required",
			update_dep_select_type : "required"
		},
		messages : {
			update_dep_select_department : {
				dropDownValidation : "Please Select a Department Name",
			},
			update_name_role : {
				required : "Please Enter Role Name",
			},
			update_dep_select_type : {
				required : "Please Select Role Type"
			}
		},
		submitHandler : function(form, e) {
			e.preventDefault();
			try {
				let department_id = $('#update_dep_select_department').children("option:selected").val();
				let role_name = $('#update_name_role').val();
				
				let webChkLength = $("input[name='update_webChk']:checked").length;
				let mobileChkLength = $("input[name='update_mobileChk']:checked").length;
				
				if(webChkLength == 0 && mobileChkLength == 0){
					$u.notify("warning", "Notification", "Please select mobile application Or web application checkbox");
					return;
				}
				
				let web_tree_Agri = window.depRoleMasterController.getWebCheckedTreeNodes();
				let mob_tree_Agri = window.depRoleMasterController.getMobileCheckedTreeNodes();
				
				if(web_tree_Agri.getCheckedNodes().length == 0 && mob_tree_Agri.getCheckedNodes().length){
					$u.notify("info", "Notification", "Please select any module");
					return ;
				}
				
				let role_id = $('#roleId').val();
				
				let role_status = $('#edit_role_status').val();
				let _status;
				
				if(role_status == "Active"){
					_status = true;
				}else if(role_status == "Deactive"){
					_status = false;
				}
				
				let role_type = $('#update_dep_select_type').val();
				
				let roleObj = prepareRoleData(role_id,department_id,role_name,web_tree_Agri,mob_tree_Agri,webChkLength,mobileChkLength,_status,role_type);
				
				let postData = JSON.stringify(roleObj);
					
				window.depRoleMasterController.addOrUpdateRole(postData);
				
				$("#form_update_role_master").trigger("reset");

			} catch (e) {
				$u.notify("error", "Error", "Something went Wrong");
			}
		}
	});
	
	

	/**
	 * update department form
	 */
	$('form[id="form_updateDepartment"]').validate({
		rules : {
			edit_dep_name : "required",
			edit_created_by : "required",
			/*
			 * created_date : { dateFormat : true },
			 */
			edit_user_des : "required",
		},
		messages : {
			edit_dep_name : {
				required : "Please Enter a Department Name",
			},
			edit_created_by : {
				required : "Please Enter Name",
			},
			edit_user_des : {
				required : "Please Enter a Description",
			}
		},
		submitHandler : function(form, e) {
			e.preventDefault();
			try {
				let department_id = $("#departmentId").val();
				let department_name = $('#edit_dep_name').val();
				let user_name = $('#edit_created_by').val();
				let dep_description = $('#edit_user_des').val();
				let dep_status = $('#edit_dep_status').val();
				
				let _status;
				
				if(dep_status == "Active"){
					_status = true;
				}else if(dep_status == "Deactive"){
					_status = false;
				}

				let user_id = localStorage.getItem("user_data");

				if (user_id == undefined || user_id === null || user_id == "") {
					return;
				}

				window.depDepartmentMasterController.addOrUpdateDepartment(department_id,department_name,user_name,user_id,dep_description,_status);

				$("#form_updateDepartment").trigger("reset");

			} catch (e) {
				
				$u.notify("error", "Error", "Something went Wrong");
			}
		}
	});
	
	/**
	 * complaint response form
	 */
	$('form[id="form_response"]')
	.validate(
			{
				rules : {
					response : "required",
					
				},
				messages : {

					response : {
						required : "Response Should Not Be Blank",
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let complaint_id = $("#custId").val();
						let complaint_type = $("#resType").val();
						let complaint_email = $("#resEmail").val();
						let complaint_response = $('#response').val();
						
						
						
						window.depFeedbackSuggestionController.addResponse(complaint_id,complaint_type,complaint_email,complaint_response);
					
						$('#response').val("");
						
					} catch (e) {
						
						$u.notify("error", "Error",
								"Something went Wrong");
					}
				}
	});
	
	
	
	
	
	/**
	 * feedback response form
	 */
	
	$('form[id="form_feedback"]')
	.validate(
			{
				rules : {
					feedresponse : "required",
					
				},
				messages : {

					feedresponse : {
						required : "Response Should Not Be Blank",
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let feedback_id = $("#feedbackId").val();
						let feedback_type = $("#feedType").val();
						let feedback_email = $("#feedEmail").val();
						let feedback_response = $('#feedresponse').val();
						
						
						
						window.depFeedbackSuggestionController.addResponse(feedback_id,feedback_type,feedback_email,feedback_response);
						
						$('#feedresponse').val("");
						
					} catch (e) {
						
						console.log(e);
						$u.notify("error", "Error",
								"Something went Wrong");
					}
				}
	});
	
	/**
	 * suggestion response form
	 */
	
	
	$('form[id="form_suggestion"]')
	.validate(
			{
				rules : {
					suggestionresponse : "required",
				},
				messages : {
					suggestionresponse : {
						required : "Response Should Not Be Blank",
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let suggestion_id = $("#suggestionId").val();
						let suggestion_type = $("#suggestionType").val();
						let suggestion_email = $("#suggestionEmail").val();
						let suggestion_response = $('#suggestionresponse').val();
						
						
						
						window.depFeedbackSuggestionController.addResponse(suggestion_id,suggestion_type,suggestion_email,suggestion_response);
						
						$('#suggestionresponse').val("");
						
					} catch (e) {
						
						$u.notify("error", "Error",
								"Something went Wrong");
					}
				}
	});
	
	/**
	 * add event form
	 */
	
	$('form[id="form_dep_events"]')
	.validate(
			{
				rules : {
					dep_event_department : "required",
					event_name : "required",
					event_venue : "required",
					event_sdate : "required",
					//event_edate : "required",
					/*event_edate: { 
						required : true,	
						//greaterThan: true
					},*/
					event_efee : {
						required : true,
						numericVal : true,
					},
					event_email : "required",
					event_conno : {
						required : true,
						contactNum : true,
						minlength : 10,
						maxlength : 10
					},
					event_latitude : "required",
					event_longitude : "required",
					event_file : "required"
				},
				messages : {
					dep_event_department : {
						required : "Please Select Department"
					},
					event_name : {
						required : "Please Enter Event Name",
					},
					event_venue : {
						required : "Please Enter Event Venue",
					},
					event_sdate : {
						required : "Please Enter Date",
					},
					/*event_edate : {
						//greaterThan: "End date must be grater than startdate",
						required : "Please enter end date",
					},*/
					event_efee : {
						required : "Please Enter Event Fee",
						numericVal : "Please Enter Numeric Value",
					},
					event_email : {
						required : "Please Enter Email Id",
					},
					event_conno : {
						required : "Please Enter Contact Number",
						contactNum : "Please Enter Valid Contact Number",
					},
					event_latitude : {
						required : "Please Enter Latitude",
					},
					event_longitude : {
						required : "Please Enter Longitude",
					},
					event_file : {
						required : "Please Upload File",
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let department_id = $('#dep_event_department').val();
						let ev_name = $('#event_name').val();
						let ev_desc = $('#event_desc').val();
						let ev_vanue = $('#event_venue').val();
						
						let dates = $('#event_sdate').val().split("-");
						
						let ev_sdate = "";
						let ev_edate = "";

						if(dates.length > 0){
							ev_sdate = $('#event_sdate').val().split("-")[0].trim();
							ev_edate = $('#event_sdate').val().split("-")[1].trim();
						}
						
//						let ev_sdate = $('#event_sdate').val();
//						let ev_edate = $('#event_edate').val();

						let evt_addr = $('#event_webaddress').val();
						let ev_fee = $('#event_efee').val();
						let ev_cperson = $('#event_cperson').val();
						let ev_email = $('#event_email').val();

						let ev_mnumber = $('#event_conno').val();
						let ev_organizer = $('#event_Organizer').val();
						let ev_latitude = $('#event_latitude').val();
						let ev_longitude = $('#event_longitude').val();
						let ev_upfile = $('#event_file')[0].files;

						let inValidFile = window.depUtlityController.isValidFiles($('#event_file')[0].files,otherFormFlag);
						
						if(inValidFile){
							$('#event_file')[0].value = "";
							$u.notify("info", "Notification","Unsupported file selected, please select only pdf , doc , png , jpg file");
							return false;
						}
						
						let status_id;
						
						let status = window.depUtlityController.getStatusList();
						let data = JSON.parse(status.responseText).data;
						
						if(data.length > 0){
							// department status id
							status_id = data[1].status_id;
						}
						
						// console.log("Department status id --" +status_id);
						
						window.eventController.addEvent(department_id,ev_name,
								ev_desc, ev_vanue, ev_sdate, ev_edate,
								evt_addr, ev_fee,
								ev_cperson, ev_email, ev_mnumber,
								ev_organizer, ev_latitude,
								ev_longitude, ev_upfile,status_id);
						
						$("#form_dep_events").trigger('reset');
						
						window.depEventController.getEventList();
						

					} catch (e) {
						$u.notify("error", "Error",
								"Something went Wrong");
					}
				}
	});

/**
 * edit event form
 */
	$('form[id="form_edit_dep_events"]')
	.validate(
			{
				rules : {
					edit_event_name : "required",
					edit_event_venue : "required",
					edit_event_sdate : "required",
					//edit_event_edate : "required",
					edit_event_efee : {
						required : true,
						numericVal : true,
					},
					edit_event_email : "required",
					edit_event_conno : {
						required : true,
						contactNum : true,
						minlength : 10,
						maxlength : 10
					},
					edit_event_latitude : "required",
					edit_event_longitude : "required",
					// edit_event_file : "required"
				},
				messages : {

					edit_event_name : {
						required : "Please Enter Event Name",
					},
					edit_event_venue : {
						required : "Please Enter Event Venue",
					},
					edit_event_sdate : {
						required : "Please Enter Date",
					},
					/*edit_event_edate : {
						required : "Please enter end date",
					},*/
					edit_event_efee : {
						required : "Please Enter Event Fee",
						numericVal : "Please Enter Numeric Value",
					},
					edit_event_email : {
						required : "Please Enter Email Id",
					},
					edit_event_conno : {
						required : "Please Enter Contact Number",
						contactNum : "Please Enter Valid Contact Number",
					},
					edit_event_latitude : {
						required : "Please Enter Latitude",
					},
					edit_event_longitude : {
						required : "Please Enter Longitude",
					},
					/*
					 * edit_event_file : { required : "Please upload file", },
					 */
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let d_id = $('#dep_event_update_department').val();
						
						let evt_id = $("#eventId").val();
						let evt_name = $('#edit_event_name').val();
						let evt_description = $('#edit_event_desc').val();
						let evt_venue = $('#edit_event_venue').val();
						
//						let evt_sdate = $('#edit_event_sdate').val();
//						let evt_edate = $('#edit_event_edate').val();
						
						let dates = $('#edit_event_sdate').val().split("-");

						let evt_sdate = "";
						let evt_edate = "";
						
						if(dates.length > 0){
							evt_sdate = dates[0].trim();
							evt_edate = dates[1].trim();
						}
						
						let evt_adress = $('#edit_event_webaddress').val();
						let evt_fee = $('#edit_event_efee').val();
						let evt_cperson = $('#edit_event_cperson').val();
						let evt_email = $('#edit_event_email').val();
						let evt_con_no = $('#edit_event_conno').val();
						let evt_organizer = $('#edit_event_Organizer').val();
						let et_lat = $('#edit_event_latitude').val();
						let evt_long = $('#edit_event_longitude').val();
						
						/**
						 * add for status update
						 */
						let status_id = $("#statusId").val();
						
						window.depEventController.updateEvent(d_id,evt_id,evt_name,evt_description,evt_venue,evt_sdate,evt_edate,
								evt_adress,evt_fee,evt_cperson,evt_email,evt_con_no,evt_organizer,et_lat,evt_long,status_id);
						
						$("#form_edit_dep_events").trigger('reset');
						
						window.depEventController.getEventList();
						

					} catch (e) {
						$u.notify("error", "Error",
								"Something went wrong in update event form");
					}
				}
	});
	
	
	/**
	 * change password form
	 */
	$('form[id="form_changePassword"]')
			.validate(
					{
						rules : {
							chng_password : {
								required: true,
								diffVal: true
							},
							new_password : {
								required: true,
								diffVal: true,
								pwdVal: true
							},
							confirm_password : {
								required: true,
								equalTo: "#new_password"
							}
						},
						messages : {
							chng_password : {
								required : "Please Enter Password",
								diffVal: "New Password Should Not Be Same As Current Password"
							},
							new_password : {
								required : "Please Enter New Password",
								pwdVal: "Password Must Contain One Number, One Uppercase Letter, One Lowercase Letter and At Least 8 Characters",
								diffVal: "New Password Should Not Be Same As Current Password"
							},
							confirm_password : {
								required : "Please Confirm New Password",
								equalTo: "New Password and Confirm Password Should Be Same"
							}
						},
						submitHandler : function(form, e) {
							e.preventDefault();
							try {
								let password = $('#chng_password').val();
								let new_password = $('#new_password').val();
								let user_id = localStorage.getItem("user_data");
    							if(!user_id || user_id === null){
    								$u.notify("warning", "Warning","User information not found !");
									return false;
    							}
    							let obj = {password: password, newPassword: new_password, userId : user_id};

    							window.depUtlityController.changePassword(obj);
							
// $('#form_changePassword').trigger('reset');
								window.depUtlityController.removeError('form_changePassword');
							
							} catch (e) {
								$u.notify("error", "Error",
										"Something went wrong");
							}
						}
					});
	
	
	
	$('form[id="form_addMilestone"]')
	.validate(
			{
				rules : {
					mst_milestone_name : "required",
					mst_description : "required",
					mst_start_date : "required",
					mst_end_date : "required",
					milestone_status : {
						dropDownValidationMileStone : true
					}
				},
				messages : {
					mst_milestone_name : {
						required : "Please Enter Milestone Name"
					},
					mst_description : {
						required : "Please Enter Description"
					},
					mst_start_date : {
						required : "Please Select Start Date"
					},
					mst_end_date : {
						required : "Please Select End Date"
					},
					milestone_status : {
						dropDownValidationMileStone : "Please Select Milestone Status"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let milestone_name = $('#mst_milestone_name').val();
						let description = $('#mst_description').val();
						let start_date = $('#mst_start_date').val();
						let end_date = $('#mst_end_date').val();
						let remarks = $('#mst_remarks').val();
						let project_id = $('#select_project').val();
						let status = $('#milestone_status').val();
						let mst_upFiles = $('#mst_images')[0].files;
						
						
						if(project_id == "" || project_id == undefined || project_id == null || project_id == "0"){
							$u.notify('warning', 'Notification',
									'Please select project first', '');
							return;
						}
						
						let inValidFile = window.depUtlityController.isValidFiles($('#mst_images')[0].files,1);
						if(inValidFile){
							$('#mst_images')[0].value = "";
							$u.notify("warning", "Notification","Please select only png or jpg files");
							return false;
						}
						
						let mst_upDocs = $('#mst_documents')[0].files;
						
						let inValidDoc = window.depUtlityController.isValidFiles($('#mst_documents')[0].files,3);
						if(inValidDoc){
							$('#mst_documents')[0].value = "";
							$u.notify("warning", "Notification","Please select only pdf or doc or excel files");
							return false;
						}
						
						let obj = {milestone_name: milestone_name, description: description, start_date: formatDate(start_date),
								end_date: formatDate(end_date), milestone_status : status,remarks: remarks, project_id: project_id };
						
						
						let requestData = new FormData();
						let images = "", documents = "";
						for(var i = 0;i<mst_upFiles.length;i++){
							images += mst_upFiles[i].name + (i < (mst_upFiles.length - 1) ? "," : "");
							requestData.append('image_file', mst_upFiles[i]);
						}
						obj.image = images; 
						for(var i = 0;i<mst_upDocs.length;i++){
							documents += mst_upDocs[i].name + (i < (mst_upDocs.length - 1) ? "," : "");
							requestData.append('document_file', mst_upDocs[i]);
						}
						obj.document = documents;
						
						requestData.append('data', JSON.stringify(obj));

						window.depProjectMonitoringController.addOrUpdateMilestone(requestData);
					
						$('#form_addMilestone').trigger('reset');
						window.depUtlityController.removeError('form_addMilestone');
						window.depProjectMonitoringController.getProjectList();
					
					} catch (e) {
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	function formatDate(inputDate){
		if(inputDate === undefined || inputDate === null){
			return "";
		}
		var arr = inputDate.split("-");
		if(arr.length === 3) {
			return arr[2] + "-" + arr[1] + "-" + arr[0];
		}else {
			return "";
		}
		
	}
	/**
	 * update milestone form
	 */
	
	$('form[id="form_updateMilestone"]')
	.validate(
			{
				rules : {
					mstUp_milestone_name : "required",
					mstUp_description : "required",
					mstUp_start_date : "required",
					mstUp_end_date : "required"
				},
				messages : {
					mstUp_milestone_name : {
						required : "Please Enter Milestone Name"
					},
					mstUp_description : {
						required : "Please Enter Description"
					},
					mstUp_start_date : {
						required : "Please Select Start Date"
					},
					mstUp_end_date : {
						required : "Please Select End Date"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let milestone_name = $('#mstUp_milestone_name').val();
						let description = $('#mstUp_description').val();
						let start_date = $('#mstUp_start_date').val();
						let end_date = $('#mstUp_end_date').val();
						let remarks = $('#mstUp_remarks').val();
						let status = $('#mstUp_milestone_status').val();
						let project_id = $('#select_project').val();
						let milestone_id = $('#milestoneId').val();
						
						
						if(project_id == "" || project_id == undefined || project_id == null || project_id == "0"){
							$u.notify('warning', 'Notification',
									'Please select project first', '');
							return;
						}
						
						let mstUp_upFiles = $('#mstUp_images')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#mstUp_images')[0].files,1);
						
						if(inValidFile){
							$('#mstUp_images')[0].value = "";
							$u.notify("warning", "Notification","Please select only png or jpg files");
							return false;
						}
						
						let mstUp_upDocs = $('#mstUp_documents')[0].files;
						let inValidDoc = window.depUtlityController.isValidFiles($('#mstUp_documents')[0].files,3);
						
						if(inValidDoc){
							$('#mstUp_documents')[0].value = "";
							$u.notify("warning", "Notification","Please select only pdf or doc or excel files");
							return false;
						}
						
						let obj = {milestone_id: milestone_id, milestone_name: milestone_name, description: description, 
								start_date: formatDate(start_date), end_date: formatDate(end_date),milestone_status : status, remarks: remarks, project_id: project_id };

						/**
						 * Checking for Image Files
						 */
						let newFiles = "";
						
						$('.filename ul li').each(function(i)
						{
							newFiles += $(this).attr('value') + ",";
						});
						
						var oldArray = newFiles.split(",");
						var newArray = oldArray.filter(function(v){return v!==''});
						
						let requestData = new FormData();
						let images = "", documents = "";
						
						for(var i = 0;i<mstUp_upFiles.length;i++){
								images += mstUp_upFiles[i].name + (i < (mstUp_upFiles.length - 1) ? "," : "");
								requestData.append('image_file', mstUp_upFiles[i]);
						}
						
						for(let a=0;a< newArray.length ;a++){
							let imgs = images.split(",");
								if(!imgs.includes(newArray[a])){
									images +=  "," + newArray[a] ;
								}
						}
						
						if(images.substr(images.length - 1) == ","){
							images = images.substring(0,images.length - 1);
						}
						
						if(images.charAt(0) == ","){
							images = images.substring(1,images.length);
						}
						
						obj.image = images; 
						
						/**
						 * checking for Documents
						 */
						
						for(var i = 0;i<mstUp_upDocs.length;i++){
							documents += mstUp_upDocs[i].name + (i < (mstUp_upDocs.length - 1) ? "," : "");
							requestData.append('document_file', mstUp_upDocs[i]);
						}
						
						let newDocFiles = "";
						
						$('.docname ul li').each(function(i)
						{
							newDocFiles += $(this).attr('value') + ",";
						});
						
						var oldDocArray = newDocFiles.split(",");
						var newDocArray = oldDocArray.filter(function(v){return v!==''});
						
						for(let a=0;a< newDocArray.length ;a++){
							let docs = documents.split(",");
								if(!docs.includes(newDocArray[a])){
									documents +=  "," + newDocArray[a] ;
								}
						}
						
						if(documents.substr(documents.length - 1) == ","){
							documents = documents.substring(0,documents.length - 1);
						}
						
						if(documents.charAt(0) == ","){
							documents = documents.substring(1,documents.length);
						}
						
						obj.document = documents;
						
						requestData.append('data', JSON.stringify(obj));
						
						window.depProjectMonitoringController.addOrUpdateMilestone(requestData);
						window.depUtlityController.removeError('form_updateMilestone');
						window.depProjectMonitoringController.getProjectList();
					} catch (e) {
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	prepareRoleData : function prepareRoleData(role_id,department_id,role_name,web_tree_Agri,mob_tree_Agri,webChkLength,mobileChkLength,_status,role_type){
		
		var _web_permissions = [];
		var _mobile_permissions= [];
			
		let roleObj;
			
			if(webChkLength > 0 && mobileChkLength == 0){
				
				for(let node in web_tree_Agri.getCheckedNodes()){
					let child_node = web_tree_Agri.getCheckedNodes()[node];
					_web_permissions.push({'module_id':child_node});
				}
				
				roleObj = {
					
						role_id : role_id,
						department_id : department_id,
						role_name : role_name,
						web_application:true,
						mobile_application:false,
						web_permissions : _web_permissions,
						is_active : _status,
						role_type : role_type
				};
			
			}else if(mobileChkLength > 0 && webChkLength == 0){
				
				for(let node in mob_tree_Agri.getCheckedNodes()){
					let child_node = mob_tree_Agri.getCheckedNodes()[node];
					_mobile_permissions.push({'module_id':child_node});
				}
				
				roleObj = {
						role_id : role_id,
						department_id : department_id,
						role_name : role_name,
						web_application:false,
						mobile_application:true,
						mobile_permissions : _mobile_permissions,
						is_active : _status,
						role_type : role_type
				};
			
			}else if(mobileChkLength > 0 && webChkLength > 0){
				
				for(let node in web_tree_Agri.getCheckedNodes()){
					let child_node = web_tree_Agri.getCheckedNodes()[node];
					_web_permissions.push({'module_id':child_node});
				}
				
				
				for(let node in mob_tree_Agri.getCheckedNodes()){
					let child_node = mob_tree_Agri.getCheckedNodes()[node];
					_mobile_permissions.push({'module_id':child_node});
				}
				
				roleObj = {
						role_id : role_id,
						department_id : department_id,
						role_name : role_name,
						mobile_application:true,
						web_application:true,
						web_permissions : _web_permissions,
						mobile_permissions : _mobile_permissions,
						is_active : _status,
						role_type : role_type
				};
			}
			return roleObj;
		}
	

})(window, jQuery)