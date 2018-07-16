package com.emay.estore.util;

import java.math.BigDecimal;

public class BigDecimalUtils {
	// 默认除法运算精度,及即保留小数点多少位
	private static final int DEF_DIV_SCALE = 3;

	/**
	 * * 提供精确的加法运算。 * @param v1 被加数 * @param v2 加数 * @return 两个参数的和
	 * */
	public static BigDecimal add(BigDecimal v1, BigDecimal v2) {
		return v1.add(v2);
	}

	/**
	 * 
	 * 提供精确的减法运算。 * @param v1 被减数 * @param v2 减数 * @return 两个参数的差
	 **/
	public static BigDecimal sub(BigDecimal v1, BigDecimal v2) {
		return v1.subtract(v2);
	}

	/**
	 * * 提供精确的乘法运算。 * @param v1 被乘数 * @param v2 乘数 * @return 两个参数的积
	 * */
	public static BigDecimal mul(BigDecimal v1, BigDecimal v2) {
		return v1.multiply(v2);
	}
	
	public static BigDecimal mul(BigDecimal v1, int v2) {
		return v1.multiply(new BigDecimal(v2));
	}
	
	/**
	 * * 提供精确的乘法运算。 * @param v1 被乘数 * @param v2 乘数 * @return 两个参数的积
	 * */
	public static BigDecimal mul(BigDecimal v1, double v2) {
		return v1.multiply(new BigDecimal(v2));
	}

	/**
	 * * 提供（相对）精确的除法运算，当发生除不尽的情况时，精确到 * 小数点以后多少位，以后的数字四舍五入。 * @param v1 被除数 * @param
	 * v2 除数 * @return 两个参数的商
	 * */
	public static BigDecimal div(BigDecimal v1, BigDecimal v2) {
		return div(v1, v2, DEF_DIV_SCALE);
	}
	
	public static BigDecimal div(BigDecimal v1, double v2) {
		return div(v1, new BigDecimal(v2), DEF_DIV_SCALE);
	}

	/**
	 * * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指 * 定精度，以后的数字四舍五入。 * @param v1 被除数
	 * 
	 * @param v2
	 *            除数 * @param scale 表示表示需要精确到小数点以后几位。 * @return 两个参数的商
	 * */
	public static BigDecimal div(BigDecimal v1, BigDecimal v2, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException(
					"The scale must be a positive integer or zero");
		}
		return v1.divide(v2, scale, BigDecimal.ROUND_HALF_UP);
	}
	
	public static boolean isBigger(BigDecimal v1, BigDecimal v2) {
		return v1.compareTo(v2) > 0 ;
	}

}