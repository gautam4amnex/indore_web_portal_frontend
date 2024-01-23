/**
 * 
 */
(function(global, $) {
	
	let modalid = 'myModal1';
	let tableDataAttr = 'table_name';
	let baseURL = window.iscdl.appData.baseURL;
	let dashboarddataurl = baseURL + "api/dashboard/getdashboarddata";
	let wardurl = baseURL + "citizen/ward/getWardList";
	let updatedDateUrl = baseURL + "api/dashboard/getDashboardUpdatedDate";
	
	let direction = {
		
		
		setRequiredEvent : function(){
			
			/**
			 * 
			 */
			$('.data-click').on('click',function(){
				$('.tbl_dep').resize();
			});
			
			$('.ex-col').on('click',function(){
				let id = $(this).data("id");
				$(this).parent().toggleClass('expand');
				$(this).children().toggleClass('fa-expand fa-compress');
				global.dashboardChartsModule.chartResize(id);
			});
			
			$(".central-dashboard").on("click", function(){
				let currentDashboardID = $(this).data("dashboardid");
				localStorage.setItem("currentDashboardID",currentDashboardID);
				window.location = window.location.origin
				+ window.iscdl.appData.webURLPrefix + "city_department.jsp"; 
			});
			
			/**
			 * 
			 */
			$('.map-info-tab-link').on('click', function() {
				if(window.dashboardModule.chartClick === false){
					$(".loader").fadeIn(1000);
				}
				
				$('.side-dashboard-main').toggleClass('active');
				 
				if (!$("body").hasClass("layer-popup")) {
					$('.layer-popup').css('right','-320px');
				}
				
				if (!$("body").hasClass("nav-ul-citi li a active")) {
					$('.nav-ul-citi li a').removeClass('active');
				}
//				  if ($('.layer-popup').css('right') === '-320px') {
//					    $('.map-info-tab-link').show();
//					  }   
				if(window.dashboardModule.chartClick === false){
					$(".loader").fadeOut(4000);
				}
				
				 
			});
			$('#leftPanel li').on('click', function() {  
				
				
				      $(".map-info-tab-link").hide();
				    
				  
				 
			});	
			
				
			$('.side-layer-close').on('click', function() {  
			
				      $(".map-info-tab-link").css("display","block");
				      
				      $(".tab-link-active").removeClass().addClass("map-info-tab-link");
				  
				  
				 
			});
			
			
			/**
			 * 
			 */
			$(".dashboard-table-view").on("click", function(){
				let tableName = $(this).data(tableDataAttr);
				if(tableName){
					$("#" + modalid).data(tableDataAttr, tableName);
				}
			});
			
			$(".dashboard-ward-filter").on("change", function(){
				let dashboardType = $(this).data("dashboard_type");
				let value = parseInt($(this).val());
				$('.dashboard-ward-filter option[value="'+value+'"]').attr("selected",true);
				if(dashboardType){
//					console.log(dashboardType);
//					console.log(value);
					if(dashboardType === 23 || dashboardType === "23"){// SET IMC WARD FILTER FLAG TRUE IMC WARD CHANGE
						global.dashboardModule.imc_ward_change = true;
					}
					global.dashboardModule.getDashboardData(dashboardType, value);
				}
			});
			
			/**
			 * 
			 */
			$("#myModal1").on("show.bs.modal", function(){
				
				let tablename = $(this).data(tableDataAttr);
			//	let type=$(this).data(typeOfData);
				if(tablename){
					global.dashboardTableModule.getTableData(tablename);
				}
				//$("#myModalLabel").text(global.commons.getTableName(tablename))
				$("#myModalLabel").text(tablename);
			});
			
			/**
			 * 
			 */
			$("#" + modalid).on("hide.bs.modal", function(){
				global.dashboardTableModule.destroyAndClearTable();
				$("#myModalLabel").text('');
			});
			
			$("#sidebar_cityDep").on("click",function(){
				localStorage.removeItem("dashPage");
				localStorage.setItem("mapPage",true);
			});
			
			$("#sidebar_dashboard").on("click", function(){
				localStorage.removeItem("mapPage");
				localStorage.setItem("dashPage",true);
			});
		
			/**
			 * 
			 */
			$(window).on('resize', function () {
				try {
					global.dashboardChartsModule.resizeChart();
				} catch (e) {
					console.error(e);
				}
			});	
			
			try {
				if(global.dashboardChartsModule){
					global.dashboardChartsModule.setRequiredEvent();
				}
				
			} catch (e) {
				console.error(e);
			}
			
			
			try {
				if(JSON.parse(localStorage.getItem("user")).department_dashboard !== null &&
						JSON.parse(localStorage.getItem("user")).department_dashboard.is_admin == true
						&& localStorage.getItem("currentDashboardID") != null ){
					dashboardId = localStorage.getItem("currentDashboardID");
					localStorage.removeItem("currentDashboardID");
				}else{
					dashboardId = null;
					var dashboard = JSON.parse(localStorage.getItem("user")).department_dashboard;
					if(dashboard !== null) {
						dashboardId = JSON.parse(localStorage.getItem("user")).department_dashboard.dashboard_id;
					}
				}
				
				if(!dashboardId || dashboardId == "" || dashboardId == null){
					return;
				}
				let location = window.location;
				let mapPage = localStorage.getItem("mapPage");
				let dashPage = localStorage.getItem("dashPage");
				if(location.href.includes("city_department.jsp") && dashboardId === 25 && dashPage != null && dashPage === "true" 
					&& (!mapPage || mapPage === null) ){
					window.location = window.location.origin
					+ window.iscdl.appData.webURLPrefix + "CentralDashboard.jsp";
				}
				$("#dashboard_" + dashboardId).removeClass("inactive");
				global.dashboardModule.getDashboardData(dashboardId, 0);
			} catch (e) {
				console.error(e);
			}
			
			
		}, getDashboardData : function(dashboardid, wardid){
			
			
			fetch(dashboarddataurl, {
				method : "POST",
				headers : {
					"Accept" : "application/json",
					"Authorization" : "Bearer " + localStorage.getItem('token'),
				}, body : JSON.stringify({
					"dashboardid" : dashboardid,
					"wardid" : wardid ? wardid : 0
				})
			})
			.then(response => response.json())
			.then(response => {
				
				if(response && response.data !== undefined){
					localStorage.setItem("imc_dashboard", false);
					if(response.dashboardid == 4){
						global.policeDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 8){
						global.aictslDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 6){
						global.idaDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 17){
						global.womanDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 2){
						global.educationManagementModule.setDashboard(response.data);
					} else if(response.dashboardid == 7){
						global.rtoManagementModule.setDashboard(response.data);
					} else if(response.dashboardid == 10){
						global.pwdManagementModule.setDashboard(response.data);
					} else if(response.dashboardid == 12){ 
						global.dudaModule.setDashboard(response.data);
					} else if(response.dashboardid == 23){
						localStorage.setItem("imc_dashboard", true);
						global.imcManagementModule.setDashboard(response.data);
						if(global.dashboardModule.imc_ward_change === true){
							$("#ind311FromDate").trigger("change");
							$("#propertyTaxFromDate").trigger("change");
						}
					} else if(response.dashboardid == 22){
						global.electricDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 18){
						global.mppcbManagementModule.setDashboard(response.data);
					} else if(response.dashboardid == 5){
						global.townPlanningDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 1){
						global.healthDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 24){
						global.mpakvnManagementModule.setDashboard(response.data);
					} else if(response.dashboardid == 16){
						global.centralDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 9){
						global.publicHealthDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 11){
						global.revenueManagementModule.setDashboard(response.data);
					} else if(response.dashboardid == 25){
						global.centralDashboardModule !== undefined ?
						global.centralDashboardModule.setDashboard(response.data) : "";
					} else if(response.dashboardid == 26){
						global.landRecordDashboardModule.setDashboard(response.data);
					} else if(response.dashboardid == 27){
						global.smartCityDashboardModule.setDashboard(response.data);
					}
					
				} 
			})
			.catch(e => {
				console.error(e);
				//$u.notify(global.contents.error, global.toasters.error, global.errors.no_data);
			});
			
		}, getWards : function(id){
			if(global.dashboardModule.wardList == null){
				fetch(wardurl, {
					method : "GET",
					headers : {
						"Accept" : "application/json"
					}
				})
				.then((response) => response.json())
				.then((response) => {
					global.dashboardModule.wardList = response.data;
					let content = '<option value="0">All</option>';
					response.data.forEach(function(element){
						content += "<option value='"+element.ward_no+"'>"+element.ward_name+"-"+element.ward_no+"</option>";
					});
					
					$("#" + id).html(content);
				})
				.catch((e) => {
					console.error(e);
				});
				
			}
			
		},getDashboardUpdatedDate : function(obj){
			let object = obj;
			fetch(updatedDateUrl, {
				method : "POST",
				headers : {
					"Accept" : "application/json",
					"Authorization" : "Bearer " + localStorage.getItem('token'),
				}, body : JSON.stringify(obj)
			})
			.then((response) => response.json())
			.then((response) => {
				if(response.data){
					let id = object.table_name;
					
					$("#"+id+"_updatedDate").text("Updated Date: " + response.data.updated_date);
					$("#"+id+"_updatedDate").attr('title', "Updated Date: " + response.data.updated_date);
				}
				
			})
			.catch((e) => {
				console.error(e);
			});
		},
		sidebarClick : null,
		wardList : null,
		chartClick: false,
		imc_ward_change: false
			
	}

	global.dashboardModule = direction;

})(window, jQuery);
$(document).ready(function(){	

	
	$('.datepicker').daterangepicker({
		 singleDatePicker: true,
		 timePicker: false,
		 locale: {
			format: 'YYYY-MM-DD'
		}, 
		"drops": "up"
	 }); 
});