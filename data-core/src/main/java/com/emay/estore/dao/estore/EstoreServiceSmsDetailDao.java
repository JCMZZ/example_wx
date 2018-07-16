package com.emay.estore.dao.estore;

import java.util.List;

import cn.emay.common.db.Page;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;

public interface EstoreServiceSmsDetailDao extends BaseSuperDao<EstoreServiceSmsDetail> {

	Page<EstoreServiceSmsDetail> findPage(Long batchId, String mobile, int start, int limit);

	void saveBatchSmsDetail(List<EstoreServiceSmsDetail> saveList);

	void updateSmsDetail(List<EstoreServiceSmsDetail> list);

}
