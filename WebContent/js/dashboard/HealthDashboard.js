(function(global, $) {
	
	const wardid = "healthWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
						
			try {
				global.dashboardModule.getWards(wardid);
				
//				echarts.dispose(document.getElementById('facilitywise'));
				echarts.dispose(document.getElementById('ownership_hospital'));
//				echarts.dispose(document.getElementById('categorywise_hospital'));
				echarts.dispose(document.getElementById('emergency_services'));
				echarts.dispose(document.getElementById('blood_bank_facility'));
				echarts.dispose(document.getElementById('mortuary_facility'));
				
				echarts.dispose(document.getElementById('wardWiseHospitals'));
				echarts.dispose(document.getElementById('hospital_wise_icu_count'));
				echarts.dispose(document.getElementById('wardWisePharmacy'));
				echarts.dispose(document.getElementById('ward_wise_uphc'));
				
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			/*------------------------------- Health Start -------------------------------*/
			
				try{
					global.healthDashboardModule.setRequiredEvent();
				} catch (e) {}
			
				try {
					$(".total-hospital").text(data.total_hospitals);
					$(".total-hospital").attr('title', data.total_hospitals);
					
					/*$(".total-hospital").text(100);
					$(".total-hospital").attr('title', 100);*/
					
				} catch (e) {}
				try {
					$(".total-uphc").text(data.total_uphc);
					$(".total-uphc").attr('title', data.total_uphc);
					
					/*$(".total-uphc").text(200);
					$(".total-uphc").attr('title', 200);*/
					
				} catch (e) {}
				
				try {
					$(".total-clinics").text(data.total_clinics);
					$(".total-clinics").attr('title', data.total_clinics);
				} catch (e) {}
				
				
				try {
					$(".total_pharmacies").text(data.total_pharmacies);
					$(".total_pharmacies").attr('title', data.total_pharmacies);
				} catch (e) {}

				try{
					let obj = {"schema_name":"map","table_name":"tbl_health_hospital"};
					global.dashboardModule.getDashboardUpdatedDate(obj);
					
					obj = {"schema_name":"map","table_name":"tbl_health_uphc"};
					global.dashboardModule.getDashboardUpdatedDate(obj);
					
					obj = {"schema_name":"map","table_name":"tbl_pharmacies"};
					global.dashboardModule.getDashboardUpdatedDate(obj);
				}catch(e){}
				
				let pieChartFunc = global.dashboardChartsModule.getPieChart();
				
				if(pieChartFunc){
					
//					let p1 = new pieChartFunc({
//					    /*data: [{ value: 17, name: 'ICU', }, { value: 20, name: 'Beds' }, { value: 26, name: 'Canteen' }, { value: 11, name: 'Blood Bank' }, { value: 21, name: 'Mortuary' }],*/
//					    data: data.facility_wise,
//						colorList: ['#b18119', '#c9a142','#e0c164','#edd983','#feeea2'],
//					    companybar_chart: echarts.init(document.getElementById('facilitywise'))
//					});
//					p1.chart();
//					p1.clickOnChart({layer_name: "Hospital", column_type: "string", value: "Yes",
//						ward_no: global.healthDashboardModule.getSelectedWardNo()});
					
					let p2 = new pieChartFunc({
					    /*data: [{ value: 17, name: 'Public', }, { value: 26, name: 'Private' }],*/
					    data: data.ownership_type_chart,
						colorList: ['#c7853f','#f1c27e'],
					    companybar_chart: echarts.init(document.getElementById('ownership_hospital')),
					    obj : {layer_name: "Hospital", column_name: "ownership_type", column_type: "string",
							ward_no: global.healthDashboardModule.getSelectedWardNo()}
					});
					p2.chart();
					p2.clickOnChart();
					
//					let p3 = new pieChartFunc({
//					    /*data: [{ value: 17, name: 'Children', }, { value: 20, name: 'Cancer' }, { value: 26, name: 'TB' }, { value: 33, name: 'ENT' },{ value: 12, name: 'Specialists' }],*/
//					    data: data.category_wise,
//						colorList: ['#806854', '#a08a77','#cfb795','#dbcdab','#f1e6c8'],
//					    companybar_chart: echarts.init(document.getElementById('categorywise_hospital')),
//					    obj : {layer_name: "Hospital", column_name: "hospital_category", column_type: "string",
//							ward_no: global.healthDashboardModule.getSelectedWardNo()}
//					});
//					p3.chart();
//					p3.clickOnChart();
					
					let p4 = new pieChartFunc({
					    /*data: [{ value: 17, name: 'Children', }, { value: 20, name: 'Cancer' }, { value: 26, name: 'TB' }, { value: 33, name: 'ENT' },{ value: 12, name: 'Specialists' }],*/
					    data: data.emergency_services,
					    formatter: '{b}: {c}%',
						colorList: ['#b18119', '#c9a142','#e0c164','#edd983','#feeea2'],
					    companybar_chart: echarts.init(document.getElementById('emergency_services')),
					    obj : {layer_name: "Hospital", column_name: "Emergency_service_24_hours_open_108_facility", column_type: "string",
							ward_no: global.healthDashboardModule.getSelectedWardNo()}
					});
					p4.chart();
					p4.clickOnChart();
					
					let p5 = new pieChartFunc({
					    /*data: [{ value: 17, name: 'Children', }, { value: 20, name: 'Cancer' }, { value: 26, name: 'TB' }, { value: 33, name: 'ENT' },{ value: 12, name: 'Specialists' }],*/
					    data: data.blood_bank_facility,
					    formatter: '{b}: {c}%',
						colorList: ['#b18119', '#c9a142','#e0c164','#edd983','#feeea2'],
					    companybar_chart: echarts.init(document.getElementById('blood_bank_facility')),
					    obj : {layer_name: "Hospital", column_name: "blood_bank_facility", column_type: "string",
							ward_no: global.healthDashboardModule.getSelectedWardNo()}
					});
					p5.chart();
					p5.clickOnChart();
					
					let p6 = new pieChartFunc({
					    /*data: [{ value: 17, name: 'Children', }, { value: 20, name: 'Cancer' }, { value: 26, name: 'TB' }, { value: 33, name: 'ENT' },{ value: 12, name: 'Specialists' }],*/
					    data: data.mortuary_facility,
					    formatter: '{b}: {c}%',
						colorList: ['#806854', '#a08a77','#cfb795','#dbcdab','#f1e6c8'],
					    companybar_chart: echarts.init(document.getElementById('mortuary_facility')),
					    obj : {layer_name: "Hospital", column_name: "mortuary", column_type: "string",
							ward_no: global.healthDashboardModule.getSelectedWardNo()}
					});
					p6.chart();
					p6.clickOnChart();
					
//					
//					new pieChartFunc({
//					    /*data: [{ value: 17, name: 'Children', }, { value: 20, name: 'Cancer' }, { value: 26, name: 'TB' }, { value: 33, name: 'ENT' },{ value: 12, name: 'Specialists' }],*/
//					    data: data.ownership_type,
//						colorList: ['#806854', '#a08a77','#cfb795','#dbcdab','#f1e6c8'],
//					    companybar_chart: echarts.init(document.getElementById('ownership_type'))
//					}).chart();
				}
				
				let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
				
				if(simpleBarChartObj){
					let b1 = new simpleBarChartObj({
						datacity: data.hospital_wards,
						legend: {
			                show: true,
							icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 0,
			            },
			            xname : 'Ward Name',
						yname : 'No. of Hospitals',
						bottom: '2%',
						top: '2%',
			            grid: { 
			                top: '15%',
			                left: '3%',
			                right: '4%',
			                bottom: '05%',
							height: '65%',
							containLabel: true
			            },
						legendtitle : 'Ward Name',
						config_chart: echarts.init(document.getElementById("wardWiseHospitals")),
						nameXTextStyle : {
							padding: [35, 0, 0, 0]
						}, nameYTextStyle : {
		                    padding: [0, 0, 13, 0]
		                }, formatter: function (value, index) {
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
			            dataZoom: [{
							type: 'inside',
							start: 1,
							end: 10
						}, {
							type: 'slider',
							showDetail: false,
						}],
						series: [{
//		                    name: 'No. Of Routes',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.ward_wise_hospitals,
		                    itemStyle: {
		                        normal: {
		                            color: '#e8c185'
		                        }
		                    },
		                }],
						rotate: 25,
						obj : {layer_name: "Hospital", column_name: "ward_name", column_type: "string",
							ward_no: global.healthDashboardModule.getSelectedWardNo()}
					});
					b1.chart();
					b1.clickOnChart();
				}
				
				simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
				
				if(simpleBarChartObj){
					let b2 = new simpleBarChartObj({
						datacity: data.hospital_with_icu,
						legend: {
			                show: true,
							icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 0,
			            },
			            xname : 'Hospital Name',
						yname : 'No. of ICU',
						bottom: '2%',
						top: '2%',
			            grid: { 
			                top: '15%',
			                left: '3%',
			                right: '4%',
			                bottom: '05%',
							height: '65%',
							containLabel: true
			            },
						legendtitle : 'Hospital Name',
						config_chart: echarts.init(document.getElementById("hospital_wise_icu_count")),
						nameXTextStyle : {
							padding: [27, 0, 0, 0]
						}, nameYTextStyle : {
		                    padding: [0, 0, 13, 0]
		                }, formatter: function (value, index) {
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
		                    data: data.icu_count,
		                    itemStyle: {
		                        normal: {
		                            color: '#e8c185'
		                        }
		                    },
		                }],
						rotate: 25,
						obj : {layer_name: "Hospital", column_name: "hospital_name", column_type: "string",
							ward_no: global.healthDashboardModule.getSelectedWardNo(),
							column_name_1: "no_of_icu", column_type_1: "number"}
					});
					b2.chart();
					b2.clickOnChart();
				}
				
				try{
					simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
					
					if(simpleBarChartObj){
						let b3 = new simpleBarChartObj({
							datacity: data.pharmacy_wards,
							legend: {
				                show: true,
								icon: 'circle',
				                itemWidth: 10,
				                itemHeight: 10,
				                itemGap: 10,
								bottom: 0,
				            },
				            xname : 'Ward Name',
							yname : 'No. of Pharmacies',
							bottom: '2%',
							top: '2%',
				            grid: { 
				                top: '15%',
				                left: '3%',
				                right: '4%',
				                bottom: '05%',
								height: '65%',
								containLabel: true
				            },
							legendtitle : 'Ward Name',
							config_chart: echarts.init(document.getElementById("wardWisePharmacy")),
							nameXTextStyle : {
								padding: [35, 0, 0, 0]
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
//							legend: {
//				                show: true,
//								
//				                bottom:-5,
//								
//				            },
							series: [{
//			                    name: 'No. Of Routes',
			                    type: 'bar',
			                    stack: 'sum',
			                    barWidth: '15px',
			                    data: data.ward_wise_pharmacies,
			                    itemStyle: {
			                        normal: {
			                            color: '#e8c185'
			                        }
			                    },
			                }],
							rotate: 25,
							obj : {layer_name: "Pharmacy", column_name: "ward_name", column_type: "string",
								ward_no: global.healthDashboardModule.getSelectedWardNo()}
						});
						b3.chart();
						b3.clickOnChart();
					}
				}catch(e){
					
				}
				
				
				simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
				
				if(simpleBarChartObj){
					let b4 = new simpleBarChartObj({
						datacity: data.uphc_wards,
						legend: {
			                show: true,
							icon: 'circle',
			                itemWidth: 10,
			                itemHeight: 10,
			                itemGap: 10,
							bottom: 0,
			            },
			            xname : 'Ward Name',
						yname : 'No. of UPHC',
						bottom: '2%',
						top: '2%',
			            grid: { 
			                top: '15%',
			                left: '3%',
			                right: '4%',
			                bottom: '05%',
							height: '65%',
							containLabel: true
			            },
						legendtitle : 'Ward Name',
						config_chart: echarts.init(document.getElementById("ward_wise_uphc")),
						nameXTextStyle : {
							padding: [35, 0, 0, 0]
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
		                    data: data.ward_wise_uphc,
		                    itemStyle: {
		                        normal: {
		                            color: '#e8c185'
		                        }
		                    },
		                }],
						rotate: 25,
						obj : {layer_name: "UPHC", column_name: "ward_name", column_type: "string",
							ward_no: global.healthDashboardModule.getSelectedWardNo()}
					});
					b4.chart();
					b4.clickOnChart();
				}
				
			/*------------------------------- Health End ---------------------------------*/
				
		}, getSelectedWardNo : function(){
			return $("#healthWard option:selected").val() ? $("#healthWard option:selected").val() : "0";
		}
	}
	global.healthDashboardModule = dashboard;

})(window, jQuery);