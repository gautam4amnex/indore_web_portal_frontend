/**
 * 
 */
(function(global, $) {
	
	const wardid = "revenueWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			try{
				global.revenueManagementModule.setRequiredEvent();
			} catch (e) {}
			
			try{
				$(".total_land").text(data.total_land);
				$(".total_land").attr('title', data.total_land);
			}catch(e){}
			
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				
				new pieChartObj({
					data: data.ownership_type,
					colorList: ['#a18a79', '#cfb795','#dccdae', '#f1e6c8'],
				    companybar_chart: echarts.init(document.getElementById('ownerType'))
				}).chart();
				
				new pieChartObj({
					data: data.land_system,
					colorList: ['#c9a141', '#ebd982'],
				    companybar_chart: echarts.init(document.getElementById('landSystem'))
				}).chart();
				
			}
		}
	}

	global.revenueManagementModule = dashboard;

})(window, jQuery);