<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Education Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data-toggle="tab" href="#education_primary">Primary school</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					href="#education_secondary">Secondary school</a></li>
					<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					href="#education_collgeUni">Colleges and Universities</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="education_primary">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addprimary_modal"
							class="btn-add btn-indore-table">Add School</button>
					</div>

					<h6 class="table-title-grid">List of Primary Schools</h6>
					<table id="dep_primary_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Primary add Modal start -->
					
					<div class="modal fade" id="dep_addprimary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Primary School</h4>
									<button type="button" id="addPrimary_close" onclick="resetForm('form_addPrimarySchool')" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

<!-- 															</form> -->
<!-- 														</div> -->
														<div class="col-md-12 mx-0">

															<form id="form_addPrimarySchool" name="form_addPrimarySchool" class="msform form-admin">
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
																						type="number" class="form-control" id="primary_latitude" 
																						name="primary_latitude" placeholder="Enter Latitude">
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
																						type="number" class="form-control" id="primary_longitude" 
																						name="primary_longitude" placeholder="Enter Longitude">
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
																						name="primary_schoolName" placeholder="Enter School Name">
																				</div>
																				<div class="form-group">
																					<label for="scType">School Type</label> <select
																						class="form-control pb-1" id="primary_schoolType" name="primary_schoolType">
																						<option>Select School Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">School Management</label> <select
																						class="form-control pb-1" id="primary_schoolManagement" name="primary_schoolManagement">
																						<option>Select School Management</option>
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
																						name="primary_YearOfReorganization" placeholder="Enter Year of Reorganization">
																					
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
																						<option>Select Category</option>
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
																						name="primary_schoolAddress" placeholder="Enter School Address"></textarea>
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
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="primary_maleToilet" name="primary_maleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="primary_playGround" name="primary_playGround">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="primary_library" name="primary_library">
																							<option>Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="primary_femaleHostel" name="primary_femaleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="primary_femaleToilet" name="primary_femaleToilet">
																						<option>Select</option>
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
																				type="file" multiple class="form-control" id="primary_geoTaggedPhoto" name="primary_geoTaggedPhoto">
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
					
					<!--Primary Add Modal end -->

					
					<!--Primary Update Modal start -->
					
					<div class="modal fade" id="dep_updateprimary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Update Primary School</h4>
									<button type="button" class="close" onclick="resetForm('form_updatePrimarySchool')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updatePrimarySchool" name="form_updatePrimarySchool" class="msform form-admin">
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
																						type="number" class="form-control" id="primaryUp_latitude" 
																						name="primaryUp_latitude" placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Ward No</label> <select
																						class="form-control pb-1" id="primaryUp_ward" name="primaryUp_ward">
																					</select>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="primaryUp_longitude" 
																						name="primaryUp_longitude" placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="primaryUp_subLayerId" name="primaryUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="primaryUp_primarySchoolId" name="primaryUp_primarySchoolId">
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
																						type="text" class="form-control" id="primaryUp_schoolName"
																						name="primaryUp_schoolName" placeholder="Enter School Name">
																				</div>
																				<div class="form-group">
																					<label for="scType">School Type</label> <select
																						class="form-control pb-1" id="primaryUp_schoolType" name="primaryUp_schoolType">
																						<option>Select School Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">School Management</label> <select
																						class="form-control pb-1" id="primaryUp_schoolManagement" name="primaryUp_schoolManagement">
																						<option>Select School Management</option>
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
																						id="primaryUp_principalName" name="primaryUp_principalName"
																						placeholder="Enter Principal Name">
																				</div>
																				<div class="form-group">
																					<label for="scYearre">Year Of Reorganization<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="primaryUp_YearOfReorganization"
																						name="primaryUp_YearOfReorganization" placeholder="Enter Year of Reorganization">
																					
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">In Take Students</label> <input
																						type="text" class="form-control" id="primaryUp_inTakeStudents"
																						name="primaryUp_inTakeStudents" placeholder="Enter In Take Students">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Staff Vacancy</label> <input
																						type="text" class="form-control" id="primaryUp_staffVacancy"
																						name="primaryUp_staffVacancy" placeholder="Enter no of staff vacancy">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scConNo">School Contact No</label> <input
																						type="text" class="form-control" id="primaryUp_contactNo" 
																						name="primaryUp_contactNo" placeholder="Enter School Contact No">
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Select Category</label> <select
																						class="form-control pb-1" id="primaryUp_category" name="primaryUp_category">
																						<option>Select Category</option>
																						<option value="Girls">Girls</option>
																						<option value="Boys">Boys</option>
																						<option value="Co-education">Co-education</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scMoi">Medium Of Instruction</label> <input
																						type="text" class="form-control" id="primaryUp_mediumOfInstruction"
																						name="primaryUp_mediumOfInstruction" placeholder="Enter Medium Of Instruction">
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
																						id="primaryUp_passingPercentage" name="primaryUp_passingPercentage"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="primaryUp_teachingStaff" name="primaryUp_teachingStaff"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="primaryUp_nonTeachingStaff" name="primaryUp_nonTeachingStaff"
																						placeholder="Enter No Of Non Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="scName">School Address</label> 
																					<textarea class="form-control" rows="2" id="primaryUp_schoolAddress"
																						name="primaryUp_schoolAddress" placeholder="Enter School Address"></textarea>
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
																						class="form-control pb-1" id="primaryUp_maleHostel" name="primaryUp_maleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="primaryUp_maleToilet" name="primaryUp_maleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="primaryUp_playGround" name="primaryUp_playGround">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="primaryUp_library" name="primaryUp_library">
																							<option>Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="primaryUp_femaleHostel" name="primaryUp_femaleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="primaryUp_femaleToilet" name="primaryUp_femaleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground Area</label> 
																					<input type="text" class="form-control" placeholder="Enter Play Ground Area"
																						id="primaryUp_playGroundAera" name="primaryUp_playGroundAera"/>
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
																						class="form-control" id="primaryUp_builtUpArea"
																						name="primaryUp_builtUpArea" placeholder="Enter Built Up Area">
																				</div>
																				<div class="form-group">
																					<label for="conFloor">No Of Floors</label> <input
																						type="text" class="form-control" id="primaryUp_noOfFloors"
																						name="primaryUp_noOfFloors" placeholder="Enter Floors">
																				</div>
																				<div class="form-group">
																					<label for="conSmartcr">No Of Smart Class
																						Room</label> <input type="text" class="form-control"
																						id="primaryUp_noOfSmartClassrooms" name="primaryUp_noOfSmartClassrooms"
																						placeholder="Enter Smart Class Room">
																				</div>
																				<div class="form-group">
																					<label for="conClassr">No Of Class Room</label> <input
																						type="text" class="form-control" id="primaryUp_noOfClassrooms"
																						name="primaryUp_noOfClassrooms" placeholder="Enter Class Room">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conType">Type Of Construction</label> <input
																						type="text" class="form-control" id="primaryUp_typeOfConstruction"
																						name="primaryUp_typeOfConstruction" placeholder="Enter Type Of Construction">
																				</div>
																				<div class="form-group">
																					<label for="conBcondition">Building
																						Condition</label> <input type="text" class="form-control"
																						id="primaryUp_buildingCondition" name="primaryUp_buildingCondition"
																						placeholder="Enter Building Condition">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">No Of Student</label> <input
																						type="text" class="form-control" id="primaryUp_noOfStudents"
																						name="primaryUp_noOfStudents" placeholder="Enter No of Students">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">Condition of Road Connectivity</label> <input
																						type="text" class="form-control" id="primaryUp_roadConnectivity"
																						name="primaryUp_roadConnectivity" placeholder="Enter Condition of Road Connectivity">
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
																					<textarea class="form-control" rows="2" id="primaryUp_rteComplaint"
																						name="primaryUp_rteComplaint" placeholder="RTE Complaint"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scSdmc">RTE SDMC</label>
																					<textarea class="form-control" rows="2" id="primaryUp_rteSdmc"
																						name="primaryUp_rteSdmc" placeholder="RTE SDMC"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scFindings">Funding Scheme</label>
																					<textarea class="form-control" rows="2" name="primaryUp_fundingScheme"
																						id="primaryUp_fundingScheme" placeholder="Funding Scheme"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRteact">RTE Act</label>
																					<textarea class="form-control" rows="2" name="primaryUp_rteAct"
																						id="primaryUp_rteAct" placeholder="RTE Act"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scGer">GER</label>
																					<textarea class="form-control" rows="2" id="primaryUp_ger" 
																					name="primaryUp_ger" placeholder="GER"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="conStudent">Category wise Students</label> <input
																						type="text" class="form-control" id="primaryUp_categoryWiseStudents"
																						name="primaryUp_categoryWiseStudents" placeholder="Enter Category wise Students">
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
																				type="file" multiple class="form-control" id="primaryUp_geoTaggedPhoto" name="primaryUp_geoTaggedPhoto">
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
					
					<!--Primary Update Modal end -->
					


				</div>
				
				
				<div class="tab-pane container-fluid fade" id="education_secondary">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addsecondary_modal"
						class="btn-add btn-indore-table">Add School</button>
					</div>

					<h6 class="table-title-grid">List of Secondary School</h6>
					<table id="dep_secondary_table" class="display tbl_dep" class="tbl-report"></table>
					
<!-- 					SECONDARY ADD MODAL START -->
					
						<div class="modal fade" id="dep_addsecondary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Secondary School</h4>
									<button type="button" onclick="resetForm('form_addSecondarySchool')" class="close" data-dismiss="modal">&times;</button>

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
																						type="number" class="form-control" id="secondary_latitude" 
																						name="secondary_latitude" placeholder="Enter Latitude">
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
																						type="number" class="form-control" id="secondary_longitude" 
																						name="secondary_longitude" placeholder="Enter Longitude">
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
																						name="secondary_schoolName" placeholder="Enter School Name">
																				</div>
																				<div class="form-group">
																					<label for="scType">School Type</label> <select
																						class="form-control pb-1" id="secondary_schoolType" name="secondary_schoolType">
																						<option>Select School Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">School Management</label> <select
																						class="form-control pb-1" id="secondary_schoolManagement" name="secondary_schoolManagement">
																						<option>Select School Management</option>
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
																						name="secondary_YearOfReorganization" placeholder="Enter Year of Reorganization">
																					
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
																						<option>Select Affiliated Schools</option>
																						<option value="Private">Private</option>
																						<option value="State Government">State Government</option>
																						<option value="CBSE">CBSE</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scName">School Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control" rows="2" id="secondary_schoolAddress"
																						name="secondary_schoolAddress" placeholder="Enter School Address"></textarea>
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
																						<option>Select Category</option>
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
																						<option>List of Courses</option>
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
																						<option>Select Eligibility Criteria</option>
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
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="secondary_maleToilet" name="secondary_maleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="secondary_playGround" name="secondary_playGround">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="secondary_library" name="secondary_library">
																							<option>Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="secondary_femaleHostel" name="secondary_femaleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="secondary_femaleToilet" name="secondary_femaleToilet">
																						<option>Select</option>
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
																					<label for="conBua">Built Up Area</label> <input type="text"
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
																				type="file" multiple class="form-control" id="secondary_geoTaggedPhoto" name="secondary_geoTaggedPhoto">
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
					
<!-- 					SECONDARY ADD MODAL END -->
					
				
<!-- 					Secondary update MODAL START -->
				
						<div class="modal fade" id="dep_updatesecondary_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Update Secondary School</h4>
									<button type="button" class="close" onclick="resetForm('form_updateSecondarySchool')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateSecondarySchool" name="form_updateSecondarySchool" class="msform form-admin">
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
																						type="number" class="form-control" id="secondaryUp_latitude" 
																						name="secondaryUp_latitude" placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Ward No</label> <select
																						class="form-control pb-1" id="secondaryUp_ward" name="secondaryUp_ward">
																						
																					</select>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="secondaryUp_longitude" 
																						name="secondaryUp_longitude" placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="secondaryUp_subLayerId" name="hospitalUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="secondaryUp_secondarySchoolId" name="secondaryUp_secondarySchoolId">
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
																						type="text" class="form-control" id="secondaryUp_schoolName"
																						name="secondaryUp_schoolName" placeholder="Enter School Name">
																				</div>
																				<div class="form-group">
																					<label for="scType">School Type</label> <select
																						class="form-control pb-1" id="secondaryUp_schoolType" name="secondaryUp_schoolType">
																						<option>Select School Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">School Management</label> <select
																						class="form-control pb-1" id="secondaryUp_schoolManagement" name="secondaryUp_schoolManagement">
																						<option>Select School Management</option>
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
																						id="secondaryUp_principalName" name="secondaryUp_principalName"
																						placeholder="Enter Principal Name">
																				</div>
																				<div class="form-group">
																					<label for="scYearre">Year Of Reorganization<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="secondaryUp_YearOfReorganization"
																						name="secondaryUp_YearOfReorganization" placeholder="Enter Year of Reorganization">
																					
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">In Take Students</label> <input
																						type="text" class="form-control" id="secondaryUp_inTakeStudents"
																						name="secondaryUp_inTakeStudents" placeholder="Enter In Take Students">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">No Of Student</label> <input
																						type="text" class="form-control" id="secondaryUp_noOfStudents"
																						name="secondaryUp_noOfStudents" placeholder="Enter No of Students">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Staff Vacancy</label> <input
																						type="text" class="form-control" id="secondaryUp_staffVacancy"
																						name="secondaryUp_staffVacancy" placeholder="Enter no of staff vacancy">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Affiliated Schools</label> <select class="form-control pb-1" 
																						id="secondaryUp_affiliatedSchools" name="secondaryUp_affiliatedSchools">
																						<option>Select Affiliated Schools</option>
																						<option value="Private">Private</option>
																						<option value="State Government">State Government</option>
																						<option value="CBSE">CBSE</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scName">School Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control" rows="2" id="secondaryUp_schoolAddress"
																						name="secondaryUp_schoolAddress" placeholder="Enter School Address"></textarea>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scConNo">School Contact No</label> <input
																						type="text" class="form-control" id="secondaryUp_contactNo"
																						name="secondaryUp_contactNo" placeholder="Enter School Contact No">
																				</div>
																			
																				<div class="form-group">
																					<label for="scCategory">Select Category</label> <select
																						class="form-control pb-1" id="secondaryUp_category" name="secondaryUp_category">
																						<option>Select Category</option>
																						<option value="Girls">Girls</option>
																						<option value="Boys">Boys</option>
																						<option value="Co-education">Co-education</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scMoi">Medium Of Instruction</label> <input
																						type="text" class="form-control" id="secondaryUp_mediumOfInstruction"
																						name="secondaryUp_mediumOfInstruction" placeholder="Enter Medium Of Instruction">
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
																						id="secondaryUp_passingPercentage" name="secondaryUp_passingPercentage"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="secondaryUp_teachingStaff" name="secondaryUp_teachingStaff"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="secondaryUp_nonTeachingStaff" name="secondaryUp_nonTeachingStaff"
																						placeholder="Enter No Of Non Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">List of Courses</label> 
																					<select class="form-control pb-1" 
																						id="secondaryUp_listOfCourses" name="secondaryUp_listOfCourses">
																						<option>List of Courses</option>
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
																						id="secondaryUp_eligibilityCriteria" name="secondaryUp_eligibilityCriteria">
																						<option>Select Eligibility Criteria</option>
																						<option value="50%">50%</option>
																						<option value="60%">60%</option>
																						<option value="80%">80%</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="conStudent">Category wise Students</label> <input
																						type="text" class="form-control" id="secondaryUp_categoryWiseStudents"
																						name="secondaryUp_categoryWiseStudents" placeholder="Enter Category wise Students">
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
																						class="form-control pb-1" id="secondaryUp_maleHostel" name="secondaryUp_maleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="secondaryUp_maleToilet" name="secondaryUp_maleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="secondaryUp_playGround" name="secondaryUp_playGround">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="secondaryUp_library" name="secondaryUp_library">
																							<option>Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="secondaryUp_femaleHostel" name="secondaryUp_femaleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="secondaryUp_femaleToilet" name="secondaryUp_femaleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground Area</label> 
																					<input type="text" class="form-control" placeholder="Enter Play Ground Area"
																						id="secondaryUp_playGroundAera" name="secondaryUp_playGroundAera"/>
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
																						class="form-control" id="secondaryUp_builtUpArea"
																						name="secondaryUp_builtUpArea" placeholder="Enter Built Up Area">
																				</div>
																				<div class="form-group">
																					<label for="conFloor">No Of Floors</label> <input
																						type="text" class="form-control" id="secondaryUp_noOfFloors"
																						name="secondaryUp_noOfFloors" placeholder="Enter Floors">
																				</div>
																				<div class="form-group">
																					<label for="conSmartcr">No Of Smart Class
																						Room</label> <input type="text" class="form-control"
																						id="secondaryUp_noOfSmartClassrooms" name="secondaryUp_noOfSmartClassrooms"
																						placeholder="Enter Smart Class Room">
																				</div>
																				<div class="form-group">
																					<label for="conClassr">No Of Class Room</label> <input
																						type="text" class="form-control" id="secondaryUp_noOfClassrooms"
																						name="secondaryUp_noOfClassrooms" placeholder="Enter Class Room">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conType">Type Of Construction</label> <input
																						type="text" class="form-control" id="secondaryUp_typeOfConstruction"
																						name="secondaryUp_typeOfConstruction" placeholder="Enter Type Of Construction">
																				</div>
																				<div class="form-group">
																					<label for="conBcondition">Building
																						Condition</label> <input type="text" class="form-control"
																						id="secondaryUp_buildingCondition" name="secondaryUp_buildingCondition"
																						placeholder="Enter Building Condition">
																				</div>
																				
																				<div class="form-group">
																					<label for="conStudent">Condition of Road Connectivity</label> <input
																						type="text" class="form-control" id="secondaryUp_roadConnectivity"
																						name="secondaryUp_roadConnectivity" placeholder="Enter Condition of Road Connectivity">
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
																					<textarea class="form-control" rows="2" id="secondaryUp_rteComplaint"
																						name="secondaryUp_rteComplaint" placeholder="RTE Complaint"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scSdmc">RTE SDMC</label>
																					<textarea class="form-control" rows="2" id="secondaryUp_rteSdmc"
																						name="secondaryUp_rteSdmc" placeholder="RTE SDMC"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scFindings">Funding Scheme</label>
																					<textarea class="form-control" rows="2" name="secondaryUp_fundingScheme"
																						id="secondaryUp_fundingScheme" placeholder="Funding Scheme"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRteact">RTE Act</label>
																					<textarea class="form-control" rows="2" name="secondaryUp_rteAct"
																						id="secondaryUp_rteAct" placeholder="RTE Act"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scGer">GER</label>
																					<textarea class="form-control" rows="2" id="secondaryUp_ger" 
																					name="secondaryUp_ger" placeholder="GER"></textarea>
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
																				type="file" multiple class="form-control" id="secondaryUp_geoTaggedPhoto" name="secondaryUp_geoTaggedPhoto">
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
					
<!-- 					Secondary update MODAL END -->
					
				</div>
				
				
				<div class="tab-pane container-fluid fade" id="education_collgeUni">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_adduni_modal"
							class="btn-add btn-indore-table">Add University</button>
					</div>

					<h6 class="table-title-grid">List of Universities</h6>
					<table id="dep_university_table" class="display tbl_dep" class="tbl-report"></table>
				
				
<!-- 					UNIVERSITY ADDD MODAL START -->
					
						<div class="modal fade" id="dep_adduni_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add University</h4>
									<button type="button" class="close" onclick="resetForm('form_addUniversity')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addUniversity" name="form_addUniversity" class="msform form-admin">
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
																						type="number" class="form-control" id="university_latitude" 
																						name="university_latitude" placeholder="Enter Latitude">
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
																						type="number" class="form-control" id="university_longitude" 
																						name="university_longitude" placeholder="Enter Longitude">
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
																						name="university_name" placeholder="Enter University Name">
																				</div>
																				<div class="form-group">
																					<label for="scType">University Type</label> <select
																						class="form-control pb-1" id="university_type" name="university_type">
																						<option>Select University Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">University Management</label> <select
																						class="form-control pb-1" id="university_management" name="university_management">
																						<option>Select University Management</option>
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
																						name="university_YearOfReorganization" placeholder="Enter Year of Reorganization">
																					
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
																						name="university_address" placeholder="Enter Address"></textarea>
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
																						<option>Select Category</option>
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
																						<option>List of Courses</option>
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
																						<option>Select Eligibility Criteria</option>
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
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="university_maleToilet" name="university_maleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="university_playGround" name="university_playGround">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="university_library" name="university_library">
																							<option>Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="university_femaleHostel" name="university_femaleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="university_femaleToilet" name="university_femaleToilet">
																						<option>Select</option>
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
																					<label for="conBua">Built Up Area</label> <input type="text"
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
																				type="file" multiple class="form-control" id="university_geoTaggedPhoto" name="university_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<input type="submit" id="uni_add_submit"
																		name="uni_add_submit" class="btn btn-indore mt-3"
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
				
<!-- 				UNIVERSITY UPDATE MODAL START -->
				
					<div class="modal fade" id="dep_updateuni_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Update University</h4>
									<button type="button" class="close" onclick="resetForm('form_updateUniversity')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">


														<div class="col-md-12 mx-0">

															<form id="form_updateUniversity" name="form_updateUniversity" class="msform form-admin">
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
																						type="number" class="form-control" id="universityUp_latitude" 
																						name="universityUp_latitude" placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Ward No</label> <select
																						class="form-control pb-1" id="universityUp_ward" name="universityUp_ward">
																						
																					</select>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="universityUp_longitude" 
																						name="universityUp_longitude" placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="universityUp_subLayerId" name="universityUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="universityUp_universityId" name="universityUp_universityId">
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
																						type="text" class="form-control" id="universityUp_name"
																						name="universityUp_name" placeholder="Enter University Name">
																				</div>
																				<div class="form-group">
																					<label for="scType">University Type</label> <select
																						class="form-control pb-1" id="universityUp_type" name="universityUp_type">
																						<option>Select University Type</option>
																						<option value="Primary School">Primary School</option>
																						<option value="Secondary School">Secondary School</option>
																						<option value="University">University</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">University Management</label> <select
																						class="form-control pb-1" id="universityUp_management" name="universityUp_management">
																						<option>Select University Management</option>
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
																						id="universityUp_principalName" name="universityUp_principalName"
																						placeholder="Enter Principal Name">
																				</div>
																				<div class="form-group">
																					<label for="scYearre">Year Of Reorganization<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="universityUp_YearOfReorganization"
																						name="universityUp_YearOfReorganization" placeholder="Enter Year of Reorganization">
																					
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">In Take Students</label> <input
																						type="text" class="form-control" id="universityUp_inTakeStudents"
																						name="universityUp_inTakeStudents" placeholder="Enter In Take Students">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">No Of Student</label> <input
																						type="text" class="form-control" id="universityUp_noOfStudents"
																						name="universityUp_noOfStudents" placeholder="Enter No of Students">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Staff Vacancy</label> <input
																						type="text" class="form-control" id="universityUp_staffVacancy"
																						name="universityUp_staffVacancy" placeholder="Enter no of staff vacancy">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Affiliated Colleges</label> <select class="form-control pb-1" 
																						id="universityUp_affiliatedColleges" name="universityUp_affiliatedColleges">
																						<option value="">Select Affiliated Colleges</option>
																						<option value="Government">Government</option>
																						<option value="Private">Private</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scName">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control" rows="2" id="universityUp_address"
																						name="universityUp_address" placeholder="Enter Address"></textarea>
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
 																				<div class="form-group"> 
 																					<label for="scConNo">Contact No</label> <input 
 																						type="text" class="form-control" id="universityUp_contactNo"
 																						name="universityUp_contactNo" placeholder="Enter Contact No">
 																				</div> 
																				<div class="form-group">
																					<label for="scCategory">Select Category</label> <select
																						class="form-control pb-1" id="universityUp_category" name="universityUp_category">
																						<option>Select Category</option>
																						<option value="Girls">Girls</option>
																						<option value="Boys">Boys</option>
																						<option value="Co-education">Co-education</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scMoi">Medium Of Instruction</label> <input
																						type="text" class="form-control" id="universityUp_mediumOfInstruction"
																						name="universityUp_mediumOfInstruction" placeholder="Enter Medium Of Instruction">
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
																						id="universityUp_passingPercentage" name="universityUp_passingPercentage"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="universityUp_teachingStaff" name="universityUp_teachingStaff"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="universityUp_nonTeachingStaff" name="universityUp_nonTeachingStaff"
																						placeholder="Enter No Of Non Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">List of Courses</label> 
																					<select class="form-control pb-1" 
																						id="universityUp_listOfCourses" name="universityUp_listOfCourses">
																						<option>List of Courses</option>
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
																						id="universityUp_eligibilityCriteria" name="universityUp_eligibilityCriteria">
																						<option>Select Eligibility Criteria</option>
																						<option value="50%">50%</option>
																						<option value="60%">60%</option>
																						<option value="80%">80%</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="conStudent">Category wise Students</label> <input
																						type="text" class="form-control" id="universityUp_categoryWiseStudents"
																						name="universityUp_categoryWiseStudents" placeholder="Enter Category wise Students">
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
																						class="form-control pb-1" id="universityUp_maleHostel" name="universityUp_maleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Male Toilet</label> <select
																						class="form-control pb-1" id="universityUp_maleToilet" name="universityUp_maleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground</label> <select
																						class="form-control pb-1" id="universityUp_playGround" name="universityUp_playGround">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Library</label> <select
																							class="form-control pb-1" id="universityUp_library" name="universityUp_library">
																							<option>Select</option>
																							<option value="Yes">Yes</option>
																							<option value="No">No</option>
																						</select>
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																			
																				<div class="form-group">
																					<label for="scCategory">Female Hostel</label> <select
																						class="form-control pb-1" id="universityUp_femaleHostel" name="universityUp_femaleHostel">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Female Toilet</label> <select
																						class="form-control pb-1" id="universityUp_femaleToilet" name="universityUp_femaleToilet">
																						<option>Select</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Play Ground Area</label> 
																					<input type="text" class="form-control" placeholder="Enter Play Ground Area"
																						id="universityUp_playGroundAera" name="universityUp_playGroundAera"/>
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
																						class="form-control" id="universityUp_builtUpArea"
																						name="universityUp_builtUpArea" placeholder="Enter Built Up Area">
																				</div>
																				<div class="form-group">
																					<label for="conFloor">No Of Floors</label> <input
																						type="text" class="form-control" id="universityUp_noOfFloors"
																						name="universityUp_noOfFloors" placeholder="Enter Floors">
																				</div>
																				<div class="form-group">
																					<label for="conSmartcr">No Of Smart Class
																						Room</label> <input type="text" class="form-control"
																						id="universityUp_noOfSmartClassrooms" name="universityUp_noOfSmartClassrooms"
																						placeholder="Enter Smart Class Room">
																				</div>
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="conClassr">No Of Class Room</label> <input -->
<!-- 																						type="text" class="form-control" id="universityUp_noOfClassrooms" -->
<!-- 																						name="universityUp_noOfClassrooms" placeholder="Enter Class Room"> -->
<!-- 																				</div> -->
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conType">Type Of Construction</label> <input
																						type="text" class="form-control" id="universityUp_typeOfConstruction"
																						name="universityUp_typeOfConstruction" placeholder="Enter Type Of Construction">
																				</div>
																				<div class="form-group">
																					<label for="conBcondition">Building
																						Condition</label> <input type="text" class="form-control"
																						id="universityUp_buildingCondition" name="universityUp_buildingCondition"
																						placeholder="Enter Building Condition">
																				</div>
																				
																				<div class="form-group">
																					<label for="conStudent">Condition of Road Connectivity</label> <input
																						type="text" class="form-control" id="universityUp_roadConnectivity"
																						name="universityUp_roadConnectivity" placeholder="Enter Condition of Road Connectivity">
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
																					<textarea class="form-control" rows="2" id="universityUp_rteComplaint"
																						name="universityUp_rteComplaint" placeholder="RTE Complaint"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scSdmc">RTE SDMC</label>
																					<textarea class="form-control" rows="2" id="universityUp_rteSdmc"
																						name="universityUp_rteSdmc" placeholder="RTE SDMC"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scFindings">Funding Scheme</label>
																					<textarea class="form-control" rows="2" name="universityUp_fundingScheme"
																						id="universityUp_fundingScheme" placeholder="Funding Scheme"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRteact">RTE Act</label>
																					<textarea class="form-control" rows="2" name="universityUp_rteAct"
																						id="universityUp_rteAct" placeholder="RTE Act"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scGer">GER</label>
																					<textarea class="form-control" rows="2" id="universityUp_ger" 
																					name="universityUp_ger" placeholder="GER"></textarea>
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
																				type="file" multiple class="form-control" id="universityUp_geoTaggedPhoto" name="universityUp_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<input type="submit" id="uni_update_submit"
																		name="uni_update_submit" class="btn btn-indore mt-3"
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
				
<!-- 				UNIVERSITY UPDATE MODAL END -->
				
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

<script type="text/javascript" src="${context}/js/designer/education_dep.js"></script>

</body>
</html>