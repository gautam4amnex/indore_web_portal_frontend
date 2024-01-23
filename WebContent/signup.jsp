<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<c:set value="${pageContext.request.contextPath}" var="context" />
<meta name="_urlContext" content="${context}" />
<html>
<head>
<meta charset="ISO-8859-1">
<title>${title}</title>
<link rel="icon" type="image/png" href="${context}/images/favicon.png">
<link rel="stylesheet" type="text/css"
	href="${context}/css/bootstrap.min.css" />
<script src="${context}/js/jquery.min.js"></script>
<script src="${context}/js/bootstrap.min.js"></script>
<script src="${context}/js/LoginCaptcha.js"></script>
</head>
<body>

	<div class="col-md-12">
		<div class="col-md-4"></div>
		<div class="col-md-4">
			<h1 class="text-center">Sign Up</h1>
		</div>
	</div>
	<div>
		<%-- 		<c:url value="/signup" var="signup" /> --%>
		<div class="col-md-12">
			<form id="UserSignup" name="UserSignup">
				<div class="col-md-12 form-group">
					<div class="col-md-6">
						<label for="username">Username</label> <input class="form-control"
							type="text" id="signUpUserName" name="userName" required
							placeholder="Username" />
					</div>
					<div class="col-md-6">
						<label for="name">Name</label> <input class="form-control"
							type="text" id="signUpName" name="name" required
							placeholder="Name" />
					</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-6">
						<label for="mobile">Mobile No.</label> <input class="form-control"
							type="text" id="signUpContactNo" name="contactNo" required
							placeholder="Mobile No." />
					</div>
					<div class="col-md-6">
						<label for="email">Email</label> <input class="form-control"
							type="email" id="signUpEmailId" name="emailId" required
							placeholder="Email" />
					</div>
				</div>
<!-- 				<div class="col-md-12 form-group"> -->
<!-- 					<div class="col-md-6"> -->
<!-- 						<label for="password">Password</label> <input class="form-control" -->
<!-- 							type="password" id="signUpPassword" name="password" required -->
<!-- 							placeholder="Password" /> -->
<!-- 					</div> -->
<!-- 					<div class="col-md-6"> -->
<!-- 						<label for="password">Confirm Password</label> <input -->
<!-- 							class="form-control" type="password" id="signUpConfirmPassword" -->
<!-- 							name="confirmPassword" required placeholder="Confirm Password" /> -->
<!-- 					</div> -->
<!-- 				</div> -->
				<div class="col-md-12 form-group">
					<div class="col-md-6">
						<label for="address">Address</label> <input class="form-control"
							type="text" id="signUpAddress" name="address" required
							placeholder="Address" />
					</div>
					<div class="col-md-6">
						<label for="city">City</label> <input class="form-control"
							type="text" id="signUpCity" name="city" required
							placeholder="City" />
					</div>
				</div>


				<div class="col-md-12 form-group">
					<div class="col-md-6">
						<label for="state">State</label> <input class="form-control"
							type="text" id="signUpState" name="city" required
							placeholder="State" />
					</div>
					<div class="col-md-6">
						<label for="zipcode">Zip Code</label> <input class="form-control"
							type="text" id="signUpZipcode" name="zipcode" required
							placeholder="Zipcode" />
					</div>
				</div>

				<!-- 			<div class="col-md-12 form-group"> -->
				<!-- 				<div class="col-md-4"></div> -->
				<!-- 				<div class="col-md-4"> -->
				<!-- 					<label for="captcha">Captcha</label> -->
				<!-- 					<div class="input-group"> -->
				<!-- 						<input type="text" id="txtInput" class="form-control" -->
				<!-- 							maxlength="15" name="txtInput" placeholder="Enter Captcha"> -->
				<!-- 						<span class="input-group-addon"> <a class="btn-success" -->
				<!-- 							style="color: white;" onclick="createCaptcha();"> <i -->
				<!-- 								class="glyphicon glyphicon-refresh"></i> -->
				<!-- 						</a> -->
				<!-- 						</span> -->
				<!-- 					</div> -->
				<!-- 					<div id="captcha"></div> -->
				<!-- 				</div> -->
				<!-- 			</div> -->
				<div class="col-md-12 form-group">
					<div class="col-md-4"></div>
					<div class="col-md-4">
						<input type="button" class="btn btn-success btn-block btn-md"
							value="Sign Up" id="signupBtn">
					</div>
				</div>
				<%-- 			<input type="hidden" name="${_csrf.parameterName}" --%>
				<%-- 				value="${_csrf.token}" /> <input type="hidden" name="textCaptcha" --%>
				<!-- 				id="textCaptcha" value="" /> -->
			</form>
		</div>
	</div>
	<script type="text/javascript"
		src="${context}/js/designer/signup_design.js"></script>
	<script type="text/javascript"
		src="${context}/js/developer/signup_developer.js"></script>
	<script type="text/javascript">
		// 		createCaptcha();
	</script>
</body>
</html>