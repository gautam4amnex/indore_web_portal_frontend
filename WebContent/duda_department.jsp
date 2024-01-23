<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>DUDA Data</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data_translate="_primary" data-toggle="tab" href="#scPrimary">Water Supply Line</a></li>
				<!-- <li class="nav-item"><a class="nav-link" data-toggle="tab" 
					data_translate="_secondary" href="#scSecondary">Secondary</a></li>
				<li class="nav-item"><a class="nav-link" data-toggle="tab"
					data_translate="_colleges" href="#scCollages">Colleges</a></li>
				<li class="nav-item"><a class="nav-link" data-toggle="tab"
					data_translate="_universities" href="#scUniversities">Universities</a></li> -->
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="scPrimary">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_infoadd_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Data</button>
					</div>
					<h6 class="table-title-grid" data_translate="_list_of_primary_school">List of Water Supply Line</h6>
					<table id="dep_adddata" class="display tbl_dep" class="tbl-report"></table>

					<!--Department Master Modal start -->
					<div class="modal fade" id="dep_infoadd_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">


							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Information</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

													<!-- 	<div class="col-4 text-left ml-3">
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

															<form id="msform" class="msform form-admin">
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
																					<label for="lo_ward">Ward No</label> <select
																						class="form-control pb-1" id="loWardno">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="lo_zone">Zone No</label> <select
																						class="form-control pb-1" id="loZoneno">
																						<option>Select Zone No</option>
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
																					<label for="roaddName">Road Name</label> <input
																						type="text" class="form-control" id="rdName"
																						placeholder="Enter Road Name">
																				</div>
																				<div class="form-group">
																					<label for="roadNo">Road No</label>  <input
																						type="text" class="form-control" id="rdNo"
																						placeholder="Enter Road No">
																				</div>
																				<div class="form-group">
																					<label for="pipAge">Pipe Age</label>  <input
																						type="text" class="form-control" id="ppAge"
																						placeholder="Enter Pipe Age">
																				</div>
																				<div class="form-group">
																					<label for="pipType">Pipe Type</label> 
																					<select class="form-control pb-1"
																						id="ppType">
																						<option>Select Pipe Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="waterslid">Water Supply Line ID</label> <input
																						type="text" class="form-control" id="wslid"
																						placeholder="Enter Water Supply Line ID">
																				</div>
																				<div class="form-group">
																					<label for="slope_add">Slope</label> <input
																						type="text" class="form-control" id="slope"
																						placeholder="Enter slope">
																				</div>
																				<div class="form-group">
																				<label for="lengthim_add">Length in Meters</label> <input
																					type="text" class="form-control" id="lengthim"
																					placeholder="Enter Length in Meters">
																			</div>
																			<div class="form-group">
																				<label for="depthim_add">Depth in Meters</label> <input
																					type="text" class="form-control" id="depthim"
																					placeholder="Enter Depth in Meters">
																			</div>
																			<div class="form-group">
																				<label for="pressure_add">Pressure</label> <input
																					type="text" class="form-control" id="pressure"
																					placeholder="Pressure">
																			</div>
																			<div class="form-group">
																				<label for="roughness_add">Roughness</label> <input
																					type="text" class="form-control" id="roughness"
																					placeholder="Roughness">
																			</div>
																				<div class="form-group">
																					<label for="jointlen_add">Joint Length</label> <input
																						type="text" class="form-control" id="jointlen"
																						placeholder=" Enter Joint Length">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="layer_add">Layer</label> <input
																						type="text" class="form-control" id="layer"
																						placeholder="Enter Layer">
																				</div>
																				<div class="form-group">
																					<label for="roadSide_add">Roadside</label> <input
																						type="text" class="form-control" id="roadSide"
																						placeholder="Enter Roadside">
																				</div>
																				<div class="form-group">
																					<label for="upstream_add">Upstream</label> <input
																						type="text" class="form-control" id="upstream"
																						placeholder="Enter Upstream">
																				</div>
																				<div class="form-group">
																					<label for="downstream_add">Downstream</label> <input
																						type="text" class="form-control" id="downstream"
																						placeholder="Enter Downstream">
																				</div>
																				<div class="form-group">
																					<label for="enabled_add">Enabled</label> <input
																						type="text" class="form-control" id="enabled"
																						placeholder="Enter Enabled">
																				</div>
																				<div class="form-group">
																					<label for="dateInstalled_add">Date Installed </label> <input
																						type="text" class="form-control" id="dateInstalled"
																						placeholder="Enter Date Installed ">
																				</div>
																				
																				<div class="form-group">
																					<label for="diameterIn_add">Diameter in mm</label> <input
																						type="text" class="form-control" id="diameterIn"
																						placeholder="Enter Diameter in mm ">
																				</div>
																				<div class="form-group">
																					<label for="pipemat_add">Pipe Material </label> <input
																						type="text" class="form-control" id="pipemat"
																						placeholder="Enter Pipe Material  ">
																				</div>
																				<div class="form-group">
																					<label for="passper_add">Passing
																						Percentage</label> <input type="text" class="form-control"
																						id="passpercent_add"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="teach_add">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="teachingStaff"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="nonteach_add">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="nonteachingStaff"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset>
															<%-- 	<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Facilities & Services</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scFacility">Facility Name</label>
																					<textarea class="form-control" rows="2"
																						id="scFacility" placeholder="Enter Facility"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scServices">Services</label>
																					<textarea class="form-control" rows="2"
																						id="scServices" placeholder="Enter Services"></textarea>
																				</div>
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset> --%>
															<%-- 	<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Construction</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conBua">Build Up Area<span
																						class="giserror">*</span></label> <input type="text"
																						class="form-control" id="conBua"
																						placeholder="Enter Build Up Area">
																				</div>
																				<div class="form-group">
																					<label for="conFloor">No Of Floors</label> <input
																						type="text" class="form-control" id="conFloor"
																						placeholder="Enter Floors">
																				</div>
																				<div class="form-group">
																					<label for="conSmartcr">No Of Smart Class
																						Room</label> <input type="text" class="form-control"
																						id="conSmartcr"
																						placeholder="Enter Smart Class Room">
																				</div>
																				<div class="form-group">
																					<label for="conClassr">No Of Class Room</label> <input
																						type="text" class="form-control" id="conClassr"
																						placeholder="Enter Class Room">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conType">Type Of Construction</label> <input
																						type="text" class="form-control" id="conType"
																						placeholder="Enter Type">
																				</div>
																				<div class="form-group">
																					<label for="conBcondition">Building
																						Condition</label> <input type="text" class="form-control"
																						id="conBcondition"
																						placeholder="Enter Building Condition">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">No Of Student</label> <input
																						type="text" class="form-control" id="conStudent"
																						placeholder="Enter Student">
																				</div>
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset> --%>
														<%-- 		<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Other</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRte">RTE Complaint</label>
																					<textarea class="form-control" rows="2" id="scRte"
																						placeholder="Description"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scSdmc">RTE SDMC</label>
																					<textarea class="form-control" rows="2" id="scSdmc"
																						placeholder="Description"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scFindings">Finding Scheme</label>
																					<textarea class="form-control" rows="2"
																						id="scFindings" placeholder="Finding Scheme"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRteact">RTE Act</label>
																					<textarea class="form-control" rows="2"
																						id="scRteact" placeholder="Description"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scGer">GER</label>
																					<textarea class="form-control" rows="2" id="scGer"
																						placeholder="Description"></textarea>
																				</div>
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset> --%>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="upScimages">Upload Images</label> <input
																				type="file" class="form-control" id="upScimages_add">
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
					<!--Department Master Modal end -->
					<!--Department Master  Update Modal  start -->
					<div class="modal fade" id="dep_infoadd_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Information</h4>
									<button type="button" class="close" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

													<!-- 	<div class="col-4 text-left ml-3">
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

															<form id="msform" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location_update"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab__update" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_facilities" id="facilitiestab_update" class="tabwithborder"><strong>Facilities</strong></li>
																	<li data_translate="_construction" id="constructiontab_update" class="tabwithborder"><strong>Construction</strong></li>
																	<li data_translate="_other" id="othertab_update" class="tabwithborder"><strong>Other</strong></li>
																	<li data_translate="_images" id="imagestab_update" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																	<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				
																				
																				<div class="form-group">
																					<label for="lo_ward_u">Ward No</label> <select
																						class="form-control pb-1" id="loWardno_up">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="lo_zone_u">Zone No</label> <select
																						class="form-control pb-1" id="loZoneno_up">
																						<option>Select Zone No</option>
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
																					<label for="roaddName_u">Road Name</label> <input
																						type="text" class="form-control" id="rdName_up"
																						placeholder="Enter Road Name">
																				</div>
																				<div class="form-group">
																					<label for="roadNo_u">Road No</label>  <input
																						type="text" class="form-control" id="rdNo_up"
																						placeholder="Enter Road No">
																				</div>
																				<div class="form-group">
																					<label for="pipAge_u">Pipe Age</label>  <input
																						type="text" class="form-control" id="ppAge_up"
																						placeholder="Enter Pipe Age">
																				</div>
																				<div class="form-group">
																					<label for="pipType_u">Pipe Type</label> 
																					<select class="form-control pb-1"
																						id="ppType_up">
																						<option>Select Pipe Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="waterslid_u">Water Supply Line ID</label> <input
																						type="text" class="form-control" id="wslid_up"
																						placeholder="Enter Water Supply Line ID">
																				</div>
																				<div class="form-group">
																					<label for="slope_u">Slope</label> <input
																						type="text" class="form-control" id="slope_update"
																						placeholder="Enter slope">
																				</div>
																				<div class="form-group">
																				<label for="lengthim_u">Length in Meters</label> <input
																					type="text" class="form-control" id="lengthim_up"
																					placeholder="Enter Length in Meters">
																			</div>
																			<div class="form-group">
																				<label for="depthim_u">Depth in Meters</label> <input
																					type="text" class="form-control" id="depthim_up"
																					placeholder="Enter Depth in Meters">
																			</div>
																			<div class="form-group">
																				<label for="pressure_u">Pressure</label> <input
																					type="text" class="form-control" id="pressure_up"
																					placeholder="Pressure">
																			</div>
																			<div class="form-group">
																				<label for="roughness_u">Roughness</label> <input
																					type="text" class="form-control" id="roughness_up"
																					placeholder="Roughness">
																			</div>
																				<div class="form-group">
																					<label for="jointlen_u">Joint Length</label> <input
																						type="text" class="form-control" id="jointlen_up"
																						placeholder=" Enter Joint Length">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="layer_u">Layer</label> <input
																						type="text" class="form-control" id="layer_up"
																						placeholder="Enter Layer">
																				</div>
																				<div class="form-group">
																					<label for="roadSide_u">Roadside</label> <input
																						type="text" class="form-control" id="roadSide_up"
																						placeholder="Enter Roadside">
																				</div>
																				<div class="form-group">
																					<label for="upstream_u">Upstream</label> <input
																						type="text" class="form-control" id="upstream_up"
																						placeholder="Enter Upstream">
																				</div>
																				<div class="form-group">
																					<label for="downstream_u">Downstream</label> <input
																						type="text" class="form-control" id="downstream_up"
																						placeholder="Enter Downstream">
																				</div>
																				<div class="form-group">
																					<label for="enabled_u">Enabled</label> <input
																						type="text" class="form-control" id="enabled_up"
																						placeholder="Enter Enabled">
																				</div>
																				<div class="form-group">
																					<label for="dateInstalled_u">Date Installed </label> <input
																						type="text" class="form-control" id="dateInstalled_up"
																						placeholder="Enter Date Installed ">
																				</div>
																				
																				<div class="form-group">
																					<label for="diameterIn_u">Diameter in mm</label> <input
																						type="text" class="form-control" id="diameterIn_up"
																						placeholder="Enter Diameter in mm ">
																				</div>
																				<div class="form-group">
																					<label for="pipemat_u">Pipe Material </label> <input
																						type="text" class="form-control" id="pipemat_up"
																						placeholder="Enter Pipe Material  ">
																				</div>
																				<div class="form-group">
																					<label for="passper_u">Passing
																						Percentage</label> <input type="text" class="form-control"
																						id="passpercent_up"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="teach_u">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="teachingStaff_up"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="nonteach_u">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="nonteachingStaff_up"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset>
															<%-- 	<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Facilities & Services</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scFacility">Facility Name</label>
																					<textarea class="form-control" rows="2"
																						id="scFacility" placeholder="Enter Facility"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scServices">Services</label>
																					<textarea class="form-control" rows="2"
																						id="scServices" placeholder="Enter Services"></textarea>
																				</div>
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset> --%>
															<%-- 	<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Construction</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conBua">Build Up Area<span
																						class="giserror">*</span></label> <input type="text"
																						class="form-control" id="conBua"
																						placeholder="Enter Build Up Area">
																				</div>
																				<div class="form-group">
																					<label for="conFloor">No Of Floors</label> <input
																						type="text" class="form-control" id="conFloor"
																						placeholder="Enter Floors">
																				</div>
																				<div class="form-group">
																					<label for="conSmartcr">No Of Smart Class
																						Room</label> <input type="text" class="form-control"
																						id="conSmartcr"
																						placeholder="Enter Smart Class Room">
																				</div>
																				<div class="form-group">
																					<label for="conClassr">No Of Class Room</label> <input
																						type="text" class="form-control" id="conClassr"
																						placeholder="Enter Class Room">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="conType">Type Of Construction</label> <input
																						type="text" class="form-control" id="conType"
																						placeholder="Enter Type">
																				</div>
																				<div class="form-group">
																					<label for="conBcondition">Building
																						Condition</label> <input type="text" class="form-control"
																						id="conBcondition"
																						placeholder="Enter Building Condition">
																				</div>
																				<div class="form-group">
																					<label for="conStudent">No Of Student</label> <input
																						type="text" class="form-control" id="conStudent"
																						placeholder="Enter Student">
																				</div>
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset> --%>
														<%-- 		<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Other</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRte">RTE Complaint</label>
																					<textarea class="form-control" rows="2" id="scRte"
																						placeholder="Description"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scSdmc">RTE SDMC</label>
																					<textarea class="form-control" rows="2" id="scSdmc"
																						placeholder="Description"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scFindings">Finding Scheme</label>
																					<textarea class="form-control" rows="2"
																						id="scFindings" placeholder="Finding Scheme"></textarea>
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scRteact">RTE Act</label>
																					<textarea class="form-control" rows="2"
																						id="scRteact" placeholder="Description"></textarea>
																				</div>
																				<div class="form-group">
																					<label for="scGer">GER</label>
																					<textarea class="form-control" rows="2" id="scGer"
																						placeholder="Description"></textarea>
																				</div>
																			</div>
																		</div>
																	</div>
																	<input type="button" name="previous"
																		class="previous action-button-previous float-left"
																		value="<-" /> <input type="button" name="next"
																		class="next action-button float-right" value=">" />
																</fieldset> --%>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="upScimages_u">Upload Images</label> <input
																				type="file" class="form-control" id="upScimages_up">
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
					<!--Department Master Modal end -->
					
					
					
					
					

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