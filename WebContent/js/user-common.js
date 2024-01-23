var reportTable, table, countTable, wardMappingTable;

function createWardMaptable(options = {}){
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
             	filename: 'Surveyor Ward Mapping'
			},
			
      ],
// scrollY: " calc(100vh - 340px) ",
      	scrollX: true,
      	scrollCollapse: true,
		columnDefs: options.columnDefs
  } );
}

function LoadWardReport(result) {

	wardMappingTable = createWardMaptable({
		id : 'ward_assign',
		columns : [
			 { "data": null, title: "Sr No." },
			    { "data": "surveyor_name", title: "Surveyor Name" },
			    { "data": "ward_no", title: "Ward No" },
			    { "data": "ward_name", title: "Ward Name"},
			    { "data": "created_datetime", title: "Assigned DateTime"}],
			
			data : result.data,
			columnDefs : [{
	            "searchable": false,
//	            "orderable": false,
	            "width": "5%",
	            "targets": 0,
	            "render": function(data, type, full, meta) {
	                return meta.row + 1;
	             },
	        }]
	});
}


function createCountDataTable(options = {}){
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
               	className: 'btn-indore-table ete',
               	filename: 'Survey Count'
			},
			
        ],
        scrollY: " calc(60vh - 378px) ",
        scrollX: true,
        scrollCollapse: true,
		columnDefs: options.columnDefs
    } );
}

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
               	exportOptions: {
                    columns: 'th:not(:last-child)'
                }
			},
			
        ],
        scrollY: " calc(60vh - 378px) ",
        scrollX: true,
        scrollCollapse: true,
		columnDefs: options.columnDefs
    } );
}

function LoadCountTable(result, id){
	countTable = createCountDataTable({
		id : id,
		columns : result.columns.concat([{"data":"start_date_time","title":"Start Date & Time"},{"data":"end_date_time","title":"End Date & Time"}]),
		data : result.data
	})
}

function LoadCurrentReport(result, id) {
	
	reportTable = createDatatable({
		id : id,
		columns : result.columns,
		data : result.data,
		columnDefs : [
			{
				"targets": result.columns.length,
				 "data" : "latitude",
				 "title" : "Latitude"
			},
			{
				"targets": result.columns.length + 1,
				 "data" : "longitude",
				 "title" : "Longitude"
			},
			 {
			 "targets": result.columns.length + 2,				// + 2, for older table with lat long & nothing for table without lat/long
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
				 "targets": result.columns.length + 3,			// + 3, for older table with lat long & +1 for table without lat/long
				 "data" : "geo_tagged_photo",
				 "title" : "View Images",
				 "render" : function(data, type, row, meta) {
					 let data1 = data;
					 return '<button id="open_image" name="open_image" ' + 
					 'data-image = "'+data1+'" class="btn action-btn" ' + 
					 ' onclick="window.surveyController.openImage(event)" >' +
					 '<span class="fa fa-picture-o" aria-hidden="true"></span> </button > ';
				 }
			 }
]
	})
}


function getPoiTypeList(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getPoiTypeList",
		method : 'GET',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			let poi_data = JSON.parse(result);
			$.each(poi_data.data, function(){
				$("#poi_type_list").append($("<option/>").val(this.poi_id).text(this.poi_name));
			});
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getSurveyorList(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getDashboardSurveyorList",
		method : 'GET',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			let surveyor_list = JSON.parse(result);
			$("#surveyor_list").append($("<option/>").val(0).text('Select'));
			$("#surveyor_list_for_count").append($("<option/>").val(0).text('Select'));
			$("#sv_select").append($("<option/>").val(0).text('Select'));
			$.each(surveyor_list.data, function(){
				$("#surveyor_list").append($("<option/>").val(this.user_id).text(this.user_name));
				$("#surveyor_list_for_count").append($("<option/>").val(this.user_id).text(this.user_name));
				$("#sv_select").append($("<option/>").val(this.user_id).text(this.user_name));
			});
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getActiveSurveyorCount(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getActiveSurveyorCount",
		method : 'GET',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			var count = 0;
			if(result) {
				count = JSON.parse(result).data;
			}
			$("#activeSurveyor").text(""+count);
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getActiveSurveyCount(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getActiveSurveyCount",
		method : 'GET',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			var count = 0;
			if(result) {
				count = JSON.parse(result).data;
			}
			$("#activeSurvey").text(""+count);
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getApprovedSurveyCount(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getApprovedSurveyCount",
		method : 'GET',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			var count = 0;
			if(result) {
				count = JSON.parse(result).data;
			}
			$("#approvedSurvey").text(""+count);
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getTotalSurveyCount(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getTotalSurveyCount",
		method : 'GET',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			var count = 0;
			if(result) {
				count = JSON.parse(result).data;
			}
			$("#totalSurvey").text(""+count);
		},
		error : function(err) {
			console.log(err);
		}
	});
}


function getTotalSurveyCountForSurveyor(obj){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getTotalSurveyCountForSurveyor",
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
			}else{
				var result = JSON.parse(result);
				result.columns.splice(0, 0, {"poi_type_id":0,"data": "user_name","title":"Surveyor Name"});
			}
			if ($.fn.DataTable.isDataTable("#count_master_tbl")) {
				countTable.destroy();
			}
			var countTableData = result;
			LoadCountTable(countTableData, 'count_master_tbl');
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
				table = $("<table id="+id+" class='display tbl_dep tbl-report'></table>");
				$("#dashboard_tab").append(table);
				LoadCurrentReport(tableData, id);
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function mapSurveyorWithWard(obj){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/mapSurveyorWithWard",
		method : 'POST',
		contentType : 'application/json',
		data : JSON.stringify(obj),
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			$("#sv_ward").val($("#sv_ward option:first").val());
			$("#sv_select").val($("#sv_select option:first").val());
			getSurveyorWardMapping();
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getWardList(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "citizen/ward/getWardList",
		method : 'GET',
		async : false,
		success : function(result) {
			let ward_list = JSON.parse(result);
			$("#sv_ward").append($("<option/>").val(0).text('Select'));
			$.each(ward_list.data, function(){
				$("#sv_ward").append($("<option/>").val(this.ward_no).text(this.ward_name + " (" + this.ward_no + ")"));
			});
		},
		error : function(err) {
			console.log(err);
		}
	});
}

function getSurveyorWardMapping(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "api/dashboard/getSurveyorWardMapping",
		method : 'GET',
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader('Authorization', 'Bearer '
					+ localStorage.getItem('token'));
		},
		success : function(result) {
			if(!result || result === ''){
				result = [];
			}
			if ($.fn.DataTable.isDataTable("#ward_assign")) {
				wardMappingTable.destroy();
			}
			var wardMappingTableData = JSON.parse(result);
			LoadWardReport(wardMappingTableData);
		},
		error : function(err) {
			console.log(err);
		}
	});
}

$(document).ready(function(){	
	
	$(".datepicker-dept").datepicker({ 
		autoclose: true, 
        todayHighlight: true
	}).datepicker('update', new Date());	
  
	$("#treeview_mobile_application").hummingbird();
	$("#treeview_web_application").hummingbird();

	var today = new Date();
	$("#filter_from_date").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", new Date(today.getYear()+1900,today.getMonth(),1));
	$("#filter_to_date").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", today);

	$("#count_from_date").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", today);
	$("#count_to_date").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", today);
	
});
	
function getFilteredPoiList(){
	let search_poi = $("#poi_type_list").val();
	
	let filterObj = {"search_poi":search_poi};
	let search_surveyor_id = $("#surveyor_list").val();
	if(search_surveyor_id && search_surveyor_id != '0'){
		filterObj.search_surveyor_id =search_surveyor_id; 
	}
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

$(window).on("load", function(){
	
	getPoiTypeList();	
	getSurveyorList();
	getActiveSurveyorCount();
	getActiveSurveyCount();
	getApprovedSurveyCount();
	getTotalSurveyCount();
	
	let filterObj = getFilteredPoiList();
	let selected_poi_type = $("#poi_type_list option:selected").text();
	selected_poi_type = selected_poi_type.replace(/[^a-zA-Z ]/g, "");
	selected_poi_type = selected_poi_type.replace(/ /g,'_');
	getSurveyList(filterObj, selected_poi_type + "_tbl");
	
	
	let countFilter = {};
	let count_from_date = $("#count_from_date").val();
	if(count_from_date){
		countFilter.search_from_date = count_from_date;
	}
	let count_to_date = $("#count_to_date").val();
	if(count_to_date){
		countFilter.search_to_date = count_to_date;
	}
	getTotalSurveyCountForSurveyor(countFilter);
	
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
	
	$("#count_filter_btn").click(function(){
		let countFilter = {};
		let count_surveyor_id = $("#surveyor_list_for_count").val();
		if(count_surveyor_id && count_surveyor_id != '0'){
			countFilter.search_surveyor_id = count_surveyor_id; 
		}
		let count_from_date = $("#count_from_date").val();
		if(count_from_date){
			countFilter.search_from_date = count_from_date;
		}
		let count_to_date = $("#count_to_date").val();
		if(count_to_date){
			countFilter.search_to_date = count_to_date;
		}
		
		getTotalSurveyCountForSurveyor(countFilter);
	});
	
	$("#sv_ward_submit_btn").click(function(){
		let mapObj = {};
		let ward_id = $("#sv_ward").val();
		if(ward_id && ward_id != '0'){
			mapObj.ward_id = ward_id;
		}else{
			$u.notify('warning', 'Warning',
					'Please select Ward !', '');
			return;
		}
		let surveyor_id = $("#sv_select").val();
		if(surveyor_id && surveyor_id != '0'){
			mapObj.surveyor_id = surveyor_id;
		}else{
			$u.notify('warning', 'Warning',
					'Please select Surveyor !', '');
			return;
		}
		mapSurveyorWithWard(mapObj);
	});
	
	$("#ward_assign_li").click(function(){
		getWardList();
		getSurveyorWardMapping();
	});
	
	$(".user-manual-ctbtn").css('display','none');
	$(".user-manual-dpbtn").css('display','flex');
	
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

$('.btnsrvcount').click(function (){
	$('.srvcount').slideToggle();
});

$('.btnsrvdesh').click(function (){
	$('.srvdesh').slideToggle();
});

$('.filter-container input.cancel').click(function (){
	$('.filter-container').slideUp();
});

$('.filter-container input.save').click(function (){
	$('.filter-container').slideUp();
});
