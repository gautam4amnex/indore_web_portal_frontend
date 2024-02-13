<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>


<link rel="stylesheet" type="text/css"
	href="${context}/css/fonts/material_icons.css">
<link rel="stylesheet" type="text/css" href="${context}/css/gijgo.css" />

<%-- <link rel="stylesheet" type="text/css" href="${context}/css/daterangepicker.css" /> --%>
<link rel="stylesheet" type="text/css"
	href="${context}/css/DashboardAdmin.css" />
	<script src="https://cdn.jsdelivr.net/npm/ol@v8.2.0/dist/ol.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v8.2.0/ol.css">
<title>Central Dashboard</title>
<!-- Page Content -->
<div class="page-content-wrapper">
	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<!--Box Content Start-->
		<div class="row m-0 pt-3 admin-main scrollar">
			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="8">
				<a href="javascript:void(0);">
					<div class="info-box box-color1">       
						<h5>AICTSL</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/AICTSL-35.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider buses_count"></h4>
							<span class="dept-name">Bus Stop (No.)</span>
						</div>
					</div>
				</a>
			</div>
			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="22">
				<a href="javascript:void(0);">
					<div class="info-box box-color2">
						<h5>Electrical</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/Electricity-01.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider street_light_count"></h4>
							<span class="dept-name">Street light (No.)</span>
						</div>
					</div>
				</a>
			</div>

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="4">
				<a href="javascript:void(0);">
					<div class="info-box box-color3">
						<h5>Police</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/Police Department-28.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider police_chowkey_count">
							</h4>
							<span class="dept-name">Police Station (No.)</span>
						</div>
					</div>
				</a>

			</div>
			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="5">
				<a href="javascript:void(0);">
					<div class="info-box box-color4">
						<h5>Town & Country Planning</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class=""
									src="images/icons/T & C Planning Department-32.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_planning_area">
							</h4>
							<span class="dept-name">Town Planning Area (Sq. km)</span>
						</div>
					</div>
				</a>
			</div>

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="6">
				<a href="javascript:void(0);">
					<div class="info-box box-color2">
						<h5>IDA</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class=""
									src="images/icons/Indore Development Authority-39.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_ida"></h4>
							<span class="dept-name">IDA Schemes (No.)</span>
						</div>
					</div>
				</a>
			</div>

<!-- 			<div -->
<!-- 				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="7"> -->
<!-- 				<a href="javascript:void(0);"> -->
<!-- 					<div class="info-box box-color2"> -->
<!-- 						<h5>RTO Department</h5> -->
<!-- 						<span class="info-box-icon"> -->
<!-- 							<div class="info-chart"> -->
<!-- 								<img class="" src="images/icons/RTO-30.svg"> -->
<!-- 							</div> -->
<!-- 						</span> -->
<!-- 						<div class="info-box-content"> -->
<!-- 							<h4 class="info-box-name with-divider total_rto"></h4> -->
<!-- 							<span class="dept-name">RTO Offices (No.)</span> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</a> -->
<!-- 			</div> -->

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="1">
				<a href="javascript:void(0);">
					<div class="info-box box-color4">
						<h5>Health</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/Health-23.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_hospitals"></h4>
							<span class="dept-name">Hospitals (No.)</span>
						</div>
					</div>
				</a>
			</div>

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="9">
				<a href="javascript:void(0);">
					<div class="info-box box-color1">
						<h5>PHE (Urban)</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class=""
									src="images/icons/Public Health Engineering-29.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_water_line_length">
							</h4>
							<span class="dept-name">Water Line Length (M.)</span>
						</div>
					</div>
				</a>
			</div>

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="10">
				<a href="javascript:void(0);">
					<div class="info-box box-color2">
						<h5>PWD</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/PWD-43.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_roads_length"></h4>
							<span class="dept-name">Road Length (M.)</span>
						</div>
					</div>
				</a>
			</div>

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="2">
				<a href="javascript:void(0);">
					<div class="info-box box-color3">
						<h5>Education</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/Education-22.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_primary_schools">
							</h4>
							<span class="dept-name">Institutes (No.)</span>
						</div>
					</div>
				</a>
			</div>

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="17">
				<a href="javascript:void(0);">
					<div class="info-box box-color2">
						<h5>Women & Child Welfare</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class=""
									src="images/icons/Women & Child Welfare Development Department-33.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_anganwadi"></h4>
							<span class="dept-name">Anganwadi (No.)</span>
						</div>
					</div>
				</a>
			</div>

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="18">
				<a href="javascript:void(0);">
					<div class="info-box box-color3">
						<h5>MPPCB (Pollution)</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/MPPCB-25.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider avg_aql"></h4>
							<span class="dept-name">PM 2.5 (AQI.)</span>
						</div>
					</div>
				</a>
			</div>

			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="24">
				<a href="javascript:void(0);">
					<div class="info-box box-color1">
						<h5>Industrial (MPIDA)</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/Industries-24.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_industrial_training_centers">
							</h4>
							<span class="dept-name">Training Centers (No.)</span>
						</div>
					</div>
				</a>
			</div>
			
			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="23">
				<a href="javascript:void(0);">
					<div class="info-box box-color2">
						<h5>IMC</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/IMC-38.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_dustbin_locations">
							</h4>
							<span class="dept-name">Litter Bin Locations (No.)</span>
						</div>
					</div>
				</a>
			</div>
			
			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="26">
				<a href="javascript:void(0);">
					<div class="info-box box-color3">
						<h5>Land Records</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/Land Record Department-40.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_agricultural_area">
							</h4>
							<span class="dept-name">Agricultural Area (Sq.mt)</span>
						</div>
					</div>
				</a>
			</div>
			
			<div
				class="col-lg-3 col-md-6 col-sm-12 card-main-rmc central-dashboard" data-dashboardid="27">
				<a href="javascript:void(0);">
					<div class="info-box box-color1">
						<h5>Indore Smart City</h5>
						<span class="info-box-icon">
							<div class="info-chart">
								<img class="" src="images/icons/Smart_City_Department_01.svg">
							</div>
						</span>
						<div class="info-box-content">
							<h4 class="info-box-name with-divider total_smartcity_projects">
							</h4>
							<span class="dept-name">Projects (No.)</span>
						</div>
					</div>
				</a>
			</div>
			
		</div>
		<!--Box Content End-->
	</div>
</div>
<!-- /#page-content-wrapper -->
</div>
<!-- /#wrapper -->
<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
<script type="text/javascript" src="${context}/js/popper.min.js"></script>
<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>
<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_report_controller.js"></script>
<script type="text/javascript"
	src="${context}/js/bootstrap-datepicker.js"></script>
<script type="text/javascript"
	src="${context}/js/hummingbird-treeview-1.3.js"></script>
<!-- DataTable -->
<script type="text/javascript"
	src="${context}/js/dataTables-buttons-min.js"></script>
<script type="text/javascript" src="${context}/js/buttons-html5-min.js"></script>
<!-- pdf download -->
<script type="text/javascript" src="${context}/js/pdfmake-min.js"></script>
<script type="text/javascript" src="${context}/js/vfs_fonts.js"></script>
<script type="text/javascript" src="${context}/js/moment.min.js"></script>
<script type="text/javascript"
	src="${context}/js/daterangepicker.min.js"></script>
<!-- validate form  -->
<script type="text/javascript"
	src="${context}/js/jquery.validate.min.js"></script>
<script src="${context}/js/gijgo.js" type="text/javascript"></script>
<!-- for toster message -->
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<!-- for accessing toaster display message -->
<script type="text/javascript" src="${context}/js/utils.js"></script>
<script type="text/javascript" src="${context}/js/developer/utility.js"></script>



<script type="text/javascript"
	src="${context}/js/developer/dep_department_master.js"></script>
<script type="text/javascript"
	src="${context}/js/developer/dep_formValidations.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>
<script type="text/javascript" src="${context}/js/created/appData.js"></script>

<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
<script type="text/javascript"
	src="${context}/js/dashboard/CentralDashboard.js"></script>
<script type="text/javascript"
	src="${context}/js/dashboard/Dashboard.js"></script>
</body>
</html>