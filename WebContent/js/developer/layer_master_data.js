var depMasterData = [
    {
        "No":"1",
        "schoolName":"School Name",
        "schoolContactNo":"x1",
        "schoolType":"Private",
        "schoolCategory":"General",
        "medium":"Private",
		"schoolManagement":"N/A",
		"principleContact":"active",
		"address":"Address",
		"district":"Indore",
		"teshil":"Indore",
		"village":"Indore",
		"zone":"West Zone",
		"ward":"Ward No 60",
		"status":"active",
    },
     
    {
        "No":"2",
        "schoolName":"School Name",
        "schoolContactNo":"x1",
        "schoolType":"Private",
        "schoolCategory":"General",
        "medium":"Private",
		"schoolManagement":"N/A",
		"principleContact":"active",
		"address":"Address",
		"district":"Indore",
		"teshil":"Indore",
		"village":"Indore",
		"zone":"West Zone",
		"ward":"Ward No 60",
		"status":"active",
       
    },
     
    {
	   "No":"3",
       "schoolName":"School Name",
        "schoolContactNo":"x1",
        "schoolType":"Private",
        "schoolCategory":"General",
        "medium":"Private",
		"schoolManagement":"N/A",
		"principleContact":"active",
		"address":"Address",
		"district":"Indore",
		"teshil":"Indore",
		"village":"Indore",
		"zone":"West Zone",
		"ward":"Ward No 60",
		"status":"deactive",
       
    },
	{
	   "No":"4",
       "schoolName":"School Name",
        "schoolContactNo":"x1",
        "schoolType":"Private",
        "schoolCategory":"General",
        "medium":"Private",
		"schoolManagement":"N/A",
		"principleContact":"active",
		"address":"Address",
		"district":"Indore",
		"teshil":"Indore",
		"village":"Indore",
		"zone":"West Zone",
		"ward":"Ward No 60",
		"status":"active",
    }
]


function createDatatable(options = {}){
	  return $('#'+options.id).DataTable( {
        columns: options.columns,
		data : options.data,
		"searching": false,
		"autoWidth" : true,
		dom: 'Blfrtip',
		responsive: true,
		buttons: [
			{
				text: 'Fillter',
				className: 'btn-indore-table fillter' ,
			},
			{
				extend: 'csvHtml5',	
				text: 'Export to Excel',
               	className: 'btn-indore-table ete' ,
			},
			
        ],
		scrollY: " calc(100vh - 380px) ",
        scrollX: true,
        //scrollCollapse: true,
		columnDefs: options.columnDefs
    } );
}



function LoadCurrentReport(oResults) {
 
	createDatatable({
		id : 'dep_adddata',
		columns : [
				
			{ "data" : "No" ,"title" : "No"},
			{ "data" : "schoolName", "title" : "School Name" },
            { "data" : "schoolContactNo", "title" : "School Contact No"},
            { "data" : "schoolType", "title" : "School Type" },
            { "data" : "schoolCategory", "title" : "School Category"},
            { "data" : "medium" , "title" : "Medium"}, 
			{ "data" : "schoolManagement" , "title" : "School Management"}, 
			{ "data" : "principleContact" , "title" : "Principle Contact"},
			{ "data" : "address" , "title" : "Address" }, 					
			{ "data" : "district"  , "title" : "District"}, 
			{ "data" : "teshil"  , "title" : "Teshil"}, 
			{ "data" : "village"  , "title" : "Village"},
			{ "data" : "zone"  , "title" : "Zone"},
			{ "data" : "ward"  , "title" : "Ward"},
			{ "data" : "status"  , "title" : "Status"},
			{}
			],
			
			 data : depMasterData,
			 columnDefs : [
				{
				"targets": 14,
				"data" : "status",
				"title" : "Status",
				"render" : function(data, type, row,
						meta) {
					if(data == 'active'){
							return '<a href="#" class="status-active">Active</a>';
					}
					else if(data == 'deactive'){
						return '<a href="#" class="status-deactive">Deactive</a>';
						}}
				},
				{
					"targets": 15,
					"data" : "status",
					"title" : "Action",
					"render" : function(data, type, row,
							meta) {
						return '<button name="edit" class="btn action-btn"  onclick=""> '+
						'<span class="fa fa-edit" aria-hidden="true"></span> </button > '+
						' <button name="delete" class="btn action-btn"  onclick=""> '+
						'<span class="fa fa-trash" aria-hidden="true"></span> </button >';
					}
				}
				]
			
	})
	

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
	
$(window).on("load", function(){
	LoadCurrentReport();
	
	$(".loader").fadeOut(1000);
	window.depUtlityController.headerDrop();
});


$(window).on('load resize', function () {
});	