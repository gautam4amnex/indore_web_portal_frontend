/**
 * 
 */
(function(global, $) {
	
	let wardid = "streetLightWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			//global.streetLightDashboardModule.getWards(wardid);

			/**
			 * 
			 */
			$("#" + wardid).on("change", function(){
				let id = $(this).val();
				if(id){
					
				}
			});
			
		}, setDashboard : function(response){
			
			/*==================================== Strom Water Drainage Dashboard Start ================================*/
			
				try {
					$(".storm-water-drainage-count").text(response.storm_water_drainage_count);
					$(".storm-water-drainage-count").attr('title', response.storm_water_drainage_count);
				} catch (e) {}
				
				let pieChartFunc = global.dashboardChartsModule.getPieChart();
				if(pieChartFunc){
					
					try {
						new pieChartFunc({
						    data: response.strom_water_drainage_type.data,
						    legendtile : response.strom_water_drainage_type.legend,
						    companybar_chart: echarts.init(document.getElementById('stromwdType'), 'macarons')
						}).chart();
					} catch (e) {}
					
					try {
						new pieChartFunc({
						    data: response.manmade_water_drainage_type.data,
						    legendtile : response.manmade_water_drainage_type.legend,
						    companybar_chart: echarts.init(document.getElementById('manmadewdType'), 'macarons')
						}).chart();
					} catch (e) {}
					
					try {
						new pieChartFunc({
						    data: response.diameter_wise_water_drainage_counts.data,
						    legendtile : response.diameter_wise_water_drainage_counts.legend,
						    companybar_chart: echarts.init(document.getElementById('depthwwdCount'), 'macarons')
						}).chart();
					} catch (e) {}
	
					try {
						new pieChartFunc({
						    data: response.depth_wise_water_drainage_count.data,
						    legendtile : response.depth_wise_water_drainage_count.legend,
						    companybar_chart: echarts.init(document.getElementById('diameterwwdCount'), 'macarons')
						}).chart();
					} catch (e) {}
					
				}
			
			/*==================================== Strom Water Drainage Dashboard End ================================*/
									
		}, getWards : function(id){
			
			fetch("../map/getwards", {
				method : "GET",
				headers : {
					"Accept" : "application/json",
				}
			})
			.then((response) => response.json())
			.then((response) => {
				let content = "<option value='-1' selected='selected' disabled='disabled'>Select Ward</option>";
				response.forEach(function(element){
					content += "<option value='"+element.wardNo+"'>"+element.wardName+"</option>";
				});
				$("#" + id).html(content).selectpicker('refresh');
			})
			.catch((e) => {
				console.error(e);
			});
		}
	}

	global.stomWaterDrainageDashboardModule = dashboard;

})(window, jQuery);