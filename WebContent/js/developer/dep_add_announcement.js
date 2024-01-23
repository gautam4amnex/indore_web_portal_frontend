(function(global, $) {
	"use stricts;"
	
	var base = {
			
			addAnnouncement : function addAnnouncement(title,description,user_id,latitude,longitude,address,ward_id){
					
					let uid = localStorage.getItem('user_data');
				
					let announcementObj = {
						"title":"Announcement 1",
						"description":"Announcement description",
						"user_id":uid,
						"latitude":"22.723228",
						"longitude":"75.875230",
						"address":"Test 123",
						"ward_id":1
					}
					
					let postData = JSON.stringify(announcementObj)
					
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
									let str = "";
									if (result.responseCode == '200') {
										$u.notify('success', 'Success',
												'Announcement added successfully', '');
									} else {
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
						}
					});
			},
			
		}

	/**
	 * add public functions to base
	 */

	global.depAnnouncementController = base;

})(window, jQuery)