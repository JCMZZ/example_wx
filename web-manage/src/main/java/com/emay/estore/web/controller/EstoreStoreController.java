package com.emay.estore.web.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.MessageFormat;
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

import com.emay.estore.auth.PageAuth;
import com.emay.estore.constant.CommonConstants;
import com.emay.estore.dto.estore.StoreDTO;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.pojo.estore.EstoreStore;
import com.emay.estore.pojo.system.User;
import com.emay.estore.pojo.system.UserOperLog;
import com.emay.estore.service.estore.EstoreAdminService;
import com.emay.estore.service.estore.EstoreStoreService;
import com.emay.estore.service.system.UserOperLogService;
import com.emay.estore.util.FileUtil;
import com.emay.estore.web.utils.WebUtils;

import cn.emay.common.Result;
import cn.emay.common.db.Page;
import cn.emay.util.RequestUtils;
import cn.emay.util.ResponseUtils;

@PageAuth("STORE")
@Controller
@RequestMapping("/store")
public class EstoreStoreController {
	@Resource
	private EstoreStoreService estoreStoreService;
	@Resource
	private EstoreAdminService estoreAdminService;
	@Resource
	private UserOperLogService userOperLogService;
	Logger logger = Logger.getLogger(EstoreStoreController.class);

	@RequestMapping("")
	public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
		return "estore/store/list";
	}

	@RequestMapping("to/checkStore")
	public String checkStore(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0L);
		model.addAttribute("storeId", storeId);
		return "estore/store/store";
	}

	/*
	 * 商户详情
	 */
	@RequestMapping("/selectStore")
	public void selectStore(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0L);
		StoreDTO dto = estoreStoreService.find(storeId);
		ResponseUtils.outputWithJson(response, Result.rightResult(dto));
	}

	/*
	 * 商户列表
	 */
	@RequestMapping("/selectStoreList")
	public void selectStoreList(HttpServletRequest request, HttpServletResponse response, Model model) {
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		String name = RequestUtils.getParameter(request, "name");
		String mobile = RequestUtils.getParameter(request, "mobile");
		String storeLicence = RequestUtils.getParameter(request, "storeLicence");
		String appId = RequestUtils.getParameter(request, "appId");
		String appSecret = RequestUtils.getParameter(request, "appSecret");
		Page<EstoreStore> page = estoreStoreService.findStore(start, limit, name, storeLicence, appId, appSecret, mobile);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}

	/*
	 * 管理员绑定list
	 */
	@RequestMapping("/selectAdminList")
	public void selectAdminList(HttpServletRequest request, HttpServletResponse response, Model model) {
		int start = RequestUtils.getIntParameter(request, "start", 0);
		int limit = RequestUtils.getIntParameter(request, "limit", 20);
		String adminName = RequestUtils.getParameter(request, "adminName");
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0L);
		Page<EstoreAdminDTO> page = estoreAdminService.selectAdminList(start, limit, storeId, adminName);
		ResponseUtils.outputWithJson(response, Result.rightResult(page));
	}

	/*
	 * 管理员绑定解绑
	 */
	@RequestMapping("/updateAdminBind")
	public void updateAdminBind(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long adminId = RequestUtils.getLongParameter(request, "adminId", 0L);
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0L);
		int bind = RequestUtils.getIntParameter(request, "bind", -1);
		Result result = estoreAdminService.updateAdminBind(adminId, storeId, bind);
		ResponseUtils.outputWithJson(response, result);
	}

	/*
	 * 商户添加
	 */
	@RequestMapping("/addStore")
	public void addStore(HttpServletRequest request, HttpServletResponse response, Model model) {
		String name = RequestUtils.getParameter(request, "name");
		String storeLicence = RequestUtils.getParameter(request, "storeLicence");
		String appId = RequestUtils.getParameter(request, "appId");
		String appSecret = RequestUtils.getParameter(request, "appSecret");
		if (StringUtils.isBlank(name) || name.length() > 50) {
			ResponseUtils.outputWithJson(response, Result.badResult("企业名称有误"));
			return;
		}
		if (!StringUtils.isBlank(appSecret) && appSecret.length() > 32) {
			ResponseUtils.outputWithJson(response, Result.badResult("秘钥有误"));
			return;
		}
		if (!StringUtils.isBlank(appId) && appId.length() > 18) {
			ResponseUtils.outputWithJson(response, Result.badResult("秘钥有误"));
			return;
		}
		Result result = estoreStoreService.addStore(name, storeLicence, appId, appSecret);
		ResponseUtils.outputWithJson(response, result);
	}

	/*
	 * 商户更新
	 */
	@RequestMapping("/updateStore")
	public void updateStore(HttpServletRequest request, HttpServletResponse response, Model model) {
		String name = RequestUtils.getParameter(request, "name");
		String storeLicence = RequestUtils.getParameter(request, "storeLicence");
		String appId = RequestUtils.getParameter(request, "appId");
		String appSecret = RequestUtils.getParameter(request, "appSecret");
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0L);
		if (StringUtils.isBlank(name) || name.length() > 50) {
			ResponseUtils.outputWithJson(response, Result.badResult("企业名称有误"));
			return;
		}
		if (!StringUtils.isBlank(appSecret) && appSecret.length() > 32) {
			ResponseUtils.outputWithJson(response, Result.badResult("秘钥有误"));
			return;
		}
		if (!StringUtils.isBlank(appId) && appId.length() > 18) {
			ResponseUtils.outputWithJson(response, Result.badResult("APPID有误"));
			return;
		}
		Result result = estoreStoreService.updateStore(name, storeLicence, appId, appSecret, storeId);
		ResponseUtils.outputWithJson(response, result);
	}

	/*
	 * 停启
	 */
	@RequestMapping("/ajax/updateStoreState")
	public void updateStoreState(HttpServletRequest request, HttpServletResponse response, Model model) {
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0L);// 通道id
		String storeName = RequestUtils.getParameter(request, "storeName");
		User user = WebUtils.getCurrentUser(request, response);
		Integer state = RequestUtils.getIntParameter(request, "state", -1);// 当前状态
		if (state == -1) {
			ResponseUtils.outputWithJson(response, Result.badResult("通道状态有误!"));
			return;
		}
		if (state == 1) {
			state = 0;
		} else if (state == 0) {
			state = 1;
		}
		Result result = estoreStoreService.updateStoreState(storeId, state);
		if (result.getSuccess()) {
			String service = "小程序pc服务";
			String module = "企业管理";
			String context = state == 1 ? "停用企业:{0}" : "启用企业:{0}";
			userOperLogService.saveLog(service, module, user.getId(), user.getUsername(), MessageFormat.format(context, new Object[] { storeName }), UserOperLog.OPERATE_MODIFY);
			if (state == 1) {
				logger.info("【小程序pc服务>企业管理】-->用户:" + user.getUsername() + "停用企业,企业名称为:" + storeName);
			} else if (state == 0) {
				logger.info("【小程序pc服务>企业管理】-->用户:" + user.getUsername() + "启用企业,企业名称为:" + storeName);
			}
			ResponseUtils.outputWithJson(response, Result.rightResult(state));
		} else {
			ResponseUtils.outputWithJson(response, Result.badResult(state.toString()));
		}
	}

	/**
	 * 校验商户是否有资料
	 * 
	 */
	@RequestMapping("/checkData")
	public void checkData(HttpServletRequest request, HttpServletResponse response) {
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0l);
		Boolean flag = false;
		flag = estoreStoreService.checkData(storeId);
		if (flag) {
			ResponseUtils.outputWithJson(response, Result.rightResult());
		} else {
			ResponseUtils.outputWithJson(response, Result.badResult());
		}
	}

	/**
	 * 下载
	 * 
	 */
	@RequestMapping("/download")
	public void download(HttpServletRequest request, HttpServletResponse response) {
		InputStream fis = null;
		OutputStream os = null;
		Long storeId = RequestUtils.getLongParameter(request, "storeId", 0l);
		String folderPath = CommonConstants.IMG_BASE_PATH + CommonConstants.STOREDATAPATH + storeId + "/";
		String filePath = "";
		try {
			File folder = new File(folderPath);
			// 判断文件是否存在
			if (folder.exists()) {
				if (true == folder.isDirectory()) {
					String[] png = folder.list();
					filePath = folderPath + png[0];
				}
			} else {
				ResponseUtils.outputWithJson(response, Result.badResult("暂无资料"));
				return;
			}
			File file = new File(filePath);
			fis = new BufferedInputStream(new FileInputStream(file));
			byte[] buffer = new byte[1024 * 10];
			response.reset();
			response.setContentType("application/octet-stream");// 压缩文件
			response.addHeader("Content-Disposition", "attachment;filename=" + new String((file.getName()).getBytes("gb2312"), "iso8859-1"));
			response.addHeader("Content-Length", "" + file.length());
			os = new BufferedOutputStream(response.getOutputStream());
			int length;
			while ((length = fis.read(buffer)) != -1) {
				os.write(buffer, 0, length);
			}
			os.flush();
		} catch (Exception e) {
			logger.error("下载异常:", e);
		} finally {
			try {
				if (null != fis) {
					fis.close();
				}
				if (null != os) {
					os.close();
				}
			} catch (IOException e) {
				logger.error("下载异常:", e);
			}
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping("/uploadData")
	public void uploadImg(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		Long storeId = 0L;

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
		try {
			List<FileItem> list = upload.parseRequest(request);
			FileItem picture = null;
			for (FileItem fileItem : list) {
				// 如果获取的表单信息是普通的 文本 信息
				if (fileItem.isFormField()) {
					String temp = new String(fileItem.getString().getBytes("iso8859-1"), "utf-8");
					if ("storeId".equals(fileItem.getFieldName())) {
						storeId = Long.valueOf(temp);
					}
				} else {
					picture = fileItem;
					break;
				}
			}
			// 获取文件需要上传到的路径
			String path = CommonConstants.IMG_BASE_PATH + CommonConstants.STOREDATAPATH + storeId + "/";
			File dir = new File(path);
			FileUtil.deleteDir(dir);
			if (!dir.exists()) {
				dir.mkdirs();
			}
			logger.debug("path=" + path);

			factory.setRepository(dir);

			if (picture == null) {
				ResponseUtils.outputWithJson(response, Result.badResult("请上传文件"));
				return;
			}
			Long size = picture.getSize();
			if (size > CommonConstants.IMGMAXSIZE) {
				ResponseUtils.outputWithJson(response, Result.badResult("文件过大"));
				return;
			}
			// 获取表单的属性名字
			// String name = picture.getFieldName();
			String destPath = path + picture.getName();
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
		} catch (FileUploadException e1) {
			logger.error("", e1);
		} catch (Exception e) {
			logger.error("", e);
		}
		ResponseUtils.outputWithJson(response, Result.rightResult("上传成功"));
	}

}
