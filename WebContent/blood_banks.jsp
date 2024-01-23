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
<div class="modal fade" id="addBloodBanks_modal" role="dialog">
	<div class="modal-dialog modal-dialog-centered  modal-lg">

		<!-- Modal content-->
		<div class="modal-content dep-modal">
			<div class="modal-header">

				<h4 class="modal-title">Add Blood Banks</h4>
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

										<form id="form_addBloodBanks" class="msform form-admin">
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
																	type="text" class="form-control" id="blood_banks_latitude" name="latitude"
																	placeholder="Enter Latitude" required>
															</div>
															
															<div class="form-group">
																<label for="lowardName">Ward<span
																	class="mandatory">*</span></label> <select
																	class="form-control pb-1" id="blood_banks_ward"
																	name="ward_id">
																</select>
															</div>
														</div>

														<div class="col-sm-12 col-lg-6">

															<div class="form-group">
																	<label for="loLongitude">Longitude<span class="mandatory">*</span></label> <input
																	type="text" class="form-control" id="blood_banks_longitude" name="longitude"
																	placeholder="Enter Longitude" required>
															</div>
															
															<div class="form-group">
																<input type="hidden" class="form-control"
																	id="blood_banks_subLayerId"
																	name="subLayerId">
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
																	<label for="hsName">Name<span
																		class="mandatory">*</span></label>
																	<input type="text" class="form-control" 
																	id="blood_banks_name" name="blood_bank_name" placeholder="Enter Name" required>	
															</div>
															
															<div class="form-group">
																	<label for="hsName">Address
																		<span class="mandatory">*</span>
																	</label>
																	<textarea name="address" rows="" cols="" 
																	class="form-control" id="blood_banks_address" 
																	placeholder="Enter Address" required></textarea>
															</div>
														</div>
														<div class="col-sm-12 col-lg-6">
															<div class="form-group">
																	<label for="hsName">Type of Blood Bank</label>
																	<input type="text" class="form-control" id="type_of_blood_bank" name="type_of_blood_bank" placeholder="Enter Type of Blood Bank">	
																</div>
																
															</div>
													</div>
												</div>
												<button type="button" name="previous"
													class="previous action-button-previous float-left">
													<i class="fa fa-angle-left" aria-hidden="true"></i>
												</button>
												<button type="button" name="next" class="next action-button float-right">
													<i class="fa fa-angle-right" aria-hidden="true"></i>
												</button>
												<!-- <input type="submit" name="finalinfosubmit"
													class="btn btn-indore mt-3" value="Submit" /> -->
											</fieldset>
											<fieldset>
												<div class="form-card"> 
													<h2 class="fs-title">Images</h2>
													<div class="form-group"> 
														<label for="upScimages">Upload Images<span class="mandatory">*</span></label>
														<input type="file" multiple class="form-control" 
														id="blood_banks_geoTaggedPhoto" name="geo_tagged_photo" required>
													</div> 
													<ul class="imageslist"></ul> 
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