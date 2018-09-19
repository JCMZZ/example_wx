package com.emay.estore.dao.estore;

import cn.emay.common.db.Page;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.dto.estore.EstoreAdDTO;
import com.emay.estore.pojo.estore.EstoreAd;

public interface EstoreAdDao extends BaseSuperDao<EstoreAd> {

	Page<EstoreAdDTO> findPage(String linkPath, int start, int limit);

	EstoreAdDTO getAd();

}
