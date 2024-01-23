// Company chart  type
var pieChartFunc = function (options) {
    var vars = {
        data: [],
		colorList: [],
        companybar_chart: ''
    };

    this.chart = function (data) {
       
        vars.companybar_chart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}'
            },
            /*grid: {
                top: '0%',
                bottom: '0%',
                left: '0%',
                right: '0%',
			},*/
            legend: {
                show: true,
                orient: 'horizontal',
                bottom: "0",
                textStyle: {
                    color: '#707070',
                    fontSize: 12,
                },
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
            },
            series: [
                {
                    radius: ['35%', '60%'],
                    center: ['50%', '35%'],
                    type: 'pie',
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                return vars.colorList[params.dataIndex]
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        }
                    },
                    label: {
                        show: false
                    },
                    data: vars.data
                },
                {
                    radius: ['40%', '05%'],
                    center: ['50%', '35%'],
                    type: 'pie',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    animation: false,
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(250,250,250,0.5)'
                        }
                    },
                    data: [{
                        value: 1,
                    }],
                }
            ]
        });
    };

    this.reSizeChart = function () {
        vars.companybar_chart.resize();
    };

    this.construct = function (options) {
        $.extend(vars, options);
    };

    this.construct(options);
};

// First pie chart

var wwThbsChart = new pieChartFunc({
    data: [{ value: 17, name: 'Ward 1', }, { value: 23, name: 'Ward 2' }],
	colorList: ['#ddccad', '#cfb795'],
    companybar_chart: echarts.init(document.getElementById('wwThbs'))
});

var igwThbsChart = new pieChartFunc({
    data: [{ value: 17, name: 'HIG', }, { value: 23, name: 'MIG' }, { value: 27, name: 'LIG' }, { value: 18, name: 'EWS' }, { value: 16, name: 'BPL' }],
	colorList: ['#d99a3c', '#e7ac5e', '#e5c379', '#edd885', '#ffeda4'],
    companybar_chart: echarts.init(document.getElementById('igwThbs'))
});

var stwThbsChart = new pieChartFunc({
    data: [{ value: 17, name: 'Formal', }, { value: 23, name: 'In Formal' }],
	colorList: ['#c3966d', '#f1c17f'],
    companybar_chart: echarts.init(document.getElementById('stwThbs'))
});

var ztwThbsChart = new pieChartFunc({
    data: [{ value: 17, name: 'Residental', }, { value: 23, name: 'Commercial' }, { value: 27, name: 'Slums' }],
	colorList: ['#c39c4e', '#e3b96d', '#fed897'],
    companybar_chart: echarts.init(document.getElementById('ztwThbs'))
});




var depCitizenMasterData = [
    {
        "No":1,
        "userName":"Username",
        "name":"Name",
        "emailid":"email@amnex.com",
        "phoneno":"9898989898",
        "address":"address",
		"status":"1"
       
    },
     
    {
        "No":2,
        "userName":"Username",
        "name":"Name",
        "emailid":"email@amnex.com",
        "phoneno":"9898989898",
        "address":"address",
		"status":"1"
       
    },
     
    {
        "No":3,
        "userName":"Username",
        "name":"Name",
        "emailid":"email@amnex.com",
        "phoneno":"9898989898",
        "address":"address",
		"status":"1"
       
    },
]


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
			},
			{
				text: 'Export to PDF',
				className: 'btn-indore-table pdf' ,
			},
			
        ],
		//"scrollY": 'calc(100vh - 340px)',
        //"scrollX": true,
        //scrollCollapse: true,
		columnDefs: options.columnDefs
    } );
}

function LoadCurrentReport(oResults) {
 
	createDatatable({
		id : 'depCitizenMaster',
		columns : [
		
			
			{ 
				"data" : "No" ,
				"title" : "No"
			},{ 
				"data" : "userName" ,
				"title" : "User Name" 
			},
            {
				"data" : "name"  ,
				"title" : "Name"
			},
            {
				"data" : "emailid" ,
				"title" : "Email" 
			},
            {
				"data" : "phoneno"  ,
				"title" : "Phone No."
			},
		    {
				"data" : "address"  ,
				"title" : "Address"
			},
            ],
			
			data : depCitizenMasterData,
			
	})
	
}

	
$(window).on("load", function(){
	
	wwThbsChart.chart();
	igwThbsChart.chart();
	stwThbsChart.chart();
	ztwThbsChart.chart();
	
	LoadCurrentReport();
});

$(window).on('resize', function () {
	
	wwThbsChart.reSizeChart();
	igwThbsChart.reSizeChart();
	stwThbsChart.reSizeChart();
	ztwThbsChart.reSizeChart();
	
	
	
});	