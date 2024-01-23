

(function(global, $) {
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
		}, setDashboard : function(data){
			
			try{
				$(".count-dept").text(data.total_count);
				$(".count-dept").attr('title', data.total_count);
			}catch(e){}
			
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				
				new pieChartObj({
				 // data: data.icds_category,
				 // companybar_chart: echarts.init(document.getElementById('CategoryWiseICDS'),'macarons')
				  
				  data: [{ value: 10, name: 'Category 1', }, { value: 10, name: 'Category 2' }, { value: 35, name: 'Category 3' }, { value: 20, name: 'Category 4' }, { value: 40, name: 'Category 5' }],
				  colorList: ['#ffdd95', '#fa897a', '#7bb4ff', '#85e4ce', '#ff9f5b'],
				  companybar_chart: echarts.init(document.getElementById('tHawkersZones'),'macarons')
				  
				}).chart();
			}
			
		}
	}

	global.enchroachmentManagementModule = dashboard;

})(window, jQuery);