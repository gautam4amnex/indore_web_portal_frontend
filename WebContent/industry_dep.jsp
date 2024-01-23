<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Industry Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data_translate="_primary" data-toggle="tab"
					href="#industry_industialPark">Industrial Parks</a></li>
<!-- 				<li class="nav-item"><a class="nav-link" data-toggle="tab" -->
<!-- 					data_translate="_secondary" href="#industry_msme">MSME</a></li> -->
<!-- 				<li class="nav-item"><a class="nav-link" data-toggle="tab" -->
<!-- 					data_translate="_colleges" href="#industry_sez">SEZ</a></li> -->
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active"
					id="industry_industialPark">

					<div class="text-right">
						<button data-toggle="modal" data-target="#ind_infoadd_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Industrial Parks</button>
					</div>

					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List of Industrial Parks</h6>
					<table id="dep_ind_park_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Industry Department Master Modal start -->
					<div class="modal fade" id="ind_infoadd_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add IndustialPark Information</h4>
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
																<div class="form-group">
																	<label for="selectType" data_translate="_select_type"
																		class="ml-2">Select Type</label> <select
																		class="form-control pb-1" id="selectType"
																		name="selectType">
																		<option data_translate="_select_type">Select
																			Type</option>
																		<option value=" ">2</option>
																		<option value=" ">3</option>
																		<option value=" ">4</option>
																	</select>
																</div>
															</form>
														</div>
														<div class="col-md-12 mx-0">

															<form id="form_AddIndustrial" name = form_AddIndustrial class="msform form-admin">
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
																					<label for="ind_Latitude">Latitude</label> <input
																						type="text" class="form-control" id="ind_Latitude"
																						name="ind_Latitude" placeholder="Enter Latitude">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="ind_Longitude">Longitude</label> <input
																						type="text" class="form-control" id="ind_Longitude"
																						name="ind_Longitude" placeholder="Enter Longitude">
																				</div>

																				<div class="form-group">
																					<label for="ind_ward">Ward</label> <select
																						class="form-control pb-1" id="ind_ward"
																						name="ind_ward">
																					</select>
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="industrial_subLayerId" name="subLayerId">
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
																					<label for="ind_Sector">Industrial Sectors</label> <select
																						class="form-control pb-1" id="ind_Sector"
																						name="ind_Sector">
																						<option>Select Industrial Sector</option>
																						<option value=" ">2</option>
																								<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="ind_owType">Ownership Type</label> <select
																						class="form-control pb-1" id="ind_owType"
																						name="ind_owType">
																						<option>Select Ownership Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="ind_inType">Industrial Type</label> <select
																						class="form-control pb-1" id="ind_inType"
																						name="ind_inType">
																						<option>Select Industrial Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="ind_mfUnits">Manufacturing Units</label> <select
																						class="form-control pb-1" id="ind_mfUnits"
																						name="ind_mfUnits">
																						<option>Select Manufacturing Unit</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="ind_inAreaHec">Industrial Area
																						(Hectare's)</label> <input type="text"
																						class="form-control" id="ind_inAreaHec"
																						name="ind_inAreaHec"
																						placeholder="Enter Industrial Area">
																				</div>
																				<div class="form-group">
																					<label for="ind_rcYear">Recognized Year</label> <select
																						class="form-control pb-1" id="ind_rcYear"
																						name="ind_rcYear">
																						<option>Select Recognized Year</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="ind_Employee">Employees</label> <input
																						type="text" class="form-control" id="ind_Employee"
																						name="ind_Employee"
																						placeholder="Enter Employee Name">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">


																				<div class="form-group">
																					<label for="ind_PhoneNo">Phone No</label> <input
																						type="text" class="form-control" id="ind_PhoneNo"
																						name="ind_PhoneNo" placeholder="Enter Phone Number">
																				</div>
																				<div class="form-group">
																					<label for="ind_Status">Status of Approval</label> <input
																						type="text" class="form-control" id="ind_Status"
																						name="ind_Status"
																						placeholder="Enter Status of Approval">
																				</div>
																				<div class="form-group">
																					<label for="ind_MsmeName">MSME Name</label> <input
																						type="text" class="form-control" id="ind_MsmeName"
																						name="ind_MsmeName" placeholder="Enter MSME Name">
																				</div>
																				<div class="form-group">
																					<label for="ind_sezUnit">SEZ Unit</label> <input
																						type="text" class="form-control" id="ind_sezUnit"
																						name="ind_sezUnit" placeholder="Enter SEZ Unit ">
																				</div>
																				<div class="form-group">
																					<label for="ind_SezEntity">SEZ Entity
																						Name</label> <input type="text" class="form-control"
																						name="ind_SezEntity" id="ind_SezEntity"
																						placeholder="Enter SEZ Entity Name">
																				</div>
																				<div class="form-group">
																					<label for="ind_sezAddress">SEZ Entity Address</label>
																					<input type="text" class="form-control"
																						id="ind_sezAddress" name="ind_sezAddress"
																						placeholder="Enter SEZ Entity Address">
																				</div>
																				<div class="form-group">
																					<label for="ind_typeOfSez">Type of SEZ</label> <select
																						class="form-control pb-1" id="ind_typeOfSez"
																						name="ind_typeOfSez">
																						<option>Select Type of SEZ</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
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
																			<label for="ind_images">Upload Images</label> <input
																				type="file" class="form-control" id="ind_images"
																				name="ind_images">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																		
																	<button type="button" name="previous" class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" name="finalinfosubmit" class="btn btn-indore mt-3" value="Submit" />
																		
																		
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
					<!--Industry Department Master Modal end -->

				</div>



				<div class="tab-pane container-fluid fade" id="industry_msme">
					<div class="text-right">
						<button data-toggle="modal" data-target="#industry_msme_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add	MSME</button>
					</div>

					<h6 class="table-title-grid">List of MSME</h6>
					<table id="dep_msme_table" name="dep_msme_table" class="display tbl_dep" class="tbl-report"></table>

					<!--industry_msme Master Modal start -->
					<div class="modal fade" id="industry_msme_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add MSME</h4>
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
																<div class="form-group">
																	<label for="selectType" data_translate="_select_type"
																		class="ml-2">Select Type</label> <select
																		class="form-control pb-1" id="selectType"
																		name="selectType">
																		<option data_translate="_select_type">Select
																			Type</option>
																		<option value=" ">2</option>
																		<option value=" ">3</option>
																		<option value=" ">4</option>
																	</select>
																</div>
															</form>
														</div>
														<div class="col-md-12 mx-0">

															<form id="msme_AddForm" name= "msme_AddForm" class="msform form-admin">
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
																					<label for="msmse_Latitude">Latitude</label> <input
																						type="text" class="form-control" id="msmse_Latitude"
																						name="msmse_Latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="msme_Zone">Zone</label> <select
																						class="form-control pb-1" id="msme_Zone"
																						name="msme_Zone">
																						<option>Select zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>


																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="msme_Longitude">Longitude</label> <input
																						type="text" class="form-control" id="msme_Longitude"
																						name="msme_Longitude" placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="msme_ward">Ward</label> <select
																						class="form-control pb-1" id="msme_ward"
																						name="msme_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="msme_subLayerId" name="msme_subLayerId">
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
																					<label for="msme_biSector">Industrial
																						Sectors</label> <select class="form-control pb-1"
																						id="msme_biSector" name="msme_biSector">
																						<option>Select Industrial Sector</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="msme_OsType">Ownership Type</label> <select
																						class="form-control pb-1" id="msme_OsType"
																						name="msme_OsType">
																						<option>Select Ownership Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="msme_inType">Industrial Type</label> <select
																						class="form-control pb-1" id="msme_inType"
																						name="msme_inType">
																						<option>Select Industrial Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>

																				<div class="form-group">
																					<label for="msme_AreaHec">Industrial Area
																						(Hectare's)</label> <input type="text"
																						class="form-control" id="msme_AreaHec"
																						name="msme_AreaHec"
																						placeholder="Enter Industrial Area">
																				</div>
																				<div class="form-group">
																					<label for="msme_RcYear">Recognized Year</label> <select
																						class="form-control pb-1" id="msme_RcYear"
																						name="msme_RcYear">
																						<option>Select Recognized Year</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="msme_Employee">Employees</label> <input
																						type="text" class="form-control" id="msme_Employee"
																						name="msme_Employee"
																						placeholder="Enter Employee Name">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">


																				<div class="form-group">
																					<label for="msme_PhoneNo">Phone No</label> <input
																						type="text" class="form-control" id="msme_PhoneNo"
																						name="msme_PhoneNo"
																						placeholder="Enter Phone Number">
																				</div>
																				<div class="form-group">
																					<label for="msme_Status">Status of Approval</label>
																					<input type="text" class="form-control"
																						id="msme_Status" name="msme_Status"
																						placeholder="Enter Status of Approval">
																				</div>
																				<div class="form-group">
																					<label for="msme_msmeName">MSME Name</label> <input
																						type="text" class="form-control" id="msme_msmeName"
																						name="msme_msmeName" placeholder="Enter MSME Name">
																				</div>
																				<div class="form-group">
																					<label for="msme_Unit">List Of MSME Units</label> <input
																						type="text" class="form-control" id="msme_Unit"
																						name="msme_Unit" placeholder="Enter MSME Unit ">
																				</div>
																				<div class="form-group">
																					<label for="msme_EntityName">MSME Entity
																						Name</label> <input type="text" class="form-control"
																						name="msme_EntityName" id="msme_EntityName"
																						placeholder="Enter MSME Entity Name">
																				</div>
																				<div class="form-group">
																					<label for=msme_Address">MSME Entity
																						Address</label> <input type="text" class="form-control"
																						id="msme_Address" name="msme_Address"
																						placeholder="Enter MSME Entity Address">
																				</div>
																				<div class="form-group">
																					<label for="msme_typeOfmsme">Type of MSME</label> <select
																						class="form-control pb-1" id="msme_typeOfmsme"
																						name="msme_typeOfmsme">
																						<option>Select Type of MSME</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
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
																			<label for="upScimages">Upload Images</label> <input
																				type="file" class="form-control" id="msme_images"
																				name="msme_images">
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
					<!--industry_msme Master Modal end -->
				</div>






				<div class="tab-pane container-fluid fade" id="industry_sez">
					<div class="text-right">
						<button data-toggle="modal" data-target="#industry_sez_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add SEZ</button>
					</div>
					
					<h6 class="table-title-grid">List of SEZ</h6>
					<table id="dep_sez_table" name="dep_sez_table" class="display tbl_dep" class="tbl-report"></table>
					
					<!--Sez Master Modal start -->
					<div class="modal fade" id="industry_sez_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add SEZ</h4>
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
																<div class="form-group">
																	<label for="selectType" data_translate="_select_type"
																		class="ml-2">Select Type</label> <select
																		class="form-control pb-1" id="selectType"
																		name="selectType">
																		<option data_translate="_select_type">Select
																			Type</option>
																		<option value=" ">2</option>
																		<option value=" ">3</option>
																		<option value=" ">4</option>
																	</select>
																</div>
															</form>
														</div>
														<div class="col-md-12 mx-0">

															<form id="msform" class="msform form-admin">
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
																					<label for="sez_Latitude">Latitude</label> <input
																						type="text" class="form-control" id="sez_Latitude"
																						name="sez_Latitude" placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="sez_ZoneName">Zone</label> <select
																						class="form-control pb-1" id="sez_ZoneName"
																						name="sez_ZoneName">
																						<option>Select zone</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>


																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="sez_Longitude">Longitude</label> <input
																						type="text" class="form-control" id="sez_Longitude"
																						name="sez_Longitude" placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="sez_wardName">Ward</label> <select
																						class="form-control pb-1" id="sez_wardName"
																						name="sez_wardName">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group"> <input type="hidden" class="form-control"
																				id="sez_subLayerId" name="sez_subLayerId">
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
																					<label for="sez_inSector">Industrial Sectors</label>
																					<select class="form-control pb-1" id="sez_inSector"
																						name="sez_inSector">
																						<option>Select Industrial Sector</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sez_OsType">Ownership Type</label> <select
																						class="form-control pb-1" id="sez_OsType"
																						name="sez_OsType">
																						<option>Select Ownership Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sez_inType">Industrial Type</label> <select
																						class="form-control pb-1" id="sez_inType"
																						name="sez_inType">
																						<option>Select Industrial Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sez_ManUnits">Manufacturing
																						Units </label> <select class="form-control pb-1"
																						id="sez_ManUnits" name="sez_ManUnits">
																						<option>Select Manufacturing Units</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sez_AreaHec">Industrial Area
																						(Hectare's)</label> <input type="text"
																						class="form-control" id="sez_AreaHec"
																						name="sez_AreaHec"
																						placeholder="Enter Industrial Area">
																				</div>
																				<div class="form-group">
																					<label for="sez_RcYear">Recognized Year</label> <select
																						class="form-control pb-1" id="sez_RcYear"
																						name="sez_RcYear">
																						<option>Select Recognized Year</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sez_Employee">Employees</label> <input
																						type="text" class="form-control" id="sez_Employee"
																						name="sez_Employee"
																						placeholder="Enter Employee Name">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">


																				<div class="form-group">
																					<label for="sez_PhoneNo">Phone No</label> <input
																						type="text" class="form-control" id="sez_PhoneNo"
																						name="sez_PhoneNo" placeholder="Enter Phone Number">
																				</div>
																				<div class="form-group">
																					<label for="sez_Status">Status of Approval</label> <input
																						type="text" class="form-control" id="sez_Status"
																						name="sez_Status"
																						placeholder="Enter Status of Approval">
																				</div>
																				<div class="form-group">
																					<label for="sez_Unit">sez_ Unit</label> <input
																						type="text" class="form-control" id="sez_Unit"
																						name="sez_Unit" placeholder="Enter SEZ Unit ">
																				</div>
																				<div class="form-group">
																					<label for="sez_EntityName">SEZ Entity Name</label>
																					<input type="text" class="form-control"
																						name="sez_EntityName" id="sez_EntityName"
																						placeholder="Enter SEZ Entity Name">
																				</div>
																				<div class="form-group">
																					<label for="sez_Address">SEZ Entity Address</label>
																					<input type="text" class="form-control"
																						id="sez_Address" name="sez_Address"
																						placeholder="Enter SEZ Entity Address">
																				</div>
																				<div class="form-group">
																					<label for="sez_typeOfSez">Type of SEZ</label> <select
																						class="form-control pb-1" id="sez_typeOfSez"
																						name="sez_typeOfSez">
																						<option>Select Type of SEZ</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																			</div>
																		</div>
																	</div>
																	<button type="button" name="previous"	class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<button type="button" name="next"	class="next action-button float-right">
																	<i class="fa fa-angle-right" aria-hidden="true"></i>
																	</button>
																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="sez_images">Upload Images</label> <input
																				type="file" class="form-control" id="sez_images"
																				name="sez_images">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																	<button type="button" name="previous" class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" name="finalinfosubmit" class="btn btn-indore mt-3"
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

<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>

<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript"
	src="${context}/js/developer/dep_formValidations.js"></script>

<script type="text/javascript" src="${context}/js/designer/add-data.js"></script>

</body>
</html>