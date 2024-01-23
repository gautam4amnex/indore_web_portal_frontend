<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Post Offices</title>

<!-- Page Content -->
<div class="page-content-wrapper">

	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data_translate="_primary" data-toggle="tab" href="#post_office_Dept">Post Offices</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="post_office_Dept">

					<div class="text-right">
						<button data-toggle="modal" data-target="#post_office_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Data</button>
					</div>

					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List Post Office</h6>
					<table id="post_office_table" class="display tbl_dep" class="tbl-report"></table>


					<!--Post Office Master Modal start -->

					<div class="modal fade" id="post_office_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Post Office  information</h4>
								<button type="button" class="close" onclick="resetForm('form_post_office')" data-dismiss="modal">&times;</button>

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
																
															</form>
														</div>
														<div class="col-md-12 mx-0">

															<form id="form_post_office" name="form_post_office" class="msform form-admin">
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
																					<label for="longitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="postOf_longitude"
																						name="longitude" placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="latitude">Latitude<span class="mandatory">*</span></label> 
																					<input
																						type="text" class="form-control" id="postOf_latitude"
																						name="latitude" placeholder="Enter latitude">
																				</div>
																				
																					<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="postOf_subLayerId" name="postOf_subLayerId">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="ward_id">ward id</label> <select
																						class="form-control pb-1" id="postOf_ward"
																						name="ward_id">
																						
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
																					<label for="shopping_mall_name">Post Office Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="postOf_name"
																						name="shopping_mall_name" placeholder="Enter Post Office Name">
																				</div>
																					<div class="form-group">
																					<label for="address">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="postOf_address"
																						name="address" placeholder="Enter Address">
																				</div>
																			
																			</div>
																			<div class="col-sm-12 col-lg-6">
																		
																				<div class="form-group">
																					<label for="parking">Type Of Post Office</label> <select
																						class="form-control pb-1" id="postOf_type"
																						name="type_of_post_office">
																							<option value="">Select Type of Post Office</option>
																							<option value="1">Public (bharat)</option>
																							<option value="2">Private (Speed Post)</option>
																							<option value="3">Transport</option>
																							<option value="4">Cargo</option>
																						</select>
																				</div>
																			</div>
																		</div>
																	</div>
																	
																	<button type="button" name="previous" class="previous action-button-previous float-left">
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
																			<label for="geo_tagged_photo">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="postOf_geo_tagged_photo"
																				name="geo_tagged_photo">
																		</div>
																		
																	</div>
																		
																	<button type="button" name="previous" class="previous action-button-previous float-left">
																	 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" name="addPostOf"  id ="addPostOf" class="btn btn-indore mt-3"	value="Submit" />
																		
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

<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
<script src="${context}/js/utils.js"></script>
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/designer/postOffice.js"></script>


</body>
</html>