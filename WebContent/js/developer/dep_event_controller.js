(function(global, $) {
	"use stricts;"
	
	var table;

	var base = {
			
			getEventList : function getEventList(){
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let result;
				let EventInfoObj;
				
				let did = window.depUtlityController.getDepartmentId();
				
				if(did != window.departmentData._department_id){
					EventInfoObj = {
							department_id : did
					}					
				}else{
					EventInfoObj = {};
				}
				
				let postData = JSON.stringify(EventInfoObj);
				
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/event/getEventList",
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
								
								if(result.responseCode == "200"){
									let data = result.data;
									window.depEventController.createEventTable(data);
								}
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
			createEventTable : function createEventTable(eventListData){
				
				let columns = window.depEventController.createColumns();
				let columnDefs = window.depEventController.createColumnDefs();
				window.depUtlityController.prepareDataTable("depCitizenMaster",columns,columnDefs,eventListData);
			},
			createColumns : function createColumns(){
				
				let columns = [
					{ 
						"data" : null,
						"title" : "Sr No"
					},{ 
						"data" : "event_name" ,
						"title" : "Event Name" 
					},
		            {
						"data" : "description"  ,
						"title" : "Description"
					},
		            {
						"data" : "venue"  ,
						"title" : "Venue"
					},
				    {
						"data" : "start_datetime"  ,
						"title" : "Start Date & Time"
					},
					{
						"data" : "end_datetime"  ,
						"title" : "End Date & Time"
					},
					
					{
						"data" : "web_address"  ,
						"title" : "Web Address"
					},
					{
						"data" : "entry_fees"  ,
						"title" : "Entry Fee"
					},
					{
						"data" : "contact_person"  ,
						"title" : "Contact Person"
					},
					{
						"data" : "email"  ,
						"title" : "Email"
					},
					{
						"data" : "contact_no"  ,
						"title" : "Contact No"
					},
					{
						"data" : "organizer"  ,
						"title" : "Organizer"
					},
					{
						"data" : "latitude"  ,
						"title" : "Latitude"
					},
					{
						"data" : "longitude"  ,
						"title" : "Longitude"
					},
					{
						"data" : "status_name"  ,
						"title" : "Status"
					},
					
			]
		            
		    return columns;
				
			},
			
			
			createColumnDefs : function createColumnDefs(){
				
				let columnDefs = [
					{
						"targets": 0,
						"searchable": false,
			            "width": "5%",
			            "render": function(data, type, full, meta) {
			            	return meta.row + 1;
			             },
			        },
					{
						"targets": 15,
						"data" : "file",
						"title" : "View File",
						"render" : function(data, type, row,
								meta) {
							return '<button id="open_image" name="open_image" ' + 
							 'data-image = "'+data+'" class="btn action-btn" ' + 
							 ' onclick="window.depEventController.openImage(event)" >' +
							 '<span class="fa fa-picture-o" aria-hidden="true"></span> </button > ';
						}
					},
					
						{
							"targets": 16,
							"data" : "status",
							"title" : "Update Status",
							
							"render" : function(data, type, row,
									meta) {
								
								let evt_id = row.event_id;
								let evt_name = row.event_name;
								let evt_email = row.email;
								let status_id = row.status;
								let status_name = row.status_name;
								
								if(status_id == "1"){
									return "<a href='#' data-toggle='tooltip' data-placement='top' title='Approve' class='status-approve' data-row='"+JSON.stringify(row)+"' onclick='window.depEventController.approveEvent(event);' ><i class='fa fa-check'></i></a>" +
									"<a data-toggle='tooltip' data-placement='top' title='Reject' href='#' data-row='"+JSON.stringify(row)+"' onclick='window.depEventController.RejectEvent(event);' class='status-reject'><i class='fa fa-close'></i></a>";
								}else if(status_id == "2" || status_id == "3"){
									return "";
								}
							}
						},
						{
								"targets": 17,
								"data" : "event_id",
								"title" : "Action",
								"render" : function(data, type, row,
										meta) {
									
										return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"' data-toggle='modal' data-target='#dep_edit_event' " +
										"onclick='window.depEventController.displayEvent(this);'> "+
								"<span class='fa fa-edit' aria-hidden='true'></span> </button > "+
								" <button name='delete' class='btn action-btn' data-row='"+JSON.stringify(row)+"' onclick='window.depEventController.deleteEvent(this);'> "+
								"<span class='fa fa-trash' aria-hidden='true'></span> </button >";
								}
						},
						       
						]
				return columnDefs;	
			},
			openImage : function openImage(){
				
				let fileNames = $(event.currentTarget).data('image');
				var files = fileNames.split(",");
				for(var i = 0 ;i<files.length;i++){
					$("#carousel-inner").append("<div class='carousel-item"+ 
							(i === 0 ? " active'>" : "'>") +"<img class='d-block w-100' src='"+
							window.iscdl.appData.baseURL + "api-docs/getImage/events/" + encodeURIComponent(files[i])  
							+"' alt='"+files[i]+"'> </div>");
				}
				$("#imageModal").show();
			},
			displayEvent : function displayEvent(data){
				let row = $(data).data('row');
				window.depEventController.fillFormData(row);
			},
			
			fillFormData : function fillFormData(row){
				
				window.depUtlityController.getDepartmentList('dep_event_update_department');
				
				$("#eventId").val(row.event_id);
				$("#statusId").val(row.status);
				
				$('#edit_event_name').val(row.event_name);
				$('#edit_event_desc').val(row.description);
				$('#edit_event_venue').val(row.venue);

				if(row.department_id == null || row.department_id == "" || row.department_id == undefined){
					$('select option[value=""]').attr("selected",true);
				}else{
					$('select option[value='+row.department_id+']').attr("selected",true);
				}
				
				//$("#edit_event_sdate").datepicker( "setDate" ,row.start_datetime );
				//$("#edit_event_edate").datepicker( "setDate" ,row.end_datetime );
				
				
				let startTime = row.start_datetime;
				let endTime = row.end_datetime;
				
				if(startTime == null || endTime == null){
					$("#edit_event_sdate").val("");	
				}else{
					startTime = startTime.replaceAll("-","/");
					endTime = endTime.replaceAll("-","/");
					let fullDate = startTime + " - " + endTime;
					$("#edit_event_sdate").val(fullDate);	
				}
				
				//$("#edit_event_sdate").val(row.start_datetime);
				//$("#edit_event_edate").val(row.end_datetime);
				
				$('#edit_event_webaddress').val(row.web_address);
				$('#edit_event_efee').val(row.entry_fees);
				$('#edit_event_cperson').val(row.contact_person);
				$('#edit_event_email').val(row.email);
				$('#edit_event_conno').val(row.contact_no);
				$('#edit_event_Organizer').val(row.organizer);
				$('#edit_event_latitude').val(row.latitude);
				$('#edit_event_longitude').val(row.longitude);
			},
			approveEvent : function approveEvent(data){
				let row_data = $(event.currentTarget).data('row');
				//let status_list = window.depUtlityController.getStatusList();
				let status = "2";
				let status_name = "Approved";
				window.depEventController.approveOrRejectEvent(row_data.event_id,row_data.event_name,status,row_data.email,status_name);
			},
			RejectEvent : function RejectEvent(data){
				let row_data = $(event.currentTarget).data('row');
				let status = "3";
				let status_name = "Rejected";
				window.depEventController.approveOrRejectEvent(row_data.event_id,row_data.event_name,status,row_data.email,status_name);
			},
			
			updateEvent : function updateEvent(d_id,ev_id,ev_name,ev_desc,ev_vanue,ev_sdate,ev_edate,evt_addr,ev_fee,
					ev_cperson,ev_email,ev_mnumber,ev_organizer,ev_latitude,ev_longitude,ev_status_id/*,ev_upfile*/){
			
			let result;
			
			let eventInfoObj = {
					
					department_id : d_id,
					event_id : ev_id,
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
					status : ev_status_id
			};
			
			let requestData = new FormData();
			
			/*for(var i = 0;i<ev_upfile.length;i++){
				requestData.append('files', ev_upfile[i]);
			}*/
			requestData.append('data', JSON.stringify(eventInfoObj));
			
			let token_val = localStorage.getItem('token');
			
			if(token_val == "" || token_val == undefined || token_val == null){
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
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
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							
							if(result.responseCode == "200"){
								$u.notify('success', 'Success',
										result.responseMessage, '');
							}else{
								$u.notify('error', 'Notification',
										result.responseMessage, '');
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
								'data not available', '');
					}
				},
				error : function(e) {
					console.log(e);
					
				}
			});
			},
			deleteEvent : function deleteEvent(data){

			let result;

			let token_val = localStorage.getItem('token');

			if (token_val == "" || token_val == undefined || token_val == null) {
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			if (confirm("Are you sure to delete data ?")) {
				
					let row = $(data).data('row');
					let e_id = row.event_id;
					
					let eventObj = {
							event_id : e_id,	
					};
					
					let postData = JSON.stringify(eventObj);
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL
								+ "api/event/deleteEvent",
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
									if (result.responseCode == "200") {
										$u.notify('success', 'Success',
												result.responseMessage, '');
									
									}else if(result.responseCode == "204"){
										
										$u.notify('info', 'Notification',
												result.responseMessage, '');
									
									} else {
										$u.notify('error', 'Notification',
												'Error while delete data', '');
									}
									window.depEventController.getEventList();
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
				
			}else{
				 return false;
			}	
		},
			approveOrRejectEvent : function approveOrRejectEvent(_evt_id,_evt_name,_status_id,_email,_status_name){
			
			let token_val = localStorage.getItem('token');

			if (token_val == "" || token_val == undefined || token_val == null) {
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			let evt_obj = {	
				"event_id": _evt_id, 
				"event_name": _evt_name,
				"status": _status_id, 
				"email": _email,
				"status_name": _status_name
			}
			
			let postData = JSON.stringify(evt_obj);
			
			$(".loader").fadeIn();
			
			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL
						+ "api/event/approveOrRejectEvent ",
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
							if (result.responseCode == "200") {
								$u.notify('success', 'Success',
										result.responseMessage, '');
							}else if(result.responseCode == "204"){
								
								$u.notify('info', 'Notification',
										result.responseMessage, '');
							} else {
								$u.notify('error', 'Notification',
										'Error while delete data', '');
							}
							window.depEventController.getEventList();
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
				}
			});
		},
		getStatusNameByStatusId : function getStatusNameByStatusId(status_id){
			
			let status_name;
			
			switch (status_id) {
			case "1":
				status_name = _pending
				break;

			case "2":
				status_name = _approved
				break;	
			
			case "3":
				status_name = _rejected
				break;
				
			default:
				status_name = ""
				break;
			}
			
			return status_name;
			
		}
	}

	/**
	 * add public functions to base
	 */

	global.depEventController = base;

})(window, jQuery)