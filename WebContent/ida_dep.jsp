<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Indore Development Authority Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data-toggle="tab" href="#ida_schemeBoundary">IDA Scheme Boundary</a></li>
				<li class="nav-item"><a class="nav-link" data-toggle="tab"
					href="#ida_ida">IDA</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="ida_schemeBoundary">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addIDASchemeBoundary_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of IDA Scheme Boundaries</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>
				
				
<!-- 					ADD TOWN PLANNING MODAL START -->

					<div class="modal fade" id="dep_addIDASchemeBoundary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add IDA Scheme Boundary</h4>
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
																						type="text" class="form-control" id="idaScheme_latitude" 
																						name="idaScheme_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaScheme_ward" name="idaScheme_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaScheme_plotNo" name="idaScheme_plotNo">
																						<option>Select Plot No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																						</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaScheme_longitude" name="idaScheme_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaScheme_zone" name="idaScheme_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Survey No<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaScheme_surveyNo" name="idaScheme_surveyNo">
																						<option>Survey No</option>
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
																					<label for="loWardno">Census No<span class="mandatory">*</span></label>
																					<input type="text" class="form-control" id="idaScheme_censusNo"
																						name="idaScheme_censusNo" placeholder="Enter Census No"> 
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Occupier Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaScheme_occupierName"
																						name="idaScheme_occupierName" placeholder="Enter Occupier Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Society/Street<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaScheme_societyStreet"
																						name="idaScheme_societyStreet" placeholder="Enter Society/Street">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Landmark</label> <input
																						type="text" class="form-control" id="idaScheme_landmark"
																						name="idaScheme_landmark" placeholder="Enter Landmark">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">City</label> <input
																						type="text" class="form-control" id="idaScheme_city"
																						name="idaScheme_city" placeholder="Enter City">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Email Id</label> <input
																						type="text" class="form-control" id="idaScheme_emailId"
																						name="idaScheme_emailId" placeholder="Enter Email Id">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Block No</label> <input
																						type="text" class="form-control" id="idaScheme_blockNo"
																						name="idaScheme_blockNo" placeholder="Enter Block No">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Tika No</label> <input
																						type="text" class="form-control" id="idaScheme_tikaNo"
																						name="idaScheme_tikaNo" placeholder="Enter Tika No">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Final Plot No</label> <input
																						type="text" class="form-control" id="idaScheme_finalPlotNo"
																						name="idaScheme_finalPlotNo" placeholder="Enter Final Plot No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Pin No</label> <input
																						type="text" class="form-control" id="idaScheme_pinNo"
																						name="idaScheme_pinNo" placeholder="Enter Pin No">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Use of Property</label> <input
																						type="text" class="form-control" id="idaScheme_useOfProperty"
																						name="idaScheme_useOfProperty" placeholder="Enter Use of Property">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Age of Building</label> <input
																						type="text" class="form-control" id="idaScheme_ageOfBuilding"
																						name="idaScheme_ageOfBuilding" placeholder="Enter Age of Building">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Other Residential Property</label> <input
																						type="text" class="form-control" id="idaScheme_otherResidentialProperty"
																						name="idaScheme_otherResidentialProperty" placeholder="Enter Other Residential Property">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Registration No</label> <input
																						type="text" class="form-control" id="idaScheme_registrationNo"
																						name="idaScheme_registrationNo" placeholder="Enter Registration No">
																				</div>
																			
																				
																				<div class="form-group">
																					<label for="hsName">Gas Connection</label> <input
																						type="text" class="form-control" id="idaScheme_gasConnection"
																						name="idaScheme_gasConnection" placeholder="Enter Gas Connection">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Code No</label> <input
																						type="text" class="form-control" id="idaScheme_codeNo"
																						name="idaScheme_codeNo" placeholder="Enter Code No">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Measurement Details</label> <input
																						type="text" class="form-control" id="idaScheme_measurementDetails"
																						name="idaScheme_measurementDetails" placeholder="Enter Measurement Details">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Ground Floor</label> <input
																						type="text" class="form-control" id="idaScheme_groundFloor"
																						name="idaScheme_groundFloor" placeholder="Enter Ground Floor">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Measurement Details1</label> <input
																						type="text" class="form-control" id="idaScheme_measurementDetails1"
																						name="idaScheme_measurementDetails1" placeholder="Enter Measurement Details1">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">First Floor</label> <input
																						type="text" class="form-control" id="idaScheme_firstFloor"
																						name="idaScheme_firstFloor" placeholder="Enter First Floor">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Measurement Details2</label> <input
																						type="text" class="form-control" id="idaScheme_measurementDetails2"
																						name="idaScheme_measurementDetails2" placeholder="Enter Measurement Details2">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Industrial Property</label> <input
																						type="text" class="form-control" id="idaScheme_industrialProperty"
																						name="idaScheme_industrialProperty" placeholder="Enter Industrial Property">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Type of Shade</label> <input
																						type="text" class="form-control" id="idaScheme_typeOfShade"
																						name="idaScheme_typeOfShade" placeholder="Enter Type of Shade">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Pakka Wall with RCC Roof</label> <input
																						type="text" class="form-control" id="idaScheme_pakkaWallWithRccRoof"
																						name="idaScheme_pakkaWallWithRccRoof" placeholder="Enter Pakka Wall with RCC Roof">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Open Land with Corrugated Sheet Shade1</label> <input
																						type="text" class="form-control" id="idaScheme_openLandWithCorrugatedSheetShade1"
																						name="idaScheme_openLandWithCorrugatedSheetShade1" placeholder="Enter Open Land with Corrugated Sheet Shade1">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Location Factor</label> <input
																						type="text" class="form-control" id="idaScheme_locationFactor"
																						name="idaScheme_locationFactor" placeholder="Enter Location Factor">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Type of Property Land</label> <input
																						type="text" class="form-control" id="idaScheme_typeOfPropertyLand"
																						name="idaScheme_typeOfPropertyLand" placeholder="Enter Type of Property Land">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Court Case Type</label> <input
																						type="text" class="form-control" id="idaScheme_courtCaseType"
																						name="idaScheme_courtCaseType" placeholder="Enter Court Case Type">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Enclosed Shed with Non-RCC Roof</label> <input
																						type="text" class="form-control" id="idaScheme_enclosedShedWithNonRccRoof"
																						name="idaScheme_enclosedShedWithNonRccRoof" placeholder="Enter Enclosed Shed with Non-RCC Roof">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Open Land Use for Business Purpose/Pay Park</label> <input
																						type="text" class="form-control" id="idaScheme_openLandUseForBusinessPurposePayPark"
																						name="idaScheme_openLandUseForBusinessPurposePayPark" placeholder="Enter Open Land Use for Business Purpose/Pay Park">
																				</div>
																			
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Owner Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaScheme_ownerName"
																						name="idaScheme_ownerName" placeholder="Enter Owner Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">House No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaScheme_houseNo"
																						name="idaScheme_houseNo" placeholder="Enter House No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Area</label> <input
																						type="text" class="form-control" id="idaScheme_area"
																						name="idaScheme_area" placeholder="Enter Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road</label> <input
																						type="text" class="form-control" id="idaScheme_road"
																						name="idaScheme_road" placeholder="Enter Road">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Mobile No</label> <input
																						type="text" class="form-control" id="idaScheme_mobileNo"
																						name="idaScheme_mobileNo" placeholder="Enter Mobile No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Election Ward</label> <input
																						type="text" class="form-control" id="idaScheme_electionWard"
																						name="idaScheme_electionWard" placeholder="Enter Election Ward">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Re-survey No</label> <input
																						type="text" class="form-control" id="idaScheme_reSurveyNo"
																						name="idaScheme_reSurveyNo" placeholder="Enter Re-survey No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">TP No</label> <input
																						type="text" class="form-control" id="idaScheme_tpNo"
																						name="idaScheme_tpNo" placeholder="Enter TP No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Unique ID No</label> <input
																						type="text" class="form-control" id="idaScheme_uniqueIDNo"
																						name="idaScheme_uniqueIDNo" placeholder="Enter Unique ID No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Type of Property</label> <input
																						type="text" class="form-control" id="idaScheme_typeOfProperty"
																						name="idaScheme_typeOfProperty" placeholder="Enter Type of Property">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year</label> <input
																						type="text" class="form-control" id="idaScheme_constructionYear"
																						name="idaScheme_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Residential Property</label> <input
																						type="text" class="form-control" id="idaScheme_residentialProperty"
																						name="idaScheme_residentialProperty" placeholder="Enter Residential Property">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">License No</label> <input
																						type="text" class="form-control" id="idaScheme_licenseNo"
																						name="idaScheme_licenseNo" placeholder="Enter License No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Water Connection</label> <input
																						type="text" class="form-control" id="idaScheme_waterConnection"
																						name="idaScheme_waterConnection" placeholder="Enter Water Connection">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Drainage Connection</label> <input
																						type="text" class="form-control" id="idaScheme_drainageConnection"
																						name="idaScheme_drainageConnection" placeholder="Enter Drainage Connection">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Basement Code No</label> <input
																						type="text" class="form-control" id="idaScheme_basementCodeNo"
																						name="idaScheme_basementCodeNo" placeholder="Enter Basement Code No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year</label> <input
																						type="text" class="form-control" id="idaScheme_constructionYear0"
																						name="idaScheme_constructionYear0" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Code No</label> <input
																						type="text" class="form-control" id="idaScheme_codeNo0"
																						name="idaScheme_codeNo0" placeholder="Enter Code No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year1</label> <input
																						type="text" class="form-control" id="idaScheme_constructionYear1"
																						name="idaScheme_constructionYear1" placeholder="Enter Construction Year1">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Code No1</label> <input
																						type="text" class="form-control" id="idaScheme_codeNo1"
																						name="idaScheme_codeNo1" placeholder="Enter Code No1">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year2</label> <input
																						type="text" class="form-control" id="idaScheme_constructionYear2"
																						name="idaScheme_constructionYear2" placeholder="Enter Construction Year2">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Factory Premises</label> <input
																						type="text" class="form-control" id="idaScheme_factoryPremises"
																						name="idaScheme_factoryPremises" placeholder="Enter Factory Premises">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RCC Const. with Pakka Wall</label> <input
																						type="text" class="form-control" id="idaScheme_rccWithPakkaWall"
																						name="idaScheme_rccWithPakkaWall" placeholder="Enter RCC Const. with Pakka Wall">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Open Land with Corrugated Sheet Shade</label> <input
																						type="text" class="form-control" id="idaScheme_openLandWithCorrugatedSheetShade"
																						name="idaScheme_openLandWithCorrugatedSheetShade" placeholder="Enter Open Land with Corrugated Sheet Shade">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Zone</label> <input
																						type="text" class="form-control" id="idaScheme_idazone"
																						name="idaScheme_idazone" placeholder="Enter Zone">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Building Height</label> <input
																						type="text" class="form-control" id="idaScheme_buildingHeight"
																						name="idaScheme_buildingHeight" placeholder="Enter Building Height">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Court Case</label> <input
																						type="text" class="form-control" id="idaScheme_courtCase"
																						name="idaScheme_courtCase" placeholder="Enter Court Case">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Set Up Box</label> <input
																						type="text" class="form-control" id="idaScheme_setUpBox"
																						name="idaScheme_setUpBox" placeholder="Enter Set Up Box">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Open Shed with Non-RCC Roof</label> <input
																						type="text" class="form-control" id="idaScheme_openShedWithNonRccRoof"
																						name="idaScheme_openShedWithNonRccRoof" placeholder="Enter Open Shed with Non-RCC Roof">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="idaScheme_remarks" name="idaScheme_remarks"
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
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="idaScheme_geoTaggedPhoto" 
																				name="idaScheme_geoTaggedPhoto">
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
					
<!-- 					ADD IDA SCHEME BOUNDARY MODAL END -->
					
					<!--UPDATE IDA SCHEME BOUNDARY Modal start -->
					
					<div class="modal fade" id="dep_updateIDASchemeBoundary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update IDA Scheme Boundary</h4>
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
																						type="text" class="form-control" id="idaSchemeUp_latitude" 
																						name="idaSchemeUp_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaSchemeUp_ward" name="idaSchemeUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaSchemeUp_plotNo" name="idaSchemeUp_plotNo">
																						<option>Select Plot No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																						</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaSchemeUp_longitude" name="idaSchemeUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaSchemeUp_zone" name="idaSchemeUp_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Survey No<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaSchemeUp_surveyNo" name="idaSchemeUp_surveyNo">
																						<option>Survey No</option>
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
																					<label for="loWardno">Census No<span class="mandatory">*</span></label>
																					<input type="text" class="form-control" id="idaSchemeUp_censusNo"
																						name="idaSchemeUp_censusNo" placeholder="Enter Census No"> 
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Occupier Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaSchemeUp_occupierName"
																						name="idaSchemeUp_occupierName" placeholder="Enter Occupier Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Society/Street<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaSchemeUp_societyStreet"
																						name="idaSchemeUp_societyStreet" placeholder="Enter Society/Street">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Landmark</label> <input
																						type="text" class="form-control" id="idaSchemeUp_landmark"
																						name="idaSchemeUp_landmark" placeholder="Enter Landmark">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">City</label> <input
																						type="text" class="form-control" id="idaSchemeUp_city"
																						name="idaSchemeUp_city" placeholder="Enter City">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Email Id</label> <input
																						type="text" class="form-control" id="idaSchemeUp_emailId"
																						name="idaSchemeUp_emailId" placeholder="Enter Email Id">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Block No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_blockNo"
																						name="idaSchemeUp_blockNo" placeholder="Enter Block No">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Tika No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_tikaNo"
																						name="idaSchemeUp_tikaNo" placeholder="Enter Tika No">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Final Plot No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_finalPlotNo"
																						name="idaSchemeUp_finalPlotNo" placeholder="Enter Final Plot No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Pin No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_pinNo"
																						name="idaSchemeUp_pinNo" placeholder="Enter Pin No">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Use of Property</label> <input
																						type="text" class="form-control" id="idaSchemeUp_useOfProperty"
																						name="idaSchemeUp_useOfProperty" placeholder="Enter Use of Property">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Age of Building</label> <input
																						type="text" class="form-control" id="idaSchemeUp_ageOfBuilding"
																						name="idaSchemeUp_ageOfBuilding" placeholder="Enter Age of Building">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Other Residential Property</label> <input
																						type="text" class="form-control" id="idaSchemeUp_otherResidentialProperty"
																						name="idaSchemeUp_otherResidentialProperty" placeholder="Enter Other Residential Property">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Registration No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_registrationNo"
																						name="idaSchemeUp_registrationNo" placeholder="Enter Registration No">
																				</div>
																			
																				
																				<div class="form-group">
																					<label for="hsName">Gas Connection</label> <input
																						type="text" class="form-control" id="idaSchemeUp_gasConnection"
																						name="idaSchemeUp_gasConnection" placeholder="Enter Gas Connection">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Code No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_codeNo"
																						name="idaSchemeUp_codeNo" placeholder="Enter Code No">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Measurement Details</label> <input
																						type="text" class="form-control" id="idaSchemeUp_measurementDetails"
																						name="idaSchemeUp_measurementDetails" placeholder="Enter Measurement Details">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Ground Floor</label> <input
																						type="text" class="form-control" id="idaSchemeUp_groundFloor"
																						name="idaSchemeUp_groundFloor" placeholder="Enter Ground Floor">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Measurement Details1</label> <input
																						type="text" class="form-control" id="idaSchemeUp_measurementDetails1"
																						name="idaSchemeUp_measurementDetails1" placeholder="Enter Measurement Details1">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">First Floor</label> <input
																						type="text" class="form-control" id="idaSchemeUp_firstFloor"
																						name="idaSchemeUp_firstFloor" placeholder="Enter First Floor">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Measurement Details2</label> <input
																						type="text" class="form-control" id="idaSchemeUp_measurementDetails2"
																						name="idaSchemeUp_measurementDetails2" placeholder="Enter Measurement Details2">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Industrial Property</label> <input
																						type="text" class="form-control" id="idaSchemeUp_industrialProperty"
																						name="idaSchemeUp_industrialProperty" placeholder="Enter Industrial Property">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Type of Shade</label> <input
																						type="text" class="form-control" id="idaSchemeUp_typeOfShade"
																						name="idaSchemeUp_typeOfShade" placeholder="Enter Type of Shade">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Pakka Wall with RCC Roof</label> <input
																						type="text" class="form-control" id="idaSchemeUp_pakkaWallWithRccRoof"
																						name="idaSchemeUp_pakkaWallWithRccRoof" placeholder="Enter Pakka Wall with RCC Roof">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Open Land with Corrugated Sheet Shade1</label> <input
																						type="text" class="form-control" id="idaSchemeUp_openLandWithCorrugatedSheetShade1"
																						name="idaSchemeUp_openLandWithCorrugatedSheetShade1" placeholder="Enter Open Land with Corrugated Sheet Shade1">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Location Factor</label> <input
																						type="text" class="form-control" id="idaSchemeUp_locationFactor"
																						name="idaSchemeUp_locationFactor" placeholder="Enter Location Factor">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Type of Property Land</label> <input
																						type="text" class="form-control" id="idaSchemeUp_typeOfPropertyLand"
																						name="idaSchemeUp_typeOfPropertyLand" placeholder="Enter Type of Property Land">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Court Case Type</label> <input
																						type="text" class="form-control" id="idaSchemeUp_courtCaseType"
																						name="idaSchemeUp_courtCaseType" placeholder="Enter Court Case Type">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Enclosed Shed with Non-RCC Roof</label> <input
																						type="text" class="form-control" id="idaSchemeUp_enclosedShedWithNonRccRoof"
																						name="idaSchemeUp_enclosedShedWithNonRccRoof" placeholder="Enter Enclosed Shed with Non-RCC Roof">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Open Land Use for Business Purpose/Pay Park</label> <input
																						type="text" class="form-control" id="idaSchemeUp_openLandUseForBusinessPurposePayPark"
																						name="idaSchemeUp_openLandUseForBusinessPurposePayPark" placeholder="Enter Open Land Use for Business Purpose/Pay Park">
																				</div>
																			
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Owner Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaSchemeUp_ownerName"
																						name="idaSchemeUp_ownerName" placeholder="Enter Owner Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">House No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaSchemeUp_houseNo"
																						name="idaSchemeUp_houseNo" placeholder="Enter House No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Area</label> <input
																						type="text" class="form-control" id="idaSchemeUp_area"
																						name="idaSchemeUp_area" placeholder="Enter Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Road</label> <input
																						type="text" class="form-control" id="idaSchemeUp_road"
																						name="idaSchemeUp_road" placeholder="Enter Road">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Mobile No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_mobileNo"
																						name="idaSchemeUp_mobileNo" placeholder="Enter Mobile No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Election Ward</label> <input
																						type="text" class="form-control" id="idaSchemeUp_electionWard"
																						name="idaSchemeUp_electionWard" placeholder="Enter Election Ward">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Re-survey No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_reSurveyNo"
																						name="idaSchemeUp_reSurveyNo" placeholder="Enter Re-survey No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">TP No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_tpNo"
																						name="idaSchemeUp_tpNo" placeholder="Enter TP No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Unique ID No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_uniqueIDNo"
																						name="idaSchemeUp_uniqueIDNo" placeholder="Enter Unique ID No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Type of Property</label> <input
																						type="text" class="form-control" id="idaSchemeUp_typeOfProperty"
																						name="idaSchemeUp_typeOfProperty" placeholder="Enter Type of Property">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year</label> <input
																						type="text" class="form-control" id="idaSchemeUp_constructionYear"
																						name="idaSchemeUp_constructionYear" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Residential Property</label> <input
																						type="text" class="form-control" id="idaSchemeUp_residentialProperty"
																						name="idaSchemeUp_residentialProperty" placeholder="Enter Residential Property">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">License No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_licenseNo"
																						name="idaSchemeUp_licenseNo" placeholder="Enter License No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Water Connection</label> <input
																						type="text" class="form-control" id="idaSchemeUp_waterConnection"
																						name="idaSchemeUp_waterConnection" placeholder="Enter Water Connection">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Drainage Connection</label> <input
																						type="text" class="form-control" id="idaSchemeUp_drainageConnection"
																						name="idaSchemeUp_drainageConnection" placeholder="Enter Drainage Connection">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Basement Code No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_basementCodeNo"
																						name="idaSchemeUp_basementCodeNo" placeholder="Enter Basement Code No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year</label> <input
																						type="text" class="form-control" id="idaSchemeUp_constructionYear0"
																						name="idaSchemeUp_constructionYear0" placeholder="Enter Construction Year">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Code No</label> <input
																						type="text" class="form-control" id="idaSchemeUp_codeNo0"
																						name="idaSchemeUp_codeNo0" placeholder="Enter Code No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year1</label> <input
																						type="text" class="form-control" id="idaSchemeUp_constructionYear1"
																						name="idaSchemeUp_constructionYear1" placeholder="Enter Construction Year1">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Code No1</label> <input
																						type="text" class="form-control" id="idaSchemeUp_codeNo1"
																						name="idaSchemeUp_codeNo1" placeholder="Enter Code No1">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Construction Year2</label> <input
																						type="text" class="form-control" id="idaSchemeUp_constructionYear2"
																						name="idaSchemeUp_constructionYear2" placeholder="Enter Construction Year2">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Factory Premises</label> <input
																						type="text" class="form-control" id="idaSchemeUp_factoryPremises"
																						name="idaSchemeUp_factoryPremises" placeholder="Enter Factory Premises">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">RCC Const. with Pakka Wall</label> <input
																						type="text" class="form-control" id="idaSchemeUp_rccWithPakkaWall"
																						name="idaSchemeUp_rccWithPakkaWall" placeholder="Enter RCC Const. with Pakka Wall">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Open Land with Corrugated Sheet Shade</label> <input
																						type="text" class="form-control" id="idaSchemeUp_openLandWithCorrugatedSheetShade"
																						name="idaSchemeUp_openLandWithCorrugatedSheetShade" placeholder="Enter Open Land with Corrugated Sheet Shade">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Zone</label> <input
																						type="text" class="form-control" id="idaSchemeUp_idazone"
																						name="idaSchemeUp_idazone" placeholder="Enter Zone">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Building Height</label> <input
																						type="text" class="form-control" id="idaSchemeUp_buildingHeight"
																						name="idaSchemeUp_buildingHeight" placeholder="Enter Building Height">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Court Case</label> <input
																						type="text" class="form-control" id="idaSchemeUp_courtCase"
																						name="idaSchemeUp_courtCase" placeholder="Enter Court Case">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Set Up Box</label> <input
																						type="text" class="form-control" id="idaSchemeUp_setUpBox"
																						name="idaSchemeUp_setUpBox" placeholder="Enter Set Up Box">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Open Shed with Non-RCC Roof</label> <input
																						type="text" class="form-control" id="idaSchemeUp_openShedWithNonRccRoof"
																						name="idaSchemeUp_openShedWithNonRccRoof" placeholder="Enter Open Shed with Non-RCC Roof">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="idaSchemeUp_remarks" name="idaSchemeUp_remarks"
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
																			<label for="upScimages">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="idaSchemeUp_geoTaggedPhoto" 
																				name="idaSchemeUp_geoTaggedPhoto">
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
										
					<!--UPDATE IDA SCHEME BOUNDARY Modal end -->
					

				</div>
				
				<div class="tab-pane container-fluid" id="ida_ida">
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addIDA_modal"
							class="btn-add btn-indore-table">Add IDA</button>
					</div>

					<h6 class="table-title-grid">List of IDA</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>
				
				
<!-- 					ADD IDA MODAL START -->
	
					<div class="modal fade" id="dep_addIDA_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add IDA</h4>
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
																						type="text" class="form-control" id="ida_latitude" 
																						name="ida_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="ida_ward" name="ida_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ida_plotNo" 
																						name="ida_plotNo" placeholder="Enter Plot No">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ida_longitude" name="ida_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="ida_zone" name="ida_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loLatitude">Khasra No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ida_khasraNo" 
																						name="ida_khasraNo" placeholder="Enter Khasra No">
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
																					<label for="hsName">TP Scheme No</label> <input
																						type="text" class="form-control" id="ida_tpSchemeNo"
																						name="ida_tpSchemeNo" placeholder="Enter TP Scheme No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Status of Scheme</label> <input
																						type="text" class="form-control" id="ida_statusOfScheme"
																						name="ida_statusOfScheme" placeholder="Enter Status of Scheme">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Application Status</label> <input
																						type="text" class="form-control" id="ida_applicationStatus"
																						name="ida_applicationStatus" placeholder="Enter Application Status">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Vacant Property Details</label> <input
																						type="text" class="form-control" id="ida_vacantPropertyDetails"
																						name="ida_vacantPropertyDetails" placeholder="Enter Vacant Property Details">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Update Contact Details</label> <input
																						type="text" class="form-control" id="ida_updateContactDetails"
																						name="ida_updateContactDetails" placeholder="Enter Update Contact Details">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">List of Allotted Plots</label> <input
																						type="text" class="form-control" id="ida_listOfAllottedPlots"
																						name="ida_listOfAllottedPlots" placeholder="Enter List of Allotted Plots">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">IDA deals Projects</label> <input
																						type="text" class="form-control" id="ida_idaDealsProjects"
																						name="ida_idaDealsProjects" placeholder="Enter IDA deals Projects">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="hsName">TP Scheme Name</label> <input
																						type="text" class="form-control" id="ida_tpSchemeName"
																						name="ida_tpSchemeName" placeholder="Enter TP Scheme Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Property Search</label> <input
																						type="text" class="form-control" id="ida_propertySearch"
																						name="ida_propertySearch" placeholder="Enter Property Search">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Lease Defaulter's List</label> <input
																						type="text" class="form-control" id="ida_leaseDefaultersList"
																						name="ida_leaseDefaultersList" placeholder="Enter Lease Defaulter's List">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Scheme wise Alloter's List</label> <input
																						type="text" class="form-control" id="ida_schemeWiseAllotersList"
																						name="ida_schemeWiseAllotersList" placeholder="Enter Scheme wise Alloter's List">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Express Your Interest</label> <input
																						type="text" class="form-control" id="ida_expressYourInterest"
																						name="ida_expressYourInterest" placeholder="Enter Express Your Interest">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Sale of Property</label> <input
																						type="text" class="form-control" id="ida_saleOfProperty"
																						name="ida_saleOfProperty" placeholder="Enter Sale of Property">
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
																				type="file" multiple class="form-control" id="ida_geoTaggedPhoto" 
																				name="ida_geoTaggedPhoto">
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

<!-- 					ADD IDA MODAL END -->


<!-- 					UPDATE IDA MODAL START -->

						<div class="modal fade" id="dep_updateIDA_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update IDA</h4>
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
																						type="text" class="form-control" id="idaUp_latitude" 
																						name="idaUp_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaUp_ward" name="idaUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaUp_plotNo" 
																						name="idaUp_plotNo" placeholder="Enter Plot No">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaUp_longitude" name="idaUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="idaUp_zone" name="idaUp_zone">
																						<option>Select Zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="loLatitude">Khasra No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="idaUp_khasraNo" 
																						name="idaUp_khasraNo" placeholder="Enter Khasra No">
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
																					<label for="hsName">TP Scheme No</label> <input
																						type="text" class="form-control" id="idaUp_tpSchemeNo"
																						name="idaUp_tpSchemeNo" placeholder="Enter TP Scheme No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Status of Scheme</label> <input
																						type="text" class="form-control" id="idaUp_statusOfScheme"
																						name="idaUp_statusOfScheme" placeholder="Enter Status of Scheme">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Application Status</label> <input
																						type="text" class="form-control" id="idaUp_applicationStatus"
																						name="idaUp_applicationStatus" placeholder="Enter Application Status">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Vacant Property Details</label> <input
																						type="text" class="form-control" id="idaUp_vacantPropertyDetails"
																						name="idaUp_vacantPropertyDetails" placeholder="Enter Vacant Property Details">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Update Contact Details</label> <input
																						type="text" class="form-control" id="idaUp_updateContactDetails"
																						name="idaUp_updateContactDetails" placeholder="Enter Update Contact Details">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">List of Allotted Plots</label> <input
																						type="text" class="form-control" id="idaUp_listOfAllottedPlots"
																						name="idaUp_listOfAllottedPlots" placeholder="Enter List of Allotted Plots">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">IDA deals Projects</label> <input
																						type="text" class="form-control" id="idaUp_idaDealsProjects"
																						name="idaUp_idaDealsProjects" placeholder="Enter IDA deals Projects">
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="hsName">TP Scheme Name</label> <input
																						type="text" class="form-control" id="idaUp_tpSchemeName"
																						name="idaUp_tpSchemeName" placeholder="Enter TP Scheme Name">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Property Search</label> <input
																						type="text" class="form-control" id="idaUp_propertySearch"
																						name="idaUp_propertySearch" placeholder="Enter Property Search">
																				</div>
																			
																				<div class="form-group">
																					<label for="hsName">Lease Defaulter's List</label> <input
																						type="text" class="form-control" id="idaUp_leaseDefaultersList"
																						name="idaUp_leaseDefaultersList" placeholder="Enter Lease Defaulter's List">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Scheme wise Alloter's List</label> <input
																						type="text" class="form-control" id="idaUp_schemeWiseAllotersList"
																						name="idaUp_schemeWiseAllotersList" placeholder="Enter Scheme wise Alloter's List">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Express Your Interest</label> <input
																						type="text" class="form-control" id="idaUp_expressYourInterest"
																						name="idaUp_expressYourInterest" placeholder="Enter Express Your Interest">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Sale of Property</label> <input
																						type="text" class="form-control" id="idaUp_saleOfProperty"
																						name="idaUp_saleOfProperty" placeholder="Enter Sale of Property">
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
																				type="file" multiple class="form-control" id="idaUp_geoTaggedPhoto" 
																				name="idaUp_geoTaggedPhoto">
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

<!-- 					UPDATE IDA MODAL END -->

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