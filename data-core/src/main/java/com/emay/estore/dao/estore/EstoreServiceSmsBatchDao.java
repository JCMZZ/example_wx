package com.emay.estore.dao.estore;

import java.util.Date;
import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.estore.EstoreServiceSmsBatch;

public interface EstoreServiceSmsBatchDao extends BaseSuperDao<EstoreServiceSmsBatch> {

	EstoreServiceSmsBatch findServiceBatchByProperty(String fieldName, Object value);

	List<EstoreServiceSmsBatch> findByLastUpdateTime(Date lastUpdateTime, int currentPage, int pageSize);

}
