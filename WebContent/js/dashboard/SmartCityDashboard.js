/**
 * 
 */
(function(global, $) {
	
	let wardid = "smartCityWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('project_wise_cost'));
				echarts.dispose(document.getElementById('zone_wise_projects'));
				echarts.dispose(document.getElementById('category_wise_projects'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			try{
				global.smartCityDashboardModule.setRequiredEvent();
			} catch (e) {}
			
//			try{
//				$(".total_industrial_park").text(data.total_industrial_park);
//				$(".total_industrial_park").attr('title', data.total_industrial_park);
//			}catch(e){}
//			
//			
//			try{
//				$(".msme_count").text(data.msme_count);
//				$(".msme_count").attr('title', data.msme_count);
//			}catch(e){}
//			
//			try{
//				$(".total_se2_count").text(data.total_se2_count);
//				$(".total_se2_count").attr('title', data.total_se2_count);
//			}catch(e){}
			
			let pieChartFunc = global.dashboardChartsModule.getPieChart();
			
			if(pieChartFunc){
				
				let p1 = new pieChartFunc({
					data: data.category_wise_projects,
//					formatter: '{b}: {c}%',
					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b', '#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
				    companybar_chart: echarts.init(document.getElementById('category_wise_projects')),
				    obj : {layer_name: "Smart City Project", column_name: "project_category", column_type: "string",
						ward_no: global.smartCityDashboardModule.getSelectedWardNo()}
				});
				p1.chart();
				p1.clickOnChart();
				
			}
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
//				let smartProject1 = data.project_wise_cost['Smart Project 1'];
//				let smartProject2 = data.project_wise_cost['Smart Project 2'];
//				let names = smartProject1.names;
//				let projects = names.concat(smartProject2.names);
//				let cost = smartProject1.cost;
//				let project_costs = cost.concat(smartProject2.cost);
				let b1 = new simpleBarChartObj({
					datacity: data.projects,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Projects',
					yname : 'Cost (Cr.)',
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
					legendtitle : 'Projects',
					config_chart: echarts.init(document.getElementById("project_wise_cost")),
					nameXTextStyle : {
						padding: [36, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 18, 0]
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
	                    data: data.project_wise_cost,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Smart City Project", column_name: "name", column_type: "string",
						ward_no: global.smartCityDashboardModule.getSelectedWardNo()}
				});
				b1.chart();
				b1.clickOnChart();
				
				
				let b2 = new simpleBarChartObj({
					datacity: data.project_zones,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Zone Name',
					yname : 'No. of Projects',
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
					legendtitle : 'SEZ',
					config_chart: echarts.init(document.getElementById("zone_wise_projects")),
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
	                    data: data.zone_wise_projects,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Smart City Project", column_name: "zone_name", column_type: "string",
						ward_no: global.smartCityDashboardModule.getSelectedWardNo()}
				});
				b2.chart();
				b2.clickOnChart();
			}
		}, getSelectedWardNo : function(){
			return $("#smartCityWard option:selected").val() ? $("#smartCityWard option:selected").val() : "0";
		}
	}

	global.smartCityDashboardModule = dashboard;

})(window, jQuery);	