<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!--dadu Department start-->
<div class="box-layout-management side-dashboard-main inactive" id="dashboard_18">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		
		<div class="col-12 text-center side-dashboard-title">
			<h4>Madhya Pradesh Pollution Control Board (MPPCB)</h4>
			<div class="filter-select-main mt-2 pt-1">	
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="wardType" data-dashboard_type="18" id="mppcbWard">
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
							<h4>Mixture Of Gases</h4>
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_mppcb"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a>	 -->
						</div>	
					</div>
					
					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							
							<div class="col-sm-12 col-md-4 col-lg-4 p-0">
								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept"><span class="count-dept big no2-count">210</span><br/>No<small>2</small></p>
								</div>
							</div>
							
							<div class="col-sm-12 col-md-4 col-lg-4 p-0">
								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									
									<p class="title-sub-dept"><span class="count-dept big co-count">0.200</span><br/>CO</p>
								</div>
							</div>
							
							<!-- <div class="col-sm-12 col-md-4 col-lg-4 p-0">
								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									
									<p class="title-sub-dept"><span class="count-dept big">101</span><br/>No<small>2</small></p>
								</div>
							</div> -->
							
							<div class="col-sm-12 col-md-4 col-lg-4 p-0">
								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									
									<p class="title-sub-dept"><span class="count-dept big o3-count">210</span><br/>O<small>3</small></p>
								</div>
							</div>
							
							<div class="col-sm-12 col-md-4 col-lg-4 p-0">
								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									
									<p class="title-sub-dept"><span class="count-dept big ph10-count">28</span><br/>Ph<small>10</small></p>
								</div>
							</div>
							
							<!-- <div class="col-sm-12 col-md-4 col-lg-4 p-0">
								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept"><span class="count-dept big so2-count">75</span><br/>So<small>2</small></p>
								</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>	
		<!--Section 1 end-->
							
		<!--Section 2 start-->
		<div class="chart-section-solid chart-section-without-title p-2">
			<div class="row m-0 h-100">
				<div class="col-sm-12 col-md-12 col-lg-6 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-main chart-main-fullh pb-0 pl-0 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Mixture Of Minerals</h4>
								<div class="chart-section h-100" id="mixOmin">
								</div>
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