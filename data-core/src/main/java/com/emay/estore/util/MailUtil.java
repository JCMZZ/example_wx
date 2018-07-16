package com.emay.estore.util;

import java.util.Map;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import cn.emay.common.Result;

public class MailUtil {

	static Properties props;

	static Authenticator authenticator;

	static String CONTENT_TYPE = "text/html;charset=UTF-8";

	static {
		Map<String, String> webconfig = PropertitesUtil.getPropertys("webConfig.properties");
		props = new Properties();
		props.put("mail.smtp.auth", Boolean.valueOf(webconfig.get("mail.smtp.auth")));
		props.put("mail.smtp.host", webconfig.get("mail.smtp.host"));
		props.put("mail.user", webconfig.get("mail.user"));
		props.put("mail.password", webconfig.get("mail.password"));
		authenticator = new Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				String userName = props.getProperty("mail.user");
				String password = props.getProperty("mail.password");
				return new PasswordAuthentication(userName, password);
			}
		};
	}

	public static Result sendMail(String toMail, String subject, String content) {
		Result result = null;
		try {
			Session mailSession = Session.getInstance(props, authenticator);
			MimeMessage message = new MimeMessage(mailSession);
			InternetAddress form = new InternetAddress(props.getProperty("mail.user"));
			message.setFrom(form);
			InternetAddress to = new InternetAddress(toMail);
			message.setRecipient(RecipientType.TO, to);
			message.setSubject(subject);
			message.setContent(content, CONTENT_TYPE);
			Transport.send(message);
			result = Result.rightResult(1, "邮件发送成功", null);
		} catch (MessagingException e) {
			e.printStackTrace();
			if (props.get("mail.smtp.host") == null) {
				result = Result.badResult(-1, "系统没有配置邮件服务，不能发送邮件，请在webconfig.properties中配置", null);
			} else {
				/*result = Result.badResult(-1, "邮件发送失败，收件人：" + toMail + ";标题：" + subject + ";错误：" + e.getMessage(), null);*/
				 result = Result.badResult(-1, "邮件发送失败", null); 
			}
		}
		return result;
	}

	public static void main(String[] args) {
		sendMail("rongpei@emay.cn", "haha", "test");
	}
}