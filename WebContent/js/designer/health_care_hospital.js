var PieChartObj;
var personpie;

var reportmap = {
	maphospital : function() {
		var map;
		// Icon Here
		var iconBase = 'images/map/';
		var icons = {
			Not_Working : {
				icon : iconBase + 'placeholder_blue.svg'
			}
		};
	},

	// Height Grid Parent Datatable
	DatatableH : function() {
		var gridH = $('#registerhospital-tbl_wrapper').parents().height() - 115;
		$('.dataTables_scrollBody').css('max-height', gridH);
	},
	// Filter slide
	filterslideranimated : function() {
		$('.js-slider-filter').click(
				function() {
					$(this).find('i').toggleClass('fa-close fa-angle-left');
					$('.map_panel').find('.map-panel-filter').toggleClass(
							'opacity').css({
						right : $('.map_panel').width()
					});
				});
	},

	// sliderrightside
	sidebarsliderrightanimated : function() {

		$('.js-slider-show').click(
				function() {
					var t = $(this);
					var mapPanel = $('.map_panel');
					var mapFilterBtn = mapPanel.find('.js-slider-filter');
					$(this).find('i').toggleClass('fa-close  fa-angle-left');
					mapPanel.toggleClass("opacity");
					if (!mapPanel.hasClass('opacity')) {
						mapPanel.find('.js-slider-filter i').removeClass(
								'fa-close').addClass('fa-angle-left');
						mapPanel.find('.map-panel-filter').removeClass(
								'opacity');
					}
					var right = mapPanel.hasClass('opacity') ? 0 : -mapPanel
							.width();
					var rightBtn = mapPanel.hasClass('opacity') ? mapPanel
							.width() : 0;
					mapPanel.animate({
						right : right,
					}, 200, function() {
						mapFilterBtn.toggleClass('show');
					});

					// window.reportChartsModule.resizePieChart();
					personpie.chart();
					personpie.reSizeChart();

				});
	},
}

// Pie Chart
var pieChartFunc = function(options) {
	var vars = {
		sData : [],
		pie_chart : '',
		color : [],
	};

	this.chart = function(sData, color) {
		if (sData) {
			vars.sData = sData;
		}
		if (color) {
			vars.color = color;
		}
		datavalue = 0;
		for (var i = 0; i < vars.sData.length; i++) {
			datavalue = datavalue + vars.sData[i]['value'];
			// console.log(vars.sData[0]['value']);
		}

		vars.pie_chart.setOption({
			// color: vars.color,
			title : vars.title,
			legend : {
				show:'true',
				orient: 'horizontal',
	            type : 'scroll',
				top : "05px",
				textStyle : {
					color : '#666',
					lineHeight : 0,
					padding : 0,
				},
				icon : 'square',
				itemWidth : 12,
				itemHeight : 12,
				data : vars.sData,
			},
			tooltip : {
				formatter : "{b}: {c}"
			},
			series : [ {
				name : '',
				type : 'pie',
				radius : [ '50%', '65%' ],
				center : [ '50%', '45%' ],
				// roseType: 'area',
				avoidLabelOverlap: false,
				label : {
					show : false,
					position : 'center'
				},
				emphasis : {
					label : {
						show : true,
						fontSize : '15',
						fontWeight : 'bold'
					}
				},
				data : vars.sData
			}

			]
		});
	};

	this.clickOnChart = function() {
		vars.pie_chart.on('click', function(params) {
			let category_name = params.data.name;
			window.reportFilterController
					.reportFilterContentByLayerName(category_name);

			$("#reset_hospital").click(function() {
				window.commonReportController.resetFilterEvent();
			});
			
			window.commonReportController
					.loadFeatureTableByCategory(category_name);
		});
	};

	this.reSizeChart = function() {
		vars.pie_chart.resize();
	};

	this.construct = function(options) {
		$.extend(vars, options);
	};

	this.construct(options);
};

/**
 * form
 */

$.validator.addMethod("dropDownValidation", function(value, element, params) {
	try {
		return value == "" ? false : true;
	} catch (e) {
		return false
	}
}, 'Please select ward');

// hospital form
$('form[id="form_hospital"]').validate({
	rules : {},
	messages : {},
	submitHandler : function(form, e) {
		e.preventDefault();
		try {
			var hospital_form = $("#form_hospital").serializeArray();

			let x = 0;

			for ( let i in hospital_form) {
				let value = hospital_form[i].value;
				if (value != "") {
					x++;
				}
			}

			if (x == 0) {
				$u.notify("info", "Notification", "Please select filter");
				return;
			}
			let report_array = [];

			for ( let i in hospital_form) {
				let name = hospital_form[i].name;
				let value = hospital_form[i].value;
				if (value != "") {
					report_array.push({
						"key" : name,
						"value" : value
					});
				}
			}
			window.commonReportController.filterWiseTable(report_array);
		} catch (e) {
			$(".loader").fadeOut();
			$u.notify("error", "Error", "Something Happend Wrong");
		}
	}
});

/**
 * click event of get report
 */
$('form[id="form_report_data"]')
.validate(
		{
			rules : {},
			messages : {},
			submitHandler : function(form, e) {
				e.preventDefault();
				try {
					let cat_value = $("#report_data_category").val();
					if(cat_value == "" || cat_value == null || cat_value == undefined){
						$u.notify("info", "Notification","Please select department");
						return;
					}
					localStorage.setItem("report_id",cat_value);
					let jsp_page = "reports.jsp";
					window.location = window.location.origin
                    + window.iscdl.appData.webURLPrefix +jsp_page; 
				} catch (e) {
					 $(".loader").fadeOut();
					 $u.notify("error", "Error","Something Happend Wrong");
				}
			}
});


/**
 * click events
 */

/*$("#report_popup").click(
		function() {

			let department_id = localStorage.getItem('department_id');
			if (department_id != "1") {
				let jsp_page = "reports.jsp";

				window.location = window.location.origin
						+ window.iscdl.appData.webURLPrefix + jsp_page;
			}
		});*/



/**
 * checking for module permission
 */
$("ul[id*=leftPanel] li").click(function () {
	let val = $(this).attr('title');
	window.depUtlityController.setPageAccessAccordingToModule(val);
});

$("#chart_slider").click(function() {
	let report_chart_data = window.commonReportController.getChartArrayData();
	// console.log("Chart data length : "+report_chart_data.length);
	sData = report_chart_data;
	fillChartData(sData);
	personpie.chart();
	personpie.reSizeChart();
	personpie.clickOnChart();

});

/**
 * chart related functions
 * 
 */

function craeteChartDepartmentWise(department_id) {
	window.commonReportController.getChartDataByDepartment(department_id);
}

function fillChartData(data) {

	personpie = new pieChartFunc({
		sData : data,
		title : [ {
			text : '',
			textStyle : {
				fontSize : 20,
				color : "#2c3055"
			},
			subtextStyle : {
				fontSize : 20,
				color : '#2c3055'
			},
			textAlign : "center",
			x : '48%',
			y : '42%',
		} ],
		pie_chart : echarts.init(document.getElementById('Hospitol_piechart'))
	});

}


function displayChartTitle(department_id) {
	$("#report_title").html("");
	switch (department_id) {
	case "5": // Education
		$("#report_title").html("Education Department");
		break;
	case "6": // health
		$("#report_title").html("Health Department");
		break;
	case "8": // IDA
		$("#report_title").html("Indore Development Authority (IDA) Department");
		break;
	case "9": // IMC
		$("#report_title").html("IMC Department");
		break;
	case "10": // Industries
		$("#report_title").html("Madhya Pradesh Audyogik Kendra Vikas Nigam Department");
		break;
	case "11": // Land Record
		$("#report_title").html("Land Record Boundary Department");
		break;
	case "13": // Nazul_Selection
		$("#report_title").html("Nazul Selection Department");
		break;
	case "14": // NIC
		$("#report_title").html("National Informatics Centre (NIC) Department");
		break;
	case "16": // police
		$("#report_title").html("Police Department");
		break;
	case "17": // Power
		$("#report_title").html("MP Electricity Department");
		break;
	case "18": // PHE
		$("#report_title").html("PHE Urban Department");
		break;
	case "19": // PWD
		$("#report_title").html("Public Works Department (PWD) Department");
		break;
	case "20": // Register and stamp duty
		$("#report_title").html("Register And Stamp Duty Department");
		break;
	case "21": // RTO
		$("#report_title").html("RTO Department");
		break;
	case "22": // T & C Planning
		$("#report_title").html("Town And Country Planning Department");
		break;
	case "46": // AICTSL
		$("#report_title").html("Atal Indore City Transport Service Limited (AICTSL) Department");
		break;
	case "49": // Planning Economics 
		$("#report_title").html("Planning Economics and Statistics Department");
		break;
	case "51": // Housing Board Department
		$("#report_title").html("Housing Board Department");
		break;
	case "52": // Women And Child Welfare
		$("#report_title").html(
				"Women and Child Welfare Development Department");
		break;
	case "53": // MPPCB
		$("#report_title").html("MP Pollution Control Board Department");
		break;
	case "58": // POI
		$("#report_title").html("POI Department");
		break;
	case "59": // Water Bodies
		$("#report_title").html("Environment Department");
		break;
	case "503": // Indore Smart City Project
		$("#report_title").html("Indore Smart City Department");
		break;
	default:
		$("#report_title").html("");
		break;
	}
}

/**
 * load function
 */

$(window).on("load", function() {

	reportmap.maphospital();
	reportmap.sidebarsliderrightanimated();
	reportmap.filterslideranimated();
	let department_id = localStorage.getItem('department_id');

	let report_id = localStorage.getItem('report_id');
	
	setTimeout(() => {
		$(".loader").fadeOut(1000);
	}, 5000);
	if (department_id == "1") {
		if (report_id != "" && report_id != null && report_id != undefined) {
			displayChartTitle(report_id);
			craeteChartDepartmentWise(report_id);
		} else {
			displayChartTitle(department_id);
			craeteChartDepartmentWise(department_id);
		}
	} else {
		displayChartTitle(department_id);
		craeteChartDepartmentWise(department_id);
	}
	window.depUtlityController.headerDrop();
	window.commonReportController.resetFilterEvent('reset_hospital');

	$("#citizen-logout-btn").click(function() {
		window.depUtlityController.userLogout();
	});

});

$(window).on('load resize', function() {
	reportmap.DatatableH();
	// personpie.reSizeChart();
});
$(window).on('resize', function() {
	// window.reportChartsModule.resizePieChart();
	try {
		personpie.reSizeChart();
	} catch (e) {
	}

});
