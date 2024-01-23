var pdsc_data = "Public Distribution System Centers";
var current_tab = pdsc_data;
var table, layer_id = undefined;

function getPsdcata(){
	if(table != undefined){
		table.destroy();
	}
	$('#pdsc_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: pdsc_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'pdsc_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
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
	window.depUtlityController.getWardList('pdsc_ward');
	
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result,'pdsc_table');
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
	
	$('form[id="form_public_sc"]')
	.validate(
			{
				rules : {
					latitude: "required",
					longitude: "required",
					pds_name: "required",
					address: "required",
					geo_tagged_photo: "required"
				},
				messages : {
					latitude : {
						required : "Please Enter Latitude"
					},
					longitude : {
						required : "Please Enter Longitude"
					},
					pds_name : {
						required : "Please Enter Name"
					},
					address : {
						required : "Please Enter Address"
					},
					geo_tagged_photo  : {
						required : "Please Choose File"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#pdsc_ward').val(); 
						let latitude = $('#pdsc_latitude').val();
						let longitude = $('#pdsc_longitude').val();
						let pds_name =  $('#pdsc_name').val();
						let address =  $('#pdsc_address').val();
						let type_of_services =  $('#pdsc_type').val();
						let type_of_subsidary_items =  $('#pdsc_si_type').val();
					
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === pdsc_data){
								return e;
							}
						});

						let data = {ward_id:ward_id,
							 	latitude:latitude,
							 	longitude:longitude,
							 	pds_name:pds_name,
							 	address:address,
							 	type_of_services:type_of_services,
							 	type_of_subsidary_items:type_of_subsidary_items
							 	};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						if(layer_id){
							obj.layer_id = layer_id;
						}
						
						let files = $('#pdsc_geo_tagged_photo')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#pdsc_geo_tagged_photo')[0].files,1);
						
						if(inValidFile){
							$('#pdsc_geo_tagged_photo')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_public_sc").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.longitude = "Please enter Longitude";
						}
						if(!pds_name || pds_name === null || pds_name === ""){
							errorObj.pds_name = "Please enter Name";
						}
						if(!address || address === null || address === ""){
							errorObj.address = "Please enter Address";
						}
						if(!files){
							errorObj.geo_tagged_photo = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
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
		getPsdcata();
		
 	}else{
 		 return false;
 	}
}

function updateData(event){
	let row = $(event.currentTarget).data('row');
	layer_id = row.id;
	$('#pdsc_subLayerId').val(row.sub_layer_id);
	
	$('#pdsc_ward').val(row.data.ward_id); 
	$('#pdsc_latitude').val(row.data.latitude);
	$('#pdsc_longitude').val(row.data.longitude);
	$('#pdsc_name').val(row.data.pds_name);
	$('#pdsc_address').val(row.data.address);
	$('#pdsc_type').val(row.data.type_of_services);
	$('#pdsc_si_type').val(row.data.type_of_subsidary_items);
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
							
							" data-toggle='modal' data-target='#pdsc_modal' " +
							" onclick='updateData(event)'> "+
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
	dataTable_id = 'pdsc_table';
	
	if(table != undefined){
		table.destroy();
	}
	$('#'+dataTable_id).empty();
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result, dataTable_id);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
});
function resetForm(formId){
	$('#'+formId).trigger('reset');
	window.depUtlityController.removeError(formId);
}
$(window).on('load resize', function () {
});	