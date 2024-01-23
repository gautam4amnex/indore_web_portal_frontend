(function(global, $) {
	"use stricts;"
	
	var table;
	
	var base = {

			getUserList : function getUserList(department_id){
				
				let result;
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let userObj;
				
				if(department_id != window.departmentData._department_id){
					userObj = {
							department_id : department_id
					}					
				}else{
					userObj = {};
				}
				
				let postData = JSON.stringify(userObj);
				
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/user/getUserList",
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
									let data = result.data;
									window.depUserMasterController.createRoleMasterDataTable(data);
									$('.dataTables_wrapper').resize();
									
								}else{
									$u.notify('error', 'Notification',
											'Something went wrong', '');
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
			
			createRoleMasterDataTable : function createMasterDataTable(roleMasterData){
				let columns = window.depUserMasterController.createColumns();
				let columnDefs = window.depUserMasterController.createColumnDefs();
				window.depUtlityController.prepareDataTable("user_masetr_tbl",columns,columnDefs,roleMasterData);
			},
			createColumns : function createColumns(){
				
				 let columns = [
						
						{ 
							"data" : null ,
							"title" : "Sr No"
						},{ 
							"data" : "roleName",
							"title" : "Role Name" 
						},
			            {
							"data" : "departmentName",
							"title" : "Department"
						},
			            {
							"data" : "name",
							"title" : "Name" 
						},
			            {
							"data" : "emailId",
							"title" : "Email"
						},
						{
							"data" : "contactNo",
							"title" : "Phone No"
						},
						{
							"data" : "status",
							"title" : "Status"
						},
						{
							"data" : "access",
							"title" : "Access"
						}
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
						"targets": 6,
						"data" : "status",
						"title" : "Status",
						"render" : function(data, type, row,
								meta)
						{
							if(data == true){
								return '<a href="#" class="status-active">Active</a>';
							}else if(data == false){
								return '<a href="#" class="status-deactive">Deactive</a>';
							}else{
								return '<a href="#" class="status-deactive">Deactive</a>';
							}
						}
					},
					{
						"targets": 7,
						"data" : "access",
						"title" : "Access",
						"render" : function(data, type, row,
								meta) {
							
							if(data.web_permission == true && data.mobile_psermission == true){
								return '<span style="display: none;">Mobile</span><img class="access-img" src="images/icons/MobileAccess-94.svg" alt="Mobile"/><span style="display: none;">  Web</span><img class="access-img" src="images/icons/WebAccess-95.svg" alt=" Web"/>';
							}else if(data.web_permission == false && data.mobile_psermission == true){
								return '<span style="display: none;">Mobile</span><img class="access-img" src="images/icons/MobileAccess-94.svg" alt="Mobile"/>';
							}else if(data.web_permission == true && data.mobile_psermission == false){
								return '<span style="display: none;">Web</span><img class="access-img" src="images/icons/WebAccess-95.svg" alt="Web"/>';
							}else{
								return '<span style="display: none;">No Access</span>';
							}
						}
					},
					
					{
						"targets": 8,
						"data" : "status",
						"title" : "Update Status",
						"width" : "50px",
						"render" : function(data, type, row,
								meta) {
							
							if(data == true){
								return "<a id='userDeactive' data-toggle='tooltip' data-placement='top' title='Deactive' href='#' data-row='"+JSON.stringify(row)+"' " +
								"onclick='window.depUserMasterController.deActiveUser(event);' class='status-reject'><i class='fa fa-close'></i></a>"; 
							}else if(data == false){
								return "<a href='#' id='userActive' data-toggle='tooltip' data-placement='top' title='Active' class='status-approve' data-row='"+JSON.stringify(row)+"' " +
								"onclick='window.depUserMasterController.activeUser(event);' ><i class='fa fa-check'></i></a>"; 
							}else{
								return "<a href='#' id='userActive' data-toggle='tooltip' data-placement='top' title='Active' class='status-approve' data-row='"+JSON.stringify(row)+"' " +
								"onclick='window.depUserMasterController.activeUser(event);' ><i class='fa fa-check'></i></a>" +
								"<a id='userDeactive' data-toggle='tooltip' data-placement='top' title='Deactive' href='#' data-row='"+JSON.stringify(row)+"' " +
								"onclick='window.depUserMasterController.deActiveUser(event);' class='status-reject'><i class='fa fa-close'></i></a>"; 
							}
						}
					},
					
					{
						"targets": 9,
						"data" : "userId",
						"title" : "Action",
						"render" : function(data, type, row,
								meta) {
							
							
							return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"' data-toggle='modal'  data-target='#user_update_modal' " +
							"onclick='window.depUserMasterController.displayUser(this);'> "+
					"<span class='fa fa-edit' aria-hidden='true'></span> </button > "+
					" <button name='delete' class='btn action-btn' data-row='"+JSON.stringify(row)+"' onclick='window.depUserMasterController.deleteUser(this)'> "+
					"<span class='fa fa-trash' aria-hidden='true'></span> </button >";
							
						}
					}]
				
				return columnDefs;
			},
			displayUser : function displayUser(data){
				let row = $(data).data('row');
				window.depUserMasterController.fillFormData(row);
			},
			fillFormData : function fillFormData(row){
				$("#userId").val(row.userId);
				$('#update_user_name').val(row.userName);
				$('#update_user_email').val(row.emailId);
				$('#update_mobile_no').val(row.contactNo);
				window.depUtlityController.getDepartmentList('update_user_dep_type');
				let _id = 'update_user_role';
				window.depUtlityController.getRoleByDepartmentId(row.departmentId,_id);
				//$('select option[value='+row.departmentId+']').attr("selected",true);
				$('#update_user_dep_type option[value='+row.departmentId+']').prop('selected', true);
				$('#update_user_role option[value='+row.roleId+']').prop('selected', true);
				
			},
			activeUser : function activeUser(data){
				let row_data = $(event.currentTarget).data('row');
				let user_id = row_data.userId;
				window.depUserMasterController.activeOrDeactiveUser(user_id,true);
			},
			deActiveUser : function deActiveUser(data){
				let row_data = $(event.currentTarget).data('row');
				let user_id = row_data.userId;
				window.depUserMasterController.activeOrDeactiveUser(user_id,false);
			} ,
			activeOrDeactiveUser : function activeOrDeactiveUser(uid,_status){
				
				let token_val = localStorage.getItem('token');

				if (token_val == "" || token_val == undefined || token_val == null) {
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let userObj = {
						userId : uid,
						status : _status
				};
				
				$(".loader").fadeIn();
				
				let postData = JSON.stringify(userObj);

					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL
								+ "api/user/activeOrDeactiveUser",
						data : postData,
						contentType : 'application/json',
						async : false,
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						success : function(result) {
							if (!$.isEmptyObject(result) && result != null) {
								$(".loader").fadeOut();
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
												result.responseMessage, '');
									}
//									let did = window.depUtlityController.getDepartmentId();
//									window.depUserMasterController.getUserList(did);
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
						},
						complete: function (data) {
							let did = window.depUtlityController.getDepartmentId();
							window.depUserMasterController.getUserList(did); 
						}
					});
			}, 
			deleteUser : function deleteUser(data){

				let result;
				
				let token_val = localStorage.getItem('token');

				if (token_val == "" || token_val == undefined || token_val == null) {
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				if (confirm("Are you sure to delete data ?")) {
					let row = $(data).data('row');
					let _uid = row.userId;
					
					let userObj = {
							userId : _uid,
					};
					
					$(".loader").fadeIn();
						
					let postData = JSON.stringify(userObj);

						$.ajax({
							method : 'POST',
							url : window.iscdl.appData.baseURL
									+ "api/user/deleteUser",
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
										
										if (result.responseCode == "200") {
											$u.notify('success', 'Success',
													result.responseMessage, '');
										}else if(result.responseCode == "204"){
								
											$u.notify('info', 'Notification',
										result.responseMessage, '');
							
										} else {
											$u.notify('error', 'Notification',
													result.responseMessage, '');
										}
										let did = window.depUtlityController.getDepartmentId();
										window.depUserMasterController.getUserList(did);
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
					$(".loader").fadeOut();
		 			 return false;
		 		}
			},
			
			addOrUpdateUser : function addOrUpdateUser(_user_id,_uname,_email,_name,_password,_contact,_role_id){
				
				let token_val = localStorage.getItem('token');

				if (token_val == "" || token_val == undefined || token_val == null) {
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let op = "";
				
				let userObj = {
						userId : _user_id,
						//userName : _uname,
						emailId : _email,
 						name : _name,
						password : _password,
						contactNo : _contact,
						roleId : _role_id
				};
				
				let postData = JSON.stringify(userObj);
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/user/addOrUpdateUser",
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
									$u.notify('error', 'Error',
											result.responseMessage, '');
								}
								
								/**
								 * close pop-up
								 */
								
								window.depUtlityController.closePopup();
								
								let department_id = localStorage.getItem('department_id');
								if(department_id != null && department_id != undefined && department_id != ""){
									window.depUserMasterController.getUserList(department_id);
								}
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
						let response = JSON.parse(e.responseText);
						if(response.responseCode == 401) {
							$u.notify("info", "Notification",response.responseMessage);
						} else {
							$u.notify('error', '', 'Something went wrong' , '');
						}
					}
				});
			},
		}

	
	/**
	 * add public functions to base
	 */

	global.depUserMasterController = base;

})(window, jQuery)