<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!--land record Department start-->

<div class="side-dashboard-main inactive" id="dashboard_26">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		
			<div class="col-12 text-center side-dashboard-title">
				<h4>Land Record Department</h4>
				<div class="filter-select-main mt-2 pt-1">	
					<div class="form-group filter-select">
						<select class="form-control dashboard-ward-filter" name="wardType" data-dashboard_type="26" id="lanRecordWard">
						</select>
					</div>
				</div>
			</div>
			
			<!--Section 1 start-->
				<div class="chart-section-solid chart-section-solid-md p-2">
					<div class="row m-0 h-100">
						<div class="col-sm-12 col-md-12 col-lg-12 p-0 ml-1">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
								<div class="title-chart-inner d-flex">
									<h4>Agricultural Land</h4>
									<div class="w-100 lineHeight-10">
										<div class="form-group zone_select float-right mb-0">
											<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 											<label class="m-2" id="tbl_land_record_updatedDate"></label> -->
										</div>
									</div>
								</div>	
							</div>
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
								<div class="row h-100 m-0">
<!-- 									<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 										<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 											<p class="title-sub-dept"><span class="count-dept total_parcel_types"></span><br/>Total Parcel Types</p> -->
<!-- 										</div> -->
<!-- 									</div> -->
									
									
									<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
										<h4>Zone Wise Agricultural Land</h4>
										<div class="chart-section h-100" id="zone_wise_agriculture_land">
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
				</div>	
				<!--Section 1 end-->
		
		
		<!--Section 1.1 start-->
				<div class="chart-section-solid chart-section-solid-md p-2">
					<div class="row m-0 h-100">
						<div class="col-sm-12 col-md-12 col-lg-12 p-0 ml-1">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
								<div class="title-chart-inner d-flex">
									<h4>Village Area</h4>
								</div>	
							</div>
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
								<div class="row h-100 m-0">
<!-- 									<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 										<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 											<p class="title-sub-dept"><span class="count-dept total_villages"></span><br/>Total Villages</p> -->
<!-- 										</div> -->
<!-- 									</div> -->
									
									
									<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
										<h4>Zone Wise Village Area</h4>
										<div class="chart-section h-100" id="zone_wise_village">
										</div>
									</div>
								</div>
							</div>
						</div>
							
						
					</div>
				</div>	
				<!--Section 1.1 end-->
		
		
		<!--Section 1.2 start-->
				<div class="chart-section-solid chart-section-solid-md p-2">
					<div class="row m-0 h-100">
						<div class="col-sm-12 col-md-12 col-lg-12 p-0 ml-1">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
								<div class="title-chart-inner d-flex">
									<h4>Open Space Area</h4>
								</div>	
							</div>
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
								<div class="row h-100 m-0">
									
									<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
										<h4>Zone Wise Open Space Area</h4>
										<div class="chart-section h-100" id="zone_wise_open_space">
										</div>
									</div>
								</div>
							</div>
						</div>
							
						
					</div>
				</div>	
				<!--Section 1.2 end-->
		
		
		<!--Section 1.3 start-->
				<div class="chart-section-solid chart-section-solid-md p-2">
					<div class="row m-0 h-100">
						<div class="col-sm-12 col-md-12 col-lg-12 p-0 ml-1">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
								<div class="title-chart-inner d-flex">
									<h4>Khasra Boundary</h4>
								</div>	
							</div>
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
								<div class="row h-100 m-0">
									
									
									<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
										<h4>Zone Wise Khasra Distribution(%)</h4>
										<div class="chart-section h-100" id="zone_wise_khasra">
										</div>
									</div>
								</div>
							</div>
						</div>
							
						
					</div>
				</div>	
		<!--Section 1.3 end-->
		
		
	</div>
</div>
