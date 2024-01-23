var INDORE = {
	main_window_height : function() {
		return $('body').height();
	}
}

$(window).on("load", function() {
	INDORE.main_window_height();
	//$(".loader").css("display", "none");
});

$(window).on("load resize", function() {
	INDORE.main_window_height();
});

/**
 * for copy paste user-name
 */
$(document).on('paste', '#username', function(e) {
	  e.preventDefault();
	  var withoutSpaces = e.originalEvent.clipboardData.getData('Text');
	  withoutSpaces = withoutSpaces.replace(/\s+/g, '');
	  $(this).val(withoutSpaces);
});

$('#password').bind("cut copy paste",function(e) {
    e.preventDefault();
});


$.validator.addMethod('captchaVal', function(value, element) {
	return value === $("#captchaCanvas").val();
}, "Incorrect Captcha");

$.validator.addMethod('numericVal', function(value, element) {
	return /^\d*$/.test(value);
}, "Please Enter a Numeric Value");
//function setUserDept(dept){
//	$("#dept_list_div").val(dept);
//}

//contact no check validator
$.validator.addMethod('contactNum', function(value, element) {
	return this.optional(element) || /^\d{10}$/.test(value);
}, "Please Enter a Valid Mobile Number");

//email check validator
$.validator.addMethod('emailCheck', function(value, element) {
	return this.optional(element) || /^\w[\.\w]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
}, "Please Enter a Valid Email Id");


$('#facebookUrl').click(function(e){
	event.preventDefault();
//	let url = 'https://www.facebook.com/sharer/sharer.php?u=' + document.location.href;
	let url = 'https://www.facebook.com/IndoreSmartCityOfficial/';
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

$(document).ready(function() {
//	$(".loader").fadeOut();
	var localStorage = window.localStorage;


	$("#btnForgotConfirm").click(function(){
		var userName = $("#forgotUserName").val();
		window.loginController.forgotPassword(userName);
	});
	
	
	$('form[id="loginForm"]').validate(
			{
				rules : {
					username : "required",
					password : "required",
					txtInput : {
						required : true,
//						captchaVal: true
					}
				},
				messages : {

					username : {
						required : "Please Enter Username",
					},
					password : {
						required : "Please Enter Password",
					},
					txtInput : {
						required : "Please Enter Captcha",
//						captchaVal : "Please enter correct Captcha"
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let username = $("#username").val();
						let password = $("#password").val();
						let captcha = $("#txtInput").val();

//						let dept = $("#dept_list_div").val();
//						if(!dept){
//							dept = 0;
//						}
						window.loginController.login(username, password, captcha);
					} catch (e) {
						$u.notify("error", "Error",
								"Something went Wrong");
					}
				}
			});
	
	
	
	$('form[id="signUpForm"]')
	.validate(
			{
				rules : {
//					userName : "required",
					name : "required",
					contactNo : {
						required :  true,
						numericVal: true,
						contactNum: true
					},
					emailId : {
						required: true,
						emailCheck: true
					},
					address : "required",
					city : "required",
					state : "required",
					zipcode : {
						required :  true,
						numericVal: true,
						minlength : 6,
						maxlength : 6
					},
					signUptxtInput : {
						required :  true
					},
					tc_accept : "required" 
				},
				messages : {

//					userName : {
//						required : "Please enter Username",
//					},
					name : {
						required : "Please Enter Name",
					},
					contactNo : {
						required : "Please Enter Contact No",
						numericVal : "Please Enter a Numeric Value",
						contactNum : "Please Enter a Valid Mobile Number"
					},
					emailId : {
						required : "Please Enter Email Id",
						emailCheck : "Please Enter Valid Email Id"
					},
					address : {
						required : "Please Enter Address",
					},
					city : {
						required : "Please Enter City",
					},
					state : {
						required : "Please Enter State",
					},
					zipcode : {
						required : "Please Enter Zip Code",
						numericVal : "Please Enter a Numeric Value"
					},
					signUptxtInput : {
						required : "Please Enter Captcha"
					},
					tc_accept : {
						required : "Please Accept All Terms & Conditions"
					}
				},
				submitHandler : function(form, e) {
					
					e.preventDefault();
					
					try {
						let username = $("#signUpEmailId").val();
						let name = $("#signUpName").val();
						let contactNo = $("#signUpContactNo").val();
						let email = $("#signUpEmailId").val();
						
						let address = $("#signUpAddress").val();
						let city = $("#signUpCity").val();
						let state = $("#signUpState").val();
						let zipCode = $("#signUpZipcode").val();
						let signupCaptcha = $("#signUptxtInput").val();
//						$(".loader").css("display", "block");
						$("#signupBtn").attr("disabled", true);
						window.loginController.signup(username, name, contactNo, email, address, city, state, zipCode, signupCaptcha);
						$("#signupBtn").attr("disabled", false);
					} catch (e) {
						$u.notify("error", "Error",
								"Something went Wrong");
					}
				}
			});
	
	$('form[id="forgot_pwd_form"]').validate(
			{
				rules : {
					user_name_forgot : "required"
				},
				messages : {

					user_name_forgot : {
						required : "Please Enter Email",
					}
				},
				submitHandler : function(form, e) {
					e.preventDefault();
					try {
						let username = $("#user_name_forgot").val();
						
						window.loginController.forgotPassword(username);
					} catch (e) {
						$u.notify("error", "Error",
								"Something went Wrong");
					}
				}
			});
	
//	window.loginController.getDepartmentList();
});
