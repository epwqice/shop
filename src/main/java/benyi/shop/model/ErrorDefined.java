package benyi.shop.model;

import benyi.shop.util.ModelUtil;

public class ErrorDefined {
	
	public static final String authErrorRsp;
	
	public static final String userErrorRsp;
	
	public static final String tokenErroRsp;
	
	static {
		RspModel rsp = new RspModel();
		rsp.setResult(1001);
		rsp.setErrorInfo("鉴权失败。");
		authErrorRsp = ModelUtil.toJson(rsp);
		
		rsp = new RspModel();
		rsp.setResult(2001);
		rsp.setErrorInfo("用户或密码失败。");
		userErrorRsp = ModelUtil.toJson(rsp);
		
		rsp = new RspModel();
		rsp.setResult(3001);
		rsp.setErrorInfo("Token创建失败。");
		tokenErroRsp = ModelUtil.toJson(rsp);
	}
}
