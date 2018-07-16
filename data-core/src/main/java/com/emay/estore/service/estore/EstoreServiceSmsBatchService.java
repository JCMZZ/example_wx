package com.emay.estore.service.estore;

import java.util.Date;
import java.util.List;

import cn.emay.common.Result;

import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.estore.EstoreServiceSmsBatch;


public interface EstoreServiceSmsBatchService {

	EstoreServiceSmsBatch findByServiceId(Long serviceId);

	Result saveSmsBatch(Long serviceId, String content, Long operatorId);

	Result updateSmsBatch(EstoreServiceSmsBatch batch, String content,Long operatorId);

	Result saveOwnSmsBatch(String customerIds, String content, EstoreAdminDTO currentUser);

	List<EstoreServiceSmsBatch> findByLastUpdateTime(Date lastUpdateTime, int currentPage, int pageSize);


}
