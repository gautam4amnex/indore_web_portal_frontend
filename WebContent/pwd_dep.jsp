<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Public Works Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
<!-- 				<li class="nav-item"><a class="nav-link tab-data active" -->
<!-- 					data-toggle="tab" href="#pwd_roadway">Roadway</a></li> -->
<!-- 				<li class="nav-item"><a class="nav-link tab-data" -->
<!-- 					data-toggle="tab" href="#pwd_bridge">Bridge</a></li> -->
				<li class="nav-item"><a class="nav-link tab-data active"
					data-toggle="tab" href="#pwd_flyover">Flyover</a></li>
<!-- 				<li class="nav-item"><a class="nav-link tab-data" -->
<!-- 					data-toggle="tab" href="#pwd_footOverBridge">Foot over bridge</a></li> -->
<!-- 				<li class="nav-item"><a class="nav-link" -->
<!-- 					data-toggle="tab" href="#pwd_trafficSignals">Traffic Signals</a></li> -->
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid" id="pwd_roadway">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addRoadway_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Roadways</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					<!-- Roadway add Modal start -->
					
					<div class="modal fade" id="dep_addRoadway_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Roadway</h4>
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
																						type="text" class="form-control" id="roadway_latitude" name="roadway_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="roadway_ward" name="roadway_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Road Name</label> <select
																						class="form-control pb-1" id="roadway_roadName" name="roadway_roadName">
																						<option>Select Road Name</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Road No</label> <select
																						class="form-control pb-1" id="roadway_roadNo" name="roadway_roadNo">
																						<option>Select Road No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="roadway_longitude" name="roadway_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="roadway_zone" name="roadway_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Road Type</label> <select
																						class="form-control pb-1" id="roadway_roadType" name="roadway_roadType">
																						<option>Select Road Type</option>
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
																					<label for="lowardName">Lane No</label> <select
																						class="form-control pb-1" id="roadway_laneNo" name="roadway_laneNo">
																						<option>Select Lane No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Lane Destination<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_laneDestination"
																						name="roadway_laneDestination" placeholder="Enter Lane Destination">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Divider<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_divider"
																						name="roadway_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_roadLength"
																						name="roadway_roadLength" placeholder="Enter Road Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_dividerWidth"
																						name="roadway_dividerWidth" placeholder="Enter Divider Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_footpathWidth"
																						name="roadway_footpathWidth" placeholder="Enter Footpath Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Cycle Track<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_cycleTrack"
																						name="roadway_cycleTrack" placeholder="Enter Cycle Track">
																				</div>
																					
																				<div class="form-group">
																					<label for="lowardName">Type of Surface</label> <select
																						class="form-control pb-1" id="roadway_typeOfSurface" name="roadway_typeOfSurface">
																						<option>Select Type of Surface</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">No. of Speed breakers<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_noOfSpeedBreakers"
																						name="roadway_noOfSpeedBreakers" placeholder="Enter No. of Speed breakers">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Railway Crossing<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_railwayCrossing"
																						name="roadway_railwayCrossing" placeholder="Enter Railway Crossing">
																				</div>	
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Lane Source<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_laneSource"
																						name="roadway_laneSource" placeholder="Enter Lane Source">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_footpath"
																						name="roadway_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Culvert<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_culvert"
																						name="roadway_culvert" placeholder="Enter Culvert">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_laneWidth"
																						name="roadway_laneWidth" placeholder="Enter Lane Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Culvert Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_culvertWidth"
																						name="roadway_culvertWidth" placeholder="Enter Culvert Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_roadWidth"
																						name="roadway_roadWidth" placeholder="Enter Road Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_roadArea"
																						name="roadway_roadArea" placeholder="Enter Road Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Year of Construction</label> <input
																						type="text" class="form-control" id="roadway_yearOfConstruction"
																						name="roadway_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Traffic Signal<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_trafficSignal"
																						name="roadway_trafficSignal" placeholder="Enter Traffic Signal">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Railway Crossing Gate Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadway_railwayCrossingGateWidth"
																						name="roadway_railwayCrossingGateWidth" placeholder="Enter Railway Crossing Gate Width">
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
																				type="file" multiple class="form-control" id="roadway_geoTaggedPhoto" 
																				name="roadway_geoTaggedPhoto">
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
					
					<!-- Roadway Add Modal end -->
	
					
					
					<!-- Roadway Update Modal start -->
					
					<div class="modal fade" id="dep_updateRoadway_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Roadway</h4>
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
																						type="text" class="form-control" id="roadwayUp_latitude" name="roadwayUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="roadwayUp_ward" name="roadwayUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Road Name</label> <select
																						class="form-control pb-1" id="roadwayUp_roadName" name="roadwayUp_roadName">
																						<option>Select Road Name</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Road No</label> <select
																						class="form-control pb-1" id="roadwayUp_roadNo" name="roadwayUp_roadNo">
																						<option>Select Road No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="roadwayUp_longitude" name="roadwayUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="roadwayUp_zone" name="roadwayUp_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Road Type</label> <select
																						class="form-control pb-1" id="roadwayUp_roadType" name="roadwayUp_roadType">
																						<option>Select Road Type</option>
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
																					<label for="lowardName">Lane No</label> <select
																						class="form-control pb-1" id="roadwayUp_laneNo" name="roadwayUp_laneNo">
																						<option>Select Lane No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Lane Destination<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_laneDestination"
																						name="roadwayUp_laneDestination" placeholder="Enter Lane Destination">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Divider<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_divider"
																						name="roadwayUp_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_roadLength"
																						name="roadwayUp_roadLength" placeholder="Enter Road Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_dividerWidth"
																						name="roadwayUp_dividerWidth" placeholder="Enter Divider Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_footpathWidth"
																						name="roadwayUp_footpathWidth" placeholder="Enter Footpath Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Cycle Track<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_cycleTrack"
																						name="roadwayUp_cycleTrack" placeholder="Enter Cycle Track">
																				</div>
																					
																				<div class="form-group">
																					<label for="lowardName">Type of Surface</label> <select
																						class="form-control pb-1" id="roadwayUp_typeOfSurface" name="roadwayUp_typeOfSurface">
																						<option>Select Type of Surface</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">No. of Speed breakers<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_noOfSpeedBreakers"
																						name="roadwayUp_noOfSpeedBreakers" placeholder="Enter No. of Speed breakers">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Railway Crossing<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_railwayCrossing"
																						name="roadwayUp_railwayCrossing" placeholder="Enter Railway Crossing">
																				</div>	
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Lane Source<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_laneSource"
																						name="roadwayUp_laneSource" placeholder="Enter Lane Source">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_footpath"
																						name="roadwayUp_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Culvert<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_culvert"
																						name="roadwayUp_culvert" placeholder="Enter Culvert">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_laneWidth"
																						name="roadwayUp_laneWidth" placeholder="Enter Lane Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Culvert Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_culvertWidth"
																						name="roadwayUp_culvertWidth" placeholder="Enter Culvert Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_roadWidth"
																						name="roadwayUp_roadWidth" placeholder="Enter Road Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_roadArea"
																						name="roadwayUp_roadArea" placeholder="Enter Road Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Year of Construction</label> <input
																						type="text" class="form-control" id="roadwayUp_yearOfConstruction"
																						name="roadwayUp_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Traffic Signal<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_trafficSignal"
																						name="roadwayUp_trafficSignal" placeholder="Enter Traffic Signal">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Railway Crossing Gate Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="roadwayUp_railwayCrossingGateWidth"
																						name="roadwayUp_railwayCrossingGateWidth" placeholder="Enter Railway Crossing Gate Width">
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
																				type="file" multiple class="form-control" id="roadwayUp_geoTaggedPhoto" 
																				name="roadwayUp_geoTaggedPhoto">
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
					
					<!-- Roadway Update Modal end -->
					

				</div>
				
				<div class="tab-pane container-fluid" id="pwd_bridge">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addBridge_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Bridges</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					<!-- Bridge add Modal start -->
					
					<div class="modal fade" id="dep_addBridge_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Bridge</h4>
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
																						type="text" class="form-control" id="bridge_latitude" name="bridge_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="bridge_ward" name="bridge_ward">
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
																						type="text" class="form-control" id="bridge_longitude" name="bridge_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="bridge_zone" name="bridge_zone">
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
																					<label for="hsName">Bridge Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_bridgeName"
																						name="bridge_bridgeName" placeholder="Enter Bridge Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Year of Construction<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_yearOfConstruction"
																						name="bridge_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Approach Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_approachLength"
																						name="bridge_approachLength" placeholder="Enter Approach Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Resurface Year</label> <input
																						type="text" class="form-control" id="bridge_resurfaceYear"
																						name="bridge_resurfaceYear" placeholder="Enter Resurface Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_lane"
																						name="bridge_lane" placeholder="Enter Lane">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Existing Top Surface of Bridge<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_existingTopSurfaceOfBridge"
																						name="bridge_existingTopSurfaceOfBridge" placeholder="Enter Existing Top Surface of Bridge">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RD Id<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_rdId"
																						name="bridge_rdId" placeholder="Enter RD Id">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_footpath"
																						name="bridge_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_constructionYear"
																						name="bridge_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Parking<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_parking"
																						name="bridge_parking" placeholder="Enter Parking">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Foundation<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_foundation"
																						name="bridge_foundation" placeholder="Enter Foundation">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="lowardName">Bridge Type</label> <select
																						class="form-control pb-1" id="bridge_type" name="bridge_type">
																						<option>Select Bridge Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_width"
																						name="bridge_width" placeholder="Enter Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Height/Depth<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_heightDepth"
																						name="bridge_heightDepth" placeholder="Enter Height/Depth">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Maintenance Cycle</label> <input
																						type="text" class="form-control" id="bridge_maintenanceCycle"
																						name="bridge_maintenanceCycle" placeholder="Enter Maintenance Cycle">
																				</div>
																																				
																				<div class="form-group">
																					<label for="hsName">Existing Gate<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_existingGate"
																						name="bridge_existingGate" placeholder="Enter Existing Gate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">LC No</label> <input
																						type="text" class="form-control" id="bridge_lcNo"
																						name="bridge_lcNo" placeholder="Enter LC No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_divider"
																						name="bridge_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_footpathWidth"
																						name="bridge_footpathWidth" placeholder="Enter FootpathWidth">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Maintenance By<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_maintenanceBy"
																						name="bridge_maintenanceBy" placeholder="Enter Maintenance By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Span<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridge_span"
																						name="bridge_span" placeholder="Enter Span">
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
																				type="file" multiple class="form-control" id="bridge_geoTaggedPhoto" 
																				name="bridge_geoTaggedPhoto">
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
					
					<!-- Bridge add Modal end -->
					
					
					
					<!-- Bridge UPDATE Modal start -->
					
					<div class="modal fade" id="dep_updateBridge_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Bridge</h4>
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
																						type="text" class="form-control" id="bridgeUp_latitude" name="bridgeUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="bridgeUp_ward" name="bridgeUp_ward">
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
																						type="text" class="form-control" id="bridgeUp_longitude" name="bridgeUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="bridgeUp_zone" name="bridgeUp_zone">
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
																					<label for="hsName">Bridge Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_bridgeName"
																						name="bridgeUp_bridgeName" placeholder="Enter Bridge Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Year of Construction<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_yearOfConstruction"
																						name="bridgeUp_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Approach Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_approachLength"
																						name="bridgeUp_approachLength" placeholder="Enter Approach Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Resurface Year</label> <input
																						type="text" class="form-control" id="bridgeUp_resurfaceYear"
																						name="bridgeUp_resurfaceYear" placeholder="Enter Resurface Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_lane"
																						name="bridgeUp_lane" placeholder="Enter Lane">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Existing Top Surface of Bridge<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_existingTopSurfaceOfBridge"
																						name="bridgeUp_existingTopSurfaceOfBridge" placeholder="Enter Existing Top Surface of Bridge">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RD Id<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_rdId"
																						name="bridgeUp_rdId" placeholder="Enter RD Id">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_footpath"
																						name="bridgeUp_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_constructionYear"
																						name="bridgeUp_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Parking<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_parking"
																						name="bridgeUp_parking" placeholder="Enter Parking">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Foundation<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_foundation"
																						name="bridgeUp_foundation" placeholder="Enter Foundation">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="lowardName">Bridge Type</label> <select
																						class="form-control pb-1" id="bridgeUp_type" name="bridgeUp_type">
																						<option>Select Bridge Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_width"
																						name="bridgeUp_width" placeholder="Enter Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Height/Depth<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_heightDepth"
																						name="bridgeUp_heightDepth" placeholder="Enter Height/Depth">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Maintenance Cycle</label> <input
																						type="text" class="form-control" id="bridgeUp_maintenanceCycle"
																						name="bridgeUp_maintenanceCycle" placeholder="Enter Maintenance Cycle">
																				</div>
																																				
																				<div class="form-group">
																					<label for="hsName">Existing Gate<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_existingGate"
																						name="bridgeUp_existingGate" placeholder="Enter Existing Gate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">LC No</label> <input
																						type="text" class="form-control" id="bridgeUp_lcNo"
																						name="bridgeUp_lcNo" placeholder="Enter LC No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_divider"
																						name="bridgeUp_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_footpathWidth"
																						name="bridgeUp_footpathWidth" placeholder="Enter FootpathWidth">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Maintenance By<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_maintenanceBy"
																						name="bridgeUp_maintenanceBy" placeholder="Enter Maintenance By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Span<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bridgeUp_span"
																						name="bridgeUp_span" placeholder="Enter Span">
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
																				type="file" multiple class="form-control" id="bridgeUp_geoTaggedPhoto" 
																				name="bridgeUp_geoTaggedPhoto">
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
					
					<!-- Bridge UPDATE Modal end -->
					
				</div>
				
				
				<div class="tab-pane container-fluid active" id="pwd_flyover">
				
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addFlyover_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Flyovers</h6>
					<table id="dep_flyover_table" class="display tbl_dep" class="tbl-report"></table>
	
<!-- 					ADD FLYOVER MODAL START -->

					<div class="modal fade" id="dep_addFlyover_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Flyover</h4>
								<button type="button" class="close" onclick="resetForm('form_addFlyover')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addFlyover" name="form_addFlyover" class="msform form-admin">
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
																						type="text" class="form-control" id="flyover_latitude" name="flyover_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="flyover_ward" name="flyover_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_longitude" name="flyover_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="flyover_subLayerId" name="flyover_subLayerId">
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
																					<label for="hsName">Flyover Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_flyoverName"
																						name="flyover_flyoverName" placeholder="Enter Flyover Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Year of Construction<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_yearOfConstruction"
																						name="flyover_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Approach Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_approachLength"
																						name="flyover_approachLength" placeholder="Enter Approach Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Resurface Year</label> <input
																						type="text" class="form-control" id="flyover_resurfaceYear"
																						name="flyover_resurfaceYear" placeholder="Enter Resurface Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_lane"
																						name="flyover_lane" placeholder="Enter Lane">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Existing Top Surface of Bridge<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_existingTopSurfaceOfBridge"
																						name="flyover_existingTopSurfaceOfBridge" placeholder="Enter Existing Top Surface of Bridge">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RD Id<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_rdId"
																						name="flyover_rdId" placeholder="Enter RD Id">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_footpath"
																						name="flyover_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_constructionYear"
																						name="flyover_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Parking<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_parking"
																						name="flyover_parking" placeholder="Enter Parking">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Foundation<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_foundation"
																						name="flyover_foundation" placeholder="Enter Foundation">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="lowardName">Flyover Type</label> <select
																						class="form-control pb-1" id="flyover_type" name="flyover_type">
																						<option>Select Flyover Type</option>
																						<option value="ROB">ROB</option>
																						<option value="RUB">RUB</option>
																						<option value="FOB">FOB</option>
																						<option value="River Bridge">River Bridge</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_width"
																						name="flyover_width" placeholder="Enter Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Height/Depth<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_heightDepth"
																						name="flyover_heightDepth" placeholder="Enter Height/Depth">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Maintenance Cycle</label> <input
																						type="text" class="form-control" id="flyover_maintenanceCycle"
																						name="flyover_maintenanceCycle" placeholder="Enter Maintenance Cycle">
																				</div>
																																				
																				<div class="form-group">
																					<label for="hsName">Existing Gate<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_existingGate"
																						name="flyover_existingGate" placeholder="Enter Existing Gate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">LC No</label> <input
																						type="text" class="form-control" id="flyover_lcNo"
																						name="flyover_lcNo" placeholder="Enter LC No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_divider"
																						name="flyover_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_footpathWidth"
																						name="flyover_footpathWidth" placeholder="Enter FootpathWidth">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Maintenance By<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_maintenanceBy"
																						name="flyover_maintenanceBy" placeholder="Enter Maintenance By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Span<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyover_span"
																						name="flyover_span" placeholder="Enter Span">
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
<!-- 																				type="file" multiple class="form-control" id="flyover_geoTaggedPhoto"  -->
<!-- 																				name="flyover_geoTaggedPhoto"> -->
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

<!-- 					ADD FLYOVER MODAL END -->


<!-- 					UPDATE FLYOVER MODAL START -->
					
					<div class="modal fade" id="dep_updateFlyover_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Flyover</h4>
									<button type="button" class="close" onclick="resetForm('form_updateFlyover')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateFlyover" name="form_updateFlyover" class="msform form-admin">
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
																						type="text" class="form-control" id="flyoverUp_latitude" name="flyoverUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="flyoverUp_ward" name="flyoverUp_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_longitude" name="flyoverUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="flyoverUp_subLayerId" name="flyoverUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="flyoverUp_flyoverId" name="flyoverUp_flyoverId">
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
																					<label for="hsName">Flyover Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_flyoverName"
																						name="flyoverUp_flyoverName" placeholder="Enter Flyover Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Year of Construction<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_yearOfConstruction"
																						name="flyoverUp_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Approach Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_approachLength"
																						name="flyoverUp_approachLength" placeholder="Enter Approach Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Resurface Year</label> <input
																						type="text" class="form-control" id="flyoverUp_resurfaceYear"
																						name="flyoverUp_resurfaceYear" placeholder="Enter Resurface Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_lane"
																						name="flyoverUp_lane" placeholder="Enter Lane">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Existing Top Surface of Bridge<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_existingTopSurfaceOfBridge"
																						name="flyoverUp_existingTopSurfaceOfBridge" placeholder="Enter Existing Top Surface of Bridge">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RD Id<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_rdId"
																						name="flyoverUp_rdId" placeholder="Enter RD Id">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_footpath"
																						name="flyoverUp_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_constructionYear"
																						name="flyoverUp_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Parking<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_parking"
																						name="flyoverUp_parking" placeholder="Enter Parking">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Foundation<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_foundation"
																						name="flyoverUp_foundation" placeholder="Enter Foundation">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="lowardName">Flyover Type</label> <select
																						class="form-control pb-1" id="flyoverUp_type" name="flyoverUp_type">
																						<option>Select Flyover Type</option>
																						<option value="ROB">ROB</option>
																						<option value="RUB">RUB</option>
																						<option value="FOB">FOB</option>
																						<option value="River Bridge">River Bridge</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_width"
																						name="flyoverUp_width" placeholder="Enter Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Height/Depth<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_heightDepth"
																						name="flyoverUp_heightDepth" placeholder="Enter Height/Depth">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Maintenance Cycle</label> <input
																						type="text" class="form-control" id="flyoverUp_maintenanceCycle"
																						name="flyoverUp_maintenanceCycle" placeholder="Enter Maintenance Cycle">
																				</div>
																																				
																				<div class="form-group">
																					<label for="hsName">Existing Gate<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_existingGate"
																						name="flyoverUp_existingGate" placeholder="Enter Existing Gate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">LC No</label> <input
																						type="text" class="form-control" id="flyoverUp_lcNo"
																						name="flyoverUp_lcNo" placeholder="Enter LC No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_divider"
																						name="flyoverUp_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_footpathWidth"
																						name="flyoverUp_footpathWidth" placeholder="Enter FootpathWidth">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Maintenance By<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_maintenanceBy"
																						name="flyoverUp_maintenanceBy" placeholder="Enter Maintenance By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Span<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="flyoverUp_span"
																						name="flyoverUp_span" placeholder="Enter Span">
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
<!-- 																				type="file" multiple class="form-control" id="flyoverUp_geoTaggedPhoto"  -->
<!-- 																				name="flyoverUp_geoTaggedPhoto"> -->
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
					
<!-- 					UPDATE FLYOVER MODAL END -->


				</div>				
				
				<div class="tab-pane container-fluid" id="pwd_footOverBridge">
				
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addFootOverBridge_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Foot over Bridges</h6>
					<table id="dep_foorOverBridge_table" class="display tbl_dep" class="tbl-report"></table>
				
<!-- 					ADD FOOT OVER BRIDGE MODAL START -->
					
					<div class="modal fade" id="dep_addFootOverBridge_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Foot over Bridge</h4>
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
																						type="text" class="form-control" id="footoverbridge_latitude" name="footoverbridge_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="footoverbridge_ward" name="footoverbridge_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="footoverbridge_longitude" name="footoverbridge_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="footoverbridge_zone" name="footoverbridge_zone">
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
																					<label for="hsName">Foot over Bridge Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_footoverBridgeName"
																						name="footoverbridge_footoverBridgeName" placeholder="Enter Flyover Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Year of Construction<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_yearOfConstruction"
																						name="footoverbridge_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Approach Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_approachLength"
																						name="footoverbridge_approachLength" placeholder="Enter Approach Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Resurface Year</label> <input
																						type="text" class="form-control" id="footoverbridge_resurfaceYear"
																						name="footoverbridge_resurfaceYear" placeholder="Enter Resurface Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_lane"
																						name="footoverbridge_lane" placeholder="Enter Lane">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Existing Top Surface of Bridge<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_existingTopSurfaceOfBridge"
																						name="footoverbridge_existingTopSurfaceOfBridge" placeholder="Enter Existing Top Surface of Bridge">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RD Id<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_rdId"
																						name="footoverbridge_rdId" placeholder="Enter RD Id">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_footpath"
																						name="footoverbridge_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_constructionYear"
																						name="footoverbridge_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Parking<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_parking"
																						name="footoverbridge_parking" placeholder="Enter Parking">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Foundation<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_foundation"
																						name="footoverbridge_foundation" placeholder="Enter Foundation">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="lowardName">Foot over Bridge Type</label> <select
																						class="form-control pb-1" id="footoverbridge_type" name="footoverbridge_type">
																						<option>Select Foot over Bridge Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_width"
																						name="footoverbridge_width" placeholder="Enter Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Height/Depth<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_heightDepth"
																						name="footoverbridge_heightDepth" placeholder="Enter Height/Depth">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Maintenance Cycle</label> <input
																						type="text" class="form-control" id="footoverbridge_maintenanceCycle"
																						name="footoverbridge_maintenanceCycle" placeholder="Enter Maintenance Cycle">
																				</div>
																																				
																				<div class="form-group">
																					<label for="hsName">Existing Gate<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_existingGate"
																						name="footoverbridge_existingGate" placeholder="Enter Existing Gate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">LC No</label> <input
																						type="text" class="form-control" id="footoverbridge_lcNo"
																						name="footoverbridge_lcNo" placeholder="Enter LC No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_divider"
																						name="footoverbridge_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_footpathWidth"
																						name="footoverbridge_footpathWidth" placeholder="Enter FootpathWidth">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Maintenance By<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_maintenanceBy"
																						name="footoverbridge_maintenanceBy" placeholder="Enter Maintenance By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Span<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridge_span"
																						name="footoverbridge_span" placeholder="Enter Span">
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
																				type="file" multiple class="form-control" id="footoverbridge_geoTaggedPhoto" 
																				name="footoverbridge_geoTaggedPhoto">
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
					
<!-- 					ADD FOOT OVER BRIDGE MODAL END -->
				
				
<!-- 					UPDATE FOOT OVER BRIDGE MODAL START -->
				
					<div class="modal fade" id="dep_updateFootOverBridge_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Foot over Bridge</h4>
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
																						type="text" class="form-control" id="footoverbridgeUp_latitude" name="footoverbridgeUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="footoverbridgeUp_ward" name="footoverbridgeUp_ward">
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
																						type="text" class="form-control" id="footoverbridgeUp_longitude" name="footoverbridgeUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="footoverbridgeUp_zone" name="footoverbridgeUp_zone">
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
																					<label for="hsName">Foot over Bridge Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_footoverBridgeName"
																						name="footoverbridgeUp_footoverBridgeName" placeholder="Enter Flyover Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Year of Construction<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_yearOfConstruction"
																						name="footoverbridgeUp_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Approach Length<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_approachLength"
																						name="footoverbridgeUp_approachLength" placeholder="Enter Approach Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Resurface Year</label> <input
																						type="text" class="form-control" id="footoverbridgeUp_resurfaceYear"
																						name="footoverbridgeUp_resurfaceYear" placeholder="Enter Resurface Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_lane"
																						name="footoverbridgeUp_lane" placeholder="Enter Lane">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Existing Top Surface of Bridge<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_existingTopSurfaceOfBridge"
																						name="footoverbridgeUp_existingTopSurfaceOfBridge" placeholder="Enter Existing Top Surface of Bridge">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RD Id<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_rdId"
																						name="footoverbridgeUp_rdId" placeholder="Enter RD Id">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_footpath"
																						name="footoverbridgeUp_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_constructionYear"
																						name="footoverbridgeUp_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Parking<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_parking"
																						name="footoverbridgeUp_parking" placeholder="Enter Parking">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Foundation<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_foundation"
																						name="footoverbridgeUp_foundation" placeholder="Enter Foundation">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="lowardName">Foot over Bridge Type</label> <select
																						class="form-control pb-1" id="footoverbridgeUp_type" name="footoverbridgeUp_type">
																						<option>Select Foot over Bridge Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_width"
																						name="footoverbridgeUp_width" placeholder="Enter Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Height/Depth<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_heightDepth"
																						name="footoverbridgeUp_heightDepth" placeholder="Enter Height/Depth">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Maintenance Cycle</label> <input
																						type="text" class="form-control" id="footoverbridgeUp_maintenanceCycle"
																						name="footoverbridgeUp_maintenanceCycle" placeholder="Enter Maintenance Cycle">
																				</div>
																																				
																				<div class="form-group">
																					<label for="hsName">Existing Gate<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_existingGate"
																						name="footoverbridgeUp_existingGate" placeholder="Enter Existing Gate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">LC No</label> <input
																						type="text" class="form-control" id="footoverbridgeUp_lcNo"
																						name="footoverbridgeUp_lcNo" placeholder="Enter LC No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_divider"
																						name="footoverbridgeUp_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_footpathWidth"
																						name="footoverbridgeUp_footpathWidth" placeholder="Enter FootpathWidth">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Maintenance By<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_maintenanceBy"
																						name="footoverbridgeUp_maintenanceBy" placeholder="Enter Maintenance By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Span<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="footoverbridgeUp_span"
																						name="footoverbridgeUp_span" placeholder="Enter Span">
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
																				type="file" multiple class="form-control" id="footoverbridgeUp_geoTaggedPhoto" 
																				name="footoverbridgeUp_geoTaggedPhoto">
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
				
<!-- 					UPDATE FOOT OVER BRIDGE MODAL END -->
				</div>
				
				<div class="tab-pane container-fluid" id="pwd_trafficSignals">
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addTrafficSignal_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Traffic Signals</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>
					
<!-- 					ADD TRAFFIC SIGNAL MODAL START -->
					
					<div class="modal fade" id="dep_addTrafficSignal_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Traffic Signal</h4>
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
																						type="text" class="form-control" id="trafficSignal_latitude" name="trafficSignal_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="trafficSignal_ward" name="trafficSignal_ward">
																						
																					</select>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="trafficSignal_longitude" name="trafficSignal_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Road No</label> <select
																						class="form-control pb-1" id="trafficSignal_roadNo" name="trafficSignal_roadNo">
																						<option>Select Road No</option>
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
																						type="text" class="form-control" id="trafficSignal_roadName"
																						name="trafficSignal_roadName" placeholder="Enter Road Name">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="lowardName">Type of Signal</label> <select
																						class="form-control pb-1" id="trafficSignal_typeOfSignal" 
																						name="trafficSignal_typeOfSignal">
																						<option>Select Type of Signal</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Type of Control</label> <select
																						class="form-control pb-1" id="trafficSignal_typeOfControl" 
																						name="trafficSignal_typeOfControl">
																						<option>Select Type of Control</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Junction Type</label> <select
																						class="form-control pb-1" id="trafficSignal_junctionType" 
																						name="trafficSignal_junctionType">
																						<option>Select Junction Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Number of Pedestrian Pole<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="trafficSignal_numberOfPedestrianPole"
																						name="trafficSignal_numberOfPedestrianPole" placeholder="Enter Number of Pedestrian Pole">
																				</div>
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Road Id<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="trafficSignal_roadId"
																						name="trafficSignal_roadId" placeholder="Enter Road Id">
																				</div>
																			
																				<div class="form-group">
																					<label for="lowardName">Type of Head</label> <select
																						class="form-control pb-1" id="trafficSignal_typeOfHead" 
																						name="trafficSignal_typeOfHead">
																						<option>Select Type of Head</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Junction Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="trafficSignal_junctionName"
																						name="trafficSignal_junctionName" placeholder="Enter Junction Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Number of Cantilever Pole<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="trafficSignal_numberOfCantileverPole"
																						name="trafficSignal_numberOfCantileverPole" placeholder="Enter Number of Cantilever Pole">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="trafficSignal_remarks" name="trafficSignal_remarks"
																						placeholder="Enter Remarks"></textarea>
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
																				type="file" multiple class="form-control" id="trafficSignal_geoTaggedPhoto" 
																				name="trafficSignal_geoTaggedPhoto">
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
					
<!-- 					ADD TRAFFIC SIGNAL MODAL END -->


<!-- 					UPDATE TRAFFIC SIGNAL MODAL START -->
					
					<div class="modal fade" id="dep_updateTrafficSignal_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Traffic Signal</h4>
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
																						type="text" class="form-control" id="trafficSignalUp_latitude" name="trafficSignalUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="trafficSignalUp_ward" name="trafficSignalUp_ward">
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
																						type="text" class="form-control" id="trafficSignalUp_longitude" name="trafficSignalUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Road No</label> <select
																						class="form-control pb-1" id="trafficSignalUp_roadNo" name="trafficSignalUp_roadNo">
																						<option>Select Road No</option>
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
																						type="text" class="form-control" id="trafficSignalUp_roadName"
																						name="trafficSignalUp_roadName" placeholder="Enter Road Name">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="lowardName">Type of Signal</label> <select
																						class="form-control pb-1" id="trafficSignalUp_typeOfSignal" 
																						name="trafficSignalUp_typeOfSignal">
																						<option>Select Type of Signal</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Type of Control</label> <select
																						class="form-control pb-1" id="trafficSignalUp_typeOfControl" 
																						name="trafficSignalUp_typeOfControl">
																						<option>Select Type of Control</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName">Junction Type</label> <select
																						class="form-control pb-1" id="trafficSignalUp_junctionType" 
																						name="trafficSignalUp_junctionType">
																						<option>Select Junction Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Number of Pedestrian Pole<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="trafficSignalUp_numberOfPedestrianPole"
																						name="trafficSignalUp_numberOfPedestrianPole" placeholder="Enter Number of Pedestrian Pole">
																				</div>
																											
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsName">Road Id<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="trafficSignalUp_roadId"
																						name="trafficSignalUp_roadId" placeholder="Enter Road Id">
																				</div>
																			
																				<div class="form-group">
																					<label for="lowardName">Type of Head</label> <select
																						class="form-control pb-1" id="trafficSignalUp_typeOfHead" 
																						name="trafficSignalUp_typeOfHead">
																						<option>Select Type of Head</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Junction Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="trafficSignalUp_junctionName"
																						name="trafficSignalUp_junctionName" placeholder="Enter Junction Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Number of Cantilever Pole<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="trafficSignalUp_numberOfCantileverPole"
																						name="trafficSignalUp_numberOfCantileverPole" placeholder="Enter Number of Cantilever Pole">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="trafficSignalUp_remarks" name="trafficSignalUp_remarks"
																						placeholder="Enter Remarks"></textarea>
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
																				type="file" multiple class="form-control" id="trafficSignalUp_geoTaggedPhoto" 
																				name="trafficSignalUp_geoTaggedPhoto">
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
					
<!-- 					UPDATE TRAFFIC SIGNAL MODAL END -->
				
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

<script type="text/javascript" src="${context}/js/designer/pwd_dep.js"></script>

</body>
</html>