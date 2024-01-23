var CITIMAP = {
    main_window_height: function(){
        return $('body').height();
    },
	
	sidebarMenu: function(){
		$('.side-menu-click').on('click', function() {
			//$('.side-menu-click i').toggleClass('fa-bars fa-close');

			$('.nav-main').toggleClass('closeNav');
			$('.page-content-wrapper').toggleClass('closeNav');
		});
	},
	sidemenuClick: function(){
		$('.nav-ul-citi li a').on('click', function() {
			var i = $(this).attr('data-attr');
			
			if (i != "#") {
				$('.layer-popup').css('right','-300px');
				$(i).css('right','0px');
			}
		});
		$('.side-layer-close').on('click', function() {
			$('.layer-popup').css('right','-300px');
			$('.nav-ul-citi li a').removeClass('active');
		});
		$('.nav-ul-citi li a').on('click', function() {
				$('.nav-ul-citi li a').removeClass('active');
				$(this).addClass('active');
		});
	   
	     
	},
	/*loaderTop: function(){
		 $(".loader").fadeOut(2000);
	}*/
	
}	


/*$("#report_popup").click(function(){
	let department_id = localStorage.getItem('department_id');
	if(department_id != "1"){
		let jsp_page = "reports.jsp";
		
		window.location = window.location.origin
        + window.iscdl.appData.webURLPrefix +jsp_page;
	}
});*/



/**
 * click event of get report
 */
$('form[id="form_report_data"]')
.validate(
		{
			rules : {
				
			},
			messages : {
				
			},
			submitHandler : function(form, e) {
				e.preventDefault();
				try {
					let cat_value = $("#report_data_category").val();
					
					if(cat_value == "" || cat_value == null || cat_value == undefined){
						$u.notify("info", "Notification","Please select department");
						return;
					}

					localStorage.setItem("report_id",cat_value);
					
					let jsp_page = "reports.jsp";
					
					window.location = window.location.origin
                    + window.iscdl.appData.webURLPrefix +jsp_page; 
					
				} catch (e) {
					 $(".loader").fadeOut();
					 $u.notify("error", "Error","Something Happend Wrong");
				}
			}
		});

$(document).ready(function(){	
	 window.depUtlityController.getReportLayers("Report Layer","report_data_category");
	 
	 let token = localStorage.getItem("token");
		if(token !== undefined && token !== null){
			$(".logout-link").css('display', 'flex');
			$(".drop-down-main").css('display', 'flex');
			$(".user-info").text(JSON.parse(localStorage.getItem("user")).userName);
		}else{
			$(".logout-link").css('display', 'none');
			$(".drop-down-main").css('display', 'none');
			$(".user-info").text('');
		}
		let is_agreed = localStorage.getItem("is_agreed");
		if(is_agreed === null || is_agreed === undefined){
			$(".user-manual-ctbtn").css('display','none');
			$(".user-manual-dpbtn").css('display','flex');
		}else{
			$(".user-manual-ctbtn").css('display','flex');
			$(".user-manual-dpbtn").css('display','none');
		}
		
		
		$("#citizen-logout-btn").click(function(){
			window.depUtlityController.userLogout();
		});
		
		
		
		/* Multi step start */
		var current_fs, next_fs, previous_fs; // fieldsets
		var opacity;

		$(".next").click(function(){

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			// Add Class Active
			$("#progressbar li").eq($("fieldset").index(current_fs)).addClass("active");
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("activemain");

			// show the next fieldset
			next_fs.show();
			// hide the current fieldset with style
			current_fs.animate({opacity: 0}, {
			step: function(now) {
			// for making fielset appear animation
			opacity = 1 - now;

			current_fs.css({
			'display': 'none',
			'position': 'relative'
			});
			next_fs.css({'opacity': opacity});
			},
			duration: 600
			});
		});

		$(".previous").click(function(){

			current_fs = $(this).parent();
			previous_fs = $(this).parent().prev();
		
			// Remove class active
			$("#progressbar li").eq($("fieldset").index(previous_fs)).removeClass("active");
			$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("activemain");
			
			// show the previous fieldset
			previous_fs.show();
		
			// hide the current fieldset with style
			current_fs.animate({opacity: 0}, {
				step: function(now) {
					// for making fielset appear animation
					opacity = 1 - now;
				
					current_fs.css({
						'display': 'none',
						'position': 'relative'
					});
					previous_fs.css({'opacity': opacity});
				},
				duration: 600
			});
		});

		$('.radio-group .radio').click(function(){
			$(this).parent().find('.radio').removeClass('selected');
			$(this).addClass('selected');
		});

		$(".submit").click(function(){
			return false;
		})
		
		/*
		 * $("#finalSubmit").click(function(){ let value = $("#EmailIDMain").val();
		 * let value1 = $("#EmailIDMain1").val(); let value2 =
		 * $("#EmailIDMain2").val(); alert("Form Value" + value + '1' + value1 +
		 * 'gdg' + value2); })
		 */
		


		/* Multi step end */
		
});
	
$(window).on("load", function(){
    CITIMAP.sidemenuClick();    
    CITIMAP.sidebarMenu();
    //CITIMAP.loaderTop();
    
    window.depUtlityController.headerDrop();
});


$(window).on('load resize', function () {
		
});	