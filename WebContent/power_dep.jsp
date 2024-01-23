<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>MPKVVCL Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data-toggle="tab" href="#power_electricPole">Electric pole</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					href="#power_streetLight">Street light</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					href="#power_transformer">Transformers</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="power_electricPole">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addelectricpole_modal"
							class="btn-add btn-indore-table">Add Electric Pole</button>
					</div>

					<h6 class="table-title-grid">List of Electric Poles</h6>
					<table id="dep_electricPole_table" class="display tbl_dep" class="tbl-report"></table>
				
				
<!-- 					ADD ELECTRIC POLE MODAL START -->
					<div class="modal fade" id="dep_addelectricpole_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Electric Pole</h4>
									<button type="button" class="close" onclick="resetForm('form_addElectricPole')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addElectricPole" name="form_addElectricPole" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li> -->
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="electricPole_latitude" name="electricPole_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward <select
																						class="form-control pb-1" id="electricPole_ward" name="electricPole_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="electricPole_longitude" name="electricPole_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="electricPole_subLayerId" name="electricPole_subLayerId">
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
																					<label for="hsName">Paint Code</label> <input
																						type="text" class="form-control" id="electricPole_paintCode"
																						name="electricPole_paintCode" placeholder="Enter Paint Code">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Electric Pole Type</label> <select
																						class="form-control pb-1" id="electricPole_type" name="electricPole_type">
																						<option>Select Electric Pole Type</option>
																						<option value="High">High</option>
																						<option value="Medium">Medium</option>
																						<option value="Low">Low</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">In Progress</label> <select
																						class="form-control pb-1" id="electricPole_inProgress" name="electricPole_inProgress">
																						<option>Select In Progress</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Height in Meters</label> <input
																						type="text" class="form-control" id="electricPole_heightInMeters"
																						name="electricPole_heightInMeters" placeholder="Enter Height in Meters">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsConNo">Last Maintenance</label> <input
																						type="text" class="form-control" id="electricPole_LastMaintenance"
																						name="electricPole_LastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																				
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
<!-- 																	<button type="button" name="next" -->
<!-- 																		class="next action-button float-right"> -->
<!-- 																	<i class="fa fa-angle-right" aria-hidden="true"></i> -->
<!-- 																	</button> -->
																	<input type="submit"
																		name="finalinfosubmit" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input -->
<!-- 																				type="file" multiple class="form-control" id="electricPole_geoTaggedPhoto"  -->
<!-- 																				name="electricPole_geoTaggedPhoto"> -->
<!-- 																		</div> -->
<!-- 																		<ul class="imageslist"></ul> -->
<!-- 																	</div> -->
<!-- 																	<button type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left"> -->
<!-- 																		 <i class="fa fa-angle-left" aria-hidden="true"></i> -->
<!-- 																	</button>	 -->
<!-- 																	<input type="submit" -->
<!-- 																		name="finalinfosubmit" class="btn btn-indore mt-3" -->
<!-- 																		value="Submit" /> -->
<!-- 																</fieldset> -->
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
					
<!-- 					ADD ELECTRIC POLE MODAL END -->
					
					<!--UPDATE ELECTRIC POLE Modal start -->
					
					<div class="modal fade" id="dep_updateelectricpole_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Electric Pole</h4>
						<button type="button" class="close" onclick="resetForm('form_updateElectricPole')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateElectricPole" name="form_updateElectricPole" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li> -->
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="electricPoleUp_latitude" name="electricPoleUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="electricPoleUp_ward" name="electricPoleUp_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="electricPoleUp_longitude" name="electricPoleUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="electricPoleUp_subLayerId" name="electricPoleUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="electricPoleUp_electricPoleId" name="electricPoleUp_electricPoleId">
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
																					<label for="hsName">Paint Code</label> <input
																						type="text" class="form-control" id="electricPoleUp_paintCode"
																						name="electricPoleUp_paintCode" placeholder="Enter Paint Code">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Electric Pole Type</label> <select
																						class="form-control pb-1" id="electricPoleUp_type" name="electricPoleUp_type">
																						<option>Select Electric Pole Type</option>
																						<option value="High">High</option>
																						<option value="Medium">Medium</option>
																						<option value="Low">Low</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">In Progress</label> <select
																						class="form-control pb-1" id="electricPoleUp_inProgress" name="electricPoleUp_inProgress">
																						<option>Select In Progress</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Height in Meters</label> <input
																						type="text" class="form-control" id="electricPoleUp_heightInMeters"
																						name="electricPoleUp_heightInMeters" placeholder="Enter Height in Meters">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsConNo">Last Maintenance</label> <input
																						type="text" class="form-control" id="electricPoleUp_LastMaintenance"
																						name="electricPoleUp_LastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																				
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
<!-- 																	<button type="button" name="next" -->
<!-- 																		class="next action-button float-right"> -->
<!-- 																	<i class="fa fa-angle-right" aria-hidden="true"></i> -->
<!-- 																	</button> -->
																	<input type="submit"
																		name="finalinfosubmit" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input -->
<!-- 																				type="file" multiple class="form-control" id="electricPoleUp_geoTaggedPhoto"  -->
<!-- 																				name="electricPoleUp_geoTaggedPhoto"> -->
<!-- 																		</div> -->
<!-- 																		<ul class="imageslist"></ul> -->
<!-- 																	</div> -->
<!-- 																	<button type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left"> -->
<!-- 																		 <i class="fa fa-angle-left" aria-hidden="true"></i> -->
<!-- 																	</button>	 -->
<!-- 																	<input type="submit" -->
<!-- 																		name="finalinfosubmit" class="btn btn-indore mt-3" -->
<!-- 																		value="Submit" /> -->
<!-- 																</fieldset> -->
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
					
					
					<!--UPDATE ELECTRIC POLE Modal end -->
					

				</div>
				
				
				<div class="tab-pane container-fluid fade" id="power_streetLight">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addstreetlight_modal"
						class="btn-add btn-indore-table">Add Street Light</button>
					</div>

					<h6 class="table-title-grid">List of Street Lights</h6>
					<table id="dep_streetLight_table" class="display tbl_dep" class="tbl-report"></table>
					
					
<!-- 					ADD Street Light MODAL START -->
					<div class="modal fade" id="dep_addstreetlight_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Street Light</h4>
									<button type="button" class="close" onclick="resetForm('form_addStreetLight')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addStreetLight" name="form_addStreetLight" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li> -->
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="streetLight_latitude" name="streetLight_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="streetLight_ward" name="streetLight_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="streetLight_longitude" name="streetLight_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="streetLight_subLayerId" name="streetLight_subLayerId">
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
																					<label for="hsName">Street Light ID</label> <input
																						type="text" class="form-control" id="streetLight_stid"
																						name="streetLight_stid" placeholder="Enter Street Light ID">
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Street Light Type</label> <select
																						class="form-control pb-1" id="streetLight_type" name="streetLight_type">
																						<option>Select Street Light Type</option>
																						<option value="LED">LED</option>
																						<option value="LCD">LCD</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Watt's</label> <input
																						type="text" class="form-control" id="streetLight_watts"
																						name="streetLight_watts" placeholder="Enter Watt's">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Automatic On/Off</label> <select
																						class="form-control pb-1" id="streetLight_automaticOnOff" name="streetLight_automaticOnOff">
																						<option>Select</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Height in Meters</label> <input
																						type="text" class="form-control" id="streetLight_heightInMeters"
																						name="streetLight_heightInMeters" placeholder="Enter Height in Meters">
																				</div>
																			
																				<div class="form-group">
																					<label for="loWardno">Street Light Category</label> <select
																						class="form-control pb-1" id="streetLight_category" name="streetLight_category">
																						<option>Select Street Light Category</option>
																						<option value="ESPL">ESPL</option>
																						<option value="SL">SL</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsConNo">Last Maintenance</label> <input
																						type="text" class="form-control" id="streetLight_lastMaintenance"
																						name="streetLight_lastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																				
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
<!-- 																	<button type="button" name="next" -->
<!-- 																		class="next action-button float-right"> -->
<!-- 																	<i class="fa fa-angle-right" aria-hidden="true"></i> -->
<!-- 																	</button> -->
																	<input type="submit"
																		name="finalinfosubmit" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images</label> <input -->
<!-- 																				type="file" multiple class="form-control" id="streetLight_geoTaggedPhoto"  -->
<!-- 																				name="streetLight_geoTaggedPhoto"> -->
<!-- 																		</div> -->
<!-- 																		<ul class="imageslist"></ul> -->
<!-- 																	</div> -->
<!-- 																	<button type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left"> -->
<!-- 																		 <i class="fa fa-angle-left" aria-hidden="true"></i> -->
<!-- 																	</button>	 -->
<!-- 																	<input type="submit" -->
<!-- 																		name="finalinfosubmit" class="btn btn-indore mt-3" -->
<!-- 																		value="Submit" /> -->
<!-- 																</fieldset> -->
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
					
<!-- 					ADD Street Light END -->
					
<!-- 					UPDATE Street Light MODAL START -->
					
					<div class="modal fade" id="dep_updatestreetlight_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Street Light</h4>
										<button type="button" class="close" onclick="resetForm('form_updateStreetLight')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateStreetLight" name="form_updateStreetLight" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li> -->
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="streetLightUp_latitude" name="streetLightUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="streetLightUp_ward" name="streetLightUp_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="streetLightUp_longitude" name="streetLightUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="streetLightUp_subLayerId" name="streetLightUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="streetLightUp_streetLightId" name="streetLightUp_streetLightId">
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
																					<label for="hsName">Street Light ID</label> <input
																						type="text" class="form-control" id="streetLightUp_stid"
																						name="streetLightUp_stid" placeholder="Enter Street Light ID">
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Street Light Type</label> <select
																						class="form-control pb-1" id="streetLightUp_type" name="streetLightUp_type">
																						<option>Select Street Light Type</option>
																						<option value="LED">LED</option>
																						<option value="LCD">LCD</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Watt's</label> <input
																						type="text" class="form-control" id="streetLightUp_watts"
																						name="streetLightUp_watts" placeholder="Enter Watt's">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Automatic On/Off</label> <select
																						class="form-control pb-1" id="streetLightUp_automaticOnOff" name="streetLightUp_automaticOnOff">
																						<option>Select</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Height in Meters</label> <input
																						type="text" class="form-control" id="streetLightUp_heightInMeters"
																						name="streetLightUp_heightInMeters" placeholder="Enter Height in Meters">
																				</div>
																			
																				<div class="form-group">
																					<label for="loWardno">Street Light Category</label> <select
																						class="form-control pb-1" id="streetLightUp_category" name="streetLightUp_category">
																						<option>Select Street Light Category</option>
																						<option value="ESPL">ESPL</option>
																						<option value="SL">SL</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsConNo">Last Maintenance</label> <input
																						type="text" class="form-control" id="streetLightUp_lastMaintenance"
																						name="streetLightUp_lastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																				
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
<!-- 																	<button type="button" name="next" -->
<!-- 																		class="next action-button float-right"> -->
<!-- 																	<i class="fa fa-angle-right" aria-hidden="true"></i> -->
<!-- 																	</button> -->
																	<input type="submit"
																		name="finalinfosubmit" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images</label> <input -->
<!-- 																				type="file" multiple class="form-control" id="streetLightUp_geoTaggedPhoto"  -->
<!-- 																				name="streetLightUp_geoTaggedPhoto"> -->
<!-- 																		</div> -->
<!-- 																		<ul class="imageslist"></ul> -->
<!-- 																	</div> -->
<!-- 																	<button type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left"> -->
<!-- 																		 <i class="fa fa-angle-left" aria-hidden="true"></i> -->
<!-- 																	</button>	 -->
<!-- 																	<input type="submit" -->
<!-- 																		name="finalinfosubmit" class="btn btn-indore mt-3" -->
<!-- 																		value="Submit" /> -->
<!-- 																</fieldset> -->
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
					
					
<!-- 					UPDATE Street Light MODAL END -->
					
					
				</div>
				
				<div class="tab-pane container-fluid fade" id="power_transformer">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addtransformer_modal"
						class="btn-add btn-indore-table">Add Transformer</button>
					</div>

					<h6 class="table-title-grid">List of Transformers</h6>
					<table id="dep_transformers_table" class="display tbl_dep" class="tbl-report"></table>
					
					<!-- 	ADD Transformer MODAL START -->
					
					<div class="modal fade" id="dep_addtransformer_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Transformer</h4>
									<button type="button" class="close" onclick="resetForm('form_addTransformers')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addTransformers" name="form_addTransformers" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li> -->
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="transformer_latitude" name="transformer_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="transformer_ward" name="transformer_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="transformer_longitude" name="transformer_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="transformer_subLayerId" name="transformer_subLayerId">
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
																					<label for="hsName">Transformer ID</label> <input
																						type="text" class="form-control" id="transformer_tid"
																						name="transformer_tid" placeholder="Enter Transformer ID">
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Transformer Type</label> <select
																						class="form-control pb-1" id="transformer_type" name="transformer_type">
																						<option>Select Transformer Type</option>
																						<option value="High">High</option>
																						<option value="Medium">Medium</option>
																						<option value="Low">Low</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Sub-station Name</label> <input
																						type="text" class="form-control" id="transformer_subStationName"
																						name="transformer_subStationName" placeholder="Enter Sub-station Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Line Operator Name</label> <input
																						type="text" class="form-control" id="transformer_lineOperatorName"
																						name="transformer_lineOperatorName" placeholder="Enter Line Operator Name">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Volts in Watt's</label> <input
																						type="text" class="form-control" id="transformer_watts"
																						name="transformer_watts" placeholder="Enter Volts in Watt's">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsConNo">Last Maintenance</label> <input
																						type="text" class="form-control" id="transformer_lastMaintenance"
																						name="transformer_lastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Sub Engineer</label> <input
																						type="text" class="form-control" id="transformer_subEngineer"
																						name="transformer_subEngineer" placeholder="Enter Sub Engineer">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Phone No</label> <input
																						type="text" class="form-control" id="transformer_phoneNo"
																						name="transformer_phoneNo" placeholder="Enter Phone No">
																				</div>
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
<!-- 																	<button type="button" name="next" -->
<!-- 																		class="next action-button float-right"> -->
<!-- 																	<i class="fa fa-angle-right" aria-hidden="true"></i> -->
<!-- 																	</button> -->
																	<input type="submit"
																		name="finalinfosubmit" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images</label> <input -->
<!-- 																				type="file" multiple class="form-control" id="transformer_geoTaggedPhoto"  -->
<!-- 																				name="transformer_geoTaggedPhoto"> -->
<!-- 																		</div> -->
<!-- 																		<ul class="imageslist"></ul> -->
<!-- 																	</div> -->
<!-- 																	<button type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left"> -->
<!-- 																		 <i class="fa fa-angle-left" aria-hidden="true"></i> -->
<!-- 																	</button>	 -->
<!-- 																	<input type="submit" -->
<!-- 																		name="finalinfosubmit" class="btn btn-indore mt-3" -->
<!-- 																		value="Submit" /> -->
<!-- 																</fieldset> -->
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
					
					<!-- 	ADD Transformer MODAL END -->
					
					
<!-- 					UPDATE TRANSFORMER MODAL START -->
					
					<div class="modal fade" id="dep_updatetransformer_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Transformer</h4>
								<button type="button" class="close" onclick="resetForm('form_updateTransformers')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateTransformers" name="form_updateTransformers" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li> -->
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="transformerUp_latitude" name="transformerUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="transformerUp_ward" name="transformerUp_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="transformerUp_longitude" name="transformerUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="transformerUp_subLayerId" name="transformerUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="transformerUp_transformerId" name="transformerUp_transformerId">
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
																					<label for="hsName">Transformer ID</label> <input
																						type="text" class="form-control" id="transformerUp_tid"
																						name="transformerUp_tid" placeholder="Enter Transformer ID">
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Transformer Type</label> <select
																						class="form-control pb-1" id="transformerUp_type" name="transformerUp_type">
																						<option>Select Transformer Type</option>
																						<option value="High">High</option>
																						<option value="Medium">Medium</option>
																						<option value="Low">Low</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Sub-station Name</label> <input
																						type="text" class="form-control" id="transformerUp_subStationName"
																						name="transformerUp_subStationName" placeholder="Enter Sub-station Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Line Operator Name</label> <input
																						type="text" class="form-control" id="transformerUp_lineOperatorName"
																						name="transformerUp_lineOperatorName" placeholder="Enter Line Operator Name">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Volts in Watt's</label> <input
																						type="text" class="form-control" id="transformerUp_watts"
																						name="transformerUp_watts" placeholder="Enter Volts in Watt's">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsConNo">Last Maintenance</label> <input
																						type="text" class="form-control" id="transformerUp_lastMaintenance"
																						name="transformerUp_lastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Sub Engineer</label> <input
																						type="text" class="form-control" id="transformerUp_subEngineer"
																						name="transformerUp_subEngineer" placeholder="Enter Sub Engineer">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Phone No</label> <input
																						type="text" class="form-control" id="transformerUp_phoneNo"
																						name="transformerUp_phoneNo" placeholder="Enter Phone No">
																				</div>
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
<!-- 																	<button type="button" name="next" -->
<!-- 																		class="next action-button float-right"> -->
<!-- 																	<i class="fa fa-angle-right" aria-hidden="true"></i> -->
<!-- 																	</button> -->
																	<input type="submit"
																		name="finalinfosubmit" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images</label> <input -->
<!-- 																				type="file" multiple class="form-control" id="transformerUp_geoTaggedPhoto"  -->
<!-- 																				name="transformerUp_geoTaggedPhoto"> -->
<!-- 																		</div> -->
<!-- 																		<ul class="imageslist"></ul> -->
<!-- 																	</div> -->
<!-- 																	<button type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left"> -->
<!-- 																		 <i class="fa fa-angle-left" aria-hidden="true"></i> -->
<!-- 																	</button>	 -->
<!-- 																	<input type="submit" -->
<!-- 																		name="finalinfosubmit" class="btn btn-indore mt-3" -->
<!-- 																		value="Submit" /> -->
<!-- 																</fieldset> -->
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
					
<!-- 					UPDATE TRANSFORMER MODAL END -->
					
					
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
<script src="${context}/js/utils.js"></script>
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/designer/power_dep.js"></script>

</body>
</html>