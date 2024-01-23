/**
 * 
 */
(function(global, $) {
	
	const wardid = "idaWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				echarts.dispose(document.getElementById('idaBoundry'));
				echarts.dispose(document.getElementById('DevelopedSchemeArea'));
				echarts.dispose(document.getElementById('ProposedSchemeArea'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			/*------------------------------- IDA Start -------------------------------*/
			
			try{
				global.idaDashboardModule.setRequiredEvent();
			} catch (e) {}
			
			try {
				$(".total-tp-scheme-count").text(data.total_tp_scheme_count);
				$(".total-tp-scheme-count").attr('title', data.total_tp_scheme_count);
			} catch (e) {}
			
			try {
				$(".tp-schemes-count").text(data.tp_schemes_count);
				$(".tp-schemes-count").attr('title', data.tp_schemes_count);
			} catch (e) {}
			
			try {
				$(".defaulters-count").text(data.defaulters_count);
				$(".defaulters-count").attr('title', data.defaulters_count);
			} catch (e) {}
		
			try {
				$(".total-developed-scheme-count").text(data.total_developed_scheme);
				$(".total-developed-scheme-count").attr('title', data.total_developed_scheme);
			} catch (e) {}
			
			try {
				$(".total-proposed-scheme-count").text(data.total_proposed_scheme);
				$(".total-proposed-scheme-count").attr('title', data.total_proposed_scheme);
			} catch (e) {}
			
			try{
				let obj = {"schema_name":"map","table_name":"tbl_ida"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
			}catch(e){}
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			if(pieChartObj){
				
				let p1 = new pieChartObj({
					/*data: [{ value: 17, name: 'Implemented', }, { value: 23, name: 'Notified' }, { value: 23, name: 'Drop Scheme' }, { value: 23, name: 'Under Development Stage' }],*/
					data: data.ida_boundary_data,
					colorList: ['#b18218','#c9a142','#dfc166','#edd885'],
				    companybar_chart: echarts.init(document.getElementById('idaBoundry')),
				    obj : {layer_name: "IDA Scheme Boundary", column_type: "string",
						ward_no: global.idaDashboardModule.getSelectedWardNo()}
				});
				p1.chart();
				p1.clickOnChart();
			}
			
			let barChart = global.dashboardChartsModule.getSimpleBarChart();
			
			if(barChart){
				
				let b1 = new barChart({
				    datacity : data.developed_scheme_wards,//['Ward 1','Ward 2','Ward 3','Ward 4', 'Ward 5','Ward 6','Ward 7','Ward 8' , 'Ward 9','Ward 10'],//['0-20','21-40','41-60','61-80'],
					//singleLagend : 'No. Of ESR',
					simpleColor : '#826754',
					xname : 'Ward Name',
					yname : 'Area',
					bottom: '2%',
					top: '2%',
					grid: { 
		                top: '10%',
		                left: '3%',
		                right: '4%',
		                bottom: '5%',
						height: '70%',
						containLabel: true
		            },
		            nameXTextStyle : {
						padding: [25, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 55, 0]
	                },
					formatter: function (value, index) {
						if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,5);
					    str += "...";
					    return str;
					},
					series: [{
		                    name: 'Area',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.developed_scheme_area,// [3, 5, 4, 8, 3, 5, 4, 8, 3, 5],
		                    itemStyle: {
		                        normal: {
		                            color: '#826754'
		                        }
		                    }
		            }],
					rotate: 25,
					config_chart: echarts.init(document.getElementById('DevelopedSchemeArea')),
					obj : {layer_name: "IDA Scheme Boundary", column_name: "ward_name", column_type: "string",
						ward_no: global.idaDashboardModule.getSelectedWardNo(),
						column_name_1: "scheme_type", column_type_1: "string", value_1: "Developed Schemes"}
				});
				b1.chart();
				b1.clickOnChart();
			}
			
			barChart = global.dashboardChartsModule.getSimpleBarChart();
			
			if(barChart){
				
				let b2 = new barChart({
				    datacity : data.proposed_scheme_wards,//['Ward 1','Ward 2','Ward 3','Ward 4', 'Ward 5','Ward 6','Ward 7','Ward 8' , 'Ward 9','Ward 10'],//['0-20','21-40','41-60','61-80'],
					//singleLagend : 'No. Of ESR',
					simpleColor : '#826754',
					xname : 'Ward Name',
					yname : 'Area',
					bottom: '2%',
					top: '2%',
					grid: { 
		                top: '10%',
		                left: '3%',
		                right: '4%',
		                bottom: '5%',
						height: '70%',
						containLabel: true
		            },
		            nameXTextStyle : {
						padding: [25, 0, 0, 0]
					}, nameYTextStyle : {
	                    padding: [0, 0, 55, 0]
	                },
					formatter: function (value, index) {
						if(value.length <= 5){
					    	return value;
					    }
						let str = value.substring(0,5);
					    str += "...";
					    return str;
					},
					series: [{
		                    name: 'Area',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.proposed_scheme_area,// [3, 5, 4, 8, 3, 5, 4, 8, 3, 5],
		                    itemStyle: {
		                        normal: {
		                            color: '#826754'
		                        }
		                    }
		            }],
					rotate: 25,
					config_chart: echarts.init(document.getElementById('ProposedSchemeArea')),
					obj : {layer_name: "IDA Scheme Boundary", column_name: "ward_name", column_type: "string",
						ward_no: global.idaDashboardModule.getSelectedWardNo(),
						column_name_1: "scheme_type", column_type_1: "string", value_1: "Proposed Schemes"}
				});
				b2.chart();
				b2.clickOnChart();
			}
			
			/*------------------------------- IDA End ---------------------------------*/
				
		}, getSelectedWardNo : function(){
			return $("#idaWard option:selected").val() ? $("#idaWard option:selected").val() : "0";
		}
	}
	
	global.idaDashboardModule = dashboard;

})(window, jQuery);