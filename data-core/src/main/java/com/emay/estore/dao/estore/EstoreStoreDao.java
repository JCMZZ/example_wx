package com.emay.estore.dao.estore;

import java.math.BigDecimal;
import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.estore.EstoreStore;

import cn.emay.common.db.Page;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
public interface EstoreStoreDao extends BaseSuperDao<EstoreStore> {

	public void updateDescribe(Long storeId, String describe);

	public void updateMobile(Long storeId, String mobile);

	public void updateAddress(Long storeId, String address, BigDecimal longitude, BigDecimal dimension);

	public Page<EstoreStore> findStore(int start, int limit, String name, String storeLicence, String appId, String appSecret, String mobile);

	public void updateStore(String name, String storeLicence, String appId, String appSecret, Long storeId);

	public void updateStoreState(Long storeId, Integer state);

	public List<EstoreStore> findRepeatByName(String name, Long storeId);

}
