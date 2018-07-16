package com.emay.estore.service.estore.impl;

import java.io.File;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.BigDecimalUtils;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dao.estore.EstoreCardDao;
import com.emay.estore.dao.estore.EstoreCardTypeDao;
import com.emay.estore.dao.estore.EstoreCustomerBalanceRecordDao;
import com.emay.estore.dao.estore.EstoreCustomerDao;
import com.emay.estore.dao.estore.EstoreCustomerScoreRecordDao;
import com.emay.estore.dao.estore.EstoreUserDao;
import com.emay.estore.dto.estore.sms.MobileInfoDTO;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerBalanceRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerCardRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerInfoDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerMyDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerScoreRecordDTO;
import com.emay.estore.pojo.estore.EstoreCustomerBalanceRecord;
import com.emay.estore.pojo.estore.EstoreCustomerScoreRecord;
import com.emay.estore.service.estore.EstoreCustomerService;

@Service
public class EstoreCustomerServiceImpl implements EstoreCustomerService {

	@Resource
	private EstoreUserDao estoreUserDao;
	@Resource
	private EstoreCustomerDao estoreCustomerDao;
	@Resource
	private EstoreCardDao estoreCardDao;
	@Resource
	private EstoreCustomerScoreRecordDao estoreCustomerScoreRecordDao;
	@Resource
	private EstoreCustomerBalanceRecordDao estoreCustomerBalanceRecordDao;
	@Resource
	private EstoreCardTypeDao estoreCardTypeDao;

	@Override
	public EstoreCustomerDTO findByStoreIdAndOpenId(Long storeId, String openId) {
		return estoreCustomerDao.findByStoreIdAndOpenId(storeId, openId);
	}

	@Override
	public void updateUserId(Long oldUserId, Long newUserId) {
		estoreCustomerDao.updateUserId(oldUserId, newUserId);
	}

	@Override
	public Page<EstoreCustomerInfoDTO> findPage(Long storeId, Integer orderType, Integer orderMethod, int start, int limit) {
		Page<EstoreCustomerInfoDTO> page = estoreCustomerDao.findPage(storeId, orderType, orderMethod, start, limit);
		if (page != null && page.getList() != null) {
			for (EstoreCustomerInfoDTO dto : page.getList()) {
				String path = CommonConstants.IMG_BASE_PATH + CommonConstants.HEADIMGPATH_C + dto.getId() + "/";
				File fileTemp = new File(path);
				if (fileTemp.exists() && fileTemp.isDirectory()) {
					String[] imgArr = fileTemp.list();
					dto.setAvatarUrl(CommonConstants.HEADIMGPATH_C + dto.getId() + "/" + imgArr[0]);
				}

			}
		}
		return page;
	}

	@Override
	public EstoreCustomerMyDTO findCustomer(Long userId) {
		EstoreCustomerMyDTO dto = estoreCustomerDao.findCustomer(userId);
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.HEADIMGPATH_C + dto.getId() + "/";

		File fileTemp = new File(path);
		if (fileTemp.exists() && fileTemp.isDirectory()) {
			String[] imgArr = fileTemp.list();
			if (imgArr != null && imgArr.length > 0) {
				dto.setCustomerHead(CommonConstants.HEADIMGPATH_C + dto.getId() + "/" + imgArr[0]);
			}
		}
		return dto;
	}

	@Override
	public Page<EstoreCustomerBalanceRecordDTO> findBalanceRecord(Long userCustomerId, int start, int limit) {
		return estoreCustomerDao.findBalanceRecord(userCustomerId, start, limit);
	}

	@Override
	public Page<EstoreCustomerScoreRecordDTO> findScoreRecord(Long userCustomerId, int start, int limit) {

		return estoreCustomerDao.findScordRecord(userCustomerId, start, limit);
	}

	@Override
	public EstoreCustomerCardRecordDTO findCard(Long userCustomerId) {

		return estoreCustomerDao.findCard(userCustomerId);
	}

	@Override
	public EstoreCustomerInfoDTO findCustomerInfo(Long customerId) {
		return estoreCustomerDao.findCustomerInfo(customerId);
	}

	@Override
	public Page<EstoreCustomerInfoDTO> findCustomerListPage(int start, int limit, Long storeId) {
		Page<EstoreCustomerInfoDTO> page = estoreCustomerDao.findCustomerListPage(start, limit, storeId);
		if (page != null && page.getList() != null) {
			for (EstoreCustomerInfoDTO dto : page.getList()) {
				String path = CommonConstants.IMG_BASE_PATH + CommonConstants.HEADIMGPATH_C + dto.getId() + "/";
				File fileTemp = new File(path);
				if (fileTemp.exists() && fileTemp.isDirectory()) {
					String[] imgArr = fileTemp.list();
					dto.setAvatarUrl(CommonConstants.HEADIMGPATH_C + dto.getId() + "/" + imgArr[0]);
				}

			}
		}
		return page;
	}

	@Override
	public Result updateAccount(Long customerId, BigDecimal changeBalance, EstoreAdminDTO eadto, int type, int operType) {
		BigDecimal num = operType == 1 ? changeBalance : new BigDecimal(-changeBalance.doubleValue());
		if (EstoreCustomerInfoDTO.UPDATE_BALANCE == type) {
			BigDecimal afterBalance = estoreCustomerDao.updateBalance(customerId, num);
			BigDecimal beforeBalance = BigDecimalUtils.sub(afterBalance, num);
			// 添加流水
			EstoreCustomerBalanceRecord record = new EstoreCustomerBalanceRecord(operType, beforeBalance, afterBalance, changeBalance, eadto.getId(), customerId, eadto.getStoreId(), new Date());
			estoreCustomerBalanceRecordDao.save(record);
			return Result.rightResult();
		} else if (EstoreCustomerInfoDTO.UPDATE_SCORE == type) {
			BigDecimal afterScore = estoreCustomerDao.updateScore(customerId, num);
			BigDecimal beforeScore = BigDecimalUtils.sub(afterScore, num);
			// 添加流水
			EstoreCustomerScoreRecord record = new EstoreCustomerScoreRecord(operType, beforeScore, afterScore, changeBalance, eadto.getId(), customerId, eadto.getStoreId(), new Date());
			estoreCustomerScoreRecordDao.save(record);
			return Result.rightResult();
		} else {
			return Result.badResult("请选择正确操作");
		}
	}

	@Override
	public Boolean isExist(Long storeId, String mobile) {
		EstoreCustomerDTO dto = estoreCustomerDao.findByStoreIdAndMobile(storeId, mobile);
		if (dto != null) {
			return true;
		}
		return false;
	}

	@Override
	public List<MobileInfoDTO> findByCustomerIds(List<Long> customerIds) {
		return estoreCustomerDao.findByCustomerIds(customerIds);
	}
}
