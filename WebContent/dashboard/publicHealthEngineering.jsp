<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="police-department-management side-dashboard-main dashboard-display solid-wast-management inactive" id="dashboard_9">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		<div class="col-12 text-center side-dashboard-title">
			<h4>Public Health Engineering (Urban)</h4>
			<div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="9" id="publicHealthWard">
					</select>
				</div>
			</div>
		</div>
<!-- 		<div class="col-12 text-center side-dashboard-title"> -->
			
<!-- 		</div> -->
		<!--Section 1 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Water Supply Line</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_water_supply_line_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-2 col-lg-2 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="large-digit-box count-dept total_water_line_length"></span><br />Total Water Line Length (in meter)
									</p>
								</div>
							</div>
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner"> -->
<!-- 								<h4>Pipe Material Type wise Count</h4> -->
<!-- 								<div class="chart-section h-100" id="materialwise_waterLine"></div> -->
								
<!-- 							</div> -->
							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner">
								<h4>Diameter Wise Water Supply (mm)</h4>
								<div class="chart-section h-100" id="diameter_wise_water_supply_lines"></div>
							</div>
							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner">
								<h4>Ward Wise Water Supply Length (mt.)</h4>
								<div class="chart-section h-100" id="ward_wise_water_supply_lines"></div>
							</div>

						</div>
					</div>
				</div>
			
				
			</div>
		</div>
		<!--Section 1 end-->
		<!--Section 2 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				
				<div class="col-sm-12 col-md-2 col-lg-12 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Water Valves</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_water_valves_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-2 col-lg-2 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total_water_Valves"></span><br />Total Water Valves
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner">
								<h4>Ward Wise Water Valves</h4>
								<div class="chart-section h-100" id="wardWiseWaterValves"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 2 end-->
		
		
		<!--Section 3 start-->
<!-- 		<div class="chart-section-solid p-2"> -->
<!-- 			<div class="row m-0 h-100"> -->
				
<!-- 				<div class="col-sm-6 col-md-8 col-lg-8 p-0"> -->
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Tube Well</h4> -->
<!-- 							<div class="w-100 lineHeight-10"> -->
<!-- 								<div class="form-group zone_select float-right mb-0"> -->
<!-- 									<label class="m-2" id="tbl_tubewell_updatedDate"></label> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total_tube_well"></span><br />Total Tube Well -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner"> -->
<!-- 								<h4>Ward wise Tube Well(%)</h4> -->
<!-- 								<div class="chart-section h-100" id="ward_wise_tubewell"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="col-sm-6 col-md-2 col-lg-2 p-0"> -->
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Up Stream</h4> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept idaboundrycount up_stream"></span><br />Up Stream (in meter) -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
<!-- 				<div class="col-sm-6 col-md-2 col-lg-2 p-0"> -->
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Down Stream</h4> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept idaboundrycount down_stream"></span><br />Down Stream (in meter) -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		
		<!--Section 3 end-->
	</div>
<!-- Modal -->
</div>