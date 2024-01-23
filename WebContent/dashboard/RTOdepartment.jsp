<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="police-department-management side-dashboard-main dashboard-display solid-wast-management inactive" id="dashboard_7">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		<div class="col-12 text-center side-dashboard-title">
			<h4>RTO Department</h4>
			<div class="filter-select-main mt-3 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="7" id="rtoWard">
					</select>
				</div>
			</div>
		</div>
<!-- 		<div class="col-12 text-center side-dashboard-title"> -->
			
<!-- 		</div> -->
	<!--Section 1 start-->
		<div class="chart-section-solid p-4 chart-section-without-title">
			<div class="row m-0 h-100">
				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1 chart-main-fullh">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Buil up Area wise RTO (in m) </h4>
								<div class="chart-section h-100" id="BuilupArea"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 1 end-->
		<!--Section 2 start-->
		<div class="chart-section-solid p-2 chart-section-without-title">
			<div class="row m-0 h-100">
				<div class="col-sm-6 col-md-6 col-lg-6 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 chart-main-fullh">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>RTO wise No. of Pending Cases</h4>
								<div class="chart-section h-100" id="rtowise_pendingcase"></div>
							</div>
						</div>
					</div>
				</div>
			<div class="col-sm-6 col-md-6 col-lg-6 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1">
					</div>
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1 chart-main-fullh">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>RTO wise No. of Officers</h4>
								<div class="chart-section h-100" id="rtowise_officersNumber"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 2 end-->
	</div>
<!-- Modal -->
</div>