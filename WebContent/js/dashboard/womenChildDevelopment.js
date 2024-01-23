/**
 * 
 */
(function(global, $) {
	
	const wardid = "womanWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('open_space_wise_anganwadi'));
				echarts.dispose(document.getElementById('ward_wise_aanganadi_count'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			try{
				global.womanDashboardModule.setRequiredEvent();
			} catch (e) {}
			
			try {
				$(".total_anganwadi").text(data.total_anganwadi);
				$(".total_anganwadi").attr('title', data.total_anganwadi);
			} catch (e) {}
			
			try {
				$(".total_meal_avail").text(data.total_meal_avail);
				$(".total_meal_avail").attr('title', data.total_meal_avail);
			} catch (e) {}
			
			try{
				let obj = {"schema_name":"map","table_name":"tbl_anganwadi"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
			}catch(e){}
			
			let esrPieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(esrPieChartObj){
				
//				new esrPieChartObj({
//					data: data.no_of_student,
//					colorList: ['#c68541', '#ddad6d','#f1c17f'],
//				    companybar_chart: echarts.init(document.getElementById('tnoStud'))
//				}).chart();
				
				let p1 = new esrPieChartObj({
					data: data.open_space_wise_anganwadi,
					formatter: '{b}: {c}%',
					colorList: ['#c68541', '#ddad6d','#f1c17f'],
				    companybar_chart: echarts.init(document.getElementById('open_space_wise_anganwadi')),
				    obj : {layer_name: "Anganwadi", column_name: "open_space_area", column_type: "string",
						ward_no: global.womanDashboardModule.getSelectedWardNo()}
				});
				p1.chart();
				p1.clickOnChart();
				
//				let p2 = new esrPieChartObj({
//					data: data.vaccination_wise_anganwadi,
//					formatter: '{b}: {c}%',
//					colorList: ['#c68541', '#ddad6d','#f1c17f'],
//				    companybar_chart: echarts.init(document.getElementById('vaccination_wise_anganwadi'))
//				});
//				p2.chart();
//				p2.clickOnChart();
				
//				let p3 = new esrPieChartObj({
//					data: data.ward_wise_anganwadi,
//					formatter: '{b}: {c}%',
//					colorList: ['#c68541', '#ddad6d','#f1c17f'],
//				    companybar_chart: echarts.init(document.getElementById('ward_wise_anganwadi'))
//				});
//				p3.chart();
//				p3.clickOnChart();
			}
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b1 = new simpleBarChartObj({
					datacity: data.wards,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Ward Name',
					yname : 'No. of Anganwadi',
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
					config_chart: echarts.init(document.getElementById("ward_wise_aanganadi_count")),
					nameXTextStyle : {
						padding: [27, 0, 0, 0]
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
	                    data: data.ward_wise_aanganwadi_count,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 15,
					obj : {layer_name: "Anganwadi", column_name: "ward_name", column_type: "string",
						ward_no: global.womanDashboardModule.getSelectedWardNo()}
				});
				b1.chart();
				b1.clickOnChart();
				
			}
			
		}, getSelectedWardNo : function(){
			return $("#womanWard option:selected").val() ? $("#womanWard option:selected").val() : "0";
		}
	}

	global.womanDashboardModule = dashboard;

})(window, jQuery);