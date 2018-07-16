package com.emay.estore.web.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.emay.common.Result;
import cn.emay.util.ResponseUtils;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.estore.EstoreStore;
import com.emay.estore.service.estore.EstoreStoreService;
import com.emay.estore.web.utils.WebUtils;

/**
 * 我的页面
 *
 */
@RequestMapping("/myPage")
@Controller
public class EstoreMyPageController {
	
	@Resource
	private EstoreStoreService estoreStoreService;

	@RequestMapping("/info")
	public void info(HttpServletRequest request, HttpServletResponse response) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("nickname", eadto.getNickname());
		String avatarUrl = "";
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.HEADIMGPATH_B + eadto.getId() + "/";
		File fileTemp = new File(path);
		if (fileTemp.exists() && fileTemp.isDirectory()) {
			String[] imgArr = fileTemp.list();
			avatarUrl = CommonConstants.HEADIMGPATH_B + eadto.getId() + "/" + imgArr[0];
		}
		map.put("avatarUrl", avatarUrl);
		
		EstoreStore estoreStore = estoreStoreService.findById(eadto.getStoreId());
		if(estoreStore == null){
			ResponseUtils.outputWithJson(response, Result.badResult("参数错误"));
			return;
		}
		map.put("storeName", estoreStore.getName());
		ResponseUtils.outputWithJson(response, Result.rightResult(map));
	}

}
