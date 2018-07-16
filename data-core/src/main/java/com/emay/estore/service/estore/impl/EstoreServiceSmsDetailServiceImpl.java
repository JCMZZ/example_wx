package com.emay.estore.service.estore.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.emay.common.db.Page;

import com.emay.estore.dao.estore.EstoreServiceSmsDetailDao;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;
import com.emay.estore.service.estore.EstoreServiceSmsDetailService;

@Service
public class EstoreServiceSmsDetailServiceImpl implements EstoreServiceSmsDetailService {

	@Resource
	private EstoreServiceSmsDetailDao estoreServiceSmsDetailDao;

	@Override
	public Page<EstoreServiceSmsDetail> findPage(Long batchId, String mobile, int start, int limit) {
		return estoreServiceSmsDetailDao.findPage(batchId, mobile, start, limit);
	}

	@Override
	public void saveBatchSmsDetail(List<EstoreServiceSmsDetail> saveList) {
		estoreServiceSmsDetailDao.saveBatchSmsDetail(saveList);
	}

	@Override
	public void updateSmsDetail(List<EstoreServiceSmsDetail> list) {
		estoreServiceSmsDetailDao.updateSmsDetail(list);
	}

}
