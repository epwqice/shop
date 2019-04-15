package benyi.shop.service;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import benyi.shop.db.UserRepository;
import benyi.shop.model.ErrorDefined;
import benyi.shop.model.RspModel;
import benyi.shop.model.UserModel;
import benyi.shop.model.UserRspModel;
import benyi.shop.token.TokenManager;
import benyi.shop.util.ModelUtil;
import lombok.extern.log4j.Log4j2;
import sun.misc.BASE64Encoder;

@Component
@Log4j2
public class UserManager {
	
	@Autowired
	private UserRepository userRep;
	
	/**
	 * 初始化用户信息
	 */
	public void init() {
		UserModel userModel = new UserModel();
		userModel.set_id("Admin");
		userModel.setName("Admin");
		userModel.setPassword("0p+uSVJHpRoq1ybUZhm0pw==");
		userRep.insert(userModel);
	}
	
	public boolean check(UserModel userModel) {
		UserModel resultModel = userRep.findById(userModel.getName()).orElse(null);
		
		if (null == resultModel) {
			return false;
		}
		
		return check(userModel.getPassword(), resultModel.getPassword());
	}
	
	public String login(HttpServletResponse response, UserModel userModel) {
		String result = ErrorDefined.tokenErroRsp;
		if (check(userModel)) {
			try {
				String token = TokenManager.createToken(userModel.getName());
				RspModel resultModel = new RspModel();
				resultModel.setResult(0);
				// 1天有效期
				int maxAge = 24*60*60;
				Cookie tokenCookie = new Cookie("Token", token);
				tokenCookie.setMaxAge(maxAge);
				tokenCookie.setPath("/");
				
//				Cookie userCookie = new Cookie("User", userModel.getName());
//				userCookie.setMaxAge(maxAge);
//				userCookie.setPath("/");
				response.addCookie(tokenCookie);
				UserRspModel rspModel = new UserRspModel();
				rspModel.setRedirectUrl("/portal.html");
				resultModel.setContent(rspModel);
				
				result = ModelUtil.toJson(resultModel);
				
			} catch (Exception e) {
				log.error(e);
				result = ErrorDefined.tokenErroRsp;
			}
		}
		
		return result;
	}
	
	private String encode(String str) {
		// 确定计算方法
		MessageDigest md5;
		String newstr = "";
		try {
			md5 = MessageDigest.getInstance("MD5");
			// 加密后的字符
			newstr = encodeBase64(md5.digest(str.getBytes("utf-8")));
		} catch (NoSuchAlgorithmException e) {
			log.error(e);
		} catch (UnsupportedEncodingException e) {
			log.error(e);
		}

		return newstr;
	}
	
	private String encodeBase64(String str) {
		String newstr = null;
		try {
			newstr = encodeBase64(str.getBytes("utf-8"));
		} catch (UnsupportedEncodingException e) {
			log.error(e);
		}
		
		return newstr;
	}
	
	private String encodeBase64(byte[] bytes) {
		BASE64Encoder base64en = new BASE64Encoder();
		return base64en.encode(bytes);
	}

	/**
	 * 校验密码
	 * @param newpasswd 新密码，未加密
	 * @param oldpasswd 旧密码
	 * @return 是否匹配
	 */
	private boolean check(String newpasswd, String oldpasswd) {
		return encode(newpasswd).equals(oldpasswd);
	}
}
