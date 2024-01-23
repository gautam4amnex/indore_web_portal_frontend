(function(global, $) {
	"use stricts;"

	/*
	 * ------------ custom Validator methods start-----------------
	 * 
	 */
	
	var addDataFlag = 1;
	var otherFormFlag = 2;

	$.validator.addMethod("dropDownValidation",
			function(value, element, params) {
				try {
					return value == "" ? false : true;
				} catch (e) {
					return false
				}
			}, 'Please Select Catagory');

	$.validator.addMethod('contactNum', function(value, element) {
		return this.optional(element) || /^\d{10}$/.test(value);
	}, "Please Enter a Valid Phone Number");

	$.validator.addMethod('numericVal', function(value, element) {
		return /^\d*$/.test(value);
	}, "Please Enter a Numeric Value");
	
	// change password -> new password validator
	$.validator.addMethod('pwdVal', function(value, element) {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
	}, "Password Must Contain One Number, One Uppercase Letter, One Lowercase Letter and At Least 8 Characters");
	
	// change password -> current and new password validator
	$.validator.addMethod('diffVal', function(value, element) {
		return $("#chng_password").val() !== $("#new_password").val();
	}, "New Password Should Not Be Same As Current Password");
	
	
	// add data form submit

	/**
	 * add map data form
	 */
	$('form[id="form_addData"]')
			.validate(
					{
						rules : {
							ad_name : "required",
							ad_simage : "required",
							ad_latitude : "required",
							ad_longitude : "required",
						},
						messages : {

							ad_name : {
								required : "Please Enter a Name",
							},
							ad_simage : {
								required : "Please Upload Image",
							},
							ad_latitude : {
								required : "Please Enter a Latitude",
							},
							ad_longitude : {
								required : "Please Enter a Longitude",
							}
						},
						submitHandler : function(form, e) {
							e.preventDefault();
							try {
								let ad_name = $('#ad_name').val();
								let ad_upfile = $('#ad_simage')[0].files;
//								let ad_upfile = $('#ad_simage')[0].files;
								let ad_latitude = $('#ad_latitude').val();
								let ad_longitude = $('#ad_longitude').val();
								let ad_remarks = $('#ad_remark').val();
								
								let fs_user_id = localStorage.getItem("user_data");
    							if(!fs_user_id || fs_user_id === null){
    								fs_user_id = 0;
    							}

								let inValidFile = isValidFiles($('#ad_simage')[0].files,addDataFlag);
								
								
								if(inValidFile){
									$('#ad_simage')[0].value = "";
									$u.notify("info", "Notification","Unsupported file selected, please select only png , jpg file");
									return false;
								}
								
							window.addMapDataController.addMapData(ad_name,
										ad_upfile, ad_latitude, ad_longitude,
										ad_remarks, fs_user_id);
							
							$('#form_addData').trigger('reset');
							
							window.depUtlityController.removeError('form_addData');
							
							} catch (e) {
								$u.notify("error", "Error",
										"Something went Wrong");
							}
						}
					});
	
	/**
	 * feedback form
	 */
	$('form[id="form_feedback"]')
			.validate(
					{
						rules : {
							fs_category : {
								dropDownValidation : true
							},
							fs_pincode : {
								numericVal : true
							},
							fs_mobno : {
								contactNum : true
							},
							fs_latitude : "required",
							fs_email : "required",
							fs_longitude : "required",
							fs_upfile : "required"
						},
						messages : {

							fs_category : {
								dropDownValidation : "Please Select Department",
							},
							fs_pincode : {
								numericVal : "Please Enter Numeric Value",
							},
							fs_mobno : {
								required : "Please Enter Contact Number",
								contactNum : "Please Enter Valid Contact Number"
							},
							fs_latitude : {
								required : "Please Enter a Lattitude",
							},
							fs_email : {
								required : "Please Enter a Email",
							},
							fs_longitude : {
								required : "Please Enter a Longitude",
							},
							fs_upfile : {
								required : "Please Upload File",
							},
						},
						submitHandler : function(form, e) {
							e.preventDefault();
							try {
								let feedback_type = $(
										"input[name='fs']:checked").val();
								let fs_category = $('#fs_category').val();
								let fs_comment = $('#fs_comment').val();
								let fs_name = $('#fs_name').val();
								let fs_address = $('#fs_address').val();
								let fs_city = $('#fs_city').val();
								let fs_pincode = $('#fs_pincode').val();
								let fs_mobno = $('#fs_mobno').val();
								let fs_latitude = $('#fs_latitude').val();
								let fs_email = $('#fs_email').val();
								let fs_longitude = $('#fs_longitude').val();
								let fs_upfile = $('#fs_upfile')[0].files;
								
								let fs_user_id = localStorage.getItem("user_data");
    							
								if(fs_user_id == "" || fs_user_id == null || fs_user_id == undefined){
    								$u.notify("info", "Notification","User Id was null");
									return false;
    							}
								
								let inValidFile = isValidFiles($('#fs_upfile')[0].files,otherFormFlag);
								
								if(inValidFile){
									$('#fs_upfile')[0].value = "";
									$u.notify("info", "Notification","Unsupported file selected, please select only pdf , doc , png , jpg file");
									return;
								}else{
											window.feedbackController
											.addFeedBack(feedback_type,
													fs_category, fs_comment,
													fs_name, fs_address, fs_city,
													fs_pincode, fs_mobno, fs_email,
													fs_latitude, fs_longitude,fs_user_id,
													fs_upfile);
					
									$("#form_feedback").trigger('reset');
									window.depUtlityController.removeError('form_feedback');					
								}

							} catch (e) {
								$u.notify("error", "Error",
										"Something went Wrong");
							}
						}
					});
	/**
	 * add map events form
	 */
	$('form[id="form_events"]')
			.validate(
					{
						rules : {
							event_citizen : {
								dropDownValidation : true
							},
							event_name : "required",
							event_venue : "required",
							event_sdate : "required",
							//event_edate : "required",
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
							event_citizen : {
								dropDownValidation : "Please Select Department"
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

								let department_id = $('#event_citizen').val();
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
								
								//let ev_sdate = $('#event_sdate').val();
								//let ev_edate = $('#event_edate').val();
								
								
								let evt_addr = $('#event_webaddress').val();
								let ev_fee = $('#event_efee').val();
								let ev_cperson = $('#event_cperson').val();
								let ev_email = $('#event_email').val();

								let ev_mnumber = $('#event_conno').val();
								let ev_organizer = $('#event_Organizer').val();
								let ev_latitude = $('#event_latitude').val();
								let ev_longitude = $('#event_longitude').val();

								let ev_upfile = $('#event_file')[0].files;

								let inValidFile = isValidFiles($('#event_file')[0].files,otherFormFlag);
								
								if(inValidFile){
									$('#event_file')[0].value = "";
									$u.notify("info", "Notification","Unsupported file selected, please select only pdf , doc , png , jpg file");
									return false;
								}
								
								let status_id;
								let status = window.depUtlityController.getStatusList();
								let data = JSON.parse(status.responseText).data;
								
								if(data.length > 0){
									//citizen status id
									status_id = data[0].status_id;
								}
								
								//console.log("Citizen status Id --" +status_id);
								
								window.eventController.addEvent(department_id,ev_name,
										ev_desc, ev_vanue, ev_sdate, ev_edate,
										evt_addr, ev_fee,
										ev_cperson, ev_email, ev_mnumber,
										ev_organizer, ev_latitude,
										ev_longitude, ev_upfile,status_id);
								
								$("#form_events").trigger('reset');
								
								window.depUtlityController.removeError('form_events');

							} catch (e) {
								$u.notify("error", "Error",
										"Something went Wrong");
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
							
//								$('#form_changePassword').trigger('reset');
    							
								window.depUtlityController.removeError('form_changePassword');
							
							} catch (e) {
								$u.notify("error", "Error",
										"Something went wrong");
							}
						}
					});
	
	
	
	function addGraphic(pt) {
		var symbol = new SimpleMarkerSymbol(
				SimpleMarkerSymbol.STYLE_CIRCLE, 12,
				new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
						new Color([ 0, 0, 255, 1.0 ]), 8), new Color([
						0, 0, 255, 1.0 ]));
		graphic = new Graphic(pt, symbol);
		map.graphics.add(graphic);
	}
	
	
		function isValidFiles(files , flag){
			let extensionCheck;
			if(flag == 1){
				extensionCheck = [ "png", "jpg", "PNG" , "JPG" , "JPEG" , "jpeg" ];
			}else if(flag == 2){
				extensionCheck = [ "pdf", "doc",  "docx" ,"png", "PNG","jpg","JPG" , "jpeg" , "JPEG" ];
			}
			
			let inValidFile = false; 
			
			for (var i = 0; i < files.length; i++) {
				let file = files[i];
				let extension = file.name.substring(file.name.lastIndexOf('.') + 1); 
					
				if(!extensionCheck.includes(extension)){
						inValidFile = true;
						break;
				}
			}
			
			return inValidFile;
		}
		
		function convertDate(date){

			let final_date = null;
			let sdate = date.split("/");
			
			if(sdate.length > 0){
				let month = sdate[0]
				let date = sdate[1]
				let year = sdate[2]
				final_date = year + "/" + month + "/" + date ;
			}	
				
			return final_date;
			
		}
		
})(window, jQuery)