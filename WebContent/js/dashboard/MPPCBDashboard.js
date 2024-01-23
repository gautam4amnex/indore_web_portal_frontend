/**
 * 
 */
(function(global, $) {
	
	const wardid = "mppcbWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			try{
				global.mppcbManagementModule.setRequiredEvent();
			} catch (e) {}
			
			try {
				$(".no2-count").text(data.no2_count);
				$(".no2-count").attr('title', data.no2_count);
			} catch (e) {}
			
			try {
				$(".co-count").text(data.co_count);
				$(".co-count").attr('title', data.co_count);
			} catch (e) {}
			
			try {
				$(".o3-count").text(data.o3_count);
				$(".o3-count").attr('title', data.o3_count);
			} catch (e) {}
			
			try {
				$(".ph10-count").text(data.ph10_count);
				$(".ph10-count").attr('title', data.ph10_count);
			} catch (e) {}
			
			try {
				$(".so2-count").text(data.so2_count);
				$(".so2-count").attr('title', data.so2_count);
			} catch (e) {}
					 
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				let p1 = new pieChartObj({
					/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
					data : data.mixture_of_minerals,
					colorList: ['#d69a3a', '#e6ae5b', '#e5c37b', '#edd885'],
				    companybar_chart: echarts.init(document.getElementById('mixOmin'))
				});
				p1.chart();
				p1.clickOnChart();
			}
		}
	}

	global.mppcbManagementModule = dashboard;

})(window, jQuery);