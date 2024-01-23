var _feedback_type = "Feedback";
var _suggestion_type = "Suggestion";
var _suggestion_types = "Suggestions";

var _complain_type = "Complaint";

var _feedback_type_h = "प्रतिपुष्टि";
var _suggestion_type_h = "सुझाव";
var _complain_type_h = "शिकायत";

var _current_tab = _feedback_type; 
function createDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
        columns: options.columns,
		data : options.data,
		"searching": true,
		"autoWidth" : true,
		dom: 'Blfrtip',
		responsive: true,
		buttons: [
			/*{
				text: 'Fillter',
				className: 'btn-indore-table fillter' ,
			},*/
			{
				extend: 'csvHtml5',	
				text: 'Export to Excel',
               	className: 'btn-indore-table ete' ,
               	filename: _current_tab,
               	exportOptions: {
               		columns: _current_tab === _complain_type ? [0,1,2,3,4,5,6,7,9] : [0,1,2,3,4,5,6,7,8,9,10,11,13]
               	}
			},
			{
				extend: 'pdf',
				text: 'Export to PDF',
				className: 'btn-indore-table pdf' ,
				orientation : 'landscape',
                pageSize : 'A3',
                filename: _current_tab,
                exportOptions: {
                	columns: _current_tab === _complain_type ? [0,1,2,3,4,5,6,7,9] : [0,1,2,3,4,5,6,7,8,9,10,11,13]
               	}
			},
        ],
		scrollY: " calc(100vh - 400px) ",
        scrollX: true,
        //scrollCollapse: true,
		columnDefs: options.columnDefs,
//		"fnRowCallback": function (nRow, aData, iDisplayIndex) {
//	        $("td:nth-child(1)", nRow).html(iDisplayIndex + 1);
//	        return nRow;
//		}
    } );
}

/**
 * click events
 */

var table;

$(".tab-data").click(function(){
	
	let text = $(this).html();
	//let text = $('.justify-content-center .nav-item > a.active')[0].innerHTML;
	
	if(text == "" || text == undefined || text == null){
		return;
	}
	_current_tab = text;
	let department_id = localStorage.getItem('department_id');
	
	if(department_id == null || department_id == undefined || department_id == ""){
		$u.notify('error', 'Notification','Department Id was null', '');
		return;
	}
	
	switch (text) {
	case _feedback_type : case _feedback_type_h :
		window.depFeedbackSuggestionController.getFeedbackList(_feedback_type,department_id);
		break;
		
	case _suggestion_types: case _suggestion_type_h :
		window.depFeedbackSuggestionController.getFeedbackList(_suggestion_type,department_id);
		break;
		
	case _complain_type : case _complain_type_h : 
 		window.depFeedbackSuggestionController.getFeedbackList(_complain_type,department_id);
	break;

	default:
		break;
	}
});


$("#imageModalCloseBtn").click(function(){
	$("#carousel-inner").empty();
	$("#imageModal").hide();
});

$("#responseCancel").click(function(){
	window.depUtlityController.removeError('form_suggestion');
});

$(document).ready(function(){
	$(".user-manual-ctbtn").css('display','none');
	$(".user-manual-dpbtn").css('display','flex');
	
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
	/*$('a[data-toggle="tab"]').on('click', function(e){
			setTimeout(function(){ 
				$('.dataTables_wrapper').resize();
			}, 1000);
	});*/   
	
	//window.depAnnouncementController.addAnnouncement("","","","","","","");
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

$("ul[id*=leftPanel] li").click(function () {
	let val = $(this).attr('title');
	window.depUtlityController.setPageAccessAccordingToModule(val);
});
	
$(window).on("load", function(){
	
	let feedbackType = $('.justify-content-center .nav-item > a.active')[0].innerHTML;
	
	if(feedbackType == "Suggestions"){
		feedbackType = "Suggestion";
	}
	
	let department_id = localStorage.getItem('department_id');
	
	if(department_id != null && department_id != undefined && department_id != ""){
		window.depFeedbackSuggestionController.getFeedbackList(_feedback_type,department_id);
	}else{
		
		$u.notify('info', 'Notification',
				'Department Id was null', '');
	}
	
	window.depUtlityController.headerDrop();
});


$(window).on('resize', function () {
	
});	