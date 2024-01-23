(function(global, $) {
	
	let dashboard = {
			
		setRequiredEvent : function(){
						
		}, setDashboard : function(data){
			
			/*------------------------------- Camera Dashboard Start -------------------------------*/
			
				try {
					$(".camera-count").text(data.camera_count);
					$(".camera-count").attr('title', data.camera_count);
				} catch (e) {}
				
				let stackBarChart =  global.dashboardChartsModule.getStackBarChart();
				
				if(stackBarChart){
					
					let series = [];
					
					try{
						for(let obj of data.ward_wise_camera_count){
							let s = {
			                    name: obj.type,
			                    type: 'bar',
			                    stack: 'sum',
			                    barWidth: '20px',
			                    data: obj.count,
			                };
							series.push(s);
						}
					} catch (e) {}
					
					new stackBarChart({
					    datacity : data.ward_list,
					    config_chart: echarts.init(document.getElementById('frequencyWcciw'),'macarons'),
					    legendtitle : data.camera_type,
					    rotate: 35,
					    grid: { 
			                top: '10%',
			                left: '5%',
			                right: '4%',
			                bottom: '15%',
			                containLabel: true
			            },
			            series: series,
		                bottom: '5%',
						top: '5%',
		                dataZoom: [{
							type: 'inside',
							start: 1,
							end: 40
						}],
						nameXTextStyle : {
							padding: [20, 0, 0, 0]
						},
						nameYTextStyle : {
		                    padding: [0, 0, 35, 0]
		                },
		                formatter: function (value, index) {
						    if(value.length <= 5){
						    	return value;
						    }
							let str = value.substring(0,10);
						    str += "...";
						    return str;
						},
		                xname : '(Wards)',
						yname : '(Count)',
					}).chart();
					
				}
			
			/*------------------------------- Camera Dashboard End ---------------------------------*/
			
			/*------------------------------- Environment Sensor Dashboard Start ---------------------------------*/
				
				try {
					$(".environment-sensor-count").text(data.environment_sensor_count);
					$(".environment-sensor-count").attr('title', data.environment_sensor_count);
				} catch (e) {}
				
			/*------------------------------- Environment Sensor Dashboard End -----------------------------------*/
			
			/*------------------------------- LED Dashboard Start ---------------------------------*/
				
				try {
					$(".led-count").text(data.led_count);
					$(".led-count").attr('title', data.led_count);
				} catch (e) {}
				
				let ledSimpleBarChart = global.dashboardChartsModule.getSimpleBarChart();
				
				if(ledSimpleBarChart){
					new ledSimpleBarChart({
					    datacity : data.ward_wise_led_count.wards,
					    config_chart: echarts.init(document.getElementById('wwLEDc'),'macarons'),
					    rotate: 35,
					    legendtitle : 'No. Of LEDs',
					    grid : { 
			                top: '5%',
			                left: '10%',
			                right: '4%',
			                bottom: '10%',
							height: '80%',
			                containLabel: true
			            }, series: [{
		                    name: 'No. Of LEDs',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.ward_wise_led_count.counts,
		                    itemStyle: {
		                        normal: {
		                            color: '#6195fe'
		                        }
		                    }
		                }],
		                nameXTextStyle : {
							padding: [20, 0, 0, 0]
						},
		                bottom: '5%',
						top: '5%',
		                dataZoom: [{
							type: 'inside',
							start: 1,
							end: 40
						}],
		                formatter: function (value, index) {
						    if(value.length <= 5){
						    	return value;
						    }
							let str = value.substring(0,10);
						    str += "...";
						    return str;
						},
		                xname : '(Wards)',
						yname : '(Count)',
					}).chart();
				}
				
			/*------------------------------- LED Dashboard End -----------------------------------*/
			
			/*------------------------------- WIFI Dashboard Start ---------------------------------*/
				
				try {
					$(".wifi-count").text(data.led_count);
					$(".wifi-count").attr('title', data.led_count);
				} catch (e) {}
				
				let wifiSimpleBarChart = global.dashboardChartsModule.getSimpleBarChart();
				
				if(wifiSimpleBarChart){
					new wifiSimpleBarChart({
					    datacity : data.ward_wise_wifi_count.wards,
					    legendtitle : 'No of Wi-Fi Counts',
					    config_chart: echarts.init(document.getElementById('wwWiFip'),'macarons'),
					    rotate: 35,
					    grid : { 
			                top: '5%',
			                left: '10%',
			                right: '4%',
			                bottom: '10%',
							height: '80%',
			                containLabel: true
			            }, series: [{
		                    name: 'No. Of WIFI',
		                    type: 'bar',
		                    stack: 'sum',
		                    barWidth: '15px',
		                    data: data.ward_wise_wifi_count.counts,
		                    itemStyle: {
		                        normal: {
		                            color: '#be95e3'
		                        }
		                    }
		                }],
		                nameXTextStyle : {
							padding: [20, 0, 0, 0]
						},
		                bottom: '5%',
						top: '5%',
		                dataZoom: [{
							type: 'inside',
							start: 1,
							end: 40
						}],
		                formatter: function (value, index) {
						    if(value.length <= 5){
						    	return value;
						    }
							let str = value.substring(0,10);
						    str += "...";
						    return str;
						},
		                xname : '(Wards)',
						yname : '(Count)',
					}).chart();
				}
				
			/*------------------------------- WIFI Dashboard End -----------------------------------*/
		
		}
	}
	global.eyewayProjectModule = dashboard;

})(window, jQuery);