var tweet = encodeURIComponent($("meta[property='og:description']").attr("content"));

//email link click
//$('#emailLink').click(function(event){
//	event.preventDefault();
//    let email = '';
//    let subject = 'Link Of Indore Portal ';
//    let link_url = $('#sharelinktxt').val();
//    var extent = map.getView().calculateExtent(map.getSize());
//    
//    let xmin = extent[0];
//	let ymin = extent[1];
//	let xmax = extent[2];
//	let ymax = extent[3];
//	let srs = 4326;
//	
//	
//	
//	
//	link_url += '?xmin=' + xmin + '&ymin=' + ymin + '&xmax=' + xmax + '&ymax=' + ymax + '&wkid=' + srs;
//    
//    let emailBody = 'Hello, \n You can visit the shared link of Indore City GiS portal. \n URL - ' + encodeURIComponent(link_url);
//    
//    let url = 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to='+ email +'&su=' + subject
//   		+ '&body=' + emailBody + '&tf=1';
//    
//    http://localhost:8081/indoregis/city_department.jsp?xmin=null&ymin=null&xmax=null&ymax=null&wkid=null
//   
//	window.open(url,"NewWindow");
//
//    
////    window.location = 'mailto:' + email + '?subject=' + subject + '&body=' +   emailBody;
//});

//facebook link click
$('#facebookLink').click(function(event){
	event.preventDefault();
	let link_url = $('#sharelinktxt').val();
	
	 let xmin = localStorage.getItem("xmin");
		let ymin = localStorage.getItem("ymin");
		let xmax = localStorage.getItem("xmax");
		let ymax = localStorage.getItem("ymax");
		let srs = localStorage.getItem("spatialReference");
		
		link_url += '?xmin=' + xmin + '&ymin=' + ymin + '&xmax=' + xmax + '&ymax=' + ymax + '&wkid=' + srs;
	
	let url = 'https://www.facebook.com/sharer/sharer.php?u=' + link_url;
	//let url = 'https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2FshareArticle?mini=true&url='+link_url +'&title=Indore Web GIS Link';
	socialWindow(url);
});

//twitter link click
$('#twitterLink').click(function(event){
	event.preventDefault();
	let link_url = $('#sharelinktxt').val();
	
	 let xmin = localStorage.getItem("xmin");
		let ymin = localStorage.getItem("ymin");
		let xmax = localStorage.getItem("xmax");
		let ymax = localStorage.getItem("ymax");
		let srs = localStorage.getItem("spatialReference");
		
		link_url += '?xmin=' + xmin + '&ymin=' + ymin + '&xmax=' + xmax + '&ymax=' + ymax + '&wkid=' + srs;
	
	let url = 'https://twitter.com/share?u=' + link_url;
    socialWindow(url);
});

//for opening new window
function socialWindow(url) {
	  var left = (screen.width - 570) / 2;
	  var top = (screen.height - 570) / 2;
	  var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
	  window.open(url,"NewWindow",params);
}
