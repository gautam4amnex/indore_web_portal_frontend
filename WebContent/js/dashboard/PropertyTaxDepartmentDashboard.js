(function(global, $) {
	
	let dashboard = {
			
		setRequiredEvent : function(){
						
		}, setDashboard : function(data){
			
			/*------------------------------- Property Tax Collection Start -------------------------------*/
			
				try {
					$(".total_property_tax_collection").text(data.total_property_tax_collection);
					$(".total_property_tax_collection").attr('title', data.total_property_tax_collection);
				} catch (e) {}
				
				try {
					$(".residential_cr_count").text(data.residential_cr_count);
					$(".residential_cr_count").attr('title', data.residential_cr_count);
				} catch (e) {}
				
				try {
					$(".non_residential_cr_count").text(data.non_residential_cr_count);
					$(".non_residential_cr_count").attr('title', data.non_residential_cr_count);
				} catch (e) {}
				
				try {
					$(".industries_cr_count").text(data.industries_cr_count);
					$(".industries_cr_count").attr('title', data.industries_cr_count);
				} catch (e) {}
			
				
			/*------------------------------- Property Tax Collection End ---------------------------------*/
			
			/*------------------------------- Property Tax Due Start ---------------------------------*/
				
				try {
					$(".total_property_tax_due_count").text(data.total_property_tax_due_count);
					$(".total_property_tax_due_count").attr('title', data.total_property_tax_due_count);
				} catch (e) {}
				
				
				try {
					$(".property_tax_due_residential_count").text(data.property_tax_due_residential_count);
					$(".property_tax_due_residential_count").attr('title', data.property_tax_due_residential_count);
				} catch (e) {}
				
				try {
					$(".property_tax_due_non_residential_count").text(data.property_tax_due_non_residential_count);
					$(".property_tax_due_non_residential_count").attr('title', data.property_tax_due_non_residential_count);
				} catch (e) {}
				
				try {
					$(".property_tax_industries_count").text(data.property_tax_industries_count);
					$(".property_tax_industries_count").attr('title', data.property_tax_industries_count);
				} catch (e) {}
			/*------------------------------- Property Tax Due End -----------------------------------*/

				
			/*------------------------------- New Property Pending Request Start ---------------------------------*/
				
				try {
					$(".total_gsr_storage_count").text(data.total_gsr_storage_count);
					$(".total_gsr_storage_count").attr('title', data.total_gsr_storage_count);
				} catch (e) {}
				
				
				try {
					$(".new_property_pending_request_residential_count").text(data.new_property_pending_request_residential_count);
					$(".new_property_pending_request_residential_count").attr('title', data.new_property_pending_request_residential_count);
				} catch (e) {}
				
				
				try {
					$(".new_property_pending_request_non_residential_count").text(data.new_property_pending_request_non_residential_count);
					$(".new_property_pending_request_non_residential_count").attr('title', data.new_property_pending_request_non_residential_count);
				} catch (e) {}
				
				try {
					$(".new_property_pending_request_industries_count").text(data.new_property_pending_request_industries_count);
					$(".new_property_pending_request_industries_count").attr('title', data.new_property_pending_request_industries_count);
				} catch (e) {}
				
			/*------------------------------- New Property Pending Request End -----------------------------------*/
			
			/*------------------------------- Property Tax Revenue Start ---------------------------------*/
				
				let pieChartObj = global.dashboardChartsModule.getPieChart();
				if(pieChartObj){
					new pieChartObj({
					    data: data.property_tax_revenue,
					    companybar_chart: echarts.init(document.getElementById('PropertyTaxRevenue'), 'macarons')
					}).chart();
				}
				
			/*------------------------------- Property Tax Revenue End ---------------------------------*/	
				
			/*------------------------------- Ward Wise Property Text Revenue Start ---------------------------------*/
				
				let lineChartObj = global.dashboardChartsModule.getLineChart();
				if(lineChartObj){
					new lineChartObj({
						datacity: data.ward_wise_property_text_revenue.wards,
						rotate: 35,
						yinterval : 1,
						xinterval : 1,
						ymininterval : 1,
						legendtitle : ['Property Tax Collection(rs)', 'Property Tax Due'],
						formatter: function (value, index) {
						    if(value.length <= 5){
						    	return value;
						    }
							let str = value.substring(0,10);
						    str += "...";
						    return str;
						},
		                xname : '(Wards)',
						yname : '(In Lakhs)',
//						ymininterval : 1,
					    series: [{
			                name: 'Property Tax Collection',
			                type: 'line',
			                data: data.ward_wise_property_text_revenue.property_tax_collection,
			                barWidth: 10, 
			                barGap: 1, 
			                itemStyle: {
			                    normal: {
			                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                            offset: 0,
			                            color: '#bf9be3'
			                        }, {
			                            offset: 1,
			                            color: '#bf9be3'
			                        }]),
			                        barBorderRadius:0,
			                        opacity: 1,
			                    }
			                }
			            }, {
			                name: 'Property Tax Due',
			                type: 'line',
			                data: data.ward_wise_property_text_revenue.property_tax_due,
			                barWidth: 10,
			                barGap: 1,
			                itemStyle: {
			                    normal: {
			                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                            offset: 0,
			                            color: '#aaa7f5'
			                        }, {
			                            offset: 1,
			                            color: '#aaa7f5'
			                        }]),
			                        barBorderRadius:0,
			                        opacity: 1,
			                    }
			                }
			            }],
					    barLine_chart: echarts.init(document.getElementById('wwptc_line_chart'), 'macarons')
					}).chart();
				}
				
			/*------------------------------- Ward Wise Property Text Revenue End ---------------------------------*/
			
			/*------------------------------- Compare To Previous Year Start ---------------------------------*/
				
				let barChart = global.dashboardChartsModule.getBarChart();
				
				if(barChart){
					
					let seriesies = [];
					
					for(let obj in data.series) {
						let series = {
							name : obj,
							type : 'bar',
							data: data.series[obj],
			                barWidth: 8, 
			                barGap: 0.5, 
						};
						seriesies.push(series);
					}
					
					new barChart({
					    xAxisbar: data.month_list,
					    legendtile: data.year_list,
					    bar_chart: echarts.init(document.getElementById("rcwtpy_chart"),'macarons'),
					    series : seriesies,
			            yname : '(In Lakhs)',
					}).chart();
				}
				
			/*------------------------------- Compare To Previous Year End ---------------------------------*/
			
			/*------------------------------- Year Wise Building Construction Start ---------------------------------*/
				
				let yearWiseLineChart = global.dashboardChartsModule.getLineChart();
				if(yearWiseLineChart){
					new yearWiseLineChart({
						datacity: data.year_wise_building_construction.wards,
						rotate: 35,
						yinterval : 1,
						xinterval : 1,
						ymininterval : 1,
						legendtitle : ['Building Count'],
						formatter: function (value, index) {
						    if(value.length <= 5){
						    	return value;
						    }
							let str = value.substring(0,10);
						    str += "...";
						    return str;
						},
		                xname : '(Years)',
						yname : '(Counts)',
//						ymininterval : 1,
					    series: [{
			                name: 'Building Count',
			                type: 'line',
			                data: data.year_wise_building_construction.counts,
			                barWidth: 10, 
			                barGap: 1, 
			                itemStyle: {
			                    normal: {
			                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                            offset: 0,
			                            color: '#a5a8ef'
			                        }, {
			                            offset: 1,
			                            color: '#a5a8ef'
			                        }]),
			                        barBorderRadius:0,
			                        opacity: 1,
			                    }
			                }
			            }],
					    barLine_chart: echarts.init(document.getElementById('ywbcc_charts'), 'macarons')
					}).chart();
				}
				
			/*------------------------------- Year Wise Building Construction End ---------------------------------*/
			
			/*------------------------------- Floor Wise Property Start ---------------------------------*/
				
				let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
				
				if(simpleBarChartObj){
					
					new simpleBarChartObj({
						datacity: data.floor_wise_property.range,
						legend: {
			                show: true,
							icon: 'circle',
							type : 'scroll',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 0,
			            },
			            xname : '(Floors)',
						yname : '(Count)',
			            grid: { 
			                top: '5%',
			                left: '3%',
			                right: '4%',
			                bottom: '10%',
							height: '80%',
			                containLabel: true
			            },
						singleLagend : 'No. of Building',
						config_chart: echarts.init(document.getElementById("fwtpc_chart"),'macarons'),
						rotate: 35,
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
		                    name: 'No. of Building',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.floor_wise_property.data,
		                    itemStyle: {
		                        normal: {
		                            color: '#6097fe'
		                        }
		                    },
		                }]
					}).chart();
				}
				
			/*------------------------------- Floor Wise Property End ---------------------------------*/
			
			/*------------------------------- Property Occupancy Start ---------------------------------*/
				let pieChartFunc = global.dashboardChartsModule.getPieChart();
				if(pieChartFunc){	
					new pieChartFunc({
					    data: data.property_occupancy,
					    companybar_chart: echarts.init(document.getElementById('propertyOccupancy'),'macarons')
					}).chart();
				}
			/*------------------------------- Property Occupancy End ---------------------------------*/
			
			/*------------------------------- Property Usage Start ---------------------------------*/
				
				let pieChartFunc2 = global.dashboardChartsModule.getPieChart();
				if(pieChartFunc2){	
					new pieChartFunc2({
					    data: data.property_usage,
					    companybar_chart: echarts.init(document.getElementById('propertyUsage'),'macarons')
					}).chart();
				}
				
			/*------------------------------- Property Usage End ---------------------------------*/
			
			/*------------------------------- Gender Wise Property Tax Owners Counts Start ---------------------------------*/
				
				let pieChartFunc3 = global.dashboardChartsModule.getPieChart();
				if(pieChartFunc3){	
					new pieChartFunc3({
					    data: data.gender_wise_property_tax_owners_counts,
					    companybar_chart: echarts.init(document.getElementById('GenderWPropTexOwn'),'macarons')
					}).chart();
				}
				
			/*------------------------------- Gender Wise Property Tax Owners Counts End ---------------------------------*/
		}
	}
	global.propertyTaxDashboardModule = dashboard;

})(window, jQuery);