<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="side-dashboard-main inactive" id="dashboard_2">
	<div class="map-info-tab-link align-self-center"> 
		<a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i
				class="fa fa-angle-right"></i></span></a>
	</div> 
	<div class="row side-dashboard-main-inner">

		<div class="col-12 text-center side-dashboard-title">
			<h4>Education Department</h4>
				<div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter"  data-dashboard_type="2" name="exportType" id="educationWard">
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

<!-- 		<div class="col-12 text-center side-dashboard-title"> -->

		
<!-- 		</div> -->

		<!--Section 0 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">
				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
<!-- 							<h4>Educational Institutes</h4> -->
							<h4>Primary Schools</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
								</div>
							</div>
						</div>
					</div>
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
<!-- 										<span class="count-dept total_institutes"></span><br />Total Institutes -->
										<span class="count-dept total-primary-schools"></span><br />Total Primary Schools
									</p>
								</div>
							</div>
							
							
							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner">
								<h4>Play Ground Distribution(%)</h4>
								<div class="chart-section h-100" id="play_ground_wise_primary_schools"></div>
							</div>
							
							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner">
								<h4>Male Hostel Distribution(%)</h4>
								<div class="chart-section h-100" id="male_hostel_wise_primary_schools"></div>
							</div>
							
							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner">
								<h4>Female Hostel Distribution(%)</h4>
								<div class="chart-section h-100" id="female_hostel_wise_primary_schools"></div>
							</div>
							
							
<!-- 							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner"> -->
<!-- 								<h4>Type wise Institute Distribution(%)</h4> -->
<!-- 								<div class="chart-section h-100" id="percentage_wise_institutes"></div> -->
<!-- 							</div> -->
							
<!-- 							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner"> -->
<!-- 								<h4>Institutes having Playground(%)</h4> -->
<!-- 								<div class="chart-section h-100" id="play_ground_wise_institutes"></div> -->
<!-- 							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 0 end-->


		<!--Section 1 start-->
		<div class="chart-section-solid p-2 mt-2">
			<div class="row m-0 h-100">
				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Secondary Schools</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
								</div>
							</div>
						</div>
					</div>
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-secondary-schools"></span><br />Total Secondary Schools
									</p>
								</div>
							</div>
							
							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner">
								<h4>Play Ground Distribution(%)</h4>
								<div class="chart-section h-100" id="play_ground_wise_secondary_schools"></div>
							</div>
							
							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner">
								<h4>Male Hostel Distribution(%)</h4>
								<div class="chart-section h-100" id="male_hostel_wise_secodary_schools"></div>
							</div>
							
							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner">
								<h4>Female Hostel Distribution(%)</h4>
								<div class="chart-section h-100" id="female_hostel_wise_secodary_schools"></div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
		
		<!-- <div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Hostel Facility in Institutes</h4>
						</div>
					</div>

					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-3">
						<div class="row h-100 m-0">

							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>Male Hostel(%)</h4>
								<div class="chart-section h-100" id="male_hostel_wise_institutes"></div>
							</div>
							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner">
								<h4>Female Hostel(%)</h4>
								<div class="chart-section h-100" id="female_hostel_wise_institutes"></div>
							</div>


						</div>
					</div>
				</div>
			</div>
		</div> -->
		<!--Section 1 end-->

		<!--Section 2 start-->
		
		
		<div class="chart-section-solid p-2 mt-2">
			<div class="row m-0 h-100">
				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Zone Wise Institutes</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2"></label>
								</div>
							</div>
						</div>
					</div>
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total_institutes"></span><br />Total Institutes
									</p>
								</div>
							</div>
							
							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								<h4>Zone Wise Institutes</h4>
								<div class="chart-section h-100" id="ward_wise_count"></div>
							</div>
							
							
						</div>
					</div>
				</div>
			</div>
		</div>
		
<!-- 		<div class="chart-section-solid p-2"> -->
<!-- 			<div class="row m-0 h-100"> -->

<!-- 				<div class="col-sm-12 col-md-12 col-lg-12 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Ward wise Institutes</h4> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner"> -->
<!-- 								<h4>Ward wise Institute Count</h4> -->
<!-- 								<div class="chart-section h-100" id="ward_wise_institute"></div> -->
<!-- 							</div> -->
							

<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!--Section 2 end-->

		<!--Section 1 start-->
<!-- 		<div class="chart-section-solid p-2"> -->
<!-- 			<div class="row m-0 h-100"> -->

<!-- 				<div class="col-sm-12 col-md-12 col-lg-12 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Primary Schools</h4> -->
 
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-1 col-lg-1 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-primary-schools"></span><br />Total Primary Schools -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner"> -->
<!-- 								<h4>Management Wise Primary Schools</h4> -->
<!-- 								<div class="chart-section h-100" id="catPrimaryScl"></div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner"> -->
<!-- 								<h4>Category Wise Primary Schools</h4> -->
<!-- 								<div class="chart-section h-100" id="studPrimaryScl"></div> -->
<!-- 							</div> -->


<!-- 							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner"> -->
<!-- 								<h4>Gender wise Toilet Schools</h4> -->
<!-- 								<div class="chart-section h-100" id="teacPrimaryScl"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!--Section 1 end-->

		<!--Section 2 start-->
<!-- 		<div class="chart-section-solid p-2"> -->
<!-- 			<div class="row m-0 h-100"> -->

<!-- 				<div class="col-sm-12 col-md-12 col-lg-12 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Secondary Schools</h4> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-1 col-lg-1 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-secondary-schools"></span><br />Total Secondary -->
<!-- 										Schools -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner"> -->
<!-- 								<h4>Management Wise Secondary Schools</h4> -->
<!-- 								<div class="chart-section h-100" id="catSecondaryScl"></div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner"> -->
<!-- 								<h4>Category Wise Wise Secondary Schools</h4> -->
<!-- 								<div class="chart-section h-100" id="studSecondaryScl"></div> -->
<!-- 							</div> -->


<!-- 							<div class="col-sm-12 col-md-4 col-lg-4 chart-inner"> -->
<!-- 								<h4>Gender wise Toilet Facility</h4> -->
<!-- 								<div class="chart-section h-100" id="teacSecondaryScl"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!--Section 2 end-->
		<!--Section 3 start-->
	</div>
	<!--Section 3 end-->
</div>