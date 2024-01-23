(function(global, $) {
	
	const wardid = "publicHealthWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('diameter_wise_water_supply_lines'));
				echarts.dispose(document.getElementById('ward_wise_water_supply_lines'));
				echarts.dispose(document.getElementById('wardWiseWaterValves'));
				
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			try{
				global.publicHealthDashboardModule.setRequiredEvent();
			} catch (e) {}
		
			try {
				$(".total_water_line_length").text(data.total_water_line_length);
				$(".total_water_line_length").attr('title', data.total_water_line_length);
			} catch (e) {}
			
			
			try {
				$(".up_stream").text(data.total_upstream);
				$(".up_stream").attr('title', data.total_upstream);
			} catch (e) {}
			
			try {
				$(".down_stream").text(data.total_downstream);
				$(".down_stream").attr('title', data.total_downstream);
			} catch (e) {}
			
			try {
				$(".total_tube_well").text(data.total_tubewell);
				$(".total_tube_well").attr('title', data.total_tubewell);
			} catch (e) {}
			
			try {
				$(".total_water_Valves").text(data.total_water_valve);
				$(".total_water_Valves").attr('title', data.total_water_valve);
			} catch (e) {}
			
			try{
				let obj = {"schema_name":"map","table_name":"tbl_water_supply_line"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
				
				obj = {"schema_name":"map","table_name":"tbl_tubewell"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
				
				
				obj = {"schema_name":"map","table_name":"tbl_water_valves"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
			}catch(e){}
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			if(pieChartObj){
				
//				new pieChartObj({
//					data: data.pipe_type_wise,
//					colorList: ['#efc27a', '#a06736','#c9a142'],
//				    companybar_chart: echarts.init(document.getElementById('pipewise_waterLine'))
//				}).chart();
				
//				let p1 = new pieChartObj({
//					data: data.pipe_material_wise,
//					colorList: ['#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a'],
//				    companybar_chart: echarts.init(document.getElementById('materialwise_waterLine'))
//				});
//				p1.chart();
//				p1.clickOnChart();
				
				let p2 = new pieChartObj({
						data: data.ward_wise_water_supply_lines,
						colorList: ['#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a',
							'#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a',
							'#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a'],
					    companybar_chart: echarts.init(document.getElementById('ward_wise_water_supply_lines')),
					    obj : {layer_name: "Water Supply Network", column_name: "ward_name", column_type: "string",
					    	ward_no: global.publicHealthDashboardModule.getSelectedWardNo()}
					});
				p2.chart();
				p2.clickOnChart();
				
				let p3 = new pieChartObj({
					data: data.diameter_wise_water_supply_lines,
					colorList: ['#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a',
						'#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a',
						'#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a'],
				    companybar_chart: echarts.init(document.getElementById('diameter_wise_water_supply_lines')),
				    obj : {layer_name: "Water Supply Network", column_name: "dia_mm", column_type: "string",
				    	ward_no: global.publicHealthDashboardModule.getSelectedWardNo()}
				});
				p3.chart();
				p3.clickOnChart();
				
//				let p4 = new pieChartObj({
//					data: data.ward_wise_water_vales,
//					colorList: ['#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a'],
//				    companybar_chart: echarts.init(document.getElementById('wardWiseWaterValves'))
//				});
//				p4.chart();
//				p4.clickOnChart();
				
//				let p5 = new pieChartObj({
//					data: data.ward_wise_tubewell,
//					formatter: '{b}: {c}%',
//					colorList: ['#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a','#a06736','#c9a142', '#efc27a'],
//				    companybar_chart: echarts.init(document.getElementById('ward_wise_tubewell'))
//				});
//				p5.chart();
//				p5.clickOnChart();
			
				
				let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
				
				if(simpleBarChartObj){
					let b1 = new simpleBarChartObj({
						datacity: data.water_valves_wards,
						legend: {
			                show: true,
							icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 0,
			            },
			            xname : 'Ward Name',
						yname : 'No. of Water Valves',
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
						config_chart: echarts.init(document.getElementById("wardWiseWaterValves")),
						nameXTextStyle : {
							padding: [36, 0, 0, 0]
						}, nameYTextStyle : {
		                    padding: [0, 0, 16, 0]
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
		                    data: data.ward_wise_water_vales,
		                    itemStyle: {
		                        normal: {
		                            color: '#e8c185'
		                        }
		                    },
		                }],
						rotate: 25,
						obj : {layer_name: "Water Valve", column_name: "ward_name", column_type: "string",
					    	ward_no: global.publicHealthDashboardModule.getSelectedWardNo()}
					});
					b1.chart();
					b1.clickOnChart();}
			}
			
			
			
		}, getSelectedWardNo : function(){
			return $("#publicHealthWard option:selected").val() ? $("#publicHealthWard option:selected").val() : "0";
		}
	}
	
	global.publicHealthDashboardModule = dashboard;

})(window, jQuery);