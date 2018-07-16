package com.emay.estore.constant;

public enum ServiceTypeEnum {

	SERVICE_TYPE_NEW("智能营销", "1"), 
	SERVICE_TYPE_OLD("精准营销", "2"), 
	SERVICE_TYPE_OWN("自主营销", "3"),;

	/**
	 * 名称
	 */
	private String name;
	/**
	 * 编码
	 */
	private String code;

	private ServiceTypeEnum(String name, String code) {
		this.name = name;
		this.code = code;
	}

	public static String findNameByCode(String code) {
		for (ServiceTypeEnum oc : ServiceTypeEnum.values()) {
			if (oc.getCode().equals(code)) {
				return oc.getName();
			}
		}
		return null;
	}

	public static String findCodeByName(String name) {
		for (ServiceTypeEnum oc : ServiceTypeEnum.values()) {
			if (oc.getName().equals(name)) {
				return oc.getCode();
			}
		}
		return null;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
