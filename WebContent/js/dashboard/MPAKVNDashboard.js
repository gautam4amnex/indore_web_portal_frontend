/**
 * 
 */
(function(global, $) {
	
	let wardid = "mpakvnWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('zone_wise_training_centers'));
				echarts.dispose(document.getElementById('zone_wise_it_park_area'));
				echarts.dispose(document.getElementById('name_wise_sez_area'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			try{
				global.mpakvnManagementModule.setRequiredEvent();
			} catch (e) {}
			
			try{
				$(".total_industrial_park").text(data.total_industrial_park);
				$(".total_industrial_park").attr('title', data.total_industrial_park);
			}catch(e){}
			
			
			try{
				$(".msme_count").text(data.msme_count);
				$(".msme_count").attr('title', data.msme_count);
			}catch(e){}
			
			try{
				$(".total_se2_count").text(data.total_se2_count);
				$(".total_se2_count").attr('title', data.total_se2_count);
			}catch(e){}
			
			let pieChartFunc = global.dashboardChartsModule.getPieChart();
			
			if(pieChartFunc){
				
				let p1 = new pieChartFunc({
					data: data.zone_wise_it_park_area,
					formatter: '{b}: {c}%',
					colorList: ['#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b', '#956b39', '#ecd785', '#c59b4f',  '#e7c27b', '#c99f46', '#e6ae5b'],
				    companybar_chart: echarts.init(document.getElementById('zone_wise_it_park_area')),
				    obj : {layer_name: "Industrial Park", column_name: "zone_name", column_type: "string",
						ward_no: global.mpakvnManagementModule.getSelectedWardNo()}
				});
				p1.chart();
				p1.clickOnChart();
				
			}
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				
				let b1 = new simpleBarChartObj({
					datacity: data.training_center_zones,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Zone Name',
					yname : 'No. of Industrial Training Centers',
					bottom: '2%',
					top: '2%',
		            grid: { 
		                top: '15%',
		                left: '3%',
		                right: '4%',
		                bottom: '05%',
						height: '67%',
						containLabel: true
		            },
					legendtitle : 'Zone Name',
					config_chart: echarts.init(document.getElementById("zone_wise_training_centers")),
					nameXTextStyle : {
						padding: [25, 0, 0, 0]
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
	                    data: data.zone_wise_training_centers,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 18,
					obj : {layer_name: "Industrial Training Center", column_name: "zone_name", column_type: "string",
						ward_no: global.mpakvnManagementModule.getSelectedWardNo()}
				});
				b1.chart();
				b1.clickOnChart();
				
				
				let b2 = new simpleBarChartObj({
					datacity: data.sez_names,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'SEZ',
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
					legendtitle : 'SEZ',
					config_chart: echarts.init(document.getElementById("name_wise_sez_area")),
					nameXTextStyle : {
						padding: [27, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 42, 0]
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
	                    data: data.name_wise_sez_area,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 22,
					obj : {layer_name: "SEZ", column_name: "name", column_type: "string",
						ward_no: global.mpakvnManagementModule.getSelectedWardNo()}
				});
				b2.chart();
				b2.clickOnChart();
			}
		}, getSelectedWardNo : function(){
			return $("#mpakvnWard option:selected").val() ? $("#mpakvnWard option:selected").val() : "0";
		}
	}

	global.mpakvnManagementModule = dashboard;

})(window, jQuery);	