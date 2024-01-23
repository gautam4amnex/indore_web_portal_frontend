
function createDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
		

	        columns: options.columns,
			data : options.data,
			"searching": true,
			"autoWidth" : true,
			dom: 'Blfrtip',
			responsive: true,
			buttons: [
				
				{
					extend: 'csvHtml5',	
					text: 'Export to Excel',
	               	className: 'btn-indore-table ete' ,
	               	filename: 'Citizen Master'
				},
				{
					extend: 'pdf',
					text: 'Export to PDF',
					className: 'btn-indore-table pdf' ,
					filename: 'Citizen Master'
				},
				
	        ],
			"scrollY": 'calc(100vh - 400px)',
	        "scrollX": true,
	        //scrollCollapse: true,
			columnDefs: options.columnDefs,
			
//			"fnRowCallback": function (nRow, aData, iDisplayIndex) {
//		        $("td:nth-child(1)", nRow).html(iDisplayIndex + 1);
//		        return nRow;
//			}
	} );
}


$(document).ready(function(){	
	
	$(".user-manual-ctbtn").css('display','none');
	$(".user-manual-dpbtn").css('display','flex');
	
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
  $(".datepicker-dept").datepicker({ 
        autoclose: true, 
        todayHighlight: true
  }).datepicker('update', new Date());	
  
  $("#treeview_mobile_application").hummingbird();
  $("#treeview_web_application").hummingbird();
  
  window.depCitizenMasterDataController.getCitizenMasterList();
		
});

/**
 * click event of get report
 */
$('form[id="form_report_data"]')
.validate(
		{
			rules : {},
			messages : {},
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
                    + window.iscdl.appData.webURLPrefix+jsp_page; 
				} catch (e) {
					 $(".loader").fadeOut();
					 $u.notify("error", "Error","Something Happend Wrong");
				}
			}
});


/**
 * click events
 */

/*$("#report_popup").click(
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
	//LoadCurrentReport();
	window.depUtlityController.headerDrop();
});


$(window).on('load resize', function () {
});	