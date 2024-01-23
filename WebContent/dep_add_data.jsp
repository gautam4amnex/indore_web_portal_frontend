<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<c:set value="${pageContext.request.contextPath}" var="context" />

<c:set var="language"
	value="${lang eq 'en' or lang eq 'gu' ? lang : pageContext.request.locale.language}"
	scope="session" />
<fmt:setLocale value="${language}" />

				<!--Hospital add Modal start -->
					<div class="modal fade" id="addHospital_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Hospital</h4>
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

															<form id="form_addHospital" name="form_addHospital" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li id="facilitiestab" class="tabwithborder"><strong>Facilities</strong></li>
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
																						type="text" class="form-control" id="hospital_latitude" name="hospital_latitude"
																						placeholder="Enter Latitude" required>
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="hospital_ward" name="hospital_ward">
																					</select>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="hospital_longitude" name="hospital_longitude"
																						placeholder="Enter Longitude" required>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="hospital_subLayerId" name="hospital_subLayerId">
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
																					<label for="hsName">Hospital Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="hospital_name"
																						name="hospital_name" placeholder="Enter Hospital Name" required>
																				</div>
																				<div class="form-group">
																					<label for="hsType">Hospital Type</label> 
																					<select
																						class="form-control pb-1" id="hospital_type" name="hospital_type">
																						<option value="">Select Hospital Type</option>
																						<option value="Clinic">Clinic</option>
																						<option value="Government">Government</option>
																						<option value="Private">Private</option>
																						<option value="Trust">Trust</option>
																						<option value="Multi-specialty">Multi-specialty</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsOwner">Ownership Type</label> <select
																						class="form-control pb-1" id="hospital_ownershipType" name="hospital_ownershipType">
																						<option value="">Select Ownership Type</option>
																						<option value="Private">Private</option>
																						<option value="Government">Government</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hodName">HOD Name</label> <input
																						type="text" class="form-control" id="hospital_hodName" name="hospital_hodName"
																						placeholder="Enter HOD Name">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsCategory">Hospital Category</label> <select
																						class="form-control pb-1" id="hospital_category" name="hospital_category">
																						<option value="">Select Category</option>
																						<option value="Children">Children</option>
																						<option value="Cancer">Cancer</option>
																						<option value="TB">TB</option>
																						<option value="ENT Specialist">ENT Specialist</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsConNo">Emergency Service Contact No</label> <input
																						type="text" class="form-control" id="hospital_emergencyContactno"
																						name="hospital_emergencyContactno" placeholder="Enter Emergency Service Contact No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsRecognized">Recognized By</label> <input
																						type="text" class="form-control"
																						id="hospital_recognizedBy" name="hospital_recognizedBy"
																						placeholder="Enter Recognized By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="hospital_address" name="hospital_address"
																						placeholder="Enter Address" required></textarea>
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
																		<h2 class="fs-title">Facilities & Services</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="hsCategory">Emergency Service</label> <select
																						class="form-control pb-1" id="hospital_emergencyService" name="hospital_emergencyService">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsCategory">Blood Bank Facility</label> <select
																						class="form-control pb-1" id="hospital_bloodBankFacility" name="hospital_bloodBankFacility">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsCategory">Mortuary</label> <select
																						class="form-control pb-1" id="hospital_mortuary" name="hospital_mortuary">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsWard">Hospital Ward</label>
																					<textarea class="form-control" rows="2" name="hospital_wardInfo"
																						id="hospital_wardInfo" placeholder="Enter Hospital Ward"></textarea>
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
																						class="form-control" id="hospital_builtUpArea"
																						name="hospital_builtUpArea" placeholder="Enter Built Up Area">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsBua">Hospital Area</label> <input type="text"
																						class="form-control" id="hospital_area"
																						name="hospital_area" placeholder="Enter Hospital Area">
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
																					<label for="hsConType">No of ICU</label> <input
																						type="text" class="form-control" id="hospital_noOfIcu"
																						name="hospital_noOfIcu" placeholder="Enter No of ICU">
																				</div>
																				<div class="form-group">
																					<label for="scRte">Road Connectivity to Hospital<span class="mandatory">*</span></label>
																					<textarea class="form-control" rows="2" id="hospital_roadConnectivity"
																						name="hospital_roadConnectivity" placeholder="Description" required></textarea>
																				</div>
																				<div class="form-group">
																					<label for="hsConType">Police Station No</label> <input
																						type="text" class="form-control" id="hospital_policeStationNo"
																						name="hospital_policeStationNo" placeholder="Enter Police Station No">
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsConType">Bed Count</label> <input
																						type="text" class="form-control" id="hospital_bedCount"
																						name="hospital_bedCount" placeholder="Enter Bed Count">
																				</div>
																				<div class="form-group">
																					<label for="scRteact">Remarks</label>
																					<textarea class="form-control" rows="2" name="hospital_remarks"
																						id="hospital_remarks" placeholder="Description"></textarea>
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
																				type="file" multiple class="form-control" 
																				id="hospital_geoTaggedPhoto" name="hospital_geoTaggedPhoto" required>
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" id="add_hospital_data_submit"
																		name="add_hospital_data_submit" class="btn btn-indore mt-3"
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
					<!--Hospital Add Modal end -->

<!-- UPHC add Modal start -->

<div class="modal fade" id="addUphc_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add UPHC</h4>
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

															<form id="form_addUphc" name="form_addUphc" class="msform form-admin">
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
																						type="text" class="form-control" id="uphc_latitude" name="uphc_latitude"
																						placeholder="Enter Latitude" required>
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="uphc_ward" name="uphc_ward">
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="uphc_longitude" name="uphc_longitude"
																						placeholder="Enter Longitude" required>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="uphc_subLayerId" name="uphc_subLayerId">
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
																					<label for="hsName">UPHC Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="uphc_name"
																						name="uphc_name" placeholder="Enter Uphc Name" required>
																				</div>
																				<div class="form-group">
																					<label for="hsName">Medical Officer</label> <input
																						type="text" class="form-control" id="uphc_medicalOfficer"
																						name="uphc_medicalOfficer" placeholder="Enter Medical Officer">
																				</div>
																				<div class="form-group">
																					<label for="hsName">Slum Population</label> <input
																						type="text" class="form-control" id="uphc_slumPopulation"
																						name="uphc_slumPopulation" placeholder="Enter Slum Population">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Total Population</label> <input
																						type="text" class="form-control" id="uphc_totalPopulation"
																						name="uphc_totalPopulation" placeholder="Enter Total Population">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hodName">Supervisor No</label> <input
																						type="text" class="form-control" id="hospital_supervisorNo" 
																						name="hospital_supervisorNo" placeholder="Enter Supervisor No">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsConNo">Supervisor Name</label> <input
																						type="text" class="form-control" id="uphc_supervisorName"
																						name="uphc_supervisorName" placeholder="Enter Supervisor Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsConNo">Medical Officer No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="uphc_medicalOfficerNo"
																						name="uphc_medicalOfficerNo" placeholder="Enter Medical Officer No" required>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Ward wise Population</label> <input
																						type="text" class="form-control" id="uphc_wardWisePopulation"
																						name="uphc_wardWisePopulation" placeholder="Enter Ward wise Population">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="uphc_address" name="uphc_address"
																						placeholder="Enter Address" required></textarea>
																				</div>
																				
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<input type="submit" id="add_data_uphc_submit" name="add_data_uphc_submit"
																		 class="btn btn-indore mt-3"
																		value="Submit" />
<!-- 																	<button type="button" name="next" -->
<!-- 																		class="next action-button float-right"> -->
<!-- 																	<i class="fa fa-angle-right" aria-hidden="true"></i> -->
<!-- 																	</button> -->
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images</label> <input -->
<!-- 																				type="file" multiple class="form-control" id="uphc_geoTaggedPhoto"  -->
<!-- 																				name="uphc_geoTaggedPhoto"> -->
<!-- 																		</div> -->
<!-- 																		<ul class="imageslist"></ul> -->
<!-- 																	</div> -->
<!-- 																	<button type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left"> -->
<!-- 																		 <i class="fa fa-angle-left" aria-hidden="true"></i> -->
<!-- 																	</button>	 -->
<!-- 																	<input type="submit" id="add_data_uphc_submit" name="add_data_uphc_submit" -->
<!-- 																		 class="btn btn-indore mt-3" -->
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

<!-- UPHC add Modal end -->


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
																					<label for="hsBua">Built Up Area</label> <input type="text"
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
																			<div class="col-sm-12 col-lg-6 p-1">
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issues
																						Registration Certificate</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rto_issuesRegistrationCertificate1" class="mr-2"
																						name="rto_issuesRegistrationCertificate"
																						value="true">Yes <input type="radio" class="ml-3 mr-2"
																						id="rto_issuesRegistrationCertificate2"
																						name="rto_issuesRegistrationCertificate"
																						value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Conduct
																						Driving Test</label>
																				</div>
																				<div class="form-group">
																					<input type="radio" id="rto_conductDrivingTest1" class="mr-2"
																						name="rto_conductDrivingTest" value="true">Yes
																					<input type="radio" id="rto_conductDrivingTest2" class="ml-3 mr-2"
																						name="rto_conductDrivingTest" value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Certificate
																						of Fitness to commercial Vehicles</label>
																				</div>
																				<div class="form-group">
																					<input type="radio" class="mr-2"
																						id="rto_certificateOfFitnessToCommercialVehicles1"
																						name="rto_certificateOfFitnessToCommercialVehicles"
																						value="true">Yes <input type="radio" class="ml-3 mr-2"
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
																			<div class="col-sm-12 col-lg-6 p-1">
																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issues
																						Learner's License</label>
																				</div>
																				<div class="form-group">
																					<input type="radio" id="rto_issuesLearnersLicense1" class="mr-2"
																						name="rto_issuesLearnersLicense" value="true">Yes
																					<input type="radio" id="rto_issuesLearnersLicense2" class="ml-3 mr-2"
																						name="rto_issuesLearnersLicense" value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issue
																						Badges to Public Transport Drivers</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rto_issueBadgesToPublicTransportDrivers1" class="mr-2"
																						name="rto_issueBadgesToPublicTransportDrivers"
																						value="true">Yes <input type="radio"
																						id="rto_issueBadgesToPublicTransportDrivers2" class="ml-3 mr-2"
																						name="rto_issueBadgesToPublicTransportDrivers"
																						value="false">No
																				</div>

																				<div class="form-group">
																					<label class="radio-inline" for="hsConType">Issue
																						new, duplicate or updated registration copy</label>
																				</div>
																				<div class="form-group">
																					<input type="radio"
																						id="rto_issueNewDuplicateUpdatedRegistrationCopy1" class="mr-2"
																						name="rto_issueNewDuplicateUpdatedRegistrationCopy"
																						value="true">Yes <input type="radio"
																						id="rto_issueNewDuplicateUpdatedRegistrationCopy2" class="ml-3 mr-2"
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



<!--Primary add Modal start -->

<div class="modal fade" id="addPrimarySchool_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Primary School</h4>
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

															<form id="form_addPrimarySchool" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Facilities</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li>
																	<li data_translate="_images" id="imagestab" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="primary_latitude" 
																						name="primary_latitude" placeholder="Enter Latitude" required>
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Ward No</label> <select
																						class="form-control pb-1" id="primary_ward" name="primary_ward">
																					</select>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="primary_longitude" 
																						name="primary_longitude" placeholder="Enter Longitude" required>
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="primary_subLayerId" name="primary_subLayerId">
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
																					<label for="scName">School Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="primary_schoolName"
																						name="primary_schoolName" placeholder="Enter School Name" required>
																				</div>
																				<div class="form-group">
																					<label for="scType">School Type</label> <select
																						class="form-control pb-1" id="primary_schoolType" name="primary_schoolType">
																						<option value="">Select School Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">School Management</label> <select
																						class="form-control pb-1" id="primary_schoolManagement" name="primary_schoolManagement">
																						<option value="">Select School Management</option>
																						<option value="State Government">State Government</option>
																						<option value="Central Government">Central Government</option>
																						<option value="Private">Private</option>
																						<option value="Local Body">Local Body</option>
																						<option value="Madarsa">Madarsa</option>
																						<option value="Trust">Trust</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="principalName">Principal Name</label> <input
																						type="text" class="form-control"
																						id="primary_principalName" name="primary_principalName"
																						placeholder="Enter Principal Name">
																				</div>
																				<div class="form-group">
																					<label for="scYearre">Year Of Reorganization<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="primary_YearOfReorganization"
																						name="primary_YearOfReorganization" placeholder="Enter Year of Reorganization" required>
																					
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">In Take Students</label> <input
																						type="text" class="form-control" id="primary_inTakeStudents"
																						name="primary_inTakeStudents" placeholder="Enter In Take Students">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Staff Vacancy</label> <input
																						type="text" class="form-control" id="primary_staffVacancy"
																						name="primary_staffVacancy" placeholder="Enter no of staff vacancy">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scConNo">School Contact No</label> <input
																						type="text" class="form-control" id="primary_contactNo" 
																						name="primary_contactNo" placeholder="Enter School Contact No">
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Select Category</label> <select
																						class="form-control pb-1" id="primary_category" name="primary_category">
																						<option value="">Select Category</option>
																						<option value="Girls">Girls</option>
																						<option value="Boys">Boys</option>
																						<option value="Co-education">Co-education</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scMoi">Medium Of Instruction</label> <input
																						type="text" class="form-control" id="primary_mediumOfInstruction"
																						name="primary_mediumOfInstruction" placeholder="Enter Medium Of Instruction">
																				</div>
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="scPrincipalNo">Principal -->
<!-- 																						Contact No</label> <input type="text" class="form-control" -->
<!-- 																						id="scPrincipalNo" -->
<!-- 																						placeholder="Enter Principal Contact No"> -->
<!-- 																				</div> -->
																				<div class="form-group">
																					<label for="scPrincipalNo">Passing
																						Percentage</label> <input type="text" class="form-control"
																						id="primary_passingPercentage" name="primary_passingPercentage"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="primary_teachingStaff" name="primary_teachingStaff"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="primary_nonTeachingStaff" name="primary_nonTeachingStaff"
																						placeholder="Enter No Of Non Teaching Staff">
																				</div>
																				
																				<div class="form-group">
																					<label for="scName">School Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control" rows="2" id="primary_schoolAddress"
																						name="primary_schoolAddress" placeholder="Enter School Address" required></textarea>
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
																		<h2 class="fs-title">Facilities & Services</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scCategory">Male Hostel</label> <select
																						class="form-control pb-1" id="primary_maleHostel" name="primary_maleHostel">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="primary_maleToilet" name="primary_maleToilet">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="primary_playGround" name="primary_playGround">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="primary_library" name="primary_library">
																							<option value="">Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="primary_femaleHostel" name="primary_femaleHostel">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="primary_femaleToilet" name="primary_femaleToilet">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground Area</label> 
																					<input type="text" class="form-control" placeholder="Enter Play Ground Area"
																						id="primary_playGroundAera" name="primary_playGroundAera"/>
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
																					<label for="conBua">Built Up Area</label> <input type="text"
																						class="form-control" id="primary_builtUpArea"
																						name="primary_builtUpArea" placeholder="Enter Built Up Area">
																				</div>
																				<div class="form-group">
																					<label for="conFloor">No Of Floors</label> <input
																						type="text" class="form-control" id="primary_noOfFloors"
																						name="primary_noOfFloors" placeholder="Enter Floors">
																				</div>
																				<div class="form-group">
																					<label for="conSmartcr">No Of Smart Class
																						Room</label> <input type="text" class="form-control"
																						id="primary_noOfSmartClassrooms" name="primary_noOfSmartClassrooms"
																						placeholder="Enter Smart Class Room">
																				</div>
																				<div class="form-group">
																					<label for="conClassr">No Of Class Room</label> <input
																						type="text" class="form-control" id="primary_noOfClassrooms"
																						name="primary_noOfClassrooms" placeholder="Enter Class Room">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conType">Type Of Construction</label> <input
																						type="text" class="form-control" id="primary_typeOfConstruction"
																						name="primary_typeOfConstruction" placeholder="Enter Type Of Construction">
																				</div>
																				<div class="form-group">
																					<label for="conBcondition">Building
																						Condition</label> <input type="text" class="form-control"
																						id="primary_buildingCondition" name="primary_buildingCondition"
																						placeholder="Enter Building Condition">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">No Of Student</label> <input
																						type="text" class="form-control" id="primary_noOfStudents"
																						name="primary_noOfStudents" placeholder="Enter No of Students">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">Condition of Road Connectivity</label> <input
																						type="text" class="form-control" id="primary_roadConnectivity"
																						name="primary_roadConnectivity" placeholder="Enter Condition of Road Connectivity">
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
																					<label for="scRte">RTE Complaint</label>
																					<textarea class="form-control" rows="2" id="primary_rteComplaint"
																						name="primary_rteComplaint" placeholder="RTE Complaint"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scSdmc">RTE SDMC</label>
																					<textarea class="form-control" rows="2" id="primary_rteSdmc"
																						name="primary_rteSdmc" placeholder="RTE SDMC"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scFindings">Funding Scheme</label>
																					<textarea class="form-control" rows="2" name="primary_fundingScheme"
																						id="primary_fundingScheme" placeholder="Funding Scheme"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRteact">RTE Act</label>
																					<textarea class="form-control" rows="2" name="primary_rteAct"
																						id="primary_rteAct" placeholder="RTE Act"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scGer">GER</label>
																					<textarea class="form-control" rows="2" id="primary_ger" 
																					name="primary_ger" placeholder="GER"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="conStudent">Category wise Students</label> <input
																						type="text" class="form-control" id="primary_categoryWiseStudents"
																						name="primary_categoryWiseStudents" placeholder="Enter Category wise Students">
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
																				type="file" multiple class="form-control" id="primary_geoTaggedPhoto" name="primary_geoTaggedPhoto"
																				required>
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<input type="submit" id="add_primary_school"
																		name="add_primary_school" class="btn btn-indore mt-3"
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

<!--Primary Add Modal end -->


<!-- Secondary Add Modal Start -->

<div class="modal fade" id="addSecondary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Secondary School</h4>
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

															<form id="form_addSecondarySchool" name="form_addSecondarySchool" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Facilities</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li>
																	<li data_translate="_images" id="imagestab" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="secondary_latitude" 
																						name="secondary_latitude" placeholder="Enter Latitude" required>
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Ward No</label> <select
																						class="form-control pb-1" id="secondary_ward" name="secondary_ward">
																					</select>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="secondary_longitude" 
																						name="secondary_longitude" placeholder="Enter Longitude" required>
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="secondary_subLayerId" name="secondary_subLayerId">
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
																					<label for="scName">School Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="secondary_schoolName"
																						name="secondary_schoolName" placeholder="Enter School Name" required>
																				</div>
																				<div class="form-group">
																					<label for="scType">School Type</label> <select
																						class="form-control pb-1" id="secondary_schoolType" name="secondary_schoolType">
																						<option value="">Select School Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">School Management</label> <select
																						class="form-control pb-1" id="secondary_schoolManagement" name="secondary_schoolManagement">
																						<option value="">Select School Management</option>
																						<option value="State Government">State Government</option>
																						<option value="Central Government">Central Government</option>
																						<option value="Private">Private</option>
																						<option value="Local Body">Local Body</option>
																						<option value="Madarsa">Madarsa</option>
																						<option value="Trust">Trust</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="principalName">Principal Name</label> <input
																						type="text" class="form-control"
																						id="secondary_principalName" name="secondary_principalName"
																						placeholder="Enter Principal Name">
																				</div>
																				<div class="form-group">
																					<label for="scYearre">Year Of Reorganization<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="secondary_YearOfReorganization"
																						name="secondary_YearOfReorganization" placeholder="Enter Year of Reorganization" required>
																					
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">In Take Students</label> <input
																						type="text" class="form-control" id="secondary_inTakeStudents"
																						name="secondary_inTakeStudents" placeholder="Enter In Take Students">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">No Of Student</label> <input
																						type="text" class="form-control" id="secondary_noOfStudents"
																						name="secondary_noOfStudents" placeholder="Enter No of Students">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Staff Vacancy</label> <input
																						type="text" class="form-control" id="secondary_staffVacancy"
																						name="secondary_staffVacancy" placeholder="Enter no of staff vacancy">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Affiliated Schools</label> <select class="form-control pb-1" 
																						id="secondary_affiliatedSchools" name="secondary_affiliatedSchools">
																						<option value="">Select Affiliated Schools</option>
																						<option value="Private">Private</option>
																						<option value="State Government">State Government</option>
																						<option value="CBSE">CBSE</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scName">School Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control" rows="2" id="secondary_schoolAddress"
																						name="secondary_schoolAddress" placeholder="Enter School Address" required></textarea>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scConNo">School Contact No</label> <input
																						type="text" class="form-control" id="secondary_contactNo"
																						name="secondary_contactNo" placeholder="Enter School Contact No">
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Select Category</label> <select
																						class="form-control pb-1" id="secondary_category" name="secondary_category">
																						<option value="">Select Category</option>
																						<option value="Girls">Girls</option>
																						<option value="Boys">Boys</option>
																						<option value="Co-education">Co-education</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scMoi">Medium Of Instruction</label> <input
																						type="text" class="form-control" id="secondary_mediumOfInstruction"
																						name="secondary_mediumOfInstruction" placeholder="Enter Medium Of Instruction">
																				</div>
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="scPrincipalNo">Principal -->
<!-- 																						Contact No</label> <input type="text" class="form-control" -->
<!-- 																						id="scPrincipalNo" -->
<!-- 																						placeholder="Enter Principal Contact No"> -->
<!-- 																				</div> -->
																				<div class="form-group">
																					<label for="scPrincipalNo">Passing
																						Percentage</label> <input type="text" class="form-control"
																						id="secondary_passingPercentage" name="secondary_passingPercentage"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="secondary_teachingStaff" name="secondary_teachingStaff"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="secondary_nonTeachingStaff" name="secondary_nonTeachingStaff"
																						placeholder="Enter No Of Non Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">List of Courses</label> 
																					<select class="form-control pb-1" 
																						id="secondary_listOfCourses" name="secondary_listOfCourses">
																						<option value="">List of Courses</option>
																						<option value="Maths">Maths</option>
																						<option value="Science">Science</option>
																						<option value="Hindi">Hindi</option>
																						<option value="English">English</option>
																						<option value="History">History</option>
																						<option value="Literature">Literature</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Eligibility Criteria</label> <select class="form-control pb-1" 
																						id="secondary_eligibilityCriteria" name="secondary_eligibilityCriteria">
																						<option value="">Select Eligibility Criteria</option>
																						<option value="50%">50%</option>
																						<option value="60%">60%</option>
																						<option value="80%">80%</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="conStudent">Category wise Students</label> <input
																						type="text" class="form-control" id="secondary_categoryWiseStudents"
																						name="secondary_categoryWiseStudents" placeholder="Enter Category wise Students">
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
																		<h2 class="fs-title">Facilities & Services</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scCategory">Male Hostel</label> <select
																						class="form-control pb-1" id="secondary_maleHostel" name="secondary_maleHostel">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="secondary_maleToilet" name="secondary_maleToilet">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="secondary_playGround" name="secondary_playGround">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="secondary_library" name="secondary_library">
																							<option value="">Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="secondary_femaleHostel" name="secondary_femaleHostel">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="secondary_femaleToilet" name="secondary_femaleToilet">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground Area</label> 
																					<input type="text" class="form-control" placeholder="Enter Play Ground Area"
																						id="secondary_playGroundAera" name="secondary_playGroundAera"/>
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
																					<label for="conBua">Built Up Area<span
																						class="mandatory">*</span></label> <input type="text"
																						class="form-control" id="secondary_builtUpArea"
																						name="secondary_builtUpArea" placeholder="Enter Built Up Area">
																				</div>
																				<div class="form-group">
																					<label for="conFloor">No Of Floors</label> <input
																						type="text" class="form-control" id="secondary_noOfFloors"
																						name="secondary_noOfFloors" placeholder="Enter Floors">
																				</div>
																				<div class="form-group">
																					<label for="conSmartcr">No Of Smart Class
																						Room</label> <input type="text" class="form-control"
																						id="secondary_noOfSmartClassrooms" name="secondary_noOfSmartClassrooms"
																						placeholder="Enter Smart Class Room">
																				</div>
																				<div class="form-group">
																					<label for="conClassr">No Of Class Room</label> <input
																						type="text" class="form-control" id="secondary_noOfClassrooms"
																						name="secondary_noOfClassrooms" placeholder="Enter Class Room">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conType">Type Of Construction</label> <input
																						type="text" class="form-control" id="secondary_typeOfConstruction"
																						name="secondary_typeOfConstruction" placeholder="Enter Type Of Construction">
																				</div>
																				<div class="form-group">
																					<label for="conBcondition">Building
																						Condition</label> <input type="text" class="form-control"
																						id="secondary_buildingCondition" name="secondary_buildingCondition"
																						placeholder="Enter Building Condition">
																				</div>
																				
																				<div class="form-group">
																					<label for="conStudent">Condition of Road Connectivity</label> <input
																						type="text" class="form-control" id="secondary_roadConnectivity"
																						name="secondary_roadConnectivity" placeholder="Enter Condition of Road Connectivity">
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
																					<label for="scRte">RTE Complaint</label>
																					<textarea class="form-control" rows="2" id="secondary_rteComplaint"
																						name="secondary_rteComplaint" placeholder="RTE Complaint"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scSdmc">RTE SDMC</label>
																					<textarea class="form-control" rows="2" id="secondary_rteSdmc"
																						name="secondary_rteSdmc" placeholder="RTE SDMC"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scFindings">Funding Scheme</label>
																					<textarea class="form-control" rows="2" name="secondary_fundingScheme"
																						id="secondary_fundingScheme" placeholder="Funding Scheme"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRteact">RTE Act</label>
																					<textarea class="form-control" rows="2" name="secondary_rteAct"
																						id="secondary_rteAct" placeholder="RTE Act"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scGer">GER</label>
																					<textarea class="form-control" rows="2" id="secondary_ger" 
																					name="secondary_ger" placeholder="GER"></textarea>
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
																				type="file" multiple class="form-control" id="secondary_geoTaggedPhoto" name="secondary_geoTaggedPhoto"
																				required>
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
					
<!-- Secondary Add Modal End -->


<!-- 					UNIVERSITY ADDD MODAL START -->
					
						<div class="modal fade" id="addUniversity_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add University</h4>
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

															<form id="form_addUniversity" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Facilities</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li>
																	<li data_translate="_images" id="imagestab" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="university_latitude" 
																						name="university_latitude" placeholder="Enter Latitude" required>
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Ward No</label> <select
																						class="form-control pb-1" id="university_ward" name="university_ward">
																						
																					</select>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="university_longitude" 
																						name="university_longitude" placeholder="Enter Longitude" required>
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="university_subLayerId" name="university_subLayerId">
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
																					<label for="scName">University Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="university_name"
																						name="university_name" placeholder="Enter University Name" required>
																				</div>
																				<div class="form-group">
																					<label for="scType">University Type</label> <select
																						class="form-control pb-1" id="university_type" name="university_type">
																						<option value="">Select University Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">University Management</label> <select
																						class="form-control pb-1" id="university_management" name="university_management">
																						<option value="">Select University Management</option>
																						<option value="State Government">State Government</option>
																						<option value="Central Government">Central Government</option>
																						<option value="Private">Private</option>
																						<option value="Local Body">Local Body</option>
																						<option value="Madarsa">Madarsa</option>
																						<option value="Trust">Trust</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="principalName">Principal Name</label> <input
																						type="text" class="form-control"
																						id="university_principalName" name="university_principalName"
																						placeholder="Enter Principal Name">
																				</div>
																				<div class="form-group">
																					<label for="scYearre">Year Of Reorganization<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="university_YearOfReorganization"
																						name="university_YearOfReorganization" placeholder="Enter Year of Reorganization" required>
																					
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">In Take Students</label> <input
																						type="text" class="form-control" id="university_inTakeStudents"
																						name="university_inTakeStudents" placeholder="Enter In Take Students">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">No Of Student</label> <input
																						type="text" class="form-control" id="university_noOfStudents"
																						name="university_noOfStudents" placeholder="Enter No of Students">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Staff Vacancy</label> <input
																						type="text" class="form-control" id="university_staffVacancy"
																						name="university_staffVacancy" placeholder="Enter no of staff vacancy">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Affiliated Colleges</label> <select class="form-control pb-1" 
																						id="university_affiliatedColleges" name="university_affiliatedColleges">
																						<option value="">Select Affiliated Colleges</option>
																						<option value="Government">Government</option>
																						<option value="Private">Private</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scName">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control" rows="2" id="university_address"
																						name="university_address" placeholder="Enter Address" required></textarea>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
 																				<div class="form-group"> 
 																					<label for="scConNo">Contact No</label> <input 
 																						type="text" class="form-control" id="university_contactNo"
 																						name="university_contactNo" placeholder="Enter Contact No">
 																				</div> 
																				<div class="form-group">
																					<label for="scCategory">Select Category</label> <select
																						class="form-control pb-1" id="university_category" name="university_category">
																						<option value="">Select Category</option>
																						<option value="Girls">Girls</option>
																						<option value="Boys">Boys</option>
																						<option value="Co-education">Co-education</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scMoi">Medium Of Instruction</label> <input
																						type="text" class="form-control" id="university_mediumOfInstruction"
																						name="university_mediumOfInstruction" placeholder="Enter Medium Of Instruction">
																				</div>
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="scPrincipalNo">Principal -->
<!-- 																						Contact No</label> <input type="text" class="form-control" -->
<!-- 																						id="scPrincipalNo" -->
<!-- 																						placeholder="Enter Principal Contact No"> -->
<!-- 																				</div> -->
																				<div class="form-group">
																					<label for="scPrincipalNo">Passing
																						Percentage</label> <input type="text" class="form-control"
																						id="university_passingPercentage" name="university_passingPercentage"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="university_teachingStaff" name="university_teachingStaff"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="university_nonTeachingStaff" name="university_nonTeachingStaff"
																						placeholder="Enter No Of Non Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">List of Courses</label> 
																					<select class="form-control pb-1" 
																						id="university_listOfCourses" name="university_listOfCourses">
																						<option value="">List of Courses</option>
																						<option value="BCom">BCom</option>
																						<option value="BBA">BBA</option>
																						<option value="MCom">MCom</option>
																						<option value="MBA">MBA</option>
																						<option value="BCA">BCA</option>
																						<option value="MCA">MCA</option>
																						<option value="Diploma">Diploma</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Eligibility Criteria</label> <select class="form-control pb-1" 
																						id="university_eligibilityCriteria" name="university_eligibilityCriteria">
																						<option value="">Select Eligibility Criteria</option>
																						<option value="50%">50%</option>
																						<option value="60%">60%</option>
																						<option value="80%">80%</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="conStudent">Category wise Students</label> <input
																						type="text" class="form-control" id="university_categoryWiseStudents"
																						name="university_categoryWiseStudents" placeholder="Enter Category wise Students">
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
																		<h2 class="fs-title">Facilities & Services</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scCategory">Male Hostel</label> <select
																						class="form-control pb-1" id="university_maleHostel" name="university_maleHostel">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="university_maleToilet" name="university_maleToilet">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="university_playGround" name="university_playGround">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="university_library" name="university_library">
																							<option value="">Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="university_femaleHostel" name="university_femaleHostel">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="university_femaleToilet" name="university_femaleToilet">
																						<option value="">Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground Area</label> 
																					<input type="text" class="form-control" placeholder="Enter Play Ground Area"
																						id="university_playGroundAera" name="university_playGroundAera"/>
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
																					<label for="conBua">Built Up Area<span
																						class="mandatory">*</span></label> <input type="text"
																						class="form-control" id="university_builtUpArea"
																						name="university_builtUpArea" placeholder="Enter Built Up Area">
																				</div>
																				<div class="form-group">
																					<label for="conFloor">No Of Floors</label> <input
																						type="text" class="form-control" id="university_noOfFloors"
																						name="university_noOfFloors" placeholder="Enter Floors">
																				</div>
																				<div class="form-group">
																					<label for="conSmartcr">No Of Smart Class
																						Room</label> <input type="text" class="form-control"
																						id="university_noOfSmartClassrooms" name="university_noOfSmartClassrooms"
																						placeholder="Enter Smart Class Room">
																				</div>
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="conClassr">No Of Class Room</label> <input -->
<!-- 																						type="text" class="form-control" id="university_noOfClassrooms" -->
<!-- 																						name="university_noOfClassrooms" placeholder="Enter Class Room"> -->
<!-- 																				</div> -->
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conType">Type Of Construction</label> <input
																						type="text" class="form-control" id="university_typeOfConstruction"
																						name="university_typeOfConstruction" placeholder="Enter Type Of Construction">
																				</div>
																				<div class="form-group">
																					<label for="conBcondition">Building
																						Condition</label> <input type="text" class="form-control"
																						id="university_buildingCondition" name="university_buildingCondition"
																						placeholder="Enter Building Condition">
																				</div>
																				
																				<div class="form-group">
																					<label for="conStudent">Condition of Road Connectivity</label> <input
																						type="text" class="form-control" id="university_roadConnectivity"
																						name="university_roadConnectivity" placeholder="Enter Condition of Road Connectivity">
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
																					<label for="scRte">RTE Complaint</label>
																					<textarea class="form-control" rows="2" id="university_rteComplaint"
																						name="university_rteComplaint" placeholder="RTE Complaint"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scSdmc">RTE SDMC</label>
																					<textarea class="form-control" rows="2" id="university_rteSdmc"
																						name="university_rteSdmc" placeholder="RTE SDMC"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scFindings">Funding Scheme</label>
																					<textarea class="form-control" rows="2" name="university_fundingScheme"
																						id="university_fundingScheme" placeholder="Funding Scheme"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRteact">RTE Act</label>
																					<textarea class="form-control" rows="2" name="university_rteAct"
																						id="university_rteAct" placeholder="RTE Act"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scGer">GER</label>
																					<textarea class="form-control" rows="2" id="university_ger" 
																					name="university_ger" placeholder="GER"></textarea>
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
																				type="file" multiple class="form-control" id="university_geoTaggedPhoto" 
																				name="university_geoTaggedPhoto" required>
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
					
<!-- 				UNIVERSITY ADDD MODAL END -->


<!-- 	ADD POLICE CHOWKI MODAL START -->
					
					<div class="modal fade" id="addPoliceChowki_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Police Chowki</h4>
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

															<form id="form_addPoliceChowki" class="msform form-admin">
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
																						type="text" class="form-control" id="policeChowki_latitude" 
																						name="policeChowki_latitude" placeholder="Enter Latitude" required>
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label><select
																						class="form-control pb-1" id="policeChowki_ward" name="policeChowki_ward">
																					</select>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeChowki_longitude" 
																						name="policeChowki_longitude" placeholder="Enter Longitude" required>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="policeChowki_subLayerId" name="policeChowki_subLayerId">
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
																					<label for="hsName">Police Station Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeChowki_name"
																						name="policeChowki_name" placeholder="Enter Police Station Name" required>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Police Station Area </label><input
																						type="text" class="form-control" id="policeChowki_area"
																						name="policeChowki_area" placeholder="Enter Police Station Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Thana Incharge Name </label> <input
																						type="text" class="form-control" id="policeChowki_thanaInchargeName"
																						name="policeChowki_thanaInchargeName" placeholder="Enter Thana Incharge Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Thana Incharge Area</label> <input
																						type="text" class="form-control" id="policeChowki_thanaInchargeArea"
																						name="policeChowki_thanaInchargeArea" placeholder="Enter Thana Incharge Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Cases</label> <input
																						type="text" class="form-control" id="policeChowki_noOfCases"
																						name="policeChowki_noOfCases" placeholder="Enter No of Cases">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Phone Number</label> <input
																						type="text" class="form-control" id="policeChowki_phoneNo"
																						name="policeChowki_phoneNo" placeholder="Enter Phone Number">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="policeChowki_address" name="policeChowki_address"
																						placeholder="Enter Address" required></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Zonal wise PS</label> <input
																						type="text" class="form-control" id="policeChowki_zonalWisePs"
																						name="policeChowki_zonalWisePs" placeholder="Enter Zonal wise PS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">SP Area</label> <input
																						type="text" class="form-control" id="policeChowki_spArea"
																						name="policeChowki_spArea" placeholder="Enter SP Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Thana Incharge No</label> <input
																						type="text" class="form-control" id="policeChowki_thanaInchargeNo"
																						name="policeChowki_thanaInchargeNo" placeholder="Enter Thana Incharge No">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hsName">No of Officers</label> <input
																						type="text" class="form-control" id="policeChowki_noOfOfficers"
																						name="policeChowki_noOfOfficers" placeholder="Enter No of Officers">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">CCTNS</label> <input
																						type="text" class="form-control" id="policeChowki_cctns"
																						name="policeChowki_cctns" placeholder="Enter CCTNS">
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
<!-- 																				type="file" multiple class="form-control" id="policeChowki_geoTaggedPhoto"  -->
<!-- 																				name="policeChowki_geoTaggedPhoto"> -->
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
					
					
					<!-- 	ADD POLICE CHOWKI MODAL END -->



<!-- 					ADD ELECTRIC POLE MODAL START -->
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
																					<label for="lowardName">Ward</label> <select
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
																						<option value="">Select Electric Pole Type</option>
																						<option value="High">High</option>
																						<option value="Medium">Medium</option>
																						<option value="Low">Low</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">In Progress</label> <select
																						class="form-control pb-1" id="electricPole_inProgress" name="electricPole_inProgress">
																						<option value="">Select In Progress</option>
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
																						<option value="">Select Street Light Type</option>
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
																						<option value="">Select</option>
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
																						<option value="">Select Street Light Category</option>
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
																						<option value="">Select Transformer Type</option>
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
					
					<!--Department Master ATM Modal start -->
					
					<div class="modal fade" id="nic_ATMadd_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">


							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
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

															<form id="form_addNicAtm" name="form_addNicAtm" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab"
																		class="tabwithborder activemain"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_images" id="imagestab"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				  <div class="form-group">
																						<label for="late_atm">Latitude<span class="mandatory">*</span>
																						</label> <input
																							type="text" class="form-control" id="atm_latitude"
																							placeholder="Enter Latitude" name="atm_latitude" required>
																					</div>
																				  	<div class="form-group">
																						<label for="atm_ward">Ward</label> <select
																							class="form-control pb-1" id="atm_ward" name="atm_ward">
																							
																						</select>
																					</div>
																				
																					<div class="form-group">
																						<input type="hidden" class="form-control" 
																						id="atm_subLayerId" name="atm_subLayerId">
																					</div>
																				</div>
																				<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="long_atm">Longitude<span class="mandatory">*</span>
																					</label> <input type="text" class="form-control" id="atm_longitude"
																						placeholder="Enter Longitude" name="atm_longitude" required>
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
																					<label for="atmaddName">ATM Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="atm_name"
																						name="atm_name" placeholder="Enter ATM Name" required>
																				</div>
																				<div class="form-group">
																					<label for="atmNo">ATM Type</label> 
																						<select class="form-control pb-1" id="atm_type">
																							<option value="">Select ATM Type</option>
																							<option value="Withdrawal+CDM">Withdrawal+CDM</option>
																							<option value="Only CDM">Only CDM</option>
																							<option value="Only Withdrawal">Only Withdrawal</option>
																							<option value="Paytm ATM">Paytm ATM</option>
																						</select>
																				</div>
																				<div class="form-group">
																					<label for="address">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="atm_address"
																						name="atm_address" placeholder="Enter Address" required>
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="phonen">Phone Number</label> <input
																						type="text" class="form-control" id="atm_phonenumber"
																						placeholder="Enter Phone Number">
																				</div>

																				<div class="form-group">
																					<label for="secno">Sector No</label> <input
																						type="text" class="form-control" id="atm_secNo"
																						placeholder="Enter Sector No">
																				</div>
																				<div class="form-group">
																					<label for="remarks">Remarks</label> <input
																						type="text" class="form-control" id="atm_remark"
																						placeholder="Enter Remarks">
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
																			<label for="upScimages">Upload Images</label><span class="mandatory">*</span> <input
																				type="file" multiple class="form-control" 
																				id="atm_images_add" name="atm_images_add" required>
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit"
																		name="add_data_atm" class="btn btn-indore mt-3"
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
					<!--Department Master  ATM Modal end -->
					
					<!--Department Master Bank Modal start -->

					<div class="modal fade" id="dep_addNicBank_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">
											
							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">
									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
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
															<form id="form_nic_bank"  name="form_nic_bank" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab"
																		class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li data_translate="_facilities" id="facilitiestab" -->
<!-- 																		class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" id="constructiontab" -->
<!-- 																		class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																			   <div class="form-group">
																					<label for="late">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" 
																						id="bank_latitude" name="latitude"
																						placeholder="Enter Latitude" required>
																				</div>
																			   <div class="form-group">
																					<label for="bank_ward">Ward</label> <select
																						class="form-control pb-1" id="bank_ward">
																						
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="bank_subLayerId" name="bank_subLayerId">
																				</div>
																				</div>
																				<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="long">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bank_longitude"
																						name = "longitude"
																						placeholder="Enter Longitude" required>
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
																					<label for="bankaddName">Bank Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bank_name" name = "bank_name"
																						placeholder="Enter Bank Name" required>
																				</div>
																				<div class="form-group">
																					<label for="bankNo">Bank Type</label>
																						<select class="form-control pb-1" id="bank_Type">
																							<option value="">Select Bank Type</option>
																							<option value="NABARD">NABARD</option>
																							<option value="NBFC">NBFC</option>
																							<option value="Government">Government</option>
																							<option value="Nationalized">Nationalized</option>
																						</select>
																				</div>
																				<div class="form-group">
																					<label for="bank_address">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bank_address" name="bank_address"
																						placeholder="Enter Address" required>
																				</div>

																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="bank_phonen">Phone Number</label> <input
																						type="text" class="form-control"
																						id="bank_phonenumber" placeholder="Enter Phone Number">
																				</div>
																				<div class="form-group">
																					<label for="bank_secno">Sector No</label> <input
																						type="text" class="form-control" id="bank_secNo"
																						placeholder="Enter Sector No">
																				</div>
																				<div class="form-group">
																					<label for="bank_remarks">Remarks</label> <input
																						type="text" class="form-control" id="bank_remark"
																						placeholder="Enter Remarks">
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
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" 
																				id="bank_images_add" name="bank_images_add" required>

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
					<!--Department Master Bank Modal end -->
					
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
																						<option value="">Select Bus Type</option>
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
																						<option value="">Select Bus Category</option>
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
																						<option value="">Select Bus Service Type</option>
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

<!--Library Add Modal start -->	

<div class="modal fade" id="addLibrary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Library</h4>
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

															<form id="form_addLibrary" name="form_addLibrary" class="msform form-admin">
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
																						type="text" class="form-control" id="library_latitude" 
																						name="library_latitude"
																						placeholder="Enter Latitude" required>
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="library_ward" name="library_ward">
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="library_longitude"
																						 name="library_longitude"
																						placeholder="Enter Longitude" required>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="library_subLayerId" name="library_subLayerId">
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
																					<label for="hsName">Library Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="library_name"
																						name="library_name" placeholder="Enter Library Name" required>
																				</div>
																				
																				<div class="form-group">
																					<label for="scCategory">Book Rental Facility</label> <select
																						class="form-control pb-1" id="library_bookRentalFacility" name="library_bookRentalFacility">
																						<option value="">Select</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="library_address" name="library_address"
																						placeholder="Enter Address" required></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsConNo">Facilities</label> <input
																						type="text" class="form-control" id="library_facilities"
																						name="library_facilities" placeholder="Enter Facilities">
																				</div>
																				
																				<div class="form-group">
																					<label for="scCategory">Book Rental Facility</label> <select
																						class="form-control pb-1" id="library_typeOfLibraries" name="library_typeOfLibraries">
																						<option value="">Select</option>
																						<option value="Public">Public</option>
																						<option value="Private">Private</option>
																						<option value="Sponsored">Sponsored</option>
																					</select>
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
																				type="file" multiple class="form-control" id="library_geoTaggedPhoto" 
																				name="library_geoTaggedPhoto" required>
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" id="add_data_library_submit" name="add_data_library_submit"
																		 class="btn btn-indore mt-3"
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


<!--Library Add Modal end -->

<!-- 					ADD FLYOVER MODAL START -->

					<div class="modal fade" id="addFlyover_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Flyover</h4>
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
																						placeholder="Enter Latitude" required>
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
																						placeholder="Enter Longitude" required>
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
																						name="flyover_flyoverName" placeholder="Enter Flyover Name" required>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Year of Construction</label> <input
																						type="text" class="form-control" id="flyover_yearOfConstruction"
																						name="flyover_yearOfConstruction" placeholder="Enter Year of Construction">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Approach Length</label> <input
																						type="text" class="form-control" id="flyover_approachLength"
																						name="flyover_approachLength" placeholder="Enter Approach Length">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Resurface Year</label> <input
																						type="text" class="form-control" id="flyover_resurfaceYear"
																						name="flyover_resurfaceYear" placeholder="Enter Resurface Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Lane</label> <input
																						type="text" class="form-control" id="flyover_lane"
																						name="flyover_lane" placeholder="Enter Lane">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Existing Top Surface of Bridge</label> <input
																						type="text" class="form-control" id="flyover_existingTopSurfaceOfBridge"
																						name="flyover_existingTopSurfaceOfBridge" placeholder="Enter Existing Top Surface of Bridge">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RD Id</label> <input
																						type="text" class="form-control" id="flyover_rdId"
																						name="flyover_rdId" placeholder="Enter RD Id">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath</label> <input
																						type="text" class="form-control" id="flyover_footpath"
																						name="flyover_footpath" placeholder="Enter Footpath">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year</label> <input
																						type="text" class="form-control" id="flyover_constructionYear"
																						name="flyover_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Parking</label> <input
																						type="text" class="form-control" id="flyover_parking"
																						name="flyover_parking" placeholder="Enter Parking">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Foundation</label> <input
																						type="text" class="form-control" id="flyover_foundation"
																						name="flyover_foundation" placeholder="Enter Foundation">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="lowardName">Flyover Type</label> <select
																						class="form-control pb-1" id="flyover_type" name="flyover_type">
																						<option value="">Select Flyover Type</option>
																						<option value="ROB">ROB</option>
																						<option value="RUB">RUB</option>
																						<option value="FOB">FOB</option>
																						<option value="River Bridge">River Bridge</option>
																					</select>
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Width</label> <input
																						type="text" class="form-control" id="flyover_width"
																						name="flyover_width" placeholder="Enter Width">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Height/Depth</label> <input
																						type="text" class="form-control" id="flyover_heightDepth"
																						name="flyover_heightDepth" placeholder="Enter Height/Depth">
																				</div>
																					
																				<div class="form-group">
																					<label for="hsName">Maintenance Cycle</label> <input
																						type="text" class="form-control" id="flyover_maintenanceCycle"
																						name="flyover_maintenanceCycle" placeholder="Enter Maintenance Cycle">
																				</div>
																																				
																				<div class="form-group">
																					<label for="hsName">Existing Gate</label> <input
																						type="text" class="form-control" id="flyover_existingGate"
																						name="flyover_existingGate" placeholder="Enter Existing Gate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">LC No</label> <input
																						type="text" class="form-control" id="flyover_lcNo"
																						name="flyover_lcNo" placeholder="Enter LC No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Divider</label> <input
																						type="text" class="form-control" id="flyover_divider"
																						name="flyover_divider" placeholder="Enter Divider">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Footpath Width</label> <input
																						type="text" class="form-control" id="flyover_footpathWidth"
																						name="flyover_footpathWidth" placeholder="Enter FootpathWidth">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Maintenance By</label> <input
																						type="text" class="form-control" id="flyover_maintenanceBy"
																						name="flyover_maintenanceBy" placeholder="Enter Maintenance By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Span</label> <input
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


<!--Police Post Add Modal start -->	

					<div class="modal fade" id="addPolicePost_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Police Post</h4>
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

															<form id="form_addPolicePost" name="form_addPolicePost" class="msform form-admin">
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
																						type="text" class="form-control" id="policePost_latitude" 
																						name="policePost_latitude"
																						placeholder="Enter Latitude" required>
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="policePost_ward" name="policePost_ward">
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policePost_longitude" name="policePost_longitude"
																						placeholder="Enter Longitude" required>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="policePost_subLayerId" name="policePost_subLayerId">
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
																					<label for="hsName">Police Post Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policePost_name"
																						name="policePost_name" placeholder="Enter Police Post Name" required>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="policePost_address" name="policePost_address"
																						placeholder="Enter Address" required></textarea>
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
																				type="file" multiple class="form-control" id="policePost_geoTaggedPhoto" 
																				name="policePost_geoTaggedPhoto" required>
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" id="add_data_policePost_submit" name="add_data_policePost_submit"
																		 class="btn btn-indore mt-3"
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
					
					<!--Police Post Add Modal end -->



<!--Restaurants Add Modal start -->	

					<div class="modal fade" id="addRestaurants_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Restaurant</h4>
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

															<form id="form_addRestaurant" name="form_addRestaurant" class="msform form-admin">
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
																						type="text" class="form-control" id="restaurant_latitude" name="restaurant_latitude"
																						placeholder="Enter Latitude" required>
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="restaurant_ward" name="restaurant_ward">
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="restaurant_longitude" name="restaurant_longitude"
																						placeholder="Enter Longitude" required>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="restaurant_subLayerId" name="restaurant_subLayerId">
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
																					<label for="hsName">Restaurant Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="restaurant_name"
																						name="restaurant_name" placeholder="Enter Restaurant Name" required>
																				</div>
																				
																				<div class="form-group">
																					<label for="scCategory">Type of Restaurant</label> <select
																						class="form-control pb-1" id="restaurant_typeOfRestaurant" name="restaurant_typeOfRestaurant">
																						<option value="">Select</option>
																						<option value="Vegetarian">Vegetarian</option>
																						<option value="Non-Vegetarian">Non-Vegetarian</option>
																					</select>
																				</div>
																				
																				
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scCategory">Facilities</label> <select
																						class="form-control pb-1" id="restaurant_facilities" name="restaurant_facilities">
																						<option value="">Select</option>
																						<option value="Home Delivery">Home Delivery</option>
																						<option value="Take Away">Take Away</option>
																						<option value="Eatery">Eatery</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="restaurant_address" name="restaurant_address"
																						placeholder="Enter Address" required></textarea>
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
																				type="file" multiple class="form-control" id="restaurant_geoTaggedPhoto" 
																				name="restaurant_geoTaggedPhoto" required>
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" id="add_data_restaurant_submit" name="add_data_restaurant_submit"
																		 class="btn btn-indore mt-3"
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

					<!--Restaurants Add Modal end -->



<!--Play Ground Add Modal Start -->
					
							
					<div class="modal fade" id="play_ground_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Play Ground  information</h4>
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
																
															</form>
														</div>
														<div class="col-md-12 mx-0">

															<form id="form_play_ground" name="form_play_ground" class="msform form-admin">
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
																						type="text" class="form-control" id="playgr_longitude"
																						name="longitude" placeholder="Enter Longitude" required>
																				</div>
																				<div class="form-group">
																					<label for="latitude">Latitude<span class="mandatory">*</span></label> 
																					<input
																						type="text" class="form-control" id="playgr_latitude"
																						name="latitude" placeholder="Enter latitude" required>
																				</div>
																				
																					<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="playgr_subLayerId" name="playgr_subLayerId">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="ward_id">ward id</label> <select
																						class="form-control pb-1" id="playgr_ward"
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
																					<label for="shopping_mall_name">Play Ground Name<span class="mandatory">*</span>
																					</label> <input
																						type="text" class="form-control" id="playgr_name"
																						name="play_ground_name" placeholder="Enter Play Ground Name" required>
																				</div>
																					<div class="form-group">
																					<label for="address">Address<span class="mandatory">*</label> <input
																						type="text" class="form-control" id="playgr_address"
																						name="address" placeholder="Enter Address" required>
																				</div>
																			
																			</div>
																			<div class="col-sm-12 col-lg-6">
																		
																				<div class="form-group">
																					<label for="parking">Type Of Play Ground</label> <select
																						class="form-control pb-1" id="playgr_type"
																						name="type_of_play_ground">
																							<option value="">Select Type of Play Ground</option>
																							<option value="Polo Ground">Polo Ground</option>
																							<option value="Municipal Ground">Municipal Ground</option>
																							<option value="Cricket Ground">Cricket Ground</option>
																							<option value="Exhibition Ground">Exhibition Ground</option>
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
																				type="file" multiple class="form-control" id="playgr_geo_tagged_photo"
																				name="geo_tagged_photo" required>
																		</div>
																		
																	</div>
																		
																	<button type="button" name="previous"	class="previous action-button-previous float-left">
																	 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" name="addplayGround" id ="addplayGround" class="btn btn-indore mt-3"	value="Submit" />
																		
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
					<!--Play Ground Add Modal end -->
					
					
					<!--Post Office Master Modal start -->
					<div class="modal fade" id="post_office_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Post Office  information</h4>
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
																						name="longitude" placeholder="Enter Longitude" required>
																				</div>
																				<div class="form-group">
																					<label for="latitude">Latitude<span class="mandatory">*</span></label> 
																					<input
																						type="text" class="form-control" id="postOf_latitude"
																						name="latitude" placeholder="Enter latitude" required>
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
																						name="postOf_name" placeholder="Enter Post Office Name"
																						required>
																				</div>
																					<div class="form-group">
																					<label for="address">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="postOf_address"
																						name="postOf_address" placeholder="Enter Address" required>
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
																				name="geo_tagged_photo" required>
																		</div>
																		
																	</div>
																		
																	<button type="button" name="previous"	class="previous action-button-previous float-left">
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
		<!--Post Office Add Modal end -->
		
		<!--Public Distribution System Centers Modal start -->
					<div class="modal fade" id="pdsc_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Public Distribution System Centers  information</h4>
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
																
															</form>
														</div>
														<div class="col-md-12 mx-0">

															<form id="form_public_sc" name="form_public_sc" class="msform form-admin">
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
																						type="text" class="form-control" id="pdsc_longitude"
																						name="longitude" placeholder="Enter Longitude" required>
																				</div>
																				<div class="form-group">
																					<label for="latitude">Latitude<span class="mandatory">*</span></label> 
																					<input
																						type="text" class="form-control" id="pdsc_latitude"
																						name="latitude" placeholder="Enter latitude" required>
																				</div>
																				
																					<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="pdsc_subLayerId" name="pdsc_subLayerId">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="ward_id">ward id</label> <select
																						class="form-control pb-1" id="pdsc_ward"
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
																					<label for="shopping_mall_name">Public Distribution System Centers Name
																					<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="pdsc_name"
																						name="pds_name" placeholder="Enter Public Distribution System Centers Name" required>
																				</div>
																					<div class="form-group">
																					<label for="address">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="pdsc_address"
																						name="address" placeholder="Enter Address" required>
																				</div>
																			
																			</div>
																			<div class="col-sm-12 col-lg-6">
																		
																				<div class="form-group">
																					<label for="parking">Type Of Services</label> <input
																						type="text" class="form-control" id="pdsc_type"
																						name="type_of_services" placeholder="Enter Type Of Services">
																				</div>
																				<div class="form-group">
																					<label for="parking">Type Of Subsidary Items</label> <input
																						type="text" class="form-control" id="pdsc_si_type"
																						name="type_of_subsidary_items" placeholder="Enter Type Of Subsidary Items">
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
																				type="file" multiple class="form-control" id="pdsc_geo_tagged_photo"
																				name="geo_tagged_photo" required>
																		</div>
																	</div>
																		
																	<button type="button" name="previous"	class="previous action-button-previous float-left">
																	 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" name="addpdsc" id = "addpdsc" class="btn btn-indore mt-3"	value="Submit" />
																		
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
					<!-- Public Distribution System Centers modal end -->
		
		
<!--Department Master MONUMENT Modal start -->
					<div class="modal fade" id="nic_addMonument_modal"
						role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">
							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">
									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
									<button type="button" class="close" onclick="resetForm('form_nic_monument')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
															<form id="form_nic_monument" name="form_nic_monument" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab"
																		class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li data_translate="_facilities" id="facilitiestab" -->
<!-- 																		class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" id="constructiontab" -->
<!-- 																		class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="late_mo">Latitude<span class="mandatory">*</span></label></label> <input
																						type="number" class="form-control" id="mon_latitude"
																						placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="mon_ward">Ward No</label> <select
																						class="form-control pb-1" id="mon_ward" name ="mon_ward">
																						
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="mon_subLayerId" name="mon_subLayerId">
																				</div>
																				</div>
																				<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="long_mo">Longitude<span class="mandatory">*</span></label></label> <input
																						type="number" class="form-control" id="mon_longitude"
																						placeholder="Enter Longitude">
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
																					<label for="moddName">Monument Name<span class="mandatory">*</span></label></label> <input
																						type="text" class="form-control" id="mon_Name"
																						placeholder="Enter Monument Name">
																				</div>
																				<div class="form-group">
																					<label for="moNo">Monument Type</label> <input
																						type="text" class="form-control" id="mon_Type"
																						placeholder="Enter Monument Type">
																				</div>
																				<div class="form-group">
																					<label for="mo_address">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="mon_address"
																						placeholder="Enter Address">
																				</div>
																				<div class="form-group">
																					<label for="secnomo">Sector No</label> <input
																						type="text" class="form-control" id="mon_secNo"
																						placeholder="Enter Sector No">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="timingsmo">Timings</label> <input
																						type="text" class="form-control" id="mon_timings"
																						placeholder="Enter Timings">
																				</div>
																				<div class="form-group">
																					<label for="ticketmo">Ticket Availability</label> <select 
																						 class="form-control pb-1" id="mon_ticket">
																							 <option value="">Select Ticket Availability</option>
																							 <option value="Yes">Yes</option>
																							 <option value="No">No</option>
																						 </select>
																				</div>
																				<div class="form-group">
																					<label for="touristmo">Tourist Guides
																						Availability</label> <select
																						class="form-control pb-1" id="mon_tourist">
																							 <option value="">Select Tourist Guides Availability</option>
																							 <option value="Yes">Yes</option>
																							 <option value="No">No</option>
																						 </select>
																				</div>
																				<div class="form-group">
																					<label for="remarks">Remarks</label> <input
																						type="text" class="form-control" id="mon_remark"
																						placeholder="Enter Remarks">
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
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="mon_nicImages">
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="add_mon_submit"
																		name="add_mon_submit" class="btn btn-indore mt-3"
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
					<!--Department Master MONUMENT Modal end -->		


<!--Department Master MUSEUM Modal start -->
					<div class="modal fade" id="nic_addMuseum_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">
								<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">
									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
						<button type="button" class="close" onclick="resetForm('form_nicMuseum')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
															<form id="form_nicMuseum" name ="form_nicMuseum" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab"
																		class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li data_translate="_facilities" id="facilitiestab" -->
<!-- 																		class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" id="constructiontab" -->
<!-- 																		class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="late_muse">Latitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control"
																						id="museum_latitude" placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="muse_ward">Ward No</label> <select
																						class="form-control pb-1" id="museum_ward" name ="museum_ward">
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="museum_subLayerId" name="museum_subLayerId">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="long_muse">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control"
																						id="museum_longitude" placeholder="Enter Longitude">
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
																					<label for="mueaddName">Museum Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="museum_Name"
																						placeholder="Enter Museum Name">
																				</div>
																				<div class="form-group">
																					<label for="museType">Museum Type</label> <input
																						type="text" class="form-control" id="museum_Type"
																						placeholder="Enter Museum Type">
																				</div>
																				<div class="form-group">
																					<label for="muse_address">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="museum_address"
																						placeholder="Enter Address">
																				</div>
																				<div class="form-group">
																					<label for="secnomuse">Sector No</label> <input
																						type="text" class="form-control" id="museum_secNo"
																						placeholder="Enter Sector No">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="timingsmuse">Timings</label> <input
																						type="text" class="form-control" id="museum_timings"
																						placeholder="Enter Timings">
																				</div>
																				<div class="form-group">
																					<label for="ticketmuse">Ticket Availability</label>
																					<select class="form-control pb-1" id="museum_ticket">
																						<option value="">Select Ticket Availability</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="touristmuse">Tourist Guides
																						Availability</label> <select
																						class="form-control pb-1" id="museum_tourist">
																						<option value="">Select Tourist Guides Availability</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>

																				<div class="form-group">
																					<label for="museremarks">Remarks</label> <input
																						type="text" class="form-control" id="museum_remark"
																						placeholder="Enter Remarks">
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
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="museum_nicImages">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="add_museum_submit
																		name="add_museum_submit" class="btn btn-indore mt-3"
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
					<!--Department Master Museum Modal end -->


<!--Department Master PARKS Modal start -->
					<div class="modal fade" id="nic_addParks_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">
							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">
									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
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
															<form id="nic_parkForm"  name= "nic_parkForm" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab"
																		class="tabwithborder"><strong>Basic Info</strong></li>
																	<li data_translate="_facilities" id="facilitiestab"
																		class="tabwithborder"><strong>Facilities</strong></li>
<!-- 																	<li data_translate="_construction" id="constructiontab" -->
<!-- 																		class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="late_park">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control"
																						id="park_latitude" placeholder="Enter Latitude"
																						 name="park_latitude" required>
																				</div>
																				<div class="form-group">
																					<label for="park_ward">Ward No</label> <select
																						class="form-control pb-1" id="park_ward">
																						
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="park_subLayerId" name="park_subLayerId">
																				</div>
																				</div>
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="long_park">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control"
																						id="park_longitude" placeholder="Enter Longitude" 
																						name="park_longitude" required>
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
																					<label for="parkaddName">Park and Ground
																						Name <span class="mandatory">*</span>
																						</label> <input type="text" class="form-control"
																						id="park_Name" name="park_Name"
																						 placeholder="Enter Park and Ground Name" required>
																				</div>
																				<div class="form-group">
																					<label for="secnopark">Sector No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="park_secNo"
																						name="park_secNo" placeholder="Enter Sector No" required>
																				</div>

																				<div class="form-group">
																					<label for="roadpark">Road Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="park_road"
																						name="park_road" placeholder="Enter Road Name" required>
																				</div>
																				<div class="form-group">
																					<label for="parkNo">Contact_No</label> <input
																						type="text" class="form-control" id="park_contactNo"
																						placeholder="Enter Contact_No">
																				</div>
																				<div class="form-group">
																					<label for="park_area">Garden Area</label> <input
																						type="text" class="form-control" id="park_gardenArea"
																						placeholder="Enter Garden Area">
																				</div>
																				<div class="form-group">
																					<label for="park_entries">No of Entries</label> <input
																						type="text" class="form-control" id="park_entries"
																						placeholder="Enter No of Entries">
																				</div>

																				<div class="form-group">
																					<label for="park_structure">Structure</label> <input
																						type="text" class="form-control"
																						id="park_structure" placeholder="Enter Structure">
																				</div>
																				<div class="form-group">
																					<label for="park_trees">No of Tress</label> <input
																						type="text" class="form-control" id="park_trees"
																						placeholder="Enter No of Tress">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="vtreepark">Variety of Tress</label> <input
																						type="text" class="form-control" id="park_vtree"
																						placeholder="Enter Variety of Tress">
																				</div>
																				
																				<div class="form-group">
																					<label for="touristmuse">Statue's</label> 
																					<select class="form-control pb-1" id="park_statues">
																						<option value="">Select Bird Feeder</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>

																				<div class="form-group">
																					<label for="museremarks">No of Statue's</label> <input
																						type="text" class="form-control"
																						id="park_nostatues"
																						placeholder="Enter No of Statue's">
																				</div>

																				<div class="form-group">
																					<label for="museremarks">Bird Feeder</label> 
																					<select class="form-control pb-1" id="park_birdfeeder">
																						<option value="">Select Bird Feeder</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Bird
																						Feeder's</label> <input type="text" class="form-control"
																						id="park_nobirdfer"
																						placeholder="Enter No of Bird Feeder's">
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Playing
																						Instruments</label> <input type="text"
																						class="form-control" id="park_instrument"
																						placeholder="Enter No of Playing Instruments">
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Benches</label> <input
																						type="text" class="form-control" id="park_benches"
																						placeholder="Enter No of Benches">
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
																		<h2 class="fs-title">Facilities & Services</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsWard">Last maintenance</label> <input
																						type="text" class="form-control datepicker" id="park_lastmain"
																						placeholder="Enter Last maintenance">
																				</div>
																				<div class="form-group">
																					<label for="hsFacility">Toilets</label> 
																					<select class="form-control pb-1" id="park_toilet">
																						<option value="">Select Toilets</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Rest Hut</label>
																					<select class="form-control pb-1" id="park_resthut">
																						<option value="">Select Rest Hut</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">No of Rest huts</label> <input
																						type="text" class="form-control"
																						id="parkNoresthut"
																						placeholder="Enter No of Rest huts">
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Water Connection</label> 
																					<select class="form-control pb-1" id="park_watercon">
																						<option value="">Select Water Connection</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Sewage Connection</label>
																					<select class="form-control pb-1" id="park_sewageconn">
																						<option value="">Select Sewage Connection</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsWard">No of Lights</label> <input
																						type="text" class="form-control" id="park_NoLights"
																						placeholder="Enter No of Lights">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsServices">Drinking water</label> 
																					<select class="form-control pb-1" id="park_drinkingWater">
																						<option value="">Select Drinking water</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Physical fitness
																						Facilities</label> 
																					<select class="form-control pb-1" id="park_PhysicalFitness">
																						<option value="">Select Physical fitness Facilities</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Senior Citizen
																						Spots</label> 
																					<select class="form-control pb-1" id="park_SeniorCitizen">
																						<option value="">Select Senior Citizen Spots</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Park Opening
																						Timings</label> <input type="text" class="form-control"
																						id="park_Opening"
																						placeholder="Enter Park Opening Timings">
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Park Closing
																						Timings</label> <input type="text" class="form-control"
																						id="park_Closing"
																						placeholder="Enter Park Closing Timings">
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Entry Ticket Price</label>
																					<input type="text" class="form-control"
																						id="park_EntryTicket"
																						placeholder="Enter Entry Ticket Price">
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
																				type="file" multiple class="form-control" id="park_nicImages"
																				name="park_nicImages" required>
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="add_park_submit"
																		name="add_park_submit" class="btn btn-indore mt-3"
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
					<!--Department Master Parks Modal end -->



<!--Department Master MANHOLE Modal start -->
							<div class="modal fade" id="nic_addManhole_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">


							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
										<button type="button" class="close" onclick="resetForm('nic_formManhole')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="nic_formManhole" name ="nic_formManhole" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab"
																		class="tabwithborder activemain"><strong>Basic
																			Info</strong></li>
<!-- 																	<li data_translate="_facilities" id="facilitiestab" -->
<!-- 																		class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" id="constructiontab" -->
<!-- 																		class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																			  	<div class="form-group">
																					<label for="late_atm">Latitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="manhole_latitude"
																						placeholder="Enter Latitude">
																				</div>
																			  	
																			  	<div class="form-group">
																					<label for="atm_ward">Ward No</label> <select
																						class="form-control pb-1" id="manhole_ward" name ="manhole_ward">
																						
																					</select>             
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="manhole_subLayerId" name="subLayerId">
																				</div>
																				</div>
																				<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="long_atm">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="manhole_longitude"
																						placeholder="Enter Longitude">
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
																					<label for="cm">Cover Material</label> <input
																						type="text" class="form-control" id="manhole_cover"
																						placeholder="Enter Cover Material">
																				</div>
																				<div class="form-group">
																					<label for="cm">Manhole Shape</label> <input
																						type="text" class="form-control" id="manhole_manhole_shape"
																						placeholder="Enter Manhole Shapel">
																				</div>
																				<div class="form-group">
																					<label for="w">Wall Construction
																						Material</label> <input
																						type="text" class="form-control" id="manhole_Wall_con"
																						placeholder="Enter Wall Construction
																						Material">
																				</div>
																				<div class="form-group">
																					<label for="area">Date Installed</label> <input
																						type="text" class="form-control datepicker-dept"
																						id="manhole_Dateinstall"
																						placeholder="Enter Date Installed">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="park_entries">Manhole Type</label> <input
																						type="text" class="form-control" id="manhole_manhole_type"
																						placeholder="Enter Manhole Type">
																				</div>

																				<div class="form-group">
																					<label for="park_structure">Last
																						maintenance</label> <input type="text"
																						class="form-control datepicker-dept" id="manhole_Lastmain"
																						placeholder="Enter Last maintenance">
																				</div>
																				<div class="form-group">
																					<label for="park_trees">Remarks</label> <input
																						type="text" class="form-control"
																						id="manhole_remarks"
																						placeholder="Enter No of Tress">
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
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="manhole_nicImages" name="manhole_nicImages">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="manholesubmit"
																		name="manholesubmit" class="btn btn-indore mt-3"
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
					
		<!--Department Master MANHOLE Modal end -->
		
<jsp:include page="WaterATMData.jsp" />
<jsp:include page="Pharmacies.jsp" />
<jsp:include page="ReligiosFacility.jsp" />
<jsp:include page="/carScooterdata.jsp" />
<jsp:include page="/culturalFacilitydata.jsp" />
<jsp:include page="/electricChargingStationdata.jsp" />
<jsp:include page="/dustbinLocationsdata.jsp" />
<jsp:include page="/entertainmentFacilitydata.jsp" />
<jsp:include page="/eyeDonationdata.jsp" />
<jsp:include page="/foodZonesdata.jsp" />
<jsp:include page="/milkBoothsdata.jsp" />
<jsp:include page="/oldageHomesdata.jsp" />
<jsp:include page="/utencileBankdata.jsp" />
<jsp:include page="/free_wifiData.jsp" />
<jsp:include page="/govt_officesData.jsp" />
<jsp:include page="/marketData.jsp" />
<jsp:include page="/petrol_pumpData.jsp" />
<jsp:include page="/hotelData.jsp"/>
<jsp:include page="/hostelData.jsp"/>
<jsp:include page="/Heritage_tourismSitesData.jsp"/>
<jsp:include page="/orphanageData.jsp"/>
<jsp:include page="vcb_vms.jsp" />
<jsp:include page="ShoppingMallData.jsp" />
<jsp:include page="sports_facility.jsp" />
<jsp:include page="smart_pole.jsp" />
<jsp:include page="cctv_locations.jsp" />
<jsp:include page="cinema_hall.jsp" />
<jsp:include page="fire_station.jsp" />
<jsp:include page="blood_banks.jsp" />
<jsp:include page="trafficSquareData.jsp" />
<jsp:include page="publicToiletData.jsp" />


<%-- <script src="${context}/js/jquery.min.js"></script> --%>
<%-- <script src="${context}/js/popper.min.js"></script> --%>
<%-- <script src="${context}/js/bootstrap.min.js"></script>					 --%>
<%-- <script src="${context}/js/bootstrap-select.js"></script> --%>
<script type="text/javascript" src="${context}/js/moment.min.js"></script>
<script src="${context}/js/slick.min.js"></script>
<script src="${context}/js/jquery.validate.min.js"></script>
<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>
<script type="text/javascript" src="${context}/js/designer/dep_add_data.js"></script>

<script type="text/javascript" src="${context}/js/designer/WaterATMData.js"></script>
<script type="text/javascript" src="${context}/js/designer/Pharmacies.js"></script>
<script type="text/javascript" src="${context}/js/designer/ReligiosFacility.js"></script>

<script type="text/javascript" src="${context}/js/designer/utencileBankdata.js"></script>
<script type="text/javascript" src="${context}/js/designer/carScooterData.js"></script>
<script type="text/javascript" src="${context}/js/designer/culturalFacilitydata.js"></script>
<script type="text/javascript" src="${context}/js/designer/dustbinLocationsdata.js"></script>
<script type="text/javascript" src="${context}/js/designer/electricChargingStationdata.js"></script>
<script type="text/javascript" src="${context}/js/designer/entertainmentFacilitydata.js"></script>
<script type="text/javascript" src="${context}/js/designer/eyeDonationdata.js"></script>
<script type="text/javascript" src="${context}/js/designer/foodZonesdata.js"></script>
<script type="text/javascript" src="${context}/js/designer/milkBoothsdata.js"></script>
<script type="text/javascript" src="${context}/js/designer/oldageHomesdata.js"></script>
<script type="text/javascript" src="${context}/js/designer/marketData.js"></script>
<script type="text/javascript" src="${context}/js/designer/petrol_pumpData.js"></script>
<script type="text/javascript" src="${context}/js/designer/free_wifi.js"></script>
<script type="text/javascript" src="${context}/js/designer/govt_offices.js"></script>
<script type="text/javascript" src="${context}/js/designer/hotelData.js"></script>
<script type="text/javascript" src="${context}/js/designer/hostelData.js"></script>
<script type="text/javascript" src="${context}/js/designer/Heritage_tourismSitesData.js"></script>
<script type="text/javascript" src="${context}/js/designer/orphanageData.js"></script>
<script type="text/javascript" src="${context}/js/designer/vcb_vms.js"></script>
<script type="text/javascript" src="${context}/js/designer/ShoppingMallData.js"></script>
<script type="text/javascript" src="${context}/js/designer/sports_facility.js"></script>
<script type="text/javascript" src="${context}/js/designer/smart_pole.js"></script>
<script type="text/javascript" src="${context}/js/designer/cctv_locations.js"></script>
<script type="text/javascript" src="${context}/js/designer/cinema_hall.js"></script>
<script type="text/javascript" src="${context}/js/designer/fire_station.js"></script>
<script type="text/javascript" src="${context}/js/designer/blood_banks.js"></script>
<script type="text/javascript" src="${context}/js/designer/trafficSquare.js"></script>
<script type="text/javascript" src="${context}/js/designer/publicToilet.js"></script>
