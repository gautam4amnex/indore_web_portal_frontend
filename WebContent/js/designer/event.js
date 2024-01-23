
var addDataFlag = 1;
var otherFormFlag = 2;

/**
 * create data table
 * @param options
 * @returns
 */
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
               	filename: 'Events',
               	exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
               	}
			},
			{
				extend: 'pdf',
				text: 'Export to PDF',
				className: 'btn-indore-table pdf' ,
				orientation : 'landscape',
                pageSize : 'A1',
                filename: 'Events',
                exportOptions: {
                    columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
               	}
			},
        ],
		"scrollY": 'calc(100vh - 400px)',
        "scrollX": true,
        //scrollCollapse: true,
//        autoWidth: true,  
		columnDefs: options.columnDefs,
//		"fnRowCallback": function (nRow, aData, iDisplayIndex) {
//	        $("td:nth-child(1)", nRow).html(iDisplayIndex + 1);
//	        return nRow;
//		}
    } );
}

/**
 * modal close button click event 
 */
$("#imageModalCloseBtn").click(function(){
	$("#carousel-inner").empty();
	$("#imageModal").hide();
});

$('#dep_add_event_popup').click(function(){
	window.depUtlityController.getDepartmentList('dep_event_department');
	$("#form_dep_events").trigger("reset");
	window.depUtlityController.removeError('form_dep_events');
});


$(document).ready(function(){	

	/*$('.datepicker').datepicker({
		autoclose: true, 
        todayHighlight: true
	});*/
	
	$(".user-manual-ctbtn").css('display','none');
	$(".user-manual-dpbtn").css('display','flex');
	
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
	 $('.datepicker').daterangepicker({
		 timePicker: true,
		 locale: {
			format: 'YYYY/MM/DD HH:mm:ss'
		}, 
		"drops": "up"
	 });
	 
  window.depEventController.getEventList();
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
                    + window.iscdl.appData.webURLPrefix +jsp_page; 
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
	
	setTimeout(function(){ 
		$('.dataTables_wrapper').resize();
	}, 1000);
	
	window.depUtlityController.headerDrop();
	
});


$(window).on('load resize', function () {
});	