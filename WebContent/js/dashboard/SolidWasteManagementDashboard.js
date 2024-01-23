/**
 * 
 */
(function(global, $) {
	
	let tbc;
	let pco;
	
	let dashboard = {
			
		setRequiredEvent : function(){
		}, setDashboard : function(data){
			
			try{
				$(".solid-waste-transfer-station-capacity").text(data.solid_waste_capacity.capacity);
				$(".solid-waste-transfer-station-capacity").attr('title', data.solid_waste_capacity.capacity);
			}catch(e){}
			
			try{
				$(".composite-plants-capacity").text(data.compose_plant_capacity.capacity);
				$(".composite-plants-capacity").attr('title', data.compose_plant_capacity.capacity);
			}catch(e){}
			
			try {
				$(".dry-capacity").text(data.dry_plant_capacity.capacity);
				$(".dry-capacity").attr('title', data.dry_plant_capacity.capacity);
			} catch (e) {}
			
			try {
				$(".wet-capacity").text(data.wet_plant_capacity.capacity);
				$(".wet-capacity").attr('title', data.wet_plant_capacity.capacity);
			} catch (e) {}
			
			try {
				$(".composite-pits-capacity").text(data.compose_pit_capacity.capacity);
				$(".composite-pits-capacity").attr('title', data.compose_pit_capacity.capacity);
			} catch (e) {}
			
			try {
				let content = '<div class="col-sm-12 col-md-3 col-lg-3 p-0">'+
							'<div class="solid-footer-card">'+
								'<div class="card card-body mb-2 ml-2 mr-2 p-0">'+
									'<div class="card-custom">'+
										'<img class="card-img" src="../image/rmc_images/dashboard_icon/Landfill-05.svg"/>'+
										'<div class="card-text-cust pr-0 pl-1">'+
											'<p class="card-text-title mt-3">Landfill Sites</p>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
				
				for(let obj of data.landfill_site_capacity){
					content += '<div class="col-sm-12 col-md-3 col-lg-3 p-0">'+
									'<div class="solid-footer-card">'+
										'<div class="footer-card-count">'+
											obj.capacity+'<span>(Tonnes)</span>'+
										'</div>'+
									'</div>'+
								'</div>';
				}
				
				$(".landfill-site-content").html(content);
			} catch (e) {
				console.error(e);
			}
			
			let toiletsBarChart = global.dashboardChartsModule.getBarChart();
			
			if(toiletsBarChart){
				
				tbc = new toiletsBarChart({
				    xAxisbar: data.ward_list,
				    legendtile: ['Public Toilet', 'Community Toilet'],
				    bar_chart: echarts.init(document.getElementById("solidtoiletChart"),'macarons'),
				    series : [{
		                name: 'Public Toilet',
		                type: 'bar',
		                data: data.public_toilet,
		                barWidth: 10, 
		                barGap: 1, 
		                itemStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#c093e6'
		                        }, {
		                            offset: 1,
		                            color: '#c093e6'
		                        }]),
		                        barBorderRadius:0,
		                        opacity: 1,
		                    }
		                }
		            }, {
		                name: 'Community Toilet',
		                type: 'bar',
		                data: data.community_toiler,
		                barWidth: 10,
		                barGap: 1,
		                itemStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#a1a6ff'
		                        }, {
		                            offset: 1,
		                            color: '#a1a6ff'
		                        }]),
		                        barBorderRadius:0,
		                        opacity: 1,
		                    }
		                }
		            }],
		            yname : '(Count)',
				});
				
				tbc.chart();
				
				global.dashboardChartsModule.addChart(tbc, "solidtoiletChart");
			}
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				
				pco = new pieChartObj({
				    data: data.compose_pit_range,
				    companybar_chart: echarts.init(document.getElementById('compositePitsChart'),'macarons')
				});
				
				pco.chart();
				global.dashboardChartsModule.addChart(pco, 'compositePitsChart');
			}
			
		}
	}

	global.solidWasteManagementModule = dashboard;

})(wnidow, jQuery);