package com.emay.estore.util;

import java.security.AlgorithmParameters;
import java.security.Security;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

/**
 * AES加解密工具
 * 
 * @author Frank
 *
 */
public class AESUtil {
	
	public final static String ALGORITHM_AEPP = "AES/ECB/PKCS5Padding";

	/**
	 * AES解密
	 * 
	 * @param content
	 *            加密内容
	 * @param password
	 *            密钥
	 * @param algorithm
	 *            算法
	 * @param ivStr
	 *            向量
	 * @return 解密后数据
	 */
	public static byte[] decrypt(byte[] content, byte[] password, byte[] ivStr, String algorithm) {
		try {
			// 如果密钥不足16位，那么就补足. 这个if 中的内容很重要
			int base = 16;
			if (password.length % base != 0) {
				int groups = password.length / base + (password.length % base != 0 ? 1 : 0);
				byte[] temp = new byte[groups * base];
				Arrays.fill(temp, (byte) 0);
				System.arraycopy(password, 0, temp, 0, password.length);
				password = temp;
			}
			// 初始化
			Security.addProvider(new BouncyCastleProvider());
			Cipher cipher = Cipher.getInstance(algorithm, "BC");
			SecretKeySpec spec = new SecretKeySpec(password, "AES");
			AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
			parameters.init(new IvParameterSpec(ivStr));
			cipher.init(Cipher.DECRYPT_MODE, spec, parameters);// 初始化
			byte[] resultByte = cipher.doFinal(content);
			return resultByte;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
