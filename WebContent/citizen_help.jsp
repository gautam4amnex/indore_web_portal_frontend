
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<c:set value="${pageContext.request.contextPath}" var="context" />
<link rel="icon" type="image/png" href="${context}/images/favicon.png">
	<link rel="stylesheet" href="${context}/css/bootstrap.min.css">
	<link rel="stylesheet" href="${context}/css/jquery-ui.css">
    <link type="text/css" rel="stylesheet" href="${context}/css/bootstrap-select.css" />
	<link type="text/css" rel="stylesheet" href="${context}/css/font-awesome.min.css">
	
	<link type="text/css" rel="stylesheet" href="${context}/css/style.css">
	<link type="text/css" rel="stylesheet" href="${context}/css/admin-common.css">

<title>User Manual</title>


<style>
.page-content-wrapper{overflow: hidden;}
.page-content-wrapper{width: 100%;}
.helpNav {
    width: 215px;
    padding: 10px 5px;
    position: relative;
    float: left;
    height: 100%;
    background: #fff;
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
    margin-left: 0px;
    border: 1px solid #e4e0e0;
    z-index: 111;
    overflow: auto;
}


.menu-title {
    background: var(--main-theme-color);
    padding: 10px 05px;
    border-radius: 30px;
    font-size: 16px;
    text-align: center;
    color: #fff;
}

.help-page-main {
     height: calc(100vh - 65px); 
   overflow: auto; 
    padding: 20px;
}

.help-page-main ul {
    padding: 0 0 0 20px;
}

.sideul .panel-heading {
    padding: 0;
    border-radius: 0;
    color: #212121;
    background-color: #FAFAFA;
    border-color: #EEEEEE;
    position: relative;
}

.sideul .panel-title {
    font-size: 14px;
    margin: 0;
    border-bottom: 1px solid var(--main-theme-color);
}

.sideul  a {
    display: block;
    padding: 11px;
    text-decoration: none;
    background: var(--main-langback);
    color: #000;
    font-size: 14px;
    font-weight: 600;
}

.sideul .panel-body {
    
    border-bottom: 1px solid var(--main-theme-color);
}

.sideul .panel-heading i {
    position: absolute;
    top: 1px;
    right: 10px;
    font-size: 31px;
}

.sideul ul {
    padding: 0;
    list-style-type: none;
}

.usermanual-img {
    width: 70%;
    height: 70%;
}
ol {
    padding: 0 0 0 10px;
}

@media only screen and (min-width : 320px) and (max-width : 620px) {
	.usermanual-img {
	    width: 100%;
	    height: auto;
	}
}
</style>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		
		
		<div class="helpNav">
            <h4 class="menu-title" data-translate="_app_overview">Application Overview
            </h4>

            <ul class="p-0 sideul">
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                   <!--  <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingOne">
                            <h4 class="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne" class="collapsed">
                                    <i class="more-less glyphicon glyphicon-plus"></i>
                                    Citizen web Portal
                                </a>
                                <i class="fa fa-angle-down"></i>
                            </h4>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" >
                            <div class="panel-body">
                               <ul> 
                                <li><a href="#homescreen">Home Screen</a></li>
                                <li><a href="#login">Login Screen</a></li>
                                <li><a href="#citymap">City Map</a></li>
                                <li><a href="#tdmap">3D Map</a></li> 
                                </ul>
                            </div>
                        </div>
                    </div> -->

                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingTwo">
                            <h4 class="panel-title">
                                <a class="collapsed"  href="#homescreen" data-translate="_app_ov_homeScreen">
                                   
                                    Home Screen
                                </a>
                               
                            </h4>
                        </div>
                       <!--  <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" >
                            <div class="panel-body">
                                <ul>
	                                <li><a href="#globalsearch">Global Search</a></li>
	                                <li><a href="#zoomin">Zoom In & Out</a></li>
	                                <li><a href="#myocation">My Location</a></li>
	                                <li><a href="#print">Print</a></li>
	                                <li><a href="#measurement">Measurement</a></li>
	                                <li><a href="#clearmap">Clear map</a></li>
	                                <li><a href="#bookmark">Bookmark</a></li>
	                                <li><a href="#share">Share</a></li>
                                </ul>
							 </div>
                        </div> -->
                    </div>
					<div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headinFourt">
                            <h4 class="panel-title">
                                <a class="" role="button" href="#logiscreen" data-translate="_app_ov_loginScreen">
                                    
                                    Login Screen
                                </a>
                       
                            </h4>
                        </div>
                       
                    </div>
					<div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headinFourt">
                            <h4 class="panel-title">
                                <a class="" role="button" href="#citymap" data-translate="_app_ov_cityMap">
                                    
                                    City Map
                                </a>
                       
                            </h4>
                        </div>
                       
                    </div>
 <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headinFourt">
                            <h4 class="panel-title">
                                <a class="" role="button" href="#Language1" data-translate="_app_ov_language">
                                     
                                    Language
                                </a>
                       
                            </h4>
                        </div>
                       
                    </div>
                    
                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingTwo">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" data-translate="_app_ov_mapTools">
                                    <i class="more-less glyphicon glyphicon-plus"></i>
                                    Map tools
                                </a>
                                <i class="fa fa-angle-down"></i>
                            </h4>
                        </div>
                        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" >
                            <div class="panel-body">
                                <ul>
	                                <li><a href="#globalsearch" data-translate="_app_ov_mt_globalSearch">Global Search</a></li>
	                                <li><a href="#zoomin" data-translate="_app_ov_mt_zoomInOut">Zoom In & Out</a></li>
	                                <li><a href="#myocation" data-translate="_app_ov_mt_myLocation">My Location</a></li>
	                                <li><a href="#print" data-translate="_app_ov_mt_print">Print</a></li>
	                                <li><a href="#measurement" data-translate="_app_ov_mt_measurement">Measurement</a></li>
	                                <li><a href="#clearmap" data-translate="_app_ov_mt_clearMap">Clear map</a></li>
	                                <li><a href="#bookmark" data-translate="_app_ov_mt_bookmark">Bookmark</a></li>
	                                <li><a href="#share" data-translate="_app_ov_mt_share">Share</a></li>
                                </ul>
							 </div>
                        </div>
                    </div>
                    
                                        <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingThree">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" 
                                href="#collapseThree" aria-expanded="false" aria-controls="collapseThree" data-translate="_app_ov_menu">
                                    <i class="more-less glyphicon glyphicon-plus"></i>
                                    Menu
                                </a>
                                <i class="fa fa-angle-down"></i>
                            </h4>
                        </div>
                        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree" >
                            <div class="panel-body">
                               <ul>
                                <li><a href="#basemapg" data-translate="_app_ov_menu_baseMapGallery">Base map Gallery</a></li>
                                <li><a href="#layers" data-translate="_app_ov_menu_layers">Layers</a></li>
                                <li><a href="#query" data-translate="_app_ov_menu_query">Query</a></li>
                                <li><a href="#drawtool" data-translate="_app_ov_menu_drawTool">Draw Tool</a></li>
                               
                                <li><a href="#arroundme" data-translate="_app_ov_menu_aroundMe">Around Me</a></li>
                                <li><a href="#event" data-translate="_app_ov_menu_events">Events</a></li>
                                <li><a href="#wardinfo" data-translate="_app_ov_menu_wardInfo">Ward Information</a></li>
                                <li><a href="#knowp" data-translate="_app_ov_menu_knowYourProperty">Know Your Property</a></li>
                                <li><a href="#autann" data-translate="_app_ov_menu_cityAnnouncements">City Announcements</a></li>
                                <li><a href="#fas" data-translate="_app_ov_menu_feedback">Feedback and Suggestions</a></li>
                                <li><a href="#adddata" data-translate="_app_ov_menu_addData">Add Data</a></li>
                                <li><a href="#ftl" data-translate="_app_ov_menu_fromToLocation">From – To Location</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                                       
	<div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headinFourt">
                            <h4 class="panel-title">
                                <a class="" role="button" href="#trdmap" data-translate="_app_ov_3dMap">
                                    
                                    3d Map
                                </a>
                       
                            </h4>
                        </div>
                       
                    </div>
                </div>
                <!-- panel-group -->

            </ul>
        </div>
        
        
        <jsp:include page="/common/usermanual.jsp" />
        
        
	</div>	

<!-- /#page-content-wrapper -->

</div>
<!-- /#wrapper -->


<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
<script type="text/javascript" src="${context}/js/popper.min.js"></script>
<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>



<!-- DataTable -->


<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
<script src="${context}/js/utils.js"></script>
<%-- <script type="text/javascript" src="${context}/js/toastr.min.js"></script> --%>
<%-- <script type="text/javascript" src="${context}/js/slick.min.js"></script> --%>
<script src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>
<script type="text/javascript" src="${context}/js/developer/citizen_help_language_controller.js"></script>



</body>
</html>
