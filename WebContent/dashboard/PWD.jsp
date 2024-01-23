<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div
	class="pwd-department-management side-dashboard-main dashboard-display solid-wast-management inactive"
	id="dashboard_10">
	<div class="map-info-tab-link align-self-center">
		<a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i
				class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		<div class="col-12 text-center side-dashboard-title">
			<h4>Public Works Department</h4>
			<div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="10" id="pwdWard">
					</select>
				</div>
			</div>
		</div>
<!-- 		<div class="col-12 text-center side-dashboard-title"> -->
			
<!-- 		</div> -->
		<!--Section 1 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100 p-2">
				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1">
						<div class="title-chart-inner d-flex">
							<h4>Roadways</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_roads_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-2 col-lg-2 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="large-digit-box count-dept total_road_length"></span><br />Total Road Length (KM)
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner">
								<h4>Type Wise Road Length (KM)</h4>
								<div class="chart-section h-100" id="type_wise_roads"></div>
							</div>
							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner">
								<h4>Surface Type Wise Road Length (KM)</h4>
								<div class="chart-section h-100" id="surface_wise_roads"></div>
							</div>
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner"> -->
<!-- 								<h4>Type Wise Road Usage</h4> -->
<!-- 								<div class="chart-section h-100" id="typewise_roadusage"></div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner"> -->
<!-- 								<h4>Surface Type</h4> -->
<!-- 								<div class="chart-section h-100" id="surfacetype"></div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner"> -->
<!-- 								<h4>Road Wise No. of Dividers</h4> -->
<!-- 								<div class="chart-section h-100" id="roadwise_divider"></div> -->
<!-- 							</div> -->
						</div>
					</div>

				</div>

<!-- 				<div class="col-sm-6 col-md-2 col-lg-2 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Parking Facility</h4> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept idaboundrycount bridge-facility-count"></span><br />No. -->
<!-- 										of Bridge wise Parking Facility -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->

<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
			</div>
		</div>
		<!--Section 1 end-->
		
		<!--Section 1.1 start-->
<!-- 		<div class="chart-section-solid p-2"> -->
<!-- 			<div class="row m-0 h-100 p-2"> -->
<!-- 				<div class="col-sm-12 col-md-12 col-lg-12 p-0"> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="large-digit-box count-dept totla_road_length"></span><br />Total Road Length -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner"> -->
<!-- 								<h4>Ward Wise Road Length</h4> -->
<!-- 								<div class="chart-section h-100" id="ward_wise_road_length"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->




		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100 p-2">
				<div class="col-sm-12 col-md-12 col-lg-12 p-0">

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1">
						<div class="title-chart-inner d-flex">
							<h4>Bridges</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2" ></label>
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-2 col-lg-2 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="large-digit-box count-dept total_bridges"></span><br />Total Bridges
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner">
								<h4>Ward Wise Bridges</h4>
								<div class="chart-section h-100" id="ward_wise_bridge_count"></div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		<!--Section 1.1 end-->
		
		
		<!--Section 2 start-->
<!-- 		<div class="chart-section-solid p-2"> -->
<!-- 			<div class="row m-0 h-100 p-2"> -->
<!-- 				<div class="col-sm-6 col-md-6 col-lg-6 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Bridges</h4> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-bridgep-count"></span><br />Total Bridges -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner"> -->
<!-- 								<h4>Type Wise Road Usage</h4> -->
<!-- 								<div class="chart-section h-100" id="bridges_roadusage"></div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner"> -->
<!-- 								<h4>Land Wise Bridge</h4> -->
<!-- 								<div class="chart-section h-100" id="bridges_landwise"></div> -->
<!-- 							</div> -->

<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
<!-- 				<div class="col-sm-6 col-md-4 col-lg-4 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Flyovers</h4> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-flyover-count"></span><br />Total Flyover -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-9 col-lg-9 chart-inner"> -->
<!-- 								<h4>Types of Flyover</h4> -->
<!-- 								<div class="chart-section h-100" id="flyover"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
<!-- 				<div class="col-sm-6 col-md-2 col-lg-2 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Foot Over Bridge</h4> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-footover-bridge-count"></span><br />Total No. of Foot -->
<!-- 										Over Bridge -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!--Section 2 end-->
	</div>
	<!-- Modal -->
</div>