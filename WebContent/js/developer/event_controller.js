(function(global, $) {
	"use stricts;"

	var base = {

			addEvent : function addEvent(department_id,ev_name,ev_desc,ev_vanue,ev_sdate,ev_edate,evt_addr,ev_fee,
						ev_cperson,ev_email,ev_mnumber,ev_organizer,ev_latitude,ev_longitude,ev_upfile,_status){
				
				let result;
				
				let eventInfoObj = {
						department_id : department_id,
						event_name : ev_name,
						description : ev_desc,
						venue : ev_vanue,
						start_datetime : ev_sdate,
						end_datetime : ev_edate,
						web_address : evt_addr,
						entry_fees : ev_fee,
						contact_person : ev_cperson,
						email : ev_email,
						contact_no : ev_mnumber,
						organizer : ev_organizer,
						latitude : ev_latitude,
						longitude : ev_longitude,
						status : _status
				};
				
				let requestData = new FormData();
				
				for(var i = 0;i<ev_upfile.length;i++){
					requestData.append('files', ev_upfile[i]);
				}
				
				requestData.append('data', JSON.stringify(eventInfoObj));
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/event/addOrUpdateEvent",
					data : requestData,
					enctype : 'multipart/form-data',
					processData : false,
					contentType : false,
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
											'Something went wrong while adding event', '');
								}
								
								/**
								 * close pop-up
								 */
								
								window.depUtlityController.closePopup();
								
							} catch (err) {
								$(".loader").fadeOut();
								console.log(err);
							}
						} else {
							$(".loader").fadeOut();
							$u.notify('error', 'Error',
									'data not available', '');
						}
					},
					error : function(e) {
						$(".loader").fadeOut();
						$u.notify("info", "Notification",JSON.parse(e.responseText).responseMessage);
						console.log(e);
					}
				});
			},
		}

	/**
	 * add public functions to base
	 */

	global.eventController = base;

})(window, jQuery)