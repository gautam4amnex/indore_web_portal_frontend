<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>District Registrar Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data_translate="_primary" data-toggle="tab" href="#drd_dept">Revenue & Stamp Duty</a>
					</li>
				
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="drd_dept">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addRevenureStamp_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Revenue & Stamp Duty</button>
					</div>

					<h6 class="table-title-grid" data_translate="_list_of_primary_school">List of Primary School</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					<!--Add District Registrar dept start -->
					<div class="modal fade" id="dep_addRevenureStamp_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Revenue & Stamp Duty</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

			<!-- 											<div class="col-4 text-left ml-3">
															<form class="form-admin">
																<div class="form-group">
																	<label for="selectType" data_translate="_select_type" class="ml-2">Select
																		Type</label> <select class="form-control pb-1" id="selectType">
																		<option data_translate="_select_type">Select Type</option>
																		<option value=" ">2</option>
																		<option value=" ">3</option>
																		<option value=" ">4</option>
																	</select>
																</div>
															</form>
														</div> -->
														<div class="col-md-12 mx-0">

															<form id="form_add_drd" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder" id="basic"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_images" id="imagestab" class="tabwithborder" id="images"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="drd_latitude">Latitude</label> <input
																						type="text" class="form-control" id="drd_latitude" name="drd_latitude"
																						placeholder="Enter Latitude">
																				</div>
																																						
																				<div class="form-group">
																					<label for="drd_ward">Ward No</label> <select
																						class="form-control pb-1" id="drd_ward" name="drd_ward">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="drd_subLayerId" name="drd_subLayerId">
																				</div>
																																								
																			</div>

 																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="drd_longitude">Longitude</label> <input
																						type="text" class="form-control" id="drd_longitude" name="drd_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="drd_zone">Zone Name</label> <select
																						class="form-control pb-1" id="drd_zone" name="drd_zone">
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
																					<label for="drd_landType">Land Type</label> <select
																						class="form-control pb-1" id="drd_landType" name="drd_landType">
																						<option>Select Land Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="drd_ownerName">Owner Name</label> <input
																						type="text" class="form-control" id="drd_ownerName" name="drd_ownerName"
																						placeholder="Enter Owner Name">
																				</div>
																				<div class="form-group">
																					<label for="drd_landValue">Land value</label> <input
																						type="text" class="form-control" id="drd_landValue" name="drd_landValue"
																						placeholder="Enter Land value">
																				</div>
																				<div class="form-group">
																					<label for="drd_tranferOfProp">Transfer of Property</label> <input
																						type="text" class="form-control" id="drd_tranferOfProp" name="drd_tranferOfProp"
																						placeholder="Enter Transfer of Property">
																				</div>
																				<div class="form-group">
																					<label for="drd_evidenceForTransfer">Evidence for Transfer</label> <input
																						type="text" class="form-control" id="drd_evidenceForTransfer" name="drd_evidenceForTransfer"
																						placeholder="Enter Evidence for Transfer">
																				</div>
																				<div class="form-group">
																					<label for="drd_regSchema">Registered Under schema</label> <input
																						type="text" class="form-control" id="drd_regSchema" name="drd_regSchema"
																						placeholder="Enter Registered Under schema">
																				</div>
																				<div class="form-group">
																					<label for="drd_reraRegNo">RERA registration Number</label> <input
																						type="text" class="form-control" id="drd_reraRegNo" name="drd_reraRegNo"
																						placeholder="Enter RERA registration Number">
																				</div>	
																			</div>																	
																			

																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																			<label for="drd_ownership_type">Ownership Types</label> <select
																			class="form-control pb-1" id="drd_ownership_type" name="drd_ownership_type">
																					<option>Select Ownership Type</option>
																					<option value=" ">2</option>
																					<option value=" ">3</option>
																					<option value=" ">4</option>
																			</select>
																			</div>
																			<div class="form-group">
																					<label for="drd_landArea">Land Area</label> <input
																						type="text" class="form-control" id="drd_landArea" name="drd_landArea"
																						placeholder="Enter Land Area">
																			</div>
																			<div class="form-group">
																					<label for="drd_stampDuty">Stamp Duty</label> <input
																						type="text" class="form-control" id="drd_stampDuty" name="drd_stampDuty"
																						placeholder="Enter Stamp Duty">
																			</div>
																			<div class="form-group">
																					<label for="drd_authDoc">Authentication of Documents</label> <input
																						type="text" class="form-control" id="drd_authDoc" name="drd_authDoc"
																						placeholder="Enter Authentication of Documents">
																			</div>
																			<div class="form-group">
																			<label class="radio-inline" for="drd_legalIssue">Any Legal Issue </label> 
																				</div>
																					<div class="form-group">
																						<input type="radio" id="drd_leagalIssueTest_yes" 
																						name="drd_leagalIssue_test" value="true">Yes
																						<input type="radio"  id="drd_leagalIssueTest_no" 
																						name="drd_leagalIssue_test" value="false">No
																				</div>
																			<div class="form-group">
																					<label for="drd_schStatus">Schema  Status</label> <input
																						type="text" class="form-control" id="drd_schStatus" name="drd_schStatus"
																						placeholder="Enter Schema  Status">
																			</div>
																			<div class="form-group">
																					<label for="drd_schemaValidation">Schema Validity</label> <input
																						type="text" class="form-control" id="drd_schemaValidation" name="drd_schemaValidation"
																						placeholder="Enter Schema Validity">
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
																			<label for="drd_upScimages">Upload Images</label> <input
																				type="file" class="form-control" id="drd_upScimages">
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
					<!--Add District Registrar dept end -->
					
					
					<!-- Update District Registrar dept start -->
					<div class="modal fade" id="dep_Update_RevenureStamp_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Update Revenue & Stamp Duty</h4>
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

															<form id="form_update_drd" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder" id="basic"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_images" id="imagestab" class="tabwithborder" id="images"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="drd_UpLatitude">Latitude</label> <input
																						type="text" class="form-control" id="drd_UpLatitude" name="drd_UpLatitude"
																						placeholder="Enter Latitude">
																				</div>
																																						
																				<div class="form-group">
																					<label for="drd_UpWard">Ward No</label> <select
																						class="form-control pb-1" id="drd_UpWard" name="drd_UpWard">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																																								
																			</div>

 																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="drd_UpLongitude">Longitude</label> <input
																						type="text" class="form-control" id="drd_UpLongitude" name="drd_UpLongitude"
																						placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="drd_UpZoneName">Zone Name</label> <select
																						class="form-control pb-1" id="drd_UpZoneName" name="drd_UpZoneName">
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
																					<label for="drd_UplandType">Land Type</label> <select
																						class="form-control pb-1" id="drd_UplandType" name="drd_UplandType">
																						<option>Select Land Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="drd_UpOwnerName">Owner Name</label> <input
																						type="text" class="form-control" id="drd_UpOwnerName" name="drd_UpOwnerName"
																						placeholder="Enter Owner Name">
																				</div>
																				<div class="form-group">
																					<label for="drd_UpLandValue">Land value</label> <input
																						type="text" class="form-control" id="drd_UpLandValue" name="drd_UpLandValue"
																						placeholder="Enter Land value">
																				</div>
																				<div class="form-group">
																					<label for="drd_UpTranferOfProp">Transfer of Property</label> <input
																						type="text" class="form-control" id="drd_UpTranferOfProp" name="drd_UpTranferOfProp"
																						placeholder="Enter Transfer of Property">
																				</div>
																				<div class="form-group">
																					<label for="drd_UpEvidenceForTransfer">Evidence for Transfer</label> <input
																						type="text" class="form-control" id="drd_UpEvidenceForTransfer" name="drd_UpEvidenceForTransfer"
																						placeholder="Enter Evidence for Transfer">
																				</div>
																				<div class="form-group">
																					<label for="drd_UpRegSchema">Registered Under schema</label> <input
																						type="text" class="form-control" id="drd_UpRegSchema" name="drd_UpRegSchema"
																						placeholder="Enter Registered Under schema">
																				</div>
																				<div class="form-group">
																					<label for="drd_UpRERARegNo">RERA registration Number</label> <input
																						type="text" class="form-control" id="drd_UpRERARegNo" name="drd_UpRERARegNo"
																						placeholder="Enter RERA registration Number">
																				</div>	
																			</div>																	
																			

																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																			<label for="drd_UpOwnership_type">Ownership Types</label> <select
																			class="form-control pb-1" id="drd_UpOwnership_type" name="drd_UpOwnership_type">
																					<option>Select Ownership Type</option>
																					<option value=" ">2</option>
																					<option value=" ">3</option>
																					<option value=" ">4</option>
																			</select>
																			</div>
																			<div class="form-group">
																					<label for="drd_UpLandArea">Land Area</label> <input
																						type="text" class="form-control" id="drd_UpLandArea" name="drd_UpLandArea"
																						placeholder="Enter Land Area">
																			</div>
																			<div class="form-group">
																					<label for="drd_UpStampDuty">Stamp Duty</label> <input
																						type="text" class="form-control" id="drd_UpStampDuty" name="drd_UpStampDuty"
																						placeholder="Enter Stamp Duty">
																			</div>
																			<div class="form-group">
																					<label for="drd_UpAuthDoc">Authentication of Documents</label> <input
																						type="text" class="form-control" id="drd_UpAuthDoc" name="drd_UpAuthDoc"
																						placeholder="Enter Authentication of Documents">
																			</div>
																			<div class="form-group">
																			<label class="radio-inline" for="drd_UpLegalIssue">Any Legal Issue </label> 
																				</div>
																					<div class="form-group">
																						<input type="radio" id="drd_UpLeagalIssueTest_yes" 
																						name="drd_UPLeagalIssue_test" value="true">Yes
																						<input type="radio"  id="drd_UpLeagalIssueTest_no" 
																						name="drd_UPLeagalIssue_test" value="false">No
																				</div>
																			<div class="form-group">
																					<label for="drd_UpSchStatus">Schema  Status</label> <input
																						type="text" class="form-control" id="drd_UpSchStatus" name="drd_UpSchStatus"
																						placeholder="Enter Schema  Status">
																			</div>
																			<div class="form-group">
																					<label for="drd_UpSchemaValidation">Schema Validity</label> <input
																						type="text" class="form-control" id="drd_UpSchemaValidation" name="drd_UpSchemaValidation"
																						placeholder="Enter Schema Validity">
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
																			<label for="drd_Up_Scimages">Upload Images</label> <input
																				type="file" class="form-control" id="drd_Up_Scimages" name= "drd_Up_Scimages">
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
					<!--Update District Registrar dept end -->

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