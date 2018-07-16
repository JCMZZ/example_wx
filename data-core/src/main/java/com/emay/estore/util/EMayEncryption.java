package com.emay.estore.util;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;

public class EMayEncryption {

	public static void main(String[] args) throws Exception {
		String str = "8muH6VNqtGSmZMJf7L5DuFRKfwCyfsFor+TgNuYTBlnEN1g+s66MqiFaeekqdppYY32HeHRSBrt60oSDpQ3pfQ==";
		String password = "ccfd3b865a3e42fd";
		String ase = aesEncrypt("mobiles=15010133122&taskNo=20888&ctcc=2&etype=0", password);
//		String st = aesDecrypt("+7pVes81b/gfTc3fnJIngFK33HkCYGj6UJL4C8IwOOaP77XkB8EERfPEr/MQIdTQx+sPK4t3LMuW92BSQLWKvaEk6wdI7f4r4r5mod0jCQeLLbgTqtlIgkBpsm0MM5Gb", "377605b8a0e94d42");
//		String st = aesDecrypt("BTFB4Dt1hgkjch8OGWIaL+4n7GZWC4WcDa4vYYvdOXaaYJXDfjl3SVXronOJJMi", "ccfd3b865a3e42fd");
		System.out.println(ase);
//		System.out.println(st);
		System.out.println(md5(str));
	}
	public static String md5(String str) {
		return DigestUtils.md5Hex(str);
	}

	public static String aesEncrypt(String str, String password) {
		if (str == null || password == null)
			return null;
		try {
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(password.getBytes("utf-8"), "AES"));
			byte[] bytes = cipher.doFinal(str.getBytes("utf-8"));
			return org.apache.commons.codec.binary.Base64.encodeBase64String(bytes);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static String aesDecrypt(String str, String password) {
		if (str == null || password == null)
			return null;
		try {
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(password.getBytes("utf-8"), "AES"));
			byte[] bytes = Base64.decodeBase64(str);
			bytes = cipher.doFinal(bytes);
			return new String(bytes, "utf-8");
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
       
	
}
