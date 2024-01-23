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
var processortypeChart = new pieChartFunc({
    data: [{ value: 17, name: 'Owner', }, { value: 23, name: 'Tenant' }],
	colorList: ['#e1ac67', '#f1c27e'],
    companybar_chart: echarts.init(document.getElementById('processortype'))
});

var catSecondarySclChart = new pieChartFunc({
    data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],
	colorList: ['#5f3b14','#e1ac67', '#f1c27e'],
    companybar_chart: echarts.init(document.getElementById('catSecondaryScl'))
});

//var categorywIcdsChart = new pieChartFunc({
//    data: [{ value: 17, name: 'Goverment', }, { value: 33, name: 'Private' }],
//	colorList: ['#fade9b', '#7eb3ff'],
//    companybar_chart: echarts.init(document.getElementById('categorywIcds'))
//});

// simple bar chart 
var dom = document.getElementById("villageWise");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    xAxis: {
        type: 'category',
        data: ['Name1', 'Name2', 'Name3', 'Name4', 'Name5', 'Name6', 'Name7']
    },
    yAxis: {
        type: 'value',
        width:'5px'
    },
    series: [{
        data: [0,1000,2000,3000,4000,5000,6000],
        type: 'bar',
        color:'#dbbd56'
        
    }]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
//End//

//});
var studPrimarySclChart = new pieChartFunc({
    data: [{ value: 17, name: 'Boys', }, { value: 33, name: 'Girls' },{ value: 12, name: 'Co-Ed' }],
	colorList: ['#dccdae', '#b39b7d','#806756'],
    companybar_chart: echarts.init(document.getElementById('studPrimaryScl'))
});
var studSecondarySclChart = new pieChartFunc({
    data: [{ value: 17, name: 'Boys', }, { value: 33, name: 'Girls' },{ value: 12, name: 'Co-Ed' }],
	colorList: ['#dccdae', '#b39b7d','#806756'],
    companybar_chart: echarts.init(document.getElementById('studSecondaryScl'))
});
var teacPrimarySclChart = new pieChartFunc({
    data: [{ value: 17, name: 'Boys', }, { value: 33, name: 'Girls' }],
	colorList: ['#edd983', '#c8a042'],
    companybar_chart: echarts.init(document.getElementById('teacPrimaryScl'))
});

var barChartFunc2 = function (options) {
    var vars = {
    data1 : [],
    data2 : [],
	legendtile: [],
    datacity : [],
        config_chart: ''
    };

    this.chart = function (data) {
        
        vars.config_chart.setOption({
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                textStyle: {
                    color: "#b1b1b5"
                },
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 10,
                bottom: 0
            },
            grid: { 
                top: '15%',
                left: '3%',
                right: '4%',
                bottom: '05%',
				height: '65%',
                containLabel: true
            },
            yAxis: [{
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} '
                },
                 axisLine: {
                    show: false,
                  
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid'
                    }
                },
                show: true
        
            }],
            xAxis: [{
                type: 'category',
                  axisLine: {
                    show: false,
                  
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        fontSize: 12,
                        color: '#666'
                    },
        
                },
                
                data: vars.datacity
            }],
            series: [{
                    name: 'Unreserved Area in Sq. m',
                    type: 'bar',
                    stack: 'sum',
                    barWidth: '20px',
                    data: vars.data1,
                    itemStyle: {
                        normal: {
                            color: '#e9946d'
                        }
                    },
        
                },{
                    name: 'Reservation Area in Sq. m',
                    type: 'bar',
                    stack: 'sum',
                    barWidth: '20px',
                    data: vars.data1,
                    itemStyle: {
                        normal: {
                            color: '#ebd888'
                        }
                    },
        
                },
               
				
                 
            ]
        });
    };

    this.reSizeChart = function () {
        vars.config_chart.resize();
    };

    this.construct = function (options) {
        $.extend(vars, options);
    };

    this.construct(options);
};
var frequencyWcciwChart = new barChartFunc2({
    data1 : [20, 50, 80, 58, 83, 68, 57, 80],
    data2 : [50, 70, 60, 61, 75, 87, 60, 62],
	data3 : [20, 50, 80, 58, 83, 68, 57, 80],
	datacity : ['Ward 1','Ward 2','Ward 3','Ward 4', 'Ward 5','Ward 6','Ward 7','Ward 8'],
    config_chart: echarts.init(document.getElementById('frequencyWcciw'))
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
	processortypeChart.chart();
	catSecondarySclChart.chart();
	frequencyWcciwChart.chart();
//	categorywIcdsChart.chart();
	
	studPrimarySclChart.chart();
	studSecondarySclChart.chart();
	
	teacPrimarySclChart.chart();
	teacSecondarySclChart.chart();
	
	
	LoadCurrentReport();
});

$(window).on('resize', function () {
	processortypeChart.reSizeChart();
	catSecondarySclChart.reSizeChart();
	frequencyWcciwChart.reSizeChart();
//	categorywIcdsChart.reSizeChart();
	
	studPrimarySclChart.reSizeChart();
	studSecondarySclChart.reSizeChart();
	
	teacPrimarySclChart.reSizeChart();
	teacSecondarySclChart.reSizeChart();
	
});	