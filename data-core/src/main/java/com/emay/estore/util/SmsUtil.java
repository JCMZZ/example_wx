package com.emay.estore.util;

import org.apache.commons.lang3.StringUtils;

public class SmsUtil {

	// 计算长短信条数
	public static int getSmsCount(String content, int messageLength) {
		if (StringUtils.isEmpty(content)) {
			return 0;
		}
		int result = 1;
		if (content.length() > messageLength) {
			result = content.length() % (messageLength - 3) == 0 ? content.length() / (messageLength - 3) : (content.length() / (messageLength - 3)) + 1;
		}
		return result;
	}
}
