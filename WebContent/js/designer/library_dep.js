var library_data = "Library";
var current_tab = library_data;
var table;

function getLibraryData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_library_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: library_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_library_table');
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
	if(current_tab === library_data){
		dataTable_id = 'dep_library_table';
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
		if(current_tab === library_data){
			getLibraryData();
		}
 	}else{
 		 return false;
 	}
}

function updateLibrary(event){
	let row = $(event.currentTarget).data('row');

	$('#libraryUp_libraryId').val(row.id);
	
	$('#libraryUp_latitude').val(row.data.latitude);
	$('#libraryUp_longitude').val(row.data.longitude);
	$('#libraryUp_ward').val(row.data.ward_id);
	$('#libraryUp_name').val(row.data.library_name);
	$('#libraryUp_facilities').val(row.data.facilities);
	$('#libraryUp_bookRentalFacility').val(row.data.book_rental_facility);
	$('#libraryUp_address').val(row.data.address);
	$('#libraryUp_typeOfLibraries').val(row.data.type_of_libraries);
	
	$('#libraryUp_subLayerId').val(row.sub_layer_id);
	
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
							" data-toggle='modal' data-target='#dep_updateLibrary_modal' " +
							" onclick='updateLibrary(event)'> " +
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
	window.depUtlityController.getWardList('library_ward');
	window.depUtlityController.getWardList('libraryUp_ward');
	
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'dep_library_table');
	
	
	$('form[id="form_addLibrary"]')
	.validate(
			{
				rules : {
					library_latitude : "required",
					library_longitude : "required",
					library_name : "required",
					library_address : "required",
					library_geoTaggedPhoto : "required"
				
				},
				messages : {

					library_latitude : {
						required : "Please Enter Latitude"
					},
					library_longitude : {
						required : "Please Enter Longitude"
					},
					library_name : {
						required : "Please Enter Library Name"
					},

					library_address : {
						required : "Please Enter Library Address"
					},
					library_geoTaggedPhoto  : {
						required : "Please Choose File"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let latitude = $('#library_latitude').val();
						let longitude = $('#library_longitude').val();
						let ward_id = $('#library_ward').val();
						let library_name = $('#library_name').val();
						let facilities = $('#library_facilities').val();
						let book_rental_facility = $('#library_bookRentalFacility').val();
						let address = $('#library_address').val();
						let type_of_libraries = $('#library_typeOfLibraries').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === 'Library'){
								return e;
							}
						});
						
						let data = {latitude:latitude,longitude:longitude
								,ward_id:ward_id,library_name:library_name
								,facilities:facilities,book_rental_facility:book_rental_facility
								,address:address,type_of_libraries:type_of_libraries};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#library_geo_tagged_photo')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles(files,1);
						//let inValidFile = window.depUtlityController.isValidFiles($('#library_geo_tagged_photo')[0].files,1);
						if(inValidFile){
							$('#library_geo_tagged_photo')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						var validator = $("#form_addLibrary").validate();
						let errorObj1 = {};
						if(!latitude || latitude === null){
							errorObj1.library_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj1.library_longitude = "Please enter Longitude";
						}
						if(!library_name || library_name === null || library_name === ""){
							errorObj1.library_name = "Please enter Library Name";
						}
						if(!address || address === null || address === ""){
							errorObj1.library_address = "Please enter Library Address";
						}
						if(!files){
							errorObj1.library_geoTaggedPhoto = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
							validator.showErrors(errorObj1);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						getLibraryData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	$('form[id="form_updateLibrary"]')
	.validate(
			{
				rules : {
					libraryUp_latitude : "required",
					libraryUp_longitude : "required",
					libraryUp_name : "required",
					libraryUp_address : "required",
					libraryUp_geoTaggedPhoto : "required"
				
				},
				messages : {

					libraryUp_latitude : {
						required : "Please Enter Latitude"
					},
					libraryUp_longitude : {
						required : "Please Enter Longitude"
					},
					libraryUp_name : {
						required : "Please Enter Library Name"
					},

					libraryUp_address : {
						required : "Please Enter Library Address"
					},
					libraryUp_geoTaggedPhoto  : {
						required : "Please Choose File"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let layer_id = $('#libraryUp_libraryId').val();
						
						let latitude = $('#libraryUp_latitude').val();
						let longitude = $('#libraryUp_longitude').val();
						let ward_id = $('#libraryUp_ward').val();
						let library_name = $('#libraryUp_name').val();
						let facilities = $('#libraryUp_facilities').val();
						let book_rental_facility = $('#libraryUp_bookRentalFacility').val();
						let address = $('#libraryUp_address').val();
						let type_of_libraries = $('#libraryUp_typeOfLibraries').val();
						
						let sub_layer_id = $('#libraryUp_subLayerId').val();
						
						let data = {latitude:latitude,longitude:longitude
								,ward_id:ward_id,library_name:library_name
								,facilities:facilities,book_rental_facility:book_rental_facility
								,address:address,type_of_libraries:type_of_libraries};
						
		
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#libraryUp_geoTaggedPhoto')[0].files;
						//let inValidFile = window.depUtlityController.isValidFiles($('#libraryUp_geoTaggedPhoto')[0].files,1);
						let inValidFile = window.depUtlityController.isValidFiles(files,1);
						if(inValidFile){
							$('#libraryUp_geoTaggedPhoto')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}


						var validator = $("#form_updateLibrary").validate();
												let errorObj1 = {};
												if(!latitude || latitude === null){
													errorObj1.libraryUp_latitude = "Please enter Latitude";
												}
												if(!longitude || longitude === null){
													errorObj1.libraryUp_longitude = "Please enter Longitude";
												}
												if(!library_name || library_name === null || library_name === ""){
													errorObj1.libraryUp_name = "Please enter Library Name";
												}
												if(!address || address === null || address === ""){
													errorObj1.libraryUp_address = "Please enter Library Address";
												}
												if(!files){
													errorObj1.libraryUp_geoTaggedPhoto = "Please choose file";
												}
												if(!$.isEmptyObject(errorObj1) && errorObj1 != null){
													validator.showErrors(errorObj1);
													$u.notify("warning", "Notification","Please fill required fields!");
													return false;
												}
						window.depUtlityController.addData(obj, files,'geo_tagged_photo');
						getLibraryData();
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