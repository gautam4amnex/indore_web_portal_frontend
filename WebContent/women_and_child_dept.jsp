<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>

<title>Women & Child development Department</title>

<!-- Page Content -->
<div class="page-content-wrapper">


	<div class="container-fluid h-100 p-0">
		<jsp:include page="/common/header.jsp" />
		<div class="admin-content">
			<!-- Nav tabs -->
			<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				<li class="nav-item"><a class="nav-link active"
					data_translate="_primary" data-toggle="tab" href="#dept_women_child_welfare">Women & Child Welfare</a></li>
				
			</ul>

			<!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane container-fluid active" id="dept_women_child_welfare">

					<div class="text-right">
						<button data-toggle="modal" data-target="#dep_add_welfare_modal"
							data_translate="_add_data" class="btn-add btn-indore-table">Add Women & Child Welfare</button>
					</div>

					<h6 class="table-title-grid" data_translate="_list_of_primary_school">List of Anganawadi</h6>
					<table id="dep_wcd_table" class="display tbl_dep" class="tbl-report"></table>

					<!--Add Women and child dept model start -->
					<div class="modal fade" id="dep_add_welfare_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Add Women & Child Welfare Data</h4>
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

															<form id="form_add_wcd" name="form_add_wcd" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Condition</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Other</strong></li>
																<!-- 	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="wcd_latitude">Latitude</label> <input
																						type="text" class="form-control"
																						id="wcd_latitude"
																						name="wcd_latitude"
																						placeholder="Enter Latitude">
																				</div>
																																						
																				<div class="form-group">
																					<label for="wcd_ward">Ward No</label> <select
																						class="form-control pb-1" id="wcd_ward" name="wcd_ward">
																						<!-- <option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option> -->
																					</select>
																				</div>
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="wcd_subLayerId" name="wcd_subLayerId">
																				</div>																			
																				
																																								
																			</div>

 																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_longitude">Longitude</label> <input
																						type="text" class="form-control" id="wcd_longitude" name="wcd_longitude"
																						placeholder="Enter Longitude">
																				</div>
<!-- 																				<div class="form-group">
																					<label for="wcd_zone">Zone Name</label> <select
																						class="form-control pb-1" id="wcd_zone" name="wcd_zone">
																						<option>Select Zone Name</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div> -->	
																																					
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
																					<label for="wcd_serialNo">Serial No</label> <input
																						type="text" class="form-control" id="wcd_serialNo" name="wcd_serialNo"
																						placeholder="Enter Serial No">
																				</div>	
																				<div class="form-group">
																					<label for="wcd_anganawadi">Anganawadi</label> <input
																						type="text" class="form-control" id="wcd_anganawadi" name="wcd_anganawadi"
																						placeholder="Enter Anganawadi">
																				</div>	
																				<div class="form-group">
																					<label for="wcd_enrollment">PS Enrollment</label> <input
																						type="text" class="form-control" id="wcd_psEnrollment" name="wcd_enrollment"
																						placeholder="Enter PS Enrollment">
																				</div>	
																				<div class="form-group">
																					<label for="wcd_childAgeYear">Children of age 3-6 years</label> <input
																						type="text" class="form-control" id="wcd_childAgeYear" name="wcd_childAgeYear"
																						placeholder="Enter Children of age 3-6 years">
																				</div>
																				<div class="form-group">
																					<label for="wcd_preMother">Pregnant/ Lactating Mothers</label> <input
																						type="text" class="form-control" id="wcd_preMother" name="wcd_preMother"
																						placeholder="Enter Pregnant/ Lactating Mothers">
																				</div>
																				<div class="form-group">
																					<label for="wcd_underWeight">Moderate Under Weight</label> <input
																						type="text" class="form-control" id="wcd_underWeight" name="wcd_underWeight"
																						placeholder="Enter Moderate Under Weight">
																				</div>
																				<div class="form-group">
																					<label for="wcd_population">Survey Population</label> <input
																						type="text" class="form-control" id="wcd_population" name="wcd_population"
																						placeholder="Enter Survey Population">
																				</div>
																				<div class="form-group">
																					<label for="wcd_femalePopulation">Female Survey Population</label> <input
																						type="text" class="form-control" id="wcd_femalePopulation" name="wcd_femalePopulation"
																						placeholder="Enter Female Survey Population">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_anganwadiCode">Anganawadi Code</label> <input
																						type="text" class="form-control" id="wcd_anganwadiCode" name="wcd_anganwadiCode"
																						placeholder="Enter Anganawadi Code">
																				</div>	
																				
																				<div class="form-group">
																				<label class="radio-inline" for="wcd_mdmScheme">Mid day meal Scheme  </label> 
																				</div>
																					<div class="form-group">
																						<input type="radio" id="wcd_mdmTest_yes" 
																						name="wcd_mdmTest" value="true">Yes
																						<input type="radio"  id="drd_mdmTest_no" 
																						name="wcd_mdmTest" value="false">No
																				</div>
																				<div class="form-group">
																					<label for="wcd_enrollment">MS Enrollment</label> <input
																						type="text" class="form-control" id="wcd_msEnrollment" name="wcd_enrollment"
																						placeholder="Enter MS Enrollment">
																				</div>	
																				<div class="form-group">
																					<label for="wcd_childrenAgeMonth">Children of age 0-3 months</label> <input
																						type="text" class="form-control" id="wcd_childrenAgeMonth" name="wcd_childrenAgeMonth"
																						placeholder="Enter Children of age 0-3 months">
																				</div>
																				<div class="form-group">
																					<label for="wcd_serverlyUnderWeight">Severely Under Weight</label> <input
																						type="text" class="form-control" id="wcd_serverlyUnderWeight" name="wcd_serverlyUnderWeight"
																						placeholder="Enter Severely Under Weight">
																				</div>
																				<div class="form-group">
																					<label for="wcd_normal">Normal </label> <input
																						type="text" class="form-control" id="wcd_normal" name="wcd_normal"
																						placeholder="Enter Normal ">
																				</div>
																				<div class="form-group">
																					<label for="wcd_malePopulation">Male Survey Population</label> <input
																						type="text" class="form-control" id="wcd_malePopulation" name="wcd_malePopulation"
																						placeholder="Enter Male Survey Population">
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
																		<h2 class="fs-title">Condition</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_builtArea">Built up Area</label> <input
																						type="text" class="form-control" id="wcd_builtArea" name="wcd_builtArea"
																						placeholder="Enter Built up Area">
																				</div>
																				<div class="form-group">
																					<label for="wcd_playGroundArea">Play Ground Area</label> <input
																						type="text" class="form-control" id="wcd_playGroundArea" name="wcd_playGroundArea"
																						placeholder="Enter Play Ground Area">
																				</div>
																				<div class="form-group">
																					<label for="wcd_staffCount">Staff Count </label> <input
																						type="text" class="form-control" id="wcd_staffCount" name="wcd_staffCount"
																						placeholder="Enter Staff Count">
																				</div>
																				<div class="form-group">
																					<label for="wcd_buildCondition">Condition of Building</label> <input
																						type="text" class="form-control" id="wcd_buildCondition" name="wcd_buildCondition"
																						placeholder="Enter Condition of Building">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_floors">No of Floors </label> <input
																						type="text" class="form-control" id="wcd_floors" name="wcd_floors"
																						placeholder="Enter No of Floors">
																				</div>
																				<div class="form-group">
																					<label for="wcd_openSpace">Open Space Area</label> <input
																						type="text" class="form-control" id="wcd_openSpace" name="wcd_openSpace"
																						placeholder="Enter Open Space Area">
																				</div>
																				<div class="form-group">
																					<label for="wcd_establishYear">Established Year</label> <input
																						type="text" class="form-control" id="wcd_establishYear" name="wcd_establishYear"
																						placeholder="Enter Established Year">
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
																		<h2 class="fs-title">Other</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_agency">Agency</label> <input
																						type="text" class="form-control" id="wcd_agency" name="wcd_agency"
																						placeholder="Enter Agency Name">
																				</div>
																				<div class="form-group">
																					<label for="wcd_agencyIfsc">Agency IFSC</label> <input
																						type="text" class="form-control" id="wcd_agencyIfsc" name="wcd_agencyIfsc"
																						placeholder="Enter Agency IFSC Code">
																				</div>
																				<!-- <div class="form-group">
																					<label for="wcd_remarks">Remarks</label> <input
																						type="text" class="form-control" id="wcd_remarks" name="wcd_remarks"
																						placeholder="Enter Remarks">
																				</div> -->
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_accountNo">Agency Account No</label> <input
																						type="text" class="form-control" id="wcd_accountNo" name="wcd_accountNo"
																						placeholder="Enter Agency Account No">
																				</div>
																				<div class="form-group">
																					<label for="wcd_cchDetails">CCH Details</label> <input
																						type="text" class="form-control" id="wcd_cchDetails" name="wcd_cchDetails"
																						placeholder="Enter CCH Details">
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
																			<label for="wcd_Scimages">Upload Images</label> <input
																				type="file" class="form-control" id="wcd_Scimages" name="wcd_Scimages">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<input type="submit" id="add_wcwd_dep"
																		name="add_wcwd_dep" class="btn btn-indore mt-3"
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
					<!--Add Women and child dept model end -->
					
					
					<!-- Update Women and child dept model start -->
					<div class="modal fade" id="dep_update_welfare_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered  modal-lg">

							<!-- Modal content-->
							<div class="modal-content dep-modal">
								<div class="modal-header">

									<h4 class="modal-title" data_translate="_add_information">Update Women & Child Welfare Data</h4>
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

															<form id="form_update_wcd" name="form_update_wcd" class="msform form-admin">
																<!-- progressbar -->
																<ul id="progressbar" class="progressbar">
																	<li data_translate="_location" class="tabwithborder activemain" id="location"><strong>Location</strong></li>
																	<li data_translate="_basic_info" id="binfotab" class="tabwithborder"><strong>Basic
																			Info</strong></li>
																	<li data_translate="_facilities" id="facilitiestab" class="tabwithborder"><strong>Condition</strong></li>
																	<li data_translate="_construction" id="constructiontab" class="tabwithborder"><strong>Other</strong></li>
																<!-- 	<li data_translate="_other" id="othertab" class="tabwithborder"><strong>Other</strong></li> -->
																	<li data_translate="_images" id="imagestab" class="tabwithborder"><strong>Images</strong></li>
																</ul>
																<!-- fieldsets -->
																<fieldset>
																	<div class="form-card">
																		<h2 class="fs-title" data_translate="_location">Location</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">

																				<div class="form-group">
																					<label for="wcd_Uplatitude">Latitude</label> <input
																						type="text" class="form-control"
																						id="wcd_Uplatitude"
																						name="wcd_Uplatitude"
																						placeholder="Enter Latitude">
																				</div>
																																						
																				<div class="form-group">
																					<label for="wcd_UpWard">Ward No</label> <select
																						class="form-control pb-1" id="wcd_UpWard" name="wcd_UpWard">
																						<!-- <option>Select Ward No</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option> -->
																					</select>
																				</div>
																																								
																			</div>

 																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_Uplongitude">Longitude</label> <input
																						type="text" class="form-control" id="wcd_Uplongitude" name="wcd_Uplongitude"
																						placeholder="Enter Longitude">
																				</div>
<!-- 																				<div class="form-group">
																					<label for="wcd_UpZoneName">Zone Name</label> <select
																						class="form-control pb-1" id="wcd_UpZoneName" name="wcd_UpZoneName">
																						<option>Select Zone Name</option>
																						<option value=" ">2</option>
																						<option value=" ">3</option>
																						<option value=" ">4</option>
																					</select>
																				</div>	 -->
																				
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="wcd_UpSubLayerId" name="wcd_UpSubLayerId">
																				</div>	
																				<div class="form-group">
																					<input type="hidden" class="form-control" 
																					id="wcd_UpAngnawadiId" name="wcd_UpAngnawadiId">
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
																					<label for="wcd_UpSerialNo">Serial No</label> <input
																						type="text" class="form-control" id="wcd_UpSerialNo" name="wcd_UpSerialNo"
																						placeholder="Enter Serial No">
																				</div>	
																				<div class="form-group">
																					<label for="wcd_UpAnganawadi">Anganawadi</label> <input
																						type="text" class="form-control" id="wcd_UpAnganawadi" name="wcd_UpAnganawadi"
																						placeholder="Enter Anganawadi">
																				</div>	
																				<div class="form-group">
																					<label for="wcd_UpEnrollment">PS Enrollment</label> <input
																						type="text" class="form-control" id="wcd_UpPsEnrollment" name="wcd_UpEnrollment"
																						placeholder="Enter PS Enrollment">
																				</div>	
																				<div class="form-group">
																					<label for="wcd_UpChildAgeYear">Children of age 3-6 years</label> <input
																						type="text" class="form-control" id="wcd_UpChildAgeYear" name="wcd_UpChildAgeYear"
																						placeholder="Enter Children of age 3-6 years">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpPreMother">Pregnant/ Lactating Mothers</label> <input
																						type="text" class="form-control" id="wcd_UpPreMother" name="wcd_UpPreMother"
																						placeholder="Enter Pregnant/ Lactating Mothers">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpUnderWeight">Moderate Under Weight</label> <input
																						type="text" class="form-control" id="wcd_UpUnderWeight" name="wcd_UpUnderWeight"
																						placeholder="Enter Moderate Under Weight">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpPopulation">Survey Population</label> <input
																						type="text" class="form-control" id="wcd_UpPopulation" name="wcd_UpPopulation"
																						placeholder="Enter Survey Population">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpFemalePopulation">Female Survey Population</label> <input
																						type="text" class="form-control" id="wcd_UpFemalePopulation" name="wcd_UpFemalePopulation"
																						placeholder="Enter Female Survey Population">
																				</div>

																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_UpAnganwadiCode">Anganawadi Code</label> <input
																						type="text" class="form-control" id="wcd_UpAnganwadiCode" name="wcd_UpAnganwadiCode"
																						placeholder="Enter Anganawadi Code">
																				</div>	
																				
																				<div class="form-group">
																				<label class="radio-inline" for="wcd_UpmdmScheme">Mid day meal Scheme  </label> 
																				</div>
																					<div class="form-group">
																						<input type="radio" id="wcd_Up_mdmTest_yes" 
																						name="wcd_Up_mdmTest" value="true">Yes
																						<input type="radio"  id="drd_Up_mdmTest_no" 
																						name="wcd_Up_mdmTest" value="false">No
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpEnrollment">MS Enrollment</label> <input
																						type="text" class="form-control" id="wcd_UpMsEnrollment" name="wcd_UpEnrollment"
																						placeholder="Enter MS Enrollment">
																				</div>	
																				<div class="form-group">
																					<label for="wcd_UpChildrenAgeMonth">Children of age 0-3 months</label> <input
																						type="text" class="form-control" id="wcd_UpChildrenAgeMonth" name="wcd_UpChildrenAgeMonth"
																						placeholder="Enter Children of age 0-3 months">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpServerlyUnderWeight">Severely Under Weight</label> <input
																						type="text" class="form-control" id="wcd_UpServerlyUnderWeight" name="wcd_UpServerlyUnderWeight"
																						placeholder="Enter Severely Under Weight">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpNormal">Normal </label> <input
																						type="text" class="form-control" id="wcd_UpNormal" name="wcd_UpNormal"
																						placeholder="Enter Normal ">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpMalePopulation">Male Survey Population</label> <input
																						type="text" class="form-control" id="wcd_UpMalePopulation" name="wcd_UpMalePopulation"
																						placeholder="Enter Male Survey Population">
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
																		<h2 class="fs-title">Condition</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_UpBuiltArea">Built up Area</label> <input
																						type="text" class="form-control" id="wcd_UpBuiltArea" name="wcd_UpBuiltArea"
																						placeholder="Enter Built up Area">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpPlayGroundArea">Play Ground Area</label> <input
																						type="text" class="form-control" id="wcd_UpPlayGroundArea" name="wcd_UpPlayGroundArea"
																						placeholder="Enter Play Ground Area">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpStaffCount">Staff Count </label> <input
																						type="text" class="form-control" id="wcd_UpStaffCount" name="wcd_UpStaffCount"
																						placeholder="Enter Staff Count">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpNuildCondition">Condition of Building</label> <input
																						type="text" class="form-control" id="wcd_UpNuildCondition" name="wcd_UpNuildCondition"
																						placeholder="Enter Condition of Building">
																				</div>
																			</div>
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_UpFloors">No of Floors </label> <input
																						type="text" class="form-control" id="wcd_UpFloors" name="wcd_UpFloors"
																						placeholder="Enter No of Floors">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpOpenSpace">Open Space Area</label> <input
																						type="text" class="form-control" id="wcd_UpOpenSpace" name="wcd_UpOpenSpace"
																						placeholder="Enter Open Space Area">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpEstablishYear">Established Year</label> <input
																						type="text" class="form-control" id="wcd_UpEstablishYear" name="wcd_UpEstablishYear"
																						placeholder="Enter Established Year">
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
																		<h2 class="fs-title">Other</h2>
																		<div class="row">
																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_UpAgency">Agency</label> <input
																						type="text" class="form-control" id="wcd_UpAgency" name="wcd_UpAgency"
																						placeholder="Enter Agency Name">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpAgencyIfsc">Agency IFSC</label> <input
																						type="text" class="form-control" id="wcd_UpAgencyIfsc" name="wcd_UpAgencyIfsc"
																						placeholder="Enter Agency IFSC Code">
																				</div>
																			<!-- 	<div class="form-group">
																					<label for="wcd_UpRemarks">Remarks</label> <input
																						type="text" class="form-control" id="wcd_UpRemarks" name="wcd_UpRemarks"
																						placeholder="Enter Remarks">
																				</div> -->
																			</div>

																			<div class="col-sm-12 col-lg-6">
																				<div class="form-group">
																					<label for="wcd_UpAccountNo">Agency Account No</label> <input
																						type="text" class="form-control" id="wcd_UpAccountNo" name="wcd_UpAccountNo"
																						placeholder="Enter Agency Account No">
																				</div>
																				<div class="form-group">
																					<label for="wcd_UpcchDetails">CCH Details</label> <input
																						type="text" class="form-control" id="wcd_UpcchDetails" name="wcd_UpcchDetails"
																						placeholder="Enter CCH Details">
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
																			<label for="wcd_UpScimages">Upload Images</label> <input
																				type="file" class="form-control" id="wcd_Scimages" name="wcd_UpScimages">
																		</div>
																		<ul class="imageslist">
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																			<li><img src="images/images.png" /></li>
																		</ul>
																	</div>
																	<button type="button" name="previous"
																		class="previous action-button-previous float-left">
																	<i class="fa fa-angle-left" aria-hidden="true"></i>
																	</button> 
																	<input type="submit" id="add_wcwd_dep"
																		name="add_wcwd_Up_dep" class="btn btn-indore mt-3"
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
					<!--Update Women and child dept model end -->

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