(function(global, $) {
	
	const wardid = "policeWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
						
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('zone_wise_ps'));
				echarts.dispose(document.getElementById('ps_wise_road_accident'));
				
				echarts.dispose(document.getElementById('injury_wise_accident'));
				echarts.dispose(document.getElementById('vehicle_type_wise_accident'));
				echarts.dispose(document.getElementById('road_category_wise_accident'));
				
				echarts.dispose(document.getElementById('ps_wise_vehicle_theft'));
				
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			/*------------------------------- Police Start -------------------------------*/
				
			try{
				global.policeDashboardModule.setRequiredEvent();
			} catch (e) {}
			
			try {
				/*$(".total-police-station").text(data.total_police_station);
				$(".total-police-station").attr('title', data.total_police_station);*/
				
				/*$(".total-police-station").text(100);
				$(".total-police-station").attr('title', 100);*/
				
			} catch (e) {}
			try {
				$(".total-police-chowki").text(data.total_chowkey);
				$(".total-police-chowki").attr('title', data.total_chowkey);
				
				/*$(".total-police-chowki").text(200);
				$(".total-police-chowki").attr('title', 200);*/
				
			} catch (e) {}
			
			try{
				let obj = {"schema_name":"map","table_name":"tbl_police_chowkey"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
			}catch(e){}
			
			let pieChartFunc = global.dashboardChartsModule.getPieChart();
			
			if(pieChartFunc){
				/*new pieChartFunc({
				    data: [{ value: 17, name: 'Thana', }, { value: 23, name: 'Police Chowki' }],
				    data: data.type_wise_police_stations,
					colorList: ['#dccdae','#a18a78'],
				    companybar_chart: echarts.init(document.getElementById('typewise_policeStation'))
				}).chart();*/
				
				let p1 = new pieChartFunc({
//					data: [{ value: 17, name: 'No. of Deaths', }, { value: 23, name: 'No. of Serious Injury' },
//						{ value: 43, name: 'No. of Minor Injury' }],
					formatter: '{b}: {c}%',
				    data: data.injury_type_wise_accidents,
					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
				    companybar_chart: echarts.init(document.getElementById('injury_wise_accident')),
				    obj : {layer_name: "Injury Data", 
						ward_no: global.policeDashboardModule.getSelectedWardNo()}
				});
				p1.chart();
//				p1.clickOnChart(); // NEED TO UNCOMMENT AFTER LAYER IS ADDED :: 25th January, 2021
				
				let p2 = new pieChartFunc({
//					data: [{ value: 17, name: '4-Wheeler', }, { value: 23, name: '2-Wheeler' },
//						{ value: 43, name: '3-Wheeler' }, { value: 17, name: 'Truck', }],
					formatter: '{b}: {c}%',
				    data: data.vehicle_type_wise_accidents,
					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
				    companybar_chart: echarts.init(document.getElementById('vehicle_type_wise_accident')),
				    obj : {layer_name: "Accidents", column_name: "vehicle_type", column_type: "string",
						ward_no: global.policeDashboardModule.getSelectedWardNo()}
				});
				p2.chart();
//				p2.clickOnChart(); // NEED TO UNCOMMENT AFTER LAYER IS ADDED :: 25th January, 2021
				
				let p3 = new pieChartFunc({
//					data: [{ value: 57, name: 'National Highway', }, { value: 23, name: 'State Highway' },
//						{ value: 20, name: 'Other Roads' }],
					formatter: '{b}: {c}%',
				    data: data.road_category_wise_accidents,
					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
				    companybar_chart: echarts.init(document.getElementById('road_category_wise_accident')),
				    obj : {layer_name: "Accidents", column_name: "type_of_road", column_type: "string",
						ward_no: global.policeDashboardModule.getSelectedWardNo()}
				});
				p3.chart();
//				p3.clickOnChart(); // NEED TO UNCOMMENT AFTER LAYER IS ADDED :: 25th January, 2021
			}
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b1 = new simpleBarChartObj({
					datacity: data.police_zones,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Zone Name',
					yname : 'No. of Police Stations',
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
					legendtitle : 'Zone Name',
					config_chart: echarts.init(document.getElementById("zone_wise_ps")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
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
	                    data: data.zone_wise_ps,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Police Station", column_name: "zone_name", column_type: "string",
						ward_no: global.policeDashboardModule.getSelectedWardNo()}
				});
				b1.chart();
				b1.clickOnChart();
				
				
				let b2 = new simpleBarChartObj({
					datacity: data.police_stations,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Police Station Name',
					yname : 'No. of Road Accidents',
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
					legendtitle : 'Police Station Name',
					config_chart: echarts.init(document.getElementById("ps_wise_road_accident")),
					nameXTextStyle : {
						padding: [31, 0, 0, 0]
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
	                    data: data.station_wise_accidents,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Accidents", column_name: "police_station", column_type: "string",
						ward_no: global.policeDashboardModule.getSelectedWardNo()}
				});
				b2.chart();
//				b2.clickOnChart(); // NEED TO UNCOMMENT AFTER LAYER IS ADDED :: 25th January, 2021
				
				let b3 = new simpleBarChartObj({
					datacity: data.theft_stations,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Police Station Name',
					yname : 'No. of Vehicle Thefts',
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
//					legendtitle : 'Zone Name',
					config_chart: echarts.init(document.getElementById("ps_wise_vehicle_theft")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
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
	                    data: data.station_wise_theft_incidents,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Vehicle Theft", column_name: "police_station", column_type: "string",
//						ward_no: global.policeDashboardModule.getSelectedWardNo()
						ward_no: "0" // ward_no column removed from layer :: 25th January, 2021 changes
					}
				});
				b3.chart();
				b3.clickOnChart();
			}
				
			/*------------------------------- Police End ---------------------------------*/
				
		}, getSelectedWardNo : function(){
			return $("#policeWard option:selected").val() ? $("#policeWard option:selected").val() : "0";
		}
	}
	global.policeDashboardModule = dashboard;

})(window, jQuery);