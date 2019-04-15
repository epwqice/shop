package benyi.shop.token;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

import benyi.shop.model.ErrorDefined;

public class AuthenticationInterceptor implements HandlerInterceptor {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		Cookie[] cookies = request.getCookies();
		String token = null;
		for (Cookie cookie : cookies) {
			if ("Token".equals(cookie.getName())) {
				token = cookie.getValue();
			}
		}
		if (token == null) {
			responseMessage(response);
			return false;
		}
		// 验证token
		boolean result = true;
		try {
			String userID = TokenManager.getUserID(token);
			request.setAttribute("userID", userID);
		} catch (AuthException e) {
			responseMessage(response);
			result = false;
		}

		return result;

	}
	
	private static void responseMessage(HttpServletResponse response) throws IOException {
        response.setContentType("application/json; charset=utf-8");  
        PrintWriter out = response.getWriter();
        out.print(ErrorDefined.authErrorRsp);
        out.flush();
        out.close();
    }
}
