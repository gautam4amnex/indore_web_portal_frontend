<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<c:set value="${pageContext.request.contextPath}" var="context" />
<c:set var="language" value="${lang eq 'en' or lang eq 'gu' ? lang : pageContext.request.locale.language}" scope="session" />
<fmt:setLocale value="${language}" />


<!-- car_and_scooter_rentals  start -->
<div class="modal fade" id="car_and_scooter_rentals_modal" role="dialog">
	<div class="modal-dialog modal-dialog-centered modal-lg">

		<!-- Modal content-->
		<div class="modal-content dep-modal">
			<div class="modal-header">

				<h4 class="modal-title">Car And Scooter Rentals</h4>
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

										<form id="form_car" name="form_car" class="msform form-admin">
											<!-- progressbar -->
											<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic Info</strong></li>
																	<!-- //<li id="constructiontab" class="tabwithborder"><strong>Construction</strong></li>
																	<li id="othertab" class="tabwithborder"><strong>Other</strong></li> -->
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
																	type="text" class="form-control" id="car_latitude" name="latitude"
																	placeholder="Enter Latitude" required>
															</div>

															<div class="form-group">
																<label for="lowardName">Ward</label> <select
																	class="form-control pb-1" id="car_ward" name="ward_id">
																	
																</select>
															</div>
															
														</div>

														<div class="col-sm-12 col-lg-6">
															<div class="form-group">
																<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																	type="text" class="form-control" id="car_longitude" name="longitude"
																	placeholder="Enter Longitude" required>
															</div>
															
															<div class="form-group">
																<input type="hidden" class="form-control" 
																id="car_subLayerId" name="subLayerId">
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
																<label for="typeOfRental">Type of Rentals</label> 
																	<select class="form-control pb-1" id="car_typeOfRental"
																	name="type_of_rentals" >
																		<option value="">Select Type of Rentals</option>
																		<option value="Two Wheeler">Two Wheeler</option>
																		<option value="Car">Car</option>
																		<option value="Bicycle">Bicycle</option>
																	</select>
															</div>
															
															<div class="form-group">
																<label for="hsName">Name of Rental<span class="mandatory">*</span></label></label> <input
																	type="text" class="form-control" id="car_name_of_rental"
																	name="name_of_rental" placeholder="Name of Rental" required>
															</div>
															
																															
														</div>
														
														<div class="col-sm-12 col-lg-6">
															<div class="form-group">
																<label for="hsName">Address<span class="mandatory">*</span></label></label>
																<textarea class="form-control" rows="2" id="car_address" 
																name ="address" required></textarea>
															</div>
															
															<!-- <div class="form-group">
																<label for="geo_tagged_photo">Arrival and Departure Timings<span class="mandatory">*</span></label> 
																<input type="file" class="form-control" id="car_geo_tagged_photo" name="geo_tagged_photo">
															</div>	 -->
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
																<label for="geo_tagged_photo">Upload Images<span class="mandatory">*</span></label> 
																<input type="file" multiple class="form-control" 
																id="car_geo_tagged_photo" name="geo_tagged_photo" required>
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

<!-- car_and_scooter_rentals End -->
