var restaurant_data = "Restaurants";
var current_tab = restaurant_data;
var table;

function getRestaurantData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_restaurant_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: restaurant_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_restaurant_table');
	setTimeout(function(){ 
		$('.dataTables_wrapper').resize();
	}, 500);
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
	if(current_tab === restaurant_data){
		dataTable_id = 'dep_restaurant_table';
	}
	if(table != undefined){
		table.destroy();
	}
	$('#'+dataTable_id).empty();
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result, dataTable_id);
	
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
		if(current_tab === restaurant_data){
			getRestaurantData();
		}
 	}else{
 		 return false;
 	}
}

function updateRestaurant(event){
	let row = $(event.currentTarget).data('row');

	$('#restaurantUp_restaurantId').val(row.id); 
	
	$('#restaurantUp_ward').val(row.data.ward_id);
	$('#restaurantUp_latitude').val(row.data.latitude);
	$('#restaurantUp_longitude').val(row.data.longitude);
	$('#restaurantUp_name').val(row.data.restaurant_name);
	$('#restaurantUp_facilities').val(row.data.facilities);
	$('#restaurantUp_typeOfRestaurant').val(row.data.type_of_restaurant);
	$('#restaurantUp_address').val(row.data.address);
	
	$('#restaurantUp_subLayerId').val(row.sub_layer_id); 
	
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
							" data-toggle='modal' data-target='#dep_updateRestaurant_modal' " +
							" onclick='updateRestaurant(event)'> " +
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
	window.depUtlityController.getWardList('restaurant_ward');
	window.depUtlityController.getWardList('restaurantUp_ward');
	
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	
	let result = JSON.parse(response.responseText);
	
	LoadCurrentReport(result,'dep_restaurant_table');
	
	
	$('form[id="form_addRestaurant"]')
	.validate(
			{
				rules : {
					restaurant_latitude : "required",
					restaurant_longitude : "required",
					restaurant_name : "required",
					restaurant_address : "required",
					restaurant_geoTaggedPhoto : "required"
				},
				messages : {

					restaurant_latitude : {
						required : "Please Enter Latitude"
					},
					restaurant_longitude : {
						required : "Please Enter Longitude"
					},
					restaurant_name : {
						required : "Please Enter Restaurant Name"
					},
					restaurant_address : {
						required : "Please Enter Restaurant Address"
					},
					restaurant_geoTaggedPhoto  : {
						required : "Please Choose File"
					}

				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let ward_id = $('#restaurant_ward').val();
						let latitude = $('#restaurant_latitude').val();
						let longitude = $('#restaurant_longitude').val();
						let restaurant_name = $('#restaurant_name').val();
						let facilities = $('#restaurant_facilities').val();
						let type_of_restaurant = $('#restaurant_typeOfRestaurant').val();
						let address = $('#restaurant_address').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === restaurant_data){
								return e;
							}
						});
						
						let data = {ward_id:ward_id,latitude:latitude,longitude:longitude
								,restaurant_name:restaurant_name,facilities:facilities
								,type_of_restaurant:type_of_restaurant,address:address};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#restaurant_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#restaurant_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#restaurant_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_addRestaurant").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.restaurant_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.restaurant_longitude = "Please enter Longitude";
						}
						if(!restaurant_name || restaurant_name === null || restaurant_name === ""){
							errorObj.restaurant_name = "Please enter restaurant Name";
						}
						if(!address || address === null || address === ""){
							errorObj.restaurant_address = "Please enter restaurant Address";
						}
						if(!files){
							errorObj.restaurant_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getRestaurantData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateRestaurant"]')
	.validate(
			{
				rules : {
					restaurantUp_latitude : "required",
					restaurantUp_longitude : "required",
					restaurantUp_name : "required",
					restaurantUp_address : "required",
					restaurantUp_geoTaggedPhoto : "required"
				},
				messages : {

					restaurantUp_latitude : {
						required : "Please Enter Latitude"
					},
					restaurantUp_longitude : {
						required : "Please Enter Longitude"
					},
					restaurantUp_name : {
						required : "Please Enter Restaurant Name"
					},
					restaurantUp_address : {
						required : "Please Enter Restaurant Address"
					},
					restaurantUp_geoTaggedPhoto  : {
						required : "Please Choose File"
					}

				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = $('#restaurantUp_restaurantId').val(); 
						
						let ward_id = $('#restaurantUp_ward').val();
						let latitude = $('#restaurantUp_latitude').val();
						let longitude = $('#restaurantUp_longitude').val();
						let restaurant_name = $('#restaurantUp_name').val();
						let facilities = $('#restaurantUp_facilities').val();
						let type_of_restaurant = $('#restaurantUp_typeOfRestaurant').val();
						let address = $('#restaurantUp_address').val();
						
						let sub_layer_id = $('#restaurantUp_subLayerId').val(); 
						/*let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === restaurant_data){
								return e;
							}
						});
						*/
						
						let data = {ward_id:ward_id,latitude:latitude,longitude:longitude
								,restaurant_name:restaurant_name,facilities:facilities
								,type_of_restaurant:type_of_restaurant,address:address};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#restaurantUp_geoTaggedPhoto')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#restaurantUp_geoTaggedPhoto')[0].files,1);
						
						if(inValidFile){
							$('#restaurantUp_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_updateRestaurant").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.restaurantUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.restaurantUp_longitude = "Please enter Longitude";
						}
						if(!restaurant_name || restaurant_name === null || restaurant_name === ""){
							errorObj.restaurantUp_name = "Please enter restaurant Name";
						}
						if(!address || address === null || address === ""){
							errorObj.restaurantUp_address = "Please enter restaurant Address";
						}
						if(!files){
							errorObj.restaurantUp_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						
						window.depUtlityController.addData(obj, files);
						getRestaurantData();
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