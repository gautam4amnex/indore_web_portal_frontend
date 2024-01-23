<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div
	class="police-department-management side-dashboard-main dashboard-display solid-wast-management inactive"
	id="dashboard_6">
	<div class="map-info-tab-link align-self-center">
		<a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i
				class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">

		<div class="col-12 text-center side-dashboard-title">
			<h4>IDA Scheme Boundary</h4>
			<div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter"
						name="exportType" data-dashboard_type="6" id="idaWard">
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
									<h4>Status Wise Total TP Schemes</h4>
									<div class="w-100 lineHeight-10">
										<div class="form-group zone_select float-right mb-0">
											<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 											<label class="m-2" id="tbl_ida_updatedDate"></label> -->
										</div>
									</div>
								</div>	
							</div>
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
								<div class="row h-100 m-0">
									<div class="col-sm-12 col-md-1 col-lg-1 p-0">
										<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
											<p class="title-sub-dept"><span class="count-dept total-tp-scheme-count"></span><br />Total TP Schemes
											</p>
										</div>
									</div>
									
									
									<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
										<div class="chart-section h-100" id="idaBoundry">
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>
	
		<!--Section 1 end-->
		
		<!--Section 2 start-->
		<div class="chart-section-solid p-3">
			<div
				class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1">
				<div class="title-chart-inner d-flex">
					<h4>Developed Schemes</h4>
<!-- 					<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 						data-toggle="modal" data-target="#myModal1" -->
<!-- 						data-table_name="tbl_ida"><i -->
<!-- 						class="fa fa-th-large" aria-hidden="true"></i></a> -->
				</div>
			</div>

			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-developed-scheme-count"></span><br />Total Developed Schemes
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								

									<div class="chart-section h-100" id="DevelopedSchemeArea"></div>
								
							</div>


						</div>
					</div>

				</div>
				
			</div>
		</div>
		<!--Section 2 end-->
	
		<!--Section 3 start-->
		<div class="chart-section-solid p-3">
			<div
				class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1">
				<div class="title-chart-inner d-flex">
					<h4>Proposed Schemes</h4>
<!-- 					<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 						data-toggle="modal" data-target="#myModal1" -->
<!-- 						data-table_name="tbl_ida"><i -->
<!-- 						class="fa fa-th-large" aria-hidden="true"></i></a> -->
				</div>
			</div>

			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-proposed-scheme-count"></span><br />Total Proposed Schemes
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								

									<div class="chart-section h-100" id="ProposedSchemeArea"></div>
								
							</div>


						</div>
					</div>

				</div>
				
			</div>
		</div>
		<!--Section 3 end-->

	</div>
	<!-- Modal -->
</div>