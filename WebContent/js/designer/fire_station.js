(function(global, $) {
	
	let formid = "form_addFireStation";
	let geotagphotoid ="fire_station_geoTaggedPhoto";
	let sublayerid = "fire_station_subLayerId";
	let modalid = "addFireStation_modal";
	let tableid = "dep_fire_station_table";
	let table, layer_id = undefined;
	let layer_name = "Fire Station";
	let wardid = "fire_station_ward";

	$(window).on("load", function(){
		$(".loader").fadeOut(1000);
		window.depUtlityController.headerDrop();
		
		try {
			window.depUtlityController.getWardList(wardid);
			window.depUtlityController.getLayers('add_data_category');
			$("#fire_station_latitude").attr("readonly", false);
			$("#fire_station_longitude").attr("readonly", false);
			window.fire_station_data.loadTable();
			window.fire_station_data.setRequiredEvent();
			
		} catch (e) {
			// TODO: handle exception
		}
		
	});
	
	$(document).ready(function(){
				
	});
	
	let data = {
			
		setRequiredEvent : function(){
			
			$('form[id="' + formid + '"]').validate({
				rules : {
					latitude : "required",
					longitude : "required",
					fire_station_name : "required",
					address : "required",
					contact_no : "required",
					geo_tagged_photo : "required"
				}, messages : {
					latitude : {
						required : "Please Enter Latitude"
					},
					longitude : {
						required : "Please Enter Longitude"
					},
					fire_station_name : {
						required : "Please Enter Fire Station Name"
					},
					address : {
						required : "Please Enter Fire Station Address"
					},
					contact_no : {
						required : "Please Enter Fire Station Contact Number"
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
						
						var validator = $("#form_addFireStation").validate();
						let errorObj = {};
						if(!data.latitude || data.latitude === null){
							errorObj.latitude = "Please enter Latitude";
						}
						if(!data.longitude || data.longitude === null){
							errorObj.longitude = "Please enter Longitude";
						}
						if(!data.fire_station_name || data.fire_station_name === null || data.fire_station_name === ""){
							errorObj.fire_station_name = "Please enter fire station Name";
						}
						if(!data.address || data.address === null || data.address === ""){
							errorObj.address = "Please enter fire station Address";
						}
						if(!data.contact_no || data.contact_no === null){
							errorObj.contact_no = "Please enter fire station contact number";
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
			table = window.fire_station_data.createDatatable({
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
							return "<button name='edit' class='btn action-btn' data-row='"+JSON.stringify(row)+"' data-toggle='modal' data-target='#" + modalid + "'  onclick='window.fire_station_data.updatedata(event)'> " + 
							"<span class='fa fa-edit' aria-hidden='true'></span></button>"+
							"<button name='approve' class='btn action-btn' data-row='"+JSON.stringify(row) + "'" +
							"onclick='window.fire_station_data.approveRejectData(event,true)'>"+
							"<span class='fa fa-check' aria-hidden='true'></span></button>" +
							"<button name='reject' class='btn action-btn' data-row='"+JSON.stringify(row) + "'" +
							"onclick='window.fire_station_data.approveRejectData(event,false)'><span class='fa fa-remove' aria-hidden='true'></span></button>";
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
				window.fire_station_data.loadTable();
		 	} else {
		 		 return false;
		 	}
		}, updatedata : function(event){
			
			let row = $(event.currentTarget).data('row');
			layer_id = row.id;
			$('#fire_station_subLayerId').val(row.sub_layer_id);
			
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
				window.fire_station_data.loadCurrentReport(result, tableid);
			}else{
				$u.notify('info', 'Notification',
						'Data not available', '');
			}
			
		}	
	}
	
	global.fire_station_data = data;

})(window, jQuery);