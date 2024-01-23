<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<c:set value="${pageContext.request.contextPath}" var="context" />

<c:set var="language"
	value="${lang eq 'en' or lang eq 'gu' ? lang : pageContext.request.locale.language}"
	scope="session" />
<fmt:setLocale value="${language}" />

<div class="header-main">

	<a class="logo-text  header_title">
<%-- 	<img src="${context}/images/Indore_Text.svg"> --%>
<h4 data-translate="_indore_header">Indore Smart Map</h4>
		</a>
	<div class="header-right">

	<label class="user-info"></label>

		<a title="Logout" class="logout-link" href="javascript:void(0);"
			id="citizen-logout-btn"><img class="logout-btn"
			src="${context}/images/icons/Logout-18.svg"></a> <a
			class="drop-down-main" href="javascript:void(0);"> <img
			class="drop-down-reset" src="${context}/images/icons/down-arrow.svg">
		</a>
		<div class="drop-container">
			<p data-toggle="modal" data-target="#resetModal">Change Password</p>
		</div>
			<ul class="nav nav-pills language-ul" id="pills-tab" role="tablist">
			<li class="nav-item"><a class="nav-link" id="pills-hindi-tab"
				data-toggle="pill" href="javascript:void(0);pills-hindi"
				aria-controls="pills-hindi" aria-selected="true">हिंदी </a></li>
			<li class="nav-item"><a class="nav-link active"
				id="pills-english-tab" data-toggle="pill"
				href="javascript:void(0);pills-english" role="tab"
				aria-controls="pills-english" aria-selected="false">Eng</a></li>
			
		</ul>
		<a class="user-manual-ctbtn" href="${context}/citizen_help.jsp" target="_blank" data-toggle="tooltip" title="Help"><i class="fa fa-question-circle help-icon" aria-hidden="true"></i></a>
		<a class="user-manual-dpbtn" style="display: none;" href="${context}/department_help.jsp" target="_blank" data-toggle="tooltip" title="Help"><i class="fa fa-question-circle help-icon" aria-hidden="true"></i></a>
		<!-- Modal -->
		<div class="modal fade" id="resetModal" tabindex="-1" role="dialog"
			aria-labelledby="resetModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<form id="form_changePassword">
						<div class="modal-header reset-header">
							<h6 class="modal-title" id="resetModalLabel">Change Password</h6>
							<button id="resetModalClose" type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="input-container">
								<div class="row">
									<div class="col-sm-4">
										<p>Current Password<span class="mandatory">*</span></p>
									</div>
									<div class="col-sm-8">
										<input type="password" name="chng_password" id="chng_password"
											placeholder="Current Password" class="w-100 in-txt-pass" required />
									</div>
								</div>
								<div class="row">
									<div class="col-sm-4">
										<p>New Password<span class="mandatory">*</span></p>
									</div>
									<div class="col-sm-8">
										<input type="password" name="new_password" id="new_password"
											placeholder="New Password" class="w-100 in-txt-pass" required />
									</div>
								</div>
								<div class="row">
									<div class="col-sm-4">
										<p>Confirm Password<span class="mandatory">*</span></p>
									</div>
									<div class="col-sm-8">
										<input type="password" name="confirm_password" id="confirm_password" 
											placeholder="Confirm Password" class="w-100 in-txt-pass" required />
									</div>
								</div>
							</div>

						</div>

						<div class="modal-footer reset-footer">
							<input type="submit" class="btn btn-indore" value="Save" id="chng_password_save_btn">
							<button type="button" class="primary-cancel" id="chng_password_close_btn" 
							data-dismiss="modal">Close</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
		
		<div class="modal fade" id="timeoutWarnModal" tabindex="-1" role="dialog"
			aria-labelledby="resetModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<p>You have been ideal for some time. Your session will be terminated in few seconds.</p>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</div>