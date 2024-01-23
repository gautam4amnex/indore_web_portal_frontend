<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Restaurants</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link tab-data active"
					data-toggle="tab" href="#poi_restaurants">Restaurants</a></li>

			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="poi_restaurants">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_addRestaurant_modal"
							class="btn-add btn-indore-table">Add Restaurant</button>
					</div>

					<h6 class="table-title-grid">List of Restaurants</h6>
					<table id="dep_restaurant_table" class="display tbl_dep" class="tbl-report"></table>

					<!-- Restaurant Add Modal start -->	

					<div class="modal fade" id="dep_addRestaurant_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add Restaurant</h4>
								<button type="button" class="close" onclick="resetForm('form_addRestaurant')" data-dismiss="modal">&times;</button>


								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_addRestaurant" name="form_addRestaurant" class="msform form-admin">
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
																						type="text" class="form-control" id="restaurant_latitude" name="restaurant_latitude"
																						placeholder="Enter Latitude" >
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="restaurant_ward" name="restaurant_ward" >
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="restaurant_longitude" name="restaurant_longitude"
																						placeholder="Enter Longitude" >
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="restaurant_subLayerId" name="restaurant_subLayerId">
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
																					<label for="hsName">Restaurant Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="restaurant_name"
																						name="restaurant_name" placeholder="Enter Restaurant Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="scCategory">Type of Restaurant</label> <select
																						class="form-control pb-1" id="restaurant_typeOfRestaurant" name="restaurant_typeOfRestaurant">
																						<option>Select</option>
																						<option value="Vegetarian">Vegetarian</option>
																						<option value="Non-Vegetarian">Non-Vegetarian</option>
																					</select>
																				</div>
																				
																				
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scCategory">Facilities</label> <select
																						class="form-control pb-1" id="restaurant_facilities" name="restaurant_facilities">
																						<option>Select</option>
																						<option value="Home Delivery">Home Delivery</option>
																						<option value="Take Away">Take Away</option>
																						<option value="Eatery">Eatery</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="restaurant_address" name="restaurant_address"
																						placeholder="Enter Address"></textarea>
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
																				type="file" multiple class="form-control" id="restaurant_geoTaggedPhoto" 
																				name="restaurant_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" id="add_data_restaurant_submit" name="add_data_restaurant_submit"
																		 class="btn btn-indore mt-3"
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

					<!-- Restaurant Add Modal end -->

					
					<!-- Restaurant Update Modal start -->
					
					<div class="modal fade" id="dep_updateRestaurant_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Update Restaurant</h4>
									<button type="button" class="close" onclick="resetForm('form_updateRestaurant')" data-dismiss="modal">&times;</button>

								</div>
								<div class="modal-body">
									<!-- MultiStep Form start-->
									<div class="container-fluid" id="grad1">
										<div class="row justify-content-center mt-0">
											<div class="col-12 text-center p-0 mt-3 mb-2">
												<div class="card px-0 pb-0">
													<div class="row">

														<div class="col-md-12 mx-0">

															<form id="form_updateRestaurant" name="form_updateRestaurant" class="msform form-admin">
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
																						type="text" class="form-control" id="restaurantUp_latitude" name="restaurantUp_latitude"
																						placeholder="Enter Latitude">
																				</div>

																				<div class="form-group">
																					<label for="lowardName">Ward</label> <select
																						class="form-control pb-1" id="restaurantUp_ward" name="restaurantUp_ward">
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="restaurantUp_longitude" name="restaurantUp_longitude"
																						placeholder="Enter Longitude">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="restaurantUp_subLayerId" name="restaurantUp_subLayerId">
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="restaurantUp_restaurantId" name="restaurantUp_restaurantId">
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
																					<label for="hsName">Restaurant Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="restaurantUp_name"
																						name="restaurantUp_name" placeholder="Enter Restaurant Name">
																				</div>
																				
																				<div class="form-group">
																					<label for="scCategory">Type of Restaurant</label> <select
																						class="form-control pb-1" id="restaurantUp_typeOfRestaurant" name="restaurantUp_typeOfRestaurant">
																						<option>Select</option>
																						<option value="Vegetarian">Vegetarian</option>
																						<option value="Non-Vegetarian">Non-Vegetarian</option>
																					</select>
																				</div>
																				
																				
																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="scCategory">Facilities</label> <select
																						class="form-control pb-1" id="restaurantUp_facilities" name="restaurantUp_facilities">
																						<option>Select</option>
																						<option value="Home Delivery">Home Delivery</option>
																						<option value="Take Away">Take Away</option>
																						<option value="Eatery">Eatery</option>
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<label for="hsAddress">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="restaurantUp_address" name="restaurantUp_address"
																						placeholder="Enter Address"></textarea>
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
																				type="file" multiple class="form-control" id="restaurantUp_geoTaggedPhoto" 
																				name="restaurantUp_geoTaggedPhoto">
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" id="add_data_restaurantUp_submit" name="add_data_restaurantUp_submit"
																		 class="btn btn-indore mt-3"
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

					
					<!-- Restaurant Update Modal end -->
					


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

<script type="text/javascript" src="${context}/js/designer/restaurant_dep.js"></script>

</body>
</html>