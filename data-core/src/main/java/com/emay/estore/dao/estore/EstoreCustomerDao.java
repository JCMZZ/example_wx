package com.emay.estore.dao.estore;

import java.math.BigDecimal;
import java.util.List;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.dto.estore.sms.MobileInfoDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerBalanceRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerCardRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerInfoDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerMyDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerScoreRecordDTO;
import com.emay.estore.pojo.estore.EstoreCustomer;

import cn.emay.common.db.Page;

public interface EstoreCustomerDao extends BaseSuperDao<EstoreCustomer> {

	EstoreCustomerDTO findByStoreIdAndOpenId(Long storeId, String openId);

	void updateUserId(Long oldUserId, Long newUserId);

	Page<EstoreCustomerInfoDTO> findPage(Long storeId, Integer orderType, Integer orderMethod, int start, int limit);

	// 我的页面
	EstoreCustomerMyDTO findCustomer(Long userId);

	
	Page<EstoreCustomerBalanceRecordDTO> findBalanceRecord(Long userCustomerId, int start, int limit);

	// 积分记录
	Page<EstoreCustomerScoreRecordDTO> findScordRecord(Long userCustomerId, int start, int limit);

	// 会员卡
	EstoreCustomerCardRecordDTO findCard(Long userCustomerId);

	EstoreCustomerInfoDTO findCustomerInfo(Long customerId);

	Page<EstoreCustomerInfoDTO> findCustomerListPage(int start, int limit, Long storeId);

	BigDecimal updateBalance(Long customerId, BigDecimal num);

	BigDecimal updateScore(Long customerId, BigDecimal num);

	List<EstoreCustomerInfoDTO> findDTOByUserId(Long userId);

	EstoreCustomerDTO findByStoreIdAndMobile(Long storeId, String mobile);

	List<MobileInfoDTO> findByCustomerIds(List<Long> customerIds);

}
