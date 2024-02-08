<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Report</title>
<link rel="stylesheet" href="${context}/css/esri/main.css">
<link rel="stylesheet" href="${context}/css/esri/claro.css">
<link rel="stylesheet" href="${context}/css/esri/nihilo.css">
<link rel="stylesheet" href="${context}/css/esri/api-3-30.css">
<link type="text/css" rel="stylesheet"
	href="${context}/css/healthcare_hospital.css">
		    <script src="https://cdn.jsdelivr.net/npm/ol@v8.2.0/dist/ol.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v8.2.0/ol.css">

<!--Main sidebar content start-->

<!--Layer popup start-->
<%-- <div class="layer-popup" id="layers">
	<div class="layers">
		<div class="layer-title-main">
			<h3 class="layer-title mr-auto">Themes</h3>
			<a class="layer-close side-layer-close" href="javascript:void(0);"><img
				class="map-side-icon-img" src="${context}/images/icons/Close-61.svg"
				alt=""></a>
		</div>
		<div class="layer-content">Themes</div>
	</div>
</div> --%>
<!--Layer popup end-->

<!--Main sidebar content end-->

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />

		<div class="admin-content">
			<div
				class="col-12 col-md-12 col-lg-12 col-sm-12 col-xl-12 hospitolR-h65 pl-1 pr-1 postion-relative-slider border-bottom-map chart-overflow">
				<div class="full-map hospitolR-h100" id="map">
				<div id="HomeButton"></div>
				</div>
				
				
				<div class="map_panel">

					<div class="d-flex align-items-center title-slider p-2">	
						<div class="mr-auto" id="report_title"></div>	
					</div>	
						<div id="Hospitol_piechart" class="h-100"></div>
					<!-- Filter -->
					<a href="javascript:void(0);"
						class="js-slider-filter filter-slider-map"><i
						class="fa fa-angle-left" aria-hidden="true"></i></a>
					<div class="map-panel-filter">
						<div class="d-flex align-items-center title-slider p-2">
							<div class="mr-auto" data-translate= "_filter">Filter</div>
						</div>
						<form class="p-3" id="form_hospital">	
						</form>
					</div>
				</div>
				<!-- Filter Data -->

				<a href="javascript:void(0);" id="chart_slider"
					class="js-slider-show sidebar-slider-map show"><i
					class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div>

			<div class="col-12 col-md-12 col-lg-12 col-sm-12 col-xl-12 hospitolR-h35 pl-1 pr-1 mt-2" id="feature_table">	
				<div class="tbl_dep hospitolR-h100" id="myTableNode"></div>	
			</div>


		</div>

	</div>
</div>
<!-- /#page-content-wrapper -->

</div>
<!-- /#wrapper -->

<!-- 3.4.1 -->
<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
<script type="text/javascript" src="${context}/js/popper.min.js"></script>

<!-- 4.3.1 -->
<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>

<!-- 1.10.20 -->
<script type="text/javascript" src="${context}/js/datatables.min.js"></script>

<script type="text/javascript" src="${context}/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>

<!-- DataTable -->
<script type="text/javascript" src="${context}/js/dataTables-buttons-min.js"></script>
<script type="text/javascript" src="${context}/js/buttons-html5-min.js"></script>

<!-- pdf download -->
<script type="text/javascript" src="${context}/js/pdfmake-min.js"></script>
<script type="text/javascript" src="${context}/js/vfs_fonts.js"></script>

<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/echarts.js" type="text/javascript"></script>

<script type="text/javascript" src="${context}/js/esri/esri-api-3-30.js"></script>
<script type="text/javascript" src="${context}/js/utils.js"></script>	
<script type="text/javascript" src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_map_constant.js"></script>
<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/dep_report_filter.js"></script>	
<script type="text/javascript" src="${context}/js/developer/dep_report_controller.js"></script>	

<script type="text/javascript" src="${context}/js/designer/health_care_hospital.js"></script>

</body>

</html>