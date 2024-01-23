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
	<title>Indore GIS</title>
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
<body id="page-body">	

<!-- wrapper -->
<div class="d-flex col-12 p-0 wrapper"> 
	
	<div class="header-home">
		<div class="logo-text">
			<img class="home-logo" src="${context}/images/Indore_Text_w.svg"/>
<!-- 			<h3>GIS</h3> -->
			<h3 data-translate="_city_gis">Smart Map</h3>
		</div>	
		<div class="menu-lang-sos">
<!-- 			<a class="menu-click"><i class="fa fa-bars" aria-hidden="true"></i></a> -->
<%-- 			<a class="re-another" href="${context}/survey_dashboard.jsp">Dashboard</a> --%>
			<div class="click-another-page">
				<a class="re-another" href="${context}/login.jsp" data-translate="_login">Login</a>
				<a class="re-another" href="${context}/citizen_2d_map.jsp" data-translate="_city_gis">Smart Map</a>
				<a class="re-another" href="javascript:void(0);" data-toggle="modal" style="padding: 5px 12px;"
					id="add_home_feedback" data-target="#feedback_modal" data-translate="_feedback">Feedback
				</a>
				<a style="color: white;" href="http://164.100.196.30/Content/html/abpas6.4/Homepage.html#/login" target="_blank">ABPAS 2</a>
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
					<div class="home-img">
						<img src="${context}/images/home/BGImage.png"/>
					</div>			
					<div class="home-content">
						<h1 data-translate="_rajwada_palace_heading">Rajwada Palace</h1>
						<p data-translate="_rajwada_palace_description">Rajwada is a historical palace in Indore city. It was built by the Holkars of the Maratha Empire about two centuries ago. This seven storied structure is located near the Chhatris and serves today as a fine example of royal grandeur and architectural skills. The structure comprises two parts, the first one located at the heart of the city and the second one standing in the old part of the town. Rajwada palace exhibits a blend of Maratha styles, the palatial structure is sure to leave you spellbound. The entrance itself is beautiful with lofty archway and a giant wooden door covered with iron studs. As one makes his way through the entrance, one is greeted with a courtyard comprising Maratha arched Ganesha hall, a number of balconies with Maratha ornamentation, windows, and corridors, surrounded by galleried rooms.
						</p>
<!-- 						<div class="scroll-down"> -->
<%-- 							<img src="${context}/images/home/Scroll_down.svg"/> --%>
<!-- 							<span>Scroll Down</span> -->
<!-- 						</div> -->
					</div>
			</div>
			<div class="section">
					<div class="home-full-back"></div>
					<div class="home-right-back"></div>
					<div class="home-content">
						<h1 data-translate="_daly_college_heading">The Daly College</h1>
						<p data-translate="_daly_college_description">
							General Daly from the very first had evinced a great interest in education. He instituted the Residency College at Indore and paid close attention to its work and progress.He took a leading part in the discussion, which resulted in the foundation of the Mayo College at Ajmer. There is hardly a state in Central Indore, which does not point with pride to the schools and colleges that owe their origin to his initiatives.General Daly was a man of action himself; it was one of his well-known saying that "a political officer who could not jump on a horse and ride fifty miles when duty called him wasn't worth keeping".
						</p>
					</div>
					<div class="home-img">
						<img src="${context}/images/home/BGImage2.jpg"/>
					</div>
					
			</div>
			<div class="section">
					<div class="home-full-back"></div>
					<div class="home-right-back"></div>
					<div class="home-content">
						<h1 data-translate="_krishnapura_chhatri_heading">Krishnapura Chhatri</h1>
						<p data-translate="_krishnapura_chhatri_description">
							The Krishnapura Chhatri, also known as the Krishna Pura Chhatri are three chhatri located in Indore, Madhya Pradesh, India. The structures were built by the Holkars as cenotaphs to house the remains of the dynasty's rulers, leading to them also being known as the Holkar Chhatris. All three of the Chhatris are located half a kilometer from the palace-city of Rajwada, which was also built by the Holkar dynasty.
						</p>
					</div>
					<div class="home-img">
						<img src="${context}/images/home/BGImage3.jpg"/>
					</div>
			</div>
			<div class="section">
					<div class="home-full-back"></div>
					<div class="home-right-back"></div>
					<div class="home-content">
						<h1 data-translate="_lal_bagh_heading">Lal Bagh Palace</h1>
						<p data-translate="_lal_bagh_description">
							Lal Bagh Palace is one of the most spectacular buildings in Indore. It stands on the outskirts of the town, towards the southwest. It is a three storey building on the bank of the River Khan. The palace was built by Maharaja Shivaji Rao Holkar during 1886-1921. Situated amidst dry and dusty gardens, it is architecturally quite similar to the New Palace. Lal Bagh Palace once hosted many royal receptions and even today, reflects the life style and taste of the Holkar Rulers.
						</p>
					</div>
					<div class="home-img">
						<img src="${context}/images/home/BGImage4.jpg"/>
					</div>
			</div>
			<div class="section">
					<div class="home-full-back"></div>
					<div class="home-right-back"></div>
					<div class="home-content">
						<h1 data-translate="_gandhi_hall_heading">The Gandhi Hall</h1>
						<p data-translate="_gandhi_hall_description">
							The Gandhi Hall was originally known as King Edward Hall, but H. H. Yeshwant Rao Holkar II (reign: 1926 - 1948) renamed it in 1948, after the death of Mahatma Gandhi ! This town hall was designed & constructed by architect Mr. Charles Frederick Stevens from Mumbai at a cost of Rs. 2,50,000 and was inaugurated by Prince of Wales, George V in 1905 ! It was made in the Indo-Gothic style, made of White stones from Seoni & Red stones from Patan in M. P., has magnificent domes and minarets, and a huge clock-tower !
						</p>
					</div>
					<div class="home-img">
						<img src="${context}/images/home/BGImage5.jpg"/>
					</div>
			</div>
			<div class="section">
					<div class="home-full-back"></div>
					<div class="home-right-back"></div>
					<div class="home-content">
						<h1 data-translate="_ganesh_mandir_heading">Khajarana Ganesh Mandir</h1>
						<p data-translate="_ganesh_mandir_description">
							Khajrana Ganesha Temple was constructed by Rani Ahilyabai Holkar. This temple is one of the most famous Hindu temples in India.The main festival of this temple is vinayak chathurthi and was held in a grand manner in the month of August and september. The temple is taken over by the government. It is believed that in order to safeguard the idol from Aurangzeb, the idol was hidden in a well and in 1735, it was taken out from the well and a temple was established in 1735 by Ahilyabai Holkar belonging to the Holkar dynasty of the Maratha Empire.The temple has developed a lot over the years. The gate and the outer wall of the Garbhagriha is made of silver and different moods and festivals are depicted on it. The eyes of the deity are made of diamonds. The upper wall of the Garbhagriha is made of silver.
						</p>
					</div>
					<div class="home-img">
						<img src="${context}/images/home/BGImage6.jpg"/>
					</div>
			</div>
			<div class="section">
					<div class="home-full-back"></div>
					<div class="home-right-back"></div>
					<div class="home-content">
						<h1 data-translate="_rangpanchami_heading">Rang Panchami</h1>
						<p data-translate="_rangpanchami_description">
							Rangapanchami is celebrated five days after Dulendi or Holi, but it is not the usual Holi colors that paint the atmosphere around, rather it is the color of music that fills the air. Indore has its own style of celebrating Rang Panchami. Here, it is celebrated like Dulendi, but colors are mixed with water and then poured on others. On the event of the festival, the local municipal corporation sprinkles color mixed water on the main streets of old Indore. Earlier, they used Fire Brigade vehicles for this purpose. Rangapanchami is an age old festival, which was celebrated during the Holkar reign and continues to be celebrated till date.
						</p>
					</div>
					<div class="home-img">
						<img src="${context}/images/home/BGImage9.jpg"/>
					</div>
			</div>
			<div class="section">
					<div class="home-full-back"></div>
					<div class="home-right-back"></div>
					<div class="home-content">
						<h1 data-translate="_white_church_heading">White Church</h1>
						<p data-translate="_white_church_description">
							White Church is  one of the oldest churches in central India. It was built by Governor General of India, Sir Robert M C Hamilton in the year 1858.  The church displays the ancient British architecture, which was prevalent in most of the protestant churches in Britain. The church was mainly built for the Christians living in India and the army personnel who came to the city often during the pre‐independence era.
						</p>
					</div>
					<div class="home-img">
						<img src="${context}/images/home/BGImage8.jpg"/>
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
												  placeholder="Enter First Name" data-translate = "_plch_first_name" onkeyup="validateFname();">
										</div>
										<div class="form-group">
											<label for="first_name" data-translate="_email_id">Email Id</label> 
											<input type="text" class="form-control" id="fb_email_id" name="fb_email_id"
												placeholder="Enter Email Id" data-translate = "_plch_email_id">
										</div>	
										<div class="form-group">
											<label for="first_name" data-translate="_subject">Subject</label> 
											<input type="text" class="form-control" id="fb_subject" name="fb_subject"
												placeholder="Enter Subject" data-translate = "_plch_subject" onkeyup="validateSubject();">
										</div>				
									</div>
									
									<div class="col-sm-12 col-lg-6">
										<div class="form-group">
											<label for="first_name" data-translate="_last_name">Last Name</label> <span class="mandatory">*</span>
											<input type="text" class="form-control" id="fb_last_name" name="fb_last_name"
												placeholder="Enter Last Name" data-translate = "_plch_last_name" onkeyup="validateLname();">
										</div>
										<div class="form-group">
											<label for="first_name" data-translate="_mobile_no">Mobile No.</label> <span class="mandatory">*</span>
											<input type="number" class="form-control" id="fb_mobile_no" name="fb_mobile_no"
												placeholder="Enter Mobile No" data-translate = "_plch_mobile_no">
										</div>
										<div class="form-group">
											<label for="sctStudent" data-translate = "_comment">Comment</label> <span class="mandatory">*</span>
											<textarea class="form-control" rows="2" id="fb_comment"
												name="fb_comment" placeholder="Enter Comment"  data-translate = "_plch_comment" onkeyup="validateComment();"></textarea>				
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