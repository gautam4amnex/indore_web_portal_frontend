<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Madhya Pradesh Housing Board Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data_translate="_primary" data-toggle="tab" href="#housing_dept">Housing Board Department</a>
					</li>				
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="housing_dept">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_add_housing_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Housing Board</button>
					</div>

					<h6 class="table-title-grid" data_translate="_list_of_primary_school">List of Primary School</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					<!--Add MPHousing dept start -->
					<div class="modal fade" id="dep_add_housing_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Housing Board</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">

															<form id="form_add_housing" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder" id="basic"><strong>Basic
																			Info</strong></li>
																	<!-- <li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Facilities</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab" class="tabwithborder" id="images"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="housing_latitude">Latitude</label> <input
																						type="text" class="form-control"
																						id="housing_latitude"
																						name="housing_latitude"
																						placeholder="Enter Latitude">
																				</div>
																																						
																				<div class="form-group">
																					<label for="housing_ward">Ward No</label> <select
																						class="form-control pb-1" id="lowardName" id="housing_ward" name="housing_ward">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="housing_subLayerId" name="housing_subLayerId">
																				</div>
																																								
																			</div>

 																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="housing_longitude">Longitude</label> <input
																						type="text" class="form-control" id="housing_longitude" name="housing_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="housing_zone">Zone Name</label> <select
																						class="form-control pb-1" id="housing_zone" name="housing_zone">
																						<option>Select Zone Name</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			</div>
																		</div>
																	</div>

																	<input type="button" name="next"
																		class="next action-button float-right" value=">" />

																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Basic Info</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="housing_schNo">Scheme No</label> <input
																						type="text" class="form-control" id="housing_schNo" name="housing_schNo"
																						placeholder="Enter Scheme No">
																				</div>
																			
																				<div class="form-group">
																					<label for="housing_secType">Sector Type</label> <input
																						type="text" class="form-control" id="housing_secType" name="housing_secType"
																						placeholder="Enter Sector Type">
																				</div>		
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																					<label for="housing_incomGroup">Income Groups</label> <input
																						type="text" class="form-control" id="housing_incomGroup" name="housing_incomGroup"
																						placeholder="Enter Income Groups">
																			</div>
																			<div class="form-group">
																					<label for="housing_zonal">Zonal</label> <input
																						type="text" class="form-control" id="housing_zonal" name="housing_zonal"
																						placeholder="Enter Zonal">
																			</div>
																																					
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset>
															
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="housing_scimages">Upload Images</label> <input
																				type="file" class="form-control" id="housing_scimages" name="housing_scimages">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button"
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
					<!--Add MPHousing dept end -->
					
					
					<!-- Update MPHousing dept start -->
					<div class="modal fade" id="dep_Update_housing_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Update Housing Board</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">

															<form id="form_update_housing" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder" id="basic"><strong>Basic
																			Info</strong></li>
																	<!-- <li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Facilities</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab" class="tabwithborder" id="images"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="housing_UpLatitude">Latitude</label> <input
																						type="text" class="form-control"
																						id="housing_UpLatitude"
																						name="housing_UpLatitude"
																						placeholder="Enter Latitude">
																				</div>
																																						
																				<div class="form-group">
																					<label for="housing_UpWard">Ward No</label> <select
																						class="form-control pb-1" id="lowardName" id="housing_UpWard" name="housing_UpWard">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																																								
																			</div>

 																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="housing_UpLongitude">Longitude</label> <input
																						type="text" class="form-control" id="housing_UpLongitude" name="housing_UpLongitude"
																						placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="housing_UpZoneName">Zone Name</label> <select
																						class="form-control pb-1" id="housing_UpZoneName" name="housing_UpZoneName">
																						<option>Select Zone Name</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			</div>
																		</div>
																	</div>

																	<input type="button" name="next"
																		class="next action-button float-right" value=">" />

																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Basic Info</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="housing_UpSchNo">Scheme No</label> <input
																						type="text" class="form-control" id="housing_UpSchNo" name="housing_UpSchNo"
																						placeholder="Enter Scheme No">
																				</div>
																			
																				<div class="form-group">
																					<label for="housing_UpSecType">Sector Type</label> <input
																						type="text" class="form-control" id="housing_UpSecType" name="housing_UpSecType"
																						placeholder="Enter Sector Type">
																				</div>		
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																					<label for="housing_UpIncomGroup">Income Groups</label> <input
																						type="text" class="form-control" id="housing_UpIncomGroup" name="housing_UpIncomGroup"
																						placeholder="Enter Income Groups">
																			</div>
																			<div class="form-group">
																					<label for="housing_UpZonal">Zonal</label> <input
																						type="text" class="form-control" id="housing_UpZonal" name="housing_UpZonal"
																						placeholder="Enter Zonal">
																			</div>
																																					
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset>
															
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="housing_Upscimages">Upload Images</label> <input
																				type="file" class="form-control" id="housing_Upscimages" name="housing_Upscimages">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button"
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
					<!--Update MPHousing dept end -->

				</div>
				<div class="tab-pane container-fluid fade" id="scSecondary">

					Secondary</div>
				<div class="tab-pane container-fluid fade" id="scCollages">

					Collages</div>
				<div class="tab-pane container-fluid fade" id="scUniversities">

					Universities</div>
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

<script type="text/javascript" src="${context}/js/designer/add-data.js"></script>

</body>
</html>