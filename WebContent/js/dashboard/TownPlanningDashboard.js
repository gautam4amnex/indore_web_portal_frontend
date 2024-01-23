/**
 * 
 */
(function(global, $) {
	
	let wardid = "townWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('land_use_distribution'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			try{
				global.townPlanningDashboardModule.setRequiredEvent();
			} catch (e) {}
			
				/**
				 * 
				 */
			try{
				$(".total_town_planning_scheme").text(data.total_town_planning_scheme);
				$(".total_town_planning_scheme").attr('title', data.total_town_planning_scheme);
			}catch(e){}
			
			try {
				let obj = {"schema_name":"map","table_name":"tbl_town_planning"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
				
				
				
			}catch (e) {}
			/**
			 * 
			 */
			let pieChartFunc = global.dashboardChartsModule.getPieChart();
			if(pieChartFunc){
				
//				new pieChartFunc({
//					data: data.ward_wise_total_town_planning_area,
//					colorList: ['#dccdae', '#b39b7d','#806756'],
//				    companybar_chart: echarts.init(document.getElementById('wardwise'))
//				}).chart();

//				let p1 = new pieChartFunc({
//					data: data.land_usage_category_wise_town_planning_area,
//					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
//				    companybar_chart: echarts.init(document.getElementById('landUse'))
//				});
//				p1.chart();
//				p1.clickOnChart();
				
				let p2 = new pieChartFunc({
					data: data.land_use_distribution,
					formatter: '{b}: {c}%',
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735',
						'#dfc2a9','#c39c4f', '#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735', '#dfc2a9','#c39c4f', '#a16735',
						'#dfc2a9','#c39c4f', '#f0c27a','#a16735', '#dfc2a9','#c39c4f', '#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
				    companybar_chart: echarts.init(document.getElementById('land_use_distribution')),
				    obj : {layer_name: "Land Use Boundary", column_name: "land_use", column_type: "string",
//						ward_no: global.townPlanningDashboardModule.getSelectedWardNo()
						ward_no: "0" // 25th January, 2021 - ward_no column removed from layer
				    }
				});
				p2.chart();
				p2.clickOnChart();
				
				let p3 = new pieChartFunc({
					data: data.commercial_area_increase,
					formatter: '{b}: {c}%',
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
				    companybar_chart: echarts.init(document.getElementById('commercial_area_increase')),
				    obj : {layer_name: "Land Use Boundary", column_type: "string",
//						ward_no: global.townPlanningDashboardModule.getSelectedWardNo()
				    	ward_no: "0" // 25th January, 2021 - ward_no column removed from layer	
				    }
				});
				p3.chart();
				p3.clickOnChart();
				
				let p4 = new pieChartFunc({
					data: data.residential_area_increase,
					formatter: '{b}: {c}%',
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
				    companybar_chart: echarts.init(document.getElementById('residential_area_increase')),
				    obj : {layer_name: "Land Use Boundary", column_type: "string",
//						ward_no: global.townPlanningDashboardModule.getSelectedWardNo()
				    	ward_no: "0" // 25th January, 2021 - ward_no column removed from layer	
				    }
				});
				p4.chart();
				p4.clickOnChart();
				
//				new pieChartFunc({
//					data: data.ward_wise_total_imc_area,
//					colorList: ['#edd983', '#c8a042'],
//				    companybar_chart: echarts.init(document.getElementById('wardwise_ImcArea'))
//				}).chart();
//				
			}
				
			/**
			 * 
			 */
			let barChartObj = global.dashboardChartsModule.getBarChart();
			
//			if(barChartObj){
//				
//				new barChartObj({
//					xAxisbar: data.lanf_wise_total_road_width_length.wards,
//					xname : 'Wards',
//					yname : 'Length',
//					legend : {
//		                textStyle: {
//		                    color: "#b1b1b5"
//		                },
//		                icon: 'circle',
//		                itemWidth: 10,
//		                itemHeight: 10,
//		                itemGap: 10,
//		                bottom: 0
//		            },
//		            grid : { 
//		                top: '15%',
//		                left: '3%',
//		                right: '4%',
//		                bottom: '05%',
//						height: '65%',
//		                containLabel: true
//		            },
//					bar_chart: echarts.init(document.getElementById('total_TownPlanningArea')),
//					dataZoom: [{
//						type: 'inside',
//						start: 1,
//						end: 100
//					}],
//					series: [{
//	                    name: 'Unreserved Area in Sq. m',
//	                    type: 'bar',
//	                    stack: 'sum',
//	                    barWidth: '20px',
//	                    data: data.lanf_wise_total_road_width_length.road_length,
//	                    itemStyle: {
//	                        normal: {
//	                            color: '#e9946d'
//	                        }
//	                    },
//	        
//	                },{
//	                    name: 'Reservation Area in Sq. m',
//	                    type: 'bar',
//	                    stack: 'sum',
//	                    barWidth: '20px',
//	                    data: data.lanf_wise_total_road_width_length.width,
//	                    itemStyle: {
//	                        normal: {
//	                            color: '#ebd888'
//	                        }
//	                    },
//	        
//	                }]
//				}).chart();
//			}
		}, getSelectedWardNo : function(){
			return $("#townWard option:selected").val() ? $("#townWard option:selected").val() : "0";
		}
	}

	global.townPlanningDashboardModule = dashboard;

})(window, jQuery);