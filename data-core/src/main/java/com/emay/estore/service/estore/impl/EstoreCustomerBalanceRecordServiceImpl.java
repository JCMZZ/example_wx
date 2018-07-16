package com.emay.estore.service.estore.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.dao.estore.EstoreCustomerBalanceRecordDao;
import com.emay.estore.service.estore.EstoreCustomerBalanceRecordService;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
@Service
public class EstoreCustomerBalanceRecordServiceImpl implements EstoreCustomerBalanceRecordService {
	@Resource
	private EstoreCustomerBalanceRecordDao estoreCustomerBalanceRecordDao;

}
