package com.emay.estore.service.estore;

import java.math.BigDecimal;

import com.emay.estore.dto.estore.StoreDTO;
import com.emay.estore.pojo.estore.EstoreStore;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
public interface EstoreStoreService {

	public Result updateDescribe(Long storeId, String describe);

	public Result updateMobile(Long storeId, String mobile);

	public Result updateAddress(Long storeId, String address, BigDecimal longitude, BigDecimal dimension);

	public StoreDTO find(Long storeId);

	public Page<EstoreStore> findStore(int start, int limit, String name, String storeLicence, String appId, String appSecret, String mobile);

	public Result addStore(String name, String storeLicence, String appId, String appSecret);

	public Result updateStore(String name, String storeLicence, String appId, String appSecret, Long storeId);

	public Result updateStoreState(Long storeId, Integer state);

	public Boolean checkData(Long storeId);

	EstoreStore findById(Long id);
}
