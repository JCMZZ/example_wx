package com.emay.estore.web.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.MessageFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dto.estore.GoodsDTO;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.estore.EstoreGoodsService;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.util.ResponseUtils;
import com.emay.estore.web.utils.WebUtils;

@Controller
@RequestMapping("/goods")
public class EstoreGoodsController {
	@Resource
	private EstoreGoodsService estoreGoodsService;
	@Resource
	private UserOperLogService userOperLogService;
	Logger logger = Logger.getLogger(EstoreGoodsController.class);

	/**
	 * 商品列表展示
	 * 
	 * @param request
	 * @param response
	 * @param model
	 */
	@RequestMapping("/findGoods")
	public void findGoods(HttpServletRequest request, HttpServletResponse response, Model model) {
		Integer orderType = RequestUtils.getIntParameter(request, "orderType", 0);// 排序类型：0置顶 1价格
		Integer orderMethod = RequestUtils.getIntParameter(request, "orderMethod", 0);// 排序方式：0倒序1正序
		EstoreAdminDTO estoreAdminDTO = WebUtils.getCurrentUser(request, response);
		int start = RequestUtils.getIntParameter(request, "start", 1);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		Long storeId = estoreAdminDTO.getStoreId();
		Page<GoodsDTO> list = estoreGoodsService.findGoods(storeId, (start - 1) * limit, limit, orderType, orderMethod);
		ResponseUtils.outputWithJson(response, Result.rightResult(list));
	}

	/**
	 * 商品详情
	 */
	@RequestMapping("/info")
	public void findGoodsInfo(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long goodsId = RequestUtils.getLongParameter(request, "goodsId", 0L);// goodsId
		Result result = estoreGoodsService.findGoodsInfo(goodsId, eadto.getStoreId());
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 修改描述
	 * 
	 * @param request
	 * @param response
	 * @param model
	 */
	@RequestMapping("/updateGoodsDescribe")
	public void updateDescribe(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long id = RequestUtils.getLongParameter(request, "id", 0L);// goodsId
		String goodsDescribe = RequestUtils.getParameter(request, "goodsDescribe");// describe
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);

		Result result = estoreGoodsService.updateDescribe(id, goodsDescribe);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "产品管理";
			String context = "编辑产品描述:{0}，产品id：{1}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { goodsDescribe, id }), UserOperLog.OPERATE_MODIFY);
			logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，编辑产品描述：" + goodsDescribe + "，产品id：" + id);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 修改名称
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @throws IOException
	 */
	@RequestMapping("/updateName")
	public void updateName(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long id = RequestUtils.getLongParameter(request, "id", 0L);
		String name = RequestUtils.getParameter(request, "name");
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);
		Result result = checkName(name, id, currentUser.getStoreId());
		if (!result.getSuccess()) {
			ResponseUtils.outputWithJson(response, result);
			return;
		}
		result = estoreGoodsService.updateName(id, name);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "产品管理";
			String context = "编辑产品名称{0}，产品id：{1}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { name, id }), UserOperLog.OPERATE_MODIFY);
			logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，编辑产品名称：" + name + "，产品id：" + id);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 修改原价
	 * 
	 * @param request
	 * @param response
	 * @param model
	 */
	@RequestMapping("/updatePrice")
	public void updatePrice(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long id = RequestUtils.getLongParameter(request, "id", 0L);// goodsId
		BigDecimal price = RequestUtils.getBigDecimalParameter(request, "price", new BigDecimal("0.00"));
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);

		Result result = estoreGoodsService.updatePrice(id, price);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "产品管理";
			String context = "编辑产品原价{0}，产品id：{1}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { price, id }), UserOperLog.OPERATE_MODIFY);
			logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，编辑产品原价：" + price + "，产品id：" + id);
		}
		ResponseUtils.outputWithJson(response, result);

	}

	/**
	 * 修改折扣价
	 * 
	 * @param request
	 * @param response
	 * @param model
	 */
	@RequestMapping("/updateDiscountPrice")
	public void updateDiscountPrice(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long id = RequestUtils.getLongParameter(request, "id", 0L);// goodsId
		BigDecimal discountPrice = RequestUtils.getBigDecimalParameter(request, "discountPrice", new BigDecimal("0.00"));
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);

		Result result = estoreGoodsService.updateDiscountPrice(id, discountPrice);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "产品管理";
			String context = "编辑产品折后价{0}，产品id：{1}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { discountPrice, id }), UserOperLog.OPERATE_MODIFY);
			logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，编辑产品折后价：" + discountPrice + "，产品id：" + id);
		}
		ResponseUtils.outputWithJson(response, result);

	}

	/**
	 * 刪除商品
	 * 
	 * @param request
	 * @param response
	 * @param model
	 */
	@RequestMapping("/delectGoods")
	public void updateGoods(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long id = RequestUtils.getLongParameter(request, "id", 0L);// goodsId
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);

		Result result = estoreGoodsService.deleteGoods(id, currentUser.getStoreId());
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "产品管理";
			String context = "删除产品，产品id：{0}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { id }), UserOperLog.OPERATE_DELETE);
			logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，删除产品，产品id：" + id);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	/**
	 * 添加商品
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/addGoods")
	public void addGoods(HttpServletRequest request, HttpServletResponse response, Model model) {
		// 参数
		String goodsName = null;
		String goodsDescribe = null;
		BigDecimal price = null;
		BigDecimal discountPrice = null;

		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);
		Long storeId = currentUser.getStoreId();

		// 获得磁盘文件条目工厂
		DiskFileItemFactory factory = new DiskFileItemFactory();

		// 如果没以下两行设置的话,上传大的文件会占用很多内存，
		// 设置暂时存放的存储室,这个存储室可以和最终存储文件的目录不同
		/**
		 * 原理: 它是先存到暂时存储室，然后再真正写到对应目录的硬盘上， 按理来说当上传一个文件时，其实是上传了两份，第一个是以 .tem 格式的
		 * 然后再将其真正写到对应目录的硬盘上
		 */
		// factory.setRepository(dir);
		// 设置缓存的大小，当上传文件的容量超过该缓存时，直接放到暂时存储室
		factory.setSizeThreshold(1024 * 1024);
		// 高水平的API文件上传处理
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");
		List<FileItem> list;
		FileItem picture = null;
		try {
			list = upload.parseRequest(request);
			for (FileItem item : list) {
				// 如果获取的表单信息是普通的 文本 信息
				if (item.isFormField()) {
					String temp = new String(item.getString().getBytes("iso8859-1"), "utf-8");
					if ("goodsName".equals(item.getFieldName())) {
						goodsName = temp;
					} else if ("goodsDescribe".equals(item.getFieldName())) {
						goodsDescribe = temp;
					} else if ("price".equals(item.getFieldName())) {
						price = new BigDecimal(temp);
					} else if ("discountPrice".equals(item.getFieldName())) {
						discountPrice = new BigDecimal(temp);
					}
				} else {
					picture = item;
				}
			}
		} catch (FileUploadException e) {
			logger.error("图片上传异常：", e);
		} catch (UnsupportedEncodingException e1) {
			logger.error("编码异常：", e1);
		}
		Result result = checkGoods(goodsName, goodsDescribe, price, discountPrice, storeId);
		if (!result.getSuccess()) {
			ResponseUtils.outputWithJson(response, result);
			return;
		}

		if (picture == null) {
			ResponseUtils.outputWithJson(response, Result.badResult("请上传支持的图片格式文件"));
			return;
		}
		Long size = picture.getSize();
		if (size > CommonConstants.IMGMAXSIZE) {
			ResponseUtils.outputWithJson(response, Result.badResult("文件过大"));
			return;
		}
		// 获取表单的属性名字
		String name = picture.getName();
		// 获取文件后缀
		String suffix = name.substring(name.lastIndexOf(".") + 1);
		if (!CommonConstants.IMGTYPE.contains(suffix)) {
			ResponseUtils.outputWithJson(response, Result.badResult("请上传支持的图片格式文件"));
			return;
		}

		Long goodsId = null;
		result = estoreGoodsService.addGoods(storeId, goodsName, goodsDescribe, price, discountPrice);
		if (result.getSuccess()) {
			goodsId = (Long) result.getResult();
		}

		// 获取文件需要上传到的路径
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.GOODSIMGPATH + storeId + "/" + goodsId + "/";
		logger.info("path: " + path);
		File dir = new File(path);
		if (!dir.exists()) {
			dir.mkdirs();
		} else {
			if (true == dir.isDirectory() && dir.list().length >= 5) {
				ResponseUtils.outputWithJson(response, Result.badResult("上传图片最多5张"));
				return;
			}
		}
		factory.setRepository(dir);

		// 自定义上传图片的名字为时间毫秒数.jpg
		String fileName = new Date().getTime() + "." + suffix;
		String destPath = path + fileName;
		logger.debug("destPath=" + destPath);
		File file = new File(destPath);
		OutputStream out = null;
		InputStream in = null;
		try {
			out = new FileOutputStream(file);
			in = picture.getInputStream();
			int length = 0;
			byte[] buf = new byte[1024];
			while ((length = in.read(buf)) != -1) {
				out.write(buf, 0, length);
			}
		} catch (IOException e) {
			logger.error("图片上传异常：", e);
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException e) {
				logger.error("图片上传异常：", e);
			}
		}
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "产品管理";
			String context = "添加产品，产品名称：{0}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { goodsName }), UserOperLog.OPERATE_ADD);
			logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，添加产品，产品名称：" + goodsName);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	private Result checkGoods(String goodsName, String description, BigDecimal price, BigDecimal discountPrice, Long storeId) {
		Result result = checkName(goodsName, null, storeId);
		if (!result.getSuccess()) {
			return result;
		}
		if (StringUtils.isEmpty(description)) {
			return Result.badResult("描述不能为空");
		}
		BigDecimal decimal = new BigDecimal(0);
		if (price == null || price.compareTo(decimal) != 1) {
			return Result.badResult("价格不正确");
		}
		if (discountPrice == null || discountPrice.compareTo(decimal) != 1) {
			return Result.badResult("原价不正确");
		}
		return Result.rightResult();
	}

	private Result checkName(String goodsName, Long id, Long storeId) {
		if (StringUtils.isEmpty(goodsName)) {
			return Result.badResult("产品名称不能为空");
		}
		Boolean isExist = estoreGoodsService.isExist(goodsName, id, storeId);
		if (isExist) {
			return Result.badResult("产品名称已存在");
		}
		return Result.rightResult();
	}

	/**
	 * 刪除图片
	 */
	@RequestMapping("/deleteImg")
	public void deleteImg(HttpServletRequest request, HttpServletResponse response, Model model) {
		String imgName = RequestUtils.getParameter(request, "imgName");// 图片名称
		Long id = RequestUtils.getLongParameter(request, "id", 0l);// 产品id

		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);
		Long storeId = currentUser.getStoreId();
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.GOODSIMGPATH + storeId + "/" + id + "/" + imgName;
		File file = new File(path);
		if (true == file.isFile()) {
			Boolean flag = file.delete();
			if (flag) {
				ResponseUtils.outputWithJson(response, Result.rightResult("删除成功"));
				String service = "小程序b端服务";
				String module = "产品管理";
				String context = "删除产品图片，图片名称：{0}，产品id：{1}";
				userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { imgName,id }), UserOperLog.OPERATE_DELETE);
				logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，删除产品图片，图片名称：" + imgName+"，产品id："+id);
				return;
			}
		}
		ResponseUtils.outputWithJson(response, Result.badResult("删除失败"));
	}

	/**
	 * 添加图片
	 */
	@RequestMapping("/uploadImg")
	@SuppressWarnings("unchecked")
	public void uploadImg(HttpServletRequest request, HttpServletResponse response, Model model) {
		// 参数
		Long goodsId = null;

		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);
		Long storeId = currentUser.getStoreId();

		// request.setCharacterEncoding("utf-8"); // 设置编码
		// 获得磁盘文件条目工厂
		DiskFileItemFactory factory = new DiskFileItemFactory();

		// 如果没以下两行设置的话,上传大的文件会占用很多内存，
		// 设置暂时存放的存储室,这个存储室可以和最终存储文件的目录不同
		/**
		 * 原理: 它是先存到暂时存储室，然后再真正写到对应目录的硬盘上， 按理来说当上传一个文件时，其实是上传了两份，第一个是以 .tem 格式的
		 * 然后再将其真正写到对应目录的硬盘上
		 */
		// factory.setRepository(dir);
		// 设置缓存的大小，当上传文件的容量超过该缓存时，直接放到暂时存储室
		factory.setSizeThreshold(1024 * 1024);
		// 高水平的API文件上传处理
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");
		FileItem picture = null;
		try {
			List<FileItem> list = upload.parseRequest(request);
			for (FileItem item : list) {
				// 如果获取的表单信息是普通的 文本 信息
				if (item.isFormField()) {
					String temp = new String(item.getString().getBytes("iso8859-1"), "utf-8");
					if ("goodsId".equals(item.getFieldName())) {
						goodsId = Long.valueOf(temp);
					}
				} else {
					picture = item;
				}
			}
		} catch (FileUploadException e) {
			logger.error("图片上传异常：", e);
		} catch (UnsupportedEncodingException e1) {
			logger.error("编码异常：", e1);
		}
		if (goodsId == null || goodsId.longValue() == 0) {
			ResponseUtils.outputWithJson(response, Result.badResult("参数错误"));
			return;
		}
		if (picture == null) {
			ResponseUtils.outputWithJson(response, Result.badResult("请上传支持的图片格式文件"));
			return;
		}
		Long size = picture.getSize();
		if (size > CommonConstants.IMGMAXSIZE) {
			ResponseUtils.outputWithJson(response, Result.badResult("文件过大"));
			return;
		}
		// 获取表单的属性名字
		// String name = picture.getFieldName();
		String name = picture.getName();
		// 获取文件后缀
		String suffix = name.substring(name.lastIndexOf(".") + 1);
		if (!CommonConstants.IMGTYPE.contains(suffix)) {
			ResponseUtils.outputWithJson(response, Result.badResult("请上传支持的图片格式文件"));
			return;
		}

		// 获取文件需要上传到的路径
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.GOODSIMGPATH + storeId + "/" + goodsId + "/";
		logger.info("path: " + path);
		File dir = new File(path);
		if (!dir.exists()) {
			dir.mkdirs();
		} else {
			if (true == dir.isDirectory() && dir.list().length >= 5) {
				ResponseUtils.outputWithJson(response, Result.badResult("上传图片最多5张"));
				return;
			}
		}
		factory.setRepository(dir);

		// 自定义上传图片的名字为时间毫秒数.jpg
		String fileName = new Date().getTime() + "." + suffix;
		String destPath = path + fileName;
		logger.debug("destPath=" + destPath);
		File file = new File(destPath);
		OutputStream out = null;
		InputStream in = null;
		try {
			out = new FileOutputStream(file);
			in = picture.getInputStream();
			int length = 0;
			byte[] buf = new byte[1024];
			while ((length = in.read(buf)) != -1) {
				out.write(buf, 0, length);
			}
		} catch (IOException e) {
			logger.error("图片上传异常：", e);
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException e) {
				logger.error("图片上传异常：", e);
			}
		}
		String service = "小程序b端服务";
		String module = "产品管理";
		String context = "添加产品图片，图片名称：{0}，产品id：{1}";
		userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { fileName,goodsId }), UserOperLog.OPERATE_ADD);
		logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，添加产品图片，图片名称：" + fileName+"，产品id："+goodsId);
		ResponseUtils.outputWithJson(response, Result.rightResult("上传成功"));
	}

	/**
	 * 商品置顶
	 * 
	 * @param request
	 * @param response
	 * @param model
	 */
	@RequestMapping("/stick")
	public void stick(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long id = RequestUtils.getLongParameter(request, "id", 0L);
		EstoreAdminDTO currentUser = WebUtils.getCurrentUser(request, response);
		Result result = estoreGoodsService.updateStick(id, currentUser.getStoreId());
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "产品管理";
			String context = "产品置顶，产品id：{0}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getNickname(), MessageFormat.format(context, new Object[] { id }), UserOperLog.OPERATE_MODIFY);
			logger.info("【小程序b端服务>产品管理】-->B端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getNickname() + "，置顶产品，产品id：" + id);
		}
		ResponseUtils.outputWithJson(response, result);
	}
}
