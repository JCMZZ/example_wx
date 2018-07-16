package com.emay.estore.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegUtils {
	
	private static String emailReg = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
	
	private static String usernameReg = "^[a-zA-Z][a-zA-Z0-9_]{5,15}$";
	
	private static String passwordReg = "^[^\n]{6,16}$";
	
	
	public static boolean isEmail(String email){
		return matches(emailReg,email);
	}
	
	public static boolean checkUsername(String username){
		return matches(usernameReg,username);
	}
	
	public static boolean checkPassword(String password){
		return matches(passwordReg,password);
	}

	public static boolean matches(String reg,String checkString){
		if(checkString == null)
			return false;
		Pattern p = Pattern.compile(reg);
		Matcher m = p.matcher(checkString);
		return m.matches();
	}
	
}
