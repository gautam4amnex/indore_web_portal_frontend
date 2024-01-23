/**
 * 
 */
(function(global, $) {
	
	let one, two;
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
		}, setDashboard : function(data){
			
			try{
				$(".total_ad").text(data.total_advertisement);
				$(".total_ad").attr('title', data.total_advertisement);
			}catch(e){}
			
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				
				one = new pieChartObj({
				  data: data.maintenance_agency_wise_cnt,//[{ value: 30, name: 'Label 1', }, { value: 70, name: 'Label 2' }, { value: 70, name: 'Label 3' }, { value: 70, name: 'Label 4' }, { value: 70, name: 'Label 5' }],
			      companybar_chart: echarts.init(document.getElementById('mAgencyWhc'),'macarons')
				});
				
				one.chart();
				global.dashboardChartsModule.addChart(one, 'mAgencyWhc');
				
				two = new pieChartObj({
					data: data.yearly_rate_wise,// [{ value: 30, name: '2000-3000'}, { value: 70, name: '4000-5000' }, { value: 40, name: '6000-7000' }],
			        companybar_chart: echarts.init(document.getElementById('yRateWhc'),'macarons')
				});
				
				two.chart();
				global.dashboardChartsModule.addChart(two, 'yRateWhc');
			}
			
		}
	}

	global.advertisementManagementModule = dashboard;

})(window, jQuery);