var police_chowki_data = "Police chowki";
var current_tab = police_chowki_data;
var table;


function getPoliceChowkiData(){
	if(table != undefined){
		table.destroy();
	}
	$('#dep_police_chowki_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: police_chowki_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_police_chowki_table');
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
	if(current_tab === police_chowki_data){
		dataTable_id = 'dep_police_chowki_table';
	}else{
		dataTable_id = 'dep_police_chowki_table';
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
		if(current_tab === police_chowki_data){
			getPoliceChowkiData();
		}
 	}else{
 		 return false;
 	}
}

function updatePoliceChowki(event){
	let row = $(event.currentTarget).data('row');
	
	$('#policeChowkiUp_policeChowkiId').val(row.id);
	
	$('#policeChowkiUp_ward').val(row.data.ward_no);
	$('#policeChowkiUp_name').val(row.data.police_station_name); 
	$('#policeChowkiUp_address').val(row.data.address);
	$('#policeChowkiUp_zonalWisePs').val(row.data.zonal_wise_ps);
	$('#policeChowkiUp_area').val(row.data.police_station_area);
	$('#policeChowkiUp_spArea').val(row.data.s_p_area);
	$('#policeChowkiUp_thanaInchargeName').val(row.data.thana_incharge_name);
	$('#policeChowkiUp_thanaInchargeNo').val(row.data.thana_incharge_no);
	$('#policeChowkiUp_thanaInchargeArea').val(row.data.thana_incharge_area);
	$('#policeChowkiUp_noOfOfficers').val(row.data.no_of_officers);
	$('#policeChowkiUp_noOfCases').val(row.data.no_of_cases);
	$('#policeChowkiUp_cctns').val(row.data.cctns);
	$('#policeChowkiUp_phoneNo').val(row.data.phone_number);
	$('#policeChowkiUp_latitude').val(row.data.latitude);
	$('#policeChowkiUp_longitude').val(row.data.longitude);
	
	$('#policeChowkiUp_subLayerId').val(row.sub_layer_id);
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
							" data-toggle='modal' data-target='#dep_updatePoliceChowki_modal' " +
							" onclick='updatePoliceChowki(event)'> " +
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
	window.depUtlityController.getWardList('policeChowki_ward');
	window.depUtlityController.getWardList('policeChowkiUp_ward');
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	
	if(result.data.length > 0){
		LoadCurrentReport(result,'dep_police_chowki_table');
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
	}else{
		$u.notify('info', 'Notification',
				'Data not available', '');
	}
	
	$('form[id="form_addPoliceChowki"]')
	.validate(
			{
				rules : {
					policeChowki_latitude : "required",
					policeChowki_longitude : "required",
					policeChowki_name : "required",
					policeChowki_address : "required"
				},
				messages : {

					policeChowki_latitude : {
						required : "Please Enter Latitude"
					},
					policeChowki_longitude : {
						required : "Please Enter Longitude"
					},
					policeChowki_name : {
						required : "Please Enter PoliceChowki Name"
					},
					policeChowki_address : {
						required : "Please Enter PoliceChowki Address"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						let ward_no = $('#policeChowki_ward').val();
						let police_station_name = $('#policeChowki_name').val(); 
						let address = $('#policeChowki_address').val();
						let zonal_wise_ps = $('#policeChowki_zonalWisePs').val();
						let police_station_area = $('#policeChowki_area').val();
						let s_p_area = $('#policeChowki_spArea').val();
						let thana_incharge_name = $('#policeChowki_thanaInchargeName').val();
						let thana_incharge_no = $('#policeChowki_thanaInchargeNo').val();
						let thana_incharge_area = $('#policeChowki_thanaInchargeArea').val();
						let no_of_officers = $('#policeChowki_noOfOfficers').val();
						let no_of_cases = $('#policeChowki_noOfCases').val();
						let cctns = $('#policeChowki_cctns').val();
						let phone_number = $('#policeChowki_phoneNo').val();
						let latitude = $('#policeChowki_latitude').val();
						let longitude = $('#policeChowki_longitude').val();
						
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === police_chowki_data){
								return e;
							}
						});
						
						let data = {ward_no:ward_no,police_station_name:police_station_name
								,address:address,zonal_wise_ps:zonal_wise_ps
								,police_station_area:police_station_area,s_p_area:s_p_area
								,thana_incharge_name:thana_incharge_name
								,thana_incharge_no:thana_incharge_no
								,thana_incharge_area:thana_incharge_area
								,no_of_officers:no_of_officers
								,no_of_cases:no_of_cases,cctns:cctns
								,phone_number:phone_number
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						
						var validator = $("#form_addPoliceChowki").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.policeChowki_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.policeChowki_longitude = "Please enter Longitude";
						}
						if(!police_station_name || police_station_name === null || police_station_name === ""){
							errorObj.policeChowki_name = "Please enter PoliceChowki Name";
						}
						if(!address || address === null || address === ""){
							errorObj.policeChowki_address = "Please enter PoliceChowki Address";
						}

						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						
						window.depUtlityController.addData(obj);
						getPoliceChowkiData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
	$('form[id="form_updatePoliceChowki"]')
	.validate(
			{
				rules : {
					policeChowkiUp_latitude : "required",
					policeChowkiUp_longitude : "required",
					policeChowkiUp_name : "required",
					policeChowkiUp_address : "required"
				},
				messages : {

					policeChowkiUp_latitude : {
						required : "Please Enter Latitude"
					},
					policeChowkiUp_longitude : {
						required : "Please Enter Longitude"
					},
					policeChowkiUp_name : {
						required : "Please Enter PoliceChowki Name"
					},
					policeChowkiUp_address : {
						required : "Please Enter PoliceChowki Address"
					}
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = $('#policeChowkiUp_policeChowkiId').val();
						
						let ward_no = $('#policeChowkiUp_ward').val();
						let police_station_name = $('#policeChowkiUp_name').val(); 
						let address = $('#policeChowkiUp_address').val();
						let zonal_wise_ps = $('#policeChowkiUp_zonalWisePs').val();
						let police_station_area = $('#policeChowkiUp_area').val();
						let s_p_area = $('#policeChowkiUp_spArea').val();
						let thana_incharge_name = $('#policeChowkiUp_thanaInchargeName').val();
						let thana_incharge_no = $('#policeChowkiUp_thanaInchargeNo').val();
						let thana_incharge_area = $('#policeChowkiUp_thanaInchargeArea').val();
						let no_of_officers = $('#policeChowkiUp_noOfOfficers').val();
						let no_of_cases = $('#policeChowkiUp_noOfCases').val();
						let cctns = $('#policeChowkiUp_cctns').val();
						let phone_number = $('#policeChowkiUp_phoneNo').val();
						let latitude = $('#policeChowkiUp_latitude').val();
						let longitude = $('#policeChowkiUp_longitude').val();
						
						let sub_layer_id = $('#policeChowkiUp_subLayerId').val();
						
						let data = {ward_no:ward_no,police_station_name:police_station_name
								,address:address,zonal_wise_ps:zonal_wise_ps
								,police_station_area:police_station_area,s_p_area:s_p_area
								,thana_incharge_name:thana_incharge_name
								,thana_incharge_no:thana_incharge_no
								,thana_incharge_area:thana_incharge_area
								,no_of_officers:no_of_officers
								,no_of_cases:no_of_cases,cctns:cctns
								,phone_number:phone_number
								,latitude:latitude,longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

//						let files = $('#policeChowki_geoTaggedPhoto')[0].files;
//						let inValidFile = window.depUtlityController.isValidFiles($('#policeChowki_geoTaggedPhoto')[0].files,1);
//						
//						if(inValidFile){
//							$('#policeChowki_geoTaggedPhoto')[0].value = "";
//							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
//							return false;
//						}
						
						var validator = $("#form_updatePoliceChowki").validate();
						let errorObj = {};
						if(!latitude || latitude === null){
							errorObj.policeChowkiUp_latitude = "Please enter Latitude";
						}
						if(!longitude || longitude === null){
							errorObj.policeChowkiUp_longitude = "Please enter Longitude";
						}
						if(!police_station_name || police_station_name === null || police_station_name === ""){
							errorObj.policeChowkiUp_name = "Please enter PoliceChowki Name";
						}
						if(!address || address === null || address === ""){
							errorObj.policeChowkiUp_address = "Please enter PoliceChowki Address";
						}

						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj);
						getPoliceChowkiData();
						
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