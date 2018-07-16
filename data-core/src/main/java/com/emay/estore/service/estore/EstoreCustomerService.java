package com.emay.estore.service.estore;

import java.math.BigDecimal;
import java.util.List;

import com.emay.estore.dto.estore.sms.MobileInfoDTO;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerBalanceRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerCardRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerInfoDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerMyDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerScoreRecordDTO;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

public interface EstoreCustomerService {

	EstoreCustomerDTO findByStoreIdAndOpenId(Long storeId, String openId);

	void updateUserId(Long oldUserId, Long newUserId);

	Page<EstoreCustomerInfoDTO> findPage(Long storeId, Integer orderType, Integer orderMethod, int start, int limit);
	
	EstoreCustomerMyDTO findCustomer(Long userId);

	Page<EstoreCustomerBalanceRecordDTO> findBalanceRecord(Long userCustomerId, int start, int limit);

	Page<EstoreCustomerScoreRecordDTO>findScoreRecord(Long userCustomerId, int start, int limit);
	
	EstoreCustomerCardRecordDTO findCard(Long userCustomerId);
	
	EstoreCustomerInfoDTO findCustomerInfo(Long customerId);

	Page<EstoreCustomerInfoDTO> findCustomerListPage(int start, int limit, Long storeId);

	Result updateAccount(Long customerId, BigDecimal num, EstoreAdminDTO eadto, int type, int operType);

	Boolean isExist(Long storeId, String mobile);

	List<MobileInfoDTO> findByCustomerIds(List<Long> customerIds);

}
