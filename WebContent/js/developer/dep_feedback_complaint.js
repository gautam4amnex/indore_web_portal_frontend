(function(global, $) {
	"use stricts;"

	var _feedback_type = "Feedback";
	var _suggestion_type = "Suggestion";
	var _complain_type = "Complaint";
	
	var base = {

			getFeedbackList : function getFeedbackList(feedbackType,departmentId){
				//let op = "";
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let feedbackObj;
				
				let did = window.depUtlityController.getDepartmentId();
				
				if(did != window.departmentData._department_id){
					feedbackObj = {
							type :feedbackType,
							department_id :departmentId
					};
				}else{
					feedbackObj = {
							type :feedbackType,
					};
				}
				
				let postData = JSON.stringify(feedbackObj);
				
				//$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/feedback/getFeedbackList",
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
								if(result.responseCode == 200){
									op = result.data;
									window.depFeedbackSuggestionController.createFeedbackModuleTable(op,feedbackType);
									setTimeout(function(){ 
										$('.dataTables_wrapper').resize();
									}, 500);
								}else{
									op = "";
								}
							} catch (err) {
							
								$(".loader").fadeOut();
								console.log(err);
							}
							setTimeout(function(){ 
								$(".loader").fadeOut();
							}, 1000);
						} else {
							$(".loader").fadeOut();
							$u.notify('error', 'Notification',
									'data not available', '');
						}
					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
						
						if(e.status === 403){
							$u.notify('warning', 'Notification',
									e.responseJSON.responseMessage, '');
						}else{
							$u.notify('error', 'Notification',
									'Something went wrong', '');
						}
					}
				});
			},
			
			createFeedbackModuleTable : function createFeedbackModuleTable(feedbackData,feedbackType){
				
				let columns;
				let columnDefs;
				let id;
				
				switch (feedbackType) {
				case "Feedback":
					id = "feedback_dtable"
					columns = window.depFeedbackSuggestionController.prepareCommonColumns();
					columnDefs = window.depFeedbackSuggestionController.prepareCommonColumnDefs(feedbackData);
					break;
				case "Suggestion":
					id = "suggestion_dtable";
					columns = window.depFeedbackSuggestionController.prepareCommonColumns();
					columnDefs = window.depFeedbackSuggestionController.prepareCommonColumnDefs(feedbackData);
					break;
				case "Complaint":
					id = "complain_dtable";
					columns = window.depFeedbackSuggestionController.prepareComplaintColumns();
					columnDefs = window.depFeedbackSuggestionController.prepareComplainColumnDefs(feedbackData);
					break;
				default:
					break;
				}
				window.depUtlityController.prepareDataTable(id,columns,columnDefs,feedbackData);
			},
			
			getImageByName : function getImageByName(img_name){
				
				let op = "";
				
				let feedbackObj = {
					"type": "feedbacks", 
					"filename": img_name
				};
				
				let postData = JSON.stringify(feedbackObj);
				
				$(".loader").fadeIn();
				
				return $.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api-docs/getImage",
					data : postData,
					contentType : 'application/json',
					async : false,
					success : function(result) {
						$(".loader").fadeOut();
						if (!$.isEmptyObject(result) && result != null) {
							try {
								op = result;
								return op;
							} catch (err) {
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
			prepareCommonColumns : function prepareCommonColumns(){
				
				let columns = [
					
					{ "data" : null ,"title" : "Sr No"},
					{ "data" : "type", "title" : "Type" },
		            { "data" : "department_name", "title" : "Category"},
		            { "data" : "comment", "title" : "Comment" },
		            { "data" : "name", "title" : "Name"},
		            { "data" : "address" , "title" : "Address"}, 
		            { "data" : "city" , "title" : "City"}, 
		            { "data" : "pin_code" , "title" : "Pincode"},
		            { "data" : "email" , "title" : "Email"},
		            { "data" : "mobile_no" , "title" : "Mobile_No"},
		            { "data" : "latitude" , "title" : "Latitude"},
		            { "data" : "longitude" , "title" : "Longitude"},
		           // { "data" : "file" , "title" : "Image"},
					
			]
				
				return columns;
				
			},
			
			prepareComplaintColumns : function prepareComplaintColumns(){
				
				let columns = [
					
					{ "data" : null ,"title" : "Sr No"},
					{ "data" : "mobile_no", "title" : "Mobile No" },
		            { "data" : "email", "title" : "Email"},
		            { "data" : "address", "title" : "Address" },
		            { "data" : "department_name", "title" : "Category"},
		            { "data" : "comment" , "title" : "Comment"}, 
		            { "data" : "latitude" , "title" : "Latitude"}, 
		            { "data" : "longitude" , "title" : "Longitude"}, 
		            //{ "data" : "file" , "title" : "Image"}, 
					]
				
					return columns;
			},
			prepareComplainColumnDefs : function prepareComplainColumnDefs(data){
				
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
							"targets": 8,
							"data" : "file",
							"title" : "View File",
							"render" : function(data, type, row,
									meta) {
								
								return '<button id="open_image" name="open_image" ' + 
								 'data-image = "'+data+'" class="btn action-btn" ' + 
								 ' onclick="window.depFeedbackSuggestionController.openImage(event)" >' +
								 '<span class="fa fa-picture-o" aria-hidden="true"></span> </button > ';
								
								/*return '<img class="gridimg" src="images/'+data+'">';*/
							}
						},
						{
							"targets": 9,
							"data" : "response",
							"title" : "Response",
							"render" : function(data, type, row,
									meta) {
								if(data == null || data == undefined || data == ""){
									return "<button name='edit' class='dt-button btn-indore-table' data-row='"+JSON.stringify(row)+"' data-toggle='modal' data-target='#addResponse'" +
									" onClick='window.depFeedbackSuggestionController.displayUserComplaint(this);'>" +
									"<span style='display: none;'>No </span><span>Response</span></button>";
								}else{
									return data;
								}
								
								/*return "<button name='edit' class='dt-button btn-indore-table' data-row='"+JSON.stringify(row)+"' data-toggle='modal' data-target='#addResponse'" +
										" onClick='window.depFeedbackSuggestionController.displayUserComplaint(this);'><span>Response</span></button>";*/
							}
						},
						{
							"targets": 10,
							"data" : "status",
							"title" : "Action",
							"render" : function(data, type, row,
									meta) {
								return "<button name='delete' class='btn action-btn'  data-row='"+JSON.stringify(row)+"' " +
										"onclick='window.depFeedbackSuggestionController.deleteFeedback(this);'>" +
										"<span class='fa fa-trash' aria-hidden='true'></span> </button >";
							}
						},
				]
				
				return columnDefs;
			},
			
			displayUserComplaint : function displayUserComplaint(data){
				let row = $(data).data('row');
				$("#resMobileno").val(row.mobile_no);
				$("#resEmail").val(row.email);
				$("#resAddress").val(row.address);
				$("#resCategory").val(row.department_name);
				$("#resComment").val(row.comment);
				$("#resLatitude").val(row.latitude);
				$("#resLongitude").val(row.longitude);
				$("#custId").val(row.id);
				$("#resType").val(row.type);
			},
			
			displayUserFeedback : function displayUserFeedback(data){
				let row = $(data).data('row');
				
				$('#feedType').val(row.type);
				$('#feedCategory').val(row.department_name);
				$('#feedComment').val(row.comment);
				$('#feedName').val(row.name);
				$('#feedAdress').val(row.address);
				$('#feedCity').val(row.city);
				$('#feedPincode').val(row.pin_code);
				$('#feedEmail').val(row.email);
				$('#feedMobile').val(row.mobile_no);
				$('#feedLat').val(row.latitude);
				$('#feedLong').val(row.longitude);
				$("#feedbackId").val(row.id);
				
			},
			
			displayUserSuggestion : function displayUserSuggestion(data){
				
				let row = $(data).data('row');
				
				$('#suggestionType').val(row.type);
				$('#suggestionCategory').val(row.department_name);
				$('#suggestionComment').val(row.comment);
				$('#suggestionName').val(row.name);
				$('#suggestionAdress').val(row.address);
				$('#suggestionCity').val(row.city);
				$('#suggestionPincode').val(row.pin_code);
				$('#suggestionEmail').val(row.email);
				$('#suggestionMobile').val(row.mobile_no);
				$('#suggestionLat').val(row.latitude);
				$('#suggestionLong').val(row.longitude);
				$("#suggestionId").val(row.id);
			},
			
			prepareCommonColumnDefs : function prepareCommonColumnDefs(data){
				
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
						"targets": 12,
						"data" : "file",
						"title" : "View File",
						"render" : function(data, type, row,
								meta) {
							//let img_name = "1576572618970-AMNEX Logo.png";
							//let img_url = img_base_url + img_name;
							//let img = window.depFeedbackSuggestionController.getImageByName(img_name);
							//return '<img class="gridimg" height="10px" width="10px" src="'+img.responseText+'">';
							
							return '<button id="open_image" name="open_image" ' + 
							 'data-image = "'+data+'" class="btn action-btn" ' + 
							 ' onclick="window.depFeedbackSuggestionController.openImage(event)" >' +
							 '<span class="fa fa-picture-o" aria-hidden="true"></span> </button > ';
							
							
						}
					},
					{
						"targets": 13,
						"data" : "response",
						"title" : "Response",
						"render" : function(data, type, row,
								meta) {
							
							if(row.type == "Feedback"){
								if(data == null || data == undefined || data == ""){
									return "<button name='edit' class='dt-button btn-indore-table' data-row='"+JSON.stringify(row)+"' " +
									"data-toggle='modal' data-target='#form_addFeedback' onClick='window.depFeedbackSuggestionController.displayUserFeedback(this);'>" +
									"<span style='display: none;'>No </span><span>Response</span></button>";
								}else{
									return data;
								}
							}else if(row.type == "Suggestion"){
								if(data == null || data == undefined || data == ""){
									return "<button name='edit' class='dt-button btn-indore-table' data-row='"+JSON.stringify(row)+"' " +
									"data-toggle='modal' data-target='#form_addSuggestion' onClick='window.depFeedbackSuggestionController.displayUserSuggestion(this);'>" +
									"<span style='display: none;'>No </span><span>Response</span></button>";
								}else{
									return data;
								}
							}
							
							/*if(row.type == "Feedback"){
								return "<button name='edit' class='dt-button btn-indore-table' data-row='"+JSON.stringify(row)+"' " +
										"data-toggle='modal' data-target='#form_addFeedback' onClick='window.depFeedbackSuggestionController.displayUserFeedback(this);'>" +
										"<span>Response</span></button>";
							}else if(row.type == "Suggestion"){
								return "<button name='edit' class='dt-button btn-indore-table' data-row='"+JSON.stringify(row)+"' " +
										"data-toggle='modal' data-target='#form_addSuggestion' onClick='window.depFeedbackSuggestionController.displayUserSuggestion(this);'>" +
										"<span>Response</span></button>";
							}*/
						}
					},
					{
						"targets": 14,
						"data" : "status",
						"title" : "Action",
						"render" : function(data, type, row,
								meta) {
							return "<button name='delete' class='btn action-btn'  data-row='"+JSON.stringify(row)+"' onclick='window.depFeedbackSuggestionController.deleteFeedback(this);'><span class='fa fa-trash' aria-hidden='true'></span> </button >";
						}
					},
				]
				return columnDefs;
			},
			
			addResponse : function addResponse(_id,_type,_email,_response){
				
				
					let responseObj = {
							id: _id,
							type: _type,
							email : _email,
							response : _response
					};
					
					let postData = JSON.stringify(responseObj)
					
					let token_val = localStorage.getItem('token');
					
					if(token_val == "" || token_val == undefined || token_val == null){
						$u.notify('info', 'Notification',
								'You are not authorized user', '');
						return;
					}
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "api/feedback/addResponse",
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
												result.responseMessage, '');
									} else if(result.responseCode == '204'){
										$u.notify('info', 'Notification',
												result.responseMessage, '');
									}else{
										$u.notify('error', 'Notification',
												result.responseMessage, '');
									}
									
									/**
									 * close pop-up
									 */
									
									window.depUtlityController.closePopup();
									
									let _feedback_type = $('.justify-content-center .nav-item > a.active')[0].innerHTML;
									let d_id = window.depUtlityController.getDepartmentId();
									
									if(_feedback_type == "Suggestions"){
										_feedback_type = "Suggestion";
									}
									
									
									
									window.depFeedbackSuggestionController.getFeedbackList(_feedback_type,d_id);
									
								} catch (err) {
									//$(".loader").fadeOut();
									console.log(err);
									
								}
							} else {
								//$(".loader").fadeOut();
								
								$u.notify('error', 'Notification',
										'data not available', '');
								
							}
						},
						error : function(e) {
							//$(".loader").fadeOut();
							
							let response = JSON.parse(e.responseText);
							if(response.responseCode == 401) {
								$u.notify("info", "Notification",response.responseMessage);
							} else {
								$u.notify('error', '', 'Something went wrong' , '');
							}
						}
					});
			},
			openImage: function openImage(event){
				let fileNames = $(event.currentTarget).data('image');
				var files = fileNames.split(",");
				for(var i = 0 ;i<files.length;i++){
					let fileName = files[i];
				    let file_extension = fileName.substr((fileName.lastIndexOf('.')+1)).toLowerCase();
					if(file_extension == "pdf" || file_extension == "doc" || file_extension == "docx"){
						var xhr = new XMLHttpRequest();
						xhr.open('GET', window.iscdl.appData.baseURL + "api-docs/getImage/feedbacks/" + encodeURIComponent(fileName));
						xhr.setRequestHeader("Content-Type", "application/json");
						xhr.responseType = 'blob';
						xhr.onload = function() {
						    var blob = this.response;
						    var a = window.document.createElement('a');
						    a.href = window.URL.createObjectURL(blob);
						    a.download = fileName;
						    document.body.appendChild(a);
						    a.click();
						    document.body.removeChild(a);
						};
						xhr.send();
					}else if(file_extension == "png" || file_extension == "jpg" || file_extension == "jpeg"){
						$("#carousel-inner").append("<div class='carousel-item"+ 
								(i === 0 ? " active'>" : "'>") +"<img class='d-block w-100' src='"+
								window.iscdl.appData.baseURL + "api-docs/getImage/feedbacks/" + encodeURIComponent(fileName) 
								+"' alt='"+fileName+"'> </div>");	
					}
				}
				
				for(var i = 0 ;i<files.length;i++){
					let fileName = files[i];
				    let file_extension = fileName.substr((fileName.lastIndexOf('.')+1)).toLowerCase();
				    if(file_extension == "png" || file_extension == "jpg" || file_extension == "jpeg"){
				    	$("#imageModal").show();
				    	break;
				    }
				}
			},
			
			deleteFeedback : function deleteFeedback(data){
				
				if (confirm("Are you sure to delete data ?")) {
					let row = $(data).data('row');
					let d_id = row.id;
					let deleteObj = {
							"id": d_id,
					};
					
					let postData = JSON.stringify(deleteObj)
					
					let token_val = localStorage.getItem('token');
					
					if(token_val == "" || token_val == undefined || token_val == null){
						$u.notify('info', 'Notification',
								'You are not authorized user', '');
						return;
					}
					
					$(".loader").fadeIn();
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "api/feedback/deleteFeedback",
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
										$u.notify('success', 'Success',
												'Data deleted successfully', '');
										
										let department_id = localStorage.getItem('department_id');
										
										if(department_id == null || department_id == undefined || department_id == ""){
											$u.notify('error', 'Notification',
													'Department Id was null', '');
											return;
										}
										
										let _type = $('.justify-content-center .nav-item > a.active')[0].innerHTML;
										
										if(_type == "Suggestions"){
											_type = "Suggestion";
										}
										
										window.depFeedbackSuggestionController.getFeedbackList(_type,department_id);
										
									} else {
										$u.notify('error', 'Notification',
												'Data deleted failed', '');
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
						}
					});
		 		}else{
//		 			 e.preventDefault();
		 			 return false;
		 		}
			},
			
			
		}

	/**
	 * add public functions to base
	 */

	global.depFeedbackSuggestionController = base;

})(window, jQuery)