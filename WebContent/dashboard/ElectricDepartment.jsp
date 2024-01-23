a<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
 --%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="electric-department-management side-dashboard-main dashboard-display inactive" id="dashboard_22">
	<div class="map-info-tab-link align-self-center">
	   <a class="nav-link slide-dashboard" href="javascript:void(0);"><span><i class="fa fa-angle-right"></i></span></a>
	</div>
	<div class="row side-dashboard-main-inner">

		<div class="col-12 text-center side-dashboard-title">
			<h4>Electrical Department</h4>
			<div class="filter-select-main mt-2 pt-1">
				<div class="form-group filter-select">
					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="22" id="electricWard">
					</select>
				</div>
			</div>
		</div>

<!-- 		<div class="col-12 text-center side-dashboard-title"> -->

<!-- 			<div class="filter-select-main mt-3 pt-1"> -->
<!-- 				<div class="form-group filter-select"> -->
<!-- 					<select class="form-control dashboard-ward-filter" name="exportType" data-dashboard_type="22" id="electricWard"> -->
<!-- 					</select> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!--Section 1 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Street Light</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_street_light_updatedDate"></label> -->
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
										<span class="count-dept total-street-light"></span><br />Total Street Lights
									</p>
								</div>
							</div>

							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								<h4>Ward Wise Street Lights</h4>
								<div class="chart-section h-100" id="ward_wise_street_lights"></div>
							</div>

<!-- 							<div class="col-sm-12 col-md-5 col-lg-5 chart-inner"> -->
<!-- 								<h4>Category wise Street Light</h4> -->
<!-- 								<div class="chart-section h-100" id="categorywise_Light"></div> -->
<!-- 							</div> -->


<!-- 							<div class="col-sm-12 col-md-6 col-lg-6 chart-inner"> -->
<!-- 								<h4>Voltage wise Street Light</h4> -->
<!-- 								<div class="chart-section h-100" id="waltagewise-Streetlight"></div> -->
<!-- 							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 1 end-->

		<!--Section 2 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

<!-- 				<div class="col-sm-6 col-md-6 col-lg-6 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Electric Pole</h4> -->
<!-- 							<div class="w-100 lineHeight-10"> -->
<!-- 								<div class="form-group zone_select float-right mb-0"> -->
<!-- 									<label class="m-2" id="tbl_electric_pole_updatedDate"></label> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-electric-poles"></span><br />Total Electric Poles -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
							
<!-- 							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner"> -->
<!-- 								<h4>Pole Type Wise Electric Poles</h4> -->
<!-- 								<div class="chart-section h-100" id="electricPole"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Transformers</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_transformers_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>

					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total-transformers"></span><br />Total Transformers
									</p>
								</div>
							</div>
							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								<h4>Ward Wise Transformers</h4>
								<div class="chart-section h-100" id="ward_wise_transformers"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--Section 2 end-->
		
		<!--Section 3 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0">
					<div
						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2">
						<div class="title-chart-inner d-flex">
							<h4>Smart LED</h4>
							<div class="w-100 lineHeight-10">
								<div class="form-group zone_select float-right mb-0">
									<label class="m-2">Updated Date: 31-Oct-2020</label>
<!-- 									<label class="m-2" id="tbl_ht_tower_updatedDate"></label> -->
								</div>
							</div>
						</div>
					</div>

					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-1 col-lg-1 p-0">
								<div
									class="row m-0 h-100 justify-content-center align-items-center card-count-custom">
									<p class="title-sub-dept">
										<span class="count-dept total_smart_led"></span><br />Total Smart LED
									</p>
								</div>
							</div>
							
							<div class="col-sm-12 col-md-11 col-lg-11 chart-inner">
								<h4>Ward Wise Smart LED</h4>
								<div class="chart-section h-100" id="ward_wise_smart_led_count"></div>
							</div>
							
<!-- 							<div class="col-sm-12 col-md-3 col-lg-3 chart-inner"> -->
<!-- 								<h4>Watt wise Smart LED Distribution(%)</h4> -->
<!-- 								<div class="chart-section h-100" id="watt_wise_smart_led_distribution"></div> -->
<!-- 							</div> -->
						</div>
					</div>

				</div>
<!-- 				<div class="col-sm-6 col-md-6 col-lg-6 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>Electric Junction Box</h4><div class="w-100 lineHeight-10"> -->
<!-- 								<div class="form-group zone_select float-right mb-0"> -->
<!-- 									<label class="m-2" id="tbl_electric_junction_box_updatedDate"></label> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-juncion-box"></span><br />Total Electric Junction Box -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner"> -->
<!-- 								<h4>Ward wise Electric Junction Box</h4> -->
<!-- 								<div class="chart-section h-100" id="wardWiseJunctionBox"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->

			</div>
		</div>
		<!--Section 3 end-->
		
		<!--Section 4 start-->
		<div class="chart-section-solid p-2">
			<div class="row m-0 h-100">

				<div class="col-sm-12 col-md-12 col-lg-12 p-0 ml-1">
					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2 chart-main-fullh">
						<div class="row h-100 m-0">
							<div class="col-sm-12 col-md-12 col-lg-12 chart-inner">
								<h4>Watt Wise Smart LED Distribution(%)</h4>
								<div class="chart-section h-100" id="watt_wise_smart_led_distribution"></div>
							</div>
						</div>
					</div>
				</div>


			</div>
		</div>
		
		
		
<!-- 		<div class="chart-section-solid p-2"> -->
<!-- 			<div class="row m-0 h-100"> -->

<!-- 				<div class="col-sm-6 col-md-6 col-lg-6 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>HT Line</h4> -->
<!-- 							<div class="w-100 lineHeight-10"> -->
<!-- 								<div class="form-group zone_select float-right mb-0"> -->
<!-- 									<label class="m-2" id="tbl_ht_lines_updatedDate"></label> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 								<div -->
<!-- 									class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-ht-line"></span><br />Total HT Line -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
							
<!-- 							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner"> -->
<!-- 								<h4>Type wise HT Line</h4> -->
<!-- 								<div class="chart-section h-100" id="totalHtLines"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->

<!-- 				</div> -->
<!-- 				<div class="col-sm-6 col-md-6 col-lg-6 p-0"> -->
<!-- 					<div -->
<!-- 						class="col-sm-12 col-md-12 col-lg-12 chart-title align-self-center pl-2"> -->
<!-- 						<div class="title-chart-inner d-flex"> -->
<!-- 							<h4>LT Line</h4> -->
<!-- 							<div class="w-100 lineHeight-10"> -->
<!-- 								<div class="form-group zone_select float-right mb-0"> -->
<!-- 									<label class="m-2" id="tbl_lt_lines_updatedDate"></label> -->
<!-- 								</div> -->
<!-- 							</div> -->

<!-- 						</div> -->
<!-- 					</div> -->

<!-- 					<div class="col-sm-12 col-md-12 col-lg-12 chart-main pl-2"> -->
<!-- 						<div class="row h-100 m-0"> -->
<!-- 							<div class="col-sm-12 col-md-2 col-lg-2 p-0"> -->
<!-- 								<div class="row m-0 h-100 justify-content-center align-items-center card-count-custom"> -->
<!-- 									<p class="title-sub-dept"> -->
<!-- 										<span class="count-dept total-lt-line"></span><br />Total LT Line -->
<!-- 									</p> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 							<div class="col-sm-12 col-md-10 col-lg-10 chart-inner"> -->
<!-- 								<h4>Type wise LT Line</h4> -->
<!-- 								<div class="chart-section h-100" id="totalLtLines"></div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->

<!-- 			</div> -->
<!-- 		</div> -->
		<!--Section 4 end-->
	</div>
<!-- Modal -->
</div>