<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>RTO Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data-toggle="tab" href="#rto_rto">RTO</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="rto_rto">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addRTO_modal"
							class="btn-add btn-indore-table">Add RTO</button>
					</div>

					<h6 class="table-title-grid">List of RTO</h6>
					<table id="dep_rto_table" class="display tbl_dep"
						class="tbl-report"></table>

					<!--RTO add Modal start -->

					<div class="modal fade" id="dep_addRTO_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add RTO</h4>
									<button type="button" class="close" onclick="resetForm('form_addRto')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														
														<div class="col-md-12 mx-0">

															<form id="form_addRto" name="form_addRto"
																class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li id="othertab" class="tabwithborder"><strong>Other</strong></li>
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
																						type="text" class="form-control" id="rto_latitude"
																						name="rto_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="rto_ward"
																						name="rto_ward">
																						<!-- <option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option> -->
																					</select>
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control"
																						id="rto_subLayerId" name="rto_subLayerId">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control"
																						id="rto_longitude" name="rto_longitude"
																						placeholder="Enter Longitude">
																				</div>

																				<!-- <div class="form-group">
																					<label for="loWardno">Zone</label> <select
																						class="form-control pb-1" id="rto_zone" name="rto_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div> -->

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
																					<label for="hsName">Regional Transport
																						Office
																					</label> <input type="text" class="form-control"
																						id="rto_regionalTransportOffice"
																						name="rto_regionalTransportOffice"
																						placeholder="Enter Regional Transport Office">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">Regional Transport
																						Officer's No</label> <input type="text"
																						class="form-control"
																						id="rto_regionalTransportOfficersNo"
																						name="rto_regionalTransportOfficersNo"
																						placeholder="Enter Regional Transport Officer's No">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">No of Officers</label> <input
																						type="text" class="form-control"
																						id="rto_noOfOfficers" name="rto_noOfOfficers"
																						placeholder="Enter No of Officers">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">No of Pending Cases</label> <input
																						type="text" class="form-control"
																						id="rto_noOfPendingCases"
																						name="rto_noOfPendingCases"
																						placeholder="Enter No of Pending Cases">
																				</div>

																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label>
																					<textarea class="form-control" id="rto_address"
																						name="rto_address" placeholder="Enter Address"></textarea>
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="hsConNo">Regional Transport
																						Officer's Name</label> <input type="text"
																						class="form-control"
																						id="rto_regionalTransportOfficersName"
																						name="rto_regionalTransportOfficersName"
																						placeholder="Enter Regional Transport Officer's Name">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">Sector No</label> <input
																						type="text" class="form-control" id="rto_sectorNo"
																						name="rto_sectorNo" placeholder="Enter Sector No">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">Permits for Taxis</label> <input
																						type="text" class="form-control"
																						id="rto_permitsForTaxis"
																						name="rto_permitsForTaxis"
																						placeholder="Enter Permits for Taxis">
																				</div>  
                                                                                                              

																				<div class="form-group">
																					<label for="hsConNo">Phone No</label> <input
																						type="text" class="form-control" id="rto_phoneNo"
																						name="rto_phoneNo" placeholder="Enter Phone No">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">Survey No</label> <input
																						type="text" class="form-control" id="rto_surveyNo"
																						name="rto_surveyNo" placeholder="Enter Survey No">
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
																		<h2 class="fs-title">Construction</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsBua">Built Up Area<</label> <input type="text"
																						class="form-control" id="rto_builtUpArea"
																						name="rto_builtUpArea"
																						placeholder="Enter Built Up Area">
																				</div>
																				<!-- 
																				<div class="form-group">
																					<label for="hsBua">No of Floors<span
																						class="mandatory">*</span></label> <input type="text"
																						class="form-control" id="rto_noOfFloors"
																						name="rto_noOfFloors" placeholder="Enter No of Floors">
																				</div> -->

																			</div>

																			<div class="col-sm-12 col-lg-6">
<!-- 
																				<div class="form-group">
																					<label for="hsBua">Type of Construction<span
																						class="mandatory">*</span></label> <input type="text"
																						class="form-control" id="rto_typeOfConstruction"
																						name="rto_typeOfConstruction"
																						placeholder="Enter Type of Construction">
																				</div> -->

																				<div class="form-group">
																					<label for="hsBua">Building Condition</label> <input
																						type="text" class="form-control"
																						id="rto_buildingCondition"
																						name="rto_buildingCondition"
																						placeholder="Enter Building Condition">
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
																		<h2 class="fs-title">Other</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issues
																						Registration Certificate</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rto_issuesRegistrationCertificate1" class="mr-2"
																						name="rto_issuesRegistrationCertificate"
																						value="true">Yes <input type="radio" 
																						id="rto_issuesRegistrationCertificate2"
																						name="rto_issuesRegistrationCertificate"
																						value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Conduct
																						Driving Test</label>
																				</div>
																				<div class="form-group">
																					<input type="radio" id="rto_conductDrivingTest1"
																						name="rto_conductDrivingTest" value="true">Yes
																					<input type="radio" id="rto_conductDrivingTest2"
																						name="rto_conductDrivingTest" value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Certificate
																						of Fitness to commercial Vehicles</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rto_certificateOfFitnessToCommercialVehicles1"
																						name="rto_certificateOfFitnessToCommercialVehicles"
																						value="true">Yes <input type="radio"
																						id="rto_certificateOfFitnessToCommercialVehicles2"
																						name="rto_certificateOfFitnessToCommercialVehicles"
																						value="false">No
																				</div>
																				<div class="form-group"></div>
																				<div class="form-group">
																					<label for="hsAddress">Road Safety Measures</label>
																					<textarea class="form-control"
																						id="rto_roadSafetyMeasures"
																						name="rto_roadSafetyMeasures"
																						placeholder="Enter Road Safety Measures"></textarea>
																				</div>

																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issues
																						Learner's License</label>
																				</div>
																				<div class="form-group">
																					<input type="radio" id="rto_issuesLearnersLicense1"
																						name="rto_issuesLearnersLicense" value="true">Yes
																					<input type="radio" id="rto_issuesLearnersLicense2"
																						name="rto_issuesLearnersLicense" value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issue
																						Badges to Public Transport Drivers</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rto_issueBadgesToPublicTransportDrivers1"
																						name="rto_issueBadgesToPublicTransportDrivers"
																						value="true">Yes <input type="radio"
																						id="rto_issueBadgesToPublicTransportDrivers2"
																						name="rto_issueBadgesToPublicTransportDrivers"
																						value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issue
																						new, duplicate or updated registration copy</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rto_issueNewDuplicateUpdatedRegistrationCopy1"
																						name="rto_issueNewDuplicateUpdatedRegistrationCopy"
																						value="true">Yes <input type="radio"
																						id="rto_issueNewDuplicateUpdatedRegistrationCopy2"
																						name="rto_issueNewDuplicateUpdatedRegistrationCopy"
																						value="false">No
																				</div>

																				<div class="form-group">
																					<label for="hsAddress">Pollution Control
																						Measures</label>
																					<textarea class="form-control"
																						id="rto_pollutionControlMeasures"
																						name="rto_pollutionControlMeasures"
																						placeholder="Enter Pollution Control Measures"></textarea>
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
																			<label for="upScimages">Upload Images<span
																				class="mandatory">*</span></label> <input type="file"
																				multiple class="form-control"
																				id="rto_geoTaggedPhoto" name="rto_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>
																	<input type="submit" name="addRtosubmit"
																		id="addRtosubmit" class="btn btn-indore mt-3"
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

					<!--RTO Add Modal end -->


					<!--RTO Update Modal start -->


					<div class="modal fade" id="dep_updateRTO_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update RTO</h4>
							<button type="button" class="close" onclick="resetForm('form_updateRto')" data-dismiss="modal">&times;</button>
							
								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														
														<div class="col-md-12 mx-0">

															<form id="form_updateRto" name="form_updateRto"
																class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li id="othertab" class="tabwithborder"><strong>Other</strong></li>
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
																						type="text" class="form-control"
																						id="rtoUp_latitude" name="rtoUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="rtoUp_ward"
																						name="rtoUp_ward">
																						<!-- <option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option> -->
																					</select>
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control"
																						id="rtoUp_subLayerId" name="rtoUp_subLayerId">
																				</div>

																				<div class="form-group">
																					<input type="hidden" class="form-control"
																						id="rtoUp_rtoId" name="rtoUp_rtoId">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control"
																						id="rtoUp_longitude" name="rtoUp_longitude"
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
																					<label for="hsName">Regional Transport
																						Office
																					</label> <input type="text" class="form-control"
																						id="rtoUp_regionalTransportOffice"
																						name="rtoUp_regionalTransportOffice"
																						placeholder="Enter Regional Transport Office">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">Regional Transport
																						Officer's No</label> <input type="text"
																						class="form-control"
																						id="rtoUp_regionalTransportOfficersNo"
																						name="rtoUp_regionalTransportOfficersNo"
																						placeholder="Enter Regional Transport Officer's No">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">No of Officers</label> <input
																						type="text" class="form-control"
																						id="rtoUp_noOfOfficers" name="rtoUp_noOfOfficers"
																						placeholder="Enter No of Officers">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">No of Pending Cases</label> <input
																						type="text" class="form-control"
																						id="rtoUp_noOfPendingCases"
																						name="rtoUp_noOfPendingCases"
																						placeholder="Enter No of Pending Cases">
																				</div>

																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label>
																					<textarea class="form-control" id="rtoUp_address"
																						name="rtoUp_address" placeholder="Enter Address"></textarea>
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="hsConNo">Regional Transport
																						Officer's Name</label> <input type="text"
																						class="form-control"
																						id="rtoUp_regionalTransportOfficersName"
																						name="rtoUp_regionalTransportOfficersName"
																						placeholder="Enter Regional Transport Officer's Name">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">Sector No</label> <input
																						type="text" class="form-control"
																						id="rtoUp_sectorNo" name="rtoUp_sectorNo"
																						placeholder="Enter Sector No">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">Permits for Taxis</label> <input
																						type="text" class="form-control"
																						id="rtoUp_permitsForTaxis"
																						name="rtoUp_permitsForTaxis"
																						placeholder="Enter Permits for Taxis">
																				</div>


																				<div class="form-group">
																					<label for="hsConNo">Phone No</label> <input
																						type="text" class="form-control"
																						id="rtoUp_phoneNo" name="rtoUp_phoneNo"
																						placeholder="Enter Phone No">
																				</div>

																				<div class="form-group">
																					<label for="hsConNo">Survey No</label> <input
																						type="text" class="form-control"
																						id="rtoUp_surveyNo" name="rtoUp_surveyNo"
																						placeholder="Enter Survey No">
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
																		<h2 class="fs-title">Construction</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsBua">Built Up Area</label> <input type="text"
																						class="form-control" id="rtoUp_builtUpArea"
																						name="rtoUp_builtUpArea"
																						placeholder="Enter Built Up Area">
																				</div>

																				</div>

																			<div class="col-sm-12 col-lg-6">

																				<!-- 		<div class="form-group">
																					<label for="hsBua">Type of Construction<span
																						class="mandatory">*</span></label> <input type="text"
																						class="form-control" id="rtoUp_typeOfConstruction"
																						name="rtoUp_typeOfConstruction" placeholder="Enter Type of Construction">
																				</div> -->

																				<div class="form-group">
																					<label for="hsBua">Building Condition</label> <input
																						type="text" class="form-control"
																						id="rtoUp_buildingCondition"
																						name="rtoUp_buildingCondition"
																						placeholder="Enter Building Condition">
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
																		<h2 class="fs-title">Other</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issues
																						Registration Certificate</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rtoUp_issuesRegistrationCertificate1"
																						name="rtoUp_issuesRegistrationCertificate"
																						value="true">Yes <input type="radio"
																						id="rtoUp_issuesRegistrationCertificate2"
																						name="rtoUp_issuesRegistrationCertificate"
																						value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Conduct
																						Driving Test</label>
																				</div>
																				<div class="form-group">
																					<input type="radio" id="rtoUp_conductDrivingTest1"
																						name="rtoUp_conductDrivingTest" value="true">Yes
																					<input type="radio" id="rtoUp_conductDrivingTest2"
																						name="rtoUp_conductDrivingTest" value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Certificate
																						of Fitness to commercial Vehicles</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rtoUp_certificateOfFitnessToCommercialVehicles1"
																						name="rtoUp_certificateOfFitnessToCommercialVehicles"
																						value="true">Yes <input type="radio"
																						id="rtoUp_certificateOfFitnessToCommercialVehicles2"
																						name="rtoUp_certificateOfFitnessToCommercialVehicles"
																						value="false">No
																				</div>
																				<div class="form-group"></div>
																				<div class="form-group">
																					<label for="hsAddress">Road Safety Measures</label>
																					<textarea class="form-control"
																						id="rtoUp_roadSafetyMeasures"
																						name="rtoUp_roadSafetyMeasures"
																						placeholder="Enter Road Safety Measures"></textarea>
																				</div>

																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issues
																						Learner's License</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rtoUp_issuesLearnersLicense1"
																						name="rtoUp_issuesLearnersLicense" value="true">Yes
																					<input type="radio"
																						id="rtoUp_issuesLearnersLicense2"
																						name="rtoUp_issuesLearnersLicense" value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issue
																						Badges to Public Transport Drivers</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rtoUp_issueBadgesToPublicTransportDrivers1"
																						name="rtoUp_issueBadgesToPublicTransportDrivers"
																						value="true">Yes <input type="radio"
																						id="rtoUp_issueBadgesToPublicTransportDrivers2"
																						name="rtoUp_issueBadgesToPublicTransportDrivers"
																						value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issue
																						new, duplicate or updated registration copy</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rtoUp_issueNewDuplicateUpdatedRegistrationCopy1"
																						name="rtoUp_issueNewDuplicateUpdatedRegistrationCopy"
																						value="true">Yes <input type="radio"
																						id="rtoUp_issueNewDuplicateUpdatedRegistrationCopy2"
																						name="rtoUp_issueNewDuplicateUpdatedRegistrationCopy"
																						value="false">No
																				</div>

																				<div class="form-group">
																					<label for="hsAddress">Pollution Control
																						Measures</label>
																					<textarea class="form-control"
																						id="rtoUp_pollutionControlMeasures"
																						name="rtoUp_pollutionControlMeasures"
																						placeholder="Enter Pollution Control Measures"></textarea>
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
																			<label for="upScimages">Upload Images<span
																				class="mandatory">*</span></label> <input type="file"
																				multiple class="form-control"
																				id="rtoUp_geoTaggedPhoto"
																				name="rtoUp_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>
																	<input type="submit" id="rtoUpdateSubmit"
																		name="rtoUpdateSubmit" class="btn btn-indore mt-3"
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

					<!--RTO Update Modal end -->


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

<script type="text/javascript"
	src="${context}/js/jquery.validate.min.js"></script>
<script src="${context}/js/utils.js"></script>
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript"
	src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/designer/rto_dept.js"></script>

</body>
</html>