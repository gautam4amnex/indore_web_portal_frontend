<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!--House Department start-->
<div class="solid-wast-management side-dashboard-main active">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		
			<div class="col-12 text-center side-dashboard-title">
				<h4>Housing Board</h4>
				<div class="filter-select-main mt-2 pt-1">	
					
					<div class="form-group filter-select">
						<select class="form-control" name="wardType">
							<option value="">ward</option>
							<option value="a1">ward 1</option>
							<option value="a2">ward 2</option>
						</select>
					</div>
				</div>
			</div>
			
			<!--Section 1 start-->
			<div class="chart-section-solid p-2">
				<div class="row m-0 h-100">
					<div class="col-sm-12 col-md-12 col-lg-12 p-0">
						<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-0 pr-1 pt-1">
							<div class="title-chart-inner d-flex">
								<h4>Housing Board Schemes</h4>
<!-- 								<a href="javascript:void(0);"  data-toggle="modal" data-target="#myModal1"><i class="fa fa-th-large" aria-hidden="true"></i></a> -->
							</div>	
						</div>
						
						<div class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
							<div class="row h-100 m-0">
								<div class="col-sm-12 col-md-2 col-lg-1 p-0">
									<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
										
										<p class="title-sub-dept"><span class="count-dept">20</span><br/>Total Housing Board Schemes</p>
									</div>
								</div>
								<div class="col-sm-12 col-md-4 col-lg-5 chart-inner">
									<h4>Ward Wise Total Housing Board Schemes</h4>
									<div class="chart-section h-100" id="wwThbs">
										
									</div>
								</div>
								
								<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
									<h4>Income Groups Wise Total Housing Board Schemes</h4>
									<div class="chart-section h-100" id="igwThbs">
										
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>	
			<!--Section 1 end-->
			
			<!--Section 2 start-->
			<div class="chart-section-solid chart-section-without-title p-2">
				<div class="row m-0 h-100">
					
					   
						<div class="col-sm-12 col-md-12 col-lg-12 pt-0 pb-0 pr-0 pl-0">
							
							<div class="col-sm-12 col-md-12 col-lg-12 chart-main chart-main-fullh pb-0 pl-2 pr-1 pt-1">
								<div class="row h-100 m-0">
									<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
										<h4>Sector Type Wise Total Housing Board Schemes</h4>
										<div class="chart-section h-100" id="stwThbs">
											
										</div>
									</div>
									
									<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
										<h4>Zonal Type Wise Total Housing Board Schemes</h4>
										<div class="chart-section h-100" id="ztwThbs">
											
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

<div class="modal fade np-modal" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">			
	<div class="modal-dialog modal-xl modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">
					Composite Pits
				</h4>
				<div class="poopup-np">
					 <button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
			</div>
			<div class="modal-body">
				<table id="depCitizenMaster" class="display table-data tbl_dep " class="tbl-report"></table>
			</div>
		</div>
	</div>
</div>

<!--House Department start-->