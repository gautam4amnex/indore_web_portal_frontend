var policePosts_data = "Police Posts";
var current_tab = policePosts_data;
var table;

function getPolicePostsData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_policePosts_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: policePosts_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_policePosts_table');
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
	if(current_tab === policePosts_data){
		dataTable_id = 'dep_policePosts_table';
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
		if(current_tab === policePosts_data){
			getPolicePostsData();
		}
 	}else{
 		 return false;
 	}
}

function updatePolicePosts(event){
	let row = $(event.currentTarget).data('row');

	$('#policePostUp_policePostId').val(row.id);

	$('#policePostUp_name').val(row.data.police_post_name);
	$('#policePostUp_latitude').val(row.data.latitude);
	$('#policePostUp_longitude').val(row.data.longitude);
	$('#policePostUp_address').val(row.data.address);
	$('#policePostUp_ward').val(row.data.ward_id);

	$('#policePostUp_subLayerId').val(row.sub_layer_id);
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
							" data-toggle='modal' data-target='#dep_updatepolicePostUp_modal' " +
							" onclick='updatePolicePosts(event)'> " +
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
	window.depUtlityController.getWardList('policePost_ward');
	window.depUtlityController.getWardList('policePostUp_ward');
	
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_policePosts_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
	
	
	$('form[id="form_addPolicePost"]')
	.validate(
			{
				rules : {
					policePost_latitude : "required",
					policePost_longitude : "required",
					policePost_name : "required",
					policePost_address : "required",
					policePost_geoTaggedPhoto : "required"
				},
				messages : {

					policePost_latitude : {
						required : "Please Enter Latitude"
					},
					policePost_longitude : {
						required : "Please Enter Longitude"
					},
					policePost_name : {
						required : "Please Enter Police Post Name"
					},
					policePost_address : {
						required : "Please Enter Police Post Address"
					},
					policePost_geoTaggedPhoto  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let police_post_name = $('#policePost_name').val();
						let latitude = $('#policePost_latitude').val();
						let longitude = $('#policePost_longitude').val();
						let address = $('#policePost_address').val();
						let ward_id = $('#policePost_ward').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === policePosts_data){
								return e;
							}
						});
						
						let data = {police_post_name:police_post_name
								,latitude:latitude,longitude:longitude
								,address:address,ward_id:ward_id};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#policePost_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#policePost_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#policePost_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_addPolicePost").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.policePost_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.policePost_longitude = "Please enter Longitude";
						}
						if(!police_post_name || police_post_name === null || police_post_name === ""){
							errorObj.policePost_name = "Please enter Polic Post Name";
						}
						if(!address || address === null || address === ""){
							errorObj.policePost_address = "Please enter Polic Post Address";
						}
						if(!files){
							errorObj.policePost_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}		
						window.depUtlityController.addData(obj, files);
						getPolicePostsData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updatePolicePost"]')
	.validate(
			{
				rules : {
					policePostUp_latitude : "required",
					policePostUp_longitude : "required",
					policePostUp_name : "required",
					policePostUp_address : "required",
					policePostUp_geoTaggedPhoto : "required"
				},
				messages : {

					policePostUp_latitude : {
						required : "Please Enter Latitude"
					},
					policePostUp_longitude : {
						required : "Please Enter Longitude"
					},
					policePostUp_name : {
						required : "Please Enter Police Post Name"
					},
					policePostUp_address : {
						required : "Please Enter Police Post Address"
					},
					policePostUp_geoTaggedPhoto  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = $('#policePostUp_policePostId').val();
						
						let police_post_name = $('#policePostUp_name').val();
						let latitude = $('#policePostUp_latitude').val();
						let longitude = $('#policePostUp_longitude').val();
						let address = $('#policePostUp_address').val();
						let ward_id = $('#policePostUp_ward').val();
						
						let sub_layer_id = $('#policePostUp_subLayerId').val();
						
						let data = {police_post_name:police_post_name
								,latitude:latitude,longitude:longitude
								,address:address,ward_id:ward_id};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#policePostUp_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#policePostUp_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#policePostUp_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_addPolicePost").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.policePostUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.policePostUp_longitude = "Please enter Longitude";
						}
						if(!police_post_name || police_post_name === null || police_post_name === ""){
							errorObj.policePostUp_name = "Please enter Polic Post Name";
						}
						if(!address || address === null || address === ""){
							errorObj.policePostUp_address = "Please enter Polic Post Address";
						}
						if(!files){
							errorObj.policePostUp_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}		
						window.depUtlityController.addData(obj, files);
						getPolicePostsData();
						
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