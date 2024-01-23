<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>MPPCB DEPARTMENT</title>

<!-- Page Content -->
<div class="page-content-wrapper">

	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data_translate="_primary" data-toggle="tab" href="#mppcb_mppcbDept">MPPCB</a></li>
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="mppcb_mppcbDept">

					<div class="text-right">
						<button data-toggle="modal" data-target="#mppcb_add_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add </button>
					</div>

					<h6 class="table-title-grid"
						data_translate="_list_of_primary_school">List Mppcb Department</h6>
					<table id="mppcb_dept_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Mppcb Master Modal start -->
					<div class="modal fade" id="mppcb_add_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										MPPCB Information</h4>
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

															<form id="form_depAddMppcb" name="form_depAddMppcb" class="msform form-admin">
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
																					<label for="mpp_Latitude">Latitude</label> <input
																						type="text" class="form-control" id="mpp_Latitude"
																						name="mpp_Latitude" placeholder="Enter Latitude">
																				</div>

																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="mppcb_subLayerId" name="mppcb_subLayerId">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="mpp_Longitude">Longitude</label> <input
																						type="text" class="form-control" id="mpp_Longitude"
																						name="mpp_Longitude" placeholder="Enter Longitude">
																				</div>

																				<div class="form-group">
																					<label for="mpp_ward">Ward</label> <select
																						class="form-control pb-1" id="mpp_ward"
																						name="mpp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
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
																					<label for="mpp_aqi">AQI</label> <input
																						type="text" class="form-control" id="mpp_aqi"
																						name="mpp_aqi" placeholder="Enter AQI">
																				</div>
																				<div class="form-group">
																					<label for="mpp_iiy">Instrument Installation Year</label> <input
																						type="text" class="form-control" id="mpp_iiy"
																						name="mpp_iiy" placeholder="Enter Instrument Installation Year">
																				</div>
																				<div class="form-group">
																					<label for="mpp_lastMain">Last Maintenance</label> <input type="text" class="form-control"
																						id="mpp_lastMain"
																						name="mpp_lastMain"
																						placeholder="Enter Last Maintenance">
																				</div>
																				<div class="form-group">
																					<label for="mpp_mixture">Mixture of Gases</label>
																					<input type="text" class="form-control"
																						id="mpp_mixture" name="mpp_mixture"
																						placeholder="Enter Mixture of Gases">
																				</div>
																				<div class="form-group">
																					<label for="mpp_unitofNo2">Units of NO2</label>
																					<input type="text" class="form-control"
																						id="mpp_unitofNo2" name="mpp_unitofNo2"
																						placeholder="Enter Units of NO2">
																				</div>
																				<div class="form-group">
																					<label for="mpp_unitOfCo">Units of CO</label>
																					<input type="text" class="form-control"
																						id="mpp_unitOfCo" name="mpp_unitOfCo"
																						placeholder="Enter Units of CO">
																				</div>
																				<div class="form-group">
																					<label for="mpp_unitOfPM2.5">Units of PM2.5</label> <input
																						type="text" class="form-control"
																						id="mpp_unitOfPM2.5" name="mpp_unitOfPM2.5"
																						placeholder="Enter Units of PM2.5">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																					<label for="mpp_unitOfO3">Units of O3</label> <input type="text"
																						class="form-control" id="mpp_unitOfO3"
																						name="mpp_unitOfO3"
																						placeholder="Enter Units of O3">
																				</div>
																				<div class="form-group">
																					<label for="mpp_unitOfPM10">Units of PM10</label>
																					<input type="text" class="form-control"
																						id="mpp_unitOfPM10" name="mpp_unitOfPM10"
																						placeholder="Enter Units of PM10">
																				</div>
																				<div class="form-group">
																					<label for="mpp_wqa">Water Quality Assessment
																						For Diversion</label> <input type="text"
																						class="form-control" id="mpp_wqa"
																						name="mpp_wqa"
																						placeholder="Enter Water Quality Assessment">
																				</div>
																				<div class="form-group">
																					<label for="mpp_mom">Mixer of Minerals</label> <input type="text"
																						class="form-control" id="mpp_mom"
																						name="mpp_mom"
																						placeholder="Enter Mixer of Minerals">
																				</div>
																				<div class="form-group">
																					<label for="mpp_dataVal">Data Validation Authority</label>
																					<input type="text" class="form-control"
																						id="mpp_dataVal" name="mpp_dataVal"
																						placeholder="Enter Data Validation Authority">
																				</div>
																				<div class="form-group">
																					<label for="mpp_remarks">Remarks</label>
																					<textarea class="form-control" rows="2" name="mpp_remarks"
																						id="mpp_remarks" placeholder="Enter Remarks"></textarea>
																				</div>
																				

																			</div>
																		</div>
																	</div>
																	
																	<button type="button" name="previous" class="previous action-button-previous float-left">\
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
																				type="file" class="form-control" id="mpp_mppcbImage"
																				name="mpp_mppcbImage">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																		
																	<button type="button" name="previous"	class="previous action-button-previous float-left">
																	 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" name="finalinfosubmit" class="btn btn-indore mt-3"	value="Submit" />
																		
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
					<!--Mppcb Master Modal end -->

					<!--Mppcb Update Modal start -->
					
					<div class="modal fade" id="mppcb_update_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add
										MPPCB Information</h4>
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
															<form class="form-admin">		<div class="form-group">		<label for="selectType" data_translate="_select_type"
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

															<form id="form_depUpdateMppcb" name="form_depUpdateMppcb" class="msform form-admin">
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
																					<label for="mppUp_Latitude">Latitude</label> <input
																						type="text" class="form-control" id="mppUp_Latitude"
																						name="mppUp_Latitude" placeholder="Enter Latitude">
																				</div>

																				
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="mppcbUp_subLayerId" name="mppcbUp_subLayerId">
																				</div>
																				
																				
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="mppcbUp_mppcbId" name="mppcbUp_mppcbId">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="mppUp_Longitude">Longitude</label> <input
																						type="text" class="form-control" id="mppUp_Longitude"
																						name="mppUp_Longitude" placeholder="Enter Longitude">
																				</div>

																				<div class="form-group">
																					<label for="mppUp_ward">Ward</label> <select
																						class="form-control pb-1" id="mppUp_ward"
																						name="mppUp_ward">
																						<option>Select Ward</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
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
																					<label for="mppUp_aqi">AQI</label> <input
																						type="text" class="form-control" id="mppUp_aqi"
																						name="mppUp_aqi" placeholder="Enter AQI">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_iiy">Instrument Installation Year</label> <input
																						type="text" class="form-control" id="mppUp_iiy"
																						name="mppUp_iiy" placeholder="Enter Instrument Installation Year">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_lastMain">Last Maintenance</label> <input type="text" class="form-control"
																						id="mppUp_lastMain"
																						name="mppUp_lastMain"
																						placeholder="Enter Last Maintenance">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_mixture">Mixture of Gases</label>
																					<input type="text" class="form-control"
																						id="mppUp_mixture" name="mppUp_mixture"
																						placeholder="Enter Mixture of Gases">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_unitofNo2">Units of NO2</label>
																					<input type="text" class="form-control"
																						id="mppUp_unitofNo2" name="mppUp_unitofNo2"
																						placeholder="Enter Units of NO2">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_unitOfCo">Units of CO</label>
																					<input type="text" class="form-control"
																						id="mppUp_unitOfCo" name="mppUp_unitOfCo"
																						placeholder="Enter Units of CO">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_unitOfPM2.5">Units of PM2.5</label> <input
																						type="text" class="form-control"
																						id="mppUp_unitOfPM2.5" name="mppUp_unitOfPM2.5"
																						placeholder="Enter Units of PM2.5">
																				</div>
																			</div>

																			<div class="col-sm-12 col-lg-6">
																			<div class="form-group">
																					<label for="mppUp_unitOfO3">Units of O3</label> <input type="text"
																						class="form-control" id="mppUp_unitOfO3"
																						name="mppUp_unitOfO3"
																						placeholder="Enter Units of O3">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_unitOfPM10">Units of PM10</label>
																					<input type="text" class="form-control"
																						id="mppUp_unitOfPM10" name="mppUp_unitOfPM10"
																						placeholder="Enter Units of PM10">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_wqa">Water Quality Assessment
																						For Diversion</label> <input type="text"
																						class="form-control" id="mppUp_wqa"
																						name="mppUp_wqa"
																						placeholder="Enter Water Quality Assessment">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_mom">Mixer of Minerals</label> <input type="text"
																						class="form-control" id="mppUp_mom"
																						name="mppUp_mom"
																						placeholder="Enter Mixer of Minerals">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_dataVal">Data Validation Authority</label>
																					<input type="text" class="form-control"
																						id="mppUp_dataVal" name="mppUp_dataVal"
																						placeholder="Enter Data Validation Authority">
																				</div>
																				<div class="form-group">
																					<label for="mppUp_remarks">Remarks</label>
																					<textarea class="form-control" rows="2" name="mppUp_remarks"
																						id="mppUp_remarks" placeholder="Enter Remarks"></textarea>
																				</div>
																				

																			</div>
																		</div>
																	</div>
																	
																	<button type="button" name="previous" class="previous action-button-previous float-left">\
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
																			<label for="mppUp_mppcbImage">Upload Images</label> <input
																				type="file" class="form-control" id="mppUp_mppcbImage"
																				name="mppUp_mppcbImage">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																		
																	<button type="button" name="previous"	class="previous action-button-previous float-left">
																	 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" name="finalinfosubmit" class="btn btn-indore mt-3"	value="Submit" />
																		
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



					<!--Mppcb Update Modal end -->

				</div>

			</div>
			<!-- Tab panes end-->
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