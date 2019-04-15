package benyi.shop.token;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.util.StringUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

public class TokenManager {
	/** token秘钥，请勿泄露，请勿随便修改 backups:Benyi.Shop */
	public static final String SECRET = "Benyi.Shop";
	
	/** token 过期时间: 1天 */
	public static final int calendarField = Calendar.DATE;
	
	public static final int calendarInterval = 1;

	/**
	 * JWT生成Token.<br/>
	 * 
	 * JWT构成: header, payload, signature
	 * 
	 * @param user_id
	 *            登录成功后用户user_id, 参数user_id不可传空
	 */
	public static String createToken(String userId) throws Exception {
		Date iatDate = new Date();
		// expire time
		Calendar nowTime = Calendar.getInstance();
		nowTime.add(calendarField, calendarInterval);
		Date expiresDate = nowTime.getTime();

		// header Map
		Map<String, Object> map = new HashMap<>();
		map.put("alg", "HS256");
		map.put("typ", "JWT");

		// build token
		String token = JWT.create().withHeader(map) // header
				.withClaim("iss", "Benyi") // payload 签发者
				.withClaim("aud", "Shop") // 接收方
				.withClaim("userId", userId) // 用户ID
				.withIssuedAt(iatDate) // sign time 签发时间
				.withExpiresAt(expiresDate) // expire time 过期时间
				.sign(Algorithm.HMAC256(SECRET)); // signature

		return token;
	}

	/**
	 * 解密Token
	 * 
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Claim> verifyToken(String token) throws AuthException {
		// @throws AlgorithmMismatchException     if the algorithm stated in the token's header it's not equal to the one defined in the {@link JWTVerifier}.
		// @throws SignatureVerificationException if the signature is invalid.
		// @throws TokenExpiredException          if the token has expired.
		// @throws InvalidClaimException          if a claim contained a different value than the expected one.
		DecodedJWT jwt = null;
		try {
			JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET)).build();
			jwt = verifier.verify(token);
		} catch (AlgorithmMismatchException e) {
			throw new AuthException("令牌头错误");
		} catch (SignatureVerificationException e) {
			throw new AuthException("签名无效");
		} catch (TokenExpiredException e) {
			throw new AuthException("token过期");
		} catch (InvalidClaimException e) {
			throw new AuthException("与预期值不同");
		}

		return jwt.getClaims();
	}

	/**
	 * 根据Token获取user_id
	 * 
	 * @param token
	 * @return userId
	 */
	public static String getUserID(String token) throws AuthException {
		Map<String, Claim> claims = verifyToken(token);
		Claim userIDClaim = claims.get("userId");
		if (null == userIDClaim || StringUtils.isEmpty(userIDClaim.asString())) {
			throw new AuthException("未包含用户标识");
		}
		return userIDClaim.asString();
	}
}
