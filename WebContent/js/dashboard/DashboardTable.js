/**
 * 
 */
(function(global, $) {
	
	let tableObject;
	let tableid = 'depCitizenMaster';
	let baseURL = window.iscdl.appData.baseURL;
	let dashbaordtableurl = baseURL + "api/dashboard/getdashboardtabledata/";
	let dashboardTable = {
			
		setRequiredEvent : function(){
			
			//tableObject = global.dashboardTableModule.setTable();
			
		}, setTable : function(options = {}){
			
						
			tableObject = $('#'+options.id).DataTable( {
		        columns: options.columns,
				data : options.data,
				/*"bDestroy": true,*/
				"searching": false,
				"autoWidth" : true,
				dom: 'Blfrtip',
				responsive: true,
		        buttons: [
					{
						extend: 'excelHtml5',	
						text: 'Export to Excel',
						filename : options.tblName,
		               	className: 'btn-indore-table ete' ,
					}
					/*, {
						extend: 'pdf',	
						text: window.modules.contents.export_pdf,
		               	className: 'btn-indore-table pdf' ,
		               	filename : global.commons.getTableName(options.tblName),
		               	orientation: 'landscape',
		                pageSize: 'LEGAL'
					}*/
		        ],
		        "scrollY": 'calc(70vh - 350px)',
		        "scrollX": true,
		        //scrollCollapse: true,
				//columnDefs: options.columnDefs
		    });
			
		}, getTable : function(){
			return tableObject;
		}, getTableData : function(tablename, extradata = {}){
			
			fetch(dashbaordtableurl + tablename, {
				method : "POST",
				headers : {
					"Accept" : "application/json",
					"Authorization" : "Bearer " + localStorage.getItem('token')
				}
			})
			.then(response => response.json())
			.then(response => {
				
				if(response && response.status){
					
					if(extradata.extracolumn){
						response.data.columns.push(extradata.extracolumn);
					}
					
					if(extradata.id){
						tableid = extradata.id;
					}
					
					global.dashboardTableModule.setTable({
						id : tableid,
						columns : response.data.columns,
						data : response.data.data,
						tblName : tablename,
					});
					
				} else {
					//$u.notify(global.contents.error, global.toasters.error, global.errors.no_data);
				}
				
			})
			.catch(e => {
				console.error(e);
			//	$u.notify(global.contents.error, global.toasters.error, global.errors.no_data);
			});
			
		}, destroyAndClearTable : function(){
			try {
				$('#' + tableid).DataTable().clear().destroy();
			    $('#' + tableid).empty();
			} catch (e) {
				// TODO: handle exception
				console.error(e);
			}
		    
		}
	}

	global.dashboardTableModule = dashboardTable;

})(window, jQuery);