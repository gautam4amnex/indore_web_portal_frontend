<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Town & Country Planning Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data-toggle="tab" href="#town_planning">T&C Planning</a></li>
				
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="town_planning">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addTownPlanning_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of T&C Planning</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>
				
				
<!-- 					ADD TOWN PLANNING MODAL START -->

					<div class="modal fade" id="dep_addTownPlanning_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add T&C Planning</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

<!-- 														<div class="col-4 text-left ml-3"> -->
<!-- 															<form class="form-admin"> -->
<!-- 																<div class="form-group"> -->
<!-- 																	<label for="selectType" class="ml-2">Select -->
<!-- 																		Type</label> <select class="form-control pb-1" id="selectType"> -->
<!-- 																		<option>Select Type</option> -->
<!-- 																		<option value=" ">2</option> -->
<!-- 																		<option value=" ">3</option> -->
<!-- 																		<option value=" ">4</option> -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</form> -->
<!-- 														</div> -->
														<div class="col-md-12 mx-0">

															<form id="msform" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanning_latitude" 
																						name="townPlanning_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="townPlanning_ward" name="townPlanning_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input -->
<!-- 																						type="text" class="form-control" id="townPlanning_plotNo"  -->
<!-- 																						name="townPlanning_plotNo" placeholder="Enter Plot No"> -->
<!-- 																				</div> -->
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanning_longitude" name="townPlanning_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="townPlanning_zone" name="townPlanning_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>
																		</div>
																	</div>

																	<button type="button" name="next"
																		class="next action-button float-right">
																	<i class="fa fa-angle-right" aria-hidden="true"></i>
																	</button>

																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Basic Info</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="loWardno">Land Use Category<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="townPlanning_landUseCategory" name="townPlanning_landUseCategory">
																						<option>Select Land Use Category</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Total Planning Area</label> <input
																						type="text" class="form-control" id="townPlanning_totalPlanningArea"
																						name="townPlanning_totalPlanningArea" placeholder="Enter Total Planning Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanning_length"
																						name="townPlanning_length" placeholder="Enter Length">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="townPlanning_remarks" name="townPlanning_remarks"
																						placeholder="Enter Remarks"></textarea>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Development Permissions<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanning_developmentPermissions"
																						name="townPlanning_developmentPermissions" placeholder="Enter Development Permissions">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanning_roadWidth"
																						name="townPlanning_roadWidth" placeholder="Enter Road Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Total IMC Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanning_totalIMCArea"
																						name="townPlanning_totalIMCArea" placeholder="Enter Total IMC Area">
																				</div>
																				
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<button type="button" name="next"
																		class="next action-button float-right">
																	<i class="fa fa-angle-right" aria-hidden="true"></i>
																	</button>
																</fieldset>
																
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="townPlanning_geoTaggedPhoto" 
																				name="townPlanning_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit"
																		name="finalinfosubmit" class="btn btn-indore mt-3"
																		value="Submit" />
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
					
<!-- 					ADD TOWN PLANNING MODAL END -->
					
					<!--UPDATE TOWN PLANNING Modal start -->
					
					<div class="modal fade" id="dep_updateTownPlanning_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update T&C Planning</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

<!-- 														<div class="col-4 text-left ml-3"> -->
<!-- 															<form class="form-admin"> -->
<!-- 																<div class="form-group"> -->
<!-- 																	<label for="selectType" class="ml-2">Select -->
<!-- 																		Type</label> <select class="form-control pb-1" id="selectType"> -->
<!-- 																		<option>Select Type</option> -->
<!-- 																		<option value=" ">2</option> -->
<!-- 																		<option value=" ">3</option> -->
<!-- 																		<option value=" ">4</option> -->
<!-- 																	</select> -->
<!-- 																</div> -->
<!-- 															</form> -->
<!-- 														</div> -->
														<div class="col-md-12 mx-0">

															<form id="msform" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanningUp_latitude" 
																						name="townPlanningUp_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="townPlanningUp_ward" name="townPlanningUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input -->
<!-- 																						type="text" class="form-control" id="townPlanningUp_plotNo"  -->
<!-- 																						name="townPlanningUp_plotNo" placeholder="Enter Plot No"> -->
<!-- 																				</div> -->
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanningUp_longitude" name="townPlanningUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="townPlanningUp_zone" name="townPlanningUp_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>
																		</div>
																	</div>

																	<button type="button" name="next"
																		class="next action-button float-right">
																	<i class="fa fa-angle-right" aria-hidden="true"></i>
																	</button>

																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Basic Info</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="loWardno">Land Use Category<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="townPlanningUp_landUseCategory" name="townPlanningUp_landUseCategory">
																						<option>Select Land Use Category</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Total Planning Area</label> <input
																						type="text" class="form-control" id="townPlanningUp_totalPlanningArea"
																						name="townPlanningUp_totalPlanningArea" placeholder="Enter Total Planning Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanningUp_length"
																						name="townPlanningUp_length" placeholder="Enter Length">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="townPlanningUp_remarks" name="townPlanningUp_remarks"
																						placeholder="Enter Remarks"></textarea>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Development Permissions<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanningUp_developmentPermissions"
																						name="townPlanningUp_developmentPermissions" placeholder="Enter Development Permissions">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanningUp_roadWidth"
																						name="townPlanningUp_roadWidth" placeholder="Enter Road Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Total IMC Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="townPlanningUp_totalIMCArea"
																						name="townPlanningUp_totalIMCArea" placeholder="Enter Total IMC Area">
																				</div>
																				
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<button type="button" name="next"
																		class="next action-button float-right">
																	<i class="fa fa-angle-right" aria-hidden="true"></i>
																	</button>
																</fieldset>
																
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="townPlanningUp_geoTaggedPhoto" 
																				name="townPlanningUp_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit"
																		name="finalinfosubmit" class="btn btn-indore mt-3"
																		value="Submit" />
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
					
					
					<!--UPDATE TOWN PLANNING Modal end -->
					

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

<%-- <script type="text/javascript" src="${context}/js/designer/health_dep.js"></script> --%>

</body>
</html>