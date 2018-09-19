package com.emay.estore.web.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
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
import org.springframework.web.bind.annotation.RequestMapping;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

import com.emay.estore.auth.PageAuth;
import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dto.estore.EstoreAdDTO;
import com.emay.estore.pojo.estore.EstoreAd;
import com.emay.estore.pojo.system.User;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.estore.EstoreAdService;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.util.FileUtil;
import com.emay.estore.web.utils.WebUtils;

/**
 * 广告位管理
 *
 */
@PageAuth("AD_MANAGE")
@Controller
@RequestMapping("/adManage")
public class EstoreAdManageController {
	@Resource
	private EstoreAdService estoreAdService;
	@Resource
	private UserOperLogService userOperLogService;

	Logger logger = Logger.getLogger(EstoreAdManageController.class);

	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "estore/ad/list";
	}

	@RequestMapping("/ajax/list")
	public void list(HttpServletRequest request, HttpServletResponse response) {
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		String linkPath = RequestUtils.getParameter(request, "linkPath");
		Page<EstoreAdDTO> page = estoreAdService.findPage(linkPath, start, limit);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}

	@RequestMapping("/ajax/add")
	public void add(HttpServletRequest request, HttpServletResponse response, Model model) {
		// 参数
		String linkPath = RequestUtils.getParameter(request, "linkPath");// 链接路径

		User currentUser = WebUtils.getCurrentUser(request, response);
		Result result = estoreAdService.addAd(linkPath);
		if (result.getSuccess()) {
			String service = "小程序pc服务";
			String module = "广告位管理";
			String context = "添加广告位，链接路径：{0}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getUsername(), MessageFormat.format(context, new Object[] { linkPath }), UserOperLog.OPERATE_ADD);
			logger.info("【小程序pc服务>广告位管理】-->PC端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getUsername() + "，添加广告位，链接路径：" + linkPath);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	@RequestMapping("/ajax/modify")
	public void modify(HttpServletRequest request, HttpServletResponse response, Model model) {
		// 参数
		Long id = RequestUtils.getLongParameter(request, "id", 0l);
		String linkPath = RequestUtils.getParameter(request, "linkPath");// 链接路径

		User currentUser = WebUtils.getCurrentUser(request, response);
		Result result = estoreAdService.modifyAd(id, linkPath);
		if (!result.getSuccess()) {
			ResponseUtils.outputWithJson(response, result);
			return;
		}
		if (result.getSuccess()) {
			String service = "小程序pc服务";
			String module = "广告位管理";
			String context = "修改广告位，链接路径：{0}";
			userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getUsername(), MessageFormat.format(context, new Object[] { linkPath }), UserOperLog.OPERATE_MODIFY);
			logger.info("【小程序pc服务>广告位管理】-->PC端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getUsername() + "，修改广告位，链接路径：" + linkPath);
		}
		ResponseUtils.outputWithJson(response, result);
	}

	@RequestMapping("/ajax/info")
	public void info(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long id = RequestUtils.getLongParameter(request, "id", 0l);
		EstoreAd entity = estoreAdService.findById(id);
		ResponseUtils.outputWithJson(response, Result.rightResult(entity));
	}

	@SuppressWarnings("unchecked")
	@RequestMapping("/ajax/upload")
	public void upload(HttpServletRequest request, HttpServletResponse response, Model model) {
		// 参数
		Long id = null;

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
					if ("id".equals(item.getFieldName())) {
						id = temp == null ? null : Long.valueOf(temp);
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
		
		if(id == null || id.longValue() <= 0l){
			ResponseUtils.outputWithJson(response, Result.badResult("参数错误"));
			return;
		}
		// 获取文件需要上传到的路径
		String path = CommonConstants.IMG_BASE_PATH + CommonConstants.ADIMGPATH + id + "/";
		logger.info("path: " + path);
		File dir = new File(path);
		FileUtil.deleteDir(dir);
		if (!dir.exists()) {
			dir.mkdirs();
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
		
		User currentUser = WebUtils.getCurrentUser(request, response);
		String service = "小程序pc服务";
		String module = "广告位管理";
		String context = "上传 图片，id：{0}";
		userOperLogService.saveLog(service, module, currentUser.getId(), currentUser.getUsername(), MessageFormat.format(context, new Object[] { id }), UserOperLog.OPERATE_DOWNLOAD);
		logger.info("【小程序pc服务>广告位管理】-->PC端用户id：" + currentUser.getId() + "，用户名:" + currentUser.getUsername() + "，上传图片，id：" + id);
		ResponseUtils.outputWithJson(response, Result.rightResult("上传成功"));
	}
}
