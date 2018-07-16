package com.emay.estore.service.estore.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.dao.estore.EstoreCustomerScoreRecordDao;
import com.emay.estore.service.estore.EstoreCustomerScoreRecordService;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
@Service
public class EstoreCustomerScoreRecordServiceImpl implements EstoreCustomerScoreRecordService {
	@Resource
	private EstoreCustomerScoreRecordDao estoreCustomerScoreRecordDao;

}
