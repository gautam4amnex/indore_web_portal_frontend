<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp" %>
   
<title>Feedback & Suggestions</title>

	<!-- Page Content -->
	<div class="page-content-wrapper">
		<!-- <div class="loader"></div> -->
		<div class="container-fluid h-100 p-0">
			<jsp:include page="/common/header.jsp" />
			
			<div class="admin-content">
				<!-- Nav tabs -->
				<ul class="nav nav-tabs full-linetab-admin justify-content-center" id="selected_tab">
				  <li class="nav-item">
					<a class="nav-link tab-data active" data-toggle="tab" href="#feedback" data-translate = "fsc_t_feedback">Feedback</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link tab-data" data-toggle="tab" href="#suggestions" data-translate = "fsc_t_suggestion">Suggestion</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link tab-data" data-toggle="tab" href="#complaint" data-translate = "fsc_t_complaint">Complaint</a>
				  </li> 
				</ul>

				<!-- Tab panes -->
				<div class="tab-content">	
				  <div class="tab-pane container-fluid active" id="feedback">
					
					<div class="admin-content without-add">
						<h6 class="table-title-grid" data-translate = "fsc_lfeedback">List of Feedback</h6>
						<table id="feedback_dtable" class="display tbl_dep" class="tbl-report"></table>
					</div>
					
				  </div>
				  <div class="tab-pane container-fluid fade" id="suggestions">
				  
					<div class="admin-content without-add">
						<h6 class="table-title-grid" data-translate = "fsc_lsuggestion">List of Suggestions</h6>
						<table id="suggestion_dtable" class="display tbl_dep" class="tbl-report"></table>
					</div>
					
				  </div>
				  <div class="tab-pane container-fluid fade" id="complaint">
					
					<div class="admin-content without-add">
						<h6 class="table-title-grid" data-translate = "fsc_lcomplaint">List of Complaint</h6>
						<table id="complain_dtable" class="display tbl_dep" class="tbl-report"></table>
					</div>
					
				  </div>
				  
				</div>
				
				<!-- Tab panes end-->
			</div>
		
		</div>
		
		
		 <!--Add Complaint Master Modal start -->
					<div class="modal fade responseModal" role="dialog" id="addResponse">
						<div class="modal-dialog modal-dialog-centered">
						
						 <!--  Modal content -->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title">Complaint</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_response">
							  	<div class="form-group">
										<input type="hidden" class="form-control" id="custId" name="custId" value="" readonly>
										<input type="hidden" class="form-control" id="resType" name="resType" value="" readonly>
									</div>
							  		
							  	
									<div class="form-group">
										<label for="resMobileno">Mobile Number</label>
										<input type="text" class="form-control" id="resMobileno" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="resEmail">Email</label>
										<input type="text" class="form-control" id="resEmail" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="resAddress">Address</label>
										<input type="text" class="form-control" id="resAddress" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="resCategory">Category</label>
										<input type="text" class="form-control" id="resCategory" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="resComment">Comment</label>
										<input type="text" class="form-control" id="resComment" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="resLatitude">Latitude</label>
										<input type="text" class="form-control" id="resLatitude" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="resLongitude">Longitude</label>
										<input type="text" class="form-control" id="resLongitude" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="response">Response<span class="mandatory">*</span></label>
										<textarea class="form-control" rows="2" id="response" name="response" placeholder="Add Description Here"></textarea>
									</div>
									
									
									<div class="text-center">
										<input type="submit" id="c_send" class="btn btn-indore" value="Send">
										<button class="btn btn-indore cancel-btn" id="c_cancel" data-dismiss="modal">Cancel</button>
									</div>
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
			<!-- Add Complaint Master Modal end -->
			
			
			 <!--Add Feedback Master Modal start -->
					<div class="modal fade responseModal" role="dialog" id="form_addFeedback">
						<div class="modal-dialog modal-dialog-centered">
						
						 <!--  Modal content -->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title">Feedback</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_feedback">
							  	<div class="form-group">
										<input type="hidden" class="form-control" id="feedbackId" name="feedbackId" value="" readonly>
									</div>
							  		
							  	
									<div class="form-group">
										<label for="feedType">Type</label>
										<input type="text" class="form-control" id="feedType" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedCategory">Category</label>
										<input type="text" class="form-control" id="feedCategory" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedComment">Comment</label>
										<input type="text" class="form-control" id="feedComment" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedName">Name</label>
										<input type="text" class="form-control" id="feedName" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedAdress">Address</label>
										<input type="text" class="form-control" id="feedAdress" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedCity">City</label>
										<input type="text" class="form-control" id="feedCity" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedPincode">Pincode</label>
										<input type="text" class="form-control" id="feedPincode" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedEmail">Email</label>
										<input type="text" class="form-control" id="feedEmail" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedMobile">Mobile No</label>
										<input type="text" class="form-control" id="feedMobile" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedLat">Latitude</label>
										<input type="text" class="form-control" id="feedLat" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedLong">Longitude</label>
										<input type="text" class="form-control" id="feedLong" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="feedresponse">Response<span class="mandatory">*</span></label>
										<textarea class="form-control" rows="2" id="feedresponse" name="feedresponse" placeholder="Add Description Here"></textarea>
									</div>
									
									<div class="text-center">
									<input type="submit" class="btn btn-indore" id="f_send" value="Send">
									<button class="btn btn-indore cancel-btn" id="f_cancel" data-dismiss="modal">Cancel</button>
									</div>
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
			<!-- Add Feedback Master Modal end -->
			
			
			<!--  Add Suggestions Master Modal start -->
					<div class="modal fade responseModal" role="dialog" id="form_addSuggestion">
						<div class="modal-dialog modal-dialog-centered">
						
						 <!--  Modal content -->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title">Suggestions</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_suggestion">
							  		<div class="form-group">
										<input type="hidden" class="form-control" id="suggestionId" name="suggestionId" value="" readonly>
									</div>
							  	
									<div class="form-group">
										<label for="suggestionType">Type</label>
										<input type="text" class="form-control" id="suggestionType" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionCategory">Category</label>
										<input type="text" class="form-control" id="suggestionCategory" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionComment">Comment</label>
										<input type="text" class="form-control" id="suggestionComment" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionName">Name</label>
										<input type="text" class="form-control" id="suggestionName" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionAdress">Address</label>
										<input type="text" class="form-control" id="suggestionAdress" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionCity">City</label>
										<input type="text" class="form-control" id="suggestionCity" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionPincode">Pincode</label>
										<input type="text" class="form-control" id="suggestionPincode" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionEmail">Email</label>
										<input type="text" class="form-control" id="suggestionEmail" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionMobile">Mobile No</label>
										<input type="text" class="form-control" id="suggestionMobile" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionLat">Latitude</label>
										<input type="text" class="form-control" id="suggestionLat" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionLong">Longitude</label>
										<input type="text" class="form-control" id="suggestionLong" value="" readonly>
									</div>
									
									<div class="form-group">
										<label for="suggestionresponse">Response<span class="mandatory">*</span></label>
										<textarea class="form-control" rows="2" id="suggestionresponse" name="suggestionresponse" placeholder="Add Description Here"></textarea>
									</div>
									
									
									<div class="text-center">
										<input type="submit" class="btn btn-indore" id="s_send" value="Send">
										<button class="btn btn-indore cancel-btn" id="responseCancel" data-dismiss="modal">Cancel</button>
									</div>
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
			<!-- Add Suggestions Master Modal end -->
			
		
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
		
		
	</div>
	<!-- /#page-content-wrapper -->
	
</div>
<!-- /#wrapper -->
	
	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${context}/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>
	<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="${context}/js/hummingbird-treeview-1.3.js"></script>
	<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	
	<!-- DataTable -->
	<script src="${context}/js/dataTables-buttons-min.js"></script>
	<script src="${context}/js/buttons-html5-min.js"></script>
	
	<!-- pdf download -->
	<script type="text/javascript" src="${context}/js/pdfmake-min.js"></script>
	<script type="text/javascript" src="${context}/js/vfs_fonts.js"></script>
	
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	
	<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
	
	<script type="text/javascript" src="${context}/js/admin-common.js"></script>
	
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/dep_feedback_complaint.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/dep_add_announcement.js"></script>
	
	<script type="text/javascript" src="${context}/js/designer/fscdata.js"></script>
	
</body>
</html>