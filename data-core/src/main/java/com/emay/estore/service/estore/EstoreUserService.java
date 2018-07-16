package com.emay.estore.service.estore;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

import java.util.Map;

import com.emay.estore.dto.estore.wx.WxUserInfoDTO;
import com.emay.estore.pojo.estore.EstoreUser;

public interface EstoreUserService {

	public Result saveBusinessUser(WxUserInfoDTO dto);

	public Result updateUserMobile(Long id, String mobile);

	Result saveCustomerUser(WxUserInfoDTO dto, Long storeId);

	EstoreUser findByMobile(String mobile);

	void deleteById(Long id);

	public Page<EstoreUser> findPage(int start, int limit, String mobile);

	public Map<String, Object> findUserDetail(Long userId);

}
