(function(global, $) {
	"use stricts;"

	var base = {

			getAnnouncementList : function getAnnouncementList(){
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let result;
				
				let announcementInfoObj;
				
				let did = window.depUtlityController.getDepartmentId();
				
				if(did != window.departmentData._department_id){
					announcementInfoObj = {
							department_id : did
					}					
				}else{
					announcementInfoObj = {};
				}
				
				let postData = JSON.stringify(announcementInfoObj);
				
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/announcement/getAnnouncementList",
					data : postData,
					contentType : 'application/json',
					async : false,
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {
						$(".loader").fadeOut();
						if (!$.isEmptyObject(result) && result != null) {
							try {
								result = JSON.parse(result);
								let str = "";
								if (result.responseCode == '200') {
									let response = result.data;
									let length = result.data.length;
									if(length > 0){
										for (let i in result.data){
											let html = "<div class='aut-content'>"
//												+ (api_data.is_new && api_data.is_new === true ? 
//														"<button class='btn-indore new-announcement'>New!</button>" : "")
												+ "<h6>"+ result.data[i].announcement_title +"</h6>"
																+ "<span>" + result.data[i].announcement_datetime
																+ "</span><p>"+ result.data[i].announcement_description +"</p></div>";
											str += html;
										}
									}else{
										let html = "<div class='aut-content'><h6>No Announcements.</h6></div>";
										str += html;
									}
									$('#viewAnnouncement').append(str);
								} else {
									$(".loader").fadeOut();
									$u.notify('warning', 'Notification',
											result.responseMessage, '');
								}
							} catch (err) {
								$(".loader").fadeOut();
								console.log(err);
							}
						} else {
							$(".loader").fadeOut();
							$u.notify('info', 'Notification',
									'Announcement data not available', '');
						}
					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
					}
				});
			},
			getDepartmentList : function getDepartmentList(){
				
				let result;
				
				$('#to_annc').empty().append('<option value="">Select Type</option>');
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				$.ajax({
					method : 'GET',
					url : window.iscdl.appData.baseURL + "api/department/getDepartmentList",
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
										response.sort((a, b) => (a.department_name > b.department_name) ? 1 : -1);
										for (let i in response){
												let name = response[i].department_name;
												let id = response[i].deaprtment_id;
												str += "<option value='" + id + "'>" + name + "</option>";
										}
										$('#to_annc').append(str);
									}
								} else {
									$u.notify('warning', 'Notification',
											result.responseMessage, '');
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							$u.notify('info', 'Notification',
									'Department data is not available', '');
						}
					},
					error : function(e) {
						console.log(e);
					}
				});
			
			},
			addAnnouncement : function addAnnouncement(announce_category,announce_title
					,announce_desc,announce_latitude,announce_longitude,announce_date,user_id){
				
				
				let result;
				
				let announcementObj = {
						department_id : announce_category,
						announcement_title : announce_title,
						announcement_description : announce_desc,
						latitude : announce_latitude,
						longitude : announce_longitude,
						announcement_datetime : announce_date,
						user_id : user_id,
						
				};
				
				let postData = JSON.stringify(announcementObj);
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/announcement/addAnnouncement",
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
								
								if(result.responseCode == "200"){
									$u.notify('success', 'Success',
											result.responseMessage, '');
								}else{
									$u.notify('warning', 'Notification',
											result.responseMessage, '');
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
						console.log(e);
						let response = JSON.parse(e.responseText);
						if(response.responseCode == 401) {
							$u.notify("info", "Notification",JSON.parse(e.responseText).responseMessage);
						} else {
							$u.notify('error', '', 'Something went wrong' , '');
						}
						
						/*if(e.status === 403) {
							$u.notify('warning', 'Access denied !', e.responseJSON.responseMessage , '');
						} else {
							$u.notify('error', '', 'Something went wrong' , '');
						}*/
					}
				});
				
			},
			
		}

	/**
	 * add public functions to base
	 */

	global.depAnnouncementController = base;

})(window, jQuery)