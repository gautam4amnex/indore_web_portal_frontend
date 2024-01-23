<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>
<c:set value="${pageContext.request.contextPath}" var="context" />

<c:set var="language"
	value="${lang eq 'en' or lang eq 'gu' ? lang : pageContext.request.locale.language}"
	scope="session" />
<fmt:setLocale value="${language}" />

<title>NIC Data</title>

<link type="text/css" rel="stylesheet" href="${context}/css/datepicker.css" />

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data_translate="_primary" data-toggle="tab" href="#nicATM">ATM</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					data_translate="_secondary" href="#nicBanks">Banks</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					data_translate="_third" href="#nicMonument">Monuments</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					data_translate="_third" href="#nicMuseum">Museum</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					data_translate="_secondary" href="#nicParks">Park and ground</a></li>
				<li class="nav-item"><a class="nav-link tab-data" data-toggle="tab"
					data_translate="_secondary" href="#nicManhole">Manhole</a></li>
				
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="nicATM">

					<div class="text-right">
						<button data-toggle="modal" data-target="#nic_ATMadd_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add
							Data</button>
					</div>
					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List of ATM</h6>
					<table id="dep_atm_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Department Master ATM Modal start -->
					
					<div class="modal fade" id="nic_ATMadd_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">


							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
									<button type="button" class="close" id="addAtm_close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addNicAtm" name ="form_addNicAtm" class="msform form-admin">
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
																						type="number" class="form-control" id="atm_latitude" name="atm_latitude"
																						placeholder="Enter Latitude">
																				</div>
																			  	
																			  	<div class="form-group">
																					<label for="atm_ward">Ward No</label> <select
																						class="form-control pb-1" id="atm_wardNo" name="atm_wardNo">
																						
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="atm_subLayerId" name="atm_subLayerId">
																				</div>
																				</div>
																				<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="long_atm">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="atm_longitude" name="atm_longitude"
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
																					<label for="atmaddName">ATM Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="atm_name" name="atm_name"
																						placeholder="Enter ATM Name">
																				</div>
																				<div class="form-group">
																					<label for="atmNo">ATM Type</label> 
																						<select class="form-control pb-1" id="atm_type" name="atm_type">
																							<option value="">Select ATM Type</option>
																							<option value="Withdrawal+CDM">Withdrawal+CDM</option>
																							<option value="Only CDM">Only CDM</option>
																							<option value="Only Withdrawal">Only Withdrawal</option>
																							<option value="Paytm ATM">Paytm ATM</option>
																						</select>
																				</div>
																				<div class="form-group">
																					<label for="address">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="atm_address" name="atm_address"
																						placeholder="Enter Address">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="phonen">Phone Number</label> <input
																						type="text" class="form-control" id="atm_phonenumber" name="atm_phonenumber"
																						placeholder="Enter Phone Number">
																				</div>

																				<div class="form-group">
																					<label for="secno">Sector No</label> <input
																						type="text" class="form-control" id="atm_secNo" name="atm_secNo"
																						placeholder="Enter Sector No">
																				</div>
																				<div class="form-group">
																					<label for="remarks">Remarks</label> <input
																						type="text" class="form-control" id="atm_remark" name="atm_remark"
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
																				type="file" multiple class="form-control" id="atm_images_add" name="atm_images_add">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="nic_atm_add"
																		name="nic_atm_add" class="btn btn-indore mt-3"
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
					
					<!--Department Master ATM Update Modal  start -->
					<div class="modal fade" id="nic_atm_update_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
									<button type="button" class="close" id="updateAtm_close" data-dismiss="modal">&times;</button>
								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
														    <form id="form_nicUpdateAtm"  name ="form_nicUpdateAtm" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location_update"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab__update"
																		class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li data_translate="_facilities" -->
<!-- 																		id="facilitiestab_update" class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" -->
<!-- 																		id="constructiontab_update" class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab_update" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab_update"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="late_l">Latitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="atmUp_latitude" name="atmUp_latitude"
																						placeholder="Enter Latitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="atm_ward_u">Ward No</label> <select
																						class="form-control pb-1" id="atmUp_wardno" name="atmUp_wardno">
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="atmUp_subLayerId" name="atmUp_subLayerId">
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="atmUp_atmId" name="atmUp_atmId">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="long_l">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="atmUp_longitude" name="atmUp_longitude"
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
																					<label for="atmaddName_l">ATM Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="atmUp_name"
																						name="atmUp_name" placeholder="Enter ATM Name">
																				</div>
																				<div class="form-group">
																					<label for="atmNo_l">ATM Type</label> 
																						<select class="form-control pb-1" id="atmUp_type" name="atmUp_type">
																							<option value="">Select ATM Type</option>
																							<option value="Withdrawal+CDM">Withdrawal+CDM</option>
																							<option value="Only CDM">Only CDM</option>
																							<option value="Only Withdrawal">Only Withdrawal</option>
																							<option value="Paytm ATM">Paytm ATM</option>
																						</select>
																				</div>
																				<div class="form-group">
																					<label for="address_l">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="atmUp_address" name="atmUp_address"
																						placeholder="Enter Address">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="phonen_l">Phone Number</label> <input
																						type="text" class="form-control" name="atmUp_phonenumber"
																						id="atmUp_phonenumber" placeholder="Enter Phone number">
																				</div>

																				<div class="form-group">
																					<label for="secno_l">Sector No</label> <input
																						type="text" class="form-control" id="atmUp_secNo" name="atmUp_secNo"
																						placeholder="Enter Sector No">
																				</div>
																				<div class="form-group">
																					<label for="remarks_l">Remarks</label> <input
																						type="text" class="form-control" id="atmUp_remark" name="atmUp_remark"
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
																			<label for="upScimages_u">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" name="atmUp_nicImage" id="atmUp_nicImage">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="nic_atm_update"
																		name="nic_atm_update" class="btn btn-indore mt-3"
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
					<!--Department Master Modal end -->
				</div>
				<!--Department Master  Bank Modal Start -->
				<div class="tab-pane container-fluid fade" id="nicBanks">
					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addNicBank_modal"
							class="btn-add btn-indore-table">Add Data</button>
					</div>
					<h6 class="table-title-grid"
						data_translate="_list_of_banks">List of Banks</h6>
					<table id="dep_Bank_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Department Master Bank Modal start -->

					<div class="modal fade" id="dep_addNicBank_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">
											
							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">
									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
									<button type="button" class="close" id="addBank_close" data-dismiss="modal">&times;</button>
								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
															<form id="form_nic_bank"  name ="form_nic_bank" class="msform form-admin">
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
																						type="number" class="form-control" id="bank_latitude" name="bank_latitude"
																						placeholder="Enter Latitude">
																				</div>
																			   <div class="form-group">
																					<label for="bank_ward">Ward No</label> <select
																						class="form-control pb-1" id="bank_wardno" name="bank_wardno">
																						
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
																						type="number" class="form-control" id="bank_longitude" name="bank_longitude"
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
																					<label for="bankaddName">Bank Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bank_name" name="bank_name"
																						placeholder="Enter Bank Name">
																				</div>
																				<div class="form-group">
																					<label for="bankNo">Bank Type</label> 
																						<select class="form-control pb-1" id="bank_Type" name="bank_Type">
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
																						placeholder="Enter Address">
																				</div>

																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="bank_phonen">Phone Number</label> <input
																						type="text" class="form-control" name="bank_phonenumber"
																						id="bank_phonenumber" placeholder="Enter Phone Number">
																				</div>
																				<div class="form-group">
																					<label for="bank_secno">Sector No</label> <input
																						type="text" class="form-control" id="bank_secNo" name="bank_secNo"
																						placeholder="Enter Sector No">
																				</div>
																				<div class="form-group">
																					<label for="bank_remarks">Remarks</label> <input
																						type="text" class="form-control" id="bank_remark" name="bank_remark"
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
																				type="file" multiple class="form-control" name="bank_images_add" id="bank_images_add">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="nic_bank_add"
																		name="nic_bank_add" class="btn btn-indore mt-3"
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
					
					<!--Department Master  Bank Update Modal  start -->
					<div class="modal fade" id="dep_updateBank_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">
							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">
									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
									<button type="button" class="close" id="updateBank_close" data-dismiss="modal">&times;</button>
								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														
														<div class="col-md-12 mx-0">
															<form id="form_nicUpdateBank"  name="form_nicUpdateBank" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location_update"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab__update"
																		class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li data_translate="_facilities" -->
<!-- 																		id="facilitiestab_update" class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" -->
<!-- 																		id="constructiontab_update" class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab_update" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab_update"
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
																						type="number" class="form-control" id="bankUp_latitude" name="bankUp_latitude"
																						placeholder="Enter Latitude">
																				</div>
																			   <div class="form-group">
																					<label for="bank_ward_u">Ward No</label> <select
																						class="form-control pb-1" id="bankUp_wardno" name="bankUp_wardno">
																						
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="bankUp_subLayerId" name="bankUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="bankUp_bankId" name="bankUp_bankId">
																				</div>

																			</div>
																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="long">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="bankUp_longitude" name="bankUp_longitude"
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
																					<label for="bankaddName_l">Bank Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="bankUp_name" name="bankUp_name"
																						placeholder="Enter Bank Name">
																				</div>
																				<div class="form-group">
																					<label for="bankNo_l">Bank Type</label>
																						<select class="form-control pb-1" id="bankUp_Type" name="bankUp_Type">
																							<option value="">Select Bank Type</option>
																							<option value="NABARD">NABARD</option>
																							<option value="NBFC">NBFC</option>
																							<option value="Government">Government</option>
																							<option value="Nationalized">Nationalized</option>
																						</select>
																				</div>
																				<div class="form-group">
																					<label for="bankaddress_l">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control"
																						id="bankUp_address" name="bankUp_address" placeholder="Enter Address">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="bankphonen_l">Phone Number</label> <input
																						type="text" class="form-control" name="bankUp_phonenumber"
																						id="bankUp_phonenumber" placeholder="Enter Phone Number">
																				</div>

																				<div class="form-group">
																					<label for="banksecno_l">Sector No</label> <input
																						type="text" class="form-control" id="bankUp_secNo" name="bankUp_secNo"
																						placeholder="Enter Sector No">
																				</div>
																				<div class="form-group">
																					<label for="bankremarks_l">Remarks</label> <input
																						type="text" class="form-control" id="bankUp_remark" name="bankUp_remark"
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
																			<label for="upScimages_u">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" name="bankUp_nicImages" id="bankUp_nicImages">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="nic_bank_update"
																		name="nic_bank_update" class="btn btn-indore mt-3"
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
					<!--Department Master Modal end -->
				</div>
				
				<!--Department Master Monument Modal Start -->
				<div class="tab-pane container-fluid fade" id="nicMonument">
					<div class="text-right">
						<button data-toggle="modal"
							data-target="#nic_addMonument_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add
							Data</button>
					</div>
					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List of Monument</h6>
					<table id="dep_monument_table" class="display tbl_dep" class="tbl-report"></table>

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
																						class="form-control pb-1" id="mon_ward">
																						
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
																							 <option value="false">Select Ticket Availability</option>
																							 <option value="true">Yes</option>
																							 <option value="false">No</option>
																						 </select>
																				</div>
																				<div class="form-group">
																					<label for="touristmo">Tourist Guides
																						Availability</label> <select
																						class="form-control pb-1" id="mon_tourist">
																							 <option value="false">Select Tourist Guides Availability</option>
																							 <option value="true">Yes</option>
																							 <option value="false">No</option>
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
																				type="file" multiple class="form-control" id="mon_nicImages" name="mon_nicImages">
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
					
					<!--Department Master  Monument Update Modal  start -->
					<div class="modal fade" id="nic_updateMonument_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
									<button type="button" class="close" onclick="resetForm('form_nicUpdateMonument')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
															<form id="form_nicUpdateMonument"  name ="form_nicUpdateMonument" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location_update"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab__update"
																		class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li data_translate="_facilities" -->
<!-- 																		id="facilitiestab_update" class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" -->
<!-- 																		id="constructiontab_update" class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab_update" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab_update"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="late_l_mo">Latitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" id="monUp_latitude"
																						placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="mo_ward_u">Ward No</label> <select
																						class="form-control pb-1" id="monUp_ward">
																						</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="monUp_subLayerId" name="monUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="monUp_monId" name="monUp_monId">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="long_l_mo">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control"
																						id="monUp_longitude" placeholder="Enter Longitude">
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
																					<label for="moddName_u">Monument Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="monUp_Name"
																						placeholder="Enter Monument Name">
																				</div>
																				<div class="form-group">
																					<label for="moNo_u">Monument Type</label> <input
																						type="text" class="form-control" id="monUp_Type"
																						placeholder="Enter Monument Type">
																				</div>
																				<div class="form-group">
																					<label for="mo_address_u">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="monUp_address"
																						placeholder="Enter Address">
																				</div>
																				<div class="form-group">
																					<label for="secnomo_u">Sector No</label> <input
																						type="text" class="form-control" id="monUp_secNo"
																						placeholder="Enter Sector No">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="timingsmo_u">Timings</label> <input
																						type="text" class="form-control" id="monUp_timings"
																						placeholder="Enter Timings">
																				</div>
																				<div class="form-group">
																					<label for="ticketmo_u">Ticket Availability</label>
																					<select class="form-control pb-1"
																						id="monUp_ticket">
																						<option value="false">Select Ticket Availability</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="touristmo_u">Tourist Guides
																						Availability</label> <select
																						class="form-control pb-1" id="monUp_tourist">
																						<option value="false">Select Tourist Guides Availability</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>

																				<div class="form-group">
																					<label for="remarks_u">Remarks</label> <input
																						type="text" class="form-control" id="monUp_remark"
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
																			<label for="upScimages_u">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="monUp_nicImages" name="monUp_nicImages">
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="update_monument_submit"
																		name="update_monument_submit" class="btn btn-indore mt-3"
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
				</div>

				<!--Department Master Museum Modal Start -->

				<div class="tab-pane container-fluid fade" id="nicMuseum">
					<div class="text-right">
						<button data-toggle="modal" data-target="#nic_addMuseum_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add
							Data</button>
					</div>
					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List of Museum</h6>
					<table id="dep_museum_table" class="display tbl_dep" class="tbl-report"></table>

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
																						class="form-control pb-1" id="museum_ward">
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
																						<option value="false">Select Ticket Availability</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="touristmuse">Tourist Guides
																						Availability</label> <select
																						class="form-control pb-1" id="museum_tourist">
																						<option value="false">Select Tourist Guides Availability</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
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
																				type="file" multiple class="form-control" id="museum_nicImages" name ="museum_nicImages">
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
					
					
					<!--Department Master Museum  Update Modal  start -->
					<div class="modal fade" id="nic_updateMuseumModel" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
									<button type="button" class="close" onclick="resetForm('form_nicUpdateMuseum')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
															<form id="form_nicUpdateMuseum"  name ="form_nicUpdateMuseum" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location_update"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab__update"
																		class="tabwithborder"><strong>Basic Info</strong></li>
<!-- 																	<li data_translate="_facilities" -->
<!-- 																		id="facilitiestab_update" class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" -->
<!-- 																		id="constructiontab_update" class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab_update" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab_update"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="late_l_muse">Latitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control"
																						id="museumUP_latitude" placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="muse_ward_u">Ward No</label> <select
																						class="form-control pb-1" id="museumUp_ward">
																						
																					</select>
																				</div>
																				
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="museumUp_subLayerId" name="museumUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="museumUp_museumId" name="museumUp_museumId">
																				</div>
																				
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="long_l_muse">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control"
																						id="museumUP_longitude" placeholder="Enter Longitude">
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
																					<label for="museaddName_u">Museum Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="museumUP_Name"
																						placeholder="Enter Museum Name">
																				</div>
																				<div class="form-group">
																					<label for="museType_u">Museum Type</label> <input
																						type="text" class="form-control" id="museumUP_Type"
																						placeholder="Enter Museum Type">
																				</div>
																				<div class="form-group">
																					<label for="muse_address_u">Address<span class="mandatory">*</span></label> <input
																						type="text" class="form-control"
																						id="museumUP_address" placeholder="Enter Address">
																				</div>
																				<div class="form-group">
																					<label for="secnomuse_u">Sector No</label> <input
																						type="text" class="form-control" id="museumUP_secNo"
																						placeholder="Enter Sector No">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="timingsmuse_u">Timings</label> <input
																						type="text" class="form-control"
																						id="museumUP_timings" placeholder="Enter Timings">
																				</div>
																				<div class="form-group">
																					<label for="ticketmuse_u">Ticket
																						Availability</label> <select
																						class="form-control pb-1" id="museumUP_ticket">
																						<option value="false">Select Ticket Availability</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="touristmuse_u">Tourist Guides
																						Availability</label> <select
																						class="form-control pb-1" id="museumUP_tourist">
																						<option value="false">Select Tourist Guides Availability</option>
																						<option value="true">Yes</option>
																						<option value="false">No</option>
																					</select>
																				</div>

																				<div class="form-group">
																					<label for="muse_remarks_u">Remarks</label> <input
																						type="text" class="form-control" id="museumUP_remark"
																						placeholder="Enter slope">
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
																			<label for="upScimages_u">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="museumUP_nicImages" name ="museumUP_nicImages">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id=""
																		name="update_museum_submit" class="btn btn-indore mt-3"
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
				</div>
				
				<!-- 	Department Master Parks Model Start -->
				<div class="tab-pane container-fluid fade" id="nicParks">
					<div class="text-right">
						<button data-toggle="modal" data-target="#nic_addParks_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Data</button>
					</div>
					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List of Parks</h6>
					<table id="dep_park_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Department Master PARKS Modal start -->
					<div class="modal fade" id="nic_addParks_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">
							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">
									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
									<button type="button" class="close" id="addPark_close" data-dismiss="modal">&times;</button>
								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
															<form id="nic_parkForm"  name="nic_parkForm" class="msform form-admin">
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
																						type="number" class="form-control" name="park_latitude"
																						id="park_latitude" placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="park_ward">Ward No</label> <select
																						class="form-control pb-1" id="park_ward" name="park_ward">
																						
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
																						type="number" class="form-control" name="park_longitude"
																						id="park_longitude" placeholder="Enter Longitude">
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
																						Name<span class="mandatory">*</span></label> <input type="text" class="form-control" name="park_Name"
																						id="park_Name" placeholder="Enter Park and Ground Name">
																				</div>
																				<div class="form-group">
																					<label for="secnopark">Sector No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="park_secNo" name="park_secNo"
																						placeholder="Enter Sector No">
																				</div>

																				<div class="form-group">
																					<label for="roadpark">Road Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="park_road" name="park_road"
																						placeholder="Enter Road Name">
																				</div>
																				<div class="form-group">
																					<label for="parkNo">Contact_No</label> <input
																						type="text" class="form-control" id="park_contactNo" name="park_contactNo"
																						placeholder="Enter Contact_No">
																				</div>
																				<div class="form-group">
																					<label for="park_area">Garden Area</label> <input
																						type="text" class="form-control" id="park_gardenArea" name="park_gardenArea"
																						placeholder="Enter Garden Area">
																				</div>
																				<div class="form-group">
																					<label for="park_entries">No of Entries</label> <input
																						type="text" class="form-control" id="park_entries" name="park_entries"
																						placeholder="Enter No of Entries">
																				</div>

																				<div class="form-group">
																					<label for="park_structure">Structure</label> <input
																						type="text" class="form-control" name="park_structure"
																						id="park_structure" placeholder="Enter Structure">
																				</div>
																				<div class="form-group">
																					<label for="park_trees">No of Tress</label> <input
																						type="text" class="form-control" id="park_trees" name="park_trees"
																						placeholder="Enter No of Tress">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="vtreepark">Variety of Tress</label> <input
																						type="text" class="form-control" id="park_vtree" name="park_vtree"
																						placeholder="Enter Variety of Tress">
																				</div>
																				
																				<div class="form-group">
																					<label for="touristmuse">Statue's</label> 
																					<select class="form-control pb-1" id="park_statues" name="park_statues">
																						<option value="">Select Bird Feeder</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>

																				<div class="form-group">
																					<label for="museremarks">No of Statue's</label> <input
																						type="text" class="form-control"
																						id="park_nostatues" name="park_nostatues"
																						placeholder="Enter No of Statue's">
																				</div>

																				<div class="form-group">
																					<label for="museremarks">Bird Feeder</label> 
																					<select class="form-control pb-1" id="park_birdfeeder" name="park_birdfeeder">
																						<option value="">Select Bird Feeder</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Bird
																						Feeder's</label> <input type="text" class="form-control"
																						id="park_nobirdfer" name="park_nobirdfer"
																						placeholder="Enter No of Bird Feeder's">
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Playing
																						Instruments</label> <input type="text"
																						class="form-control" id="park_instrument" name="park_instrument"
																						placeholder="Enter No of Playing Instruments">
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Benches</label> <input
																						type="text" class="form-control" id="park_benches" name="park_benches"
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
																						type="text"  class="form-control datepicker-dept" id="park_lastmain"
																						name="park_lastmain" placeholder="Enter Last maintenance">
																				</div>
																				<div class="form-group">
																					<label for="hsFacility">Toilets</label> 
																					<select class="form-control pb-1" id="park_toilet" name="park_toilet">
																						<option value="">Select Toilets</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Rest Hut</label>
																					<select class="form-control pb-1" id="park_resthut" name="park_resthut">
																						<option value="">Select Rest Hut</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">No of Rest huts</label> <input
																						type="text" class="form-control"
																						id="parkNoresthut" name="parkNoresthut"
																						placeholder="Enter No of Rest huts">
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Water Connection</label> 
																					<select class="form-control pb-1" id="park_watercon" name="park_watercon">
																						<option value="">Select Water Connection</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Sewage Connection</label>
																					<select class="form-control pb-1" id="park_sewageconn" name="park_sewageconn">
																						<option value="">Select Sewage Connection</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsWard">No of Lights</label> <input
																						type="text" class="form-control" id="park_NoLights" name="park_NoLights"
																						placeholder="Enter No of Lights">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsServices">Drinking water</label> 
																					<select class="form-control pb-1" id="park_drinkingWater" name="park_drinkingWater">
																						<option value="">Select Drinking water</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Physical fitness
																						Facilities</label> 
																					<select class="form-control pb-1" id="park_PhysicalFitness" name="park_PhysicalFitness">
																						<option value="">Select Physical fitness Facilities</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Senior Citizen
																						Spots</label> 
																					<select class="form-control pb-1" id="park_SeniorCitizen" name="park_SeniorCitizen">
																						<option value="">Select Senior Citizen Spots</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Park Opening
																						Timings</label> <input type="text" class="form-control"
																						id="park_Opening" name="park_Opening"
																						placeholder="Enter Park Opening Timings">
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Park Closing
																						Timings</label> <input type="text" class="form-control"
																						id="park_Closing" name="park_Closing"
																						placeholder="Enter Park Closing Timings">
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Entry Ticket Price</label>
																					<input type="text" class="form-control"
																						id="park_EntryTicket" name="park_EntryTicket"
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
																				type="file" multiple class="form-control" id="park_nicImages" name="park_nicImages">
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
					
					
					<!--Department Master Parks Update Modal  start -->
					<div class="modal fade" id="update_nic_parksModel" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Update
										Information</h4>
									<button type="button" class="close" id="updatePark_close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
															<form id="form_nicUpdateParks"  name="form_nicUpdateParks" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location_update"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab__update"
																		class="tabwithborder"><strong>Basic Info</strong></li>
																	<li data_translate="_facilities"
																		id="facilitiestab_update" class="tabwithborder"><strong>Facilities</strong></li>
<!-- 																	<li data_translate="_construction" -->
<!-- 																		id="constructiontab_update" class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab_update" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab_update"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="late_l_muse">Latitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control" name="parkUp_latitude"
																						id="parkUp_latitude" placeholder="Enter Latitude">
																				</div>
																				
																				<div class="form-group">
																					<label for="muse_ward_u">Ward No</label> <select
																						class="form-control pb-1" id="parkUp_ward" name="parkUp_ward">
																						
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="parkUp_subLayerId" name="parkUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="parkUp_parkId" name="parkUp_parkId">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="long_l_muse">Longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control"
																						id="parkUp_longitude" name="parkUp_longitude" placeholder="Enter Longitude">
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
																					<label for="parkaddName">Park and Ground
																						Name<span class="mandatory">*</span></label> <input type="text" class="form-control"
																						id="parkUp_Name" name="parkUp_Name" placeholder="Enter Park and Ground">
																				</div>
																				<div class="form-group">
																					<label for="secnopark">Sector No<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="parkUp_secNo" name="parkUp_secNo"
																						placeholder="Enter Sector No">
																				</div>

																				<div class="form-group">
																					<label for="roadpark">Road Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="parkUp_road" name="parkUp_road"
																						placeholder="Enter Road Name">
																				</div>
																				<div class="form-group">
																					<label for="parkNo">Contact_No</label> <input
																						type="text" class="form-control" id="parkUp_contactNo"
																						name="parkUp_contactNo"
																						placeholder="Enter Contact_No">
																				</div>
																				<div class="form-group">
																					<label for="park_area">Garden Area</label> <input
																						type="text" class="form-control" id="parkUp_gardenArea"
																						name="parkUp_gardenArea" placeholder="Enter Garden Area">
																				</div>
																				<div class="form-group">
																					<label for="park_entries">No of Entries</label> <input
																						type="text" class="form-control"
																						id="parkUp_entries" nme="parkUp_entries"
																						placeholder="Enter No of Entries">
																				</div>

																				<div class="form-group">
																					<label for="park_structure">Structure</label> <input
																						type="text" class="form-control" name="parkUp_structure"
																						id="parkUp_structure" placeholder="Enter Structure">
																				</div>
																				<div class="form-group">
																					<label for="park_trees">No of Tress</label> <input
																						type="text" class="form-control" id="parkUp_trees" name="parkUp_trees"
																						placeholder="Enter No of Tress">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="vtreepark">Variety of Tress</label> <input
																						type="text" class="form-control" id="parkUp_vtree" name="parkUp_vtree"
																						placeholder="Enter Variety of Tress">
																				</div>
																				
																				<div class="form-group">
																					<label for="touristmuse">Statues</label> <select
																						class="form-control pb-1" id="parkUp_statues" name="parkUp_statues">
																						<option value="">Select Statues</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>

																				<div class="form-group">
																					<label for="museremarks">No of Statue's</label> <input
																						type="text" class="form-control"
																						id="parkUp_parknostatues" name="parkUp_parknostatues"
																						placeholder="Enter No of Statue's">
																				</div>

																				<div class="form-group">
																					<label for="museremarks">Bird Feeder</label><select
																						class="form-control pb-1" id="parkUp_birdfeeder" name="parkUp_birdfeeder">
																						<option value="">Select Bird Feeder</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Bird
																						Feeder's</label> <input type="text" class="form-control"
																						id="parkUp_nobirdfer" name="parkUp_nobirdfer"
																						placeholder="Enter No of Bird Feeder's">
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Playing
																						Instruments</label> <input type="text"
																						class="form-control" id="parkUp_instrument" name="parkUp_instrument"
																						placeholder="Enter No of Playing Instruments">
																				</div>
																				<div class="form-group">
																					<label for="museremarks">No of Benches</label> <input
																						type="text" class="form-control"
																						id="parkUp_benches" name="parkUp_benches"
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
																						type="text" class="form-control datepicker-dept"
																						id="parkUp_lastmain" name="parkUp_lastmain"
																						placeholder="Enter Last maintenance">
																				</div>
																				<div class="form-group">
																					<label for="hsFacility">Toilets</label> <select
																						class="form-control pb-1" id="parkUp_toilet" name="parkUp_toilet">
																						<option value="">Select Toilets</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Rest Hut</label> 
																					<select class="form-control pb-1" id="parkUp_resthut" name="parkUp_resthut">
																						<option value="">Select Rest Hut</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">No of Rest huts</label> <input
																						type="text" class="form-control"
																						id="parkUp_Noresthut" name="parkUp_Noresthut"
																						placeholder="Enter No of Rest huts">
																						
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Water Connection</label> 
																					<select class="form-control pb-1" id="parkUp_watercon" name="parkUp_watercon">
																						<option value="">Select Water Connection</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsWard">Sewage Connection</label> 
																					<select class="form-control pb-1" id="parkUp_sewageconn" name="parkUp_sewageconn">
																						<option value="">Select Sewage Connection</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsWard">No of Lights</label> <input
																						type="text" class="form-control"
																						id="parkUp_NoLights" name="parkUp_NoLights"
																						placeholder="Enter No of Lights">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="hsServices">Drinking water</label> 
																					<select class="form-control pb-1" id="parkUp_drinkingWater" name="parkUp_drinkingWater">
																						<option value="">Select Drinking water</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Physical fitness
																						Facilities</label> 
																					<select class="form-control pb-1" id="parkUp_PhysicalFitness" name="parkUp_PhysicalFitness">
																						<option value="">Select Physical fitness Facilities</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Senior Citizen
																						Spots</label>
																					<select class="form-control pb-1" id="parkUp_SeniorCitizen" name="parkUp_SeniorCitizen">
																						<option value="">Select Senior Citizen Spots</option>
																						<option value="Yes">Yes</option>
																						<option value="No">No</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Park Opening
																						Timings</label> <input type="text" class="form-control"
																						id="parkUp_Opening" name="parkUp_Opening"
																						placeholder="Enter Park Opening Timings">
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Park Closing
																						Timings</label> <input type="text" class="form-control"
																						id="parkUp_Closing" name="parkUp_Closing"
																						placeholder="Enter Park Closing Timings">
																				</div>
																				<div class="form-group">
																					<label for="hsServices">Entry Ticket Price</label>
																					<input type="text" class="form-control"
																						id="parkUp_EntryTicket" name="parkUp_EntryTicket"
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
																			<label for="upScimages_u">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="parkUp_nicImages" name="parkUp_nicImages">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit" id="update_park_submit"
																		name="update_park_submit" class="btn btn-indore mt-3"
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
				</div>

				<!-- Department Master Manhole Model Start -->
				<div class="tab-pane container-fluid fade" id="nicManhole">
					<div class="text-right">
						<button data-toggle="modal" data-target="#nic_addManhole_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add
							Data</button>
					</div>
					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List of Manhole</h6>
					<table id="dep_manhole_table" class="display tbl_dep" class="tbl-report"></table>

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
																						class="form-control pb-1" id="manhole_ward_id">
																						
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
					
					<!--Department Master  MANHOLE Update Modal  start -->
					
					<div class="modal fade" id="nic_updateManhole_model" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										Information</h4>
								<button type="button" class="close" onclick="resetForm('form_nicUpdateManhole')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">
														<div class="col-md-12 mx-0">
															<form id="form_nicUpdateManhole" name ="form_nicUpdateManhole" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location"
																		class="tabwithborder activemain" id="location_update"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab__update"
																		class="tabwithborder activemain"><strong>Basic
																			Info</strong></li>
<!-- 																	<li data_translate="_facilities" -->
<!-- 																		id="facilitiestab_update" class="tabwithborder"><strong>Facilities</strong></li> -->
<!-- 																	<li data_translate="_construction" -->
<!-- 																		id="constructiontab_update" class="tabwithborder"><strong>Construction</strong></li> -->
<!-- 																	<li data_translate="_other" id="othertab_update" -->
<!-- 																		class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab_update"
																		class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="muse_ward_u">Ward No</label> <select
																						class="form-control pb-1" id="manholeUp_Wardno">
																						<!-- <option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option> -->
																					</select>
																				</div>
																				<!-- <div class="form-group">
																					<label for="muse_zone_u">Zone No</label> <select
																						class="form-control pb-1" id="manholeUp_Zoneno">
																						<option>Select Zone No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div> -->
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="manholeUp_subLayerId" name="manholeUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="manholeUp_manholeId" name="manholeUp_manholeId">
																				</div>
																				
																				<div class="form-group">
																					<label for="late_l_muse">latitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control"
																						id="manholeUp_latitude" placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="long_l_muse">longitude<span class="mandatory">*</span></label> <input
																						type="number" class="form-control"
																						id="manholeUp_longitude"
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
																				<!-- <div class="form-group">
																					<label for="parkaddName">Manhole ID</label> <input
																						type="text" class="form-control" id="manholeUp_id"
																						placeholder="Enter Manhole ID">
																				</div> -->
																				<div class="form-group">
																					<label for="secnopark">Cover Material</label> <input
																						type="text" class="form-control"
																						id="manholeUp_cover"
																						placeholder="Enter Cover Material">
																				</div>

																				<div class="form-group">
																					<label for="roadpark">Manhole Shape</label> <input
																						type="text" class="form-control"
																						id="manholeUp_shape"
																						placeholder="Enter Manhole Shape">
																				</div>
																				<div class="form-group">
																					<label for="parkNo">Wall Construction
																						Material</label> <input type="text" class="form-control"
																						id="manholeUp_Wall_con"
																						placeholder="Enter Wall Construction Material">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="park_area">Date Installed</label> <input
																						type="text" class="form-control datepicker-dept"
																						id="manholeUp_Dateinstall"
																						placeholder="Enter Date Installed">
																				</div>
																				<div class="form-group">
																					<label for="park_entries">Manhole Type</label> <input
																						type="text" class="form-control"
																						id="manholeUp_type"
																						placeholder="Enter Manhole Type">
																				</div>

																				<div class="form-group">
																					<label for="park_structure">Last
																						maintenance</label> <input type="text"
																						class="form-control datepicker-dept" id="manholeUp_Lastmain"
																						placeholder="Enter Last maintenance">
																				</div>
																				<div class="form-group">
																					<label for="park_trees">Remarks</label> <input
																						type="text" class="form-control"
																						id="manholeUp_remark"
																						placeholder="Enter Remarks">
																				</div>

																			</div>
																		</div>
																	</div>
																	<button type="button" name="next"
																		class="next action-button float-right">
																		<i class="fa fa-angle-right" aria-hidden="true"></i>
																	</button>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /><!--  <input type="button" name="next"
																		class="next action-button float-right" value=">" /> -->
																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="upScimages_u">Upload Images<span class="mandatory">*</span></label> <input
																				type="file" multiple class="form-control" id="manholeUp_nicImages" name ="manholeUp_nicImages">
																		</div>
																		
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="submit"
																		name="updateManholeSubmit" id ="updateManholeSubmit" class="btn btn-indore mt-3"
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
					
					<!--Department Master  MANHOLE Update Modal  ENDs -->
					
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

<!-- pdf download -->
<script type="text/javascript" src="${context}/js/pdfmake-min.js"></script>
<script type="text/javascript" src="${context}/js/vfs_fonts.js"></script>

<script type="text/javascript" src="${context}/js/moment.min.js"></script>
<script type="text/javascript" src="${context}/js/daterangepicker.min.js"></script>


<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
<script src="${context}/js/utils.js"></script>
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/designer/nic_dept.js"></script>

</body>
</html>