$(document).ready(function() {
	window.localStorage.clear();
	$(".signup_click").click(function() {
		$('#forgot_pwd_form').trigger('reset');
		$(".main-form-login").css('top', '0');
		$(".main-form-signup").css('top', '-150%');
		$(".main-form-forgot").css('top','-100%');
	});
	$(".login_click").click(function() {
		$('#forgot_pwd_form').trigger('reset');
		$(".main-form-login").css('top', '-150%');
		$(".main-form-forgot").css('top','-100%');
		$(".main-form-signup").css('top', '0');
		createCaptchaForSignup();
	});

	$(".forgot_click").click(function(){
		$(".main-form-forgot").css('top','0%');
		$(".main-form-login").css('top','-100%');
		$(".main-form-signup").css('top','-100%');
		$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
			window.localStorage.setItem('ip_address',data.ip);
		});
	});	
	
	$('.categoryslider').slick({
		slidesToShow : 8,
		dots : false,
		arrows : true,
		// centerMode: false,
		autoplay : true,
		autoplaySpeed : 2000,
		// centerPadding: '0',
		// pauseOnHover: true,
		// infinite: false,
		responsive : [ {
			breakpoint : 1024,
			settings : {
				slidesToShow : 7
			}
		}, {
			breakpoint : 768,
			settings : {
				slidesToShow : 4
			}
		}, {
			breakpoint : 400,
			settings : {
				slidesToShow : 2
			}
		} ]
	});
	
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
	
	window.onload = getVisitorCounter;
	
	
	$("#signUpZipcode").change(function(){
		let requestData = {pin_code: $("#signUpZipcode").val()};
		
		$.ajax({
			url : window.iscdl.appData.baseURL + "citizen/getAddressByPincode",
			method : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(requestData),
			async : false,
			success : function(result) {
				let response = JSON.parse(result);
				if(response.data !== null){
					$("#signUpCity").val(response.data.city);
					$('#signUpCity').focus();
					$("#signUpState").val(response.data.state);
					$('#signUpState').focus();
					$('#signUpState').blur();
				}else{
					$("#signUpZipcode").val(null);
					$("#signUpCity").val(null);
					$("#signUpState").val(null);
					$("#signUpForm").validate().element("#signUpZipcode");
					$("#signUpForm").validate().element("#signUpCity");
					$("#signUpForm").validate().element("#signUpState");
					$u.notify("warning", "Warning",
					"Invalid Zipcode !");
				}
			},
			error : function(err) {
				console.log(err);
			}
		});
		
	});

});
