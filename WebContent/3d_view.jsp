<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<c:set value="${pageContext.request.contextPath}" var="context" />

<c:set var="language" value="${lang eq 'en' or lang eq 'gu' ? lang : pageContext.request.locale.language}" scope="session" />
<fmt:setLocale value="${language}" />

<meta name="_urlContext" content="${context}" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />

<html lang="${language}">
<head>
	<title>Indore Citizen</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="icon" type="image/png" href="${context}/images/favicon.png">
	<link rel="stylesheet" href="${context}/css/bootstrap.min.css">
	<link rel="stylesheet" href="${context}/css/font-awesome.min.css">
	<link rel="stylesheet" href="${context}/css/jquery-ui.css">
	<link rel="stylesheet" href="${context}/css/esri/api-4-14.css">
	<link rel="stylesheet" href="${context}/css/style.css">
	<link rel="stylesheet" href="${context}/css/citizenmap.css">
	<style>
	.esri-layer-list{
		display: none;
	}
	.layer_toggle{
		position: absolute;
	    top: 295px;
	    left: 15px;
	    background: #fff;
	    padding: 7px;
	    width: 35px;
	    height: 35px;
	    cursor: pointer;
	}
	.page-content-wrapper {
	   width: 100%;
	   height: 110vh;
	}
	</style>
</head>

<body>
<div class="loader"></div>	


<div class="d-flex col-12 p-0 wrapper"> 
	
	<!--Main sidebar content end-->
	
	<!-- Page Content -->
	<div class="page-content-wrapper">
		<div class="map-main">
			    <div id="search"></div>
			    
				<div id="map" class="map h-100">
				<div class="layer_toggle"><i class="fa fa-cogs layer_action" id="layer_toggle_title" title="Enable Layer List"></i></div>
				</div>
			</div>
	</div>
	<!-- /#page-content-wrapper -->
	
</div>
<!-- /#wrapper -->
	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src = "${context}/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	<script type="text/javascript" src="${context}/js/moment.min.js"></script>
	<script type="text/javascript" src="${context}/js/daterangepicker.min.js"></script>
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	<script type="text/javascript" src="${context}/js/esri/esri-api-4-14.js"></script>
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>
	<script type="text/javascript" src="${context}/js/developer/dep_map_constant.js"></script>
	<script type="text/javascript" src="${context}/js/developer/3d_view.js"></script>
</body>
</html>