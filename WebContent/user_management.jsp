<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="java.sql.*, java.util.ArrayList, java.util.HashMap"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ include file="sidebar.jsp"%>


<link rel="stylesheet" type="text/css" href="${context}/css/fonts/material_icons.css">
<link rel="stylesheet" type="text/css"  href="${context}/css/gijgo.css"  />

<link rel="stylesheet" type="text/css" href="${context}/css/daterangepicker.css" />

<title>User Management</title>

	<!-- Page Content -->
	<div class="page-content-wrapper">
		
		
		<div class="container-fluid h-100 p-0">
			<jsp:include page="/common/header.jsp" />
			
			<div class="admin-content">
				<!-- Nav tabs -->
				<ul class="nav nav-tabs full-linetab-admin justify-content-center">
				  <li class="nav-item">
					<a class="nav-link tab-data active" data-toggle="tab" href="#dep_masetr" data-translate="umanagement_dmaster">Department Master</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link tab-data" data-toggle="tab" href="#role_masetr" data-translate="umanagement_rmaster">Role Master</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link tab-data" data-toggle="tab" href="#user_masetr" data-translate="umanagement_umaster">User Master</a>
				  </li>
				</ul>

				<!-- Tab panes -->
				<div class="tab-content">	
				  <div class="tab-pane container-fluid active" id="dep_masetr">
					
					<div class="text-right">
<!-- 						<button data-toggle="modal" data-target="#dep_masetr_modal" id="dep_department_master" class="btn-add btn-indore-table" data-translate="umanagement_add_department">Add Department</button> -->
					</div>
					
					<h6 class="table-title-grid" data-translate="umanagement_l_dmaster">List of Department Master</h6>
					<table id="dep_masetr_tbl" class="display tbl_dep" class="tbl-report"></table>
					
					<!--Department Master Modal start -->
					<div class="modal fade" id="dep_masetr_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate="umanagement_add_department">Add Department</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_addDepartment">
									<div class="form-group">
										<label for="dep_name" data-translate="umanagement_dname">Department Name</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="dep_name" name="dep_name" placeholder="Enter Department" data-translate = "umanagement_edepartment">
									</div>
									<div class="form-group">
										<label for="created_by" data-translate = "umanagement_created_by">Created By</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="created_by" name="created_by" placeholder="Enter Name" data-translate = "umanagement_enter_name">
									</div>
									<!-- <div class="form-group date-form">
										<label for="created_date">Created Date</label>
										<input type="text" class="form-control datepicker-dept" id="created_date" name="created_date" placeholder="Enter Date">
										<span class="datepicker-icon"></span>
									</div> -->
									
									<div class="form-group">
										<label for="user_des" data-translate="umanagement_description">Description</label><span class="mandatory">*</span>
										<textarea class="form-control" rows="2" id="user_des" name="user_des" placeholder="Add Description Here"></textarea>
									</div>
									
									
									<div class="text-center">
										<button type="submit" class="btn btn-indore" data-translate="_save">Save</button>
										<button class="btn btn-indore cancel-btn" data-dismiss="modal" data-translate = "_cancel">Cancel</button>
									</div>
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
					<!--Department Master Modal end -->
					
				  </div>
				  <div class="tab-pane container-fluid fade" id="role_masetr">
				  
					<div class="text-right">
						<button data-toggle="modal" data-target="#role_masetr_modal" id="dep_addRole" class="btn-add btn-indore-table" data-translate = "umanagement_role_add_role">Add Role</button>
					</div>
					
					<h6 class="table-title-grid" data-translate="umanagement_role_lrole_master">List of Role Master</h6>
					
					<table id="role_masetr_tbl" class="display tbl_dep" class="tbl-report"></table>
					
					<!--Role Master Modal start-->
					<div class="modal fade" id="role_masetr_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate="umanagement_role_add_role">Add Role</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							 <form class="form-admin" id="form_add_role_master">
								  <div class="row">
										
										<div class="col-sm-12 col-lg-6">
										
											<div class="form-group">
												<label for="dep_select_role" data-translate="umanagement_role_sdepatrment">Select Department</label><span class="mandatory">*</span>
												<select class="form-control pb-1" id="dep_select_role" name="dep_select_role">
													<!-- <option>Department</option>
													<option value=" ">2</option>
													<option value=" ">3</option>
													<option value=" ">4</option> -->
											    </select>
											</div>
											
											<div class="form-group">
												<input type="checkbox" class="form-control" id="mobileChk" name="mobileChk">
												<label data-translate="umanagement_role_mobapp">	 Mobile Application</label>
												
												<div id="treeview_mobile_application" class="tree-view treeview-indore">
												 <div id="treeview_mobile_application"></div>
												</div>
											</div>
											
											<div class="form-group">
												<label for="dep_select_type" data-translate="umanagement_role_sroletype">Select Role Type</label><span class="mandatory">*</span>
												<select class="form-control padding-reduce" id="dep_select_type" name="dep_select_type">
													<option value="">Role Type</option>
													<option value="ADMIN_ROLE">Admin</option>
													<option value="USER_ROLE">General User</option>
											    </select>
											</div>
											
										</div>
									  
										<div class="col-sm-12 col-lg-6">
										
											<div class="form-group">
												<label for="name_role" data-translate="umanagement_role_rname">Role Name</label><span class="mandatory">*</span>
												<input type="text" class="form-control" id="name_role" name="name_role" placeholder="Enter Role Name" data-translate = "umanagement_role_erolename">
											</div>
											
											<div class="form-group">
												<input type="checkbox" class="form-control" id="webChk" name="webChk">
												<label data-translate="umanagement_role_webapp"> Web Application</label>
												<div class="flot-right">
													
												</div>
												<div class="tree-view treeview-indore">
												
												  <div id="treeview_web_application"></div>
												</div>
											</div>
											
											
										</div>
										
										<div class="text-center col-12">
											<button type="submit" class="btn btn-indore" data-translate = "_save">Save</button>
											<button class="btn btn-indore cancel-btn" data-dismiss="modal" data-translate = "_cancel">Cancel</button>
										</div>
								  </div>
							  </form>
							</div>
							
						  </div>
						  
						</div>
					</div>
					<!--Role Master Modal end-->
					
				  </div>
				   <div class="tab-pane container-fluid fade" id="user_masetr">
					<div class="text-right">
						<button data-toggle="modal" data-target="#user_add_modal" id="dep_addUser" class="btn-add btn-indore-table" data-translate = "umnanagement_user_adduser">Add User</button>
					</div>
					
					<h6 class="table-title-grid" data-translate="umnanagement_user_list_user">List of User</h6>
					
					<table id="user_masetr_tbl" class="display tbl_dep" class="tbl-report"></table>
					
					<!--User Add Modal start-->
					<div class="modal fade" id="user_add_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate="umnanagement_user_adduser">Add User</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  
							  <form class="form-admin" id="form_addUser">
								  <div class="row">
										
										<div class="col-sm-12 col-lg-6">
										
											<div class="form-group">
												<label for="user_name" data-translate="umnanagement_user_name">Name</label><span class="mandatory">*</span>
												<input type="text" class="form-control" id="user_name" name="user_name" placeholder="Enter Name" data-translate="umnanagement_user_ename">
											</div>
											
											<div class="form-group">
												<label for="user_email" data-translate="umnanagement_user_email">Email</label><span class="mandatory">*</span>
												<input type="email" class="form-control" id="user_email" name="user_email" placeholder="Enter Email Id" data-translate="umnanagement_user_eemail">
											</div>
											<div class="form-group">
												<label for="user_pass" data-translate="umnanagement_user_password">Password</label><span class="mandatory">*</span>
												<input type="password" class="form-control" id="user_pass" name="user_pass" placeholder="Enter Password" data-translate="umnanagement_user_epassword">
											</div>
											
										</div>
									  
										<div class="col-sm-12 col-lg-6">
											
											<div class="form-group">
												<label for="mobile_no" data-translate="umnanagement_user_mnumber">Mobile Number</label><span class="mandatory">*</span>
												<input type="text" class="form-control" id="mobile_no" name="mobile_no" placeholder="Enter Mobile Number" data-translate="umnanagement_user_emnumber">
											</div>
											
											<!-- <div class="form-group">
												<label for="emp_id_dept">Employee Id</label>
												<input type="text" class="form-control" id="emp_id_dept" name="" placeholder="Enter Employee Id">
											</div> -->
											
											<div class="form-group">
												<label for="user_dep_type" data-translate="umnanagement_user_sdepartment">Select Department</label><span class="mandatory">*</span>
												<select class="form-control pb-1" id="user_dep_type" name="user_dep_type">
											    </select>
											</div>
											
											<div class="form-group">
												<label for="user_role" data-translate="umnanagement_user_srole">Select Role</label><span class="mandatory">*</span>
												<select class="form-control pb-1" id="user_role" name="user_role">
													<option value="">Select Role</option>
											    </select>
											</div>
										</div>
										<div class="text-center col-12">
											<button type="submit" class="btn btn-indore" data-translate="_save">Save</button>
											<button class="btn btn-indore cancel-btn" data-dismiss="modal" data-translate = "_cancel">Cancel</button>
										</div>
									
								  </div>
							  </form>
							  
							</div>
							
						  </div>
						  
						</div>
					</div>
					<!--User Add Modal end-->
				  </div>
				</div>
				
				<!-- Tab panes end-->
			</div>
			
			
			
			<!--Update Department Master Modal start -->
					<div class="modal fade" id="edit_dep_masetr_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate="umanagement_u_department">Update Department</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  	<form class="form-admin" id="form_updateDepartment">
							  	
									<input type="hidden" class="form-control" id="departmentId" name="departmentId" value="" readonly>
							  	
									<div class="form-group">
										<label for="dep_name" data-translate="umanagement_dname">Department Name</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="edit_dep_name" name="edit_dep_name" placeholder="Enter Department" data-translate="umanagement_edepartment">
									</div>
									<div class="form-group">
										<label for="created_by" data-translate="umanagement_created_by">Created By</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="edit_created_by" name="edit_created_by" placeholder="Enter Name" data-translate="umanagement_enter_name">
									</div>
									<div class="form-group">
										<label for="user_des" data-translate="umanagement_description">Description</label><span class="mandatory">*</span>
										<textarea class="form-control" rows="2" id="edit_user_des" name="edit_user_des" placeholder="Add Description Here" data-translate="umanagement_add_description_here"></textarea>
									</div>
									
									<div class="form-group">
												<label for="user_role" data-translate="umanagement_sstatus">Select Status</label>
												<select class="form-control pb-1" id="edit_dep_status" name="edit_dep_status">
													<option value="Active">Active</option>
													<option value="Deactive">Deactive</option>
											    </select>
									</div>
									
									<div class="text-center">
										<button type="submit" class="btn btn-indore" data-translate = "_save">Save</button>
										<button class="btn btn-indore cancel-btn" data-dismiss="modal" data-translate = "_cancel">Cancel</button>
									</div>
								</form>
							</div>
							
						  </div>
						  
						</div>
					</div>
					<!-- Update Department Master Modal end -->
					
					
					<!-- Update Role Master Modal Start -->
					
					<div class="modal fade" id="update_role_masetr_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate="">Update Role</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							 <form class="form-admin" id="form_update_role_master">
								  <div class="row">
								  
								  <input type="hidden" class="form-control" id="roleId" name="roleId" value="" readonly>
										
										<div class="col-sm-12 col-lg-6">
										
											<div class="form-group">
												<label for="update_dep_select_role" data-translate="">Select Department<span class="mandatory">*</span></label>
												<select class="form-control pb-1" id="update_dep_select_department" name="update_dep_select_department">
											    </select>
											</div>
											
											<div class="form-group">
												<input type="checkbox" class="form-control" id="update_mobileChk" name="update_mobileChk">
												<label data-translate="">	 Mobile Application</label>
												
												<div class="tree-view treeview-indore">
												 <div id="update_treeview_mobile_application"></div>
												</div>
											</div>
											
											<div class="form-group">
												<label for="edit_role_status" data-translate="">Select Status</label>
												<select class="form-control pb-1" id="edit_role_status" name="edit_role_status">
													<option value="Active">Active</option>
													<option value="Deactive">Deactive</option>
											    </select>
											</div>
											
										</div>
									  
										<div class="col-sm-12 col-lg-6">
										
											<div class="form-group">
												<label for="update_name_role" data-translate="">Role Name<span class="mandatory">*</span></label>
												<input type="text" class="form-control" id="update_name_role" name="update_name_role" placeholder="Enter Role Name" data-translate="">
											</div>
											
											<div class="form-group">
												<input type="checkbox" class="form-control" id="update_webChk" name="update_webChk">
												<label data-translate=""> Web Application</label>
												<div class="flot-right">
													
												</div>
												<div class="tree-view treeview-indore">
												  <div id="update_treeview_web_application"></div>
												</div>
											</div>
											
											<div class="form-group">
												<label for="update_dep_select_type" data-translate="">Select Role Type<span class="mandatory">*</span></label>
												<select class="form-control pb-1" id="update_dep_select_type" name="update_dep_select_type">
													<option value="">Role Type</option>
													<option value="ADMIN_ROLE">Admin</option>
													<option value="USER_ROLE">General User</option>
											    </select>
											</div>
										</div>
									
									
										<div class="text-center col-12">
											<input type="submit" class="btn btn-indore" value="Save">
											<button class="btn btn-indore cancel-btn" data-dismiss="modal">Cancel</button>
										</div>
								  </div>
							  </form>
							</div>
							
						  </div>
						  
						</div>
					</div>
					
					<!-- Update Role Master Modal End -->
					
					<!--User update Modal start-->
					<div class="modal fade" id="user_update_modal" role="dialog">
						<div class="modal-dialog modal-dialog-centered">
						
						  <!-- Modal content-->
						  <div class="modal-content dep-modal">
							<div class="modal-header">
							
								<h4 class="modal-title" data-translate="">Edit User</h4>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							  
							</div>
							<div class="modal-body">
							  
							  <form class="form-admin" id="form_updateUser">

								  <div class="row">

							<input type="hidden" class="form-control" id="userId" name="userId" value="" readonly>
										
										<div class="col-sm-12 col-lg-6">
										
											<div class="form-group">
												<label for="update_user_name" data-translate="">Name<span class="mandatory">*</span></label>
												<input type="text" class="form-control" id="update_user_name" name="update_user_name" placeholder="Enter Name" data-translate="" readonly>
											</div>
											
											<div class="form-group">
												<label for="update_user_email" data-translate="">Email<span class="mandatory">*</span></label>
												<input type="email" class="form-control" id="update_user_email" name="update_user_email" placeholder="Enter Email Id" data-translate="" readonly>
											</div>
										</div>
									  
										<div class="col-sm-12 col-lg-6">
											
											<div class="form-group">
												<label for="update_mobile_no" data-translate="">Mobile Number<span class="mandatory">*</span></label>
												<input type="text" class="form-control" id="update_mobile_no" name="update_mobile_no" placeholder="Enter Mobile Number" data-translate="">
											</div>
											
											<div class="form-group">
												<label for="update_user_dep_type" data-translate="">Select Department<span class="mandatory">*</span></label>
												<select class="form-control pb-1" id="update_user_dep_type" name="update_user_dep_type">
											    </select>
											</div>
											
											<div class="form-group">
												<label for="update_user_role" data-translate="">Select Role<span class="mandatory">*</span></label>
												<select class="form-control pb-1" id="update_user_role" name="update_user_role">
													<option value="">Select Role</option>
											    </select>
											</div>
											
											
											
										</div>
										<div class="text-center col-12">
											<input type="submit" class="btn btn-indore" value="Save">
											<button class="btn btn-indore cancel-btn" data-dismiss="modal">Cancel</button>
										</div>
									
								  </div>
							  </form>
							  
							</div>
							
						  </div>
						  
						</div>
					</div>
					<!--User update Modal end-->
			
		
		</div>
	</div>
	<!-- /#page-content-wrapper -->
	
</div>
<!-- /#wrapper -->
	
	
	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>
	<script type="text/javascript" src="${context}/js/datatables.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="${context}/js/hummingbird-treeview-1.3.js"></script>
	
	<!-- DataTable -->
	<script src="${context}/js/dataTables-buttons-min.js"></script>
	<script src="${context}/js/buttons-html5-min.js"></script>
	
	<!-- pdf download -->
	<script type="text/javascript" src="${context}/js/pdfmake-min.js"></script>
	<script type="text/javascript" src="${context}/js/vfs_fonts.js"></script>
	
	
	<script type="text/javascript" src="${context}/js/moment.min.js"></script>
	<script type="text/javascript" src="${context}/js/daterangepicker.min.js"></script>
	
	
	<!-- validate form  -->
	<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	
	<script src="${context}/js/gijgo.js" type="text/javascript"></script>
	
	<!-- for toster message -->
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	
	<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	
	<!-- for accessing toaster display message --> 
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	
	
	<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/dep_department_master.js"></script>
	<script type="text/javascript" src="${context}/js/developer/dep_role_master.js"></script>
	<script type="text/javascript" src="${context}/js/developer/dep_user_master.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/dep_formValidations.js"></script>
	
	<script type="text/javascript" src="${context}/js/admin-common.js"></script>
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>
	<script type="text/javascript" src="${context}/js/designer/user-management-common.js"></script>
	
</body>
</html>