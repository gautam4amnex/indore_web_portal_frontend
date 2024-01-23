
$(document).ready(function(){
	
	//initialising fullpage.js in the jQuery way
	
	$('#fullpage').fullpage({
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
		navigation: true,
		slidesNavigation: true,
		continuousVertical:true,
		afterRender: function(){
		            setInterval(function(){
		                    $.fn.fullpage.moveSectionDown();
		            }, 10000);
		        }
	});

	
});


function updateVisitorCounter(){
	let ip_address = null;
	$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
		ip_address = data.ip;
		window.localStorage.setItem('ip_address',data.ip);
		let requestObj = JSON.stringify({"ip_address":ip_address});
		$.ajax({
			url : window.iscdl.appData.baseURL + "citizen/updateVisitorCounter",
			method : 'POST',
			contentType : 'application/json',
			data : requestObj,
			async : false,
			success : function(result) {
				getVisitorCounter();
			},
			error : function(err) {
				console.log(err);
			}
		});
	});
	
}


function getVisitorCounter(){
	$.ajax({
		url : window.iscdl.appData.baseURL + "citizen/getVisitorCounter",
		method : 'GET',
		async : false,
		success : function(result) {
			let response = JSON.parse(result);
			$(".visitor_count").text(response.data.count);
			$(".visitor_updatedDate").text(response.data.updated_date);
		},
		error : function(err) {
			console.log(err);
		}
	});
}

$(window).on("load", function(){
	updateVisitorCounter();
});

$('#facebookUrl').click(function(e){
	event.preventDefault();
//	let url = 'https://www.facebook.com/sharer/sharer.php?u=' + document.location.href;
	let url = ' https://www.facebook.com/IndoreSmartCityOfficial/';
    socialWindow(url);
});

$('#instagramUrl').click(function(e){
	event.preventDefault();
//	let url = 'https://www.instagram.com/sharer/sharer.php?u=' + document.location.href;
	let url = 'https://www.instagram.com/indoresmartcity/';
    socialWindow(url);
});

$('#twitterUrl').click(function(e){
	event.preventDefault();
//	let url = 'https://twitter.com/share?u=' + document.location.href;
	let url = 'https://twitter.com/IndoreSmartCity';
    socialWindow(url);
});


function socialWindow(url) {
	  var left = (screen.width - 570) / 2;
	  var top = (screen.height - 570) / 2;
	  var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
	  window.open(url,"NewWindow",params);
}

$.validator.addMethod('numericVal', function(value, element) {
	return /^\d*$/.test(value);
}, "Please enter a numeric value");

$.validator.addMethod('contactNum', function(value, element) {
	return this.optional(element) || /^\d{10}$/.test(value);
}, "Please enter a valid mobile number");

$.validator.addMethod('emailCheck', function(value, element) {
	return this.optional(element) || /^\w[\.\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
}, "Please Enter a Valid Email Id");


$("#form_addFeedback_close").click(function(){
	$('#form_addFeedback').trigger('reset');
	window.depUtlityController.removeError('form_addFeedback');
});

$("#add_home_feedback").click(function(){
	$('#form_addFeedback').trigger('reset');
	window.depUtlityController.removeError('form_addFeedback');
});

function validateFname(){
	    var element = document.getElementById('fb_first_name');
	    element.value = element.value.replace(/[^a-zA-Z0-9]+/, '');
}

function validateLname(){
    var element = document.getElementById('fb_last_name');
    element.value = element.value.replace(/[^a-zA-Z0-9]+/, '');
}

function validateSubject(){
    var element = document.getElementById('fb_subject');
    element.value = element.value.replace(/[^a-zA-Z0-9]+/, '');
}

function validateComment(){
    var element = document.getElementById('fb_comment');
    element.value = element.value.replace(/[^a-zA-Z0-9]+/, '');
}

$('form[id="form_addFeedback"]').validate(
		{
			rules : {
				fb_first_name : "required",
				fb_last_name : "required",
				fb_mobile_no : {
					required :  true,
					numericVal: true,
					contactNum: true
				},
				fb_email_id : {
					emailCheck:true
				},
				fb_comment : "required",
			},
			messages : {

				fb_first_name : {
					required : "Please Enter First Name",
				},
				fb_last_name : {
					required : "Please Enter Last Name",
				},
				fb_mobile_no : {
					required : "Please Enter Mobile No.",
					numericVal : "Please Enter a Numeric Value",
					contactNum : "Please Enter a valid Mobile Number"
				},
				fb_comment : {
					required : "Please Enter Comment"
				}
			},
			submitHandler : function(form, e) {
				e.preventDefault();
				try {
					let first_name = $("#fb_first_name").val();
					let last_name = $("#fb_last_name").val();
					let email_id = $("#fb_email_id").val();
					let mobile_no = $("#fb_mobile_no").val();
					let subject = $("#fb_subject").val();
					let comment = $("#fb_comment").val();
					
					let obj = {first_name: first_name, last_name: last_name, email_id: email_id, 
							mobile_no: mobile_no, subject: subject, comment: comment, 
							ip_address: localStorage.getItem('ip_address'), api_type: "FEEDBACK"};
					let postData = JSON.stringify(obj);
					$("#page-body").prepend($("<div class='loader'></div>"));
					$(".loader").fadeIn();
					$.ajax({
						url : window.iscdl.appData.baseURL + "citizen/addGeneralFeedback",
						method : 'POST',
						data : postData,
						contentType : 'application/json',
						async : false,
						success : function(result) {
							$(".loader").fadeOut();
							$("#page-body").remove($(".loader"));
							let response;
							if(typeof result === 'string'){
								response = JSON.parse(result); 
							}else{
								response = result
							}
							if (response.responseCode == 200) {
								$u.notify('success', '',
										response.responseMessage, '');
								
							}else if(response.responseCode == 204){
								$u.notify('warning', '',
										response.responseMessage, '');
							}
							$("#form_addFeedback_close").click();
						},
						error : function(err) {
							$(".loader").fadeOut();
							console.log(err);
							if(err.responseText && typeof err.responseText === 'string'){
								err.error_data = JSON.parse(err.responseText);
							}
							if(err.status == 400){
								$u.notify('warning', '',
										err.error_data.responseMessage, '');
							}else{
								$u.notify('error', '',
										'Something went wrong', '');
							}
							
						}
					});

				} catch (e) {
					$u.notify("error", "",
							"Something went Wrong");
				}
			}
		});