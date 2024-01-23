(function(global, $) {
	"use stricts;"

	var table;

	var base = {

		getDepartmentList : function getDepartmentList() {

			let result;

			let token_val = localStorage.getItem('token');

			if (token_val == "" || token_val == undefined || token_val == null) {
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			$(".loader").fadeIn();

			$.ajax({
				method : 'GET',
				url : window.iscdl.appData.baseURL
						+ "api/department/getDepartmentList",
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
								let data = result.data;
								window.depDepartmentMasterController
										.createMasterDataTable(data);
								$('.dataTables_wrapper').resize();
							} else {
								$u.notify('warning', 'Notification',
										result.responseMessage, '');
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
						$u.notify('info', 'Notification',
								'data not available', '');
					}
				},
				error : function(e) {
					$(".loader").fadeOut();
					console.log(e);
					
					if(e.status === 403){
						$u.notify('warning', 'Access Denied !',
								e.responseJSON.responseMessage, '');
					}else{
						$u.notify('error', 'Notification',
								'Something went wrong', '');
					}
				}
			});
		},

		createMasterDataTable : function createMasterDataTable(masterData) {
			let columns = window.depDepartmentMasterController.createColumns();
			let columnDefs = window.depDepartmentMasterController.createColumnDefs();
			
			let id = "dep_masetr_tbl";

			if (table != undefined) {
				table.destroy();
			}

			$('#' + id).empty();

			table = createDatatable({
				id : id,
				columns : columns,
				data : masterData,
				columnDefs : columnDefs,
			});
		},
		createColumns : function createColumns() {

			let columns = [{
				"data": null, 
				"title": "Sr No."
			},{
				"data" : "department_name",
				"title" : "Department Name"
			}, {
				"data" : "created_by",
				"title" : "Created By"
			}, {
				"data" : "created_datetime",
				"title" : "Created Date"
			}, {
				"data" : "description",
				"title" : "Description"
			}]

			return columns;

		},
		createColumnDefs : function createColumnDefs() {

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
						"targets" : 5,
						"data" : "is_active",
						"title" : "Status",
						"render" : function(data, type, row, meta) {
							if (data == true) {
								return '<a href="#" class="status-active">Active</a>';
							} else if (data == false) {
								return '<a href="#" class="status-deactive">Deactive</a>';
							}
						}
					},
					{
						"targets" : 6,
						"data" : "deaprtment_id",
						"title" : "Action",
						"render" : function(data, type, row, meta) {

							return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"' data-toggle='modal'  data-target='#edit_dep_masetr_modal'" +
							"onclick='window.depDepartmentMasterController.displayEvent(this);'> "+
					"<span class='fa fa-edit' aria-hidden='true'></span> </button > "+
					" <button name='delete' class='btn action-btn' data-row='"+JSON.stringify(row)+"' onclick='window.depDepartmentMasterController.deleteDepartment(this)'> "+
					"<span class='fa fa-trash' aria-hidden='true'></span> </button >";
						
						}
					} ]

			return columnDefs;
		},
		displayEvent : function displayEvent(data){
			let row = $(data).data('row');
			window.depDepartmentMasterController.fillFormData(row);
		},
		
		fillFormData : function fillFormData(row){
			
			$("#departmentId").val(row.deaprtment_id);
			$('#edit_dep_name').val(row.department_name);
			$('#edit_created_by').val(row.created_by);
			$('#edit_created_date').val(row.created_datetime);
			$('#edit_user_des').val(row.description);
				
			if(row.is_active == true){
				$('#edit_dep_status').val("Active");
			}else{
				$('#edit_dep_status').val("Deactive");
			}
		},
		
		addOrUpdateDepartment : function addOrUpdateDepartment(did,dname, uname, uid, description,_is_active) {

			let result;

			let departmentObj = {
				department_id : did,	
				department_name : dname,
				created_by : uname,
				user_id : uid,
				description : description,
				is_active : _is_active
			};
			
			let postData = JSON.stringify(departmentObj);

			let token_val = localStorage.getItem('token');

			if (token_val == "" || token_val == undefined || token_val == null) {
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			//$(".loader").fadeIn();

			$.ajax({
				method : 'POST',
				url : window.iscdl.appData.baseURL
						+ "api/department/addOrUpdateDepartment",
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
							
							if (result.responseCode == "200") {
								$u.notify('success', 'Success',
										result.responseMessage, '');
							} else{
								
								$u.notify('warning', 'Notification',
										result.responseMessage, '');
							} 
							
							/**
							 * close pop-up
							 */
							
							window.depUtlityController.closePopup();
							window.depDepartmentMasterController.getDepartmentList();
						} catch (err) {
							//$(".loader").fadeOut();
							console.log(err);
						}
					} else {
						//$(".loader").fadeOut();
						$u.notify('info', 'Notification',
								'data not available', '');
					}
				},
				error : function(e) {
					//$(".loader").fadeOut();
					console.log(e);
					let response = JSON.parse(e.responseText);
					if(response.responseCode == 403 || response.responseCode == 401) {
						$u.notify("info", "Notification", response.responseMessage);
					} else {
						$u.notify('error', '', 'Something went wrong' , '');
					}
					/*if(e.status === 403){
						$u.notify('warning', 'Access Denied !',
								e.responseJSON.responseMessage, '');
					}else{
						$u.notify('error', 'Notification',
								'Something went wrong', '');
					}*/
				}
			});
		},
		deleteDepartment : function deleteDepartment(data){

			let result;
			
			let token_val = localStorage.getItem('token');

			if (token_val == "" || token_val == undefined || token_val == null) {
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			if (confirm("Are you sure to delete data ?")) {
				
				let row = $(data).data('row');
				let d_id = row.deaprtment_id;
				
				let departmentObj = {
						department_id : d_id,	
				};
					
				let postData = JSON.stringify(departmentObj);

				$(".loader").fadeIn();
				
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL
								+ "api/department/deleteDepartment",
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
									} else {
										$u.notify('warning', 'Notification',
												result.responseMessage, '');
									} 
									window.depDepartmentMasterController.getDepartmentList();
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
							if(e.status === 403){
								$u.notify('warning', 'Access denied !',
										e.responseJSON.responseMessage, '');
							}else{
								$u.notify('error', 'Notification',
										'Something went wrong', '');
							}
						}
					});
			}else{
				$(".loader").fadeOut();
	 			 e.preventDefault();
	 			 return false;
	 		}
		}
	}

	/**
	 * add public functions to base
	 */

	global.depDepartmentMasterController = base;

})(window, jQuery)