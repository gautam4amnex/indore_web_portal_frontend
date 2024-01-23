/**
 * 
 */
(function(global, $) {
	
	const wardid = "pwdWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('type_wise_roads'));
				echarts.dispose(document.getElementById('surface_wise_roads'));
				echarts.dispose(document.getElementById('ward_wise_bridge_count'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			
			try{
				global.pwdManagementModule.setRequiredEvent();
			} catch (e) {}
			
			try{
				$(".total-roads-count").text(data.total_roads_count);
				$(".total-roads-count").attr('title', data.total_roads_count);
			}catch(e){}
			
			try{
				$(".bridge-facility-count").text(data.bridge_facility_count);
				$(".bridge-facility-count").attr('title', data.bridge_facility_count);
			}catch(e){}
			
			try{
				$(".total-bridgep-count").text(data.total_bridgep_count);
				$(".total-bridgep-count").attr('title', data.total_bridgep_count);
			}catch(e){}
			
			try{
				$(".total-footover-bridge-count").text(data.total_footover_bridge_count);
				$(".total-footover-bridge-count").attr('title', data.total_footover_bridge_count);
			}catch(e){}
			
			try{
				$(".total-flyover-count").text(data.total_flyover_count);
				$(".total-flyover-count").attr('title', data.total_flyover_count);
			}catch(e){}
			
			try{
				$(".total_road_types").text(data.type_wise_roads.length);
				$(".total_road_types").attr('title', data.type_wise_roads.length);
			}catch(e){}
			
			try{
				$(".total_road_length").text(data.total_road_length);
				$(".total_road_length").attr('title', data.total_road_length);
			}catch(e){}
			
			
			try{
				$(".total_bridges").text(data.total_bridges);
				$(".total_bridges").attr('title', data.total_bridges);
			}catch(e){}
			
			
			try{
				let obj = {"schema_name":"map","table_name":"tbl_roads"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
			}catch(e){}
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			try{
				if(simpleBarChartObj){
					let b1 = new simpleBarChartObj({
						datacity: data.bridge_wards,
						legend: {
			                show: true,
							icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 0,
			            },
			            xname : 'Ward Name',
						yname : 'No. of Bridges',
						bottom: '2%',
						top: '2%',
			            grid: { 
			                top: '5%',
			                left: '3%',
			                right: '4%',
			                bottom: '5%',
							height: '70%',
							containLabel: true
			            },
			            dataZoom: [{
							type: 'inside',
							start: 1,
							end: 30
						}, {
							type: 'slider',
							showDetail: false,
						}],
						legendtitle : 'Ward Name',
						config_chart: echarts.init(document.getElementById("ward_wise_bridge_count")),
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
//						legend: {
//			                show: true,
//							
//			                bottom:-5,
//							
//			            },
						series: [{
//		                    name: 'No. Of Routes',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.ward_wise_bridge_count,
		                    itemStyle: {
		                        normal: {
		                            color: '#e8c185'
		                        }
		                    },
		                }],
						rotate: 25,
						obj : {layer_name: "Bridge", column_name: "ward_name", column_type: "string",
							ward_no: global.pwdManagementModule.getSelectedWardNo()}
					});
					b1.chart();
					b1.clickOnChart();
				}	
			}catch(e){}
			
			
//			if(simpleBarChartObj){
//				let b1 = new simpleBarChartObj({
//					datacity: data.road_wards,
//					legend: {
//		                show: true,
//						icon: 'circle',
//		                itemWidth: 10,
//		                itemHeight: 10,
//		                itemGap: 10,
//						bottom: 0,
//		            },
//		            xname : 'Ward Name',
//					yname : 'Length',
//					bottom: '2%',
//					top: '2%',
//		            grid: { 
//		                top: '5%',
//		                left: '3%',
//		                right: '4%',
//		                bottom: '5%',
//						height: '70%',
//						containLabel: true
//		            },
//		            dataZoom: [{
//						type: 'inside',
//						start: 1,
//						end: 30
//					}, {
//						type: 'slider',
//						showDetail: false,
//					}],
//					legendtitle : 'Ward Name',
//					config_chart: echarts.init(document.getElementById("ward_wise_road_length")),
//					nameXTextStyle : {
//						padding: [50, 0, 0, 0]
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
////	                    name: 'No. Of Routes',
//	                    type: 'bar',
//	                    stack: 'sum',
//	                    barWidth: '15px',
//	                    data: data.ward_wise_road_length,
//	                    itemStyle: {
//	                        normal: {
//	                            color: '#e8c185'
//	                        }
//	                    },
//	                }],
//					rotate: 35
//				});
//				b1.chart();
//				b1.clickOnChart();
//			}
			
			
//			let brtsSimpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
//			if(brtsSimpleBarChartObj){
//				
//				new brtsSimpleBarChartObj({
//					datacity : data.divider_bar_data.divider_route,//['Road 1','Road 2','Road 3','Road 4'],
//					singleLagend : 'No. of Divider',
//					colorSingleLine : '#826754',
//				    series: [{
//	                    name: 'No. Of Brts Stops',
//	                    type: 'bar',
//	                    stack: 'sum',
//	                    barWidth: '15px',
//	                    data:data.divider_bar_data.divider_count,// [3, 5, 4, 8],//[20, 30, 20, 30],
//	                    itemStyle: {
//	                        normal: {
//	                            color: '#826754'
//	                        }
//	                    }
//	                }],
//	                rotate : 35,
//	                formatter: function (value, index) {
//						console.log("Length : " + value.length);
//					    if(value.length <= 5){
//					    	return value;
//					    }
//						let str = value.substring(0,10);
//					    str += "...";
//					    return str;
//					},
//	                config_chart: echarts.init(document.getElementById('roadwise_divider'))
//				}).chart();
//				
//			}
					 
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
//				new pieChartObj({
//					/*data: [{ value: 20, name: 'State Highway', }, { value: 7, name: 'Urban Highway' }],*/
//					data: data.type_wise_road_usage,
//					colorList: ['#dbcdac', '#a06736','#b39c7d'],
//				    companybar_chart: echarts.init(document.getElementById('typewise_roadusage'))
//				}).chart();
				
//				new pieChartObj({
//					/*data: [{ value: 17, name: 'Concrete', }, { value: 25, name: 'Tar' }, { value: 25, name: 'WBM' }, { value: 25, name: 'Kachha' }],*/
//					data: data.surface_type,
//					colorList: ['#d88e23', '#e6ad5a','#e4c37b','#edd886'],
//				    companybar_chart: echarts.init(document.getElementById('surfacetype'))
//				}).chart();
				
				
//				new pieChartObj({
//					/*data: [{ value: 17, name: 'ROB', }, { value: 25, name: 'RUB' }, { value: 12, name: 'FOB' }, { value: 16, name: 'River Bridge' }],*/
//					data: data.type_wise_road_usage_b,
//					colorList: ['#806753', '#a38978','#ceb694','#dacdad'],
//				    companybar_chart: echarts.init(document.getElementById('bridges_roadusage'))
//				}).chart();
				
				
//				new pieChartObj({
//					/*data: [{ value: 25, name: '2 Lane', }, { value: 10, name: '4 Lane' }],*/
//					data: data.bridges_lane_wise,
//					colorList: ['#d2a666', '#e7c57d'],
//				    companybar_chart: echarts.init(document.getElementById('bridges_landwise'))
//				}).chart();
				
//				new pieChartObj({
//					/*data: [{ value: 17, name: 'ROB', }, { value: 25, name: 'RUB' }, { value: 12, name: 'FOB' }, { value: 16, name: 'River Bridge' }],*/
//					data: data.types_of_flyover,
//					colorList: ['#806753', '#a38978','#ceb694','#dacdad'],
//				    companybar_chart: echarts.init(document.getElementById('flyover'))
//				}).chart();
				
//				let p1 = new pieChartObj({
//					data: data.road_type_wise_distribution,
//					formatter: '{b}: {c}%',
//					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
//						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f'],
//				    companybar_chart: echarts.init(document.getElementById('road_type_wise_distribution'))
//				});
//				p1.chart();
//				p1.clickOnChart();
				
				let p1 = new pieChartObj({
					data: data.type_wise_roads,
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('type_wise_roads')),
				    obj : {layer_name: "Road", column_name: "road_type", column_type: "string",
						ward_no: global.pwdManagementModule.getSelectedWardNo()}
				});
				p1.chart();
				p1.clickOnChart();
				
				let p2 = new pieChartObj({
					data: data.surface_wise_roads,
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('surface_wise_roads')),
				    obj : {layer_name: "Road", column_name: "type_of_surface", column_type: "string",
						ward_no: global.pwdManagementModule.getSelectedWardNo()}
				});
				p2.chart();
				p2.clickOnChart();
			}
		}, getSelectedWardNo : function(){
			return $("#pwdWard option:selected").val() ? $("#pwdWard option:selected").val() : "0";
		}
	}

	global.pwdManagementModule = dashboard;

})(window, jQuery);





