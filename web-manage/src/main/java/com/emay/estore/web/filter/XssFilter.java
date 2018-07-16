package com.emay.estore.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**
 * XSS防御 可以指定排除的URL
 * 
 * @author 东旭
 *
 */
public class XssFilter implements Filter {

	FilterConfig filterConfig = null;

	private String excludedUrls;

	private String[] excludedPageArray;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
		excludedUrls = filterConfig.getInitParameter("excludedUrls");
		if (excludedUrls != null && excludedUrls.trim().length() > 0) {
			excludedPageArray = excludedUrls.split(",");
		}
	}

	public void destroy() {
		this.filterConfig = null;
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		if (excludedPageArray != null) {
			String path = ((HttpServletRequest) request).getServletPath();
			for (String url : excludedPageArray) {
				if (url.equals(path)) {
					chain.doFilter(request, response);
					return;
				}
			}
		}
		chain.doFilter(new XssHttpServletRequestWrapper((HttpServletRequest) request), response);
	}

	public String getExcludedUrls() {
		return excludedUrls;
	}

	public void setExcludedUrls(String excludedUrls) {
		this.excludedUrls = excludedUrls;
	}

}