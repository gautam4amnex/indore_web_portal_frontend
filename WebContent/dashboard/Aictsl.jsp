<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="aictsl-department-management side-dashboard-main dashboard-display inactive" id="dashboard_8">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		<div class="col-12 text-center side-dashboard-title">
			<h4>AICTSL</h4><div class="filter-select-main mt-2 pt-1">
		
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="8" id="aictslWard">
					</select>
				</div>
			</div>
			
		</div>

<!-- 		<div class="col-12 text-center side-dashboard-title"> -->

<!-- 			<div class="filter-select-main mt-3 pt-1"> -->
<!-- 				<div class="form-group filter-select"> -->
<!-- 					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="8" id="aictslWard"> -->
<!-- 					</select> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!--Section 1 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-1 pr-0">
						<div class="title-chart-inner d-flex">
							<h4>Bus Routes</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_bus_routes_updatedDate"></label> -->
								</div>
							</div>
							
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_bus_routes"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a>	 -->
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept idaboundrycount total-bus-routes"></span><br />Total Bus Routes
									</p>
								</div>
							</div>
<!-- 							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner"> -->
<!-- 								<h4>Types of Bus Routes</h4> -->
<!-- 								<div class="chart-section h-100" id="bus_routes"></div> -->
<!-- 							</div> -->
							<!-- <div class="col-sm-12 col-md-2 col-lg-2 chart-inner">
								<h4>Total Stuff</h4>
								<div class="chart-section h-100" id="total_stuff"></div>
							</div> -->


							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								<h4>Type Wise Bus Routes</h4>
								<div class="chart-section h-100" id="routewise_station"></div>
							</div>
							<!-- <div class="col-sm-12 col-md-3 col-lg-3 chart-inner">
								<h4>Depo wise No. of Buses</h4>
								<div class="chart-section h-100" id="Buses_depotwise"></div>
							</div> -->
						</div>
					</div>

				</div>


			</div>
		</div>
		<!--Section 1 end-->

		<!--Section 2 start-->
		<div class="chart-section-solid pl-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center p-1">
						<div class="title-chart-inner d-flex">
							<h4>Bus Stops</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_bus_stops_updatedDate"></label> -->
								</div>
							</div>
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_bus_stops"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a>	 -->
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept idaboundrycount total_bus_stops"></span><br />Total Bus Stops
									</p>
								</div>
							</div>
<!-- 							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner"> -->
<!-- 								<h4>Types of Bus Station</h4> -->
<!-- 								<div class="chart-section h-100" id="bus_station_types"></div> -->
<!-- 							</div> -->
							<!-- <div class="col-sm-12 col-md-2 col-lg-2 chart-inner">
								<h4>Total Stuff</h4>
								<div class="chart-section h-100" id="total_stuffBrts"></div>
							</div> -->


							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								<h4>Ward Wise Bus Stops</h4>
								<div class="chart-section h-100" id="ward_wise_bus_stop"></div>
							</div>
							<!-- <div class="col-sm-12 col-md-3 col-lg-3 chart-inner">
								<h4>Depo wise No. of Buses</h4>
								<div class="chart-section h-100" id="Buses_depotwiseBrts"></div>
							</div> -->
						</div>
					</div>

				</div>


			</div>
		</div>
		<!--Section 2 end-->
		
		
<!-- 		Section 3 starts -->

		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-1 pr-0">
						<div class="title-chart-inner d-flex">
							<h4>AFCS</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2" id="tbl_api_afcs_transactional_updatedDate"></label>
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Equipment Type Wise Collection Amount</h4>
								<div class="chart-section h-100" id="equipment_type_wise_collection"></div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>

<!-- 		Section 3 ends -->
		
	</div>
</div>
<script>
	
</script>