package com.emay.estore.service.estore;

import cn.emay.common.db.Page;

import com.emay.estore.dto.estore.service.EstoreServiceDTO;
import com.emay.estore.pojo.estore.EstoreService;

public interface EstoreServiceService {

	Page<EstoreServiceDTO> findPage(Long storeId, Integer serviceType, Integer serviceState, int start, int limit);

	Page<EstoreServiceDTO> findManagePage(String storeName, Integer serviceType, Integer serviceState, int start, int limit);

	void updateServiceOutTradeNo(Long serviceId, String out_trade_no);

	void updateServiceState(Long serviceId, Integer serviceState, String return_code, String transaction_id);

	EstoreService findById(Long id);

	EstoreService findByOutTradeNo(String outTradeNo);

}
