package com.emay.estore.service.estore.impl;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dao.estore.EstoreCardTypeDao;
import com.emay.estore.dao.estore.EstoreStoreDao;
import com.emay.estore.dto.estore.StoreDTO;
import com.emay.estore.pojo.estore.EstoreCardType;
import com.emay.estore.pojo.estore.EstoreStore;
import com.emay.estore.service.estore.EstoreStoreService;
import com.emay.estore.util.FileNameComparator;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
@Service
public class EstoreStoreServiceImpl implements EstoreStoreService {
	@Resource
	private EstoreStoreDao estoreStoreDao;
	@Resource
	private EstoreCardTypeDao estoreCardTypeDao;

	@Override
	public Result updateDescribe(Long storeId, String describe) {
		estoreStoreDao.updateDescribe(storeId, describe);
		return Result.rightResult();
	}

	@Override
	public Result updateMobile(Long storeId, String mobile) {
		estoreStoreDao.updateMobile(storeId, mobile);
		return Result.rightResult();
	}

	@Override
	public Result updateAddress(Long storeId, String address, BigDecimal longitude, BigDecimal dimension) {
		estoreStoreDao.updateAddress(storeId, address, longitude, dimension);
		return Result.rightResult();
	}

	@Override
	public StoreDTO find(Long storeId) {
		EstoreStore store = estoreStoreDao.findById(storeId);
		StoreDTO dto = store.getDTO();
		List<String> list = new ArrayList<String>();
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.STOREIMGPATH + storeId + "/";
		File fileTemp = new File(path);
		// 判断文件是否存在
		boolean falg = false;
		falg = fileTemp.exists();
		if (falg) {
			if (true == fileTemp.isDirectory()) {
				String[] png = fileTemp.list();
				Arrays.sort(png, new FileNameComparator());//按名称排序
				for (int i = 0; i < png.length; i++) {
					list.add(CommonConstants.STOREIMGPATH + storeId + "/" + png[i]);
				}
				dto.setImgList(list);
			}
		}
		return dto;
	}

	@Override
	public Page<EstoreStore> findStore(int start, int limit, String name, String storeLicence, String appId, String appSecret, String mobile) {
		return estoreStoreDao.findStore(start, limit, name, storeLicence, appId, appSecret, mobile);
	}

	@Override
	public Result addStore(String name, String storeLicence, String appId, String appSecret) {
		List<EstoreStore> es = estoreStoreDao.findRepeatByName(name, null);
		if (es.size() > 0) {
			return Result.badResult("企业已存在");
		}
		EstoreStore estoreStore = new EstoreStore();
		estoreStore.setName(name);
		estoreStore.setStoreLicence(storeLicence);
		estoreStore.setAppId(appId);
		estoreStore.setAppSecret(appSecret);
		estoreStore.setCreateTime(new Date());
		// 商店默认状态启用 20180622
		estoreStore.setState(EstoreStore.ON);
		estoreStoreDao.save(estoreStore);
		// 添加三张默认卡片
		EstoreCardType c1 = new EstoreCardType(CommonConstants.GOLD_LV, estoreStore.getId(), CommonConstants.GOLD, CommonConstants.CARD_DESC, new Date());
		EstoreCardType c2 = new EstoreCardType(CommonConstants.SILVER_LV, estoreStore.getId(), CommonConstants.SILVER, CommonConstants.CARD_DESC, new Date());
		EstoreCardType c3 = new EstoreCardType(CommonConstants.COPPER_LV, estoreStore.getId(), CommonConstants.COPPER, CommonConstants.CARD_DESC, new Date());
		List<EstoreCardType> list = new ArrayList<EstoreCardType>();
		list.add(c1);
		list.add(c2);
		list.add(c3);
		estoreCardTypeDao.saveBatch(list);
		return Result.rightResult();
	}

	@Override
	public Result updateStore(String name, String storeLicence, String appId, String appSecret, Long storeId) {
		List<EstoreStore> es = estoreStoreDao.findRepeatByName(name, storeId);
		if (es.size() > 0) {
			return Result.badResult("企业已存在");
		}
		estoreStoreDao.updateStore(name, storeLicence, appId, appSecret, storeId);
		return Result.rightResult();
	}

	@Override
	public Result updateStoreState(Long storeId, Integer state) {
		estoreStoreDao.updateStoreState(storeId, state);
		return Result.rightResult();
	}

	@Override
	public Boolean checkData(Long storeId) {
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.STOREDATAPATH + storeId + "/";
		File fileTemp = new File(path);
		// 判断文件是否存在
		boolean falg = false;
		falg = fileTemp.exists();
		if (falg) {
			if (true == fileTemp.isDirectory() && fileTemp.list().length > 0) {
				return falg;
			} else {
				falg = false;
			}
		}
		return falg;
	}
	
	@Override
	public EstoreStore findById(Long id){
		return estoreStoreDao.findById(id);
	}
}
