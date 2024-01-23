var _user_master = "User Master";
var _role_master = "Role Master";
var _department_master = "Department Master";
var _user_master_hindi = "उपयोगकर्ता मास्टर";
var _role_master_hindi = "भूमिका मास्टर";
var _department_master_hindi = "विभाग के मास्टर";
var _current_tab = _department_master;
var _web_type = "1";
var _mobile_type = "2";
var _add = "1";
var _edit = "2";
	

function createDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
        columns: options.columns,
		data : options.data,
		"searching": true,
		"autoWidth" : true,
		responsive: true,
		dom: 'Blfrtip',
		buttons: [
			/*
			 * { text: 'Filter', className: 'btn-indore-table fillter' , },
			 */
			{
				extend: 'csvHtml5',	
				text: 'Export to Excel',
               	className: 'btn-indore-table ete' ,
               	filename: _current_tab,
               	exportOptions: {
                    columns: _current_tab === _user_master ? [0,1,2,3,4,5,6,7] : 'th:not(:last-child)'
                }
			},
			{
				extend: 'pdf',
				text: 'Export to PDF',
				className: 'btn-indore-table pdf' ,
				orientation : 'landscape',
                pageSize : 'A3',
                filename: 'User Management',
                exportOptions: {
                    columns: [0,1,2,3,4,5]
               	}
			},
			
        ],
       "scrollY": 'calc(100vh - 400px)',
        "scrollX": true,
        // scrollCollapse: true,
		columnDefs: options.columnDefs,
// "fnRowCallback": function (nRow, aData, iDisplayIndex) {
// $("td:nth-child(1)", nRow).html(iDisplayIndex + 1);
// return nRow;
// }
    } );
}

/**
 * click events
 */

// tab change click event
$(".tab-data").click(function(){
	
	let text = $(this).html();
	
	if(text == "" || text == undefined || text == null){
		return;
	}
	_current_tab = text;
	switch (text) {
	case _department_master : case _department_master : 
		window.depDepartmentMasterController.getDepartmentList();
		break;
		
	case _role_master: case _role_master_hindi : 
		window.depRoleMasterController.getRoleList();
		// window.depRoleMasterController.getRoleList();
		break;
		
	case _user_master: case _user_master_hindi : 
		
		let department_id = localStorage.getItem('department_id');
		
		if(department_id != null && department_id != undefined && department_id != ""){
			window.depUserMasterController.getUserList(department_id);
		}else{
			$u.notify('info', 'Notification',
					'Department Id was null', '');
		}
	break;

	default:
		break;
	}
});

/**
 * add role button click event
 */

$('#dep_addRole').click(function(){
	window.depUtlityController.getDepartmentList('dep_select_role');
	
	window.depRoleMasterController.getWebModuleList(_web_type,'treeview_web_application',null);
	window.depRoleMasterController.getMobileModuleList(_mobile_type,'treeview_mobile_application',null);

});



$('#dep_addUser').click(function(){
	window.depUtlityController.getDepartmentList('user_dep_type');
	/**
	 * for drop-down as per department list
	 */
	
	$("#user_dep_type").trigger("change");
});

/**
 * for removing fields value on department click
 */
$('#dep_department_master').click(function(){
	$("#form_addDepartment").trigger("reset");
	window.depUtlityController.removeError('form_addDepartment');
});

/**
 * for removing fields value on role click
 */
$('#dep_addRole').click(function(){
	$("#form_add_role_master").trigger("reset");
	window.depUtlityController.removeError('form_add_role_master');
	$('#treeview_mobile_application').addClass("treeview-indore");
});

/**
 * for removing fields value on user click
 */
$('#dep_addUser').click(function(){
	$("#form_addUser").trigger("reset");
	window.depUtlityController.removeError('form_addUser');
});



/**
 * change events
 */


$('#user_dep_type').on('change', function(e) {
	let d_id = $(this).val();
	let _id = 'user_role';
	window.depUtlityController.getRoleByDepartmentId(d_id,_id);
});


$('#update_user_dep_type').on('change', function(e) {
	let d_id = $(this).val();
	let _id = 'update_user_role';
	window.depUtlityController.getRoleByDepartmentId(d_id,_id);
	
});

$("#webChk").on('change',function(e){
		window.depRoleMasterController.setAllModuleChecked(_web_type,_add);
});

$("#mobileChk").on('change',function(e){
	window.depRoleMasterController.setAllModuleChecked(_mobile_type,_add);
});

$("#update_webChk").on('change',function(e){
		window.depRoleMasterController.setAllModuleChecked(_web_type,_edit);
});

$("#update_mobileChk").on('change',function(e){
	window.depRoleMasterController.setAllModuleChecked(_mobile_type,_edit);
});



$(document).ready(function(){	
	
  /*
	 * $(".datepicker-dept").datepicker({ autoclose: true, todayHighlight: true
	 * }).datepicker('update', new Date());
	 */
	
	$(".user-manual-ctbtn").css('display','none');
	$(".user-manual-dpbtn").css('display','flex');
  
	$("#citizen-logout-btn").click(function(){
		window.depUtlityController.userLogout();
	});
	
  $('.datepicker-dept').daterangepicker({
		 singleDatePicker: true,
		 timePicker: true,
		 locale: {
			format: 'YYYY-MM-DD HH:mm:ss'
		}, 
	 }); 
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
	
// $('a[data-toggle="tab"]').on('click', function(e){
// setTimeout(function(){
// $('.dataTables_wrapper').resize();
// }, 1000);
// });
	
	window.depUtlityController.headerDrop();
	
	window.depDepartmentMasterController.getDepartmentList();
});


$(window).on('load resize', function () {
});	