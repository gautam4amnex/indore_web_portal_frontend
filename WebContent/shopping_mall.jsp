<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>SHOPPING MALL</title>

<!-- Page Content -->
<div class="page-content-wrapper">

	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data_translate="_primary" data-toggle="tab" href="#shopping_mall_Dept">SHOPPING MALL</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="shopping_mall_Dept">

					<div class="text-right">
						<button data-toggle="modal" data-target="#shopping_mall_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add </button>
					</div>

					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List Of Shopping mall</h6>
					<table id="shopping_mall_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Shopping Mall Master Modal start -->
					<div class="modal fade" id="shopping_mall_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Shopping mall information</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-4 text-left ml-3">
															<form class="form-admin">
																<div class="form-group">
																	<label for="selectType" data_translate="_select_type"
																		class="ml-2">Select Type</label> <select
																		class="form-control pb-1" id="selectType"
																		name="selectType">
																		<option data_translate="_select_type">Select
																			Type</option>
																		<option value=" ">2</option>
																		<option value=" ">3</option>
																		<option value=" ">4</option>
																	</select>
																</div>
															</form>
														</div>
														<div class="col-md-12 mx-0">

															<form id="form_shopping" name="form_shopping" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab"
																		class="tabwithborder"><strong>Basic Info</strong></li>
																	<li data_translate="_images" id="imagestab"
																		class="tabwithborder"><strong>Images</strong></li>
																	<!-- <li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Facilities</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li>
																	  -->
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="longitude">Longitude</label> <input
																						type="text" class="form-control" id="longitude"
																						name="longitude" placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="latitude">Latitude</label> 
																					<input
																						type="text" class="form-control" id="latitude"
																						name="latitude" placeholder="Enter latitude">
																				</div>
																				
																					<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="shopping_subLayerId" name="shopping_subLayerId">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="ward_id">ward id</label> <select
																						class="form-control pb-1" id="ward_id"
																						name="ward_id">
																						<option>Select Ward Id</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			</div>
																		</div>
																	</div>

																
																	<button type="button" name="next" class="next action-button float-right">
																	<i class="fa fa-angle-right" aria-hidden="true"></i>
																	</button>

																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Basic Info</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="shopping_mall_name">Shopping Mall Name</label> <input
																						type="text" class="form-control" id="shopping_mall_name"
																						name="shopping_mall_name" placeholder="Enter Shopping Mall Name">
																				</div>
																				<div class="form-group">
																					<label for="food_court">Food Court</label> <input
																						type="text" class="form-control" id="food_court"
																						name="food_court" placeholder="Enter Food Court">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																					<label for="address">Address</label> <input
																						type="text" class="form-control" id="address"
																						name="address" placeholder="Enter Address">
																				</div>
																				<div class="form-group">
																					<label for="parking">Parking</label> <input
																						type="text" class="form-control" id="parking"
																						name="parking" placeholder="Enter Address">
																				</div>
																			</div>
																		</div>
																	</div>
																	
																	<button type="button" name="previous" class="previous action-button-previous float-left">\
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>
																	 
																	<button type="button" name="next" class="next action-button float-right">
																	<i class="fa fa-angle-right" aria-hidden="true"></i>
																	</button>
																	
																	
																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="geo_tagged_photo">Upload Images</label> <input
																				type="file" class="form-control" id="geo_tagged_photo"
																				name="geo_tagged_photo">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																		
																	<button type="button" name="previous"	class="previous action-button-previous float-left">
																	 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" name="finalinfosubmit" class="btn btn-indore mt-3"	value="Submit" />
																		
																</fieldset>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- MultiStep Form end-->
								</div>

							</div>

						</div>
					</div>
					<!--Shopping Mall Master Modal start -->
					
			
				
					<!--Shopping Mall Update Modal End -->
				</div>

			</div>
			<!-- Tab panes end-->
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

<script type="text/javascript"
	src="${context}/js/jquery.validate.min.js"></script>

<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript"
	src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/designer/add-data.js"></script>

</body>
</html>