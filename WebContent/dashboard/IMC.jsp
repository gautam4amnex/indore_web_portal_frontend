<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!--dadu Department start-->

<div class="side-dashboard-main inactive" id="dashboard_23">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		
			<div class="col-12 text-center side-dashboard-title">
				<h4>IMC</h4>
				<div class="filter-select-main mt-2 pt-1">	
					<div class="form-group filter-select">
						<select class="form-control dashboard-ward-filter" name="wardType" data-dashboard_type="23" id="imcWard">
						</select>
					</div>
				</div>
			</div>
			
			<!--Section 1 start-->
				<div class="chart-section-solid chart-section-solid-md p-2">
					<div class="row m-0 h-100">
						<div class="col-sm-12 col-md-12 col-lg-12 p-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
								<div class="title-chart-inner d-flex">
									<h4>Litter Bin Locations</h4>
									<div class="w-100 lineHeight-10">
										<div class="form-group zone_select float-right mb-0">
											<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 											<label class="m-2" id="tbl_dustbin_location_updatedDate"></label> -->
										</div>
									</div>
<!-- 									<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_health_hospital"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a>	 -->
								</div>	
							</div>
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
								<div class="row h-100 m-0">
									<div class="col-sm-12 col-md-1 col-lg-1 p-0">
										<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
											<p class="title-sub-dept"><span class="count-dept total_dustbin_location"></span><br/>Total Litter Bin Locations</p>
										</div>
									</div>
									
									
									<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
										<h4>Ward Wise Litter Bin Locations</h4>
										<div class="chart-section h-100" id="dustbin_location">
										</div>
									</div>
								</div>
							</div>
						</div>
						
<!-- 						<div class="col-sm-12 col-md-12 col-lg-6 p-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-0 pr-1 pt-1"> -->
<!-- 								<div class="title-chart-inner d-flex"> -->
<!-- 									<h4>Toilet Points</h4> -->
<!-- 									<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_health_hospital"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a>	 -->
<!-- 								</div>	 -->
<!-- 							</div> -->
							
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 								<div class="row h-100 m-0"> -->
<!-- 									<div class="col-sm-12 col-md-3 col-lg-3 p-0"> -->
<!-- 										<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 											<p class="title-sub-dept"><span class="count-dept total-toilet-point"></span><br/>Total Toilet Points</p> -->
<!-- 										</div> -->
<!-- 									</div> -->
<!-- 									<div class="col-sm-12 col-md-9 col-lg-9 chart-inner"> -->
<!-- 										<h4>Zone Wise Toilet Points</h4> -->
<!-- 										<div class="chart-section h-100" id="zoneWtp"> -->
<!-- 										</div> -->
<!-- 									</div> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
					</div>
				</div>	
				<!--Section 1 end-->
		
		
		<!--Section 1.1 start-->
				<div class="chart-section-solid chart-section-solid-md p-2">
					<div class="row m-0 h-100">
						<div class="col-sm-12 col-md-6 col-lg-6 p-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
								<div class="title-chart-inner d-flex">
									<h4>Public Toilets</h4>
									<div class="w-100 lineHeight-10">
										<div class="form-group zone_select float-right mb-0">
											<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 											<label class="m-2" id="tbl_public_toilets_updatedDate"></label> -->
										</div>
									</div>
								</div>	
							</div>
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
								<div class="row h-100 m-0">
									<div class="col-sm-12 col-md-2 col-lg-2 p-0">
										<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
											<p class="title-sub-dept"><span class="count-dept total_public_toilets"></span><br/>Total Public Toilets</p>
										</div>
									</div>
									
									
									<div class="col-sm-12 col-md-10 col-lg-10 chart-inner">
										<h4>Ward Wise Public Toilets</h4>
										<div class="chart-section h-100" id="public_toilets">
										</div>
									</div>
								</div>
							</div>
						</div>
							<div class="col-sm-12 col-md-6 col-lg-6 p-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
								<div class="title-chart-inner d-flex">
									<h4>Zone Wise Population</h4>
								</div>	
							</div>
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
								<div class="row h-100 m-0">
<!-- 									<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 										<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 											<p class="title-sub-dept"><span class="count-dept total_public_toilets"></span><br/>Total Population</p> -->
<!-- 										</div> -->
<!-- 									</div> -->
									
									
									<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
										<h4>Zone Wise Population</h4>
										<div class="chart-section h-100" id="zone_wise_population">
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>	
				<!--Section 1.1 end-->
		
		
			<!--Section 1.2 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-1 pr-0">
						<div class="title-chart-inner d-flex">
							<h4>Sewer Network Information</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_sewer_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept idaboundrycount total_sewers"></span><br />Total Sewers
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner">
								<h4>Diameter Wise Sewers(%)</h4>
								<div class="chart-section h-100" id="sewer_diameter"></div>
							</div>


							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>Ward Wise Sewer Length</h4>
								<div class="chart-section h-100" id="sewer_length"></div>
							</div>
						</div>
					</div>

				</div>


			</div>
		</div>
		<!-- Section 1.2 -->
	
	
	<!--Section 1.3 start-->
		<div class="chart-section-solid p-2 mb-5">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-1 pr-0">
						<div class="title-chart-inner d-flex">
							<h4>Indore 311</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group float-right mb-0 date-input">
      								<label for="frm" class="m-2">To:</label>
      								<input type="text" class="datepicker" id="ind311ToDate">
    							</div>
								<div class="form-group float-right mb-0 date-input">
                                	<label class="m-2">From:</label>
                                	<input type="text" class="datepicker" id="ind311FromDate"/>
                                </div>
                                <div class="form-group zone_select float-right mb-0">
                                	<label for="aictsl_Zone">Zone</label> 
                                	<select class="pb-1" id="indore311Zone" name="indore311Zone">
									</select>
                                </div>
                                <div class="form-group zone_select float-right mb-0">
									<label class="m-2" id="tbl_api_indore_311_updatedDate"></label>
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>Category Wise Complaints</h4>
								<div class="chart-section h-100" id="category_wise_complaints"></div>
							</div>
							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>Status Wise Complaints</h4>
								<div class="chart-section h-100" id="status_wise_complaints"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Section 1.3 -->
		
		
		<!--Section 1.4 start-->
		<div class="chart-section-solid p-2 mb-4">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-1 pr-0">
						<div class="title-chart-inner d-flex">
							<h4>Property Tax</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group float-right mb-0 date-input">
      								<label for="frm" class="m-2">To:</label>
      								<input type="text" class="datepicker" id="propertyTaxToDate">
    							</div>
								<div class="form-group float-right mb-0 date-input">
                                	<label class="m-2">From:</label>
                                	<input type="text" class="datepicker" id="propertyTaxFromDate"/>
                                </div>
                                <div class="form-group zone_select float-right mb-0">
                                	<label for="aictsl_Zone">Zone</label> 
                                	<select class="pb-1" id="propertyTaxZone" name="propertyTaxZone">
									</select>
                                </div>
                                <div class="form-group zone_select float-right mb-0">
									<label class="m-2" id="tbl_api_imc_collection_updatedDate"></label>
								</div>
							</div>
							
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>Construction Type Wise Property Tax</h4>
								<div class="chart-section h-100" id="construction_type_wise_property_tax"></div>
							</div>
							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>Ward Wise Property Tax</h4>
								<div class="chart-section h-100" id="ward_wise_property_tax"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Section 1.4 -->
		
		
		<!--Section 1.4.1 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="w-100 lineHeight-10">
									<div class="form-group zone_select float-right mb-0 ml-2">
	                                	<label for="aictsl_Zone">Floor Category</label> 
	                                	<select class="pb-1" id="building_floor" name="building_floor">
	                                		<option value="0">All Categories</option>
	                                		<option value="G">G</option>
	                                		<option value="G+1">G+1</option>
	                                		<option value="G+2">G+2</option>
	                                		<option value="G+3">G+3</option>
	                                		<option value="G+4">G+4</option>
	                                		<option value="G+5">G+5</option>
	                                		<option value="G+6">G+6</option>
<!-- 	                                		<option value="> G+3">> G+3</option> -->
										</select>
	                                </div>
									<div class="form-group zone_select float-right mb-0">
	                                	<label for="aictsl_Zone">Ward</label> 
	                                	<select class="pb-1" id="building_ward" name="building_ward">
										</select>
	                                </div>
	                                
								</div>
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Ward Wise Building Details</h4>
								
<!-- 								<div class="chart-section h-100" id="ward_wise_building"></div> -->
									<div class="chart-section h-100" id="year_wise_building_count"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Section 1.4.1 -->
		
		<!--Section 1.5 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-1 pr-0">
						<div class="title-chart-inner d-flex">
							<h4>ISWM</h4>
							<div class="w-100 lineHeight-10">
                                <div class="form-group float-right mb-0">
									<label class="m-2" id="tbl_api_iswm_weight_collection_transportation_updatedDate"></label>
								</div>
                                <div class="form-group zone_select float-right mb-0">
                                	<label for="aictsl_Zone">Zone</label> 
                                	<select class="pb-1" id="iswmZone" name="iswmZone">
									</select>
                                </div>
                                
                            </div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>GTS Wise Weight Collection</h4>
								<div class="chart-section h-100" id="gts_wise_weight_collection"></div>
							</div>
							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>Status Wise Vehicles</h4>
								<div class="chart-section h-100" id="status_wise_vehicles"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Section 1.5 -->
		
		<!--Section 1.5 start-->
<!-- 		<div class="chart-section-solid p-2"> -->
<!-- 			<div class="row m-0 h-100"> -->

<!-- 				<div class="col-sm-12 col-md-12 col-lg-12 pl-2"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-1 pr-0"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>AFCS</h4> -->
<!-- 							<div class="w-100 lineHeight-10"> -->
<!-- 								<div class="form-group zone_select float-right mb-0"> -->
<!-- 									<label class="m-2" id="tbl_api_afcs_transactional_updatedDate"></label> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner"> -->
<!-- 								<h4>Equipment Type wise Collection Amount</h4> -->
<!-- 								<div class="chart-section h-100" id="equipment_type_wise_collection"></div> -->
<!-- 							</div> -->
							
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!-- Section 1.5 -->
		
		<!--Section 2 start-->
<!-- 		<div class="chart-section-solid chart-section-solid-md p-2"> -->
<!-- 			<div class="row m-0 h-100"> -->
<!-- 				<div class="col-sm-12 col-md-12 col-lg-6 p-0"> -->
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Garbage Collection Points</h4> -->
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_health_hospital"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a>	 -->
<!-- 						</div>	 -->
<!-- 					</div> -->
					
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 p-0"> -->
<!-- 								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"><span class="count-dept total-garbage-collection-points"></span><br/>Total Garbage Collection Points</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
							
							
<!-- 							<div class="col-sm-12 col-md-9 col-lg-9 chart-inner"> -->
<!-- 								<h4>Zone Wise Garbage Collection</h4> -->
<!-- 								<div class="chart-section h-100" id="zoneWgc"> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
				
<!-- 				<div class="col-sm-12 col-md-12 col-lg-6 p-0"> -->
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Parking Points</h4> -->
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_health_hospital"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a> -->
<!-- 						</div>	 -->
<!-- 					</div> -->
					
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 p-0"> -->
<!-- 								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"><span class="count-dept total-parking-points"></span><br/>Total Parking Points</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-9 col-lg-9 chart-inner"> -->
<!-- 								<h4>Zone Wise Parking Points</h4> -->
<!-- 								<div class="chart-section h-100" id="zoneWpp"> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div>	 -->
		<!--Section 2 end-->
	</div>
</div>
<!--dadu Department start-->