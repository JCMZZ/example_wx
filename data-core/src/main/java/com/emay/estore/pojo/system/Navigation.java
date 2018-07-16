package com.emay.estore.pojo.system;

import java.io.Serializable;

/**
 * 导航<br/>
 * 暂不支持多级<br/>
 * 
 * @author 东旭
 *
 */
public class Navigation implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    private Long id;

    /**
     * 导航名
     */
    private String name;

    /**
     * 导航顺序
     */
    private Integer index;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getIndex() {
		return index;
	}

	public void setIndex(Integer index) {
		this.index = index;
	}


}
