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
var catPrimarySclChart = new pieChartFunc({
    data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],
	colorList: ['#5f3b14','#e1ac67', '#f1c27e'],
    companybar_chart: echarts.init(document.getElementById('catPrimaryScl'))
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
var simpleBarChartFunc = function (options) {
    var vars = {
    data1 : [],
	// singleLagend : '',
	simpleColor : '',
    datacity : [],
        config_chart: ''
    };

    this.chart = function (data) {
        
        vars.config_chart.setOption({
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                show: true,
				icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 10,
				bottom: 0,
            },
            grid: { 
                top: '10%',
                left: '3%',
                right: '4%',
                bottom: '10%',
				height: '90%',
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
                    name: vars.singleLagend,
                    type: 'bar',
                    stack: 'sum',
                    barWidth: '15px',
                    data: vars.data1,
                    itemStyle: {
                        normal: {
                            color: vars.simpleColor
                        }
                    },
        
                }
            ]
			//series : options.series
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


//
var barYfunc = function (options) {
    var vars = {
    		data: [],
    		data1: []
    }

    this.chart = function (data) {
        
        vars.config_chart.setOption({
        	tooltip: {
    	        trigger: 'axis',
    	        axisPointer: {
    	            type: 'shadow'
    	        }
    	    },
    	   
    	    grid: {
    	        left: '3%',
    	        right: '4%',
    	        bottom: '3%',
    	        containLabel: true
    	    },
    	    xAxis: {
    	        type: 'value',
    	        boundaryGap: [0, 0.01]
    	    },
    	    yAxis: {
    	        type: 'category',
    	        data: options.yaxis || vars.data,
    	        
    	    },
    	    series: [
    	        {
    	            name: '25',
    	            type: 'bar',
    	            data: vars.data1,
    	            color:'#efc17d',
    	            width:'5px'
    	        }
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




//Bar-y Category//
//var instituteCategory = document.getElementById("CategorywiseInstitute");
//var myChart = echarts.init(instituteCategory);
//var app = {};
//option = null;
//option = {
//  
//    tooltip: {
//        trigger: 'axis',
//        axisPointer: {
//            type: 'shadow'
//        }
//    },
//   
//    grid: {
//        left: '3%',
//        right: '4%',
//        bottom: '3%',
//        containLabel: true
//    },
//    xAxis: {
//        type: 'value',
//        boundaryGap: [0, 0.01]
//    },
//    yAxis: {
//        type: 'category',
//        data: [ 'Secondary','Primary','College/University'],
//        
//    },
//    series: [
//       
//        {
//            name: '25',
//            type: 'bar',
//            data: [19325, 23438, 31000],
//            color:'#efc17d',
//            width:'5px'
//        }
//    ]
//};
//;
//if (option && typeof option === "object") {
//    myChart.setOption(option, true);
//}
//Bar-y Category End//
//var studPrimarySclChart = new simpleBarChartFunc({
//    data1 : [20, 30, 20, 30],
//    datacity : ['0-20','21-40','41-60','61-80'],
//	//singleLagend : 'No. Of ESR',
//	simpleColor : '#80b2ff',
//    config_chart: echarts.init(document.getElementById('studPrimaryScl')),
//	
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
//var teacSecondarySclChart = new simpleBarChartFunc({
//    data1 : [20, 30, 20, 30],
//    datacity : ['0-20','21-40','41-60','61-80'],
//	//singleLagend : 'No. Of ESR',
//	simpleColor : '#f68bd1',
//    config_chart: echarts.init(document.getElementById('teacSecondaryScl'))
//});



//
var barObj = new barYfunc({
    data: [ 'Secondary','Primary','College/University'],
	data1: [19325, 23438, 31000],
    companybar_chart: echarts.init(document.getElementById('CategorywiseInstitute'))
});

var teacSecondarySclChart = new pieChartFunc({
    data: [{ value: 17, name: 'Boys', }, { value: 33, name: 'Girls' }],
	colorList: ['#edd983', '#c8a042'],
    companybar_chart: echarts.init(document.getElementById('teacSecondaryScl'))
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
	catPrimarySclChart.chart();
	catSecondarySclChart.chart();
//	categorywIcdsChart.chart();
	
	studPrimarySclChart.chart();
	studSecondarySclChart.chart();
	
	teacPrimarySclChart.chart();
	teacSecondarySclChart.chart();
	
	barObj.chart();
	
	LoadCurrentReport();
	
});

$(window).on('resize', function () {
	catPrimarySclChart.reSizeChart();
	catSecondarySclChart.reSizeChart();
//	categorywIcdsChart.reSizeChart();
	
	studPrimarySclChart.reSizeChart();
	studSecondarySclChart.reSizeChart();
	
	teacPrimarySclChart.reSizeChart();
	teacSecondarySclChart.reSizeChart();
	
	barObj.reSizeChart();
	
});	