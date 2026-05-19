package com.erp.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Component
public class JwtUtil {

    @Value("${jwt.secret:change-me}")
    private String jwtSecret;

    private static final long EXP_MS = 1000L * 60 * 60 * 24; // 24h

    public String createToken(Long userId, String role, Long companyId) {
        Algorithm alg = Algorithm.HMAC256(jwtSecret.getBytes());
        return JWT.create()
                .withSubject(String.valueOf(userId))
                .withClaim("role", role)
                .withClaim("companyId", companyId)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXP_MS))
                .sign(alg);
    }

    public com.auth0.jwt.interfaces.DecodedJWT verifyToken(String token) {
        Algorithm alg = Algorithm.HMAC256(jwtSecret.getBytes());
        return JWT.require(alg).build().verify(token);
    }
}
