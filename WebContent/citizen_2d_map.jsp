<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" import="java.util.*"%>
<%@ page import="java.util.ResourceBundle"%>
<!DOCTYPE html>
<c:set value="${pageContext.request.contextPath}" var="context" />

<c:set var="language" value="${lang eq 'en' or lang eq 'gu' ? lang : pageContext.request.locale.language}" scope="session" />
<fmt:setLocale value="${language}" />

<meta name="_urlContext" content="${context}" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />

<html lang="${language}">
<head>
	<title>Indore Citizen</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="icon" type="image/png" href="${context}/images/favicon.png">
	<link rel="stylesheet" href="${context}/css/bootstrap.min.css">
	<link rel="stylesheet" href="${context}/css/bootstrap-select.css" />
	<link rel="stylesheet" href="${context}/css/font-awesome.min.css">
	<!-- <link rel="stylesheet" href="css/slick.css"> -->
	<link rel="stylesheet" href="${context}/css/esri/main.css">
	
	<link rel="stylesheet" href="${context}/css/jquery-ui.css">
		
	<link rel="stylesheet" type="text/css" href="${context}/css/daterangepicker.css" />
		
	<link rel="stylesheet" href="${context}/css/toastr.css">	
		
	<%-- <link rel="stylesheet" href="${context}/css/esri/esri.css"> --%>
	<!-- <link rel="stylesheet" href="https://js.arcgis.com/3.30/esri/themes/calcite/dijit/calcite.css"> -->
	<link rel="stylesheet" href="${context}/css/esri/claro.css">
	<link rel="stylesheet" href="${context}/css/esri/nihilo.css">
	<link rel="stylesheet" href="${context}/css/esri/api-3-30.css">
	<link rel="stylesheet" href="${context}/css/citizenmap.css">
	<link rel="stylesheet" href="${context}/css/style.css">
	<script src="https://cdn.jsdelivr.net/npm/ol@v8.2.0/dist/ol.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v8.2.0/ol.css">
	<style>
      #info {
        position: absolute;
        display: inline-block;
        height: auto;
        width: auto;
        z-index: 100;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        padding: 5px;
        left: 50%;
        transform: translateX(3%);
        visibility: hidden;
        pointer-events: none;
      }
    </style>
</head>

<body>	
<div class="loader"></div>

<!-- Popup Modal -->
<div class="modal np-modal show" id="commonModalPopup" role="dialog" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="model-heading"></h4>
                <button type="button" class="close" id="btn_info_popup" data-dismiss="modal">×</button>
            </div>
            <div class="modal-body" id="modelContentValue">
                <div class="view-detail-pop-up-main"></div>
            </div>
        </div>
    </div>
</div>
<!-- Popup Modal End -->

<!-- wrapper -->
<div class="d-flex col-12 p-0 wrapper"> 
	
	<!-- Sidebar -->
	<div class="nav-main">
		<a href="javascript:void(0);" class="side-menu-click">
			<i class="fa fa-bars" aria-hidden="true"></i>
		</a>
		<%-- <div class="city-logo"><img src="${context}/images/Indore_Smart_City_Logo.png"></div> --%>
		<div class="city-logo"><a href id="city_logo"><img src="${context}/images/SmartCityLogo.jpg"></a></div>
		<ul class="nav-ul-citi scrollar" id="leftPanel">

		<li data-toggle="tooltip" title="Basemap Gallery">
			<a href="javascript:void(0);" data-attr="#basemap_gallery">
			
				<svg style="padding:2px;" version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
						 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
						 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" class="small-icon">
					<metadata>
						<sfw  xmlns="&ns_sfw;">
							<slices></slices>
							<sliceSourceBounds  width="191.009" height="713" x="-0.009" y="-713" bottomLeftOrigin="true"></sliceSourceBounds>
							<optimizationSettings>
								<targetSettings  fileFormat="PNG24Format" targetSettingsID="0">
									<PNG24Format  transparency="true" noMatteColor="false" matteColor="#FFFFFF" interlaced="false" filtered="false">
										</PNG24Format>
								</targetSettings>
							</optimizationSettings>
						</sfw>
					</metadata>
					<g>
						<g>
							<path fill="#855439" d="M0.206,50l8.34-20.127h11.699l-6.243-9.963c-1.305-2.068-1.994-4.461-1.994-6.919
								C12.008,5.827,17.836,0,25,0s12.991,5.827,12.991,12.991c0,2.457-0.689,4.851-1.994,6.922l-6.242,9.96h11.698L49.794,50H0.206z
								 M34.503,47.836h12.051l-2.845-6.867h-10.08L34.503,47.836z M17.665,47.836h14.656l-0.875-6.867H18.519L17.665,47.836z
								 M3.446,47.836h12.038l0.853-6.867H6.292L3.446,47.836z M33.352,38.806h9.46l-2.804-6.77h-7.519L33.352,38.806z M18.788,38.806
								H31.17l-0.862-6.77h-1.91L25,37.459l-3.398-5.423h-1.973L18.788,38.806z M7.188,38.806h9.418l0.841-6.77H9.993L7.188,38.806z
								 M25,2.164c-5.97,0-10.827,4.857-10.827,10.827c0,2.049,0.574,4.043,1.661,5.767L25,33.383l9.164-14.622
								c1.088-1.726,1.663-3.72,1.663-5.77C35.827,7.021,30.971,2.164,25,2.164z"/>
						</g>
						<g>
							<path fill="#855439" d="M25,20.027c-3.88,0-7.037-3.156-7.037-7.036S21.12,5.954,25,5.954c3.881,0,7.037,3.157,7.037,7.037
								S28.881,20.027,25,20.027z M25,8.119c-2.687,0-4.872,2.186-4.872,4.872c0,2.688,2.186,4.873,4.872,4.873
								c2.688,0,4.873-2.186,4.873-4.873C29.873,10.305,27.688,8.119,25,8.119z"/>
						</g>
					</g>
				</svg>
				Basemap Gallery
<!-- 				<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" -->
<!-- 	 			xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="60px" -->
<!-- 	 			viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve"> -->
<!-- 					<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_"> -->
<!-- 					<g> -->
<!-- 						<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="15.44,33.744 30.055,25.129 44.559,33.908  -->
<!-- 							29.945,42.523 		"/> -->
<!-- 						<path fill="#855439" d="M15.248,33.357l14.587-8.586c0.165-0.082,0.33-0.082,0.467,0l14.478,8.752 -->
<!-- 							c0.221,0.138,0.275,0.412,0.166,0.604c-0.056,0.083-0.111,0.138-0.193,0.165l-14.587,8.588c-0.138,0.084-0.303,0.084-0.44,0 -->
<!-- 							L15.22,34.128c-0.22-0.136-0.274-0.411-0.165-0.604C15.109,33.441,15.165,33.385,15.248,33.357L15.248,33.357z M30.055,25.652 -->
<!-- 							l-13.761,8.092L29.945,42l13.761-8.092L30.055,25.652z"/> -->
<!-- 						<path fill="#855439" d="M40.596,31.266c0.222-0.109,0.496-0.027,0.606,0.166c0.109,0.221,0.055,0.469-0.165,0.605l-14.615,8.586 -->
<!-- 							c-0.221,0.139-0.468,0.057-0.605-0.137c-0.11-0.221-0.056-0.494,0.165-0.605L40.596,31.266z"/> -->
<!-- 						<path fill="#855439" d="M36.881,29.01c0.192-0.109,0.468-0.055,0.578,0.164c0.137,0.193,0.055,0.469-0.138,0.58l-14.643,8.613 -->
<!-- 							c-0.193,0.109-0.468,0.055-0.578-0.164c-0.138-0.193-0.055-0.469,0.138-0.58L36.881,29.01z"/> -->
<!-- 						<path fill="#855439" d="M33.33,26.863c0.22-0.11,0.469-0.055,0.605,0.164c0.11,0.221,0.055,0.469-0.164,0.605l-14.615,8.588 -->
<!-- 							c-0.221,0.136-0.468,0.055-0.605-0.137c-0.11-0.221-0.055-0.496,0.165-0.607L33.33,26.863z"/> -->
<!-- 						<path fill="#855439" d="M18.716,32.037c-0.22-0.137-0.275-0.385-0.165-0.605c0.138-0.193,0.385-0.275,0.605-0.166l14.615,8.615 -->
<!-- 							c0.219,0.111,0.274,0.385,0.164,0.605c-0.137,0.193-0.386,0.275-0.605,0.137L18.716,32.037z"/> -->
<!-- 						<path fill="#855439" d="M22.431,29.754c-0.192-0.111-0.274-0.387-0.137-0.58c0.109-0.219,0.385-0.273,0.577-0.164l14.643,8.613 -->
<!-- 							c0.191,0.111,0.275,0.387,0.137,0.58c-0.109,0.219-0.385,0.273-0.577,0.164L22.431,29.754z"/> -->
<!-- 						<path fill="#855439" d="M25.981,27.633c-0.221-0.137-0.275-0.385-0.165-0.605c0.138-0.219,0.385-0.274,0.605-0.164l14.615,8.613 -->
<!-- 							c0.22,0.111,0.274,0.387,0.165,0.607c-0.11,0.191-0.385,0.272-0.606,0.137L25.981,27.633z"/> -->
<!-- 						<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="15.44,26.119 30.055,17.505 44.559,26.284  -->
<!-- 							29.945,34.873 		"/> -->
<!-- 						<path fill="#855439" d="M15.248,25.707l14.587-8.588c0.165-0.083,0.33-0.083,0.467,0L44.779,25.9 -->
<!-- 							c0.221,0.109,0.275,0.384,0.166,0.604c-0.056,0.055-0.111,0.111-0.193,0.166l-14.587,8.588c-0.138,0.082-0.303,0.082-0.44,0 -->
<!-- 							L15.22,26.479c-0.22-0.111-0.274-0.387-0.165-0.605C15.109,25.815,15.165,25.762,15.248,25.707L15.248,25.707z M30.055,18.002 -->
<!-- 							l-13.761,8.117l13.651,8.258l13.761-8.119L30.055,18.002z"/> -->
<!-- 					</g> -->
<!-- 					</g> -->
<!-- 					<g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_"></g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g> -->
<!-- 				</svg> -->
<!-- 					<span class="menu-name" data-translate="_basemap_gal">Basemap Gallery</span> -->
			</a>
		</li>

			<li data-toggle="tooltip" id="popup_layers" title="Layers">
				<a href="javascript:void(0);" data-attr="#layers">
				
						<svg style="padding:2px;" version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
							 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
							 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" class="small-icon">
						<metadata>
							<sfw  xmlns="&ns_sfw;">
								<slices></slices>
								<sliceSourceBounds  height="713" width="191.009" y="-713" x="-0.009" bottomLeftOrigin="true"></sliceSourceBounds>
								<optimizationSettings>
									<targetSettings  fileFormat="PNG24Format" targetSettingsID="0">
										<PNG24Format  transparency="true" filtered="false" interlaced="false" matteColor="#FFFFFF" noMatteColor="false">
											</PNG24Format>
									</targetSettings>
								</optimizationSettings>
							</sfw>
						</metadata>
						<g>
						<path fill="#855439" d="M45.404,10.585c-0.381-0.537-0.777-1.062-1.2-1.566C39.617,3.512,32.71,0,25,0
							c-0.015,0-0.025,0.001-0.038,0.001C24.954,0.001,24.948,0,24.938,0c-0.026,0-0.056,0.003-0.086,0.003
							c-7.65,0.044-14.495,3.546-19.059,9.016c-0.42,0.506-0.819,1.029-1.2,1.566C1.706,14.662,0,19.634,0,25
							c0,5.365,1.705,10.339,4.594,14.416c0.381,0.536,0.78,1.061,1.2,1.565c4.562,5.47,11.406,8.972,19.059,9.016
							c0.03,0,0.06,0.003,0.086,0.003c0.01,0,0.016-0.001,0.022-0.001c0.012,0,0.024,0.001,0.038,0.001c7.711,0,14.616-3.511,19.205-9.018
							c0.421-0.505,0.819-1.03,1.2-1.566C48.293,35.338,50,30.367,50,24.999C50,19.634,48.293,14.662,45.404,10.585z M17.692,3.251
							c-2.298,2.217-4.208,5.457-5.523,9.346c-1.764-0.659-3.351-1.451-4.719-2.348C10.133,7.063,13.66,4.609,17.692,3.251z M6.246,11.817
							c1.555,1.038,3.352,1.945,5.339,2.692c-0.857,3.133-1.351,6.61-1.368,10.279H2.056C2.1,19.963,3.654,15.497,6.246,11.817z
							 M2.133,26.84h8.124c0.132,3.071,0.599,5.985,1.326,8.651c-1.987,0.747-3.784,1.654-5.337,2.694
							C3.948,34.922,2.466,31.044,2.133,26.84z M7.456,39.747c1.368-0.895,2.951-1.686,4.71-2.344c1.316,3.89,3.228,7.128,5.526,9.345
							C13.66,45.391,10.14,42.932,7.456,39.747z M23.975,47.875c-4.21-0.576-7.842-4.894-9.901-11.111c2.969-0.89,6.33-1.43,9.901-1.517
							V47.875z M23.975,33.197c-3.767,0.09-7.316,0.671-10.478,1.642c-0.648-2.457-1.062-5.153-1.186-7.998h11.663V33.197z M23.975,24.789
							H12.269c0.018-3.446,0.467-6.7,1.237-9.625c3.157,0.967,6.705,1.55,10.468,1.639L23.975,24.789L23.975,24.789z M23.975,14.753
							c-3.569-0.087-6.93-0.624-9.896-1.515c2.058-6.215,5.688-10.536,9.896-11.113V14.753z M47.942,24.789h-8.279
							c-0.021-3.654-0.505-7.116-1.356-10.237c2.031-0.755,3.866-1.678,5.447-2.734C46.344,15.497,47.898,19.963,47.942,24.789z
							 M42.546,10.251c-1.395,0.913-3.017,1.719-4.824,2.384c-1.328-3.94-3.266-7.22-5.599-9.445C36.231,4.534,39.823,7.016,42.546,10.251
							z M26.026,2.141c4.163,0.643,7.749,4.956,9.786,11.129c-2.938,0.871-6.262,1.397-9.786,1.483V2.141z M26.026,16.804
							c3.719-0.088,7.227-0.658,10.355-1.604c0.767,2.916,1.212,6.159,1.229,9.591H26.026V16.804z M26.026,26.84h11.543
							c-0.124,2.832-0.536,5.516-1.178,7.966c-3.133-0.95-6.645-1.519-10.363-1.608L26.026,26.84L26.026,26.84z M26.026,47.859V35.248
							c3.526,0.086,6.85,0.613,9.792,1.483C33.777,42.906,30.188,47.217,26.026,47.859z M32.123,46.812
							c2.333-2.224,4.274-5.501,5.604-9.443c1.802,0.664,3.422,1.469,4.814,2.38C39.817,42.982,36.231,45.466,32.123,46.812z
							 M43.754,38.186c-1.581-1.057-3.416-1.981-5.449-2.734c0.722-2.654,1.184-5.555,1.314-8.61h8.247
							C47.532,31.044,46.054,34.923,43.754,38.186z"/></g>
													</svg>
				Layers
<!-- 					<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" -->
<!-- 						xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" -->
<!-- 						viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> -->
<!-- 					<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_"> -->
<!-- 						<g>	 -->
<!-- 								<polyline fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="1.1999" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.9256" points=" -->
<!-- 								34.027,30.267 39.797,33.56 24.967,42 10.203,33.575 16.075,30.233 		"/> -->
							
<!-- 								<polyline fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="1.1999" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.9256" points=" -->
<!-- 								34.185,23.627 39.797,26.83 24.967,35.27 10.203,26.845 15.778,23.672 		"/> -->
							
<!-- 								<polygon fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="1.1999" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.9256" points=" -->
<!-- 								10.203,20.44 25.033,12 39.797,20.424 24.967,28.865 		"/> -->
<!-- 						</g> -->
<!-- 					</g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_"> -->
<!-- 					</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g> -->
<!-- 					</svg> -->
<!-- 					<span class="menu-name" data-translate="_layers">Layers</span> -->
				</a>
			</li>
<!-- 			<li> -->
<!-- 				<a href="javascript:void(0);" data-attr="#layers"> -->
<!-- 					<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" -->
<!-- 						xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" -->
<!-- 						viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> -->
<!-- 					<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_"> -->
<!-- 						<g>	 -->
<!-- 								<polyline fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="1.1999" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.9256" points=" -->
<!-- 								34.027,30.267 39.797,33.56 24.967,42 10.203,33.575 16.075,30.233 		"/> -->
							
<!-- 								<polyline fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="1.1999" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.9256" points=" -->
<!-- 								34.185,23.627 39.797,26.83 24.967,35.27 10.203,26.845 15.778,23.672 		"/> -->
							
<!-- 								<polygon fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="1.1999" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.9256" points=" -->
<!-- 								10.203,20.44 25.033,12 39.797,20.424 24.967,28.865 		"/> -->
<!-- 						</g> -->
<!-- 					</g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_"> -->
<!-- 					</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g> -->
<!-- 					</svg> -->
<!-- 					<span class="menu-name">Themes</span> -->
<!-- 				</a> -->
<!-- 			</li> -->
			<li id = "query_popup" data-toggle="tooltip" title="Query">
				<a href="javascript:void(0);" data-attr="#query">
					<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
						xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
						viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
					<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_"></g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g>
					<g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_">
						<g>
							<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="1.131" stroke-miterlimit="10" d="
								M38.04,17.132c-1.271-2.177-2.994-3.899-5.171-5.171c-2.177-1.271-4.554-1.906-7.132-1.906c-2.578,0-4.955,0.636-7.132,1.906
								c-2.177,1.271-3.901,2.994-5.171,5.171c-1.271,2.178-1.906,4.555-1.906,7.133c0,2.577,0.636,4.954,1.906,7.132
								c0.081,0.139,0.164,0.276,0.249,0.412l-0.352,0.145l-3.274,7.991l7.992-3.273l0.144-0.353c0.135,0.085,0.272,0.168,0.412,0.249
								c2.178,1.271,4.555,1.905,7.133,1.905c2.578,0,4.955-0.635,7.132-1.905s3.901-2.994,5.171-5.171
								c1.27-2.178,1.905-4.555,1.905-7.132C39.944,21.687,39.309,19.309,38.04,17.132L38.04,17.132z M28.104,33.811
								c0,0.172-0.056,0.314-0.167,0.425c-0.109,0.11-0.251,0.166-0.424,0.166H23.96c-0.172,0-0.314-0.056-0.426-0.166
								s-0.167-0.253-0.167-0.425v-3.553c0-0.173,0.056-0.314,0.167-0.426s0.253-0.166,0.426-0.166h3.552
								c0.173,0,0.315,0.055,0.424,0.166c0.111,0.111,0.167,0.253,0.167,0.426V33.811L28.104,33.811z M32.61,22.21
								c-0.154,0.457-0.327,0.831-0.519,1.12c-0.191,0.289-0.465,0.586-0.823,0.889c-0.357,0.301-0.641,0.518-0.852,0.646
								c-0.209,0.13-0.512,0.305-0.906,0.527c-0.407,0.235-0.743,0.54-1.008,0.916c-0.265,0.377-0.398,0.682-0.398,0.916
								c0,0.172-0.055,0.314-0.166,0.426c-0.111,0.11-0.252,0.166-0.426,0.166H23.96c-0.172,0-0.314-0.056-0.425-0.166
								c-0.112-0.111-0.166-0.254-0.166-0.426v-0.667c0-0.826,0.322-1.601,0.97-2.321c0.648-0.723,1.36-1.256,2.138-1.601
								c0.592-0.271,1.011-0.549,1.257-0.833c0.248-0.283,0.37-0.659,0.37-1.128c0-0.407-0.231-0.771-0.694-1.093
								c-0.462-0.32-0.989-0.48-1.581-0.48c-0.642,0-1.172,0.147-1.591,0.444c-0.408,0.296-0.938,0.863-1.591,1.702
								c-0.112,0.148-0.267,0.223-0.464,0.223c-0.147,0-0.265-0.038-0.352-0.111l-2.441-1.851c-0.284-0.222-0.333-0.48-0.149-0.776
								c1.579-2.628,3.868-3.941,6.865-3.941c1.074,0,2.122,0.253,3.146,0.76c1.023,0.504,1.877,1.221,2.563,2.146
								c0.684,0.925,1.026,1.931,1.026,3.016C32.84,21.254,32.763,21.754,32.61,22.21z"/>
						</g>
					</g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_"></g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_">
					</g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g>
					</svg>
					Query
<!-- 					<span class="menu-name" data-translate="_query">Query</span> -->
				</a>
			</li>
			<li data-toggle="tooltip" title="Draw">
				<a href="javascript:void(0);" data-attr="#draw_tools">
					<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
							 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
							 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">	<g>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M10.136,12.797l1.993,3.488c0.067,0.118,0.18,0.204,0.312,0.236
									l1.859,0.465l6.379,6.378l0.704-0.704l-6.479-6.479c-0.063-0.064-0.144-0.109-0.23-0.131l-1.787-0.448l-1.697-2.972l1.455-1.455
									l2.973,1.699l0.448,1.787c0.022,0.088,0.067,0.168,0.132,0.231l6.479,6.479l0.704-0.705l-6.378-6.378l-0.466-1.859
									c-0.032-0.132-0.118-0.245-0.236-0.312l-3.488-1.993c-0.194-0.111-0.438-0.078-0.598,0.08l-1.993,1.994
									C10.061,12.355,10.025,12.601,10.136,12.797z"/>
								
									<rect x="17.268" y="24.507" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -10.3536 25.0155)" fill-rule="evenodd" clip-rule="evenodd" fill="#855439" width="15.504" height="0.997"/>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M17.972,31.227c-0.09-0.15-0.252-0.241-0.428-0.241h-2.989
									c-0.175,0-0.337,0.091-0.427,0.241l-1.495,2.492c-0.096,0.158-0.096,0.355,0,0.514l1.495,2.492
									c0.09,0.149,0.252,0.241,0.427,0.241h2.989c0.176,0,0.338-0.092,0.428-0.241l1.495-2.492c0.095-0.158,0.095-0.355,0-0.514
									L17.972,31.227L17.972,31.227z M17.263,35.969h-2.426l-1.196-1.993l1.196-1.993h2.426l1.195,1.993L17.263,35.969z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M33.989,22.016c3.069,0.01,5.604-2.302,5.941-5.284v-1.351
									c-0.03-0.267-0.079-0.531-0.146-0.791c-0.066-0.267-0.336-0.43-0.604-0.363c-0.088,0.022-0.168,0.067-0.231,0.131l-3.103,3.1
									l-2.461-0.82l-0.82-2.46l3.102-3.103c0.194-0.195,0.194-0.51,0-0.705c-0.064-0.064-0.146-0.11-0.233-0.131
									c-3.192-0.809-6.435,1.124-7.243,4.315c-0.123,0.484-0.184,0.982-0.182,1.481c0.001,0.393,0.041,0.784,0.12,1.168L17.217,28.117
									c-0.384-0.079-0.775-0.12-1.167-0.121c-3.303,0-5.98,2.677-5.98,5.98c0,3.184,2.489,5.786,5.627,5.969h0.707
									c3.138-0.183,5.626-2.785,5.626-5.969c-0.001-0.393-0.042-0.783-0.121-1.167l2.612-2.613l1.144,1.143
									c0.194,0.194,0.509,0.194,0.704,0l0.249-0.25c0.219-0.217,0.572-0.217,0.791,0c0.218,0.218,0.218,0.571,0,0.79l-0.25,0.25
									c-0.194,0.195-0.194,0.51,0,0.705l5.945,5.944c0.676,0.683,1.536,1.072,2.423,1.167h0.867c0.875-0.095,1.725-0.475,2.397-1.142
									c0.629-0.624,1.009-1.403,1.14-2.216v-1.283c-0.129-0.8-0.5-1.569-1.114-2.189c-0.008-0.009-0.017-0.017-0.025-0.025l-5.944-5.944
									c-0.194-0.195-0.511-0.195-0.705,0l-0.249,0.249c-0.219,0.217-0.571,0.217-0.79,0s-0.219-0.571-0.001-0.789
									c0,0,0.001-0.001,0.001-0.001l0.249-0.25c0.194-0.194,0.194-0.51,0-0.705l-1.143-1.143l2.612-2.613
									C33.206,21.974,33.597,22.015,33.989,22.016L33.989,22.016z M35.947,38.959c-0.362-0.001-0.722-0.066-1.061-0.193l3.893-3.892
									c0.587,1.563-0.203,3.305-1.766,3.892C36.673,38.894,36.312,38.959,35.947,38.959L35.947,38.959z M30.302,26.007
									c-0.552,0.658-0.466,1.64,0.192,2.191c0.579,0.485,1.422,0.484,2-0.001l5.593,5.597c0.061,0.061,0.117,0.125,0.172,0.19
									l-4.261,4.261c-0.065-0.055-0.13-0.111-0.19-0.172l-5.597-5.597c0.552-0.658,0.466-1.639-0.192-2.191
									c-0.579-0.485-1.423-0.484-2,0.001l-0.798-0.797l4.283-4.277L30.302,26.007L30.302,26.007z M32.314,20.996L21.01,32.298
									c-0.124,0.124-0.175,0.303-0.132,0.474c0.684,2.685-0.938,5.416-3.624,6.099c-2.685,0.684-5.416-0.938-6.1-3.624
									c-0.684-2.685,0.939-5.416,3.624-6.099c0.813-0.207,1.663-0.207,2.476,0c0.17,0.042,0.35-0.008,0.474-0.131l11.302-11.303
									c0.124-0.124,0.174-0.304,0.131-0.473c-0.679-2.653,0.922-5.355,3.575-6.034c0.502-0.128,1.021-0.178,1.537-0.146l-2.629,2.63
									c-0.134,0.133-0.181,0.331-0.121,0.51l0.997,2.989c0.05,0.149,0.167,0.266,0.315,0.315l2.99,0.997
									c0.179,0.06,0.376,0.013,0.51-0.12l2.628-2.629c0.006,0.095,0.01,0.189,0.01,0.283c0.014,2.738-2.194,4.97-4.933,4.983
									c-0.424,0.002-0.846-0.05-1.256-0.155c-0.169-0.042-0.35,0.007-0.473,0.131L32.314,20.996L32.314,20.996z"/>
								
									<rect x="32.495" y="29.456" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -13.6562 32.989)" fill-rule="evenodd" clip-rule="evenodd" fill="#855439" width="0.997" height="7.047"/>
							</g>
						</g>
						<g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
						</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g>
						</svg>
						Draw
<!-- 					<span class="menu-name" data-translate="_draw">Draw</span> -->
				</a>
			</li>
			
			
			<!-- FEATURE MANAGEMENT STARTS-->
			
			<li data-toggle="tooltip" title="Draw">
				<a href="javascript:void(0);" data-attr="#feature_tools">
					<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
							 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
							 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">	<g>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M10.136,12.797l1.993,3.488c0.067,0.118,0.18,0.204,0.312,0.236
									l1.859,0.465l6.379,6.378l0.704-0.704l-6.479-6.479c-0.063-0.064-0.144-0.109-0.23-0.131l-1.787-0.448l-1.697-2.972l1.455-1.455
									l2.973,1.699l0.448,1.787c0.022,0.088,0.067,0.168,0.132,0.231l6.479,6.479l0.704-0.705l-6.378-6.378l-0.466-1.859
									c-0.032-0.132-0.118-0.245-0.236-0.312l-3.488-1.993c-0.194-0.111-0.438-0.078-0.598,0.08l-1.993,1.994
									C10.061,12.355,10.025,12.601,10.136,12.797z"/>
								
									<rect x="17.268" y="24.507" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -10.3536 25.0155)" fill-rule="evenodd" clip-rule="evenodd" fill="#855439" width="15.504" height="0.997"/>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M17.972,31.227c-0.09-0.15-0.252-0.241-0.428-0.241h-2.989
									c-0.175,0-0.337,0.091-0.427,0.241l-1.495,2.492c-0.096,0.158-0.096,0.355,0,0.514l1.495,2.492
									c0.09,0.149,0.252,0.241,0.427,0.241h2.989c0.176,0,0.338-0.092,0.428-0.241l1.495-2.492c0.095-0.158,0.095-0.355,0-0.514
									L17.972,31.227L17.972,31.227z M17.263,35.969h-2.426l-1.196-1.993l1.196-1.993h2.426l1.195,1.993L17.263,35.969z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M33.989,22.016c3.069,0.01,5.604-2.302,5.941-5.284v-1.351
									c-0.03-0.267-0.079-0.531-0.146-0.791c-0.066-0.267-0.336-0.43-0.604-0.363c-0.088,0.022-0.168,0.067-0.231,0.131l-3.103,3.1
									l-2.461-0.82l-0.82-2.46l3.102-3.103c0.194-0.195,0.194-0.51,0-0.705c-0.064-0.064-0.146-0.11-0.233-0.131
									c-3.192-0.809-6.435,1.124-7.243,4.315c-0.123,0.484-0.184,0.982-0.182,1.481c0.001,0.393,0.041,0.784,0.12,1.168L17.217,28.117
									c-0.384-0.079-0.775-0.12-1.167-0.121c-3.303,0-5.98,2.677-5.98,5.98c0,3.184,2.489,5.786,5.627,5.969h0.707
									c3.138-0.183,5.626-2.785,5.626-5.969c-0.001-0.393-0.042-0.783-0.121-1.167l2.612-2.613l1.144,1.143
									c0.194,0.194,0.509,0.194,0.704,0l0.249-0.25c0.219-0.217,0.572-0.217,0.791,0c0.218,0.218,0.218,0.571,0,0.79l-0.25,0.25
									c-0.194,0.195-0.194,0.51,0,0.705l5.945,5.944c0.676,0.683,1.536,1.072,2.423,1.167h0.867c0.875-0.095,1.725-0.475,2.397-1.142
									c0.629-0.624,1.009-1.403,1.14-2.216v-1.283c-0.129-0.8-0.5-1.569-1.114-2.189c-0.008-0.009-0.017-0.017-0.025-0.025l-5.944-5.944
									c-0.194-0.195-0.511-0.195-0.705,0l-0.249,0.249c-0.219,0.217-0.571,0.217-0.79,0s-0.219-0.571-0.001-0.789
									c0,0,0.001-0.001,0.001-0.001l0.249-0.25c0.194-0.194,0.194-0.51,0-0.705l-1.143-1.143l2.612-2.613
									C33.206,21.974,33.597,22.015,33.989,22.016L33.989,22.016z M35.947,38.959c-0.362-0.001-0.722-0.066-1.061-0.193l3.893-3.892
									c0.587,1.563-0.203,3.305-1.766,3.892C36.673,38.894,36.312,38.959,35.947,38.959L35.947,38.959z M30.302,26.007
									c-0.552,0.658-0.466,1.64,0.192,2.191c0.579,0.485,1.422,0.484,2-0.001l5.593,5.597c0.061,0.061,0.117,0.125,0.172,0.19
									l-4.261,4.261c-0.065-0.055-0.13-0.111-0.19-0.172l-5.597-5.597c0.552-0.658,0.466-1.639-0.192-2.191
									c-0.579-0.485-1.423-0.484-2,0.001l-0.798-0.797l4.283-4.277L30.302,26.007L30.302,26.007z M32.314,20.996L21.01,32.298
									c-0.124,0.124-0.175,0.303-0.132,0.474c0.684,2.685-0.938,5.416-3.624,6.099c-2.685,0.684-5.416-0.938-6.1-3.624
									c-0.684-2.685,0.939-5.416,3.624-6.099c0.813-0.207,1.663-0.207,2.476,0c0.17,0.042,0.35-0.008,0.474-0.131l11.302-11.303
									c0.124-0.124,0.174-0.304,0.131-0.473c-0.679-2.653,0.922-5.355,3.575-6.034c0.502-0.128,1.021-0.178,1.537-0.146l-2.629,2.63
									c-0.134,0.133-0.181,0.331-0.121,0.51l0.997,2.989c0.05,0.149,0.167,0.266,0.315,0.315l2.99,0.997
									c0.179,0.06,0.376,0.013,0.51-0.12l2.628-2.629c0.006,0.095,0.01,0.189,0.01,0.283c0.014,2.738-2.194,4.97-4.933,4.983
									c-0.424,0.002-0.846-0.05-1.256-0.155c-0.169-0.042-0.35,0.007-0.473,0.131L32.314,20.996L32.314,20.996z"/>
								
									<rect x="32.495" y="29.456" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -13.6562 32.989)" fill-rule="evenodd" clip-rule="evenodd" fill="#855439" width="0.997" height="7.047"/>
							</g>
						</g>
						<g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
						</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g>
						</svg>
						Feature Management
<!-- 					<span class="menu-name" data-translate="_draw">Draw</span> -->
				</a>
			</li>
			
			<!-- FEATURE MANAGEMENT ENDS -->
			
			<li id="arroundme_popup" data-toggle="tooltip" title="Around Me">
				<a href="javascript:void(0);" data-attr="#around_me">
					<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
						 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
						 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
					<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_"><g>
							<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M25,23.009c1.924,0,3.488-1.564,3.488-3.49
								c0-1.92-1.564-3.484-3.488-3.484s-3.488,1.564-3.488,3.484C21.512,21.444,23.076,23.009,25,23.009L25,23.009z M25,17.028
								c1.374,0,2.491,1.119,2.491,2.49c0,1.375-1.117,2.492-2.491,2.492s-2.49-1.117-2.49-2.492C22.51,18.147,23.626,17.028,25,17.028z"
								/>
							<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M24.912,37.333l7.643-11.039
								c2.865-3.822,2.452-10.102-0.888-13.439c-1.805-1.805-4.203-2.799-6.755-2.799c-2.551,0-4.952,0.994-6.754,2.797
								c-3.341,3.34-3.756,9.619-0.9,13.428L24.912,37.333L24.912,37.333z M18.861,13.558c1.617-1.615,3.765-2.504,6.051-2.504
								c2.284,0,4.435,0.889,6.05,2.504c3.014,3.014,3.387,8.686,0.783,12.154l-6.833,9.871l-6.845-9.885
								C15.478,22.243,15.847,16.571,18.861,13.558z"/>
							<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M31.037,31.479c-0.274-0.033-0.522,0.164-0.554,0.436
								c-0.032,0.275,0.162,0.521,0.438,0.555c5.236,0.615,8.026,2.277,8.026,3.24c0,1.352-5.305,3.236-13.947,3.236
								s-13.947-1.885-13.947-3.236c0-0.963,2.79-2.625,8.027-3.24c0.274-0.033,0.469-0.281,0.438-0.555
								c-0.034-0.271-0.28-0.469-0.555-0.436c-5.244,0.617-8.907,2.357-8.907,4.23c0,2.104,5.132,4.234,14.944,4.234
								s14.944-2.131,14.944-4.234C39.944,33.837,36.282,32.097,31.037,31.479z"/>
						</g>
					</g>
					<g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
					</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g>
					</svg>
					Around Me
<!-- 					<span class="menu-name" data-translate="_around_me">Around Me</span> -->
				</a>
			</li>
			
			<!-- <li id="event_popup" data-toggle="tooltip" title="Events">
				<a href="javascript:void(0);" data-attr="#events" id="eventMenuIcon">
					<svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <g id="Layer_1"> </g> <g id="Layer_1_1_"> </g> <g id="Layer_1_2_"> </g> <g id="Layer_1_3_"> </g> <g id="Layer_1_4_"> </g> <g id="Layer_1_5_"> <g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M36.791,12.21h-1.938v-1.324c0-0.311-0.253-0.563-0.563-0.563     s-0.563,0.252-0.563,0.563v1.324H31.34v-1.324c0-0.311-0.252-0.563-0.563-0.563c-0.312,0-0.563,0.252-0.563,0.563v1.324H19.786     v-1.324c0-0.311-0.252-0.563-0.563-0.563s-0.563,0.252-0.563,0.563v1.324h-2.387v-1.324c0-0.311-0.252-0.563-0.563-0.563     c-0.311,0-0.563,0.252-0.563,0.563v1.324H13.21c-1.401,0-2.542,1.14-2.542,2.542v22.384c0,1.401,1.141,2.541,2.542,2.541h23.581     c1.401,0,2.541-1.14,2.541-2.541V14.752C39.332,13.351,38.192,12.21,36.791,12.21L36.791,12.21z M38.207,37.136     c0,0.781-0.635,1.416-1.416,1.416H13.21c-0.781,0-1.417-0.635-1.417-1.416V18.929h26.414V37.136L38.207,37.136z M11.793,14.752     c0-0.781,0.636-1.417,1.417-1.417h1.938v1.324c0,0.311,0.252,0.563,0.563,0.563c0.311,0,0.563-0.252,0.563-0.563v-1.324h2.387     v1.324c0,0.311,0.252,0.563,0.563,0.563c0.312,0,0.563-0.252,0.563-0.563v-1.324h10.428v1.324c0,0.311,0.252,0.563,0.563,0.563     c0.311,0,0.563-0.252,0.563-0.563v-1.324h2.387v1.324c0,0.311,0.252,0.563,0.563,0.563c0.312,0,0.563-0.252,0.563-0.563v-1.324     h1.938c0.781,0,1.416,0.636,1.416,1.417v3.052H11.793V14.752z"/> </g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M25,35.449c3.699,0,6.709-3.01,6.709-6.709     S28.7,22.031,25,22.031c-3.699,0-6.709,3.01-6.709,6.709S21.302,35.449,25,35.449L25,35.449z M25,23.157     c3.079,0,5.584,2.504,5.584,5.583S28.079,34.324,25,34.324c-3.078,0-5.583-2.505-5.583-5.584S21.922,23.157,25,23.157z"/> </g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M23.912,30.72c0.105,0.105,0.249,0.164,0.398,0.164     s0.292-0.059,0.397-0.164l3.163-3.162c0.22-0.221,0.22-0.576,0-0.796s-0.576-0.22-0.796,0l-2.765,2.764l-1.385-1.385     c-0.22-0.22-0.576-0.22-0.796,0c-0.22,0.221-0.22,0.576,0,0.796L23.912,30.72z"/> </g> </g> </g> <g id="Layer_1_6_"> </g> <g id="Layer_1_7_"> </g> <g id="Layer_1_8_"> </g> <g id="Layer_1_9_"> </g> <g id="Layer_1_10_"> </g> <g id="Layer_1_11_"> </g> <g id="Layer_1_12_"> </g> <g id="Layer_1_13_"> </g> <g id="Layer_1_14_"> </g> <g id="Layer_1_15_"> </g> <g id="Layer_1_16_"> </g> <g id="Layer_1_17_"> </g> <g id="Layer_1_18_"> </g> <g id="Layer_1_19_"> </g> <g id="Layer_1_20_"> </g> <g id="Layer_1_21_"> </g> <g id="Layer_1_22_"> </g> <g id="Layer_1_23_"> </g> <g id="Layer_1_24_"> </g> <g id="Layer_1_25_"> </g> <g id="Layer_1_26_"> </g> <g id="Layer_1_27_"> </g> <g id="Layer_1_28_"> </g> <g id="Layer_1_29_"> </g> <g id="Layer_1_30_"> </g> </svg>
		<span class="menu-name" data-translate="_events">Events</span> 
				</a>
			</li>-->
			
			<li id="ward_info_popup" data-toggle="tooltip" title="Ward Information">
				<a href="javascript:void(0);" data-attr="#ward_information">
					<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
						 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
						 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
					<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">
						<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M38.758,30.394l-5.926,5.33c-0.494,0.4-1.086,0.666-1.714,0.766
							l-9.178,1.324c-0.002,0-0.004,0-0.006,0l-0.007,0.002c-0.277,0.043-0.567,0.025-0.86-0.055l-6.532-2.475v-8.023h0.73
							c0.621,0,1.238,0.072,1.84,0.211c0.022,0.006,0.045,0.01,0.066,0.016c0.074,0.018,0.147,0.037,0.222,0.057
							c0.006,0.002,0.013,0.004,0.019,0.006c0.074,0.02,0.146,0.041,0.22,0.063c0.013,0.004,0.026,0.008,0.039,0.012
							c0.078,0.025,0.155,0.049,0.232,0.076c0.008,0.002,0.016,0.006,0.023,0.008c0.16,0.055,0.318,0.115,0.476,0.182
							c0.008,0.002,0.017,0.006,0.025,0.01c0.078,0.033,0.155,0.066,0.232,0.102c0.002,0.002,0.004,0.002,0.006,0.004
							c0.075,0.033,0.148,0.07,0.223,0.105c0.008,0.004,0.018,0.01,0.025,0.014c0.072,0.035,0.144,0.072,0.214,0.111
							c0.014,0.006,0.027,0.014,0.04,0.021c0.071,0.039,0.143,0.078,0.213,0.119c1.016,0.594,2.12,0.979,3.285,1.145
							c0.004,0,0.007,0,0.011,0l4.78,0.551c0.026,0.004,0.053,0.008,0.079,0.014c0.703,0.131,1.259,0.652,1.444,1.328
							c0.028,0.102,0.047,0.205,0.058,0.311l0.02,0.191l-8.959-0.785c-0.234-0.02-0.441,0.154-0.462,0.389s0.153,0.441,0.388,0.461
							l9.471,0.83c0.003,0,0.005,0,0.007,0c0.003,0,0.005,0.002,0.007,0.002l1.786,0.1c0.008,0,0.016,0,0.024,0c0.008,0,0.017,0,0.024,0
							c0.01-0.002,0.02-0.002,0.028-0.004c0.014,0,0.025-0.004,0.038-0.006c0.009-0.002,0.018-0.004,0.026-0.006
							c0.014-0.004,0.027-0.01,0.04-0.016c0.008-0.002,0.015-0.004,0.021-0.008c0.021-0.01,0.04-0.02,0.059-0.031l1.516-1.016l0,0
							l4.478-2.996c0.451-0.303,1.065-0.186,1.371,0.264C39.2,29.505,39.131,30.063,38.758,30.394L38.758,30.394z M22.952,23.798
							l0.007,4.898l0.336,0.039l3.568,0.41l-0.007-5.354L22.952,23.798L22.952,23.798z M17.414,26.671
							c0.028,0.006,0.057,0.014,0.084,0.021c0.061,0.016,0.119,0.031,0.179,0.047c0.046,0.014,0.091,0.025,0.136,0.039
							c0.053,0.016,0.105,0.031,0.158,0.049c0.049,0.016,0.098,0.031,0.146,0.047s0.097,0.033,0.144,0.051
							c0.052,0.018,0.103,0.035,0.153,0.055c0.045,0.016,0.091,0.035,0.136,0.053c0.051,0.02,0.103,0.039,0.153,0.061
							c0.045,0.018,0.091,0.039,0.136,0.059c0.049,0.02,0.099,0.041,0.147,0.064c0.049,0.021,0.096,0.045,0.144,0.066
							c0.046,0.021,0.091,0.043,0.136,0.064c0.056,0.029,0.111,0.059,0.167,0.086c0.036,0.02,0.072,0.037,0.107,0.057
							c0.092,0.049,0.182,0.1,0.271,0.152c0.72,0.42,1.488,0.725,2.294,0.908l-0.007-4.832c0-0.205,0.08-0.4,0.226-0.547
							c0.146-0.145,0.339-0.227,0.546-0.227l4.065-0.006c0.001,0,0.001,0,0.001,0c0.426,0,0.771,0.346,0.772,0.771l0.008,5.543
							c1.168,0.23,2.052,1.191,2.171,2.389l0.033,0.34l1.279,0.072l1.208-0.809l-0.014-9.316l-7.503-7.029l-7.483,7.049L17.414,26.671
							L17.414,26.671z M19.573,14.544l0.002,1.203l-2.097,1.975l-0.005-3.174L19.573,14.544L19.573,14.544z M39.626,28.614
							c-0.568-0.834-1.713-1.057-2.551-0.492l-3.814,2.553l-0.011-7.945l1.325,1.24c0.281,0.264,0.648,0.41,1.034,0.41
							c0.001,0,0.002,0,0.003,0c0.416-0.002,0.818-0.176,1.103-0.48c0.276-0.295,0.422-0.68,0.408-1.084
							c-0.013-0.404-0.183-0.779-0.478-1.055l-2.513-2.355c-0.172-0.16-0.441-0.15-0.603,0.021s-0.152,0.441,0.02,0.602l2.512,2.354
							c0.129,0.121,0.203,0.285,0.209,0.461c0.006,0.178-0.058,0.346-0.178,0.475c-0.126,0.135-0.298,0.209-0.482,0.209c0,0,0,0-0.001,0
							c-0.168,0-0.328-0.064-0.451-0.18l0,0l0,0l-9.976-9.344c-0.165-0.154-0.421-0.154-0.585,0l-9.949,9.373l0,0l0,0
							c-0.129,0.121-0.297,0.184-0.474,0.18c-0.176-0.006-0.34-0.08-0.461-0.207c-0.121-0.129-0.185-0.297-0.18-0.475
							c0.005-0.176,0.079-0.34,0.208-0.461l10.693-10.072c0.253-0.24,0.65-0.24,0.905-0.002l6.256,5.861
							c0.172,0.16,0.441,0.152,0.603-0.021c0.161-0.17,0.152-0.441-0.02-0.602l-6.256-5.861c-0.291-0.271-0.664-0.408-1.037-0.408
							s-0.746,0.139-1.036,0.412l-3.424,3.225l-0.001-0.576c0-0.182-0.071-0.352-0.199-0.479c-0.128-0.129-0.299-0.199-0.479-0.199
							h-0.001l-2.448,0.004c-0.182,0-0.352,0.07-0.479,0.199c-0.129,0.129-0.199,0.299-0.198,0.48l0.007,4.15l-3.47,3.268
							c-0.295,0.277-0.464,0.652-0.476,1.059c-0.013,0.404,0.134,0.789,0.411,1.082c0.277,0.295,0.652,0.463,1.057,0.477
							c0.016,0,0.031,0,0.047,0c0.387,0,0.754-0.145,1.037-0.412l1.322-1.246l0.005,3.754c-0.428-0.063-0.86-0.096-1.295-0.096h-0.73
							v-0.256c0-0.857-0.698-1.557-1.558-1.557h-1.365c-0.858,0-1.557,0.697-1.557,1.557v6.686c0,0.236,0.19,0.426,0.426,0.426
							c0.236,0,0.427-0.189,0.427-0.426v-6.686c0-0.389,0.316-0.703,0.704-0.703h1.365c0.389,0,0.705,0.314,0.705,0.703v10.104
							c0,0.389-0.316,0.703-0.705,0.703h-1.365c-0.388,0-0.704-0.314-0.704-0.703v-0.746c0-0.236-0.19-0.428-0.427-0.428
							c-0.235,0-0.426,0.191-0.426,0.428v0.746c0,0.859,0.698,1.557,1.557,1.557h1.365c0.859,0,1.558-0.697,1.558-1.557v-0.059
							l6.248,2.367c0.012,0.004,0.023,0.008,0.035,0.012c0.271,0.076,0.543,0.115,0.812,0.115h0.007c0.143-0.002,0.284-0.012,0.425-0.035
							l9.182-1.322c0.002-0.002,0.004-0.002,0.006-0.002c0.781-0.125,1.518-0.455,2.13-0.953c0.005-0.006,0.011-0.01,0.016-0.014
							l5.932-5.336C40.017,30.417,40.146,29.378,39.626,28.614z"/>
					</g>
					<g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
					</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_">
					</g>
					</svg>
					Ward Information
<!-- 					<span class="menu-name" data-translate="_ward_information">Ward Information</span> -->
				</a>
			</li>
			<li id="kyp_popup" data-toggle="tooltip" title="Know Your Property">
				<a href="javascript:void(0);" data-attr="#know_your_property">
					<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
						 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
						 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
					<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">
						<g>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="0.9998" stroke-miterlimit="22.9256" d="
								M29.381,13.616c0-1.932-1.569-3.559-3.498-3.563h-0.01c-1.93,0.004-3.557,1.631-3.557,3.563s1.629,3.561,3.561,3.561
								C27.81,17.177,29.381,15.548,29.381,13.616z"/>
							<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="0.8966" stroke-miterlimit="10" d="
								M20.565,20.679v0.877c0,0.484,0.392,0.875,0.875,0.875h8.816c0.484,0,0.876-0.391,0.876-0.875v-0.877
								c0-1.35-0.526-2.57-1.367-3.502c-0.963,1.066-2.341,1.752-3.888,1.752s-2.983-0.686-3.946-1.752
								C21.091,18.108,20.565,19.329,20.565,20.679z"/>
							
								<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="0.9998" stroke-miterlimit="22.9256" d="
								M14.054,27.985c-0.431-0.863-1.479-1.215-2.345-0.787l-1.167,0.578c-0.434,0.215-0.611,0.744-0.395,1.176l5.255,10.51
								c0.216,0.434,0.741,0.605,1.172,0.393l1.151-0.57c0.869-0.43,1.223-1.482,0.79-2.35L14.054,27.985z"/>
							
								<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#855439" stroke-width="0.9998" stroke-miterlimit="22.9256" d="
								M39.23,24.515c-0.718-0.525-1.716-0.42-2.312,0.229l-4.788,5.885c-0.333,0.35-0.963,0.561-1.296,0.561h-4.081
								c-0.491,0-0.876-0.385-0.876-0.875s0.385-0.877,0.876-0.877c1.173,0,2.472,0,3.503,0c0.963,0,1.751-0.787,1.751-1.75
								c0-0.965-0.788-1.752-1.751-1.752c-4.113,0-0.19,0-4.589,0c-0.437,0-0.654-0.277-0.998-0.578
								c-1.355-1.221-3.383-1.807-5.437-1.332c-1.14,0.266-1.909,0.727-2.688,1.344l-0.026-0.021l-1.267,1.115l4.979,9.98h10.027
								c1.646,0,3.223-0.787,4.204-2.102l5.138-7.355c0.231-0.309,0.345-0.672,0.347-1.035v-0.029
								C39.94,25.386,39.694,24.856,39.23,24.515z"/>
						</g>
					</g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
					</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g>
					</svg>
					Know Your Property
<!-- 					<span class="menu-name" data-translate="_know_your_property">Know Your Property</span> -->
				</a>
			</li>
			
			<li id="thana_info_popup" data-toggle="tooltip" title="Know Your Thana">
				<a href="javascript:void(0);" data-attr="#thana_info">
					<svg style="padding:2px;" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" width="50px" height="50px"
					 enable-background="new 0 0 50 50" xml:space="preserve" class="small-icon">
						<g>
							<path fill="#855439" d="M31.551,7.351h15.775c0.312,0,0.624,0.312,0.624,0.668v11.007h1.426c0.357,0,0.624,0.312,0.624,0.668
								c0,0.312-0.267,0.624-0.624,0.624h-2.05l0,0h-1.381V46.21l0,0v2.05h2.139c0.357,0,0.624,0.267,0.624,0.624
								c0,0.312-0.267,0.624-0.624,0.624h-2.718h-0.045H4.679H4.635H1.916c-0.357,0-0.624-0.312-0.624-0.624
								c0-0.357,0.267-0.624,0.624-0.624h2.139v-2.05l0,0V20.318H2.718H2.674h-2.05C0.267,20.318,0,20.007,0,19.695
								c0-0.357,0.267-0.668,0.624-0.668H2.05V8.019c0-0.357,0.312-0.668,0.668-0.668h15.731c0-0.178,0-0.401,0-0.624V3.652
								c0-0.312,0.223-0.579,0.49-0.624c0.98-0.267,1.961-0.624,2.941-1.025c0.936-0.401,1.872-0.891,2.807-1.426
								c0.223-0.134,0.446-0.089,0.624,0c0.891,0.535,1.872,0.98,2.807,1.426c0.98,0.401,2.005,0.758,2.986,1.025
								c0.267,0.089,0.446,0.357,0.446,0.624v3.075C31.551,6.949,31.551,7.172,31.551,7.351L31.551,7.351z M18.627,8.643H3.342v10.383
								h1.292h0.045h40.642h0.045h1.292V8.643H31.373c-0.134,0.668-0.312,1.292-0.535,1.872c-0.579,1.381-1.426,2.406-2.184,3.164
								c-0.579,0.579-1.203,1.025-1.738,1.381c-0.891,0.535-1.649,0.758-1.916,0.758c-0.267,0-1.025-0.223-1.872-0.758
								c-0.579-0.357-1.203-0.802-1.783-1.381c-0.758-0.758-1.604-1.783-2.184-3.164C18.939,9.935,18.761,9.311,18.627,8.643
								L18.627,8.643z M29.679,10.024c0.357-0.936,0.624-2.005,0.624-3.298V4.097c-0.891-0.267-1.783-0.579-2.674-0.936
								C26.738,2.761,25.847,2.315,25,1.825c-0.847,0.49-1.738,0.936-2.629,1.337c-0.891,0.357-1.783,0.668-2.674,0.936v2.629
								c0,1.292,0.267,2.362,0.624,3.298c0.535,1.203,1.248,2.094,1.872,2.763c0.535,0.49,1.07,0.891,1.56,1.203
								c0.668,0.401,1.114,0.579,1.248,0.579c0.134,0,0.579-0.178,1.248-0.579c0.49-0.312,1.025-0.713,1.56-1.203
								C28.431,12.119,29.144,11.228,29.679,10.024L29.679,10.024z M24.198,7.885l-0.579,0.089l0.446,0.446
								c0.134,0.178,0.223,0.401,0.134,0.579l-0.089,0.624l0.579-0.312c0.178-0.089,0.401-0.089,0.579,0l0.579,0.312l-0.134-0.668
								c0-0.178,0.045-0.401,0.178-0.535l0.49-0.446l-0.624-0.089c-0.223-0.045-0.401-0.178-0.49-0.357l-0.312-0.579l-0.267,0.579
								C24.599,7.707,24.421,7.841,24.198,7.885L24.198,7.885z M22.193,6.949l1.515-0.267l0.713-1.381
								c0.045-0.134,0.134-0.223,0.267-0.267C25,4.855,25.357,4.989,25.535,5.301l0.713,1.381l1.56,0.267
								c0.134,0,0.267,0.045,0.357,0.178c0.223,0.223,0.223,0.624,0,0.891l-1.159,1.07l0.267,1.515c0,0.134,0,0.312-0.089,0.446
								c-0.134,0.312-0.535,0.401-0.847,0.267l-1.381-0.713l-1.381,0.713c-0.089,0.045-0.223,0.089-0.357,0.045
								c-0.357-0.045-0.579-0.357-0.535-0.713l0.267-1.56l-1.114-1.07c-0.089-0.089-0.134-0.223-0.178-0.357
								C21.613,7.306,21.836,6.994,22.193,6.949L22.193,6.949z M36.185,31.504h4.367c0.357,0,0.624,0.267,0.624,0.624v4.367
								c0,0.357-0.267,0.624-0.624,0.624h-4.367c-0.357,0-0.668-0.267-0.668-0.624v-4.367C35.517,31.771,35.829,31.504,36.185,31.504
								L36.185,31.504z M39.929,32.752h-3.119v3.119h3.119V32.752z M36.185,23.616h4.367c0.357,0,0.624,0.267,0.624,0.624v4.367
								c0,0.357-0.267,0.668-0.624,0.668h-4.367c-0.357,0-0.668-0.312-0.668-0.668V24.24C35.517,23.884,35.829,23.616,36.185,23.616
								L36.185,23.616z M39.929,24.864h-3.119v3.119h3.119V24.864z M9.091,31.504h4.367c0.357,0,0.624,0.267,0.624,0.624v4.367
								c0,0.357-0.267,0.624-0.624,0.624H9.091c-0.357,0-0.624-0.267-0.624-0.624v-4.367C8.467,31.771,8.734,31.504,9.091,31.504
								L9.091,31.504z M12.834,32.752H9.715v3.119h3.119V32.752z M9.091,23.616h4.367c0.357,0,0.624,0.267,0.624,0.624v4.367
								c0,0.357-0.267,0.668-0.624,0.668H9.091c-0.357,0-0.624-0.312-0.624-0.668V24.24C8.467,23.884,8.734,23.616,9.091,23.616
								L9.091,23.616z M12.834,24.864H9.715v3.119h3.119V24.864z M18.182,23.794h13.636c0.357,0,0.624,0.312,0.624,0.624v21.168h12.255
								V20.318H5.303v25.267h12.255V24.418C17.558,24.106,17.825,23.794,18.182,23.794L18.182,23.794z M31.194,25.042H18.806v20.544
								h12.389V25.042z M44.697,46.834H31.818H18.182H5.303v1.426h39.394V46.834z"/>
						</g>
					
				</svg>
					Know Your Thana
				</a>
			</li>
			
			
		<!--	<li id="announcement_list" data-toggle="tooltip" title="City Announcements">
					<a href="javascript:void(0);" data-attr="#aut_announcement" id="announcementMenuIcon">
						<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
							 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
							 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">	<g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M13.969,25.966c-0.009-0.024-0.021-0.047-0.036-0.068
										c-0.014-0.021-0.03-0.043-0.049-0.062c-0.019-0.018-0.039-0.034-0.062-0.049c-0.021-0.015-0.045-0.027-0.069-0.037
										c-0.024-0.011-0.05-0.019-0.075-0.023c-0.052-0.011-0.104-0.01-0.155,0c-0.025,0.005-0.051,0.013-0.075,0.022
										c-0.024,0.011-0.048,0.023-0.07,0.038c-0.021,0.015-0.042,0.03-0.06,0.049c-0.019,0.019-0.035,0.038-0.05,0.06
										c-0.014,0.022-0.027,0.046-0.037,0.07s-0.018,0.05-0.022,0.075c-0.006,0.025-0.008,0.052-0.008,0.078
										c0,0.025,0.002,0.052,0.008,0.078c0.005,0.025,0.013,0.051,0.022,0.075s0.023,0.047,0.037,0.069
										c0.015,0.021,0.031,0.041,0.05,0.06s0.039,0.036,0.061,0.051c0.021,0.014,0.046,0.026,0.069,0.036
										c0.024,0.011,0.05,0.018,0.075,0.023c0.025,0.005,0.052,0.007,0.077,0.007c0.026,0,0.053-0.002,0.078-0.007
										c0.025-0.006,0.051-0.013,0.075-0.023c0.024-0.01,0.047-0.022,0.068-0.036c0.022-0.015,0.043-0.032,0.063-0.051
										c0.019-0.019,0.035-0.039,0.049-0.061c0.015-0.021,0.027-0.045,0.036-0.068c0.011-0.024,0.019-0.05,0.023-0.075
										C13.999,26.171,14,26.145,14,26.119c0-0.026-0.002-0.053-0.008-0.078C13.988,26.016,13.98,25.99,13.969,25.966z"/>
								</g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.545,23.871h-1.31c-0.221,0-0.4,0.18-0.4,0.4
										s0.18,0.4,0.4,0.4h1.31c0.221,0,0.399-0.18,0.399-0.4S39.766,23.871,39.545,23.871z"/>
								</g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M38.997,30.266c0.113,0,0.22-0.048,0.296-0.131
										c0.148-0.163,0.137-0.417-0.026-0.565l-1.705-1.553c-0.163-0.148-0.416-0.137-0.565,0.026c-0.148,0.163-0.137,0.417,0.026,0.565
										l1.706,1.553C38.801,30.229,38.897,30.266,38.997,30.266z"/>
								</g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.266,18.974c0.163-0.149,0.175-0.402,0.026-0.565
										s-0.401-0.175-0.564-0.026l-1.706,1.553c-0.163,0.148-0.175,0.402-0.026,0.565c0.077,0.084,0.183,0.131,0.297,0.131 
										c0.1,0,0.194-0.037,0.269-0.104L39.266,18.974z"/> 
								</g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M20.325,19.512c-0.021-0.001-0.042,0-0.063,0.002l-0.01,0.001
										h-5.44c-2.622,0-4.756,2.134-4.756,4.757c0,2.447,1.87,4.504,4.305,4.734l0.135,0.013l1.671,6.868
										c0.196,0.806,0.911,1.369,1.741,1.369h1.137c0.554,0,1.066-0.25,1.409-0.686c0.341-0.434,0.463-0.994,0.332-1.53l-1.462-6.012
										h0.928l0.01,0.001c0.021,0.002,0.042,0.003,0.063,0.002c1.458-0.081,3.388,0.236,4.771,0.63c3.269,0.93,5.943,2.769,7.661,5.724
										c0.149,0.257,0.414,0.414,0.71,0.414c0.075,0,0.149-0.011,0.223-0.03c0.368-0.099,0.613-0.419,0.613-0.8v-7.804l0.168-0.02
										c1.396-0.168,2.453-1.358,2.453-2.766v-0.217c0-1.407-1.058-2.599-2.453-2.766l-0.168-0.02v-7.804c0-0.381-0.245-0.701-0.613-0.8
										c-0.072-0.02-0.146-0.03-0.221-0.03h-0.007c-0.295,0-0.557,0.159-0.705,0.414c-1.718,2.955-4.393,4.794-7.661,5.724
										C23.717,19.273,21.778,19.595,20.325,19.512L20.325,19.512z M19.825,36.076c-0.189,0.24-0.474,0.379-0.78,0.379h-1.137
										c-0.459,0-0.855-0.312-0.964-0.758l-1.622-6.669H18.5l0.511,2.1h-0.526c-0.221,0-0.399,0.179-0.399,0.399
										c0,0.222,0.179,0.4,0.399,0.4h0.721l0.386,1.587h-0.429c-0.221,0-0.399,0.179-0.399,0.4c0,0.221,0.179,0.399,0.399,0.399h0.624
										l0.222,0.914C20.081,35.525,20.013,35.836,19.825,36.076L19.825,36.076z M18.835,28.228c-0.007-0.001-0.015-0.001-0.021-0.001
										H14.82c-0.008,0-0.017,0.001-0.025,0.001c-2.174-0.01-3.938-1.781-3.938-3.956c0-2.182,1.774-3.956,3.956-3.956h5.09v5.403
										h-3.865c-0.221,0-0.4,0.179-0.4,0.4c0,0.221,0.18,0.399,0.4,0.399h3.865v1.709H18.835L18.835,28.228z M36.124,24.163v0.217
										c0,0.943-0.668,1.76-1.592,1.946l-0.229,0.047V22.17l0.229,0.047C35.456,22.402,36.124,23.219,36.124,24.163L36.124,24.163z
										 M20.89,20.317c1.462-0.023,2.98-0.259,4.385-0.654c3.243-0.914,6.042-2.764,7.876-5.614l0.352-0.548v21.541l-0.352-0.548
										c-1.834-2.851-4.633-4.7-7.876-5.614c-1.404-0.396-2.923-0.631-4.385-0.654l-0.188-0.004V20.32L20.89,20.317z"/>
								</g>
							</g>
						</g>
						<g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
						</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_">
						</g>
						</svg>
				<span class="menu-name" data-translate="_authority_announcement">Authority Announcement </span> 
				</a>
			</li>-->
		<!-- 	<li id="feedback_popup" data-toggle="tooltip" title="Feedback & Suggestion">
					<a href="javascript:void(0);" id="feedback_data_attribute" data-attr="#">
						<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
								xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
								viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.408,22.852c-0.312-0.47-0.783-0.794-1.331-0.916
									c0.354-0.677,0.339-1.521-0.111-2.2c-0.32-0.484-0.804-0.797-1.33-0.915c0.094-0.18,0.163-0.372,0.205-0.576
									c0.115-0.566,0.002-1.144-0.317-1.625c-0.311-0.471-0.782-0.794-1.33-0.916c0.354-0.677,0.339-1.521-0.112-2.201
									c-0.658-0.994-2.003-1.268-2.999-0.609l-2.154,1.427c-1.148-0.582-2.369-0.995-3.636-1.23c-0.401-0.608-0.866-1.174-1.388-1.679
									l-0.891-0.864c-0.653-0.632-1.676-0.728-2.433-0.226c-0.897,0.594-1.143,1.806-0.549,2.702c0.023,0.035,0.046,0.071,0.069,0.106
									c-2.921,0.592-5.583,2.142-7.553,4.413c-2.138,2.465-3.315,5.621-3.315,8.888c0,0.627,0.043,1.254,0.127,1.865
									c0.653,4.747,3.815,8.838,8.252,10.677C20.258,39.653,22.004,40,23.801,40c2.847,0,5.571-0.872,7.88-2.521
									c2.259-1.613,3.949-3.841,4.887-6.439c0.088-0.242-0.038-0.51-0.28-0.597c-0.242-0.088-0.509,0.037-0.597,0.279
									c-0.874,2.421-2.448,4.495-4.552,5.998c-2.149,1.535-4.687,2.347-7.337,2.347c-1.371,0-2.709-0.216-3.99-0.643l3.795-2.514
									c0,0,0,0,0,0c0,0,0-0.001,0-0.001l3.154-2.089l0,0c0.283-0.188,0.477-0.474,0.544-0.807s0.002-0.673-0.186-0.956l-0.042-0.063
									l0.613-0.405c0.437-0.29,0.963-0.403,1.481-0.32c0.749,0.12,1.511-0.044,2.143-0.464l5.082-3.365
									c-0.035,0.44-0.092,0.88-0.171,1.311c-0.047,0.253,0.12,0.496,0.374,0.543c0.028,0.006,0.057,0.009,0.085,0.009
									c0.221,0,0.417-0.157,0.458-0.382c0.129-0.695,0.204-1.408,0.223-2.121l1.432-0.949c0.482-0.318,0.811-0.807,0.926-1.372
									C39.839,23.91,39.727,23.333,39.408,22.852L39.408,22.852z M29.024,14.919l-1.425,0.944l-0.281-0.757
									c-0.117-0.314-0.251-0.624-0.4-0.927C27.641,14.363,28.345,14.61,29.024,14.919L29.024,14.919z M14.252,18.153
									c1.894-2.184,4.473-3.65,7.294-4.159c0.453,1.097,0.561,2.322,0.291,3.49L20.7,22.397c-0.179-0.19-0.411-0.322-0.672-0.376
									c-0.333-0.067-0.672-0.002-0.956,0.187l-3.222,2.133c0,0,0,0,0,0.001l0,0l-4.646,3.076c-0.025-0.327-0.039-0.657-0.039-0.988
									C11.165,23.388,12.261,20.448,14.252,18.153L14.252,18.153z M26.393,32.827c-0.018,0.089-0.07,0.165-0.146,0.216l0,0l-2.771,1.834
									l-5.142-7.668c-0.144-0.214-0.433-0.271-0.647-0.128c-0.213,0.144-0.271,0.434-0.127,0.647l5.139,7.664l-3.955,2.619
									c-3.93-1.719-6.742-5.349-7.418-9.573l4.652-3.07l0.535,0.799c0.09,0.134,0.238,0.207,0.388,0.207c0.089,0,0.18-0.025,0.259-0.079
									c0.214-0.144,0.271-0.434,0.127-0.647l-0.532-0.793l2.832-1.869c0.075-0.05,0.166-0.067,0.254-0.049
									c0.089,0.018,0.166,0.069,0.216,0.145l6.286,9.491C26.393,32.647,26.411,32.738,26.393,32.827L26.393,32.827z M38.81,24.291
									c-0.066,0.322-0.252,0.6-0.527,0.781l-1.637,1.084c0,0-0.001,0.001-0.001,0.001l-5.844,3.87c-0.437,0.29-0.963,0.403-1.48,0.32
									c-0.75-0.12-1.511,0.044-2.144,0.463l-0.613,0.406l-5.148-7.773l1.331-5.749c0.343-1.48,0.162-3.04-0.491-4.399
									c-0.006-0.014-0.012-0.027-0.02-0.041c-0.125-0.257-0.268-0.506-0.427-0.746c-0.31-0.468-0.181-1.1,0.287-1.409
									c0.396-0.262,0.929-0.213,1.269,0.117l0.891,0.864c0.964,0.935,1.72,2.094,2.188,3.352l0.485,1.308
									c0.001,0.002,0.002,0.004,0.003,0.007s0.002,0.006,0.003,0.009c0.003,0.008,0.007,0.016,0.01,0.021
									c0.009,0.02,0.02,0.039,0.032,0.058c0.142,0.215,0.432,0.273,0.646,0.132l4.976-3.295c0.566-0.374,1.331-0.219,1.706,0.347
									c0.375,0.565,0.219,1.331-0.347,1.705l-0.432,0.287h0l-0.964,0.638c-0.001,0.001-0.002,0.002-0.003,0.003
									c-0.005,0.004-0.011,0.008-0.015,0.011c-0.199,0.146-0.25,0.425-0.112,0.633c0.142,0.215,0.431,0.273,0.646,0.132l0.964-0.639
									c0.274-0.182,0.602-0.245,0.924-0.18c0.322,0.065,0.6,0.252,0.781,0.526c0.182,0.274,0.246,0.603,0.18,0.925
									s-0.253,0.6-0.527,0.781l-1.396,0.925c-0.214,0.142-0.273,0.431-0.131,0.646c0.089,0.136,0.238,0.209,0.389,0.209
									c0.088,0,0.178-0.025,0.257-0.077l0.216-0.144l0.748-0.495c0.566-0.374,1.331-0.219,1.706,0.347
									c0.375,0.566,0.219,1.331-0.347,1.706l-0.697,0.462c-0.003,0.002-0.007,0.005-0.011,0.007l-0.688,0.455
									c-0.215,0.143-0.274,0.432-0.132,0.647c0.09,0.135,0.238,0.208,0.39,0.208c0.088,0,0.178-0.024,0.257-0.077l0.216-0.143
									c0,0,0-0.001,0-0.001l0.747-0.494c0.274-0.183,0.603-0.246,0.924-0.181c0.322,0.065,0.6,0.253,0.781,0.527
									C38.812,23.641,38.875,23.969,38.81,24.291z"/>
							</g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
							</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_">
							</g>
							</svg>
					<span class="menu-name" data-translate="_feedback_and_suggestion">Feedback & Suggestion</span> 
				</a>
			</li>-->
			
			<!-- Citizen Services Start -->
			<li>
				<a href="javascript:void(0);" title="Citizen Services">
				<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" width="50px" height="50px"
					 enable-background="new 0 0 50 50" xml:space="preserve">
						<g>
							<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M31.815,25.388c-1.259,3.026-2.474,2.121-3.601,6.075
								c-0.795-0.221-1.48,0.022-1.701,0.773l-0.287,1.038c-0.177,0.641,0.199,1.303,0.839,1.502l5.015,1.414
								c0.42,0.11,0.596-0.53,0.177-0.641l-5.015-1.414c-0.287-0.088-0.442-0.398-0.376-0.685c0.199-0.685,0.287-1.591,0.972-1.392
								l7.577,2.121c0.685,0.199,0.287,1.038,0.088,1.701c-0.265,0.972-1.458-0.243-1.635,0.464c-0.133,0.398,0.398,0.464,0.773,0.552
								c0.641,0.199,1.325-0.177,1.502-0.817l0.287-1.038c0.199-0.641-0.177-1.303-0.884-1.502l3.093-4.197l0.287-0.596l1.016-7.511
								l-0.265-1.811l-2.761-5.567c-0.773-1.591-3.203-0.619-2.651,1.06l1.348,4.175l0.353,1.06l-0.309,0.95l-0.265-0.044
								c-0.928-0.177-1.834,0.287-2.253,1.127L31.815,25.388z M32.257,26.029l1.458-3.534c0.353-0.707,0.994-0.884,1.701-0.751
								l-2.474,6.539c-0.155,0.42,0.464,0.663,0.619,0.243l2.629-6.936c0.596-1.811,0.619-1.016,0-2.872l-1.281-3.998
								c-0.309-0.906,1.016-1.436,1.414-0.574l2.739,5.567c0.199,0.464,0.287,0.95,0.221,1.458l-0.95,7.157
								c-0.022,0.221-0.11,0.442-0.221,0.641l-3.247,4.374l-6.009-1.701C29.915,27.907,30.976,28.901,32.257,26.029L32.257,26.029z"/>
							<g>
								<path fill="#855439" d="M25.563,27.691c-2.074,0-3.761-1.696-3.761-3.782c0-2.098,1.687-3.804,3.761-3.804
									s3.761,1.706,3.761,3.804C29.324,25.994,27.637,27.691,25.563,27.691z M25.563,20.821c-1.678,0-3.044,1.385-3.044,3.088
									c0,1.69,1.365,3.065,3.044,3.065c1.678,0,3.044-1.375,3.044-3.065C28.607,22.206,27.242,20.821,25.563,20.821z"/>
							</g>
							<g>
								<path fill="#855439" d="M18.649,26.145c-0.103,0-0.205-0.044-0.276-0.13c-0.127-0.153-0.105-0.379,0.047-0.505l1.103-0.914
									c-0.04-0.205-0.04-0.407-0.04-0.644c0-0.194,0.028-0.36,0.053-0.506c0.007-0.043,0.015-0.084,0.02-0.125l-1.437-1.118
									c-0.218-0.215-0.329-0.447-0.329-0.65c0.001-0.111,0.034-0.215,0.096-0.299l1.486-2.689c0.016-0.03,0.037-0.057,0.061-0.08
									c0.106-0.106,0.428-0.428,0.917-0.235l1.656,0.699l0.068-0.049c0.304-0.219,0.594-0.427,0.931-0.574l0.259-1.889
									c-0.003-0.339,0.435-0.619,0.731-0.619h3.027c0.223,0,0.458,0.125,0.584,0.311c0.09,0.133,0.121,0.291,0.091,0.445l0.27,1.773
									c0.344,0.176,0.696,0.368,1.011,0.6l1.708-0.695c0.363-0.145,0.668-0.019,0.832,0.146c0.023,0.023,0.043,0.05,0.059,0.078
									l1.524,2.739c0.151,0.346,0.093,0.651-0.148,0.892l-1.438,1.18c0.041,0.214,0.041,0.428,0.041,0.665
									c0,0.196-0.029,0.356-0.054,0.497c-0.006,0.035-0.013,0.069-0.018,0.103l0.761,0.543c0.161,0.115,0.198,0.339,0.083,0.5
									c-0.115,0.161-0.339,0.198-0.5,0.083l-0.928-0.663c-0.095-0.067-0.15-0.176-0.15-0.292c0-0.135,0.021-0.265,0.046-0.403
									c0.02-0.111,0.043-0.23,0.043-0.37c0-0.284,0-0.489-0.067-0.673c-0.053-0.143-0.008-0.304,0.11-0.4l1.591-1.303l-1.478-2.671
									c-0.009,0.001-0.022,0.005-0.04,0.012l-1.897,0.772c-0.122,0.05-0.262,0.028-0.364-0.055c-0.347-0.286-0.79-0.517-1.214-0.73
									c-0.104-0.052-0.176-0.151-0.194-0.267l-0.309-2.032c-0.004-0.022-0.005-0.044-0.004-0.065l-2.977-0.006
									c0.006,0.002-0.012,0.016-0.027,0.029l-0.28,2.069c-0.019,0.135-0.113,0.249-0.242,0.292c-0.329,0.11-0.618,0.318-0.952,0.558
									l-0.237,0.169c-0.102,0.071-0.232,0.084-0.345,0.037l-1.834-0.773c-0.023-0.005-0.048-0.003-0.103,0.046l-1.448,2.619
									c0.014,0.025,0.036,0.055,0.067,0.086l1.557,1.207c0.088,0.068,0.138,0.172,0.138,0.283c0,0.134-0.021,0.268-0.045,0.41
									c-0.02,0.118-0.043,0.243-0.043,0.385c0,0.291,0,0.467,0.067,0.65c0.051,0.142,0.008,0.302-0.109,0.399l-1.281,1.061
									C18.81,26.118,18.729,26.145,18.649,26.145z M23.978,16.486l-0.007,0.053C23.975,16.525,23.978,16.507,23.978,16.486z"/>
							</g>
							<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M18.185,25.388c1.259,3.026,2.474,2.121,3.601,6.075
								c0.795-0.221,1.48,0.022,1.701,0.773l0.287,1.038c0.177,0.641-0.199,1.303-0.839,1.502l-5.015,1.414
								c-0.42,0.11-0.596-0.53-0.177-0.641l5.015-1.414c0.287-0.088,0.442-0.398,0.376-0.685c-0.199-0.685-0.287-1.591-0.972-1.392
								l-7.577,2.121c-0.685,0.199-0.287,1.038-0.088,1.701c0.265,0.972,1.458-0.243,1.635,0.464c0.133,0.398-0.398,0.464-0.773,0.552
								c-0.641,0.199-1.325-0.177-1.502-0.817l-0.287-1.038c-0.177-0.641,0.177-1.303,0.884-1.502l-3.093-4.197l-0.287-0.596
								l-1.016-7.511l0.265-1.811l2.761-5.567c0.773-1.591,3.203-0.619,2.651,1.06l-1.348,4.175l-0.353,1.06l0.331,0.95l0.243-0.044
								c0.928-0.177,1.834,0.287,2.253,1.127L18.185,25.388z M17.743,26.029l-1.458-3.534c-0.353-0.707-0.994-0.884-1.701-0.751
								l2.474,6.539c0.155,0.42-0.464,0.663-0.619,0.243l-2.629-6.936c-0.596-1.811-0.619-1.016,0-2.872l1.281-3.998
								c0.309-0.906-1.016-1.436-1.414-0.574l-2.739,5.567c-0.199,0.464-0.287,0.95-0.221,1.458l0.95,7.157
								c0.022,0.221,0.11,0.442,0.221,0.641l3.247,4.374l6.009-1.701C20.085,27.907,19.024,28.901,17.743,26.029L17.743,26.029z"/>
						</g>
					
				</svg>
				Citizen Services
				<i class="fa fa-angle-down"></i>
				</a>
				<ul class="sub-item">
					<li id="event_popup" data-toggle="tooltip" title="Events">
				<a href="javascript:void(0);" data-attr="#events" id="eventMenuIcon">
					<svg xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <g id="Layer_1"> </g> <g id="Layer_1_1_"> </g> <g id="Layer_1_2_"> </g> <g id="Layer_1_3_"> </g> <g id="Layer_1_4_"> </g> <g id="Layer_1_5_"> <g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M36.791,12.21h-1.938v-1.324c0-0.311-0.253-0.563-0.563-0.563     s-0.563,0.252-0.563,0.563v1.324H31.34v-1.324c0-0.311-0.252-0.563-0.563-0.563c-0.312,0-0.563,0.252-0.563,0.563v1.324H19.786     v-1.324c0-0.311-0.252-0.563-0.563-0.563s-0.563,0.252-0.563,0.563v1.324h-2.387v-1.324c0-0.311-0.252-0.563-0.563-0.563     c-0.311,0-0.563,0.252-0.563,0.563v1.324H13.21c-1.401,0-2.542,1.14-2.542,2.542v22.384c0,1.401,1.141,2.541,2.542,2.541h23.581     c1.401,0,2.541-1.14,2.541-2.541V14.752C39.332,13.351,38.192,12.21,36.791,12.21L36.791,12.21z M38.207,37.136     c0,0.781-0.635,1.416-1.416,1.416H13.21c-0.781,0-1.417-0.635-1.417-1.416V18.929h26.414V37.136L38.207,37.136z M11.793,14.752     c0-0.781,0.636-1.417,1.417-1.417h1.938v1.324c0,0.311,0.252,0.563,0.563,0.563c0.311,0,0.563-0.252,0.563-0.563v-1.324h2.387     v1.324c0,0.311,0.252,0.563,0.563,0.563c0.312,0,0.563-0.252,0.563-0.563v-1.324h10.428v1.324c0,0.311,0.252,0.563,0.563,0.563     c0.311,0,0.563-0.252,0.563-0.563v-1.324h2.387v1.324c0,0.311,0.252,0.563,0.563,0.563c0.312,0,0.563-0.252,0.563-0.563v-1.324     h1.938c0.781,0,1.416,0.636,1.416,1.417v3.052H11.793V14.752z"/> </g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M25,35.449c3.699,0,6.709-3.01,6.709-6.709     S28.7,22.031,25,22.031c-3.699,0-6.709,3.01-6.709,6.709S21.302,35.449,25,35.449L25,35.449z M25,23.157     c3.079,0,5.584,2.504,5.584,5.583S28.079,34.324,25,34.324c-3.078,0-5.583-2.505-5.583-5.584S21.922,23.157,25,23.157z"/> </g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M23.912,30.72c0.105,0.105,0.249,0.164,0.398,0.164     s0.292-0.059,0.397-0.164l3.163-3.162c0.22-0.221,0.22-0.576,0-0.796s-0.576-0.22-0.796,0l-2.765,2.764l-1.385-1.385     c-0.22-0.22-0.576-0.22-0.796,0c-0.22,0.221-0.22,0.576,0,0.796L23.912,30.72z"/> </g> </g> </g> <g id="Layer_1_6_"> </g> <g id="Layer_1_7_"> </g> <g id="Layer_1_8_"> </g> <g id="Layer_1_9_"> </g> <g id="Layer_1_10_"> </g> <g id="Layer_1_11_"> </g> <g id="Layer_1_12_"> </g> <g id="Layer_1_13_"> </g> <g id="Layer_1_14_"> </g> <g id="Layer_1_15_"> </g> <g id="Layer_1_16_"> </g> <g id="Layer_1_17_"> </g> <g id="Layer_1_18_"> </g> <g id="Layer_1_19_"> </g> <g id="Layer_1_20_"> </g> <g id="Layer_1_21_"> </g> <g id="Layer_1_22_"> </g> <g id="Layer_1_23_"> </g> <g id="Layer_1_24_"> </g> <g id="Layer_1_25_"> </g> <g id="Layer_1_26_"> </g> <g id="Layer_1_27_"> </g> <g id="Layer_1_28_"> </g> <g id="Layer_1_29_"> </g> <g id="Layer_1_30_"> </g> </svg>
<!-- 					<span class="menu-name" data-translate="_events">Events</span> -->
				Events
				</a>
			</li>
			
			<li id="announcement_list" data-toggle="tooltip" title="City Announcements">
					<a href="javascript:void(0);" data-attr="#aut_announcement" id="announcementMenuIcon">
						<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
							 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
							 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">	<g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M13.969,25.966c-0.009-0.024-0.021-0.047-0.036-0.068
										c-0.014-0.021-0.03-0.043-0.049-0.062c-0.019-0.018-0.039-0.034-0.062-0.049c-0.021-0.015-0.045-0.027-0.069-0.037
										c-0.024-0.011-0.05-0.019-0.075-0.023c-0.052-0.011-0.104-0.01-0.155,0c-0.025,0.005-0.051,0.013-0.075,0.022
										c-0.024,0.011-0.048,0.023-0.07,0.038c-0.021,0.015-0.042,0.03-0.06,0.049c-0.019,0.019-0.035,0.038-0.05,0.06
										c-0.014,0.022-0.027,0.046-0.037,0.07s-0.018,0.05-0.022,0.075c-0.006,0.025-0.008,0.052-0.008,0.078
										c0,0.025,0.002,0.052,0.008,0.078c0.005,0.025,0.013,0.051,0.022,0.075s0.023,0.047,0.037,0.069
										c0.015,0.021,0.031,0.041,0.05,0.06s0.039,0.036,0.061,0.051c0.021,0.014,0.046,0.026,0.069,0.036
										c0.024,0.011,0.05,0.018,0.075,0.023c0.025,0.005,0.052,0.007,0.077,0.007c0.026,0,0.053-0.002,0.078-0.007
										c0.025-0.006,0.051-0.013,0.075-0.023c0.024-0.01,0.047-0.022,0.068-0.036c0.022-0.015,0.043-0.032,0.063-0.051
										c0.019-0.019,0.035-0.039,0.049-0.061c0.015-0.021,0.027-0.045,0.036-0.068c0.011-0.024,0.019-0.05,0.023-0.075
										C13.999,26.171,14,26.145,14,26.119c0-0.026-0.002-0.053-0.008-0.078C13.988,26.016,13.98,25.99,13.969,25.966z"/>
								</g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.545,23.871h-1.31c-0.221,0-0.4,0.18-0.4,0.4
										s0.18,0.4,0.4,0.4h1.31c0.221,0,0.399-0.18,0.399-0.4S39.766,23.871,39.545,23.871z"/>
								</g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M38.997,30.266c0.113,0,0.22-0.048,0.296-0.131
										c0.148-0.163,0.137-0.417-0.026-0.565l-1.705-1.553c-0.163-0.148-0.416-0.137-0.565,0.026c-0.148,0.163-0.137,0.417,0.026,0.565
										l1.706,1.553C38.801,30.229,38.897,30.266,38.997,30.266z"/>
								</g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.266,18.974c0.163-0.149,0.175-0.402,0.026-0.565
										s-0.401-0.175-0.564-0.026l-1.706,1.553c-0.163,0.148-0.175,0.402-0.026,0.565c0.077,0.084,0.183,0.131,0.297,0.131
 										c0.1,0,0.194-0.037,0.269-0.104L39.266,18.974z"/> 
								</g>
								<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M20.325,19.512c-0.021-0.001-0.042,0-0.063,0.002l-0.01,0.001
										h-5.44c-2.622,0-4.756,2.134-4.756,4.757c0,2.447,1.87,4.504,4.305,4.734l0.135,0.013l1.671,6.868
										c0.196,0.806,0.911,1.369,1.741,1.369h1.137c0.554,0,1.066-0.25,1.409-0.686c0.341-0.434,0.463-0.994,0.332-1.53l-1.462-6.012
										h0.928l0.01,0.001c0.021,0.002,0.042,0.003,0.063,0.002c1.458-0.081,3.388,0.236,4.771,0.63c3.269,0.93,5.943,2.769,7.661,5.724
										c0.149,0.257,0.414,0.414,0.71,0.414c0.075,0,0.149-0.011,0.223-0.03c0.368-0.099,0.613-0.419,0.613-0.8v-7.804l0.168-0.02
										c1.396-0.168,2.453-1.358,2.453-2.766v-0.217c0-1.407-1.058-2.599-2.453-2.766l-0.168-0.02v-7.804c0-0.381-0.245-0.701-0.613-0.8
										c-0.072-0.02-0.146-0.03-0.221-0.03h-0.007c-0.295,0-0.557,0.159-0.705,0.414c-1.718,2.955-4.393,4.794-7.661,5.724
										C23.717,19.273,21.778,19.595,20.325,19.512L20.325,19.512z M19.825,36.076c-0.189,0.24-0.474,0.379-0.78,0.379h-1.137
										c-0.459,0-0.855-0.312-0.964-0.758l-1.622-6.669H18.5l0.511,2.1h-0.526c-0.221,0-0.399,0.179-0.399,0.399
										c0,0.222,0.179,0.4,0.399,0.4h0.721l0.386,1.587h-0.429c-0.221,0-0.399,0.179-0.399,0.4c0,0.221,0.179,0.399,0.399,0.399h0.624
										l0.222,0.914C20.081,35.525,20.013,35.836,19.825,36.076L19.825,36.076z M18.835,28.228c-0.007-0.001-0.015-0.001-0.021-0.001
										H14.82c-0.008,0-0.017,0.001-0.025,0.001c-2.174-0.01-3.938-1.781-3.938-3.956c0-2.182,1.774-3.956,3.956-3.956h5.09v5.403
										h-3.865c-0.221,0-0.4,0.179-0.4,0.4c0,0.221,0.18,0.399,0.4,0.399h3.865v1.709H18.835L18.835,28.228z M36.124,24.163v0.217
										c0,0.943-0.668,1.76-1.592,1.946l-0.229,0.047V22.17l0.229,0.047C35.456,22.402,36.124,23.219,36.124,24.163L36.124,24.163z
										 M20.89,20.317c1.462-0.023,2.98-0.259,4.385-0.654c3.243-0.914,6.042-2.764,7.876-5.614l0.352-0.548v21.541l-0.352-0.548
										c-1.834-2.851-4.633-4.7-7.876-5.614c-1.404-0.396-2.923-0.631-4.385-0.654l-0.188-0.004V20.32L20.89,20.317z"/>
								</g>
							</g>
						</g>
						<g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
						</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_">
						</g>
						</svg>
						

City Announcements
				</a>
			</li>
			
			<li id="feedback_popup" data-toggle="tooltip" title="Feedback & Suggestion">
					<a href="javascript:void(0);" id="feedback_data_attribute" data-attr="#">
						<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
								xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
								viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M39.408,22.852c-0.312-0.47-0.783-0.794-1.331-0.916
									c0.354-0.677,0.339-1.521-0.111-2.2c-0.32-0.484-0.804-0.797-1.33-0.915c0.094-0.18,0.163-0.372,0.205-0.576
									c0.115-0.566,0.002-1.144-0.317-1.625c-0.311-0.471-0.782-0.794-1.33-0.916c0.354-0.677,0.339-1.521-0.112-2.201
									c-0.658-0.994-2.003-1.268-2.999-0.609l-2.154,1.427c-1.148-0.582-2.369-0.995-3.636-1.23c-0.401-0.608-0.866-1.174-1.388-1.679
									l-0.891-0.864c-0.653-0.632-1.676-0.728-2.433-0.226c-0.897,0.594-1.143,1.806-0.549,2.702c0.023,0.035,0.046,0.071,0.069,0.106
									c-2.921,0.592-5.583,2.142-7.553,4.413c-2.138,2.465-3.315,5.621-3.315,8.888c0,0.627,0.043,1.254,0.127,1.865
									c0.653,4.747,3.815,8.838,8.252,10.677C20.258,39.653,22.004,40,23.801,40c2.847,0,5.571-0.872,7.88-2.521
									c2.259-1.613,3.949-3.841,4.887-6.439c0.088-0.242-0.038-0.51-0.28-0.597c-0.242-0.088-0.509,0.037-0.597,0.279
									c-0.874,2.421-2.448,4.495-4.552,5.998c-2.149,1.535-4.687,2.347-7.337,2.347c-1.371,0-2.709-0.216-3.99-0.643l3.795-2.514
									c0,0,0,0,0,0c0,0,0-0.001,0-0.001l3.154-2.089l0,0c0.283-0.188,0.477-0.474,0.544-0.807s0.002-0.673-0.186-0.956l-0.042-0.063
									l0.613-0.405c0.437-0.29,0.963-0.403,1.481-0.32c0.749,0.12,1.511-0.044,2.143-0.464l5.082-3.365
									c-0.035,0.44-0.092,0.88-0.171,1.311c-0.047,0.253,0.12,0.496,0.374,0.543c0.028,0.006,0.057,0.009,0.085,0.009
									c0.221,0,0.417-0.157,0.458-0.382c0.129-0.695,0.204-1.408,0.223-2.121l1.432-0.949c0.482-0.318,0.811-0.807,0.926-1.372
									C39.839,23.91,39.727,23.333,39.408,22.852L39.408,22.852z M29.024,14.919l-1.425,0.944l-0.281-0.757
									c-0.117-0.314-0.251-0.624-0.4-0.927C27.641,14.363,28.345,14.61,29.024,14.919L29.024,14.919z M14.252,18.153
									c1.894-2.184,4.473-3.65,7.294-4.159c0.453,1.097,0.561,2.322,0.291,3.49L20.7,22.397c-0.179-0.19-0.411-0.322-0.672-0.376
									c-0.333-0.067-0.672-0.002-0.956,0.187l-3.222,2.133c0,0,0,0,0,0.001l0,0l-4.646,3.076c-0.025-0.327-0.039-0.657-0.039-0.988
									C11.165,23.388,12.261,20.448,14.252,18.153L14.252,18.153z M26.393,32.827c-0.018,0.089-0.07,0.165-0.146,0.216l0,0l-2.771,1.834
									l-5.142-7.668c-0.144-0.214-0.433-0.271-0.647-0.128c-0.213,0.144-0.271,0.434-0.127,0.647l5.139,7.664l-3.955,2.619
									c-3.93-1.719-6.742-5.349-7.418-9.573l4.652-3.07l0.535,0.799c0.09,0.134,0.238,0.207,0.388,0.207c0.089,0,0.18-0.025,0.259-0.079
									c0.214-0.144,0.271-0.434,0.127-0.647l-0.532-0.793l2.832-1.869c0.075-0.05,0.166-0.067,0.254-0.049
									c0.089,0.018,0.166,0.069,0.216,0.145l6.286,9.491C26.393,32.647,26.411,32.738,26.393,32.827L26.393,32.827z M38.81,24.291
									c-0.066,0.322-0.252,0.6-0.527,0.781l-1.637,1.084c0,0-0.001,0.001-0.001,0.001l-5.844,3.87c-0.437,0.29-0.963,0.403-1.48,0.32
									c-0.75-0.12-1.511,0.044-2.144,0.463l-0.613,0.406l-5.148-7.773l1.331-5.749c0.343-1.48,0.162-3.04-0.491-4.399
									c-0.006-0.014-0.012-0.027-0.02-0.041c-0.125-0.257-0.268-0.506-0.427-0.746c-0.31-0.468-0.181-1.1,0.287-1.409
									c0.396-0.262,0.929-0.213,1.269,0.117l0.891,0.864c0.964,0.935,1.72,2.094,2.188,3.352l0.485,1.308
									c0.001,0.002,0.002,0.004,0.003,0.007s0.002,0.006,0.003,0.009c0.003,0.008,0.007,0.016,0.01,0.021
									c0.009,0.02,0.02,0.039,0.032,0.058c0.142,0.215,0.432,0.273,0.646,0.132l4.976-3.295c0.566-0.374,1.331-0.219,1.706,0.347
									c0.375,0.565,0.219,1.331-0.347,1.705l-0.432,0.287h0l-0.964,0.638c-0.001,0.001-0.002,0.002-0.003,0.003
									c-0.005,0.004-0.011,0.008-0.015,0.011c-0.199,0.146-0.25,0.425-0.112,0.633c0.142,0.215,0.431,0.273,0.646,0.132l0.964-0.639
									c0.274-0.182,0.602-0.245,0.924-0.18c0.322,0.065,0.6,0.252,0.781,0.526c0.182,0.274,0.246,0.603,0.18,0.925
									s-0.253,0.6-0.527,0.781l-1.396,0.925c-0.214,0.142-0.273,0.431-0.131,0.646c0.089,0.136,0.238,0.209,0.389,0.209
									c0.088,0,0.178-0.025,0.257-0.077l0.216-0.144l0.748-0.495c0.566-0.374,1.331-0.219,1.706,0.347
									c0.375,0.566,0.219,1.331-0.347,1.706l-0.697,0.462c-0.003,0.002-0.007,0.005-0.011,0.007l-0.688,0.455
									c-0.215,0.143-0.274,0.432-0.132,0.647c0.09,0.135,0.238,0.208,0.39,0.208c0.088,0,0.178-0.024,0.257-0.077l0.216-0.143
									c0,0,0-0.001,0-0.001l0.747-0.494c0.274-0.183,0.603-0.246,0.924-0.181c0.322,0.065,0.6,0.253,0.781,0.527
									C38.812,23.641,38.875,23.969,38.81,24.291z"/>
							</g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
							</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_">
							</g>
							</svg>
							Feedback & Suggestion
<!-- 					<span class="menu-name" data-translate="_feedback_and_suggestion">Feedback & Suggestion</span> -->
				</a>
			</li>
				</ul>
			</li>
			
			<!-- Advance tool start -->
			
			<li>
				<a href="javascript:void(0);" title="Advance Tools">
				<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" width="50px" height="50px"
	 enable-background="new 0 0 50 50" xml:space="preserve">
		<g>
			<path fill="#855439" d="M30.467,15.644c0.073,0.219-0.024,0.462-0.243,0.559c-0.194,0.073-0.437-0.024-0.535-0.243
				c-0.049-0.146-0.51-0.146-0.899-0.146h-0.292l-1.142-0.049c-0.122,0-0.219-0.049-0.292-0.146
				c-0.073-0.073-0.122-0.146-0.17-0.194L26.7,15.23l-0.34-0.365c-0.097-0.073-0.194-0.17-0.292-0.267l-0.024-0.024
				c-0.049,0-0.073-0.049-0.097-0.073c-0.073-0.073-0.122-0.194-0.122-0.292l-0.024-1.094V12.8c0-0.389,0-0.826-0.146-0.899
				l-2.041-0.851c-0.17-0.073-0.486,0.267-0.753,0.535c-0.073,0.073-0.122,0.122-0.219,0.219l-0.826,0.753
				c-0.097,0.097-0.194,0.122-0.316,0.122c-0.17-0.024-0.34-0.024-0.51-0.049c-0.073,0-0.17,0-0.243,0c-0.097,0-0.17,0-0.267,0
				c-0.146,0-0.316,0.024-0.462,0.049l0,0h-0.073c-0.097,0-0.219-0.049-0.292-0.122l-0.826-0.778l-0.219-0.194
				c-0.267-0.292-0.583-0.608-0.753-0.535l-2.041,0.826c-0.146,0.073-0.146,0.535-0.146,0.899c0,0.122,0,0.219,0,0.316l-0.049,1.118
				c0,0.122-0.049,0.243-0.146,0.316c-0.073,0.049-0.146,0.122-0.219,0.194c-0.146,0.146-0.292,0.267-0.437,0.437
				c-0.097,0.073-0.194,0.194-0.292,0.292c-0.024,0.049-0.073,0.097-0.122,0.146c-0.097,0.122-0.219,0.17-0.365,0.146l-1.069,0.049
				h-0.316c-0.365,0-0.826,0-0.899,0.146l-0.851,2.041c-0.073,0.146,0.267,0.486,0.535,0.753l0.219,0.194l0.753,0.826
				c0.097,0.097,0.122,0.219,0.122,0.34c-0.024,0.243-0.024,0.462-0.049,0.705c0,0.097,0,0.194,0,0.292
				c0.024,0.17,0.024,0.365,0.049,0.535c0,0.122-0.049,0.219-0.122,0.316l-0.778,0.826l-0.194,0.219
				c-0.292,0.267-0.608,0.583-0.535,0.729l0.826,2.041c0.073,0.17,0.535,0.17,0.899,0.17c0.486,0,0.972,0.024,1.434,0.024
				c0.122,0,0.219,0.049,0.292,0.146c0.073,0.073,0.146,0.146,0.219,0.219l0.17,0.194c0.243,0.243,0.462,0.462,0.705,0.68
				c0.097,0.073,0.17,0.194,0.17,0.316l0.024,1.118v0.292c0,0.389,0,0.851,0.146,0.923c0.219,0.073,0.316,0.316,0.219,0.535
				c-0.073,0.219-0.316,0.316-0.535,0.219c-0.656-0.267-0.656-1.045-0.656-1.677v-0.267l-0.024-0.948
				c-0.34-0.292-0.632-0.583-0.923-0.923c-0.413-0.024-0.826-0.024-1.239-0.024c-0.632,0-1.385,0-1.652-0.68l-0.851-2.041
				c-0.267-0.656,0.267-1.191,0.729-1.652l0.194-0.194l0.632-0.68c0-0.122-0.024-0.267-0.024-0.365c0-0.122,0-0.243,0-0.34
				c0-0.194,0.024-0.413,0.024-0.608l-0.632-0.68l-0.194-0.194c-0.462-0.462-0.996-0.996-0.705-1.652l0.851-2.041
				c0.267-0.656,1.021-0.656,1.652-0.656h0.292l0.948-0.024c0.267-0.316,0.51-0.559,0.802-0.851l0.122-0.073l0.024-0.948v-0.292
				c0-0.632,0-1.385,0.656-1.652l2.041-0.851c0.68-0.267,1.215,0.267,1.652,0.729l0.194,0.194l0.705,0.632l0.365-0.024
				c0.097,0,0.194,0,0.292,0c0.219,0,0.413,0.024,0.656,0.024l0.68-0.632c0.024-0.049,0.122-0.122,0.194-0.194
				c0.437-0.437,0.972-0.996,1.652-0.705l2.041,0.851c0.656,0.267,0.656,1.021,0.656,1.652v0.292l0.024,0.923
				c0.097,0.097,0.194,0.17,0.292,0.267l0,0c0.049,0.073,0.122,0.122,0.194,0.194l0.073,0.073c0.024,0.024,0.073,0.073,0.122,0.122
				c0.049,0.097,0.17,0.194,0.243,0.292l0.948,0.024h0.267C29.422,14.987,30.175,14.987,30.467,15.644L30.467,15.644z
				 M16.154,18.292l1.701,2.989c0.073,0.097,0.17,0.17,0.267,0.194l1.604,0.413l3.718,3.694l0.608-0.583l-3.815-3.815
				c-0.049-0.049-0.122-0.097-0.194-0.097l-1.531-0.389l-1.458-2.552l1.264-1.239l2.527,1.458l0.389,1.531
				c0.024,0.073,0.073,0.122,0.122,0.194l3.791,3.791l0.608-0.608l-3.718-3.718l-0.389-1.58c-0.024-0.122-0.097-0.219-0.194-0.267
				l-3.013-1.701c-0.146-0.097-0.365-0.073-0.51,0.049l-1.701,1.725C16.081,17.904,16.057,18.122,16.154,18.292L16.154,18.292z
				 M32.168,22.594l-9.404,9.404l-0.608-0.608l9.404-9.38L32.168,22.594z M21.111,32.338c-0.073-0.122-0.194-0.219-0.365-0.219
				h-2.552c-0.146,0-0.292,0.097-0.365,0.219l-1.288,2.138c-0.073,0.122-0.073,0.292,0,0.437l1.288,2.138
				c0.073,0.122,0.219,0.194,0.365,0.194h2.552c0.17,0,0.292-0.073,0.365-0.194l1.288-2.138c0.097-0.146,0.097-0.316,0-0.437
				L21.111,32.338z M20.504,36.396h-2.066l-1.021-1.701l1.021-1.701h2.066l1.045,1.701L20.504,36.396z M34.841,24.44
				c2.649,0,4.812-1.968,5.103-4.52v-1.166c-0.024-0.243-0.073-0.462-0.122-0.68c-0.049-0.219-0.292-0.365-0.51-0.316
				c-0.073,0.024-0.146,0.073-0.219,0.122l-2.649,2.649l-2.114-0.705l-0.705-2.114l2.673-2.649c0.17-0.17,0.17-0.437,0-0.608
				c-0.073-0.049-0.122-0.097-0.219-0.122c-2.722-0.68-5.516,0.972-6.197,3.718c-0.097,0.413-0.17,0.826-0.146,1.264
				c0,0.34,0.024,0.68,0.097,0.996l-9.356,9.356c-0.34-0.073-0.68-0.097-0.996-0.097c-2.843,0-5.127,2.284-5.127,5.127
				c0,2.722,2.114,4.957,4.812,5.103h0.608c2.697-0.146,4.836-2.381,4.836-5.103c0-0.34-0.049-0.68-0.122-0.996l2.236-2.26
				l0.996,0.996c0.17,0.17,0.437,0.17,0.608,0l0.194-0.219c0.194-0.194,0.51-0.194,0.68,0c0.194,0.194,0.194,0.486,0,0.68
				l-0.194,0.219c-0.17,0.17-0.17,0.437,0,0.608l5.079,5.079c0.583,0.583,1.312,0.923,2.09,0.996h0.729
				c0.753-0.073,1.482-0.389,2.066-0.972c0.535-0.535,0.851-1.191,0.972-1.895v-1.094c-0.097-0.705-0.437-1.361-0.948-1.895
				c-0.024,0-0.024,0-0.024,0l-5.103-5.103c-0.17-0.17-0.437-0.17-0.608,0l-0.194,0.219c-0.194,0.17-0.51,0.17-0.68,0
				c-0.194-0.194-0.194-0.51,0-0.68l0,0l0.194-0.219c0.17-0.17,0.17-0.437,0-0.608l-0.972-0.972l2.236-2.236
				C34.185,24.392,34.525,24.44,34.841,24.44L34.841,24.44z M36.542,38.972c-0.316,0-0.632-0.073-0.923-0.17l3.329-3.354
				c0.51,1.361-0.17,2.843-1.507,3.354C37.15,38.899,36.834,38.972,36.542,38.972L36.542,38.972z M31.682,27.867
				c-0.462,0.559-0.389,1.409,0.17,1.871c0.51,0.413,1.215,0.413,1.725,0l4.787,4.787c0.049,0.073,0.097,0.122,0.146,0.17
				l-3.645,3.645c-0.073-0.024-0.122-0.073-0.17-0.146l-4.787-4.787c0.462-0.559,0.389-1.409-0.17-1.871
				c-0.51-0.413-1.215-0.413-1.725,0l-0.68-0.68l3.669-3.669L31.682,27.867z M33.407,23.566l-9.672,9.696
				c-0.122,0.097-0.17,0.243-0.122,0.389c0.583,2.309-0.802,4.641-3.11,5.225c-2.309,0.608-4.641-0.802-5.225-3.086
				c-0.583-2.309,0.802-4.641,3.11-5.249c0.68-0.17,1.409-0.17,2.114,0c0.146,0.049,0.292,0,0.413-0.097l9.696-9.696
				c0.097-0.097,0.146-0.267,0.097-0.413c-0.583-2.26,0.802-4.569,3.062-5.152c0.437-0.122,0.875-0.17,1.312-0.146l-2.236,2.26
				c-0.122,0.122-0.17,0.292-0.122,0.437l0.875,2.576c0.024,0.122,0.146,0.219,0.267,0.267l2.552,0.851
				c0.17,0.049,0.34,0,0.437-0.097l2.26-2.26c0,0.073,0,0.17,0,0.243c0.024,2.357-1.871,4.253-4.228,4.277
				c-0.365,0-0.729-0.049-1.069-0.146C33.675,23.42,33.529,23.468,33.407,23.566L33.407,23.566L33.407,23.566z M36.445,35.667
				l-0.608,0.608l-4.277-4.277l0.608-0.608L36.445,35.667z M20.018,12.679L20.018,12.679L20.018,12.679z M20.722,16.786
				c-0.243,0-0.413-0.194-0.413-0.413c0-0.243,0.17-0.413,0.413-0.413c1.361,0,2.576,0.535,3.475,1.434
				c0.875,0.899,1.434,2.114,1.434,3.475c0,0.219-0.194,0.413-0.413,0.413c-0.243,0-0.413-0.194-0.413-0.413
				c0-1.142-0.462-2.163-1.191-2.892C22.861,17.247,21.84,16.786,20.722,16.786L20.722,16.786z M20.722,24.951
				c0.219,0,0.413,0.17,0.413,0.413c0,0.219-0.194,0.413-0.413,0.413c-1.361,0-2.576-0.559-3.475-1.434
				c-0.899-0.899-1.434-2.114-1.434-3.475c0-0.243,0.17-0.413,0.413-0.413c0.219,0,0.413,0.17,0.413,0.413
				c0,1.118,0.462,2.138,1.191,2.867C18.56,24.489,19.58,24.951,20.722,24.951L20.722,24.951z"/>
		</g>
	
</svg>
Advance Tools
				<i class="fa fa-angle-down"></i>
				</a>
				<ul class="sub-item">
					<li id="addData_popup" data-toggle="tooltip">
						<a href="#" id="add_data_attribute" Title="Add Data">
						<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
								xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
								viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">	<g>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M33.125,37.5c-3.102,0-5.625-2.523-5.625-5.625
										s2.523-5.625,5.625-5.625c3.102,0,5.625,2.523,5.625,5.625S36.227,37.5,33.125,37.5L33.125,37.5z M20.64,11.25h-8.154
										C11.113,11.258,10,12.376,10,13.75v17.5c0,1.379,1.121,2.5,2.5,2.5h14.017c0.819,2.881,3.468,5,6.608,5
										c3.791,0,6.875-3.084,6.875-6.875c0-2.13-0.974-4.037-2.5-5.299V16.25c0-1.379-1.121-2.5-2.5-2.5H23.384l-2.317-2.316
										C20.953,11.319,20.8,11.254,20.64,11.25L20.64,11.25z M12.5,32.5h13.782c-0.019-0.206-0.032-0.414-0.032-0.625
										c0-3.791,3.084-6.875,6.875-6.875c1.125,0,2.186,0.277,3.125,0.759V16.25c0-0.689-0.561-1.25-1.25-1.25H23.125
										c-0.166,0-0.325-0.066-0.442-0.184L20.366,12.5H12.5c-0.689,0-1.25,0.561-1.25,1.25v17.5C11.25,31.939,11.811,32.5,12.5,32.5z"/>
									<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M35.625,31.25H33.75v-1.875c0-0.346-0.279-0.625-0.625-0.625
										S32.5,29.029,32.5,29.375v1.875h-1.875c-0.346,0-0.625,0.279-0.625,0.625s0.279,0.625,0.625,0.625H32.5v1.875
										c0,0.346,0.279,0.625,0.625,0.625s0.625-0.279,0.625-0.625V32.5h1.875c0.345,0,0.625-0.279,0.625-0.625S35.97,31.25,35.625,31.25z
										"/>
								</g>
							</g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
							</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g>
							</svg>
							Add Data
							</a>
						</li>
					<li id="addLayer_popup" data-toggle="tooltip">
						<a href="#" id="add_layer_attribute" title="Add Layer" data-attr="#">
							<svg version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
						 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
						 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
					<metadata>
						<sfw  xmlns="&ns_sfw;">
							<slices></slices>
							<sliceSourceBounds  width="190" height="396" bottomLeftOrigin="true" y="-396" x="0"></sliceSourceBounds>
							<optimizationSettings>
								<targetSettings  targetSettingsID="0" fileFormat="PNG24Format">
									<PNG24Format  transparency="true" noMatteColor="false" matteColor="#FFFFFF" interlaced="false" filtered="false">
										</PNG24Format>
								</targetSettings>
							</optimizationSettings>
						</sfw>
					</metadata>
					<g>
					<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M11.561,28.751l-1.789,0.971l15.182,8.204l15.184-8.204
						l-1.791-0.971l-13.393,7.235L11.561,28.751z M25.047,16.726L9.864,24.924l15.183,8.201l15.182-8.201l-0.833-0.448l-3.621,0.017
						l0.813,0.441c-3.846,2.079-7.69,4.161-11.541,6.232c-3.852-2.071-7.696-4.155-11.547-6.232c3.85-2.076,7.707-4.144,11.547-6.234
						l0.867,0.468l-0.003-1.976L25.047,16.726z M32.528,12.05v4.148h-4.152v1.719h4.152v4.155h1.719v-4.155h4.204v-1.719h-4.204V12.05
						H32.528z"/></g>
					</svg>
					Add Layer
						</a>
					</li>
				</ul>
			</li>
			<!-- 
			
			<li id="addData_popup" data-toggle="tooltip" title="Add Data">
					<a href="javascript:void(0);" id="add_data_attribute" data-attr="#">
						<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
							xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
							viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g><g id="Layer_1_5_">	<g>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M33.125,37.5c-3.102,0-5.625-2.523-5.625-5.625
									s2.523-5.625,5.625-5.625c3.102,0,5.625,2.523,5.625,5.625S36.227,37.5,33.125,37.5L33.125,37.5z M20.64,11.25h-8.154
									C11.113,11.258,10,12.376,10,13.75v17.5c0,1.379,1.121,2.5,2.5,2.5h14.017c0.819,2.881,3.468,5,6.608,5
									c3.791,0,6.875-3.084,6.875-6.875c0-2.13-0.974-4.037-2.5-5.299V16.25c0-1.379-1.121-2.5-2.5-2.5H23.384l-2.317-2.316
									C20.953,11.319,20.8,11.254,20.64,11.25L20.64,11.25z M12.5,32.5h13.782c-0.019-0.206-0.032-0.414-0.032-0.625
									c0-3.791,3.084-6.875,6.875-6.875c1.125,0,2.186,0.277,3.125,0.759V16.25c0-0.689-0.561-1.25-1.25-1.25H23.125
									c-0.166,0-0.325-0.066-0.442-0.184L20.366,12.5H12.5c-0.689,0-1.25,0.561-1.25,1.25v17.5C11.25,31.939,11.811,32.5,12.5,32.5z"/>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M35.625,31.25H33.75v-1.875c0-0.346-0.279-0.625-0.625-0.625
									S32.5,29.029,32.5,29.375v1.875h-1.875c-0.346,0-0.625,0.279-0.625,0.625s0.279,0.625,0.625,0.625H32.5v1.875
									c0,0.346,0.279,0.625,0.625,0.625s0.625-0.279,0.625-0.625V32.5h1.875c0.345,0,0.625-0.279,0.625-0.625S35.97,31.25,35.625,31.25z
									"/>
							</g>
						</g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
						</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_"></g>
						</svg> -->
<!-- 					<span class="menu-name" data-translate="_add_data">Add Data</span> -->
				<!-- </a>
			</li>
			<li id="addLayer_popup" data-toggle="tooltip" title="Add Layer">
					<a href="javascript:void(0);" id="add_layer_attribute" data-attr="#add_layer">
						<svg version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
						 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
						 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
					<metadata>
						<sfw  xmlns="&ns_sfw;">
							<slices></slices>
							<sliceSourceBounds  width="190" height="396" bottomLeftOrigin="true" y="-396" x="0"></sliceSourceBounds>
							<optimizationSettings>
								<targetSettings  targetSettingsID="0" fileFormat="PNG24Format">
									<PNG24Format  transparency="true" noMatteColor="false" matteColor="#FFFFFF" interlaced="false" filtered="false">
										</PNG24Format>
								</targetSettings>
							</optimizationSettings>
						</sfw>
					</metadata>
					<g>
					<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M11.561,28.751l-1.789,0.971l15.182,8.204l15.184-8.204
						l-1.791-0.971l-13.393,7.235L11.561,28.751z M25.047,16.726L9.864,24.924l15.183,8.201l15.182-8.201l-0.833-0.448l-3.621,0.017
						l0.813,0.441c-3.846,2.079-7.69,4.161-11.541,6.232c-3.852-2.071-7.696-4.155-11.547-6.232c3.85-2.076,7.707-4.144,11.547-6.234
						l0.867,0.468l-0.003-1.976L25.047,16.726z M32.528,12.05v4.148h-4.152v1.719h4.152v4.155h1.719v-4.155h4.204v-1.719h-4.204V12.05
						H32.528z"/></g>
					</svg>
					<!-- <span class="menu-name">Add Layer</span> -->
				 <!--</a>
			</li> -->
			
			<li id="direction_popup" data-toggle="tooltip" title="Direction">
					<a href="javascript:void(0);" data-attr="#from_to_location">
						<svg version="1.1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
							xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
							viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g id="Layer_1"></g><g id="Layer_1_1_"></g><g id="Layer_1_2_"></g><g id="Layer_1_3_"></g><g id="Layer_1_4_"></g>
						<g id="Layer_1_5_">
							<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M35.916,18.525l-2.988-2.989h-7.679v-0.551
								c1.136-0.23,1.994-1.235,1.994-2.439c0-1.374-1.119-2.49-2.491-2.49c-1.374,0-2.49,1.116-2.49,2.49
								c0,1.202,0.855,2.209,1.992,2.439v0.551h-3.917c-0.86,0-1.563,0.7-1.563,1.563v1.426h-1.7l-2.989,2.986l2.989,2.989h7.181v10.462
								h-2.491v1.992h-1.496v2.989h8.969v-2.989h-1.496v-1.992h-2.49V24.501h4.414c0.861,0,1.564-0.7,1.564-1.563v-1.426h1.7
								L35.916,18.525L35.916,18.525z M23.256,12.546c0-0.824,0.672-1.493,1.496-1.493c0.822,0,1.493,0.669,1.493,1.493
								s-0.671,1.493-1.493,1.493C23.928,14.039,23.256,13.37,23.256,12.546L23.256,12.546z M28.237,37.952v0.995h-6.974v-0.995H28.237
								L28.237,37.952z M26.744,36.955h-3.986V35.96h3.986V36.955L26.744,36.955z M30.23,22.938c0,0.313-0.254,0.569-0.567,0.569H17.484
								l-1.992-1.995l1.992-1.992h12.179c0.313,0,0.567,0.255,0.567,0.569V22.938L30.23,22.938z M31.228,20.518v-0.429
								c0-0.863-0.703-1.563-1.564-1.563h-9.893V17.1c0-0.313,0.253-0.569,0.566-0.569h12.18l1.992,1.995l-1.992,1.992H31.228z"/>
						</g><g id="Layer_1_6_"></g><g id="Layer_1_7_"></g><g id="Layer_1_8_"></g><g id="Layer_1_9_"></g><g id="Layer_1_10_"></g><g id="Layer_1_11_"></g><g id="Layer_1_12_"></g><g id="Layer_1_13_"></g><g id="Layer_1_14_"></g><g id="Layer_1_15_"></g><g id="Layer_1_16_"></g><g id="Layer_1_17_"></g><g id="Layer_1_18_"></g><g id="Layer_1_19_"></g><g id="Layer_1_20_">
						</g><g id="Layer_1_21_"></g><g id="Layer_1_22_"></g><g id="Layer_1_23_"></g><g id="Layer_1_24_"></g><g id="Layer_1_25_"></g><g id="Layer_1_26_"></g><g id="Layer_1_27_"></g><g id="Layer_1_28_"></g><g id="Layer_1_29_"></g><g id="Layer_1_30_">
						</g>
						</svg>
						Direction
<!-- 					<span class="menu-name" data-translate="_from_location_to_location">From Location - To Location</span> -->
				</a>
			</li>
			
		</ul>
	</div>
	<!-- /#sidebar-wrapper -->
	
	
	<!--Main sidebar content start-->
	
<!-- 	Basemap Gallery popup start -->
		<div class="layer-popup layer-resize" id="basemap_gallery">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_basemap_gal">Basemap Gallery</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar" >
				<div id="basemapGalleryDiv">
				
					<div class="container">
						<div class="row">
							<div class="col-xs-12 ">
								 <ul class="ol-gallery">
								 	<li>
								 	<a href="javascript:void(0);" id="SatelliteIMG"><img class="ol-gallery-thumbnail" src="${context}/images/Satellite_Image_2.png" alt="" data-value="satellite"></a>
								 	<div class="ol-gallery-title">Satellite Image</div>
								 	</li>
								 	<li>
			  						<a href="javascript:void(0);" id="droneIMG"><img class="ol-gallery-thumbnail" src="${context}/images/Satellite_Image_1.png" alt="" data-value="drone"></a>
								 	<div class="ol-gallery-title">Drone</div>
								 	</li>
								 	<li>
								 	<a href="javascript:void(0);" id="blankImage"><img class="ol-gallery-thumbnail" src="${context}/images/blank.jpg" alt="" data-value="blank"></a>	
								 	<div class="ol-gallery-title">Blank</div>
								 	</li>
								</ul>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	
	
	
<!-- 	Basemap Gallery popup end -->
	<!--Layer popup start-->
	<div class="layer-popup layer-resize" id="layers">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_layers">Layers</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
			
				<ul class="nav nav-tabs full-linetab tab-with-smallw" id="tab_layer_list">
				  <li class="nav-item">
					<a class="nav-link active" data-toggle="tab" href="#layers_list" data-translate="llist_layers">Layers</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#layers_legand" data-translate="llist_legend">Legend</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#layers_opacity" data-translate="llist_opacity">Opacity</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#layers_search" id="search_layer_link" data-translate="search">Search</a>
				  </li>
				</ul>
				
				
				<div class="tab-content">
					<div class="tab-pane container active" id="layers_list">
						<div id="accordionExample"></div>
					</div>
					<div class="tab-pane container" id="layers_legand">
						<div id="legendDiv"></div>
					</div>
					
					<div class="tab-pane container" id="layers_opacity">
						<label data-translate="llist_ltransparency">All Visible Layer Transparency</label>
						<div class="w-100 position-relative">
							<span class="transparent" data-translate="llist_transparent">Transparent</span>
							<!-- <span class="opaque">Opaque</span> -->
						</div>
						<div class="range-slider mt-3">
							<input type="range" class="range-input" id="layer_slider" min="0.0" max="1.0" value = '1.0' step="0.01">
						</div>
					</div>
					<div class="tab-pane container" id="layers_search">
						<div class="row-fluid search-layer-lagend">
				          		<span class="esriLegendServiceLabel" data-translate="_select_layer">Select Layer</span>
				          		<div id="search_layer_content">
					          		<div class="checkbox">
									  <label><input type="checkbox" id="visibility_layer" title="On/Off Layer" disabled></label>
									</div>
							      <select class="selectpicker" id="search_layers" data-live-search="true">
							      </select>
						      </div>
						 </div>	
					</div>
				</div>
				
			
				<!-- <div id="layersDiv"></div> -->
				<!-- <div id="accordionExample"></div> -->
				
			</div>
		</div>
	</div>
	<!--Layer popup end-->
	
	<!--Query popup start-->
	
	<div class="layer-popup layer-resize" id="query">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_query">Query</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
				<!-- Nav tabs -->
				<ul class="nav nav-tabs full-linetab" id="query_result_tab">
				  <li class="nav-item">
					<a class="nav-link active" data-toggle="tab" data-translate="_task" href="#query_task">Task</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" data-toggle="tab" data-translate="_result" href="#query_result">Result</a>
				  </li>
				</ul>
				
				<div class="tab-content">
					<div class="tab-pane container active" id="query_task">
						<div class="query-task">
						
						<form id="form_query">
										<div class="form-group">
											<label for="location_select" data-translate= "_select_ward">Select Ward</label>
											<select class="form-control pb-1" id="location_select" name="location_select">
											</select>
										</div>
										
										<div class="form-group">
											<label for="poi_layer_select" data-translate= "_locate">Locate</label><span class="mandatory">*</span>
											<select class="form-control pb-1" id="poi_layer_select" name="poi_layer_select">
											</select>
										</div>
										
										<div class="form-group">
											<label for="poi_locality" data-translate="kyp_locality">Locality</label>
											<input type="text" class="form-control" id="poi_locality" name="poi_locality" placeholder="Locality" data-translate="kyp_locality">
										</div>
										
										<div class="text-center">
											<button type="submit" class="btn btn-indore" data-translate = "search">Search</button>
											<button type="reset" class="btn btn-indore" id="clear_predefineQuery" data-translate = "_clear">Clear</button>
										</div>
									</form>
						</div>
					</div>
					<div class="tab-pane container" id="query_result">
						<div class="query-result" id="attribute_query_rslt">
						</div>
					</div>
				</div>
			</div>
		</div>	
	</div>
	
	<!--Query popup start-->
	
	
	<!-- FEATRUE MAGAMENET POP UP STARTS -->
	
	  <div class="modal fade" id="myModal2" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title">Delete Attribute</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete feature?
        </div>
        <div class="modal-footer">
          <button type="button" id="btn_delete_yes"  class="btn btn-primary">Yes</button>
          <button type="button" id="btn_delete_no"  class="btn btn-primary" data-dismiss="modal">No</button>
        </div>
      </div>
      
    </div>
  </div>
	
	
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Feature Attribute</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center gap-2 mb-2">
          <label for="name">Name</label>
        <input type="text" id="name" name="name" class="form-control" /></div>

		<div class="d-flex align-items-center gap-2 mb-2">
        <label for="ward">Ward No.</label> <input type="text" id="ward_no" name="ward"
								class="form-control" />
		</div>        
        <div class="d-flex align-items-center gap-2 mb-2">
        <label for="ward">Tehsil</label>
        <input type="text" id="tehsil" name="tehsil" class="form-control"/></div>
        
        <div class="d-flex align-items-center gap-2 mb-2">
        <label for="ward">City</label>
        <input type="text" id="city" name="city" class="form-control" /></div>
        
        <div class="d-flex align-items-center gap-2 mb-2">
	        <label for="ward">Pin Code</label>
	        <input type="text" id="pin_code" name="pin_code" class="form-control" />
        </div>   
        
        <div class="d-flex align-items-center gap-2 mb-2" id="image_div" style="display: none !important;">
	        <label for="ward">Image</label>
	        <input type="file" id="file_name" name="file_name" class="form-control" accept="image/*">
        </div> 
        
        <div class="d-flex align-items-center gap-2 mb-2" id="get_image_url" style="display: none !important;">
	        <label for="ward">Preview</label>
	        <a href="" data-attr="#line" id="preview_image" title="Image" target="_blank" >Click to preview image</a>
        </div> 
        
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" id="btn_submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
      
    </div>
  </div>
	
	
	
	
<div class="layer-popup layer-resize" id="feature_tools">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_draw">Draw</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			
			<div class="layer-content scrollar">
				<div class="d-flex align-items-center w-100">
				<input type="checkbox" value="show_all_feature" id="show_all_feature">
				<label class="ms-2" for="chk_retms_cc">Show All Feature</label>				
				</div>
				<label data-translate="_select_draw_mode">Select Draw Mode</label>
				
                        
				<ul class="feature-tools-select">
					<li id="drawLineFeature">
						<a href="javascript:void(0);" data-attr="#line" title="LineString">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect x="0.001" fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="49.998" height="50"/>
								
									<line fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" x1="16.563" y1="33.438" x2="33.438" y2="16.563"/>
							</g>
							</svg>
						</a>
					</li>
				<!-- 	<li>
						<a href="javascript:void(0);" data-attr="#curve">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								<g>
									
										<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
										M13.545,36.454c0.244-2.852,1.455-5.636,3.638-7.819C19.363,26.454,22.148,25.243,25,25c2.852-0.242,5.635-1.453,7.817-3.635
										c2.183-2.181,3.394-4.966,3.636-7.817"/>
								</g>
							</g>
							</svg>
						</a>
					</li> -->

					<li id="drawPolygonFeature">
						<a href="javascript:void(0);" data-attr="#polygon_tool" title="Polygon">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<polygon fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" points="
									15.771,17.794 34.229,12.208 28.726,37.792 16.499,30.586 	"/>
							</g>
							</svg>

						</a>
						
						
					</li>

					<li id="drawPointFeature">
						<a href="javascript:void(0);" data-attr="#circle_tool" title="Point">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
									M25,35.254c5.649,0,10.254-4.605,10.254-10.254c0-5.647-4.604-10.254-10.254-10.254c-5.647,0-10.254,4.607-10.254,10.254
									C14.746,30.648,19.353,35.254,25,35.254z"/>
							</g>
							</svg>
						</a>
					</li>

				</ul>

				<label>Select Operation Mode</label>
						<ul class="nav nav-tabs full-background-tab" id="kyp_ul_data">
							  <li class="nav-item" >
								<a class="nav-link active" id="move_polygon" title="Move Feature">Move Feature</a>
							  </li>
							  <li class="nav-item">
								<a class="nav-link active" id="modify_polygon" title="Modify Feature">Modify Feature</a>
							  </li>
							  <li class="nav-item">
								<a class="nav-link active" id="merge_polygon" title="Merge Feature">Merge Feature</a>
							  </li>
							  <li class="nav-item">
								<a class="nav-link active" id="cut_polygon" title="Cut Feature">Cut Feature</a>
							  </li>
							  <li class="nav-item">
								<a class="nav-link active" id="delete_button" title="Delete Feature">Delete Feature</a>
							  </li>
							  <li class="nav-item">
								<a class="nav-link active" id="merge_selected_feature" style="display: none;" title="Merge Feature">Merge Selected Feature</a>
							  </li>
						</ul>
				<!-- Polygon -->

				<div class="text-center">	
					<button id="clear_draw_feature" class="btn btn-indore" data-translate="_clear">Clear</button>
				</div>
			</div>
		</div>
	</div>
	
	
	
	<!-- FEATURE MANAGEMENT POP UP ENDS -->
	<!--Draw_tools popup start-->
	<div class="layer-popup layer-resize" id="draw_tools">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_draw">Draw</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
				<label data-translate="_select_draw_mode">Select Draw Mode</label>
				<ul class="draw-tools-select">
					<li id="drawPoint">
						<a href="javascript:void(0);" data-attr="#point" title="Point">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect x="0.001" fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="49.998" height="50"/>
								<g>
									
										<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
										M18.949,29.277l6.05,6.05l6.05-6.05c3.342-3.34,3.342-8.757,0-12.099c-3.34-3.341-8.758-3.341-12.1,0
										C15.609,20.52,15.609,25.938,18.949,29.277z"/>
									
										<circle fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" cx="25" cy="23.228" r="4.916"/>
								</g>
							</g>
							</svg>
						</a>
					</li>
					<li id="drawLine">
						<a href="javascript:void(0);" data-attr="#line" title="LineString">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect x="0.001" fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="49.998" height="50"/>
								
									<line fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" x1="16.563" y1="33.438" x2="33.438" y2="16.563"/>
							</g>
							</svg>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);" data-attr="#multiple_line" title="Polyline">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<polyline fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" points="
									12.168,35.488 20.957,23.301 27.754,27.507 37.832,14.512 	"/>
							</g>
							</svg>
						</a>
					</li>
				<!-- 	<li>
						<a href="javascript:void(0);" data-attr="#curve">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								<g>
									
										<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
										M13.545,36.454c0.244-2.852,1.455-5.636,3.638-7.819C19.363,26.454,22.148,25.243,25,25c2.852-0.242,5.635-1.453,7.817-3.635
										c2.183-2.181,3.394-4.966,3.636-7.817"/>
								</g>
							</g>
							</svg>
						</a>
					</li> -->
					<li id="drawTriangle">
						<a href="javascript:void(0);" data-attr="#triangle" title="Triangle">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect x="0.001" fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="49.998" height="50"/>
								
									<polygon fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" points="
									24.999,15.487 30.492,25 35.985,34.513 24.999,34.513 14.015,34.513 19.508,25 	"/>
							</g>
							</svg>
						</a>
					</li>
					<li id="drawRectangle">
						<a href="javascript:void(0);" data-attr="#square_tool" title="Rectangle">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<rect x="14.453" y="14.453" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" width="21.094" height="21.094"/>
							</g>
							</svg>

						</a>
					</li>
					<li id="drawCircle">
						<a href="javascript:void(0);" data-attr="#circle_tool" title="Circle">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
									M25,35.254c5.649,0,10.254-4.605,10.254-10.254c0-5.647-4.604-10.254-10.254-10.254c-5.647,0-10.254,4.607-10.254,10.254
									C14.746,30.648,19.353,35.254,25,35.254z"/>
							</g>
							</svg>
						</a>
					</li>
				<!-- 	<li id="drawEllipse">
						<a href="javascript:void(0);" data-attr="#oval_tool" title="Oval">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
									M25,31.34c6.115,0,11.101-2.848,11.101-6.34S31.115,18.66,25,18.66c-6.113,0-11.102,2.848-11.102,6.34S18.887,31.34,25,31.34z"/>
							</g>
							</svg>

						</a>
					</li> -->
					<li id="drawPolygon">
						<a href="javascript:void(0);" data-attr="#polygon_tool" title="Polygon">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<polygon fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" points="
									15.771,17.794 34.229,12.208 28.726,37.792 16.499,30.586 	"/>
							</g>
							</svg>

						</a>
						
						
					</li>
					<!-- <li>
						<a href="javascript:void(0);" data-attr="#custom_shape_tool">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect x="0.001" fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="49.998" height="50"/>
								
									<path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
									M16.718,26.99c0,0,4.922-2.227,4.336-5.742s3.867-7.97,5.859-5.509c1.992,2.462-3.047,8.087,0.588,7.736
									c3.631-0.353,5.975-3.698,7.969-0.82c1.99,2.876,2.107,9.375-3.4,8.203c-5.508-1.173-9.141-2.461-9.844,2.227
									C21.524,37.771,6.757,32.966,16.718,26.99z"/>
							</g>
							</svg>
						</a>
					</li> -->
					<li>
						<a href="javascript:void(0);" data-attr="#text_tool" title="Text">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect x="0" fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50.001" height="50"/>
								<path fill-rule="evenodd" clip-rule="evenodd" fill="#732F31" d="M14.945,35.74l8.24-21.48h3.125l8.745,21.48H31.82l-2.485-6.51
									h-9.044l-2.331,6.51H14.945L14.945,35.74z M21.124,26.92h7.321l-2.24-5.956c-0.675-1.81-1.185-3.305-1.539-4.485
									c-0.295,1.399-0.691,2.775-1.186,4.135L21.124,26.92z"/>
							</g>
							</svg>
						</a>
					</li>
				</ul>
				<div class="draw-tools-set div-hidden" id ="line">
					<div class="title-tools-sub d-flex">
						<label data-translate = "_draw_preview">Preview</label>
						<svg version="1.1" id="layer_line" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g>
							<!-- <rect x="0.001" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" width="49.998" height="50"/> -->
							<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"></rect>
								<line id="lineSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#000000" stroke-width="2.0" stroke-miterlimit="22.9256" x1="16.563" y1="33.438" x2="33.438" y2="16.563"/>
						</g>
						</svg>
					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="line_color" data-translate = "_draw_color">Color</label>
								<input type="color" class="form-control" id="line_color" >
							</div>
							<!-- <div class="form-group">
								<label for="line_cap">Line Cap</label>
								<select class="form-control" id="line_cap">
									<option value=" ">Select Line Cap</option>
									<option value="2">line_cap 2</option>
									<option value="3">line_cap 3</option>
									<option value="4">line_cap 4</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="line_join">Line Join</label>
								<select class="form-control" id="line_join">
									<option value=" ">Select Line Join</option>
									<option value="2">line_join 2</option>
									<option value="3">line_join 3</option>
									<option value="4">line_join 4</option>
								</select>
							</div> -->
							
							<div class="form-group">
								<label for="line_width" data-translate = "_draw_line_width">Line Width</label>
								<select class="form-control pb-1" id="line_width">
									<!-- <option value=" ">Select Line Width</option> -->
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
						</form>
					</div>
				</div>
				
				
				<div class="draw-tools-set div-hidden" id ="multiple_line">
					<div class="title-tools-sub d-flex">
						<label data-translate = "_draw_preview">Preview</label>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<polyline id="polyLineSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#000000" stroke-width="2.0" stroke-miterlimit="22.9256" points="
									12.168,35.488 20.957,23.301 27.754,27.507 37.832,14.512 	"/>
							</g>
							</svg>
					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="multi_line_color" data-translate = "_draw_color">Color</label>
								<input type="color" class="form-control" id="multi_line_color" >
							</div>
							<!-- <div class="form-group">
								<label for="line_cap">Line Cap</label>
								<select class="form-control" id="line_cap">
									<option value=" ">Select Line Cap</option>
									<option value="2">line_cap 2</option>
									<option value="3">line_cap 3</option>
									<option value="4">line_cap 4</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="line_join">Line Join</label>
								<select class="form-control" id="line_join">
									<option value=" ">Select Line Join</option>
									<option value="2">line_join 2</option>
									<option value="3">line_join 3</option>
									<option value="4">line_join 4</option>
								</select>
							</div> -->
							
							<div class="form-group">
								<label for="multi_line_width" data-translate = "_draw_line_width">Line Width</label>
								<select class="form-control pb-1" id="multi_line_width">
									<!-- <option value=" ">Select Line Width</option> -->
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
						</form>
					</div>
				</div>
				
				<div class="draw-tools-set div-hidden" id ="triangle">
					<div class="title-tools-sub d-flex">
						<label data-translate = "_draw_preview">Preview</label>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g>
							<!-- <rect x="0.001" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" width="49.998" height="50"/> -->
							<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								<polygon id="triangleSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#000000" stroke-width="1.2497" stroke-miterlimit="22.9256" points="
								24.999,15.487 30.492,25 35.985,34.513 24.999,34.513 14.015,34.513 19.508,25 	"/>
						</g>
						</svg>

					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="t_s_color" data-translate = "_draw_strok_color">Stroke Color</label>
								<input type="color" class="form-control" id="t_s_color" >
							</div>
							
							<div class="form-group">
								<label for="t_b_width" data-translate = "_draw_border_width">Border Width</label>
								<select class="form-control pb-1" id="t_b_width">
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="t_f_color" data-translate = "_draw_fill_color">Fill Color</label>
								<input type="color" class="form-control" id="t_f_color" >
							</div>
							
							
						</form>
					</div>
				</div>
				
				<div class="draw-tools-set div-hidden" id ="square_tool">
					<div class="title-tools-sub d-flex">
						<label data-translate = "_draw_preview">Preview</label>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<rect id="recatangleSvg" x="14.453" y="14.453" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#000000" stroke-width="1.2497" stroke-miterlimit="22.9256" width="21.094" height="21.094"/>
							</g>
							</svg>

					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="t_s_color" data-translate = "_draw_strok_color">Stroke Color</label>
								<input type="color" class="form-control" id="s_s_color" >
							</div>
							
							<div class="form-group">
								<label for="t_b_width" data-translate = "_draw_border_width">Border Width</label>
								<select class="form-control pb-1" id="s_b_width">
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="t_f_color" data-translate = "_draw_fill_color">Fill Color</label>
								<input type="color" class="form-control" id="s_f_color" >
							</div>
							
							
						</form>
					</div>
				</div>
				
				<div class="draw-tools-set div-hidden" id ="circle_tool">
					<div class="title-tools-sub d-flex">
						<label data-translate = "_draw_preview">Preview</label>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<path id= "circleSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#000000" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
									M25,35.254c5.649,0,10.254-4.605,10.254-10.254c0-5.647-4.604-10.254-10.254-10.254c-5.647,0-10.254,4.607-10.254,10.254
									C14.746,30.648,19.353,35.254,25,35.254z"/>
							</g>
							</svg>


					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="t_s_color" data-translate = "_draw_strok_color">Stroke Color</label>
								<input type="color" class="form-control" id="c_s_color" >
							</div>
							
							<div class="form-group">
								<label for="t_b_width" data-translate = "_draw_border_width">Border Width</label>
								<select class="form-control pb-1" id="c_b_width">
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="t_f_color" data-translate = "_draw_fill_color">Fill Color</label>
								<input type="color" class="form-control" id="c_f_color" >
							</div>
							
							
						</form>
					</div>
				</div>
				
				
				<!-- Polygon -->
				
				<div class="draw-tools-set div-hidden" id ="polygon_tool">
					<div class="title-tools-sub d-flex">
						<label data-translate = "_draw_preview">Preview</label>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g>
							<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
							
								<polygon id="polygonSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#000000" stroke-width="1.2497" stroke-miterlimit="22.9256" points="
								15.771,17.794 34.229,12.208 28.726,37.792 16.499,30.586 	"/>
						</g>
						</svg>


					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="t_s_color" data-translate = "_draw_strok_color">Stroke Color</label>
								<input type="color" class="form-control" id="p_s_color" >
							</div>
							
							<div class="form-group">
								<label for="t_b_width" data-translate = "_draw_border_width">Border Width</label>
								<select class="form-control pb-1" id="p_b_width">
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="t_f_color" data-translate = "_draw_fill_color">Fill Color</label>
								<input type="color" class="form-control" id="p_f_color" >
							</div>
							
							
						</form>
					</div>
				</div>
				
				
				
				<div class="draw-tools-set div-hidden" id ="text_tool">
					<div class="title-tools-sub d-flex">
						<label data-translate = "_draw_preview">Preview</label>
						<label class="text-preview" id="lblDrawTxt" style="font-size: 12px;color:black"></label>
					</div>
					<div class="draw-form-tools">
						<form>
						<div class="form-group">
							<label for="tool_text" data-translate = "_draw_text">Text</label>
							<input type="text" class="form-control" id="tool_text">
						</div>
						<div class="form-group">
							<label for="tool_fontcolor" data-translate = "_draw_font_color">Font Color</label>
							<input type="color" class="form-control" id="tool_fontcolor">
						</div>
						<!-- <div class="form-group">
							<label for="tool_fillcolor">Font Fill color</label>
							<input type="color" class="form-control" id="tool_fillcolor">
						</div> -->
						
						<div class="form-group">
							<label for="tool_fontsize" data-translate = "_draw_font_size">Font Size</label>
							<select class="form-control pb-1" id="tool_fontsize">
									<option value="12">12</option>
									<option value="14">14</option>
									<option value="16">16</option>
									<option value="18">18</option>
									<option value="20">20</option>
								</select>
						</div>
					</form>
					</div>
				</div>
				<div class="text-center">	
					<button id="clear_draw_graphics" class="btn btn-indore" data-translate="_clear">Clear</button>
				</div>
			</div>
		</div>
	</div>
	
		
	<!--Around Me popup start-->
	
	<div class="layer-popup layer-resize" id="around_me">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_around_me">Around Me</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
			
				<!-- Nav tabs -->
				<ul class="nav nav-tabs full-linetab" id="nearme_result_data">
				  <li class="nav-item">
					<a class="nav-link active" data-toggle="tab" href="#nearme_task_tab" data-translate = "_task">Task</a>
				  </li>
				  <li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#nearme_result_tab" data-translate = "_result">Result</a>
				  </li>
				</ul>
				
				<div class="tab-content">
					<div class="tab-pane container active" id="nearme_task_tab">
						<div class="query-task">
							<p data-translate = "_around_note">Note: After Selection of layer and distance, Please click on map</p>
				
							<form id="form_nearme">
									<div class="form-group">
										<label for="around_layer" data-translate="_select_layer">Select Layer</label><span class="mandatory">*</span>
										<select class="form-control pb-1" id="around_layer" name="around_layer">
										</select>
									</div>
								
									<div class="form-group">
										<label for="arround_me_current_loc" data-translate="_select_location">Select Location</label><span class="mandatory">*</span>
										<input type="text" class="form-control" id="arround_me_current_loc" name="arround_me_current_loc" data-translate="_select_location" placeholder="Select Location" readonly>
										<div class="late-fromto">
											<img src="images/icons/Latitude2-15.svg" id="arround_selected_lat" title="Location By Map Click">
											<img src="images/icons/Latitude1-14.svg" id="arround_current_lat" title="Current Location">
										</div>
									</div>
								
								  <div class="form-group">
									<label for="near_area" data-translate="_set_nearby_area">Set Nearby Area: </label>
									<span id="area_range">1 KM</span>
									<input type="range" value="1" min="1" max="5" class="form-control-range" id="near_area">
								  </div>
								  
								  <div class="text-center pb-2 pt-2">
									<button type="submit" class="btn btn-indore" data-translate="_locate">Locate</button>
									<button type="reset" class="btn btn-indore" id="clear_aroundme_rslt" data-translate="_clear">Clear</button>
								  </div>
							</form>
						</div>
					</div>
					<div class="tab-pane container" id="nearme_result_tab">
						<div class="query-result" id="nearme_result">
						</div>
					</div>
				</div>
			
			
			
				<!-- <p data-translate = "_around_note">Note: After Selection of layer and distance, Please click on map</p>
				
				<form id="frm_to_location">
						<div class="form-group">
							<label for="around_layer" data-translate="_select_layer">Select Layer</label>
							<select class="form-control pb-1" id="around_layer">
							</select>
						</div>
					
						<div class="form-group">
							<label for="arround_me_current_loc" data-translate="">Current Location</label>
							<input type="text" class="form-control" id="arround_me_current_loc" name="arround_me_current_loc" data-translate="" placeholder="Select Current Location" readonly>
							<div class="late-fromto">
								<img src="images/icons/Latitude1-14.svg" id="arround_current_lat" title="Current Location">
							</div>
						</div>
					
					  <div class="form-group">
						<label for="near_area" data-translate="_set_nearby_area">Set Nearby Area: </label>
						<span id="area_range">1 KM</span>
						<input type="range" value="1" min="1" max="5" class="form-control-range" id="near_area">
					  </div>
				</form>
				<div class="layer-content scrollar" id="nearme_result"></div> -->
			</div>
		</div>	
	</div>
	
	<!--Around Me popup start-->
	
	<!--Ward Information popup start-->
	
	<div class="layer-popup layer-resize" id="ward_information">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_ward_information">Ward Information</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
				<div class="form-group">
					<label for="ward_select" data-translate= "_select_ward">Select Ward </label>
					<select class="form-control pb-1" id="ward_select">
						<option value="">Select ward</option>
					</select>
				</div>
				
				<!--Ward Sub Information Start-->
				<div class="accordion" id="accordionExample">
				  
				  <div class="card full-accordion">
					<div class="card-header" id="cor_d_t">
					  <h5 class="mb-0">
						<button class="btn btn-link accordion-btn" type="button" data-toggle="collapse" data-target="#cor_d_c" aria-expanded="true" aria-controls="cor_d_c" 
						data-translate="_corporator_details">
						  Corporator Details
						  <i class="fa fa-angle-down float-right"></i>
						</button>
						
					  </h5>
					</div>

					<div id="cor_d_c" class="collapse" aria-labelledby="cor_d_t" data-parent="#accordionExample">
					  <div class="card-body">
							<div class="query-result-main ward-list">
								<div class="result-task">
									<label>Name: </label>
									<p id="lbl_corpo_name"></p>
								</div>
								<div class="result-task">
									<label>Contact Number: </label>
									<p id="lbl_corpo_contact"></p>
								</div>
							</div>
					  </div>
					</div>
				  </div>
				  
				  <div class="card full-accordion">
					<div class="card-header" id="wardd_details_t">
					  <h5 class="mb-0">
						<button class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#wardd_details_c" aria-expanded="false" aria-controls="wardd_details_c" data-translate="_ward_details">
						  
						  Ward Details
						  
						  <i class="fa fa-angle-down float-right"></i>
						</button>
						
					  </h5>
					</div>
					<div id="wardd_details_c" class="collapse" aria-labelledby="wardd_details_t" data-parent="#accordionExample">
					  <div class="card-body">
							<div class="query-result-main ward-list">
								<div class="result-task">
									<label>Ward No: </label>
									<p id="lbl_ward_no"></p>
								</div>
								<div class="result-task">
									<label>Ward Name: </label>
									<p id="lbl_ward_name"></p>
								</div>
								<div class="result-task">
									<label>Ward Area (m<sup>2</sup>): </label>
									<p id="lbl_ward_area"></p>
								</div>
							</div>
					  </div>
					</div>
				  </div> 
				  
				  <div class="card full-accordion">
					<div class="card-header" id="zone_details_t">
					  <h5 class="mb-0">
						<button class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#zone_details_c" aria-expanded="false" aria-controls="zone_details_c" data-translate="_zone_details">
						 Zone Details
						  <i class="fa fa-angle-down float-right"></i>
						</button>
						
					  </h5>
					</div>
					<div id="zone_details_c" class="collapse" aria-labelledby="zone_details_t" data-parent="#accordionExample">
					  <div class="card-body">
						<div class="query-result-main ward-list">
							<div class="result-task">
								<label>Zone Name: </label>
								<p id="lbl_zone_name"></p>
							</div>
							<div class="result-task">
								<label>Zone No: </label>
								<p id="lbl_zone_no"></p>
							</div>
						</div>
					  </div>
					</div>
				  </div>
				  
				  
				  
				  <div class="card full-accordion">
					<div class="card-header" id="officers_details_t">
					  <h5 class="mb-0">
						<button class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#officers_details_c" aria-expanded="false" aria-controls="officers_details_c" data-translate="_officers">
						  
						 Officers
						  
						  <i class="fa fa-angle-down float-right"></i>
						</button>
						
					  </h5>
					</div>
					<div id="officers_details_c" class="collapse" aria-labelledby="officers_details_t" data-parent="#accordionExample">
					  <div class="card-body ward-list-card">
						<div class="query-result-main ward-list">
							<div class="result-task">
								<label>Health officer: </label>
								<p id="lbl_health_ofc"></p>
							</div>
							<div class="result-task">
								<label>Health officer No.: </label>
								<p id="lbl_health_ofc_no"></p>
							</div>
							<!-- <div class="result-task">
								<label>Inspector: </label>
								<p id="lbl_inspector"></p>
							</div> -->
							<div class="result-task">
								<label>Zonal officer: </label>
								<p id="lbl_zonal_ofc"></p>
							</div>
							<div class="result-task">
								<label>Zonal officer No.: </label>
								<p id="lbl_zonal_ofc_no"></p>
							</div>
							<div class="result-task">
								<label>Sanitary officer: </label>
								<p id="lbl_sanitary_ofc"></p>
							</div>
							<div class="result-task">
								<label>Sanitary officer No.: </label>
								<p id="lbl_sanitary_ofc_no"></p>
							</div>
						</div>
					  </div>
					</div>
				  </div>
				  
				  <div class="card full-accordion">
					<div class="card-header" id="population_details_t">
					  <h5 class="mb-0">
						<button class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#population_details_c" aria-expanded="false" aria-controls="population_details_c" data-translate="_population">
						  
						 Population
						  
						  <i class="fa fa-angle-down float-right"></i>
						</button>
						
					  </h5>
					</div>
					<div id="population_details_c" class="collapse" aria-labelledby="population_details_t" data-parent="#accordionExample">
					  <div class="card-body">
						<div class="query-result-main ward-list">
							<div class="result-task">
								<label>Total Population: </label>
								<p id="lbl_population"></p>
							</div>
							<div class="result-task">
								<label>Gender Ratio: </label>
								<p id="lbl_gender_ratio"></p>
							</div>
						</div>
					  </div>
					</div>
				  </div>
				  
				  <div class="card full-accordion">
					<div class="card-header" id="educational_details_t">
					  <h5 class="mb-0">
						<button class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#educational_details_c" aria-expanded="false" aria-controls="educational_details_c" data-translate="_educational_institute">
						  
						 Educational institutes
						  
						  <i class="fa fa-angle-down float-right"></i>
						</button>
						
					  </h5>
					</div>
					<div id="educational_details_c" class="collapse" aria-labelledby="educational_details_t" data-parent="#accordionExample">
					  <div class="card-body ward-list-card">
						<div class="query-result-main ward-list">
							<div class="result-task">
								<label>Primary Schools: </label>
<!-- 								<p id="lbl_prisch_name"></p> -->
								<ul id="lbl_prisch_name" class="list-wardinfo"></ul>
							</div>
							<div class="result-task">
								<label>Secondary Schools: </label>
<!-- 								<p id="lbl_secsch_name"></p> -->
								<ul id="lbl_secsch_name" class="list-wardinfo"></ul>
							</div>
							<div class="result-task">
								<label>Colleges: </label>
<!-- 								<p id="lbl_clg_name"></p> -->
								<ul id="lbl_clg_name" class="list-wardinfo"></ul>
							</div>
<!-- 							<div class="result-task"> -->
<!-- 								<label>Institutes: </label> -->
<!-- 								<p id="lbl_institute_name"></p> -->
<!-- 							</div> -->
						</div>
					  </div>
					</div>
				  </div>
				  
				  <div class="card full-accordion">
					<div class="card-header" id="health_details_t">
					  <h5 class="mb-0">
						<button class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#health_details_c" aria-expanded="false" aria-controls="health_details_c" data-translate="_health_facilities">
						  
						 Health Facilities
						  
						  <i class="fa fa-angle-down float-right"></i>
						</button>
						
					  </h5>
					</div>
					<div id="health_details_c" class="collapse" aria-labelledby="health_details_t" data-parent="#accordionExample">
					  <div class="card-body">
						<div class="query-result-main ward-list">
							<div class="result-task">
								<label>Hospitals: </label>
<!-- 								<p id="lbl_hospital_name"></p> -->
								<ul id="lbl_hospital_name" class="list-wardinfo"></ul>
							</div>
							<div class="result-task">
								<label>Pharmacies: </label>
<!-- 								<p id="lbl_pharmacy_name"></p> -->
								<ul id="lbl_pharmacy_name" class="list-wardinfo"></ul>
							</div>
<!-- 							<div class="result-task"> -->
<!-- 								<label>Dispensary: </label> -->
<!-- 								<p id="lbl_dispensary_name"></p> -->
<!-- 							</div> -->
<!-- 							<div class="result-task"> -->
<!-- 								<label>Clinics: </label> -->
<!-- 								<p id="lbl_clinic_name"></p> -->
<!-- 							</div> -->
						</div>
					  </div>
					</div>
				  </div>
				 
				  
				  <div class="card full-accordion">
					<div class="card-header" id="eh_details_t">
					  <h5 class="mb-0">
						<button class="btn btn-link collapsed accordion-btn" type="button" data-toggle="collapse" data-target="#eh_details_c" aria-expanded="false" aria-controls="eh_details_c" data-translate="_hotel_and_entertainment">
						  
						 Hotel & Entertainment
						  
						  <i class="fa fa-angle-down float-right"></i>
						</button>
						
					  </h5>
					</div>
					<div id="eh_details_c" class="collapse" aria-labelledby="eh_details_t" data-parent="#accordionExample">
					  <div class="card-body">
						<div class="query-result-main ward-list">
							<div class="result-task">
								<label>Hotels: </label>
								<p id="lbl_hotel_name"></p>
							</div>
							<div class="result-task">
								<label>Restaurants: </label>
								<p id="lbl_rest_name"></p>
							</div>
							
						</div>
					  </div>
					</div>
				  </div>
				  
				  
				</div>
				<!--Ward Sub Information End-->
				
			</div>
		</div>	
	</div>
	
	<!--Ward Information popup start-->
	
	
	<!--Events popup start-->
	
	<div class="layer-popup layer-resize" id="events">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_events">Events</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
				<!-- Nav tabs -->
				<ul class="nav nav-tabs full-linetab">
				  <li class="nav-item">
					<a class="nav-link active" data-toggle="tab" href="#view_event" id="view_event_popup" data-translate="_view_event">View Events</a>
				  </li>
				  
				  <li class="nav-item">
					<a class="nav-link" data-toggle="tab" id="add_event_popup" href="#add_event" data-translate="_add_event">Add Event</a>
				  </li>
				  
				</ul>

				<!-- Tab panes -->
				<div class="tab-content">
				  <div class="tab-pane container fade" id="add_event">
					<form id="form_events">
					
						<div class="form-group">
								<label for="event_citizen" data-translate="_select_department">Select Department</label><span class="mandatory">*</span>
								<select class="form-control pb-1" id="event_citizen" name="event_citizen">
								</select>
						</div>
					
						<div class="form-group">
							<label for="event_name" data-translate="_event_name">Event Name</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="event_name" name="event_name" data-translate = "pholder_evt_name" placeholder="Enter Event Name">
						</div>
						
						<div class="form-group">
							<label for="event_desc" data-translate="_description">Description</label>
							<textarea class="form-control" rows="2" id="event_desc" name="event_desc" data-translate = "pholder_event_desc"></textarea>
						</div>
						
						<div class="form-group">
							<label for="event_venue" data-translate="_venue">Venue</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="event_venue" name="event_venue" data-translate = "pholder_venue" placeholder="Enter Venue">
						</div>
						
						<div class="row">
										<div class="col-12">
											<div class="form-group">
												<label for="event_sdate" data-translate="events_date">Date & Time</label><span class="mandatory">*</span>
												<input type="text" class="form-control" id="event_sdate" data-translate = "pholder_date" name = "event_sdate" placeholder="Date & Time">
											</div>
										</div>
						</div>
						
						<div class="form-group">
							<label for="event_webaddress" data-translate="_web_address">Web Address</label>
							<input type="text" class="form-control" id="event_webaddress" name="event_webaddress" data-translate = "pholder_web_address" placeholder="Enter Web Address">
						</div>
						
						<div class="form-group">
							<label for="event_efee" data-translate="_entry_fee">Entry Fee</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="event_efee" name="event_efee" data-translate = "pholder_efee" placeholder="Enter Entry Fee">
						</div>
						
						<div class="form-group">
							<label for="event_cperson" data-translate="_conatct_person">Contact Person</label>
							<input type="text" class="form-control" id="event_cperson" name="event_cperson" data-translate = "pholder_cperson" placeholder="Enter Contact Person">
						</div>
						
						<div class="form-group">
							<label for="event_email" data-translate="_email_id">Email Id</label><span class="mandatory">*</span>
							<input type="email" class="form-control" id="event_email" name="event_email" data-translate = "pholder_eid" placeholder="Enter Email Id">
						</div>
						
						<div class="form-group">
							<label for="event_conno" data-translate="_mobile_number">Mobile Number</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="event_conno" name="event_conno" data-translate = "pholder_cnumber" placeholder="Enter Mobile Number">
						</div>
						
						<div class="form-group">
							<label for="event_Organizer" data-translate="_organizer">Organizer</label>
							<input type="text" class="form-control" id="event_Organizer" name="event_Organizer" data-translate = "pholder_organizer" placeholder="Enter Organizer">
						</div>
						
						<div class="form-group">
							<label for="event_latitude" data-translate="_latitude">Latitude</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="event_latitude" name="event_latitude" data-translate = "pholder_lat" placeholder="Enter Latitude">
							<div class="late-fromto">
								<img src="images/icons/Latitude1-14.svg" id="event_current_lat" title="Current Location">
								<img src="images/icons/Latitude2-15.svg" id="event_selected_lat" title="Location By Map Click">
							</div>
						</div>
						<div class="form-group">
							<label for="event_longitude" data-translate="_longitude">Longitude</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="event_longitude" name="event_longitude" data-translate = "pholder_long" placeholder="Enter Longitude">
							<div class="late-fromto">
								<img src="images/icons/Latitude1-14.svg" id="event_current_longitude" title="Current Location">
								<img src="images/icons/Latitude2-15.svg" id="event_selected_longitude" title="Location By Map Click">
							</div>
						</div>
						
						<div class="form-group">
							<label for="event_file" data-translate="_upload_file">Upload File</label><span class="mandatory">*</span>
							<input type="file" multiple class="form-control" id="event_file" name="event_file" placeholder=" ">
						</div>
						
						<div class="text-center pb-2 pt-2">
						<button type="submit" class="btn btn-indore" data-translate="_submit" data-translate="_submit">Submit</button>
						<button type="reset" class="btn btn-indore" id="clear_event" data-translate="_clear">Clear</button>
							
						</div>
					</form>
					
				  </div>
				  <div class="tab-pane container active" id="view_event">
					<form>
						<div class="form-group">
							<label  for="select_eventduration" data-translate="_select_duration">Select Duration</label>
							<select class="form-control pb-1" id="select_eventduration">
								<!-- <option value=" ">Select Duration</option> -->
								<option value="0">Today’s Event</option>
								<option value="7">Event in next 7 days</option>
								<option value="30">Event in next 30 days</option>
								<option value="1">Event in Previous 7 days</option>
							</select>
						</div>
					</form>
					<div class="query-result" id="event_query_rslt"></div>
				  </div>
				</div>
				
				<!-- Tab panes end-->
			</div>
		</div>	
	</div>
	
	<!--Events popup start-->
	
	<!--know_your_property popup start-->
	
	<div class="layer-popup layer-resize" id="know_your_property">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_know_your_property">Know Your Property</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
				
				<div class="container">
					
					<div class="row">
						<div class="col-xs-12 ">
							<!-- Nav tabs -->
							<ul class="nav nav-tabs full-background-tab" id="kyp_ul_data">
							  <li class="nav-item" id="tab_know_your_property">
								<a class="nav-link active" data-toggle="tab" href="#kyl" title="Know Your Property" data-translate = "_know_your_property">Know Your Property</a>
							  </li>
							  <li class="nav-item" id="tab_by_ward_number">
								<a class="nav-link" data-toggle="tab" href="#kyp" title="Ward Wise" data-translate = "kyp_by_ward">Ward Wise</a>
							  </li>
							  <li class="nav-item" id="tab_kyp_result">
								<a class="nav-link" data-toggle="tab" href="#kyp_final_result" title="Result" data-translate = "_result">Result</a>
							  </li>
							</ul>

							<!-- Tab panes -->
							<div class="tab-content">
							  <div class="tab-pane container active p-0" id="kyl">
								<p data-translate = "kyp_note">Note: To view the property details, Performed the identifier operation on the plot point.</p>
								
									<form id="form_kyp">
										<div class="form-group">
											<label for="kyl_locality" data-translate = "kyp_locality">Locality/Area Name</label>
											<textarea class="form-control" rows="2" id="kyl_locality" name="kyl_locality"></textarea>
										</div>
										<br>
										<p data-translate = "kyp_oR"><strong>OR</strong></p>
										
										<div class="form-group">
											<label for="kwwn_plot" data-translate= "_select_ward">Select Ward </label><!-- <span class="mandatory">*</span> -->
											<select class="form-control" id="kyp1_ward" name="kyp1_ward">
												<option value="">Select Ward</option>
											</select>
										</div>
										
										<!-- <div class="form-group">
											<label for="kyl_building_id" data-translate = "bid_placeHolder">Building ID</label>
											<input type="text" data-translate="bid_placeHolder" class="form-control" id="kyl_building_id" name="kyl_building_id" placeholder="Building ID">
										</div>
										
										<p data-translate = "kyp_or"><strong>Or</strong></p> -->
										
										<div class="form-group">
											<label for="kyl_plot" data-translate = "plot_placeHolder">Plot Number</label>
											<input type="text" data-translate="plot_placeHolder" class="form-control" id="kyl_plot" name="kyl_plot" placeholder="Plot Number">
										</div>
										
										 <!-- <p data-translate = "kyp_or"><strong>Or</strong></p> -->	
										
										
										<div class="text-center">
											<button type="submit" id="kyp_submit" class="btn btn-indore" data-translate = "search">Search</button>
											<button type="reset" id="kyp_clear" class="btn btn-indore" data-translate = "_clear"> Clear</button>
										</div>
										
									</form>	
								<!-- <div class="layer-content scrollar" id="kyp_result"></div> -->
							  </div>
							  <div class="tab-pane container fade p-0" id="kyp">
								<p data-translate = "kyp_note">Note: To view the property details, Performed the identifier operation on the plot point.</p>
								
									<form id="form1_kyp">
										<div class="form-group">
											<label for="kwwn_plot" data-translate= "_select_ward">Select Ward </label><span class="mandatory">*</span>
											<select class="form-control" id="kyp_ward" name="kyp_ward">
												<option value="">Select Ward</option>
											</select>
										</div>
										
										<div class="text-center">
											<button type="submit"  class="btn btn-indore" data-translate = "search">Search</button>
											<button type="reset" class="btn btn-indore" id="kyp_byward_clear_event" data-translate = "_clear">Clear</button>
										</div>
									</form>	
									<!-- <div class="layer-content scrollar" id="kyp1_result"></div> -->
							  </div>
							
								<div class="tab-pane container" id="kyp_final_result">
									<div class="query-result" id="know_your_property_rslt"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			 
			
			</div>
		</div>	
	</div>
	
	<!--know_your_property popup start-->
	
	<!--From_to_location popup start-->
		<div class="layer-popup layer-resize" id="from_to_location">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_from_location_to_location">Direction</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
			
			
			<!-- <div id="direction_map"></div> -->
			
				<p data-translate = "_note_for_from_to_location">Note: To get direction please set from & to location and please click on Map</p>
				
				<form id = "form_direction">
					<div class="form-group">
						<label for="from_loc" data-translate = "_from_location">From Location By Coordinate</label>
						<input type="text" class="form-control" id="from_loc" name= "from_loc" data-translate = "_enter_from_location" placeholder="Enter From Location" readonly>
						<div class="late-fromto">
							<img  id="dir_current_latitude" src="${context}/images/icons/Latitude1-14.svg" title="Current Location">
							<img id="dir_selected_latitude" src="${context}/images/icons/Latitude2-15.svg" title="Location By Map Click">
						</div>
					</div>
					<div class="form-group">
						<label for="to_loc" data-translate = "_to_location">To Location By Coordinate</label>
						<input type="text" class="form-control" id="to_loc" name = "to_loc" data-translate = "_enter_to_location" placeholder="Enter To Location" readonly>
						<div class="late-fromto">
							<img  id="dir_current_longitude" src="${context}/images/icons/Latitude1-14.svg" title="Current Location">
							<img id="dir_selected_long" src="${context}/images/icons/Latitude2-15.svg" title="Location By Map Click">
						</div>
					</div>
					
					<div class="text-center">
						<!-- <a href="javascript:void(0);" class="btn btn-indore" id="locationApply">Apply</a> -->
						<button type = "submit"  class="btn btn-indore" id="locationApply" data-translate = "_apply">Apply</button>
						<button type = "reset" class="btn btn-indore" id="locationClr" data-translate = "_clear_location">Clear Location</button>
					</div>
					
					</form>
					
					<p class="direction-or" data-translate = "kyp_oR"><strong>OR</strong></p>
					
					<form id="form_direction_by_name">
					
					<div class="form-group">
						<label for="from_loc_name" data-translate = "_from_location_by_name">From Location By Name</label>
						<input type="text" class="form-control fa fa-times" id="from_loc_name" name= "from_loc_name" data-translate = "_enter_from_location" placeholder="Enter From Location">
						
					</div>
					<div class="form-group">
						<label for="to_loc" data-translate = "_to_location_by_name">To Location By Name</label>
						<input type="text" class="form-control" id="to_loc_name" name = "to_loc_name" data-translate = "_enter_to_location" placeholder="Enter To Location">
					</div>
					
					<div class="text-center">
						<!-- <a href="javascript:void(0);" class="btn btn-indore" id="locationApply">Apply</a> -->
						<button type = "submit"  class="btn btn-indore" id="locationApplyByName" data-translate = "_apply">Apply</button>
						<button type = "reset" class="btn btn-indore" id="locationClrByName" data-translate = "_clear_location">Clear Location</button>
					</div>
					
					</form>
				
				<div class="query-result" id="direction_distance"><p id="total_distance"></p></div>
			</div>
		</div>	
	</div>
	<!--From_to_location popup end-->
	
	
	
	<!--Aut_announcement popup start-->
	<div class="layer-popup layer-resize" id="aut_announcement">
			<div  class="layers">
				<div class="layer-title-main">
					<h3 class="layer-title mr-auto" data-translate="_authority_announcement">City Announcements</h3>
					<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
					<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
				</div>	
				<div class="layer-content scrollar" id="announce_block">
				</div>
			</div>	
	</div>
	<!--Aut_announcement popup end-->
	
	
	
	
	<!--Add_data popup start-->
		<div class="layer-popup layer-resize" id="add_data">
			<div  class="layers">
				<div class="layer-title-main">
					<h3 class="layer-title mr-auto" data-translate="_add_data">Add Data</h3>
					<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
					<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
				</div>	
				<div class="layer-content scrollar">
					<form id="form_addData">
						<div class="form-group">
							<label for="ad_name" data-translate = "_name">Name</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="ad_name" name="ad_name" data-translate = "pholder_fsc_name" placeholder="Enter Name">
						</div>
						<div class="form-group">
							<label for="ad_simage" data-translate = "_select_image">Select Image</label><span class="mandatory">*</span>
							<input type="file" multiple class="form-control" id="ad_simage" name="ad_simage" accept="image/jpg, image/jpeg, image/png, image/JPG, image/JPEG, image/PNG">
						</div>
						<div class="form-group">
							<label for="ad_latitude" data-translate = "_latitude">Latitude</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="ad_latitude" name="ad_latitude" data-translate = "pholder_lat" placeholder="Enter Latitude">
							<div class="late-fromto">
								<img src="${context}/images/icons/Latitude1-14.svg" id="add_current_lat" title="Current Location">
								<img src="${context}/images/icons/Latitude2-15.svg" id="add_selected_lat" title="Location By Map Click">
							</div>
						</div>
						<div class="form-group">
							<label for="ad_longitude" data-translate = "_longitude">Longitude</label><span class="mandatory">*</span>
							<input type="text" class="form-control" id="ad_longitude" name="ad_longitude" data-translate = "pholder_long" placeholder="Enter Longitude">
							<div class="late-fromto">
								<img src="${context}/images/icons/Latitude1-14.svg" id="add_current_long" title="Current Location">
								<img src="${context}/images/icons/Latitude2-15.svg" id="add_selected_long" title="Location By Map Click">
							</div>
						</div>
						<div class="form-group">
							<label for="ad_remark" data-translate = "_remark">Remark</label>
							<textarea class="form-control" rows="2" id="ad_remark" name="ad_remark"></textarea>
						</div>
						<div class="text-center">
							<button type="submit" class="btn btn-indore" data-translate = "_submit">Submit</button>
							<button type="reset" class="btn btn-indore" id="clear_add_data" data-translate = "_clear">Clear</button>
						</div>
					</form>
					
				</div>
			</div>	
	</div>
	<!--Add_data popup end-->
	
	
	<!--Add_Layer popup start-->
		<div class="layer-popup layer-resize" id="add_layer">
			<div  class="layers">
				<div class="layer-title-main">
					<h3 class="layer-title mr-auto" data-translate = "_add_layer">Add Layer</h3>
					<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
					<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
				</div>	
				<div class="layer-content scrollar">
				<p data-translate = "_add_layer_note">Note: To add shapefiles select zipped folder containing (.shp, .shx, .prj etc.) file formats & to add KML select .kmz or .kml files.</p>
					<form id="form_addLayer" method ="post" enctype="multipart/form-data">
						<div class="form-group">
							<label for="ad_simage" data-translate = "_add_layer_file">Select File</label><span class="mandatory">*</span>
							<input type="file" class="form-control" name="file" id="inFile" >
						</div>
						<div class="text-center">
							<button type="submit" class="btn btn-indore" data-translate = "_submit">Submit</button>
							<button type="reset" class="btn btn-indore" id="clear_add_layer" data-translate = "_clear">Clear</button>
						</div>
					</form>
				</div>
			</div>	
	</div>
	<!--Add_Layer popup end-->
	
	
	<!--Feedback_suggestion popup start-->
		<div class="layer-popup layer-resize" id="feedback_suggestion">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate="_feedback_and_suggestion">Feedback & Suggestion</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content scrollar">
				<form id="form_feedback">
					<div class="form-group" id="feedback_type">
						<label class="radio-inline"><input type="radio" name="fs"  value= "Feedback"  checked>Feedback</label>
						<label class="radio-inline"><input type="radio" name="fs"  value="Suggestion" >Suggestion</label>
						<label class="radio-inline"><input type="radio" name="fs"  value="Complaint" >Complaint</label>
					</div>
					<div class="form-group">
						<label for="fs_category" data-translate="_select_department">Select Department</label><span class="mandatory">*</span>
						<select class="form-control pb-1" id="fs_category" name="fs_category">
							<!-- <option value="">Select Category</option> -->
						<!-- 	<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option> -->
						</select>
					</div>
					<div class="form-group">
						<label for="fs_comment" data-translate="_comment">Comment</label>
						<textarea class="form-control" rows="1" id="fs_comment" name="fs_comment" data-translate="pholder_comment"></textarea>
					</div>
					<div class="form-group">
						<label for="fs_name" data-translate="_name">Name</label>
						<input type="text" class="form-control" id="fs_name" name="fs_name" data-translate = "pholder_fsc_name" placeholder="Enter Name">
					</div>
					<div class="form-group">
						<label for="fs_address" data-translate="_address">Address</label>
						<textarea class="form-control" rows="1" id="fs_address" name="fs_address" data-translate="pholder_fs_address"></textarea>
					</div>
					<div class="form-group">
						<label for="fs_city" data-translate="_city">City</label>
						<input type="text" class="form-control" id="fs_city" name="fs_city" data-translate = "pholder_fsc_city" placeholder="Enter City">
					</div>
					<div class="form-group">
						<label for="fs_pincode" data-translate="_pincode">Pincode</label>
						<input type="text" class="form-control" id="fs_pincode" name="fs_pincode" data-translate = "pholder_fsc_pincode" placeholder="Enter Pincode">
					</div>
					<div class="form-group">
						<label for="fs_mobno" data-translate="_mobile_number">Contact Number</label>
						<input type="text" class="form-control" id="fs_mobno" name="fs_mobno" data-translate = "pholder_fsc_mnumber" placeholder="Enter Mobile Number">
					</div>
					<div class="form-group">
						<label for="fs_email" data-translate="_email_id">Email Id</label><span class="mandatory">*</span>
						<input type="email" class="form-control" id="fs_email" name="fs_email" data-translate = "pholder_fsc_emil" placeholder="Enter Email">
					</div>
					<div class="form-group">
						<label for="fs_latitude" data-translate="_latitude">Latitude</label><span class="mandatory">*</span>
						<input type="text" class="form-control" id="fs_latitude" name="fs_latitude" data-translate = "pholder_lat" placeholder="Enter Latitude">
						<div class="late-fromto">
							<img src="${context}/images/icons/Latitude1-14.svg" id="current_latitude" title="Current Location">
							<img src="${context}/images/icons/Latitude2-15.svg" id="selected_latitude" title="Location By Map Click">
						</div>
					</div>
					<div class="form-group">
						<label for="fs_longitude" data-translate = "_longitude">Longitude</label><span class="mandatory">*</span>
						<input type="text" class="form-control" id="fs_longitude" name="fs_longitude" data-translate = "pholder_long" placeholder="Enter Longitude">
						<div class="late-fromto">
							<img src="${context}/images/icons/Latitude1-14.svg" id="current_longitude" title="Current Location">
							<img src="${context}/images/icons/Latitude2-15.svg" id="selected_longitude" title="Location By Map Click">
						</div>
					</div>
					<div class="form-group">
						<label for="fs_upfile" data-translate = "_upload_file">Upload File</label><span class="mandatory">*</span>
						<input type="file" multiple class="form-control" id="fs_upfile" name="fs_upfile">
					</div>
					
					<div class="text-center mt-3 mb-3">
						<button type="submit" class="btn btn-indore" data-translate = "_submit">Submit</button>
						<button type="reset" class="btn btn-indore" id="clear_feedback" data-translate = "_clear">Clear</button>
					</div>
				</form>
				
			</div>
		</div>	
	</div>
	<!--Feedback_suggestion popup end-->
	
	<!--Go to X, Y Coordinates popup start-->
		<div class="layer-popup layer-resize" id="xyLocation">
			<div class="layers">
				<div class="layer-title-main">
					<h3 class="layer-title mr-auto" data-translate = "_x_y_coordinates">Know Your Coordinates</h3>
					<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
					<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
				</div>	
				<div class="layer-content scrollar">
					<form id="frm_to_location">
							<div class="form-group">
								<label for="xy_latitude" data-translate="_goto_latitude">Latitude (Y)</label><span class="mandatory">*</span>
								<input type="text" class="form-control" id="xy_latitude" name="xy_latitude" placeholder="Enter Latitude" data-translate="pm_projectslocation_elat">
								<div class="late-fromto">
									<img src="${context}/images/icons/Latitude1-14.svg" id="xy_current_lat" title="Current Location">
									<img src="${context}/images/icons/Latitude2-15.svg" id="xy_selected_lat" title="Location By Map Click">
								</div>
							</div>
						
							<div class="form-group">
								<label for="xy_longitude" data-translate="_goto_longitude">Longitude (X)</label><span class="mandatory">*</span>
								<input type="text" class="form-control" id="xy_longitude" name="xy_longitude" placeholder="Enter Longitude" data-translate="pm_projects_location_elong">
								<div class="late-fromto">
									<img src="${context}/images/icons/Latitude1-14.svg" id="xy_current_longitude" title="Current Location">
									<img src="${context}/images/icons/Latitude2-15.svg" id="xy_selected_longitude" title="Location By Map Click">
								</div>
							</div>
						
							<div class="text-center">
								<button type="submit" class="btn btn-indore" data-translate="_go_to">Go To</button>
								<button type="reset" class="btn btn-indore" id="xyLocationClr" data-translate="_clear">Clear</button>
							</div>
					</form>
				</div>
			</div>
		</div>
	<!--Go to X, Y Coordinates popup end-->
	
<!-- 	KNOW YOUR POLICE THANA POPUP START -->
	<div class="layer-popup layer-resize" id="thana_info">
			<div class="layers">
				<div class="layer-title-main">
					<h3 class="layer-title mr-auto" data-translate = "_know_your_thana">Know Your Thana</h3>
					<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
					<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
				</div>	
				<div class="layer-content scrollar">
					<form id="thana_info_form" class="mb-3">
							<div class="form-group">
								<label data-translate="_thana_select_location">Select Location</label>	
							</div>
							<div class="form-group">
								<label for="xy_latitude" data-translate="_latitude">Latitude</label><span class="mandatory">*</span>
								<input type="text" class="form-control" id="thana_xy_latitude" name="thana_xy_latitude" placeholder="Enter Latitude" data-translate="pm_projectslocation_elat" readonly>
								<div class="late-fromto">
									<img src="${context}/images/icons/Latitude1-14.svg" id="thana_xy_current_lat" title="Current Location">
									<img src="${context}/images/icons/Latitude2-15.svg" id="thana_xy_selected_lat" title="Location By Map Click">
								</div>
							</div>
						
							<div class="form-group">
								<label for="xy_longitude" data-translate="_longitude">Longitude</label><span class="mandatory">*</span>
								<input type="text" class="form-control" id="thana_xy_longitude" name="thana_xy_longitude" placeholder="Enter Longitude" data-translate="pm_projects_location_elong" readonly>
								<div class="late-fromto">
									<img src="${context}/images/icons/Latitude1-14.svg" id="thana_xy_current_longitude" title="Current Location">
									<img src="${context}/images/icons/Latitude2-15.svg" id="thana_xy_selected_longitude" title="Location By Map Click">
								</div>
							</div>
						
							<div class="text-center">
								<button type="submit" class="btn btn-indore" data-translate="_submit">Submit</button>
								<button type="reset" class="btn btn-indore" id="thana_xyLocationClr" data-translate="_clear">Clear</button>
							</div>
					</form>
					
					<p class="direction-or" data-translate = "kyp_oR"><strong>OR</strong></p>
					
					<form id="form_kythana_by_name">
						<div class="form-group">
							<label for="from_loc_name" data-translate = "select_locality_thana">Select Locality</label>
							<input type="text" class="form-control fa fa-times" id="thana_licality_name" name= "thana_licality_name" data-translate = "" placeholder="Enter Locality">
						</div>
						<div class="text-center">
							<button type="submit" class="btn btn-indore" data-translate="_submit">Submit</button>
							<button type="reset" class="btn btn-indore" id="thana_locality_Clr" data-translate="_clear">Clear</button>
						</div>
					</form>
					<div class="query-result" id="thana_query_rslt"></div>
					<div class="query-result" id="thana_call_text"></div>
				</div>
			</div>
		</div>
	
<!-- 	KNOW YOUR POLICE THANA POPUP END -->

		<!--Swipe Layer popup start-->
		<div class="layer-popup layer-resize" id="swipeLayerPopup">
			<div class="layers">
				<div class="layer-title-main">
					<h3 class="layer-title mr-auto" data-translate = "_swipe_layer">Swipe Layer</h3>
					<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
					<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
				</div>	
				<div class="layer-content scrollar">
					<form id="form_swipe_layer">
						<div class="form-group">
							<label for="swipe_layer_select" data-translate= "_select_layer">Select Layer</label><span class="mandatory">*</span>
							<select class="form-control pb-1" id="swipe_layer_select" name="swipe_layer_select"></select>
							<div id="swipe_div"><input id="swipe" type="range" value="00" style="width: 280px;" class="form-range" /></div>
						</div>
						<div class="text-center">
								<button type="submit" class="btn btn-indore" data-translate="_swipe">Swipe</button>
								<button type="reset" class="btn btn-indore" id="clear_swipe_layer" data-translate="_clear">Clear</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	<!--Swipe Layer popup end-->
	
	<!--Main sidebar content end-->
	
	<!-- Page Content -->
	<div class="page-content-wrapper">
		
		
		<div class="container-fluid h-100 p-0">
			<jsp:include page="/common/header.jsp" />
			
			
			<div class="map-main">
				<div id="infoDiv">
				    <!--   <input type="button" class="esri-component  esri-interactive"
				        id="2d-map-btn" value="2D"/>
				      <input type="button" class="esri-component  esri-interactive"
				        id="3d-map-btn" value="3D"/> -->
				 <div class="map-func">
					<ul class="nav nav-pills language-ul" id="pills-map-tab" role="tablist">
						<li class="nav-item">
						<a class="nav-link active" id="pills-2D-tab" data-toggle="pill" href="javascript:void(0);pills-2D" aria-controls="pills-2D" aria-selected="true" data-translate="_2d">2D</a>
						</li>
						<li class="nav-item">
						<a class="nav-link" id="pills-3D-tab" data-toggle="pill" href="javascript:void(0);pills-3D" role="tab" aria-controls="pills-3D" aria-selected="false" data-translate="_3d">3D</a></li>
					</ul>
				</div>	       
				        
			    </div>
			    <div id="search"></div>
				<div id="map" class="map h-100 printWholeMap">
				<span id="coordinateDiv"></span>
				<!-- <div id="HomeButton"></div>
				<div id="LocateButton"></div> -->
				<!--  <div id="measurementDiv"></div> -->
				 <div id="swipeDiv"></div>
				 <div id="info"></div>
				 
				 <div id="popup" class="ol-popup">
	                <a href="#" id="popup-closer" class="ol-popup-closer"></a>
	                <div id="popup-content">
	                    <table id="content-id" class="table">
	
	                    </table>
	                </div>
	            </div>
				</div>
			</div>
			
			
			<!--Tools action list -top-->
			<div class="action-start-top">
			
				<ul class="action-ul-top bottom-action" id="downPanel">
					<%-- <li><a id="zoomOutDiv" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_Out.svg"></a></li> --%>
					
					<li title="Home"><a id="myHomeDiv" href="javascript:void(0);"><img src="${context}/images/icons/Home.svg"></a></li>
					<li title="Find My Location"><a id="locateDiv" href="javascript:void(0);"><img  src="${context}/images/icons/Location.svg"></a></li>
					<li title="Clear Map"><a id="clearMap" href="javascript:void(0);"><img src="${context}/images/Clear-Map-68.svg"></a></li>
					<li title="Map Tools">
						<a id="" data-attr="#map_tools" href="javascript:void(0);"><img  src="${context}/images/icons/Map-Tool-19.svg">
						</a>
						<div class="layer-popup action-layer-top div-hidden" id="map_tools" >
							<div class="layers">
								<div class="layer-title-main">
									<h3 class="layer-title mr-auto">
										Map Tool
									</h3>
									<a class="action-layer-close-top-main" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a>
								</div>
								<!--print content-->
								<div class="layer-content maptools-content">
									<ul class="maptools-ul">
										<!-- <li title="Box Zoom In" id="box_zoom_map"><a id="zoomBoxMap" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_In.svg"></a></li>
										<li title="Box Zoom Out" id="box_zoom_out_map"><a id="zoomOutBoxMap" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_Out.svg"></a></li> -->
										<li title="Pan" id="toggle_map_pan"><a id="panDiv" title="Disable Pan" href="javascript:void(0);"><img src="${context}/images/icons/pan.svg"></a></li>
										<li title="Swipe Layer" id="swipe_layer_toggle" class="active">
											<a id="swipeLayer" data-attr="#swipeLayerPopup" href="javascript:void(0);"><img src="${context}/images/Swipe-Tool.svg"></a>
										</li>
										<li id="xycoordinate_popup">
											<a title="Know Your coordinates" id="xy-coordinate" data-attr="#xyLocation" href="javascript:void(0);"><img src="${context}/images/icons/Coordinates-37.svg"></a>
										</li>
									</ul>
								</div>
							</div>
							<span></span>
						</div>
					</li>
					<li title="Info"><a id="info_layer" href="javascript:void(0);"><img src="${context}/images/info_tool.svg"></a></li>					
				</ul>
			</div>
			<!--Tools action list -top-->
			
			
			<!--Tools action list-->
			<div class="action-start">
			
				<ul class="action-ul bottom-action" id="downPanel">
					<%-- <li><a id="zoomOutDiv" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_Out.svg"></a></li> --%>
					
					
					<li title="Print" id="print_popup">
						<a href="javascript:void(0);" data-attr="#print">
							<img src="${context}/images/icons/Print.svg">
						</a>
						<div class="layer-popup action-layer div-hidden" id="print">
							<div  class="layers">
								<div class="layer-title-main">
									<h3 class="layer-title mr-auto" data-translate = "_print">print</h3>
									<a class="layer-close action-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
								</div>	
								
								<!-- print content -->

								<div class="layer-content scrollar print-content">
									
									<form id="form_print">
										<div class="form-group">
											<label for="title_name" data-translate = "_print_ptitle">Title Name</label>
											<input type="text" class="form-control" id="title_name" name= "title_name" data-translate = "_print_etitle" placeholder="Enter Title">
										</div>
										<div class="form-group">
											<label for="file_name" data-translate = "_print_pfilename">File Name</label>
											<input type="text" class="form-control" id="file_name" name= "file_name" data-translate = "_print_efilename" placeholder="Enter File Name">
										</div>
										<div class="form-group">
											<label for="print_format" data-translate = "_print_playout">Layout</label>
											<select name="printLayout" id="print_layout_id" class="form-control pb-1">
					                          <option value="a4" selected="selected">A4</option>
					                          <option value="a0">A0 (slow)</option>
					                          <option value="a1">A1</option>
					                          <option value="a2">A2</option>
					                          <option value="a3">A3</option>
					                          <option value="a5">A5</option>
					                        </select>
										</div>
										<div class="form-group">
											<label for="print_format" data-translate = "_print_pformat">Format</label>
											 <select name="printFormat" id="print_format_id" class="form-control pb-1">
						                          <option value="pdf" selected>PDF</option>
						                          <option value="png">PNG</option>
						                          <option value="jpeg">JPG</option>
                                             </select>
										</div>
										<div class="form-group">
											<label for="print_format" data-translate = "_print_porientation">Orientation</label>
											 <select name="printOrientation" id="print_orientation_id" class="form-control pb-1">
						                          <option value="p" selected="selected">Portrait</option>
						                          <option value="l">Landscape</option>
                                             </select>
										</div>
										<div class="text-center">
											<!-- <button type="submit" class="btn btn-indore">Advance</button> -->
											<button type="submit" id="print_submit" class="btn btn-indore printBtn" data-translate = "_print">Print</button>
											<!-- <button type="reset" id="print_reset" class="btn btn-indore">Clear</button> -->
											<a href="#" id="printResult" target="_blank" style="display:none;" data-translate = "_print_gprintout">Get Printout</a>
										</div>
									</form>
								</div>
								
								<!-- <div id="print_button"></div> -->
							</div>
							<span class="arrow-footer"	></span>
						</div>
					</li>
					<li title="Measurement" >
						<a href="javascript:void(0);" data-attr="#mesurment" id="map_measurement">
							<img src="${context}/images/icons/Mesurement-28.svg">
						</a>
						<div class="layer-popup action-layer div-hidden" id="mesurment">
							<div  class="layers">
								<div class="layer-title-main">
									<h3 class="layer-title mr-auto" data-translate = "_measurement">measurement</h3>
									<a class="layer-close action-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
								</div>
								
								<!--measurement content-->
								<div class="layer-content scrollar measurement-content">
									  <div id="measurementDiv"></div>
									  
								</div>
							</div>
							<span class="arrow-footer"></span>
						</div>
					</li>
					<li title="Bookmark">
						<a href="javascript:void(0);" data-attr="#bookmark">
							<img src="${context}/images/icons/Bookmark.svg">
						</a>
						<div class="layer-popup action-layer div-hidden " id="bookmark">
						 <div  class="layers">
								<div class="layer-title-main">
									<h3 class="layer-title mr-auto" data-translate = "_bookmark">bookmark</h3>
									<a class="layer-close action-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
								</div>	
								<!--bookmark content-->
								<div class="layer-content scrollar bookmark-content">
								<!-- <div id="bookmarks"></div> -->
									<div class="bookmark-form">	
								
										<div id="parent-dv">
													<input type="text" id="bookmark_name" value="" class="bookmarkdata-input" placeholder="Add Bookmark" data-translate = "bmark_addbmark">
													<button type="button" id="add-bookmark" class="inputsubmit-btn bookmark-submit"><img src="images/icons/Add_Image-71.svg"></button>
													<div id='bookmark-data' class="bookmark-data"></div>
													<div class="text-center pt-1">
														<button type="button" id="delete-bookmark" class="btn btn-indore" data-translate = "bmark_dbmark">Delete</button>
													</div>	
										</div>
									</div>
								</div>
							</div>
							<span class="arrow-footer"></span>
						</div>
					</li>
					<li title="Share">
						<a href="javascript:void(0);" data-attr="#share"  id="map_share">
							<img src="${context}/images/icons/Share.svg">
						</a>
						<div class="layer-popup action-layer div-hidden" id="share">
							<div  class="layers">
								<div class="layer-title-main">
									<h3 class="layer-title mr-auto" data-translate = "_share">share</h3>
									<a class="layer-close action-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
								</div>	
								<!--share content-->
								<div class="layer-content scrollar share-content">
									<form class="tool-tip-form">
										<div class="form-group">
											<label for="loc_name" data-translate = "_share_title">Share a link to this app</label>
											<input type="text" name="mapt" id="sharelinktxt" placeholder="" value="https://indoresmartcity.com" class="form-control" readonly="" >
										</div>
									</form>
									<a class="tooltip-link" href="javascript:void(0);" data-translate = "_share_linkop">Link Option</a>
									<div class="social-icon">
										<a id="emailLink"><img class="map-side-icon-img" src="${context}/images/icons/Gmail-73.svg" alt=""></a>	
										<a id="facebookLink"><img class="map-side-icon-img" src="${context}/images/icons/Facebook-74.svg" alt=""></a>
										<a id="twitterLink"><img class="map-side-icon-img" src="${context}/images/icons/Twitter-75.svg" alt=""></a>
									</div>
								</div>
								<span class="arrow-footer"></span>
							</div>
						</div>
					</li>
					
					 <li title="Box Zoom In" id="box_zoom_map"><a id="zoomBoxMap" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_In.svg"></a></li>
					<li title="Box Zoom Out" id="box_zoom_out_map"><a id="zoomOutBoxMap" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_Out.svg"></a></li> 
					<!--<li title="Pan" id="toggle_map_pan"><a id="panDiv" title="Disable Pan" href="javascript:void(0);"><img  src="${context}/images/icons/pan.svg"></a></li> 
					<li title="Map Info" id ="toggle_map_info"><a id="mapInfoTool" title="Enable Map Info" href="javascript:void(0);"><img src="${context}/images/Info_tool_26.svg"></a></li>-->
					
					
					<!-- <li title="Clear Map"><a id="clearMap" href="javascript:void(0);"><img src="${context}/images/Clear-Map-68.svg"></a></li>
					<li title="Swipe Layer" id ="swipe_layer_toggle">
						<a id="swipeLayer" data-attr="#swipeLayerPopup" href="javascript:void(0);"><img src="${context}/images/Swipe-Tool.svg"></a>
					</li> -->
					<li title="Custom Scalebar">
						<a href="javascript:void(0);" data-attr="#custom_scalebar"  id="customscalebar">
							<img src="${context}/images/Custom_Scale_bar-17.svg">
						</a>
						<div class="layer-popup action-layer div-hidden" id="custom_scalebar">
							<div  class="layers">
								<div class="layer-title-main">
									<h3 class="layer-title mr-auto" data-translate="_custom_scalebar">Custom Scalebar</h3>
									<a class="layer-close action-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
								</div>	
								<div class="layer-content scrollar share-content">
								<p data-translate="_scale_note">Note: Minimum Scale value is 100 and maximum scale value is 1,00,000.</p>
									<form class="tool-tip-form" id="form_custom_scale">
										<div class="form-group">
											<label for="loc_name" data-translate="_scale">Scale</label>
											<input type="text" name="scale_value" id="scale_value" data-translate="_enter_scale" placeholder="Enter Scale" class="form-control">
										</div>
										<div class="text-center">
											<button type="submit" class="btn btn-indore" data-translate="search">Search</button>
											<button type="reset" id="custom_scale_reset" class="btn btn-indore" data-translate="_clear">Clear</button>
										</div>
									</form>
								</div>
								<span class="arrow-footer"></span>
							</div>
						</div>
					</li>
					
					
					
					
					 <!--<li id="xycoordinate_popup">
						<a title="Know Your coordinates" id="xy-coordinate" data-attr="#xyLocation" href="javascript:void(0);"><img src="${context}/images/icons/Coordinates-37.svg"></a>
					</li> -->
				</ul>
			</div>
			<!--Tools action list-->
		</div>
	</div>
	<!-- /#page-content-wrapper -->
	
	<!-- Add TMC popup start -->
	<div id="tmc_modal" class="modal fade" data-keyboard="false" data-backdrop="static">
	    <div class="modal-dialog modal-dialog-centered modal-lg">
	        <div class="modal-content back-tc-img dep-modal">
	            <div class="modal-header"  style="background: #ffffffe3;">
<!-- 	                <h4 class="modal-title" style="margin: 0 36%;">Indore Smart City Disclaimer</h4> -->
					<h4 class="modal-title" style="margin: 0 42%;">Disclaimer</h4>
	               	
	            </div>
	            <div class="modal-body p-0">
					 
					 <div class="">
		                <div class="back-text p-3">
		                    <p>
		                    	Indore Smart Map Platform are provided for public informational purposes. Indore Smart City does not guarantee and expressly disclaims any responsibility for the content, validity, timeliness and accuracy of the data and information depicted. 
	User expressly agrees that any use of the data and information is at the user's sole risk and user expressly accepts full responsibility and liability for the user's use or transmission of any such data or information in its actual or altered form and any decisions made or action taken in reliance upon any information or data hereunder.
	The data provided is the property of Indore Smart City and is not to be distributed in any form nor used in any manner not explicitly authorized by the Indore Smart City in writing.
	In this website, you shall find hyper links to other websites/portals. We have no control over the nature, content and availability of those web sites/portals. Those links have been placed for your convenience only.
		                    	
		                    </p>
		                    
		                </div>
	                </div>
	            </div>
	            <div class="modal-footer" style="background: #ffffffe3;">
			       <div class="col-12">
	                   	<img class="tmc-img-logo float-left" src="${context}/images/logo-bg.png">
						<button type="submit" class="btn btn-indore float-right mt-3" id="tmc_agree">Agree</button>
					</div>
		      </div>
	        </div>
	    </div>
	</div>
	<div class="modal fade" id="user_notification" tabindex="-1" role="dialog"
			aria-labelledby="resetModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content dep-modal user_authenticationAlert">
						<button type="button" class="close ml-auto authenticate-close" data-dismiss="modal">&times;</button>
					<div class="modal-body text-center" id="user_notification_content">

						<p>You are not an Authorized User !</p><p> In order to add event , Please register to our portal by clicking below </p><p>&nbsp;<a href="${context}/login.jsp" id="reg_link" data-translate="_sign_up">Sign Up</a></p>

					</div>
				</div>
			</div>
		</div>
	<!-- Add TMC popup End -->
	
	<!-- Add Footer  -->
	
	<footer>
		<div class="row footer-mian">
			
			<div class="col-sm-12 col-md-8 col-lg-8">
				<p>Copyright © ISCDL All Rights Reserved  | <a href="${context}/it_policy.jsp" target="_blank" data-translate="_it_policy_heading">IT Policy</a> | <a href="${context}/terms_and_conditions.jsp" target="_blank" data-translate="_tc_heading">Terms &amp; Condition</a>  | <a href="${context}/contact_us.jsp" target="_blank" data-translate="_contact_us">Contact Us</a></p> 
			</div>
			
			<div class="col-sm-12 col-md-4 col-lg-4 text-right">
 				<p class="text-right">Visitor Count: <span class="visitor_count"></span> </p>
			</div>
		</div>
	</footer>
	
</div>
<!-- /#wrapper -->

	
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/jsts/2.0.5/jsts.min.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/jsts/2.0.5/jsts.js"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.7.0/proj4.js"></script>
	
	<script type="text/javascript" src="${context}/js/jquery.min.js"></script>
	<script type="text/javascript" src = "${context}/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${context}/js/popper.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${context}/js/bootstrap-select.js"></script>
	<script type="text/javascript" src="${context}/js/slick.min.js"></script>
	<script type="text/javascript" src="${context}/js/jquery.validate.min.js"></script>
	
	<script type="text/javascript" src="${context}/js/html2canvas.min.js"></script>
	<script type="text/javascript" src="${context}/js/jspdf.min.js"></script>
	<script type="text/javascript" src="${context}/js/JSPDFCenterText.js"></script>
	<script type="text/javascript" src="${context}/js/dashboard/Print.js"></script>
	
	
	<script type="text/javascript" src="${context}/js/moment.min.js"></script>
	<script type="text/javascript" src="${context}/js/daterangepicker.min.js"></script>
	
	<script type="text/javascript" src="${context}/js/toastr.min.js"></script>
	<script type="text/javascript" src="${context}/js/utils.js"></script>
	<script type="text/javascript" src="${context}/js/esri/esri-api-3-30.js"></script>
	
	<script type="text/javascript" src="${context}/js/dashboard/bookmark.js"></script>
	
	<%-- <script type="text/javascript" src="${context}/js/citizenmap.js"></script> --%>
	<script type="text/javascript" src="${context}/js/created/appData.js"></script>
	<script type="text/javascript" src="${context}/js/developer/citizen_map_constant.js"></script>
	<script type="text/javascript" src="${context}/js/developer/layersData.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
	<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
		
	<script type="text/javascript" src="${context}/js/developer/dep_share_controller.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/event_controller.js"></script>
	<script type="text/javascript" src="${context}/js/developer/announcement.js"></script>
	<script type="text/javascript" src="${context}/js/developer/ward_info_controller.js"></script>
	<script type="text/javascript" src="${context}/js/developer/add_data_controller.js"></script>
	<script type="text/javascript" src="${context}/js/developer/feedback_suggestion.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/formValidations.js"></script>
	<script type="text/javascript" src="${context}/js/developer/citizen_map_controller.js"></script>
	
	<script type="text/javascript" src="${context}/js/developer/feature_management.js"></script>
	<script type="text/javascript" src="${context}/js/created/map_2d.js"></script>
	
	<script type="text/javascript" src="${context}/js/citizenmap.js"></script>
	
</body>
</html>