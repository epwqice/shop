package benyi.shop.model;

import lombok.Getter;
import lombok.Setter;

/**
 * 回应数据体结构
 */
@Setter
@Getter
public class RspModel {
	/**
	 * 结果
	 */
	private int result;
	
	/**
	 * 错误信息
	 */
	private String errorInfo;
	
	/**
	 * 内容
	 */
	private Object content;
}
