<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<c:set value="${pageContext.request.contextPath}" var="context" />
<meta name="_urlContext" content="${context}" />
  
<!DOCTYPE html>
<html lang="${language}">

<head>
	<title>Indore GIS | Contact US </title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="icon" type="image/png" href="${context}/images/favicon.png">
	<link rel="stylesheet" href="${context}/css/bootstrap.min.css">
	<link rel="stylesheet" href="${context}/css/font-awesome.min.css">
	<link rel="stylesheet" href="${context}/css/slick.css">
	<link rel="stylesheet" href="${context}/css/style.css">
	<link rel="stylesheet" href="${context}/css/fullpage.css">
	<link rel="stylesheet" href="${context}/css/home.css">
	<link rel="stylesheet" href="${context}/css/toastr.css">
	<link rel="stylesheet" href="${context}/css/admin-common.css">

</head>
<style>
div#fp-nav {
    display: none;
}

img.img-cont-icon {
    width: 27px;
    margin: 0 10px 0 0;
}

p {
    
    color: #fff;
}
</style>

<body id="page-body">	

<!-- wrapper -->
<div class="d-flex col-12 p-0 wrapper"> 
	
	<div class="header-home">
		<div class="logo-text">
			<img class="home-logo" src="${context}/images/Indore_Text_w.svg"/>
			<h3>GIS</h3>
		</div>	
		<div class="menu-lang-sos">
<!-- 			<a class="menu-click"><i class="fa fa-bars" aria-hidden="true"></i></a> -->
<%-- 			<a class="re-another" href="${context}/survey_dashboard.jsp">Dashboard</a> --%>
			<div class="click-another-page">
				<a class="re-another" href="${context}/login.jsp" data-translate="_login">Login</a>
				<a class="re-another" href="${context}/citizen_2d_map.jsp" data-translate="_city_gis">City GIS</a>
				<a class="re-another" href="javascript:void(0);" data-toggle="modal" style="padding: 5px 12px;"
					id="add_home_feedback" data-target="#feedback_modal" data-translate="_feedback">Feedback
				</a>
<%-- 				<a class="re-another" href="${context}/contact_us.jsp" data-translate="_contact_us">Contact Us</a> --%>
			</div>
			
			<div class="sos-link">
				<a class="re-another" id="facebookUrl" href="javascript:void(0);"><img src="${context}/images/home/Facebook.svg"></a>
				<a class="re-another" id="instagramUrl" href="javascript:void(0);"><img src="${context}/images/home/Insta.svg"></a>
				<a class="re-another" id="twitterUrl" href="javascript:void(0);"><img src="${context}/images/home/Twitter.svg"></a>
<%-- 				<a class="re-another" href="#"><img src="${context}/images/home/G+.svg"></a> --%>
				
			</div>
			
<!-- 			<div class="click-another-page"> -->
				
<!-- 			</div> -->
			<div style="margin-top: 15px;">
				<ul class="nav nav-pills home-language-ul" id="pills-tab" role="tablist">
					<li class="nav-item">
						<a class="nav-link" id="pills-hindi-tab" data-toggle="pill" href="javascript:void(0);pills-hindi" aria-controls="pills-hindi" aria-selected="true">हिंदी
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link active" id="pills-english-tab" data-toggle="pill" href="javascript:void(0);pills-english" role="tab" aria-controls="pills-english" aria-selected="false">Eng</a>
					</li>
				</ul>
			</div>
			
		</div>
	</div>
	
	<div id="fullpage" class="home-full">
			
			<div class="section">
					<div class="home-full-back"></div>
					<div class="home-right-back"></div>
					<div class="home-content">
						<div class="logo-text mb-3">
							<img class="home-logo" src="${context}/images/logo-bg.png" style="width:80px;height:80px;margin: 0 90px;">
							
						</div>
						<p>
							<img class="img-cont-icon" src="${context}/images/icons/Address-01.svg"/><span data-translate="_contact_us_address">Nehru Park Campus, Indore, MP - 452003</span>
						</p>
						<p data-translate="">
							<img class="img-cont-icon" src="${context}/images/icons/PhoneNo-02.svg"/><span data-translate="">0731-2535572</span>
						</p>
						<p data-translate="">
							<img class="img-cont-icon" src="${context}/images/icons/Email-03.svg"/><span data-translate="">smartcityindore16@gmail.com</span>
						</p>
					</div>
					<div class="home-img">
						<img src="${context}/images/home/BGImage2.jpg"/>
					</div>
					
			</div>
			
</div>



<div class="modal fade" id="feedback_modal" role="dialog">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<!-- Modal content-->
		<div class="modal-content dep-modal">
			<div class="modal-header">
				<h4 class="modal-title" data-translate="_add_feedback">Add Feedback</h4>
				<button type="button" id="form_addFeedback_close" class="close" data-dismiss="modal">&times;</button>
			</div>
			<div class="modal-body">
				<div class="container-fluid" id="grad1">
					<div class="row justify-content-center mt-0">
						<div class="col-md-12 mx-0">
							<form id="form_addFeedback" name="form_addFeedback" class="form-admin">
								<div class="row">
									<div class="col-sm-12 col-lg-6">
										<div class="form-group">
											<label for="first_name" data-translate="_first_name">First Name</label> <span class="mandatory">*</span>
											<input type="text" class="form-control" id="fb_first_name" name="fb_first_name"
												  placeholder="Enter First Name" data-translate = "_plch_first_name">
										</div>
										<div class="form-group">
											<label for="first_name" data-translate="_email_id">Email Id</label> 
											<input type="text" class="form-control" id="fb_email_id" name="fb_email_id"
												placeholder="Enter Email Id" data-translate = "_plch_email_id">
										</div>	
										<div class="form-group">
											<label for="first_name" data-translate="_subject">Subject</label> 
											<input type="text" class="form-control" id="fb_subject" name="fb_subject"
												placeholder="Enter Subject" data-translate = "_plch_subject">
										</div>				
									</div>
									
									<div class="col-sm-12 col-lg-6">
										<div class="form-group">
											<label for="first_name" data-translate="_last_name">Last Name</label> <span class="mandatory">*</span>
											<input type="text" class="form-control" id="fb_last_name" name="fb_last_name"
												placeholder="Enter Last Name" data-translate = "_plch_last_name">
										</div>
										<div class="form-group">
											<label for="first_name" data-translate="_mobile_no">Mobile No.</label> <span class="mandatory">*</span>
											<input type="number" class="form-control" id="fb_mobile_no" name="fb_mobile_no"
												placeholder="Enter Mobile No" data-translate = "_plch_mobile_no">
										</div>
										<div class="form-group">
											<label for="sctStudent" data-translate = "_comment">Comment</label> <span class="mandatory">*</span>
											<textarea class="form-control" rows="2" id="fb_comment"
												name="fb_comment" placeholder="Enter Comment"  data-translate = "_plch_comment"></textarea>				
										</div>
									</div>
									
								</div>
								
								<button style="margin: auto;display: block;" type="submit" id="fb_submit" name="fb_submit" 
									class="btn btn-indore mt-3" data-translate = "_submit">Submit</button>
									
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
	
	
	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/fullpage.js"></script>
	<script type="text/javascript" src="${context}/js/home.js"></script>
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>
	<script type="text/javascript" src="${context}/js/developer/home_language_controller.js"></script>
	<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
	<script type="text/javascript">
		window.localStorage.clear();
	</script>
</body>
</html>