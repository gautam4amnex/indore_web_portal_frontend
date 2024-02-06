var CITIMAP = {
	main_window_height : function() {
		return $('body').height();
	},

	sidebarMenu : function() {
		$('.side-menu-click').on('click', function() {
			// $('.side-menu-click i').toggleClass('fa-bars fa-close');

			$('.nav-main').toggleClass('closeNav');
			$('.page-content-wrapper').toggleClass('closeNav');
			$('footer').toggleClass('closeNav');
			

			$('.map-func').toggleClass('active');
			$('#search').toggleClass('active');
		});
	},
	
	bottomMenuClick : function() {
		$('.bottom-action li').on('click', function() {
			$('.bottom-action li').removeClass('active');
			$(this).addClass('active');
		});
		
		$('.action-ul li a').on('click', function() {
			var i = $(this).attr('data-attr');
			var title = $(this).attr('id');

			if(title == "xy-coordinate" || title == "swipeLayer"){
				$('.layer-popup').css('right','-300px');
				$(i).css('right','0px');
			}
		});
		$('.bottom-layer-close').on('click', function() {
			$('.layer-popup').css('right','-300px');
		});
		
	},
	
	sidemenuClick : function() {
		$('.nav-ul-citi li a').on('click', function() {
			var i = $(this).attr('data-attr');
			/*
			 * for hiding add-data pop-up
			 */
			if (i != "#") {
				$('.layer-popup').css('right', '-300px');
				$(i).css('right', '0px');
			}
			
			//checking for mobile purpose side menu close
			if($(window).width() <= 576){
				$('.nav-main').removeClass('closeNav')	
			}
			
		});
		$('.side-layer-close').on('click', function() {
			$('.layer-popup').css('right', '-300px');
			$('.nav-ul-citi li a').removeClass('active');
		});
		$('.nav-ul-citi li a').on('click', function() {
			$('.nav-ul-citi li a').removeClass('active');
			$(this).addClass('active');
		});
		
		$('.nav-ul-citi li').click(function () {
            $('.nav-ul-citi li').not(this).removeClass('active');
            $(this).toggleClass('active');
            
        });
	},
	queryListClick : function() {
		$('.query-task-click').on('click', function() {
			$('.query-list').hide();
			$('.query-task-search').show();
		});
		$('.query-back-list-click').on('click', function() {
			$('.query-list').show();
			$('.query-task-search').hide();
		});
	},
	drawClick : function() {
		$('.draw-tools-select li a').on('click', function() {
			var drawselect = $(this).attr('data-attr');

			$('.draw-tools-set').css('display', 'none');
			$(drawselect).css('display', 'block');

			$('.draw-tools-select li a').removeClass('active');
			$(this).addClass('active');

		});
	},
	actionClick : function() {
		$('.action-ul li a').on('click', function() {
			var ia = $(this).attr('data-attr');
			$('.action-layer').hide();
			
			$(ia).show();

			$('.action-layer-close').on('click', function() {
				$('.action-layer').css('display', 'none');
			});

		});
		
		$('.action-ul-top li a').on('click', function() {
			var ia = $(this).attr('data-attr');
			$('.action-layer').hide();
			$(ia).show();

			$('.action-layer-close-top-main').on('click', function() {
				$('.action-layer-top').css('display', 'none');
			});

		});
		
		$('.maptools-ul li a').on('click', function() {
			var i = $(this).attr('data-attr');
			var title = $(this).attr('id');

			if(title == "xy-coordinate" || title == "swipeLayer"){
				$('.layer-popup').css('right','-300px');
				$(i).css('right','0px');
			}
		});
	},
	getVisitorCounter: function getVisitorCounter(){
		$.ajax({
			url : window.iscdl.appData.baseURL + "citizen/getVisitorCounter",
			method : 'GET',
			async : false,
			success : function(result) {
				let response = JSON.parse(result);
				$(".visitor_count").text(response.data.count);
				$(".visitor_updatedDate").text(response.data.updated_date);
				
//				SET EVENT ICON FOR NEW EVENTS
				if(response.data.new_events > 0){
					$("#eventMenuIcon").empty().append('<svg class="small-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" width="50px" height="50px" enable-background="new 0 0 50 50" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M23.577,26.966c0.112,0.112,0.3,0.225,0.524,0.225c0.187,0,0.375-0.112,0.524-0.225l4.157-4.195c0.3-0.3,0.3-0.749,0-1.049c-0.3-0.3-0.749-0.3-1.049,0l-3.633,3.67l-1.835-1.835c-0.3-0.3-0.787-0.3-1.049,0c-0.3,0.3-0.3,0.749,0,1.049L23.577,26.966z M40.581,2.509h-2.547v-1.76C38.034,0.337,37.697,0,37.285,0c-0.412,0-0.749,0.337-0.749,0.749v1.76H33.39v-1.76C33.39,0.337,33.052,0,32.64,0c-0.412,0-0.749,0.337-0.749,0.749v1.76H18.109v-1.76C18.109,0.337,17.772,0,17.36,0S16.61,0.337,16.61,0.749v1.76h-3.146v-1.76C13.464,0.337,13.127,0,12.715,0c-0.412,0-0.749,0.337-0.749,0.749v1.76H9.419c-1.835,0-3.371,1.498-3.371,3.333v29.588c0,1.835,1.536,3.371,3.371,3.371h31.161c1.835,0,3.371-1.536,3.371-3.371V5.843C43.951,4.007,42.416,2.509,40.581,2.509L40.581,2.509z M42.453,35.431c0,1.049-0.861,1.873-1.873,1.873H9.419c-1.049,0-1.873-0.824-1.873-1.873V11.386h34.906V35.431z M7.547,5.843c0-1.011,0.824-1.873,1.873-1.873h2.547v1.76c0,0.412,0.337,0.749,0.749,0.749c0.412,0,0.749-0.337,0.749-0.749V3.97h3.146v1.76c0,0.412,0.337,0.749,0.749,0.749s0.749-0.337,0.749-0.749V3.97h13.783v1.76c0,0.412,0.337,0.749,0.749,0.749c0.412,0,0.749-0.337,0.749-0.749V3.97h3.146v1.76c0,0.412,0.337,0.749,0.749,0.749c0.412,0,0.749-0.337,0.749-0.749V3.97h2.547c1.011,0,1.873,0.861,1.873,1.873v4.045H7.547V5.843z M25,33.221c4.869,0,8.876-4.007,8.876-8.876c0-4.906-4.007-8.876-8.876-8.876c-4.906,0-8.876,3.97-8.876,8.876C16.124,29.213,20.094,33.221,25,33.221L25,33.221z M25,16.966c4.082,0,7.378,3.296,7.378,7.378S29.082,31.723,25,31.723s-7.378-3.296-7.378-7.378S20.918,16.966,25,16.966L25,16.966z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M2.378,37.303c14.12,0,31.124,0,45.243,0l-4.457,6.33L47.622,50c-14.12,0-31.124,0-45.243,0l4.457-6.367L2.378,37.303z"/><path fill="#FFFFFF" d="M15.674,46.966v-6.742h1.348l2.734,4.494v-4.494h1.273v6.742h-1.348l-2.734-4.419v4.419H15.674z M25.262,45.431l1.311,0.187c-0.187,0.487-0.449,0.861-0.787,1.086c-0.375,0.262-0.787,0.375-1.348,0.375c-0.824,0-1.461-0.262-1.873-0.824c-0.337-0.449-0.487-1.011-0.487-1.685c0-0.824,0.225-1.461,0.637-1.91c0.412-0.449,0.974-0.674,1.61-0.674c0.712,0,1.273,0.225,1.723,0.712c0.412,0.487,0.599,1.198,0.599,2.21h-3.221c0,0.375,0.112,0.674,0.3,0.899c0.187,0.187,0.449,0.3,0.749,0.3c0.187,0,0.375-0.037,0.487-0.15C25.112,45.843,25.225,45.655,25.262,45.431L25.262,45.431z M25.337,44.12c0-0.375-0.075-0.674-0.262-0.861c-0.187-0.187-0.412-0.3-0.674-0.3c-0.3,0-0.524,0.112-0.712,0.3c-0.187,0.225-0.262,0.487-0.262,0.861H25.337z M28.596,46.966l-1.536-4.869h1.236l0.936,3.184l0.824-3.184h1.236l0.824,3.184l0.936-3.184h1.273l-1.573,4.869h-1.236l-0.861-3.146l-0.824,3.146H28.596z"/></g></svg>Events');
				}else{
					$("#eventMenuIcon").empty().append('<svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <g id="Layer_1"> </g> <g id="Layer_1_1_"> </g> <g id="Layer_1_2_"> </g> <g id="Layer_1_3_"> </g> <g id="Layer_1_4_"> </g> <g id="Layer_1_5_"> <g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M36.791,12.21h-1.938v-1.324c0-0.311-0.253-0.563-0.563-0.563     s-0.563,0.252-0.563,0.563v1.324H31.34v-1.324c0-0.311-0.252-0.563-0.563-0.563c-0.312,0-0.563,0.252-0.563,0.563v1.324H19.786     v-1.324c0-0.311-0.252-0.563-0.563-0.563s-0.563,0.252-0.563,0.563v1.324h-2.387v-1.324c0-0.311-0.252-0.563-0.563-0.563     c-0.311,0-0.563,0.252-0.563,0.563v1.324H13.21c-1.401,0-2.542,1.14-2.542,2.542v22.384c0,1.401,1.141,2.541,2.542,2.541h23.581     c1.401,0,2.541-1.14,2.541-2.541V14.752C39.332,13.351,38.192,12.21,36.791,12.21L36.791,12.21z M38.207,37.136     c0,0.781-0.635,1.416-1.416,1.416H13.21c-0.781,0-1.417-0.635-1.417-1.416V18.929h26.414V37.136L38.207,37.136z M11.793,14.752     c0-0.781,0.636-1.417,1.417-1.417h1.938v1.324c0,0.311,0.252,0.563,0.563,0.563c0.311,0,0.563-0.252,0.563-0.563v-1.324h2.387     v1.324c0,0.311,0.252,0.563,0.563,0.563c0.312,0,0.563-0.252,0.563-0.563v-1.324h10.428v1.324c0,0.311,0.252,0.563,0.563,0.563     c0.311,0,0.563-0.252,0.563-0.563v-1.324h2.387v1.324c0,0.311,0.252,0.563,0.563,0.563c0.312,0,0.563-0.252,0.563-0.563v-1.324     h1.938c0.781,0,1.416,0.636,1.416,1.417v3.052H11.793V14.752z"/> </g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M25,35.449c3.699,0,6.709-3.01,6.709-6.709     S28.7,22.031,25,22.031c-3.699,0-6.709,3.01-6.709,6.709S21.302,35.449,25,35.449L25,35.449z M25,23.157     c3.079,0,5.584,2.504,5.584,5.583S28.079,34.324,25,34.324c-3.078,0-5.583-2.505-5.583-5.584S21.922,23.157,25,23.157z"/> </g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M23.912,30.72c0.105,0.105,0.249,0.164,0.398,0.164     s0.292-0.059,0.397-0.164l3.163-3.162c0.22-0.221,0.22-0.576,0-0.796s-0.576-0.22-0.796,0l-2.765,2.764l-1.385-1.385     c-0.22-0.22-0.576-0.22-0.796,0c-0.22,0.221-0.22,0.576,0,0.796L23.912,30.72z"/> </g> </g> </g> <g id="Layer_1_6_"> </g> <g id="Layer_1_7_"> </g> <g id="Layer_1_8_"> </g> <g id="Layer_1_9_"> </g> <g id="Layer_1_10_"> </g> <g id="Layer_1_11_"> </g> <g id="Layer_1_12_"> </g> <g id="Layer_1_13_"> </g> <g id="Layer_1_14_"> </g> <g id="Layer_1_15_"> </g> <g id="Layer_1_16_"> </g> <g id="Layer_1_17_"> </g> <g id="Layer_1_18_"> </g> <g id="Layer_1_19_"> </g> <g id="Layer_1_20_"> </g> <g id="Layer_1_21_"> </g> <g id="Layer_1_22_"> </g> <g id="Layer_1_23_"> </g> <g id="Layer_1_24_"> </g> <g id="Layer_1_25_"> </g> <g id="Layer_1_26_"> </g> <g id="Layer_1_27_"> </g> <g id="Layer_1_28_"> </g> <g id="Layer_1_29_"> </g> <g id="Layer_1_30_"> </g> </svg>Events');
				}
				
//				SET ANNOUNCEMENT ICON FOR NEW ANNOUNCEMENTS
				if(response.data.new_announcements > 0){
					$("#announcementMenuIcon").empty().append('<svg class="small-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" width="50px" height="50px" enable-background="new 0 0 50 50" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M18.171,11.217c-0.041,0-0.041,0-0.083,0h-0.041h-7.906c-3.849,0-6.954,3.146-6.954,6.954c0,3.601,2.732,6.581,6.291,6.912l0.166,0.041l2.442,10.017c0.29,1.159,1.325,1.987,2.566,1.987h1.656c0.786,0,1.531-0.373,2.07-0.993c0.497-0.621,0.662-1.449,0.455-2.235l-2.111-8.775h1.325h0.041c0,0,0.041,0,0.083,0c2.111-0.124,4.925,0.373,6.954,0.911c4.801,1.366,8.692,4.056,11.217,8.361c0.207,0.373,0.579,0.621,1.035,0.621c0.083,0,0.207,0,0.29-0.041c0.538-0.166,0.911-0.621,0.911-1.159V22.392h0.248c2.028-0.248,3.601-1.987,3.601-4.056v-0.331c0-2.028-1.573-3.767-3.601-4.015l-0.248-0.041V2.566c0-0.579-0.373-1.035-0.911-1.159c-0.083-0.041-0.207-0.041-0.29-0.041h-0.041c-0.414,0-0.786,0.207-0.993,0.579c-2.525,4.305-6.416,6.995-11.217,8.361C23.137,10.886,20.281,11.341,18.171,11.217L18.171,11.217z M8.899,20.654c-0.041-0.041-0.041-0.083-0.041-0.083c-0.041-0.041-0.083-0.083-0.083-0.124c-0.041,0-0.083-0.041-0.083-0.041c-0.041-0.041-0.083-0.041-0.124-0.083c-0.041,0-0.083,0-0.083,0c-0.083-0.041-0.166-0.041-0.248,0c-0.041,0-0.083,0-0.124,0c0,0.041-0.041,0.041-0.083,0.083c-0.041,0-0.083,0.041-0.083,0.041c-0.041,0.041-0.041,0.083-0.083,0.124c0,0-0.041,0.041-0.041,0.083c-0.041,0.041-0.041,0.083-0.041,0.124c0,0.041,0,0.083,0,0.083c0,0.041,0,0.083,0,0.124c0,0.041,0,0.083,0.041,0.124c0,0.041,0.041,0.083,0.041,0.083c0.041,0.041,0.041,0.083,0.083,0.083c0,0.041,0.041,0.083,0.083,0.083c0.041,0.041,0.083,0.041,0.083,0.041c0.041,0.041,0.083,0.041,0.124,0.041c0.041,0,0.083,0.041,0.124,0.041c0.041,0,0.083-0.041,0.124-0.041c0,0,0.041,0,0.083-0.041c0.041,0,0.083,0,0.124-0.041c0,0,0.041-0.041,0.083-0.083c0,0,0.041-0.041,0.083-0.083c0-0.041,0-0.041,0.041-0.083c0-0.041,0-0.083,0.041-0.124c0-0.041,0-0.083,0-0.124c0,0,0-0.041,0-0.083C8.899,20.737,8.899,20.695,8.899,20.654L8.899,20.654z M46.233,17.591h-1.904c-0.331,0-0.579,0.248-0.579,0.579s0.248,0.579,0.579,0.579h1.904c0.331,0,0.579-0.248,0.579-0.579S46.565,17.591,46.233,17.591L46.233,17.591z M45.447,26.945c0.166,0,0.29-0.083,0.414-0.207c0.207-0.248,0.207-0.621-0.041-0.828l-2.483-2.276c-0.248-0.207-0.621-0.166-0.828,0.041c-0.207,0.248-0.207,0.621,0.041,0.828l2.483,2.276C45.157,26.863,45.281,26.945,45.447,26.945L45.447,26.945z M45.82,10.43c0.248-0.207,0.248-0.579,0.041-0.828c-0.207-0.207-0.579-0.248-0.828-0.041l-2.483,2.276c-0.248,0.248-0.248,0.579-0.041,0.828c0.124,0.124,0.29,0.207,0.455,0.207c0.124,0,0.248-0.041,0.373-0.166L45.82,10.43z M17.425,35.43c-0.248,0.331-0.662,0.538-1.118,0.538h-1.656c-0.662,0-1.242-0.455-1.407-1.118l-2.359-9.727h4.636l0.745,3.063H15.48c-0.331,0-0.579,0.248-0.579,0.579c0,0.331,0.248,0.579,0.579,0.579h1.076l0.538,2.318h-0.621c-0.331,0-0.579,0.29-0.579,0.579c0,0.331,0.248,0.621,0.579,0.621h0.911l0.331,1.325C17.798,34.603,17.715,35.058,17.425,35.43L17.425,35.43z M15.977,23.965L15.977,23.965h-5.836h-0.041c-3.187-0.041-5.753-2.608-5.753-5.795s2.608-5.753,5.795-5.753h7.409v7.864h-5.629c-0.331,0-0.579,0.29-0.579,0.579c0,0.331,0.248,0.621,0.579,0.621h5.629v2.483H15.977z M41.225,18.005v0.331c0,1.366-0.952,2.566-2.318,2.856l-0.331,0.041v-6.126l0.331,0.083C40.273,15.439,41.225,16.639,41.225,18.005L41.225,18.005z M18.998,12.417c2.152-0.041,4.346-0.373,6.416-0.952c4.719-1.366,8.816-4.056,11.465-8.195l0.538-0.828v31.457l-0.538-0.786c-2.649-4.18-6.747-6.871-11.465-8.195c-2.07-0.579-4.263-0.911-6.416-0.952h-0.29V12.417H18.998z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M0,35.969c15.604,0,34.396,0,50,0l-4.925,6.995L50,50c-15.604,0-34.396,0-50,0l4.925-7.036L0,35.969z"/><path fill="#FFFFFF" d="M14.694,46.647v-7.45h1.49l3.022,5.008v-5.008h1.407v7.45h-1.49l-3.022-4.884v4.884H14.694z M25.29,44.95l1.449,0.207c-0.207,0.538-0.497,0.952-0.869,1.2c-0.414,0.29-0.869,0.414-1.49,0.414c-0.911,0-1.614-0.29-2.07-0.911c-0.373-0.497-0.538-1.118-0.538-1.863c0-0.911,0.248-1.614,0.704-2.111c0.455-0.497,1.076-0.745,1.78-0.745c0.786,0,1.407,0.248,1.904,0.786c0.455,0.538,0.662,1.325,0.662,2.442h-3.56c0,0.414,0.124,0.745,0.331,0.993c0.207,0.207,0.497,0.331,0.828,0.331c0.207,0,0.414-0.041,0.538-0.166C25.124,45.406,25.248,45.199,25.29,44.95L25.29,44.95z M25.373,43.502c0-0.414-0.083-0.745-0.29-0.952c-0.207-0.207-0.455-0.331-0.745-0.331c-0.331,0-0.579,0.124-0.786,0.331c-0.207,0.248-0.29,0.538-0.29,0.952H25.373z M28.974,46.647l-1.697-5.381h1.366l1.035,3.518l0.911-3.518h1.366l0.911,3.518l1.035-3.518h1.407l-1.738,5.381h-1.366l-0.952-3.477l-0.911,3.477H28.974z"/></g></svg>City Announcements');
				}else{
					$("#announcementMenuIcon").empty().append('<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_"><g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M13.969,25.966c-0.009-0.024-0.021-0.047-0.036-0.068c-0.014-0.021-0.03-0.043-0.049-0.062c-0.019-0.018-0.039-0.034-0.062-0.049c-0.021-0.015-0.045-0.027-0.069-0.037c-0.024-0.011-0.05-0.019-0.075-0.023c-0.052-0.011-0.104-0.01-0.155,0c-0.025,0.005-0.051,0.013-0.075,0.022c-0.024,0.011-0.048,0.023-0.07,0.038c-0.021,0.015-0.042,0.03-0.06,0.049c-0.019,0.019-0.035,0.038-0.05,0.06c-0.014,0.022-0.027,0.046-0.037,0.07s-0.018,0.05-0.022,0.075c-0.006,0.025-0.008,0.052-0.008,0.078c0,0.025,0.002,0.052,0.008,0.078c0.005,0.025,0.013,0.051,0.022,0.075s0.023,0.047,0.037,0.069c0.015,0.021,0.031,0.041,0.05,0.06s0.039,0.036,0.061,0.051c0.021,0.014,0.046,0.026,0.069,0.036c0.024,0.011,0.05,0.018,0.075,0.023c0.025,0.005,0.052,0.007,0.077,0.007c0.026,0,0.053-0.002,0.078-0.007c0.025-0.006,0.051-0.013,0.075-0.023c0.024-0.01,0.047-0.022,0.068-0.036c0.022-0.015,0.043-0.032,0.063-0.051c0.019-0.019,0.035-0.039,0.049-0.061c0.015-0.021,0.027-0.045,0.036-0.068c0.011-0.024,0.019-0.05,0.023-0.075C13.999,26.171,14,26.145,14,26.119c0-0.026-0.002-0.053-0.008-0.078C13.988,26.016,13.98,25.99,13.969,25.966z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.545,23.871h-1.31c-0.221,0-0.4,0.18-0.4,0.4s0.18,0.4,0.4,0.4h1.31c0.221,0,0.399-0.18,0.399-0.4S39.766,23.871,39.545,23.871z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M38.997,30.266c0.113,0,0.22-0.048,0.296-0.131c0.148-0.163,0.137-0.417-0.026-0.565l-1.705-1.553c-0.163-0.148-0.416-0.137-0.565,0.026c-0.148,0.163-0.137,0.417,0.026,0.565l1.706,1.553C38.801,30.229,38.897,30.266,38.997,30.266z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.266,18.974c0.163-0.149,0.175-0.402,0.026-0.565s-0.401-0.175-0.564-0.026l-1.706,1.553c-0.163,0.148-0.175,0.402-0.026,0.565c0.077,0.084,0.183,0.131,0.297,0.131c0.1,0,0.194-0.037,0.269-0.104L39.266,18.974z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M20.325,19.512c-0.021-0.001-0.042,0-0.063,0.002l-0.01,0.001h-5.44c-2.622,0-4.756,2.134-4.756,4.757c0,2.447,1.87,4.504,4.305,4.734l0.135,0.013l1.671,6.868c0.196,0.806,0.911,1.369,1.741,1.369h1.137c0.554,0,1.066-0.25,1.409-0.686c0.341-0.434,0.463-0.994,0.332-1.53l-1.462-6.012h0.928l0.01,0.001c0.021,0.002,0.042,0.003,0.063,0.002c1.458-0.081,3.388,0.236,4.771,0.63c3.269,0.93,5.943,2.769,7.661,5.724c0.149,0.257,0.414,0.414,0.71,0.414c0.075,0,0.149-0.011,0.223-0.03c0.368-0.099,0.613-0.419,0.613-0.8v-7.804l0.168-0.02c1.396-0.168,2.453-1.358,2.453-2.766v-0.217c0-1.407-1.058-2.599-2.453-2.766l-0.168-0.02v-7.804c0-0.381-0.245-0.701-0.613-0.8c-0.072-0.02-0.146-0.03-0.221-0.03h-0.007c-0.295,0-0.557,0.159-0.705,0.414c-1.718,2.955-4.393,4.794-7.661,5.724C23.717,19.273,21.778,19.595,20.325,19.512L20.325,19.512z M19.825,36.076c-0.189,0.24-0.474,0.379-0.78,0.379h-1.137c-0.459,0-0.855-0.312-0.964-0.758l-1.622-6.669H18.5l0.511,2.1h-0.526c-0.221,0-0.399,0.179-0.399,0.399c0,0.222,0.179,0.4,0.399,0.4h0.721l0.386,1.587h-0.429c-0.221,0-0.399,0.179-0.399,0.4c0,0.221,0.179,0.399,0.399,0.399h0.624l0.222,0.914C20.081,35.525,20.013,35.836,19.825,36.076L19.825,36.076z M18.835,28.228c-0.007-0.001-0.015-0.001-0.021-0.001H14.82c-0.008,0-0.017,0.001-0.025,0.001c-2.174-0.01-3.938-1.781-3.938-3.956c0-2.182,1.774-3.956,3.956-3.956h5.09v5.403h-3.865c-0.221,0-0.4,0.179-0.4,0.4c0,0.221,0.18,0.399,0.4,0.399h3.865v1.709H18.835L18.835,28.228z M36.124,24.163v0.217c0,0.943-0.668,1.76-1.592,1.946l-0.229,0.047V22.17l0.229,0.047C35.456,22.402,36.124,23.219,36.124,24.163L36.124,24.163z M20.89,20.317c1.462-0.023,2.98-0.259,4.385-0.654c3.243-0.914,6.042-2.764,7.876-5.614l0.352-0.548v21.541l-0.352-0.548c-1.834-2.851-4.633-4.7-7.876-5.614c-1.404-0.396-2.923-0.631-4.385-0.654l-0.188-0.004V20.32L20.89,20.317z"/></g></g></g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_"></g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g></svg>City Announcements');
				}
			},
			error : function(err) {
				console.log(err);
			}
		});
	}

}

// let map_view = $('ul#pills-map-tab').find('a.active')[0].innerHTML;

$('#pills-2D-tab').click(
		function() {
			let view = $(this).text();
			if (view == "2D" || view == "2 डी") {
				window.location = window.location.origin
						+ window.iscdl.appData.webURLPrefix
						+ "citizen_2d_map.jsp";
			}
		});

$('#pills-3D-tab').click(
		function() {
			let view = $(this).text();
			if (view == "3D" || view == "3 डी") {
				window.location = window.location.origin
						+ window.iscdl.appData.webURLPrefix
						+ "citizen_3d_map.jsp";
			}
		});

$('#feedback_popup').click(
		function() {
			
			$('#form_feedback').trigger('reset');
			window.depUtlityController.removeError('form_feedback');
			
			$("#fs_latitude").prop("readonly", true);
			$("#fs_longitude").prop("readonly", true);

			/**
			 * check for hide-show feedback pop-up
			 */

			let did = localStorage.getItem('department_id');

			if (did == null || did == "" || did == undefined) {
				$("#feedback_data_attribute").attr("data-attr", "#");
				/*$u.notify('info', 'Notification',
						'You are not authorized user', '');*/
					
				$("#user_notification_content").find('p:first').remove();
				$("#user_notification_content").find('p:first').remove();
				$("#user_notification_content").prepend('<p data-translate="_unauthorized_user_text_popup">You are not an Authorized User !</p><p data-translate="_unauthorized_user_feedback_popup"> In order to provide feedback or suggestion , Please register to our portal by clicking below</p>');
				if(localStorage.getItem('current_language') === "hindi"){
					$("#pills-hindi-tab").trigger('click');
				}
				
				$("#user_notification").modal();
				return;
			} else {
				$("#feedback_data_attribute").attr("data-attr",
						"#feedback_suggestion");
				window.feedbackController.getDepartmentList();
				$('.layer-popup').css('right', '-300px');
				$('#feedback_suggestion').css('right', '0px');
			}
		});

$("#addData_popup").click(function() {
	
	$('#form_addData').trigger('reset');
	window.depUtlityController.removeError('form_addData');
	
	$("#ad_latitude").prop("readonly", true);
	$("#ad_longitude").prop("readonly", true);

	/**
	 * check for hide-show add_data popup
	 */

	let did = localStorage.getItem('department_id');

	if (did == null || did == "" || did == undefined) {
		$("#add_data_attribute").attr("data-attr", "#");
		//$u.notify('info', 'Notification', 'You are not authorized user', '');
		
		$("#user_notification_content").find('p:first').remove();
		$("#user_notification_content").find('p:first').remove();
		$("#user_notification_content").prepend('<p data-translate="_unauthorized_user_text_popup">You are not an Authorized User !</p><p data-translate="_unauthorized_user_addData_popup"> In order to add data , Please register to our portal by clicking below</p>');
		
		if(localStorage.getItem('current_language') === "hindi"){
			$("#pills-hindi-tab").trigger('click');
		}
		
		$("#user_notification").modal();
		return;
	} else {
		$("#add_data_attribute").attr("data-attr", "#add_data");
		$('.layer-popup').css('right', '-300px');
		$("#add_data").css('right', '0px');
	}
});

$("#event_popup").click(function() {
	$('#view_event_popup').trigger("click");
	$("#form_events").trigger("reset");
	window.depUtlityController.removeError('form_events');
});

$("#add_event_popup").click(function() {
	$("#event_latitude").prop("readonly", true);
	$("#event_longitude").prop("readonly", true);
	$('#event_sdate').val('').daterangepicker({
		timePicker : true,
		"opens" : "left",
		locale : {
			format : 'YYYY/MM/DD HH:mm:ss'
		},
		"drops": "up"
	});
	
	let did = localStorage.getItem('department_id');

	if (did == null || did == "" || did == undefined) {
		$('#event_citizen').empty().append(
		'<option value="">Select Department</option>');
		
		$("#user_notification_content").find('p:first').remove();
		$("#user_notification_content").find('p:first').remove();
		$("#user_notification_content").prepend('<p data-translate="_unauthorized_user_text_popup">You are not an Authorized User !</p><p data-translate="_unauthorized_user_event_popup"> In order to add event , Please register to our portal by clicking below</p>');
		
		if(localStorage.getItem('current_language') === "hindi"){
			$("#pills-hindi-tab").trigger('click');
		}
		$("#user_notification").modal();
		return;
	}else{
		window.depUtlityController.getDepartmentList('event_citizen');
	}
});

//$("#leftPanel li").click(function() {
//	$('.layer-popup').removeClass('resize-layer');
//});
$('#view_event_popup').click(function() {
	$('#select_eventduration').val('0');
	$("#event_query_rslt div").remove(".event-list");
	$("#event_query_rslt").html("");
	//window.eventController.getEventList(0, _status_name);
	window.base.getEventList(0, _status_name);
	
});

$('#select_eventduration').change(
		function() {
			$("#event_query_rslt div").remove(".event-list");
			let duration_id = $(this).val();
			if (duration_id != null && duration_id != ""
					&& duration_id != undefined) {
				window.base.getEventList(duration_id,
						_status_name);
			}
});



$('#ward_info_popup').click(function() {

	$('#lbl_health_ofc').text("");
	$('#lbl_health_ofc_no').text("");
	//$('#lbl_inspector').text("");
	$('#lbl_zonal_ofc').text("");
	$('#lbl_zonal_ofc_no').text("");
	$('#lbl_sanitary_ofc').text("");
	$('#lbl_sanitary_ofc_no').text("");

	$('#lbl_population').text("");
	$('#lbl_gender').text("");
	$('#lbl_gender_ratio').text("");

	$('#lbl_corpo_contact').text("");
	$('#lbl_corpo_name').text("");

	$('#lbl_prisch_name').text("");
	$('#lbl_secsch_name').text("");
	$('#lbl_clg_name').text("");
//	$('#lbl_institute_name').text("");
//	$('#lbl_sch_name').text("");

	$('#lbl_hotel_name').text("");
	$('#lbl_rest_name').text("");

	$('#lbl_clinic_name').text("");
	$('#lbl_dispensary_name').text("");
	$('#lbl_hospital_name').text("");
	$('#lbl_pharmacy_name').text("");

	$('#lbl_ward_name').text("");
	$('#lbl_ward_no').text("");
	$('#lbl_ward_area').text("");

	$('#lbl_zone_name').text("");
	$('#lbl_zone_no').text("");

	window.wardInfoController.getWardList();
});

$('#query_popup').click(function() {
	window.depUtlityController.removeError('form_query');
	$("#attribute_query_rslt").html("");
	window.depUtlityController.getWardList('location_select');
	//window.depUtlityController.getLayerList('poi_layer_select');
	window.depUtlityController.getCitizenPortalLayerList('poi_layer_select');
	
	
	$('#query_result_tab a[href="#query_task"]').tab('show');
});


$("#direction_popup").click(function(){
	$('#form_direction').trigger('reset');
	window.depUtlityController.removeError('form_direction');
	$('#form_direction_by_name').trigger('reset');
	//$("#clearMap").trigger("click");
});

//EVENT SELECTED AND CURRENT LATLONG
$("#event_selected_lat").click(function() {
	window.base.fillEventSelectedLatLong();
});

$("#event_selected_longitude").click(function() {
	window.base.fillEventSelectedLatLong();
});

$('#event_current_lat').click(function() {
	window.base.fillEventCurrentLatLong();			
});

$('#event_current_longitude').click(function() {
	window.base.fillEventCurrentLatLong();
});

//feedback selected lat-long and current lat-long
$("#selected_latitude").click(function() {
	window.base.fillSelectedFeedBackLatLong();
});

$("#selected_longitude").click(function() {
	window.base.fillSelectedFeedBackLatLong();
});

$('#current_latitude').click(function() {
	window.base.fillCurrentFeedbackLatlong();
});

$('#current_longitude').click(function() {
	window.base.fillCurrentFeedbackLatlong();
});

//ADD DATA SELECTED AND CURRENT LATLONG
$("#add_selected_lat").click(function() {
	window.base.fillAddDataSelectedLatLong();
});

$("#add_selected_long").click(function() {
	window.base.fillAddDataSelectedLatLong();
});

$('#add_current_lat').click(function() {
	window.base.fillAddDataCurrentLatLong();
});

$('#add_current_long').click(function() {
	window.base.fillAddDataCurrentLatLong();
});

//DIRECTION SELECTED LATLONG
//$("#dir_selected_latitude").click(function() {
//	window.base.fillSelectedDirectionLatitude("Source");
//});
//
//$("#dir_selected_long").click(function() {
//	window.base.fillSelectedDirectionLatitude("Destination");
//});
//
//$('#dir_current_longitude').click(function() {
//	window.base.fillCurrentDirectionLatLong("Destination");
//});
//
//$('#dir_current_latitude').click(function() {
//	window.base.fillCurrentDirectionLatLong("Source");
//});


$('#thana_xy_current_lat').click(function() {
	window.base.fillThanaCurrentLatLong();
});

$('#thana_xy_current_longitude').click(function() {
	window.base.fillThanaCurrentLatLong();
});

$('#thana_xy_selected_lat').click(function() {
	window.base.fillThanaSelectedLatLong();
});

$('#thana_xy_selected_longitude').click(function() {
	window.base.fillThanaSelectedLatLong();
});

/**
 * Layer popup click event
 */
$('#popup_layers').click(function() {
	$('#tab_layer_list a[href="#layers_list"]').tab('show');
});

/**
 * Know your property popup click event
 */
$('#kyp_popup').click(function() {
	$("#know_your_property_rslt").html("");
	window.depUtlityController.removeError('form_kyp');
	window.depUtlityController.removeError('form1_kyp');
	window.depUtlityController.getWardList('kyp_ward');
	window.depUtlityController.getWardList('kyp1_ward');
	$('#kyp_ul_data a[href="#kyl"]').tab('show');
});

/**
 * Arround me popup click event
 */
$('#arroundme_popup').click(function() {
	$('#nearme_result').html("");
	$("#form_nearme").trigger("reset");
	window.depUtlityController.removeError('form_nearme');
	document.getElementById("area_range").innerHTML = "1 KM"
	$('#nearme_result_data a[href="#nearme_task_tab"]').tab('show');
});

$("#addLayer_popup").click(function(){
	window.depUtlityController.removeError('form_addLayer');
	$("#form_addLayer").trigger("reset");
	
	
	let did = localStorage.getItem('department_id');

	if (did == null || did == "" || did == undefined) {
		$("#add_layer_attribute").attr("data-attr", "#");
		
		$("#user_notification_content").find('p:first').remove();
		$("#user_notification_content").find('p:first').remove();
		$("#user_notification_content").prepend('<p data-translate="_unauthorized_user_text_popup">You are not an Authorized User !</p><p data-translate="_unauthorized_user_addLayer_popup"> In order to add layer , Please register to our portal by clicking below</p>');
		
		if(localStorage.getItem('current_language') === "hindi"){
			$("#pills-hindi-tab").trigger('click');
		}
		
		$("#user_notification").modal();
		return;
	} else {
		$("#add_layer_attribute").attr("data-attr", "#add_layer");
		$('.layer-popup').css('right', '-300px');
		$("#add_layer").css('right', '0px');
	}
	
});


/**
 * know your property tab click event
 */

$("#tab_know_your_property").click(function(){
	$('#know_your_property_rslt').html("");
	$("#form_kyp").trigger("reset");
});

/**
 * property by ward number tab click event
 */

$("#tab_by_ward_number").click(function(){
	$('#know_your_property_rslt').html("");
	$("#form1_kyp").trigger("reset");
});
	



$(document).ready(function() {

	/**
	 * for bookmark append click event
	 */
	$('.main-book-val').on("click", function() {
		$('.main-book-val').removeClass('bookmark-select');
		$(this).addClass('bookmark-select');
	});

	$('#event_sdate').daterangepicker({
		timePicker : true,
		"opens" : "left",
		locale : {
			format : 'YYYY/MM/DD HH:mm:ss'
		},
		"drops": "up"
	});
});

$("#tmc_agree").on("click",function(){
	localStorage.setItem("is_agreed", true);
	$('#tmc_modal').modal('toggle');
});
$('.side-layer-resize').on('click', function() {
	$('.layer-resize').toggleClass('resize-layer');
});

$('#reg_link').on('click', function() {
	window.location = window.location.origin
    + window.iscdl.appData.webURLPrefix + 'login.jsp';
});

$(window).on("load", function() {
	CITIMAP.sidemenuClick();
	CITIMAP.actionClick();
	CITIMAP.sidebarMenu();
	CITIMAP.queryListClick();
	CITIMAP.drawClick();
	CITIMAP.bottomMenuClick();
	CITIMAP.getVisitorCounter();
	
	window.depUtlityController.headerDrop();
	//window.depUtlityController.getLayerList('around_layer');
	window.depUtlityController.getCitizenPortalLayerList('around_layer');
	window.depUtlityController.getSwipeLayers('swipe_layer_select');
	
	let is_agreed = localStorage.getItem("is_agreed");
	if(is_agreed === null || is_agreed === undefined || is_agreed !== "true"){
		$('#tmc_modal').modal('show');
	}

	
});


$(window).on('load resize', function() {

});