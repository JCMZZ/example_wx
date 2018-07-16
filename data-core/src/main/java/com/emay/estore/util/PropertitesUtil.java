package com.emay.estore.util;

import java.io.IOException;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

public class PropertitesUtil {
	
	public static String getProperty(String key,String propertiesFilePath){
		Properties properties = new Properties();
		try {
			properties.load(PropertitesUtil.class.getClassLoader().getResourceAsStream(propertiesFilePath));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return properties.getProperty(key);
	}
	
	public static Map<String,String> getPropertys(String propertiesFilePath){
		Map<String,String> map = new ConcurrentHashMap<String, String>();
		Properties properties = new Properties();
		try {
			properties.load(PropertitesUtil.class.getClassLoader().getResourceAsStream(propertiesFilePath));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		for(String name : properties.stringPropertyNames()){
			map.put(name, properties.getProperty(name));
		}
		return map;
	}

}
