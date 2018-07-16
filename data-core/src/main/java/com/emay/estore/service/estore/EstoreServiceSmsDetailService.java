package com.emay.estore.service.estore;

import java.util.List;

import cn.emay.common.db.Page;

import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;

public interface EstoreServiceSmsDetailService {

	Page<EstoreServiceSmsDetail> findPage(Long batchId, String mobile, int start, int limit);

	void saveBatchSmsDetail(List<EstoreServiceSmsDetail> saveList);

	void updateSmsDetail(List<EstoreServiceSmsDetail> list);

}
