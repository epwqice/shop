package benyi.shop.util;

import com.google.gson.Gson;

public class ModelUtil {

	/**
	 * 模型转Json字符串
	 * @param model
	 * @return
	 */
	public static String toJson(Object model) {
		Gson gson = new Gson();
		return gson.toJson(model);
	}
}
