/**
 * 
 */
(function(global, $) {
	
	const wardid = "rtoWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){

			try{
				global.rtoManagementModule.setRequiredEvent();
			} catch (e) {}
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				
				let p1 = new pieChartObj({
					/*data: [{ value: 17, name: 'RTO1', }, { value: 23, name: 'RTO2' },{ value: 23, name: 'RTO3' },{ value: 23, name: 'RTO4' },{ value: 14, name: 'RTO5' }],*/
					data : data.rto_wise_pending_case,
					colorList: ['#816754','#a18a78','#ceb696','#dcccae','#f0e6c9'],
				    companybar_chart: echarts.init(document.getElementById('rtowise_pendingcase'))
				});
				p1.chart();
				p1.clickOnChart();
				
				let p2 = new pieChartObj({
					/*data: [{ value: 17, name: 'RTO1', }, { value: 23, name: 'RTO2' },{ value: 23, name: 'RTO3' },{ value: 23, name: 'RTO4' },{ value: 16, name: 'RTO5' }],*/
					data : data.rto_wise_officer_number,
					colorList: ['#af8317','#c6a142','#dcc265','#ead985','#ffeca3'],
				    companybar_chart: echarts.init(document.getElementById('rtowise_officersNumber'))
				});
				p2.chart();
				p2.clickOnChart();
			}
			
			let barChart = global.dashboardChartsModule.getSimpleBarChart();
			
			if(barChart){
				
				let b1 = new barChart({
				    datacity : data.rto_build_up.rtos,//['Ward 1','Ward 2','Ward 3','Ward 4', 'Ward 5','Ward 6','Ward 7','Ward 8' , 'Ward 9','Ward 10'],//['0-20','21-40','41-60','61-80'],
					//singleLagend : 'No. Of ESR',
					simpleColor : '#826754',
					legend: {
		                show: false,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 15,
						bottom: 5,
		            },
					xname : 'Routes',
					yname : 'Count',
					 grid: { 
			                top: '10%',
			                left: '3%',
			                right: '4%',
			                bottom: '10%',
							height: '65%',
							containLabel: true
			            },
					series: [{
		                    name: 'Count',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.rto_build_up.build_up_area,// [3, 5, 4, 8, 3, 5, 4, 8, 3, 5],
		                    itemStyle: {
		                        normal: {
		                            color: '#826754'
		                        }
		                    }
		            }],
					rotate: 0,
					config_chart: echarts.init(document.getElementById('BuilupArea')),
					nameXTextStyle : {
						padding: [5, 0, 0, 0]
					},
				});
				b1.chart();
				b1.clickOnChart();
			}
		}
	}

	global.rtoManagementModule = dashboard;

})(window, jQuery);