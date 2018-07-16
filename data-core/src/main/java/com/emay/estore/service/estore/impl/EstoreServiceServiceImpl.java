package com.emay.estore.service.estore.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.emay.common.db.Page;

import com.emay.estore.dao.estore.EstoreGoodsDao;
import com.emay.estore.dao.estore.EstoreServiceDao;
import com.emay.estore.dto.estore.GoodsDTO;
import com.emay.estore.dto.estore.service.EstoreServiceDTO;
import com.emay.estore.service.estore.EstoreServiceService;

@Service
public class EstoreServiceServiceImpl implements EstoreServiceService {

	@Resource
	private EstoreServiceDao estoreServiceDao;
	@Resource
	private EstoreGoodsDao estoreGoodsDao;

	@Override
	public Page<EstoreServiceDTO> findPage(Long storeId, Integer serviceType, Integer serviceState, int start, int limit) {
		return estoreServiceDao.findPage(storeId, serviceType, serviceState, start, limit);
	}

	@Override
	public Page<EstoreServiceDTO> findManagePage(String storeName, Integer serviceType, Integer serviceState, int start, int limit) {
		Page<EstoreServiceDTO> page = estoreServiceDao.findManagePage(storeName, serviceType, serviceState, start, limit);
		List<Long> goodsIdList = new ArrayList<Long>();
		for (EstoreServiceDTO dto : page.getList()) {
			if (dto.getGoodsId() != null && dto.getGoodsId().longValue() > 0l) {
				goodsIdList.add(dto.getGoodsId());
			}
		}
		List<GoodsDTO> goodsList = estoreGoodsDao.findByIds(goodsIdList);
		if (goodsList != null && goodsList.size() > 0) {
			for (EstoreServiceDTO dto : page.getList()) {
				for (GoodsDTO goodsDTO : goodsList) {
					if (dto.getGoodsId() != null && dto.getGoodsId().longValue() == goodsDTO.getId().longValue()) {
						dto.setName(goodsDTO.getName());
						break;
					}
				}
			}
		}
		return page;
	}

	@Override
	public void updateServiceOutTradeNo(Long serviceId, String out_trade_no) {
		estoreServiceDao.updateServiceOutTradeNo(serviceId, out_trade_no);

	}

	@Override
	public void updateServiceState(Long serviceId, Integer serviceState, String return_code, String transaction_id) {
		estoreServiceDao.updateServiceState(serviceId, serviceState, return_code, transaction_id);

	}

}
