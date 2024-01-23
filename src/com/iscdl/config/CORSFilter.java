package com.iscdl.config;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CORSFilter implements Filter {

	private Logger logger = Logger.getLogger(CORSFilter.class.getName());

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {


		String validOrigin = "http://localhost:8081"; 	// Local
		//String validOrigin =  "https://apagri.infinium.management";
//		String validOrigin1 = "http://10.195.202.93:8081"; 	// Local
		//String validOrigin1 = "https://172.17.10.62"; 	//
		String validOrigin1 = "https://apagri.infinium.management"; 	//
//		String validOrigin = "https://citymapindore.amnex.com";// LIVE AMNEX SERVER
//		String validOrigin = "https://citymap.smartcityindore.org:8443";// LIVE ISCDL SERVER
		
//		String validOrigin = "https://indoresmartmap.org";// LIVE ISCDL SERVER New Domain Based
		
//		String homePageURL = "http://localhost:8082/web/";	//Local							
//		String homePageURL = "https://citymapindore.amnex.com/web/";//LIVE AMNEX SERVER
//		String homePageURL = "https://citymap.smartcityindore.org:8443/web/";//LIVE ISCDL SERVER
		
		String homePageURLS = validOrigin + "/web/";
		String homePageURLS1 = validOrigin1 + "/web/";
		
		
		String mobile3DPageURLS = homePageURLS + "3d_view.jsp";
		String mobile3DPageURLS1 = homePageURLS1 + "3d_view.jsp";

		HttpServletRequest httpReq = (HttpServletRequest) request;
		HttpServletResponse httpResp = (HttpServletResponse) response;
		
		//httpResp.setHeader("Access-Control-Allow-Origin", "*");
		httpResp.setHeader("Access-Control-Allow-Origin", validOrigin);
		
		httpResp.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
		httpResp.setHeader("Access-Control-Max-Age", "3600");
		httpResp.setHeader("Access-Control-Allow-Headers",
				"x-requested-with, authorization, x-auth-token, origin, content-type, accept");

		String requestURL = httpReq.getRequestURL().toString();
		String origin = httpReq.getHeader("Origin");
		String referer = httpReq.getHeader("Referer");
		String host = httpReq.getHeader("Host");
		String postman_token = httpReq.getHeader("Postman-Token");
		
		String xminParam = httpReq.getParameter("xmin");
		String yminParam = httpReq.getParameter("ymin");
		String xmaxParam = httpReq.getParameter("xmax");
		String ymaxParam = httpReq.getParameter("ymax");
		String wkidParam = httpReq.getParameter("wkid");
		
		
//		logger.info("............. requestURL :: " + requestURL);
//		logger.info(".................. host :: " + host);
//		logger.info("...................... origin :: " + origin);
//		logger.info("........................ referer :: " + referer);
//		logger.info("...................... postman_token :: " + postman_token);

		if ("OPTIONS".equalsIgnoreCase(httpReq.getMethod())) {
			httpResp.setStatus(HttpServletResponse.SC_OK);
		} else {
			if (postman_token != null) {		// CHECK IF REQUEST IS COMING FROM POSTMAN
				httpResp.setStatus(HttpServletResponse.SC_FORBIDDEN);
			} 
			
			else if (origin == null && referer == null && validOrigin.contains(host.trim())
					&& requestURL.trim().equals(homePageURLS)) { // CHECK IF IT IS THE HOME PAGE URL
				chain.doFilter(request, response);
			}
			
			else if (origin == null && referer == null && validOrigin1.contains(host.trim())
					&& requestURL.trim().equals(homePageURLS1)) { // CHECK IF IT IS THE HOME PAGE URL
				chain.doFilter(request, response);
			}
			
			else if (origin == null && referer == null && validOrigin.contains(host.trim())
					&& requestURL.trim().equals(mobile3DPageURLS)) { // CHECK IF IT IS THE 3D MOBILE PAGE URL
				chain.doFilter(request, response);
			}
			
			else if (origin == null && referer == null && validOrigin1.contains(host.trim())
					&& requestURL.trim().equals(mobile3DPageURLS1)) { // CHECK IF IT IS THE 3D MOBILE PAGE URL
				chain.doFilter(request, response);
			}
			
			else if (origin == null && referer == null && validOrigin.contains(host.trim())
					&& xminParam != null && yminParam != null && xmaxParam!=null && ymaxParam!= null && wkidParam != null) { // CHECK IF IT IS THE SHARE LINK URL
				chain.doFilter(request, response);
			}
			else if (origin != null && validOrigin.trim().equalsIgnoreCase(origin.trim())
					&& validOrigin.contains(host.trim())) {
				chain.doFilter(request, response);
			}
			else if (referer != null && referer.contains(validOrigin) && validOrigin.contains(host.trim())) {
				chain.doFilter(request, response);
			} 
			else if (referer != null && referer.contains(validOrigin1) && validOrigin1.contains(host.trim())) {
				chain.doFilter(request, response);
			} 
			else {
				httpResp.setStatus(HttpServletResponse.SC_FORBIDDEN);
			}
		}
	}

	@Override
	public void destroy() {

	}

}
