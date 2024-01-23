
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>User Manual</title>


<style>

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

/*.page-content-wrapper{overflow: auto;}*/
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
a.side-menu-click{left: 20px;}
</style>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		
		
		<div class="helpNav">
            <h4 class="menu-title">Application Overview
            </h4>

            <ul class="p-0 sideul">
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                    <div class="panel panel-default">
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
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingTwo">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <i class="more-less glyphicon glyphicon-plus"></i>
                                    Map tools
                                </a>
                                <i class="fa fa-angle-down"></i>
                            </h4>
                        </div>
                        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" >
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
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingThree">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <i class="more-less glyphicon glyphicon-plus"></i>
                                    Menu
                                </a>
                                <i class="fa fa-angle-down"></i>
                            </h4>
                        </div>
                        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree" >
                            <div class="panel-body">
                               <ul>
                                <li><a href="#basemapg">Base map Gallery</a></li>
                                <li><a href="#layers">Layers</a></li>
                                <li><a href="#query">Query</a></li>
                                <li><a href="#drawtool">Draw Tool</a></li>
                                <li><a href="#imcservice">IMC Services</a></li>
                                <li><a href="#arroundme">Around Me</a></li>
                                <li><a href="#event">Events</a></li>
                                <li><a href="#wardinfo">Ward Information</a></li>
                                <li><a href="#knowp">Know Your Property</a></li>
                                <li><a href="#autann">City Announcements</a></li>
                                <li><a href="#fas">Feedback and Suggestions</a></li>
                                <li><a href="#adddata">Add Data</a></li>
                                <li><a href="#ftl">From – To Location</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headinFourt">
                            <h4 class="panel-title">
                                <a class="" role="button" data-toggle="collapse" data-parent="#accordion" href="#headinFour" aria-expanded="true" aria-controls="headinFour">
                                    <i class="more-less glyphicon glyphicon-plus"></i>
                                    Department Web Portal
                                </a>
                                <i class="fa fa-angle-down"></i>
                            </h4>
                        </div>
                        <div id="headinFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headinFourt" >
                            <div class="panel-body">
                              <ul>  <li><a href="#dlogin">Department Login</a></li>
                                <li><a href="#centdesh">Central dashboard</a></li>
                                <li><a href="#publicedept">Public Department</a></li>
                                <li><a href="#diverdept">Diversion Department</a></li>
                                <li><a href="#dudadept">DUDA Department</a></li>
                                <li><a href="#educdept">Education Department</a></li>
                                <li><a href="#housdept">Housing Board Department</a></li>
                                <li><a href="#healthdept">Health Department</a></li>
                                <li><a href="#idadept">IDA Department</a></li>
                                <li><a href="#imcdept">IMC Department</a></li>
                                <li><a href="#indsdept">Industry Department</a></li>
                               <li><a href="#landdept">Land Record Department</a></li>
                               <li><a href="#nazuldept">Nazul Department</a></li>
                               <li><a href="#nicdept">NIC Department</a></li>
                               <li><a href="#elecdept">Electricity Department</a></li>
                               <li><a href="#peddept">PWD Department</a></li>
                               <li><a href="#stampdept">Stamp</a></li>
                               <li><a href="#townpdept">Town planning Department</a></li>
                               <li><a href="#womandept">Women child & welfare Department</a></li>
                               <li><a href="#phedept">Public health engineering Department</a></li>
                               <li><a href="#aictsldept">AICTSL</a></li>
                              </ul>  
                            </div>
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
<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
<script type="text/javascript"
	src="${context}/js/bootstrap-datepicker.js"></script>
<script type="text/javascript"
	src="${context}/js/hummingbird-treeview-1.3.js"></script>

<!-- DataTable -->
<script src="${context}/js/dataTables-buttons-min.js"></script>
<script src="${context}/js/buttons-html5-min.js"></script>

<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
<script src="${context}/js/utils.js"></script>
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/designer/health_dep.js"></script>

</body>
</html>