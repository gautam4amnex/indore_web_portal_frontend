/**
 * 
 */
(function(global, $) {
	
	const wardid = "educationWard";
	
	let dashboard = {
			
		setRequiredEvent : function(){
			
			try {
				global.dashboardModule.getWards(wardid);
				
				echarts.dispose(document.getElementById('play_ground_wise_primary_schools'));
				echarts.dispose(document.getElementById('male_hostel_wise_primary_schools'));
				echarts.dispose(document.getElementById('female_hostel_wise_primary_schools'));
				echarts.dispose(document.getElementById('play_ground_wise_secondary_schools'));
				echarts.dispose(document.getElementById('male_hostel_wise_secodary_schools'));
				echarts.dispose(document.getElementById('female_hostel_wise_secodary_schools'));
				
				echarts.dispose(document.getElementById('ward_wise_count'));
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			
			try{
				global.educationManagementModule.setRequiredEvent();
			} catch (e) {}
			
			
			try{
				$(".total-primary-schools").text(data.total_primary_schools);
				$(".total-primary-schools").attr('title', data.total_primary_schools);
				
				/*$(".total-primary-schools").text(10);
				$(".total-primary-schools").attr('title', 10);*/
				
			}catch(e){}
			
			try{
				$(".total-secondary-schools").text(data.total_secondary_schools);
				$(".total-secondary-schools").attr('title', data.total_secondary_schools);
				/*$(".total-secondary-schools").text(20);
				$(".total-secondary-schools").attr('title', 20);*/
			}catch(e){}
			
			
			try{
				$(".total_institutes").text(data.total_institutes);
				$(".total_institutes").attr('title', data.total_institutes);
				
			}catch(e){}
			
			try{
				let obj = {"schema_name":"map","table_name":"tbl_edu_college_university"};
				global.dashboardModule.getDashboardUpdatedDate(obj);
			}catch(e){}
			
			let primaryStudentBarChart = global.dashboardChartsModule.getBarYChart();
			
			if(primaryStudentBarChart){
				
				try {
					let a = new primaryStudentBarChart({
						yaxis : data.schools,
						/*yaxis : [ 'Secondary','Primary','College/University'],*/
						series : [{
							name: '25',
							type: 'bar',
							data: data.school_counts,
							/*data: [19325, 23438, 31000],*/
							color:'#efc17d',
							width:'5px'
						}],
						config_chart : echarts.init(document.getElementById("CategorywiseInstitute"))
					});
					a.chart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
			}
			
			let pieChartObj = global.dashboardChartsModule.getPieChart();
			
			if(pieChartObj){
				
				try {
					let p1 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.management_wise_primary,
						colorList: ['#5f3b14','#e1ac67', '#f1c27e'],
					    companybar_chart: echarts.init(document.getElementById('catPrimaryScl'))
					});
					p1.chart();
					p1.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p2 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.secondary_schools,
						colorList: ['#5f3b14','#e1ac67', '#f1c27e'],
					    companybar_chart: echarts.init(document.getElementById('catSecondaryScl'))
					});
					p2.chart();
					p2.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p3 = new pieChartObj({
						/*data: [{ value: 17, name: 'Boys', }, { value: 33, name: 'Girls' },{ value: 12, name: 'Co-Ed' }],*/
						data: data.category_wise_primary,
						colorList: ['#dccdae', '#b39b7d','#806756'],
					    companybar_chart: echarts.init(document.getElementById('studPrimaryScl'))
					});
					p3.chart();
					p3.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p4 = new pieChartObj({
						/*data: [{ value: 17, name: 'Boys', }, { value: 33, name: 'Girls' }],*/
						data: data.gender_wise_primary,
						colorList: ['#edd983', '#c8a042'],
					    companybar_chart: echarts.init(document.getElementById('teacPrimaryScl'))
					});
					p4.chart();
					p4.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p5 = new pieChartObj({
						/*data: [{ value: 17, name: 'Boys', }, { value: 33, name: 'Girls' }],*/
						data: data.gender_wise_secondary,
						colorList: ['#edd983', '#c8a042'],
					    companybar_chart: echarts.init(document.getElementById('teacSecondaryScl'))
					});
					p5.chart();
					p5.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p6 = new pieChartObj({
					    /*data: [{ value: 17, name: 'Boys', }, { value: 33, name: 'Girls' },{ value: 12, name: 'Co-Ed' }],*/
					    data: data.category_wise_secondary,
						colorList: ['#dccdae', '#b39b7d','#806756'],
					    companybar_chart: echarts.init(document.getElementById('studSecondaryScl'))
					});
					p6.chart();
					p6.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p7 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.management_wise_secondary,
						colorList: ['#5f3b14','#e1ac67', '#f1c27e'],
					    companybar_chart: echarts.init(document.getElementById('catSecondaryScl'))
					});
					p7.chart();
					p7.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
//				try {
//					let p8 = new pieChartObj({
//						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
//						data: data.percentage_wise_institutes,
//						formatter: '{b}: {c}%',
//						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
//					    companybar_chart: echarts.init(document.getElementById('percentage_wise_institutes'))
//					});
//					p8.chart();
//					p8.clickOnChart();
//				} catch (e) {
//					// TODO: handle exception
//					console.error(e);
//				}
				
//				try {
//					let p9 = new pieChartObj({
//						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
//						data: data.play_ground_wise_institutes,
//						formatter: '{b}: {c}%',
//						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
//					    companybar_chart: echarts.init(document.getElementById('play_ground_wise_institutes'))
//					});
//					p9.chart();
//					p9.clickOnChart();
//				} catch (e) {
//					// TODO: handle exception
//					console.error(e);
//				}
				
//				try {
//					let p10 = new pieChartObj({
//						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
//						data: data.male_hostel_wise_institutes,
//						formatter: '{b}: {c}%',
//						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
//					    companybar_chart: echarts.init(document.getElementById('male_hostel_wise_institutes'))
//					});
//					p10.chart();
//					p10.clickOnChart();
//				} catch (e) {
//					// TODO: handle exception
//					console.error(e);
//				}
				
//				try {
//					let p11 = new pieChartObj({
//						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
//						data: data.female_hostel_wise_institutes,
//						formatter: '{b}: {c}%',
//						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
//					    companybar_chart: echarts.init(document.getElementById('female_hostel_wise_institutes'))
//					});
//					p11.chart();
//					p11.clickOnChart();
//				} catch (e) {
//					// TODO: handle exception
//					console.error(e);
//				}
				
				try {
					let p12 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.male_hostel_wise_primary_schools,
						formatter: '{b}: {c}%',
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
					    companybar_chart: echarts.init(document.getElementById('male_hostel_wise_primary_schools')),
					    obj: {layer_name:"Primary School", column_name: "male_hostel", column_type: "string",
					    	ward_no: global.educationManagementModule.getSelectedWardNo()}
					});
					p12.chart();
					p12.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p13 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.female_hostel_wise_primary_schools,
						formatter: '{b}: {c}%',
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
					    companybar_chart: echarts.init(document.getElementById('female_hostel_wise_primary_schools')),
					    obj: {layer_name:"Primary School", column_name: "female_hostel", column_type: "string",
					    	ward_no: global.educationManagementModule.getSelectedWardNo()}
					});
					p13.chart();
					p13.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p14 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.play_ground_wise_primary_schools,
						formatter: '{b}: {c}%',
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
					    companybar_chart: echarts.init(document.getElementById('play_ground_wise_primary_schools')),
					    obj: {layer_name:"Primary School", column_name: "play_ground", column_type: "string",
					    	ward_no: global.educationManagementModule.getSelectedWardNo()}
					});
					p14.chart();
					p14.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p15 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.male_hostel_wise_secodary_schools,
						formatter: '{b}: {c}%',
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
					    companybar_chart: echarts.init(document.getElementById('male_hostel_wise_secodary_schools')),
					    obj: {layer_name:"Secondary School", column_name: "male_hostel", column_type: "string",
					    	ward_no: global.educationManagementModule.getSelectedWardNo()}
					});
					p15.chart();
					p15.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p16 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.female_hostel_wise_secodary_schools,
						formatter: '{b}: {c}%',
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
					    companybar_chart: echarts.init(document.getElementById('female_hostel_wise_secodary_schools')),
					    obj: {layer_name:"Secondary School", column_name: "female_hostel", column_type: "string",
					    	ward_no: global.educationManagementModule.getSelectedWardNo()}
					});
					p16.chart();
					p16.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
				
				try {
					let p17 = new pieChartObj({
						/*data: [{ value: 17, name: 'Public', }, { value: 23, name: 'Private' }, { value:13, name: 'Government' }],*/
						data: data.play_ground_wise_secondary_schools,
						formatter: '{b}: {c}%',
						colorList: ['#f0c27a','#a16735','#dfc2a9','#c39c4f', '#f0c27a','#a16735'],
					    companybar_chart: echarts.init(document.getElementById('play_ground_wise_secondary_schools')),
					    obj: {layer_name:"Secondary School", column_name: "play_ground", column_type: "string",
					    	ward_no: global.educationManagementModule.getSelectedWardNo()}
					});
					p17.chart();
					p17.clickOnChart();
				} catch (e) {
					// TODO: handle exception
					console.error(e);
				}
			}
			
			let multiBarChartObj = global.dashboardChartsModule.getMultiBarChart();
			
			if(multiBarChartObj){
				let mb1 = new multiBarChartObj({
					legend: {
						data: data.institute_zones.sort()
					},
					dataZoom: [{
						type: 'inside',
						start: 1,
						end: 10
					}, {
						type: 'slider',
						showDetail: false,
					}],
					config_chart: echarts.init(document.getElementById("ward_wise_count")),
					xAxis: [
						{
							name: 'Zone Name',
							type: 'category',
					        axisTick: {show: false},
					        data: data.institute_zones.sort(),
					        axisLabel: {
			                    interval: 0,
			                    rotate: 30,		
			                    formatter: function (value, index) {
								    if(value.length <= 5){
								    	return value;
								    }
									let str = value.substring(0,10);
								    str += "...";
								    return str;
								},
			                    show: true,
			                    splitNumber: 15,
			                    textStyle: {
			                        fontSize: 12,
			                        color: '#666'
			                    }
			                }
					    }
					],
					yAxis : [
		                {
		                    type: 'value',
		                    name : 'No. of Institues'
		                }
		            ],
					grid: { 
		                top: '10%',
		                left: '3%',
		                right: '3%',
		                bottom: '5%',
						height: '70%',
						containLabel: true
		            },
					series: data.ward_wise_count,
					obj: {column_name: "zone_name", column_type: "string",
				    	ward_no: global.educationManagementModule.getSelectedWardNo()}
				});
				mb1.chart();
				mb1.clickOnChart();
			}
			
//			let simpleBarChartObj = global.dashboardChartsModule.getSimpleBarChart();
//			
//			if(simpleBarChartObj){
//				var wards = data.institute_wards.sort();
//				let b1 = new simpleBarChartObj({
//					datacity: wards,
//					legend: {
//		                show: true,
//						icon: 'circle',
//		                itemWidth: 10,
//		                itemHeight: 10,
//		                itemGap: 10,
//						bottom: 0,
//		            },
//		            xname : 'Ward Name',
//					yname : 'Count',
//					bottom: '2%',
//					top: '2%',
//		            grid: { 
//		                top: '15%',
//		                left: '3%',
//		                right: '4%',
//		                bottom: '05%',
//						height: '65%',
//						containLabel: true
//		            },
//					legendtitle : 'Ward Name',
//					config_chart: echarts.init(document.getElementById("ward_wise_institute")),
//					nameXTextStyle : {
//						padding: [38, 0, 0, 0]
//					}, nameYTextStyle : {
//	                    padding: [0, 0, 15, 0]
//	                }, formatter: function (value, index) {
//					    if(value.length <= 5){
//					    	return value;
//					    }
//						let str = value.substring(0,10);
//					    str += "...";
//					    return str;
//					},
//					legend: {
//		                show: true,
//						
//		                bottom:-5,
//						
//		            },
//					series: [{
////	                    name: 'No. Of Routes',
//	                    type: 'bar',
//	                    stack: 'sum',
//	                    barWidth: '15px',
//	                    data: data.ward_wise_institute_count,
//	                    itemStyle: {
//	                        normal: {
//	                            color: '#e8c185'
//	                        }
//	                    },
//	                }],
//					rotate: 25
//				});
//				b1.chart();
//				b1.clickOnChart();
//			}
		}, getSelectedWardNo : function(){
			return $("#educationWard option:selected").val() ? $("#educationWard option:selected").val() : "0";
		}
	}

	global.educationManagementModule = dashboard;

})(window, jQuery);




