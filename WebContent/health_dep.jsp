<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Health Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data-toggle="tab" href="#health_hospital">Hospital</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					href="#health_uphc">UPHC</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="health_hospital">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addhospital_modal"
							class="btn-add btn-indore-table">Add Hospital</button>
					</div>

					<h6 class="table-title-grid">List of Hospitals</h6>
					<table id="dep_hospital_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Hospital add Modal start -->
					<div class="modal fade" id="dep_addhospital_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Hospital</h4>
									<button type="button" class="close" id="addHospital_close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_depAddHospital" name="form_depAddHospital" class="msform form-admin">
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
																						type="number" class="form-control" id="hospital_latitude" name="hospital_latitude"
																						placeholder="Enter Latitude">
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
																						type="number" class="form-control" id="hospital_longitude" name="hospital_longitude"
																						placeholder="Enter Longitude">
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
																						name="hospital_name" placeholder="Enter Hospital Name">
																				</div>
																				<div class="form-group">
																					<label for="hsType">Hospital Type</label> <select
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
																						placeholder="Enter Address"></textarea>
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
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsCategory">Blood Bank Facility</label> <select
																						class="form-control pb-1" id="hospital_bloodBankFacility" name="hospital_bloodBankFacility">
																						<option value="">Select</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsCategory">Mortuary</label> <select
																						class="form-control pb-1" id="hospital_mortuary" name="hospital_mortuary">
																						<option value="">Select</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
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
																					<label for="scRte">Road Connectivity to Hospital</label><span class="mandatory">*</span>
																					<textarea class="form-control" rows="2" id="hospital_roadConnectivity"
																						name="hospital_roadConnectivity" placeholder="Description"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="hsConType">Police Station No</label> <input
																						type="text" class="form-control" id="hospital_policeStationNo"
																						name="hospital_policeStationNo" placeholder="Enter Ploce Station No">
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
																				type="file" multiple class="form-control" id="hospital_geoTaggedPhoto" name="hospital_geoTaggedPhoto">
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
					<!--Hospital Add Modal end -->

					
					<!--Hospital Update Modal start -->
					
					
					<div class="modal fade" id="dep_updatehospital_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Hospital</h4>
									<button type="button" class="close" id="updateHospital_close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_depUpdateHospital" name="form_depUpdateHospital" class="msform form-admin">
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
																						type="number" class="form-control" id="hospitalUp_latitude" name="hospitalUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="hospitalUp_ward" name="hospitalUp_ward">
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="hospitalUp_longitude" name="hospitalUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="hospitalUp_subLayerId" name="hospitalUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="hospitalUp_hospitalId" name="hospitalUp_hospitalId">
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
																						type="text" class="form-control" id="hospitalUp_name"
																						name="hospitalUp_name" placeholder="Enter Hospital Name">
																				</div>
																				<div class="form-group">
																					<label for="hsType">Hospital Type</label> <select
																						class="form-control pb-1" id="hospitalUp_type" name="hospitalUp_type">
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
																						class="form-control pb-1" id="hospitalUp_ownershipType" name="hospitalUp_ownershipType">
																						<option value="">Select Ownership Type</option>
																						<option value="Private">Private</option>
																						<option value="Government">Government</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hodName">HOD Name</label> <input
																						type="text" class="form-control" id="hospitalUp_hodName" name="hospitalUp_hodName"
																						placeholder="Enter HOD Name">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsCategory">Hospital Category</label> <select
																						class="form-control pb-1" id="hospitalUp_category" name="hospitalUp_category">
																						<option value="">Select Category</option>
																						<option value="Children">Children</option>
																						<option value="Cancer">Cancer</option>
																						<option value="TB">TB</option>
																						<option value="ENT Specialist">ENT Specialist</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsConNo">Emergency Service Contact No</label> <input
																						type="text" class="form-control" id="hospitalUp_emergencyContactno"
																						name="hospitalUp_emergencyContactno" placeholder="Enter Emergency Service Contact No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsRecognized">Recognized By</label> <input
																						type="text" class="form-control"
																						id="hospitalUp_recognizedBy" name="hospitalUp_recognizedBy"
																						placeholder="Enter Recognized By">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="hospitalUp_address" name="hospitalUp_address"
																						placeholder="Enter Address"></textarea>
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
																						class="form-control pb-1" id="hospitalUp_emergencyService" name="hospitalUp_emergencyService">
																						<option value="">Select</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsCategory">Blood Bank Facility</label> <select
																						class="form-control pb-1" id="hospitalUp_bloodBankFacility" name="hospitalUp_bloodBankFacility">
																						<option value="">Select</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsCategory">Mortuary</label> <select
																						class="form-control pb-1" id="hospitalUp_mortuary" name="hospitalUp_mortuary">
																						<option value="">Select</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsWard">Hospital Ward</label>
																					<textarea class="form-control" rows="2" name="hospitalUp_wardInfo"
																						id="hospitalUp_wardInfo" placeholder="Enter Hospital Ward"></textarea>
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
																						class="form-control" id="hospitalUp_builtUpArea"
																						name="hospitalUp_builtUpArea" placeholder="Enter Built Up Area">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsBua">Hospital Area</label> <input type="text"
																						class="form-control" id="hospitalUp_area"
																						name="hospitalUp_area" placeholder="Enter Hospital Area">
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
																						type="text" class="form-control" id="hospitalUp_noOfIcu"
																						name="hospitalUp_noOfIcu" placeholder="Enter No of ICU">
																				</div>
																				<div class="form-group">
																					<label for="scRte">Road Connectivity to Hospital</label><span class="mandatory">*</span>
																					<textarea class="form-control" rows="2" id="hospitalUp_roadConnectivity"
																						name="hospitalUp_roadConnectivity" placeholder="Description"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="hsConType">Police Station No</label> <input
																						type="text" class="form-control" id="hospitalUp_policeStationNo"
																						name="hospitalUp_policeStationNo" placeholder="Enter Ploce Station No">
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsConType">Bed Count</label> <input
																						type="text" class="form-control" id="hospitalUp_bedCount"
																						name="hospitalUp_bedCount" placeholder="Enter Bed Count">
																				</div>
																				<div class="form-group">
																					<label for="scRteact">Remarks</label>
																					<textarea class="form-control" rows="2" name="hospitalUp_remarks"
																						id="hospitalUp_remarks" placeholder="Description"></textarea>
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
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input type="file" multiple class="form-control"  
																				id="hospitalUp_geoTaggedPhoto" name="hospitalUp_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" id="dep_hospital_update"
																		name="dep_hospital_update" class="btn btn-indore mt-3"
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
					<!--Hospital Update Modal end -->
					


				</div>
				
				
				<div class="tab-pane container-fluid fade" id="health_uphc">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_adduphc_modal"
						class="btn-add btn-indore-table">Add UPHC</button>
					</div>

					<h6 class="table-title-grid">List of UPHC</h6>
					<table id="dep_uphc_table" class="display tbl_dep" class="tbl-report"></table>
					
					<!-- ADD UPHC MODAL START -->
					<div class="modal fade" id="dep_adduphc_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add UPHC</h4>
									<button type="button" class="close" id="addUphc_close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_depAddUphc" name="form_depAddUphc" class="msform form-admin">
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
																						type="number" class="form-control" id="uphc_latitude" name="uphc_latitude"
																						placeholder="Enter Latitude">
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
																						type="number" class="form-control" id="uphc_longitude" name="uphc_longitude"
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
																					<label for="hsName">UPHC Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="uphc_name"
																						name="uphc_name" placeholder="Enter Uphc Name">
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
																						type="text" class="form-control" id="uphc_supervisorNo" 
																						name="uphc_supervisorNo" placeholder="Enter Supervisor No">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsConNo">Supervisor Name</label> <input
																						type="text" class="form-control" id="uphc_supervisorName"
																						name="uphc_supervisorName" placeholder="Enter Supervisor Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsConNo">Medical Officer No</label> <input
																						type="text" class="form-control" id="uphc_medicalOfficerNo"
																						name="uphc_medicalOfficerNo" placeholder="Enter Medical Officer No">
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
																						placeholder="Enter Address"></textarea>
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
																	<input type="submit" id="uphc_add_submit"
																		name="uphc_add_submit" class="btn btn-indore mt-3"
																		value="Submit" />
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
					<!-- ADD UPHC MODAL END -->
					
<!-- 					UPDATE UPHC MODAL START -->
					
					<div class="modal fade" id="dep_updateuphcUp_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update UPHC</h4>
									<button type="button" class="close" id="updateUphc_close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_depUpdateUphc" name="form_depUpdateUphc" class="msform form-admin">
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
																						type="number" class="form-control" id="uphcUp_latitude" name="uphcUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="uphcUp_ward" name="uphcUp_ward">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="uphcUp_longitude" name="uphcUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="uphcUp_subLayerId" name="uphcUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="uphcUp_uphcId" name="uphcUp_uphcId">
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
																						type="text" class="form-control" id="uphcUp_name"
																						name="uphcUp_name" placeholder="Enter Uphc Name">
																				</div>
																				<div class="form-group">
																					<label for="hsName">Medical Officer</label> <input
																						type="text" class="form-control" id="uphcUp_medicalOfficer"
																						name="uphcUp_medicalOfficer" placeholder="Enter Medical Officer">
																				</div>
																				<div class="form-group">
																					<label for="hsName">Slum Population</label> <input
																						type="text" class="form-control" id="uphcUp_slumPopulation"
																						name="uphcUp_slumPopulation" placeholder="Enter Slum Population">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Total Population</label> <input
																						type="text" class="form-control" id="uphcUp_totalPopulation"
																						name="uphcUp_totalPopulation" placeholder="Enter Total Population">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hodName">Supervisor No</label> <input
																						type="text" class="form-control" id="uphcUp_supervisorNo" 
																						name="uphcUp_supervisorNo" placeholder="Enter Supervisor No">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsConNo">Supervisor Name</label> <input
																						type="text" class="form-control" id="uphcUp_supervisorName"
																						name="uphcUp_supervisorName" placeholder="Enter Supervisor Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsConNo">Medical Officer No</label> <input
																						type="text" class="form-control" id="uphcUp_medicalOfficerNo"
																						name="uphcUp_medicalOfficerNo" placeholder="Enter Medical Officer No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Ward wise Population</label> <input
																						type="text" class="form-control" id="uphcUp_wardWisePopulation"
																						name="uphcUp_wardWisePopulation" placeholder="Enter Ward wise Population">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="uphcUp_address" name="uphcUp_address"
																						placeholder="Enter Address"></textarea>
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
																	<input type="submit" id="update_uphc_submit"
																		name="update_uphc_submit" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images</label> <input -->
<!-- 																				type="file" multiple class="form-control" id="uphcUp_geoTaggedPhoto"  -->
<!-- 																				name="uphcUp_geoTaggedPhoto"> -->
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
					
					
<!-- 					UPDATE UPHC MODAL END -->
					
					
					
					
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

<script type="text/javascript" src="${context}/js/designer/health_dep.js"></script>

</body>
</html>