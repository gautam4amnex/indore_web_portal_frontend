(function(global, $) {
	
	let formid = "form_shopping";
	let geotagphotoid = "shopping_geo_tagged_photo";
	let sublayerid = "shopping_subLayerId";
	let modalid = "shopping_mall_modal";
	let tableid = "dep_shopping_mall_table";
	let wardid = "shopping_ward";
	let table, layer_id = undefined;
	let layer_name = "Shopping Malls";

	$(window).on("load", function(){
		$(".loader").fadeOut(1000);
		window.depUtlityController.headerDrop();
		//window.depUtlityController.getLayers('add_data_category');
		//window.depUtlityController.getWardList('shopping_ward');
		try {
			window.depUtlityController.getWardList(wardid);
			window.depUtlityController.getLayers('add_data_category');
			 $("#shopping_mall_latitude").attr("readonly", false);
			 $("#shopping_mall_longitude").attr("readonly", false);
			 window.shoppingMallData.loadTable();
			window.shoppingMallData.setRequiredEvent();
			
		} catch (e) {
			// TODO: handle exception
		}
		
	});
	$(document).ready(function(){	
		
		$("#citizen-logout-btn").click(function(){
			window.depUtlityController.userLogout();
		});
		
	  /*$(".datepicker-dept").datepicker({ 
	        autoclose: true, 
	        todayHighlight: true
	  }).datepicker('update', new Date());	
	  */
	  
		/*Multi step start*/
		var current_fs, next_fs, previous_fs; //fieldsets
		var opacity;

		$(".next").click(function(){

			current_fs = $(this).parent();
			next_fs = $(this).parent().next();

			//Add Class Active
			$("#progressbar li").eq($("fieldset").index(current_fs)).addClass("active");
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("activemain");

			//show the next fieldset
			next_fs.show();
			//hide the current fieldset with style
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

		//Remove class active
		$("#progressbar li").eq($("fieldset").index(previous_fs)).removeClass("active");
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("activemain");
		
		//show the previous fieldset
		previous_fs.show();

		//hide the current fieldset with style
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
		
		/*$("#finalSubmit").click(function(){
			let value = $("#EmailIDMain").val();
			let value1 = $("#EmailIDMain1").val();
			let value2 = $("#EmailIDMain2").val();
			alert("Form Value" + value + '1' + value1 + 'gdg'  + value2);
		})*/
		


		/*Multi step end*/
		
	});
	
	let data = {
			
			setRequiredEvent : function(){
			
			$('form[id="' + formid + '"]').validate({
				rules : {
					latitude : "required",
					longitude : "required",
					shopping_mall_name : "required",
					address : "required",
					parking : "required",
					geo_tagged_photo : "required"
				}, messages : {
					latitude : {
						required : "Please Enter Latitude"
					},
					longitude : {
						required : "Please Enter Longitude"
					},
					shopping_mall_name : {
						required : "Please Enter Shopping Mall Name"
					},
					address : {
						required : "Please Enter Shopping Mall Address"
					},
					parking : {
						required : "Please Enter Parking Address"
					},
					geo_tagged_photo  : {
						required : "Please Choose File"
					}
				}, submitHandler : function(form, e) {
					
					e.preventDefault();
					
					try {
						let data = window.depUtlityController.getFormObj(form);
						let user_id = localStorage.getItem('user_data');
						let sub_layer_id = window.depUtlityController.deptLayerData.filter(function(e){
							if(e.layer_name === layer_name){
								return e;
							}
							
						});
						let obj = {data: data, sub_layer_id: sub_layer_id[0].layer_id, user_id: user_id};
						if(layer_id){
							obj.layer_id = layer_id;
						}
						
						let files = $('#' + geotagphotoid)[0].files;
						let inValidFile = window.depUtlityController.isValidFiles(files,1);
						
						if(inValidFile){
							$('#' + geotagphotoid)[0].value = "";
							$u.notify("warning", "Notification","Unsupported file selected, please select only png or jpg files");
							return false;
						}
						
						var validator = $("#form_shopping").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.longitude = "Please enter Longitude";
						}
						if(!data.shopping_mall_name || data.shopping_mall_name === null || data.shopping_mall_name === ""){
							errorObj.shopping_mall_name = "Please enter Shopping Mall Name";
						}
						if(!data.address || data.address === null || data.address === ""){
							errorObj.address = "Please enter Shopping Mall Address";
						}
						if(!data.parking || data.parking === null || data.parking === ""){
							errorObj.parking = "Please enter Parking Address";
						}
						if(!files){
							errorObj.geo_tagged_photo = "Please choose file";
						}
						if(!$.isEmptyObject(errorObj) && errorObj != null){
							validator.showErrors(errorObj);
							$u.notify("warning", "Notification","Please fill required fields!");
							return false;
						}
						
						window.depUtlityController.addData(obj, files, 'geo_tagged_photo');
						location.reload(true);
						
					} catch (e) {
						console.log(e);
						$u.notify("error", "Error", "Something went wrong");
					}
				}
			});
			
			
		}, loadCurrentReport : function(result, id){
			var arr = [];
			for(var i=0;i<result.data.length;i++){
				arr.push(result.data[i].columns.length);
			}
			var max = Math.max(...arr);
			var index = arr.indexOf(max);
			table = window.shoppingMallData.createDatatable({
				id : id,
				columns : result.data[index].columns,
				data : result.data,
				columnDefs : [{
					"targets": result.data[index].columns.length,
					"data" : "is_approved",
					"title" : "Status",
					"render" : function(data, type, row,meta) {
						if(data === null){
							return '<a href="#" class="status-pending">Pending</a>';
						}else if(data === true){
							return '<a href="#" class="status-active">Approved</a>';
						}else if(data === false){
							return '<a href="#" class="status-deactive">Rejected</a>';
						}
					}
				}, {
					"targets": result.data[index].columns.length + 1,
					"data" : "id",
					"title" : "Action",
					"render" : function(data, type, row, meta) {
						if(row.is_approved === null) {
							return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"' data-toggle='modal' data-target='#" + modalid + "'  onclick='window.shoppingMallData.updatedata(event)'> " + 
							"<span class='fa fa-edit' aria-hidden='true'></span></button>"+
							"<button name='approve' class='btn action-btn' data-row='"+JSON.stringify(row) + "'" +
							"onclick='window.shoppingMallData.approveRejectData(event,true)'>"+
							"<span class='fa fa-check' aria-hidden='true'></span></button>" +
							"<button name='reject' class='btn action-btn' data-row='"+JSON.stringify(row) + "'" +
							"onclick='window.shoppingMallData.approveRejectData(event,false)'><span class='fa fa-remove' aria-hidden='true'></span></button>";
						} else {
							return "NA";
						}
					}
				}]
			})
		}, createDatatable : function(options = {}){
			return $('#'+options.id).DataTable({
		        columns: options.columns,
				data : options.data,
				"searching": false,
				"autoWidth" : true,
				dom: 'Blfrtip',
				responsive: true,
				buttons: [
					
					{
						extend: 'csvHtml5',	
						text: 'Export to Excel',
		               	className: 'btn-indore-table ete' ,
		               	filename: layer_name,
		               	exportOptions: {
		                    columns: 'th:not(:last-child)'
		                }
					},
					
		        ],
				scrollY: " calc(100vh - 380px) ",
		        scrollX: true,
		        //scrollCollapse: true,
				columnDefs: options.columnDefs
		    });
		}, approveRejectData: function(event, value){
			if (confirm("Are you sure to update the status ?")) {
				let row = $(event.currentTarget).data('row');
				let obj = {id: row.id, is_approved: value};
				window.depUtlityController.approveRejectLayerData(obj);
				/*if(current_tab === hospital_data){
					getHospitalData();
				}else{
					getUphcData();
				}*/
				window.shoppingMallData.loadTable();
		 	} else {
		 		 return false;
		 	}
		}, updatedata : function(event){
			
			let row = $(event.currentTarget).data('row');
			layer_id = row.id;
			$('#shopping_subLayerId').val(row.sub_layer_id);
			
			window.populatejs(row.data);
			
		}, loadTable : function(){
			
			try {
				if(table != undefined){
					table.destroy();
				}
				$('#' + tableid).empty();
			} catch (e) {}
			
			let obj = {department_id: window.depUtlityController.getDepartmentId(), layer_name: layer_name};
			let response = window.depUtlityController.getLayerData(obj);
			let result = JSON.parse(response.responseText);
			 if(result.data.length > 0){
                 window.shoppingMallData.loadCurrentReport(result, tableid);
         }else{
                 $u.notify('info', 'Notification',
                                 'Data not available', '');
         }
			//window.shoppingMallData.loadCurrentReport(result, tableid);
		}	
	}
	
	global.shoppingMallData = data;

})(window, jQuery);