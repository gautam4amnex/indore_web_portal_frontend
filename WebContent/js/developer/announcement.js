(function(global, $) {
	"use stricts;"

	var base = {

		getAnnouncementList : function getAnnouncementList() {
			let result;
			let api_data;

			let announcementInfoObj = {};

			let postData = JSON.stringify(announcementInfoObj);

			return $.ajax({
						method : 'POST',
						url : window.iscdl.appData.baseURL
								+ "citizen/announcement/getAnnouncementList",
						async : false,
						data : postData,
						contentType : 'application/json',
						success : function(result) {
							if (!$.isEmptyObject(result) && result != null) {
								try {
									result = JSON.parse(result);
									let str = "";
									if (result.responseCode == '200') {
										let response = result.data;
										api_data = response;
										let length = result.data.length;
										if (length > 0) {
											for ( let i in result.data) {
												let html = "<div class='aut-content'><h6>"
														+ result.data[i].announcement_title
														+ "</h6>"
//														+ (result.data[i].is_new && result.data[i].is_new === true ? 
//																"<button class='btn-indore new-announcement'>New!</button>" : " ")
														+ "<span>" + result.data[i].announcement_datetime
																+ "</span><p>"
														+ result.data[i].announcement_description
														+ "</p></div>";
												str += html;
											}

											$('#announce_block').append(str);
										}
									} else {
										$u.notify('warning', '', result.responseMessage ? result.responseMessage : 'Something went wrong', '');
									}
								} catch (err) {
									console.log(err);
								}
							} else {
								$u.notify('info', '', 'Announcement data not available', '');
							}
							
							return api_data;
						},
						error : function(e) {
							console.log(e);
							$u.notify('error', '', 'Something went wrong', '');
						}
					});
		},

	}

	/**
	 * add public functions to base
	 */

	global.announcementController = base;

})(window, jQuery)