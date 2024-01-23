<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>

<c:set value="${pageContext.request.contextPath}" var="context" />
<meta name="_urlContext" content="${context}" />

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Indore GIS Login & Sign Up </title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<link rel="icon" type="image/png" href="${context}/images/favicon.png">
<%-- 	<link rel="icon" href="${context}/images/Indore_Smart_City_Logo.ico" type="image/gif"> --%>
	<link rel="stylesheet" href="${context}/css/bootstrap.min.css">
	<link rel="stylesheet" href="${context}/css/font-awesome.min.css">
	<link rel="stylesheet" href="${context}/css/slick.css">
	<link rel="stylesheet" href="${context}/css/slickupdate.css">
	<link rel="stylesheet" href="${context}/css/toastr.css">
	<link rel="stylesheet" href="${context}/css/style.css">
	<link rel="stylesheet" href="${context}/css/fullpage.css">
	<link rel="stylesheet" href="${context}/css/loginsignup.css">

</head>
<body>	
<!-- <div class="loader"></div> -->
<!-- wrapper -->
<div class="col-12 p-0 wrapper"> 
	<div class="indore-sign">
		<img src="${context}/images/home/Indore.svg">
	</div>
		
	<div class="top-loginsignup">
		<div class="form-loginsignup">
			<div class="sm-logo">
				<a href="${context}">
					<img src="${context}/images/SmartCityLogo.jpg">
				</a>
			</div>
			
			<!--Sign Up form start-->
			<form class="main-form-signup form-logsign" id="signUpForm" name="signUpForm">
<!-- 				<div class="form-group wi-30"> -->
<!-- 					<input class="form-control" -->
<!-- 							type="text" id="signUpUserName" name="userName" required -->
<!-- 							placeholder="Username"/> -->
<!-- 				</div> -->
				<div class="form-group wi-30">
					<input class="form-control" data-translate="_signup_email"
							type="text" id="signUpEmailId" name="emailId" required
							placeholder="Email*"/>
				</div>
				<div class="form-group wi-30">
					<input type="text" class="form-control" id="signUpName" name="name" data-translate="_signup_name" placeholder="Name*"/>
				</div>
				<div class="form-group wi-30">
					<input class="form-control" data-translate="_signup_contact"
							type="text" id="signUpContactNo" name="contactNo" required
							placeholder="Mobile No*"/>
				</div>
				<div class="form-group wi-91">
					<input class="form-control" data-translate="_signup_address"
							type="text" id="signUpAddress" name="address" required
							placeholder="Address*"/>
				</div>
				
				<div class="form-group wi-30">
					<input class="form-control" data-translate="_signup_zipcode"
							type="text" id="signUpZipcode" name="zipcode" required
							placeholder="Zipcode*"/>
				</div>
				<div class="form-group wi-30">
					<input class="form-control" data-translate="_signup_city"
							type="text" id="signUpCity" name="city" required
							placeholder="City*" readonly/>
				</div>
				<div class="form-group wi-30">
				<input class="form-control" data-translate="_signup_state"
							type="text" id="signUpState" name="state" required
							placeholder="State*" readonly/>
<!-- 					<select class="form-control" id="state" name="state"> -->
<!-- 						<option value=" ">Select state</option> -->
<!-- 						<option value="2">state 2</option> -->
<!-- 						<option value="3">state 3</option> -->
<!-- 						<option value="4">state 4</option> -->
<!-- 					</select> -->
				</div>
				
				<div class="form-group w-25">
					<div class="d-flex">
					<div id="signUpCaptcha"></div><br/>
					<div class="input-group Captcha">
						<input type="text" id="signUptxtInput" class="form-control"
							maxlength="15" name="signUptxtInput" data-translate="_enter_captcha" placeholder="Enter Captcha" required/>
						<span class="input-group-addon"> 
							<button type="button" class="btn btn-indore" onclick="createCaptchaForSignup();"> 
								<i class="fa fa-refresh"></i>
							</button>
						</span>
					</div>
					</div>
				</div>
				
				<div class="form-check accept-check">
				  <input class="form-check-input" type="checkbox" id="tc_accept" name="tc_accept" required>
				  <label class="form-check-label" for="tc_accept" data-translate="_signup_terms">
					I Accept All Terms & Conditions*  
					<a href data-toggle="modal" data-target="#termsConditionsModal" data-translate="_signup_readmore">Read More</a>
				  </label>
				</div>
				
				
				<div class="text-center mt-3">
						<a href="#" class="btn btn-indore signup_click chng-btn-bg" data-translate="_login">Login</a>
						<a href="${context}/citizen_2d_map.jsp"  class="btn btn-indore chng-btn-bg" data-translate="_city_map" >Smart Map</a>
						<button type="submit" id="signupBtn" class="btn btn-indore" data-translate="_sign_up">Sign Up</button>
				</div>
				
			</form>
			<!--Sign Up form end-->
			
			<!--Login form end-->
			<form class="main-form-login form-logsign" id="loginForm">
				<div class="form-group wi-30">
<!-- 					<label for="username">Username</label> -->
					<input class="form-control" type="text" id="username" name="username" data-translate="_username"
								required placeholder="Username"/>
				</div>
				<div class="form-group wi-30 position-relative">
<!-- 					<label for="password">Password</label> -->
					<input class="form-control" type="password" id="password" data-translate="_password"
									name="password" required placeholder="Password"/>
					<a href="javascript:void(0);" class="forgot_click" data-translate="_forgot_password">Forgot Password ?</a>
				</div>
				<div class="form-group w-25">
<!-- 					<label for="captcha">Captcha</label> -->
					<div class="d-flex">
					<div id="captcha"></div><br/>
					<div class="input-group Captcha">
						<input type="text" id="txtInput" class="form-control"
							maxlength="15" name="txtInput" data-translate="_enter_captcha" placeholder="Enter Captcha" required/>
						<span class="input-group-addon"> 
							<button type="button" class="btn btn-indore" onclick="createCaptcha();"> 
								<i class="fa fa-refresh"></i>
							</button>
						</span>
					</div>
					</div>
<!-- 					<input type="text" class="form-control" id="captcha" name="captcha" placeholder="Enater Captcha"/> -->
				</div>
				
<!-- 				<div> -->
<!-- 					<button id="loginBtn" type="button" class="btn btn-indore">Login</button> -->
<!-- 				</div> -->
				
				<div class="text-center">
						<button id="loginBtn" type="submit" class="btn btn-indore" data-translate="_login">Login</button>
						<a href="${context}/citizen_2d_map.jsp" class="btn btn-indore chng-btn-bg" data-translate="_city_map" >Smart Map</a>
						<a href="#" class="btn btn-indore login_click chng-btn-bg" data-translate="_sign_up">Sign Up</a>
				</div>
				
			</form>
			<!--Login form end-->
			
<!-- 			Forgot Password Form start -->
			<form class="main-form-forgot form-forgot" id="forgot_pwd_form">
				<div class="form-group wi-30">
					<input type="text" class="form-control" id="user_name_forgot" name="user_name_forgot" 
						placeholder="Email*" data-translate="_signup_email"/>
				</div>
			
				
				<div class="text-left">
						<button type="submit" class="btn btn-indore" data-translate="_forgot_password">Forgot Password</button>
						<a href="#" class="btn btn-indore signup_click chng-btn-bg" data-translate="_forgot_baktologin">Back to Login</a>
				</div>
				
			</form>
<!-- 			Forgot Password Form end -->
		</div>
	</div>
		
	<div class="bottom-loginsignup">
		
		<!--login signup link-->
		<div class="menu-lang-sos loginsignup-sos">
<!-- 			<a class="menu-click"><i class="fa fa-bars" aria-hidden="true"></i></a> -->
			
			<div class="sos-link">
				<a class="re-another" id="facebookUrl" href="javascript:void(0);"><img src="${context}/images/home/Facebook.svg"></a>
				<a class="re-another" id="instagramUrl" href="javascript:void(0);"><img src="${context}/images/home/Insta.svg"></a>
				<a class="re-another" id="twitterUrl" href="javascript:void(0);"><img src="${context}/images/home/Twitter.svg"></a>
<%-- 				<a class="re-another" href="#"><img src="${context}/images/home/Gplus.svg"></a> --%>
			</div>
			
			<ul class="nav nav-pills language-ul" id="pills-tab" role="tablist">
				<li class="nav-item">
					<a class="nav-link" id="pills-hindi-tab" data-toggle="pill" href="javascript:void(0);pills-hindi" aria-controls="pills-hindi" aria-selected="true">हिंदी
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link active" id="pills-english-tab" data-toggle="pill" href="javascript:void(0);pills-english" role="tab" aria-controls="pills-english" aria-selected="false">Eng</a>
				</li>
			</ul>
		</div>
		<!--login signup link-->
		
		
		<div class="loginsignup-content scrollar">
			<div class="content-text">
				<p data-translate="_login_content"></p>
<!-- 				<a href="#"><strong>More</strong></a> -->
			</div>
		</div>
		
		
		
		<!--Category slider start-->
		<div class="categoryslider-mian">
			<div class="categoryslider">
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Education-22b.svg">
						<h4 data-translate="_education">Education</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Health-23b.svg">
						<h4 data-translate="_health">Health</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Industries-24b.svg">
						<h4 data-translate="_industrial">Industrial</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/MPPCB-25b.svg">
						<h4 data-translate="_mppcb">MPPCB</h4>
					</div>
				</a>
				<!-- <a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/NIC-27b.svg">
						<h4 data-translate="_nic">NIC</h4>
					</div>
				</a> -->
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/AICTSL-login.svg">
						<h4 data-translate="_aictsl">AICTSL</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Electricity-login.svg">
						<h4 data-translate="_mpkvvcl">MPKVVCL</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Police Department-login.svg">
						<h4 data-translate="_police">Police</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/T&C Planning Department-login.svg">
						<h4 data-translate="_tc_plannning">T&C Planning</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Indore Development Authority-login.svg">
						<h4 data-translate="_ida">IDA</h4>
					</div>
				</a>
				<!-- <a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/RTO-login.svg">
						<h4 data-translate="_rto">RTO</h4>
					</div>
				</a> -->
				
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Smart_City_Department_01_2.svg">
						<h4 data-translate=""> Indore Smart City</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Public Health Engineering-login.svg">
						<h4 data-translate="_phe">PHE</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/PWD-login.svg">
						<h4 data-translate="_pwd">PWD</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="${context}/images/icons/Women & Child Welfare Development Department-login.svg">
						<h4 data-translate="_wcwd">WCWD</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="images/icons/IMC-login.svg">
						<h4 data-translate="_imc">IMC</h4>
					</div>
				</a>
				<a href="#" class="category-link">
					<div class="category-sub">
						<img src="images/icons/Land Record Department-login.svg">
						<h4 data-translate="_land_record">Land Record</h4>
					</div>
				</a>
				
				
			</div>
		</div>
		<!--Category slider end-->
	</div>
	
	
</div>
<footer>
		<div class="row footer-mian">
			
			<div class="col-sm-12 col-md-8 col-lg-8">
				<p>Copyright © ISCDL All Rights Reserved  | <a href="${context}/it_policy.jsp" target="_blank" data-translate="_it_policy_heading">IT Policy</a> | <a href="${context}/terms_and_conditions.jsp" target="_blank" data-translate="_tc_heading">Terms &amp; Condition</a>  | <a href="${context}/contact_us.jsp" target="_blank" data-translate="_contact_us">Contact Us</a></p> 
			</div>
			
			<div class="col-sm-12 col-md-4 col-lg-4 text-right">
 				<p class="text-right">Visitor Count: <span class="visitor_count"></span> </p>
			</div>
		</div>
	</footer>
		
<!-- /#wrapper -->



	<div class="modal fade" id="termsConditionsModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div class="modal-content terms-modal">
						<div class="modal-header terms-header">
							<h6 class="modal-title" data-translate="_tc_heading">Terms & Conditions</h6>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<h6 class="terms-label" data-translate="_it_policy_heading">IT Policy</h6>
							<p data-translate="_it_policy_description1">We do not collect personal information for any purpose other than to respond to you (for example, to respond to your queries ). If you choose to provide us with personal information like filling out a Contact Us form with an e-mail address or postal address, and submitting it to us through the website, we use that information to respond to your message, and to help you get the information you have requested.</p>
							<p data-translate="_it_policy_description2">When you browse, read pages, or download information on this website, we automatically gather and store certain technical information about your visit. This information never identifies who you are. The information we collect and store about your visit is listed below:</p>
							<ul>
								<li data-translate="_it_policy_li1">The Internet domain of your service provider (e.g. mtnl.net.in) and IP address (an IP address is a number that is automatically assigned to your computer whenever you are surfing the web) from which you access our website.</li>
								<li data-translate="_it_policy_li2" >The type of browser (such as Firefox, Netscape, or Internet Explorer) and operating system (Windows, Linux) used to access our site.</li>
								<li data-translate="_it_policy_li3">The date and time you access/accessed our site.</li>
								<li data-translate="_it_policy_li4">The pages/URLs you have visited, and</li>
								<li data-translate="_it_policy_li5">If you reached this website from another website, the address of that referring website.</li>
							</ul>						
							
							<p data-translate="_it_policy_description3">This information is only used to help us make the site more useful for you. With this data, we learn about the number of visitors to our site and the types of technology our visitors use. We never track or record information about individuals and their visits.</p>
							
							<p data-translate="_it_policy_description4">When you view our website, we may store some data on your computer in the form of a "cookie" to automatically recognize your PC next time you visit. Cookies can help us in many ways, for example, by allowing us to tailor a website to better match your interests or to store your password to save you having to re-enter it each time. If you do not wish to receive cookies, please configure your Internet browser to erase all cookies from your computer's hard drive, block all cookies or to receive a warning before a cookie is stored.</p>

<!-- 							<p>This website uses cookies. Generally, this website does not collect any personal information about you when you visit the site. Contents can be accessed without revealing your personal information. However, personally identifiable information like your email address will be recorded during any feedback you may provide and will not be used in any other manner except to reply to your query. -->
<!-- 							</p> -->
							
<!-- 							<p>This website records your visits and logs the following information for statistical purposes - your server's address; the name of the top-level domain from which you access the Internet (for example, .gov, .com, .in, etc.); the type of browser you use; the date and time you access the site; the pages you have accessed; the documents downloaded and the previous Internet address from which you linked directly to the site. We do not identify users or their browsing activities, except when law enforcement agencies may exercise a warrant to inspect such logs. In such an instance, your personally identifiable information, that you may choose to provide during an interaction with us, may also be divulged to these agencies if asked for. -->
<!-- 							</p> -->
							
							
							<hr>
							<h6 class="terms-label" data-translate="_tc_heading">Terms & Conditions</h6>
							<p data-translate="_tc_description1">This website is designed, developed and maintained by Indore Smart City Development Limited and by accessing this website, you unconditionally accept to be legally bound by the terms and conditions.</p>
							<p data-translate="_tc_description2">If you do not agree to the mentioned terms and conditions, please do not access the website.</p>
							<p data-translate="_tc_description3">If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use.</p>
							<p data-translate="_tc_description4">We reserve the right to change these conditions from time to time without notice. You acknowledge and agree that it is your responsibility to review these Terms & Conditions periodically to familiarize yourself with any modifications. Your continued use of this site after such modifications will constitute acknowledgment and agreement of the modified terms and conditions.</p>
							<ul>
								<li data-translate="_tc_li1">In order to access certain details, you may be required to provide some information about yourself (such as identification, email, phone number etc.) as part of the registration process, or as part of your ability to use the details. You agree that any information you provide will always be accurate, correct, and up to date.</li>
								<li data-translate="_tc_li2">Attempting to copy, duplicate, reproduce, sell, trade, or resell our information is strictly prohibited.</li>
								<li data-translate="_tc_li3">From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
								<li data-translate="_tc_li4">Efforts have been made to ensure the accuracy and currency of the content on this website; however, the same should not be interpreted as a statement of law or used for any legal purposes.</li>
								<li data-translate="_tc_li5">In case of any ambiguity or doubts, users are advised to verify / check with the concerned Department(s) and / or other source(s), and obtain appropriate professional advice.</li>
							</ul>
							
<!-- 							<p>Any of the content may not be modified, altered, tempered, sold or commercially exploited. -->
<!-- 							</p> -->
<!-- 							<p>You agree to abide by all notices and restrictions attached to any content accessed through this website and not to alter the content in any way. -->
<!-- 							</p> -->
<!-- 							<p>These terms and conditions are governed by and to be interpreted in accordance with relevant Indian Laws, both substantive and procedural. In the event of any dispute arising in relation to these terms and conditions or any dispute arising in relation to the website whether in contract or tort or otherwise the Indian courts will have exclusive jurisdictions over such dispute. -->
<!-- 							</p> -->
<!-- 							<p>Indore smart  city development limited may change the terms and conditions set out above from time to time. By browsing this website you are accepting that you are bound by the current terms and conditions and so you should check these each time you re-visit the site. -->
<!-- 							</p> -->
							
							<hr>
							<h6 class="terms-label" data-translate="_copyright_policy_heading">Copyright Policy</h6>
<!-- 							<p>Material featured on this site may not be modified, altered, tempered, sold or commercially exploited. -->
<!-- 							</p> -->
							<p data-translate="_copyright_policy_description">Contents of this website may not be reproduced partially or fully, without due permission from Indore Smart City Development Limited. If referred to as a part of another website, the source must be appropriately acknowledged. The contents of this website cannot be used in any misleading or objectionable context.</p>
						</div>

						<div class="modal-footer reset-footer">
							<button type="button" class="btn btn-indore" id="chng_password_close_btn" 
							data-dismiss="modal">Close</button>
						</div>
					
				</div>
			</div>
		</div>

	
	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	<script type="text/javascript" src="${context}/js/fullpage.js"></script>
	<script type="text/javascript" src="${context}/js/loginsignup.js"></script>
	<script type="text/javascript" src="${context}/js/LoginCaptcha.js"></script>
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>
	<script type="text/javascript" src="${context}/js/designer/login_design.js"></script>
	<script type="text/javascript" src="${context}/js/developer/login_developer.js"></script>
	<script type="text/javascript">
		createCaptcha();
	</script>
</body>
</html>