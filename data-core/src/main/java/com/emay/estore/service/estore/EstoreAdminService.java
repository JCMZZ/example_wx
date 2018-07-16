package com.emay.estore.service.estore;

import com.emay.estore.dto.estore.user.EstoreAdminDTO;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

public interface EstoreAdminService {

	EstoreAdminDTO findByOpenId(String openId);

	Boolean isExist(String mobile);

	Page<EstoreAdminDTO> selectAdminList(int start, int limit, Long storeId, String adminName);

	Result updateAdminBind(Long adminId, Long storeId, int bind);

	void updateUserId(Long oldUserId, Long newUserId);

}
