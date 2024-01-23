(function(global, $) {
	"use stricts;"


	var base = {
			
			reportFilterContentByLayerName : function reportFilterContentByLayerName(category_name){
				$("#form_hospital").html("");
				let html = "";
					switch (category_name) {
//department id = 5
					case "Secondary School" : case "Colleges Universities" : case "Primary School" :
						html = "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						 "<option value=''>Select Ward</option></select></div>" +
						 /*"<div class='form-group'><label for='school_type'>School type</label>" +
						 "<select class='form-control pb-1' id='school_type' name='school_type'><option value=''>Select School type</option>" +
						 "<option value='1'>1</option><option value='2'>2</option></select></div><div class='form-group'>" +
						 "<label for='school_category'>School Category</label><select class='form-control pb-1' id='school_category' name='school_category'>" +
						 "<option value=''>Select School Category</option><option value='1'>1</option><option value='2'>2</option></select></div><div class='form-group'>" +
						 "<label for='student_category'>Students category</label><select class='form-control pb-1' id='student_category' name='category_wise_students'>" +
						 "<option value=''>Select School Category</option><option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						 "<div class='text-center'>" +
						 "<button type='submit' class='btn btn-indore mr-2'>Search</button><button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>"; 
						break;
//department id = 6
					case "Hospital":
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
								"<option value=''>Select Ward</option></select></div>" +
								/*"<div class='form-group'><label for='ownership_type'>Ownership Type</label>" +
								"<select class='form-control pb-1' id='ownership_type' name='ownership_type'>" +
								"<option value=''>Select Ownership Type</option><option value='Private'>Private</option>" +
								"<option value='Government'>Government</option></select></div>" +
								"<div class='form-group'><label for='hospital_category'>Hospital Category</label>" +
								"<select class='form-control pb-1' id='hospital_category' name='hospital_category'>" +
								"<option value=''>Select Hospital Category</option></select></div>" +
								"<div class='form-group'><label for='type_of_hospital'>Type of Hospital</label>" +
								"<select class='form-control pb-1' id='type_of_hospital' name='type_of_hospital'>" +
								"<option value=''>Select Type of Hospital</option></select></div>" +*/
								"<div class='text-center'>" +
								"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
								"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>"; 
						break;
					
					case "UPHC":
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
								"<option value=''>Select Ward</option></select></div>" +
								/*"<div class='form-group'><label for='uphc_name'>UPHC Name</label>" +
								"<select class='form-control pb-1' id='uphc_name' name='uphc_name'><option value=''>Select UPHC Name</option><option value='1'>1</option>" +
								"<option value='2'>2</option></select></div>" +
								"<div class='form-group'><label for='supervisor_name'>Superviser Name</label>" +
								"<select class='form-control pb-1' id='supervisor_name' name='supervisor_name'><option value=''>Select Superviser Name</option>" +
								"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
								"<div class='text-center'>" +
								"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
								"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 8
					case "IDA Scheme Boundry" : 
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='property_type'>Property Type</label>" +
						"<select class='form-control pb-1' id='property_type' name='type_of_property'><option value=''>Select Property Type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='property_land'>Type of property land</label>" +
						"<select class='form-control pb-1' id='property_land' name='type_of_property_land'><option value=''>Select Type Of Property Land</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "IDA" : 
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='plot_no'>Plot No.</label>" +
						"<select class='form-control pb-1' id='plot_no' name='plot_no'><option value=''>Select Plot No</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='property_no'>Property No.</label>" +
						"<select class='form-control pb-1' id='property_no' name='property_search'><option value=''>Select Property No</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 9
					case "IMC Boundry" :
					case "Building Footprints" :
					case "Park Garden" :
					case "Property Tax" :
					case "Ward Boundary" :
					case "Zone Boundary" :
					case "Parks Gardens" :
					case "Play Ground" :
					case "Manhole" :
					case "Playground" :
					case "Nazul Selection" :
						
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='scheme_no'>Scheme No.</label>" +
						"<select class='form-control pb-1' id='scheme_no' name='scheme_no'><option value=''>Select Scheme No</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='sector_type'>Sector Type</label>" +
						"<select class='form-control pb-1' id='sector_type' name='sector_type'><option value=''>Select Sector Type</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
					break;
// department id = 10
					case "Industrial Parks" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='ownership_type'>Ownership type</label>" +
						"<select class='form-control pb-1' id='ownership_type' name='ownership_type'><option value=''>Select Ownership type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='ind_type'>Industrial Type</label>" +
						"<select class='form-control pb-1' id='ind_type' name='ind_type'><option value=''>Select Industrial Type</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='type_sez'>Type Of SEZ</label>" +
						"<select class='form-control pb-1' id='type_sez' name='type_sez'><option value=''>Select Type Of SEZ</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "SEZ" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='ownership_type'>Ownership type</label>" +
						"<select class='form-control pb-1' id='ownership_type' name='ownership_type'><option value=''>Select Ownership type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='plot_no'>Plot No</label>" +
						"<select class='form-control pb-1' id='plot_no' name='plot_no'><option value=''>Select Plot No</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='ind_type'>Industrial Type</label>" +
						"<select class='form-control pb-1' id='ind_type' name='ind_type'><option value=''>Select Industrial Type</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='type_sez'>Type Of SEZ</label>" +
						"<select class='form-control pb-1' id='type_sez' name='type_sez'><option value=''>Select Type Of SEZ</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "MSME" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='ownership_type'>Ownership type</label>" +
						"<select class='form-control pb-1' id='ownership_type' name='ownership_type'><option value=''>Select Ownership type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='ind_type'>Industrial Type</label>" +
						"<select class='form-control pb-1' id='ind_type' name='ind_type'><option value=''>Select Industrial Type</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='type_msme'>Type Of MSME</label>" +
						"<select class='form-control pb-1' id='type_msme' name='type_msme'><option value=''>Select Type Of MSME</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 11
					case "Plot Boundary" : case "Village Boundary" : case "Government Land" :  case "Open Space " : case "Agriculture Land " : case "Land Use Boundry" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 14
					case "ATM" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break
					case "Bank" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break
					case "Museum" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break
					case "Monuments" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break
//department id = 16
					case "Police Station Boundary" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='police_type'>Select Type</label>" +
						"<select class='form-control pb-1' id='police_type' name='police_type'><option value=''>Select Type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
					break;
					case "SP Boundary" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div><div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
					break;
					case "CI boundary" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div><div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
					break;
//department id = 17
					case "HT Lines":
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div><div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "LT Lines": case "Street Light" : case "Electric Pole" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div><div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "Transformers":
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='ttype'>Transformers Type</label>" +
						"<select class='form-control pb-1' id='ttype' name='ttype'><option value=''>Select Transformers Type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 18
					case "Water Valves" : case "Over Head Tank" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='wvtype'>Water Valve Type</label>" +
						"<select class='form-control pb-1' id='wvtype' name='wvtype'><option value=''>Select Water Valve Type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='wvdate'>Date</label>" +
						"<select class='form-control pb-1' id='wvdate' name='wvdate'><option value=''>Select Date</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "Tube Well" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='ward_name'>Ward Name</label>" +
						"<select class='form-control pb-1' id='ward_name' name='ward_name'><option value=''>Select Ward Name</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='twt'>Tube well Type</label>" +
						"<select class='form-control pb-1' id='twt' name='twt'><option value=''>Select Tube well Type</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='manufacturer'>Manufacturer</label>" +
						"<select class='form-control pb-1' id='manufacturer' name='manufacture'><option value=''>Select Manufacturer</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='date'>Date</label>" +
						"<select class='form-control pb-1' id='date' name='date'><option value=''>Select Date</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "Water Supply Line" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='pipetype'>Pipe type</label>" +
						"<select class='form-control pb-1' id='pipetype' name='pipe_type'><option value=''>Select Pipe type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='pmtype'>Pipe Material Type</label>" +
						"<select class='form-control pb-1' id='pmtype' name='pipe_material'><option value=''>Select Pipe Material Type</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 19
					case "Flyover" : case "Bridges" : case "Dividers" :  case "Police Chowki" : case "Flyovers" : case "Trees" : case "Roadways" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='ward_name'>Ward Name</label>" +
						"<select class='form-control pb-1' id='ward_name' name='ward_name'><option value=''>Select Ward Name</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='ward_no'>Flyover Type</label>" +
						"<select class='form-control pb-1' id='flyover_type' name='flyover_type'><option value=''>Select Flyover Type</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='flyover_name'>Flyover Name</label>" +
						"<select class='form-control pb-1' id='flyover_name' name='flyover_name'><option value=''>Select Flyover Name</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='yoc'>Year of Construction</label>" +
						"<select class='form-control pb-1' id='yoc' name='yoc'><option value=''>Select Year of Construction</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "Foot Over Bridge" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='ward_name'>Ward Name</label>" +
						"<select class='form-control pb-1' id='ward_name' name='ward_name'><option value=''>Select Ward Name</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='fobt'>Foot Over Bridge Type</label>" +
						"<select class='form-control pb-1' id='fobt' name='fobt'><option value=''>Select Foot Over Bridge Type</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='fobn'>Foot Over Bridge Name</label>" +
						"<select class='form-control pb-1' id='fobn' name='fobn'><option value=''>Select Foot Over Bridge Name</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='yoc'>Year of Construction</label>" +
						"<select class='form-control pb-1' id='yoc' name='yoc'><option value=''>Select Year of Construction</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "Footpath" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='tof'>Type of Footpath</label>" +
						"<select class='form-control pb-1' id='tof' name='tof'><option value=''>Type of Footpath</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +
						"<div class='form-group'><label for='footpath_material'>Footpath material</label>" +
						"<select class='form-control pb-1' id='footpath_material' name='footpath_material'><option value=''>Select Footpath material</option>" +
						"<option value='1'>1</option><option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "Traffic Signals" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='dtype'>Select Type</label>" +
						"<select class='form-control pb-1' id='dtype' name='dtype'><option value=''>Select Type</option><option value='1'>1</option>" +
						"<option value='2'>2</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 22
					case "Town and country planning department" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='lucategory'>Land use category</label><select class='form-control pb-1' id='lucategory' name='landuse_category'>" +
						"<option value=''>Selet Land use category</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					case "Land Use Boundry" : 
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						/*"<div class='form-group'><label for='lucategory'>Land Type</label><select class='form-control pb-1' id='lucategory' name='land_type'>" +
						"<option value=''>Selet Land Type</option></select></div>" +*/
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 46
					case "Bus Stops" : case "Bus Terminals" : case "Bus Routes" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div> " +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
//department id = 52
					case "Anganawadi" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
						
					case "Housing Board Department" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
						
					case "WaterBodies" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
						
					case "Smart City Project" :
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;	
					default:
						html =  "<div class='form-group'><label for='report_ward'>Ward</label><select class='form-control pb-1' id='report_ward' name='ward_no'>" +
						"<option value=''>Select Ward</option></select></div>" +
						"<div class='text-center'>" +
						"<button type='submit' class='btn btn-indore mr-2'>Search</button>" +
						"<button type='reset' class='btn btn-indore' id='reset_hospital'>Reset</button></div>";
						break;
					}
				$("#form_hospital").append(html);
				window.depUtlityController.getWardList('report_ward');
			}
			
	}		
	/**
	 * add public functions to base
	 */

	global.reportFilterController = base;

})(window, jQuery)
