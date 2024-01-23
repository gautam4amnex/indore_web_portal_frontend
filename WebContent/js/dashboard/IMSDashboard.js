/**
 * 
 */
(function(global, $) {
	
	
	let baseURL = window.iscdl.appData.baseURL;
	const wardid = "imcWard";
	let zoneUrl = baseURL + "api/dashboard/getZoneList";
	let iswmUrl = baseURL + "api/dashboard/getIswmDashboardData";
	let indore311Url = baseURL + "api/dashboard/getIndore311DashboardData";
	let propertyTaxUrl = baseURL + "api/dashboard/getPropertyTaxDashboardData";
	let buildingUrl = baseURL + "api/dashboard/getBuildingDashboardData";
	
	
	$("#iswmZone").on("change",function(){
		let zoneid = $("#iswmZone option:selected").val();
		global.imcManagementModule.getISWMData(zoneid);
	});
	
	$("#indore311Zone").on("change",function(){
		let ward_id = $("#imcWard option:selected").val();
		let zone_id = $("#indore311Zone option:selected").val();
		let from_date = $("#ind311FromDate").val();
		let to_date = $("#ind311ToDate").val();
		global.imcManagementModule.getIndore311Data(ward_id, zone_id, from_date, to_date);
	});
	
	$("#ind311FromDate").on("change",function(){
		let ward_id = $("#imcWard option:selected").val();
		let zone_id = $("#indore311Zone option:selected").val();
		let from_date = $("#ind311FromDate").val();
		let to_date = $("#ind311ToDate").val();
		let imc_dashboard = localStorage.getItem("imc_dashboard");
		if(imc_dashboard !== undefined && imc_dashboard !== null && imc_dashboard === "true"){
			global.imcManagementModule.getIndore311Data(ward_id, zone_id, from_date, to_date);
		}
	});
	
	$("#ind311ToDate").on("change",function(){
		let ward_id = $("#imcWard option:selected").val();
		let zone_id = $("#indore311Zone option:selected").val();
		let from_date = $("#ind311FromDate").val();
		let to_date = $("#ind311ToDate").val();
		let imc_dashboard = localStorage.getItem("imc_dashboard");
		if(imc_dashboard !== undefined && imc_dashboard !== null && imc_dashboard === "true"){
			global.imcManagementModule.getIndore311Data(ward_id, zone_id, from_date, to_date);
		}
	});
	
	$("#propertyTaxZone").on("change",function(){
		let ward_id = $("#imcWard option:selected").val();
		let zone_id = $("#propertyTaxZone option:selected").val();
		let from_date = $("#propertyTaxFromDate").val();
		let to_date = $("#propertyTaxToDate").val();
		global.imcManagementModule.getPropertyTaxData(ward_id, zone_id, from_date, to_date);
	});
	
	$("#propertyTaxFromDate").on("change",function(){
		let ward_id = $("#imcWard option:selected").val();
		let zone_id = $("#propertyTaxZone option:selected").val();
		let from_date = $("#propertyTaxFromDate").val();
		let to_date = $("#propertyTaxToDate").val();
		let imc_dashboard = localStorage.getItem("imc_dashboard");
		if(imc_dashboard !== undefined && imc_dashboard !== null && imc_dashboard === "true"){
			global.imcManagementModule.getPropertyTaxData(ward_id, zone_id, from_date, to_date);
		}
	});
	
	$("#propertyTaxToDate").on("change",function(){
		let ward_id = $("#imcWard option:selected").val();
		let zone_id = $("#propertyTaxZone option:selected").val();
		let from_date = $("#propertyTaxFromDate").val();
		let to_date = $("#propertyTaxToDate").val();
		let imc_dashboard = localStorage.getItem("imc_dashboard");
		if(imc_dashboard !== undefined && imc_dashboard !== null && imc_dashboard === "true"){
			global.imcManagementModule.getPropertyTaxData(ward_id, zone_id, from_date, to_date);
		}
	});
	
	$("#building_ward").on("change", function(){
		$('#building_floor').prop('disabled', false);
		let ward_id = $("#building_ward option:selected").val();
		let floor_category = $("#building_floor option:selected").val();
		global.imcManagementModule.getBuildingData(ward_id, floor_category);
	});
	
	$("#building_floor").on("change", function(){
		let ward_id = $("#building_ward option:selected").val();
		let floor_category = $("#building_floor option:selected").val();
		global.imcManagementModule.getBuildingData(ward_id, floor_category);
	});
	
	$("#imcWard").on("change", function(){
		let ward_id = $("#imcWard option:selected").val();
		$('#building_ward option[value='+ward_id+']').attr("selected",true);
		$('#building_floor option[value="0"]').attr("selected",true);
		$('#building_floor').prop('disabled', false);
	});
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				global.dashboardModule.getWards("building_ward");
				$('#building_floor').prop('disabled', true);
				
				global.imcManagementModule.getZoneList("iswmZone");
				global.imcManagementModule.getZoneList("indore311Zone");
				global.imcManagementModule.getZoneList("propertyTaxZone");
				
				
				echarts.dispose(document.getElementById('dustbin_location'));
				echarts.dispose(document.getElementById('public_toilets'));
				echarts.dispose(document.getElementById('sewer_diameter'));
				echarts.dispose(document.getElementById('category_wise_complaints'));
				echarts.dispose(document.getElementById('status_wise_complaints'));
				echarts.dispose(document.getElementById('construction_type_wise_property_tax'));
				echarts.dispose(document.getElementById('status_wise_vehicles'));
				echarts.dispose(document.getElementById('sewer_length'));
				echarts.dispose(document.getElementById('zone_wise_population'));
				echarts.dispose(document.getElementById('gts_wise_weight_collection'));
				echarts.dispose(document.getElementById('ward_wise_property_tax'));
				
//				echarts.dispose(document.getElementById('ward_wise_building'));
				echarts.dispose(document.getElementById('year_wise_building_count'));
				
				
				var today = new Date();
				
				$("#ind311FromDate").daterangepicker( {singleDatePicker: true, locale: {format: "YYYY-MM-DD"}, 
					"startDate": new Date(today.getYear()+1900,today.getMonth(),1)});
				$("#ind311ToDate").daterangepicker( {singleDatePicker: true, locale: {format: "YYYY-MM-DD"}, 
					"startDate": today});
				
				$("#propertyTaxFromDate").daterangepicker( {singleDatePicker: true, locale: {format: "YYYY-MM-DD"}, 
					"startDate": new Date(today.getYear()+1900-1,0,1)});
				$("#propertyTaxToDate").daterangepicker( {singleDatePicker: true, locale: {format: "YYYY-MM-DD"}, 
					"startDate": today});
				
//				$("#ind311FromDate").daterangepicker({format: 'yyyy-mm-dd'}).daterangepicker("setDate", new Date(today.getYear()+1900,today.getMonth(),1));
//				$("#ind311ToDate").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", today);
////				$("#ind311FromDate").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", new Date(2019,0,1));
//				
//				$("#propertyTaxFromDate").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", new Date(today.getYear()+1900,today.getMonth(),1));
//				$("#propertyTaxToDate").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", today);
////				$("#propertyTaxFromDate").datepicker({format: 'yyyy-mm-dd'}).datepicker("setDate", new Date(2019,0,1));
				
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			localStorage.setItem("imc_dashboard", true);
			try{
				global.imcManagementModule.setRequiredEvent();
			} catch (e) {}
			
			try{
				$(".total_dustbin_location").text(data.total_dustbin_locations);
				$(".total_dustbin_location").attr('title', data.total_dustbin_locations);
			}catch(e){}
			
			try{
				$(".total_public_toilets").text(data.total_public_toilets);
				$(".total_public_toilets").attr('title', data.total_public_toilets);
			}catch(e){}
			
			try{
				$(".total_sewers").text(data.total_sewers);
				$(".total_sewers").attr('title', data.total_sewers);
			}catch(e){}
			
//			try{
//				let obj = {"schema_name":"map","table_name":"tbl_dustbin_location"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//				
//				obj = {"schema_name":"map","table_name":"tbl_public_toilets"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//				
//				obj = {"schema_name":"map","table_name":"tbl_sewer"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//				
//				obj = {"schema_name":"public","table_name":"tbl_api_indore_311"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//				
//				obj = {"schema_name":"public","table_name":"tbl_api_imc_collection"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//				
//				obj = {"schema_name":"public","table_name":"tbl_api_iswm_weight_collection_transportation"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//				
//				obj = {"schema_name":"public","table_name":"tbl_api_iswm_summary_zone"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//				
//				obj = {"schema_name":"public","table_name":"tbl_api_imc_dca"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//				
//				obj = {"schema_name":"public","table_name":"tbl_api_afcs_transactional"};
//				global.dashboardModule.getDashboardUpdatedDate(obj);
//			}catch(e){}
			
//			try{
//				$(".total-toilet-point").text(data.total_toilet_point);
//				$(".total-toilet-point").attr('title', data.total_toilet_point);
//			}catch(e){}
//			
//			try{
//				$(".total-garbage-collection-points").text(data.total_garbage_collection_points);
//				$(".total-garbage-collection-points").attr('title', data.total_garbage_collection_points);
//			}catch(e){}
//			
//			try{
//				$(".total-parking-points").text(data.total_parking_points);
//				$(".total-parking-points").attr('title', data.total_parking_points);
//			}catch(e){}
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				
				let p1 = new pieChartObj({
					/*data: [{ value: 17, name: 'Iron', }, { value: 23, name: 'PVC' }],*/
					data: data.ward_wise_dustbin_location,
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('dustbin_location')),
				    obj : {layer_name: "Litter Bin", column_name: "ward_name", column_type: "string",
						ward_no: global.imcManagementModule.getSelectedWardNo()}
				});
				p1.chart();
				p1.clickOnChart();
				
				let p2 = new pieChartObj({
					/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
					data : data.ward_wise_toilets,
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('public_toilets')),
				    obj : {layer_name: "Toilet Urinals", column_name: "ward_name", column_type: "string",
						ward_no: global.imcManagementModule.getSelectedWardNo()}
				});
				p2.chart();
				p2.clickOnChart();
				
				let p3 = new pieChartObj({
					/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
					data : data.diameter_wise_sewer,
					formatter: '{b}: {c}%',
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('sewer_diameter')),
				    obj : {layer_name: "Sewer Network", column_name: "dia_mm", column_type: "string",
						ward_no: global.imcManagementModule.getSelectedWardNo()}
				});
				p3.chart();
				p3.clickOnChart();

//				let p4 = new pieChartObj({
//					/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
//					data : data.category_wise_complaints,
//					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
//						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
//						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
//				    companybar_chart: echarts.init(document.getElementById('category_wise_complaints')),
//				    obj: {layer_name: "Indore 311", ward_no: global.imcManagementModule.getSelectedWardNo()}
//				});
//				p4.chart();
//				p4.clickOnChart();
//				
//				let p5 = new pieChartObj({
//					/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
//					data : data.status_wise_complaints,
//					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
//						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
//						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
//				    companybar_chart: echarts.init(document.getElementById('status_wise_complaints')),
//				    obj: {layer_name: "Indore 311", ward_no: global.imcManagementModule.getSelectedWardNo()}
//				});
//				p5.chart();
//				p5.clickOnChart();
				
				let p6 = new pieChartObj({
					/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
					data : data.construction_type_wise_property_tax,
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('construction_type_wise_property_tax'))
				});
				p6.chart();
				p6.clickOnChart();
				
				let p7 = new pieChartObj({
					/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
					data : data.status_wise_vehicles,
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('status_wise_vehicles'))
				});
				p7.chart();
				p7.clickOnChart();
				
				let p8 = new pieChartObj({
					data : data.year_wise_building_count,
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('year_wise_building_count')),
				    obj : {layer_name: "Building", column_name: "floor_type", column_type: "string", 
						column_value: $("#building_floor option:selected").val() ? $("#building_floor option:selected").val() : "0",
						column_ward_no: $("#building_ward option:selected").val() ? $("#building_ward option:selected").val() : "0"}
				});
				p8.chart();
				p8.clickOnChart();
			}
			
			
			
			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b1 = new simpleBarChartObj({
					datacity: data.sewer_wards,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Ward Name',
					yname : 'Length(m)',
					legendtitle : 'Ward Name',
					config_chart: echarts.init(document.getElementById("sewer_length")),
//					bottom: '2%',
//					top: '2%',
					grid: { 
		                top: '10%',
		                left: '5%',
		                right: '4%',
		                bottom: '5%',
						height: '70%',
						containLabel: true
		            },
		            nameXTextStyle : {
						padding: [25, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 37, 0]
	                },
					formatter: function (value, index) {
						if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,5);
					    str += "...";
					    return str;
					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
					series: [{
//	                    name: 'No. Of Routes',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.sewer_length,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Sewer Network", column_name: "ward_name", column_type: "string",
						ward_no: global.imcManagementModule.getSelectedWardNo()}
				});
				b1.chart();
				b1.clickOnChart();
			}
			
			simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b2 = new simpleBarChartObj({
					datacity: data.zones,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'Zone Name',
					yname : 'Population',
					legendtitle : 'Zone Name',
					config_chart: echarts.init(document.getElementById("zone_wise_population")),
//					bottom: '2%',
//					top: '2%',
					grid: { 
		                top: '10%',
		                left: '5%',
		                right: '4%',
		                bottom: '5%',
						height: '70%',
						containLabel: true
		            },
		            nameXTextStyle : {
						padding: [25, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 42, 0]
	                },
					formatter: function (value, index) {
						if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,5);
					    str += "...";
					    return str;
					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
					series: [{
//	                    name: 'No. Of Routes',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.zone_wise_population,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25,
					obj : {layer_name: "Zone Boundary", column_name: "zone_name", column_type: "string",
//						ward_no: global.imcManagementModule.getSelectedWardNo()
						ward_no: "0"
					}
				});
				b2.chart();
				b2.clickOnChart();
			}
			
			simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b3 = new simpleBarChartObj({
					datacity: data.gts_list,
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
		            xname : 'GTS Name',
					yname : 'Weight',
//					legendtitle : 'Zone Name',
					config_chart: echarts.init(document.getElementById("gts_wise_weight_collection")),
//					bottom: '2%',
//					top: '2%',
					grid: { 
		                top: '10%',
		                left: '5%',
		                right: '4%',
		                bottom: '5%',
						height: '70%',
						containLabel: true
		            },
		            nameXTextStyle : {
						padding: [32, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 57, 0]
	                },
					formatter: function (value, index) {
						if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
					series: [{
//	                    name: 'No. Of Routes',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.gts_wise_weight_collection,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25
				});
				b3.chart();
				b3.clickOnChart();
			}
			
			simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
			
			if(simpleBarChartObj){
				let b4 = new simpleBarChartObj({
					datacity: ['Old Arrear', 'Current Due', 'Old Recovery', 'Current Recovery'],
					legend: {
		                show: true,
						icon: 'circle',
		                itemWidth: 10,
		                itemHeight: 10,
		                itemGap: 10,
						bottom: 0,
		            },
//		            xname : 'Tax',
					yname : 'Collection Amount',
//					legendtitle : 'Zone Name',
					config_chart: echarts.init(document.getElementById("ward_wise_property_tax")),
//					bottom: '2%',
//					top: '2%',
					grid: { 
		                top: '10%',
		                left: '7%',
		                right: '4%',
		                bottom: '5%',
						height: '70%',
						containLabel: true
		            },
		            nameXTextStyle : {
						padding: [10, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 70, 0]
	                },
					formatter: function (value, index) {
						if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,10);
					    str += "...";
					    return str;
					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
					series: [{
//	                    name: 'No. Of Routes',
	                    type: 'bar',
	                    stack: 'sum',
	                    barWidth: '15px',
	                    data: data.ward_wise_property_tax,
	                    itemStyle: {
	                        normal: {
	                            color: '#e8c185'
	                        }
	                    },
	                }],
					rotate: 25
				});
				b4.chart();
				b4.clickOnChart();
			}
			
//			simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
//			
//			if(simpleBarChartObj){
//				let series_data = [];
//				if(data.ward_wise_building_count !== null && data.ward_wise_building_count.length > 0){
//					series_data = [{value: data.ward_wise_building_count[0], itemStyle: {color: "#e8c185"}},
//						{value: data.ward_wise_building_count[1], itemStyle: {color: "#a16735"}}];
//				}
//				
//				let b5 = new simpleBarChartObj({
//					datacity: ['2015', '2020'],
//					legend: {
//		                show: true,
//						icon: 'circle',
//		                itemWidth: 10,
//		                itemHeight: 10,
//		                itemGap: 10,
//						bottom: 0,
//		            },
//		            xname : 'Year',
//					yname : 'No. of Buildings',
////					legendtitle : 'Zone Name',
//					config_chart: echarts.init(document.getElementById("ward_wise_building")),
////					bottom: '2%',
////					top: '2%',
//					grid: { 
//		                top: '10%',
//		                left: '7%',
//		                right: '4%',
//		                bottom: '5%',
//						height: '70%',
//						containLabel: true
//		            },
//		            nameXTextStyle : {
//						padding: [10, 0, 0, 0]
//					}, nameYTextStyle : {
//	                    padding: [0, 0, 65, 0]
//	                },
//					formatter: function (value, index) {
//						if(value.length <= 5){
//					    	return value;
//					    }
//						let str = value.substring(0,10);
//					    str += "...";
//					    return str;
//					},
////					legend: {
////		                show: true,
////						
////		                bottom:-5,
////						
////		            },
//					series: [{
////	                    name: 'No. Of Routes',
//	                    type: 'bar',
//	                    stack: 'sum',
//	                    barWidth: '15px',
////	                    data: series_data,
//	                    data: data.ward_wise_building_count,
////	                    itemStyle: {
////	                        normal: {
////	                            color: '#e8c185'
////	                        }
////	                    },
//	                }],
//					rotate: 25,
//					dataZoom : [{
//						type: 'inside',
//						start: 1,
//						end: 100
//					}, {
//						type: 'slider',
//						showDetail: false,
//					}],
//					obj : {layer_name: "Building", column_name: "floor_type", column_type: "string", 
//						column_value: $("#building_floor option:selected").val() ? $("#building_floor option:selected").val() : "0",
//						column_ward_no: $("#building_ward option:selected").val() ? $("#building_ward option:selected").val() : "0"}
//		        });
//				b5.chart();
//				b5.clickOnChart();
//			}
			
//			let multiBarChartObj = global.dashboardChartsModule.getMultiBarChart();
//			
//			if(multiBarChartObj){
//				new multiBarChartObj({
//					legend: {
//						data: data.transaction_types 
//					},
//					config_chart: echarts.init(document.getElementById("equipment_type_wise_collection")),
//					xAxis: [
//						{
//							type: 'category',
//					        axisTick: {show: false},
//					        data: data.transaction_types
//					    }
//					],
//					grid: { 
//		                top: '10%',
//		                left: '4%',
//		                right: '4%',
//		                bottom: '5%',
//						height: '70%',
//						containLabel: true
//		            },
//					series: data.equipment_type_wise_collection
//				}).chart();
//			}
			
		}, getZoneList : function(id){
			if(global.imcManagementModule.zoneList == null){
				fetch(zoneUrl, {
					method : "GET",
					headers : {
						"Accept" : "application/json",
						"Authorization" : "Bearer " + localStorage.getItem('token')
					}
				})
				.then((response) => response.json())
				.then((response) => {
					global.imcManagementModule.zoneList = response.data;
					let content = '<option value="0">All</option>';
					response.data.forEach(function(element){
						content += "<option value='"+element.zone_no+"'>"+element.zone_name+"-"+element.zone_no+"</option>";
					});
					
					$("#" + id).html(content);
				})
				.catch((e) => {
					console.error(e);
				});
				
			}
			
		}, getISWMData: function(zoneid){
			fetch(iswmUrl, {
				method : "POST",
				headers : {
					"Accept" : "application/json",
					"Authorization" : "Bearer " + localStorage.getItem('token'),
				}, body : JSON.stringify({
					"zone_id" : zoneid ? zoneid : "0"
				})
			})
			.then(response => response.json())
			.then(response => {
				let pieChartObj = global.dashboardChartsModule.getPieChart();
				
				if(pieChartObj){
					let p1 = new pieChartObj({
						/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
						data : response.status_wise_vehicles,
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
							,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
							'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
					    companybar_chart: echarts.init(document.getElementById('status_wise_vehicles'))
					});
					p1.chart();
					p1.clickOnChart();
				}
				
				let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
				
				if(simpleBarChartObj){
					let b1 = new simpleBarChartObj({
						datacity: response.gts_list,
						legend: {
			                show: true,
							icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 0,
			            },
			            xname : 'GTS Name',
						yname : 'Weight',
//						legendtitle : 'Zone Name',
						config_chart: echarts.init(document.getElementById("gts_wise_weight_collection")),
//						bottom: '2%',
//						top: '2%',
						grid: { 
			                top: '10%',
			                left: '5%',
			                right: '4%',
			                bottom: '5%',
							height: '70%',
							containLabel: true
			            },
			            nameXTextStyle : {
							padding: [32, 0, 0, 0]
						}, nameYTextStyle : {
		                    padding: [0, 0, 57, 0]
		                },
						formatter: function (value, index) {
							if(value.length <= 5){
						    	return value;
						    }
							let str = value.substring(0,10);
						    str += "...";
						    return str;
						},
//						legend: {
//			                show: true,
//							
//			                bottom:-5,
//							
//			            },
						series: [{
//		                    name: 'No. Of Routes',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: response.gts_wise_weight_collection,
		                    itemStyle: {
		                        normal: {
		                            color: '#e8c185'
		                        }
		                    },
		                }],
						rotate: 25
					});
					b1.chart();
					b1.clickOnChart();
				}
				
			})
			.catch(e => {
				console.error(e);
			});
		},getIndore311Data: function(ward_id, zone_id, from_date, to_date){
			var d1 = Date.parse(from_date);
			var d2 = Date.parse(to_date);
			var d3 = new Date(d1).toLocaleDateString();
			var d4 = new Date(d2).toLocaleDateString();
			if(d1>d2 && d3 != d4){
				$u.notify('warning', 'Warning',
						'Please select proper dates !', '');
				return;
			}
			
			
			fetch(indore311Url, {
				method : "POST",
				headers : {
					"Accept" : "application/json",
					"Authorization" : "Bearer " + localStorage.getItem('token'),
				}, body : JSON.stringify({
					"ward_id" : ward_id ? ward_id : "0",
					"zone_id" : zone_id ? zone_id : "0",
					"from_date" : from_date,
					"to_date" : to_date
				})
			})
			.then(response => response.json())
			.then(response => {
				let pieChartObj = global.dashboardChartsModule.getPieChart();
				if(pieChartObj){
					echarts.dispose(document.getElementById('category_wise_complaints'));
					echarts.dispose(document.getElementById('status_wise_complaints'));
					
					let p1 = new pieChartObj({
						data : response.category_wise_complaints,
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
							,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
							'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
					    companybar_chart: echarts.init(document.getElementById('category_wise_complaints')),
					    obj: {layer_name: "Indore 311", ward_no: global.imcManagementModule.getSelectedWardNo()}
					});
					p1.chart();
					p1.clickOnChart();
					
					let p2 = new pieChartObj({
						data : response.status_wise_complaints,
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
							,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
							'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
					    companybar_chart: echarts.init(document.getElementById('status_wise_complaints')),
					    obj: {layer_name: "Indore 311", ward_no: global.imcManagementModule.getSelectedWardNo()}
					});
					p2.chart();
					p2.clickOnChart();
				}
			})
			.catch(e => {
				console.error(e);
			});
		}, getPropertyTaxData : function(ward_id, zone_id, from_date, to_date){
			var d1 = Date.parse(from_date);
			var d2 = Date.parse(to_date);
			var d3 = new Date(d1).toLocaleDateString();
			var d4 = new Date(d2).toLocaleDateString();
			if(d1>d2 && d3 != d4){
				$u.notify('warning', 'Warning',
						'Please select proper dates !', '');
				return;
			}
			
			fetch(propertyTaxUrl, {
				method : "POST",
				headers : {
					"Accept" : "application/json",
					"Authorization" : "Bearer " + localStorage.getItem('token'),
				}, body : JSON.stringify({
					"ward_id" : ward_id ? ward_id : "0",
					"zone_id" : zone_id ? zone_id : "0",
					"from_date" : from_date,
					"to_date" : to_date
				})
			})
			.then(response => response.json())
			.then(response => {
				echarts.dispose(document.getElementById('construction_type_wise_property_tax'));
				echarts.dispose(document.getElementById('ward_wise_property_tax'));
				
				let pieChartObj = global.dashboardChartsModule.getPieChart();
				
				if(pieChartObj){
					let p1 = new pieChartObj({
						/*data: [{ value: 17, name: 'East', }, { value: 23, name: 'West' }, { value: 27, name: 'North' }, { value: 27, name: 'South' }],*/
						data : response.construction_type_wise_property_tax,
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
							,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
							'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
					    companybar_chart: echarts.init(document.getElementById('construction_type_wise_property_tax'))
					});
					p1.chart();
					p1.clickOnChart();
				}
				
				let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
				
				if(simpleBarChartObj){
					let b1 = new simpleBarChartObj({
						datacity: ['Old Arrear', 'Current Due', 'Old Recovery', 'Current Recovery'],
						legend: {
			                show: true,
							icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 0,
			            },
//			            xname : 'Tax',
						yname : 'Collection Amount',
//						legendtitle : 'Zone Name',
						config_chart: echarts.init(document.getElementById("ward_wise_property_tax")),
//						bottom: '2%',
//						top: '2%',
						grid: { 
			                top: '10%',
			                left: '7%',
			                right: '4%',
			                bottom: '5%',
							height: '70%',
							containLabel: true
			            },
			            nameXTextStyle : {
							padding: [10, 0, 0, 0]
						}, nameYTextStyle : {
		                    padding: [0, 0, 70, 0]
		                },
						formatter: function (value, index) {
							if(value.length <= 5){
						    	return value;
						    }
							let str = value.substring(0,10);
						    str += "...";
						    return str;
						},
//						legend: {
//			                show: true,
//							
//			                bottom:-5,
//							
//			            },
						series: [{
//		                    name: 'No. Of Routes',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: response.ward_wise_property_tax,
		                    itemStyle: {
		                        normal: {
		                            color: '#e8c185'
		                        }
		                    },
		                }],
						rotate: 25
					});
					b1.chart();
					b1.clickOnChart();
				}
			})
			.catch(e => {
				console.error(e);
			});
			
		}, getBuildingData : function(ward_id, floor_category){
			
			fetch(buildingUrl, {
				method : "POST",
				headers : {
					"Accept" : "application/json",
					"Authorization" : "Bearer " + localStorage.getItem('token'),
				}, body : JSON.stringify({
					"ward_id" : ward_id ? ward_id : "0",
					"floor_category" : floor_category ? floor_category : "0"
				})
			})
			.then(response => response.json())
			.then(response => {
				
				echarts.dispose(document.getElementById('year_wise_building_count'));
				let pieChartObj = global.dashboardChartsModule.getPieChart();
				let p80 = new pieChartObj({
					data : response.year_wise_building_count,
					colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'
						,'#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735','#dfc2a9','#c39c4f', 
						'#f0c27a','#a16735','#dfc2a9','#c39c4f'],
				    companybar_chart: echarts.init(document.getElementById('year_wise_building_count')),
				    obj : {layer_name: "Building", column_name: "floor_type", column_type: "string", 
						column_value: $("#building_floor option:selected").val() ? $("#building_floor option:selected").val() : "0",
						column_ward_no: $("#building_ward option:selected").val() ? $("#building_ward option:selected").val() : "0"}
				});
				p80.chart();
				p80.clickOnChart();
				
				
//				echarts.dispose(document.getElementById('ward_wise_building'));
//				
//				let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
//				
//				if(simpleBarChartObj){
//					let series_data = [];
//					if(response.ward_wise_building_count !== null && response.ward_wise_building_count.length > 0){
//						series_data = [{value: response.ward_wise_building_count[0], itemStyle: {color: "#e8c185"}},
//							{value: response.ward_wise_building_count[1], itemStyle: {color: "#a16735"}}];
//					}
//					
//					let b5 = new simpleBarChartObj({
//						datacity: ['2015', '2020'],
//						legend: {
//			                show: true,
//							icon: 'circle',
//			                itemWidth: 10,
//			                itemHeight: 10,
//			                itemGap: 10,
//							bottom: 0,
//			            },
//			            xname : 'Year',
//						yname : 'No. of Buildings',
////						legendtitle : 'Zone Name',
//						config_chart: echarts.init(document.getElementById("ward_wise_building")),
////						bottom: '2%',
////						top: '2%',
//						grid: { 
//			                top: '10%',
//			                left: '7%',
//			                right: '4%',
//			                bottom: '5%',
//							height: '70%',
//							containLabel: true
//			            },
//			            nameXTextStyle : {
//							padding: [10, 0, 0, 0]
//						}, nameYTextStyle : {
//		                    padding: [0, 0, 70, 0]
//		                },
//						formatter: function (value, index) {
//							if(value.length <= 5){
//						    	return value;
//						    }
//							let str = value.substring(0,10);
//						    str += "...";
//						    return str;
//						},
////						legend: {
////			                show: true,
////							
////			                bottom:-5,
////							
////			            },
//						series: [{
////		                    name: 'No. Of Routes',
//		                    type: 'bar',
//		                    stack: 'sum',
//		                    barWidth: '15px',
////		                    data: series_data,
//		                    data: response.ward_wise_building_count,
////		                    itemStyle: {
////		                        normal: {
////		                            color: '#e8c185'
////		                        }
////		                    },
//		                }],
//						rotate: 25,
//						dataZoom : [{
//							type: 'inside',
//							start: 1,
//							end: 100
//						}, {
//							type: 'slider',
//							showDetail: false,
//						}],
//						obj : {layer_name: "Building", column_name: "floor_type", column_type: "string", 
//							column_value: $("#building_floor option:selected").val() ? $("#building_floor option:selected").val() : "0",
//							column_ward_no: $("#building_ward option:selected").val() ? $("#building_ward option:selected").val() : "0"}
//					});
//					b5.chart();
//					b5.clickOnChart();
//				}
			})
			.catch(e => {
				console.error(e);
			});
			
		}, getSelectedWardNo : function(){
			return $("#imcWard option:selected").val() ? $("#imcWard option:selected").val() : "0";
		}
	}

	global.imcManagementModule = dashboard;

})(window, jQuery);

