var CITIMAP = {
    main_window_height: function(){
        return $('body').height();
    },
	
	sidebarMenu: function(){
		$('.side-menu-click').on('click', function() {
			//$('.side-menu-click i').toggleClass('fa-bars fa-close');

			$('.nav-main').toggleClass('closeNav');
			$('.page-content-wrapper').toggleClass('closeNav');
			
			$('.map-func').toggleClass('active');
			$('#searchDiv').toggleClass('active');
		});
	},
	sidemenuClick: function(){
		$('.nav-ul-citi li a').on('click', function() {
			var i = $(this).attr('data-attr');
			if (i != "#") {
				$('.layer-popup').css('right','-300px');
				$(i).css('right','0px');	
			}
			
			//checking for mobile purpose side menu close
			if($(window).width() <= 576){
				$('.nav-main').removeClass('closeNav')	
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
		$('.nav-ul-citi li').click(function () {
            $('.nav-ul-citi li').not(this).removeClass('active');
            $(this).toggleClass('active');
            
        });

	},
	
	bottomMenuClick: function(){
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
			
			$('.action-layer-close').on('click', function() {
				$('.action-layer').css('display','none');
			});
			
		});
	},
	addRemoveFiled :function(){ 
	 	var max_fields      = 2; //maximum input boxes allowed
		var wrapper   		= $(".input_fields_wrap"); //Fields wrapper
		var add_button      = $(".add_field_button"); //Add button ID
		
		var x = 0; //initlal text box count
		$(add_button).click(function(e){ //on add input button click
			e.preventDefault();
		//	global.deptQueryModule.getAllDropdown("second");
			if(x < max_fields){ //max input box allowed 
				x++; //text box increment
				$(wrapper).append('<div class="remove-added">'
									+'<div class="form-group">' 
					    	 			+ ' <label for="slope" data-translate = "_query_operator">Select Operator</label><span class="mandatory">*</span>' 
			    	 					+ '<select class="form-control slope'+x+'" id="slope_'+x+'">' 
				    	 					+ '<option value="" selected="selected" >Select Operator</option>'
				    	 					+ '<option value="AND">AND</option>'
				    	 					+ '<option value="OR">OR</option>'
			    	 					+ '</select>'
	    	 					   +'</div>'
	    	 					   
	    	 					 
    	 					 		 +'<div class="form-group">' 
					    	 			+ ' <label for="aqFtype" data-translate = "_query_field">Field</label><span class="mandatory">*</span>' 
			    	 					+ '<select class="form-control layer-attributes'+x+'"  id="aqF1type_'+x+'">' 
			    	 					+ '<option value="" selected="selected">Select Field</option>' 
			    	 					+ '</select>'  
		    	 					 +'</div>'
									    +'<div class="form-group">'
									    	+'<label for="aqlogop" data-translate = "_query_logical_op">Logical Operator</label>'
									 	     +'<select class="form-control logical-operations'+x+'" id="aqlogop_'+x+'">'
									 	     	+'<option value="">Select Logical Operator</option>'
									 	     	/*+'<option value="=" selected>=</option>'
												+'<option value=">">></option>'
												+'<option value=">=">>=</option>'
												+'<option value="<"><</option>'
												+'<option value="<="><=</option>'
												+'<option value="!=">!=</option>'*/
											 +'</select>'
									    +'</div>'
									    
									    +'<div class="form-group">'
									    	+'<label for="bqValue" data-translate = "_query_value">Value</label><span class="mandatory">*</span>'
									    	//+'<input type="text" id="aqValue_'+x+'" class="form-control plus-value-enter attribute-value '+x+' addmins-value" value="" name="aqValue" data-translate = "_query_evalue" placeholder="Enter Value"/>'
									    	+'<select class="form-control" id="aqValue_'+x+'"><option value="">Select Value</option></select>'
									    +'</div>'
									    +'<a href="#" class="remove_field"><i class="fa fa-minus"></i></a>'
								    +'</div>'
								    ); 
				
				$.ajax({
					method : 'POST',
					url : window.iscdl.appData.baseURL + "citizen/query/fieldtypes/" + $("#advanced_layer").val(),						
					contentType : 'application/json',
					async : false,
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ localStorage.getItem('token'));
					},
					
					//<option value="address" data-data_type="character varying">Address</option>						
					success : function(result) {
						var content ="";
						if (result.length >0) {
							for(var i=0; i<result.length; i++){
								content += "<option value='" + result[i].column_name + "' data-data_type='" + result[i].datatype + "'>"+ result[i].column_name.replaceAll("_" , " ").toUpperCase() + "</option>";
							}
							$("#aqF1type_" + x).append(content);
							
						}
						
					},
					error : function(e) {
						$(".loader").fadeOut();
						console.log(e);
					}
				});
				
				//second field change event
				$('#aqF1type_1').on("change", function(){
//					let l_id = $("#advanced_layer").val();
//					let field_name = $(this).val();
//					if((field_name && field_name != "") && (l_id && l_id != "")){
//						try{
//							window.department2dMap.getSecondAttributeValueByFieldName(l_id,field_name);
//						} catch (e) {
//							console.error(e);
//						}
//					}
					
					$('#aqValue_1').empty().append(
					'<option value="">Select Value</option>');
					
					var layer_name = $("#advanced_layer").val();
					var column_name = $("#aqF1type_1").val();
					
					let dataType = $(this).children("option:selected").data('data_type');
				    let content = "<option value='-1'  disabled='disabled' selected='selected'>Select Logical Operator</option>";
				    if(dataType == "character varying" || dataType == "character" || dataType == "text") {
						content += "<option value='=' selected='selected'>Equal to (=)</option>";
						content += "<option value='!='>Not equal to (!=)</option>";
						content += "<option value='like'>Like</option>";
						content += "<option value='not like'>Not like</option>";
						
					} else if (dataType == "integer" || dataType == "numeric" || dataType == "bigint" || dataType == "double precision"){
						
						content += "<option value='=' >Equal to (=)</option>";
						content += "<option value='!=' >Not equal to (!=)</option>";
						content += "<option value='>'>Greate than (>)</option>";
						content += "<option value='>=' >Greate than & equal to (>=)</option>";
						content += "<option value='<'>Less than (<)</option>";
						content += "<option value='<=' >Less than & equal to (<=)</option>";
						
					} else if(dataType == "date"){
						content += "<option value='=' >Equal to (=)</option>";
						content += "<option value='!=' >Not equal to (!=)</option>";
						content += "<option value='>'>Greate than (>)</option>";
						content += "<option value='>=' >Greate than & equal to (>=)</option>";
						content += "<option value='<'>Less than (<)</option>";
						content += "<option value='<=' >Less than & equal to (<=)</option>";
						
					}
				    $("#aqlogop_1").html(content);
					
					
					$.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL + "citizen/query/getinfobytblcolumn/" + layer_name + "/" + column_name,						
						contentType : 'application/json',
						async : false,
						beforeSend : function(request) {
							request.setRequestHeader('Authorization', 'Bearer '
									+ localStorage.getItem('token'));
						},
						
						//<option value="address" data-data_type="character varying">Address</option>						
						success : function(result) {
							var content ="";
							if (result.length >0) {
								for(var i=0; i<result.length; i++){
									content += "<option value='" + result[i].columnname + "'>"+ result[i].columnname + "</option>";
								}
								$("#aqValue_1").append(content);
							}
							
						},
						error : function(e) {
							$(".loader").fadeOut();
							console.log(e);
						}
					});
					
					
					
					
				});
				
				//third field change event
				$('#aqF1type_2').on("change", function(){
					let l_id = $("#advanced_layer").val();
					let field_name = $(this).val();
					if((field_name && field_name != "") && (l_id && l_id != "")){
						try{
							window.department2dMap.getThirdAttributeValueByFieldName(l_id,field_name);
						} catch (e) {
							console.error(e);
						}
					}					
				});
				
				
				
					}else{
						$u.notify("info", "Notification","Maximum 3 query allowed");
			        	 return;
					}
			});
		
		$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
			e.preventDefault(); $(this).parent('.remove-added').remove(); x--;
		});
		
 },	
}	

function initMap() {
  // The location of Uluru
  var uluru = {lat: 22.7196, lng: 75.8577};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 15, center: uluru,mapTypeId: 'satellite'});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}

	$('#pills-2D-tab').click(function(){
	   let view = $(this).text();
		if(view == "2D" || view == "2 डी"){
			window.location = window.location.origin
			+ window.iscdl.appData.webURLPrefix + "city_department.jsp";
		}
	});

	$('#pills-3D-tab').click(function(){
		let view = $(this).text();
		if(view == "3D" || view == "3 डी"){
			window.location = window.location.origin
			+ window.iscdl.appData.webURLPrefix + "department_3d_map.jsp";
		}

	});
  
$(document).ready(function(){	
	
	 $('.datepicker').daterangepicker({
		 singleDatePicker: true,
		 timePicker: true,
		 locale: {
			format: 'YYYY-MM-DD HH:mm:ss'
		}, 
		"drops": "up"
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


/*$("#report_popup").click(function(){
	
	let department_id = localStorage.getItem('department_id');
	if(department_id != "1"){
		let jsp_page = "reports.jsp";
		window.location = window.location.origin
        + window.iscdl.appData.webURLPrefix +jsp_page;
	}
});*/

/**
 * IMC service popup click event
 */
$("#imc_service_popup").click(
		function() {
			
			/*$('#form_imc_iswm').trigger('reset');
			window.depUtlityController.removeError('form_imc_iswm');
			
			$('#form_imc_sled').trigger('reset');
			window.depUtlityController.removeError('form_imc_sled');*/
			
			$('#form_imc_indore311').trigger('reset');
			window.depUtlityController.removeError('form_imc_indore311');

			/*$('#form_imc_property_tax').trigger('reset');
			window.depUtlityController.removeError('form_imc_property_tax');*/
			
			/*$("#imc_ptax_rslt").html("");
			$("#imc_sled_rslt").html("");
			$("#imc_iswm_rslt").html("");*/
			$("#imc_indore311_rslt").html("");
			
			/*window.depUtlityController
					.getWardList('imc_iswm_ward_id');
			window.depUtlityController
					.getWardList('imc_sled_ward_id');
			window.depUtlityController
					.getWardList('imc_propertytax_ward_id');
			*/
			window.depUtlityController
			.getWardList('imc_indore311_ward');

		});
		
		/**
		 * Heat map analysis click event
		 */

		$("#popup_heat_map_analysis").click(function() {
			$('#form_heat_map_analysis').trigger('reset');
			window.depUtlityController.removeError('form_heat_map_analysis');
			//window.depUtlityController.getDepartmentList('heat_map_category');
		});

		/**
		 * change event of selected heat map layer
		 */
		
		$('#heat_map_category').change(function(){
			let value = $(this).val();
			if(value != "" && value != undefined && value != null){
				window.depHeatMapAnalysisController.setCriteriaAccordingToHeatMapLayer(value);
			}
		});
		$('.side-layer-resize').on('click', function() {
			$('.layer-resize').toggleClass('resize-layer');
		});


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
	
$(window).on("load", function(){
    CITIMAP.sidemenuClick();
    CITIMAP.actionClick();
    CITIMAP.sidebarMenu();
    CITIMAP.queryListClick();
    CITIMAP.bottomMenuClick();
    CITIMAP.drawClick();
	 CITIMAP.addRemoveFiled();
    window.depUtlityController.headerDrop();
    window.depUtlityController.getReportLayers("Report Layer","report_data_category");
    
});
$('.map-info-tab-link').on('click', function() {
	$(this).toggleClass("tab-link-active");
	
});

$(window).on('load resize', function () {
		
});	


$(document).ready(function () {

    $("#leftPanel").scroll(function () {
        if ($("#leftPanel").scrollTop() > 100) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
            
        }
    });

    $('.scroll-top').click(function () {
        $("#leftPanel").animate({
            scrollTop: 0
        }, 100);
        return false;
    });
    $('.scroll-down').click(function () {
        $("#leftPanel").animate({
            scrollTop: 600
        }, 100);
        return false;
    });
    
    
	$('.selectpicker').selectpicker();
	

});