package com.emay.estore.util;

import java.util.Comparator;

/**
 * @author IYU
 * @date 2018年6月29日
 * 
 */

public class FileNameComparator implements Comparator<String> {
	@Override
	public int compare(String o1, String o2) {

		return o1.compareTo(o2);
	}

}
