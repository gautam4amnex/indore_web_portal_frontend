<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Health Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data-toggle="tab" href="#health_hospital">Hospital</a></li>
				<li class="nav-item"><a class="nav-link" data-toggle="tab"
					href="#health_uphc">UPHC</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="health_hospital">
					<div class="select-project">
				   		<label>Select Layer</label>    
					    <select class="form-control pb-1" id="select_layer" name="select_layer">
						</select>
					    
					</div>
					
<!-- 					<div class="text-right"> -->
<!-- 						<button data-toggle="modal" data-target="#dep_addhospital_modal" -->
<!-- 							class="btn-add btn-indore-table">Add Hospital</button> -->
<!-- 					</div> -->

					<h6 class="table-title-grid">List of Hospitals</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					

				</div>
				
				
			</div>

			<!-- Tab panes end-->
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
<script type="text/javascript"
	src="${context}/js/bootstrap-datepicker.js"></script>
<script type="text/javascript"
	src="${context}/js/hummingbird-treeview-1.3.js"></script>

<!-- DataTable -->
<script src="${context}/js/dataTables-buttons-min.js"></script>
<script src="${context}/js/buttons-html5-min.js"></script>

<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>

<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/designer/layer_master_data.js"></script>

</body>
</html>