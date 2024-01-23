<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div
	class="health-department-management side-dashboard-main dashboard-display solid-wast-management inactive" id="dashboard_1">
	<div class="map-info-tab-link align-self-center">
		<a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i
				class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">

		<div class="col-12 text-center side-dashboard-title">
			<h4>Health Department</h4>
			<div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter"
						name="exportType" data-dashboard_type="1" id="healthWard">
					</select>
				</div>
			</div>
			<!-- <div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control" name="exportType">
						<option value="">Export</option>
						<option value="a1">PDF</option>
						<option value="a2">PNG</option>
					</select>
				</div>
			</div> -->
		</div>

	
		<!--Section 1 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Hospitals</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_health_hospital_updatedDate"></label> -->
								</div>
							</div>
<!-- 							<a href="javascript:void(0);" class="dashboard-table-view" -->
<!-- 								data-toggle="modal" data-target="#myModal1" -->
<!-- 								data-table_name="tbl_health_hospital"><i -->
<!-- 								class="fa fa-th-large" aria-hidden="true"></i></a> -->
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-2 col-lg-2 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-hospital"></span><br />Total
										Hospitals
									</p>
								</div>
							</div>
							<div class="col-sm-6 col-md-10 col-lg-10 p-0">

								<div
									class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1 chart-main-fullh">
									<div class="row h-100 m-0">

										<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
											<h4>Ownership Type Wise Hospitals</h4>
											<div class="chart-section h-100" id="ownership_hospital"></div>
										</div>
									</div>
								</div>

							</div>

<!-- 							<div class="col-sm-6 col-md-6 col-lg-6 p-0"> -->

<!-- 								<div -->
<!-- 									class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1 chart-main-fullh"> -->
<!-- 									<div class="row h-100 m-0"> -->

<!-- 										<div class="col-sm-12 col-md-12 col-lg-12 chart-inner"> -->
<!-- 											<h4>Category Wise Hospital</h4> -->
<!-- 											<div class="chart-section h-100" id="categorywise_hospital"></div> -->
<!-- 										</div> -->
<!-- 									</div> -->
<!-- 								</div> -->

<!-- 							</div> -->


<!-- 							<div class="col-sm-6 col-md-4 col-lg-4 p-0"> -->

<!-- 								<div -->
<!-- 									class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1 chart-main-fullh"> -->
<!-- 									<div class="row h-100 m-0"> -->

<!-- 										<div class="col-sm-12 col-md-12 col-lg-12 chart-inner"> -->
<!-- 											<h4>Facilities Wise Hospital</h4> -->
<!-- 											<div class="chart-section h-100" id="facilitywise"></div> -->
<!-- 										</div> -->
<!-- 									</div> -->
<!-- 								</div> -->

<!-- 							</div> -->
							<!-- <div class="col-sm-6 col-md-4 col-lg-4 p-0">
								<div
									class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1 chart-main-fullh">
									<div class="row h-100 m-0">

										<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
											<h4>Emergency Services</h4>
											<div class="chart-section h-100" id="emergency_services"></div>
										</div>
									</div>
								</div>
							</div> -->
						</div>
					</div>

				</div>

			</div>
		</div>
		<!--Section 1 end-->
		
<!-- 		SECTION 1.0 START -->
		
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Hospital Wise ICU</h4>
								<div class="chart-section h-100" id="hospital_wise_icu_count"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
<!-- 		SECTION 1.0 END -->
		
		<!-- Section 1.1 -->
				<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
						<div class="row h-100 m-0">
						
							

							<div class="col-sm-6 col-md-4 col-lg-4 p-0">
								<div
									class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-3 pr-1 pt-1 chart-main-fullh">
									<div class="row h-100 m-0">

										<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
											<h4>Emergency Services(%)</h4>
											<div class="chart-section h-100" id="emergency_services"></div>
										</div>
									</div>
								</div>
							</div>
						
							<div class="col-sm-6 col-md-4 col-lg-4 p-0">
								<div
									class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1 chart-main-fullh">
									<div class="row h-100 m-0">

										<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
											<h4>Blood Bank Facility(%)</h4>
											<div class="chart-section h-100" id="blood_bank_facility"></div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="col-sm-6 col-md-4 col-lg-4 p-0">
								<div
									class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1 chart-main-fullh">
									<div class="row h-100 m-0">

										<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
											<h4>Mortuary(%)</h4>
											<div class="chart-section h-100" id="mortuary_facility"></div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
					</div>

				</div>

			</div>
		</div>
		<!-- Section 1.1 End -->
		
		<!--Section 1.2 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Ward Wise Hospitals</h4>
								<div class="chart-section h-100" id="wardWiseHospitals"></div>
							</div>
						</div>
					</div>

				</div>
				

			</div>
		</div>
		<!--Section 1.2 end-->
		
		<!--Section 2 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					
					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center p-1">
						<div class="title-chart-inner d-flex">
							<h4>Pharmacies</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_pharmacies_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total_pharmacies"></span><br />Total Pharmacies
									</p>
								</div>
							</div>
							
							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								<h4>Ward Wise Pharmacies</h4>
								<div class="chart-section h-100" id="wardWisePharmacy"></div>
							</div>
						</div>
					</div>

				</div>
				

			</div>
		</div>
		<!--Section 2 end-->
		
		<!--Section 3 start-->
		<div class="chart-section-solid p-2 mt-3">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 pl-2">
					
					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center p-1">
						<div class="title-chart-inner d-flex">
							<h4>UPHC</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 03-Nov-2020</label>
<!-- 									<label class="m-2" id="tbl_health_uphc_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main p-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-uphc"></span><br />Total UPHC
									</p>
								</div>
							</div>
							
							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								<h4>Ward Wise UPHC</h4>
								<div class="chart-section h-100" id="ward_wise_uphc"></div>
							</div>
						</div>
					</div>

				</div>
				

			</div>
		</div>
		
		
		
		
		<!-- <div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-6 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>UPHC</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2" id="tbl_health_uphc_updatedDate"></label>
								</div>
							</div>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-2 col-lg-2 chart-main pl-2">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-uphc"></span><br />Total UPHC
									</p>
								</div>
							</div>


						</div>
					</div>

				</div>
				<div class="col-sm-6 col-md-2 col-lg-2 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pb-0 pl-1 pr-0 pt-1">
						<div class="title-chart-inner d-flex">
							<h4>Clinics</h4>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pb-0 pl-0 pr-1 pt-1">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-clinics"></span><br />Total
										Clinics
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<!--Section 3 end-->
	</div>
	<!-- Modal -->
</div>