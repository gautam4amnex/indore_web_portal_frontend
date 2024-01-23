(function(global, $) {
	
	let dashboard = {
			
		setRequiredEvent : function(){
						
		}, setDashboard : function(data){
			
			/*------------------------------- Sports Start -------------------------------*/
			
				try {
					$(".sports-count").text(data.sports_count);
					$(".sports-count").attr('title', data.sports_count);
				} catch (e) {}
			
				let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
				if(simpleBarChartObj){
					new simpleBarChartObj({
						datacity: data.annual_fees_of_sports.data,
						legend: {
			                show: true,
							icon: 'circle',
							type : 'scroll',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 1,
			            },
			            xname : '(Sports)',
						yname : '(Fees)',
						bottom: '5%',
						top: '5%',
			            grid: { 
			                top: '3%',
			                left: '5%',
			                right: '4%',
			                bottom: '10%',
							height: '90%',
			                containLabel: true
			            },
						legendtitle : 'No. Of Sports',
						config_chart: echarts.init(document.getElementById("annualFeeSports"),'macarons'),
						rotate: 35,
						nameXTextStyle : {
							padding: [30, 0, 0, 0]
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
						series: [{
		                    name: 'No. Of Sports',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.annual_fees_of_sports.value,
		                    itemStyle: {
		                        normal: {
		                            color: '#f7617c'
		                        }
		                    },
		                }],
//						rotate: 35
					}).chart();
				}
				
			/*------------------------------- Sports End ---------------------------------*/
			
			/*------------------------------- Swimming Pool Start ---------------------------------*/
				try {
					$(".swimming-pool-count").text(data.swimming_pool_count);
					$(".swimming-pool-count").attr('title', data.swimming_pool_count);
				} catch (e) {}
				
			/*------------------------------- Swimming Pool End -----------------------------------*/
				
		}
	}
	global.sportsDashboardModule = dashboard;

})(window, jQuery);