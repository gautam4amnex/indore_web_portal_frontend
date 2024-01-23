<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp" %>

<link rel="stylesheet" type="text/css" href="${context}/css/daterangepicker.css" />

<title>Event Management</title>

	<!-- Page Content -->
		<div class="page-content-wrapper">
		<div class="container-fluid h-100 p-0">
			<jsp:include page="/common/header.jsp" />
			
			<div class="admin-content">
				<ul class="nav nav-tabs full-linetab-admin justify-content-center">
					  <li class="nav-item">
						<a class="nav-link tab-data active" data-toggle="tab" href="#event_master" data-translate = "event_events">Events</a>
					  </li>
					  
				</ul>
				<div class="tab-content">	
					<div class="tab-pane container-fluid active" id="event_master">
				  		<div class="text-right">
							<button data-toggle="modal" data-target="#dep_add_event" class="btn-add btn-indore-table event_addBtn" id="dep_add_event_popup" data-translate="events_addevent">Add Event</button>
						</div>
						<h6 class="table-title-grid" data-translate="events_levents">List of Events</h6>
						<table id="depCitizenMaster" class="display tbl_dep" class="tbl-report"></table>
				  	</div>
				</div>
					
			</div>
		
			</div>
		</div>
		<!--Add Response Master Modal start -->
					<div class="modal fade" id="dep_add_event" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate = "events_addevent">Add Event</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_dep_events">

									
							  	
							  		<div class="form-group">
												<label for="dep_event_department" data-translate = "_select_department">Select Department</label><span class="mandatory">*</span>
												<select class="form-control pb-1" id="dep_event_department" name="dep_event_department">
												</select>
									</div>
							  	
									<div class="form-group">
										<label for="event_name" data-translate = "events_ename">Event Name</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="event_name" name = "event_name" placeholder="Enter Event Name" data-translate = "events_eename">
									</div>
									
									<div class="form-group">
										<label for="event_desc" data-translate = "events_desc">Description</label>
										<textarea class="form-control" rows="2" id="event_desc" name = "event_desc"></textarea>
									</div>
									
									<div class="form-group">
										<label for="event_venue" data-translate = "events_venue">Venue</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="event_venue" name = "event_venue" placeholder="Enter Venue" data-translate = "events_evenue">
									</div>
									
									<div class="row">
										<div class="col-12">
											<div class="form-group">
												<label for="event_sdate" data-translate = "events_date">Date & Time</label><span class="mandatory">*</span>
												<input type="text" class="form-control datepicker" id="event_sdate" name = "event_sdate" placeholder="Date & Time" data-translate = "events_date">
											</div>
										</div>
										<!-- <div class="col-12">
											<div class="form-group">
												<label for="event_edate">End Date</label>
												<input type="text" class="form-control datepicker" id="event_edate" name = "event_edate" placeholder="End Date">
											</div>
										</div> -->
									</div>
									
									<div class="form-group">
										<label for="event_webaddress" data-translate = "events_webaddress">Web Address</label>
										<input type="text" class="form-control" id="event_webaddress" name = "event_webaddress" placeholder="Enter Web Address" data-translate = "events_ewebaddress">
									</div>
									
									<div class="form-group">
										<label for="event_efee" data-translate = "events_entree_fee">Entry Fee</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="event_efee" name = "event_efee" placeholder="Enter Entry Fee" data-translate = "events_eentree_fee">
									</div>
									
									<div class="form-group">
										<label for="event_cperson" data-translate = "events_contact_person">Contact Person</label> 
										<input type="text" class="form-control" id="event_cperson" name = "event_cperson" placeholder="Enter Contact Person" data-translate = "events_e_contact_person">
									</div>
									
									<div class="form-group">
										<label for="event_email" data-translate = "events_email_id">Email Id</label><span class="mandatory">*</span>
										<input type="email" class="form-control" id="event_email" name = "event_email" placeholder="Enter Email Id" data-translate = "events_eemail_id">
									</div>
									
									<div class="form-group">
										<label for="event_conno" data-translate = "events_cnumber">Contact Number</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="event_conno" name = "event_conno" placeholder="Enter Contact Number" data-translate = "events_ecumber">
									</div>
									
									<div class="form-group">
										<label for="event_Organizer" data-translate = "events_organizer">Organizer</label>
										<input type="text" class="form-control" id="event_Organizer" name = "event_Organizer" placeholder="Enter Organizer" data-translate = "events_eorganizer">
									</div>
									
									<div class="form-group">
										<label for="event_latitude" data-translate = "_latitude">Latitude</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="event_latitude" name = "event_latitude" placeholder="Enter Latitude" data-translate = "pholder_lat">
										
									</div>
									<div class="form-group">
										<label for="event_longitude" data-translate = "_longitude">Longitude</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="event_longitude" name = "event_longitude" placeholder="Enter Longitude" data-translate = "pholder_long">
									</div>
									
									<div class="form-group">
										<label for="event_file" data-translate = "events_upload_file">Upload File</label><span class="mandatory">*</span>
										<input type="file" multiple class="form-control" id="event_file" name = "event_file" placeholder=" ">
									</div>
									
									<div class="text-center">
										<button type="submit" class="btn btn-indore" data-translate= "_save">Save</button>
										<button class="btn btn-indore" data-dismiss="modal" data-translate = "_cancel">Cancel</button>
									</div>
								
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
			<!--Add Response Master Modal end -->
			
			
			<div id="imageModal" class="modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" id="imageModalCloseBtn" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div id="carouselExampleControls" class="carousel slide"
							data-ride="carousel">
							<div class="carousel-inner" id="carousel-inner">
<!-- 							ADDED THE IMAGE FILES HERE WITH JQUERY -->
							</div>
							<a class="carousel-control-prev" href="#carouselExampleControls"
								role="button" data-slide="prev"> <span
								class="carousel-control-prev-icon" aria-hidden="true"></span> <span
								class="sr-only">Previous</span>
							</a> <a class="carousel-control-next" href="#carouselExampleControls"
								role="button" data-slide="next"> <span
								class="carousel-control-next-icon" aria-hidden="true"></span> <span
								class="sr-only">Next</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- edit event popup start-->
		
		
		<div class="modal fade" id="dep_edit_event" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate = "events_edit">Edit Event</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_edit_dep_events">
							  	
							  		<div class="form-group">
										<input type="hidden" class="form-control" id="eventId" name="eventId" value="" readonly>
										<input type="hidden" class="form-control" id="statusId" name="statusId" value="" readonly>
									</div>
									
									<div class="form-group">
												<label for="dep_event_update_department" data-translate = "_select_department">Select Department</label><span class="mandatory">*</span>
												<select class="form-control pb-1" id="dep_event_update_department" name="dep_event_update_department">
												</select>
									</div>
							  	
									<div class="form-group">
										<label for="edit_event_name" data-translate = "events_ename">Event Name</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="edit_event_name" name = "edit_event_name" placeholder="Enter Event Name" data-translate = "events_eename">
									</div>
									
									<div class="form-group">
										<label for="edit_event_desc" data-translate = "events_desc">Description</label>
										<textarea class="form-control" rows="2" id="edit_event_desc" name = "edit_event_desc"></textarea>
									</div>
									
									<div class="form-group">
										<label for="edit_event_venue" data-translate = "events_venue">Venue</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="edit_event_venue" name = "edit_event_venue" placeholder="Enter Venue" data-translate = "events_evenue">
									</div>
									
									<div class="row">
										<div class="col-12">
											<div class="form-group">
												<label for="edit_event_sdate" data-translate = "events_date">Date</label><span class="mandatory">*</span>
												<input type="text" class="form-control datepicker" id="edit_event_sdate" name = "edit_event_sdate" placeholder=" Date" data-translate = "events_date">
											</div>
										</div>
										<!-- <div class="col-12">
											<div class="form-group">
												<label for="edit_event_edate">End Date</label>
												<input type="text" class="form-control datepicker" id="edit_event_edate" name = "edit_event_edate" placeholder="End Date">
											</div>
										</div> -->
									</div>
									
									
									<div class="form-group">
										<label for="edit_event_webaddress" data-translate = "events_webaddress">Web Address</label>
										<input type="text" class="form-control" id="edit_event_webaddress" name = "edit_event_webaddress" placeholder="Enter Web Address" data-translate = "events_ewebaddress">
									</div>
									
									<div class="form-group">
										<label for="edit_event_efee" data-translate = "events_entree_fee">Entry Fee</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="edit_event_efee" name = "edit_event_efee" placeholder="Enter Entry Fee" data-translate = "events_eentree_fee">
									</div>
									
									<div class="form-group">
										<label for="edit_event_cperson" data-translate = "events_contact_person">Contact Person</label>
										<input type="text" class="form-control" id="edit_event_cperson" name = "edit_event_cperson" placeholder="Enter Contact Person" data-translate = "events_e_contact_person">
									</div>
									
									<div class="form-group">
										<label for="edit_event_email" data-translate = "events_email_id">Email Id</label><span class="mandatory">*</span>
										<input type="email" class="form-control" id="edit_event_email" name = "edit_event_email" placeholder="Enter Email Id" data-translate = "events_eemail_id">
									</div>
									
									<div class="form-group">
										<label for="edit_event_conno" data-translate = "events_cnumber">Contact Number</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="edit_event_conno" name = "edit_event_conno" placeholder="Enter Contact Number" data-translate = "events_ecumber">
									</div>
									
									<div class="form-group">
										<label for="edit_event_Organizer" data-translate = "events_organizer">Organizer</label>
										<input type="text" class="form-control" id="edit_event_Organizer" name = "edit_event_Organizer" placeholder="Enter Organizer" data-translate = "events_eorganizer">
									</div>
									
									<div class="form-group">
										<label for="edit_event_latitude" data-translate = "_latitude">Latitude</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="edit_event_latitude" name = "edit_event_latitude" placeholder="Enter Latitude" data-translate = "pholder_lat">
										
									</div>
									<div class="form-group">
										<label for="edit_event_longitude" data-translate = "_longitude">Longitude</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="edit_event_longitude" name = "edit_event_longitude" placeholder="Enter Longitude" data-translate = "pholder_long">
									</div>
									<!-- 
									<div class="form-group">
										<label for="edit_event_file">Upload File</label>
										<input type="file" multiple class="form-control" id="edit_event_file" name = "edit_event_file" placeholder=" ">
									</div> -->
									
									<div class="text-center">
										<button type="submit" class="btn btn-indore" data-translate = "_update">Update</button>
										<button class="btn btn-indore" data-dismiss="modal" data-translate = "_cancel">Cancel</button>
									</div>
								
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
		
		
		<!-- edit event popup end -->
		
	</div>
	<!-- /#page-content-wrapper -->
	
</div>
<!-- /#wrapper -->
	
	
	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>
	<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="${context}/js/hummingbird-treeview-1.3.js"></script>
	
	<script src="${context}/js/dataTables-buttons-min.js"></script>
	<script src="${context}/js/buttons-html5-min.js"></script>

	<script src="${context}/js/pdfmake-min.js"></script>
	<script src="${context}/js/vfs_fonts.js"></script>
	
	<!-- for date range picker -->
	<script type="text/javascript" src="${context}/js/moment.min.js"></script>
	<script type="text/javascript" src="${context}/js/daterangepicker.min.js"></script>
	
	<!-- validate form  -->
	<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	
	<!-- for toster message -->
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	
	<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	
	<!-- for accessing toaster display message --> 
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
	
	<script type="text/javascript" src="${context}/js/admin-common.js"></script>
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/event_controller.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/dep_event_controller.js"></script>
	
	<script type="text/javascript" src="${context}/js/designer/event.js"></script>
	
</body>
</html>