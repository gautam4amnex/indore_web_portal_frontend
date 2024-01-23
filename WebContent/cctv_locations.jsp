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

					<!--cctv location add Modal start -->
					<div class="modal fade" id="cctv_location_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title">Add CCTV Location</h4>
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

															<form id="form_cctv_location" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li id="imagestab" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="latitude">Latitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="cctv_locations_latitude" name="latitude"
																						placeholder="Enter Latitude" required>
																				</div>

																				<div class="form-group">
																					<label for="ward_id">Ward No</label> <select
																						class="form-control pb-1" id="cctv_locations_ward" name="ward_id">
																						
																					</select>
																				</div>
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="longitude">Longitude<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" 
																						id="cctv_locations_longitude" name="longitude"
																						placeholder="Enter Longitude" required>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="cctv_locations_subLayerId" name="subLayerId">
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
																					<label for="area_name">Area Name<span class="mandatory">*</span></label> <input
																						type="text" class="form-control" id="area_name"
																						name="area_name" placeholder="Enter Area Name" required>
																				</div>																				
																				
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				
																				<div class="form-group">
																					<label for="address">Address<span class="mandatory">*</span></label>
																					<textarea class="form-control" rows="2" name="address"
																						id="address" placeholder="Enter Address" required></textarea>
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
																			<label for="geo_tagged_photo">Upload Images<span class="mandatory">*</span>
																			</label> <input
																				type="file" multiple class="form-control" 
																				id="cctv_geo_tagged_photo" name="geo_tagged_photo" required>
																		</div>
																		<ul class="imageslist"></ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																		 <i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button>	
																	<input type="submit" id="cctv_add_submit"
																		name="cctv_add_submit" class="btn btn-indore mt-3"
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
					<!-- cctv_location Add Modal end -->


<%-- <script type="text/javascript" src="${context}/js/jquery.min.js"></script> --%>
<%-- <script type="text/javascript" src="${context}/js/popper.min.js"></script> --%>
<%-- <script type="text/javascript" src="${context}/js/bootstrap.min.js"></script> --%>
<%-- <script type="text/javascript" src="${context}/js/bootstrap-select.js"></script> --%>
<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
<script type="text/javascript" src="${context}/js/bootstrap-datepicker.js"></script>
<script type="text/javascript" src="${context}/js/hummingbird-treeview-1.3.js"></script>
<!-- DataTable -->
<script src="${context}/js/dataTables-buttons-min.js"></script>
<script src="${context}/js/buttons-html5-min.js"></script>
<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
<script type="text/javascript" src="${context}/js/utils.js"></script>
<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
<script type="text/javascript" src="${context}/js/slick.min.js"></script>
<script type="text/javascript" src="${context}/js/created/appData.js"></script>
<script type="text/javascript" src="${context}/js/admin-common.js"></script>
<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>
<script type="text/javascript" src="${context}/js/populatejs.min.js"></script>
<script type="text/javascript" src="${context}/js/designer/cctv_locations.js"></script>

</body>
</html>