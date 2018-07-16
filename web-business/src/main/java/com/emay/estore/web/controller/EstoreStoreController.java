package com.emay.estore.web.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dto.estore.StoreDTO;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.estore.EstoreStoreService;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.util.RegularCheckUtils;
import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

@Controller
@RequestMapping("/store")
public class EstoreStoreController {
	@Resource
	private EstoreStoreService estoreStoreService;
	@Resource
	private UserOperLogService userOperLogService;
	Logger logger = Logger.getLogger(EstoreStoreController.class);

	/*
	 * 商户信息回显
	 */
	@RequestMapping("/selectStore")
	public void selectStore(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		StoreDTO dto = estoreStoreService.find(storeId);
		ResponseUtils.outputWithJson(response, Result.rightResult(dto));
	}

	/*
	 * 商户简述更新
	 */
	@RequestMapping("/updateDescribe")
	public void updateDescribe(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		String describe = RequestUtils.getParameter(request, "describe");// describe
		if (StringUtils.isBlank(describe)) {
			ResponseUtils.outputWithJson(response, Result.badResult("简述不能为空"));
			return;
		}
		if (describe.length() > 300) {
			ResponseUtils.outputWithJson(response, Result.badResult("简述应少于300字"));
			return;
		}
		Result result = estoreStoreService.updateDescribe(storeId, describe);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "企业管理";
			String context = "更新企业描述，企业id为:{0} 描述:{1}";
			logger.info("【小程序b端服务>" + module + "】-->B端用户id：" + eadto.getId() + "用户:" + eadto.getNickname() + "对企业描述进行了更新,企业id为：" + eadto.getStoreId() + "描述为：" + describe);
			userOperLogService.saveLog(service, module, eadto.getId(), eadto.getNickname(), MessageFormat.format(context, new Object[] { storeId, describe }), UserOperLog.OPERATE_MODIFY);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	/*
	 * 商户手机号更新
	 */
	@RequestMapping("/updateMobile")
	public void updateMobile(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		String mobile = RequestUtils.getParameter(request, "mobile");// mobile
		if (StringUtils.isBlank(mobile) || !RegularCheckUtils.checkMobileNum(mobile)) {
			ResponseUtils.outputWithJson(response, Result.badResult("手机号码错误"));
			return;
		}
		Result result = estoreStoreService.updateMobile(storeId, mobile);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "企业管理";
			String context = "更新企业电话，企业id为:{0} 电话:{1}";
			logger.info("【小程序b端服务>" + module + "】-->B端用户id：" + eadto.getId() + "用户:" + eadto.getNickname() + "对企业电话进行了更新,企业id为：" + eadto.getStoreId() + "电话为：" + mobile);
			userOperLogService.saveLog(service, module, eadto.getId(), eadto.getNickname(), MessageFormat.format(context, new Object[] { storeId, mobile }), UserOperLog.OPERATE_MODIFY);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	/*
	 * 商户地址更新
	 */
	@RequestMapping("/updateAddress")
	public void updateAddress(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		String address = RequestUtils.getParameter(request, "address");// address
		BigDecimal longitude = RequestUtils.getBigDecimalParameter(request, "longitude", BigDecimal.valueOf(0));// 经度
		BigDecimal dimension = RequestUtils.getBigDecimalParameter(request, "dimension", BigDecimal.valueOf(0));// 维度
		if (StringUtils.isBlank(address)) {
			ResponseUtils.outputWithJson(response, Result.badResult("地址不能为空"));
			return;
		}
		if (address.length() > 30) {
			ResponseUtils.outputWithJson(response, Result.badResult("地址长度应小于30字"));
			return;
		}
		Result result = estoreStoreService.updateAddress(storeId, address, longitude, dimension);
		if (result.getSuccess()) {
			String service = "小程序b端服务";
			String module = "企业管理";
			String context = "更新企业地址，企业id为:{0} 地址:{1}";
			logger.info("【小程序b端服务>" + module + "】-->B端用户id：" + eadto.getId() + "用户:" + eadto.getNickname() + "对企业地址进行了更新,企业id为：" + eadto.getStoreId() + "地址为：" + address);
			userOperLogService.saveLog(service, module, eadto.getId(), eadto.getNickname(), MessageFormat.format(context, new Object[] { storeId, address }), UserOperLog.OPERATE_MODIFY);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	/*
	 * 图片删除
	 */
	@RequestMapping("/deleteImg")
	public void deleteImg(HttpServletRequest request, HttpServletResponse response, Model model) {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		String imgName = RequestUtils.getParameter(request, "imgName");// imgId
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.STOREIMGPATH + storeId + "/" + imgName;
		File file = new File(path);
		if (true == file.isFile()) {
			Boolean flag = file.delete();
			if (flag) {
				String service = "小程序b端服务";
				String module = "企业管理";
				String context = "删除企业图片，企业id为:{0}";
				logger.info("【小程序b端服务>" + module + "】-->B端用户id：" + eadto.getId() + "用户:" + eadto.getNickname() + "删除一张企业图片,企业id为：" + eadto.getStoreId());
				userOperLogService.saveLog(service, module, eadto.getId(), eadto.getNickname(), MessageFormat.format(context, new Object[] { storeId }), UserOperLog.OPERATE_DELETE);
				ResponseUtils.outputWithJson(response, Result.rightResult("删除成功"));
			}
			ResponseUtils.outputWithJson(response, Result.badResult("删除失败"));
		}
	}

	/*
	 * 图片上传
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/uploadImg")
	public void uploadImg(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		EstoreAdminDTO eadto = WebUtils.getCurrentUser(request, response);
		Long storeId = eadto.getStoreId();
		// 获取文件需要上传到的路径
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.STOREIMGPATH + storeId + "/";
		System.out.println("path: " + path);
		File dir = new File(path);
		if (!dir.exists()) {
			dir.mkdirs();
		} else {
			if (true == dir.isDirectory() && dir.list().length >= 5) {
				ResponseUtils.outputWithJson(response, Result.badResult("上传图片最多5张"));
				return;
			}
		}
		// request.setCharacterEncoding("utf-8"); // 设置编码
		// 获得磁盘文件条目工厂
		DiskFileItemFactory factory = new DiskFileItemFactory();

		// 如果没以下两行设置的话,上传大的文件会占用很多内存，
		// 设置暂时存放的存储室,这个存储室可以和最终存储文件的目录不同
		/**
		 * 原理: 它是先存到暂时存储室，然后再真正写到对应目录的硬盘上， 按理来说当上传一个文件时，其实是上传了两份，第一个是以 .tem 格式的
		 * 然后再将其真正写到对应目录的硬盘上
		 */
		factory.setRepository(dir);
		// 设置缓存的大小，当上传文件的容量超过该缓存时，直接放到暂时存储室
		factory.setSizeThreshold(1024 * 1024);
		// 高水平的API文件上传处理
		ServletFileUpload upload = new ServletFileUpload(factory);
		try {
			List<FileItem> list = upload.parseRequest(request);
			FileItem picture = null;
			for (FileItem item : list) {
				// 如果获取的表单信息是普通的 文本 信息
				if (!item.isFormField()) {
					picture = item;
					break;
				}
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
			// 自定义上传图片的名字为时间毫秒数.jpg
			String fileName = new Date().getTime() + "." + suffix;
			String destPath = path + fileName;
			logger.debug("destPath=" + destPath);
			// 真正写到磁盘上
			File file = new File(destPath);
			OutputStream out = new FileOutputStream(file);
			InputStream in = picture.getInputStream();
			int length = 0;
			byte[] buf = new byte[1024];
			// in.read(buf) 每次读到的数据存放在buf 数组中
			while ((length = in.read(buf)) != -1) {
				// 在buf数组中取出数据写到（输出流）磁盘上
				out.write(buf, 0, length);
			}
			in.close();
			out.close();
			String service = "小程序b端服务";
			String module = "企业管理";
			String context = "上传企业图片，企业id为:{0} 图片名:{1}";
			logger.info("【小程序b端服务>" + module + "】-->B端用户id：" + eadto.getId() + "用户:" + eadto.getNickname() + "上传企业图片,企业id为：" + eadto.getStoreId() + "图片名为：" + fileName);
			userOperLogService.saveLog(service, module, eadto.getId(), eadto.getNickname(), MessageFormat.format(context, new Object[] { storeId, fileName }), UserOperLog.OPERATE_ADD);
		} catch (FileUploadException e1) {
			logger.error("", e1);
		} catch (Exception e) {
			logger.error("", e);
		}
		ResponseUtils.outputWithJson(response, Result.rightResult("上传成功"));
	}

}
