<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!--Register & Conference Hall start-->
<div class="revenue-dept awas-single-management side-dashboard-main active">
	<div class="map-info-tab-link align-self-center">
	  <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">
		
			<div class="col-12 text-center side-dashboard-title">
				<h4>Register Department</h4>
				
			</div>
			
			<div class="col-12 text-center side-dashboard-title">
								
				<div class="filter-select-main mt-3 pt-1">	
					<div class="form-group filter-select">
						<select class="form-control" name="exportType">
							<option value="">Ward</option>
							<option value="a1">PDF</option>
							<option value="a2">PNG</option>
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
								<h4>Register Land</h4>
								<a href="javascript:void(0);"  data-toggle="modal" data-target="#myModal2"><i class="fa fa-th-large" aria-hidden="true"></i></a>
								
							</div>	
						</div>
						
						<div class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
							<div class="row h-100 m-0">
								<div class="col-sm-12 col-md-3 col-lg-2 p-0">
									<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
										
										<p class="title-sub-dept"><span class="count-dept big">25000</span><br/>Total Register <br/>Land</p>
									</div>
								</div>
								<div class="col-sm-12 col-md-9 col-lg-5 chart-inner">
									<h4>Type Of Land</h4>
									<div class="chart-section h-100" id="typeOfland">
										
									</div>
								</div>
								
								<div class="col-sm-12 col-md-6 col-lg-5 chart-inner">
									<h4>Scheme System</h4>
									<div class="chart-section h-100" id="schemeSystem">
										
									</div>
								</div>
								
							</div>
						</div>
					</div>
					
				</div>
			</div>	
			<!--Section 1 end-->
			
	</div>
	
</div>
<div class="modal fade np-modal" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">			
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
				<table id="depCitizenMaster" class="display nowrap table-data tbl_dep " class="tbl-report"></table>
			</div>
		</div>
	</div>
</div>
	
<!--Register End-->