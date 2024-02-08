/**
 * 
 */
(function(global, $) {
	
	const wardid = "centralDashaboardWard";
	

	$(document).ready(function(){	
		try {
			if(window.dashboardModule){
				window.dashboardModule.setRequiredEvent();
			}
		} catch (e) {}
		
		let token = localStorage.getItem("token");
		if(token !== undefined && token !== null){
			$(".logout-link").css('display', 'flex');
			$(".drop-down-main").css('display', 'flex');
			$(".user-info").text(JSON.parse(localStorage.getItem("user")).userName);
		}
		
		$(".user-manual-ctbtn").css('display','none');
		$(".user-manual-dpbtn").css('display','flex');
		
		$("#citizen-logout-btn").click(function(){
			window.depUtlityController.userLogout();
		});
		
	});
	
	/**
	 * click event of get report
	 */
//	$('form[id="form_report_data"]')
//	.validate(
//			{
//				rules : {},
//				messages : {},
//				submitHandler : function(form, e) {
//					e.preventDefault();
//					try {
//						let cat_value = $("#report_data_category").val();
//						if(cat_value == "" || cat_value == null || cat_value == undefined){
//							$u.notify("info", "Notification","Please select department");
//							return;
//						}
//						localStorage.setItem("report_id",cat_value);
//						let jsp_page = "reports.jsp";
//						window.location = window.location.origin
//	                    + window.iscdl.appData.webURLPrefix +jsp_page; 
//					} catch (e) {
//						 $(".loader").fadeOut();
//						 $u.notify("error", "Error","Something Happend Wrong");
//					}
//				}
//	});


	/**
	 * click events
	 */

/*	$("#report_popup").click(
			function() {

				let department_id = localStorage.getItem('department_id');
				if (department_id != "1") {
					let jsp_page = "reports.jsp";

					window.location = window.location.origin
							+ window.iscdl.appData.webURLPrefix + jsp_page;
				}
	});*/
	
	/**
	 * checking for module permission
	 */
	$("ul[id*=leftPanel] li").click(function () {
		let val = $(this).attr('title');
		window.depUtlityController.setPageAccessAccordingToModule(val);
	});

	
	$(window).on("load", function(){
		$(".loader").fadeOut(2000);
		
		window.depUtlityController.headerDrop();
	});
	
	let dashboard = {
			
		setRequiredEvent : function(){
						
			try {
				global.dashboardModule.getWards(wardid);
			} catch (e) {
				console.error(e);
			}
			
		}, setDashboard : function(data){
			
			/*------------------------------- Central Dashboard Start -------------------------------*/
			
				try {
					$(".buses_count").text(data.buses_count);
					$(".buses_count").attr('title', data.buses_count);
				} catch (e) {}
			
				try {
					$(".street_light_count").text(data.street_light_count);
					$(".street_light_count").attr('title', data.street_light_count);
				} catch (e) {}
				
				
				try {
					$(".police_chowkey_count").text(data.police_chowkey_count);
					$(".police_chowkey_count").attr('title', data.police_chowkey_count);
				} catch (e) {}
			
				try {
					$(".total_planning_area").text(data.total_planning_area);
					$(".total_planning_area").attr('title', data.total_planning_area);
				} catch (e) {}
				
				
				try {
					$(".total_ida").text(data.total_ida);
					$(".total_ida").attr('title', data.total_ida);
				} catch (e) {}
			
				try {
					$(".total_rto").text(data.total_rto);
					$(".total_rto").attr('title', data.total_rto);
				} catch (e) {}
				
				
				try {
					$(".total_hospitals").text(data.total_hospitals);
					$(".total_hospitals").attr('title', data.total_hospitals);
				} catch (e) {}
			
				try {
					$(".total_water_line_length").text(data.total_water_line_length);
					$(".total_water_line_length").attr('title', data.total_water_line_length);
				} catch (e) {}
				
				
				try {
					$(".total_roads_length").text(data.total_roads_length);
					$(".total_roads_length").attr('title', data.total_roads_length);
				} catch (e) {}
			
				try {
					$(".total_primary_schools").text(data.total_primary_schools);
					$(".total_primary_schools").attr('title', data.total_primary_schools);
				} catch (e) {}
				
				
				try {
					$(".total_anganwadi").text(data.total_anganwadi);
					$(".total_anganwadi").attr('title', data.total_anganwadi);
				} catch (e) {}
			
				try {
					$(".total_industrial_training_centers").text(data.total_industrial_training_centers);
					$(".total_industrial_training_centers").attr('title', data.total_industrial_training_centers);
				} catch (e) {}
				
				try {
					$(".total_dustbin_locations").text(data.total_dustbin_locations);
					$(".total_dustbin_locations").attr('title', data.total_dustbin_locations);
				} catch (e) {}
				
				try {
					$(".total_agricultural_area").text(data.total_agricultural_area);
					$(".total_agricultural_area").attr('title', data.total_agricultural_area);
				} catch (e) {}
				
				try {
					$(".total_smartcity_projects").text(data.total_smartcity_projects);
					$(".total_smartcity_projects").attr('title', data.total_smartcity_projects);
				} catch (e) {}
				
				try {
					$(".avg_aql").text(data.avg_aql);
					$(".avg_aql").attr('title', data.avg_aql);
				} catch (e) {}
				
			/*------------------------------- Central Dashboard End ---------------------------------*/
				
		}
	}
	global.centralDashboardModule = dashboard;

})(window, jQuery);