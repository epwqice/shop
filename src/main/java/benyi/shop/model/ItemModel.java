package benyi.shop.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 商品模型
 */
@Setter
@Getter
@ToString
public class ItemModel {
	
	/**
	 * 标识
	 */
	private String id;
	/**
	 * 名称
	 */
	private String name;
	
	/**
	 * 价格
	 */
	private double price;
	
	/**
	 * 原价
	 */
	private double oldPrice;
	
	/**
	 * 单位
	 */
	private String unit;
	
	private String picture;
}
