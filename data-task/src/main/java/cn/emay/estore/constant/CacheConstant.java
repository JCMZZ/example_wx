package cn.emay.estore.constant;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.emay.estore.pojo.estore.EstoreServiceSmsBatch;

public class CacheConstant {

	/**
	 * 服务批次缓存
	 */
	public static Map<Long, EstoreServiceSmsBatch> serviceBatchMap = new ConcurrentHashMap<Long, EstoreServiceSmsBatch>();

}
