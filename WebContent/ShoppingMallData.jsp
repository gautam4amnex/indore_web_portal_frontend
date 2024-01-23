<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<c:set value="${pageContext.request.contextPath}" var="context" />
<c:set var="language"
	value="${lang eq 'en' or lang eq 'gu' ? lang : pageContext.request.locale.language}"
	scope="session" />
<fmt:setLocale value="${language}" />
<div class="modal fade" id="shopping_mall_modal" role="dialog">
	<div class="modal-dialog modal-dialog-centered  modal-lg">

		<!-- Modal content-->
		<div class="modal-content dep-modal">
			<div class="modal-header">

				<h4 class="modal-title" data_translate="_add_information">Add
					Shopping mall information</h4>
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

										<form id="form_shopping" name="form_shopping"
											class="msform form-admin">
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
																<label for="longitude">Longitude<span class="mandatory">*</span></label> <input
																	type="text" class="form-control" id="shopping_longitude"
																	name="longitude" placeholder="Enter Longitude" required>
															</div>
															<div class="form-group">
																<label for="latitude">Latitude<span class="mandatory">*</span></label> <input
																	type="text" class="form-control" id="shopping_latitude"
																	name="latitude" placeholder="Enter latitude" required> 
															</div>

															<div class="form-group">
																<input type="hidden" class="form-control"
																	id="shopping_subLayerId" name="subLayerId">
															</div>
														</div>

														<div class="col-sm-12 col-lg-6">
															<div class="form-group">
																<label for="ward_id">ward id</label> <select
																	class="form-control pb-1" id="shopping_ward" name="ward_id">
																</select>
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
																<label for="shopping_mall_name">Shopping Mall
																	Name<span class="mandatory">*</span>
																	</label> <input type="text" class="form-control"
																	id="shopping_shopping_mall_name" name="shopping_mall_name"
																	placeholder="Enter Shopping Mall Name" required>
															</div>
															<div class="form-group">
																<label for="food_court">Food Court</label> <input
																	type="text" class="form-control" id="shopping_food_court"
																	name="food_court" placeholder="Enter Food Court">
															</div>
														</div>
														<div class="col-sm-12 col-lg-6">
															<div class="form-group">
																<label for="address">Address<span class="mandatory">*</span>
																</label> <input type="text"
																	class="form-control" id="shopping_address" name="address"
																	placeholder="Enter Address" required>
															</div>
															<div class="form-group">
																<label for="parking">Parking</label><span class="mandatory">*</span>
																<input type="text"
																	class="form-control" id="shopping_parking" name="parking"
																	placeholder="Enter Address" required>
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
														<label for="geo_tagged_photo">Upload Images<span class="mandatory">*</span></label> <input
															type="file" multiple class="form-control" id="shopping_geo_tagged_photo"
															name="geo_tagged_photo" required>
													</div>
													
												</div>
												
												<button type="button" name="previous"
													class="previous action-button-previous float-left">
													<i class="fa fa-angle-left" aria-hidden="true"></i>
												</button>
												<input type="submit" name="shoppingMallsubmit"id ="shoppingMallsubmit"
													class="btn btn-indore mt-3" value="Submit" />

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