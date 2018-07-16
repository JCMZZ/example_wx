package com.emay.estore.dao.estore;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.estore.EstoreAdmin;

import cn.emay.common.db.Page;

public interface EstoreAdminDao extends BaseSuperDao<EstoreAdmin> {
	
	EstoreAdminDTO findByOpenId(String openId);

	EstoreAdminDTO findByMobile(String mobile);

	Page<EstoreAdminDTO> selectAdminList(int start, int limit, Long storeId, String adminName);

	void updateAdminBind(Long adminId, Long storeId, int bind);
	
	void updateUserId(Long oldUserId, Long newUserId);

	List<EstoreAdminDTO> findDTOByUserId(Long userId);

}
