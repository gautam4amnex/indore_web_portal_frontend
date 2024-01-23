(function(global, $) {
	"use stricts;"

	var base = {

			addMapData : function addMapData(ad_name,ad_upfile,ad_latitude,ad_longitude,ad_remarks,u_id){
				let result;
				
				let addDataObj = {
						name : ad_name,
						latitude : ad_latitude,
						longitude : ad_longitude,
						remarks : ad_remarks,
						user_id:u_id
				};
				
				let requestData = new FormData();
				
				for(var i = 0;i<ad_upfile.length;i++){
					requestData.append('files', ad_upfile[i]);
				}
				
				requestData.append('data', JSON.stringify(addDataObj));

				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/map_data/addMapData",
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
						
						$(".loader").fadeOut();
						
						if (!$.isEmptyObject(result) && result != null) {
							try {
								result = JSON.parse(result);
								let str = "";
								if (result.responseCode == '200') {
									$u.notify('success', '', result.responseMessage, '');
									
								} else {
									$u.notify('warning', '', result.responseMessage, '');
								}
							} catch (err) {
								$(".loader").fadeOut();
								console.log(err);
							}
						} else {
							$(".loader").fadeOut();
							$u.notify('warning', '', 'Data not available', '');
						}
					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
						$u.notify("info", "Notification",JSON.parse(e.responseText).responseMessage);
					}
				});
			},
			
		}

	/**
	 * add public functions to base
	 */

	global.addMapDataController = base;

})(window, jQuery)