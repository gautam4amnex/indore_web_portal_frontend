(function(global, $) {
	"use stricts;"

	var base = {
			
			getIncidentIssueList : function getIncidentIssueList(_department_id,_incident_type){
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let result;
				
				let incidentObj = 
						{
							department_id : _department_id,
							incident_type : _incident_type
						}					
				
				let postData = JSON.stringify(incidentObj);
				
				$(".loader").fadeIn();
				
				return $.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/incident/getIncidentIssueList",
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
							} catch (err) {
								$(".loader").fadeOut();
								console.log(err);
							}
						} else {
							$(".loader").fadeOut();
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
	}

	/**
	 * add public functions to base
	 */

	global.depIncidentController = base;

})(window, jQuery)