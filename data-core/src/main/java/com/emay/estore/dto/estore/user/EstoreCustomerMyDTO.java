package com.emay.estore.dto.estore.user;

import java.io.Serializable;
import java.math.BigDecimal;

public class EstoreCustomerMyDTO implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long userId;
	private String  nickname;
	private BigDecimal balance;
	private BigDecimal score;
	private Long cardId;
	/**
	 * 用户头像
	 */
	private String customerHead;
	
	private String number;
	
	public String getCustomerHead() {
		return customerHead;
	}
	public void setCustomerHead(String customerHead) {
		this.customerHead = customerHead;
	}
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
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	
	
	

}
