var table, PieChartObj, personpie, total_records;

function zoomToProject(event){
	let row = $(event.currentTarget).data('row');
	
	let latitude = row.latitude;
	let longitude = row.longitude;
	
	window.projectReportController.zoomToLocation(latitude, longitude);
}


var reportmap = {
	maphospital: function () {
		var map;


		// Icon Here
		var iconBase = 'images/map/';
		var icons = {
			Not_Working: {
				icon: iconBase + 'placeholder_blue.svg'
			}
		};

	},

	//DataTable call create
	createDatatable: function (options = {}) {
		return $('#' + options.id).DataTable({
			columns: options.columns,
			data: options.data,
			"searching": false,
			//"bLengthChange": false,
			//"bFilter": true,
			scrollX: true,
			//"bInfo": true,
			"autoWidth": true,
			dom: 'Blfrtip',
			responsive: true,
			buttons: [
				/*{
					text: 'Fillter',
					className: 'btn-indore-table fillter',
				},*/
				{
					extend: 'csvHtml5',
					text: 'Export to Excel',
					className: 'btn-indore-table ete',
					 filename: 'Project Reports',
				},
				{
					extend: 'pdf',
					text: 'Export to PDF',
					className: 'btn-indore-table pdf' ,
					orientation : 'landscape',
	                pageSize : 'A3',
	                filename: 'Project Reports',
	                exportOptions: {
	                	columns: 'th:not(:last-child)'
	               	}
				},

			],
			scrollY: "20px",
			scrollCollapse: true,
			columnDefs: options.columnDefs
		});
	},

	
	
	//Report Field Grid Display
	LoadCurrentReport: function (result) {
		table = reportmap.createDatatable({
			id: 'project_report',
			columns : [
			 	{ "data": null, title: "Sr No."},
//			    { "data": "ward_no", title: "Ward No"},
//			    { "data": "ward_name", title: "Ward Name"},
			    { "data": "project_name", title: "Project Name"},
			    { "data": "work_order_period", title: "Work Order Period"},
			    { "data": "contract_period", title: "Contract Period"},
			    { "data": "status_name", title: "Project Status"},
			    { "data": "start_date", title: "Project Start Date"},
			    { "data": "end_date", title: "Project Completion Date"},
			    { "data": "physical_progress", title: "Physical Progress"},
			    { "data": "total_cost", title: "Project Total Cost"},
			    { "data": "milestone_count", title: "Total Milestone"},
			    { "data": "remarks", title: "Remarks"}
			 ],

			data: result,
			columnDefs : [{
	            "searchable": false,
//	            "orderable": false,
	            "width": "5%",
	            "targets": 0,
	            "render": function(data, type, full, meta) {
	            	return meta.row + 1;
	             } 
	        	},
	        	{
					"targets": 4,
					"data" : "status_name",
					"title" : "Project Status",
					"render" : function(data, type, row,meta) {
						if(data === 'Pending'){
							return data;
						}else if(data === 'In progress'){
							return '<a href="#" class="status-pending">In Progress</a>';
						}else if(data === 'Completed'){
							return '<a href="#" class="status-active">Completed</a>';
						}
						
					}
				},
	        	{
					"targets": 11,
					"data" : "latitude",
					"title" : "Action",
					"render" : function(data, type, row, meta) {
						return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"'" +
						" onclick='zoomToProject(event)'> <span class='fa fa-map-marker' aria-hidden='true'></span> </button>";
					}
	        	}
			]
		})
	},

	//Height Grid Parent Datatable
	DatatableH: function () {
		var gridH = $('#project_report_wrapper').parents().height() - 115;
		$('.dataTables_scrollBody').css('max-height', gridH);
	},
	// Filter slide
	filterslideranimated: function () {
		$('.js-slider-filter').click(function () {
			$(this).find('i').toggleClass('fa-close fa-angle-left');
			$('.map_panel').find('.map-panel-filter').toggleClass('opacity').css({
				right: $('.map_panel').width()
			});
		});
	},

	// sliderrightside
	sidebarsliderrightanimated: function () {

		$('.js-slider-show').click(function () {
			var t = $(this);
			var mapPanel = $('.map_panel');
			var mapFilterBtn = mapPanel.find('.js-slider-filter');
			$(this).find('i').toggleClass('fa-close  fa-angle-left');
			mapPanel.toggleClass("opacity");
			if(!mapPanel.hasClass('opacity')){
				mapPanel.find('.js-slider-filter i').removeClass('fa-close').addClass('fa-angle-left');
				mapPanel.find('.map-panel-filter').removeClass('opacity');
			}
			var right = mapPanel.hasClass('opacity') ? 0 : -mapPanel.width();
			var rightBtn = mapPanel.hasClass('opacity') ? mapPanel.width() : 0;
			mapPanel.animate({
				right: right,
			}, 200, 
			function () {
				// Animation complete.
				// t.css({
				// 	right: rightBtn,
				// });
				mapFilterBtn.toggleClass('show');
			});
			personpie.chart();
			personpie.reSizeChart();	

		});
	},

}



//Pie Chart
var pieChartFunc = function (options) {
	var vars = {
		sData: [],
		pie_chart: '',
		color: [],
	};

	this.chart = function (sData, color) {
		if (sData) {
			vars.sData = sData;
		}
		if (color) {
			vars.color = color;
		}
		datavalue = 0;
		for (var i = 0; i < vars.sData.length; i++) {
			datavalue = datavalue + vars.sData[i]['value'];
			//console.log(vars.sData[0]['value']);
		}

		vars.pie_chart.setOption({
			//color: vars.color,
			title: vars.title,
			legend: {
				top: "40px",
				textStyle: {
					color: '#666',
					lineHeight: 0,
					padding: 0,
				},
				icon: 'square',
				itemWidth: 12,
				itemHeight: 12,
				data: vars.sData,
			},
			tooltip: {
				formatter: "{b}: {c}"
			},
			series: [
				{
					name: '',
					type: 'pie',
					radius: ['50%', '70%'],
					center: ['50%', '55%'],
					//roseType: 'area',
					label: {
						show: false,
						position: 'center'
					},
		            emphasis: {
		                label: {
		                    show: true,
		                    fontSize: '20',
		                    fontWeight: 'bold'
		                }
		            },
					data: vars.sData
				}

			]
		});
	};
	
//	this.clickOnChart = function(){
//		vars.pie_chart.on('click', function (params) {
//			let category_name = params.data.name;
//			//console.log(category_name);
//			window.reportFilterController.reportFilterContentByLayerName(category_name);
//			$("#reset_hospital").click(function(){
//				window.commonReportController.resetFilterEvent();
//			});
//			window.commonReportController.loadFeatureTableByCategory(category_name);
//		});
//	};

	this.reSizeChart = function () {
		vars.pie_chart.resize();
	};

	this.construct = function (options) {
		$.extend(vars, options);
	};

	this.construct(options);
};


function fillChartData(data,total_records){

	personpie = new pieChartFunc({
		sData: data,
		title : [
			{
				text: '',
				subtext: total_records,
				textStyle: {
					fontSize: 20,
					color: "#2c3055"
				},
				subtextStyle: {
					fontSize: 20,
					color: '#2c3055'
				},
				textAlign: "center",
				x: '48%',
				y: '42%',
			}],
		pie_chart: echarts.init(document.getElementById('projectReport_piechart'))
	});
	
	
}

function setChartData(){
	
	$("#report_title").html("Project Report");
	sData = [];
	for(var i=0;i< window.depUtlityController.projectMasterDetails.project_status_master.length;i++){
		let sObj = {name:window.depUtlityController.projectMasterDetails.project_status_master[i].status_name};
		let status = window.depProjectMonitoringController.projectReports.filter(function(e){
			if(e.status_name === sObj.name){
				return e;
			}
		});
		sObj.value = status.length > 0 ? status.length : null;
		sData.push(sObj);
	}
	total_records = window.depProjectMonitoringController.projectReports.length;
	fillChartData(sData,total_records);
	personpie.chart();
	personpie.reSizeChart();
}


$(document).ready(function(){	
	
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
  $(".datepicker").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
        format: 'yyyy-mm-dd'
  }).datepicker('update', new Date());	
  
});

$("ul[id*=leftPanel] li").click(function () {
	let val = $(this).attr('title');
	window.depUtlityController.setPageAccessAccordingToModule(val);
});

// load Resize
$(window).on("load", function () {
	
	reportmap.maphospital();
	let obj = {};
	let did = window.depUtlityController.getDepartmentId();
	if(did != window.departmentData._department_id) {
		obj.department_id = did;
	} else {
		obj.department_id = window.departmentData._department_id;
	}
	window.depProjectMonitoringController.getProjectReport(obj);
	reportmap.LoadCurrentReport(window.depProjectMonitoringController.projectReports);
	reportmap.sidebarsliderrightanimated();
	reportmap.filterslideranimated();
	
	$('#project_report_length > label').addClass("show-entries");
	
	window.depUtlityController.getWardList('projectReport_ward');
	let masterData = window.depProjectMonitoringController.getProjectMasterDetails();
	let projects = window.depProjectMonitoringController.getProjectList(true);

	window.depUtlityController.headerDrop();
	
	$(".loader").fadeOut(1000);
	
	setTimeout(function(){ 
		$('.dataTables_wrapper').resize();
	}, 500);
	
	setChartData();
	
	$('#projectReport_submit').click(function(){
		
		if(table != undefined || $.fn.DataTable.isDataTable("#project_report")){
			table.destroy();
		}
		$("#project_report").empty();
		
		let ward_id = $('#projectReport_ward').val();
		let project_id = $('#select_project').val();
		let project_status = $('#prj_project_status').val();
		let from_date = $('#projectReport_fromDate').val();
		let to_date = $('#projectReport_toDate').val();
		
		let obj = {};
		if(ward_id && ward_id != ""){
			obj.ward_id = ward_id;
		}
		if(project_id && project_id != ""){
			obj.project_id = project_id;
		}
		
		if(project_status && project_status != "" && project_status != "0"){
			obj.project_status = project_status;
		}
		
		if(from_date && from_date != ""){
			obj.from_date = from_date;
		}
		
		if(to_date && to_date != ""){
			obj.to_date = to_date;
		}
		
		let did = window.depUtlityController.getDepartmentId();
		if(did != window.departmentData._department_id) {
			obj.department_id = did;
		} else {
			obj.department_id = window.departmentData._department_id;
		}
		
		window.depProjectMonitoringController.getProjectReport(obj);
		reportmap.LoadCurrentReport(window.depProjectMonitoringController.projectReports);
		$('#project_report_length > label').addClass("show-entries");
		setTimeout(function(){ 
			$('.dataTables_wrapper').resize();
		}, 500);
		setChartData();
	});
	
	
});

$(window).on('load resize', function () {
	reportmap.DatatableH();
	personpie.reSizeChart();
	
});	

$(window).on('resize', function () {
	try{
		personpie.reSizeChart();
	}catch(e){
	}
	
});