/**
 * 
 */
(function(global, $) {
	
	let wardid = "electricWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('ward_wise_street_lights'));
				echarts.dispose(document.getElementById('ward_wise_transformers'));
				echarts.dispose(document.getElementById('ward_wise_smart_led_count'));
				echarts.dispose(document.getElementById('watt_wise_smart_led_distribution'));
//				echarts.dispose(document.getElementById('electricPole'));
//				echarts.dispose(document.getElementById('totalHtLines'));
//				echarts.dispose(document.getElementById('totalLtLines'));
//				echarts.dispose(document.getElementById('totalTransformer'));
//				echarts.dispose(document.getElementById('wardWiseHtTowers'));
//				echarts.dispose(document.getElementById('wardWiseJunctionBox'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(response){
			
			try{
				global.electricDashboardModule.setRequiredEvent();
			} catch (e) {}
			
			try {
				$(".total-street-light").text(response.total_street_light);
				$(".total-street-light").attr('title', response.total_street_light);
			} catch (e) {}
			
			try {
				$(".total-electric-poles").text(response.total_electric_poles);
				$(".total-electric-poles").attr('title', response.total_electric_poles);
			} catch (e) {}
			
			try {
				$(".total-transformers").text(response.total_transformers);
				$(".total-transformers").attr('title', response.total_transformers);
			} catch (e) {}
			
			try {
				$(".total-ht-line").text(response.total_ht_line);
				$(".total-ht-line").attr('title', response.total_ht_line);
			} catch (e) {}
			
			try {
				$(".total-lt-line").text(response.total_lt_line);
				$(".total-lt-line").attr('title', response.total_lt_line);
			} catch (e) {}
				
			try {
				$(".total-ht-tower").text(response.total_ht_tower);
				$(".total-ht-tower").attr('title', response.total_ht_tower);
			} catch (e) {}
			
			try {
				$(".total-juncion-box").text(response.total_junction_box);
				$(".total-juncion-box").attr('title', response.total_junction_box);
			} catch (e) {}
			
			try {
				$(".total_smart_led").text(response.total_smart_led);
				$(".total_smart_led").attr('title', response.total_smart_led);
			} catch (e) {}
			
			try {
				let obj = {"schema_name":"map","table_name":"tbl_street_light"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
				
//				obj = {"schema_name":"map","table_name":"tbl_electric_pole"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
				
				obj = {"schema_name":"map","table_name":"tbl_transformers"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
				
//				obj = {"schema_name":"map","table_name":"tbl_ht_lines"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
				
//				obj = {"schema_name":"map","table_name":"tbl_lt_lines"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
				
				obj = {"schema_name":"map","table_name":"tbl_ht_tower"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
				
//				obj = {"schema_name":"map","table_name":"tbl_electric_junction_box"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
				
				
			}catch (e) {}
			
			let lineChartObj = global.dashboardChartsModule.getLineChart();
			
			if(lineChartObj){
				/*new lineChartObj({
					datacity: response.type_wise_transformer.transformers,
					rotate: 35,
					yinterval : 1,
					xinterval : 0,
					ymininterval : 1,
					grid : {
		                top: '10%',
		                left: '3%',
		                right: '4%',
		                bottom: '15%',
		                containLabel: true
		            }, legend: {
		                show: true,
						bottom: 0,
						data : response.type_wise_transformer.transformers
		            },
					formatter: function (value, index) {
					    if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
	                xname : '(Transformers)',
					yname : '(Count)',
				    series: [{
				    	name: 'Type Wise',
		                type: 'bar',
		                barWidth: '20px',
	                    data: response.type_wise_transformer.type_wise_counts,
	                    itemStyle: {
	                        color: '#956b39'
	                    }
		            }, {
	                    name: 'Voltage Wise',
	                    data: response.type_wise_transformer.voltage_wise_counts,
	                    type: "line",
	                    smooth: false,
	                    showAllSymbol: true,
	                    symbol: "circle",
	                    symbolSize: 10,
	                    itemStyle: {
	                        color: "#e1ac67",
	                    }, lineStyle: {
	                        color: "#e1ac67",
	                        width: 2
	                    }
		            }],
				    barLine_chart: echarts.init(document.getElementById('totalTransformer'))
				}).chart();*/
			}
			
			let pieChartFunc = global.dashboardChartsModule.getPieChart();
			if(pieChartFunc){
				
//				let p1 = new pieChartFunc({
//					/*data: [{ value: 17, name: 'Small', }, { value: 23, name: 'Large' }],*/
//					data: response.category_wise_street_light,
//					colorList: ['#e1ac67', '#f1c27e'],
//				    companybar_chart: echarts.init(document.getElementById('catStreetLight'))
//				});
//				p1.chart();
//				p1.clickOnChart();
				
//				let p2 = new pieChartFunc({
//					/*data: [{ value: 17, name: 'Manual', }, { value: 23, name: 'Automatic' }],*/
//					data: response.category_wise_street_light,
//					colorList: ['#c99f46','#ecd785'],
//				    companybar_chart: echarts.init(document.getElementById('categorywise_Light'))
//				});
//				p2.chart();
//				p2.clickOnChart();

//				let p3 = new pieChartFunc({
//					/*data: [{ value: 17, name: '5wt', }, { value: 23, name: '10wt' }],*/
//					data : response.voltage_wise_street_light,
//					colorList: ['#c99f46','#ecd785'],
//				    companybar_chart: echarts.init(document.getElementById('waltagewise-Streetlight'))
//				});
//				p3.chart();
//				p3.clickOnChart();
				
//				let p4 = new pieChartFunc({
//					/*data: [{ value: 10, name: 'Solar', }, { value: 23, name: 'Non-Solar' }],*/
//					data: response.pole_type_wise_electric_pole,
//					colorList: ['#e6ae5b','#e7c27b'],
//				    companybar_chart: echarts.init(document.getElementById('electricPole'))
//				});
//				p4.chart();
//				p4.clickOnChart();
				
//				let p5 = new pieChartFunc({
//					/*data: [{ value: 11, name: '11kv', }, { value: 13, name: '13kv' }],*/
//					data: response.voltage_wise_ht_line,
//					colorList: ['#c59b4f','#956b39'],
//				    companybar_chart: echarts.init(document.getElementById('totalHtLines'))
//				});
//				p5.chart();
//				p5.clickOnChart();
				
//				let p6 = new pieChartFunc({
//					/*data: [{ value: 23, name: 'less than 1kv', }, { value: 11, name: 'other' }],*/
//					data: response.voltage_wise_lt_line,
//					colorList: ['#956b39','#c59b4f'],
//				    companybar_chart: echarts.init(document.getElementById('totalLtLines'))
//				});
//				p6.chart();
//				p6.clickOnChart();
				
//				let p7 = new pieChartFunc({
//					/*data: [{ value: 23, name: 'less than 1kv', }, { value: 11, name: 'other' }],*/
//					data: response.ward_wise_transformer,
//					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
//				    companybar_chart: echarts.init(document.getElementById('totalTransformer'))
//				});
//				p7.chart();
//				p7.clickOnChart();
				
//				let p8 = new pieChartFunc({
//					/*data: [{ value: 23, name: 'less than 1kv', }, { value: 11, name: 'other' }],*/
//					data: response.ward_wise_ht_tower,
//					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
//				    companybar_chart: echarts.init(document.getElementById('wardWiseHtTowers'))
//				});
//				p8.chart();
//				p8.clickOnChart();
				
//				let p9 = new pieChartFunc({
//					/*data: [{ value: 23, name: 'less than 1kv', }, { value: 11, name: 'other' }],*/
//					data: response.ward_wise_junction_box,
//					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
//				    companybar_chart: echarts.init(document.getElementById('wardWiseJunctionBox'))
//				});
//				p9.chart();
//				p9.clickOnChart();
				
				let p10 = new pieChartFunc({
					/*data: [{ value: 23, name: 'less than 1kv', }, { value: 11, name: 'other' }],*/
					data: response.watt_wise_smart_led_distribution,
					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b',
						'#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b',
						'#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b',
						'#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b',
						'#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b',
						'#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b',
						'#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
				    companybar_chart: echarts.init(document.getElementById('watt_wise_smart_led_distribution')),
				    obj : {layer_name: "Smart Street Light", column_name: "led_wattage", column_type: "string",
					ward_no: global.electricDashboardModule.getSelectedWardNo()}
				});
				p10.chart();
				p10.clickOnChart();
			}
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b1 = new simpleBarChartObj({
					datacity: response.street_light_wards,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Ward Name',
					yname : 'No. of Street Lights',
					bottom: '2%',
					top: '2%',
		            grid: { 
		                top: '15%',
		                left: '3%',
		                right: '4%',
		                bottom: '05%',
						height: '65%',
						containLabel: true
		            },
					legendtitle : 'Ward Name',
					config_chart: echarts.init(document.getElementById("ward_wise_street_lights")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 27, 0]
	                }, formatter: function (value, index) {
					    if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
		            dataZoom: [{
						type: 'inside',
						start: 1,
						end: 10
					}, {
						type: 'slider',
						showDetail: false,
					}],
					series: [{
//	                    name: 'No. Of Routes',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: response.ward_wise_street_lights,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Street Light", column_name: "ward_name", column_type: "string",
						ward_no: global.electricDashboardModule.getSelectedWardNo()}
				});
				b1.chart();
				b1.clickOnChart();
				
				
				let b2 = new simpleBarChartObj({
					datacity: response.transformers_wards,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Ward Name',
					yname : 'No. of Transformers',
					bottom: '2%',
					top: '2%',
		            grid: { 
		                top: '15%',
		                left: '3%',
		                right: '4%',
		                bottom: '05%',
						height: '65%',
						containLabel: true
		            },
					legendtitle : 'Ward Name',
					config_chart: echarts.init(document.getElementById("ward_wise_transformers")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 27, 0]
	                }, formatter: function (value, index) {
					    if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
					series: [{
//	                    name: 'No. Of Routes',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: response.ward_wise_transformers,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Transformers", column_name: "ward_name", column_type: "string",
						ward_no: global.electricDashboardModule.getSelectedWardNo()}
				});
				b2.chart();
				b2.clickOnChart();
				
				let b3 = new simpleBarChartObj({
					datacity: response.smart_led_wards,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Ward Name',
					yname : 'No. of Smart LED',
					bottom: '2%',
					top: '2%',
		            grid: { 
		                top: '15%',
		                left: '3%',
		                right: '4%',
		                bottom: '05%',
						height: '65%',
						containLabel: true
		            },
					legendtitle : 'Ward Name',
					config_chart: echarts.init(document.getElementById("ward_wise_smart_led_count")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 27, 0]
	                }, formatter: function (value, index) {
					    if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
		            dataZoom: [{
						type: 'inside',
						start: 1,
						end: 10
					}, {
						type: 'slider',
						showDetail: false,
					}],
					series: [{
//	                    name: 'No. Of Routes',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: response.ward_wise_smart_led_count,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Smart Street Light", column_name: "ward_name", column_type: "string",
						ward_no: global.electricDashboardModule.getSelectedWardNo()}
				});
				b3.chart();
				b3.clickOnChart();
			}
			
		}, getSelectedWardNo : function(){
			return $("#electricWard option:selected").val() ? $("#electricWard option:selected").val() : "0";
		}
	}

	global.electricDashboardModule = dashboard;

})(window, jQuery);