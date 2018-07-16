package com.emay.estore.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	public static String toString(Date date , String format){
		String dateStr = null;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			dateStr = sdf.format(date);
		} catch (Exception e) {
		}
		return dateStr;
	}
	
	public static Date parseDate(String dateStr,String format){
		Date date = null;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			date = sdf.parse(dateStr);
		} catch (Exception e) {
		}
		return date;
	}
	
	/**
	 * 获取日期当天的最小时间日期,0点
	 */
	public static Date getMinTimeDateByDate(Date date){
		if(date == null)
			return null;
		String datestr = toString(date, "yyyyMMdd");
		return parseDate(datestr, "yyyyMMdd");
	}
	
	/**
	 * 获取日期当天的最大时间日期,12点整
	 */
	public static Date getMaxTimeDateByDate(Date date){
		if(date == null)
			return null;
		String datestr = toString(date, "yyyyMMdd");
		Date d = parseDate(datestr, "yyyyMMdd");
		return new Date(d.getTime() + 24l * 60l * 60l * 1000l - 1l );
	}



}
