package com.emay.estore.dto.estore.user;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * C端用户信息dto
 *
 */
public class EstoreCustomerInfoDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	public static final Integer UPDATE_CARD_NUMBER = 1;
	public static final Integer UPDATE_CARD_TYPE_ID = 2;

	public static final Integer UPDATE_SCORE = 1;
	public static final Integer UPDATE_BALANCE = 2;

	private Long id;
	/**
	 * 用户id
	 */
	private Long userId;
	/**
	 * 商户id
	 */
	private Long storeId;
	/**
	 * 昵称
	 */
	private String nickname;
	/**
	 * 余额
	 */
	private BigDecimal balance;
	/**
	 * 积分
	 */
	private BigDecimal score;
	/**
	 * 卡片id
	 */
	private Long cardId;
	/**
	 * 卡片等级
	 */
	private Long cardLevel;
	/**
	 * 卡片名称
	 */
	private String cardName;
	/**
	 * 卡号
	 */
	private String cardNumber;
	/**
	 * 商户名称
	 */
	private String storeName;
	
	/**
	 * 用户头像
	 */
	private String avatarUrl;
	/**
	 * 手机号
	 */
	private String mobile;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public BigDecimal getScore() {
		return score;
	}

	public void setScore(BigDecimal score) {
		this.score = score;
	}

	public Long getCardId() {
		return cardId;
	}

	public void setCardId(Long cardId) {
		this.cardId = cardId;
	}

	public Long getCardLevel() {
		return cardLevel;
	}

	public void setCardLevel(Long cardLevel) {
		this.cardLevel = cardLevel;
	}

	public String getCardName() {
		return cardName;
	}

	public void setCardName(String cardName) {
		this.cardName = cardName;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

}
