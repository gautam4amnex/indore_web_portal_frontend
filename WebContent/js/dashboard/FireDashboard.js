(function(global, $) {
	
	let dashboard = {
			
		setRequiredEvent : function(){
						
		}, setDashboard : function(data){
			
			/*------------------------------- Fire Station Start -------------------------------*/
			
				try {
					$(".fire-station-count").text(data.fire_station_count);
					$(".fire-station-count").attr('title', data.fire_station_count);
				} catch (e) {}
			
				let lineChartObj = global.dashboardChartsModule.getLineChart();
				
				if(lineChartObj){
					new lineChartObj({
						datacity: data.no_of_vehicles_and_workforce_per_solution.stations,
						rotate: 35,
						yinterval : 1,
						xinterval : 0,
						ymininterval : 1,
						legendtitle : ['No. of Workfore', 'No. of Vehicles'],
						formatter: function (value, index) {
						    if(value.length <= 5){
						    	return value;
						    }
							let str = value.substring(0,10);
						    str += "...";
						    return str;
						},
		                xname : '(Stations)',
						yname : '(Count)',
//						ymininterval : 1,
					    series: [{
					    	name: 'No. of Workfore',
			                type: 'bar',
			                barWidth: '20px',
		                    data: data.no_of_vehicles_and_workforce_per_solution.vehicle_count,
		                    itemStyle: {
		                        color: '#ff8e8e'
		                    }
			            }, {
		                    name: 'No. of Vehicles',
		                    data: data.no_of_vehicles_and_workforce_per_solution.workforce_count,
		                    type: "line",
		                    smooth: false,
		                    showAllSymbol: true,
		                    symbol: "circle",
		                    symbolSize: 10,
		                    itemStyle: {
		                        color: "#800770",
		                    }, lineStyle: {
		                        color: "#800770",
		                        width: 2
		                    }
			            }],
					    barLine_chart: echarts.init(document.getElementById('noVehiclesWorkforceSolution'), 'macarons')
					}).chart();
				}
				
			/*------------------------------- Fire Station End ---------------------------------*/
			
			/*------------------------------- Fire Hydrant Start ---------------------------------*/
				
				try {
					$(".fire-hydrants-count").text(data.fire_hydrants_count);
					$(".fire-hydrants-count").attr('title', data.fire_hydrants_count);
				} catch (e) {}
				
				let pieChartObj = global.dashboardChartsModule.getPieChart();
				if(pieChartObj){
					new pieChartObj({
					    /*data: data.fire_hydrants_capacity,*/
					    data:  [
					        {
					          "name": "150 Feet Ring Road",
					          "value": 8000
					        },
					        {
					          "name": "Bhavnagar Road",
					          "value": 8000
					        },
					        {
					          "name": "Kalawad Road",
					          "value": 0
					        },
					        {
					          "name": "Kanak Road",
					          "value": 0
					        },
					        {
					          "name": "Kothariya Road",
					          "value": 0
					        },
					        {
					          "name": "Mavdi Road",
					          "value": 100000
					        },
					        {
					          "name": "Rail Nagar Road",
					          "value": 100000
					        }
					      ],
					    companybar_chart: echarts.init(document.getElementById('fireHydrantsCap'), 'macarons')
					}).chart();
				}
				
			/*------------------------------- Fire Hydrant End -----------------------------------*/
		
		}
	}
	global.fireDashboardModule = dashboard;

})(window, jQuery);