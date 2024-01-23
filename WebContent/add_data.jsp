<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Add Data</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data_translate="_primary" data-toggle="tab" href="#scPrimary">Primary</a></li>
				<li class="nav-item"><a class="nav-link" data-toggle="tab" 
					data_translate="_secondary" href="#scSecondary">Secondary</a></li>
				<li class="nav-item"><a class="nav-link" data-toggle="tab"
					data_translate="_colleges" href="#scCollages">Colleges</a></li>
				<li class="nav-item"><a class="nav-link" data-toggle="tab"
					data_translate="_universities" href="#scUniversities">Universities</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="scPrimary">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_infoadd_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Data</button>
					</div>

					<h6 class="table-title-grid" data_translate="_list_of_primary_school">List of Primary School</h6>
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

														<div class="col-4 text-left ml-3">
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
														</div>
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
																					<label for="location_name" data_translate="_location_name">Location Name</label> <input
																						type="text" class="form-control"
																						id="location_name" placeholder="Enter Location">
																				</div>
																				<div class="form-group">
																					<label for="loLatitude">Latitude</label> <input
																						type="text" class="form-control" id="loLatitude"
																						placeholder="Enter Latitude">
																				</div>
																				<div class="form-group">
																					<label for="loTehsil">Tehsil</label> <select
																						class="form-control pb-1" id="loTehsil">
																						<option>Select Tehsil</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="lowardName">Ward Name</label> <select
																						class="form-control pb-1" id="lowardName">
																						<option>Select Ward Name</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="loZoneName">Zone Name</label> <select
																						class="form-control pb-1" id="loZoneName">
																						<option>Select zone Name</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="loKhasra">Khasra No</label> <input
																						type="text" class="form-control" id="loKhasra"
																						placeholder="Enter Khasra No">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude</label> <input
																						type="text" class="form-control" id="loLongitude"
																						placeholder="Enter Longitude">
																				</div>
																				<div class="form-group">
																					<label for="loDistrict">District</label> <select
																						class="form-control pb-1" id="loDistrict">
																						<option>Select District</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="loVillage">Village</label> <select
																						class="form-control pb-1" id="loVillage">
																						<option>Select Village</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="loWardno">Ward No</label> <select
																						class="form-control pb-1" id="loWardno">
																						<option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="loZoneno">Zone No</label> <select
																						class="form-control pb-1" id="loZoneno">
																						<option>Select Zone No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="loPlotno">Plot No</label> <input
																						type="text" class="form-control" id="loPlotno"
																						placeholder="Enter Plot No">
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
																					<label for="scName">School Name</label> <input
																						type="text" class="form-control" id="scName"
																						placeholder="Enter School Name">
																				</div>
																				<div class="form-group">
																					<label for="scType">School Type</label> <select
																						class="form-control pb-1" id="scType">
																						<option>Select School Type</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sbMang">School Management</label> <select
																						class="form-control pb-1" id="sbMang">
																						<option>Select School Management</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="principalName">Principal Name</label> <input
																						type="text" class="form-control"
																						id="principalName"
																						placeholder="Enter Principal Name">
																				</div>
																				<div class="form-group">
																					<label for="scYearre">Year Of
																						Reorganization</label> <select class="form-control pb-1"
																						id="scYearre">
																						<option>Select Reorganization</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">In Take Students</label> <input
																						type="text" class="form-control" id="sctStudent"
																						placeholder="Students">
																				</div>
																				<div class="form-group">
																					<label for="sctStudent">Staff Vacancy</label> <input
																						type="text" class="form-control" id="sctStudent"
																						placeholder="Enter no of staff vacancy">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scConNo">School Contact No</label> <input
																						type="text" class="form-control" id="scConNo"
																						placeholder="Enter School Contact No">
																				</div>
																				<div class="form-group">
																					<label for="scCategory">Select Category</label> <select
																						class="form-control pb-1" id="scCategory">
																						<option>Select Category</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>
																				<div class="form-group">
																					<label for="scMoi">Medium Of Instruction</label> <input
																						type="text" class="form-control" id="scMoi"
																						placeholder="Enter Medium Of Instruction">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Principal
																						Contact No</label> <input type="text" class="form-control"
																						id="scPrincipalNo"
																						placeholder="Enter Principal Contact No">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Passing
																						Percentage</label> <input type="text" class="form-control"
																						id="scPrincipalNo"
																						placeholder="Enter Passing Percentage">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Teaching Staff</label> <input
																						type="text" class="form-control"
																						id="scPrincipalNo"
																						placeholder="Enter No Of Teaching Staff">
																				</div>
																				<div class="form-group">
																					<label for="scPrincipalNo">Non Teaching
																						Staff</label> <input type="text" class="form-control"
																						id="scPrincipalNo"
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
																<fieldset>
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
																</fieldset>
																<fieldset>
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
																</fieldset>
																<fieldset>
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
																</fieldset>
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Images</h2>
																		<div class="form-group">
																			<label for="upScimages">Upload Images</label> <input
																				type="file" class="form-control" id="upScimages">
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