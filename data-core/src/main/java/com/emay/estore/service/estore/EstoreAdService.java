package com.emay.estore.service.estore;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

import com.emay.estore.dto.estore.EstoreAdDTO;
import com.emay.estore.pojo.estore.EstoreAd;

public interface EstoreAdService {

	Page<EstoreAdDTO> findPage(String linkPath, int start, int limit);

	Result addAd(String linkPath);

	Result modifyAd(Long id, String linkPath);

	EstoreAd findById(Long id);

}
