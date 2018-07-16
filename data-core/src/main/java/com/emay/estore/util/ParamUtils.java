package com.emay.estore.util;

import java.math.BigDecimal;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

public class ParamUtils {

	public static String getParameter(HttpServletRequest request, String name) {
		String temp = request.getParameter(name);
		if(temp == null || temp.trim().equals("") || temp.trim().equalsIgnoreCase("null"))
			temp = null;
		else
			temp = temp.trim();
		return temp;
	}
	
	public static long getLongParameter(HttpServletRequest request,String name, long defaultNum) {
		String temp = request.getParameter(name);
		if(temp == null || temp.trim().equals(""))
			return defaultNum;
		long num = defaultNum;
		try {
			num = Long.valueOf(temp.trim());
		} catch (Exception ignored) {
		}
		return num;
	}

	public static boolean getBooleanParameter(HttpServletRequest request,String name, boolean defaultValue) {
		String temp = request.getParameter(name);
		if(temp == null || temp.trim().equals(""))
			return defaultValue;
		if(temp.equalsIgnoreCase("true") || temp.equalsIgnoreCase("on") || temp.equalsIgnoreCase("1"))
			return true;
		if(temp.equalsIgnoreCase("false") || temp.equalsIgnoreCase("off") || temp.equalsIgnoreCase("0"))
			return false;
		return defaultValue;
	}

	public static int getIntParameter(HttpServletRequest request, String name,int defaultNum) {
		String temp = request.getParameter(name);
		if(temp == null || temp.trim().equals(""))
			return defaultNum;
		int num = defaultNum;
		try {
			num = Integer.valueOf(temp);
		} catch (Exception e) {
		}
		return num;
	}

	public static float getFloatParameter(HttpServletRequest request,String name, float defaultNum) {
		String temp = request.getParameter(name);
		if(temp == null || temp.trim().equals(""))
			return defaultNum;
		float num = defaultNum;
		try {
			num = Float.valueOf(temp);
		} catch (Exception e) {
		}
		return num;
	}

	public static double getDoubleParameter(HttpServletRequest request,String name, double defaultNum) {
		String temp = request.getParameter(name);
		if(temp == null || temp.trim().equals(""))
			return defaultNum;
		double num = defaultNum;
		try {
			num = Double.valueOf(temp);
		} catch (Exception e) {
		}
		return num;
	}
	
	public static Date getDateParameter(HttpServletRequest request,String name, String format ,Date defaultValue){
		String temp = request.getParameter(name);
		Date date = DateUtil.parseDate(temp, format);
		if(date == null)
			date = defaultValue;
		return date;
	}
	
	public static BigDecimal getBigDecimalParameter(HttpServletRequest request,String name,BigDecimal defaultValue){
		String temp = request.getParameter(name);
		BigDecimal value = defaultValue;
		try {
			value = new BigDecimal(temp);
		} catch (Exception e) {
		}
		return value;
	}

}
