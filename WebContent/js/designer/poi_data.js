var reportTable, table, poi_type_list;

function createDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
		columns: options.columns,
		data : options.data,
		"searching": false,
		autoWidth : true,
		dom: 'Blfrtip',
		responsive: true,
		buttons: [
			{
				extend: 'csvHtml5',	
				text: 'Export to Excel',
               	className: 'btn-indore-table ete' ,
               	filename: $("#poi_type_list option:selected").text(),
               	exportOptions: {
                    //columns: 'th:not(:last-child)'
                }
                
			},
			
        ],
        scrollY: "calc(100vh - 420px) ",
        scrollX: true,
        scrollCollapse: true,
		columnDefs: options.columnDefs
    } );
}

function LoadCurrentReport(result, id) {
	
	reportTable = createDatatable({
		id : id,
		columns : result.columns,
		data : result.data,
		columnDefs : [
			 {
			 "targets": result.columns.length,
			 "data" : "status_name",
			 "title" : "Status",
			 "render" : function(data, type, row, meta) {
					 if(data == 'Approved') {
						 return '<span>Approved</span>';
					 }
					 else if(data == 'Rejected') {
						 return '<span>Rejected</span>';
					 }
					 else if(data == 'Pending'){
						 return '<span>Pending</span>';
					 } 
				}
			 },
			 {
				 "targets": result.columns.length + 1,			// + 3, for older table with lat long
				 "data" : "geo_tagged_photo",
				 "title" : "View Images",
				 "render" : function(data, type, row, meta) {
					 let data1 = data;
					 return '<button id="open_image" name="open_image" ' + 
					 'data-image = "'+data1+'" class="btn action-btn" ' + 
					 ' onclick="openImage(event)" >' +
					 '<span class="fa fa-picture-o" aria-hidden="true"></span> </button > ';
				 }
			 },
			 {
				 "targets": result.columns.length + 2,			// + 3, for older table with lat long
				 "data" : "user_name",
				 "title" : "Surveyor Name",
				 "render" : function(data, type, row, meta) {
					return data;
				 }
			 },
			 {
				 "targets": result.columns.length + 3,			// + 3, for older table with lat long
				 "data" : "contact_no",
				 "title" : "Surveyor Contact Number",
				 "render" : function(data, type, row, meta) {
					return data;
				 }
			 },
			 {
				 "targets": result.columns.length + 4,			// + 3, for older table with lat long
				 "data" : "latitude",
				 "title" : "Latitude",
				 "render" : function(data, type, row, meta) {
					return data;
				 }
			 },
			 {
				 "targets": result.columns.length + 5,			// + 3, for older table with lat long
				 "data" : "longitude",
				 "title" : "Longitude",
				 "render" : function(data, type, row, meta) {
					return data;
				 }
			 }
		]
	})
}


function getPoiTypeList(department_id){
	var obj = {department_id: department_id};
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getPoiTypeList",
		method : 'POST',
		async : false,
		contentType : 'application/json',
		data : JSON.stringify(obj),
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			let poi_data = JSON.parse(result);
			$('#poi_type_list').empty().append('');
			if(poi_data.data != null && poi_data.data.length > 0){
				$('#poi_department option[value='+poi_data.data[0].department_id+']').attr("selected",true);
				$.each(poi_data.data, function(){
					$("#poi_type_list").append($("<option/>").val(this.poi_id).text(this.poi_name));
				});
				let filterObj = getFilteredPoiList();
				let selected_poi_type = $("#poi_type_list option:selected").text();
				selected_poi_type = selected_poi_type.replace(/[^a-zA-Z ]/g, "");
				selected_poi_type = selected_poi_type.replace(/ /g,'_');
				getSurveyList(filterObj, selected_poi_type + "_tbl");
			}
			
			$(".loader").fadeOut();
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getSurveyList(obj, id){
	
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getDashboardSurveyList",
		method : 'POST',
		contentType : 'application/json',
		data : JSON.stringify(obj),
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
				if(!result || result === ''){
					result = [];
				}
				var tableData = JSON.parse(result);
				if(table != undefined){
					reportTable.destroy();
					table.remove();
				}
				if ($.fn.DataTable.isDataTable("#"+id)) {
					reportTable.destroy();
					$("#"+id).remove();
				}
				table = $("<table id="+id+" class='display tbl_dep tbl-report tbl-poiData poiData_tbl'></table>");
				$("#poi_data_div").append(table);
				LoadCurrentReport(tableData, id);
				$(".loader").fadeOut();
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getFilteredPoiList(){
	let search_poi = $("#poi_type_list").val();
	
	let filterObj = {"search_poi":search_poi};
//	let search_surveyor_id = $("#surveyor_list").val();
//	if(search_surveyor_id && search_surveyor_id != '0'){
//		filterObj.search_surveyor_id =search_surveyor_id; 
//	}
	let search_from_date = $("#filter_from_date").val();
	if(search_from_date){
		filterObj.search_from_date = search_from_date;
	}
	let search_to_date = $("#filter_to_date").val();
	if(search_to_date){
		filterObj.search_to_date = search_to_date;
	}
	return filterObj;
}


function openImage(event){
	let fileNames = $(event.currentTarget).data('image');
	var files = fileNames.split(",");
	for(var i = 0 ;i<files.length;i++){
		$("#carousel-inner").append("<div class='carousel-item"+ 
				(i === 0 ? " active'>" : "'>") +"<img class='d-block w-100' src='"+
				window.iscdl.appData.baseURL + "api-docs/dashboard/getImageFile/" + encodeURIComponent(files[i]) 
				+"' alt='"+files[i]+"'> </div>");
	}
	$("#imageModal").show();
}

$(document).ready(function(){	
	
//	
//	$(".datepicker-dept").datepicker({ 
//		autoclose: true, 
//        todayHighlight: true
//	}).datepicker('update', new Date());	
  
	var today = new Date();
	$("#filter_from_date").datepicker({format: 'yyyy-mm-dd',autoclose: true}).datepicker("setDate", new Date(today.getYear()+1900,today.getMonth(),1));
	$("#filter_to_date").datepicker({format: 'yyyy-mm-dd',autoclose: true}).datepicker("setDate", today);

	$("#count_from_date").datepicker({format: 'yyyy-mm-dd',autoclose: true}).datepicker("setDate", today);
	$("#count_to_date").datepicker({format: 'yyyy-mm-dd',autoclose: true}).datepicker("setDate", today);
	
});


/**
 * checking for module permission
 */
$("ul[id*=leftPanel] li").click(function () {
	let val = $(this).attr('title');
	window.depUtlityController.setPageAccessAccordingToModule(val);
});

$(window).on("load", function(){
	$(".loader").fadeOut();
	window.depUtlityController.getDepartmentList('poi_department');
	getPoiTypeList(localStorage.getItem('department_id'));	
	
//	let filterObj = getFilteredPoiList();
//	let selected_poi_type = $("#poi_type_list option:selected").text();
//	selected_poi_type = selected_poi_type.replace(/[^a-zA-Z ]/g, "");
//	selected_poi_type = selected_poi_type.replace(/ /g,'_');
//	getSurveyList(filterObj, selected_poi_type + "_tbl");
	
	$("#poi_department").on("change",function(){
		let department_id = $("#poi_department option:selected").val();
		getPoiTypeList(department_id);
	});
	
	$("#survey_filter_submit_btn").click(function(){
		let filterObj = getFilteredPoiList();
		let selected_poi_type = $("#poi_type_list option:selected").text();
		selected_poi_type = selected_poi_type.replace(/[^a-zA-Z ]/g, "");
		selected_poi_type = selected_poi_type.replace(/ /g,'_');
		getSurveyList(filterObj, selected_poi_type + "_tbl");
	});
	
	$("#imageModalCloseBtn").click(function(){
		$("#carousel-inner").empty();
		$("#imageModal").hide();
	});
	
	
	$("#citizen-logout-btn").click(function(){
		let userObj = {token: localStorage.getItem('token')};
		$.ajax({
			url : window.iscdl.appData.baseURL
					+ "api/logout",
			method : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(userObj),
			async : false,
			beforeSend : function(request) {
				request.setRequestHeader('Authorization', 'Bearer '
						+ localStorage.getItem('token'));
			},
			success : function(result) {
				window.localStorage.clear();
				window.location = window.location.origin + window.iscdl.appData.webURLPrefix;
			},
			error : function(err) {
				console.log(err);
			}
		});
	});
	
	$('a[data-toggle="tab"]').on('click', function(e){
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 100);
	});  
});


$(window).on('load resize', function () {
});	