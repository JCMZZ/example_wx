package com.emay.estore.dao.estore;

import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.dto.estore.EstoreCardTypeDTO;
import com.emay.estore.pojo.estore.EstoreCardType;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
public interface EstoreCardTypeDao extends BaseSuperDao<EstoreCardType> {

	public void updateCardDescribe(Long id,String describe);

	//List<EstoreCardType> findCard(Long id);
	//public void findCard(Long id);
	EstoreCardTypeDTO findCardType(Long id);

	EstoreCardType findByStoreIdAndLevel(Long storeId, int level);

	public List<EstoreCardType> findEstoreCardTypes(Long storeId);
	
	public void updateName(Long id, String name);
}
