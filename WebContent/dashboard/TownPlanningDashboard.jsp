<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="side-dashboard-main inactive" id="dashboard_5">
	<div class="map-info-tab-link align-self-center">
		  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div> 
	<div class="row side-dashboard-main-inner">

		<div class="col-12 text-center side-dashboard-title">
			<h4>Town & Country Planning Department</h4>
			<div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="5" id="townWard">
					</select>
				</div>
			</div>
		</div>

		<!--Section 1 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				<div class="col-sm-12 col-md-12 col-lg-12 p-0 ml-1">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Town Planning Area</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_town_planning_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
<!-- 							<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="large-digit-box count-dept total_town_planning_scheme"></span><br />Total Town Planning Area -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Land Use Distribution(%)</h4>
								<div class="chart-section h-100" id="land_use_distribution"></div>
							</div>
							
<!-- 							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner"> -->
<!-- 								<h4>Land wise Total Road Width & Length</h4> -->
<!-- 								<div class="chart-section h-100" id="total_TownPlanningArea"></div> -->
<!-- 							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 1 end-->
		<!--Section 2 start-->
		<div class="chart-section-solid p-2 ml-1">
			<div class="row m-0 h-100">
<!-- 				<div class="col-sm-6 col-md-4 col-lg-4 p-0"> -->
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 chart-main-fullh"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner"> -->
<!-- 								<h4>Ward Wise Total Town Planning Area</h4> -->
<!-- 								<div class="chart-section h-100" id="wardwise"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
				
<!-- 				<div class="col-sm-6 col-md-4 col-lg-4 p-0"> -->
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 chart-main-fullh"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner"> -->
<!-- 								<h4>Land Use Category Wise Town Planning Area</h4> -->
<!-- 								<div class="chart-section h-100" id="landUse"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
				
				<div class="col-sm-6 col-md-6 col-lg-6 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 chart-main-fullh">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Projected Growth Rate In Commercial Area (From 2020 To 2031)</h4>
								<div class="chart-section h-100" id="commercial_area_increase"></div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-sm-6 col-md-6 col-lg-6 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 chart-main-fullh">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Projected Growth Rate In Residential Area (From 2020 To 2031)</h4>
								<div class="chart-section h-100" id="residential_area_increase"></div>
							</div>
						</div>
					</div>
				</div>
				
<!-- 				<div class="col-sm-6 col-md-4 col-lg-4 p-0"> -->
<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 chart-main-fullh"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner"> -->
<!-- 								<h4>Ward Wise Total Town IMC Area</h4> -->
<!-- 								<div class="chart-section h-100" id="wardwise_ImcArea"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
			</div>
		</div>
		<!--Section 2 end-->
	</div>
</div>