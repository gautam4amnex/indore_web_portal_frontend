(function(global, $) {

	const wardid = "dudaWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
			} catch (e) {
				console.error(e);
			}
			
		},setDashboard : function(data){
			
			try{
				global.dudaModule.setRequiredEvent();
			} catch (e) {}
			
			try{
				$(".total-sewerage-line-count").text(data.total_sewerage_line_count);
				$(".total-sewerage-line-count").attr('title', data.total_sewerage_line_count);
			}catch(e){}
			
			try{
				$(".total-solid-waste").text(data.total_solid_waste);
				$(".total-solid-waste").attr('title', data.total_solid_waste);
			}catch(e){}
			
			try{
				$(".total-water-supply-line-count").text(data.total_water_supply_line_count);
				$(".total-water-supply-line-count").attr('title', data.total_water_supply_line_count);
			}catch(e){}
			
	
			let barChartObj = global.dashboardChartsModule.getBarChart();
			
			if(barChartObj){
				
				new barChartObj({
					xAxisbar: data.upstream_downstream_water_pipeline_length.data,
					xname : '(Wards)',
					yname : '(Pipeline length)',
					legend : {
						show: true,
		                data: data.upstream_downstream_water_pipeline_length.data,
		                textStyle: {
		                   color: "#b1b1b5"
		                },
		                icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0
		            },
		            grid : {
		                left: '3%',
		                right: '4%',
		                bottom: '3%',
		                containLabel: true
		            },
					bar_chart: echarts.init(document.getElementById("udWatersl")),
					series: [{
		                name: 'Upstream',
		                type: 'bar',
		                data: data.upstream_downstream_water_pipeline_length.upstream,
		                barWidth: 10, 
		                barGap: 0.5, 
		                itemStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#ea9570'
		                        }, {
		                            offset: 1,
		                            color: '#ea9570'
		                        }]),
		                        barBorderRadius:0,
		                        opacity: 1,
		                    }
		                }
		            }, {
		                name: 'Downstream',
		                type: 'bar',
		                data: data.upstream_downstream_water_pipeline_length.downstream,
		                barWidth: 10,
		                barGap: 0.5,
		                itemStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#eed786'
		                        }, {
		                            offset: 1,
		                            color: '#eed786'
		                        }]),
		                        barBorderRadius:0,
		                        opacity: 1,
		                    }
		                }
		            }],
					dataZoom: [{
						type: 'inside',
						start: 1,
						end: 100
					}]
				}).chart();
			}
			
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				
				new simpleBarChartObj({
					datacity: data.depth_wise_sewerage_line.sewerage_lines,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Depth (In meter)',
					yname : 'No. of sewerage line',
		            grid: { 
		                top: '05%',
		                left: '3%',
		                right: '4%',
		                bottom: '10%',
						height: '80%',
		                containLabel: true
		            },
					config_chart: echarts.init(document.getElementById('dwSewl')),
					formatter: function (value, index) {
						console.log("Length : " + value.length);
					    if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
					series: [{
	                    name: 'Depth (In Meter)',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.depth_wise_sewerage_line.no_of_sewerage_line,
	                    itemStyle: {
	                        normal: {
	                            color: '#eed887'
	                        }
	                    },
	                }],
				}).chart();
				
				
				new simpleBarChartObj({
					datacity: data.depth_wise_sewerage_line_water.sewerage_lines,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Depth (In meter)',
					yname : 'No. of sewerage line',
		            grid: { 
		                top: '05%',
		                left: '3%',
		                right: '4%',
		                bottom: '10%',
						height: '80%',
		                containLabel: true
		            },
					config_chart: echarts.init(document.getElementById('dwWatersl')),
					formatter: function (value, index) {
						console.log("Length : " + value.length);
					    if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
					series: [{
	                    name: 'Depth (In Meter)',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.depth_wise_sewerage_line_water.no_of_sewerage_line,
	                    itemStyle: {
	                        normal: {
	                            color: '#cdb696'
	                        }
	                    },
	                }],
				}).chart();
				
			}
			
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();

			if(pieChartObj){
				
				new pieChartObj({
					/*data: [{ value: 17, name: 'Iron', }, { value: 23, name: 'PVC' }],*/
					data: data.pipe_type_wise_sewerage_line,
					colorList: ['#a16735', '#f1c27e'],
				    companybar_chart: echarts.init(document.getElementById('ptwSewl'))
				}).chart();
				
				new pieChartObj({
					/*data: [{ value: 17, name: 'ward 1', }, { value: 23, name: 'ward 2' }, { value: 27, name: 'ward 3' }],*/
					data: data.ward_wise_solid_waste_containers,
					colorList: ['#816854', '#a18a78', '#cfb795'],
				    companybar_chart: echarts.init(document.getElementById('wwSolidwc'))
				}).chart();
				
				new pieChartObj({
					/*data: [{ value: 17, name: 'Iron', }, { value: 23, name: 'PVC' }],*/
					data: data.pipe_type_wise_water_supply_line,
					colorList: ['#816854', '#dccdae', '#cfb795'],
				    companybar_chart: echarts.init(document.getElementById('ptwWatersl'))
				}).chart();

			}
		
		}
	}
	global.dudaModule = dashboard;

})(window, jQuery);