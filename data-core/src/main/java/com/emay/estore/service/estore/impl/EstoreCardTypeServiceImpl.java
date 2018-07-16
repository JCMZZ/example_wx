package com.emay.estore.service.estore.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.dao.estore.EstoreCardTypeDao;
import com.emay.estore.dto.estore.EstoreCardTypeDTO;
import com.emay.estore.pojo.estore.EstoreCardType;
import com.emay.estore.service.estore.EstoreCardTypeService;

import cn.emay.common.Result;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
@Service
public class EstoreCardTypeServiceImpl implements EstoreCardTypeService {
	@Resource
	private EstoreCardTypeDao estoreCardTypeDao;

	@Override
	public Result updateCardDescribe(Long id, String cardDescribe) {
		estoreCardTypeDao.updateCardDescribe(id, cardDescribe);
		return Result.rightResult();
	}

	@Override
	public EstoreCardTypeDTO findCardType(Long id) {

		return estoreCardTypeDao.findCardType(id);
	}

	@Override
	public List<EstoreCardType> findEstoreCardTypes(Long storeId) {
		return estoreCardTypeDao.findEstoreCardTypes(storeId);
	}

	@Override
	public Result updateName(Long id, String name) {
		estoreCardTypeDao.updateName(id, name);
		return Result.rightResult();
	}

}
