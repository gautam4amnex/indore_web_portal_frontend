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
	<link rel="stylesheet" href="${context}/css/font-awesome.min.css">
	<link rel="stylesheet" href="${context}/css/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="${context}/css/daterangepicker.css" />
	<link rel="stylesheet" href="${context}/css/toastr.css">	
	<link rel="stylesheet" href="${context}/css/esri/api-4-14.css">
	<link rel="stylesheet" href="${context}/css/style.css">
	<link rel="stylesheet" href="${context}/css/citizenmap.css">
	
	<style>
        .cesium-viewer-toolbar {
            display: none !important;
        }
        .cesium-viewer-bottom{
            display: none !important;
        }
    </style>
    <script src="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Cesium.js"></script>
    <link href="https://cesium.com/downloads/cesiumjs/releases/1.104/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
	
</head>

<body>
<div class="loader"></div>	
<!-- wrapper -->
<div class="d-flex col-12 p-0 wrapper"> 
	
	<!-- Sidebar -->
	<div class="nav-main">
		<a href="javascript:void(0);" class="side-menu-click">
			<i class="fa fa-bars" aria-hidden="true"></i>
		</a>
		<%-- <div class="city-logo"><img src="${context}/images/Indore_Smart_City_Logo.png"></div> --%>
		<div class="city-logo"><a href id="city_logo"><img src="${context}/images/SmartCityLogo.jpg"></a></div>
		<ul class="nav-ul-citi" id="leftPanel">
		<li data-toggle="tooltip" title="Basemap Gallery">
				<a href="javascript:void(0);" data-attr="#basemap_gallery">
				
					<svg version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
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
				</a>
			</li>
			<li data-toggle="tooltip" title="Layers">
				<a href="javascript:void(0);" data-attr="#layers">
				
					<svg version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
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
<!-- 					<span class="menu-name" data-translate = "_draw">Draw</span> -->
				</a>
			</li>
			
			<!-- 
			<li data-toggle="tooltip" title="Heritage Building">
				<a target= "_blank" href="${context}/heritage_buildings.jsp">
					<svg class="small-icon" version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
					 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="25px"
					 viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
				<metadata>
					<sfw  xmlns="&ns_sfw;">
						<slices></slices>
						<sliceSourceBounds  width="190.009" height="585" y="-585" x="-0.009" bottomLeftOrigin="true"></sliceSourceBounds>
						<optimizationSettings>
							<targetSettings  fileFormat="PNG24Format" targetSettingsID="0">
								<PNG24Format  transparency="true" filtered="false" interlaced="false" matteColor="#FFFFFF" noMatteColor="false">
									</PNG24Format>
							</targetSettings>
						</optimizationSettings>
					</sfw>
				</metadata>
				<g>
					<path fill-rule="evenodd" clip-rule="evenodd" fill="#855439" d="M1.067,50c-0.282,0-0.549-0.111-0.753-0.315
						C0.115,49.491,0,49.216,0,48.931c0-0.282,0.111-0.55,0.313-0.751c0.203-0.203,0.47-0.315,0.753-0.315h2.1V21.368H2.579
						c-0.279,0-0.552-0.112-0.752-0.31c-0.2-0.202-0.315-0.478-0.315-0.757V12.02c0-0.285,0.112-0.554,0.314-0.755
						c0.197-0.2,0.464-0.311,0.753-0.311H5.42L24.476,0.142C24.631,0.05,24.813,0,24.999,0c0.188,0,0.37,0.05,0.528,0.144l19.148,10.835
						l2.745-0.024c0.284,0,0.56,0.113,0.755,0.311c0.201,0.201,0.313,0.47,0.313,0.755v8.282c0,0.279-0.114,0.555-0.314,0.755
						c-0.199,0.199-0.474,0.312-0.752,0.312h-0.589v26.496h2.098c0.286,0,0.555,0.112,0.757,0.315C49.889,48.381,50,48.648,50,48.931
						c0,0.285-0.115,0.561-0.315,0.756C49.485,49.889,49.217,50,48.931,50H1.067z M44.697,47.864V21.368H5.303v26.496h13.531V36.106
						c0-0.276,0.114-0.552,0.313-0.753c0.204-0.202,0.473-0.313,0.756-0.313h10.195c0.287,0,0.555,0.11,0.755,0.313
						c0.2,0.201,0.313,0.476,0.313,0.753v11.758H44.697z M29.031,47.864V37.173h-8.062v10.691H29.031z M46.353,19.232v-6.147H3.647
						v6.147H46.353z M40.301,10.954L24.999,2.291L9.7,10.954H40.301z M40.293,45.671c-0.276,0-0.551-0.112-0.751-0.309
						c-0.2-0.201-0.315-0.477-0.315-0.757v-2.699c0-0.285,0.111-0.553,0.313-0.755c0.204-0.204,0.472-0.315,0.753-0.315
						c0.283,0,0.551,0.111,0.756,0.315c0.202,0.202,0.313,0.47,0.313,0.755v2.699c0,0.281-0.114,0.556-0.313,0.756
						C40.848,45.559,40.573,45.671,40.293,45.671z M35.197,45.671c-0.281,0-0.555-0.112-0.755-0.309c-0.2-0.2-0.314-0.476-0.314-0.757
						v-2.699c0-0.285,0.111-0.553,0.313-0.755c0.204-0.204,0.472-0.315,0.756-0.315c0.281,0,0.549,0.111,0.752,0.315
						c0.203,0.202,0.314,0.47,0.314,0.755v2.699c0,0.28-0.113,0.555-0.311,0.755C35.746,45.562,35.478,45.671,35.197,45.671z
						 M14.803,45.671c-0.279,0-0.553-0.112-0.752-0.309c-0.2-0.2-0.314-0.476-0.314-0.757v-2.699c0-0.285,0.111-0.553,0.313-0.755
						c0.198-0.2,0.473-0.315,0.753-0.315c0.284,0,0.551,0.111,0.755,0.315c0.203,0.202,0.314,0.47,0.314,0.755v2.699
						c0,0.281-0.114,0.556-0.314,0.756C15.352,45.562,15.084,45.671,14.803,45.671z M9.707,45.671c-0.281,0-0.548-0.109-0.753-0.309
						c-0.201-0.201-0.316-0.476-0.316-0.757v-2.699c0-0.285,0.111-0.553,0.314-0.755c0.204-0.204,0.472-0.315,0.755-0.315
						c0.283,0,0.551,0.111,0.755,0.315c0.201,0.204,0.312,0.472,0.312,0.755v2.699c0,0.279-0.113,0.555-0.311,0.755
						C10.256,45.562,9.988,45.671,9.707,45.671z M40.293,39.873c-0.274,0-0.549-0.111-0.75-0.308c-0.201-0.203-0.316-0.479-0.316-0.759
						v-2.7c0-0.279,0.114-0.554,0.313-0.753c0.2-0.202,0.468-0.313,0.753-0.313c0.287,0,0.555,0.11,0.756,0.313
						c0.199,0.198,0.313,0.474,0.313,0.753v2.7c0,0.281-0.114,0.557-0.313,0.756C40.848,39.761,40.573,39.873,40.293,39.873z
						 M35.197,39.873c-0.281,0-0.555-0.112-0.755-0.31c-0.2-0.199-0.314-0.476-0.314-0.757v-2.7c0-0.28,0.114-0.555,0.313-0.755
						c0.201-0.2,0.469-0.311,0.756-0.311c0.284,0,0.553,0.11,0.752,0.313c0.199,0.198,0.314,0.473,0.314,0.753v2.7
						c0,0.28-0.113,0.556-0.311,0.755C35.744,39.764,35.477,39.873,35.197,39.873z M14.803,39.873c-0.278,0-0.552-0.112-0.751-0.31
						c-0.2-0.199-0.315-0.476-0.315-0.757v-2.7c0-0.28,0.114-0.555,0.313-0.755c0.197-0.2,0.465-0.311,0.753-0.311
						c0.287,0,0.555,0.11,0.755,0.313c0.2,0.198,0.314,0.474,0.314,0.753v2.7c0,0.281-0.114,0.557-0.314,0.756
						C15.351,39.764,15.083,39.873,14.803,39.873z M9.707,39.873c-0.28,0-0.547-0.109-0.753-0.308c-0.202-0.202-0.316-0.478-0.316-0.759
						v-2.7c0-0.279,0.114-0.555,0.314-0.755c0.201-0.2,0.469-0.311,0.755-0.311c0.285,0,0.553,0.11,0.753,0.313
						c0.199,0.199,0.313,0.474,0.313,0.753v2.7c0,0.279-0.113,0.555-0.311,0.755C10.255,39.764,9.987,39.873,9.707,39.873z
						 M40.293,34.074c-0.285,0-0.553-0.11-0.753-0.311c-0.199-0.2-0.313-0.476-0.313-0.755v-2.7c0-0.279,0.111-0.547,0.312-0.753
						c0.204-0.2,0.479-0.313,0.755-0.313c0.28,0,0.555,0.112,0.754,0.311c0.204,0.208,0.315,0.477,0.315,0.756v2.7
						c0,0.28-0.114,0.556-0.313,0.755C40.854,33.961,40.578,34.074,40.293,34.074z M35.197,34.074c-0.286,0-0.562-0.113-0.757-0.311
						c-0.201-0.202-0.313-0.471-0.313-0.755v-2.7c0-0.281,0.114-0.556,0.313-0.755c0.2-0.198,0.475-0.312,0.756-0.312
						c0.28,0,0.548,0.109,0.752,0.311c0.203,0.209,0.314,0.477,0.314,0.756v2.7c0,0.279-0.113,0.555-0.311,0.755
						C35.752,33.964,35.482,34.074,35.197,34.074z M30.098,34.074c-0.287,0-0.555-0.11-0.756-0.311
						c-0.197-0.201-0.311-0.477-0.311-0.755v-2.7c0-0.278,0.113-0.554,0.311-0.754c0.207-0.202,0.475-0.313,0.756-0.313
						c0.277,0,0.552,0.112,0.754,0.311c0.2,0.202,0.314,0.478,0.314,0.756v2.7c0,0.277-0.113,0.553-0.313,0.755
						C30.653,33.964,30.385,34.074,30.098,34.074z M24.999,34.074c-0.285,0-0.553-0.11-0.753-0.311
						c-0.199-0.199-0.313-0.475-0.313-0.755v-2.7c0-0.279,0.111-0.547,0.312-0.753c0.206-0.2,0.48-0.313,0.755-0.313
						c0.279,0,0.554,0.112,0.754,0.311c0.203,0.208,0.314,0.477,0.314,0.756v2.7c0,0.28-0.115,0.556-0.313,0.755
						C25.56,33.961,25.284,34.074,24.999,34.074z M19.902,34.074c-0.285,0-0.553-0.11-0.753-0.311c-0.2-0.201-0.315-0.477-0.315-0.755
						v-2.7c0-0.276,0.111-0.544,0.312-0.752c0.21-0.204,0.479-0.314,0.757-0.314s0.552,0.112,0.752,0.311
						c0.2,0.2,0.315,0.476,0.315,0.756v2.7c0,0.28-0.114,0.556-0.314,0.755C20.458,33.964,20.191,34.074,19.902,34.074z M14.803,34.074
						c-0.288,0-0.556-0.11-0.754-0.311c-0.198-0.199-0.313-0.475-0.313-0.755v-2.7c0-0.281,0.114-0.556,0.313-0.755
						c0.2-0.198,0.475-0.312,0.753-0.312c0.281,0,0.548,0.109,0.753,0.311c0.201,0.2,0.316,0.476,0.316,0.756v2.7
						c0,0.284-0.111,0.553-0.314,0.755C15.358,33.964,15.09,34.074,14.803,34.074z M9.707,34.074c-0.287,0-0.555-0.11-0.755-0.311
						c-0.2-0.199-0.314-0.475-0.314-0.755v-2.7c0-0.279,0.111-0.547,0.312-0.753c0.208-0.203,0.477-0.313,0.757-0.313
						s0.548,0.109,0.753,0.311c0.203,0.21,0.313,0.479,0.313,0.756v2.7c0,0.278-0.113,0.554-0.311,0.755
						C10.262,33.964,9.993,34.074,9.707,34.074z M40.293,28.279c-0.281,0-0.549-0.111-0.753-0.315c-0.202-0.202-0.313-0.47-0.313-0.754
						v-2.7c0-0.282,0.111-0.549,0.313-0.75c0.204-0.204,0.472-0.315,0.753-0.315c0.282,0,0.558,0.115,0.756,0.315
						c0.202,0.201,0.313,0.468,0.313,0.75v2.7c0,0.285-0.111,0.552-0.313,0.754C40.852,28.164,40.576,28.279,40.293,28.279z
						 M35.197,28.279c-0.283,0-0.559-0.115-0.757-0.315c-0.201-0.202-0.313-0.47-0.313-0.754v-2.7c0-0.282,0.111-0.549,0.313-0.75
						c0.197-0.2,0.473-0.315,0.756-0.315s0.551,0.111,0.754,0.315c0.201,0.202,0.313,0.469,0.313,0.75v2.7
						c0,0.283-0.111,0.55-0.311,0.754C35.748,28.168,35.479,28.279,35.197,28.279z M30.098,28.279c-0.283,0-0.551-0.111-0.756-0.315
						c-0.201-0.204-0.311-0.472-0.311-0.754v-2.7c0-0.282,0.113-0.557,0.313-0.752c0.203-0.202,0.471-0.313,0.754-0.313
						s0.553,0.111,0.755,0.315c0.199,0.195,0.313,0.469,0.313,0.75v2.7c0,0.281-0.111,0.548-0.313,0.754
						C30.649,28.168,30.381,28.279,30.098,28.279z M24.999,28.279c-0.282,0-0.549-0.111-0.753-0.315
						c-0.202-0.202-0.313-0.47-0.313-0.754v-2.7c0-0.282,0.112-0.549,0.313-0.75c0.204-0.204,0.472-0.315,0.753-0.315
						c0.281,0,0.557,0.115,0.756,0.315c0.201,0.201,0.313,0.468,0.313,0.75v2.7c0,0.284-0.112,0.552-0.313,0.754
						C25.556,28.164,25.281,28.279,24.999,28.279z M19.902,28.279c-0.282,0-0.549-0.111-0.753-0.315
						c-0.203-0.203-0.315-0.47-0.315-0.754v-2.7c0-0.278,0.111-0.545,0.313-0.75c0.208-0.204,0.476-0.315,0.756-0.315
						c0.281,0,0.555,0.115,0.754,0.315c0.198,0.192,0.313,0.466,0.313,0.75v2.7c0,0.285-0.111,0.552-0.314,0.754
						C20.458,28.164,20.184,28.279,19.902,28.279z M14.803,28.279c-0.28,0-0.555-0.115-0.754-0.315c-0.201-0.202-0.313-0.47-0.313-0.754
						v-2.7c0-0.284,0.115-0.558,0.315-0.753c0.196-0.198,0.471-0.313,0.751-0.313c0.284,0,0.551,0.111,0.755,0.315
						c0.203,0.201,0.314,0.468,0.314,0.75v2.7c0,0.285-0.111,0.552-0.314,0.754C15.354,28.168,15.087,28.279,14.803,28.279z
						 M9.707,28.279c-0.284,0-0.551-0.111-0.755-0.315c-0.203-0.202-0.314-0.469-0.314-0.754v-2.7c0-0.282,0.111-0.549,0.314-0.751
						c0.204-0.203,0.472-0.314,0.755-0.314c0.283,0,0.551,0.111,0.755,0.315c0.201,0.203,0.312,0.47,0.312,0.75v2.7
						c0,0.282-0.11,0.549-0.311,0.754C10.258,28.168,9.99,28.279,9.707,28.279z"/>
				</g>
				</svg>
				Heritage Building					
				</a>
			</li>  --> 
			
		</ul>
	</div>
	<!-- /#sidebar-wrapper -->
	
	
	<!--Main sidebar content start-->
	
<!-- 	Basemap Gallery popup start -->
		<div class="layer-popup layer-resize" id="basemap_gallery">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate = "_basemap_gal">Basemap Gallery</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content" >
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
			<div class="layer-content">
				<div id="layersDiv">
					
				</div>
			</div>
		</div>
	</div>
	<!--Layer popup end-->
	
	
	
	<!--Draw_tools popup start-->
	<div class="layer-popup layer-resize" id="draw_tools">
		<div  class="layers">
			<div class="layer-title-main">
				<h3 class="layer-title mr-auto" data-translate = "_draw">Draw</h3>
				<a class="layer-close side-layer-resize" href="javascript:void(0);"> <img class="map-side-icon-img" src="${context}/images/Minimize-23.svg" alt=""> </a>
				<a class="layer-close side-layer-close" href="javascript:void(0);"><img class="map-side-icon-img" src="${context}/images/icons/Close-61.svg" alt=""></a> 
			</div>	
			<div class="layer-content">
				<label data-translate = "_select_draw_mode">Select Draw Mode</label>
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
					<li>
						<a href="javascript:void(0);" data-attr="#multiple_line" title="Polyline">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<polyline fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="2.0" stroke-miterlimit="22.9256" points="
									12.168,35.488 20.957,23.301 27.754,27.507 37.832,14.512 	"/>
							</g>
							</svg>
						</a>
					</li>
				
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
								<line id="lineSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="2.0" stroke-miterlimit="22.9256" x1="16.563" y1="33.438" x2="33.438" y2="16.563"/>
						</g>
						</svg>
					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="line_color" data-translate = "_draw_color">Color</label>
								<input type="color" class="form-control" id="line_color" >
							</div>
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
						<label>Preview</label>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
						<g>
							<!-- <rect x="0.001" fill-rule="evenodd" clip-rule="evenodd" fill="#fff" width="49.998" height="50"/> -->
							<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
							
								<polygon id="triangleSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" points="
								24.999,15.487 30.492,25 35.985,34.513 24.999,34.513 14.015,34.513 19.508,25 	"/>
						</g>
						</svg>

					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="t_s_color">Stroke Color</label>
								<input type="color" class="form-control" id="t_s_color" >
							</div>
							
							<div class="form-group">
								<label for="t_b_width">Border Width</label>
								<select class="form-control pb-1" id="t_b_width">
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="t_f_color">Fill Color</label>
								<input type="color" class="form-control" id="t_f_color" >
							</div>
							
							
						</form>
					</div>
				</div>
				
				<div class="draw-tools-set div-hidden" id ="square_tool">
					<div class="title-tools-sub d-flex">
						<label>Preview</label>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rectfill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<rect id="recatangleSvg" x="14.453" y="14.453" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" width="21.094" height="21.094"/>
							</g>
							</svg>

					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="t_s_color">Stroke Color</label>
								<input type="color" class="form-control" id="s_s_color" >
							</div>
							
							<div class="form-group">
								<label for="t_b_width">Border Width</label>
								<select class="form-control pb-1"" id="s_b_width">
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="t_f_color">Fill Color</label>
								<input type="color" class="form-control" id="s_f_color" >
							</div>
							
							
						</form>
					</div>
				</div>
				
				<div class="draw-tools-set div-hidden" id ="circle_tool">
					<div class="title-tools-sub d-flex">
						<label>Preview</label>
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
							<g>
								<rect fill-rule="evenodd" clip-rule="evenodd" fill="#EDE4D8" width="50" height="50"/>
								
									<path id= "circleSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#732F31" stroke-width="1.2497" stroke-miterlimit="22.9256" d="
									M25,35.254c5.649,0,10.254-4.605,10.254-10.254c0-5.647-4.604-10.254-10.254-10.254c-5.647,0-10.254,4.607-10.254,10.254
									C14.746,30.648,19.353,35.254,25,35.254z"/>
							</g>
							</svg>


					</div>
					<div class="draw-form-tools">
						<form>
							<div class="form-group">
								<label for="t_s_color">Stroke Color</label>
								<input type="color" class="form-control" id="c_s_color" >
							</div>
							
							<div class="form-group">
								<label for="t_b_width">Border Width</label>
								<select class="form-control pb-1" id="c_b_width">
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="6">6</option>
									<option value="8">8</option>
									<option value="10">10</option>
								</select>
							</div>
							
							<div class="form-group">
								<label for="t_f_color">Fill Color</label>
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
							
								<polygon id="polygonSvg" fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#000000" stroke-width="2.0" stroke-miterlimit="22.9256" points="
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
						<label>Preview</label>
						<label class="text-preview" id="lblDrawTxt" style="font-size: 12px;"></label>
					</div>
					<div class="draw-form-tools">
						<form>
						<div class="form-group">
							<label for="tool_text">Text</label>
							<input type="text" class="form-control" id="tool_text" placeholder="Type">
						</div>
						<div class="form-group">
							<label for="tool_fontcolor">Font Color</label>
							<input type="color" class="form-control" id="tool_fontcolor">
						</div>
						<div class="form-group">
							<label for="tool_fontsize">Font Size</label>
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
			</div>
		</div>
	</div>
		
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
				 <div class="map-func three-d">
					<ul class="nav nav-pills language-ul" id="pills-map-tab" role="tablist">
						<li class="nav-item">
						<a class="nav-link" id="pills-2D-tab" data-toggle="pill" href="javascript:void(0);pills-2D" aria-controls="pills-2D" aria-selected="false">2D</a>
						</li>
						<li class="nav-item">
						<a class="nav-link active" id="pills-3D-tab" data-toggle="pill" href="javascript:void(0);pills-3D" role="tab" aria-controls="pills-3D" aria-selected="true">3D</a></li>
					</ul>
				</div>	       
				        
			    </div>
			    <div id="search"></div>
				<!--  <div id="map" class="map h-100">-->
				<div id="cesiumContainer" class="h-100 w-100"></div>
				<span id="coordinateDiv"></span>
				<!-- <div id="HomeButton"></div>
				<div id="LocateButton"></div> -->
				<!--  <div id="measurementDiv"></div> -->
				</div>
			</div>
			
			<!--Tools action list-->
			<div class="action-start">
			
				<ul class="action-ul bottom-action threed" id="downPanel">
					<%-- <li><a id="zoomOutDiv" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_Out.svg"></a></li>
					<li><a id="zoomInDiv" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_In.svg"></a></li> --%>
					<li title="Home"><a id="myHomeDiv" href="javascript:void(0);"><img src="${context}/images/icons/Home.svg"></a></li>
					<li title="Box Zoom In" id="box_zoom_map"><a id="zoomBoxMap" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_In.svg"></a></li>
					<li title="Box Zoom Out" id="box_zoom_out_map"><a id="zoomOutBoxMap" href="javascript:void(0);"><img src="${context}/images/icons/Zoom_Out.svg"></a></li>
					<li title="Map Info" id ="toggle_map_info"><a id="mapInfoTool" title="Disable Map Info" href="javascript:void(0);"><img src="${context}/images/Info_tool_26.svg"></a></li>
					
					<%-- 
					<li title="Measurement">
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
							 
							<div id="topbar">
	      						<button class="esri-widget--button esri-interactive esri-icon-measure-line distance-three-d img-cust-map" id="distanceButton"   title="Measure distance"></button>
	      						<button class="esri-widget--button esri-interactive esri-icon-measure-area measurement-three-d img-cust-map" id="areaButton"  title="Measure area"></button>
	      						<button class="esri-widget--button esri-interactive esri-icon-trash" id="clear" title="Clear Measurements"></button>
    						</div>
							</div>
							<span class="arrow-footer"></span>
						</div>
					</li>
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
											<label for="print_format" data-translate = "_print_playout">Layout</label>
											<select name="printLayout" id="print_layout_id" class="form-control pb-1">
					                          <option value="A3 Landscape">A3 Landscape</option>
					                          <option value="A3 Portrait">A3 Portrait</option>
					                          <option value="A4 Landscape">A4 Landscape</option>
					                          <option value="A4 Portrait">A4 Portrait</option>
					                          <option value="MAP_ONLY">MAP ONLY</option>
					                        </select>
										</div>
										<div class="form-group">
											<label for="print_format" data-translate = "_print_pformat">Format</label>
											 <select name="printFormat" id="print_format_id" class="form-control pb-1">
						                          <option value="pdf" selected>PDF</option>
						                          <option value="png32">PNG32</option>
						                          <option value="png8">PNG8</option>
						                          <option value="jpg">JPG</option>
                                             </select>
										</div>
										<div class="text-center">
											<button type="submit" id="print_submit" class="btn btn-indore printBtn" data-translate = "_print">Print</button>
											<a href="#" id="printResult" target="_blank" style="display:none;" data-translate = "_print_gprintout">Get Printout</a>
										</div>
									</form>
								</div>
								
								<!-- <div id="print_button"></div> -->
							</div>
							<span class="arrow-footer"	></span>
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
								<div class="layer-content bookmark-content">
								<!-- <div id="bookmarks"></div> -->
									<div class="bookmark-form">	
								
										<div id="parent-dv">
													<input type="text" id="bookmark_name" class="bookmarkdata-input" placeholder="Add Bookmark" data-translate = "bmark_addbmark">
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
					</li>  --%>
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
								<div class="layer-content share-content">
									<form class="tool-tip-form">
										<div class="form-group">
											<label for="loc_name" data-translate = "_share_title">Share a link to this app</label>
											<input type="text" name="mapt" id="sharelinktxt" placeholder="" value="https://apagri.infinium.management/indoregis/citizen_3d_map.jsp" class="form-control" readonly="" >
										</div>
									</form>
									<a class="tooltip-link" href="javascript:void(0);" data-translate = "_share_linkop">Link Option</a>
									<div class="social-icon">
										<a id="emailLink" ><img class="map-side-icon-img" src="${context}/images/icons/Gmail-73.svg" alt=""></a>	
										<a id="facebookLink" ><img class="map-side-icon-img" src="${context}/images/icons/Facebook-74.svg" alt=""></a>
										<a id="twitterLink" ><img class="map-side-icon-img" src="${context}/images/icons/Twitter-75.svg" alt=""></a>
									</div>
									
								</div>
								<span class="arrow-footer"></span>
							</div>
						</div>
					</li>
					<%--
					<li title="Clear Map"><a id="clearMap" href="javascript:void(0);"><img src="${context}/images/Clear-Map-68.svg"></a></li>
					
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
					</li>  --%>
				</ul>
			</div>
			<!--Tools action list-->
		</div>
	</div>
	<!-- /#page-content-wrapper -->
	
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


	<!-- <script src="${context}/js/jquery.min.js"></script>  -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
	<script src = "${context}/js/jquery-ui.min.js"></script>
	<script src="${context}/js/popper.min.js"></script>
	<script src="${context}/js/bootstrap.min.js"></script>
	<script src="${context}/js/slick.min.js"></script>
	<script src="${context}/js/jquery.validate.min.js"></script>
	
	<script type="text/javascript" src="${context}/js/moment.min.js"></script>
	<script type="text/javascript" src="${context}/js/daterangepicker.min.js"></script>
	
	<script src="${context}/js/toastr.min.js"></script>
	<script src="${context}/js/utils.js"></script>
	
	
	<script src="${context}/js/esri/esri-api-4-14.js"></script>
	<script src="${context}/js/citizenmap.js"></script>
	<script src="${context}/js/created/appData.js"></script>
	<script type="text/javascript" src="${context}/js/developer/citizen_map_constant.js"></script>
	<script type="text/javascript" src="${context}/js/developer/citizen_language_controller.js"></script>
	<script type="text/javascript" src="${context}/js/developer/utility.js"></script>
	
	<script src="${context}/js/developer/event_controller.js"></script>
	<script src="${context}/js/developer/announcement.js"></script>
	<script src="${context}/js/developer/ward_info_controller.js"></script>
	<script src="${context}/js/developer/add_data_controller.js"></script>
	<script src="${context}/js/developer/feedback_suggestion.js"></script>
	
	<script src="${context}/js/developer/dep_share_controller.js"></script>
	
	<script src="${context}/js/developer/formValidations.js"></script>
	<script src="${context}/js/developer/citizen_map_controller.js"></script>
	<script src="${context}/js/3d_map.js"></script>
	
	
</body>
</html>