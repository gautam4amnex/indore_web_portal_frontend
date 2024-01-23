/**
 * 
 */
(function(global, $) {
	
	let pieChartObj;
	let barChartObj;
	let stackBarChart;
	let simpleBarChartObj;
	let lineChartObj;
	let barYChartObj;
	let multiBarChartObj;
	let charts = [];
	
	let dashboardChart = {
			
		setRequiredEvent : function(){
			
			global.dashboardChartsModule.setPieChart();
			global.dashboardChartsModule.setBarChart();
			global.dashboardChartsModule.setSimpleBarChart();
			global.dashboardChartsModule.setStackBarChart();
			global.dashboardChartsModule.setLineChart();
			global.dashboardChartsModule.setYChart();
			global.dashboardChartsModule.setMultiBarChart();
			
		}, setPieChart : function(objOptions = {}){
			
			pieChartObj = function (options = {}) {
			    
				let vars = {
			        data: [],
			        companybar_chart: '',
			        obj : {}
			    };

			    this.chart = function (data) {
			     //   let colorList = ['#ffdd95', '#fc887b', '#7eb3ff', '#86e3ce','#ffdd93'];
			    	
			    	function getRandomColor() {
			    		var letters = '0123456789ABCDEF';
			    		var color = '#';
			    		for (var i = 0; i < 6; i++) {
			    			color += letters[Math.floor(Math.random() * 16)];
			    		}
			    		return color;
			    	}
			    	
			        vars.companybar_chart.setOption({
			            tooltip: {
			                trigger: 'item',
			                formatter: options.formatter ? options.formatter : '{b}: {c}'
			            }, toolbox: {
			            	right : '7%',
			                feature: {
			                    saveAsImage: {
			                    	title : "Export",
			                    	name : "Chart",
			                    	type : "png"
			                    },
			                    /*myTool1: {
			                        show: true,
			                        title: 'PDF Export',
			                        backgroundColor : 'white',
			                        excludeComponents : ['toolbox'],
			                        icon: 'image://https://www.keycdn.com/img/blog/make-a-favicon.png',
			                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
			                        onclick: function (){
			                        	//alert();
			                        	global.dashboardChartsModule.generatePdf(options.companybar_chart._dom.id);
			                        }
			                    }*/
			                }
			            }, grid: {
			                top: '0%',
			                bottom: '0%',
			                left: '0%',
			                right: '0%'
			            }, legend: {
			                show: true,
			                orient: 'horizontal',
			                type : 'scroll',
			                bottom: "0",
			                textStyle: {
			                    color: '#707070',
			                    fontSize: 12,
			                },
			                icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			              //  data: options.legendtile ? options.legendtile : [],
			            }, series: [
			                {
			                    radius: ['35%', '60%'],
			                    center: ['50%', '45%'],
			                    type: 'pie',
			                    itemStyle: {
			                        normal: {
			                            color: function (params) {
//			                                return options.colorList[params.dataIndex]
			                                return getRandomColor()
			                            }
			                        }
			                    },
			                    labelLine: {
			                        normal: {
			                            show: false,
			                        }
			                    }, label: {
			                        show: false
			                    }, 
			                    data: vars.data
			                }, {
			                    radius: ['40%', '15%'],
			                    center: ['50%', '45%'],
			                    type: 'pie',
			                    label: {
			                        normal: {
			                            show: false
			                        }, emphasis: {
			                            show: false
			                        }
			                    }, labelLine: {
			                        normal: {
			                            show: false
			                        }, emphasis: {
			                            show: false
			                        }
			                    }, 
			                    animation: false,
			                    tooltip: {
			                        show: false
			                    }, itemStyle: {
			                        normal: {
			                            color: 'rgba(250,250,250,0.5)'
			                        }
			                    }, data: [{
			                        value: 1,
			                    }]
			                }
			            ]
			        });
			        
			        vars.obj = options.obj ? options.obj : {};
			        
			    };

			    
			    this.clickOnChart = function(obj) {
			    	vars.companybar_chart.on('click', function(params) {
			    		window.dashboardModule.chartClick = true;
			    		if(!obj){
			    			if(!vars.obj.layer_name){
				    			return;
				    		}
			    			vars.obj.color = params.color;
			    			if(vars.obj.layer_name === "Indore 311"){
			    				let obj = {"indore_311": params.data.array, color: params.color};
			    				console.log(obj);
								window.department2dMap.displayDashboardChartDataOnMap(obj);
			    			}else{
			    				vars.obj.logical_operator = "=";
					    		if(!vars.obj.column_name && !params.data.column_name){
									vars.obj.column_name = params.data.name;
								} else if(params.data.column_name){
									vars.obj.column_name = params.data.column_name;
									vars.obj.value = params.data.column_value;
									if(params.data.layer_name){
										vars.obj.layer_name = params.data.layer_name;
									}
								} else{
									vars.obj.value = params.data.name;
									if(vars.obj.column_name === "zone_name" || vars.obj.column_name === "ward_name"){
						    			let temp = params.data.name.toLowerCase();
						    			let t1 = temp.replace(/[^a-zA-Z0-9.-]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/([A-Z])/g, ' $1');
						    			let t2 = t1.charAt(0).toUpperCase() + t1.slice(1);
						    			vars.obj.value = t2.replace(/[a-z](?=\d)/gi, '$& ');
						    		}
								}
					    		if(vars.obj.layer_name === "Injury Data"){
					    			let obj = {layer_name: "Accidents",column_name: vars.obj.column_name, ward_no: vars.obj.ward_no, color: params.color}; 
					    			if(vars.obj.column_name === "number_of_serious_injured"){
					    				obj.column_type = "string";
					    				obj.logical_operator = "<>";
					    				obj.value = "";
					    			}else{
					    				obj.column_type = "number";
					    				obj.logical_operator = ">";
					    				obj.value = "0";
					    			}
					    			console.log(obj);
									window.department2dMap.displayDashboardChartDataOnMap(obj);
					    		}else if(vars.obj.layer_name === "Building"){
					    			let obj = {ward_no: "0", column_type: "string", logical_operator: "=", color: params.color};
					    			if(vars.obj.column_ward_no === "0") {
					    				$u.notify('warning', 'Warning',
					    						'Please select Ward !', '');
					    				return;
					    			}
					    			let ward_no = vars.obj.column_ward_no;
				    				if(vars.obj.value === "2015"){
				    					ward_no = ward_no.length === 1 ? "00" + ward_no : "0" + ward_no;
				    				} 
				    				
				    				if(vars.obj.column_value === "0"){
					    				obj.value = ward_no;
					    				obj.column_name = "ward_no";
					    				obj.column_type = vars.obj.value === "2015" ? "string" : "number";
					    				obj.layer_name = vars.obj.value === "2015" ? "Buildings 2015" : "Buildings 2020";
					    			}else{
					    				obj.column_name_1 = "ward_no";
					    				obj.column_type_1 = vars.obj.value === "2015" ? "string" : "number";
						    			obj.value_1 = ward_no;
						    			
					    				obj.value = vars.obj.column_value;
					    				if(vars.obj.value === "2015"){
						    				obj.layer_name = "Buildings 2015";
						    				obj.column_name = "total_floo";
						    			}else{
						    				obj.layer_name = "Buildings 2020";
						    				obj.column_name = "number_of_floor";
						    			}
					    			}
				    				
					    			console.log(obj);
					    			window.department2dMap.displayDashboardChartDataOnMap(obj);
					    		}else{
					    			console.log(vars.obj);
									window.department2dMap.displayDashboardChartDataOnMap(vars.obj);
					    		}
			    			}
			    			
							$('.map-info-tab-link').click();
			    		}else{
			    			if(!obj.layer_name){
				    			return;
				    		}
				    		
							obj.column_name = params.data.column_name;
							obj.value = params.data.name;
							obj.logical_operator = "=";
							obj.color = params.color;
							
							console.log(obj);
							window.department2dMap.displayDashboardChartDataOnMap(obj);
							$('.map-info-tab-link').click();
			    		}
			    		
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
			
		}, setBarChart : function(optionObj = {}){
			
			barChartObj = function (options = {}) {
			    let vars = {
			        xAxisbar: [],
			        bardata: [],
			        bardata1: [],
			        legendtile: [],
			        series : [],
			        bar_chart: '',
			    }
			    
			    this.chart = function (Data) {
			        vars.bar_chart.setOption({
			         	legend: options.legend ? options.legend : {
							show: true,
							type : 'scroll',
			                textStyle: {
			                    color: "#b1b1b5"
			                },
							data: options.legendtile,
			                icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
			                bottom: options.legend_bottom ? options.legend_bottom : 0
			            }, toolbox: {
			                feature: {
			                    saveAsImage: {
			                    	title : "Export",
			                    	name : "Chart",
			                    	type : "png"
			                    }, 
			                    /*myTool1: {
			                        show: true,
			                        title: 'PDF Export',
			                        backgroundColor : 'white',
			                        excludeComponents : ['toolbox'],
			                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
			                        onclick: function (){
			                        	global.dashboardChartsModule.generatePdf(options.bar_chart._dom.id);
			                        }
			                    }*/
			                }
			            }, tooltip: {
			                trigger: 'axis',
			                axisPointer: {
			                    type: 'shadow'
			                }
			            }, grid: options.grid ? options.grid :{
							top: options.top ? options.top : '3%',
			                left: options.left ? options.left : '3%',
			                right: '4%',
			                bottom: options.grid_height ? options.grid_height :  '18%',
							/*height: options.height ? options.height : '70%',*/
			                containLabel: true
			            }, 
			            dataZoom: options.dataZoom ? options.dataZoom : [{
							type: 'inside',
							start: 1,
							end: 40,
							
						}, {
							type: 'slider',
							showDetail: false,
						}],
			            xAxis: [{
			                type: 'category',
			                data: vars.xAxisbar,
			                name : options.xname ? options.xname : '',
			                nameLocation : 'center', 
			                nameTextStyle: options.nameXTextStyle ? options.nameXTextStyle : {
			                    padding: [10, 0, 0, 0]
			                },
			                axisLine: {
			                    show: false,
			                    lineStyle: {
			                        color: "#063374",
			                        width: 1,
			                        type: "solid"
			                    }
			                }, axisTick: {
			                    show: false,
			                }, axisLabel: {
			                    show: true,
			                    textStyle: {
			                        color: "#b1b1b5",
			                    },
			                    rotate: options.rotate ? options.rotate : 0,
			                    interval: options.xinterval ? options.xinterval : 0,		
			                    formatter: options.formatter ? options.formatter : function (value, index) {return value}
			                }
			            }],
			            yAxis: [{
			                type: 'value',
			                name : options.yname ? options.yname : '',
					        nameLocation : 'center',
					        nameTextStyle: options.nameYTextStyle ? options.nameYTextStyle : {
			                    padding: [0, 0, 17, 0]
			                },
//			                axisLabel: {
//			                    formatter: '{value} %'
//			                }, 
			                axisLabel: {
			                	formatter: '{value} %',
			                    show: true,
			                    textStyle: {
			                        color: "#000",
			                    },
			                }, axisTick: {
			                    show: false,
			                }, axisLine: {
			                    show: false,
			                    lineStyle: {
			                        color: "#00c7ff",
			                        width: 1,
			                        type: "solid"
			                    }
			                }, splitLine: {
			                    show:true,
			                }
			            }],
			            series: options.series
			        });
			    }
			    
			    this.reSizeChart = function () {
			        vars.bar_chart.resize();
			    }

			    this.Contractorstruct = function (options) {
			        $.extend(vars, options);
			    }

			    this.Contractorstruct(options);
			}
			
		}, setSimpleBarChart : function(optionObj = {}){
			
			simpleBarChartObj = function (options) {
				
			    let vars = {
			    		data1 : [],
			    		singleLagend : '',
			    		datacity : [],
			    		config_chart: '',
			    		obj : {}
			    };

			    this.chart = function (data) {
			    	
			    	function getRandomColor() {
			    		var letters = '0123456789ABCDEF';
			    		var color = '#';
			    		for (var i = 0; i < 6; i++) {
			    			color += letters[Math.floor(Math.random() * 16)];
			    		}
			    		return color;
			    	}
			    	
//			    	var colors = ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#a16735','#dfc2a9','#c39c4f'];
			    	
			    	let series_data = options.series[0].data.map(function(x){
//                    	return {value: x, itemStyle: {color: colors[Math.floor(Math.random() * colors.length)]}};
			    		return {value: x, itemStyle: {color: getRandomColor()}};
                    	
                    });
			    	
			        vars.config_chart.setOption({
//			            tooltip: {
//			                trigger: 'axis',
//			            }, 
			            toolbox: {
			            	right : '6%',
			            	top : '-2%',
			                feature: {
			                    saveAsImage: {
			                    	title : 'Export',
			                    	name : 'Chart',
			                    	type : "png"
			                    }, 
			                    /*myTool1: {
			                        show: true,
			                        title: 'PDF Export',
			                        backgroundColor : 'white',
			                        excludeComponents : ['toolbox'],
			                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
			                        onclick: function (){
			                        	global.dashboardChartsModule.generatePdf(options.config_chart._dom.id);
			                        }
			                    }*/
			                }
			            }, legend: options.legend ? options.legend : {
			                textStyle: {
			                    color: "#b1b1b5"
			                },
			                icon: 'circle',
			                type : 'scroll',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
			                bottom: 0,
			                data: options.legendtitle ? options.legendtitle : [] 
			            }, tooltip: {
			                trigger: 'axis',
			                axisPointer: {
			                    type: 'shadow'
			                }
			            }, grid: options.grid ? options.grid : { 
			                top: '10%',
			                left: '3%',
			                right: '4%',
			                bottom: '10%',
							height: '80%',
			                containLabel: true
			            }, dataZoom: options.dataZoom ? options.dataZoom : [{
							type: 'inside',
							start: 1,
							end: 20
						}, {
							type: 'slider',
							showDetail: false,
						}],
			            yAxis: [{
//			            	name:options.namey,
			            	minInterval:1,
			                type: 'value',
			                name : options.yname ? options.yname : '',
			                nameLocation : 'center', 
			                nameTextStyle: options.nameYTextStyle ? options.nameYTextStyle : {
			                    padding: [0, 0, 17, 0]
			                }, axisLabel: {
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
//			            	name:options.namex,
			                type: 'category',
			                axisLine: {
			                    show: false,
			                  
			                },
			                name : options.xname ? options.xname : '',
					        nameLocation : 'center',
			                nameTextStyle: options.nameXTextStyle ? options.nameXTextStyle : {
			                    padding: [10, 0, 0, 0]
			                },
			                axisTick: {
			                    show: false,
			                },
			                axisLabel: {
//			                    interval: 0,
			                    rotate: options.rotate ? options.rotate : 0,
			                    interval: options.xinterval ? options.xinterval : 0,		
			                    formatter: options.formatter ? options.formatter : function (value, index) {return value},
			                    show: true,
			                    splitNumber: 15,
			                    textStyle: {
			                        fontSize: 12,
			                        color: '#666'
			                    }
			                },
			                data: options.datacity
			            }],
//			            series: options.series
			            series: [{
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: series_data
		                }]
			        });
			        vars.obj = options.obj ? options.obj : {};
			    };

			    this.clickOnChart = function() {
			    	
			    	vars.config_chart.on('click', function(params) {
			    		window.dashboardModule.chartClick = true;
			    		if(!vars.obj.layer_name){
			    			return;
			    		}
			    		vars.obj.color = params.color;
			    		vars.obj.value = params.name;
			    		vars.obj.logical_operator = "=";
			    		if(vars.obj.column_name_1 && vars.obj.column_name_1 === "no_of_icu"){
			    			vars.obj.value_1 = params.value;
			    		}
						
			    		if(vars.obj.column_name === "zone_name" || vars.obj.column_name === "ward_name"){
			    			let temp = params.name.toLowerCase();
			    			let t1 = temp.replace(/[^a-zA-Z0-9.-]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/([A-Z])/g, ' $1');
			    			let t2 = t1.charAt(0).toUpperCase() + t1.slice(1);
			    			vars.obj.value = t2.replace(/[a-z](?=\d)/gi, '$& ');
			    			console.log(vars.obj);
							window.department2dMap.displayDashboardChartDataOnMap(vars.obj);
			    		} else if(vars.obj.column_name === "floor_type"){// FOR BUILDING DETAILS IN IMC DASHBOARD
			    			let obj = {ward_no: "0", column_type: "string", color: params.color};
			    			if(vars.obj.column_ward_no === "0") {
			    				$u.notify('warning', 'Warning',
			    						'Please select Ward !', '');
			    				return;
			    			}else{
			    				let ward_no = vars.obj.column_ward_no;
			    				if(params.name === "2015"){
			    					ward_no = ward_no.length === 1 ? "00" + ward_no : "0" + ward_no;	
			    				}
				    			
				    			if(vars.obj.column_value === "0"){
				    				obj.value = ward_no;
				    				obj.column_name = "ward_no";
				    				obj.column_type = params.name === "2015" ? "string" : "number";
				    				obj.layer_name = params.name === "2015" ? "Buildings 2015" : "Buildings 2020";
				    			}else{
				    				obj.column_name_1 = "ward_no";
				    				obj.column_type_1 = params.name === "2015" ? "string" : "number";
					    			obj.value_1 = ward_no;
					    			
				    				obj.value = vars.obj.column_value;
				    				if(params.name === "2015"){
					    				obj.layer_name = "Buildings 2015";
					    				obj.column_name = "total_floo";
					    			}else{
					    				obj.layer_name = "Buildings 2020";
					    				obj.column_name = "number_of_floor";
					    			}
				    			}
				    			obj.logical_operator = "=";
				    			console.log(obj);
								window.department2dMap.displayDashboardChartDataOnMap(obj);
			    			}		    			
			    		}
			    		else{
			    			console.log(vars.obj);
							window.department2dMap.displayDashboardChartDataOnMap(vars.obj);
			    		}
			    		
			    		
						$('.map-info-tab-link').click();
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
			
		}, setStackBarChart : function(objOptions = {}){
			
			/*var barChartObj = new barChartFunc({
		    data1 : [20, 30, 20, 30, 20],
		    data2 : [9, 30, 9, 60, 70],
		    data3 : [20, 30, 20, 30, 20],
		    data4 : [9, 30, 9, 40, 70],
		    datacity : ['Ward 1','Ward 2','Ward 3','Ward 4'],
		    config_chart: echarts.init(document.getElementById('bar_chart'))
		}); */
			
			stackBarChart = function (options) {
			    let vars = {
			    	data1 : [],
			    	data2 : [],
			    	data3 : [],
			    	data4 : [],
			    	datacity : [],
			        config_chart: ''
			    };

			    this.chart = function (data) {
			        
			        vars.config_chart.setOption({
			            tooltip: {
			                trigger: 'axis',
			            }, toolbox: {
			            	right : '7%',
			                feature: {
			                    saveAsImage: {
			                    	title : 'Export',
			                    	name : 'Chart',
			                    	type : "png"
			                    }, 
			                    /*myTool1: {
			                        show: true,
			                        title: 'PDF',
			                        backgroundColor : 'white',
			                        excludeComponents : ['toolbox'],
			                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
			                        onclick: function (){
			                        	global.dashboardChartsModule.generatePdf(options.config_chart._dom.id);
			                        }
			                    }*/
			                }
			            }, legend: {
			                textStyle: {
			                    color: "#b1b1b5"
			                },
			                icon: 'circle',
			                type : 'scroll',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
			                bottom: 0,
			              //  data: options.legendtitle ? options.legendtitle : [] 
			            },
			            grid: options.grid,
			            dataZoom: options.dataZoom ? options.dataZoom : [{
							type: 'inside',
							start: 1,
							end: 40
						}, {
							type: 'slider',
							showDetail: false,
						}],
			            yAxis: [{
			                type: 'value',
			            
			                name : options.yname ? options.yname : '',
			                minInterval : options.ymininterval ? options.ymininterval : 0,
			                nameLocation : 'center', 
			                nameTextStyle: options.nameYTextStyle ? options.nameYTextStyle : {
			                    padding: [0, 0, 17, 0]
			                },
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
			                name : options.xname ? options.xname : '',
					        nameLocation : 'center',
			                nameTextStyle: options.nameXTextStyle ? options.nameXTextStyle : {
			                    padding: [10, 0, 0, 0]
			                },
			                axisTick: {
			                    show: false,
			                },
			                axisLabel: {
//			                    interval: 0,
			                    show: true,
			                    splitNumber: 15,
			                    rotate : options.rotate ? options.rotate : 0,
			                    interval: options.xinterval ? options.xinterval : 0,
			                    formatter: options.formatter ? options.formatter : function (value, index) {return value},
			                    textStyle: {
			                        fontSize: 12,
			                        color: '#666'
			                    },
			                },
			                data: options.datacity
			            }],
			            series: options.series
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
			
		}, setLineChart : function(options){
			
			lineChartObj = function (options) {
			   

			    this.construct = function (options) {
			        $.extend(vars, options);
			    };

			    this.construct(options);

			    this.chart = function (hours, days, data) {

			        vars.barLine_chart.setOption({
			            
			            tooltip: options.tooltip ? options.tooltip : {
			                trigger: 'axis',
			            }, legend: options.legend ? options.legend : {
			                show: true,
							bottom: 0,
							data: options.legendtitle ? options.legendtitle : [] 
			            }, toolbox: options.toolbox ? options.toolbox : {
			            	right : '7%',
			                feature: {
			                    saveAsImage: {
			                    	title : 'Export',
			                    	name : 'Chart',
			                    	type : "png"
			                    }, 
			                    /*myTool1: {
			                        show: true,
			                        title: 'PDF',
			                        backgroundColor : 'white',
			                        excludeComponents : ['toolbox'],
			                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
			                        onclick: function (){
			                        	global.dashboardChartsModule.generatePdf(options.barLine_chart._dom.id);
			                        }
			                    }*/
			                }
			            }, grid: options.grid ? options.grid : {
			                top: '10%',
			                left: '3%',
			                right: '4%',
			                bottom: '15%',
			                containLabel: true
			             
			            }, dataZoom: options.dataZoom ? options.dataZoom : [{
							type: 'inside',
							start: 1,
							end: 40
						}, {
							type: 'slider',
							showDetail: false,
						}], yAxis: options.yAxis ? options.yAxis : [{
			                type: 'value',
			                name : options.yname ? options.yname : '',
			                nameLocation : 'center', 
			                minInterval : options.ymininterval ? options.ymininterval : 0,
			                nameTextStyle: options.nameYTextStyle ? options.nameYTextStyle : {
			                    padding: [0, 0, 17, 0]
			                }, axisLabel: {
			                    show: true,
			                    interval: options.yinterval ? options.yinterval : 'auto',
			                    formatter: '{value} '
			                }, splitLine: {
			                    show: true,

			                }, axisLine: {
			                    show: false
			                }, axisTick: {
			                    show: false
			                },
			                show: true
			            }],
			            xAxis: options.xAxis ? options.xAxis : [{
			                type: 'category',
			                name : options.xname ? options.xname : '',
					        nameLocation : 'center',
			                nameTextStyle: options.nameXTextStyle ? options.nameXTextStyle : {
			                    padding: [10, 0, 0, 0]
			                }, axisLabel: {
			                    interval:  0,
			                    show: true,
			                    splitNumber: 15,
			                    rotate : options.rotate ? options.rotate : 0,
			                    formatter: options.formatter ? options.formatter : function (value, index) {return value},
			                    textStyle: {
			                        fontSize: 12,
			                        color:'#666',
			                    },
			                },
			                axisTick: {
			                    show: false
			                },
			                axisLine: {
			                    show: false
			                },
			                data: options.datacity
			            }],
			            series: options.series
			        });
			    };

			    this.reSizeChart = function () {
			        vars.barLine_chart.resize();
			    };
			};
			
		}, setYChart : function(options = {}){
			
			barYChartObj = function (options) {
				

				let vars = {
					data: [],
					data1: []
				}
				
				this.construct = function (options) {
					$.extend(vars, options);
				};

				this.construct(options);


				this.chart = function (data) {
						        
					vars.config_chart.setOption({
						tooltip: options.tooltip ? options.tooltip : {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow'
							},
							feature: {
			                    saveAsImage: {
			                    	title : 'Export',
			                    	name : 'Chart',
			                    	type : "png"
			                    }, 
			                    /*myTool1: {
			                        show: true,
			                        title: 'PDF',
			                        backgroundColor : 'white',
			                        excludeComponents : ['toolbox'],
			                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
			                        onclick: function (){
			                        	global.dashboardChartsModule.generatePdf(options.barLine_chart._dom.id);
			                        }
			                    }*/
			                }
						}, grid: options.grid ? options.grid : {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						}, xAxis:  {
							type: 'value',
							boundaryGap: [0, 0.01]
						}, yAxis: {
							type: 'category',
							data: options.yaxis ? options.yaxis : vars.data,
							
						}, series: options.series ? options.series : [
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
			};
		},setMultiBarChart : function(){
			
			multiBarChartObj = function(options){
				
			    let vars = {
			    	config_chart: '',
			    	obj : {}
			    };
			    
			    var labelOption = {
			    	    show: true,
//			    	    position: app.config.position,
//			    	    distance: app.config.distance,
//			    	    align: app.config.align,
//			    	    verticalAlign: app.config.verticalAlign,
			    	    rotate: 90,
			    	    formatter: '{name|{a}}',
			    	    fontSize: 12,
			    	    rich: {
			    	        name: {
			    	            textBorderColor: '#fff'
			    	        }
			    	    }
			    };
			    
				this.construct = function (options) {
			        $.extend(vars, options);
			    };

			    this.construct(options);

			    this.chart = function (data) {
			    	
			    	function getRandomColor() {
			    		var letters = '0123456789ABCDEF';
			    		var color = '#';
			    		for (var i = 0; i < 6; i++) {
			    			color += letters[Math.floor(Math.random() * 16)];
			    		}
			    		return color;
			    	}
			    	
			    	vars.config_chart.setOption({
//			        	color: options.color ? options.color : ['#f0c27a','#a16735','#dfc2a9','#c39c4f'],
			        	color:[getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()],
			            tooltip: {
			                trigger: 'axis',
			                axisPointer: {
			                    type: 'shadow'
			                }
			            },
			            legend: {
			                data: options.legend && options.legend.data ? options.legend.data : []
			            },
			            dataZoom: options.dataZoom ? options.dataZoom : [{
							type: 'inside',
							start: 1,
							end: 30
						}, {
							type: 'slider',
							showDetail: false,
						}],
			            toolbox: {
			                show: true,
			                orient: 'vertical',
			                left: 'right',
			                top: 'center',
			                feature: {
			                	saveAsImage: {
			                    	title : 'Export',
			                    	name : 'Chart',
			                    	type : "png"
			                    }, 
			                }
			            },
			            xAxis: options.xAxis ? options.xAxis : [
			                {
			                    type: 'category',
			                    axisTick: {show: false},
			                    data: ['2012', '2013', '2014', '2015', '2016'],
				                axisLabel: {
				                    interval: 0,
				                    rotate: 30,		
				                    formatter: function (value, index) {return value},
				                    show: true,
				                    splitNumber: 15,
				                    textStyle: {
				                        fontSize: 12,
				                        color: '#666'
				                    }
				                }
			                }
			            ],
			            yAxis: options.yAxis ? options.yAxis : [
			                {
			                    type: 'value',
//			                    name : 'Collection Amount'
			                }
			            ],
			            series: options.series ? options.series : [
			                {
			                    name: 'Forest',
			                    type: 'bar',
			                    barGap: 0,
			                    label: labelOption,
			                    data: [320, 332, 301, 334, 390]
			                },
			                {
			                    name: 'Steppe',
			                    type: 'bar',
			                    label: labelOption,
			                    data: [220, 182, 191, 234, 290]
			                },
			                {
			                    name: 'Desert',
			                    type: 'bar',
			                    label: labelOption,
			                    data: [150, 232, 201, 154, 190]
			                },
			                {
			                    name: 'Wetland',
			                    type: 'bar',
			                    label: labelOption,
			                    data: [98, 77, 101, 99, 40]
			                }
			            ]
			        });
			    	vars.obj = options.obj ? options.obj : {};
			    };

			    this.clickOnChart = function() {
			    	
			    	vars.config_chart.on('click', function(params) {
			    		window.dashboardModule.chartClick = true;
			    		var filter_obj = {column_name: vars.obj.column_name, column_type: vars.obj.column_type, ward_no: vars.obj.ward_no, color: params.color};
			    		filter_obj.logical_operator = "=";
			    		if(!vars.obj.layer_name){
			    			filter_obj.layer_name = params.seriesName;
			    			if(params.seriesName === "College"){
			    				filter_obj.layer_name = "Colleges Universities";
			    			}
			    		}
			    		filter_obj.value = params.name;
			    		if(filter_obj.column_name === "zone_name" || filter_obj.column_name === "ward_name"){
			    			let temp = params.name.toLowerCase();
			    			let t1 = temp.replace(/[^a-zA-Z0-9.-]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/([A-Z])/g, ' $1');
			    			let t2 = t1.charAt(0).toUpperCase() + t1.slice(1);
			    			filter_obj.value = t2;
			    		}
			    		if(vars.obj.column_name_1 && !vars.obj.value_1){
			    			filter_obj.column_name_1 = vars.obj.column_name_1;
			    			filter_obj.column_type_1 = vars.obj.column_type_1;
			    			filter_obj.value_1 = params.value;
			    		}
						console.log(filter_obj);
						window.department2dMap.displayDashboardChartDataOnMap(filter_obj);
						$('.map-info-tab-link').click();
					});
				};
			    
				this.reSizeChart = function () {
					vars.config_chart.resize();
				};
			};
			
			
		}, getBarYChart : function() { 
			return barYChartObj;
		}, getPieChart : function(){
			return pieChartObj;
		}, getBarChart : function(){
			return barChartObj; 
		}, getSimpleBarChart : function(){
			return simpleBarChartObj; 
		}, getLineChart : function(){
			return lineChartObj;
		}, getMultiBarChart : function(){
			return multiBarChartObj;
		}, resizeMultiBarChart : function(){
			multiBarChartObj.reSizeChart();
		}, resizeBarYChart : function(){
			barYChartObj.reSizeChart();
		}, resizePieChart : function(){
			pieChartObj.reSizeChart();
		}, resizeBarChart : function(){
			barChartObj.reSizeChart();
		}, resizeSimpleBarChart : function(){
			simpleBarChartObj.reSizeChart();
		}, resizeLineChartObj : function(){
			lineChartObj.reSizeChart();
		}, resizeChart : function(){
			/*global.dashboardChartsModule.resizePieChart();
			global.dashboardChartsModule.resizeChart();
			global.dashboardChartsModule.resizeStackBarChart();
			global.dashboardChartsModule.resizeSimpleBarChart();
			global.dashboardChartsModule.resizeLineChartObj();*/
			
			for(let obj in charts){
				global.dashboardChartsModule.chartResize(obj);
				/*let chart = charts[obj];
				if(chart){
					chart.reSizeChart();
				}*/
			}
			
		}, getStackBarChart : function(){
			return stackBarChart;
		}, resizeStackBarChart : function(){
			stackBarChart.reSizeChart();
		}, 
//		getSimpleBarChart : function(){
//			return simpleBarChartObj;
//		}, 
//		resizeSimpleBarChart : function(){
//			simpleBarChartFunc.reSizeChart();
//		}, 
		generatePdf : function(id){
			//$("#" + id).css("background-color", "white");
			html2canvas($("#" + id), {
                scale : 5,
				onrendered: function(canvas) {
                	$u.getBase64ImageByXHR(global.tableProperties.rmc_logo, function(imagedata){
                		let pdf = new jsPDF("p", "px", "a4");
                		pdf.setTextColor(40);
                		pdf.setFontStyle('normal');
                		pdf.addImage(imagedata, 'png', 30, 15, 40, 40);
                		pdf.myText(global.contents.rajkot_municipal_corporation, {align: "center"}, 0, 30);
                		let pdfWidth;
                		let pdfHeight;
                		const dataURL = canvas.toDataURL('image/jpeg', 1.0);
                		if(canvas.width > pdf.internal.pageSize.width){
                			pdfWidth = pdf.internal.pageSize.width - 70;
                			pdfHeight = ((pdf.internal.pageSize.height * pdfWidth) / pdfWidth) / 6;
                			pdf.addImage(dataURL, 'JPEG', 30, 70, pdfWidth, pdfHeight);
                		} else {
                			//pdfWidth = canvas.width;
                			//pdfHeight = canvas.height;
                			pdf.addImage(dataURL, 'JPEG', 30, 70);
                		}
                		/*canvas.height = pdfHeight;
                		canvas.width = pdfWidth;*/
                		
                		/*const imgProps= pdf.getImageProperties(dataURL);*/
                    	//pdf.addImage(dataURL, 'JPEG', 10, 40 , pdfWidth, pdfHeight);
                    	 
                    	
                    	let totalPages = pdf.internal.getNumberOfPages();
						for (let i = 1; i <= totalPages; i++) {
							pdf.setPage(i);
							pdf.setTextColor(150);
							pdf.setFontSize(10);
							pdf.text(5, pdf.internal.pageSize.height - 7, global.contents.rajkot_city_gis);
							pdf.text(pdf.internal.pageSize.width - 20, pdf.internal.pageSize.height - 7, i.toString());
							pdf.setTextColor(150);
							pdf.setFontSize(8);
							pdf.text((pdf.internal.pageSize.width / 2)-30, pdf.internal.pageSize.height - 7, global.contents.copyright);
						}
                    	pdf.save("download.pdf");
                	});
                }
            });
		}, addChart : function(chart, id){
			
			try{
				charts[id] = chart;
			} catch (e) {
				console.error(e);
			}
			
		}, getChart : function(id){
			
			try{
				return charts[id];
			} catch(e){
				console.error(e);
			}
			
		}, chartResize : function(id){
			
			try {
				setTimeout(function(){ 
					charts[id].reSizeChart();
				}, 300);
				
			} catch (e) {
				console.error(e);
			}
			
		}
	}

	global.dashboardChartsModule = dashboardChart;

})(window, jQuery);