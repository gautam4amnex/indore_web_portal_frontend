<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Police Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
<!-- 				<li class="nav-item"><a class="nav-link active" -->
<!-- 					data-toggle="tab" href="#police_policeStation">Police Station Boundary</a></li> -->
<!-- 				<li class="nav-item"><a class="nav-link" data-toggle="tab" -->
<!-- 					href="#police_spBoundary">S.P. Boundary</a></li> -->
<!-- 				<li class="nav-item"><a class="nav-link" data-toggle="tab" -->
<!-- 					href="#police_ciBoundary">C.I. Boundary</a></li> -->
				<li class="nav-item"><a class="nav-link tb-data active" data-toggle="tab"
					href="#police_policeChowki">Police chowki</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid" id="police_policeStation">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addPoliceStation_modal"
							class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Police Station Boundaries</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>
				
				
<!-- 					ADD POLICE STATION MODAL START -->

					<div class="modal fade" id="dep_addPoliceStation_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Police Station Boundary</h4>
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
																					<label for="loLatitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeStation_latitude" 
																						name="policeStation_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="policeStation_ward" name="policeStation_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeStation_longitude" name="policeStation_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="policeStation_zone" name="policeStation_zone">
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
																					<label for="hsName">Police Station Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeStation_name"
																						name="policeStation_name" placeholder="Enter Police Station Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="policeStation_address" name="policeStation_address"
																						placeholder="Enter Address"></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Police Station Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeStation_area"
																						name="policeStation_area" placeholder="Enter Police Station Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="policeStation_remarks" name="policeStation_remarks"
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
																				type="file" multiple class="form-control" id="policeStation_geoTaggedPhoto" 
																				name="policeStation_geoTaggedPhoto">
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
					
<!-- 					ADD POLICE STATION MODAL END -->
					
					<!--UPDATE POLICE STATION Modal start -->
					
					<div class="modal fade" id="dep_updatePoliceStation_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Police Station Boundary</h4>
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
																						type="text" class="form-control" id="policeStationUp_latitude" 
																						name="policeStationUp_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="policeStationUp_ward" name="policeStationUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input -->
<!-- 																						type="text" class="form-control" id="policeStationUp_plotNo"  -->
<!-- 																						name="policeStationUp_plotNo" placeholder="Enter Plot No"> -->
<!-- 																				</div> -->
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeStationUp_longitude" name="policeStationUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="policeStationUp_zone" name="policeStationUp_zone">
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
																					<label for="hsName">Police Station Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeStationUp_name"
																						name="policeStationUp_name" placeholder="Enter Police Station Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="policeStationUp_address" name="policeStationUp_address"
																						placeholder="Enter Address"></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Police Station Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="policeStationUp_area"
																						name="policeStationUp_area" placeholder="Enter Police Station Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="policeStationUp_remarks" name="policeStationUp_remarks"
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
																				type="file" multiple class="form-control" id="policeStationUp_geoTaggedPhoto" 
																				name="policeStationUp_geoTaggedPhoto">
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
					
					
					<!--UPDATE POLICE STATION Modal end -->
					

				</div>
				
				
				<div class="tab-pane container-fluid fade" id="police_spBoundary">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addSPBoundary_modal"
						class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of S.P Boundaries</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>
					
					
<!-- 					ADD S.P Boundary MODAL START -->
					
					<div class="modal fade" id="dep_addSPBoundary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add S.P Boundary</h4>
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
																						type="text" class="form-control" id="spBoundary_latitude" 
																						name="spBoundary_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="spBoundary_ward" name="spBoundary_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input -->
<!-- 																						type="text" class="form-control" id="spBoundary_plotNo"  -->
<!-- 																						name="spBoundary_plotNo" placeholder="Enter Plot No"> -->
<!-- 																				</div> -->
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundary_longitude" 
																						name="spBoundary_longitude" placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="spBoundary_zone" name="spBoundary_zone">
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
																					<label for="hsName">SP Office/Commissionerate<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundary_spOfficeCommissionerate"
																						name="spBoundary_spOfficeCommissionerate" placeholder="Enter SP Office/Commissionerate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">SP Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundary_spArea"
																						name="spBoundary_spArea" placeholder="Enter SP Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Cases</label> <input
																						type="text" class="form-control" id="spBoundary_noOfCases"
																						name="spBoundary_noOfCases" placeholder="Enter No of Cases">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Phone No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundary_phoneNo"
																						name="spBoundary_phoneNo" placeholder="Enter Phone No">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hsAddress">Address</label> 
																					<textarea class="form-control"
																						id="spBoundary_address" name="spBoundary_address"
																						placeholder="Enter Address"></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">SP Boundary<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundary_spBoundary"
																						name="spBoundary_spBoundary" placeholder="Enter SP Boundary">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Officers<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundary_noOfOfficers"
																						name="spBoundary_noOfOfficers" placeholder="Enter No of Officers">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">CCTNS<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundary_cctns"
																						name="spBoundary_cctns" placeholder="Enter CCTNS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="spBoundary_remarks" name="spBoundary_remarks"
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
																				type="file" multiple class="form-control" id="spBoundary_geoTaggedPhoto" 
																				name="spBoundary_geoTaggedPhoto">
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
					
					
<!-- 					ADD S.P Boundary END -->
					
					
<!-- 					UPDATE S.P Boundary MODAL START -->
					
					<div class="modal fade" id="dep_updateSPBoundary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update S.P Boundary</h4>
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
																						type="text" class="form-control" id="spBoundaryUp_latitude" 
																						name="spBoundaryUp_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="spBoundaryUp_ward" name="spBoundaryUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input -->
<!-- 																						type="text" class="form-control" id="spBoundaryUp_plotNo"  -->
<!-- 																						name="spBoundaryUp_plotNo" placeholder="Enter Plot No"> -->
<!-- 																				</div> -->
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundaryUp_longitude" 
																						name="spBoundaryUp_longitude" placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="spBoundaryUp_zone" name="spBoundaryUp_zone">
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
																					<label for="hsName">SP Office/Commissionerate<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundaryUp_spOfficeCommissionerate"
																						name="spBoundaryUp_spOfficeCommissionerate" placeholder="Enter SP Office/Commissionerate">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">SP Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundaryUp_spArea"
																						name="spBoundaryUp_spArea" placeholder="Enter SP Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Cases</label> <input
																						type="text" class="form-control" id="spBoundaryUp_noOfCases"
																						name="spBoundaryUp_noOfCases" placeholder="Enter No of Cases">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Phone No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundaryUp_phoneNo"
																						name="spBoundaryUp_phoneNo" placeholder="Enter Phone No">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hsAddress">Address</label> 
																					<textarea class="form-control"
																						id="spBoundaryUp_address" name="spBoundaryUp_address"
																						placeholder="Enter Address"></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">SP Boundary<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundaryUp_spBoundary"
																						name="spBoundaryUp_spBoundary" placeholder="Enter SP Boundary">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Officers<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundaryUp_noOfOfficers"
																						name="spBoundaryUp_noOfOfficers" placeholder="Enter No of Officers">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">CCTNS<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="spBoundaryUp_cctns"
																						name="spBoundaryUp_cctns" placeholder="Enter CCTNS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="spBoundaryUp_remarks" name="spBoundaryUp_remarks"
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
																				type="file" multiple class="form-control" id="spBoundaryUp_geoTaggedPhoto" 
																				name="spBoundaryUp_geoTaggedPhoto">
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
					
<!-- 					UPDATE S.P Boundary MODAL END -->
					
					
					
					
				</div>
				
				<div class="tab-pane container-fluid fade" id="police_ciBoundary">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addCIBoundary_modal"
						class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of CI Boundaries</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>
					
					<!-- 	ADD CI BOUNDARY MODAL START -->
					<div class="modal fade" id="dep_addCIBoundary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add CI Boundary</h4>
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
																						type="text" class="form-control" id="ciBoundary_latitude" 
																						name="ciBoundary_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="ciBoundary_ward" name="ciBoundary_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input -->
<!-- 																						type="text" class="form-control" id="ciBoundary_plotNo"  -->
<!-- 																						name="ciBoundary_plotNo" placeholder="Enter Plot No"> -->
<!-- 																				</div> -->
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundary_longitude" 
																						name="ciBoundary_longitude" placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="ciBoundary_zone" name="ciBoundary_zone">
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
																					<label for="hsName">Circle Inspector<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundary_circleInspector"
																						name="ciBoundary_circleInspector" placeholder="Enter Circle Inspector">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">CI Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundary_ciArea"
																						name="ciBoundary_ciArea" placeholder="Enter CI Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Cases<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundary_noOfCases"
																						name="ciBoundary_noOfCases" placeholder="Enter No of Cases">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Phone No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundary_phoneNo"
																						name="ciBoundary_phoneNo" placeholder="Enter Phone No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address</label> 
																					<textarea class="form-control"
																						id="ciBoundary_address" name="ciBoundary_address"
																						placeholder="Enter Address"></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Circle Inspector Boundary<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundary_ciBoundary"
																						name="ciBoundary_ciBoundary" placeholder="Enter Circle Inspector Boundary">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Officers<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundary_noOfOfficers"
																						name="ciBoundary_noOfOfficers" placeholder="Enter No of Officers">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">CCTNS</label> <input
																						type="text" class="form-control" id="ciBoundary_cctns"
																						name="ciBoundary_cctns" placeholder="Enter CCTNS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="ciBoundary_remarks" name="ciBoundary_remarks"
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
																				type="file" multiple class="form-control" id="ciBoundary_geoTaggedPhoto" 
																				name="ciBoundary_geoTaggedPhoto">
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
					
					<!-- 	ADD CI BOUNDARY MODAL END -->
					
					
<!-- 					UPDATE CI BOUNDARY MODAL START -->

					<div class="modal fade" id="dep_updateCIBoundary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update CI Boundary</h4>
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
																						type="text" class="form-control" id="ciBoundaryUp_latitude" 
																						name="ciBoundaryUp_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="ciBoundaryUp_ward" name="ciBoundaryUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loLatitude">Plot No<span class="mandatory">*</span></label> <input -->
<!-- 																						type="text" class="form-control" id="ciBoundaryUp_plotNo"  -->
<!-- 																						name="ciBoundaryUp_plotNo" placeholder="Enter Plot No"> -->
<!-- 																				</div> -->
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundaryUp_longitude" 
																						name="ciBoundaryUp_longitude" placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="loWardno">Zone<span class="mandatory">*</span></label> <select
																						class="form-control pb-1" id="ciBoundaryUp_zone" name="ciBoundaryUp_zone">
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
																					<label for="hsName">Circle Inspector<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundaryUp_circleInspector"
																						name="ciBoundaryUp_circleInspector" placeholder="Enter Circle Inspector">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">CI Area<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundaryUp_ciArea"
																						name="ciBoundaryUp_ciArea" placeholder="Enter CI Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Cases<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundaryUp_noOfCases"
																						name="ciBoundaryUp_noOfCases" placeholder="Enter No of Cases">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Phone No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundaryUp_phoneNo"
																						name="ciBoundaryUp_phoneNo" placeholder="Enter Phone No">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address</label> 
																					<textarea class="form-control"
																						id="ciBoundaryUp_address" name="ciBoundaryUp_address"
																						placeholder="Enter Address"></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Circle Inspector Boundary<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundaryUp_ciBoundary"
																						name="ciBoundaryUp_ciBoundary" placeholder="Enter Circle Inspector Boundary">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Officers<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="ciBoundaryUp_noOfOfficers"
																						name="ciBoundaryUp_noOfOfficers" placeholder="Enter No of Officers">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">CCTNS</label> <input
																						type="text" class="form-control" id="ciBoundaryUp_cctns"
																						name="ciBoundaryUp_cctns" placeholder="Enter CCTNS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Remarks</label> 
																					<textarea class="form-control"
																						id="ciBoundaryUp_remarks" name="ciBoundaryUp_remarks"
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
																				type="file" multiple class="form-control" id="ciBoundaryUp_geoTaggedPhoto" 
																				name="ciBoundaryUp_geoTaggedPhoto">
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
					
					
<!-- 					UPDATE CI BOUNDARY MODAL END -->
					
					
				</div>
			
				<div class="tab-pane container-fluid active" id="police_policeChowki">
				
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addPoliceChowki_modal"
						class="btn-add btn-indore-table">Add</button>
					</div>

					<h6 class="table-title-grid">List of Police Chowki</h6>
					<table id="dep_police_chowki_table" class="display tbl_dep" class="tbl-report"></table>
					
				
					<!-- 	ADD POLICE CHOWKI MODAL START -->
					
					<div class="modal fade" id="dep_addPoliceChowki_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Police Chowki</h4>
									<button type="button" class="close" onclick="resetForm('form_addPoliceChowki')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addPoliceChowki" name="form_addPoliceChowki" class="msform form-admin">
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
																						type="number" class="form-control" id="policeChowki_latitude" 
																						name="policeChowki_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="policeChowki_ward" name="policeChowki_ward">
																						
																					</select>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="policeChowki_longitude" 
																						name="policeChowki_longitude" placeholder="Enter Longitude">
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
																						name="policeChowki_name" placeholder="Enter Police Station Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Police Station Area</label> <input
																						type="text" class="form-control" id="policeChowki_area"
																						name="policeChowki_area" placeholder="Enter Police Station Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Thana Incharge Name</label> <input
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
																						placeholder="Enter Address"></textarea>
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
					
<!-- 					UPDATE POLICE CHOWKI MODAL START -->
					
					<div class="modal fade" id="dep_updatePoliceChowki_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Police Chowki</h4>
									<button type="button" class="close" onclick="resetForm('form_updatePoliceChowki')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updatePoliceChowki" name="form_updatePoliceChowki" class="msform form-admin">
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
																						type="number" class="form-control" id="policeChowkiUp_latitude" 
																						name="policeChowkiUp_latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="policeChowkiUp_ward" name="policeChowkiUp_ward">
																						
																					</select>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="policeChowkiUp_longitude" 
																						name="policeChowkiUp_longitude" placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="policeChowkiUp_subLayerId" name="policeChowkiUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="policeChowkiUp_policeChowkiId" name="policeChowkiUp_policeChowkiId">
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
																						type="text" class="form-control" id="policeChowkiUp_name"
																						name="policeChowkiUp_name" placeholder="Enter Police Station Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Police Station Area</label> <input
																						type="text" class="form-control" id="policeChowkiUp_area"
																						name="policeChowkiUp_area" placeholder="Enter Police Station Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Thana Incharge Name</label> <input
																						type="text" class="form-control" id="policeChowkiUp_thanaInchargeName"
																						name="policeChowkiUp_thanaInchargeName" placeholder="Enter Thana Incharge Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Thana Incharge Area</label> <input
																						type="text" class="form-control" id="policeChowkiUp_thanaInchargeArea"
																						name="policeChowkiUp_thanaInchargeArea" placeholder="Enter Thana Incharge Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">No of Cases</label> <input
																						type="text" class="form-control" id="policeChowkiUp_noOfCases"
																						name="policeChowkiUp_noOfCases" placeholder="Enter No of Cases">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Phone Number</label> <input
																						type="text" class="form-control" id="policeChowkiUp_phoneNo"
																						name="policeChowkiUp_phoneNo" placeholder="Enter Phone Number">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="policeChowkiUp_address" name="policeChowkiUp_address"
																						placeholder="Enter Address"></textarea>
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsName">Zonal wise PS</label> <input
																						type="text" class="form-control" id="policeChowkiUp_zonalWisePs"
																						name="policeChowkiUp_zonalWisePs" placeholder="Enter Zonal wise PS">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">SP Area</label> <input
																						type="text" class="form-control" id="policeChowkiUp_spArea"
																						name="policeChowkiUp_spArea" placeholder="Enter SP Area">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">Thana Incharge No</label> <input
																						type="text" class="form-control" id="policeChowkiUp_thanaInchargeNo"
																						name="policeChowkiUp_thanaInchargeNo" placeholder="Enter Thana Incharge No">
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="hsName">No of Officers</label> <input
																						type="text" class="form-control" id="policeChowkiUp_noOfOfficers"
																						name="policeChowkiUp_noOfOfficers" placeholder="Enter No of Officers">
																				</div>
																				
																				<div class="form-group">
																					<label for="hsName">CCTNS</label> <input
																						type="text" class="form-control" id="policeChowkiUp_cctns"
																						name="policeChowkiUp_cctns" placeholder="Enter CCTNS">
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
<!-- 																				type="file" multiple class="form-control" id="policeChowkiUp_geoTaggedPhoto"  -->
<!-- 																				name="policeChowkiUp_geoTaggedPhoto"> -->
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
					
<!-- 					UPDATE POLICE CHOWKI MODAL END  -->
					
					
				
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

<script type="text/javascript" src="${context}/js/designer/police_dep.js"></script>

</body>
</html>