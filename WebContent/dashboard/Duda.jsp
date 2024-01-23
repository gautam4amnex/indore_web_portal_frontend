<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!--dadu Department start-->

<div class="side-dashboard-main inactive"
	id="dashboard_12">
	<div class="map-info-tab-link align-self-center">
		<a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i
				class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">

		<div class="col-12 text-center side-dashboard-title">
			<h4>DUDA</h4>
			<div class="filter-select-main mt-2 pt-1">

				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="wardType"
						data-dashboard_type="12" id="dudaWard">
					</select>
				</div>
			</div>
		</div>

		<!--Section 1 start-->
		<div class="chart-section-solid chart-section-solid-md p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-9 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-2 pr-1 pt-1">
						<div class="title-chart-inner d-flex">
							<h4>Sewerage Line</h4>
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_health_hospital"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a> -->
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-2 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-2 col-lg-2 p-0 custom-row-s">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">

									<p class="title-sub-dept">
										<span class="count-dept total-sewerage-line-count"></span><br />Total Sewerage Line <br />
										(In m)
									</p>
								</div>
							</div>
							<div class="custom-row-b">
								<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
									<h4>Pipe Type Wise Sewerage Line</h4>
									<div class="chart-section h-100" id="ptwSewl"></div>
								</div>
								<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
									<h4>Depth Wise Sewerage Line</h4>
									<div class="chart-section h-100" id="dwSewl"></div>
								</div>

							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-12 col-md-12 col-lg-3 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-2 pr-0 pt-1">
						<div class="title-chart-inner d-flex">
							<h4>Solid Waste Containers</h4>
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_health_hospital"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a> -->
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-2 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-3 col-lg-3 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">

									<p class="title-sub-dept">
										<span class="count-dept total-solid-waste"></span><br />Total Solid Waste
										Containers
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-9 col-lg-9 chart-inner">
								<h4>Ward Wise Solid Waste Containers</h4>
								<div class="chart-section h-100" id="wwSolidwc"></div>
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

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-2 pr-0 pt-1">
						<div class="title-chart-inner d-flex">
							<h4>Water Supply Line</h4>
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_health_hospital"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a> -->
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-2 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-water-supply-line-count"></span><br />Total Water Supply
										Line<br />(in m)
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner">
								<h4>Pipe Type Wise Water Supply Line</h4>
								<div class="chart-section h-100" id="ptwWatersl"></div>
							</div>
							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner">
								<h4>Depth Wise Water Supply Line</h4>
								<div class="chart-section h-100" id="dwWatersl"></div>
							</div>


							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner">
								<h4>Upstream & Downstream Water Supply Line</h4>
								<div class="chart-section h-100" id="udWatersl"></div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		<!--Section 2 end-->
	</div>
</div>
<!--dadu Department start-->