package com.emay.estore.service.estore.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dao.estore.EstoreAdminDao;
import com.emay.estore.dao.estore.EstoreCardDao;
import com.emay.estore.dao.estore.EstoreCardTypeDao;
import com.emay.estore.dao.estore.EstoreCustomerDao;
import com.emay.estore.dao.estore.EstoreUserDao;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.dto.estore.user.EstoreCacheUserDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerInfoDTO;
import com.emay.estore.dto.estore.wx.WxUserInfoDTO;
import com.emay.estore.pojo.estore.EstoreAdmin;
import com.emay.estore.pojo.estore.EstoreCard;
import com.emay.estore.pojo.estore.EstoreCardType;
import com.emay.estore.pojo.estore.EstoreCustomer;
import com.emay.estore.pojo.estore.EstoreUser;
import com.emay.estore.service.estore.EstoreUserService;
import com.emay.estore.util.FileDownloadUtils;
import com.emay.estore.util.OnlyIdGenerator;
import com.emay.estore.util.RandomNumberUtils;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

@Service
public class EstoreUserServiceImpl implements EstoreUserService {

	@Resource
	private EstoreUserDao estoreUserDao;
	@Resource
	private EstoreAdminDao estoreAdminDao;
	@Resource
	private EstoreCustomerDao estoreCustomerDao;
	@Resource
	private EstoreCardTypeDao estoreCardTypeDao;
	@Resource
	private EstoreCardDao estoreCardDao;

	@Override
	public Result saveBusinessUser(WxUserInfoDTO dto) {
		Date time = new Date();
		EstoreUser user = new EstoreUser();
		user.setCity(dto.getCity());
		user.setCountry(dto.getCountry());
		user.setCreateTime(time);
		user.setGender(dto.getGender() == null ? null : Integer.valueOf(dto.getGender()));
		user.setLanguage(dto.getLanguage());
		user.setProvince(dto.getProvince());
		estoreUserDao.save(user);

		EstoreAdmin admin = new EstoreAdmin();
		admin.setCreateTime(time);
		admin.setNickname(dto.getNickName());
		admin.setUnionid(dto.getUnionId());
		admin.setUserId(user.getId());
		admin.setWxOpenId(dto.getOpenId());
		admin.setStoreId(0l);
		estoreAdminDao.save(admin);
		
		//保存用户头像
		String savePath = CommonConstants.IMG_BASE_PATH + CommonConstants.HEADIMGPATH_B + admin.getId() + "/";
		String imageName = System.currentTimeMillis()+".jpg";
		FileDownloadUtils.downLoadFromUrl(dto.getAvatarUrl(), imageName, savePath);

		// EstoreAdminDTO estoreAdminDTO = new EstoreAdminDTO();
		// BeanUtils.copyProperties(estoreAdminDTO, user);
		// BeanUtils.copyProperties(estoreAdminDTO, admin);
		return Result.rightResult();
	}

	@Override
	public Result saveCustomerUser(WxUserInfoDTO dto, Long storeId) {
		Date time = new Date();
		EstoreUser user = new EstoreUser();
		user.setCity(dto.getCity());
		user.setCountry(dto.getCountry());
		user.setCreateTime(time);
		user.setGender(dto.getGender() == null ? null : Integer.valueOf(dto.getGender()));
		user.setLanguage(dto.getLanguage());
		user.setProvince(dto.getProvince());
		estoreUserDao.save(user);

		EstoreCustomer customer = new EstoreCustomer();
		customer.setCreateTime(time);
		customer.setNickname(dto.getNickName());
		customer.setUnionid(dto.getUnionId());
		customer.setUserId(user.getId());
		customer.setWxOpenId(dto.getOpenId());
		customer.setStoreId(storeId);
		customer.setBalance(new BigDecimal("0.00"));
		customer.setScore(new BigDecimal(0));
		estoreCustomerDao.save(customer);

		// 默认给用户分配铜卡
		EstoreCardType estoreCardType = estoreCardTypeDao.findByStoreIdAndLevel(storeId, CommonConstants.COPPER_LV);
		EstoreCard card = new EstoreCard();
		card.setCardTypeId(estoreCardType.getId());
		card.setCreateTime(time);
		String randomStr = RandomNumberUtils.getRandomCode(3);
		card.setNumber(OnlyIdGenerator.genOnlyId(randomStr));// 18位唯一卡号
		card.setUserCustomerId(customer.getId());
		estoreCardDao.save(card);
		
		//保存用户头像
		String savePath = CommonConstants.IMG_BASE_PATH + CommonConstants.HEADIMGPATH_C + customer.getId() + "/";
		String imageName = System.currentTimeMillis()+".jpg";
		FileDownloadUtils.downLoadFromUrl(dto.getAvatarUrl(), imageName, savePath);
		
		EstoreCacheUserDTO estoreCacheUserDTO = new EstoreCacheUserDTO(customer.getId(), dto.getUnionId(), dto.getOpenId(), user.getId(), storeId);
		return Result.rightResult(estoreCacheUserDTO);
	}

	@Override
	public Result updateUserMobile(Long userId, String mobile) {
		estoreUserDao.updateUserMobile(userId, mobile);
		return Result.rightResult();
	}

	@Override
	public EstoreUser findByMobile(String mobile) {
		return estoreUserDao.findUserByProperty("mobile", mobile);
	}

	@Override
	public void deleteById(Long id) {
		estoreUserDao.deleteUserByProperty("id", id);
	}

	@Override
	public Page<EstoreUser> findPage(int start, int limit, String mobile) {
		return estoreUserDao.findPage(start, limit, mobile);
	}

	@Override
	public Map<String, Object> findUserDetail(Long userId) {
		List<EstoreCustomerInfoDTO> cs = estoreCustomerDao.findDTOByUserId(userId);
		List<EstoreAdminDTO> bs = estoreAdminDao.findDTOByUserId(userId);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("B", bs);
		map.put("C", cs);
		return map;
	}

}
