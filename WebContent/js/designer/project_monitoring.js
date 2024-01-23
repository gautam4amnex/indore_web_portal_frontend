$.validator.addMethod('numericVal', function(value, element) {
	return /^\d*$/.test(value);
}, "Please Enter A Numeric Value");

//contact no check validator
$.validator.addMethod('contactNum', function(value, element) {
	return this.optional(element) || /^\d{10}$/.test(value);
}, "Please Enter A Valid Contact Number");

//email check validator
$.validator.addMethod('emailCheck', function(value, element) {
	return this.optional(element) || /^\w[\.\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
}, "Please Enter A Valid Email Id");


var _department_id = "1", projectTable;

function createProjectDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
      columns: options.columns,
		data : options.data,
		"searching": true,
		"autoWidth" : true,
		dom: 'Blfrtip',
		responsive: true,
		buttons: [
			
			{
				extend: 'csvHtml5',	
				text: 'Export to Excel',
           	className: 'btn-indore-table ete' ,
           	filename: 'Project Monitoring',
           	exportOptions: {
                  columns: 'th:not(:last-child)'
              }
			},
			{
				extend: 'pdf',
				text: 'Export to PDF',
				className: 'btn-indore-table pdf' ,
				orientation : 'landscape',
                pageSize : 'A3',
                filename: 'Project Monitoring',
                exportOptions: {
                	columns: 'th:not(:last-child)'
               	}
			},
			
      ],
		scrollY: " calc(100vh - 425px) ",
      scrollX: true,
      // scrollCollapse: true,
		columnDefs: options.columnDefs
  } );
}

function createDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
        columns: options.columns,
		data : options.data,
		"searching": true,
		"autoWidth" : true,
		dom: 'Blfrtip',
		responsive: true,
		buttons: [
			
			{
				extend: 'csvHtml5',	
				text: 'Export to Excel',
             	className: 'btn-indore-table ete' ,
             	filename: 'Project Milestones',
             	exportOptions: {
                    columns: 'th:not(:last-child)'
                }
			},
			{
				extend: 'pdf',
				text: 'Export to PDF',
				className: 'btn-indore-table pdf' ,
				orientation : 'landscape',
                pageSize : 'A3',
                filename: 'Project Milestones',
                exportOptions: {
                	columns: 'th:not(:last-child)'
               	}
			},
			
        ],
		scrollY: " calc(100vh - 425px) ",
        scrollX: true,
        // scrollCollapse: true,
		columnDefs: options.columnDefs
    } );
}

function setProjectFieldValue(id, data){
	
	if(data.is_visible === "false"){
		$("#"+id).val("NO ACCESS");
	}else{
		$("#"+id).val(data.value);
	}
	
	$('#'+id).prop('disabled', data.is_editable === "false");
	
}

function getProjectDocs(event){
	
	let row = $(event.currentTarget).data('row');
	let type = typeof row;
	if(type === "string"){
		row = JSON.parse(row);
	}
	let docs = row.documents.value.split(",");
	window.depProjectMonitoringController.getProjectDocs(row.project_id.value, docs);
}

function openProjectImage(event){
	let row = $(event.currentTarget).data('row');
	let type = typeof row;
	if(type === "string"){
		row = JSON.parse(row);
	}
	let files = row.images.value.split(",");
	window.depProjectMonitoringController.openProjectImage(row.project_id.value, files);
}

function setUpdateProjectUsers(projectId, users){
	let project_user_obj = {department_id: localStorage.getItem('department_id'), project_id: projectId};
	window.depProjectMonitoringController.getProjectUsers(project_user_obj, users);
}

function updateProject(event){
	
	$('#prjUp_up_images').empty();
	
	let row = $(event.currentTarget).data('row');
	let type = typeof row;
	if(type === "string"){
		row = JSON.parse(row);
	}
	
	$('#prjUp_project_id').val(row.project_id.value);
	
	setProjectFieldValue('prjUp_project_name', row.project_name);
	setProjectFieldValue('prjUp_location_name', row.location_name);
	setProjectFieldValue('prjUp_latitude', row.latitude);
	setProjectFieldValue('prjUp_longitude', row.longitude);
	
//	setProjectFieldValue('prjUp_district_id', row.district_id);
//	setProjectFieldValue('prjUp_tehsil_id', row.tehsil_id);
//	setProjectFieldValue('prjUp_village_id', row.village_id);
//	setProjectFieldValue('prjUp_ward_id', row.ward_id);
//	setProjectFieldValue('prjUp_zone_id', row.zone_id);
	
	setProjectFieldValue('prjUp_contractor_name', row.contractor_name);
	setProjectFieldValue('prjUp_contractor_number', row.contractor_number);
	setProjectFieldValue('prjUp_contractor_agency', row.contractor_agency);
	setProjectFieldValue('prjUp_contractor_email', row.contractor_email);
	setProjectFieldValue('prjUp_work_order_period', row.work_order_period);
	
	setProjectFieldValue('prjUp_contract_period', row.contract_period);
	setProjectFieldValue('prjUp_start_date', getInputDate(row.start_date));
	setProjectFieldValue('prjUp_end_date', getInputDate(row.end_date));
	
	setProjectFieldValue('prjUp_design_consultant_name', row.design_consultant_name);
	setProjectFieldValue('prjUp_design_consultant_number', row.design_consultant_number);
	setProjectFieldValue('prjUp_physical_progress', row.physical_progress);
	setProjectFieldValue('prjUp_project_status', row.project_status);
	
	setProjectFieldValue('prjUp_remarks', row.remarks);
	setProjectFieldValue('prjUp_total_cost', row.total_cost);
	setProjectFieldValue('prjUp_performance_bank_guarantee', row.performance_bank_guarantee);
	setProjectFieldValue('prjUp_performance_bank_date', getInputDate(row.performance_bank_date));
	
	setProjectFieldValue('prjUp_financial_progress', row.financial_progress);
	setProjectFieldValue('prjUp_work_order_no', row.work_order_no);
	setProjectFieldValue('prjUp_pmc_name', row.pmc_name);
	setProjectFieldValue('prjUp_contact_number', row.pmc_contact_number);
	
	setProjectFieldValue('prjUp_department_id', row.department_id);
	setProjectFieldValue('prjUp_expected_completion_date', getInputDate(row.expected_completion_date));
	setProjectFieldValue('prjUp_expected_start_date', getInputDate(row.expected_start_date));
	
	$('#prjUp_ward_no').val(row.ward_no.value);
	$('#prjUp_ward_name').val(row.ward_name.value);
	$('#prjUp_zone_no').val(row.zone_no.value);
	$('#prjUp_zone_name').val(row.zone_name.value);
	$('#prjUp_district').val(row.district.value);
	
	$("input[name='prjUp_type'][value='"+row.project_type.value+"']").attr("checked","checked");
	$("input[name='prjUp_type']").prop('disabled', row.project_type.is_editable === "false");
	setProjectTypeForUpdate();
	
	$('#prjUp_images').prop('disabled', row.images.is_editable === "false");
	setEditImages(row.images.value, "img");
	$('#prjUp_documents').prop('disabled', row.documents.is_editable === "false");
	setEditImages(row.documents.value, "doc");
	
	window.monitoringMapController.modal_flag = "UPDATE";
	
	setUpdateProjectUsers(row.project_id.value, row.users);
}

function setProjectIntimationModal(event){
	let row = $(event.currentTarget).data('row');
	let type = typeof row;
	if(type === "string"){
		row = JSON.parse(row);
	}
	window.depProjectMonitoringController.projectIntimationUsers = row.users;
	document.getElementById('intimation_project_name').innerHTML = row.project_name.value;
}


function getProjectPermissionDetails(event){
	let row = $(event.currentTarget).data('row');
	let type = typeof row;
	if(type === "string"){
		row = JSON.parse(row);
	}
	$('#permission_projectId').val(row.project_id.value);
	document.getElementById('permission_projectName').innerHTML = row.project_name.value;
	
	window.depProjectMonitoringController.getProjectFieldPermissionsMapping(row.project_id.value);
}

function viewSelectAllChange(viewAll){
	let viewPermissions = $("input[id^='view_permission']");
	for(var i=0;i<viewPermissions.length;i++){
		$("#"+viewPermissions[i].id).prop('checked', viewAll.checked);
	}
	if(!viewAll.checked) {
		$("#editPermission_selectAll").prop('checked', viewAll.checked);
		let editPermissions = $("input[id^='edit_permission']");
		for(var i=0;i<editPermissions.length;i++){
			$("#"+editPermissions[i].id).prop('checked', viewAll.checked);
		}
	} 
	
}

function editSelectAllChange(editAll){
	let editPermissions = $("input[id^='edit_permission']");
	for(var i=0;i<editPermissions.length;i++){
		$("#"+editPermissions[i].id).prop('checked', editAll.checked);
	}
	if(editAll.checked){
		$("#viewPermission_selectAll").prop('checked', editAll.checked);
		let viewPermissions = $("input[id^='view_permission']");
		for(var i=0;i<viewPermissions.length;i++){
			$("#"+viewPermissions[i].id).prop('checked', editAll.checked);
		}
	}
}

function permissionCheckboxChange(chk){
	if(chk.id.includes("edit_") && chk.checked){
		let id = "view_permission" + chk.id.substr(chk.id.lastIndexOf("_"));
		$("#"+id).prop('checked', chk.checked);
	}
	if(chk.id.includes("view_") && !chk.checked){
		let id = "edit_permission" + chk.id.substr(chk.id.lastIndexOf("_"));
		$("#"+id).prop('checked', chk.checked);
	}
	$("#"+chk.id).prop('checked', chk.checked);
}


function LoadCurrentProjects(result) {
	projectTable = createProjectDatatable({
		id : 'dep_project',
		columns : [
			{ "data": null, title: "Sr No." },
			{ "data" : "project_name", "title" : "Project Name", 
				render: function(data, type, row, meta){
					return data.is_visible === "true" ? data.value : "NO ACCESS"
				} },
            { "data" : "work_order_no", "title" : "Work Order No",
				render: function(data, type, row, meta){
					return data.is_visible === "true" ? data.value : "NO ACCESS"
				}},
            { "data" : "start_date", "title" : "Start Date",
				render: function(data, type, row, meta){
					return data.is_visible === "true" ? data.value : "NO ACCESS"
				}},
            { "data" : "end_date", "title" : "End Date",
				render: function(data, type, row, meta){
					return data.is_visible === "true" ? data.value : "NO ACCESS"
				}},
            { "data" : "status_name" , "title" : "Status",
				render: function(data, type, row, meta){
					return row.project_status.is_visible === "true" ? data.value : "NO ACCESS"
				}},
			{ "data" : "images" , "title" : "Images",
				render: function(data, type, row, meta){
					if(data.is_visible === "true"){
						return "<a style='cursor: pointer;'><span data-row='"+JSON.stringify(row)+"' onclick='openProjectImage(event);'>" +
						 data.value + "</span></a> ";
					}else{
						return "NO ACCESS";
					}
					
				}},
			{"data" : "documents", "title" : "Documents",
					render: function(data, type, row, meta){
						if(data.is_visible === "true"){
							let docs = data.value != null && data.value != "" ? data.value.split(",") : [];
							let str = "",  count = 1;
							if(docs.length > 0){
								for(let i=0;i<docs.length;i++){
									str += "<a style='cursor: pointer;'><span data-row='"+JSON.stringify(row)+"' " +
											"onclick='getProjectDocs(event);'>" +
									 docs[i] + "</span></a>"+(i < (docs.length - 1) ? "," : "")+"<br> ";
								}
							}
							
							return str;
						}else{
							return "NO ACCESS";
						}
					}
			},
			{ "data" : "", "title" : "Project Allotted To Name",
				render: function(data, type, row, meta){
					return row.users.length > 0 ? row.users[0].name : "";
				}},
			{ "data" : "", "title" : "Project Allotted To Contact Number",
				render: function(data, type, row, meta){
					return row.users.length > 0 ? row.users[0].contact_no : "";
				}}
		],
			
		data : result.responseJSON.data,
		columnDefs : [
			{
	            "searchable": false,
	            "width": "5%",
	            "targets": 0,
	            "render": function(data, type, full, meta) {
	                return meta.row + 1;
	             },
	        },{
				"targets": 10,
				"data": null,
				"title" : "Action",
				"render" : function(data, type, row, meta) {
					return "<button title='Edit' name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"'" +
					" data-toggle='modal' data-target='#dep_infoupdate_project' " +
					" onclick='updateProject(event)'> <span class='fa fa-edit' aria-hidden='true'></span> </button>"+
					"<button title='Field Permission' class='btn action-btn' data-row='"+JSON.stringify(row)+"'" +
					"data-toggle='modal' data-target='#table_demo'" +
					" onclick='getProjectPermissionDetails(event)'>" +
					"<img src='images/Permission-99.svg' class='access_margin' /></button>"+
					"<button title='Send Intimation' class='btn action-btn' data-row='"+JSON.stringify(row)+"'" +
					"data-toggle='modal' data-target='#send_projectIntimation'" +
					" onclick='setProjectIntimationModal(event)'> <span style='font-size: .75em; color: #865439;'>" +
					"<i class='fa fa-id-card fa-sm' aria-hidden='true'></i></span></button>";
				}
			}
		]
			
	})
	

}

$(document).ready(function(){	
	
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
	$('.datepicker').daterangepicker({
		 singleDatePicker: true,
		 timePicker: false,
		 locale: {
			format: 'DD-MM-YYYY'
		},
		"drops": "up"
	 }); 
	
	$(".dep-modal .modal-body").css("height", "80vh");
	
		
});

/**
 * milestone project change event
 */

$('#select_project').change(function(){
	let proejct_id = $(this).val();
	if(proejct_id == ""){
		$u.notify('warning', 'Notification',
				'Please Select Project', '');
		let milestones = [];
		window.depProjectMonitoringController.createMileStoneTable(milestones);
		return;
	}else{
		window.depProjectMonitoringController.filterMilestoneProjectwise(proejct_id);
	}
});

/**
 *  add milestone cancel button click event
 */

$("#btn_cancle_milsestone").click(function(){
	$('#form_addMilestone').trigger('reset');
	window.depUtlityController.removeError('form_addMilestone');
});

/**
 * update milestone cancel button click event
 */

$("#btn_cancle_Upmilsestone").click(function(){
	$('#form_updateMilestone').trigger('reset');
	window.depUtlityController.removeError('form_updateMilestone');
});

/**
 * close modal click event
 */
$(".close").click(function(){
	
	$('#form_addMilestone').trigger('reset');
	window.depUtlityController.removeError('form_addMilestone');
	
	$('#form_updateMilestone').trigger('reset');
	window.depUtlityController.removeError('form_updateMilestone');
});


/**
 * tab click event for data-table resize
 */	
$(".tab-data").click(function(){
	$(".loader").fadeIn();
	setTimeout(function(){ 
		$('.dataTables_wrapper').resize();
	}, 100);
	$(".loader").fadeOut();
});

function removeProjectFiles(event){
	
	let files = $(event.currentTarget).data('fileobj');
	let i = $(event.currentTarget).data('fileid');
	let type = $(event.currentTarget).data('filetype');
	
	if(type === 'img'){
		let li = $("#prj_img_li_"+i);
		li.remove();
	}else{
		let li = $("#prj_doc_li_"+i);
		li.remove();
	}
	
}

function setEditImages(files, type) {
	if(files === "") {
		return false;
	}
	if(type === "img") {
		$("#prjUp_up_imageList").empty();
		let imgs = files.split(",");
		for(var i = 0; i < imgs.length; i++) {
    		li = $("<li id='prj_img_li_"+i+"' value='"+imgs[i]+"'>" + imgs[i] + " <button type='button' " +
    				"data-fileid='"+i+"' data-filetype='img' class='btn action-btn' onclick='removeProjectFiles(event)'>" +
    				"<span class='fa fa-remove' aria-hidden='true'></span></button></li>");
    		$("#prjUp_up_imageList").append(li);
    	}
	} else{
		$("#prjUp_up_docList").empty();
		let docs = files.split(",");
		for(var i = 0; i < docs.length; i++) {
    		li = $("<li id='prj_doc_li_"+i+"' value='"+docs[i]+"'>" + docs[i] + " <button type='button' " +
    				"data-fileid='"+i+"' data-filetype='doc' class='btn action-btn' onclick='removeProjectFiles(event)'>" +
    				"<span class='fa fa-remove' aria-hidden='true'></span></button></li>");
    		$("#prjUp_up_docList").append(li);
    	}
	}
    
}

function readURL(input, id) {
    if (input.files) {
    	$('#'+id).empty();
    	var reader,li;
    	for(var i = 0; i < input.files.length; i++) {
    		reader = new FileReader();
    		li = $("<li><img id='img_"+i+"' src='"+URL.createObjectURL(event.target.files[i])+"'/></li>");
    		$("#"+id).append(li);
    	}
    }
}

$("#prj_imageModalCloseBtn").click(function(){
	$("#carousel-inner").empty();
	$("#prj_imageModal").hide();
});

$("#prj_images").change(function(){
    readURL(this, 'prj_up_images');
});

$("#prjUp_images").change(function(){
	readURL(this, 'prjUp_up_images');
});

$("#add_project_btn").click(function(){
	$('#prj_up_images').empty();
	$("input[name='prj_type'][value='NEW']").prop('checked', true).trigger('change');
});

//function readDocURL(input) {
//    if (input.files) {
//    	var reader,li;
//    	for(var i = 0; i < input.files.length; i++) {
//    		reader = new FileReader();
//    		li = $("<li><embed id='doc_"+i+"' src='"+URL.createObjectURL(event.target.files[i])+"' height='150' width='150'/></li>");
//    		$("#prj_up_docs").append(li);
//    	}
//    }
//}
//
//$("#prj_documents").change(function(){
//	$('#prj_up_docs').empty();
//	readDocURL(this);
//});

	
/**
 * DROPDOWN CHANGE EVETNS FOR DISTRICT/TEHSIL
 *
 */

$("#prj_district_id").change(function(){
	let parent_id = $('#prj_district_id').val();
	let data = window.depUtlityController.projectMasterDetails;
	window.depUtlityController.changeDependentDropdown(parseInt(parent_id),'district_id', 'prj_tehsil_id', 'Tehsil', 'tehsil_id', 'tehsil_name', data.tehsil_master);
});

$("#prj_tehsil_id").change(function(){
	let parent_id = $('#prj_tehsil_id').val();
	let data = window.depUtlityController.projectMasterDetails;
	window.depUtlityController.changeDependentDropdown(parseInt(parent_id),'tehsil_id', 'prj_village_id', 'Village', 'village_id', 'village_name', data.village_master);
});

$("#prjUp_district_id").change(function(){
	let parent_id = $('#prjUp_district_id').val();
	let data = window.depUtlityController.projectMasterDetails;
	window.depUtlityController.changeDependentDropdown(parseInt(parent_id),'district_id', 'prjUp_tehsil_id', 'Tehsil', 'tehsil_id', 'tehsil_name', data.tehsil_master);
});

$("#prjUp_tehsil_id").change(function(){
	let parent_id = $('#prjUp_tehsil_id').val();
	let data = window.depUtlityController.projectMasterDetails;
	window.depUtlityController.changeDependentDropdown(parseInt(parent_id),'tehsil_id', 'prjUp_village_id', 'Village', 'village_id', 'village_name', data.village_master);
});

$("input[name='prj_type']").change(function(){
	let type = $("input[name='prj_type']:checked").val();
	if(type === "NEW"){
		$('#prj_physical_progress').val("");
		$('#prj_physical_progress').prop('disabled', true);
		
		$('#prj_project_status').val("0");
		$('#prj_project_status').prop('disabled', true);
		
		$('#prj_financial_progress').val("");
		$('#prj_financial_progress').prop('disabled', true);
	}else{
		$('#prj_physical_progress').prop('disabled', false);
		$('#prj_project_status').prop('disabled', false);
		$('#prj_financial_progress').prop('disabled', false);
	}
});


function setProjectTypeForUpdate(){
	let type = $("input[name='prjUp_type']:checked").val();
	if(type === "NEW"){
		$('#prjUp_physical_progress').val("");
		$('#prjUp_physical_progress').prop('disabled', true);
		
		$('#prjUp_project_status').val("0");
		$('#prjUp_project_status').prop('disabled', true);
		
		$('#prjUp_financial_progress').val("");
		$('#prjUp_financial_progress').prop('disabled', true);
	}else{
		$('#prjUp_physical_progress').prop('disabled', false);
		$('#prjUp_project_status').prop('disabled', false);
		$('#prjUp_financial_progress').prop('disabled', false);
	}
}

$("input[name='prjUp_type']").change(function(){
	setProjectTypeForUpdate();
});


$(window).on("load", function(){
	
	
	/**
	 * check department id
	 */
	
	let d_id = window.depUtlityController.getDepartmentId();
	
	if(d_id == "" || d_id == undefined || d_id == null){
		 $u.notify('warning', 'Notification',
					'Department Id is not found', '');
		 return;
	}
	 
	let userObj = JSON.parse(localStorage.getItem("user"));
	 if(userObj.roleType === "ADMIN_ROLE"){
		 window.depProjectMonitoringController.showHideFieldsDepartmentWise(false);
	 }else{
		 window.depProjectMonitoringController.showHideFieldsDepartmentWise(true);
	 }
//	
//	$(".loader").fadeOut(1000);
//	
	window.depUtlityController.headerDrop();
	window.depUtlityController.getDepartmentList('prj_department_id');
	
	window.depUtlityController.getDepartmentList('prjUp_department_id');
	
	let project_user_obj = {department_id: localStorage.getItem('department_id')};
	window.depProjectMonitoringController.getProjectUsers(project_user_obj);
	
	let result = window.depProjectMonitoringController.getProjectList();
	LoadCurrentProjects(result);
	let masterData = window.depProjectMonitoringController.getProjectMasterDetails();
	
	
	$('form[id="form_addProject"]')
	.validate(
			{
				rules : {
					prj_project_name : "required",
					prj_latitude : "required",
					prj_longitude : "required",
					prj_start_date : "required",
					prj_end_date : "required",
					prj_expected_start_date : "required",
					prj_expected_completion_date : "required",
					prj_contractor_email : {
						emailCheck: true
					},
					prj_contractor_number : {
						numericVal: true,
						contactNum: true
					},
					prj_design_consultant_number : {
						numericVal: true,
						contactNum: true
					}
				},
				messages : {
					prj_project_name : {
						required : "Please Enter Project Name"
					},
					prj_latitude : {
						required : "Please Enter Latitude"
					},
					prj_longitude : {
						required : "Please Enter Longitude"
					},
					prj_start_date : {
						required : "Please Select Start Date"
					},
					prj_end_date : {
						required : "Please Select End Date"
					},
					prj_expected_start_date : {
						required: "Please Select Expected Start Date"
					},
					prj_expected_completion_date : {
						required: "Please Select Expected Completion Date"
					},
					prj_contractor_email : {
						emailCheck: "Please Enter A Valid Email Id"
					},
					prj_contractor_number : {
						numericVal: "Please Enter Numeric Value",
						contactNum: "Please Enter Valid Contact Number"
					},
					prj_design_consultant_number : {
						numericVal: "Please Enter Numeric Value",
						contactNum: "Please Enter Valid Contact Number"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let project_type = $("input[name='prj_type']:checked").val();
						let ward_no = $('#prj_ward_no').val();
						let ward_name = $('#prj_ward_name').val();
						let zone_no = $('#prj_zone_no').val();
						let zone_name = $('#prj_zone_name').val();
						
						let project_name = $('#prj_project_name').val();
						let location_name = $('#prj_location_name').val();
						let latitude = $('#prj_latitude').val();
						let longitude = $('#prj_longitude').val();
						let district = $('#prj_district').val();
//						let tehsil_id = $('#prj_tehsil_id').val();
//						let village_id = $('#prj_village_id').val();
						
//						let ward_id = $('#prj_ward_id').val();
//						let zone_id = $('#prj_zone_id').val();
						let contractor_name = $('#prj_contractor_name').val();
						let contractor_number = $('#prj_contractor_number').val();
						let contractor_agency = $('#prj_contractor_agency').val();
						let contractor_email = $('#prj_contractor_email').val();
						
						let work_order_period = $('#prj_work_order_period').val();
						let contract_period = $('#prj_contract_period').val();
						let start_date = $('#prj_start_date').val();
						let end_date = $('#prj_end_date').val();
						let design_consultant_name = $('#prj_design_consultant_name').val();
						let design_consultant_number = $('#prj_design_consultant_number').val();
						
						let physical_progress = $('#prj_physical_progress').val();
						let project_status = $('#prj_project_status').val();
						let remarks = $('#prj_remarks').val();
						let total_cost = $('#prj_total_cost').val();
						let performance_bank_guarantee = $('#prj_performance_bank_guarantee').val();
						let performance_bank_date = $('#prj_performance_bank_date').val();
						let financial_progress =$('#prj_financial_progress').val();
							
						let work_order_no = $('#prj_work_order_no').val();
						let pmc_name = $('#prj_pmc_name').val();
						let pmc_contact_number = $('#prj_contact_number').val();
						let department_id = $('#prj_department_id').val();
						
						let expected_completion_date = $("#prj_expected_completion_date").val();
						let expected_start_date = $("#prj_expected_start_date").val();
						
						let prj_upFiles = $('#prj_images')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#prj_images')[0].files,1);
						
						if(inValidFile){
							$('#prj_images')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						let prj_upDocs = $('#prj_documents')[0].files;
						let inValidDoc = window.depUtlityController.isValidFiles($('#prj_documents')[0].files,3);
						
						if(inValidDoc){
							$('#prj_documents')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only pdf or doc files");
							return false;
						}
						
						
						var validator = $("#form_addProject").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.prj_latitude = "Please Enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.prj_longitude = "Please Enter Longitude";
						}
						if(!project_name || project_name === null || project_name === ""){
							errorObj.prj_project_name = "Please Enter Project Name";
						}
						if(!start_date || start_date === null){
							errorObj.prj_start_date = "Please Select Start date";
						}
						if(!end_date || end_date === null){
							errorObj.prj_end_date = "Please Select End date";
						}
						
						if(!department_id || department_id === null || department_id === "" ){
							$u.notify("warning", "Notification","Please select Department!");
							return false;
						}
						
						if(!project_type || project_type === null || project_type === ""){
							$u.notify("warning", "Notification","Please select project type!");
							return false;
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						if(contractor_number !== null && contractor_number !== "" && /^\d*$/.test(contractor_number) === false){
							errorObj.prj_contractor_number = "Please Enter Numeric Value";
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please enter numeric value for Contractor Number!");
							return false;
						}
						
						if(contractor_email !== null && contractor_email !== "" && /^\w[\.\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(contractor_email) === false){
							errorObj.prj_contractor_email = "Please Enter Valid Email Id";
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please enter valid value for Contractor Email Id!");
							return false;
						}
						
						if(design_consultant_number !== null && design_consultant_number !== "" && /^\d*$/.test(design_consultant_number) === false){
							errorObj.prj_design_consultant_number = "Please Enter Numeric Value";
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please enter numeric value for Design Consultant Contact Number!");
							return false;
						}
						
//						ASSIGN USERS
//						let userList = $('#projectUserList li input[type=checkbox]');
//						let users = [];
//						userList.each(function(e) {
//							let id = $(this).attr('id');
//							let is_checked = $("#"+id).is(':checked');
//							if(is_checked){
//								users.push({user_id: $("#"+id).val()});
//							}
//						});
						
						let users = [{user_id: $("#projectUserList option:selected").val()}];
						
						let obj = {project_name: project_name, location_name: location_name, latitude: latitude,
								longitude: longitude, district: district, project_type: project_type,
								ward_no: ward_no, ward_name: ward_name, zone_no: zone_no, zone_name: zone_name,
								contractor_name: contractor_name, contractor_number: contractor_number, contractor_email: contractor_email,
								contractor_agency: contractor_agency, work_order_period: work_order_period, contract_period: contract_period,
								start_date: formatDate(start_date), end_date: formatDate(end_date), design_consultant_name: design_consultant_name,
								design_consultant_number: design_consultant_number, physical_progress: physical_progress, 
								project_status: project_status, remarks: remarks, total_cost: total_cost, 
								performance_bank_guarantee: performance_bank_guarantee, performance_bank_date: formatDate(performance_bank_date),
								financial_progress: financial_progress, work_order_no: work_order_no, pmc_name: pmc_name,
								pmc_contact_number: pmc_contact_number, department_id: department_id, users: users,
								expected_completion_date: formatDate(expected_completion_date), expected_start_date: formatDate(expected_start_date)};

						window.depProjectMonitoringController.addOrUpdateProject(obj, prj_upFiles, prj_upDocs);
					
						
					} catch (e) {
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateProject"]')
	.validate(
			{
				rules : {
					prjUp_project_name : "required",
					prjUp_latitude : "required",
					prjUp_longitude : "required",
					prjUp_start_date : "required",
					prjUp_end_date : "required",
					prj_expected_start_date: "required",
					prjUp_expected_completion_date : "required",
					prjUp_contractor_number : {
						numericVal: true,
						contactNum: true
					},
					prjUp_contractor_email : {
						emailCheck: true
					},
					prjUp_design_consultant_number : {
						numericVal: true,
						contactNum: true
					}
				},
				messages : {
					prjUp_project_name : {
						required : "Please Enter Project Name"
					},
					prjUp_latitude : {
						required : "Please Select Latitude"
					},
					prjUp_longitude : {
						required : "Please Select Longitude"
					},
					prjUp_start_date : {
						required : "Please Select Start Date"
					},
					prjUp_end_date : {
						required : "Please Select End Date"
					},
					prjUp_expected_start_date : {
						required: "Please Select Expected Start Date"
					},
					prjUp_expected_completion_date : {
						required : "Please Select Expected Completion Date"
					},
					prjUp_contractor_number : {
						numericVal: "Please Enter Numeric Value",
						contactNum: "Please Enter Valid Contact Number"
					},
					prjUp_contractor_email : {
						emailCheck: "Please Enter A Valid Email Id"
					},
					prjUp_design_consultant_number : {
						numericVal: "Please Enter Numeric Value",
						contactNum: "Please Enter Valid Contact Number"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let project_id = $('#prjUp_project_id').val();
						
						let project_type = $("input[name='prjUp_type']:checked").val();
						let ward_no = $('#prjUp_ward_no').val();
						let ward_name = $('#prjUp_ward_name').val();
						let zone_no = $('#prjUp_zone_no').val();
						let zone_name = $('#prjUp_zone_name').val();
						
						let project = window.depProjectMonitoringController.projectList.filter(function(p){
							if(parseInt(p.project_id.value) === parseInt(project_id)){
								return p;
							}
						});
						
						
						let project_name = $('#prjUp_project_name').val() === "NO ACCESS" ? project[0].project_name.value : $('#prjUp_project_name').val();
						let location_name = $('#prjUp_location_name').val() === "NO ACCESS" ? project[0].location_name.value : $('#prjUp_location_name').val();
						let latitude = $('#prjUp_latitude').val() === "NO ACCESS" ? project[0].latitude.value : $('#prjUp_latitude').val();
						let longitude = $('#prjUp_longitude').val() === "NO ACCESS" ? project[0].longitude.value : $('#prjUp_longitude').val();
						let district = $('#prjUp_district').val();
//						let district_id = $('#prjUp_district_id').val() === "NO ACCESS" ? project[0].district_id.value : $('#prjUp_district_id').val();
//						let tehsil_id = $('#prjUp_tehsil_id').val() === "NO ACCESS" ? project[0].tehsil_id.value : $('#prjUp_tehsil_id').val();
//						let village_id = $('#prjUp_village_id').val() === "NO ACCESS" ? project[0].village_id.value : $('#prjUp_village_id').val();
						
//						let ward_id = $('#prjUp_ward_id').val() === "NO ACCESS" ? project[0].ward_id.value : $('#prjUp_ward_id').val();
//						let zone_id = $('#prjUp_zone_id').val() === "NO ACCESS" ? project[0].zone_id.value : $('#prjUp_zone_id').val();
						let contractor_name = $('#prjUp_contractor_name').val() === "NO ACCESS" ? project[0].contractor_name.value : $('#prjUp_contractor_name').val();
						let contractor_number = $('#prjUp_contractor_number').val() === "NO ACCESS" ? project[0].contractor_number.value : $('#prjUp_contractor_number').val();
						let contractor_agency = $('#prjUp_contractor_agency').val() === "NO ACCESS" ? project[0].contractor_agency.value : $('#prjUp_contractor_agency').val();
						let contractor_email = $('#prjUp_contractor_email').val() === "NO ACCESS" ? project[0].contractor_email.value : $('#prjUp_contractor_email').val();
						
						let work_order_period = $('#prjUp_work_order_period').val() === "NO ACCESS" ? project[0].work_order_period.value : $('#prjUp_work_order_period').val();
						let contract_period = $('#prjUp_contract_period').val() === "NO ACCESS" ? project[0].contract_period.value : $('#prjUp_contract_period').val();
						let start_date = $('#prjUp_start_date').val() === "NO ACCESS" ? project[0].start_date.value : $('#prjUp_start_date').val();
						let end_date = $('#prjUp_end_date').val() === "NO ACCESS" ? project[0].end_date.value : $('#prjUp_end_date').val();
						let design_consultant_name = $('#prjUp_design_consultant_name').val() === "NO ACCESS" ? project[0].design_consultant_name.value : $('#prjUp_design_consultant_name').val();
						let design_consultant_number = $('#prjUp_design_consultant_number').val() === "NO ACCESS" ? project[0].design_consultant_number.value : $('#prjUp_design_consultant_number').val();
						
						let physical_progress = $('#prjUp_physical_progress').val() === "NO ACCESS" ? project[0].physical_progress.value : $('#prjUp_physical_progress').val();
						let project_status = $('#prjUp_project_status').val() === "NO ACCESS" ? project[0].project_status.value : $('#prjUp_project_status').val();
						let remarks = $('#prjUp_remarks').val() === "NO ACCESS" ? project[0].remarks.value : $('#prjUp_remarks').val();
						let total_cost = $('#prjUp_total_cost').val() === "NO ACCESS" ? project[0].total_cost.value : $('#prjUp_total_cost').val();
						let performance_bank_guarantee = $('#prjUp_performance_bank_guarantee').val() === "NO ACCESS" ? project[0].performance_bank_guarantee.value : $('#prjUp_performance_bank_guarantee').val();
						let performance_bank_date = $('#prjUp_performance_bank_date').val() === "NO ACCESS" ? project[0].performance_bank_date.value : $('#prjUp_performance_bank_date').val();
						let financial_progress =$('#prjUp_financial_progress').val() === "NO ACCESS" ? project[0].financial_progress.value : $('#prjUp_financial_progress').val();
							
						let work_order_no = $('#prjUp_work_order_no').val() === "NO ACCESS" ? project[0].work_order_no.value : $('#prjUp_work_order_no').val();
						let pmc_name = $('#prjUp_pmc_name').val() === "NO ACCESS" ? project[0].pmc_name.value : $('#prjUp_pmc_name').val();
						let pmc_contact_number = $('#prjUp_contact_number').val() === "NO ACCESS" ? project[0].pmc_contact_number.value : $('#prjUp_contact_number').val();
						let department_id = $('#prjUp_department_id').val() === "NO ACCESS" ? project[0].department_id.value : $('#prjUp_department_id').val();
							
						let expected_completion_date = $("#prjUp_expected_completion_date").val() === "NO ACCESS" ? project[0].expected_completion_date.value : $('#prjUp_expected_completion_date').val();
						let expected_start_date = $("#prjUp_expected_start_date").val() === "NO ACCESS" ? project[0].expected_start_date.value : $('#prjUp_expected_start_date').val();
						
						let prjUp_upFiles = $('#prjUp_images')[0].files, images = "";
						let inValidFile = window.depUtlityController.isValidFiles($('#prjUp_images')[0].files,1);
						
						if(inValidFile){
							$('#prjUp_images')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						} else{
							let files = $("#prjUp_up_imageList > li");
							for(let i=0;i<files.length;i++){
								images += $("#"+files[i].id).attr("value") + (i < (files.length - 1) ? "," : "");
							}
						}
						
						let prjUp_upDocs = $('#prjUp_documents')[0].files, documents = "";
						let inValidDoc = window.depUtlityController.isValidFiles($('#prjUp_documents')[0].files,3);
						
						if(inValidDoc){
							$('#prjUp_documents')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only pdf or doc files");
							return false;
						}else{
							let files = $("#prjUp_up_docList > li");
							for(let i=0;i<files.length;i++){
								documents += $("#"+files[i].id).attr("value") + (i < (files.length - 1) ? "," : "");
							}
						}
						
						var validator1 = $("#form_updateProject").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null || latitude === ""){
							errorObj1.prjUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null || longitude === ""){
							errorObj1.prjUp_longitude = "Please enter Longitude";
						}
						if(!project_name || project_name === null || project_name === ""){
							errorObj1.prjUp_project_name = "Please enter Project Name";
						}
						if(!start_date || start_date === null || start_date === ""){
							errorObj1.prjUp_start_date = "Please select Start date";
						}
						if(!end_date || end_date === null || end_date === ""){
							errorObj1.prjUp_end_date = "Please select End date";
						}
						
						if(!department_id || department_id === null || department_id === "" ){
							$u.notify("warning", "Notification","Please select category!");
							return false;
						}
						
						if(!project_type || project_type === null || project_type === ""){
							$u.notify("warning", "Notification","Please select project type!");
							return false;
						}
						
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator1.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						if(contractor_number !== null && contractor_number !== "" && /^\d*$/.test(contractor_number) === false){
							errorObj1.prjUp_contractor_number = "Please enter numeric value";
							validator1.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please enter numeric value for Contractor Number!");
							return false;
						}
						
						if(contractor_email !== null && contractor_email !== "" && /^\w[\.\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(contractor_email) === false){
							errorObj1.prjUp_contractor_email = "Please Enter Valid Email Id";
							validator1.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please enter valid value for Contractor Email Id!");
							return false;
						}
						
						if(design_consultant_number !== null && design_consultant_number !== "" && /^\d*$/.test(design_consultant_number) === false){
							errorObj1.prjUp_design_consultant_number = "Please enter numeric value";
							validator1.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please enter numeric value for Design Consultant Contact Number!");
							return false;
						}
						
//						ASSIGN USERS
//						let userList = $('#projectUpdateUserList li input[type=checkbox]');
//						let users = [];
//						userList.each(function(e) {
//							let id = $(this).attr('id');
//							let is_checked = $("#"+id).is(':checked');
//							if(is_checked){
//								users.push({user_id: $("#"+id).val()});
//							}
//						});
						let users = [{user_id: $("#projectUpdateUserList option:selected").val()}];
						
						let obj = {project_id: project_id, project_name: project_name, location_name: location_name, 
								latitude: latitude,longitude: longitude, district: district, project_type: project_type,
								ward_no: ward_no, ward_name: ward_name, zone_no: zone_no, zone_name: zone_name,
								contractor_name: contractor_name, contractor_number: contractor_number, contractor_email: contractor_email,
								contractor_agency: contractor_agency, work_order_period: work_order_period, 
								contract_period: contract_period,start_date: formatDate(start_date), end_date: formatDate(end_date), 
								design_consultant_name: design_consultant_name, design_consultant_number: design_consultant_number, 
								physical_progress: physical_progress,project_status: project_status, remarks: remarks, 
								total_cost: total_cost,performance_bank_guarantee: performance_bank_guarantee, 
								performance_bank_date: formatDate(performance_bank_date),financial_progress: financial_progress, 
								work_order_no: work_order_no, pmc_name: pmc_name, images: images, documents: documents,
								pmc_contact_number: pmc_contact_number, department_id: department_id, users: users,
								expected_completion_date: formatDate(expected_completion_date), expected_start_date: formatDate(expected_start_date)};

						window.depProjectMonitoringController.addOrUpdateProject(obj, prjUp_upFiles, prjUp_upDocs);
						
						
						
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_addPermissions"]')
	.validate(
			{
				rules : {
					
				},
				messages : {
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let userList = $('#permissionUserList li input[type=checkbox]');
						let users = [];
						userList.each(function(e) {
							let id = $(this).attr('id');
							let is_checked = $("#"+id).is(':checked');
							if(is_checked){
								users.push({user_id: $("#"+id).val()});
							}
						});
						
						let field_permissions = [];
						let permissionList = $('#permission_access tr');
						permissionList.each(function(e) {
							let id = $(this).attr('id');
							if(!id.includes("header")){
								let trObj = $("#"+id+" input[type=checkbox]");
								let permission_id = id.substr(id.lastIndexOf("_")+1);
								let permissionObj = {permission_id: permission_id};
								trObj.each(function(t){
									let is_visible = false, is_editable = false;
									let tid = $(this).attr('id');
									if(tid.includes("view")){
										is_visible = $("#"+tid).is(':checked');
										permissionObj.is_visible = is_visible;
										if(!is_visible){
											permissionObj.is_editable = false;
										}
									}else{
										if($("#view_permission_"+permission_id).is(':checked')){
											is_editable = $("#"+tid).is(':checked');
											if(is_editable){
												permissionObj.is_visible = true;
											}
											permissionObj.is_editable = is_editable;
										}
									}
								});
								field_permissions.push(permissionObj);
							}
							
						});
						
						if(users.length <= 0){
							$u.notify("warning", "", "Please select at least one user!");
							return false;
						}
						
						if(field_permissions.length <= 0){
							$u.notify("warning", "", "Please select at least one permission!");
							return false;
						}
						let project_id = $('#permission_projectId').val();
						let obj = {permission_mapping:[{project_id: project_id, users: users, field_permissions: field_permissions}]};
						
						window.depProjectMonitoringController.mapProjectFieldPermission(obj);
					
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_sendIntimation"]')
	.validate(
			{
				rules : {
					project_intimation_remarks: "required"
				},
				messages : {
					project_intimation_remarks: {
						required : "Please Enter Intimation Remarks"
					},
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let project_name = $('#intimation_project_name').text();
						let remarks = $('#project_intimation_remarks').val();
						
						let obj = {project_name: project_name, remarks: remarks, 
								users: window.depProjectMonitoringController.projectIntimationUsers};
						
						window.depProjectMonitoringController.sendProjectIntimation(obj);
					
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
});



/**
 * click event of get report
 */
$('form[id="form_report_data"]')
.validate(
		{
			rules : {},
			messages : {},
			submitHandler : function(form, e) {
				e.preventDefault();
				try {
					let cat_value = $("#report_data_category").val();
					if(cat_value == "" || cat_value == null || cat_value == undefined){
						$u.notify("info", "Notification","Please select department");
						return;
					}
					localStorage.setItem("report_id",cat_value);
					let jsp_page = "reports.jsp";
					window.location = window.location.origin
                    + window.iscdl.appData.webURLPrefix+jsp_page; 
				} catch (e) {
					 $(".loader").fadeOut();
					 $u.notify("error", "Error","Something Happend Wrong");
				}
			}
});


/**
 * click events
 */

/*$("#report_popup").click(
		function() {

			let department_id = localStorage.getItem('department_id');
			if (department_id != "1") {
				let jsp_page = "reports.jsp";

				window.location = window.location.origin
						+ window.iscdl.appData.webURLPrefix + jsp_page;
			}
});*/


/**
 * checking for module permission
 */
$("ul[id*=leftPanel] li").click(function () {
	let val = $(this).attr('title');
	window.depUtlityController.setPageAccessAccordingToModule(val);
});

$("#flip").click(function(){
    $("#panel").slideToggle("slow");
  });

$("#flip1").click(function(){
    $("#panel1").slideToggle("slow");
  });

$("#flip2").click(function(){
    $("#panel2").slideToggle("slow");
  });

/**
 * modal close button click event 
 */
$("#imageModalCloseBtn").click(function(){
	$("#milestoneImg").empty();
	$("#milestoneImageModal").hide();
});



/**
 * Image choose change event
 */
$("#mstUp_images").change(function () {
    var filenames = '';
     for (var i = 0; i < this.files.length; i++) {
        filenames += '<li value="'+this.files[i].name+'">' + this.files[i].name +'<i class="fa fa-times removeList m-2" aria-hidden="true"></i>'+ '</li>';
    }
    
     if($(".filename").has("ul").length > 0){
    	 $(".imgul").append(filenames);
     }else{
    	 $(".filename").html('<ul class="imgul">' + filenames + '</ul>');
     }
    
     $(".removeList").click(function(){
    	 $(this).parent('li').remove();
     });
});
/**
 * document choose change event
 */
$("#mstUp_documents").change(function () {
    var filenames = '';
     for (var i = 0; i < this.files.length; i++) {
        filenames += '<li value="'+this.files[i].name+'">' + this.files[i].name +'<i class="fa fa-times removeList m-2" aria-hidden="true"></i>'+ '</li>';
    }
     
     if($(".docname").has("ul").length > 0){
    	 $(".docname").append('<ul>' + filenames + '</ul>');
     }else{
    	 $(".docname").html('<ul>' + filenames + '</ul>');
     }
    
	  $(".removeList").click(function(){
		  $(this).parent('li').remove();
	  });
});

function resetForm(formId){
	$('#'+formId).trigger('reset');
	window.depUtlityController.removeError(formId);
	window.monitoringMapController.modal_flag = "";
}

$("#add_project_btn").click(function(){
	window.monitoringMapController.modal_flag = "ADD";
});

$("#project_selected_latitude").click(function(){
	window.monitoringMapController.getProjectMonitorMap();
});

$("#project_selected_longitude").click(function(){
	window.monitoringMapController.getProjectMonitorMap();
});

$("#project_selected_update_longitude").click(function(){
	window.monitoringMapController.getProjectMonitorMap();
});

$("#project_selected_update_latitude").click(function(){
	window.monitoringMapController.getProjectMonitorMap();
});

$("#projectUserList").change(function(){
	let user_id = $("#projectUserList option:selected").val();
	let user = window.depProjectMonitoringController.projectAllottedToUserList.filter(function(u){
		if(parseInt(user_id) === u.user_id){
			return u;
		}
	});
	if(user.length > 0 ){
		$("#prj_user_name").val(user[0].name);
		$("#prj_user_contact_no").val(user[0].contact_no);
		$("#prj_user_email").val(user[0].email_id);
	}
});

$("#projectUpdateUserList").change(function(){
	let user_id = $("#projectUpdateUserList option:selected").val();
	let user = window.depProjectMonitoringController.projectAllottedToUserList.filter(function(u){
		if(parseInt(user_id) === u.user_id){
			return u;
		}
	});
	if(user.length > 0 ){
		$("#prjUp_user_name").val(user[0].name);
		$("#prjUp_user_contact_no").val(user[0].contact_no);
		$("#prjUp_user_email").val(user[0].email_id);
	}
});

$("#project_intimation_close").click(function(){
	document.getElementById('intimation_project_name').innerHTML = "";
	$("#project_intimation_remarks").val("");
	window.depProjectMonitoringController.projectIntimationUsers = [];
});

function formatDate(inputDate){
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

function getInputDate(dateObj){
	var obj = {is_visible: dateObj.is_visible, is_editable: dateObj.is_editable};
	
	if(dateObj.value === undefined || dateObj.value === null || dateObj.value === "") {
		obj.value = "";
	} else {
		var d = new Date(dateObj.value);
		var dateStr = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
		obj.value =  dateStr;
	}
	return obj;
}

$(window).on('load resize', function () {
});	