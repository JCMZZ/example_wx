package com.emay.estore.dao.estore;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.estore.EstoreCard;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
public interface EstoreCardDao extends BaseSuperDao<EstoreCard> {
	//修改卡片
	public void updateCard(Long cardId, Long cardTypeId, String cardNumber, int type);

	public List<EstoreCard> findRepeatByName(String cardNumber, Long storeId, Long cardId);
	
	

}
