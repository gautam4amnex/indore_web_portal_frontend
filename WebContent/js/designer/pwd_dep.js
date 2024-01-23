var flyover_data = "Flyover";
var foorOverBridge_data = "Foot over bridge";
var current_tab = flyover_data;
var table;

function getFlyoverData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_flyover_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: flyover_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_flyover_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
}

function getfoorOverBridgeData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_foorOverBridge_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: foorOverBridge_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_foorOverBridge_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
}

$(".tab-data").click(function(){
	
	let text = $(this).html();
	//let text = $('.justify-content-center .nav-item > a.active')[0].innerHTML;
	
	if(text == "" || text == undefined || text == null){
		return;
	}
	current_tab = text;
	let department_id = localStorage.getItem('department_id');
	
	if(department_id == null || department_id == undefined || department_id == ""){
		$u.notify('error', 'Notification','Department Id was null', '');
		return;
	}
	
	let dataTable_id;
	if(current_tab === flyover_data){
		dataTable_id = 'dep_flyover_table';
	}else{
		dataTable_id = 'dep_foorOverBridge_table';
	}
	if(table != undefined){
		table.destroy();
	}
	$('#'+dataTable_id).empty();
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result, dataTable_id);
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
});

function createDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
        columns: options.columns,
		data : options.data,
		"searching": false,
		"autoWidth" : true,
		dom: 'Blfrtip',
		responsive: true,
		buttons: [
			
			{
				extend: 'csvHtml5',	
				text: 'Export to Excel',
               	className: 'btn-indore-table ete' ,
               	filename: current_tab,
               	exportOptions: {
                    columns: 'th:not(:last-child)'
                }
			},
			
        ],
		scrollY: " calc(100vh - 380px) ",
        scrollX: true,
        //scrollCollapse: true,
		columnDefs: options.columnDefs
    } );
}


function approveRejectData(event, value){
	if (confirm("Are you sure to update the status ?")) {
		let row = $(event.currentTarget).data('row');
		let obj = {id: row.id, is_approved: value};
		window.depUtlityController.approveRejectLayerData(obj);
		if(current_tab === flyover_data){
			getFlyoverData();
		}else{
			getfoorOverBridgeData();
		}
 	}else{
 		 return false;
 	}
}

function updateFlyover(event){
	let row = $(event.currentTarget).data('row');
	
	$('#flyoverUp_flyoverId').val(row.id);
	
	$('#flyoverUp_ward').val(row.data.ward_no);
	$('#flyoverUp_flyoverName').val(row.data.flyover_name);
	$('#flyoverUp_type').val(row.data.flyover_type);
	$('#flyoverUp_yearOfConstruction').val(row.data.year_of_construction);
	$('#flyoverUp_width').val(row.data.width);
	$('#flyoverUp_approachLength').val(row.data.approach_length);
	$('#flyoverUp_heightDepth').val(row.data.height_depth);
	$('#flyoverUp_resurfaceYear').val(row.data.resurface_year);
	$('#flyoverUp_maintenanceCycle').val(row.data.maintenance_cycle);
	$('#flyoverUp_lane').val(row.data.lane);
	$('#flyoverUp_existingGate').val(row.data.existing_gate);
	$('#flyoverUp_existingTopSurfaceOfBridge').val(row.data.existing_top_surface_of_bridge);
	$('#flyoverUp_lcNo').val(row.data.lc_no);
	$('#flyoverUp_rdId').val(row.data.rd_id);
	$('#flyoverUp_divider').val(row.data.divider);
	$('#flyoverUp_footpath').val(row.data.footpath);
	$('#flyoverUp_footpathWidth').val(row.data.footpath_width_m);
	$('#flyoverUp_constructionYear').val(row.data.construction_year);
	$('#flyoverUp_maintenanceBy').val(row.data.maintanence_by);
	$('#flyoverUp_parking').val(row.data.parking);
	$('#flyoverUp_span').val(row.data.span);
	$('#flyoverUp_foundation').val(row.data.foundation);
	$('#flyoverUp_latitude').val(row.data.latitude);
	$('#flyoverUp_longitude').val(row.data.longitude);
	
	$('#flyoverUp_subLayerId').val(row.sub_layer_id);
	
}


function updateUphc(event){
	let row = $(event.currentTarget).data('row');
	
}


function LoadCurrentReport(result,id) {
	var arr = [];
	for(var i=0;i<result.data.length;i++){
		arr.push(result.data[i].columns.length);
	}
	var max = Math.max(...arr);
	var index = arr.indexOf(max);
	table = createDatatable({
		id : id,
		columns : result.data[index].columns,
		data : result.data,
		columnDefs : [
				{
					"targets": result.data[index].columns.length,
					"data" : "is_approved",
					"title" : "Status",
					"render" : function(data, type, row,meta) {
						if(data === null){
							return '<a href="#" class="status-pending">Pending</a>';
						}else if(data === true){
							return '<a href="#" class="status-active">Approved</a>';
						}else if(data === false){
							return '<a href="#" class="status-deactive">Rejected</a>';
						}
						
					}
				},
				{
					"targets": result.data[index].columns.length + 1,
					"data" : "id",
					"title" : "Action",
					"render" : function(data, type, row, meta) {
						 
						if(row.is_approved === null) {
							return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"'" +
							(current_tab === flyover_data ?
							" data-toggle='modal' data-target='#dep_updateFlyover_modal' " +
							" onclick='updateFlyover(event)'> " 
							:" data-toggle='modal' data-target='#dep_updateuphcUp_modal' " +
							" onclick='updateUphc(event)'> " )+
							"<span class='fa fa-edit' aria-hidden='true'></span> </button>"+
							" <button name='approve' class='btn action-btn' data-row='"+JSON.stringify(row) + "'" +
							" onclick='approveRejectData(event,true)'>"+
							" <span class='fa fa-check' aria-hidden='true'></span> </button>" +
							" <button name='reject' class='btn action-btn' data-row='"+JSON.stringify(row) + "'" +
							" onclick='approveRejectData(event,false)'>"+
							" <span class='fa fa-remove' aria-hidden='true'></span> </button>";
						}
						else{
							return "NA";
						}
					}
					
				}
			]
			
	})
	

}


$(document).ready(function(){	
	
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
  $(".datepicker-dept").datepicker({ 
        autoclose: true, 
        todayHighlight: true
  }).datepicker('update', new Date());	
  
  
	/*Multi step start*/
	var current_fs, next_fs, previous_fs; //fieldsets
	var opacity;

	$(".next").click(function(){

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		//Add Class Active
		$("#progressbar li").eq($("fieldset").index(current_fs)).addClass("active");
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("activemain");

		//show the next fieldset
		next_fs.show();
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
		step: function(now) {
		// for making fielset appear animation
		opacity = 1 - now;

		current_fs.css({
		'display': 'none',
		'position': 'relative'
		});
		next_fs.css({'opacity': opacity});
		},
		duration: 600
		});
	});

	$(".previous").click(function(){

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//Remove class active
	$("#progressbar li").eq($("fieldset").index(previous_fs)).removeClass("active");
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("activemain");
	
	//show the previous fieldset
	previous_fs.show();

	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
	step: function(now) {
	// for making fielset appear animation
	opacity = 1 - now;

	current_fs.css({
	'display': 'none',
	'position': 'relative'
	});
	previous_fs.css({'opacity': opacity});
	},
	duration: 600
	});
	});

	$('.radio-group .radio').click(function(){
	$(this).parent().find('.radio').removeClass('selected');
	$(this).addClass('selected');
	});

	$(".submit").click(function(){
	return false;
	})
	
	/*$("#finalSubmit").click(function(){
		let value = $("#EmailIDMain").val();
		let value1 = $("#EmailIDMain1").val();
		let value2 = $("#EmailIDMain2").val();
		alert("Form Value" + value + '1' + value1 + 'gdg'  + value2);
	})*/
	


	/*Multi step end*/
	
});
	
$(window).on("load", function(){

	$(".loader").fadeOut(1000);
	window.depUtlityController.headerDrop();
	
	window.depUtlityController.getLayers('add_data_category');
	
	window.depUtlityController.getWardList('flyover_ward');
	window.depUtlityController.getWardList('flyoverUp_ward');
	
	window.depUtlityController.getWardList('footoverbridge_ward');
	window.depUtlityController.getWardList('footoverbridgeUp_ward');
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_flyover_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
	$('form[id="form_addFlyover"]')
	.validate(
			{
				
					rules : {
						flyover_latitude : "required",
						flyover_longitude : "required",
						flyover_flyoverName : "required"
					},
					messages : {

						flyover_latitude : {
							required : "Please Enter Latitude"
						},
						flyover_longitude : {
							required : "Please Enter Longitude"
						},
						flyover_flyoverName : {
							required : "Please Enter Flyover Name"
						}					
					},
				
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						
						let ward_no = $('#flyover_ward').val();
						let flyover_name = $('#flyover_flyoverName').val();
						let flyover_type = $('#flyover_type').val();
						let year_of_construction = $('#flyover_yearOfConstruction').val();
						let width = $('#flyover_width').val();
						let approach_length = $('#flyover_approachLength').val();
						let height_depth = $('#flyover_heightDepth').val();
						let resurface_year = $('#flyover_resurfaceYear').val();
						let maintenance_cycle = $('#flyover_maintenanceCycle').val();
						let lane = $('#flyover_lane').val();
						let existing_gate = $('#flyover_existingGate').val();
						let existing_top_surface_of_bridge = $('#flyover_existingTopSurfaceOfBridge').val();
						let lc_no = $('#flyover_lcNo').val();
						let rd_id = $('#flyover_rdId').val();
						let divider = $('#flyover_divider').val();
						let footpath = $('#flyover_footpath').val();
						let footpath_width_m = $('#flyover_footpathWidth').val();
						let construction_year = $('#flyover_constructionYear').val();
						let maintanence_by = $('#flyover_maintenanceBy').val();
						let parking = $('#flyover_parking').val();
						let span = $('#flyover_span').val();
						let foundation = $('#flyover_foundation').val();
						let latitude = $('#flyover_latitude').val();
						let longitude = $('#flyover_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === flyover_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,flyover_name:flyover_name
								,flyover_type:flyover_type,year_of_construction:year_of_construction
								,width:width,approach_length:approach_length
								,height_depth:height_depth,resurface_year:resurface_year
								,maintenance_cycle:maintenance_cycle,lane:lane
								,existing_gate:existing_gate,existing_top_surface_of_bridge:existing_top_surface_of_bridge
								,lc_no:lc_no,rd_id:rd_id,divider:divider,footpath:footpath
								,footpath_width_m:footpath_width_m,construction_year:construction_year
								,maintanence_by:maintanence_by,parking:parking,span:span,foundation:foundation
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

//						let files = $('#library_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#library_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#library_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_addFlyover").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.flyover_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.flyover_longitude = "Please enter Longitude";
						}
						if(!flyover_name || flyover_name === null || flyover_name === ""){
							errorObj.flyover_flyoverName = "Please enter flyover Name";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						
						window.depUtlityController.addData(obj);
						getFlyoverData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateFlyover"]')
	.validate(
			{
				rules : {
					flyoverUp_latitude : "required",
					flyoverUp_longitude : "required",
					flyoverUp_flyoverName : "required"
				},
				messages : {

					flyoverUp_latitude : {
						required : "Please Enter Latitude"
					},
					flyoverUp_longitude : {
						required : "Please Enter Longitude"
					},
					flyoverUp_flyoverName : {
						required : "Please Enter Flyover Name"
					}					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = $('#flyoverUp_flyoverId').val();
						
						let ward_no = $('#flyoverUp_ward').val();
						let flyover_name = $('#flyoverUp_flyoverName').val();
						let flyover_type = $('#flyoverUp_type').val();
						let year_of_construction = $('#flyoverUp_yearOfConstruction').val();
						let width = $('#flyoverUp_width').val();
						let approach_length = $('#flyoverUp_approachLength').val();
						let height_depth = $('#flyoverUp_heightDepth').val();
						let resurface_year = $('#flyoverUp_resurfaceYear').val();
						let maintenance_cycle = $('#flyoverUp_maintenanceCycle').val();
						let lane = $('#flyoverUp_lane').val();
						let existing_gate = $('#flyoverUp_existingGate').val();
						let existing_top_surface_of_bridge = $('#flyoverUp_existingTopSurfaceOfBridge').val();
						let lc_no = $('#flyoverUp_lcNo').val();
						let rd_id = $('#flyoverUp_rdId').val();
						let divider = $('#flyoverUp_divider').val();
						let footpath = $('#flyoverUp_footpath').val();
						let footpath_width_m = $('#flyoverUp_footpathWidth').val();
						let construction_year = $('#flyoverUp_constructionYear').val();
						let maintanence_by = $('#flyoverUp_maintenanceBy').val();
						let parking = $('#flyoverUp_parking').val();
						let span = $('#flyoverUp_span').val();
						let foundation = $('#flyoverUp_foundation').val();
						let latitude = $('#flyoverUp_latitude').val();
						let longitude = $('#flyoverUp_longitude').val();
						
						let sub_layer_id = $('#flyoverUp_subLayerId').val();
						
						let data = {ward_no:ward_no,flyover_name:flyover_name
								,flyover_type:flyover_type,year_of_construction:year_of_construction
								,width:width,approach_length:approach_length
								,height_depth:height_depth,resurface_year:resurface_year
								,maintenance_cycle:maintenance_cycle,lane:lane
								,existing_gate:existing_gate,existing_top_surface_of_bridge:existing_top_surface_of_bridge
								,lc_no:lc_no,rd_id:rd_id,divider:divider,footpath:footpath
								,footpath_width_m:footpath_width_m,construction_year:construction_year
								,maintanence_by:maintanence_by,parking:parking,span:span,foundation:foundation
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id: layer_id ,data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#library_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#library_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#library_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						var validator = $("#form_updateFlyover").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.flyoverUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.flyoverUp_longitude = "Please enter Longitude";
						}
						if(!flyover_name || flyover_name === null || flyover_name === ""){
							errorObj.flyoverUp_flyoverName = "Please enter flyover Name";
						}
						
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj);
						getFlyoverData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
});

function resetForm(formId){
	$('#'+formId).trigger('reset');
	window.depUtlityController.removeError(formId);
}

$(window).on('load resize', function () {
});	