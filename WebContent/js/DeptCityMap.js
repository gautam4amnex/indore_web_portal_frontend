var CITIMAPDASHBOARD = {
    main_window_height: function(){
        return $('body').height();
    },
	
	sidebarMenu: function(){
		$('.side-menu-click').on('click', function() {
			//$('.side-menu-click i').toggleClass('fa-bars fa-close');

			$('.nav-main').toggleClass('closeNav');
			$('.select-lang').toggleClass('closeNav');
			$('.header-top').toggleClass('closeNav');
			$('.page-content-wrapper').toggleClass('closeNav');
			$('.resize-popup').removeClass('resize-layer');
			
		});
		
	},
	sidemenuClick: function(){
		
		/* Main menu click event*/
		
		$('.nav-ul-citi li').on('click', function() {
			//$('.nav-ul-citi li').removeClass('active');
			$(this).toggleClass('active');
		});
		
		
		$('.nav-ul-citi li a').on('click', function() {
			
			var i = $(this).attr('data-attr');
			
			if (i != "#") {
				$('.layer-popup').css('right','-320px');
				$(i).css('right','0px');	
			}
			
			$('.nav-ul-citi li a').removeClass('active');
			$(this).addClass('active');
			
			if (!$("body").hasClass("side-dashboard-main")) {
				  $('.side-dashboard-main').removeClass('active');
			}
			
		});
		
		/* Pop up close method */
		$('.side-layer-close').on('click', function() {
			
			$('.layer-popup').css('right','-320px'); 
			$('.nav-ul-citi li a').removeClass('active');
			
		});
		
		/* Minimize & Maximize click event */
		$('.side-layer-resize').on('click', function() {
			$('.resize-popup').toggleClass('resize-layer');
		});
		  
	},
	queryListClick: function(){
		$('.query-task-click').on('click',function(){
			$('.query-list').hide();
			$('.query-task-search').show();
		});
		$('.query-back-list-click').on('click',function(){
			$('.query-list').show();
			$('.query-task-search').hide();
		});
	},
	drawClick: function(){
		$('.draw-tools-select li a').on('click', function() {
			var drawselect = $(this).attr('data-attr');
			
			$('.draw-tools-set').css('display','none');
			$(drawselect).css('display','block');
			
			$('.draw-tools-select li a').removeClass('active');
			$(this).addClass('active');
				
		});
	},
	actionClick: function(){
		$('.action-ul li a').on('click', function() {
			var ia = $(this).attr('data-attr');
			//console.log(i);
			$('.action-layer').hide();
			$(ia).show();
			$('.tooltip-main').hide();
			//window.modules.mapController.clearPopUp();
			if(ia == "#bookmark"){
				//loadBookmarks();
			} else if (ia == "#print"){
				$("#printForm").trigger("reset");
				/*validator = $("#printForm").validate();
				validator.resetForm();*/
			}
			
			$('.action-layer-close').on('click', function() {
				$('.action-layer').css('display','none');
			});
			
		});
		
	}, actionClickTop: function(){
		$('.action-ul-top .action-li-top a').on('click', function() {
			let iat = $(this).attr('data-attr');
			//console.log(iat);
			$('.action-layer-top').hide();
			$(iat).show();
			
			$('.action-layer-close-top').on('click', function() {
				$('.action-layer-top').css('display','none');
			});
			
		});
		
	}, mapToolsClick: function(){
		
		$('.maptools-ul li a').on('click', function() {
			let mapi = $(this).attr('data-attr');
			console.log(mapi);
			$('.maptools-layer').css('right','-320px');
			$(mapi).css('right','0px');
			
		});
		
		$('.maptoollayersClose').on('click', function() {
			$('.maptools-layer').css('right','-320px');
		});
		
	},
	
	proximityAnalysis: function(){
		$('.pra-layer-click').on('click', function() {
			$('.pra-layer').css('right','0px');
		});
		$('.pra-layer-close').on('click', function() {
			$('.pra-layer').css('right','-320px');
		});
	},
	
	predefindeQuery: function(){
		$('.predefinde-queryul li').on('click', function() {
			$('.predefinde-queryul li').removeClass('active');
			$(this).addClass('active');
		});
		
	},
	 searchList: function(){
		 $(".search_result").on("keyup", function() {
			var value = $(this).val().toLowerCase();
		    $(".smc-result div label span").filter(function() {
		      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		     $('.smc-result div label').css('border-bottom',"none"); 
		    });
		  });
	},
	dashboardClick: function(){
		/* $('.map-info-tab-link').on('click', function() {
			 $('.side-dashboard-main').toggleClass('active');
			 
			if (!$("body").hasClass("layer-popup")) {
				  $('.layer-popup').css('right','-320px');
			}
			 if (!$("body").hasClass("nav-ul-citi li a active")) {
				  $('.nav-ul-citi li a').removeClass('active');
			}
			 
		 });*/
	},
	
	loaderTop: function(){
		 $(".loader").fadeOut(2000);
	}
}	

//GET DIRECTION CURRENT AND SELECTED LATLONG
$("#dir_selected_latitude").click(function() {
	window.department2dMap.fillSelectedDirectionLatitude("Source");
});

$("#dir_selected_long").click(function() {
	window.department2dMap.fillSelectedDirectionLatitude("Destination");
});

$('#dir_current_longitude').click(function() {
	window.department2dMap.fillCurrentDirectionLatLong("Destination");
});

//$('#dir_current_latitude').click(function() {
//	//window.department2dMap.fillCurrentDirectionLatLong("Source");
//});
  
$(document).ready(function(){	
		
	try {
		window.dashboardModule.setRequiredEvent();
	} catch (e) {}
	$('.side-layer-resize').on('click', function() {
		$('.layer-popup').toggleClass('resize-layer');
	});
	
});
	
$(window).on("load", function(){
	CITIMAPDASHBOARD.sidemenuClick();
	CITIMAPDASHBOARD.actionClick();
	CITIMAPDASHBOARD.actionClickTop();
	CITIMAPDASHBOARD.sidebarMenu();
	CITIMAPDASHBOARD.mapToolsClick();
	CITIMAPDASHBOARD.queryListClick();
	CITIMAPDASHBOARD.drawClick();
	//CITIMAPDASHBOARD.addRemoveFiled();
	CITIMAPDASHBOARD.predefindeQuery();
	CITIMAPDASHBOARD.searchList();
	/*CITIMAPDASHBOARD.dashboardClick();*/
	CITIMAPDASHBOARD.loaderTop();
	CITIMAPDASHBOARD.proximityAnalysis();
	
});


$(document).keyup(function(e) {
	
});

$(window).on('load resize', function () {});	