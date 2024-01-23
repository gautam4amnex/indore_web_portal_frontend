function createCaptchaForSignup(){
	document.getElementById('signUpCaptcha').innerHTML = "";
	 $("#signUpCaptcha").append("<img src='"+
				window.iscdl.appData.baseURL + "getCaptcha?"+ new Date().getTime()+"' />");
	
	$("#signUptxtInput").val('');
}

function createCaptcha() {
	
//	-------------3. CAPTCHA IMAGE GENERATED FROM BACKEND - VAPT POINT NO 3.7
	//clear the contents of captcha div first 
	document.getElementById('captcha').innerHTML = "";
	 $("#captcha").append("<img src='"+
				window.iscdl.appData.baseURL + "getCaptcha?"+ new Date().getTime()+"' />");
	
	$("#txtInput").val('');
//	-------------2. CAPTCHA TEXT GENERATED FROM BACKEND - VAPT POINT NO 3.7
	
//	$.ajax({
//		url : window.iscdl.appData.baseURL + "getCaptcha",
//		method : 'GET',
//		async : false,
//		success : function(result) {
//			
//			if (result.responseCode === 200) {
//				var captcha = result.data
//				//clear the contents of captcha div first 
//				  document.getElementById('captcha').innerHTML = "";
//				  var canv = document.createElement("canvas");
//				  canv.id = "captchaCanvas";
//				  canv.width = 130;
//				  canv.height = 50;
//				  canv.style = "background-color:#808080;text-align:center;";
//				  var ctx = canv.getContext("2d");
//				  ctx.fillStyle = "white";
//				  ctx.font = "25px Georgia";
//				  ctx.textAlign = "center";
//				  ctx.fillText(captcha, canv.width/2, canv.height/1.5);
//				  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
//				  
//				  $("#captchaCanvas").val(captcha);
//			} 
//			
//		},
//		error : function(err) {
//			console.log(err);
//		}
//	});
	
	 
//		-------------1. CAPTCHA TEXT GENERATED FROM FRONTEND
	 
	//clear the contents of captcha div first 
//	  document.getElementById('captcha').innerHTML = "";
//	  var charsArray =
//	  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
//	  var lengthOtp = 6;
//	  var captcha = [];
//	  for (var i = 0; i < lengthOtp; i++) {
//	    //below code will not allow Repetition of Characters
//	    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
//	    if (captcha.indexOf(charsArray[index]) == -1)
//	      captcha.push(charsArray[index]);
//	    else i--;
//	  }
//	  var canv = document.createElement("canvas");
//	  canv.id = "captchaCanvas";
//	  canv.width = 130;
//	  canv.height = 50;
//	  canv.style = "background-color:#808080;text-align:center;";
//	  var ctx = canv.getContext("2d");
//	  ctx.fillStyle = "white";
//	  ctx.font = "25px Georgia";
//	  ctx.textAlign = "center";
//	  ctx.fillText(captcha.join(""), canv.width/2, canv.height/1.5);
////	  ctx.strokeText(captcha.join(""), 0, 30);
//	  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
//	  code = captcha.join("");
//	  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
//	  $("#textCaptcha").val(code);
}