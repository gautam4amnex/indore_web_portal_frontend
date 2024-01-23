<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Director of planning economics & statistics Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data_translate="_primary" data-toggle="tab" href="#direction_of_planing">Birth-Death Registration</a>
				</li>
				
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="direction_of_planing">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addBirthDeath_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Birth-Death</button>
					</div>
				
					<h6 class="table-title-grid" data_translate="_list_of_primary_school">Add Birth-Death</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					<!-- Direction of planning Add Modal start -->
					
					<div class="modal fade" id="dep_addBirthDeath_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Birth-Death Data</h4>
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

															<form id="form_add_dpes" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder" id="basic"><strong>Basic
																			Info</strong></li>
																	<!-- <li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Facilities</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab" class="tabwithborder" id="images"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="dpes_latitude">Latitude</label> <input
																						type="text" class="form-control" id="dpes_latitude" name="dpes_latitude"
																						placeholder="Enter Latitude">
																				</div>
																																						
																				<div class="form-group">
																					<label for="dpes_ward">Ward No</label> <select
																						class="form-control pb-1" id="dpes_ward" name="dpes_ward">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="dpes_subLayerId" name="dpes_subLayerId">
																				</div>
																																								
																			</div>

 																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="dpes_longitude">Longitude</label> <input
																						type="text" class="form-control" id="dpes_longitude" name="dpes_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="dpes_zone">Zone Name</label> <select
																						class="form-control pb-1" id="dpes_zone" name="dpes_zone">
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
																					<label for="dpes_bdRegSch">Birth-Death's Registration Scheme</label> <input
																						type="text" class="form-control" id="dpes_bdRegSch" name="dpes_bdRegSch"
																						placeholder="Enter Birth-Death's Scheme">
																				</div>
																			
																				<div class="form-group">
																					<label for="dpes_chietExeOfficer">Chief Executive Officer</label> <input
																						type="text" class="form-control" id="dpes_chietExeOfficer" name="dpes_chietExeOfficer"
																						placeholder="Enter Chief Executive Officer Name">
																				</div>																																							
																				
																				<div class="form-group">
																					<label for="dpes_medicalOfficer">Medical Officer</label> <input
																						type="text" class="form-control" id="dpes_medicalOfficer" name="dpes_medicalOfficer"
																						placeholder="Enter Medical Officer Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="dpes_rightToInfoAct">Right To Information Act</label> <input
																						type="text" class="form-control" id="dpes_rightToInfoAct" name="dpes_rightToInfoAct"
																						placeholder="Enter Right To Information Act">
																				</div>	
																				
																				<div class="form-group">
																						<label for="dpes_statePlanCommission">State Planning Commission</label> <input
																							type="text" class="form-control" id="dpes_statePlanCommission" name="dpes_statePlanCommission"
																							placeholder="Enter State Planning Commission">
																				</div>	
																				<div class="form-group">
																						<label for="dpes_eLogin">E-sanchay login</label> <input
																							type="text" class="form-control" id="dpes_eLogin" name="dpes_eLogin"
																							placeholder="Enter E-sanchay login ">
																				</div>																		
																				
																																	
																				
																				<div class="form-group">
																					<label for="dpes_districtStatistics">District/Tehsil/Janpad Statistics</label> <input
																						type="text" class="form-control" id="dpes_districtStatistics" name="dpes_districtStatistics"
																						placeholder="Enter District/Tehsil/Janpad Statistics">
																				</div>
																				
																				<div class="form-group">
																					<label for="dpes_remarks">Remarks</label> <input
																						type="text" class="form-control" id="dpes_remarks" name="dpes_remarks"
																						placeholder="Enter Remarks">
																				</div>		
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																					<label for="dpes_chiefRegOfficer">Chief Registar Officer</label> <input
																						type="text" class="form-control" id="dpes_chiefRegOfficer" name="dpes_chiefRegOfficer"
																						placeholder="Enter Chief Registar Officer Name">
																			</div>
																			<div class="form-group">
																					<label for="dpes_regOfficer">Registrar Officer</label> <input
																						type="text" class="form-control" id="dpes_regOfficer" name="dpes_regOfficer"
																						placeholder="Enter Registrar Officer Name">
																			</div>
																			<div class="form-group">
																					<label for="dpes_otherSchema">Other Scheme's</label> <input
																						type="text" class="form-control" id="dpes_otherSchema" name="dpes_otherSchema"
																						placeholder="Enter Other Scheme's">
																			</div>
																				
																			<div class="form-group">
																					<label for="dpes_parishad">M.P Jan Abhiyaan Parishad</label> <input
																							type="text" class="form-control" id="dpes_parishad" name="dpes_parishad"
																							placeholder="Enter M.P Jan Abhiyaan Parishad ">
																			</div>
																				
																			<div class="form-group">
																				<label for="dpes_infoTech">Information Technology</label> <input
																						type="text" class="form-control" id="dpes_infoTech" name="dpes_infoTech"
																						placeholder="Enter Information Technology">
																			</div>
																			<div class="form-group">
																					<label for="dpes_serveyorScheme">Assistant Surveyor Scheme</label> <input
																						type="text" class="form-control" id="dpes_serveyorScheme" name="dpes_serveyorScheme"
																						placeholder="Enter Assistant Surveyor Scheme">
																			</div>	
																			<div class="form-group">
																					<label for="dpes_ecourtService">M.P E-court Services</label> <select
																						class="form-control pb-1" id="dpes_ecourtService" name="dpes_ecourtService">
																						<option>Select M.P E-court Services</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
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
																			<label for="dpes_upScimages">Upload Images</label> <input
																				type="file" class="form-control" id="dpes_upScimages">
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
				<!-- Direction of planning Add Modal end -->
				
				
				<!-- Update Direction of planning Modal start -->
					
					<div class="modal fade" id="dep_Update_BirthDeath_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Update Birth-Death Data</h4>
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

															<form id="form_update_dpes" class="msform form-admin">
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
																					<label for="dpes_UpLatitude">Latitude</label> <input
																						type="text" class="form-control" id="dpes_UpLatitude" name="dpes_UpLatitude"
																						placeholder="Enter Latitude">
																				</div>
																																						
																				<div class="form-group">
																					<label for="dpes_UpWard">Ward No</label> <select
																						class="form-control pb-1" id="dpes_UpWard" name="dpes_UpWard">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																																								
																			</div>

 																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="dpes_Uplongitude">Longitude</label> <input
																						type="text" class="form-control" id="dpes_Uplongitude" name="dpes_Uplongitude"
																						placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="dpes_UpzoneName">Zone Name</label> <select
																						class="form-control pb-1" id="dpes_UpzoneName" name="dpes_UpzoneName">
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
																					<label for="dpes_UpBdRegSch">Birth-Death's Registration Scheme</label> <input
																						type="text" class="form-control" id="dpes_UpBdRegSch" name="dpes_UpBdRegSch"
																						placeholder="Enter Birth-Death's Scheme">
																				</div>
																			
																				<div class="form-group">
																					<label for="dpes_UpChietExe">Chief Executive Officer</label> <input
																						type="text" class="form-control" id="dpes_UpChietExe" name="dpes_UpChietExe"
																						placeholder="Enter Chief Executive Officer Name">
																				</div>																																							
																				
																				<div class="form-group">
																					<label for="dpes_UpMedicalOfficer">Medical Officer</label> <input
																						type="text" class="form-control" id="dpes_UpMedicalOfficer" name="dpes_UpMedicalOfficer"
																						placeholder="Enter Medical Officer Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="dpes_UpRightToInfoAct">Right To Information Act</label> <input
																						type="text" class="form-control" id="dpes_UpRightToInfoAct" name="dpes_UpRightToInfoAct"
																						placeholder="Enter Right To Information Act">
																				</div>	
																				
																				<div class="form-group">
																						<label for="dpes_UpStatePlanCommission">State Planning Commission</label> <input
																							type="text" class="form-control" id="dpes_UpStatePlanCommission" name="dpes_UpStatePlanCommission"
																							placeholder="Enter State Planning Commission">
																				</div>	
																				<div class="form-group">
																						<label for="dpes_UpeLogin">E-sanchay login</label> <input
																							type="text" class="form-control" id="dpes_UpeLogin" name="dpes_UpeLogin"
																							placeholder="Enter E-sanchay login ">
																				</div>																
																				
																				<div class="form-group">
																					<label for="dpes_UpDistrictStatistics">District/Tehsil/Janpad Statistics</label> <input
																						type="text" class="form-control" id="dpes_UpDistrictStatistics" name="dpes_UpDistrictStatistics"
																						placeholder="Enter District/Tehsil/Janpad Statistics">
																				</div>
																				
																				<div class="form-group">
																					<label for="dpes_Upremarks">Remarks</label> <input
																						type="text" class="form-control" id="dpes_Upremarks" name="dpes_Upremarks"
																						placeholder="Enter Remarks">
																				</div>	
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																					<label for="dpes_UpChietRegOfficer">Chief Registar Officer</label> <input
																						type="text" class="form-control" id="dpes_UpChietRegOfficer" name="dpes_UpChietRegOfficer"
																						placeholder="Enter Chief Registar Officer Name">
																			</div>
																			<div class="form-group">
																					<label for="dpes_UpRegOfficer">Registrar Officer</label> <input
																						type="text" class="form-control" id="dpes_UpRegOfficer" name="dpes_UpRegOfficer"
																						placeholder="Enter Registrar Officer Name">
																			</div>
																			<div class="form-group">
																					<label for="dpes_UpOtherSchema">Other Scheme's</label> <input
																						type="text" class="form-control" id="dpes_UpOtherSchema" name="dpes_UpOtherSchema"
																						placeholder="Enter Other Scheme's">
																			</div>
																				
																			<div class="form-group">
																					<label for="dpes_UpParishad">M.P Jan Abhiyaan Parishad</label> <input
																							type="text" class="form-control" id="dpes_UpParishad" name="dpes_UpParishad"
																							placeholder="Enter M.P Jan Abhiyaan Parishad ">
																			</div>
																				
																			<div class="form-group">
																				<label for="dpes_UpInfoTech">Information Technology</label> <input
																						type="text" class="form-control" id="dpes_UpInfoTech" name="dpes_UpInfoTech"
																						placeholder="Enter Information Technology">
																			</div>
																			<div class="form-group">
																					<label for="dpes_UpServeyorScheme">Assistant Surveyor Scheme</label> <input
																						type="text" class="form-control" id="dpes_UpServeyorScheme" name="dpes_UpServeyorScheme"
																						placeholder="Enter Assistant Surveyor Scheme">
																			</div>	
																			<div class="form-group">
																					<label for="dpes_UpEcourtService">M.P E-court Services</label> <select
																						class="form-control pb-1" id="dpes_UpEcourtService" name="dpes_UpEcourtService">
																						<option>Select M.P E-court Services</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
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
																			<label for="dpes_UpScimages">Upload Images</label> <input
																				type="file" class="form-control" id="dpes_UpScimages">
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
					
					<!-- Update Direction of planning Modal end -->

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