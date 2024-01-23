<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Master Data</title>
<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />

		<div class="admin-content without-add">
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				  <li class="nav-item">
					<a class="nav-link tab-data active" data-toggle="tab" href="#citizen_master" data-translate = "cmdata_cmaster">Citizen Master</a>
				  </li>
				  
			</ul>
			
			<div class="tab-content">	
				  <div class="tab-pane container-fluid active" id="citizen_master">
				  	<h6 class="table-title-grid" data-translate = "cmdata_lcmaster">List of Citizen Master</h6>
					<table id="depCitizenMaster" class="display tbl_dep" class="tbl-report"></table>
				  
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
<script type="text/javascript" src="${context}/js/dataTables-buttons-min.js"></script>
<script type="text/javascript" src="${context}/js/buttons-html5-min.js"></script>

<!-- pdf download -->
<script  src="${context}/js/pdfmake-min.js"></script>
<script  src="${context}/js/vfs_fonts.js"></script>
	

	<!-- validate form  -->
<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	
	<!-- for toster message -->
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	
<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	
	<!-- for accessing toaster display message --> 
<script type="text/javascript" src="${context}/js/utils.js"></script>

<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>

<script type="text/javascript" src="${context}/js/developer/dep_masterdata_controller.js"></script>
<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/admin-common.js"></script>
<script type="text/javascript" src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/designer/master-common.js"></script>

</body>
</html>