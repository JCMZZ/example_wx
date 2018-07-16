package com.emay.estore.web.interceptor;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.emay.estore.auth.OperationAuth;
import com.emay.estore.auth.PageAuth;
import com.emay.estore.dto.system.auth.AuthTree;
import com.emay.estore.dto.system.auth.NgvigationDTO;
import com.emay.estore.dto.system.auth.OperDTO;
import com.emay.estore.dto.system.auth.PageDTO;
import com.emay.estore.pojo.system.User;
import com.emay.estore.service.system.UserAuthService;
import com.emay.estore.web.utils.WebUtils;

public class AuthInterceptor extends HandlerInterceptorAdapter {

	@Resource
	private UserAuthService authService;

	/**
	 * 拦截没有权限的请求
	 */
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		User user = WebUtils.getCurrentUser(request, response);
		if (user == null || user.getState() == User.STATE_OFF || user.getState() == User.STATE_DELETE) {
			WebUtils.loginout(request, response);
			WebUtils.sendNoLogin(request, response);
			return false;// 未登陆或者用户被锁，拦截
		}

		Method method = ((HandlerMethod) handler).getMethod();

		boolean isHasOperAuth = false;// 是否拥有操作权限
		String operCode = null;
		OperationAuth oa = method.getAnnotation(OperationAuth.class);
		if (oa == null) {
			isHasOperAuth = true;
		} else {
			operCode = oa.value();
		}

		boolean isHasPageAuth = false;// 是否拥有页面权限
		String pageCode = null;
		PageAuth pa = method.getDeclaringClass().getAnnotation(PageAuth.class);
		if (pa == null) {
			isHasPageAuth = true;
		} else {
			pageCode = pa.value();
		}

		/* 权限判断 */
		PageDTO currentPage = null;
		
		AuthTree authDTO = authService.findUserAuthTree(user.getId());// 个人权限树
		if (!(isHasOperAuth && isHasPageAuth)) {
			BK: for (NgvigationDTO ngv : authDTO.getNgvs()) {
				for (PageDTO page : ngv.getPages()) {
					if (!page.getAuthCode().equals(pageCode)) {
						continue;// 非当前页面，跳过
					}
					currentPage = page;
					isHasPageAuth = true;// 拥有当前页面权限
					if (isHasOperAuth) {
						break BK;// 不需要操作权限
					}
					if (page.getOpers() == null || page.getOpers().size() == 0) {
						isHasOperAuth = true;// 页面下无操作权限，直接通过
						break BK;
					}
					for (OperDTO oper : page.getOpers()) {
						if (oper.getAuthCode().equals(operCode)) {
							isHasOperAuth = true;// 拥有当前操作权限
							break BK;
						}
					}
				}
			}
		}

		if (!(isHasOperAuth && isHasPageAuth)) {
			WebUtils.sendError(request, response, "Access denied");
			return false;
		}

		if (!WebUtils.isAjaxRequest(request)) {
			if (currentPage != null) {
				Map<String, Boolean> authHas = new HashMap<String, Boolean>();
				AuthTree sysauth = authService.findSystemAuthTree();//系统权限树
				PageDTO page = sysauth.findPage(currentPage.getId());
				if(page.getOpers() != null){
					for(OperDTO sysOper : page.getOpers()){
						boolean isAuth = false;
						if(currentPage.getOpers() != null){
							for(OperDTO userOper : currentPage.getOpers()){
								if(userOper.getId().longValue() == sysOper.getId().longValue()){
									isAuth = true;
									break;
								}
							}
						}
						authHas.put(sysOper.getAuthCode(), isAuth);
					}
				}
				
				StringBuffer buffer = new StringBuffer();
				for (Entry<String, Boolean> entry : authHas.entrySet()) {
					String key = "AUTH_" + entry.getKey();
					request.setAttribute(key, entry.getValue());
					buffer.append("var " + key + " = " + entry.getValue() + ";\n\t");
				}
				request.setAttribute("authscript", buffer.toString());
			}
			request.setAttribute("tree", authDTO);
			request.setAttribute("currentPage", currentPage);
		}
		return true;
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		if (ex != null)
			ex.printStackTrace();
	}

}
