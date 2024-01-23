<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Project Reports</title>
<link rel="stylesheet" href="${context}/css/esri/main.css">
<link rel="stylesheet" href="${context}/css/esri/claro.css">
<link rel="stylesheet" href="${context}/css/esri/nihilo.css">
<link rel="stylesheet" href="${context}/css/esri/api-3-30.css">
<link type="text/css" rel="stylesheet" href="${context}/css/project_reports.css">
<link type="text/css" rel="stylesheet" href="${context}/css/datepicker.css" />

<!--Main sidebar content start-->


<!--Main sidebar content end-->

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />

		<div class="admin-content">
			<div
				class="col-12 col-md-12 col-lg-12 col-sm-12 col-xl-12 hospitolR-h57 pl-1 pr-1 postion-relative-slider border-bottom-map">
				<div class="full-map hospitolR-h100" id="map"></div>
				<div class="map_panel">

					<div class="d-flex align-items-center title-slider p-2">	
						<div class="mr-auto" id="report_title"></div>	
					</div>	
					<div id="projectReport_piechart" style="height: 100%; width:100% ;"></div>
					<!-- Filter -->
					<a href="javascript:void(0);"
						class="js-slider-filter filter-slider-map"><i
						class="fa fa-angle-left" aria-hidden="true"></i></a>
					<div class="map-panel-filter">
						<div class="d-flex align-items-center title-slider p-2">
							<div class="mr-auto">Filter</div>
						</div>
						<form class="p-3" id="form_projectReport" name="form_projectReport">	
<!-- 							<div class="form-group"> -->
<!-- 								<label for="announce_title">Select Ward</label> -->
<!-- 								<select class="form-control pb-1" id="projectReport_ward" name="projectReport_ward"></select> -->
<!-- 							</div> -->
							<div class="form-group">
								<label for="announce_title">Select Project</label>
								<select class="form-control pb-1" id="select_project" name="select_project"></select>
							</div>
							<div class="form-group">
								<label for="announce_title">Select Status</label>
								<select class="form-control pb-1" id="prj_project_status" name="prj_project_status"></select>
							</div>
							<div class="form-group">
									<label for="date_Announcement">From Date</label>
									<input type="text" class="form-control datepicker" id="projectReport_fromDate" name="projectReport_fromDate" placeholder="From Date">
							</div>
							<div class="form-group">
									<label for="date_Announcement">To Date</label>
									<input type="text" class="form-control datepicker" id="projectReport_toDate" name="projectReport_toDate" placeholder="To Date">
							</div>
							<div class="text-center">
								<input type="button" class="btn btn-indore" id="projectReport_submit" value="Submit">
								<input type="reset" class="btn btn-indore" value="Clear">
							</div>
						</form>
					</div>
				</div>
				<!-- Filter Data -->

				<a href="javascript:void(0);"
					class="js-slider-show sidebar-slider-map show"><i
					class="fa fa-angle-left" aria-hidden="true"></i></a>

			</div>

			<div
				class="col-12 col-md-12 col-lg-12 col-sm-12 col-xl-12 hospitolR-h35 pl-1 pr-1 mt-2">
				<table id="project_report" class="tbl_dep hospitolR-h100">
				</table>
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
<script src="${context}/js/dataTables-buttons-min.js"></script>
<script src="${context}/js/buttons-html5-min.js"></script>

<!-- pdf download -->
<script type="text/javascript" src="${context}/js/pdfmake-min.js"></script>
<script type="text/javascript" src="${context}/js/vfs_fonts.js"></script>

<script src="${context}/js/echarts.js" type="text/javascript"></script>

<script src="${context}/js/toastr.min.js"></script>

<script src="${context}/js/esri/esri-api-3-30.js"></script>
<script src="${context}/js/utils.js"></script>	
<script src="${context}/js/created/appData.js"></script>

<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/dep_project_monitoring.js"></script>		
<script type="text/javascript" src="${context}/js/developer/project_reports.js"></script>
<script type="text/javascript" src="${context}/js/designer/project_reports_design.js"></script>

</body>

</html>