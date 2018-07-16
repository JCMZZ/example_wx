package com.emay.estore.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JsonUtils {

	public static String toJsonString(Object obj){
		Gson gson = new GsonBuilder().serializeNulls().create();
		return gson.toJson(obj);
	}
	
	public static <T>T fromJson(Class<T> clazz,String jsonString){
		Gson gson = new Gson();
		return gson.fromJson(jsonString, clazz);
	}
	
}
