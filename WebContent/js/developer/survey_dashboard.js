(function(global, $) {

	var base = {

		openImage: function openImage(event){
			let fileNames = $(event.currentTarget).data('image');
			var files = fileNames.split(",");
			for(var i = 0 ;i<files.length;i++){
				$("#carousel-inner").append("<div class='carousel-item"+ 
						(i === 0 ? " active'>" : "'>") +"<img class='d-block w-100' src='"+
						window.iscdl.appData.baseURL + "api-docs/dashboard/getImageFile/" + encodeURIComponent(files[i]) 
						+"' alt='"+files[i]+"'> </div>");
			}
			$("#imageModal").show();
		}
	};

	global.surveyController = base;

})(window, jQuery)