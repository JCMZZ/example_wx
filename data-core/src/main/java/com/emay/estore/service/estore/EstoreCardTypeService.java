package com.emay.estore.service.estore;


import java.util.List;

import com.emay.estore.dto.estore.EstoreCardTypeDTO;
import com.emay.estore.pojo.estore.EstoreCardType;

import cn.emay.common.Result;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
public interface EstoreCardTypeService {
	public Result  updateCardDescribe(Long id, String cardDescribe);
	

	
	EstoreCardTypeDTO findCardType(Long id);



	public List<EstoreCardType> findEstoreCardTypes(Long storeId);

	
	public Result updateName(Long id,String name);
}
