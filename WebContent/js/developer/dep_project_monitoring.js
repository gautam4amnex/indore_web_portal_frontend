(function(global, $) {
	"use stricts;"
	
	var milestoneData;
	
	var base = {
			
			addOrUpdateProject : function addOrUpdateProject(projectObj, prj_upFiles, prj_upDocs){
					
//				project_name,location_name,latitude,longitude,district_id,
//				tehsil_id,village_id,ward_id,zone_id,contractor_name,contractor_number,contractor_agency,work_order_period,
//				contract_period,start_date,end_date,design_consultant_name,design_consultant_number,physical_progress,
//				project_status,remarks,total_cost,performance_bank_guarantee,performance_bank_date,financial_progress,
//				work_order_no,pmc_name,pmc_contact_number,department_id
				
					let token_val = localStorage.getItem('token');
					
					if(token_val == "" || token_val == undefined || token_val == null){
						$u.notify('info', 'Notification',
								'You are not authorized user', '');
						return;
					}
					
					let requestData = new FormData();
					let images = projectObj.project_id ? projectObj.images : ""
						,documents = projectObj.project_id ? projectObj.documents : "";
					for(var i = 0;i<prj_upFiles.length;i++){
						if(projectObj.project_id && i === 0 && images !== ""){
							images += ",";
						}
						images += prj_upFiles[i].name + (i < (prj_upFiles.length - 1) ? "," : "");
						requestData.append('image_file', prj_upFiles[i]);
					}
					projectObj.images = images; 
					
					for(var i = 0;i<prj_upDocs.length;i++){
						if(projectObj.project_id && i === 0 && documents !== ""){
							documents += ",";
						}
						documents += prj_upDocs[i].name + (i < (prj_upDocs.length - 1) ? "," : "");
						requestData.append('document_file', prj_upDocs[i]);
					}
					projectObj.documents = documents;
					
					requestData.append('data', JSON.stringify(projectObj));
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "api/project/addOrUpdateProject",
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
//									result = JSON.parse(result);
									let str = "";
									if (result.responseCode == 200) {
										$u.notify('success', 'Success',
												result.responseMessage, '');
										//location.reload(true);
										resetForm('form_addProject');
									}else if(result.responseCode == 204){
										$u.notify('info', 'Notification',
												result.responseMessage, '');
									}else {
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
							let response = JSON.parse(e.responseText);
							if(response.responseCode == 403) {
								$u.notify("warning", "", response.responseMessage);
							} else if(response.responseCode == 401) {
								$u.notify("warning", "", response.responseMessage);
							} else {
								$u.notify('error', '', 'Something went wrong' , '');
							}
						}
					});
			},
			
			
			getProjectList: function getProjectList(flag){
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let projectObj;
				
				let did = window.depUtlityController.getDepartmentId();
				let user_id = localStorage.getItem('user_data');
				if(did != window.departmentData._department_id) {
					projectObj = {department_id: did, user_id: user_id};
				} else {
					projectObj = {department_id: window.departmentData._department_id, user_id: user_id};
				}
				
				let postData = JSON.stringify(projectObj);
				$(".loader").fadeIn();
				
				return $.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/getProjectList",
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
								$(".loader").fadeOut();
								if(result.responseCode == 200){
									let str = "";
									base.projectList = result.data;
									milestoneData = result.data;
									
									$('#select_project').empty().append(
									'<option value="0">All</option>');
									for ( let i in result.data) {
										let name = result.data[i].project_name.value;
										let id = result.data[i].project_id.value;
										str += "<option value='" + id
												+ "'>" + name
												+ "</option>";
									}
									$('#select_project').append(str);
									if(!flag){
										$("#select_project").prop("selectedIndex", 0);
										window.depProjectMonitoringController.filterMilestoneProjectwise($("#select_project").val());
									}
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
			
			addOrUpdateMilestone: function addOrUpdateMilestone(milestoneObj){

				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				/*let requestData = new FormData();
				let images = "", documents = "";
				for(var i = 0;i<mst_upFiles.length;i++){
					images += mst_upFiles[i].name + (i < (mst_upFiles.length - 1) ? "," : "");
					requestData.append('image_file', mst_upFiles[i]);
				}
				milestoneObj.image = images; */
				/*let images = "", documents = "";
				for(var i = 0;i<mst_upDocs.length;i++){
					documents += mst_upDocs[i].name + (i < (mst_upDocs.length - 1) ? "," : "");
					requestData.append('document_file', mst_upDocs[i]);
				}
				milestoneObj.document = documents;*/
				
				//requestData.append('data', JSON.stringify(milestoneObj));
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/addOrUpdateMilestone",
					async : false,
					enctype : 'multipart/form-data',
					processData : false,
					contentType : false,
					data : milestoneObj,
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
						let response = JSON.parse(e.responseText);
						if(response.responseCode == 401) {
							$u.notify("info", "Notification",response.responseMessage);
						} else {
							$u.notify('error', '', 'Something went wrong' , '');
						}
					}
				});
			},
			
			getProjectMasterDetails: function getProjectMasterDetails(){
				$.ajax({
					method : 'GET',
					url : window.iscdl.appData.baseURL + "api/project/getProjectMasterDetails",
					async : false,
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {
						if (!$.isEmptyObject(result) && result != null) {
							try {
								result = JSON.parse(result);
								if (result.responseCode == '200') {
									let response = result.data;
									let str = "";
									$('#prj_district_id').empty().append(
									'<option value="0">Select District</option>');
									for ( let i in response.district_master) {
										str += "<option value='" + response.district_master[i].district_id + "'>" + 
										response.district_master[i].district_name + "</option>";
									}
									$('#prj_district_id').append(str);
									str = "";
									
									$('#prj_tehsil_id').empty().append(
									'<option value="0">Select Tehsil</option>');
									for ( let i in response.tehsil_master) {
										str += "<option value='" + response.tehsil_master[i].tehsil_id + "'>" + 
										response.tehsil_master[i].tehsil_name + "</option>";
									}
									$('#prj_tehsil_id').append(str);
									str = "";
									
									$('#prj_village_id').empty().append(
									'<option value="0">Select Village</option>');
									for ( let i in response.village_master) {
										str += "<option value='" + response.village_master[i].village_id + "'>" + 
										response.village_master[i].village_name + "</option>";
									}
									$('#prj_village_id').append(str);
									str = "";
									
									$('#prj_ward_id').empty().append(
									'<option value="0">Select Ward</option>');
									for ( let i in response.ward_master) {
										str += "<option value='" + response.ward_master[i].ward_no + "'>" + 
										response.ward_master[i].ward_name + "</option>";
									}
									$('#prj_ward_id').append(str);
									str = "";
									
									$('#prj_zone_id').empty().append(
									'<option value="0">Select Zone</option>');
									for ( let i in response.zone_master) {
										str += "<option value='" + response.zone_master[i].zone_id + "'>" + 
										response.zone_master[i].zone_name + "</option>";
									}
									$('#prj_zone_id').append(str);
									str = "";
									
									$('#prj_project_status').empty().append(
									'<option value="0">Select Status</option>');
									for ( let i in response.project_status_master) {
										str += "<option value='" + response.project_status_master[i].status_id + "'>" + 
										response.project_status_master[i].status_name + "</option>";
									}
									$('#prj_project_status').append(str);
									str = "";
									
									
//									FOR UPDATE
									
									$('#prjUp_district_id').empty().append(
									'<option value="0">Select District</option>');
									for ( let i in response.district_master) {
										str += "<option value='" + response.district_master[i].district_id + "'>" + 
										response.district_master[i].district_name + "</option>";
									}
									$('#prjUp_district_id').append(str);
									str = "";
									
									$('#prjUp_tehsil_id').empty().append(
									'<option value="0">Select Tehsil</option>');
									for ( let i in response.tehsil_master) {
										str += "<option value='" + response.tehsil_master[i].tehsil_id + "'>" + 
										response.tehsil_master[i].tehsil_name + "</option>";
									}
									$('#prjUp_tehsil_id').append(str);
									str = "";
									
									$('#prjUp_village_id').empty().append(
									'<option value="0">Select Village</option>');
									for ( let i in response.village_master) {
										str += "<option value='" + response.village_master[i].village_id + "'>" + 
										response.village_master[i].village_name + "</option>";
									}
									$('#prjUp_village_id').append(str);
									str = "";
									
									$('#prjUp_ward_id').empty().append(
									'<option value="0">Select Ward</option>');
									for ( let i in response.ward_master) {
										str += "<option value='" + response.ward_master[i].ward_no + "'>" + 
										response.ward_master[i].ward_name + "</option>";
									}
									$('#prjUp_ward_id').append(str);
									str = "";
									
									$('#prjUp_zone_id').empty().append(
									'<option value="0">Select Zone</option>');
									for ( let i in response.zone_master) {
										str += "<option value='" + response.zone_master[i].zone_id + "'>" + 
										response.zone_master[i].zone_name + "</option>";
									}
									$('#prjUp_zone_id').append(str);
									str = "";
									
									$('#prjUp_project_status').empty().append(
									'<option value="0">Select Status</option>');
									for ( let i in response.project_status_master) {
										str += "<option value='" + response.project_status_master[i].status_id + "'>" + 
										response.project_status_master[i].status_name + "</option>";
									}
									$('#prjUp_project_status').append(str);
									str = "";
									
									$('#milestone_status').empty().append(
									'<option value="0">Select Status</option>');
									for ( let i in response.milestone_status_master) {
										str += "<option value='" + response.milestone_status_master[i].status_id + "'>" + 
										response.milestone_status_master[i].status_name + "</option>";
									}
									$('#milestone_status').append(str);
									str = "";
									
									$('#mstUp_milestone_status').empty().append(
									'<option value="0">Select Status</option>');
									for ( let i in response.milestone_status_master) {
										str += "<option value='" + response.milestone_status_master[i].status_id + "'>" + 
										response.milestone_status_master[i].status_name + "</option>";
									}
									$('#mstUp_milestone_status').append(str);
									str = "";
									window.depUtlityController.setProjectMasterDetails(response);
									
//									return result;
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
			},
			filterMilestoneProjectwise : function filterMilestoneProjectwise(project_id){
				let filteredArray = [];
				if(project_id !== "0"){
					filteredArray = milestoneData.filter(function (el) {
						  return el.project_id.value == project_id;
					});
					
					if(filteredArray.length > 0 && filteredArray[0].milestones.length > 0){
						let milestones = filteredArray[0].milestones;
						window.depProjectMonitoringController.createMileStoneTable(milestones);
					}else{
//						$u.notify('info', 'Notification',"Milestone data not available", '');
						let milestones = [];
						window.depProjectMonitoringController.createMileStoneTable(milestones);
					}
				} else {
					let milestones = [];
					for(var i = 0; i < milestoneData.length; i++) {
						if(milestoneData[i].milestones.length > 0){
							milestones = milestones.concat(milestoneData[i].milestones);
						}
					}
					window.depProjectMonitoringController.createMileStoneTable(milestones);
				}
				
				
			},
			createMileStoneTable : function createMileStoneTable(milestoneData){
				let columns = window.depProjectMonitoringController.createMilestoneColumns();
				let columnDefs = window.depProjectMonitoringController.createMilestoneColumnDefs();
				window.depUtlityController.prepareDataTable("dep_milestone",columns,columnDefs,milestoneData);
			},
			createMilestoneColumns : function createMilestoneColumns(){
				let columns = [
					{
						"data" : null,
						"title" : "Sr No"
					},
					{ 
						"data" : null,
						"title" : "Project Name"
					},{ 
						"data" : "milestone_name" ,
						"title" : "Milestone Name" 
					},
		            {
						"data" : "description"  ,
						"title" : "Description"
					},
		            {
						"data" : "image"  ,
						"title" : "Image"
					},
				    {
						"data" : "document"  ,
						"title" : "Document"
					},
					{
						"data" : "start_date"  ,
						"title" : "Start Date"
					},
					
					{
						"data" : "end_date"  ,
						"title" : "End Date"
					},
					{
						"data" : "remarks"  ,
						"title" : "Remarks"
					},
					{
						"data" : "status_name"  ,
						"title" : "Status"
					},
			]
		            
				return columns;
			},
			createMilestoneColumnDefs : function createMilestoneColumnDefs(){
				let columnDefs = 
				[
				  {
					   "targets": 0,
					   "searchable": false,
		               "width": "5%",
		               "render": function(data, type, full, meta) {
		            	 return meta.row + 1;
		                },
			      },
			      {
			    	  "targets": 1,
			    	  "visible": false,
			    	  "render": function(data, type, row, meta) {
			    		  let prj = window.depProjectMonitoringController.projectList.filter(function(p){
			    			  if(parseInt(p.project_id.value) === parseInt(row.project_id)){
			    				  return p;
			    			  }
			    		  });
			    		  return prj[0].project_name.value;
		                },
			      },
			      {
						"targets": 4,
						"data" : "image",
						"title" : "View Image",
						"render" : function(data, type, row,
								meta) {
							return '<button id="open_image" title="View" name="open_image" ' + 
							 'data-milestone_id="'+row.milestone_id+'" data-p_id = "'+row.project_id+'" data-image = "'+data+'" class="btn action-btn" ' + 
							 ' onclick="window.depProjectMonitoringController.openImage(this)" >' +
							 '<span class="fa fa-picture-o" aria-hidden="true"></span> </button > ';
						}
				  },
				  {
						"targets": 5,
						"data" : "document",
						"title" : "Download Document",
						"render" : function(data, type, row,
								meta) {
							return '<button id="open_doc" title="Download" name="open_doc" ' + 
							 'data-milestone_id="'+row.milestone_id+'" data-p_id = "'+row.project_id+'" data-document = "'+data+'" class="btn action-btn" ' + 
							 ' onclick="window.depProjectMonitoringController.openDecument(this)" >' +
							 '<span class="fa fa-file" aria-hidden="true"></span> </button > ';
						}
				  },
			      {
						"targets": 10,
						"data" : "milestone_id",
						"title" : "Action",
						"render" : function(data, type, row,
								meta) {
									return "<button name='edit' class='btn action-btn' title='edit' data-row='"+JSON.stringify(row)+"' data-toggle='modal' data-target='#dep_edit_milestone' " +
									"onclick='window.depProjectMonitoringController.displayMilestone(this);'> "+
							"<span class='fa fa-edit' aria-hidden='true'></span> </button >";
						}
				  }
				]
				return columnDefs;	
			},
			displayMilestone : function displayMilestone(data){
				let row = $(data).data('row');
				window.depProjectMonitoringController.fillFormData(row);
			},
			fillFormData : function fillFormData(row){
				$("#milestoneId").val(row.milestone_id);
				$("#mstUp_milestone_name").val(row.milestone_name);
				$("#mstUp_description").val(row.description);
				$("#mstUp_start_date").val(window.depProjectMonitoringController.formatDate(row.start_date));
				$("#mstUp_end_date").val(window.depProjectMonitoringController.formatDate(row.end_date));
				$("#mstUp_milestone_status").val(row.status_id);
				$("#mstUp_remarks").val(row.remarks);
				
				let images = row.image;
				let documents = row.document;
				
				$('.filename ul').remove();
				$('.docname ul').remove();
				
				if(images.length > 0){
					let imgs = images.split(",");
					
					var filenames = '';
				     for (var i = 0; i < imgs.length; i++) {
				        filenames += '<li value="'+imgs[i]+'">' + imgs[i] +'<i class="fa fa-times removeList m-2" aria-hidden="true"></i>'+ '</li>';
				    }
				     
				     if($(".filename").has("ul").length > 0){
				    	 $(".filename").append('<ul class="imgul">' + filenames + '</ul>');
				     }else{
				    	 $(".filename").html('<ul class="imgul">' + filenames + '</ul>');
				     }
				     
				    $(".removeList").click(function(){
						  $(this).parent('li').remove();
					});
				}
				
				if(documents.length > 0){
					let docs = documents.split(",");
					
					var filenames = '';
				     for (var i = 0; i < docs.length; i++) {
				        filenames += '<li value="'+docs[i]+'">' + docs[i] +'<i class="fa fa-times removeList m-2" aria-hidden="true"></i>'+ '</li>';
				    }
				     
				     if($(".docname").has("ul").length > 0){
				    	 $(".docname").append('<ul class="imgul">' + filenames + '</ul>');
				     }else{
				    	 $(".docname").html('<ul class="imgul">' + filenames + '</ul>');
				     }
				     
				    $(".removeList").click(function(){
						  $(this).parent('li').remove();
					});
				}
				
			},
			showHideFieldsDepartmentWise : function showHideFieldsDepartmentWise(status){
				
				$("#mstUp_documents").prop('disabled', status);
				$("#mstUp_images").prop('disabled', status);
				
				$("#mstUp_start_date").prop('disabled', status);
				$("#mstUp_end_date").prop('disabled', status);
				
				$("#mstUp_milestone_status").prop('disabled', status);
				
				$("#mstUp_milestone_name").prop("readonly", status);
				$("#mstUp_description").prop("readonly", status);
			},
			getStatusList: function getStatusList(){
				
				$('#milestone_status').empty().append(
				'<option value="">Select Status</option>');
				
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let statusObj = {};
				
				let postData = JSON.stringify(statusObj);
				$(".loader").fadeIn();
				
				return $.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/getStatusList",
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
								$(".loader").fadeOut();
								if(result.responseCode == 200){
									let str = "";
									$('#milestone_status').empty().append(
									'<option value="">Select Status</option>');
									for ( let i in result.data) {
										let name = result.data[i].project_name;
										let id = result.data[i].project_id;
										str += "<option value='" + id
												+ "'>" + name
												+ "</option>";
									}
									$('#milestone_status').append(str);
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
			
			getProjectReport: function getProjectReport(projectObj){
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				base.projectReports = [];
				let postData = JSON.stringify(projectObj);
				$(".loader").fadeIn();
				
				return $.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/getProjectReport",
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
								$(".loader").fadeOut();
								if(result.responseCode == 200){
									base.projectReports = result.data;
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
			
			getProjectFieldPermissionsList: function getProjectFieldPermissionsList(){
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				return $.ajax({
					method : 'GET',
					url : window.iscdl.appData.baseURL + "api/project/getProjectFieldPermissionsList",
					async : false,
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {
						if (!$.isEmptyObject(result) && result != null) {
							try {
								if(result.responseCode == 200){
									base.projectFieldPermissionsList = result.data;
									var mappingData = window.depProjectMonitoringController.projectFieldPermissionsMapping;
									
									$('#permission_access').empty();
									var tr;
									tr = $('<tr id="permission_header"/>');
									tr.append('<th>Attributes</th><th>View</th><th>Edit</th>');
									$('#permission_access').append(tr);
									
									tr = $('<tr id="permission_selectAll_header"/>');
									tr.append('<td></td>'+
											'<td>Select All <input type="checkbox" id="viewPermission_selectAll" onclick="viewSelectAllChange(this);"></td>'+
											'<td>Select All <input type="checkbox" id="editPermission_selectAll" onclick="editSelectAllChange(this);"></td>');
									$("#permission_access").append(tr);
									
									for(let i in result.data){
										let filteredPermission = mappingData.permissions.filter(function(p){
											if(p.permission_id === result.data[i].permission_id){
												return p;
											}
										});
										var is_visible = false, is_editable = false;
										if(filteredPermission.length > 0){
											is_visible = filteredPermission[0].is_visible;
											is_editable = filteredPermission[0].is_editable;
										}
										let attr = {"Attributes": result.data[i].field_name, 
												"View": '<input type="checkbox" id="view_permission_'+result.data[i].permission_id+'"' 
												+ ' onclick="permissionCheckboxChange(this);" '
												+ (is_visible ? 'checked="'+is_visible+'">' : '>'), 
												"Edit": '<input type="checkbox" id="edit_permission_'+result.data[i].permission_id+'"' 
												+ ' onclick="permissionCheckboxChange(this);" '
												+ (is_editable ? 'checked="'+is_editable+'">' : '>')};
										
										tr = $('<tr id="permission_'+result.data[i].permission_id+'"/>');
										tr.append("<td>" + attr.Attributes + "</td>");
										tr.append("<td>" + attr.View + "</td>");
										tr.append("<td>" + attr.Edit + "</td>");

										$('#permission_access').append(tr);
									}
									let viewPermissions = $("input[id^='view_permission']");
									let filteredViewPermissions = [];
									for(let i in viewPermissions){
										if(viewPermissions[i].checked){
											filteredViewPermissions.push(viewPermissions[i]);
										}
									}
									if(filteredViewPermissions.length === result.data.length){
										$("#viewPermission_selectAll").prop('checked', true);
									}
									let editPermissions = $("input[id^='edit_permission']");
									let filteredEditPermissions = [];
									for(let i in editPermissions){
										if(editPermissions[i].checked){
											filteredEditPermissions.push(editPermissions[i]);
										}
									}
									if(filteredEditPermissions.length === result.data.length){
										$("#editPermission_selectAll").prop('checked', true);
									}
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							console.log("response obj is empty");
						}

					},
					error : function(e) {
						console.log(e);
						if(e.status === 403){
							$u.notify('warning', 'Notification',
									e.responseJSON.responseMessage, '');
						}
					}
				});
			},
			
			getProjectPermissionUserList: function getProjectPermissionUserList(request_obj){
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let postData = JSON.stringify(request_obj);
				
				return $.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/getProjectPermissionUserList",
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
								
								if(result.responseCode == 200){
									base.projectPermissionUserList = result.data;
									var mappingData = window.depProjectMonitoringController.projectFieldPermissionsMapping;
									var str = "";
									for (let i in result.data) {
										let filteredUser = mappingData.users.filter(function(u){
											if(parseInt(u) === result.data[i].user_id){
												return u;
											}
										});
										var is_checked = false;
										if(filteredUser.length > 0){
											is_checked = true;
										}
										str += "<li><input type='checkbox' id='per_user_"+result.data[i].user_id+"' class='mr-1' " +
												(is_checked ? "checked='"+is_checked+"' " : "" )
												+ "onclick='permissionCheckboxChange(this);' "
												+ "value='" + result.data[i].user_id + "'>" + result.data[i].user_name+"</li>";
									}
									if(str === ""){
										str += "<li>No users found.</li>";
									}
									$('#permissionUserList').empty().append(str);
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							console.log("response obj is empty");
						}

					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
						if(e.status === 403){
							$u.notify('warning', 'Notification',
									e.responseJSON.responseMessage, '');
						}
					}
				});
			},
			
			getProjectFieldPermissionsMapping: function getProjectFieldPermissionsMapping(projectId){
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				var obj = {project_id: projectId};
				let postData = JSON.stringify(obj);
				$(".loader").fadeIn();
				
				
				return $.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/getProjectFieldPermissionsMapping",
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
								$(".loader").fadeOut();
								if(result.responseCode == 200){
									base.projectFieldPermissionsMapping = result.data;
									let permission_user_obj = {project_id: projectId};
									window.depProjectMonitoringController.getProjectPermissionUserList(permission_user_obj);
									window.depProjectMonitoringController.getProjectFieldPermissionsList();
								}
							} catch (err) {
								$(".loader").fadeOut();
								console.log(err);
							}
						} else {
							$(".loader").fadeOut();
							console.log("response obj is empty");
						}

					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
						if(e.status === 403){
							$u.notify('warning', 'Notification',
									e.responseJSON.responseMessage, '');
						}
					}
				});
			},
			mapProjectFieldPermission : function mapProjectFieldPermission(obj){
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let postData = JSON.stringify(obj);
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/mapProjectFieldPermission",
					async : false,
					data : postData,
					contentType : 'application/json',
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {
						if (!$.isEmptyObject(result) && result != null) {
							try {
								$(".loader").fadeOut();
								let str = "";
								if (result.responseCode == 200) {
//									$u.notify('success', 'Success',
//											result.responseMessage, '');
//									location.reload(true);
								}else if(result.responseCode == 204){
									$u.notify('info', 'Notification',
											result.responseMessage, '');
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							$(".loader").fadeOut();
							$u.notify('error', 'Notification',
									'Something went wrong', '');
						}
					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
						let response = JSON.parse(e.responseText);
						if(response.responseCode == 403) {
							$u.notify("info", "Notification", response.responseMessage);
						} 
					}
				});
			},
			openImage : function openImage(data){
				let m_id = $(data).data("milestone_id");
				let p_id = $(data).data("p_id");
				let fileNames = $(event.currentTarget).data('image');
				
				if(fileNames == ""){
					$u.notify('info', 'Notification',
							'No Image Currently available', '');	
					return;
				}
				
				var files = fileNames.split(",");
				
				var files = fileNames.split(",");
				
				for(var i = 0 ;i<files.length;i++){
					$("#milestoneImg").append("<div class='carousel-item"+ 
							(i === 0 ? " active'>" : "'>") +"<img class='d-block w-100' src='"+
							window.iscdl.appData.baseURL + "api-docs/getMilestoneImage/"+ p_id + "/" + m_id + "/" + encodeURIComponent(files[i])  
							+"' alt='"+files[i]+"'> </div>");
				}
				$("#milestoneImageModal").show();
				
			},
			openDecument : function openDecument(data){
				
				let m_id = $(data).data("milestone_id").toString();
				let p_id = $(data).data("p_id").toString();
				let fileNames = $(event.currentTarget).data('document');
				
				if(fileNames == ""){
					$u.notify('info', 'Notification',
							'No Document Currently available', '');	
					return;
				}
				
				var files = fileNames.split(",");
				
				for(let i =0; i < files.length ; i++){
					let fileName = files[i];
					
					let documentObj = {
							project_id : p_id,
							milestone_id :m_id,
							type : "milestone",
							filename : fileName
					};
					
					let postData = JSON.stringify(documentObj);
					var xhr = new XMLHttpRequest();
					xhr.open('POST', window.iscdl.appData.baseURL + "api-docs/getDocument", true);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.responseType = 'blob';
					xhr.onload = function() {
					    var blob = this.response;
					    var a = window.document.createElement('a');
					    a.href = window.URL.createObjectURL(blob);
					    a.download = files[i];
					    document.body.appendChild(a);
					    a.click();
					    document.body.removeChild(a);
					};
					
					xhr.send(postData);
				}
			},
			openProjectImage : function openProjectImage(project_id, files){
	
				for(var i = 0 ;i < files.length; i++){
					$("#carousel-inner").append("<div class='carousel-item"+ 
							(i === 0 ? " active'>" : "'>") + "<label>"+files[i]+"</label><br>"
							+"<img class='d-block w-100' src='"+
							window.iscdl.appData.baseURL + "api-docs/getProjectImage/"+project_id+"/" + encodeURIComponent(files[i])  
							+"' alt='"+files[i]+"'> </div>");
				}
				$("#prj_imageModal").show();
			},
			getProjectDocs : function getProjectDocs(project_id, docs){
				for(let i = 0;i< docs.length; i++){
					let obj = {type:"project", project_id: project_id.toString(), filename:docs[i]};
					let postData = JSON.stringify(obj);
					var xhr = new XMLHttpRequest();
					xhr.open('POST', window.iscdl.appData.baseURL + "api-docs/getDocument", true);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.responseType = 'blob';
					xhr.onload = function() {
					    var blob = this.response;
					    var a = window.document.createElement('a');
					    a.href = window.URL.createObjectURL(blob);
					    a.download = docs[i];
					    document.body.appendChild(a);
					    a.click();
					    document.body.removeChild(a);
					};
					
					xhr.send(postData);
				}
			},
			getProjectUsers : function getProjectUsers(obj, users){
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let postData = JSON.stringify(obj);
				
				return $.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/getProjectPermissionUserList",
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
								
								if(result.responseCode == 200){
									base.projectAllottedToUserList = result.data;
									if(!obj.project_id){
										let str = "";
										str += "<option value='0'>Select User</option>";
										for (let i in result.data) {
											str += "<option value='"+result.data[i].user_id+"'>"+result.data[i].user_name+"</option>"
											
//											str += "<li><input type='checkbox' id='prj_user_"+result.data[i].user_id+"' class='mr-1' " 
//											+ "value='" + result.data[i].user_id + "'>" + result.data[i].user_name+"</li>";
										}
										if(str === ""){
											str += "<options value='0'>No users found.</option>";
										}
										$('#projectUserList').empty().append(str);
									}else{
										let str = "";
										str += "<option value='0'>Select User</option>";
										let selectedValue = "0";
										for (let i in result.data) {
											let filteredUser = users.filter(function(u){
												if(u.user_id === result.data[i].user_id){
													return u.user_id;
												}
											});
											var is_checked = false;
											if(filteredUser.length > 0){
												is_checked = true;
												selectedValue = result.data[i].user_id;
												$("#prjUp_user_name").val(result.data[i].name);
												$("#prjUp_user_contact_no").val(result.data[i].contact_no);
												$("#prjUp_user_email").val(result.data[i].email_id);
											}
											
											str += "<option value='"+result.data[i].user_id+"'>"+result.data[i].user_name+"</option>"
											
//											str += "<li><input type='checkbox' id='prjUp_user_"+result.data[i].user_id+"' class='mr-1' "
//													+ (is_checked ? "checked='"+is_checked+"' " : "" )
//													+ "value='" + result.data[i].user_id + "'>" + result.data[i].user_name+"</li>";
										}
										if(str === ""){
											str += "<options value='0'>No users found.</option>";
										}
										$('#projectUpdateUserList').empty().append(str);
										$('#projectUpdateUserList option[value='+selectedValue+']').attr("selected",true);
									}
									
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							console.log("response obj is empty");
						}

					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
						if(e.status === 403){
							$u.notify('warning', 'Notification',
									e.responseJSON.responseMessage, '');
						}
					}
				});
			},
			projectIntimationUsers : [],
			sendProjectIntimation: function(obj){
				let token_val = localStorage.getItem('token');
				
				if(token_val == "" || token_val == undefined || token_val == null){
					$u.notify('info', 'Notification',
							'You are not authorized user', '');
					return;
				}
				
				let postData = JSON.stringify(obj);
				$(".loader").fadeIn();
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "api/project/sendProjectIntimation",
					async : false,
					data : postData,
					contentType : 'application/json',
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					success : function(result) {
						if (!$.isEmptyObject(result) && result != null) {
							try {
								$(".loader").fadeOut();
								if (result.responseCode == 200) {
									$u.notify('success', 'Success',
											result.responseMessage, '');
									$("#project_intimation_close").trigger('click');
								}else if(result.responseCode == 204){
									$u.notify('info', 'Notification',
											result.responseMessage, '');
								}
							} catch (err) {
								console.log(err);
							}
						} else {
							$(".loader").fadeOut();
							$u.notify('error', 'Notification',
									'Something went wrong', '');
						}
					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
						let response = JSON.parse(e.responseText);
						if(response.responseCode == 403 || response.responseCode == 401) {
							$u.notify("info", "Notification", response.responseMessage);
						} 
					}
				});
			},
			formatDate : function (inputDate){
				if(inputDate === undefined || inputDate === null){
					return "";
				}
				var arr = inputDate.split("-");
				if(arr.length === 3) {
					return arr[2] + "-" + arr[1] + "-" + arr[0];
				}else {
					return "";
				}
			}
		}

	/**
	 * add public functions to base
	 */

	global.depProjectMonitoringController = base;

})(window, jQuery)