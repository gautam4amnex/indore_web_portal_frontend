(function(global, $) {
	"use stricts;"

	var base = {

			addFeedBack : function addFeedBack(type,category,cmt,name,addr,city,pcode,m_no,email,lat,lng,u_id,file){
				let result;
				
				let feedbackObj = {
						type : type,
						department_id : category,
						comment : cmt,
						name : name,
						address : addr,
						city : city,
						pin_code : pcode,
						mobile_no : m_no,
						email : email,
						latitude : lat,
						longitude : lng,
						user_id : u_id,
					};
				
				let requestData = new FormData();
				
				for(var i = 0;i<file.length;i++){
					requestData.append('files', file[i]);
				}
				requestData.append('data', JSON.stringify(feedbackObj));

				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/feedback/addFeedback",
					enctype : 'multipart/form-data',
					processData : false,
					contentType : false,
					data : requestData,
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
								
								if(result.responseCode == "200"){
									$u.notify('success', 'Success',
											result.responseMessage, '');
								}else if(result.responseCode == "204"){
									$u.notify('info', 'Notification',
											result.responseMessage, '');
								}else{
									$u.notify('error', 'Error',
											'Something went wrong while adding your data', '');
								}
							} catch (err) {
								$(".loader").fadeOut();
								console.log(err);
							}
						} else {
							$(".loader").fadeOut();
							$u.notify('error', 'Notification',
									'data not available', '');
						}
					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
						$u.notify("info", "Notification",JSON.parse(e.responseText).responseMessage);
					}
				});
			},
			
			getDepartmentList : function getDepartmentList(){
				let result;
				
				$('#fs_category').empty().append('<option value="">Select Department</option>');
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user','');
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
										$('#fs_category').append(str);
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
									'Something went wrong', '');
						}
					},
					error : function(e) {
						console.log(e);
					}
				});
			
			}
		}

	/**
	 * add public functions to base
	 */

	global.feedbackController = base;

})(window, jQuery)