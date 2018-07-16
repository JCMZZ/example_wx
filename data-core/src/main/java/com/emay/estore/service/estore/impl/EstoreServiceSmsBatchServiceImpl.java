package com.emay.estore.service.estore.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.emay.common.Result;
import cn.emay.common.cache.redis.RedisClient;
import cn.emay.util.BigDecimalUtils;

import com.emay.estore.constant.RedisKey;
import com.emay.estore.constant.ServiceTypeEnum;
import com.emay.estore.dao.estore.EstoreServiceDao;
import com.emay.estore.dao.estore.EstoreServiceSmsBatchDao;
import com.emay.estore.dao.system.SettingsDao;
import com.emay.estore.dto.estore.service.SimpleEstoreServiceDTO;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.estore.EstoreService;
import com.emay.estore.pojo.estore.EstoreServiceSmsBatch;
import com.emay.estore.pojo.system.Settings;
import com.emay.estore.service.estore.EstoreServiceSmsBatchService;
import com.emay.estore.util.SmsUtil;

@Service
public class EstoreServiceSmsBatchServiceImpl implements EstoreServiceSmsBatchService {

	@Resource
	private EstoreServiceSmsBatchDao estoreServiceSmsBatchDao;
	@Resource
	private EstoreServiceDao estoreServiceDao;
	@Resource
	private SettingsDao settingsDao;
	@Resource
	private RedisClient redis;
	
	@Override
	public EstoreServiceSmsBatch findByServiceId(Long serviceId){
		return estoreServiceSmsBatchDao.findServiceBatchByProperty("serviceId", serviceId);
	}
	
	@Override
	public Result saveSmsBatch(Long serviceId,String content, Long operatorId){
		Date time = new Date();
		EstoreService estoreService = estoreServiceDao.findById(serviceId);
		if(estoreService == null){
			return Result.badResult("参数错误");
		}
		int sendNum = estoreService.getServicePeopleNum();
		Settings Settings = settingsDao.findSettingsByProperty("settingKey", "sms_split_number");
		int smsCount = SmsUtil.getSmsCount(content, Integer.parseInt(Settings.getSettingValue()));
		//生成批次
		EstoreServiceSmsBatch batch = new EstoreServiceSmsBatch();
		batch.setContent(content);
		batch.setCreateTime(time);
		batch.setRealNum(sendNum*smsCount);
		batch.setSendNum(sendNum);
		batch.setServiceId(serviceId);
		estoreServiceSmsBatchDao.save(batch);
		//更新服务表
		estoreService.setOperatrAdminId(operatorId);
		estoreService.setServiceMode(EstoreService.SERVICE_MODE_SMS);
		estoreService.setServiceState(EstoreService.SERVICE_STATE_TO_PAY);
		estoreService.setServiceTime(time);
		estoreServiceDao.update(estoreService);
		SimpleEstoreServiceDTO dto = new SimpleEstoreServiceDTO(estoreService.getId(), estoreService.getServicePrice(),estoreService.getServiceType());
		return Result.rightResult(dto);
	}
	
	@Override
	public Result updateSmsBatch(EstoreServiceSmsBatch batch,String content,Long operatorId){
		EstoreService estoreService = estoreServiceDao.findById(batch.getServiceId());
		if(estoreService == null){
			return Result.badResult("参数错误");
		}
		estoreService.setOperatrAdminId(operatorId);
		estoreServiceDao.update(estoreService);
		//更新批次表
		Settings Settings = settingsDao.findSettingsByProperty("settingKey", "sms_split_number");
		int smsCount = SmsUtil.getSmsCount(content, Integer.parseInt(Settings.getSettingValue()));
		int realNum = batch.getSendNum() * smsCount;
		batch.setContent(content);
		batch.setRealNum(realNum);
		estoreServiceSmsBatchDao.update(batch);
		SimpleEstoreServiceDTO dto = new SimpleEstoreServiceDTO(estoreService.getId(), estoreService.getServicePrice(),estoreService.getServiceType());
		return Result.rightResult(dto);
	}
	
	@Override
	public Result saveOwnSmsBatch(String customerIds,String content,EstoreAdminDTO currentUser){
		Date time = new Date();
		String[] cids = customerIds.split(",");
		Settings Settings = settingsDao.findSettingsByProperty("settingKey", "sms_split_number");
		int smsCount = SmsUtil.getSmsCount(content, Integer.parseInt(Settings.getSettingValue()));
		int realCount = cids.length * smsCount;
		
		Settings set = settingsDao.findSettingsByProperty("settingKey", "sms_price");
		int smsPrice = Integer.parseInt(set.getSettingValue());//每条短信价格：分
		BigDecimal servicePrice = BigDecimalUtils.div(new BigDecimal(smsPrice * realCount), new BigDecimal(100), 2);
		
		//生成服务
		EstoreService estoreService = new EstoreService();
		estoreService.setStoreId(currentUser.getStoreId());
		estoreService.setServiceMode(EstoreService.SERVICE_MODE_SMS);
		estoreService.setServiceType(Integer.parseInt(ServiceTypeEnum.SERVICE_TYPE_OWN.getCode()));
		estoreService.setServiceState(EstoreService.SERVICE_STATE_TO_PAY);
		estoreService.setServicePrice(servicePrice);
		estoreService.setServicePeopleNum(cids.length);
		estoreService.setOperatrAdminId(currentUser.getId());
		estoreService.setServiceTime(time);
		estoreService.setCreateTime(time);
		estoreServiceDao.save(estoreService);
		
		//生成批次
		EstoreServiceSmsBatch batch = new EstoreServiceSmsBatch();
		batch.setContent(content);
		batch.setCreateTime(time);
		batch.setRealNum(realCount);
		batch.setSendNum(cids.length);
		batch.setServiceId(estoreService.getId());
		estoreServiceSmsBatchDao.save(batch);
		
		//批次详情入redis
		redis.hset(RedisKey.OWN_BATCH_USER_HASH, estoreService.getId().toString(), customerIds, RedisKey.EXPIRED_TIME);
		
		SimpleEstoreServiceDTO dto = new SimpleEstoreServiceDTO(estoreService.getId(), estoreService.getServicePrice(),estoreService.getServiceType());
		return Result.rightResult(dto);
	}
	
	@Override
	public List<EstoreServiceSmsBatch> findByLastUpdateTime(Date lastUpdateTime, int currentPage, int pageSize){
		return estoreServiceSmsBatchDao.findByLastUpdateTime(lastUpdateTime, currentPage, pageSize);
	}

}
