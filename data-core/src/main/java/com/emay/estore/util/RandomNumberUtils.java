package com.emay.estore.util;

import java.util.Random;

public class RandomNumberUtils {
	

	/**
	 * 生成随机，可能为纯数字、纯字母、数字字母
	 * 
	 * @param length
	 *            随机数位数
	 * @return
	 */
	public static String getStringRandom(int length) {
		String val = "";
		Random random = new Random();
		for (int i = 0; i < length; i++) {
			String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";
			// 输出字母还是数字
			if ("char".equalsIgnoreCase(charOrNum)) {
				// 输出是大写字母还是小写字母
				int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;
				val += (char) (random.nextInt(26) + temp);
			} else if ("num".equalsIgnoreCase(charOrNum)) {
				val += String.valueOf(random.nextInt(10));
			}
		}
		return val;
	}

	/**
	 * 生成随机数，同时包含数字和字母
	 * 
	 * @param length
	 *            随机数位数，不能小于2
	 * @return
	 */
	public static String getNumbersAndLettersRandom(int length) {
		if (length < 2) {
			throw new IllegalArgumentException("长度不能小于2");
		}
		// 数组，用于存放随机字符
		char[] chArr = new char[length];
		// 为了保证必须包含数字、字母
		Random random = new Random();
		chArr[0] = (char) ('0' + random.nextInt(10));
		char tempChar = random.nextInt(2) % 2 == 0 ? 'A' : 'a';
		chArr[1] = (char) (tempChar + random.nextInt(26));
		char[] codes = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
				'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
		// charArr[2..length-1]随机生成codes中的字符
		for (int i = 2; i < length; i++) {
			chArr[i] = codes[random.nextInt(codes.length)];
		}
		// 将数组chArr随机排序
		for (int i = 0; i < length; i++) {
			int r = i + random.nextInt(length - i);
			char temp = chArr[i];
			chArr[i] = chArr[r];
			chArr[r] = temp;
		}
		return new String(chArr);
	}

	public static int getIntRandom(int max) {
		Random random = new Random(max);
		return random.nextInt();
	}
	
	/**
	 * 生成 随机数
	 * 
	 * @param length
	 *            长度
	 * @return
	 */
	public static String getRandomCode(int length) {
		String randomCode = "";
		String[] ran = new String[] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };
		for (int i = 0; i < length; i++) {
			randomCode += ran[(int) (Math.random() * ran.length)];
		}
		return randomCode;
	}

}
