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

<!-- Market Modal Start -->				

	
<div class="modal fade" id="market_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Market</h4>
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

															<form id="form_market" name="form_market" class="msform form-admin">
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
																					<label for="market_latitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="market_latitude" 
																						name="latitude" placeholder="Enter Latitude" required>
																				</div>

																				<div class="form-group">
																					<label for="market_ward">Ward</label> <select
																						class="form-control pb-1" id="market_ward" name="ward_id">
																						<!-- <option>Select Ward</option>
																						<option value="1">2</option>
																						<option value="2">3</option>
																						<option value="3">4</option> -->
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="longitude_market">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="market_longitude" name="longitude"
																						placeholder="Enter Longitude" required>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="market_subLayerId" name="subLayerId">
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
																					<label for="market_name">Shopping Market Name<span class="mandatory">*</span></label> <input 
																						type="text" class="form-control" id="market_shopping_market_name" 
																						name="shopping_market_name" required> 
																				</div>
																					<div class="form-group"> 
																					<label for="market_area">Shopping Market Area</label> <input 
																						type="text" class="form-control" id="market_area" 
																						name="area"> 
																				</div>
<!-- 																				<div class="form-group"> -->
<!-- 																					<label for="market_surveyId">Survey ID</label> <select -->
<!-- 																						class="form-control pb-1" id="market_survey_id" name="survey_id"> -->
<!-- 																						<option>Select ID</option>
<!-- 																						<option value="1">2</option> -->
<!-- 																						<option value="2">3</option> -->
<!-- 																						<option value="3">4</option> --> 
<!-- 																					</select> -->
<!-- 																				</div> -->
																					<div class="form-group"> 
																					<label for="closing_time">Closing Time</label> <input 
																						type="text" class="form-control" id="market_closing_time" 
																						name="closing_time">
																				</div>
																						
																					<div class="form-group"> 
																					<label for="shopping_markettype">Type of Shopping Market</label> <input 
																						type="text" class="form-control" id="market_type_of_shopping_market" 
																						name="type_of_shopping_market"> 
																				</div>
																				<div class="form-group"> 
																					<label for="operational_days">Operational Days</label> <input 
																						type="text" class="form-control" id="market_operational_days" 
																						name="operational_days"> 
																				</div>
																			
																			
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group"> 
																					<label for="openspace_area">Open Space Area</label> <input 
																						type="text" class="form-control" id="market_open_space_area" 
																						name="open_space_area">
																				</div>
																					<div class="form-group"> 
																					<label for="parking">Parking</label> <input 
																						type="text" class="form-control" id="market_parking" 
																						name="parking">
																				</div>
																					<div class="form-group"> 
																					<label for="num_shops">Number of Shops</label> <input 
																						type="number" class="form-control" id="market_no_of_shops" 
																						name="no_of_shops">
																				</div>
																					<div class="form-group"> 
																					<label for="opening_time">Opening Time</label> <input 
																						type="text" class="form-control" id="market_opening_time" 
																						name="opening_time">
																				</div>
																			
																					<div class="form-group">
																					<label for="market_address">Address<span class="mandatory">*</span></label> 
																					<textarea class="form-control"
																						id="market_address" name="address"
																						placeholder="Enter Address" required></textarea>
																				</div>
																								<!-- <div class="form-group">
																		<label for="market_geoTaggedPhoto">Geo Tagged Photo<span class="mandatory">*</span></label> <input
																			type="file" multiple class="form-control" id="market_geo_tagged_photo "  
																				name="geo_tagged_photo "> 
																		</div> -->
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
																			<label for="market_geoTaggedPhoto">Geo Tagged Photo
																			<span class="mandatory">*</span></label> <input
																			type="file" multiple class="form-control" id="market_geo_tagged_photo"  
																				name="geo_tagged_photo" required> 
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit"
																		name="marketsubmit" id="marketsubmit" class="btn btn-indore mt-3"
																		value="Submit" />
																</fieldset>
																
<!-- 																<fieldset> -->
<!-- 																	<div class="form-card"> -->
<!-- 																		<h2 class="fs-title">Images</h2> -->
<!-- 																		<div class="form-group"> -->
<!-- 																			<label for="upScimages">Upload Images</label> <input -->
<!-- 																				type="file" multiple class="form-control" id="uphc_geoTaggedPhoto"  -->
<!-- 																				name="uphc_geoTaggedPhoto"> -->
<!-- 																		</div> -->
<!-- 																		<ul class="imageslist"></ul> -->
<!-- 																	</div> -->
<!-- 																	<button type="button" name="previous" -->
<!-- 																		class="previous action-button-previous float-left"> -->
<!-- 																		 <i class="fa fa-angle-left" aria-hidden="true"></i> -->
<!-- 																	</button>	 -->
<!-- 																	<input type="submit" id="add_data_uphc_submit" name="add_data_uphc_submit" -->
<!-- 																		 class="btn btn-indore mt-3" -->
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
<!-- Market modal end -->