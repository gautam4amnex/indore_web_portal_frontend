(function(global, $) {
	
	let one, two;
	
	const wardid = "aictslWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
						
			try {
				global.dashboardModule.getWards(wardid);
				
//				echarts.dispose(document.getElementById('bus_routes'));
//				echarts.dispose(document.getElementById('bus_station_types'));
				
				echarts.dispose(document.getElementById('routewise_station'));
//				echarts.dispose(document.getElementById('bus_station_type_count'));
				echarts.dispose(document.getElementById('ward_wise_bus_stop'));
				echarts.dispose(document.getElementById('equipment_type_wise_collection'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			/*------------------------------- AICTSL Start -------------------------------*/
			
			try{
				global.aictslDashboardModule.setRequiredEvent();
			} catch (e) {}
			
			try {
				$(".total-bus-routes").text(data.total_bus_routes);
				$(".total-bus-routes").attr('title', data.total_bus_routes);
			} catch (e) {}
			
			try {
				$(".total_station_types").text(data.total_station_types);
				$(".total_station_types").attr('title', data.total_station_types);
			} catch (e) {}
		
			try {
				$(".total_bus_stops").text(data.total_bus_stops);
				$(".total_bus_stops").attr('title', data.total_bus_stops);
			} catch (e) {}
			
			try {
				let obj = {"schema_name":"map","table_name":"tbl_bus_routes"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
				
				obj = {"schema_name":"map","table_name":"tbl_bus_stops"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
				
				
			}catch (e) {}
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			if(pieChartObj){
//				let p1 = new pieChartObj({
//					/*data: [{ value: 27, name: 'AC', }, { value: 11, name: 'NON AC' }],*/
//					data: data.bus_routes_list,
//					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
//						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f'],
//				    companybar_chart: echarts.init(document.getElementById('bus_routes'))
//				});
//				p1.chart();
//				p1.clickOnChart();
				
			/*	new pieChartObj({
					data: [{ value: 20, name: 'Driver', }, { value: 17, name: 'Conductor' }],
					data: data.total_staff,
					colorList: ['#dccdae','#b29b7c'],
					companybar_chart: echarts.init(document.getElementById('total_stuff'))
				}).chart();*/
				
//				let p2 = new pieChartObj({
//					/*data: [{ value: 27, name: 'AC', }, { value: 11, name: 'NON AC' }],*/
//					data: data.type_wise_station,
//					colorList: ['#c39c4f','#f0c27a','#a16735', '#dfc2a9','#c39c4f','#f0c27a','#a16735', '#dfc2a9'],
//				    companybar_chart: echarts.init(document.getElementById('bus_station_types'))
//				});
//				p2.chart();
//				p2.clickOnChart();
				
			/*	new pieChartObj({
					data: [{ value: 20, name: 'Driver', }, { value: 17, name: 'Conductor' }],
					data: data.total_staff_brts,
					colorList: ['#d5af68','#ae8c5a'],
				    companybar_chart: echarts.init(document.getElementById('total_stuffBrts'))
				}).chart();*/
			}
			
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b1 = new simpleBarChartObj({
					datacity: data.bus_routes,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Bus Routes',
					yname : 'No. of Bus Routes',
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
					legendtitle : 'Bus Routes',
					config_chart: echarts.init(document.getElementById("routewise_station")),
					nameXTextStyle : {
						padding: [15, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 15, 0]
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
	                    data: data.bus_routes_count,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 15,
					obj : {layer_name: "Bus Routes", column_name: "bus_route_number", column_type: "string",
						ward_no: global.aictslDashboardModule.getSelectedWardNo()}
				});
				b1.chart();
				b1.clickOnChart();
				
				
//				let b2 = new simpleBarChartObj({
//					datacity: data.station_types,
//					legend: {
//		                show: true,
//						icon: 'circle',
//		                itemWidth: 10,
//		                itemHeight: 10,
//		                itemGap: 10,
//						bottom: 0,
//		            },
//		            xname : 'Bus Station Type',
//					yname : 'Count',
//					bottom: '5%',
//					top: '5%',
//		            grid: { 
//		                top: '15%',
//		                left: '3%',
//		                right: '4%',
//		                bottom: '05%',
//						height: '65%',
//						containLabel: true
//		            },
//					legendtitle : 'Bus Station Type',
//					config_chart: echarts.init(document.getElementById("bus_station_type_count")),
//					nameXTextStyle : {
//						padding: [13, 0, 0, 0]
//					}, nameYTextStyle : {
//	                    padding: [0, 0, 20, 0]
//	                }, formatter: function (value, index) {
//					    if(value.length <= 5){
//					    	return value;
//					    }
//						let str = value.substring(0,10);
//					    str += "...";
//					    return str;
//					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
//					series: [{
////	                    name: 'Type wise Count',
//	                    type: 'bar',
//	                    stack: 'sum',
//	                    barWidth: '15px',
//	                    data: data.type_wise_count,
//	                    itemStyle: {
//	                        normal: {
//	                            color: '#a69583'
//	                        }
//	                    },
//	                }],
//	               
//					rotate: 5
//				});
//				b2.chart();
//				b2.clickOnChart();
				
				
				let b3 = new simpleBarChartObj({
					datacity: data.bus_stop_wards,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Ward Name',
					yname : 'No. of Bus Stops',
					bottom: '5%',
					top: '5%',
		            grid: { 
		                top: '15%',
		                left: '3%',
		                right: '4%',
		                bottom: '05%',
						height: '65%',
						containLabel: true
		            },
					legendtitle : 'Bus Stop Count',
					config_chart: echarts.init(document.getElementById("ward_wise_bus_stop")),
					nameXTextStyle : {
						padding: [35, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 20, 0]
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
//	                    name: 'Type wise Count',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.ward_wise_bus_stop,
	                    itemStyle: {
	                        normal: {
	                            color: '#a69583'
	                        }
	                    },
	                }],	               
					rotate: 25,
					obj : {layer_name: "Bus Stops", column_name: "ward_name", column_type: "string",
						ward_no: global.aictslDashboardModule.getSelectedWardNo()}
				});
				b3.chart();
				b3.clickOnChart();
				
				
				
				/*new simpleBarChartObj({
					datacity: data.citybusdepot.data,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : '(Depots)',
					yname : '(Count)',
					bottom: '5%',
					top: '5%',
		            grid: { 
		                top: '15%',
		                left: '3%',
		                right: '4%',
		                bottom: '05%',
						height: '65%',
						containLabel: true
		            },
					legendtitle : 'No. of Depots',
					config_chart: echarts.init(document.getElementById("Buses_depotwise")),
					nameXTextStyle : {
						padding: [30, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 20, 0]
	                }, formatter: function (value, index) {
						console.log("Length : " + value.length);
					    if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
					series: [{
	                    name: 'No. Of Depots',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.citybusdepot.value,
	                    itemStyle: {
	                        normal: {
	                            color: '#e79e34'
	                        }
	                    },
	                }],
					rotate: 35
				}).chart();
				
				
				new simpleBarChartObj({
					datacity: data.brtsbusdepot.data,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : '(Depots)',
					yname : '(Count)',
		            grid: { 
		                top: '15%',
		                left: '3%',
		                right: '4%',
		                bottom: '05%',
						height: '65%',
						containLabel: true
		            },
					legendtitle : 'No. of Depots',
					config_chart: echarts.init(document.getElementById("Buses_depotwiseBrts")),
					nameXTextStyle : {
						padding: [30, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 20, 0]
	                }, formatter: function (value, index) {
						console.log("Length : " + value.length);
					    if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
					series: [{
	                    name: 'No. Of Depots',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.brtsbusdepot.value,
	                    itemStyle: {
	                        normal: {
	                            color: '#9f6424'
	                        }
	                    },
	                }],
					rotate: 35
				}).chart();*/
			}

			
			let multiBarChartObj = global.dashboardChartsModule.getMultiBarChart();
			
			if(multiBarChartObj){
				let mb1 = new multiBarChartObj({
					legend: {
						data: data.transaction_types 
					},
					config_chart: echarts.init(document.getElementById("equipment_type_wise_collection")),
					xAxis: [
						{
							type: 'category',
					        axisTick: {show: false},
					        data: data.transaction_types
					    }
					],
					grid: { 
		                top: '10%',
		                left: '4%',
		                right: '4%',
		                bottom: '5%',
						height: '70%',
						containLabel: true
		            },
					series: data.equipment_type_wise_collection
				});
				mb1.chart();
//				mb1.clickOnChart();
			}
			
			
			/*------------------------------- AICTSL End ---------------------------------*/
			
		}, getSelectedWardNo : function(){
			return $("#aictslWard option:selected").val() ? $("#aictslWard option:selected").val() : "0";
		}
		
	}
	global.aictslDashboardModule = dashboard;

})(window, jQuery);