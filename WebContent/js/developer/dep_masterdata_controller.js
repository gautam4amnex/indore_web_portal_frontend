(function(global, $) {
	"use stricts;"

	var table;

	var base = {

		getCitizenMasterList : function getCitizenMasterList() {

			let result;

			let token_val = localStorage.getItem('token');

			if (token_val == "" || token_val == undefined || token_val == null) {
				$u.notify('info', 'Notification',
						'You are not authorized user', '');
				return;
			}
			
			$(".loader").fadeIn();

			$.ajax({
				method : 'GET',
				url : window.iscdl.appData.baseURL
						+ "api/user/getCitizenList",
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					$(".loader").fadeOut();
					if (!$.isEmptyObject(result) && result != null) {
						try {
							result = JSON.parse(result);
							if (result.responseCode == "200") {
								let data = result.data;
								window.depCitizenMasterDataController
										.createCitizenMasterDataTable(data);
							} else {
								$u.notify('error', 'Notification',
										'Something went wrong', '');
							}
						} catch (err) {
							$(".loader").fadeOut();
							console.log(err);
						}
					} else {
						$(".loader").fadeOut();
						$u.notify('error', 'Notification',
								'data not available', '');
					}
				},
				error : function(e) {
					$(".loader").fadeOut();
					console.log(e);
					
					if(e.status === 403){
						$u.notify('warning', 'Notification',
								e.responseJSON.responseMessage, '');
					}else{
						$u.notify('error', 'Notification',
								'Something went wrong', '');
					}
				}
			});
		},

		createCitizenMasterDataTable : function createCitizenMasterDataTable(masterData) {
			let columns = window.depCitizenMasterDataController.createColumns();
			let columnDefs = window.depCitizenMasterDataController
					.createColumnDefs();

			let id = "depCitizenMaster";

			if (table != undefined) {
				table.destroy();
			}

			$('#' + id).empty();

			table = createDatatable({
				id : id,
				columns : columns,
				data : masterData,
				columnDefs : columnDefs,
			});
		},
		createColumns : function createColumns() {

			let columns = [
				
				
				{ 
					"data" : null,
					"title" : "Sr No"
				},{ 
					"data" : "user_name" ,
					"title" : "User Name" 
				},
	            {
					"data" : "name"  ,
					"title" : "Name"
				},
	            {
					"data" : "email_id" ,
					"title" : "Email" 
				},
	            {
					"data" : "contact_no"  ,
					"title" : "Phone No"
				},
			    {
					"data" : "address"  ,
					"title" : "Address"
				},
			    {
					"data" : "zipcode"  ,
					"title" : "Zip Code"
				}
	            ]

			return columns;

		},
		createColumnDefs : function createColumnDefs() {

			let columnDefs = [
				{
					"targets": 0,
					"searchable": false,
		            "width": "5%",
		            "render": function(data, type, full, meta) {
		            	return meta.row + 1;
		             },
		        },
				{
					"targets": 7,
					"data" : "status",
					"title" : "Status",
					"render" : function(data, type, row,
							meta) {
						
						if(data == false){
							
							return '<a href="#" class="status-deactive">Deactive</a>';
							
							/*return '<label class="switch"> '+
							'<input type="checkbox"> '+
							' <span class="slider round"></span> '+
					   '</label>';*/	
						}else if(data == true){
							
							return '<a href="#" class="status-active">Active</a>';
							
							/*return '<label class="switch"> '+
							'<input type="checkbox" checked> '+
							' <span class="slider round"></span> '+
					   '</label>';*/
							
						}else{
							
							return "";
							
							/*
							return '<label class="switch"> '+
							'<input type="checkbox"> '+
							' <span class="slider round"></span> '+
					   '</label>';*/
							
						}
					}
				}]

			return columnDefs;
		},
	}

	/**
	 * add public functions to base
	 */

	global.depCitizenMasterDataController = base;

})(window, jQuery)