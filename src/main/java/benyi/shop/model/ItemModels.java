package benyi.shop.model;

import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemModels {
	
	/**
	 * 总数
	 */
	private long total;
	
	/**
	 * 当前页数
	 */
	private int page;
	
	/**
	 * 排序方向
	 */
	private String order;
	
	/**
	 * 排序字段
	 */
	private String orderBy;
	
	/**
	 * 物品 
	 */
	private Map<String, ItemModel> datas;
}
