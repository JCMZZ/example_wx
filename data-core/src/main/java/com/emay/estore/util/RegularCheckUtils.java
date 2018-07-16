package com.emay.estore.util;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 
 * @类描述：  数据校验
 * @创建人：lijinxuan
 */
public class RegularCheckUtils {
	/**
	 * 校验手机 号
	 */
	public static boolean checkMobile(String mobile) {
		if (null == mobile || "".equals(mobile)) {
			return false;
		}
		String regExp = "^1\\d{10}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(mobile);
		return m.matches();
	}

	/**
	 * 校验号码段
	 */
	public static boolean checkSNumber(String number) {
		if (null == number || "".equals(number)) {
			return false;
		}
		String regExp = "^1\\d{6}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 
	 * @Title: specialCodeEscape
	 * @Description: 特殊字符转义
	 * @param @param value
	 * @param @return
	 * @return String
	 */
	public static String specialCodeEscape(String value) {
		if (null != value && !"".equals(value)) {
			value = value.replace("%", "\\%").replace("_", "\\_");
		}
		return value;
	}

	public static String specialCodeEscapeForOracle(String value) {
		if (null != value && !"".equals(value)) {
			StringBuffer sb = new StringBuffer();
			char[] ch = value.toCharArray();
			for (char c : ch) {
				if ("%".equals(String.valueOf(c)) || "_".equals(String.valueOf(c)) || "\\".equals(String.valueOf(c))) {
					sb.append("\\").append(c);
				} else {
					sb.append(c);
				}
			}
			return sb.toString();
		}
		return value;
	}

	/**
	 * 校验Ip
	 */
	public static boolean checkIp(String value) {
		String regExp = "(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)){3}";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(value);
		return m.matches();
	}

	/**
	 * 效验IP、效验IP段
	 * 
	 * @param value
	 * @return
	 */
	public static boolean checkIpParagraph(String value) {
		String regExp = "(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)){2}(\\.(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d|\\*))";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(value);
		return m.matches();
	}

	/**
	 * 校验格式
	 */
	public static boolean checkNumber(String value) {
		String regExp = "^[0-9]*$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(value);
		return m.matches();
	}

	/**
	 * 校验是否包含特殊字符
	 * 
	 * @return false 包含
	 * @return true 不包含
	 */
	public static boolean notExistSpecial(String value) {
		String regExp = "[\u4e00-\u9fa5\\w]+";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(value);
		return m.matches();
	}

	/**
	 * 校验邮箱
	 * 
	 * @param email
	 *            邮箱
	 * @return
	 */
	public static boolean checkEmail(String email) {
		if (null == email || "".equals(email)) {
			return false;
		}
		String regExp = "^([a-zA-Z0-9]+[_|\\_|\\.|\\-]?)*[\\u4e00-\\u9fa5a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.|\\-]?)*[a-zA-Z0-9]*[\\u4e00-\\u9fa5a-zA-Z0-9]+\\.[a-zA-Z]*[\\u4e00-\\u9fa5a-zA-Z0-9]{2,3}$";

		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(email);
		return m.matches();
	}

	/**
	 * 校验密码
	 * 
	 * @param password
	 *            密码：8-16位，大小写字母、数字
	 * @return
	 */
	public static boolean checkPassword(String password) {
		if (null == password || "".equals(password)) {
			return false;
		}
		String regExp = "^[0-9a-zA-Z]{8,16}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(password);
		return m.matches();
	}

	/**
	 * 校验默认密码
	 * 
	 * @param password
	 *            密码：6位，大小写字母、数字
	 * @return
	 */
	public static boolean checkDefaultPassword(String defaultPassword) {
		if (null == defaultPassword || "".equals(defaultPassword)) {
			return false;
		}
		String regExp = "^[0-9a-zA-Z]{6}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(defaultPassword);
		return m.matches();
	}

	/**
	 * 判断是否为空
	 * 
	 * @param val
	 * @return
	 */
	public static boolean isEmpty(String val) {
		if (val == null || (val.trim()).length() == 0 || "null".equals(val.trim())) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 验证手机号码格式
	 * 
	 * @param mobile
	 * @return
	 */
	public static boolean checkMobileFormat(String mobile) {
		if (null == mobile || "".equals(mobile)) {
			return false;
		}
		String regExp = "^1[3|4|5|6|7|8|9]\\d{9}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(mobile);
		return m.matches();

	}

	/**
	 * 正整数校验
	 * 
	 * @param number
	 * @return
	 */
	public static boolean checkPositiveInteger(String number) {
		if (null == number || "".equals(number)) {
			return false;
		}
		String regExp = "^\\+?[1-9]\\d*$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 验证只含有中文和英文
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkString(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		String regExp = "^[\u2E80-\u9FFFa-zA-Z]+$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}

	/**
	 * 签名验证 验证只含有中文和英文、数字 2到8位
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkStringSign(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		String regExp = "^[\u2E80-\u9FFFa-zA-Z0-9]{2,8}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}

	/**
	 * 签名验证 验证只含有中文和英文、数字 2到20位
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkSign(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		String regExp = "^[\u2E80-\u9FFFa-zA-Z0-9]{2,20}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}

	/**
	 * 英文加数字不能以数字开头
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkUserName(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		val = val.toLowerCase();
		String regExp = "^[a-zA-Z][a-zA-Z0-9]{3,15}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}

	/**
	 * 英文字母和数字，首位不能为数字
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkclietUserName(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		String regExp = "/^[a-zA-Z][a-zA-Z0-9]{0,9}$/$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}

	/**
	 * Excel导入的错误信息数组
	 * 
	 * @param obj
	 * @param errorMessage
	 * @return
	 */
	public static String[] copyOfRange(String[] obj, String errorMessage) {
		String[] error = Arrays.copyOfRange(obj, 0, obj.length + 1);
		error[obj.length] = errorMessage;
		return error;
	}

	/**
	 * 验证是否为整数，可以为空
	 * 
	 * @param number
	 * @return
	 */
	public static boolean checkInteger(String number) {
		if (null == number || "".equals(number)) {
			return true;
		}
		String regExp = "^\\+?[1-9]\\d*$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 校验QQ
	 * 
	 * @param QQ
	 * @return
	 */
	public static boolean checkQQ(String QQ) {
		if (null == QQ || "".equals(QQ)) {
			return false;
		}
		String regExp = "^[1-9][0-9]{4,}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(QQ);
		return m.matches();
	}

	/**
	 * 验证发送地址
	 * 
	 * @param sendAddress
	 * @return
	 */
	public static boolean checkSendAddress(String sendAddress) {
		if (null == sendAddress || "".equals(sendAddress)) {
			return false;
		}
		String regExp = "^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9]):\\d{0,5}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(sendAddress);
		return m.matches();
	}

	/**
	 * 验证是否为整数，可以为空
	 * 
	 * @param number
	 * @return
	 */
	public static boolean checkInt(String number) {
		if (null == number || "".equals(number)) {
			return true;
		}
		String regExp = "^\\+?[1-9]\\d{0,3}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 获取当前时间的前N天
	 * 
	 * @param date
	 * @param a
	 * @return
	 */
	public static Date getNextDay(Date date, Integer n) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, n);
		date = calendar.getTime();
		return date;
	}

	/**
	 * 验证是正整数9位
	 * 
	 * @param number
	 * @return
	 */
	public static Boolean checkIntegerSizeNine(String number) {
		if (null == number || number.length() == 0 || "".equals(number)) {
			return false;
		}
		String regExp = "^\\+?[1-9]\\d{0,8}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 验证大于0小于等于5000的数字
	 * 
	 * @param number
	 * @return
	 */
	public static Boolean checkNumLessThanNew5000(String number) {
		if (null == number || number.length() == 0 || "".equals(number)) {
			return false;
		}
		String regExp = "^[1-9]\\d{0,2}$|^[1-4]\\d{3}$|^5000$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 验证是否为整数(不包括零)，不能为空
	 * 
	 * @param number
	 * @return
	 */
	public static boolean checkIntegerRemoveZero(String number) {
		if (null == number || "".equals(number)) {
			return false;
		}
		if (number.equals("0")) {
			return false;
		}
		String regExp = "^-?\\d+$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	public static Boolean checkIntegerSizeFour(String number) {
		if (null == number || number.length() == 0 || "".equals(number)) {
			return false;
		}
		String regExp = "^\\+?[1-9]\\d{0,3}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 验证是正整数8位
	 * 
	 * @param number
	 * @return
	 */
	public static Boolean checkIntegerSizeEight(String number) {
		if (null == number || number.length() == 0 || "".equals(number)) {
			return false;
		}
		String regExp = "^\\+?[1-9]\\d{0,7}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 效验1到9位 正整数 第一位不为0
	 * 
	 * @param number
	 * @return
	 */
	public static Boolean checkIntegernine(String number) {
		if (null == number || number.length() == 0 || "".equals(number)) {
			return false;
		}
		String regExp = "^[1-9][0-9]{0,8}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 校验字符串必须同时包含数字、字母
	 * 
	 * @param number
	 * @return
	 */
	public static Boolean checkNumberAndLetter(String number) {
		if (null == number || number.length() == 0 || "".equals(number)) {
			return false;
		}
		String regExp = "^(?=.*[a-zA-Z])(?=.*[0-9]).*$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}

	/**
	 * 判断字符串是否为数字
	 * 
	 * @param str
	 * @return
	 */
	public static Boolean checkIsNumber(String str) {
		try {
			Integer.valueOf(str);// 把字符串强制转换为数字
			return true;// 如果是数字，返回True
		} catch (Exception e) {
			return false;// 如果抛出异常，返回False
		}
	}

	/**
	 * hbase查询map处理
	 * 
	 * @param map
	 * @return
	 */
	public static Map<String, Object> checkQuerryMap(Map<String, Object> map) {
		Iterator<String> iterator = map.keySet().iterator();
		while (iterator.hasNext()) {
			String key = iterator.next();
			Object value = map.get(key);
			if (null == value || "".equals(value) || "all".equals(value)) {
				iterator.remove();
			}
		}
		return map;
	}

	/**
	 * 校验退订码：最多为5位的中英文、数字
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkUnsubscribeCode(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		String regExp = "^[\u2E80-\u9FFFa-zA-Z0-9]{1,5}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}

	/**
	 * mysql主键校验
	 * 
	 * @param id
	 * @return
	 */
	public static boolean checkPrimaryKey(String id) {
		if (null == id || "".equals(id)) {
			return false;
		}
		String regExp = "^[1-9]\\d*$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(id);
		return m.matches();
	}

	/**
	 * 校验Mac地址
	 * 
	 * @param str
	 * @return
	 */
	public static boolean checkMacAddress(String str) {
		if (null == str || "".equals(str)) {
			return false;
		}
		String regExp = "^(([0-9a-fA-F]{1,2}[\\-|\\:]){5}[0-9a-fA-F]{1,2},)*([0-9a-fA-F]{1,2}[\\-|\\:]){5}[0-9a-fA-F]{1,2}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(str);
		return m.matches();
	}

	/**
	 * 校验字符串是否为纯英文字母
	 * 
	 * @param str
	 * @return
	 */
	public static boolean checkEnglisLetter(String str) {
		if (null == str || "".equals(str)) {
			return false;
		}
		String regExp = "^[A-Za-z]+$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(str);
		return m.matches();
	}

	/**
	 * 验证大于0小于等于65535的数字(端口号)
	 * 
	 * @param number
	 * @return
	 */
	public static Boolean checkNumLessThanNew65535(String number) {
		if (null == number || number.length() == 0 || "".equals(number)) {
			return false;
		}
		String regExp = "^([1-9]|[1-9]\\d|[1-9]\\d{2}|[1-9]\\d{3}|[1-5]\\d{4}|6[0-4]\\d{3}|65[0-4]\\d{2}|655[0-2]\\d|6553[0-5])$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}
	
	/**
	 * 校验卡号
	 * 
	 * @param password
	 *           1-20位，大小写字母、数字
	 * @return
	 */
	public static boolean checkCardNum(String number) {
		if (null == number || "".equals(number)) {
			return false;
		}
		String regExp = "^[0-9a-zA-Z]{1,20}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(number);
		return m.matches();
	}
	
	/**
	 * 商户名称 验证只含有中文和英文、数字 2到30位
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkStoreName(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		String regExp = "^[\u2E80-\u9FFFa-zA-Z0-9]{2,30}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}
	
	/**
	 * 卡片名称 验证只含有中文和英文、数字 1到6位
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkCardName(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		String regExp = "^[\u2E80-\u9FFFa-zA-Z0-9]{1,6}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}
	
	/**
	 * 联系方式校验 手机号,3/4位区号-7/8位固话-1至4位分机
	 * 
	 * @param val
	 * @return
	 */
	public static boolean checkMobileNum(String val) {
		if (null == val || "".equals(val)) {
			return false;
		}
		String regExp = "^((0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?|[48]0{2}-\\d{3}-\\d{4}|(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8})$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(val);
		return m.matches();
	}
}
