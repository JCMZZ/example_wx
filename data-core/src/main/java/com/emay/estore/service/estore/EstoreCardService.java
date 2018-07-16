package com.emay.estore.service.estore;

import cn.emay.common.Result;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
public interface EstoreCardService {

	public Result updateCard(Long cardId, Long cardTypeId, String cardNumber, int type, Long storeId);
	
	
}
