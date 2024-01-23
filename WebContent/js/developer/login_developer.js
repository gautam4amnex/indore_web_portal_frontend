(function(global, $) {

	var localStorage = window.localStorage;
	var base = {

		signup : function signup(username, name, contactNo, email, address,
				city, state, zipCode, signupCaptcha) {
			var userSignupObj = {
				userName : username,
				name : name,
				contactNo : contactNo,
				emailId : email,
				address : address,
				city : city,
				state : state,
				zipCode : zipCode,
				signupCaptcha: signupCaptcha
			};
			
			var requestObj = JSON.stringify(userSignupObj);
			
			$.ajax({
				url : window.iscdl.appData.baseURL + "citizenSignup",
				method : 'POST',
				contentType : 'application/json',
				data : requestObj,
				async : false,
				success : function(result) {
					if (result.responseCode === 200) {
						$('#signUpForm').trigger('reset');
						$u.notify('success', 'Success',
								'Registration Successful.', '');
						createCaptchaForSignup();
					}else if(result.responseCode === 203){
						$u.notify('warning', 'Warning',
								result.responseMessage, '');
					}
				},
				error : function(err) {
					console.log(err);
				},
				complete: function(a){
					$(".loader").fadeOut();
				}
			});
		},

		addUserToken : function addUserToken() {
			let u_id = localStorage.getItem('user_data');
			if(u_id == undefined || u_id == null || u_id == ""){
				u_id = 0;
			}
			var userObj = {
				token : localStorage.getItem('token'),
				userId : u_id
			};
			$.ajax({
				url : window.iscdl.appData.baseURL
						+ "addUserToken",
				method : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(userObj),
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					
				},
				error : function(err) {
					console.log(err);
				}
			});
		},
		
		getUserInfo : function getUserInfo(username) {
			var userObj = {
				username : username
			};
			$.ajax({
				url : window.iscdl.appData.baseURL
						+ "api/user/getCurrentUserInfo",
				method : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(userObj),
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization', 'Bearer '
							+ localStorage.getItem('token'));
				},
				success : function(result) {
					localStorage.setItem("user", JSON.stringify(result));
					localStorage.setItem('user_data', result.userId);
					localStorage.setItem('department_id', result.department_id);
					window.loginController.addUserToken();
					if (result.roleName === 'ROLE_CITIZEN') {
						window.location = window.location.origin
								+ window.iscdl.appData.webURLPrefix + "citizen_2d_map.jsp";
					} else if (result.roleName === 'ROLE_SUPERVISOR') {
						window.location = window.location.origin
								+ window.iscdl.appData.webURLPrefix + "survey_dashboard.jsp";
					} else {
						if(result.department_dashboard && result.department_dashboard !== null && result.department_dashboard.is_admin == true){
							window.location = window.location.origin
							+ window.iscdl.appData.webURLPrefix + "CentralDashboard.jsp";
						} else{
							window.location = window.location.origin
							+ window.iscdl.appData.webURLPrefix + "city_department.jsp"; 
								
						} 
						
						
					}
					
				},
				error : function(err) {
					console.log(err);
				}
			});
		},

		login : function login(username, password, captcha) {
			var userObj = {
				username : username,
				password : password,
				grant_type : 'password',
				captcha : captcha
			};
			$.ajax({
				url : window.iscdl.appData.baseURL + "oauth/token",
				method : 'POST',
				contentType : 'application/x-www-form-urlencoded',
				data : userObj,
				async : false,
				beforeSend : function(request) {
					request.setRequestHeader('Authorization',
							'Basic ZGV2Z2xhbi1jbGllbnQ6ZGV2Z2xhbi1zZWNyZXQ=');
				},
				success : function(result) {
					localStorage.setItem('token', result.access_token);
					localStorage.setItem('refresh_token', result.refresh_token);
					localStorage.setItem('expireIn', result.expires_in);
					window.loginController.addUserToken();
					window.loginController.getUserInfo(username);

				},
				error : function(err) {
					if(err.responseJSON){
						$u.notify('warning', 'Warning',
//								err.responseJSON.error === 'invalid_grant' ? 'Invalid Username/Password' : err.responseJSON.error_description 
								err.responseJSON.error_description
								, '');
					}
					createCaptcha();
				}
			});
		},

		forgotPassword : function forgotPassword(userName) {
			var userObj = {
				userName : userName,
				ipAddress : localStorage.getItem('ip_address')
			};
//			$(".loader").fadeIn();
			$.ajax({
				url : window.iscdl.appData.baseURL + "forgot",
				method : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(userObj),
				async : false,
				success : function(result) {
//					$(".loader").fadeOut();
					
					if (result.responseCode === 200) {
						$('#forgot_pwd_form').trigger('reset');
						$u.notify('success', 'Success',
								result.responseMessage, '');
					} else {
						$u.notify('warning', '',
								result.responseMessage, '');
					}
					
				},
				error : function(err) {
					$u.notify('error', 'Error',
							'Something went wrong', '');
				}
			});
		},
		
		loaderTop: function loaderTop(){
			 $(".loader").fadeOut(2000);
		}
	};

	global.loginController = base;

})(window, jQuery)