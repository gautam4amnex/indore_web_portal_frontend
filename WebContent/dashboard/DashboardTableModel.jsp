<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set value="${pageContext.request.contextPath}" var="context" />
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