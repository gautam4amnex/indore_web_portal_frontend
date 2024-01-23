<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>


<link rel="stylesheet" type="text/css" href="${context}/css/fonts/material_icons.css">
<link rel="stylesheet" type="text/css"  href="${context}/css/gijgo.css"  />

<link rel="stylesheet" type="text/css" href="${context}/css/daterangepicker.css" />

<title>POI Data</title>
<style>
.poiData_tbl td{word-break: break-all;}
.dt-buttons {
	position: initial;
    float: right;
    bottom: 32px;
    right: 165px;
}

.admin-content {
    overflow: auto;
    padding-bottom: 100px;
}
</style>
	<!-- Page Content -->
<div class="page-content-wrapper">
		
		
	<div class="container-fluid h-100 p-0">
			<jsp:include page="/common/header.jsp" />

<div class="admin-content">
		<div class="form-card p-2">

			<div class="row">
				<div class="col-sm-12 col-lg-3">
					<div class="form-group">
						<label for="select_dep" data-translate = "_poi_select_dept">Select Department</label> 
						<select class="form-control pb-1" id="poi_department" name="poi_department">
							<option>Select Department</option>
						</select>
					</div>
				</div>
				<div class="col-sm-12 col-lg-3">
					<div class="form-group">
						<label for="poiName" data-translate = "_poi_select_poi">Select POI</label> 
						<select class="form-control pb-1" id="poi_type_list" name="poi_type_list">
						</select>
					</div>
				</div>
				<div class="col-sm-12 col-lg-3">

					<div class="form-group">
						<label for="from" data-translate = "_poi_from_date">From Date</label> <input
							type="text" class="form-control datepicker valid" id="filter_from_date"
							name="filter_from_date">
					</div>
				</div>





				<div class="col-sm-12 col-lg-3">
					<div class="form-group">
						<label for="to_date" data-translate = "_poi_to_date">To Date</label> <input type="text"
							class="form-control datepicker valid" id="filter_to_date" name="filter_to_date">
					</div>
				</div>


			</div>
			<div class="text-center">
				<button class="btn btn-indore submit-btn mt-2" id="survey_filter_submit_btn" data-translate = "_poi_submit">Submit</button>
			</div>
		</div>
		<div class="tab-content">	
	<div class="tab-pane container-fluid active">
		<div id="poi_data_div">
		</div>
	</div></div>
	</div>
			
		
		
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
	<!-- /#page-content-wrapper -->
	
</div>
<!-- /#wrapper -->
	
	
	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>
	<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="${context}/js/hummingbird-treeview-1.3.js"></script>
	
	<!-- DataTable -->
	<script src="${context}/js/dataTables-buttons-min.js"></script>
	<script src="${context}/js/buttons-html5-min.js"></script>
	
	<!-- pdf download -->
	<script type="text/javascript" src="${context}/js/pdfmake-min.js"></script>
	<script type="text/javascript" src="${context}/js/vfs_fonts.js"></script>
	
	
	<script type="text/javascript" src="${context}/js/moment.min.js"></script>
	<script type="text/javascript"
	src="${context}/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="${context}/js/daterangepicker.min.js"></script>
	
	
	<!-- validate form  -->
	<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	
	<script src="${context}/js/gijgo.js" type="text/javascript"></script>
	
	<!-- for toster message -->
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	
	<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	
	<!-- for accessing toaster display message --> 
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	
	
	<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>
	
	<script type="text/javascript" src="${context}/js/admin-common.js"></script>
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>
	<script type="text/javascript" src="${context}/js/designer/poi_data.js"></script>
	<script>
// 	$(document).ready(function(){	

		
		
// 	});
	</script>
</body>
</html>