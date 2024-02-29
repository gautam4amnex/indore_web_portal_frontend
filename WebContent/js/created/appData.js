(function(global) {

	global.iscdl = {};

	let obj = {
		baseURL : "http://localhost:1002/IndoreAPI/", // local URL
//		baseURL : "https://apagri.infinium.management/IndoreAPI/", // local URL
//		baseURL : "https://citymapindore.amnex.com/IndoreWebAPI/", // live URL AMNEX Server
//		baseURL : "https://citymap.smartcityindore.org:8443/ISCDLWebAPI/", // live URL Indore Server
//		baseURL : "https://indoresmartmap.org/ISCDLWebAPI/", // live URL Indore Server New
		defaultAccessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YzJjMGUwNC1jNzg1LTQ5ZTktYjc3MS03ODU3NjFkYTFhNmYiLCJpZCI6MTA5Mzk5LCJpYXQiOjE2ODYxMzkyNDB9.JCZmtKITzcGIrxJVi-sa-5patZYhsk4XcItwgcOneNs", 
		
		webURLPrefix : "/indoregis/", //local and live latest as discussed with M. Taha on 28th Dec 2020

		inactivityTime : function inactivityTime() {
			let time, warnTime, showWarnPopup, refreshTime;
			let expireInForRefresh = localStorage.getItem('expireIn');
			refreshTime = setTimeout(refreshToken, expireInForRefresh);
			window.onload = resetTimer;
			function showWarning() {
				$("#timeoutWarnModal").modal('show');
			}
			
			window.addEventListener('load', resetTimer, true);
			let events = [ 'mousedown', 'mousemove', 'keypress', 'keydown', 'keyup', 'scroll',
					'touchstart', 'auxclick', 'click', 'dblclick', 'mousemove', 'select', 'wheel', 'drag', 'dragstart',  ];
			events.forEach(function(name) {
				document.addEventListener(name, resetTimer, true);
			});

			function logout() {
				window.location = window.location.origin + window.iscdl.appData.webURLPrefix;
			}

			function addUserToken(old_token){
				//ADD NEW USER TOKEN TO DATABASE
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
							removeUserToken(old_token);
						},
						error : function(err) {
							console.log(err);
						}
					});
			}
			
			function removeUserToken(old_token){
				let userObj = {token: old_token};
				$.ajax({
					url : window.iscdl.appData.baseURL
							+ "api/logout",
					method : 'POST',
					contentType : 'application/json',
					data : JSON.stringify(userObj),
					async : false,
					beforeSend : function(request) {
						request.setRequestHeader('Authorization', 'Bearer '
								+ old_token);
					},
					success : function(result) {
						
					},
					error : function(err) {
						console.log(err);
					}
				});
			}
			
			function refreshToken() {
				let refresh_token = localStorage.getItem('refresh_token');
				let old_token = localStorage.getItem('token');
				if(refresh_token && refresh_token != null){
					
					let obj = {
							grant_type : "refresh_token",
							refresh_token : refresh_token
						};
						$.ajax({
							url : window.iscdl.appData.baseURL + "oauth/token",
							method : 'POST',
							contentType : 'application/x-www-form-urlencoded',
							data : obj,
							async : false,
							beforeSend : function(request) {
								request.setRequestHeader('Authorization',
										'Basic ZGV2Z2xhbi1jbGllbnQ6ZGV2Z2xhbi1zZWNyZXQ=');
							},
							success : function(result) {
								localStorage.setItem('token', result.access_token);
								localStorage.setItem('refresh_token', result.refresh_token);
								localStorage.setItem('expireIn', result.expires_in);
								addUserToken(old_token);
							},
							error : function(err) {
								console.log(err);
							}
						});
					
				}
				
			}
			
			
			function resetTimer() {
				clearTimeout(time);
				clearTimeout(showWarnPopup);
				
//				$("#timeoutWarnModal").modal('hide');
				
				if(($("element").data('bs.modal') || {})._isShown){
					$("#timeoutWarnModal").modal('hide');
				}
				let localStorage = window.localStorage;
				let expireIn = localStorage.getItem('expireIn');
				if(!expireIn || expireIn === null){
					expireIn = 900000;
				}
				warnTime = expireIn - 10000;
				showWarnPopup = setTimeout(showWarning, warnTime);
				time = setTimeout(logout, expireIn);
			}
			
			
		}
	}

	global.iscdl.appData = obj;

})(window)