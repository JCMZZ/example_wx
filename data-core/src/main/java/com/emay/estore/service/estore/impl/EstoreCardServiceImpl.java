package com.emay.estore.service.estore.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.dao.estore.EstoreCardDao;
import com.emay.estore.pojo.estore.EstoreCard;
import com.emay.estore.service.estore.EstoreCardService;

import cn.emay.common.Result;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
@Service
public class EstoreCardServiceImpl implements EstoreCardService {
	@Resource
	private EstoreCardDao estoreCardDao;

	@Override
	public Result updateCard(Long cardId, Long cardTypeId, String cardNumber, int type, Long storeId) {
		List<EstoreCard> es = estoreCardDao.findRepeatByName(cardNumber, storeId, cardId);
		if (es.size() > 0) {
			return Result.badResult("命名重复");
		}
		estoreCardDao.updateCard(cardId, cardTypeId, cardNumber, type);
		return Result.rightResult();
	}

}
