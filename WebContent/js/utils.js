/**
 * 
 */

var csrf_header;
var csrf_token;

(function(global) {

	let base = new Object();

	base["strings"] = {

		code_reg : "^([0-9][0-9]*)",
		size_reg : "^([0-9]*.[0-9]*)",
		diameter : "^([0-9]+.[0-9]*)",
		scale_reg : "^([0-9]+:[0-9,]*[0-9])",
		email_reg : "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})$",
		easting : "Easting:",
		northing : "Northing:",
		lattitude : "Lattitude:",
		longitude : "Longitude:",
		masterAjaxURL : "/master/api",
		libraryAjaxURL : "library/api",
		archivalAjaxURL : "/archival/api",
		ligniteInventoryAjaxURL : "inventoryLignite/api",
		importCSV : "/master/importCSV/"
	};

	base["datatable"] = {
		/* scrollY:"200px" */
		scrollY : '45vh'
	};

	base["isNumber"] = function(evt) {
		evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}

	base["generateOptions"] = function(arr, value, name) {

		var str = "";

		if (arr && arr instanceof Array) {

			arr.forEach(function(elm) {
				str += "<option value='" + elm[value] + "'>" + elm[name]
						+ "</option>";
			})
		}
		return str;
	}

	base["isDecimal"] = function(evt) {

		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
			return false;

		return true;
	}
	base["notify"] = function(classname, title, text, image) {
		$.notify({
			title : title,
			text : text
		}, {
			style : 'metro',
			className : classname,
			autoHide : true,
			clickToHide : true
		});
	};

	base["accessDenied"] = function() {

		$.notify({
			title : "You do not have permission to access this page."
		}, {
			style : 'metro',
			className : "error",
			autoHide : true,
			clickToHide : true
		});
	};

	base["notify_basic"] = function(style, title, text) {
		$.notify({
			title : title,
			text : text
		}, {
			className : style,
			autoHide : true,
			clickToHide : true
		});
	};

	base["attr_notify"] = function(attr, style, title, text) {
		$(attr).notify({ // $("#attr").notify("error","Please enter
			// City.","");
			title : title,
			text : text
		}, {
			className : style,
			autoHide : true,
			clickToHide : true
		});
	};

	base["hideModal"] = function(modal) {

		$(document).on('keydown', function(e) {
			if (e.keyCode === 27) { // ESC
				$(modal).modal("hide");
			}
		});
	};

	base["ajaxRequest"] = function(method, url, postData, successCallBack,
			failedCallback, dataType, contentType) {

		if (!url) {
			throw "invalid URL";
		}
		postData = postData || {};

		let loadingId = "ajaxLoader" + new Date().getTime();

		var errorCallback;

		if (typeof failedCallback === "function") {
			errorCallback = function(xhr, status, error) {
				failedCallback(xhr, status, error);
			}
		}

		var obj = {
			beforeSend : function(request) {
				request.setRequestHeader(header, token);
			},
			complete : function(data, textStatus, xhr) {

				var statusCode = data.status;
				var statusText = data.statusText || "";

				if (statusText.toLowerCase() === "unauthorized"
						|| statusCode == "401") {

					$u
							.notify(
									'error',
									'Notification',
									'Your session has expired!!!\nPlease login again to continue.',
									'');

					if (typeof parent === "object") {
						// parent.location.reload();
					} else {
						// location.reload();
					}
				} else if (statusText.toLowerCase() === "forbidden"
						|| statusCode == "403") {

					// alert("You are not authorized to access this
					// area.\nPlease Contact System Administrator");
					$u
							.notify(
									'error',
									'Notification',
									'You are not authorized to access this area.\nPlease Contact System Administrator.',
									'');
					if (typeof parent === "object") {
						// parent.location.reload();
					} else {
						// location.reload();
					}
				}

			},
			error : errorCallback
		};

		obj.url = url;
		obj.method = method || "POST";
		obj.data = postData || "{}";

		if (contentType) {
			obj.contentType = contentType;
		}

		if (dataType) {
			obj.dataType = dataType;
		}

		obj.success = successCallBack || function(result) {
			alert("successfull");
			console.log(result);
		}

		return $.ajax(obj);
	};
	
	base["notify"] = function(classname, title, text, image) {
		if(classname == "error"){
			toastr.error(text, title, {
	            "timeOut": "3000",
	            "extendedTImeout": "0",
	            "positionClass": "toast-top-right"
	        });
			
		} else if(classname == "info"){
			toastr.info(text, title,{
	            "timeOut": "3000",
	            "extendedTImeout": "0",
	            "positionClass": "toast-top-right"
	        });
		} else if(classname == "warning"){
			
			toastr.warning(text,title,{
	            "timeOut": "3000",
	            "extendedTImeout": "0",
	            "positionClass": "toast-top-right"
	        });
		} else if(classname == "success"){
			toastr.success(text, title,{
	            "timeOut": "3000",
	            "extendedTImeout": "0",
	            "positionClass": "toast-top-right"
	        });
		}
	}

	global["utility"] = global["$u"] = base;

	$(document).ready(
			function() {
				
				let token = localStorage.getItem("token");
				if(token !== undefined && token !== null){
					window.iscdl.appData.inactivityTime();
					$(".user-info").text(JSON.parse(localStorage.getItem("user")).userName);
				}
				
				$("#sidebar_cityDep").on("click",function(){
					localStorage.removeItem("dashPage");
					localStorage.setItem("mapPage",true);
				});
				
				$("#sidebar_dashboard").on("click", function(){
					localStorage.removeItem("mapPage");
					localStorage.setItem("dashPage",true);
				});
				
				$('ul.dropdown-menu [data-toggle=dropdown]').on('click',
						function(event) {
							event.preventDefault();
							event.stopPropagation();
							$(this).parent().siblings().removeClass('open');
							$(this).parent().toggleClass('open');
						});
				$.ajaxSetup({
					beforeSend : function(request) {
						if (csrf_header && csrf_token) {
							request.setRequestHeader(csrf_header, csrf_token);
						}
						$("#loaderModal").show();
					},
					complete : function() {
						$("#loaderModal").hide();
					}
				});
			});
})(window, jQuery);
