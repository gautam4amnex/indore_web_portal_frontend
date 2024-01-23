
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
                                <a class="" role="button" href="#centraldashboard" data-translate="_app_ov_centralDashboard">
                                    
                                    Central Dashboard
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
                                <li><a href="#proximityanalysis" data-translate="_app_ov_menu_proximityAnalysis">Proximity Analysis</a></li>
	                            <li><a href="#projectmonitoring" data-translate="_app_ov_menu_projectMonitoring">Project Monitoring</a></li>
	                            <li><a href="#projectalert" data-translate="_app_ov_menu_projectAlerts">Project Alert</a></li>
	                            <li><a href="#reports" data-translate="_app_ov_menu_reports">Reports</a></li>
	                            <li><a href="#poidata" data-translate="_app_ov_menu_poiData">POI Data</a></li>
                                
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
        
        
        <div class="help-page-main">
        	
<ol id="logiscreen">
	<li>
		<h1 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%; page-break-before: always;"><a name="_Toc20428148"></a><a name="_Toc5623487"></a><a name="_Toc5282956"></a><a name="_Toc56526458"></a><a name="_Toc46342557"></a> <span style="color: #222222;"><span style="font-size: large;"><span style="background: #ffffff;" data-translate="_help_for_dept">City Enterprise GIS Portal: Departmental User</span></span></span></h1>
		<ol>
			<li>
				<h2 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;"><a name="_Toc56526459"></a><a name="_Toc46342558"></a> <span style="font-size: large;" data-translate="_login_screen_header">Login Screen</span></h2>
			</li>
		</ol>
	</li>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_login_screen_para1">Department user can login with a valid username and password provided by the admin</p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_3a1649ae.jpg" width="598" height="302" name="Picture 29" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_login_screen_para2">If you forget your password click on Forgot Password link.&nbsp;</p>
<p lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_8e676f9a.jpg" width="598" height="302" name="Picture 2" align="BOTTOM" border="0" /></p>
<ol id="centraldashboard">
	<ol>
		<li>
			<h2 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;"><a name="_Toc56526460"></a><a name="_Toc46342559"></a> <span style="font-size: large;" data-translate="_central_dashboard_header">Central Dashboard</span></h2>
		</li>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_central_dashboard_para1">After the login by Super Admin/GIS Cell, Admin user can see the central Dashboard with different department cumulative information. By clicking on it, User will be redirected to respective department dashboard for more details.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_central_dashboard_para2">Super admin will be able to see the following department&rsquo;s information on the Central Dashboard.</p>
	</li>
</ul>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_aictsl">AICTSL - Total no of Bus Stops</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_electric">MPKVVCL &ndash; Total No of Street Lights</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_police">Police&ndash; Total no. of Police station</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_tcplanning">Town &amp; Country Planning &ndash; Total Town planning Area in sq. km.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_ida">IDA &ndash; Total no of IDA Schemes</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_health">Health &ndash; Total No. of Hospitals</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_phe">PHE Urban &ndash; Total length of Water lines in km.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_pwd">PWD &ndash; Total No of roads</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_education">Education Department &ndash; Total No. of Schools</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_wcwd">Women &amp; Child Welfare &ndash; Total no. of Anganwadi</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_mppcb">MPPCB (Pollution) &ndash; No. of AQI - PM 2.5</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_industry">MPAKVN &ndash; Total Industrial land in Sq. Km.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_imc">IMC- Litter Bin Locations</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_central_dashboard_smartCity">Indore Smart City &ndash; Total No. of Projects</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_a6f5dfd4.jpg" width="598" height="302" name="Picture 1" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_aictsl_header"><a name="_Toc56526461"></a><a name="_Toc46342652"></a> AICTSL</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_aictsl_li1">AICTSL Department dashboard will display the Type wise total no. of buses working in the Indore city.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_aictsl_li2">User can navigate to reports such as:</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_aictsl_chart1">Bus Routes</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_aictsl_chart1_li1">Bus Route Wise Count</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_aictsl_chart1_li2">Total Bus Routes</p>
					</li>
				</ul>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_aictsl_chart2">Bus Stops</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_aictsl_chart2_li1">Ward Wise Bus Stop Count</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_aictsl_chart2_li2">Total Bus Stops</p>
					</li>
				</ul>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_aictsl_chart3">AFCS</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_aictsl_chart3_li1">Equipment Type Wise Collection Amount</p>
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_e387d7e3.jpg" width="599" height="302" name="Picture 790" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_aictsl_li3">User can also filter the data as per the ward</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_cf9e5c6a.jpg" width="599" height="302" name="Picture 0" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_aictsl_li4">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_aictsl_li5">On clicking any of the chart the data will be plotted on map.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_32e562dc.jpg" width="599" height="302" name="Picture 68" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_aictsl_li6">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_aictsl_li7">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_electric_header"><a name="_Toc46342560"></a><a name="_Toc56526462"></a> Electrical</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_electric_li1">Electrical dashboard will display the complete data of Electric Department as follows:</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_electric_chart1">Street light</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_electric_chart1_li1">Total Street Lights</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_electric_chart1_li2">Ward Wise Street Lights</p>
					</li>
				</ul>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_electric_chart2">Transformers</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_electric_chart2_li1">Total Transformers</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_electric_chart2_li2">Ward Wise Transformers</p>
					</li>
				</ul>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_electric_chart3">Smart LED</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_electric_chart3_li1">Total Smart LED</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_electric_chart3_li2">Ward Wise Smart LED</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_electric_chart3_li3">Watt Wise Smart LED Distribution (%)</p>
					</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_electric_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_electric_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_electric_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_electric_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_electric_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_c163bfb3.jpg" width="599" height="302" name="graphics1" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_police_header"><a name="_Toc56526463"></a> Police</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_police_li1">Police dashboard will display the data related to Police Department which includes</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_police_chart1">Police Station</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_police_chart1_li1">Total Police Stations</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_police_chart1_li2">Zone Wise Police Stations</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_police_chart1_li3">Police Station Wise Number Of Road Accidents</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_police_chart1_li4">Nature Of Injury In Accidents (%)</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_police_chart1_li5">Vehicle Type Involved In Accidents (%)</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_police_chart1_li6">Road Category Wise Accident Count (%)</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_police_chart1_li7">Police Station Wise Vehicle Theft Incidents</p>
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_9ce66837.jpg" width="599" height="302" name="Picture 4" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_police_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_police_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_police_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_b72bf52d.jpg" width="600" height="302" name="Picture 716" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_police_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_police_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_tcplanning_header"><a name="_Toc46342565"></a><a name="_Toc36117196"></a><a name="_Toc46342637"></a><a name="_Toc36117980"></a><a name="_Toc56526464"></a> Town &amp; Country Planning</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_tcplanning_li1">Town planning dashboard will display the following data:</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_tcplanning_chart1">Town Planning Area</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_tcplanning_chart1_li1">Land Use Distribution (%)</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_tcplanning_chart1_li2">Projected Growth Rate In Commercial Area (From 2020 To 2031)</p>
					</li>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_tcplanning_chart1_li3">Projected Growth Rate In Residential Area (From 2020 To 2031)</p>
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_3efc06a.jpg" width="599" height="302" name="Picture 5" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_tcplanning_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_tcplanning_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_tcplanning_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_tcplanning_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_tcplanning_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol start="5">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_ida_header"><a name="_Toc46342587"></a><a name="_Toc56526465"></a> IDA</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_ida_li1">IDA Dashboard will display the total count of town planning schemes with status as follows:</p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_ida_chart1">Status Wise Total TP Schemes</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_ida_chart1_li1">Total TP Schemes</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_ida_chart2">Developed Schemes</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_ida_chart2_li1">Total Developed Schemes</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_ida_chart3">Proposed Schemes</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_ida_chart3_li1">Total Proposed Schemes</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_cefd9558.jpg" width="599" height="302" name="Picture 6" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_ida_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_ida_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_ida_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_ida_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_ida_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol start="6">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_health_header"><a name="_Toc46342582"></a><a name="_Toc36117392"></a><a name="_Toc56526466"></a> Health</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_health_li1">Health dashboard will display health facilities available in Indore city as follows:</p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_health_chart1">Hospitals</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart1_li1">Total Hospitals</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart1_li2">Ownership Type wise Hospitals</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart1_li3">Hospital Wise ICU</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart1_li4">Emergency Services (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart1_li5">Blood Bank Facility (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart1_li6">Mortuary (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart1_li7">Ward Wise Hospitals</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_health_chart2">Pharmacies</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart2_li1">Total Pharmacies</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_health_chart2_li2">Ward Wise Pharmacies</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_19162a10.jpg" width="598" height="302" name="Picture 7" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_health_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_health_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_health_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_health_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_health_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol start="7">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_phe_header"><a name="_Toc56526467"></a><a name="_Toc46342647"></a> Public Health Engineering (Urban)</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_phe_li1">Public Health Engineering (Urban) dashboard will display total length of water supply line in km. also total count of tube well and water valves as follows:</p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_phe_chart1">Water Supply Line (ABD Area)</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_phe_chart1_li1">Total Water Line Length (in meter)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_phe_chart1_li2">Diameter Wise Water Supply (mm)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_phe_chart1_li3">Ward Wise Water Supply Length (mt.)</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_phe_chart2">Water Valves (ABD Area)</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"  data-translate="_phe_chart2_li1">Total Water Valves</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"  data-translate="_phe_chart2_li2">Ward Wise Water Valves</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_888a0698.jpg" width="598" height="302" name="Picture 8" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_phe_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_phe_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_phe_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_phe_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_phe_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol start="8">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_pwd_header"><a name="_Toc46342623"></a><a name="_Toc56526468"></a> PWD</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_pwd_li1">PWD Department dashboard will display the Road network details of Indore City as follows:</p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_pwd_chart1">Roadways</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_pwd_chart1_li1">Total Road Length (KM)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_pwd_chart1_li2">Type Wise Road Length (KM)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_pwd_chart1_li3">Surface Type Wise Road Length (KM)</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_pwd_chart2">Bridges</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_pwd_chart2_li1">Total Bridges</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_pwd_chart2_li2">Ward Wise Bridges</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_f58c64a4.jpg" width="598" height="302" name="Picture 9" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_pwd_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_pwd_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_pwd_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_pwd_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_pwd_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol start="9">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_education_header"><a name="_Toc46342628"></a><a name="_Toc36117882"></a><a name="_Toc46342573"></a><a name="_Toc36117294"></a><a name="_Toc56526469"></a> Education</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_education_li1">Education dashboard will display the education infrastructure available in the Indore city as follows:</p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_education_chart1">Primary Schools</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_education_chart1_li1">Total Primary Schools</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_education_chart1_li2">Play Ground Distribution (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_education_chart1_li3">Male Hostel Distribution (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_education_chart1_li4">Female Hostel Distribution (%)</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_education_chart2">Secondary Schools</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_education_chart2_li1">Total Secondary Schools</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_education_chart2_li2">Play Ground Distribution (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_education_chart2_li3">Male Hostel Distribution (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_education_chart2_li4">Female Hostel Distribution (%)</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%;" ><span style="color: #000000;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_22514731.jpg" width="584" height="295" name="Picture 10" align="BOTTOM" border="0" /></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_education_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_education_li3">User can hover on each chart for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_education_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_education_li5">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol start="10">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_wcwd_header"><a name="_Toc56526470"></a><a name="_Toc46342642"></a><a name="_Toc36118029"></a> Women Child &amp; Welfare</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_wcwd_li1">Women &amp; Child welfare department dashboard will display the details of total number of Anganwadi in the Indore city as follows:</p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_wcwd_chart1">Anganwadi</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_wcwd_chart1_li1">Total Anganwadi</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_wcwd_chart1_li2">Open Space or Playground Present In Anganwadi (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_wcwd_chart1_li3">Ward Wise Anganwadi</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_1a3977bf.jpg" width="583" height="294" name="Picture 12" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_wcwd_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_wcwd_li3">User can hover on each chart for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_wcwd_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_wcwd_li5">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_mppcb_header"><a name="_Toc56526471"></a> MPPCB (Pollution)</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_mppcb_li1">Pollution department dashboard will display the details of mixture of gases and minerals with bifurcations.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_industry_header"><a name="_Toc56526472"></a><a name="_Toc46342596"></a> Industrial (MPIDA)</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_industry_li1">Industrial dashboard will display the details of Ward wise, sector wise, Ownership wise, type wise Industrial parks as follows:</p>
	</li>
</ul>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_industry_chart1">Industrial Training Centers</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_industry_chart1_li1">Zone Wise Industrial Training Centers</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_industry_chart2">Industrial Park</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_industry_chart2_li1">Zone Wise Industrial Park Area Distribution (%)</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_dd3d5a0f.jpg" width="598" height="302" name="Picture 13" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_industry_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_industry_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_industry_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_industry_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_industry_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_imc_header"><a name="_Toc46342592"></a><a name="_Toc36117490"></a><a name="_Toc56526473"></a> IMC</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_imc_li1">IMC Dashboards displays as per Ward wise Dustbin location, Public toilets, Zone wise population, Sewer Network Information and much more as follows:</p>
	</li>
</ul>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_imc_chart1">Litter Bin Locations</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart1_li1">Total Litter Bin Locations</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart1_li2">Ward Wise Litter Bin Locations</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_imc_chart2">Public Toilets</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart2_li1">Total Public Toilets</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart2_li2">Ward Wise Public Toilets</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_imc_chart3">Zone Wise Population</strong></p>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_a6f5319.jpg" width="598" height="302" name="Picture 14" align="BOTTOM" border="0" /></p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_imc_chart4">Sewer Network Information</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart4_li1">Total Sewers</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart4_li2">Diameter Wise Sewers (%)</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart4_li3">Ward Wise Sewer Length</p>
				</li>
			</ul>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_imc_chart5">Indore 311</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart5_li1">Category Wise Complaints</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart5_li2">Status Wise Complaints</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_aaaa795f.jpg" width="598" height="302" name="Picture 15" align="BOTTOM" border="0" /></p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_imc_chart6">Property Tax</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart6_li1">Construction Type Wise Property Tax</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart6_li2">Ward Wise Property Tax</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart6_li3">Ward Wise Building Details</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_7d6cdc5e.jpg" width="598" height="302" name="Picture 16" align="BOTTOM" border="0" /></p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_imc_chart7">ISWM</strong></p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart7_li1">GTS Wise Weight Collection</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_imc_chart7_li2">Status Wise Vehicles</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_962f7746.jpg" width="598" height="302" name="Picture 17" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_imc_li2">User can also filter the data as per the ward, zone as well as date.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_imc_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_imc_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_imc_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_imc_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_land_header"><a name="_Toc46342601"></a><a name="_Toc36117588"></a><a name="_Toc56526474"></a> Land Record</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_land_li1">Land Record Dashboard displays the land distribution of Indore City as follows:</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_land_chart1">Agricultural Land</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_land_chart1_li1">Zone Wise Agricultural Land</p>
					</li>
				</ul>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_land_chart2">Village Area</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_land_chart2_li1">Zone Wise Village Area</p>
					</li>
				</ul>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_land_chart3">Open Space Area</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_land_chart3_li1">Zone Wise Open Space Area</p>
					</li>
				</ul>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_land_chart4">Khasra Boundary</strong></p>
				<ul>
					<li>
						<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY" data-translate="_land_chart4_li1">Zone Wise Khasra Distribution (%)</p>
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal;" align="JUSTIFY"><br /><br /></p>
<p class="western" lang="en-US" style="font-weight: normal;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_8398ecf3.jpg" width="598" height="302" name="Picture 18" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_land_li2">User can also filter the data as per the ward.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_land_li3">User can hover on each bar for more details about the graph.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_land_li4">On clicking any of the chart the data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_land_li5">User can increase the width of slider bar to increase the no. of bars in graph to be seen at that point of time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_land_li6">User can also download the graph by clicking on the <strong>Download</strong> button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_smartCity_header"><a name="_Toc56526475"></a> Indore Smart City</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_smartCity_li1">Indore Smart City Dashboard displays data related to the projects executed by Indore Smart City as follows:</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_smartCity_chart1">Project Wise Cost</strong></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_smartCity_chart2">Zone Wise Projects</strong></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" align="JUSTIFY"><strong data-translate="_smartCity_chart3">Category Wise Projects</strong></p>
			</li>
		</ul>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; widows: 0; orphans: 0;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_a1fa8a5b.jpg" width="598" height="302" name="Picture 19" align="BOTTOM" border="0" /></p>
<ol id="citymap">
	<ol>
		<li>
			<h2 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_cityMap_header"><a name="_Toc56526476"></a><a name="_Toc55036813"></a><a name="_Toc46342223"></a> <span style="font-size: large;">City Map</span></h2>
		</li>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_cityMap_li1">After login the map in 2D view will be shown.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_8d9a533f.jpg" width="598" height="302" name="graphics2" align="BOTTOM" border="0" /></p>
<ol id="Language1">
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_language_header"><a name="_Toc46342224"></a><a name="_Toc56526477"></a><a name="_Toc55036814"></a> Language</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_language_li1">User can select Hindi or English language from language selection from the right top corner.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%;" align="JUSTIFY" data-translate="_language_li2">If User selects Hindi, all information will be displayed in Hindi language only.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_dae89066.jpg" width="598" height="302" name="graphics3" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_language_li3">If user selects English language, all information will be displayed in English language only.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_8d9a533f.jpg" width="598" height="302" name="Picture 20" align="BOTTOM" border="0" /></p>
<ol id="globalsearch">
	<ol start="4">
		<li>
			<h2 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_header"><a name="_Toc56526478"></a><a name="_Toc55036815"></a><a name="_Toc46342225"></a> <span style="font-size: large;">Map Tools</span></h2>
			<ol>
				<li>
					<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_globalSearch_header"><a name="_Toc56526479"></a><a name="_Toc55036816"></a><a name="_Toc46342226"></a> Global Search</h3>
				</li>
			</ol>
		</li>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_globalSearch_para1">Search provides you with an opportunity to look up for features (e.g. Bus Stops, ATM, School, bank, government offices etc.) within a category and view their location on the map.</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_globalSearch_li1">Click on the down arrow on the search bar to select search category, type in the search term in the text box at the top left of the portal, as you type, you may see words begin to appear below the search box. These are auto-suggestions that may match what you&rsquo;re interested in.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_globalSearch_li2">As actual search result loads, click on the feature result to view location on the map and related information on the pop-up.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_71aec61.jpg" width="598" height="302" name="Picture 774" align="BOTTOM" border="0" /></p>
<ol>
	<ol id="zoomin">
		<ol start="2">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_zoomIn_header"><a name="_Toc56526480"></a><a name="_Toc55036817"></a><a name="_Toc46342227"></a> Zoom in</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_zoomIn_para1">Click on the Zoom in icon to view the map in detail. You can also use mouse scroll to zoom in to the map.</span></span></p>
<ol>
	<ol>
		<ol start="3">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_zoomOut_header"><a name="_Toc56526481"></a><a name="_Toc55036818"></a><a name="_Toc46342228"></a> Zoom Out&nbsp;</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_zoomOut_para1">Click on the Zoom out icon to zoom out of the map. You can also use mouse scroll to zoom out to the map.</span></span></p>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_c1581b2d.png" width="44" height="72" name="Picture 221" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="4">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_home_header"><a name="_Toc56526482"></a><a name="_Toc55036819"></a><a name="_Toc46342229"></a> Home&nbsp;&nbsp;</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_home_para1">Click on the home icon to reset the map to its default extent. This function proves extremely helpful when you zoom in or out too much on the map and you can to return to your original landing page extent.</span></span></p>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_7e72def0.png" width="51" height="47" name="Picture 226" align="BOTTOM" border="0" /></p>
<ol id="myocation">
	<ol>
		<ol start="5">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_myLocation_header"><a name="_Toc56526483"></a><a name="_Toc55036820"></a><a name="_Toc46342230"></a> My Location</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_para1">On clicking the icon, a symbol displays on the map, showing your current location. The map extent is updated to show the current location as the area of interest.</span></span></p>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_para2">The first time you visit Citizen Portal, you will have the option to allow or disallow the browser from sharing your location data. If you have denied the permission and would like to change the settings, follow the below steps to enable location sharing on your browser</span><span lang="en-IN">:</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_myLocation_chromeHeader">Google Chrome&nbsp;</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_chromeli1">Open Chrome.</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_chromeli2">At the top right, click More and then Settings.</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_chromeli3">At the bottom, click Advanced.</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_chromeli4">Under "Privacy and security," click Content settings.</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_chromeli5">Click Location. </span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_chromeli6">Turn Ask before accessing on or off.</span></span></p>
			</li>
		</ul>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_myLocation_ieHeader">IE&nbsp;</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_ieli1">In Internet Explorer, click/tap on Tools (Menu bar or gear icon) and Internet Options.</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_ieli2">Click/tap on the Privacy tab</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_ieli3">To Allow Websites to Request Your Location, Uncheck the Never allow websites to request your physical location box, click/tap on OK.</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_ieli4">Close and reopen Internet Explorer to apply.</span></span></p>
			</li>
		</ul>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_myLocation_firefoxHeader">Firefox&nbsp;</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_firefoxli1">Go to the Tools menu, and then select Page Info.</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_firefoxli2">Select the Permissions tab.</span></span></p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_myLocation_firefoxli3">Change the setting for Share Location.</span></span></p>
			</li>
		</ul>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;" data-translate="_map_tools_myLocation_note"><strong data-translate="_map_tools_myLocation_noteHeader">Note:</strong> Current location is not supported in the Chrome via https due to Google&rsquo;s privacy policy. Even in other browsers, the tool will only function when you let the website track your location.</span></p>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_5f699afa.png" width="61" height="63" name="Picture 224" align="BOTTOM" border="0" /></p>
<ol id="print">
	<ol>
		<ol start="6">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_print_header"><a name="_Toc56526484"></a><a name="_Toc55036821"></a><a name="_Toc46342231"></a> Print</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_print_para1">Click on print to export and print files in PDF, PNG, JPG extensions. User can enter the title, file name and select page setup (A1 to A5), Orientation: Landscape/Portrait. User can include legends if required.</p>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_d3219d2b.jpg" width="598" height="302" name="graphics4" align="BOTTOM" border="0" /></p>
<ol id="measurement">
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_measurement_header"><a name="_Toc56526485"></a><a name="_Toc55036822"></a><a name="_Toc46342232"></a> Measurement</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_measurement_li1">Click on the Measurement tool</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_measurement_li2">User can select this tool to measure any shape on the map. User can measure distance, area or find particular location of point by using this tool.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_measurement_li3">User can also change the unit of measurement for Area, distance and location.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_measurement_li4">To measure the length between any 2 points on the map; user can use the measure distance tool</p>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_fdc9ba71.jpg" width="598" height="302" name="graphics5" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_measurement_li5">User can measure area by drawing a polygon on map by using Measure Area tool</p>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_969fced3.jpg" width="598" height="302" name="Picture 25" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_measurement_li6">The find <strong>location</strong> tool under Measurement tool will let user find the location details of the selected point</p>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_a8518912.jpg" width="598" height="302" name="Picture 23" align="BOTTOM" border="0" /></p>
<ol id="bookmark">
	<ol>
		<ol start="8">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_bookmark_header"><a name="_Toc56526486"></a><a name="_Toc55036823"></a><a name="_Toc46342234"></a> Bookmark</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;" data-translate="_map_tools_bookmark_para1">A spatial bookmark identifies a particular geographic location that you want to save and reference later. Bookmarks provide shortcuts to interesting places on a map. User can create a bookmark based on the current location and scale of the map. When other user clicks a bookmark, the map zooms to that location.</span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_bookmark_li1">Click <strong>Bookmark</strong> icon from bottom left panel of the screen.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_bookmark_li2">Zoom to the area on map which you frequently visit. For Example, if &ldquo;Rajwada Palace&rdquo; is one of your frequently mapped areas, search for it on map. Now, bookmark this map for later use.&nbsp;&nbsp;</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_bookmark_li3">Add name for the bookmark and click on &lsquo;+&rsquo; to add the bookmark. For example, type &lsquo;Rajwada Palace&rsquo; to successfully create the bookmark for Rajwada Palace area.&nbsp;</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_bookmark_li4">When done, you can come later and click on the Rajwada Palace Area bookmark to view the map zoomed to the map extent and scale saved&nbsp;</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_bookmark_li5">Select the bookmark you want to delete and click on delete button to remove it from the system</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_e6ba3de6.jpg" width="598" height="302" name="Picture 30" align="BOTTOM" border="0" /></p>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN"><strong data-translate="_map_tools_bookmark_noteHeader">Note</strong></span><span lang="en-IN" data-translate="_map_tools_bookmark_note">: The Guest User will not be able to save the bookmark in the system.</span></span></p>
<ol>
	<ol>
		<ol start="9">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_share_header"><a name="_Toc56526487"></a><a name="_Toc55036824"></a> Share&nbsp;&nbsp;</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_share_para1">User can share the link of the Indore GIS Portal with others by sending an email, posting on social media or embed it on a web page.</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_share_li1">Click on the Share button, and choose an option for sharing it.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_share_li2">Copy the short URL and paste it into an email, blog, or website.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_share_li3">Embed the map in a website.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_share_li4">Click the Gmail, Facebook and Twitter buttons in the Share pop-up.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_f11b5eed.jpg" width="598" height="302" name="Picture 27" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_csb_header"><a name="_Toc46342235"></a><a name="_Toc56526488"></a><a name="_Toc55036825"></a> Custom Scale bar</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_csb_li1">User can set scale Custom Scale bar from minimum value 100 to maximum value 100000.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_88eb3ef9.jpg" width="598" height="302" name="Picture 28" align="BOTTOM" border="0" /></p>
<ol id="clearmap">
	<ol>
		<ol start="11">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_clearMap_header"><a name="_Toc56526489"></a><a name="_Toc55036826"></a><a name="_Toc46342233"></a> Clear map&nbsp;&nbsp;</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_clearMap_para1">Click on the clear map to clear the any displayed result&nbsp;on map.</span></span></p>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_e7d42098.png" width="52" height="50" name="Picture 225" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_swipeLayer_header"><a name="_Toc56526490"></a><a name="_Toc55036827"></a> Swipe Layer</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_swipeLayer_li1">The Swipe widget enables users to easily compare the content of different layers in a map by sliding the swipe tool</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_52e16065.jpg" width="598" height="302" name="Picture 26" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="13">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_map_tools_kyc_header"><a name="_Toc56526491"></a><a name="_Toc55036828"></a> Know Your Coordinates</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_map_tools_kyc_para1">User can plot the point on map by using Know Your Coordinates Tool &amp; zoom to the desired location </span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_kyc_li1">User can either select Current Location button or select Location By Map Click to plot a point.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_kyc_li2">Click on Go To</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_map_tools_kyc_li3">The point will be plotted and map will be zoomed to that location</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_b9845702.jpg" width="598" height="302" name="graphics6" align="BOTTOM" border="0" /></p>
<ol>
	<ol start="5">
		<li>
			<h2 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_header"><a name="_Toc56526492"></a><a name="_Toc55036829"></a><a name="_Toc46342236"></a> <span style="font-size: large;">Menu</span></h2>
		</li>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;" data-translate="_menu_para1">Menu will be on the left panel of the page &amp; you can hide or show the menu. From menu you can navigate to different modules.</span></p>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_basemap_header"><a name="_Toc56526493"></a><a name="_Toc55036830"></a><a name="_Toc46342237"></a> Base map Gallery</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_basemap_li1">You can view and select different type of maps</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_basemap_li2">On selection of the map will be displayed on the screen</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_basemap_li3">Base map consists of ISCDL Drone Image 2020, ISCDL Satellite Image 2015, Hybrid, Street Map &amp; No Base map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_basemap_li4">User can view any of the base maps in one click.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_23936182.jpg" width="598" height="302" name="Picture 771" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="2">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_layers_header"><a name="_Toc56526494"></a><a name="_Toc55036831"></a><a name="_Toc46342238"></a> Layers</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_menu_layers_para1">A group layer is collection of all features /facilities that fall within a category. You can select layer to view its related data to find out location(s) and information of particular features/facilities.</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_layers_li1">Click layers from left hand side menu bar of citizen portal.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_layers_li2">On the widget you can view and expand all the group layer categories listed</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_layers_li3">By clicking the Layer, user can view list of layers such as: Building, Divider, Electric Pole, Street Light, Tree etc.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_layers_li4">Layer will be visible on map by clicking on it from the layer panel.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_e1bebee.jpg" width="599" height="302" name="Picture 772" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_b0f51418.jpg" width="288" height="283" name="Picture 717" align="BOTTOM" border="0" /><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_91c041bf.jpg" width="288" height="283" name="Picture 718" align="BOTTOM" border="0" /></p>
<ol id="query">
	<ol>
		<ol start="3">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_query_header"><a name="_Toc56526495"></a> Query</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_menu_query_para1">The power of geographic analysis is the ability to ask and answer questions about geographic features and their attributes and the relationship between them.</span></span></p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" style="text-indent: 0in;" data-translate="_menu_query_basicQuery_header"><a name="_Toc46342657"></a> Basic Query</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_menu_query_basicQuery_para1">User needs to perform following actions to view a particular attribute query:</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_basicQuery_li1">Select Layer</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_basicQuery_li2">Select Field Type &ndash; Depending upon the layer selected it may vary</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_basicQuery_li3">Select Value &ndash; from dropdown</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_basicQuery_li4">Select Ward</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_basicQuery_li5">Click on Search</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_3bad2de2.jpg" width="598" height="302" name="Picture 3" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_e920d8be.jpg" width="598" height="302" name="Picture 11" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<ol start="2">
				<li>
					<h4 class="western" lang="en-US" style="text-indent: 0in;" data-translate="_menu_query_adQuery_header">Advanced Query</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_menu_query_adQuery_para1">User can select records from the database by applying set (less than, greater than, equal to &amp; not equal to) or Boolean algebra (and, or, like &amp; not). User needs to perform following actions to view a particular attribute query:</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_adQuery_li1">Select Ward</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_adQuery_li2">Select Layer</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_adQuery_li3">Select Field Type &ndash; Depending upon the layer selected it may vary</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_adQuery_li4">Select Logical Operators &ndash; Depending upon the Field Type selected it may vary</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_adQuery_li5">Select Value &ndash; from dropdown</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_adQuery_li6">Click on Search</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_7ed4c00d.jpg" width="590" height="299" name="graphics7" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="border: none; padding: 0in; font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_para2">Based on selected data searched results will be shown which can be viewed on map.</p>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN"><strong data-translate="_menu_query_noteHeader">Note:</strong></span><span lang="en-IN" data-translate="_menu_query_note"> In case user wants to perform multiple attribute query they can do so by clicking on </span>
<!-- 	<span lang="en-IN"><strong>&ldquo;+&rdquo; </strong></span><span lang="en-IN">button.</span> -->
	</span>
</p>
<ol>
	<ol>
		<ol>
			<ol start="3">
				<li>
					<h4 class="western" lang="en-US" style="text-indent: 0in;" data-translate="_menu_query_spQuery_header">Spatial Query</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_menu_query_spQuery_para1">It is the process of selecting features based on their geographic relationship, or spatial relationship, to other features. User can perform the spatial query as follows:</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_spQuery_li1">Select Ward</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_spQuery_li2">Select Source Layer</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_spQuery_li3">Select Query Type</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_spQuery_li4">Select Mask Layer</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_spQuery_li5">Click on Search</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_b08b5d71.jpg" width="591" height="299" name="graphics8" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="border: none; padding: 0in; font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_query_spQuery_para2">Based on selected data searched results will be shown which can be viewed on map.</p>
<ol>
	<ol>
		<ol start="4">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_userMgmt_header"><a name="_Toc56526496"></a> User Management</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_para1">User can manage users and roles from this module. Click on User management from the menu.</p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" style="text-indent: 0in;" data-translate="_menu_userMgmt_deptMaster_header">Department Master</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_deptMaster_li1">List of departments will be shown in grid. You can edit or delete the department from Action column.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_deptMaster_li2">User can search the department from the list. Departments can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><span style="color: #000000;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_66b100c1.jpg" width="597" height="302" name="Picture 229" align="BOTTOM" border="0" /></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_deptMaster_li3">Admin can change or update the details of each department</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><span style="color: #000000;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_f6eb53da.jpg" width="598" height="302" name="Picture 230" align="BOTTOM" border="0" /></span></p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" style="text-indent: 0in;" data-translate="_menu_userMgmt_roleMaster_header">Role Master</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li1">List of roles will be shown in grid. Admin can edit or delete the role from Action column.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li2">User can search the roles from the list. Roles can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><span style="color: #000000;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_731718d8.jpg" width="598" height="302" name="Picture 231" align="BOTTOM" border="0" /></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li3">To add new roles click on Add Role and do the following</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li31">Click on Add role button</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li32">Select Department</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li33">Enter Role Name</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li34">Provide rights of the already existing modules by checking the checkboxes</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li35">Select Role Type</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li36">Click on Save</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_roleMaster_li37">Role will be added and will appear in the list</p>
			</li>
		</ul>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><span style="color: #000000;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_f1bf6786.jpg" width="598" height="302" name="Picture 232" align="BOTTOM" border="0" /></span></p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" style="text-indent: 0in;" data-translate="_menu_userMgmt_userMaster_header">User Master</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li1">On clicking User Master; user will be navigated to List of users shown in grid.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li2">User can edit or delete the role from Action column. Admin user can search the users from the list.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li3">Users can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_3eb8b970.jpg" width="598" height="302" name="Picture 233" align="BOTTOM" border="0" /></p>
<p style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><br /><br /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li4">To add new user click on Add New Users and do the following</p>
		<ul>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li41">In popup, enter Name.</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li42">Enter Mobile number.</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li43">Enter Email.</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li44">Select Department.</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li45">Set password for this user.</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li46">Select Role from the dropdown.</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li47">Click on Save.</p>
			</li>
			<li>
				<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_userMgmt_userMaster_li48">User will be added and it will appear in list.</p>
			</li>
		</ul>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_50d7219e.jpg" width="583" height="294" name="Picture 234" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="5">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_citizenServices_header"><a name="_Toc56526497"></a> Citizen Services</h3>
				<ol>
					<li>
						<h4 class="western" lang="en-US" data-translate="_menu_event_header">Event Management</h4>
					</li>
				</ol>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_event_para1">User can add event and manage event details from Event Management Module</p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_event_li1">Authorized user can view the details of the event to be conducted &amp; can approve or reject the event based on the details provided.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_event_li2">User can search the event from the list. Events can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_ad46a99e.jpg" width="598" height="302" name="Picture 239" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_event_li3">User can also add event by clicking on Add Event Button</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_bf9b2a0b.jpg" width="598" height="302" name="Picture 240" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" data-translate="_menu_announcement_header">Announcement</h4>
					<ol>
						<li>
							<h5 class="western" lang="en-US" data-translate="_menu_announcement_addHeader">Add Announcement</h5>
						</li>
					</ol>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_announcement_addli1">Select Department</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_announcement_addli2">Enter Announcement Title.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_announcement_addli3">Enter Announcement Description.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_announcement_addli4">Select Announcement date and time.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_announcement_addli5">Plot a point a map to get the longitude and latitude.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_announcement_addli6">Click on Submit.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_announcement_addli7">In case you want to remove the data entered click on Clear.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 100%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_2c0e88bc.jpg" width="598" height="302" name="Picture 227" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<ol>
				<ol start="2">
					<li>
						<h5 class="western" lang="en-US" data-translate="_menu_announcement_viewHeader">View Announcement</h5>
					</li>
				</ol>
			</ol>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_menu_announcement_viewpara1">List of announcements will be shown in this tab. The location details related to announcement can also be viewed on map.</span></span></p>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><span style="color: #000000;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_7c4080ee.jpg" width="598" height="302" name="Picture 228" align="BOTTOM" border="0" /></span></p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" data-translate="_menu_feedback_header">Feedback &amp; Suggestions</h4>
					<ol>
						<li>
							<h5 class="western" lang="en-US" data-translate="_menu_feedback_feedback_header">Feedback</h5>
						</li>
					</ol>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_feedback_li1">On clicking Feedback &amp; Suggestions user will be navigated to Feedback Page where he/she can view the list of feedbacks received from the citizens of ISCDL.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_feedback_li2">To provide response on the received feedback admin has to click on the Add Response &amp; Popup will be shown with feedback details, scroll down and add your response in Response field.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_d554ac5b.jpg" width="598" height="302" name="Picture 241" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_feedback_li3">You can search the feedback from the list. Feedback can be deleted by clicking on Delete icon from Action column. Feedbacks can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<ol>
				<ol>
					<li>
						<h5 class="western" lang="en-US" data-translate="_menu_suggestion_header">Suggestions</h5>
					</li>
				</ol>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_suggestion_li1">On clicking the Suggestion Tab from the Feedback page user will be redirected to Suggestions Page where he/she can view the list of suggestions received from the citizens of ISCDL.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_suggestion_li2">To provide response on the received suggestion admin has to click on the Add Response &amp; Popup will be shown with suggestion details, scroll down and add your response in Response field.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_4c50cd24.jpg" width="598" height="302" name="Picture 242" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_suggestion_li3">You can search the suggestions from the list. Suggestions can be deleted by clicking on Delete icon from Action column. Suggestions can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
	</li>
</ul>
<ol>
	<ol>
		<ol>
			<ol>
				<ol>
					<li>
						<h5 class="western" lang="en-US"  >Complaints</h5>
					</li>
				</ol>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_complaint_li1">On clicking Complaint Tab user can view the list of complaints received from the citizens of ISCDL.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_complaint_li2">To provide response on the received complaints; admin has to click on the Add Response &amp; Popup will be shown with complaint details, scroll down and add your response in Response field.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_complaint_li3">You can search the complaints from the list. Complaints can be deleted by clicking on Delete icon from Action column. Complaints can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_2d7f3f8.jpg" width="598" height="302" name="Picture 731" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<ol start="4">
				<li>
					<h4 class="western" lang="en-US" data-translate="_menu_citizenMaster_header">Citizen Master Data</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_citizenMaster_para1">All registered citizen information will be shown. Click on Citizen Master data from the menu.</p>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_1d140e3a.jpg" width="583" height="294" name="Picture 235" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_citizenMaster_para2">List of citizens will be shown with Username, Name, Email, Phone number, Address and Status. User can search the citizen from the list. Citizen list can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
<ol>
	<ol>
		<ol start="6">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_adServices_header"><a name="_Toc56526498"></a> Advanced Services</h3>
				<ol>
					<li>
						<h4 class="western" lang="en-US" data-translate="_menu_addData_header">Add Data</h4>
					</li>
				</ol>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_menu_addData_para1">To add a new place which is not on map, Authorized user can click on add place from the menu.&nbsp;</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addData_li1">Enter the Name</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addData_li2">Select Image</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addData_li3">Plot a location on map by clicking on pin icon</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addData_li4">Enter remarks for the place.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addData_li5">Click on &ldquo;Submit&rdquo; button.&nbsp;</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addData_li6">The added details will display on the map after the approval of specific department user. GIS cell will update the data on the map.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_f6d637a2.jpg" width="568" height="287" name="graphics9" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" data-translate="_menu_addLayer_header">Add Layer</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addLayer_li1">User can add layers from &ldquo;Add Layer&rdquo; Module.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addLayer_li2">User can add shapefile by selecting zipped folder which contain valid file format (.shp, .shx etc.) or can add KML by selecting .kml or .kmz file format.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addLayer_li3">Click on Submit after selecting the file.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addLayer_li4">The added data will be plotted on map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_addLayer_li5">Other types of files are not allowed &amp; system will pop up error if invalid file is uploaded.</p>
	</li>
</ul>
<p lang="en-US" style="margin-left: 0.25in; font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_2cd894c8.jpg" width="569" height="287" name="Picture 237" align="BOTTOM" border="0" /></p>
<ol id="proximityanalysis">
	<ol>
		<ol start="7">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_proximity_header"><a name="_Toc56526499"></a> Proximity Analysis</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_proximity_para1">User can search a particular utility by selecting the layer from the dropdown. After selecting the layer user needs to draw a polygon on the map.</p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_proximity_para2">It will search the selected layer in the drawn polygon and the details will be displayed on map.</p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_b2c08d3.jpg" width="591" height="299" name="Picture 244" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_proximity_para3">Click on Zoom to Feature to view the result on map</p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_998aa03.jpg" width="598" height="302" name="Picture 245" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" data-translate="_menu_heatMap_header">Heat Map Analysis</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_heatMap_para1">Heat Map analysis is a graphical representation of data that visualizes the density of points in a layer. This helps the department in better planning of the services within the city.</p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_heatMap_li1">Select the Department from the drop down</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_heatMap_li2">Select criteria on the basis of which you want to generate heat map</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_heatMap_li3">Click on Generate Heat Map</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_f41ab801.jpg" width="590" height="299" name="Picture 249" align="BOTTOM" border="0" /></p>
<ol id="projectmonitoring">
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_pm_header"><a name="_Toc56526500"></a> Project Monitoring</h3>
				<ol>
					<li>
						<h4 class="western" lang="en-US" style="text-indent: 0in;" data-translate="_menu_pm_manageProject_header">Manage Project</h4>
						<ol>
							<li>
								<h5 class="western" lang="en-US" data-translate="_menu_pm_manageProject_project">Projects</h5>
							</li>
						</ol>
					</li>
				</ol>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_manageProject_li1">In Projects tab, list of projects will be shown. User can edit the information by clicking on Edit icon from the Action column.</p>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_manageProject_li2">User can search the project from the list. Project list can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
		</li>
	</ul>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_fbc6eb2.jpg" width="598" height="302" name="Picture 250" align="BOTTOM" border="0" /></p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_manageProject_li3">User can add new project.</p>
			<ul>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_manageProject_li31">Enter all the details in one by one and click on next to go to next details.</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_manageProject_li32">At last after filling all details click on Submit.</p>
				</li>
				<li>
					<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_manageProject_li33">Project details will added and appear in project list.</p>
				</li>
			</ul>
		</li>
	</ul>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_8a42d04c.jpg" width="598" height="302" name="Picture 251" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<ol>
				<ol>
					<li>
						<h5 class="western" lang="en-US" data-translate="_menu_pm_milestone_header">Milestones</h5>
					</li>
				</ol>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_milestone_li1">In Milestone tab, list of milestones for a project will be shown. Select a project from the dropdown. Milestone information will be shown in grid. User can edit the information by clicking on Edit icon from the Action column.</p>
		</li>
	</ul>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_746d1f83.jpg" width="598" height="302" name="Picture 254" align="BOTTOM" border="0" /></p>
<ul>
	<ul>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_milestone_li2">User can search the milestone from the list. Milestone list can be exported to Excel by clicking on Export to Excel button and PDF by clicking on Export to PDF button.</p>
		</li>
		<li>
			<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_pm_milestone_li3">User can also add a milestone for a particular project by clicking on Add Milestone</p>
		</li>
	</ul>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_cf2b37f5.jpg" width="602" height="302" name="Picture 703" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<ol>
				<li>
					<h4 class="western" lang="en-US" style="text-indent: 0in;" data-translate="_menu_projectReports_header">Project Reports</h4>
				</li>
			</ol>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_projectReports_li1">List of projects and its status will be displayed here.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_projectReports_li2">User can navigate to the projects location by clicking on show to map.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_45d1b306.jpg" width="591" height="299" name="Picture 805" align="BOTTOM" border="0" /></p>
<ol id="projectalert">
	<ol>
		<ol start="9">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_projectAlerts_header"><a name="_Toc56526501"></a> Project Alert</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_a44ec62e.jpg" width="600" height="302" name="graphics10" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="10">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_ftl_header"><a name="_Toc56526502"></a><a name="_Toc55036843"></a> From &ndash; To Location</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_ftl_para1">User can get directions between two locations by entering the Source and Destination.</p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_ftl_li1">User can find the source &amp; destination address by typing it in the auto complete box.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_ftl_li2">Users can also &ldquo;Set Source by Plotting Point&rdquo; or &ldquo;Set Current Location&rdquo; with the help of Icons given in the box.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_ftl_li3">On click of &ldquo;Apply&rdquo; it will show directions from source to destination on the map.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_b7b2b8d5.jpg" width="599" height="302" name="graphics11" align="BOTTOM" border="0" /></p>
<ol id="reports">
	<ol>
		<ol start="11">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_reports_header"><a name="_Toc56526503"></a> Reports</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_reports_para1">User can generate various reports based on the selection of the department he is interested in.</p>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_56a0bc0a.jpg" width="600" height="302" name="Picture 246" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_reports_para2">Ward wise filter can be applied in the reports</p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_fbcc7077.jpg" width="600" height="302" name="Picture 247" align="BOTTOM" border="0" /></p>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_reports_para3">Any data selected from the table will be highlighted on map. Various other options are also provided which can be used by the user.</p>
<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_47e15ab6.jpg" width="598" height="302" name="Picture 248" align="BOTTOM" border="0" /></h3>
<ol id="poidata">
	<ol>
		<ol start="12">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_poi_header"><a name="_Toc56526504"></a> POI Data</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal;" align="JUSTIFY" data-translate="_menu_poi_para1">Data collected from the POI Mobile Application will be shown in the web portal. User can filter data as per the department, POI type, date.</p>
<p class="western" lang="en-US" style="font-weight: normal;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_54cd9581.jpg" width="598" height="302" name="graphics12" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="13">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_menu_help_header"><a name="_Toc56526505"></a><a name="_Toc55036844"></a><a name="_Toc46342250"></a> Help</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_menu_help_para1">This page will show the information about how to use the portal.</p>
<ol>
	<ol>
		<li>
			<h2 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;"><a name="_Toc56526506"></a><a name="_Toc55036845"></a> <span style="font-size: large;" data-translate="_3d_map_header">3D Map</span></h2>
		</li>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_map_li1">After selecting &ldquo;3D&rdquo; on City GIS map the map in 3D view will be shown.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_map_li2">3D Map consist of Main menu- Base Map Gallery, Layers Draw Tool, Heritage Building Tool, LiDAR, Proximity Analysis and other map tools.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_46f0cdc0.jpg" width="621" height="313" name="Picture 21" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_mapTools_header"><a name="_Toc55036846"></a><a name="_Toc56526507"></a> Map Tools</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_mapTools_para1">All the map tools present in 2D Map are available in 3D Map. Some of the additional tools in 3D are as follows:</p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_mapTools_li1">Toggle to Pan or Rotate in 3D</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_mapTools_li2">Reset Compass Orientation</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_2a8313ad.jpg" width="598" height="302" name="Picture 715" align="BOTTOM" border="0" /></p>
<ol id="basemapg">
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_basemap_header"><a name="_Toc56526508"></a> Base Map Gallery</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_basemap_li1">User can view and select different type of maps</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_basemap_li2">On selection of the map will be displayed on the screen</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_basemap_li3">Base map consists of ISCDL Drone Image, ISCDL Satellite Image 2015, Dark grey canvas, Imagery, Imagery Hybrid, Light grey canvas, Navigation map, Oceans, Streets (Night), Street Map, Terrain with labels, Topographic world.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_basemap_li4">User can view any of the base maps in one click.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_eafddfb9.jpg" width="598" height="302" name="Picture 22" align="BOTTOM" border="0" /></p>
<ol id="layers">
	<ol>
		<ol start="3">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_layers_header"><a name="_Toc56526509"></a><a name="_Toc55036847"></a> Layers</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_3d_layers_para1">A group layer is collection of all features /facilities that fall within a category. You can select layer to view its related data to find out location(s) and information of particular features/facilities.</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_layers_li1">Click layers from left hand side menu bar of citizen portal.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_layers_li2">On the widget you can view and expand all the group layer categories listed</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_layers_li3">By clicking the Layer, user can view list of layers such as: Building, Divider, Electric Pole, Street Light, Tree etc.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_layers_li4">Layer will be visible on map by clicking on it from the layer panel.</p>
	</li>
</ul>
<p class="western" lang="en-US" style="line-height: 115%; page-break-inside: avoid; page-break-after: avoid;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_4b8b3f8d.jpg" width="598" height="302" name="graphics13" align="BOTTOM" border="0" /></p>
<ol id="drawtool">
	<ol>
		<ol start="4">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_drawTool_header"><a name="_Toc56526510"></a><a name="_Toc55036848"></a> Draw Tool</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_3d_drawTool_para1">You can get the drawing tool from the Menu in left panel of the Portal.</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_drawTool_li1">&nbsp;Select the type of draw mode you want to use from the Drawing tool.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_drawTool_li2">Different type of draw modes is available such as Point, Polyline and Polygon.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_drawTool_li3">For example, when you click on the Line string button, the tool activates the line geometry.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_drawTool_li4">Move the mouse pointer over the map and click to add graphic/geometry on the map.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_drawTool_li5">You can now view the graphic/geometry on the map, and also print this.</p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY" data-translate="_3d_drawTool_li6">You can clear, undo and Redo from option available.</p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN"><strong data-translate="_3d_drawTool_noteHeader">Note: </strong></span><span lang="en-IN" data-translate="_3d_drawTool_note">Some graphics may require more than one click or a click and drag. </span></span></p>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><span style="color: #000000;"><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_c6bc205f.jpg" width="600" height="302" name="Picture 24" align="BOTTOM" border="0" /></span></p>
<ol>
	<ol>
		<ol start="5">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_heritage_header"><a name="_Toc56526511"></a><a name="_Toc55036849"></a> Heritage Building</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_3d_heritage_para1">Users can view the list of heritage buildings present in Indore City.</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span lang="en-IN" data-translate="_3d_heritage_li1">From the layer panel they can switch on/off any of the heritage building they wish to see</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span lang="en-IN" data-translate="_3d_heritage_li2">Zoom to Feature will zoom to the particular heritage building</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span lang="en-IN" data-translate="_3d_heritage_li3">User can also switch on the Drone Image to view as a base layer for the selected heritage building.</span></p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_c90f9812.jpg" width="599" height="302" name="graphics14" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="6">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_lidar_header"><a name="_Toc56526512"></a> LiDAR</h3>
			</li>
		</ol>
	</ol>
</ol>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="color: #000000;"><span lang="en-IN" data-translate="_3d_lidar_para1">Department users can view the LiDAR data of Indore City.</span></span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span lang="en-IN" data-translate="_3d_lidar_li1">From the menu click on LiDAR and it will redirect the user to LiDAR Dashboard.</span></p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_8199d830.jpg" width="599" height="302" name="Picture 707" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span lang="en-IN" data-translate="_3d_lidar_li2">User can measure the height of any building using the measure area tool.</span></p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_90f72f56.jpg" width="599" height="302" name="Picture 708" align="BOTTOM" border="0" /></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span lang="en-IN" data-translate="_3d_lidar_li3">User can also measure distance between two points which is more accurate.</span></p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_ddb4d1b3.jpg" width="598" height="302" name="Picture 709" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="7">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_attrQuery_header"><a name="_Toc56526513"></a> Attribute Query</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_attrQuery_para1">Department users can perform attribute query on road and building layers</span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_attrQuery_li1">Select Attribute Query from menu</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_attrQuery_li2">Select Layer from drop down</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_attrQuery_li3">Select field from drop down</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_attrQuery_li4">Apply Logical Operator</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_attrQuery_li5">Select Value from drop down</span></p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_a4dc47dc.jpg" width="598" height="302" name="Picture 710" align="BOTTOM" border="0" /></p>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_ce142a0f.jpg" width="598" height="302" name="Picture 711" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol start="8">
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_issue_header"><a name="_Toc56526514"></a> Reported Issues</h3>
			</li>
		</ol>
	</ol>
</ol>
<p class="western" lang="en-US" style="font-weight: normal; line-height: 100%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_issue_para1">Department users can view any issues if reported in any department in 3D</span></p>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_issue_li1">Select Department from drop down</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_issue_li2">Select the issue you want to view</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_issue_li3">Click on Submit</span></p>
	</li>
</ul>
<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" ><img src="${context}/images/deptimg/3eaf2f305809d905bb40a9e178c2ace8_html_f5e0b9d2.jpg" width="598" height="302" name="Picture 712" align="BOTTOM" border="0" /></p>
<ol>
	<ol>
		<ol>
			<li>
				<h3 class="western" lang="en-US" style="margin-top: 0.08in; margin-bottom: 0.08in; line-height: 115%;" data-translate="_3d_proximity_header"><a name="_Toc56526515"></a> Proximity Analysis</h3>
			</li>
		</ol>
	</ol>
</ol>
<ul>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_proximity_li1">Select layer from drop down</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_proximity_li2">Draw polygon on map</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_proximity_li3">The buildings or road falling in that polygon will be displayed in the results tab</span></p>
	</li>
	<li>
		<p lang="en-US" style="font-weight: normal; line-height: 115%; page-break-inside: avoid; page-break-after: avoid;" align="JUSTIFY"><span style="font-family: Cambria, serif;" data-translate="_3d_proximity_li4">On click of Zoom to Feature it will be highlighted &amp; zoomed on map.</span></p>
	</li>
</ul>
       	</div>
        
        
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
<script type="text/javascript" src="${context}/js/developer/dept_help_language_controller.js"></script>


</body>
</html>
