<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Public Health Engineer Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data-toggle="tab" href="#phe_waterSupplyLine">Water Supply Line</a></li>
				<li class="nav-item"><a class="nav-link"
					data-toggle="tab" href="#phe_tubeWell">Tube Well</a></li>
				<li class="nav-item"><a class="nav-link"
					data-toggle="tab" href="#phe_waterValves">Water Valves</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="phe_waterSupplyLine">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addWaterSupplyLine_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Water Supply Lines</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					<!--Water Supply Line add Modal start -->
					
					<div class="modal fade" id="dep_addWaterSupplyLine_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Water Supply Line</h4>
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
																					<label for="loLatitude">Latitude</label> <input
																						type="text" class="form-control" id="waterSupplyLine_latitude" name="waterSupplyLine_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="waterSupplyLine_ward" name="waterSupplyLine_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="waterSupplyLine_longitude" name="waterSupplyLine_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="waterSupplyLine_zone" name="waterSupplyLine_zone">
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
																					<label for="hsName">Road Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_roadName"
																						name="waterSupplyLine_roadName" placeholder="Enter Road Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Pipe Age<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_pipeAge"
																						name="waterSupplyLine_pipeAge" placeholder="Enter Pipe Age">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Length in Meters<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_lengthInMeters"
																						name="waterSupplyLine_lengthInMeters" placeholder="Enter Length in Meters">
																				</div>
																						
																				<div class="form-group">
																					<label for="hsName">Slope<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_slope"
																						name="waterSupplyLine_slope" placeholder="Enter Slope">
																				</div>
																						
																				<div class="form-group">
																					<label for="hsName">Pressure<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_pressure"
																						name="waterSupplyLine_pressure" placeholder="Enter Pressure">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Joint Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_jointLength"
																						name="waterSupplyLine_jointLength" placeholder="Enter Joint Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Roadside<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_roadside"
																						name="waterSupplyLine_roadside" placeholder="Enter Roadside">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Downstream<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_downstream"
																						name="waterSupplyLine_downstream" placeholder="Enter Downstream">
																				</div>	
																				
																				<div class="form-group">
																					<label for="loWardno">Pipe Material</label> <select
																						class="form-control pb-1" id="waterSupplyLine_pipeMaterial" name="waterSupplyLine_pipeMaterial">
																						<option>Select Pipe Material</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Enabled</label> 
																				</div>
																				<div class="form-group">	
																					<input type="radio" id="waterSupplyLine_enabled1" 
																						name="waterSupplyLine_enabled" value="true">Yes
																					<input type="radio" id="waterSupplyLine_enabled2" 
 																					name="waterSupplyLine_enabled" value="false">No
																				</div>
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Road No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_roadNo"
																						name="waterSupplyLine_roadNo" placeholder="Enter Road No">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Pipe Type</label> <select
																						class="form-control pb-1" id="waterSupplyLine_pipeType" name="waterSupplyLine_pipeType">
																						<option>Select Pipe Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Water Supply Line ID<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_waterSupplyLineID"
																						name="waterSupplyLine_waterSupplyLineID" placeholder="Enter Water Supply Line ID">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Depth in Meters<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_depthInMeters"
																						name="waterSupplyLine_depthInMeters" placeholder="Enter Depth in Meters">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Roughness<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_roughness"
																						name="waterSupplyLine_roughness" placeholder="Enter Roughness">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Layer<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_layer"
																						name="waterSupplyLine_layer" placeholder="Enter Layer">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Upstream<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_upstream"
																						name="waterSupplyLine_upstream" placeholder="Enter Upstream">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Diameter in mm<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLine_diameterInMm"
																						name="waterSupplyLine_diameterInMm" placeholder="Enter Diameter in mm">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Date Installed<span class="mandatory">*</span></label> <input 
																					type="text" class="form-control datepicker-dept" id="waterSupplyLine_dateInstalled" 
																					name="waterSupplyLine_dateInstalled" placeholder="Select Date Installed">
																				</div>
																				
																				<div class="form-group">
																					<label for="scName">Remarks</label> 
																					<textarea class="form-control" rows="2" id="waterSupplyLine_remarks"
																						name="waterSupplyLine_remarks" placeholder="Enter Remarks"></textarea>
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
																			<label for="upScimages">Upload Images</label> <input
																				type="file" multiple class="form-control" id="waterSupplyLine_geoTaggedPhoto" 
																				name="waterSupplyLine_geoTaggedPhoto">
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
					
					<!--Water Supply Line Add Modal end -->
	
	
					<!--Water Supply Line Update Modal start -->
									
					<div class="modal fade" id="dep_updateWaterSupplyLine_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Water Supply Line</h4>
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
																					<label for="loLatitude">Latitude</label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_latitude" name="waterSupplyLineUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="waterSupplyLineUp_ward" name="waterSupplyLineUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_longitude" name="waterSupplyLineUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="waterSupplyLineUp_zone" name="waterSupplyLineUp_zone">
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
																					<label for="hsName">Road Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_roadName"
																						name="waterSupplyLineUp_roadName" placeholder="Enter Road Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Pipe Age<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_pipeAge"
																						name="waterSupplyLineUp_pipeAge" placeholder="Enter Pipe Age">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Length in Meters<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_lengthInMeters"
																						name="waterSupplyLineUp_lengthInMeters" placeholder="Enter Length in Meters">
																				</div>
																						
																				<div class="form-group">
																					<label for="hsName">Slope<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_slope"
																						name="waterSupplyLineUp_slope" placeholder="Enter Slope">
																				</div>
																						
																				<div class="form-group">
																					<label for="hsName">Pressure<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_pressure"
																						name="waterSupplyLineUp_pressure" placeholder="Enter Pressure">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Joint Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_jointLength"
																						name="waterSupplyLineUp_jointLength" placeholder="Enter Joint Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Roadside<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_roadside"
																						name="waterSupplyLineUp_roadside" placeholder="Enter Roadside">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Downstream<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_downstream"
																						name="waterSupplyLineUp_downstream" placeholder="Enter Downstream">
																				</div>	
																				
																				<div class="form-group">
																					<label for="loWardno">Pipe Material</label> <select
																						class="form-control pb-1" id="waterSupplyLineUp_pipeMaterial" name="waterSupplyLineUp_pipeMaterial">
																						<option>Select Pipe Material</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Enabled</label> 
																				</div>
																				<div class="form-group">	
																					<input type="radio" id="waterSupplyLineUp_enabled1" 
																						name="waterSupplyLineUp_enabled" value="true">Yes
																					<input type="radio" id="waterSupplyLineUp_enabled2" 
 																					name="waterSupplyLineUp_enabled" value="false">No
																				</div>
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Road No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_roadNo"
																						name="waterSupplyLineUp_roadNo" placeholder="Enter Road No">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Pipe Type</label> <select
																						class="form-control pb-1" id="waterSupplyLineUp_pipeType" name="waterSupplyLineUp_pipeType">
																						<option>Select Pipe Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Water Supply Line ID<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_waterSupplyLineID"
																						name="waterSupplyLineUp_waterSupplyLineID" placeholder="Enter Water Supply Line ID">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Depth in Meters<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_depthInMeters"
																						name="waterSupplyLineUp_depthInMeters" placeholder="Enter Depth in Meters">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Roughness<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_roughness"
																						name="waterSupplyLineUp_roughness" placeholder="Enter Roughness">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Layer<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_layer"
																						name="waterSupplyLineUp_layer" placeholder="Enter Layer">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Upstream<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_upstream"
																						name="waterSupplyLineUp_upstream" placeholder="Enter Upstream">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Diameter in mm<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterSupplyLineUp_diameterInMm"
																						name="waterSupplyLineUp_diameterInMm" placeholder="Enter Diameter in mm">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Date Installed<span class="mandatory">*</span></label> <input 
																					type="text" class="form-control datepicker-dept" id="waterSupplyLineUp_dateInstalled" 
																					name="waterSupplyLineUp_dateInstalled" placeholder="Select Date Installed">
																				</div>
																				
																				<div class="form-group">
																					<label for="scName">Remarks</label> 
																					<textarea class="form-control" rows="2" id="waterSupplyLineUp_remarks"
																						name="waterSupplyLineUp_remarks" placeholder="Enter Remarks"></textarea>
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
																			<label for="upScimages">Upload Images</label> <input
																				type="file" multiple class="form-control" id="waterSupplyLineUp_geoTaggedPhoto" 
																				name="waterSupplyLineUp_geoTaggedPhoto">
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
					
					
					<!--Water Supply Line Update Modal end -->
					

				</div>
				
				<div class="tab-pane container-fluid" id="phe_tubeWell">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addTubeWell_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Tube Wells</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					<!--Tube Well add Modal start -->
					
					<div class="modal fade" id="dep_addTubeWell_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Tube Well</h4>
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
																					<label for="loLatitude">Latitude</label> <input
																						type="text" class="form-control" id="tubeWell_latitude" name="tubeWell_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="tubeWell_ward" name="tubeWell_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="tubeWell_longitude" name="tubeWell_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="tubeWell_zone" name="tubeWell_zone">
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
																					<label for="hsName">Road Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWell_roadName"
																						name="tubeWell_roadName" placeholder="Enter Road Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Tube Well Age<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWell_tubeWellAge"
																						name="tubeWell_tubeWellAge" placeholder="Enter Tube Well Age">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Last Maintenance<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWell_lastMaintenance"
																						name="tubeWell_lastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																						
																				<div class="form-group">
																					<label for="hsName">Manufacture<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWell_manufacture"
																						name="tubeWell_manufacture" placeholder="Enter Manufacture">
																				</div>
																				
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Enabled</label> 
																				</div>
																				<div class="form-group">	
																					<input type="radio" id="tubeWell_enabled1" 
																						name="tubeWell_enabled" value="true">Yes
																					<input type="radio" id="tubeWell_enabled2" 
 																					name="tubeWell_enabled" value="false">No
																				</div>
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Road No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWell_roadNo"
																						name="tubeWell_roadNo" placeholder="Enter Road No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Date of Installation<span class="mandatory">*</span></label> <input 
																					type="text" class="form-control datepicker-dept" id="tubeWell_dateOfInstallation" 
																					name="tubeWell_dateOfInstallation" placeholder="Select Date Installation">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Condition<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWell_condition"
																						name="tubeWell_condition" placeholder="Enter Condition">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Diameter<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWell_diameter"
																						name="tubeWell_diameter" placeholder="Enter Diameter">
																				</div>
																				
																				<div class="form-group">
																					<label for="scName">Remarks</label> 
																					<textarea class="form-control" rows="2" id="tubeWell_remarks"
																						name="tubeWell_remarks" placeholder="Enter Remarks"></textarea>
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
																			<label for="upScimages">Upload Images</label> <input
																				type="file" multiple class="form-control" id="tubeWell_geoTaggedPhoto" 
																				name="tubeWell_geoTaggedPhoto">
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
					
					<!--Tube Well add Modal end -->
					
					
					
					<!--Tube Well UPDATE Modal start -->
					
					<div class="modal fade" id="dep_updateTubeWell_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Tube Well</h4>
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
																					<label for="loLatitude">Latitude</label> <input
																						type="text" class="form-control" id="tubeWellUp_latitude" name="tubeWellUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="tubeWellUp_ward" name="tubeWellUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="tubeWellUp_longitude" name="tubeWellUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="tubeWellUp_zone" name="tubeWellUp_zone">
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
																					<label for="hsName">Road Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWellUp_roadName"
																						name="tubeWellUp_roadName" placeholder="Enter Road Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Tube Well Age<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWellUp_tubeWellAge"
																						name="tubeWellUp_tubeWellAge" placeholder="Enter Tube Well Age">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Last Maintenance<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWellUp_lastMaintenance"
																						name="tubeWellUp_lastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																						
																				<div class="form-group">
																					<label for="hsName">Manufacture<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWellUp_manufacture"
																						name="tubeWellUp_manufacture" placeholder="Enter Manufacture">
																				</div>
																				
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Enabled</label> 
																				</div>
																				<div class="form-group">	
																					<input type="radio" id="tubeWellUp_enabled1" 
																						name="tubeWellUp_enabled" value="true">Yes
																					<input type="radio" id="tubeWellUp_enabled2" 
 																					name="tubeWellUp_enabled" value="false">No
																				</div>
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Road No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWellUp_roadNo"
																						name="tubeWellUp_roadNo" placeholder="Enter Road No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Date of Installation<span class="mandatory">*</span></label> <input 
																					type="text" class="form-control datepicker-dept" id="tubeWellUp_dateOfInstallation" 
																					name="tubeWellUp_dateOfInstallation" placeholder="Select Date Installation">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Condition<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWellUp_condition"
																						name="tubeWellUp_condition" placeholder="Enter Condition">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Diameter<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="tubeWellUp_diameter"
																						name="tubeWellUp_diameter" placeholder="Enter Diameter">
																				</div>
																				
																				<div class="form-group">
																					<label for="scName">Remarks</label> 
																					<textarea class="form-control" rows="2" id="tubeWellUp_remarks"
																						name="tubeWellUp_remarks" placeholder="Enter Remarks"></textarea>
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
																			<label for="upScimages">Upload Images</label> <input
																				type="file" multiple class="form-control" id="tubeWellUp_geoTaggedPhoto" 
																				name="tubeWellUp_geoTaggedPhoto">
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
					
					<!--Tube Well UPDATE Modal end -->
					
				</div>
				
				
				<div class="tab-pane container-fluid" id="phe_waterValves">
				
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addWaterValves_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Water Valves</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

<!-- 					ADD Water Valves MODAL START -->

					<div class="modal fade" id="dep_addWaterValves_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Water Valves</h4>
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
																					<label for="loLatitude">Latitude</label> <input
																						type="text" class="form-control" id="waterValves_latitude" name="waterValves_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="waterValves_ward" name="waterValves_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="waterValves_longitude" name="waterValves_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="waterValves_zone" name="waterValves_zone">
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
																					<label for="hsName">Water Valve Type<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValves_type"
																						name="waterValves_type" placeholder="Enter Water Valve Type">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Valve Age<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValves_valveAge"
																						name="waterValves_valveAge" placeholder="Enter Valve Age">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Date of Installation<span class="mandatory">*</span></label> <input 
																					type="text" class="form-control datepicker-dept" id="waterValves_dateOfInstallation" 
																					name="waterValves_dateOfInstallation" placeholder="Select Date Installation">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Condition<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValves_condition"
																						name="waterValves_condition" placeholder="Enter Condition">
																				</div>
																				
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Enabled</label> 
																				</div>
																				<div class="form-group">	
																					<input type="radio" id="waterValves_enabled1" 
																						name="waterValves_enabled" value="true">Yes
																					<input type="radio" id="waterValves_enabled2" 
 																					name="waterValves_enabled" value="false">No
																				</div>
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Valve Material<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValves_valveMaterial"
																						name="waterValves_valveMaterial" placeholder="Enter Valve Material">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Water Zone_ID<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValves_condition"
																						name="waterValves_condition" placeholder="Enter Condition">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hsName">Last Maintenance<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValves_lastMaintenance"
																						name="waterValves_lastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hsName">Diameter in mm<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValves_diameterInMm"
																						name="waterValves_diameterInMm" placeholder="Enter Diameter in mm">
																				</div>
																				
																				<div class="form-group">
																					<label for="scName">Remarks</label> 
																					<textarea class="form-control" rows="2" id="waterValves_remarks"
																						name="waterValves_remarks" placeholder="Enter Remarks"></textarea>
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
																			<label for="upScimages">Upload Images</label> <input
																				type="file" multiple class="form-control" id="waterValves_geoTaggedPhoto" 
																				name="waterValves_geoTaggedPhoto">
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

<!-- 					ADD Water Valves MODAL END -->
				
				
<!-- 					UPDATE Water Valves MODAL START -->
					
					<div class="modal fade" id="dep_updateWaterValves_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Water Valves</h4>
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
																					<label for="loLatitude">Latitude</label> <input
																						type="text" class="form-control" id="waterValvesUp_latitude" name="waterValvesUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="waterValvesUp_ward" name="waterValvesUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="waterValvesUp_longitude" name="waterValvesUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="waterValvesUp_zone" name="waterValvesUp_zone">
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
																					<label for="hsName">Water Valve Type<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValvesUp_type"
																						name="waterValvesUp_type" placeholder="Enter Water Valve Type">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Valve Age<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValvesUp_valveAge"
																						name="waterValvesUp_valveAge" placeholder="Enter Valve Age">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Date of Installation<span class="mandatory">*</span></label> <input 
																					type="text" class="form-control datepicker-dept" id="waterValvesUp_dateOfInstallation" 
																					name="waterValvesUp_dateOfInstallation" placeholder="Select Date Installation">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Condition<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValvesUp_condition"
																						name="waterValvesUp_condition" placeholder="Enter Condition">
																				</div>
																				
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Enabled</label> 
																				</div>
																				<div class="form-group">	
																					<input type="radio" id="waterValvesUp_enabled1" 
																						name="waterValvesUp_enabled" value="true">Yes
																					<input type="radio" id="waterValvesUp_enabled2" 
 																					name="waterValvesUp_enabled" value="false">No
																				</div>
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Valve Material<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValvesUp_valveMaterial"
																						name="waterValvesUp_valveMaterial" placeholder="Enter Valve Material">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Water Zone_ID<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValvesUp_condition"
																						name="waterValvesUp_condition" placeholder="Enter Condition">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hsName">Last Maintenance<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValvesUp_lastMaintenance"
																						name="waterValvesUp_lastMaintenance" placeholder="Enter Last Maintenance">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hsName">Diameter in mm<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="waterValvesUp_diameterInMm"
																						name="waterValvesUp_diameterInMm" placeholder="Enter Diameter in mm">
																				</div>
																				
																				<div class="form-group">
																					<label for="scName">Remarks</label> 
																					<textarea class="form-control" rows="2" id="waterValvesUp_remarks"
																						name="waterValvesUp_remarks" placeholder="Enter Remarks"></textarea>
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
																			<label for="upScimages">Upload Images</label> <input
																				type="file" multiple class="form-control" id="waterValvesUp_geoTaggedPhoto" 
																				name="waterValvesUp_geoTaggedPhoto">
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
					
<!-- 					UPDATE Water Valves MODAL END -->
				
				
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