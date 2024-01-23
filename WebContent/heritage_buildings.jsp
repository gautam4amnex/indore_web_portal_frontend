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
	<title>Heritage Building</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="icon" type="image/png" href="${context}/images/favicon.png">
	<link rel="stylesheet" href="${context}/css/bootstrap.min.css">
	<link rel="stylesheet" href="${context}/css/font-awesome.min.css">
	<link rel="stylesheet" href="${context}/css/jquery-ui.css">
	<link rel="stylesheet" href="${context}/css/esri/api-4-14.css">
	<link rel="stylesheet" href="${context}/css/toastr.css">
	<link rel="stylesheet" href="${context}/css/style.css">
	<link rel="stylesheet" href="${context}/css/citizenmap.css">
	<style>
	.page-content-wrapper {
	   	width: 100%;
	   height: 110vh;
	}
	.heritage-action{
		position: absolute;
	    bottom: 105px;
	    display: inline-block;
	    width: 60%;
	    margin: 0 0 0 10px;
    }
    a.layer-close.action-layer-close img {
	    width: 25px;
	    height: 40px;
	}
	
	.heritage-action ul{
		list-style-type: none;
	}
	a.layer-close img {   
	    width: 40px;
	    height: 40px;
	    margin: 0 10px 0 0;
	}
	.action-layer {
	    position: relative;
	    top: -353px;
	    bottom: 0;
	    height: 290px;
	    right: -260px !important;
	}
	#coordinateDiv {
	    position: fixed;
	    bottom: 33px;
	    right: 238px;
	    color: #fff !important;
	    z-index: 999;
	    background: var(--main-theme-color) !important;
	    padding: 5px 15px;
	    border-radius: 15px;
	}
	
	.esri-basemap-toggle {
	    top: 80px;
	}
	
	 @media only screen and (max-width: 620px) and (min-width: 320px){
		.esri-view-height-small .esri-expand .esri-widget--panel, .esri-view-height-small .esri-expand .esri-widget--panel-height-only, .esri-view-height-small .esri-ui-corner .esri-component.esri-widget--panel, .esri-view-height-small .esri-ui-corner .esri-component.esri-widget--panel-height-only {
		    max-height: 277px;
		    padding-bottom: 130px;
		}
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
				<span id="coordinateDiv"></span>
				</div>
			</div>
	</div>
	<!-- /#page-content-wrapper -->
	<div class="heritage-action">
		<ul class="action-ul bottom-action">
			<li title="Print" id="print_popup">
						<a href="javascript:void(0);" data-attr="#print">
							<img src="${context}/images/icons/Print.svg">
						</a>
						<div class="layer-popup action-layer div-hidden" id="print">
							<div class="layers">
								<div class="layer-title-main">
									<h3 class="layer-title mr-auto" data-translate="_print">Print</h3>
									<a class="layer-close action-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
								</div>	
								
								<!-- print content -->

								<div class="layer-content scrollar print-content">
									
									<form id="form_print" novalidate="novalidate">
										<div class="form-group">
											<label for="title_name" data-translate="_print_ptitle">Title Name</label>
											<input type="text" class="form-control" id="title_name" name="title_name" data-translate="_print_etitle" placeholder="Enter Title" aria-required="true">
										</div>
										<div class="form-group">
											<label for="print_format" data-translate="_print_playout">Layout</label>
											<select name="printLayout" id="print_layout_id" class="form-control pb-1">
					                          <option value="A3 Landscape">A3 Landscape</option>
					                          <option value="A3 Portrait">A3 Portrait</option>
					                          <option value="A4 Landscape">A4 Landscape</option>
					                          <option value="A4 Portrait">A4 Portrait</option>
					                          <option value="Letter ANSI A Landscape" selected="">Letter ANSI A Landscape</option>
					                          <option value="Letter ANSI A Portrait">Letter ANSI A Portrait</option>
					                          <option value="Tabloid ANSI B Landscape">Tabloid ANSI B Landscape</option>
					                          <option value="Tabloid ANSI B Portrait">Tabloid ANSI B Portrait</option>
					                        </select>
										</div>
										<div class="form-group">
											<label for="print_format" data-translate="_print_pformat">Format</label>
											 <select name="printFormat" id="print_format_id" class="form-control pb-1">
						                          <option value="pdf" selected="">PDF</option>
						                          <option value="png32">PNG32</option>
						                          <option value="png8">PNG8</option>
						                          <option value="jpg">JPG</option>
                                             </select>
										</div>
										<div class="text-center">
											<button type="submit" id="print_submit" class="btn btn-indore printBtn" data-translate="_print" style="display: block;">Print</button>
											<a href="#" id="printResult" target="_blank" style="display:none;" data-translate="_print_gprintout">Get Printout</a>
										</div>
									</form>
								</div>
							</div>
							<span class="arrow-footer"></span>
						</div>
					</li>
		</ul>
	</div>
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
	<script type="text/javascript" src="${context}/js/developer/heritage_buildings.js"></script>
</body>
</html>