/**
 * 
 */
(function(global, $) {
	
	const wardid = "lanRecordWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('zone_wise_agriculture_land'));
				echarts.dispose(document.getElementById('zone_wise_village'));
				echarts.dispose(document.getElementById('zone_wise_open_space'));
				echarts.dispose(document.getElementById('zone_wise_khasra'));
				
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			try{
				global.landRecordDashboardModule.setRequiredEvent();
			} catch (e) {}
			
			try{
				$(".total_parcel_types").text(data.total_parcel_types);
				$(".total_parcel_types").attr('title', data.total_parcel_types);
			}catch(e){}
			
			try{
				$(".total_villages").text(data.total_villages);
				$(".total_villages").attr('title', data.total_villages);
			}catch(e){}
			
			try{
				let obj = {"schema_name":"map","table_name":"tbl_land_record"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
			}catch(e){}
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				
//				let p1 = new pieChartObj({
//					/*data: [{ value: 17, name: 'Iron', }, { value: 23, name: 'PVC' }],*/
//					data: data.parcel_wise_distribution,
//					formatter: '{b}: {c}%',
//					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#a16735','#dfc2a9', '#f0c27a','#a16735'
//						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f'],
//				    companybar_chart: echarts.init(document.getElementById('parcel_wise_distribution'))
//				});
//				p1.chart();
//				p1.clickOnChart();
//				
//				let p2 = new pieChartObj({
//					/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
//					data : data.village_wise_distribution,
//					formatter: '{b}: {c}%',
//					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
//						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f'],
//				    companybar_chart: echarts.init(document.getElementById('village_wise_distribution'))
//				});
//				p2.chart();
//				p2.clickOnChart();
				
				let p3 = new pieChartObj({
					/*data: [{ value: 17, name: 'Iron', }, { value: 23, name: 'PVC' }],*/
					data: data.zone_wise_khasra,
					formatter: '{b}: {c}%',
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#a16735','#dfc2a9', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('zone_wise_khasra')),
				    obj: {layer_name: "Khasra Boundary", column_name: "zone_name", column_type: "string",
						ward_no: global.landRecordDashboardModule.getSelectedWardNo()}
				});
				p3.chart();
				p3.clickOnChart();
			}
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b1 = new simpleBarChartObj({
					datacity: data.agriculture_zones,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Zone Name',
					yname : 'Area',
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
					config_chart: echarts.init(document.getElementById("zone_wise_agriculture_land")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 55, 0]
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
	                    data: data.zone_wise_agriculture_land,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Agriculture Land", column_name: "zone_name", column_type: "string",
						ward_no: global.landRecordDashboardModule.getSelectedWardNo()}
				});
				b1.chart();
//				b1.clickOnChart();  // NEED TO UNCOMMENT AFTER LAYER IS ADDED :: 25th January, 2021
				
				
				let b2 = new simpleBarChartObj({
					datacity: data.village_zones,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Zone Name',
					yname : 'Area',
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
					config_chart: echarts.init(document.getElementById("zone_wise_village")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 55, 0]
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
	                    data: data.zone_wise_village,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Village Boundary", column_name: "zone_name", column_type: "string",
						ward_no: global.landRecordDashboardModule.getSelectedWardNo()}
				});
				b2.chart();
				b2.clickOnChart();
				
				let b3 = new simpleBarChartObj({
					datacity: data.open_space_zones,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Zone Name',
					yname : 'Area',
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
					config_chart: echarts.init(document.getElementById("zone_wise_open_space")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 55, 0]
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
	                    data: data.zone_wise_open_space,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Open Land", column_name: "zone_name", column_type: "string",
						ward_no: global.landRecordDashboardModule.getSelectedWardNo()}
				});
				b3.chart();
				b3.clickOnChart();
				
			}
			
						
		}, getSelectedWardNo : function(){
			return $("#lanRecordWard option:selected").val() ? $("#lanRecordWard option:selected").val() : "0";
		}
	}

	global.landRecordDashboardModule = dashboard;

})(window, jQuery);

