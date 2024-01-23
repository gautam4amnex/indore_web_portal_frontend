<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<c:set value="${pageContext.request.contextPath}" var="context" />
<c:set var="language"
	value="${lang eq 'en' or lang eq 'gu' ? lang : pageContext.request.locale.language}"
	scope="session" />
<fmt:setLocale value="${language}" />

<meta name="_urlContext" content="${context}" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html lang="${language}">
<head>
<title>Survey Dashboard</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="icon" type="image/png" href="${context}/images/favicon.png">
<link type="text/css" rel="stylesheet" href="${context}/css/bootstrap.min.css">
<link type="text/css" rel="stylesheet" href="${context}/css/bootstrap-select.css" />
<link type="text/css" rel="stylesheet" href="${context}/css/font-awesome.min.css">
<link type="text/css" rel="stylesheet" href="${context}/css/datatables.min.css">
<link type="text/css" rel="stylesheet" href="${context}/css/datepicker.css">
<link type="text/css" rel="stylesheet" href="${context}/css/hummingbird-treeview-1.3.css">
<link type="text/css" rel="stylesheet" href="${context}/css/toastr.css">
<link type="text/css" rel="stylesheet" href="${context}/css/style.css">
<link type="text/css" rel="stylesheet" href="${context}/css/admin-common.css">
</head>
<body>

	<!-- wrapper -->
	<div class="d-flex  col-12 p-0 wrapper">

		<!-- Sidebar -->
		<div class="nav-main">
			<a href="javascript:void(0);" class="side-menu-click"> <i
				class="fa fa-bars" aria-hidden="true"></i>
			</a>
			<div class="city-logo">
				<a href="${context}/login.jsp"><img src="${context}/images/SmartCityLogo.jpg"></a>
			</div>

		</div>
		<!-- /#sidebar-wrapper -->


		<div class="page-content-wrapper">

			<div class="container-fluid h-100 p-0">
				<jsp:include page="/common/header.jsp" />

				<div class="admin-content">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs full-linetab-admin justify-content-center">
						<li class="nav-item">
							<a class="nav-link active"	data-toggle="tab" href="#dashboard_tab">Dashboard</a>
						</li>
						<li class="nav-item" id="ward_assign_li">
							<a class="nav-link" data-toggle="tab" href="#ward_assignment">Ward Assignment</a>
						</li>
					</ul>

					<!-- Tab panes -->
					<div class="tab-content">
						<div class="tab-pane container-fluid active countwithdash" id="dashboard_tab">
							<div class="card-container pr-0">
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 pl-0 mb-2">
										<div class="card">
											<div class="card-body d-flex justify-content-between align-items-center">
												<div class="icon-container">
													<a href="javascript:void(0);"><img src="${context}/images/survey_dashboard/requested.svg" alt=""></a>
												</div>
												<div class="value-det">
													<p id="activeSurveyor"></p>
													<span>Active Surveyor Data</span>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 pl-0 mb-2">
										<div class="card">
											<div class="card-body d-flex justify-content-between align-items-center">
												<div class="icon-container">
													<a href="javascript:void(0);"><img src="${context}/images/survey_dashboard/in_progress.svg" alt=""></a>
												</div>
												<div class="value-det">
													<p id="activeSurvey"></p>
													<span>Active Survey Data</span>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 pl-0 mb-2">
										<div class="card">
											<div class="card-body d-flex justify-content-between align-items-center">
												<div class="icon-container">
													<a href="javascript:void(0);"><img src="${context}/images/survey_dashboard/Verified.svg" alt=""></a>
												</div>
												<div class="value-det">
													<p id="approvedSurvey"></p>
													<span>Approved Survey Data</span>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 pl-0 mb-2">
										<div class="card">
											<div class="card-body d-flex justify-content-between align-items-center">
												<div class="icon-container">
													<a href="javascript:void(0);"><img src="${context}/images/survey_dashboard/total_request.svg" alt="" class="cust-pad"></a>
												</div>
												<div class="value-det">
													<p id="totalSurvey"></p>
													<span>Total Survey Data</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							
						<div class="survey-deshbord-count">
								<div class="text-right position-relative">
									<button class="btn-indore-table fillter survey-dashboard-filter btnsrvcount">filter</button>
									<div class="table-header">
										<div class="filter-container srvcount">
											<p>Surveyor</p>
											<select class="pb-1" name="surveyor_list_for_count" id="surveyor_list_for_count">
											</select>
											<p>From Date</p>
											<input type="text" name="" id="count_from_date">
											<p>To Date</p>
											<input type="text" name="" id="count_to_date">
	
											<div class="btn-container d-flex mt-3">
												<input type="button" value="Close" class="cancel"> <input
													type="button" value="Submit" class="save"
													id="count_filter_btn">
											</div>
										</div> 
									</div>
								</div>
	
								<h6 class="table-title-grid">Survey Count</h6>
								<table id="count_master_tbl" class="display tbl_dep" class="tbl-report"></table>
							</div>
							
							<div class="survey-deshbord" id="dashboard_tab">
								<div class="text-right position-relative">
									<button class="btn-indore-table fillter survey-dashboard-filter btnsrvdesh">filter</button>
									<div class="table-header">
										<div class="filter-container srvdesh">
											<p>POI Type</p>
											<select class="pb-1" name="poi_type_list" id="poi_type_list">
											</select>
											<p>Surveyor</p>
											<select class="pb-1" name="surveyor_list" id="surveyor_list">
											</select>
											<p>From Date</p>
											<input type="text" name="" id="filter_from_date">
											<p>To Date</p>
											<input type="text" name="" id="filter_to_date">
	
											<div class="btn-container d-flex mt-3">
												<input type="button" value="Close" class="cancel"> <input
													type="button" value="Submit" class="save"
													id="survey_filter_submit_btn">
											</div>
										</div>
									</div>
								</div>
	
								<h6 class="table-title-grid">Survey Dashboard</h6>
								
							</div>
						</div>
						<div class="tab-pane container-fluid " id="ward_assignment">
						
							<div class="admin-content without-add">
								<h6 class="table-title-grid">Ward Assignment</h6>
								<div class="row">
									<div class="col-12">
										<form class="w-100">
											<div class="row">	
												<div class="form-group col-sm-12 col-lg-6">
													<label for="sv_select">Select Surveyor</label>
													<select class="form-control pb-1" id="sv_select">
													</select>
												</div>
												<div class="form-group col-sm-12 col-lg-6">
													<label for="sv_ward">Select Ward</label>
													<select class="form-control pb-1" id="sv_ward">
													</select>
												</div>
											</div>
											<div class="row">
												<div class="text-center mt-3 col-12">
													<button type="button" id="sv_ward_submit_btn" class="btn btn-indore">Submit</button>
												</div>
											</div>
										</form>	
									</div>
								</div>
								<table id="ward_assign" class="display tbl_dep" class="tbl-report"></table>
							</div>
						
						</div>
					</div>
					
					<!-- Tab panes end-->
				</div>

			</div>
		</div>
		<!-- /#page-content-wrapper -->

		<div id="imageModal" class="modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" id="imageModalCloseBtn" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div id="carouselExampleControls" class="carousel slide"
							data-ride="carousel">
							<div class="carousel-inner" id="carousel-inner">
<!-- 							ADDED THE IMAGE FILES HERE WITH JQUERY -->
							</div>
							<a class="carousel-control-prev" href="#carouselExampleControls"
								role="button" data-slide="prev"> <span
								class="carousel-control-prev-icon" aria-hidden="true"></span> <span
								class="sr-only">Previous</span>
							</a> <a class="carousel-control-next" href="#carouselExampleControls"
								role="button" data-slide="next"> <span
								class="carousel-control-next-icon" aria-hidden="true"></span> <span
								class="sr-only">Next</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- /#wrapper -->




	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>
	<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="${context}/js/hummingbird-treeview-1.3.js"></script>

	<script src="${context}/js/dataTables-buttons-min.js"></script>
	<script src="${context}/js/buttons-html5-min.js"></script>

	<!-- for toster message -->
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	<!-- for accessing toaster display message --> 
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	
	<script type="text/javascript" src="${context}/js/admin-common.js"></script>
	<script type="text/javascript" src="${context}/js/user-common.js"></script>
	<script type="text/javascript" src="${context}/js/developer/survey_dashboard.js"></script>
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>

</body>
</html>