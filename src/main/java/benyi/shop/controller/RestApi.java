package benyi.shop.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import benyi.shop.model.ItemModel;
import benyi.shop.model.RspModel;
import benyi.shop.model.UserModel;
import benyi.shop.service.ItemManager;
import benyi.shop.service.UserManager;
import benyi.shop.util.ModelUtil;

@Controller
@EnableAutoConfiguration
public class RestApi {

	@Autowired
	private ItemManager itemManager;
	
	@Autowired
	private UserManager userManager;

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
	
	@RequestMapping(value = "/rest/item", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
	public String postItem(@RequestBody ItemModel itemModel) {
		RspModel rsp = new RspModel();
		rsp.setResult(0);
		ItemModel contentModel;
		if (itemModel.get_id() == null) {
			contentModel = itemManager.create(itemModel);
		} else {
			contentModel = itemManager.edit(itemModel);
		}
		rsp.setContent(contentModel);
		return ModelUtil.toJson(rsp);
	}
	
	@RequestMapping(value = "/rest/item", method = RequestMethod.DELETE, produces="application/json;charset=UTF-8")
	@ResponseBody
	public String deleteItem(@RequestBody ItemModel item) {
		RspModel rsp = new RspModel();
		rsp.setResult(0);
		itemManager.delete(item.get_id());
		return ModelUtil.toJson(rsp);
	}
	
	@RequestMapping(value = "/rest/login", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
    @ResponseBody
	public String login(HttpServletResponse response, @RequestBody UserModel userModel) {
		return userManager.login(response, userModel);
	}
	
	@RequestMapping(value = "/rest/init", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String userInit() {
		RspModel rsp = new RspModel();
		rsp.setResult(0);
		userManager.init();
		return ModelUtil.toJson(rsp);
	}
}
