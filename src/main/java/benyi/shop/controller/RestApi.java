package benyi.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import benyi.shop.model.RspModel;
import benyi.shop.service.ItemManager;
import benyi.shop.util.ModelUtil;

@Controller
@EnableAutoConfiguration
public class RestApi {

	@Autowired
	private ItemManager itemManager;

	@RequestMapping(value = "/rest/item", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getItems(@RequestParam(value = "order", required = false) String order,
			@RequestParam(value = "orderBy", required = false) String orderBy,
			@RequestParam(value = "rowsPerPage", required = false) Integer rowsPerPage,
			@RequestParam(value = "page", required = false) Integer page) {
//		itemManager.init();
		RspModel rsp = new RspModel();
		rsp.setResult(0);
		rsp.setContent(itemManager.queryItems(order, orderBy, rowsPerPage, page));
		return ModelUtil.toJson(rsp);
	}
	
	@RequestMapping(value = "/rest/init", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String init() {
		itemManager.init();
		RspModel rsp = new RspModel();
		rsp.setResult(0);
		rsp.setContent("Init OK.");
		return ModelUtil.toJson(rsp);
	}
}
