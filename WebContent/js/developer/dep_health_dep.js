(function(global, $) {
	"use stricts;"
	
	
	var base = {
			
			addData: function addData(obj, files){

				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let requestData = new FormData();
				let images = "";
				for(var i = 0; i < files.length; i++){
					images += files[i].name + (i < (files.length - 1) ? "," : "");
					requestData.append('images', files[i]);
				}
				obj.data.geo_tagged_photo = images; 
				
				requestData.append('data', JSON.stringify(obj));
				
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
			
		}

	/**
	 * add public functions to base
	 */

	global.depHealthDepartment = base;

})(window, jQuery)