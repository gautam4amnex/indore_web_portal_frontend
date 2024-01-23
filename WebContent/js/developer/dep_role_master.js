(function(global, $) {
	"use stricts;"
	
	var table;
	var web_tree_Agri;
	var mobile_tree_Agri;
	
	var base = {

			getRoleList : function getRoleList(){
				
				let result;
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'GET',
					url : window.iscdl.appData.baseURL + "api/role/getRoleList",
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
									window.depRoleMasterController.createRoleMasterDataTable(data);
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
				let columns = window.depRoleMasterController.createColumns();
				let columnDefs = window.depRoleMasterController.createColumnDefs();
				window.depUtlityController.prepareDataTable("role_masetr_tbl",columns,columnDefs,roleMasterData);
			},
			createColumns : function createColumns(){
				
				 let columns = [
						
						{ 
							"data" : null ,
							"title" : "Sr No",
						},{ 
							"data" : "department_name" ,
							"title" : "Department Name" 
						},
			            {
							"data" : "role_name"  ,
							"title" : "Role Name"
						},
			            {
							"data" : "mobile_application" ,
							"title" : "Mobile Application" 
						},
			            {
							"data" : "web_application"  ,
							"title" : "Web Application"
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
						"targets": 5,
						"data" : "role_id",
						"title" : "Action",
						"render" : function(data, type, row,
								meta) {
							
							
							return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"' data-toggle='modal'  data-target='#update_role_masetr_modal' " +
							"onclick='window.depRoleMasterController.displayEditRoleModal(this);'> "+
					"<span class='fa fa-edit' aria-hidden='true'></span> </button > "+
					" <button name='delete' class='btn action-btn' data-row='"+JSON.stringify(row)+"' onclick='window.depRoleMasterController.deleteRole(this)'> "+
					"<span class='fa fa-trash' aria-hidden='true'></span> </button >";
							
						}
					}]
				
				return columnDefs;
			},
			getWebModuleList : function getWebModuleList(type,id,_role_id){
				
				let result;
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				window.depRoleMasterController.getTreeList(type,id,_role_id);
			},
			getMobileModuleList : function getMobileModuleList(type,id,_role_id){
				
				let result;
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				window.depRoleMasterController.getTreeList(type,id,_role_id);
			},
			getTreeList : function getTreeList(_type,id,_role_id){
				
				let obj = {
						type : _type,
						role_id : _role_id
				}
				
				let postData = JSON.stringify(obj);
				
				//$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/role/getModuleList",
					data : postData,
					contentType : 'application/json',
					async : false,
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {
						//$(".loader").fadeOut();
						if (!$.isEmptyObject(result) && result != null) {
							try {
								
								result = JSON.parse(result);
								if(_type == '1'){
									window.depRoleMasterController.createWebTreeView(result,id);
								}else if(_type == '2'){
									window.depRoleMasterController.createMobileTreeView(result,id);
								}
							} catch (err) {
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
						console.log(e);
					}
				});
				
			},
			createWebTreeView : function createWebTreeView(data,id){
				
				$('#'+id).append("");
				
				let str = "";
				
				if (web_tree_Agri != undefined) {
					web_tree_Agri.destroy();
				}
				web_tree_Agri = $('#'+id)
						.tree(
								{
									primaryKey : 'module_id',
									uiLibrary : 'bootstrap',
									dataSource : data,
									icons : {
										expand : '<i class="material-icons">add</i>',
										collapse : '<i class="material-icons">remove</i>'
									},
									checkboxes : true,
									expandAll : true,
									
								});
				web_tree_Agri.expandAll();
				
				web_tree_Agri.on('checkboxChange', function (e, $node, record, state) {
					let length = web_tree_Agri.getCheckedNodes().length;
					if(length > 0){
							$("#webChk").prop( "checked", true );
							$("#update_webChk").prop( "checked", true );
						}else{
							$("#webChk").prop( "checked", false );
							$("#update_webChk").prop( "checked", false );
						}
			     });
			},
			
			getWebCheckedTreeNodes : function getWebCheckedTreeNodes(){
				return web_tree_Agri;
			},
			
			createMobileTreeView : function createMobileTreeView(data,id){
				
				$('#'+id).append("");
				
				let str = "";
				
				if (mobile_tree_Agri != undefined) {
					mobile_tree_Agri.destroy();
				}
				mobile_tree_Agri = $('#'+id)
						.tree(
								{
									primaryKey : 'module_id',
									uiLibrary : 'bootstrap',
									dataSource : data,
									icons : {
										expand : '<i class="material-icons">add</i>',
										collapse : '<i class="material-icons">remove</i>'
									},
									checkboxes : true,
									expandAll : true
								});
				mobile_tree_Agri.expandAll();
				
				mobile_tree_Agri.on('checkboxChange', function (e, $node, record, state) {
					let length = mobile_tree_Agri.getCheckedNodes().length;
					if(length > 0){
							$("#mobileChk").prop( "checked", true );
							 $("#update_mobileChk").prop( "checked", true );
						}else{
							$("#mobileChk").prop( "checked", false );
							$("#update_mobileChk").prop( "checked", false );
						}
			     });
				
			},
			getMobileCheckedTreeNodes : function getMobileCheckedTreeNodes(){
				return mobile_tree_Agri;
			},
			
			addOrUpdateRole : function addOrUpdateRole(postData){
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				//$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/role/addOrUpdateRole",
					data : postData,
					contentType : 'application/json',
					async : false,
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {
						//$(".loader").fadeOut();
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
									$u.notify('error', 'Notification',
											'Error while update role', '');
								}
								/**
								 * close pop-up
								 */
								
								window.depUtlityController.closePopup();
								
								window.depRoleMasterController.getRoleList();
								
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
			displayEditRoleModal : function displayEditRoleModal(data){
				let row = $(data).data('row');
				window.depRoleMasterController.fillFormData(row);
			},
			fillFormData : function fillFormData(row){
				
				let role_id = row.role_id;
				
				$('#roleId').val(role_id);
				
				if(row.is_active == true){
					$('#edit_role_status').val("Active");
				}else{
					$('#edit_role_status').val("Deactive");
				}
				
				window.depUtlityController.getDepartmentList('update_dep_select_department');
				
				window.depRoleMasterController.getWebModuleList('1','update_treeview_web_application',role_id);
				window.depRoleMasterController.getMobileModuleList('2','update_treeview_mobile_application',role_id);
				
				$('select option[value='+row.department_id+']').attr("selected",true);
				$('#update_name_role').val(row.role_name);
				$( "#update_webChk").prop('checked', row.web_application);
				$( "#update_mobileChk").prop('checked', row.mobile_application);
				$("#update_dep_select_type").val(row.role_type);
			},
			deleteRole : function deleteRole(data){
				let result;
				
				let token_val = localStorage.getItem('token');

				if (token_val == "" || token_val == undefined || token_val == null) {
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				if (confirm("Are you sure to delete data ?")) {
					
					let row = $(data).data('row');
					
					let _role_id = row.role_id;
					
					let roleObj = {
							role_id : _role_id,	
					};
					
					$(".loader").fadeIn();
						
					let postData = JSON.stringify(roleObj);

						$.ajax({
							method : 'POST',
							url : window.iscdl.appData.baseURL
									+ "api/role/deleteRole",
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
										window.depRoleMasterController.getRoleList();
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
				}else{
					$(".loader").fadeOut();
		 			 return false;
		 		}
			},
			setAllModuleChecked : function setAllModuleChecked(_type,_operation){
				
				if(_operation == "1"){
					if(_type == "1"){
						let length = $('#webChk:checkbox:checked').length;
						if(length > 0){
							web_tree_Agri.checkAll();	
						}else if(length == 0){
							web_tree_Agri.uncheckAll();
						}
					}else if(_type == "2"){
						let length = $('#mobileChk:checkbox:checked').length;
						if(length > 0){
							mobile_tree_Agri.checkAll();	
						}else if(length == 0){
							mobile_tree_Agri.uncheckAll();
						}
					}
				}else if(_operation == "2"){
					if(_type == "1"){
						let length = $('#update_webChk:checkbox:checked').length;
						if(length > 0){
							web_tree_Agri.checkAll();	
						}else if(length == 0){
							web_tree_Agri.uncheckAll();
						}
					}else if(_type == "2"){
						let length = $('#update_mobileChk:checkbox:checked').length;
						if(length > 0){
							mobile_tree_Agri.checkAll();	
						}else if(length == 0){
							mobile_tree_Agri.uncheckAll();
						}
					}
				}
				
				
			},
		}

	
	/**
	 * add public functions to base
	 */

	global.depRoleMasterController = base;

})(window, jQuery)