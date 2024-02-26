<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>


<link rel="stylesheet" href="${context}/css/esri/main.css">
<link rel="stylesheet" type="text/css" href="${context}/css/daterangepicker.css" />
<link rel="stylesheet" href="${context}/css/esri/claro.css">
<link rel="stylesheet" href="${context}/css/esri/nihilo.css">
<link rel="stylesheet" href="${context}/css/esri/api-3-30.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<title>Project Monitoring</title>

<!-- Page Content -->
<div class="page-content-wrapper">
	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item">
					<a class="nav-link tab-data active" data-toggle="tab" href="#prjList" data-translate = "pm_projects_projects">Projects</a>
				</li>
				<li class="nav-item">
					<a class="nav-link tab-data" data-toggle="tab" href="#milestone" data-translate = "pm_projects_milestones">Milestones</a>
				</li>
			</ul>

			<!-- Tab pane -->
			<div class="tab-content">
				
				<!-- Projects tab start-->
				
				<div class="tab-pane container-fluid active" id="prjList">

					<div class="text-right">
						<button data-toggle="modal" id="add_project_btn" data-target="#dep_infoadd_project" 
							class="btn-add btn-indore-table cs_add" data-translate = "pm_projects_add_project">Add Project</button>
					</div>
					
					<table id="dep_project" class="display tbl_dep" class="tbl-report"></table>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>
					<!--Department Master Modal start -->
					<div class="modal fade" id="dep_infoadd_project" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data-translate = "pm_projects_add_project">Add Project</h4>
									<button type="button" class="close" onclick="resetForm('form_addProject')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-sm-12 col-lg-4 text-left ml-3">
															<form class="form-admin">
																<div class="form-group">
																	
																	<label for="selectType" class="ml-2" data-translate = "_s_category">Select Department</label><span class="mandatory">*</span> 
																	<select class="form-control pb-1" id="prj_department_id" name="prj_department_id" required>
																	</select>
																</div>
																
															</form>
														</div>
														<div class="col-sm-12 col-lg-6 my-3">
															<div class="form-group">
																<label for="selectType" class="ml-2" data-translate = "pm_projects_type">Project Type</label><span class="mandatory">*</span> 
																<input type="radio" name="prj_type" id="prj_type_new" value="NEW"> New Project &nbsp;
																<input type="radio" name="prj_type" id="prj_type_ext" value="EXISTING"> Existing Project
															</div>
														</div>
														<div class="col-md-12 mx-0">

															
															<form id="form_addProject" name="form_addProject" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong data-translate = "pm_projects_location">Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong data-translate = "pm_projects_binfo">Basic Info</strong></li>
																	<li id="financetab" class="tabwithborder"><strong data-translate = "pm_projects_finance">Finance</strong></li>
																	<li id="assignusertab" class="tabwithborder"><strong data-translate = "pm_projects_assign_users">Assign Users</strong></li>
																	<li id="imagestab" class="tabwithborder"><strong data-translate = "pm_projects_imagedocs">Images & Docs</strong></li>
																	
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data-translate = "pm_projects_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="location_name" data-translate = "pm_projects_location_lname">Project Location</label> <input
																						type="text" class="form-control"
																						id="prj_location_name" name="prj_location_name" placeholder="Enter Project Location" data-translate = "pm_projects_location_elocation">
																				</div>
																				<div class="form-group">
																					
																					<label for="loLatitude" data-translate = "pm_projects_location_lat">Latitude</label><span class="mandatory">*</span> <input
																						type="text" class="form-control" id="prj_latitude" name="prj_latitude"
																						placeholder="Enter Latitude" data-translate = "pm_projectslocation_elat" required>
																					<div class="late-fromto">
																						<img data-toggle="modal" data-target="#monitoringMapModal" src="images/icons/Latitude2-15.svg" id="project_selected_latitude" title="Choose From Map">
																					</div>
																				</div>
																				
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loTehsil" data-translate = "pm_projects_location_tehsil">Tehsil</label> <select -->
<!-- 																						class="form-control pb-1" id="prj_tehsil_id" name="prj_tehsil_id"> -->
																						
<!-- 																					</select> -->
<!-- 																				</div> -->
																				<div class="form-group">
																					<label for="lowardName" data-translate = "pm_projectslocation_ward">Ward No</label> 
																					<input type="text" class="form-control" id="prj_ward_no" name="prj_ward_no" disabled="disabled" data-translate="pm_projectslocation_ward">
																				</div>
																				
																				<div class="form-group">
																					<label for="loZoneName" data-translate = "pm_projects_location_zone">Zone No</label> 
																					<input type="text" class="form-control" id="prj_zone_no" name="prj_zone_no" disabled="disabled" data-translate="pm_projects_location_zone">
																					
																				</div>
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					
																					<label for="loLongitude" data-translate = "pm_projects_location_long">Longitude</label><span class="mandatory">*</span>
																					 <input type="text" class="form-control" id="prj_longitude" name="prj_longitude" placeholder="Enter Longitude" data-translate = "pm_projects_location_elong" required>
																					 <div class="late-fromto">
																						<img data-toggle="modal" data-target="#monitoringMapModal" src="images/icons/Latitude2-15.svg" id="project_selected_longitude" title="Choose From Map">
																					</div>
																				</div>
																				<div class="form-group">
																					<label for="loTehsil" data-translate = "pm_projects_location_district">District</label> 
																					<input type="text" class="form-control" id="prj_district" name="prj_district" value="Indore" disabled="disabled">
																					
																				</div>
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loVillage" data-translate = "pm_projects_location_village">Village</label> <select -->
<!-- 																						class="form-control pb-1" id="prj_village_id" name="prj_village_id"> -->
																						
<!-- 																					</select> -->
<!-- 																				</div> -->

																				<div class="form-group">
																					<label for="lowardName" data-translate = "pm_projects_location_ward_name">Ward Name</label> <input
																						type="text" class="form-control pb-1" id="prj_ward_name" name="prj_ward_name" 
																						placeholder="Ward Name" disabled="disabled">
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName" data-translate = "pm_projects_location_zone_name">Zone Name</label> <input
																						type="text" class="form-control pb-1" id="prj_zone_name" name="prj_zone_name" 
																						placeholder="Zone Name" disabled="disabled">
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
																		<h2 class="fs-title" data-translate = "pm_projects_binfo">Basic Info</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					
																					<label for="prjName" data-translate = "pm_projects_binfo_pname">Project Name</label><span class="mandatory">*</span> <input
																						type="text" class="form-control" id="prj_project_name" 
																						
																						name="prj_project_name" placeholder="Enter Project Name" data-translate = "pm_projects_binfo_epname" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_binfo_cnumber">Mobile Number</label> <input
																						type="number" min="0" class="form-control" id="prj_contractor_number" 
																						name="prj_contractor_number" placeholder="Enter Mobile Number"  data-translate = "pm_projects_binfo_ecnumber">
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_binfo_cemail">Contractor Email Id</label> <input
																						type="text" class="form-control" id="prj_contractor_email" 
																						name="prj_contractor_email" placeholder="Enter Contractor Email Id" data-translate = "pm_projects_binfo_ecemail">
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_binfo_wperiod">Work Order Period</label> <input
																						type="text" class="form-control" id="prj_work_order_period" 
																						name="prj_work_order_period" placeholder="Enter Work Order Period" data-translate = "pm_projects_binfo_ewperiod">
																				</div>
																				<div class="form-group">
																					
																					<label for="prjName" data-translate = "pm_projects_binfo_sdate">Project Start Date</label><span class="mandatory">*</span> <input
																						type="text" class="form-control datepicker" id="prj_start_date" 
																						name="prj_start_date" placeholder="Select Date"  data-translate = "pm_projects_binfo_ssdate" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_expected_start_date">Project Expected Start Date</label><span class="mandatory">*</span> <input
																						type="text" class="form-control datepicker" id="prj_expected_start_date" 
																						name="prj_expected_start_date" placeholder="Select Date" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_binfo_consultantname">Design Consultant Name</label> <input
																						type="text" class="form-control" id="prj_design_consultant_name" 
																						name="prj_design_consultant_name" placeholder="Enter Design Consultant Name"  data-translate = "pm_projects_binfo_econsultantname">
																				</div>
																				<div class="form-group">
																					<label for="principalName" data-translate = "pm_projects_binfo_pprogress">Physical Progress (%)</label> <input
																						type="text" class="form-control"
																						id="prj_physical_progress" name="prj_physical_progress"
																						placeholder="Enter Physical Progress" data-translate = "pm_projects_binfo_epprogress">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent" data-translate = "pm_projects_binfo_remarks">Remarks</label> 
																					<textarea class="form-control" rows="2" id="prj_remarks"
																						name="prj_remarks" placeholder="Enter Remarks"  data-translate = "pm_projects_binfo_eremarks"></textarea>
																				</div>
																				

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scConNo" data-translate = "pm_projects_binfo_cname">Contractor Name</label> <input
																						type="text" class="form-control" id="prj_contractor_name"
																						name="prj_contractor_name" placeholder="Enter Contractor Name" data-translate = "pm_projects_binfo_ecname">
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_binfo_cagency">Contractor Agency</label> <input
																						type="text" class="form-control" id="prj_contractor_agency" 
																						name="prj_contractor_agency" placeholder="Enter Contractor Agency" data-translate = "pm_projects_binfo_ecagency">
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_binfo_workorderno">Work Order No</label> <input
																						type="text" class="form-control" id="prj_work_order_no" 
																						name="prj_work_order_no" placeholder="Enter Work Order No." data-translate = "pm_projects_binfo_eworkorderno">
																				</div>
																				<div class="form-group">
																					
																					<label for="prjName" data-translate = "pm_projects_binfo_edate">Project Completion Date</label><span class="mandatory">*</span> <input
																						type="text" class="form-control datepicker" id="prj_end_date" 
																						name="prj_end_date" placeholder="Select Date" data-translate= "pm_projects_binfo_eedate" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_expected_completion_date">Project Expected Completion Date</label><span class="mandatory">*</span> <input
																						type="text" class="form-control datepicker" id="prj_expected_completion_date" 
																						name="prj_expected_completion_date" placeholder="Select Date" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_binfo_consultannumber">Design Consultant Contact Number</label> <input
																						type="number" min="0" class="form-control" id="prj_design_consultant_number" 
																						name="prj_design_consultant_number" placeholder="Enter Design Consultant Contact No." data-translate = "pm_projects_binfo_ecunsultantnumber">
																				</div>
																				<div class="form-group">
																					<label for="scConNo" data-translate = "pm_projects_binfo_cperiod">Contract Period</label> <input
																						type="text" class="form-control" id="prj_contract_period"
																						name="prj_contract_period" placeholder="Enter Contract Period" data-translate = "pm_projects_binfo_ecperiod">
																				</div>
																				<div class="form-group">
																					<label for="prj_project_status" data-translate = "pm_projects_binfo_pstatus">Project Status</label> <select
																						class="form-control pb-1" id="prj_project_status" name="prj_project_status">
																						
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
																		<h2 class="fs-title" data-translate="pm_projects_finance">Finance</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="prjName"  data-translate="pm_projects_finance_pfc">Project Total Cost</label> <input
																						type="text" class="form-control" id="prj_total_cost" 
																						name="prj_total_cost" placeholder="Enter Project Total Cost" data-translate="pm_projects_finance_epfc">
																				</div>
																				<div class="form-group">
																					<label for="prjName"  data-translate="pm_projects_finance_pbd">Performance Bank Date</label> <input
																						
																						type="text" class="form-control datepicker" id="prj_performance_bank_date" 
																						name="prj_performance_bank_date" placeholder="Select Performance Bank Date" data-translate="pm_projects_finance_spbd">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="prjName"  data-translate="pm_projects_finance_pbg">Performance Bank Guarantee</label> <input
																						type="text" class="form-control" id="prj_performance_bank_guarantee" 
																						name="prj_performance_bank_guarantee" placeholder="Enter Performance Bank Guarantee" data-translate="pm_projects_finance_epbg">
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate="pm_projects_finance_fp">Financial Progress (%)</label> <input
																						type="text" class="form-control" id="prj_financial_progress" 
																						name="prj_financial_progress" placeholder="Enter Financial Progress" data-translate="pm_projects_finance_efp">
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
																		<h2 class="fs-title" data-translate = "pm_projects_assign_users">Assign Users</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="upScimages" data-translate = "pm_projects_allotted_to">Project Allotted To</label>
																					<select class="form-control pb-1" id="projectUserList"></select>
																					
																					<div class="form-group">
																						<label data-translate = "pm_projects_allotted_to_contactNo">Contact Number</label>
																						<input type="text" class="form-control" id="prj_user_contact_no" name="prj_user_contact_no"
																							placeholder="Contact Number" data-translate = "pm_projects_allotted_to_contactNo"  disabled="disabled"/>
																					</div>
																					
<!-- 																					<div id="flip1" class="form-control pb-1">Select User</div> -->
<!-- 																						<div id="panel1" class="user_panel" style="display:none;"> -->
<!-- 																							<ul id="projectUserList"> -->
<!-- 																							</ul> -->
<!-- 																						</div> -->
																				</div>
																				
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label data-translate = "pm_projects_allotted_to_name">Name</label>
																					<input type="text" class="form-control"  id="prj_user_name" name="prj_user_name"
																						placeholder="Name" data-translate = "pm_projects_allotted_to_name" disabled="disabled"/>
																				</div>
																				
																				<div class="form-group">
																					<label data-translate = "pm_projects_allotted_to_email">Email Id</label>
																					<input type="text" class="form-control" id="prj_user_email" name="prj_user_email"
																						placeholder="Email Id" data-translate = "pm_projects_allotted_to_email" disabled="disabled"/>
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
																		<h2 class="fs-title" data-translate = "pm_projects_img_imgs">Images</h2>
																		<div class="form-group">
																			<label for="upScimages" data-translate = "pm_projects_img_uimage">Upload Images</label>
																			 <input type="file" class="form-control" id="prj_images" name="prj_images" multiple>
																		</div>
																		<ul class="imageslist" id="prj_up_images"></ul>
																	</div>
																	<div class="form-card">
																		<h2 class="fs-title" data-translate = "pm_projects_img_docs">Documents</h2>
																		<div class="form-group">
																			<label for="upScimages" data-translate = "pm_projects_img_udocs">Upload Documents</label> <input
																				
																				type="file" class="form-control" id="prj_documents" name="prj_documents" multiple>
																		</div>
																		<ul class="imageslist" id="prj_up_docs"></ul>
																	</div>
																	<button type="button" name="previous" 
																		 class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>
																	<button type="submit" id="submit_add_project"
																		name="finalinfosubmit" class="btn btn-indore mt-3" data-translate = "_submit"
																		>Submit</button>
																</fieldset>
																
																
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card" id="prj_user_div"> -->
<!-- 																		<h2 class="fs-title">Assign Users</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																				<label for="prj_project_status">Select Users</label> <select -->
<!-- 																					class="form-control" id="prj_project_users" name="prj_project_users"> -->
<!-- 																					<option>Select User</option> -->
<!-- 																					<option value=" ">2</option> -->
<!-- 																					<option value=" ">3</option> -->
<!-- 																					<option value=" ">4</option> -->
<!-- 																				</select> -->
<!-- 																		</div> -->
<!-- <!-- 																		<div class="form-group"> --> 
<!-- <!-- 																			<input type="button" class="float-left" value="Add+"/> --> 
<!-- <!-- 																		</div> -->
<!-- 																	</div> -->
																	
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
					<!--Department Master Modal end -->




					
					<div class="modal fade" id="dep_infoupdate_project" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Project</h4>
									<button type="button" class="close" onclick="resetForm('form_updateProject')" data-dismiss="modal">&times;</button>

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
																<div class="form-group">
																	<label for="selectType" class="ml-2" data-translate = "_s_category">Select Department</label><span class="mandatory">*</span> 
																	<select class="form-control pb-1" id="prjUp_department_id" name="prjUp_department_id" required>
																	</select>
																</div>
																
																
															</form>
														</div>
														<div class="col-6 text-right my-3">
															<div class="form-group">
																<label for="selectType" class="ml-2" data-translate = "pm_projects_type">Project Type</label><span class="mandatory">*</span> 
																<input type="radio" name="prjUp_type" id="prjUp_type_new" value="NEW"> New Project &nbsp;
																<input type="radio" name="prjUp_type" id="prjUp_type_ext" value="EXISTING"> Existing Project
															</div>
														</div>
														<div class="col-md-12 mx-0">

															<form id="form_updateProject" name="form_updateProject" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
																	<li id="financetab" class="tabwithborder"><strong>Finance</strong></li>
																	<li id="assignusertab" class="tabwithborder"><strong data-translate = "pm_projects_assign_users">Assign Users</strong></li>
																	<li id="imagestab" class="tabwithborder"><strong>Images & Docs</strong></li>
																	
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<input type="hidden" class="form-control" id="prjUp_project_id" name="prjUp_project_id" value="" readonly>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="location_name" data-translate = "pm_projects_location_lname">Project Location</label> <input
																						type="text" class="form-control"
																						id="prjUp_location_name" name="prjUp_location_name" placeholder="Enter Project Location" data-translate = "pm_projects_location_elocation">
																				</div>
																				<div class="form-group">
																					<label for="loLatitude">Latitude</label><span class="mandatory">*</span> <input
																						type="number" class="form-control" id="prjUp_latitude" name="prjUp_latitude"
																						placeholder="Enter Latitude" required>
																					<div class="late-fromto">
																						<img data-toggle="modal" data-target="#monitoringMapModal" src="images/icons/Latitude2-15.svg" id="project_selected_update_latitude" title="Choose From Map">
																					</div>
																				</div>
																				
																				
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loTehsil">Tehsil</label> <select -->
<!-- 																						class="form-control pb-1" id="prjUp_tehsil_id" name="prjUp_tehsil_id"> -->
<!-- 																					</select> -->
<!-- 																				</div> -->

																				<div class="form-group">
																					<label for="lowardName" data-translate = "pm_projectslocation_ward">Ward No</label> 
																					<input type="text" class="form-control" id="prjUp_ward_no" name="prjUp_ward_no" disabled="disabled" data-translate = "pm_projectslocation_ward">
																				</div>
																				
																				<div class="form-group">
																					<label for="loZoneName" data-translate = "pm_projects_location_zone">Zone No</label> 
																					<input type="text" class="form-control" id="prjUp_zone_no" name="prjUp_zone_no" disabled="disabled" data-translate="pm_projects_location_zone">
																					
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label><span class="mandatory">*</span> <input
																						type="number" class="form-control" id="prjUp_longitude" name="prjUp_longitude"
																						placeholder="Enter Longitude" required>
																					<div class="late-fromto">
																						<img data-toggle="modal" data-target="#monitoringMapModal" src="images/icons/Latitude2-15.svg" id="project_selected_update_longitude" title="Choose From Map">
																					</div>
																				</div>
																				
																				
																				<div class="form-group">
																					<label for="loTehsil" data-translate = "pm_projects_location_district">District</label> 
																					<input type="text" class="form-control" id="prjUp_district" name="prjUp_district" value="Indore" disabled="disabled">
																					
																				</div>
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="loVillage" data-translate = "pm_projects_location_village">Village</label> <select -->
<!-- 																						class="form-control pb-1" id="prjUp_village_id" name="prjUp_village_id"> -->
																						
<!-- 																					</select> -->
<!-- 																				</div> -->

																				<div class="form-group">
																					<label for="lowardName" data-translate = "pm_projects_location_ward_name">Ward Name</label> <input
																						type="text" class="form-control pb-1" id="prjUp_ward_name" name="prjUp_ward_name" 
																						placeholder="Ward Name" disabled="disabled">
																				</div>
																				
																				<div class="form-group">
																					<label for="lowardName" data-translate = "pm_projects_location_zone_name">Zone Name</label> <input
																						type="text" class="form-control pb-1" id="prjUp_zone_name" name="prjUp_zone_name" 
																						placeholder="Zone Name" disabled="disabled">
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
																					<label for="prjName">Project Name</label><span class="mandatory">*</span> <input
																						type="text" class="form-control" id="prjUp_project_name" 
																						name="prjUp_project_name" placeholder="Enter Project Name" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName">Mobile Number</label> <input
																						type="number" min="0" class="form-control" id="prjUp_contractor_number" 
																						name="prjUp_contractor_number" placeholder="Enter Mobile Name">
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_binfo_cemail">Contractor Email Id</label> <input
																						type="text" class="form-control" id="prjUp_contractor_email" 
																						name="prjUp_contractor_email" placeholder="Enter Contractor Email Id" data-translate = "pm_projects_binfo_ecemail">
																				</div>
																				<div class="form-group">
																					<label for="prjName">Work Order Period</label> <input
																						type="text" class="form-control" id="prjUp_work_order_period" 
																						name="prjUp_work_order_period" placeholder="Enter Work Order Period">
																				</div>
																				<div class="form-group">
																					<label for="prjName">Project Start Date</label><span class="mandatory">*</span> <input
																						type="text" class="form-control datepicker" id="prjUp_start_date" 
																						name="prjUp_start_date" placeholder="Select Date" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_expected_start_date">Project Expected Start Date</label><span class="mandatory">*</span> <input
																						type="text" class="form-control datepicker" id="prjUp_expected_start_date" 
																						name="prjUp_expected_start_date" placeholder="Select Date" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName">Design Consultant Name</label> <input
																						type="text" class="form-control" id="prjUp_design_consultant_name" 
																						name="prjUp_design_consultant_name" placeholder="Enter Design Consultant Name">
																				</div>
																				<div class="form-group">
																					<label for="principalName">Physical Progress (%)</label> <input
																						type="text" class="form-control"
																						id="prjUp_physical_progress" name="prjUp_physical_progress"
																						placeholder="Enter Physical Progress">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Remarks</label> 
																					<textarea class="form-control" rows="2" id="prjUp_remarks"
																						name="prjUp_remarks" placeholder="Enter Remarks"></textarea>
																				</div>
																				

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scConNo">Contractor Name</label> <input
																						type="text" class="form-control" id="prjUp_contractor_name"
																						name="prjUp_contractor_name" placeholder="Enter Contractor Name">
																				</div>
																				<div class="form-group">
																					<label for="prjName">Contractor Agency</label> <input
																						type="text" class="form-control" id="prjUp_contractor_agency" 
																						name="prjUp_contractor_agency" placeholder="Enter Contractor Agency">
																				</div>
																				<div class="form-group">
																					<label for="prjName">Work Order No</label> <input
																						type="text" class="form-control" id="prjUp_work_order_no" 
																						name="prjUp_work_order_no" placeholder="Enter Work Order No.">
																				</div>
																				<div class="form-group">
																					<label for="prjName">Project Completion Date</label><span class="mandatory">*</span> <input
																						type="text" class="form-control datepicker" id="prjUp_end_date" 
																						name="prjUp_end_date" placeholder="Select Date" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName" data-translate = "pm_projects_expected_completion_date">Project Expected Completion Date</label><span class="mandatory">*</span> <input
																						type="text" class="form-control datepicker" id="prjUp_expected_completion_date" 
																						name="prjUp_expected_completion_date" placeholder="Select Date" required>
																				</div>
																				<div class="form-group">
																					<label for="prjName">Design Consultant Contact Number</label> <input
																						type="number" min="0" class="form-control" id="prjUp_design_consultant_number" 
																						name="prjUp_design_consultant_number" placeholder="Enter Design Consultant Contact No.">
																				</div>
																				<div class="form-group">
																					<label for="scConNo">Contract Period</label> <input
																						type="text" class="form-control" id="prjUp_contract_period"
																						name="prjUp_contract_period" placeholder="Enter Contract Period">
																				</div>
																				<div class="form-group">
																					<label for="prjUp_project_status">Project Status</label> <select
																						class="form-control pb-1" id="prjUp_project_status" name="prjUp_project_status">
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
																		<h2 class="fs-title" >Finance</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="prjName" >Project Total Cost</label> <input
																						type="text" class="form-control" id="prjUp_total_cost" 
																						name="prjUp_total_cost" placeholder="Enter Project Total Cost">
																				</div>
																				<div class="form-group">
																					<label for="prjName" >Performance Bank Date</label> <input
																						type="text" class="form-control datepicker" id="prjUp_performance_bank_date" 
																						name="prjUp_performance_bank_date" placeholder="Select Performance Bank Date">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="prjName">Performance Bank Guarantee</label> <input
																						type="text" class="form-control" id="prjUp_performance_bank_guarantee" 
																						name="prjUp_performance_bank_guarantee" placeholder="Enter Performance Bank Guarantee">
																				</div>
																				<div class="form-group">
																					<label for="prjName" >Financial Progress (%)</label> <input
																						type="text" class="form-control" id="prjUp_financial_progress" 
																						name="prjUp_financial_progress" placeholder="Enter Financial Progress" >
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
																		<h2 class="fs-title" data-translate = "pm_projects_assign_users">Assign Users</h2>
																		
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="upScimages" data-translate = "pm_projects_allotted_to">Project Allotted To</label>
																					<select class="form-control pb-1" id="projectUpdateUserList"></select>
																					
																					<div class="form-group">
																						<label data-translate = "pm_projects_allotted_to_contactNo">Contact Number</label>
																						<input type="text" class="form-control" id="prjUp_user_contact_no" name="prjUp_user_contact_no"
																							placeholder="Contact Number" data-translate = "pm_projects_allotted_to_contactNo"  disabled="disabled"/>
																					</div>
																					
<!-- 																					<div id="flip2" class="form-control pb-1">Select User</div> -->
<!-- 																					<div id="panel2" class="user_panel" style="display:none;"> -->
<!-- 																						<ul id="projectUpdateUserList"> -->
<!-- 																						</ul> -->
<!-- 																					</div> -->
																					
																				</div>
																				
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label data-translate = "pm_projects_allotted_to_name">Name</label>
																					<input type="text" class="form-control"  id="prjUp_user_name" name="prjUp_user_name"
																						placeholder="Name" data-translate = "pm_projects_allotted_to_name" disabled="disabled"/>
																				</div>
																				
																				<div class="form-group">
																					<label data-translate = "pm_projects_allotted_to_email">Email Id</label>
																					<input type="text" class="form-control" id="prjUp_user_email" name="prjUp_user_email"
																						placeholder="Email Id" data-translate = "pm_projects_allotted_to_email" disabled="disabled"/>
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
																				type="file" class="form-control" id="prjUp_images" name="prjUp_images" multiple>
																		</div>
																		<ul class="imageslist" id="prjUp_up_imageList"></ul>
																		<ul class="imageslist" id="prjUp_up_images"></ul>
																		
																	</div>
																	<div class="form-card">
																		<h2 class="fs-title">Documents</h2>
																		<div class="form-group">
																			<label for="upScimages">Upload Documents</label> <input
																				type="file" class="form-control" id="prjUp_documents" name="prjUp_documents" multiple>
																		</div>
																		<ul class="imageslist" id="prjUp_up_docList"></ul>
																	</div>
																	<button type="button" name="previous" 
																		 class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>
																	<input type="submit"
																		name="finalinfosubmitupdate" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card" id="prjUp_user_div"> -->
<!-- 																		<h2 class="fs-title">Assign Users</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																				<label for="prjUp_project_status">Select Users</label> <select -->
<!-- 																					class="form-control" id="prjUp_project_users" name="prjUp_project_users"> -->
<!-- 																					<option>Select User</option> -->
<!-- 																					<option value=" ">2</option> -->
<!-- 																					<option value=" ">3</option> -->
<!-- 																					<option value=" ">4</option> -->
<!-- 																				</select> -->
<!-- 																		</div> -->
<!-- <!-- 																		<div class="form-group"> -->
<!-- <!-- 																			<input type="button" class="float-left" value="Add+"/> --> 
<!-- <!-- 																		</div> --> 
<!-- 																	</div> -->
<!-- 																	<input type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left" -->
<%-- 																		value="<-" /> <input type="submit" --%>
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






				</div>
				
				<!-- Projects tab end--> 
				<!-- Demo modal -->
					<div class="modal fade" id="table_demo" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Permission</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
										
							  	<form class="msform" id="form_addPermissions">
							  	<fieldset>
							  	<div class="form-card">
							  	<div class="row">
							  		<div class="form-group col-sm-6">
							  			<label id="permission_projectName"></label>
							  			<input type="hidden" id="permission_projectId" />
							  		</div>
							  		<div class="form-group col-sm-6">
				   						<label>Select User</label>
											<div id="flip" class="form-control pb-1">Select User</div>
											<div id="panel" class="user_panel" style="display:none;">
												<ul id="permissionUserList">
												</ul>
											</div>
					 				</div>
									</div>
										<table id="permission_access" class="table">
										</table>
 
 
								
									
									<div class="text-center">
										<button type="submit" class="btn btn-indore" data-translate = "_save">Save</button>
										<button type="reset" class="btn btn-indore" id="btn_cancle_permission" data-dismiss="modal" data-translate = "_cancel">Cancel</button>
									</div>
								</div>
								</fieldset>
								</form>
							</div>
									<!-- MultiStep Form end-->
								</div></div>

							</div>

				<!-- End -->
				
<!-- 				PROJECT IMAGE MODAL STARTS -->
					<div id="prj_imageModal" class="modal" tabindex="-1" role="dialog">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" id="prj_imageModalCloseBtn" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div id="carouselExampleControls" class="carousel slide"
										data-ride="carousel">
										<div class="carousel-inner" id="carousel-inner">
			<!-- 							ADDED THE IMAGE FILES HERE WITH JQUERY -->
										</div>
										<a class="carousel-control-prev" href="#carouselExampleControls"
											role="button" data-slide="prev"> <span
											class="carousel-control-prev-icon" aria-hidden="true"></span> <span
											class="sr-only">Previous</span>
										</a> <a class="carousel-control-next" href="#carouselExampleControls"
											role="button" data-slide="next"> <span
											class="carousel-control-next-icon" aria-hidden="true"></span> <span
											class="sr-only">Next</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
<!-- 				PROJECT IMAGE MODAL ENDS -->
				
				
				<!-- Milestone tab start-->
				<div class="tab-pane container-fluid" id="milestone">
					
					<div class="select-project">
				   		<label data-translate = "pm_miles_select_pro">Select Project</label>
					    
					     <select class="form-control pb-1" id="select_project" name="select_project">
						</select>
					    
					  </div>
					
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_infoadd_milestone"
							class="btn-add btn-indore-table dep_milestone" data-translate = "pm_miles_add_milestone">Add Milestone</button>
					</div>
					
					<table id="dep_milestone" class="display tbl_dep" class="tbl-report"></table>

					<!--Add Response Master Modal start -->
					<div class="modal fade" id="dep_infoadd_milestone" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate = "pm_miles_add_milestone">Add Milestone</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_addMilestone">
							  	
							  		<div class="form-group">
										<label for="mst_milestone_name" data-translate = "pm_miles_mname">Milestone Name</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="mst_milestone_name" name = "mst_milestone_name" placeholder="Enter Milestone Name" data-translate = "pm_miles_emname">
									</div>
									
									<div class="form-group">
										<label for="mst_description" data-translate = "pm_miles_description">Description</label><span class="mandatory">*</span>
										<textarea class="form-control" rows="2" id="mst_description" name = "mst_description" placeholder="Add Description Here"></textarea>
									</div>
									
									<div class="row">
										<div class="col-12">
											<div class="form-group">
												<label for="mst_start_date" data-translate = "pm_miles_startdate">Start Date</label><span class="mandatory">*</span>
												<input type="text" class="form-control datepicker" id="mst_start_date" name = "mst_start_date" placeholder="Start Date" data-translate = "pm_miles_startdate">
											</div>
										</div>
										<div class="col-12">
											<div class="form-group">
												<label for="mst_end_date" data-translate = "pm_miles_enddate">End Date</label><span class="mandatory">*</span>
												<input type="text" class="form-control datepicker" id="mst_end_date" name = "mst_end_date" placeholder="End Date" data-translate = "pm_miles_enddate">
											</div>
										</div>
									</div>
									
									<div class="form-group">
										<label for="mst_images"  data-translate = "pm_miles_image">Image</label>
										<input type="file" multiple class="form-control" id="mst_images" name = "mst_images" placeholder=" ">
									</div>
									
									<div class="form-group">
										<label for="mst_documents" data-translate = "pm_miles_document">Document</label>
										<input type="file" multiple class="form-control" id="mst_documents" name = "mst_documents" placeholder=" ">
									</div>
									
									<div class="form-group">
										<label for="milestone_status" data-translate = "pm_miles_mstatus">Milestone Status</label><span class="mandatory">*</span>
											<select class="form-control pb-1" id="milestone_status" name="milestone_status">
											</select>
									</div>
									
									<div class="form-group">
										<label for="mst_remarks" data-translate = "pm_miles_remarks">Remarks</label>
										<textarea class="form-control" rows="2" id="mst_remarks" name = "mst_remarks" placeholder="Add Remarks Here"></textarea>
									</div>
									
									<div class="text-center">
										<button type="submit" class="btn btn-indore" data-translate = "_save">Save</button>
										<button type="reset" class="btn btn-indore" id="btn_cancle_milsestone" data-dismiss="modal" data-translate = "_cancel">Cancel</button>
									</div>
								
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
				</div>
				<!-- Milestone tab start-->
			</div>
			<!-- Tab panes end-->
			
			
			<!-- update milestones modal-->
			
			<div class="modal fade" id="dep_edit_milestone" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title">Update Milestone</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_updateMilestone">
							  	
							  	<input type="hidden" class="form-control" id="milestoneId" name="milestoneId" value="" readonly>
							  	
									<div class="form-group">
										<label for="mstUp_milestone_name">Milestone Name<span class="mandatory">*</span></label>
										<input type="text" class="form-control" id="mstUp_milestone_name" name = "mstUp_milestone_name" placeholder="Enter Milestone Name">
									</div>
									
									<div class="form-group">
										<label for="mstUp_description">Description<span class="mandatory">*</span></label>
										<textarea class="form-control" rows="2" id="mstUp_description" name = "mstUp_description" placeholder="Add Description Here" ></textarea>
									</div>
									
									<div class="row">
										<div class="col-12">
											<div class="form-group">
												<label for="mstUp_start_date">Start Date<span class="mandatory">*</span></label>
												<input type="text" class="form-control datepicker" id="mstUp_start_date" name = "mstUp_start_date" placeholder="Start Date">
											</div>
										</div>
										<div class="col-12">
											<div class="form-group">
												<label for="mstUp_end_date">End Date<span class="mandatory">*</span></label>
												<input type="text" class="form-control datepicker" id="mstUp_end_date" name = "mstUp_end_date" placeholder="End Date">
											</div>
										</div>
									</div>
									
									<div class="form-group">
										<label for="mstUp_images" id="update_image">Image</label>
										<input type="file" multiple class="form-control" id="mstUp_images" name = "mstUp_images" placeholder=" ">
										<div class="filename"></div>
									</div>
									
									<div class="form-group">
										<label for="mstUp_documents" id="update_document">Document</label>
										<input type="file" multiple class="form-control" id="mstUp_documents" name = "mstUp_documents" placeholder=" ">
										<div class="docname"></div>
									</div>
									
									<div class="form-group">
										<label for="mstUp_milestone_status">Milestone Status</label>
											<select class="form-control pb-1" id="mstUp_milestone_status" name="mstUp_milestone_status">
											</select>
									</div>
									
									<div class="form-group">
										<label for="mstUp_remarks">Remarks</label>
										<textarea class="form-control" rows="2" id="mstUp_remarks" name = "mstUp_remarks" placeholder="Add Remarks Here" ></textarea>
									</div>
									
									<div class="text-center">
										<input type="submit" class="btn btn-indore" value = "Update">
										<button class="btn btn-indore" id="btn_cancle_Upmilsestone" data-dismiss="modal">Cancel</button>
									</div>
								
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
					
					<!--  For Image Showing -->
					
					
				
				
					<div id="milestoneImageModal" class="modal" tabindex="-1" role="dialog">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" id="imageModalCloseBtn" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div id="imgViewMilestone" class="carousel slide"
										data-ride="carousel">
										<div class="carousel-inner" id="milestoneImg">
										</div>
										<a class="carousel-control-prev" href="#imgViewMilestone"
											role="button" data-slide="prev"> <span
											class="carousel-control-prev-icon" aria-hidden="true"></span> <span
											class="sr-only">Previous</span>
										</a> <a class="carousel-control-next" href="#imgViewMilestone"
											role="button" data-slide="next"> <span
											class="carousel-control-next-icon" aria-hidden="true"></span> <span
											class="sr-only">Next</span>
										</a>
									</div>
								</div>
							</div>
						</div>
				</div>
				
				
				
				<!--  For Image Showing end-->
				
				
				<!-- Map Lat long modal start -->
				<div id="monitoringMapModal" class="modal" tabindex="-1" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg" role="document">
							<div class="modal-content dep-modal">
								<div class="modal-header">
									<h4 class="modal-title">Location Choose From Map</h4>
									<button type="button" data-dismiss="modal" class="close" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body h-50">
									<div id="projectMonitoringMap" class="h-50">
										
									</div>
								</div>
							</div>
						</div>
				</div>
				<!-- Map Lat long modal start -->
				
				
<!-- 				Intimation Modal Start -->

<div class="modal fade" id="send_projectIntimation" role="dialog">
	<div class="modal-dialog modal-dialog-centered modal-md">
		<!-- Modal content-->
		<div class="modal-content dep-modal">
			<div class="modal-header">
				<h4 class="modal-title" data-translate="_send_intimation">Send Intimation</h4>
				<button type="button" id="project_intimation_close" class="close" data-dismiss="modal">&times;</button>
			</div>
			<div class="modal-body" style="height: 50vh !important;">
				<div class="container-fluid" id="grad1">
					<div class="row justify-content-center mt-0">
						<div class="col-md-12 mx-0">
							<form id="form_sendIntimation" name="form_sendIntimation" class="form-admin">
								<div class="row">
									<div class="col-sm-12 col-lg-12">
										<div class="form-group">
											<label for="project_name" id="intimation_project_name" name="intimation_project_name"></label>
										</div>
										<div class="form-group">
											<label for="sctStudent" data-translate = "pm_miles_remarks">Remarks</label> <span class="mandatory">*</span>
											<textarea class="form-control" rows="5" id="project_intimation_remarks"
												name="project_intimation_remarks" placeholder="Enter Remarks"  data-translate = "pm_projects_binfo_eremarks"></textarea>				
										</div>
									</div>
								</div>
								<button style="margin: auto;display: block;" type="submit" id="project_intimation_submit" name="project_intimation_submit" 
									class="btn btn-indore mt-3" data-translate = "_submit">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 				Intimation Modal End -->
				
				
					
		</div>

	</div>
</div>
<!-- /#page-content-wrapper -->

</div>
<!-- /#wrapper -->


<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
<script type="text/javascript" src="${context}/js/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<!--  <script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>-->
<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>
<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
<script type="text/javascript"
	src="${context}/js/bootstrap-datepicker.js"></script>
<script type="text/javascript"
	src="${context}/js/hummingbird-treeview-1.3.js"></script>

<!-- DataTable -->
<script src="${context}/js/dataTables-buttons-min.js"></script>
<script src="${context}/js/buttons-html5-min.js"></script>

<!-- pdf download -->
	<script type="text/javascript" src="${context}/js/pdfmake-min.js"></script>
	<script type="text/javascript" src="${context}/js/vfs_fonts.js"></script>

<script type="text/javascript" src="${context}/js/moment.min.js"></script>
<script type="text/javascript" src="${context}/js/daterangepicker.min.js"></script>

<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>

<script type="text/javascript" src="${context}/js/slick.min.js"></script>

<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/utils.js"></script>
<script type="text/javascript" src="${context}/js/esri/esri-api-3-30.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>
<script type="text/javascript" src="${context}/js/created/appData.js"></script>

<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
<script type="text/javascript" src="${context}/js/developer/utility.js"></script>

<script type="text/javascript" src="${context}/js/developer/dep_monitoring_map.js"></script>

<script type="text/javascript" src="${context}/js/designer/project_monitoring.js"></script>

<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_project_monitoring.js"></script>

</body>
</html>