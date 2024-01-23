<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>AICTSL Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data-toggle="tab" href="#aictsl_busRoutes">Bus routes</a></li>
				<li class="nav-item"><a class="nav-link tab-data"
					data-toggle="tab" href="#aictsl_busStops">Bus stops</a></li>
				<li class="nav-item"><a class="nav-link tab-data"
					data-toggle="tab" href="#aictsl_busTerminals">Bus terminals</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="aictsl_busRoutes">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addBusRoutes_modal"
							class="btn-add btn-indore-table">Add Bus Routes</button>
					</div>

					<h6 class="table-title-grid">List of Bus Routes</h6>
					<table id="dep_busRoute_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Bus Routes add Modal start -->
					
					<div class="modal fade" id="dep_addBusRoutes_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Bus Routes</h4>
									<button type="button" class="close" onclick="resetForm('form_addBusRoutes')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addBusRoutes" name="form_addBusRoutes" class="msform form-admin">
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
																						type="text" class="form-control" id="busRoutes_latitude" name="busRoutes_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="busRoutes_ward" name="busRoutes_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busRoutes_longitude" name="busRoutes_longitude"
																						placeholder="Enter Longitude">
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
																					<label for="hsName">AICTSL Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busRoutes_aictslAddress"
																						name="busRoutes_aictslAddress" placeholder="Enter AICTSL Address">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Timings</label> <input
																						type="text" class="form-control" id="busRoutes_busTimings"
																						name="busRoutes_busTimings" placeholder="Enter Bus Timings">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Route Number</label> <input
																						type="text" class="form-control" id="busRoutes_busRouteNumber"
																						name="busRoutes_busRouteNumber" placeholder="Enter Bus Route Number">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Live Location with GPS</label> <input
																						type="text" class="form-control" id="busRoutes_liveLocationWithGPS"
																						name="busRoutes_liveLocationWithGPS" placeholder="Enter Live Location with GPS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Land use Map</label> <input
																						type="text" class="form-control" id="busRoutes_landuseMap"
																						name="busRoutes_landuseMap" placeholder="Enter Land use Map">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">BRTS Count</label> <input
																						type="text" class="form-control" id="busRoutes_brtsCount"
																						name="busRoutes_brtsCount" placeholder="Enter BRTS Count">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Peri-Urban</label> <input
																						type="text" class="form-control" id="busRoutes_periUrban"
																						name="busRoutes_periUrban" placeholder="Enter Peri-Urban">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Atal Bus Count</label> <input
																						type="text" class="form-control" id="busRoutes_atalBusCount"
																						name="busRoutes_atalBusCount" placeholder="Enter Atal Bus Count">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Type</label> <select
																						class="form-control pb-1" id="busRoutes_busType" name="busRoutes_busType">
																						<option>Select Bus Type</option>
																						<option value="CNG">CNG</option>
																						<option value="Electric Bus">Electric Bus</option>
																					</select>
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Arrival and Departure Timings</label> <input
																						type="text" class="form-control" id="busRoutes_arrivalAndDepartureTimings"
																						name="busRoutes_arrivalAndDepartureTimings" placeholder="Enter Arrival and Departure Timings">
																				</div>	
																																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsConNo">Contact No</label> <input
																						type="text" class="form-control" id="busRoutes_contactNo"
																						name="busRoutes_contactNo" placeholder="Enter Contact No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Routes</label> <input
																						type="text" class="form-control" id="busRoutes_busRoutes"
																						name="busRoutes_busRoutes" placeholder="Enter Bus Routes">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Category</label> <select
																						class="form-control pb-1" id="busRoutes_busCategory" name="busRoutes_busCategory">
																						<option>Select Bus Category</option>
																						<option value="City Bus">City Bus</option>
																						<option value="Feeder">Feeder</option>
																						<option value="Inter-state">Inter-state</option>
																						<option value="peri-urban">peri-urban</option>
																						<option value="Intra-state">Intra-state</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Top-up Cards</label> <input
																						type="text" class="form-control" id="busRoutes_smartTopupCards"
																						name="busRoutes_smartTopupCards" placeholder="Enter Smart Top-up Cards">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">BRTS</label> <input
																						type="text" class="form-control" id="busRoutes_brts"
																						name="busRoutes_brts" placeholder="Enter BRTS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">ibus Feeder</label> <input
																						type="text" class="form-control" id="busRoutes_ibusFeeder"
																						name="busRoutes_ibusFeeder" placeholder="Enter ibus Feeder">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Atal City Bus</label> <input
																						type="text" class="form-control" id="busRoutes_atalCityBus"
																						name="busRoutes_atalCityBus" placeholder="Enter Atal City Bus">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Service Type</label> <select
																						class="form-control pb-1" id="busRoutes_busServiceType" name="busRoutes_busServiceType">
																						<option>Select Bus Service Type</option>
																						<option value="Inter-city">Inter-city</option>
																						<option value="Intra-city">Intra-city</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Route Planning</label> <input
																						type="text" class="form-control" id="busRoutes_routePlanning"
																						name="busRoutes_routePlanning" placeholder="Enter Route Planning">
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
<!-- 																				type="file" multiple class="form-control" id="busRoutes_geoTaggedPhoto"  -->
<!-- 																				name="busRoutes_geoTaggedPhoto"> -->
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
					
					<!--Bus Routes Add Modal end -->

					
					<!--Bus Routes Update Modal start -->
					
					<div class="modal fade" id="dep_updateBusRoutes_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Bus Routes</h4>
									<button type="button" class="close" onclick="resetForm('form_updateBusRoutes')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateBusRoutes" name="form_updateBusRoutes" class="msform form-admin">
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
																						type="text" class="form-control" id="busRoutesUp_latitude" name="busRoutesUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="busRoutesUp_ward" name="busRoutesUp_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busRoutesUp_longitude" name="busRoutesUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="busRoutesUp_subLayerId" name="busRoutesUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="busRoutesUp_busRoutesId" name="busRoutesUp_busRoutesId">
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
																					<label for="hsName">AICTSL Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busRoutesUp_aictslAddress"
																						name="busRoutesUp_aictslAddress" placeholder="Enter AICTSL Address">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Timings</label> <input
																						type="text" class="form-control" id="busRoutesUp_busTimings"
																						name="busRoutesUp_busTimings" placeholder="Enter Bus Timings">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Route Number</label> <input
																						type="text" class="form-control" id="busRoutesUp_busRouteNumber"
																						name="busRoutesUp_busRouteNumber" placeholder="Enter Bus Route Number">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Live Location with GPS</label> <input
																						type="text" class="form-control" id="busRoutesUp_liveLocationWithGPS"
																						name="busRoutesUp_liveLocationWithGPS" placeholder="Enter Live Location with GPS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Land use Map</label> <input
																						type="text" class="form-control" id="busRoutesUp_landuseMap"
																						name="busRoutesUp_landuseMap" placeholder="Enter Land use Map">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">BRTS Count</label> <input
																						type="text" class="form-control" id="busRoutesUp_brtsCount"
																						name="busRoutesUp_brtsCount" placeholder="Enter BRTS Count">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Peri-Urban</label> <input
																						type="text" class="form-control" id="busRoutesUp_periUrban"
																						name="busRoutesUp_periUrban" placeholder="Enter Peri-Urban">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Atal Bus Count</label> <input
																						type="text" class="form-control" id="busRoutesUp_atalBusCount"
																						name="busRoutesUp_atalBusCount" placeholder="Enter Atal Bus Count">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Type</label> <select
																						class="form-control pb-1" id="busRoutesUp_busType" name="busRoutesUp_busType">
																						<option>Select Bus Type</option>
																						<option value="CNG">CNG</option>
																						<option value="Electric Bus">Electric Bus</option>
																					</select>
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Arrival and Departure Timings</label> <input
																						type="text" class="form-control" id="busRoutesUp_arrivalAndDepartureTimings"
																						name="busRoutesUp_arrivalAndDepartureTimings" placeholder="Enter Arrival and Departure Timings">
																				</div>	
																																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsConNo">Contact No</label> <input
																						type="text" class="form-control" id="busRoutesUp_contactNo"
																						name="busRoutesUp_contactNo" placeholder="Enter Contact No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Routes</label> <input
																						type="text" class="form-control" id="busRoutesUp_busRoutes"
																						name="busRoutesUp_busRoutes" placeholder="Enter Bus Routes">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Category</label> <select
																						class="form-control pb-1" id="busRoutesUp_busCategory" name="busRoutesUp_busCategory">
																						<option>Select Bus Category</option>
																						<option value="City Bus">City Bus</option>
																						<option value="Feeder">Feeder</option>
																						<option value="Inter-state">Inter-state</option>
																						<option value="peri-urban">peri-urban</option>
																						<option value="Intra-state">Intra-state</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Top-up Cards</label> <input
																						type="text" class="form-control" id="busRoutesUp_smartTopupCards"
																						name="busRoutesUp_smartTopupCards" placeholder="Enter Smart Top-up Cards">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">BRTS</label> <input
																						type="text" class="form-control" id="busRoutesUp_brts"
																						name="busRoutesUp_brts" placeholder="Enter BRTS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">ibus Feeder</label> <input
																						type="text" class="form-control" id="busRoutesUp_ibusFeeder"
																						name="busRoutesUp_ibusFeeder" placeholder="Enter ibus Feeder">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Atal City Bus</label> <input
																						type="text" class="form-control" id="busRoutesUp_atalCityBus"
																						name="busRoutesUp_atalCityBus" placeholder="Enter Atal City Bus">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Service Type</label> <select
																						class="form-control pb-1" id="busRoutesUp_busServiceType" name="busRoutesUp_busServiceType">
																						<option>Select Bus Service Type</option>
																						<option value="Inter-city">Inter-city</option>
																						<option value="Intra-city">Intra-city</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Route Planning</label> <input
																						type="text" class="form-control" id="busRoutesUp_routePlanning"
																						name="busRoutesUp_routePlanning" placeholder="Enter Route Planning">
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
<!-- 																				type="file" multiple class="form-control" id="busRoutesUp_geoTaggedPhoto"  -->
<!-- 																				name="busRoutesUp_geoTaggedPhoto"> -->
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
					
					<!--Bus Routes Update Modal end -->
					

				</div>
				
				<div class="tab-pane container-fluid" id="aictsl_busStops">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addBusStops_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Bus Stops</h6>
					<table id="dep_busStop_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Bus Stops add Modal start -->
					
					<div class="modal fade" id="dep_addBusStops_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Bus Stops</h4>
									<button type="button" class="close" onclick="resetForm('form_addBusStops')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addBusStops" name="form_addBusStops" class="msform form-admin">
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
																					<label for="loLatitude">Latitude <span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busStops_latitude" name="busStops_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="busStops_ward" name="busStops_ward">
																						<option>Select Ward</option>
																						<option value="1">2</option>
																						<option value="2">3</option>
																						<option value="3">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busStops_longitude" name="busStops_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="busStops_subLayerId" name="busStops_subLayerId">
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
																					<label for="hsName">Land use Map</label> <input
																						type="text" class="form-control" id="busStops_landuseMap"
																						name="busStops_landuseMap" placeholder="Enter Land use Map">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Timings</label> <input
																						type="text" class="form-control" id="busStops_busTimings"
																						name="busStops_busTimings" placeholder="Enter Bus Timings">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Top-up Cards</label> <input
																						type="text" class="form-control" id="busStops_smartTopupCards"
																						name="busStops_smartTopupCards" placeholder="Enter Smart Top-up Cards">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Arrival and Departure Timings</label> <input
																						type="text" class="form-control" id="busStops_arrivalAndDepartureTimings"
																						name="busStops_arrivalAndDepartureTimings" placeholder="Enter Arrival and Departure Timings">
																				</div>	
																																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="hsName">Bus Stops</label> <input
																						type="text" class="form-control" id="busStops_busStops"
																						name="busStops_busStops" placeholder="Enter Bus Stops">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Route Number</label> <input
																						type="text" class="form-control" id="busStops_busRouteNumber"
																						name="busStops_busRouteNumber" placeholder="Enter Bus Route Number">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Bus Stops List</label> <input
																						type="text" class="form-control" id="busStops_smartBusStopsList"
																						name="busStops_smartBusStopsList" placeholder="Enter Smart Bus Stops List">
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
<!-- 																				type="file" multiple class="form-control" id="busStops_geoTaggedPhoto"  -->
<!-- 																				name="busStops_geoTaggedPhoto"> -->
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
					
					<!--Bus Stops add Modal end -->
					
					
					<!--Bus Stops UPDATE Modal start -->
					
					<div class="modal fade" id="dep_updateBusStops_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Bus Stops</h4>
						<button type="button" class="close" onclick="resetForm('form_updateBusStops')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateBusStops" name="form_updateBusStops" class="msform form-admin">
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
																						type="text" class="form-control" id="busStopsUp_latitude" name="busStopsUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="busStopsUp_ward" name="busStopsUp_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busStopsUp_longitude" name="busStopsUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="busStopsUp_subLayerId" name="busStopsUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="busStopsUp_busStopsId" name="busStopsUp_busStopsId">
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
																					<label for="hsName">Land use Map</label> <input
																						type="text" class="form-control" id="busStopsUp_landuseMap"
																						name="busStopsUp_landuseMap" placeholder="Enter Land use Map">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Timings</label> <input
																						type="text" class="form-control" id="busStopsUp_busTimings"
																						name="busStopsUp_busTimings" placeholder="Enter Bus Timings">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Top-up Cards</label> <input
																						type="text" class="form-control" id="busStopsUp_smartTopupCards"
																						name="busStopsUp_smartTopupCards" placeholder="Enter Smart Top-up Cards">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Arrival and Departure Timings</label> <input
																						type="text" class="form-control" id="busStopsUp_arrivalAndDepartureTimings"
																						name="busStopsUp_arrivalAndDepartureTimings" placeholder="Enter Arrival and Departure Timings">
																				</div>	
																																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="hsName">Bus Stops</label> <input
																						type="text" class="form-control" id="busStopsUp_busStops"
																						name="busStopsUp_busStops" placeholder="Enter Bus Stops">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Route Number</label> <input
																						type="text" class="form-control" id="busStopsUp_busRouteNumber"
																						name="busStopsUp_busRouteNumber" placeholder="Enter Bus Route Number">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Bus Stops List</label> <input
																						type="text" class="form-control" id="busStopsUp_smartBusStopsList"
																						name="busStopsUp_smartBusStopsList" placeholder="Enter Smart Bus Stops List">
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
<!-- 																				type="file" multiple class="form-control" id="busStopsUp_geoTaggedPhoto"  -->
<!-- 																				name="busStopsUp_geoTaggedPhoto"> -->
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
					
					<!--Bus Stops UPDATE Modal end -->
					
				</div>
				
				
				<div class="tab-pane container-fluid" id="aictsl_busTerminals">
				
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addBusTerminals_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Bus Terminals</h6>
					<table id="dep_busTerminal_table" class="display tbl_dep" class="tbl-report"></table>

<!-- 					ADD BUS TERMINAL MODAL START -->

					<div class="modal fade" id="dep_addBusTerminals_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Bus Terminals</h4>
									<button type="button" class="close" onclick="resetForm('form_addBusTerminals')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addBusTerminals" name="form_addBusTerminals" class="msform form-admin">
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
																						type="text" class="form-control" id="busTerminals_latitude" name="busTerminals_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="busTerminals_ward" name="busTerminals_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busTerminals_longitude" name="busTerminals_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="busTerminals_subLayerId" name="busTerminals_subLayerId">
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
																					<label for="hsName">Land use Map</label> <input
																						type="text" class="form-control" id="busTerminals_landuseMap"
																						name="busTerminals_landuseMap" placeholder="Enter Land use Map">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Timings</label> <input
																						type="text" class="form-control" id="busTerminals_busTimings"
																						name="busTerminals_busTimings" placeholder="Enter Bus Timings">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Top-up Cards</label> <input
																						type="text" class="form-control" id="busTerminals_smartTopupCards"
																						name="busTerminals_smartTopupCards" placeholder="Enter Smart Top-up Cards">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Arrival and Departure Timings</label> <input
																						type="text" class="form-control" id="busTerminals_arrivalAndDepartureTimings"
																						name="busTerminals_arrivalAndDepartureTimings" placeholder="Enter Arrival and Departure Timings">
																				</div>	
																																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="hsName">Bus Terminals</label> <input
																						type="text" class="form-control" id="busTerminals_busTerminals"
																						name="busTerminals_busTerminals" placeholder="Enter Bus Terminals">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Route Number</label> <input
																						type="text" class="form-control" id="busTerminals_busRouteNumber"
																						name="busTerminals_busRouteNumber" placeholder="Enter Bus Route Number">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Bus Stops List</label> <input
																						type="text" class="form-control" id="busTerminals_smartBusStopsList"
																						name="busTerminals_smartBusStopsList" placeholder="Enter Smart Bus Stops List">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Traffic Squares</label> <input
																						type="text" class="form-control" id="busTerminals_trafficSquares"
																						name="busTerminals_trafficSquares" placeholder="Enter Traffic Squares">
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
<!-- 																				type="file" multiple class="form-control" id="busTerminals_geoTaggedPhoto"  -->
<!-- 																				name="busTerminals_geoTaggedPhoto"> -->
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

<!-- 					ADD BUS TERMINAL MODAL END -->
				
				
<!-- 					UPDATE BUS TERMINAL MODAL START -->
					
					<div class="modal fade" id="dep_updateBusTerminals_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Bus Terminals</h4>
									<button type="button" class="close" onclick="resetForm('form_updateBusTerminals')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateBusTerminals" name="form_updateBusTerminals" class="msform form-admin">
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
																						type="text" class="form-control" id="busTerminalsUp_latitude" name="busTerminalsUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="busTerminalsUp_ward" name="busTerminalsUp_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="busTerminalsUp_longitude" name="busTerminalsUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="busTerminalsUp_subLayerId" name="busTerminalsUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="busTerminalsUp_busTerminalsId" name="busTerminalsUp_busTerminalsId">
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
																					<label for="hsName">Land use Map</label> <input
																						type="text" class="form-control" id="busTerminalsUp_landuseMap"
																						name="busTerminalsUp_landuseMap" placeholder="Enter Land use Map">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Timings</label> <input
																						type="text" class="form-control" id="busTerminalsUp_busTimings"
																						name="busTerminalsUp_busTimings" placeholder="Enter Bus Timings">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Top-up Cards</label> <input
																						type="text" class="form-control" id="busTerminalsUp_smartTopupCards"
																						name="busTerminalsUp_smartTopupCards" placeholder="Enter Smart Top-up Cards">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Arrival and Departure Timings</label> <input
																						type="text" class="form-control" id="busTerminalsUp_arrivalAndDepartureTimings"
																						name="busTerminalsUp_arrivalAndDepartureTimings" placeholder="Enter Arrival and Departure Timings">
																				</div>	
																																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="hsName">Bus Terminals</label> <input
																						type="text" class="form-control" id="busTerminalsUp_busTerminals"
																						name="busTerminalsUp_busTerminals" placeholder="Enter Bus Terminals">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Bus Route Number</label> <input
																						type="text" class="form-control" id="busTerminalsUp_busRouteNumber"
																						name="busTerminalsUp_busRouteNumber" placeholder="Enter Bus Route Number">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Smart Bus Stops List</label> <input
																						type="text" class="form-control" id="busTerminalsUp_smartBusStopsList"
																						name="busTerminalsUp_smartBusStopsList" placeholder="Enter Smart Bus Stops List">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Traffic Squares</label> <input
																						type="text" class="form-control" id="busTerminalsUp_trafficSquares"
																						name="busTerminalsUp_trafficSquares" placeholder="Enter Traffic Squares">
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
<!-- 																				type="file" multiple class="form-control" id="busTerminalsUp_geoTaggedPhoto"  -->
<!-- 																				name="busTerminalsUp_geoTaggedPhoto"> -->
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
					
<!-- 					UPDATE BUS TERMINAL MODAL END -->
				
				
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

<script type="text/javascript" src="${context}/js/designer/aictsl_dep.js"></script>
</body>
</html>