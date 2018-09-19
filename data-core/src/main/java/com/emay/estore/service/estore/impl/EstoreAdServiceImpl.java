package com.emay.estore.service.estore.impl;

import java.io.File;
import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dao.estore.EstoreAdDao;
import com.emay.estore.dto.estore.EstoreAdDTO;
import com.emay.estore.pojo.estore.EstoreAd;
import com.emay.estore.service.estore.EstoreAdService;

@Service
public class EstoreAdServiceImpl implements EstoreAdService {

	@Resource
	private EstoreAdDao estoreAdDao;

	@Override
	public Page<EstoreAdDTO> findPage(String linkPath, int start, int limit) {
		Page<EstoreAdDTO> page = estoreAdDao.findPage(linkPath, start, limit);
		for (EstoreAdDTO dto : page.getList()) {
			String path = CommonConstants.IMG_BASE_PATH + CommonConstants.ADIMGPATH + dto.getId() + "/";
			File fileTemp = new File(path);
			if (fileTemp.exists() && fileTemp.isDirectory()) {
				String[] imgArr = fileTemp.list();
				dto.setImageUrl(CommonConstants.IMG_ACCESS_BASE_PATH+CommonConstants.ADIMGPATH + dto.getId() + "/" + imgArr[0]);
			}
		}
		return page;
	}
	
	@Override
	public Result addAd(String linkPath){
		EstoreAd entity = new EstoreAd();
		entity.setLinkPath(linkPath);
		entity.setCreateTime(new Date());
		estoreAdDao.save(entity);
		return Result.rightResult(entity.getId());
	}
	
	@Override
	public Result modifyAd(Long id,String linkPath){
		if(id == null || id.longValue() <= 0l){
			return Result.badResult("参数不正确");
		}
		EstoreAd entity = estoreAdDao.findById(id);
		if(entity == null){
			return Result.badResult("数据不存在");
		}
		entity.setLinkPath(linkPath);
		estoreAdDao.update(entity);
		return Result.rightResult();
	}
	
	@Override
	public EstoreAd findById(Long id){
		return estoreAdDao.findById(id);
	}
}
