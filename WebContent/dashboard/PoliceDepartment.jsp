<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="police-department-management side-dashboard-main dashboard-display awas-single-management inactive" id="dashboard_4">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		<div class="col-12 text-center side-dashboard-title">
			<h4>Police Department</h4>
				<div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="4" id="policeWard">
					</select>
				</div>
			</div>
		</div>
	
		<!--Section 1 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				<!-- <div class="col-sm-6 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1">
						<div class="title-chart-inner d-flex">
							<h4>Police Station</h4>
							<a href="javascript:void(0);" class="dashboard-table-view"
								data-toggle="modal" data-target="#myModal1"
								data-table_name="tbl_health_hospital"><i
								class="fa fa-th-large" aria-hidden="true"></i></a>	
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-2 col-lg-2 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-police-station "></span><br />Total Police Stations
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner">
								<h4>Type wise Police Station</h4>
								<div class="chart-section h-100" id="typewise_policeStation"></div>
							</div>
						</div>
					</div>
				</div> -->
			<div class="col-sm-6 col-md-12 col-lg-12 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Police Station</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_police_chowkey_updatedDate"></label> -->
								</div>
							</div>
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_police_chowkey"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a>	 -->
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-2 col-lg-2 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-police-chowki"></span><br />Total Police Stations
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner">
								<h4>Zone Wise Police Stations</h4>
								<div class="chart-section h-100" id="zone_wise_ps"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 1 end-->
		
		
		
<!-- 		Section 2 start -->

		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				
			<div class="col-sm-6 col-md-12 col-lg-12 p-0 ml-1">
					
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Police Station Wise Number Of Road Accidents</h4>
								<div class="chart-section h-100" id="ps_wise_road_accident"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

<!-- 		Section 2 End -->

<!-- 		Section 3 start -->

		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				
			<div class="col-sm-6 col-md-12 col-lg-12 p-0 ml-1">
					
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							
							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner">
								<h4>Nature Of Injury In Accidents(%)</h4>
								<div class="chart-section h-100" id="injury_wise_accident"></div>
							</div>
							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner">
								<h4>Vehicle Type Involved In Accidents(%)</h4>
								<div class="chart-section h-100" id="vehicle_type_wise_accident"></div>
							</div>
							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner">
								<h4>Road Category Wise Accident Count(%)</h4>
								<div class="chart-section h-100" id="road_category_wise_accident"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

<!-- 		Section 3 End -->
		
		
		<!-- 		Section 4 start -->

		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				
			<div class="col-sm-6 col-md-12 col-lg-12 p-0 ml-1">
					
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Police Station Wise Vehicle Theft Incidents</h4>
								<div class="chart-section h-100" id="ps_wise_vehicle_theft"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

<!-- 		Section 4 End -->
		
	</div>
<!-- Modal -->
</div>