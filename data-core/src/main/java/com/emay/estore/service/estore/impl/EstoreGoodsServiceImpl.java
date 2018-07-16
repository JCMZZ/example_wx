package com.emay.estore.service.estore.impl;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.BigDecimalUtils;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dao.estore.EstoreGoodsDao;
import com.emay.estore.dto.estore.GoodsDTO;
import com.emay.estore.pojo.estore.EstoreGoods;
import com.emay.estore.service.estore.EstoreGoodsService;
import com.emay.estore.util.FileNameComparator;
import com.emay.estore.util.FileUtil;

@Service
public class EstoreGoodsServiceImpl implements EstoreGoodsService {
	@Resource
	private EstoreGoodsDao estoreGoodsDao;
	Logger logger = Logger.getLogger(EstoreGoodsServiceImpl.class);

	/**
	 * 商品列表
	 */
	@Override
	public Page<GoodsDTO> findGoods(Long storeId, int start, int limit, Integer orderType, Integer orderMethod) {
		Page<GoodsDTO> page = estoreGoodsDao.findGoods(storeId, start, limit, orderType, orderMethod);
		for (GoodsDTO dto : page.getList()) {
			String path = CommonConstants.IMG_BASE_PATH + CommonConstants.GOODSIMGPATH + storeId + "/" + dto.getId() + "/";
			File fileTemp = new File(path);
			if (fileTemp.exists() && fileTemp.isDirectory()) {
				String[] imgArr = fileTemp.list();
				dto.setImgUrl(CommonConstants.GOODSIMGPATH + storeId + "/" + dto.getId() + "/" + imgArr[0]);
			}
		}
		return page;
	}

	/**
	 * 商品详情展示
	 */
	@Override
	public Result findGoodsInfo(Long goodsId, Long storeId) {
		EstoreGoods goods = estoreGoodsDao.findById(goodsId);
		if (goods == null) {
			return Result.badResult("数据不存在");
		}
		if (!goods.getStoreId().equals(storeId)) {
			return Result.badResult("参数错误");
		}
		GoodsDTO dto = new GoodsDTO();
		BeanUtils.copyProperties(goods, dto);

		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.GOODSIMGPATH + dto.getStoreId() + "/" + dto.getId() + "/";
		File fileTemp = new File(path);
		if (fileTemp.exists() && fileTemp.isDirectory()) {
			List<String> list = new ArrayList<String>();
			String[] png = fileTemp.list();
			Arrays.sort(png, new FileNameComparator());
			for (int i = 0; i < png.length; i++) {
				list.add(CommonConstants.GOODSIMGPATH + dto.getStoreId() + "/" + dto.getId() + "/" + png[i]);
			}
			dto.setImgList(list);
		}
		return Result.rightResult(dto);
	}

	/**
	 * 修改描述
	 */

	@Override
	public Result updateDescribe(Long id, String GoodsDescribe) {
		estoreGoodsDao.updateDescribe(id, GoodsDescribe);
		return Result.rightResult();
	}

	/**
	 * 修改名称
	 */
	@Override
	public Result updateName(Long id, String name) {
		estoreGoodsDao.updateName(id, name);
		return Result.rightResult();
	}

	/**
	 * 修改原价
	 */
	@Override
	public Result updatePrice(Long id, BigDecimal price) {
		EstoreGoods estoreGoods = estoreGoodsDao.findById(id);
		if (estoreGoods == null) {
			return Result.badResult("参数错误");
		}
		BigDecimal discountPrice = estoreGoods.getDiscountPrice();
		BigDecimal discount = BigDecimalUtils.div(BigDecimalUtils.mul(discountPrice, 10), price, 2);
		if (discount.compareTo(new BigDecimal(0)) !=1 || discount.compareTo(new BigDecimal(10)) == 1) {
			return Result.badResult("原价错误");
		}
		estoreGoods.setDiscount(discount);
		estoreGoods.setPrice(price);
		estoreGoodsDao.update(estoreGoods);
		return Result.rightResult(discount);
	}

	/**
	 * 修改折扣价
	 */
	@Override
	public Result updateDiscountPrice(Long id, BigDecimal discountPrice) {
		EstoreGoods estoreGoods = estoreGoodsDao.findById(id);
		if (estoreGoods == null) {
			return Result.badResult("参数错误");
		}
		BigDecimal price = estoreGoods.getPrice();
		BigDecimal discount = BigDecimalUtils.div(BigDecimalUtils.mul(discountPrice, 10), price, 2);
		if (discount.compareTo(new BigDecimal(0)) != 1 || discount.compareTo(new BigDecimal(10)) == 1) {
			return Result.badResult("折扣价错误");
		}
		estoreGoods.setDiscount(discount);
		estoreGoods.setDiscountPrice(discountPrice);
		estoreGoodsDao.update(estoreGoods);
		return Result.rightResult(discount);
	}

	/**
	 * 删除商品
	 */
	@Override
	public Result deleteGoods(Long id, Long storeId) {
		EstoreGoods estoreGoods = estoreGoodsDao.findById(id);
		if (estoreGoods == null) {
			return Result.badResult("参数错误");
		}
		if (!estoreGoods.getStoreId().equals(storeId)) {
			return Result.badResult("参数错误");
		}
		estoreGoods.setIsDelete(true);
		estoreGoodsDao.update(estoreGoods);

		// 同时删除该商品图片
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.GOODSIMGPATH + storeId + "/" + id + "/";
		File file = new File(path);
		if (file.exists() && file.isDirectory()) {
			Boolean flag = FileUtil.deleteDir(file);
			if (flag) {
				logger.info("删除商品图片成功，path:" + CommonConstants.GOODSIMGPATH + storeId + "/" + id);
			} else {
				logger.error("删除商品图片失败，path:" + CommonConstants.GOODSIMGPATH + storeId + "/" + id);
			}

		}
		return Result.rightResult();
	}

	/**
	 * 商品置顶
	 */
	@Override
	public Result updateStick(Long id, Long storeId) {
		estoreGoodsDao.updateStick(id, storeId);
		return Result.rightResult();
	}

	@Override
	public Result addGoods(Long storeId, String name, String goodsDescribe, BigDecimal price, BigDecimal discountPrice) {
		Result result = estoreGoodsDao.addGoods(storeId, name, goodsDescribe, price, discountPrice);
		return result;
	}

	@Override
	public Boolean isExist(String goodsName, Long id, Long storeId) {
		GoodsDTO dto = estoreGoodsDao.findByName(goodsName, id, storeId);
		if (dto != null) {
			return true;
		}
		return false;
	}

	@Override
	public Page<GoodsDTO> findPcGoods(String goodsName, String storeName, Date startDate, Date endDate, int start, int limit) {
		Page<GoodsDTO> page = estoreGoodsDao.findPcGoods(goodsName, storeName, startDate, endDate, start, limit);
		for (GoodsDTO dto : page.getList()) {
			String path = CommonConstants.IMG_BASE_PATH + CommonConstants.GOODSIMGPATH + dto.getStoreId() + "/" + dto.getId() + "/";
			File fileTemp = new File(path);
			if (fileTemp.exists() && fileTemp.isDirectory()) {
				List<String> list = new ArrayList<String>();
				String[] png = fileTemp.list();
				Arrays.sort(png, new FileNameComparator());
				for (int i = 0; i < png.length; i++) {
					list.add(CommonConstants.GOODSIMGPATH + dto.getStoreId() + "/" + dto.getId() + "/" + png[i]);
				}
				dto.setImgList(list);
			}
		}
		return page;
	}
}
