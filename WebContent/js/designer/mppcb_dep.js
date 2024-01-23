var mppcb_data = "MPPCB";
var current_tab = mppcb_data;
var table;


function getMPPCBData(){
	if(table != undefined){
		table.destroy();
	}
	$('#mppcb_dept_table').empty();
	let tbl_obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: hospital_data};
	let response = window.depUtlityController.getLayerData(tbl_obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'mppcb_dept_table');
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
	if(current_tab === mppcb_data){
		dataTable_id = 'mppcb_dept_table';
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
		if(current_tab === hospital_data){
			getHospitalData();
		}else{
			getUphcData();
		}
 	}else{
 		 return false;
 	}
}


function updateMppcb(event){
	let row = $(event.currentTarget).data('row');
	
	$('#mppcbUp_mppcbId').val(row.id);
	
	$('#mppUp_Latitude').val(row.data.latitude);
	$('#mppUp_Zone').val(row.data.zone_id);
	$('#mppUp_Longitude').val(row.data.longitude);
	$('#mppUp_ward').val(row.data.ward_id);
	$('#mppUp_aqi').val(row.data.aqi);
	$('#mppUp_iiy').val(row.data.instrument_installation_year);
	$('#mppUp_lastMain').val(row.data.last_maintenance_date);
	$('#mppUp_mixture').val(row.data.mixture_of_gases);
	$('#mppUp_unitofNo2').val(row.data.units_of_no2);
	$('#mppUp_unitOfCo').val(row.data.units_of_co);
	$('#mppUp_unitOfPM2.5').val(row.data.units_of_pm2);
	$('#mppUp_unitOfO3').val(row.data.units_of_o3);
	$('#mppUp_unitOfPM10').val(row.data.units_of_pm10);
	$('#mppUp_wqa').val(row.data.water_quality_assessment);
	$('#mppUp_mom').val(row.data.mixture_of_minerals);
	$('#mppUp_dataVal').val(row.data.data_validation_authority);
	$('#mppUp_remarks').val(row.data.remarks);

	$('#mppcbUp_subLayerId').val(row.sub_layer_id);
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
							" data-toggle='modal' data-target='#dep_updatehospital_modal' " +
							(current_tab ===hospital_data ? " onclick='updateHospital(event)'> " 
									: " onclick='updateUphc(event)'> " )+
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
	
	let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: current_tab};
	let response = window.depUtlityController.getLayerData(obj);
	let result = JSON.parse(response.responseText);
	LoadCurrentReport(result,'mppcb_dept_table');
	
	$('form[id="form_depAddMppcb"]')
	.validate(
			{
				rules : {
					
				},
				messages : {
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {

						
						
						let latitude =	$('#mpp_Latitude').val();
						let  zone =	$('#mpp_Zone').val();
						let  longitude =	$('#mpp_Longitude').val();
						let  ward =	$('#mpp_ward').val();
						let  aqi =	$('#mpp_aqi').val();
						let  instrument_installation_year =	$('#mpp_iiy').val();
						let  last_maintenance_date =	$('#mpp_lastMain').val();
						let  mixture_of_gases =	$('#mpp_mixture').val();
						let  units_of_no2 =	$('#mpp_unitofNo2').val();
						let units_of_co  =	$('#mpp_unitOfCo').val();
						let units_of_pm =	$('#mpp_unitOfPM2.5').val();
						let  unit_Of_O3 =	$('#mpp_unitOfO3').val();
						let unit_Of_PM10  =	$('#mpp_unitOfPM10').val();
						let water_quality_assessment  =	$('#mpp_wqa').val();
						let  mixer_of_minerals =	$('#mpp_mom').val();
						let data_validation_authority =	$('#mpp_dataVal').val();
						let remarks = $('#mpp_remarks').val();
					
						

						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === 'MPPCB'){
								return e;
							}
						});
						let data = {
								ward_no:ward_no,
								aqi:aqi,
								instrument_installation_year:instrument_installation_year,
								last_maintenance:last_maintenance,
								mixture_of_gases:mixture_of_gases,
								units_of_no2:units_of_no2,
								units_of_co:units_of_co,
								units_of_pm2_5:units_of_pm2_5,
								units_of_o3:units_of_o3,
								units_of_ph10:units_of_ph10,
								water_quality_assessment:water_quality_assessment,
								mixer_of_minerals:mixer_of_minerals,
								data_validation_authority:data_validation_authority,
								remarks:remarks,
								latitude:latitude,
								longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};

						let files = $('#mpp_mppcbImage')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#mpp_mppcbImage')[0].files,1);
						
						if(inValidFile){
							$('#mpp_mppcbImage')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getMPPCBData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
	$('form[id="form_depUpdateMppcb"]')
	.validate(
			{
				rules : {
					
				},
				messages : {
					
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						
						let layer_id = $('#mppcbUp_mppcbId').val();
						
						let latitude =	$('#mppUp_Latitude').val();
						let  zone =	$('#mppUp_Zone').val();
						let  longitude =	$('#mppUp_Longitude').val();
						let  ward =	$('#mppUp_ward').val();
						let  aqi =	$('#mppUp_aqi').val();
						let  instrument_installation_year =	$('#mppUp_iiy').val();
						let  last_maintenance_date =	$('#mppUp_lastMain').val();
						let  mixture_of_gases =	$('#mppUp_mixture').val();
						let  units_of_no2 =	$('#mppUp_unitofNo2').val();
						let units_of_co  =	$('#mppUp_unitOfCo').val();
						let units_of_pm =	$('#mppUp_unitOfPM2.5').val();
						let  unit_Of_O3 =	$('#mppUp_unitOfO3').val();
						let unit_Of_PM10  =	$('#mppUp_unitOfPM10').val();
						let water_quality_assessment  =	$('#mppUp_wqa').val();
						let  mixer_of_minerals =	$('#mppUp_mom').val();
						let data_validation_authority =	$('#mppUp_dataVal').val();
						let remarks = $('#mppUp_remarks').val();
							

						let sub_layer_id = $('#mppcbUp_subLayerId').val();
						let data = {
								ward_no:ward_no,
								aqi:aqi,
								instrument_installation_year:instrument_installation_year,
								last_maintenance:last_maintenance,
								mixture_of_gases:mixture_of_gases,
								units_of_no2:units_of_no2,
								units_of_co:units_of_co,
								units_of_pm2_5:units_of_pm2_5,
								units_of_o3:units_of_o3,
								units_of_ph10:units_of_ph10,
								water_quality_assessment:water_quality_assessment,
								mixer_of_minerals:mixer_of_minerals,
								data_validation_authority:data_validation_authority,
								remarks:remarks,
								latitude:latitude,
								longitude:longitude};
						
						let user_id = localStorage.getItem('user_data');
						let obj = {layer_id:layer_id, data: data, sub_layer_id: sub_layer_id, user_id: user_id};

						let files = $('#mppUp_mppcbImage')[0].files;
						let inValidFile = window.depUtlityController.isValidFiles($('#mppUp_mppcbImage')[0].files,1);
						
						if(inValidFile){
							$('#mppUp_mppcbImage')[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						window.depUtlityController.addData(obj, files);
						getMPPCBData();
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error",
								"Something went wrong");
					}
				}
			});
	
	
	
});


$(window).on('load resize', function () {
});	

