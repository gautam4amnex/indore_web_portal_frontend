<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!--Women & Child Development Department start-->

<div class="icds-department-management side-dashboard-main inactive"
	id="dashboard_17">
	<div class="map-info-tab-link align-self-center">
		<a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i
				class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">

		<div class="col-12 text-center side-dashboard-title">
			<h4>Women & Child Welfare Department</h4>
			<div class="filter-select-main mt-2 pt-1">

				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="wardType"
						data-dashboard_type="17" id="womanWard">
					</select>
				</div>
			</div>
		</div>

		<!--Section 1 start-->
		<div class="chart-section-solid chart-section-solid-md p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Total Anganwadi</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_anganwadi_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">

						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-3 col-lg-3 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total_anganwadi"></span><br>Total Anganwadi
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-9 col-lg-9 chart-inner">
								<h4>Open Space or Playground Present In Anganwadi(%)</h4>
								<div class="chart-section h-100" id="open_space_wise_anganwadi"></div>
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

				<div class="col-sm-12 col-md-12 col-lg-12 p-0 ml-1">
					

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
<!-- 							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner"> -->
<!-- 								<h4>Vaccination in Anganwadi(%)</h4> -->
<!-- 								<div class="chart-section h-100" id="vaccination_wise_anganwadi"></div> -->
<!-- 							</div> -->
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Ward Wise Anganwadi</h4>
								<div class="chart-section h-100" id="ward_wise_aanganadi_count"></div>
							</div>


						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 2 end-->
		
	</div>
</div>
<!--Women & Child Development Department start-->